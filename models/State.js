import mongoose from 'mongoose';

const stateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    flagImage: { type: String, required: true },
    population: { type: Number, required: true }
});

stateSchema.index({ population: 1 }); // Index on population for efficient querying

const State = mongoose.model('State', stateSchema);

export default State;
