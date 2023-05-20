const core = require('@actions/core');
const github = require('@actions/github');
const request = require("./application/request.js");
const logger = require("./utils/logger.js");
const colors = require('colors');
const { default: chalk } = require('chalk');


// import { zip, COMPRESSION_LEVEL } from 'zip-a-folder';
// import { fs } from 'fs';

// class TestMe {
//     static async main() {
//         const customWS = fs.createWriteStream('test/1234.zip');
//         await zipafolder.zip(path.resolve(__dirname, 'data/'), undefined, {customWriteStream: customWS});    
//     }
// }

// TestMe.main();


async function Execute() {
    colors.enable();


    chalk.enabled = true;
    chalk.level = 3;
    process.env.FORCE_COLOR = 1;
    try {
        const discloudToken = core.getInput('discloudToken');
        const appId = core.getInput('appId');

        logger.Info(chalk`{bold.magenta Chalk} aaaaa!`);

        core.startGroup('Get Bot Info via API');
        const data = await request.GetAppInfo(appId, discloudToken);
        if (data) {
            //core.notice(`Bot information ${colors.green(`Found`)}!`);
            logger.Info(`Bot informations ${colors.bold.green(`Found`)}! ${colors.bold.white}`);
            logger.Info(chalk`{bold.magenta Chalk}!`);
        } else
            core.setFailed("Bot not found!");

        core.endGroup();

        core.info(`Fim!`);
    } catch (error) {
        core.setFailed(error.message);
    }
}


Execute();






// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }