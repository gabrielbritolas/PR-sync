const fs = require('fs');

module.exports = {

    CompactRepo: async () => {
        fs.readdirSync(process.env.GITHUB_WORKSPACE).forEach(file => {
            console.log("GITHUB_WORKSPACE", file);
        });
        fs.readdirSync(process.env.GITHUB_ENV).forEach(file => {
            console.log("GITHUB_ENV", file);
        });
    }

}