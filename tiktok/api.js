const db = require("../models/connection")
const apify = require("apify-client")
const fs = require('fs')
const itemsArray = []
require('dotenv').config()

const client = new apify.ApifyClient({
    token : process.env.APIFY
})

const getAlltiktok_data = (req,res ) => {
    const sql = "SELECT * FROM tiktok_data"
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching tiktok_data",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "tiktok_data not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        total_followers : data.total_followers,
                        total_likes : data.total_likes,
                        last_post : JSON.parse(data.last_post)
                    },
                    "message" : "success"
                }))
                res.json(formattedData)
        }
        }      
    })
}

const posttiktok_data = (req,res) => {
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
        const follower = itemsArray[0]["authorMeta"]["fans"]
        const likes = itemsArray[0]["authorMeta"]["heart"]
        const sql = "INSERT INTO tiktok_data ( total_followers, total_likes, last_post) VALUES (?, ?, ?)"
        const itemsArrayJson = JSON.stringify(itemsArray);
        const value = [follower, likes,itemsArrayJson]

        // const result = [{
        //     "Total Followers" : itemsArray[0]["authorMeta"]["fans"],
        //     "Total Likes" : itemsArray[0]["authorMeta"]["heart"],
        //     "Total Videos" : itemsArray[0]["authorMeta"]["video"],
        //     "Detail Videos" : itemsArray
        // }]

        db.query(sql, value, (error, result) => {
            if (error) {
                res.status(500).json({
                    message: "Error inserting tiktok_data",
                    error: error
                });
            } else {
                res.json({
                    message: "Success",
                    tiktok_dataId: result.insertId
                });
            }
        })
    })();
}


module.exports = {
    getAlltiktok_data,
    posttiktok_data
}