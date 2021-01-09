const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const { rpnGetUserInfo, rpnToken } = require("./api/gitRelate");
const db = require("./db/index");
const app = new Koa();
const router = new Router();

/**
 * get token
 */
router.post("/api/token", async (ctx, next) => {
    const code = ctx.request.body.code;
    const res = await rpnToken(code);
    if (res.error) {
        ctx.body = {
            errcode: 100,
            msg: res.error_description
        };
    } else {
        const token = res.access_token;
        const data = await rpnGetUserInfo(token);
        const { name, avatar_url } = data;
        ctx.body = {
            errcode: 0,
            data: {
                name,
                avatar_url
            }
        };
    }
    await next();
});

/**
 * post comment
 */
router.post("/api/comment", async (ctx, next) => {
    const { content, name, avatar_url } = ctx.request.body;
    if (content.length > 50) {
        ctx.body = {
            errcode: -1,
            msg: "comment length not expect 50"
        };
        return;
    }
    await db.save({
        content,
        name,
        avatar_url
    });
    ctx.body = {
        errcode: 0,
        data: {},
        msg: "save sccuss"
    };
    await next();
});

/**
 * 获取所有相关评论的信息
 */
router.get("/api/commentAll", async (ctx, next) => {
    const data = await db.query({});
    ctx.body = {
        errcode: 0,
        data
    };
    await next();
});

app.use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(async (ctx, next) => {
        ctx.set("Access-Control-Allow-Origin", "*");
        ctx.set(
            "Access-Control-Allow-Headers",
            "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
        );
        ctx.set(
            "Access-Control-Allow-Methods",
            "PUT, POST, GET, DELETE, OPTIONS"
        );
        if (ctx.method === "OPTIONS") {
            ctx.body = "";
            ctx.status = 204;
        } else {
            await next();
        }
    });

app.listen(3000);
