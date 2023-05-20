const core = require('@actions/core');
const github = require('@actions/github');
const request = require("./application/request.js");

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
    try {
        const discloudToken = core.getInput('discloudToken');
        const appId = core.getInput('appId');

        core.startGroup('Get Bot Info');
        const data = await request.GetAppInfo(appId, discloudToken);
        if (data) {
            core.notice('Bot Info Found!');
            core.info(`INFO: Bot Info Found!`);
        } else
            core.setFailed("Bot não encontrado");

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