const core = require('@actions/core');
const github = require('@actions/github');
const request = require("./application/request.js");
const logger = require("./utils/logger.js");
const colors = require('colors');
const system = require('./application/system.js');

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


    try {
        const discloudToken = core.getInput('discloudToken');
        const appId = core.getInput('appId');
        const gitUser = core.getInput('gitUser');
        const gitToken = core.getInput('gitToken');

        core.startGroup('Get Bot Info via API');
        const data = await request.GetAppInfo(appId, discloudToken);
        if (data && data.status == "ok") {
            logger.LogBotInfo(data);
            core.notice(`Bot name: ${data.apps.name}`);

            const status = await request.GetAppStatus(appId, discloudToken);
            if (status)
                logger.LogBotStatus(status);

            core.endGroup();
        } else{
            core.setFailed("Bot not found!");
            core.endGroup();
            return;
        }
            
       

        await system.CloneRepo(gitUser, gitToken);


        core.info(colors.bold.green(`## Process Finished! ##`));
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