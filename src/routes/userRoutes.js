const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const projection = 'name age phoneNumber organization_id';

  try {
    const users = await User.find({}, projection)
      .populate('organization_id', 'name description location founded')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await User.countDocuments();
    res.status(200).json({ users, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching users', error: error.message });
  }
});

module.exports = router;
