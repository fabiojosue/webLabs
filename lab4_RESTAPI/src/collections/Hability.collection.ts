import mongoose from "mongoose";

const schema = new mongoose.Schema({
    id: { type: Number },
    name: { type: String },
    description: { type: String },
});

export default mongoose.model('Hability', schema);
