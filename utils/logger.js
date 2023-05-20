const colors = require('colors');
const core = require('@actions/core');

module.exports = {
    Info: (text) => {
        core.info(`ℹ️ ${colors.bold.blue(`INFO`)}: ${text}`);
    },
}