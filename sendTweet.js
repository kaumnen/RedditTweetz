import { makeTweet } from './askReddit.js';
import { makeReplies } from './askRedditComments.js';
import "dotenv/config";
import { TwitterApi } from "twitter-api-v2";

async function sendTweet(subredditName, twitterClient) {
    let topPost = await makeTweet(subredditName);
    let replies = await makeReplies(subredditName);

    replies.unshift(topPost);

    twitterClient.v2.tweetThread(replies).then(console.log(`Success for ${subredditName}`));
}

export async function tweetIt() {
    
    let subreddits = ["askReddit", "explainlikeimfive", "LifeProTips", "AskMen", "askscience", "AskWomen"];

    const client = new TwitterApi({
        appKey: process.env.TWITTER_CONSUMER_KEY,
        appSecret: process.env.TWITTER_CONSUMER_SECRET,
        accessToken: process.env.TWITTER_ACCESS_KEY,
        accessSecret: process.env.TWITTER_ACCESS_SECRET
    });

    const rwClient = client.readWrite;

    for(let subreddit of subreddits) {
        sendTweet(subreddit, rwClient);
    };
};