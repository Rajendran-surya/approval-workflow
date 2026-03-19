const { validationResult } = require('express-validator');
const Request = require('../models/Request');

// Create a new request
exports.createRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, requestedBy, requestType } = req.body;
    const request = await Request.create({
      title,
      description,
      requestedBy,
      requestType
    });

    res.status(201).json(request);
  } catch (error) {
    next(error);
  }
};

// Get all requests with optional filters
exports.getRequests = async (req, res, next) => {
  try {
    const { status, type } = req.query;
    const where = {};
    if (status) where.status = status;
    if (type) where.requestType = type;

    const requests = await Request.findAll({ where, order: [['created_at', 'DESC']] });
    res.json(requests);
  } catch (error) {
    next(error);
  }
};

// Update request status (approve/reject) - manager only
exports.updateStatus = async (req, res, next) => {
  try {
    // Role check
    const role = req.headers.role;
    if (role !== 'MANAGER') {
      return res.status(403).json({ message: 'Only managers can approve or reject requests' });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { status } = req.body;

    const request = await Request.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    if (request.status !== 'PENDING') {
      return res.status(400).json({ message: 'Only pending requests can be updated' });
    }

    request.status = status;
    await request.save();

    res.json(request);
  } catch (error) {
    next(error);
  }
};