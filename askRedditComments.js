import "dotenv/config";
import snoowrap from "snoowrap";
import { getTopPost } from "./askReddit.js";

export async function makeReplies(subredditName){
    const redditAPI = new snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD
    });

    //get top posts from subreddit
    const post = await getTopPost(subredditName);

    //get comments and assign needed information to an object
    let commentObjects = [];

    //format every comment in the array
    let commentArray =  [];

    const comments = await redditAPI.getSubmission(`${post.id}`).comments.fetchMore({sort: "top", amount: 1}).slice(0, 5);
    
    comments.forEach(comment => {
        commentObjects.push({
            author: comment.author.name,
            text: comment.body.length <= 120 ? comment.body : comment.body.substring(0, 117) + "...",
            score: comment.score,
            link: "https://reddit.com" + comment.permalink
        });
    });

    commentObjects.forEach(comment => {
        let tweet = `⬆️ ${comment.score}  👉 ${comment.author} commented:\n\n⭐${comment.text}`;
        commentArray.push(tweet);
    });

    return commentArray;
};