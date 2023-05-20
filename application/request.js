
const axios = require('axios');

const URL_INFO = `https://api.discloud.app/v2/app/{appId}`;


module.exports = {
    GetAppInfo: async (appId, token) => {
        const url = resolveURL(URL_INFO, { appId: appId });

        let errResponse = null;
        const response = await axios.request({
            url: url,
            timeout: 1000 * 20,
            method: "get",
            headers: { 'api-token': token }
        }).catch((error) => {
            errResponse = error.response;
        });

        if (response && response.data) {
            console.log(response.data);
        }
        else {
            if (errResponse)
                console.error(errResponse.data);
        }
    }
}

function resolveURL(urlBase, param) {
    let url = urlBase;
    for (const key in param) {
        if (Object.hasOwnProperty.call(param, key)) {
            const prop = param[key];
            url = url.replace(RegExp(`{${key}}`, "g"), prop);
        }
    }

    return url;
}