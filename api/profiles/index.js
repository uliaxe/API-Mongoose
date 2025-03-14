// api/profiles/index.js
const express = require('express');
const router = express.Router();
const controller = require('./controller');

// CRUD routes for profiles
router.get('/', controller.getProfiles);
router.get('/:id', controller.getProfileById);
router.post('/', controller.createProfile);
router.put('/:id', controller.updateProfile);
router.delete('/:id', controller.deleteProfile);

// Routes for managing experiences
router.post('/:id/experience', controller.addExperience);
router.delete('/:id/experience/:exp', controller.deleteExperience);

// Routes for managing skills
router.post('/:id/skills', controller.addSkill);
router.delete('/:id/skills/:skill', controller.deleteSkill);

// Route for updating profile information
router.put('/:id/information', controller.updateInformation);

module.exports = router;