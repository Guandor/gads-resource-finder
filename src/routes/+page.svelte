<script lang="ts">
	export let data;

	let selectedAttributes: string[] = [];
	let selectedSegments: string[] = [];
	let selectedMetrics: string[] = [];

	let attributeSearch = '';
	let segmentSearch = '';
	let metricSearch = '';

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

	function getAllOptions(category: 'attributes' | 'segments' | 'metrics'): string[] {
		return Array.from(
			new Set(data.resources.flatMap((resource) => resource.details?.[category] || []))
		).sort();
	}

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

	function getAttributeDescription(attribute: string): string {
		for (const resource of data.resources) {
			if (resource.details?.fields[attribute]) {
				return (
					resource.details.fields[attribute].field_details.description || 'No description available'
				);
			}
		}
		return 'No description available';
	}

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
</script>

<h1 class="text-3xl text-center font-semibold mb-8 text-gray-800">
	Google Ads API - Resource Finder
</h1>

<div class="mb-8 bg-white shadow-lg rounded-lg p-6 min-h-48 border border-gray-200">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-2xl font-semibold text-gray-700">Selected Items</h2>
		<button
			on:click={clearAll}
			class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
			Clear All
		</button>
	</div>
	<div class="flex flex-wrap gap-2">
		{#each selectedAttributes as attr}
			<span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center text-sm">
				{attr}
				<button
					on:click={() => handleRemove('attributes', attr)}
					class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none">
					&times;
				</button>
			</span>
		{/each}
		{#each selectedSegments as seg}
			<span class="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center text-sm">
				{seg}
				<button
					on:click={() => handleRemove('segments', seg)}
					class="ml-2 text-green-600 hover:text-green-800 focus:outline-none">
					&times;
				</button>
			</span>
		{/each}
		{#each selectedMetrics as metric}
			<span class="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center text-sm">
				{metric}
				<button
					on:click={() => handleRemove('metrics', metric)}
					class="ml-2 text-red-600 hover:text-red-800 focus:outline-none">
					&times;
				</button>
			</span>
		{/each}
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
	<div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-2xl font-semibold text-gray-700">
				Attributes ({selectedAttributes.length})
			</h2>
			<button
				on:click={() => clearSection('attributes')}
				class="text-blue-500 hover:text-blue-700 transition duration-300 ease-in-out focus:outline-none">
				Clear
			</button>
		</div>
		<input
			type="text"
			bind:value={attributeSearch}
			placeholder="Search attributes..."
			class="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300" />
		<div class="max-h-80 overflow-y-auto">
			{#each filterOptions(getAllOptions('attributes'), attributeSearch, selectedAttributes) as attribute}
				<label
					class="flex items-start mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
					title={getAttributeDescription(attribute)}>
					<input
						type="checkbox"
						bind:group={selectedAttributes}
						value={attribute}
						class="mr-3 form-checkbox h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
					<span>{attribute}</span>
				</label>
			{/each}
		</div>
	</div>

	<div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-2xl font-semibold text-gray-700">Segments ({selectedSegments.length})</h2>
			<button
				on:click={() => clearSection('segments')}
				class="text-green-500 hover:text-green-700 transition duration-300 ease-in-out focus:outline-none">
				Clear
			</button>
		</div>
		<input
			type="text"
			bind:value={segmentSearch}
			placeholder="Search segments..."
			class="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-300" />
		<div class="max-h-80 overflow-y-auto">
			{#each filterOptions(getAllOptions('segments'), segmentSearch, selectedSegments) as segment}
				<label
					class="flex items-start mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
					title={getAttributeDescription(segment)}>
					<input
						type="checkbox"
						bind:group={selectedSegments}
						value={segment}
						class="mr-3 form-checkbox h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
					<span>{segment}</span>
				</label>
			{/each}
		</div>
	</div>

	<div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-2xl font-semibold text-gray-700">Metrics ({selectedMetrics.length})</h2>
			<button
				on:click={() => clearSection('metrics')}
				class="text-red-500 hover:text-red-700 transition duration-300 ease-in-out focus:outline-none">
				Clear
			</button>
		</div>
		<input
			type="text"
			bind:value={metricSearch}
			placeholder="Search metrics..."
			class="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-300" />
		<div class="max-h-80 overflow-y-auto">
			{#each filterOptions(getAllOptions('metrics'), metricSearch, selectedMetrics) as metric}
				<label
					class="flex items-start mb-2 hover:bg-gray-100 p-2 rounded-md cursor-pointer"
					title={getAttributeDescription(metric)}>
					<input
						type="checkbox"
						bind:group={selectedMetrics}
						value={metric}
						class="mr-3 form-checkbox h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
					<span>{metric}</span>
				</label>
			{/each}
		</div>
	</div>
</div>

<div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
	<h2 class="text-2xl font-semibold mb-4 text-gray-700">
		Matching Resources ({filteredResources.length})
	</h2>
	{#if filteredResources.length > 0}
		<ul class="max-h-60 overflow-y-auto">
			{#each filteredResources as resource}
				<li class="mb-2 p-2 hover:bg-gray-100 rounded-md">
					<a
						href={resource.url}
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:underline">
						{resource.name}
					</a>
					<p class="text-sm text-gray-600">{resource.description}</p>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="text-gray-600">No resources match the selected criteria.</p>
	{/if}
</div>
