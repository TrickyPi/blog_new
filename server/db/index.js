const mongoose = require("./mongos");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: String,
    avatar_url: String,
    name: String,
    date: Date
});

const MyModel = mongoose.model("comment", commentSchema);

const mongoComment = {
    query(obj) {
        return new Promise((resolve, reject) => {
            MyModel.find(obj, (err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    },
    save(obj) {
        const m = new MyModel(obj);
        return new Promise((resolve, reject) => {
            m.save((err, res) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
                console.log(res);
            });
        });
    }
};

module.exports = mongoComment;
