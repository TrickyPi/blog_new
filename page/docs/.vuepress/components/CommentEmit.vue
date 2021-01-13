<template>
    <div class="comment">
        <User
            :name="name"
            :avatar="avatar"
            :premissionLoading="premissionLoading"
            :isLogin="isLogin"
        ></User>
        <input
            type="text"
            class="comment-input"
            placeholder="留下你想说的话吧"
            v-model="content"
        />
        <div class="submit" @click="submit">提交</div>
    </div>
</template>
<script>
import { postComment, getToken } from "../app/api/";
import User from "../components/User.vue";
export default {
    name: "CommentEmit",
    components: {
        User: User
    },
    data() {
        return {
            content: "",
            name: "",
            avatar: "",
            premissionLoading: false
        };
    },
    computed: {
        isLogin() {
            return !!(this.name || this.avatar);
        }
    },
    methods: {
        submit() {
            //提交评论
            if (!this.isLogin) {
                alert("请登录！");
                return;
            }
            if (!this.content) {
                alert("请输入内容");
                return;
            }
            postComment({
                content: this.content,
                name: this.name,
                avatar_url: this.avatar
            })
                .then(res => {
                    this.$emit("reloadCommentLists");
                    this.content = "";
                })
                .catch(err => {});
        }
    },
    mounted() {
        /**
         * 因为vuepress是ssg生成，所以没有window对象，只有在mounted之后执行window相关的api
         */
        const { name, avatar } = this.$getGobalUser();
        const code = this.$route.query.code;
        if (code && !name && !avatar) {
            this.premissionLoading = true;
            getToken({ code })
                .then(res => {
                    const { name, avatar_url } = res.data;
                    this.name = name;
                    this.avatar = avatar_url;
                    this.$setGobalUser(name, avatar_url);
                })
                .finally(() => {
                    this.premissionLoading = false;
                });
        } else {
            this.name = name;
            this.avatar = avatar;
        }
    }
};
</script>
<style lang="stylus" scoped>
.comment
    box-sizing:border-box;
    width:100%;
    // height:4rem;
    padding:1rem 2rem;
    background-color:#fafbfc;
    overflow: hidden;
    .comment-input
        box-sizing:border-box;
        width:100%;
        height:2rem;
        padding-left:0.5rem;
        border:1px solid #bbb;
    .submit
        float:right;
        width:4rem;
        margin-top 0.5rem
        color:#007f80;
        border:1px solid #007f80;
        text-align center
        line-height 1.8rem
        font-size 0.9rem
        border-radius 4px
        background-color #fff
</style>
