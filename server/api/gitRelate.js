const rpn = require("request-promise-native");
const auth_uri = "https://github.com/login/oauth/access_token";
//提供自己github应用id和secret
const CLIENT_ID = process.env.GITHUB_CLIENT_ID
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET
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
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code
        },
        json: true
    });
};
