const rpn = require("request-promise-native");
const auth_uri = "https://github.com/login/oauth/access_token";
//提供自己github应用id和secret
const { CLIENT_ID, CLIENT_SECRET } = require("./secret.js");
/**
 * 用token换取头像信息
 * @param {*} token
 */
exports.rpnGetUserInfo = (token) => {
    return rpn({
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
            "User-Agent": "blog",
            Authorization: `token ${token}`
        },
        json: true
    });
};
/**
 *
 * 获取token
 * @param {*} code
 */
exports.rpnToken = (code) => {
    return rpn({
        method: "POST",
        url: auth_uri,
        body: {
            client_id,
            client_secret,
            code
        },
        json: true
    });
};
