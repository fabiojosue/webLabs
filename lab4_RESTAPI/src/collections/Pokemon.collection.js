"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.default.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
    abilities: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Hability' }],
    type: { type: String, required: true },
    secondType: { type: String }, // Optional second type
});
exports.default = mongoose_1.default.model('Pokemon', schema);
