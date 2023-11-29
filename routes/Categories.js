const express = require('express');
const { fetchCategories } = require('../controller/Category');
const { createCategory } = require('../controller/Category');


const router = express.Router()
// /categories is already added in base path
router.get('/',fetchCategories).post('/',createCategory)

exports.router = router;