const express = require('express');
const { updateUser, fetchUserById } = require('../controller/User');



const router = express.Router()
// /users is already added in base path
router.get('/',fetchUserById)
      .patch('/:id',updateUser)

exports.router = router;