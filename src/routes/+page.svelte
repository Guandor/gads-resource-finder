<script lang="ts">
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

	// Function to get the description of an attribute
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
			<div class="mb-8">
				<div class="flex justify-between items-center mb-2">
					<h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Attributes</h2>
					<button
						on:click={() => clearSection('attributes')}
						class="text-sm text-blue-500 hover:text-blue-700 focus:outline-none">
						Clear
					</button>
				</div>
				<input
					type="text"
					bind:value={attributeSearch}
					placeholder="Search attributes..."
					class="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
				<div class="max-h-56 overflow-y-auto pr-2">
					{#each filterOptions(getAllOptions('attributes'), attributeSearch, selectedAttributes) as attribute}
						<label
							class="flex items-center mb-1 p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
							title={getAttributeDescription(attribute)}>
							<input
								type="checkbox"
								bind:group={selectedAttributes}
								value={attribute}
								class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 flex-shrink-0" />
							<span class="text-sm text-gray-700 dark:text-gray-200">
								{attribute}
							</span>
						</label>
					{/each}
				</div>
			</div>

			<!-- Segments Section -->
			<div class="mb-8">
				<div class="flex justify-between items-center mb-2">
					<h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Segments</h2>
					<button
						on:click={() => clearSection('segments')}
						class="text-sm text-green-500 hover:text-green-700 focus:outline-none">
						Clear
					</button>
				</div>
				<input
					type="text"
					bind:value={segmentSearch}
					placeholder="Search segments..."
					class="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
				<div class="max-h-56 overflow-y-auto pr-2">
					{#each filterOptions(getAllOptions('segments'), segmentSearch, selectedSegments) as segment}
						<label
							class="flex items-center mb-1 p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
							title={getAttributeDescription(segment)}>
							<input
								type="checkbox"
								bind:group={selectedSegments}
								value={segment}
								class="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 flex-shrink-0" />
							<span class="text-sm text-gray-700 dark:text-gray-200">
								{segment}
							</span>
						</label>
					{/each}
				</div>
			</div>

			<!-- Metrics Section -->
			<div>
				<div class="flex justify-between items-center mb-2">
					<h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">Metrics</h2>
					<button
						on:click={() => clearSection('metrics')}
						class="text-sm text-red-500 hover:text-red-700 focus:outline-none">
						Clear
					</button>
				</div>
				<input
					type="text"
					bind:value={metricSearch}
					placeholder="Search metrics..."
					class="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-300 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
				<div class="max-h-56 overflow-y-auto pr-2">
					{#each filterOptions(getAllOptions('metrics'), metricSearch, selectedMetrics) as metric}
						<label
							class="flex items-center mb-1 p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
							title={getAttributeDescription(metric)}>
							<input
								type="checkbox"
								bind:group={selectedMetrics}
								value={metric}
								class="mr-2 h-4 w-4 text-red-600 focus:ring-red-500 flex-shrink-0" />
							<span class="text-sm text-gray-700 dark:text-gray-200">
								{metric}
							</span>
						</label>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="flex-1 p-8 flex flex-col">
		<!-- Selected Items -->
		<div class="mb-8 flex-shrink-0">
			<div class="flex justify-between items-center mb-4">
				<h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">Selected Items</h2>
				<button
					on:click={clearAll}
					class="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500">
					Clear All
				</button>
			</div>
			{#if selectedAttributes.length + selectedSegments.length + selectedMetrics.length > 0}
				<div class="flex flex-wrap gap-2">
					{#each selectedAttributes as attr}
						<span
							class="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-3 py-1 rounded-full flex items-center text-sm">
							{attr}
							<button
								on:click={() => handleRemove('attributes', attr)}
								class="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none">
								&times;
							</button>
						</span>
					{/each}
					{#each selectedSegments as seg}
						<span
							class="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 px-3 py-1 rounded-full flex items-center text-sm">
							{seg}
							<button
								on:click={() => handleRemove('segments', seg)}
								class="ml-2 text-green-600 hover:text-green-800 focus:outline-none">
								&times;
							</button>
						</span>
					{/each}
					{#each selectedMetrics as metric}
						<span
							class="bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100 px-3 py-1 rounded-full flex items-center text-sm">
							{metric}
							<button
								on:click={() => handleRemove('metrics', metric)}
								class="ml-2 text-red-600 hover:text-red-800 focus:outline-none">
								&times;
							</button>
						</span>
					{/each}
				</div>
			{:else}
				<p class="text-gray-600 dark:text-gray-300">
					No items selected. Please select from the options on the left.
				</p>
			{/if}
		</div>
		<h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
			Matching Resources ({filteredResources.length})
		</h2>
		<!-- Matching Resources -->
		<div class="bg-white dark:bg-gray-800 shadow-md rounded p-6 overflow-y-scroll max-h-screen">
			{#if filteredResources.length > 0}
				<ul class="space-y-4">
					{#each filteredResources as resource}
						<li class="p-4 bg-gray-50 dark:bg-gray-700 rounded hover:ring">
							<a
								href={resource.url}
								target="_blank"
								rel="noopener noreferrer"
								class="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
								{resource.name}
							</a>
							<p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
								{resource.description}
							</p>
						</li>
					{/each}
				</ul>
			{:else}
				<p class="text-gray-600 dark:text-gray-300">No resources match the selected criteria.</p>
			{/if}
		</div>
	</div>
</div>

<style>
	/* Custom scrollbar styling */
	::-webkit-scrollbar {
		width: 8px;
	}

	::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>
