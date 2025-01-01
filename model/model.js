const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({

    name: {
        type: String,
        require:true
    },
    email: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    },
    mo_no: {
        type: Number,
        require:true
    }
}, { timestamps: true });

const Login = mongoose.model("Login", loginSchema);

module.exports = Login;