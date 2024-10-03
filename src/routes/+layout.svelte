<script>
	import '../app.css';
</script>

<svelte:head>
	<title>Google Ads API Resource Finder</title>
	<meta
		name="description"
		content="Find and explore Google Ads API resources easily with this interactive tool." />
	<meta name="keywords" content="Google Ads API, Resource Finder, Attributes, Segments, Metrics" />
	<meta name="author" content="Deniz Algin" />
	<meta property="og:title" content="Google Ads API Resource Finder" />
	<meta
		property="og:description"
		content="Interactive tool for exploring Google Ads API resources, attributes, segments, and metrics." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://gads-resource-finder.vercel.app/" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Google Ads API Resource Finder" />
	<meta
		name="twitter:description"
		content="Explore Google Ads API resources with ease using this interactive tool." />
</svelte:head>

<main class="px-4 md:px-10 mx-auto max-w-screen-2xl text-sm pt-4 dark:text-gray-100">
	<slot />

	<div class="bg-white shadow-md p-6 mt-8 dark:bg-gray-800">
		<p>
			Made by <a href="https://denizalgin.com/">Deniz</a> 🧙‍♂️ - Open source at
			<a href="https://github.com/Guandor/gads-resource-finder">Github</a> 💻 - Last update at {new Date().toLocaleDateString(
				'en-GB'
			)}
		</p>
	</div>
</main>
