
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const URL_INFO = `https://api.discloud.app/v2/app/{appId}`;
const URL_STATUS = `https://api.discloud.app/v2/app/{appId}/status`;
const URL_COMMIT = `https://api.discloud.app/v2/app/{appId}/commit`;


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
    },

    CommitApp: async (appId, token, filePath) => {
        const url = resolveURL(URL_COMMIT, { appId: appId });

        const form = new FormData();
        form.append('file', fs.createReadStream(filePath));

        const request_config = {
            headers: {
                'api-token': token,
                ...form.getHeaders()
            }
        };

        const response = await axios.put(url, form, request_config);

        if (response && response.data && response.data.apps) {
            return response.data;
        }

        return null;
    },
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