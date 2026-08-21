import User from "../model/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;

    if (!loggedInUserId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const users = await User.find({ _id: { $ne: loggedInUserId } })
      .select("-password")
      .sort({ updatedAt: -1 });

    res.status(200).json(users);
  } catch (error) {
    console.log("error in getUsersForSidebar controller", error.message);
    res.status(500).json({ message: "Server error" });
  }
};