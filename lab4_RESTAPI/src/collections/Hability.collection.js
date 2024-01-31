"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.default.Schema({
    id: { type: Number },
    name: { type: String },
    description: { type: String },
});
exports.default = mongoose_1.default.model('Hability', schema);
