<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Google Ads API Resource Finder</title>
</svelte:head>

<main class="px-4 md:px-10 mx-auto max-w-screen-2xl text-sm pt-4">
	<slot />

	<div class="bg-white shadow-lg rounded-lg p-6 border border-gray-200 mt-8">
		<p>
			Made by <a href="https://denizalgin.com/">Deniz</a> 🧙‍♂️ - Open source at
			<a href="https://github.com/Guandor/gads-resource-finder">Github</a> 💻 - Last update at {new Date().toLocaleDateString(
				'en-GB'
			)}
		</p>
	</div>
</main>
