# Google Ads API Resource Finder

This project is a web application that helps users find and filter resources from the Google Ads API. Google Ads API is notoriously complicated and it has lots of tables that contain different dimensions and metrics. However, the documentation does not help to find which tables contain the required dimensions and metrics. With this app, instead of choosing tables first, you can choose dimensions and metrics and see which tables support your selection.

If you want to see it live, you can see it [here.](https://gads-resource-finder.pages.dev/)

## How it works

1. The application fetches data from the Google Ads API documentation, including resource names, descriptions, attributes, segments, and metrics.
2. Users can select attributes, segments, and metrics from separate lists.
3. As users make selections, the application filters the resource tables in real-time, showing only those that match all selected criteria.
4. Users can search within each category (attributes, segments, metrics) to find specific items quickly.
5. The list of matching resources updates dynamically, displaying resource names, descriptions, and links to the official documentation.

## Key Components

- `+page.server.ts`: Handles data fetching from the Google Ads API and processes the raw data into a usable format.
- `+page.svelte`: Contains the user interface and client-side logic for filtering and displaying resources.

## Deployment

It's currently hosted at Cloudflare as [a static page](https://gads-resource-finder.pages.dev/). The API fields are scraped at build time, and served as static HTML so that the app does not require a database. This repo contains a resources.json file in case the remote data source becomes unavailable in the future.  Set `use_local_data_source` environment variable to `true` if you want the app use the saved resource file instead of scraping new data. 

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Open your browser and navigate to `http://localhost:5173`

## Contributing

Contributions are welcome! If you'd like to contribute, please feel free to submit a pull request or open an issue.





