"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    }
});
exports.default = mongoose_1.default.model('User', userSchema);
