import { tweetIt } from './sendTweet.js';

tweetIt();
setInterval(tweetIt, 1000 * 60 * 60 * 24);