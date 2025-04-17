async function getCurrentUser(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorised" });
  }
  res.json({ user: req.user });
}

module.exports = {
  getCurrentUser,
};
