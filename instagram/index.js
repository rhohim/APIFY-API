const apify = require("apify-client")
const fs = require('fs')
const itemsArray = []
const dataArray = []

const client = new apify.ApifyClient({
    token : 'apify_api_bhrNQzFP0PrgO224texPGqbJM8dcgC0LNsrA'
})

const input = {
    "directUrls": [
        "https://www.instagram.com/cretivox/"
    ],
    "resultsType": "details",
    "resultsLimit": 10,
    "searchType": "hashtag",
    "searchLimit": 1,
    "addParentData": false,
    "searchType": "hashtag"
};

const input2 = {
    "directUrls": [
        "https://www.instagram.com/cretivox/"
    ],
    "resultsType": "posts",
    "resultsLimit": 10,
    "searchType": "hashtag",
    "searchLimit": 1,
    "addParentData": false,
    "searchType": "hashtag",
    "enhanceUserSearchWithFacebookPage": false,
    "onlyPostsNewerThan": "2024-07-01"
};

(async () => {
    // Run the Actor and wait for it to finish
    const run = await client.actor("shu8hvrXbJbY3Eb9W").call(input);
    const run2 = await client.actor("shu8hvrXbJbY3Eb9W").call(input2);

    // Fetch and print Actor results from the run's dataset (if any)
    console.log('Results from dataset');
    const { items: detailsItems } = await client.dataset(run.defaultDatasetId).listItems();
        detailsItems.forEach((item) => {
            console.dir(item);
            itemsArray.push(item);
        });

    const { items: postsItems } = await client.dataset(run2.defaultDatasetId).listItems();
        postsItems.forEach((item) => {
            console.dir(item);
            dataArray.push(item);
    });
    // const { items } = await client.dataset(run.defaultDatasetId).listItems();
    // items.forEach((item) => {
    //     console.dir(item);
    //     itemsArray.push(item)
    // });

    // const { items2 } = await client.dataset(run2.defaultDatasetId).listItems();
    // items2.forEach((itemm) => {
    //     console.dir(itemm);
    //     dataArray.push(itemm)
    // });

    const result = [{
        "Total Followers" : itemsArray[0]["followersCount"],
        "Total Post" : itemsArray[0]["postsCount"],
        "Detail Post" : dataArray
    }]
    const jsonString = JSON.stringify(result, null, 2);
    fs.writeFile('output.json', jsonString, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Successfully wrote to output.json');
        }
    })
})();