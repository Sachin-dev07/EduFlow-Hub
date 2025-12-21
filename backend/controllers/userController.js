import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const userId = req.user._id || req.user.id;
    console.log('UPDATE PROFILE -- userId:', userId);
    console.log('UPDATE PROFILE -- body:', req.body);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;
    user.phone = req.body.phone ?? user.phone;
    user.bio = req.body.bio ?? user.bio;

    await user.save();
    console.log('User updated successfully');

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        bio: user.bio,
      },
    });
  } catch (error) {
    console.error('UPDATE PROFILE ERROR:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ message: error.message });
  }
};
