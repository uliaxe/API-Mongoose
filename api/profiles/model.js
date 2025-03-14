// api/profiles/model.js
const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  titre: { type: String },
  entreprise: { type: String },
  dates: { type: String },
  description: { type: String }
}, { _id: true });

const InformationSchema = new mongoose.Schema({
  bio: { type: String },
  localisation: { type: String },
  siteWeb: { type: String }
}, { _id: false });

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  experience: [ExperienceSchema],
  skills: [String],
  information: InformationSchema
});

module.exports = mongoose.model('Profile', ProfileSchema);