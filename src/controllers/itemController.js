import Item from "../models/Item.js";
import Alert from "../models/Alert.js";

// Create item
export const createItem = async (req, res) => {
  try {
    const item = await Item.create({ ...req.body, userId: req.user._id });

    // Generate alert if expiring within 3 days
    const today = new Date();
    const soon = new Date();
    soon.setDate(today.getDate() + 3);

    if (item.expiryDate <= soon) {
      await Alert.create({
        userId: req.user._id,
        itemId: item._id,
        type: "EXPIRING_SOON",
        message: `${item.name} is expiring soon!`,
      });
    }

    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all items
export const getItems = async (req, res) => {
  const { q, category, location, expired } = req.query;
  const filter = { userId: req.user._id };
  if (q) filter.name = { $regex: q, $options: "i" };
  if (category) filter.category = category;
  if (location) filter.location = location;
  if (expired === "true") filter.expiryDate = { $lt: new Date() };

  try {
    const items = await Item.find(filter).sort({ expiryDate: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single item
export const getItem = async (req, res) => {
  const item = await Item.findOne({ _id: req.params.id, userId: req.user._id });
  if (!item) return res.status(404).json({ msg: "Item not found" });
  res.json(item);
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  await Item.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
  res.json({ msg: "Item deleted" });
};

// Get expiring soon items
export const getExpiringItems = async (req, res) => {
  const today = new Date();
  const soon = new Date();
  soon.setDate(today.getDate() + 3);

  const items = await Item.find({
    userId: req.user._id,
    expiryDate: { $gte: today, $lte: soon },
  });
  res.json(items);
};
