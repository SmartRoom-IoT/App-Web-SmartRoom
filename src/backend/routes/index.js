const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const accessRoutes = require('./access');
const sensorRoutes = require('./sensors');
const actionRoutes = require('./actions');

router.use('/auth', authRoutes);
router.use('/access', accessRoutes);
router.use('/sensors', sensorRoutes);
router.use('/actions', actionRoutes);

module.exports = router;