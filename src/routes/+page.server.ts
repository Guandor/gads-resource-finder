import * as cheerio from 'cheerio';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import resourceFile from '$lib/resources.json' with { type: 'json' };
import { use_local_data_source } from '$env/static/private';

type Resource = {
	name: string;
	url: string;
	description: string;
	details?: ResourceDetails;
};

type ResourceDetails = {
	attributes: string[];
	description: string;
	display_name: string;
	fields: { [key: string]: Field };
	metrics: string[];
	name: string;
	segments: string[];
};

type Field = {
	field_details: FieldDetails;
	incompatible_fields: string[];
};

type FieldDetails = {
	attribute_resources?: unknown[];
	category?: Category;
	data_type?: DataType;
	description?: string;
	enum_values?: string[];
	filterable?: boolean;
	is_repeated?: boolean;
	metrics?: unknown[];
	name?: string;
	segments?: unknown[];
	selectable?: boolean;
	selectable_with?: string[];
	sortable?: boolean;
	type_url?: string;
};

type Category = 'ATTRIBUTE' | 'METRIC' | 'SEGMENT';

type DataType =
	| 'INT64'
	| 'DOUBLE'
	| 'STRING'
	| 'RESOURCE_NAME'
	| 'ENUM'
	| 'BOOLEAN'
	| 'MESSAGE'
	| 'DATE'
	| 'INT32';

async function getResourceDetails(resource: Resource) {
	const url = 'https://gaql-query-builder.uc.r.appspot.com/schemas/v17/' + resource.name + '.json';
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const details: ResourceDetails = await response.json();
	resource.details = details;
	return resource;
}

function cleanResources(resources: Resource[]) {
	// Remove all field details except for description
	resources = resources.map((resource) => {
		if (resource.details && resource.details.fields) {
			for (const fieldName in resource.details.fields) {
				if (resource.details.fields[fieldName].field_details) {
					const { description } = resource.details.fields[fieldName].field_details;
					resource.details.fields[fieldName].field_details = { description };
				}
			}
		}
		return resource;
	});
	return resources;
}

export async function load() {
	let resources: Resource[] = [];

	if (use_local_data_source !== 'true') {
		console.log('Fetching Google Ads API fields overview...');
		const url = 'https://developers.google.com/google-ads/api/fields/v17/overview';
		console.log(`URL: ${url}`);
		const response = await fetch(url);
		console.log(`Response status: ${response.status}`);
		const html = await response.text();
		console.log(`HTML length: ${html.length}`);
		const $ = cheerio.load(html);
		console.log('Cheerio loaded HTML');

		$('#field-table tr').each((_, element) => {
			const nameElement = $(element).find('td:first-child a');
			const name = nameElement.text().trim();
			const relativeUrl = nameElement.attr('href');
			const fullUrl = relativeUrl ? `https://developers.google.com${relativeUrl}` : '';
			const description = $(element).find('td:last-child').text().trim();

			if (name && fullUrl && description) {
				resources.push({ name, url: fullUrl, description });
			}
		});

		// Fetch details for each resource in batches of 5
		const resourcesWithDetails = [];
		console.log(`Total resources to process: ${resources.length}`);
		for (let i = 0; i < resources.length; i += 5) {
			console.log(`Processing batch starting at index ${i}`);
			const batch = resources.slice(i, i + 5);
			console.log(`Batch size: ${batch.length}`);
			const batchWithDetails = await Promise.all(
				batch.map(async (resource) => {
					console.log(`Fetching details for resource: ${resource.name}`);
					try {
						const resourceWithDetails = await getResourceDetails(resource);
						console.log(`Successfully fetched details for ${resource.name}`);
						return resourceWithDetails;
					} catch (error) {
						console.error(`Failed to fetch details for ${resource.name}:`, error);
						console.log(`Returning original resource for ${resource.name}`);
						return resource; // Return the original resource if fetching details fails
					}
				})
			);
			console.log(
				`Batch processing complete. Adding ${batchWithDetails.length} resources to the result.`
			);
			resourcesWithDetails.push(...batchWithDetails);
			console.log(`Total resources processed so far: ${resourcesWithDetails.length}`);
		}
		console.log(
			`All batches processed. Total resources with details: ${resourcesWithDetails.length}`
		);

		// Replace the original resources array with the new one containing details
		resources = resourcesWithDetails;
		resources = cleanResources(resources);
		// Save resources as JSON
		const dataDir = join(process.cwd(), 'src/lib');

		const jsonFilePath = join(dataDir, 'resources.json');
		await writeFile(jsonFilePath, JSON.stringify(resources, null, 2));

		console.log(`Resources saved to ${jsonFilePath}`);
	} else {
		resources = resourceFile as Resource[];
		resources = cleanResources(resources);
	}

	return {
		resources
	};
}
