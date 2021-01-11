<template>
    <div class="comment-con">
        <CommentEmit @reloadCommentLists="getCommentLists"></CommentEmit>
        <div class="comment-list">
            <CommentLeave
                v-for="(item, index) in commentLists"
                :key="index"
                :comment="item"
            ></CommentLeave>
        </div>
    </div>
</template>
<script>
import CommentEmit from "./CommentEmit.vue";
import CommentLeave from "./CommentLeave.vue";
import { getAllComment } from "../app/api/";
export default {
    name: "Comment",
    components: {
        CommentEmit,
        CommentLeave
    },
    data() {
        return {
            commentLists: []
        };
    },
    methods: {
        getCommentLists() {
            //get all Comment
            getAllComment()
                .then(res => {
                    this.commentLists = res.data;
                })
                .catch(err => {});
        }
    },
    created() {
        this.getCommentLists();
    }
};
</script>
<style lang="stylus" scoped>
.comment-con
    width 100%
    .comment-list
        padding-left 2rem
</style>
