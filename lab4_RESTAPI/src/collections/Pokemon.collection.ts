import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
    abilities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hability' }],
    type: { type: String, required: true },
    secondType: { type: String }, // Optional second type
});

export default mongoose.model('Pokemon', schema);
