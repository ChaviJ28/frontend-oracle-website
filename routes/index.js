
const express = require('express')
const router = express.Router();
const index = require('../controllers/index');
const form = require('../controllers/form');

//Home
router.get('/', index.home)
router.get('/about', index.about)
router.get('/join', index.member)
router.get('/privacy', index.privacy)
router.get('/form-template', form.newtemplate)
router.get('/form/:url', form.viewForm)
router.post('/form/submit', form.submitForm)

module.exports = router