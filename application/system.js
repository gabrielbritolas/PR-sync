const fs = require('fs');
const core = require('@actions/core');
const io = require('@actions/io');
const clone = require('git-clone/promise');
const github = require('@actions/github');
const logger = require('../utils/logger');
const request = require('./request');
const { zip } = require('zip-a-folder');
const colors = require('colors');

module.exports = {

    CloneRepo: async (user, token, dir) => {
        core.startGroup('Cloning the repo');

        const url = `https://${user}:${token}@${github.context.payload.repository.clone_url.replace(`https://`, "")}`;

        logger.Info(`Cloning the repo...`);
        await clone(url, dir);
        core.notice(`Cloned Repo!`);
        logger.Info(`Cloned!`);

        logger.Info(`Files:`);
        fs.readdirSync(dir).forEach(file => {
            console.log(file);
        });

        core.endGroup();
    },

    CompactDirectory: async (dir, outputDir, filename) => {
        core.startGroup('Compacting Directory...');
        await io.mkdirP(outputDir);
        const filePath = `${outputDir}/${filename}`;

        logger.Info(`Compacting Directory...`);
        await zip(dir, filePath);
        core.notice(`Created ${filePath}`);
        logger.Info(`Compacted to ${filePath}`);
        core.endGroup();
    },


    CommitDiscloud: async (appId, discloudToken, outputDir, filename) => {
        core.startGroup('Commiting to Discloud...');
        const filePath = `${outputDir}/${filename}`;

        logger.Info(`Commiting...`);
        const data = await request.CommitApp(appId, discloudToken, filePath);

        if (data.status == "ok") {
            core.notice(`Commited to Discloud!`);
            logger.Info(colors.bold.magenta(`Commited to Discloud!`));
        } else {
            console.log(data);
            core.setFailed(`Commited status not "ok"`);
        }

        core.endGroup();
    },

    GetDiscloudInfo: async (appId, discloudToken) => {
        core.startGroup('Get Bot Info via API');
        const data = await request.GetAppInfo(appId, discloudToken);
        if (data && data.status == "ok") {
            logger.LogBotInfo(data);
            core.notice(`Bot name: ${data.apps.name}`);

            const status = await request.GetAppStatus(appId, discloudToken);
            if (status)
                logger.LogBotStatus(status);

            core.endGroup();
            return data.apps;
        } else {
            core.setFailed("Bot not found!");
            core.endGroup();
            return null;
        }
    }

}