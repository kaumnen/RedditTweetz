import { makeTweet } from './askReddit.js';
import { makeReplies } from './askRedditComments.js';
import "dotenv/config";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_KEY,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
});

const rwClient = client.readWrite;

let askRedditHottest = await makeTweet();
let askRedditComments = await makeReplies();

askRedditComments.unshift(askRedditHottest);

rwClient.v2.tweetThread(askRedditComments).then(console.log("let gooo!"));