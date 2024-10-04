<script lang="ts">
	import type { Resource } from '$lib/types';
	export let filteredResources: Resource[];
</script>

<h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
	Matching Resources ({filteredResources.length})
</h2>
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
