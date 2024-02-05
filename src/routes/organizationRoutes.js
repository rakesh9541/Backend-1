const express = require('express');
const router = express.Router();
const Organization = require('../models/Organization');

router.get('/', async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const projection = 'name description location founded';

  try {
    const organizations = await Organization.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'organization_id',
          as: 'users',
          pipeline: [{ $project: { name: 1, age: 1, phoneNumber: 1 } }]
        },
      },
      { $limit: limit * 1 },
      { $skip: (page - 1) * limit },
    ]);

    const count = await Organization.countDocuments();
    res.status(200).json({ organizations, totalPages: Math.ceil(count / limit), currentPage: page });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching organizations', error: error.message });
  }
});

module.exports = router;
