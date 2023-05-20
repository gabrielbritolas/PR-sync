const fs = require('fs');
const clone = require('git-clone/promise');
const github = require('@actions/github');
const logger = require('../utils/logger');

module.exports = {

    CloneRepo: async (user, token) => {
        const url = `https://${user}:${token}@${github.context.payload.repository.clone_url.replace(`https://`, "")}`;

        await clone(url, './repo');

        fs.readdirSync('./repo').forEach(file => {
            console.log(file);
        });
    },

    CompactRepo: async () => {

        fs.readdirSync(process.env.GITHUB_ENV).forEach(file => {
            console.log("GITHUB_ENV", file);
        });
    }

}