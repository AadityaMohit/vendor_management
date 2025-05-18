const express = require('express');
const { validateVendor } = require('../middleware/validation');
const {
  getVendors,
  createVendor,
  editVendor,
  deleteVendor,
} = require('../controllers/vendorController');
const { ensureAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(ensureAuth);

router.route('/')
  .get(getVendors)
  .post(validateVendor, createVendor);

router.route('/:id')
  .put(validateVendor, editVendor)
  .delete(deleteVendor);

module.exports = router;
