import "dotenv/config";
import snoowrap from "snoowrap";

export async function getHotPost() {
    const redditAPI = new snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD
    });

    let topPost = await redditAPI.getSubreddit("askReddit").getHot({limit: 1});
    return topPost[0];
}

export async function makeTweet() {
    let topPost = await getHotPost();
    
    let hottestPostObject = {
      user: topPost.author.name,
      link: topPost.url,
      text: topPost.title,
      score: topPost.score,
      id: topPost.id
    };

    let readyPost = `⬆️ ${hottestPostObject.score}  👉 ${hottestPostObject.user} asked: \n\n⚡${hottestPostObject.text} ${hottestPostObject.link}`;
    return readyPost;
};