<script lang="ts">
	export let title: string;
	export let options: string[];
	export let selectedOptions: string[];
	export let searchTerm: string;
	export let placeholder: string;
	export let colorClass: string;
	export let clearSection: () => void;
	export let getOptionDescription: (option: string) => string;

	function handleSelection(option: string, checked: boolean) {
		if (checked) {
			selectedOptions = [...new Set([...selectedOptions, option])];
		} else {
			selectedOptions = selectedOptions.filter((item) => item !== option);
		}
	}

	function handleChange(e: Event, option: string) {
		const target = e.target as HTMLInputElement;
		handleSelection(option, target.checked);
	}
</script>

<div class="mb-8">
	<div class="flex justify-between items-center mb-2">
		<h2 class="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</h2>
		<button on:click={clearSection} class="text-sm {colorClass} focus:outline-none"> Clear </button>
	</div>
	<input
		type="text"
		bind:value={searchTerm}
		{placeholder}
		class="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200" />
	<div class="max-h-56 overflow-y-auto pr-2">
		{#each options as option}
			<label
				class="flex items-center mb-1 p-1 rounded hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
				title={getOptionDescription(option)}>
				<input
					type="checkbox"
					checked={selectedOptions.includes(option)}
					on:change={(e) => handleChange(e, option)}
					class="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 flex-shrink-0" />
				<span class="text-sm text-gray-700 dark:text-gray-200">{option}</span>
			</label>
		{/each}
	</div>
</div>
