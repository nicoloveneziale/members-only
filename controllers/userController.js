const db = require("../db/queries");

async function getCurrentUser(req, res) {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorised" });
  }
  res.json({ user: req.user });
}

async function getProfile(req, res) {
  try {
    const id = parseInt(req.params.id);
    const profile = await db.getProfile(id);
    res.json({ profile: profile });
  } catch {
    res.status(500).json({ error: "Failed to get user profile" });
  }
}

async function getUserProfileMe(req, res) {
  try {
    const id = parseInt(req.user.id);
    const profile = await db.getUserProfile(id);
    res.json({ profile: profile });
  } catch {
    res.status(500).json({ error: "Failed to get user profile" });
  }
}

async function getUserProfile(req, res) {
  try {
    const profile = await db.getUserProfile(parseInt(req.params.id));
    res.json({ profile: profile });
  } catch {
    res.status(500).json({ error: "Failed to get user profile" });
  }
}

async function createUserProfile(req, res) {
  try {
    const profile = await db.createUserProfile(req.user.id);
    res.status(201).json({
      message: "User registered successfully",
      token: req.token,
      user: {
        id: req.user.id,
        username: req.user.username,
        firstname: req.user.firstname,
        lastname: req.user.lastname,
      },
      profile: { profile },
    });
  } catch {
    res.status(500).json({ error: "Failed to create user profile" });
  }
}

async function patchUserProfile(req, res) {
  try {
    const userId = req.user.id;
    const avatarPath = req.file ? req.file.path : null;
    const { bio, location, website } = req.body;

    const profile = await db.editUserProfile(
      userId,
      bio,
      location,
      website,
      avatarPath,
    );

    res.status(200).json({ profile: profile });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = {
  getCurrentUser,
  getUserProfile,
  createUserProfile,
  patchUserProfile,
  getUserProfileMe,
  getProfile,
};
