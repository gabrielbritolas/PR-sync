const colors = require('colors');
const core = require('@actions/core');

module.exports = {
    Info: (text) => {
        core.info(`ℹ️ ${colors.bold.blue(`INFO`)}: ${text}`);
    },



    LogBotInfo: (bot) => {
        let strLog = `Bot informations ${colors.bold.green(`Found`)}!`;

        strLog += AppendLogInfo("Status", bot.status, "green");

        strLog += AppendLogInfo("Bot ID", bot.apps.id, "magenta");
        strLog += AppendLogInfo("Bot Name", bot.apps.name, "yellow");
        strLog += AppendLogInfo("Ram", bot.apps.ram, "blue");
        strLog += AppendLogInfo("Language", bot.apps.lang, "cyan");

        module.exports.Info(strLog);
    },

    LogBotStatus: (status) => {
        let strLog = `Bot Status ${colors.bold.green(`Found`)}!`;

        if (status.container == "online")
            strLog += AppendLogInfo("Container", status.container, "green");
        else
            strLog += AppendLogInfo("Container", status.container, "red");

        strLog += AppendLogInfo("CPU", status.cpu, "blue");
        strLog += AppendLogInfo("RAM", status.memory, "cyan");
        strLog += AppendLogInfo("SSD", status.ssd, "yellow");

        strLog += AppendLogInfo("Last Restart", status.last_restart, "green");

        module.exports.Info(strLog);
    },
}


function AppendLogInfo(title, value, color, append = true) {
    let strLog = ``;

    if (append)
        strLog += `${colors.bold.white(`,`)}`;

    strLog += ` ${colors.bold.white(`${title}:`)}`;

    colors.setTheme({
        custom: [color, 'bold']
    });

    strLog += ` ${colors.custom(`${value}`)}`;

    return strLog;
}