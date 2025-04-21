const express = require('express');
const router = express.Router();
const {
  addSchool,
  listSchools
} = require('../controllers/schoolController');
const validateSchoolInput = require('../middlewares/validateSchoolInput');

router.post('/addSchool', validateSchoolInput, addSchool);
router.get('/listSchools', listSchools);

module.exports = router;
