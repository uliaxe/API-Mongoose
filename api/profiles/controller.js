// api/profiles/controller.js
const Profile = require('./model');

// GET /profiles - retrieve all profiles (with bonus filtering)
exports.getProfiles = async (req, res) => {
  try {
    let filter = {};
    if (req.query.skills) {
      // If multiple skills are provided, separate them by commas
      const skills = req.query.skills.split(',').map(s => s.trim());
      filter.skills = { $all: skills };
    }
    if (req.query.localisation) {
      filter['information.localisation'] = req.query.localisation;
    }
    const profiles = await Profile.find(filter);
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /profiles/:id - retrieve a single profile by ID
exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /profiles - create a new profile (only name and email)
exports.createProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newProfile = new Profile({ name, email });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /profiles/:id - update a profile (only name and email)
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    );
    if (!updatedProfile) return res.status(404).json({ error: 'Profile not found' });
    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /profiles/:id - delete a profile by ID
exports.deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (!deletedProfile) return res.status(404).json({ error: 'Profile not found' });
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /profiles/:id/experience - add an experience to a profile
exports.addExperience = async (req, res) => {
  try {
    const { titre, entreprise, dates, description } = req.body;
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    profile.experience.push({ titre, entreprise, dates, description });
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /profiles/:id/experience/:exp - delete an experience from a profile
exports.deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    profile.experience.id(req.params.exp).remove();
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /profiles/:id/skills - add a skill to a profile
exports.addSkill = async (req, res) => {
  try {
    const { skill } = req.body;
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    profile.skills.push(skill);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /profiles/:id/skills/:skill - remove a skill from a profile
exports.deleteSkill = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    profile.skills = profile.skills.filter(s => s !== req.params.skill);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /profiles/:id/information - update the profile information
exports.updateInformation = async (req, res) => {
  try {
    const { bio, localisation, siteWeb } = req.body;
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    profile.information = { bio, localisation, siteWeb };
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};