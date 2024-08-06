const apify = require("apify-client")
const fs = require('fs')
const itemsArray = []

const client = new apify.ApifyClient({
    token : 'apify_api_bhrNQzFP0PrgO224texPGqbJM8dcgC0LNsrA'
})

const input = {
    "profiles": [
    "cretivox"
    ],
    "resultsPerPage": 5, //total video that want to scrape
    "scrapeLastNDays": 30,
    // "maxProfilesPerQuery": 10,
    "shouldDownloadVideos": false,
    "shouldDownloadCovers": false,
    "shouldDownloadSubtitles": false,
    "shouldDownloadSlideshowImages": false
};

(async () => {
    // Run the Actor and wait for it to finish
    const run = await client.actor("OtzYfK1ndEGdwWFKQ").call(input);

    // Fetch and print Actor results from the run's dataset (if any)
    console.log('Results from dataset');
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    items.forEach((item) => {
        itemsArray.push(item)
        // console.dir(item);
    });
    const result = [{
        "Total Followers" : itemsArray[0]["authorMeta"]["fans"],
        "Total Likes" : itemsArray[0]["authorMeta"]["heart"],
        "Total Videos" : itemsArray[0]["authorMeta"]["video"],
        "Detail Videos" : itemsArray
    }]
    const jsonString = JSON.stringify(result, null, 2);
    fs.writeFile('output.json', jsonString, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Successfully wrote to output.json');
        }
    });
})();
