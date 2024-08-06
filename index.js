import { ApifyClient } from 'apify-client';
import { createWriteStream,writeFile } from 'fs';
// const fs = require('fs');
const itemsArray = [];

// Initialize the ApifyClient with API token
const client = new ApifyClient({
    token: 'apify_api_bhrNQzFP0PrgO224texPGqbJM8dcgC0LNsrA',
});

// Prepare Actor input
const input = {
    "searchQueries": [
        "cretivox"
    ],
    "resultsPerPage": 2,
    "searchSection": "",
    "maxProfilesPerQuery": 10,
    "shouldDownloadVideos": false,
    "shouldDownloadCovers": false,
    "shouldDownloadSubtitles": false,
    "shouldDownloadSlideshowImages": false
};

const input2 = {
    "directUrls": [
        "https://www.instagram.com/humansofny/"
    ],
    "resultsType": "posts",
    "resultsLimit": 200,
    "searchType": "hashtag",
    "searchLimit": 1,
    "addParentData": false
};

// const input = {
//     "addParentData": false,
//     "directUrls": [
//         "https://www.instagram.com/cretivox/"
//     ],
//     "enhanceUserSearchWithFacebookPage": false,
//     "isUserTaggedFeedURL": false,
//     "resultsLimit": 10,
//     "resultsType": "details",
//     "searchLimit": 1,
//     "searchType": "hashtag"
// }


// (async () => {
//     // Run the Actor and wait for it to finish
//     const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input);

//     // Fetch and print Actor results from the run's dataset (if any)
//     console.log('Results from dataset');
//     const { items } = await client.dataset(run.defaultDatasetId).listItems();
//     items.forEach((item) => {
//         console.dir(item);
//     });
// })();


(async () => {
    try{
        // Run the Actor and wait for it to finish
        const run = await client.actor("OtzYfK1ndEGdwWFKQ").call(input);
        const filePath = 'results_tiktok.txt';
        const fileStream = createWriteStream(filePath, { flags: 'a' });

        const { items } = await client.dataset(run.defaultDatasetId).listItems();
        // items.forEach((item) => {
        //     console.dir(item);
        // });

        items.forEach((item) => {
            // fileStream.write(JSON.stringify(item) + '\n');
            itemsArray.push(item);
        });
        const jsonString = JSON.stringify(itemsArray, null, 2);

        (async () => {
            try {
                // Write the JSON string to a file
                await writeFile('output.json', jsonString);
                console.log('Successfully wrote to output.json');
            } catch (err) {
                console.error('Error writing to file', err);
            }
        })();

        // fileStream.end(() => {
        //     console.log(`Results have been saved to ${filePath}`);
        // });

        //instagram
        // const run2 = await client.actor("shu8hvrXbJbY3Eb9W").call(input2);
        // const filePath2 = 'results_instagram.txt';
        // const fileStream2 = createWriteStream(filePath2, { flags: 'a' });
        // // Fetch and print Actor results from the run's dataset (if any)
        // // console.log('Results from dataset');
        // const { items2 } = await client.dataset(run2.defaultDatasetId).listItems();

        // items2.forEach((itemm) => {
        //     console.dir(itemm)
        //     fileStream2.write(JSON.stringify(itemm) + '\n');
        // });

        // fileStream2.end(() => {
        //     console.log(`Results have been saved to ${filePath2}`);
        // });

    } catch (error) {
        console.error('Error:', error);
    }
    

})();



// Prepare Actor input
// const input = 
//   {
//     "directUrls": [
//         "https://www.instagram.com/cretivox/"
//     ],
//     "resultsType": "posts",
//     "resultsLimit": 2,
//     "searchType": "hashtag",
//     "searchLimit": 1,
//     "addParentData": false
// };


// (async () => {
//     // Run the Actor and wait for it to finish
//     const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input);

//     // Fetch and print Actor results from the run's dataset (if any)
//     console.log('Results from dataset');
//     const { items } = await client.dataset(run.defaultDatasetId).listItems();
//     items.forEach((item) => {
//         console.dir(item);
//     });
// })();
