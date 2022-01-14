require("dotenv").config();
const snoowrap = require("snoowrap");

const redditAPI = new snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    username: process.env.REDDIT_USERNAME,
    password: process.env.REDDIT_PASSWORD
});