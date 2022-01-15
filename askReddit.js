import "dotenv/config";
import snoowrap from "snoowrap";

export async function getTopPost(subreddit) {
    const redditAPI = new snoowrap({
        userAgent: 'reddit-bot-example-node',
        clientId: process.env.REDDIT_CLIENT_ID,
        clientSecret: process.env.REDDIT_CLIENT_SECRET,
        username: process.env.REDDIT_USERNAME,
        password: process.env.REDDIT_PASSWORD
    });


    let topPost = await redditAPI.getSubreddit(subreddit).getTop({limit: 1, time: "day"});
    return topPost[0];
}

export async function makeTweet(subredditName) {
    let topPost = await getTopPost(subredditName);
    
    let hottestPostObject = {
    subreddit: topPost.subreddit.display_name,
      user: topPost.author.name,
      link: topPost.url,
      text: topPost.title.length <= 130 ? topPost.title : topPost.title.substring(0, 127) + "...",
      score: topPost.score,
      id: topPost.id
    };

    let now = new Date();

    let readyPost = `⏰ ${now.getUTCFullYear()}-${now.getUTCMonth()}-${now.getUTCDate()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()} UTC ⏰\n🔝 Top post in r/${hottestPostObject.subreddit}\n\n⬆️ ${hottestPostObject.score}  👉 ${hottestPostObject.user} asked: \n\n⚡${hottestPostObject.text} ${hottestPostObject.link}`;
    return readyPost;
};