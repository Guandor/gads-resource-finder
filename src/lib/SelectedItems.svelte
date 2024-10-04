<script lang="ts">
	export let selectedAttributes: string[];
	export let selectedSegments: string[];
	export let selectedMetrics: string[];
	export let handleRemove: (category: string, item: string) => void;
	export let clearAll: () => void;
</script>

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
			<!-- Selected Attributes -->
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
			<!-- Selected Segments -->
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
			<!-- Selected Metrics -->
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
