/*
* @Author: RayLin
* @Date:   2017-07-08 17:12:33
* @Last Modified by:   RayLin
* @Last Modified time: 2017-08-15 12:04:44
*/

const casual = require('casual');
const config = require('../util/constants');

const URL = config.NIGHTWATCH_JS_URL;

const useceil = (min,max) => {
    return Math.ceil(Math.random()*(max-min+1)+min-1);
}

const waitTime = 1000;
const speakTime = 1300;
const times = 299;
const count = 99;

const sendMessage = (i, browser) => {
    let wtime = (speakTime * i) || speakTime;
    setTimeout(function() {
        const sentence = casual.sentence;

        browser
        .waitForElementVisible('#input-send-msg', 300000)
        .setValue('#input-send-msg', '小明說 ::: ' + sentence)
        .waitForElementVisible('#send-msg', 300000)
        .click('#send-msg')
    }, wtime);
};

const testCase = (browser) => {
    browser
    .windowSize('a', 500, 750)
    .url(URL)

    .waitForElementVisible("body", 60000)
    .pause(waitTime)
    .waitForElementVisible('li.js-fixedQA', 6000000)
    .pause(waitTime)
    .click(".chat-window-talk a.qlist-fixedbtn:nth-child(1)")
    .pause(waitTime)

    .perform(function(done) {
        console.log('test perform');
        // potentially other async stuff going on
        // on finished, call the done callback
        for (var i = 0; i < times; i++) {
            sendMessage(i, browser);
        }

        var doneTime = (speakTime * times) + 2000;
        setTimeout(function() {
            done();
        }, doneTime)
    })

    .setValue('#input-send-msg', 'Auto Test End  ')
    .setValue('#input-send-msg', ['just say good bye', browser.Keys.ENTER])
    .pause(6000)
    .click("#js-endtalk")
    .pause(waitTime)
    .waitForElementVisible('.lity-opened', 6000000)
    .pause(waitTime)

    .end()
};

const testCasePool = {};

for (let i = 0; i < count; i++) {
    const key = 'testCase' + (i + 1);
    testCasePool[key] = testCase;
}

// console.log(testCasePool);

module.exports = testCasePool;
