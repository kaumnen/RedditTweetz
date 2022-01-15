import "dotenv/config";
import snoowrap from "snoowrap";

export async function getPost() {
    const redditAPI = new snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD
    });
    
    let topPost = await redditAPI.getSubreddit("askReddit").getHot({limit: 1});
    
    let hottestPostNow = {
      user: topPost[0].author.name,
      link: topPost[0].url,
      text: topPost[0].title,
      score: topPost[0].score,
      id: topPost[0].id
  };

    return hottestPostNow;
};