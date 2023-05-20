const fs = require('fs');
const clone = require('git-clone/promise');
const github = require('@actions/github');
const logger = require('../utils/logger');

module.exports = {

    CloneRepo: async (user, token) => {
        const url = `https://${user}:${token}@${github.context.payload.repository.clone_url.replace(`https://`, "")}`;
        logger.Info(`URL: ${url}`);

        //await clone(url, )
    },

    CompactRepo: async () => {

        fs.readdirSync(process.env.GITHUB_ENV).forEach(file => {
            console.log("GITHUB_ENV", file);
        });
    }

}