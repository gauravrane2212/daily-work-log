const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const dailyLogSchema = new Schema({
    date: { type: Date, required: true },
    goal: { type: String, required: false },
    description: { type: String, required: true },
    sentiment: {type: String, enum: ['Positive', 'Negative', 'Neutral'], required: true},
}, {
  timestamps: true,
});

const DailyLog = mongoose.model('DailyLog', dailyLogSchema);

module.exports = DailyLog;