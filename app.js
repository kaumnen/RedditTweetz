import { scrapeSubreddit } from './subreddits.js';
import "dotenv/config";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
    appKey: process.env.TWITTER_CONSUMER_KEY,
    appSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_KEY,
    accessSecret: process.env.TWITTER_ACCESS_SECRET
});

const rwClient = client.readWrite;

const topPosts = await scrapeSubreddit();

rwClient.v2.tweet("Hello world!");

// for(let i = 0; i < 1; i++) {
//     rwClient.v2.tweet(`⚡${topPosts[i].text}⚡\n ${topPosts[i].score} upvotes so far! \n ${topPosts[i].link}`);
// }

// topPosts.forEach(post => {
//     rwClient.v2.tweet(`⚡${post.text}⚡\n ${post.score} upvotes so far! \n ${post.link}`);
// });