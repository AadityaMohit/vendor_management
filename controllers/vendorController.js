const Vendor = require('../models/Vendor');

exports.getVendors = async (req, res) => {
  const { page = 1, limit = 10, sort = 'name', filter = '' } = req.query;

  const query = {
    ...(req.user.role === 'user' ? { user: req.user._id } : {}),
    name: { $regex: filter, $options: 'i' },
  };

  const vendors = await Vendor.find(query)
    .populate(req.user.role === 'admin' ? 'user' : '')
    .sort({ [sort]: 1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Vendor.countDocuments(query);
  res.json({ vendors, total });
};

exports.createVendor = async (req, res) => {
  try {
    const vendor = new Vendor({ ...req.body, user: req.user._id });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.editVendor = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'admin' && !vendor.user.equals(req.user._id)) return res.status(403).json({ error: 'Forbidden' });

  Object.assign(vendor, req.body);
  try {
    await vendor.save();
    res.json(vendor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteVendor = async (req, res) => {
  const vendor = await Vendor.findById(req.params.id);
  if (!vendor) return res.status(404).json({ error: 'Not found' });
  if (req.user.role !== 'admin' && !vendor.user.equals(req.user._id)) return res.status(403).json({ error: 'Forbidden' });

  await vendor.deleteOne();
  res.json({ message: 'Vendor deleted' });
};
