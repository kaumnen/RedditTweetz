import "dotenv/config";
import snoowrap from "snoowrap";
import { getPosts } from "./subreddits.js";

export async function getComments(){
    const redditAPI = new snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD
    });

    //get top posts from subreddit
    const posts = await getPosts();

    let comments = [];

    for(const post of posts){
        const temp = await redditAPI.getSubmission(`${post.id}`).comments.fetchMore({sort: "top", amount: 1}).slice(0, 5);
        comments.push(temp);
    };

    return comments;
};