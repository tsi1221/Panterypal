import Alert from "../models/Alert.js";

// Get all alerts for user
export const getUserAlerts = async (req, res) => {
  const alerts = await Alert.find({ userId: req.user._id }).sort({ createdAt: -1 });
  res.json(alerts);
};

// Mark alert as seen
export const markAlertSeen = async (req, res) => {
  const alert = await Alert.findOneAndUpdate(
    { _id: req.params.id, userId: req.user._id },
    { seen: true },
    { new: true }
  );
  if (!alert) return res.status(404).json({ msg: "Alert not found" });
  res.json(alert);
};
