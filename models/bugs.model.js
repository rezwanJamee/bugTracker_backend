const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bugsSchema = new Schema({
  bugname: { type: String, required: true },
  reporter: { type: String, required: true },
  assignee: { type: String, required: true },
  status: { type: String, required: true },
  severity: { type: String, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Bugs = mongoose.model('Bugs', bugsSchema);

module.exports = Bugs;