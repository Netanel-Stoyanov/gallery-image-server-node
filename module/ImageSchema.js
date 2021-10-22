const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: {type: String, unique: true, required: true},
    description: {type: String, required: true},
    url: {type: String, required: true},
    user_id: {type: String}
});

module.exports = mongoose.model("images", imageSchema);
