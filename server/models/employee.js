const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    managerId: {
        type: Number,
        required: false
    }
});

module.exports = mongoose.model("Employee", employeeSchema);

