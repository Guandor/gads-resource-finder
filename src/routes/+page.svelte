<script lang="ts">
	import OptionSelector from '$lib/OptionSelector.svelte';
	import SelectedItems from '$lib/SelectedItems.svelte';
	import ResourceList from '$lib/ResourceList.svelte';

	export let data;

	let selectedAttributes: string[] = [];
	let selectedSegments: string[] = [];
	let selectedMetrics: string[] = [];

	let attributeSearch = '';
	let segmentSearch = '';
	let metricSearch = '';

	// Reactive statement to filter resources based on selections
	$: filteredResources = data.resources.filter((resource) => {
		const hasAllAttributes = selectedAttributes.every((attr) =>
			resource.details?.attributes.includes(attr)
		);
		const hasAllSegments = selectedSegments.every((seg) =>
			resource.details?.segments.includes(seg)
		);
		const hasAllMetrics = selectedMetrics.every((metric) =>
			resource.details?.metrics.includes(metric)
		);

		return hasAllAttributes && hasAllSegments && hasAllMetrics;
	});

	// Function to get all options for a category
	function getAllOptions(category: 'attributes' | 'segments' | 'metrics'): string[] {
		return Array.from(
			new Set(data.resources.flatMap((resource) => resource.details?.[category] || []))
		).sort();
	}

	// Function to filter options based on search and selected items
	function filterOptions(options: string[], search: string, selected: string[]): string[] {
		const filtered = options.filter((option) =>
			option.toLowerCase().includes(search.toLowerCase())
		);
		const selectedSet = new Set(selected);
		return [
			...filtered.filter((option) => selectedSet.has(option)),
			...filtered.filter((option) => !selectedSet.has(option))
		];
	}

	// Function to get the description of an option
	function getOptionDescription(option: string): string {
		for (const resource of data.resources) {
			if (resource.details?.fields[option]) {
				return (
					resource.details.fields[option].field_details.description || 'No description available'
				);
			}
		}
		return 'No description available';
	}

	// Functions to handle item removal and clearing selections
	function handleRemove(category: string, item: string) {
		if (category === 'attributes') {
			selectedAttributes = selectedAttributes.filter((attr) => attr !== item);
		} else if (category === 'segments') {
			selectedSegments = selectedSegments.filter((seg) => seg !== item);
		} else if (category === 'metrics') {
			selectedMetrics = selectedMetrics.filter((metric) => metric !== item);
		}
	}

	function clearAll() {
		selectedAttributes = [];
		selectedSegments = [];
		selectedMetrics = [];
	}

	function clearSection(section: 'attributes' | 'segments' | 'metrics') {
		if (section === 'attributes') selectedAttributes = [];
		if (section === 'segments') selectedSegments = [];
		if (section === 'metrics') selectedMetrics = [];
	}

	// Prepare options for each category
	$: attributeOptions = filterOptions(
		getAllOptions('attributes'),
		attributeSearch,
		selectedAttributes
	);
	$: segmentOptions = filterOptions(getAllOptions('segments'), segmentSearch, selectedSegments);
	$: metricOptions = filterOptions(getAllOptions('metrics'), metricSearch, selectedMetrics);
</script>

<!-- Main Container -->
<div class="flex min-h-screen bg-gray-100 dark:bg-gray-900 shadow-md">
	<!-- Sidebar -->
	<div class="w-1/4 bg-white dark:bg-gray-800">
		<div class="p-6">
			<div class="flex items-center justify-between mb-8">
				<h1 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
					Google Ads API Resource Finder
				</h1>
			</div>

			<!-- Attributes Section -->
			<OptionSelector
				title="Attributes"
				bind:selectedOptions={selectedAttributes}
				bind:searchTerm={attributeSearch}
				options={attributeOptions}
				placeholder="Search attributes..."
				clearSection={() => clearSection('attributes')}
				colorClass="text-blue-500 hover:text-blue-700"
				{getOptionDescription} />

			<!-- Segments Section -->
			<OptionSelector
				title="Segments"
				bind:selectedOptions={selectedSegments}
				bind:searchTerm={segmentSearch}
				options={segmentOptions}
				placeholder="Search segments..."
				clearSection={() => clearSection('segments')}
				colorClass="text-green-500 hover:text-green-700"
				{getOptionDescription} />

			<!-- Metrics Section -->
			<OptionSelector
				title="Metrics"
				bind:selectedOptions={selectedMetrics}
				bind:searchTerm={metricSearch}
				options={metricOptions}
				placeholder="Search metrics..."
				clearSection={() => clearSection('metrics')}
				colorClass="text-red-500 hover:text-red-700"
				{getOptionDescription} />
		</div>
	</div>

	<!-- Main Content -->
	<div class="flex-1 p-8 flex flex-col">
		<!-- Selected Items -->
		<SelectedItems
			{selectedAttributes}
			{selectedSegments}
			{selectedMetrics}
			{handleRemove}
			{clearAll} />

		<!-- Matching Resources -->
		<ResourceList {filteredResources} />
	</div>
</div>
