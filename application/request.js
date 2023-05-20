
const axios = require('axios');

const URL_INFO = `https://api.discloud.app/v2/app/{appId}`;
const URL_STATUS = `https://api.discloud.app/v2/app/{appId}/status`;


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
            return response.data;
        }
        else {
            if (errResponse)
                console.error(errResponse.data);
        }

        return null;
    },

    GetAppStatus: async (appId, token) => {
        const url = resolveURL(URL_STATUS, { appId: appId });

        let errResponse = null;
        const response = await axios.request({
            url: url,
            timeout: 1000 * 20,
            method: "get",
            headers: { 'api-token': token }
        }).catch((error) => {
            errResponse = error.response;
        });

        if (response && response.data && response.data.apps) {
            return response.data.apps;
        }
        else {
            if (errResponse)
                console.error(errResponse.data);
        }

        return null;
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