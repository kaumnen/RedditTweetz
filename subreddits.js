import "dotenv/config";
import snoowrap from "snoowrap";

export async function getPosts() {
    const redditAPI = new snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD
    });
    
    //get top posts from subreddit
    const subreddit = await redditAPI.getSubreddit("askReddit");
    const topPosts = await subreddit.getTop({time: "week", limit: 7});
    
    let postsData = [];
    
    topPosts.forEach((post) => {
        postsData.push({
          link: post.url,
          text: post.title,
          score: post.score,
          id: post.id
        })
      });
    
    return postsData;
};