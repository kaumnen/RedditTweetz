import "dotenv/config";
import snoowrap from "snoowrap";
import * as twitterText from "twitter-text"
import { getHotPost } from "./askReddit.js";

export async function makeReplies(){
    const redditAPI = new snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD
    });

    //get top posts from subreddit
    const post = await getHotPost();

    //get comments and assign needed information to an object
    let commentObjects = [];

    //format every comment in the array
    let commentArray =  [];

    const comments = await redditAPI.getSubmission(`${post.id}`).comments.fetchMore({sort: "top", amount: 1}).slice(0, 5);
    
    comments.forEach(comment => {
        commentObjects.push({
            author: comment.author.name,
            text: comment.body,
            score: comment.score,
            link: comment.link_permalink
        });
    });

    commentObjects.forEach(comment => {
        let tweet = `⬆️ ${comment.score}  👉 ${comment.author} commented:\n\n⭐${comment.text}\n\n${comment.link}`;
        let tweetLength = tweet.length;
        if(tweetLength < 280) {    
             commentArray.push(tweet);
        };
    });

    return commentArray;
};