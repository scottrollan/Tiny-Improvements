const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var KudoSchema = new Schema ({
    title: {
        type: String,
        trim: true
        // required: "A title is required."
    },
    body: {
        type: String
        // required: "also required..."
    },
    from: String,
    to: String,
    objectId: String
});

const Kudos = mongoose.model("Kudos", KudoSchema);
module.exports = Kudos;