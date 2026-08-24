import Message from "../model/message.model.js";
import User from "../model/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    res.status(200).json(filteredUsers);

    // if (!loggedInUserId) {   
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // const users = await User.find({ _id: { $ne: loggedInUserId } })
    //   .select("-password")
    //   .sort({ updatedAt: -1 });

    // res.status(200).json(users);
  } catch (error) {
    console.log("error in getUsersForSidebar controller", error.message);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = res.user._id;

    const message = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(message);
  } catch (error) {
    console.log("Error in getMessage controllers: ", error.message);
    res.status(500).json({ error: "Internal server Error " });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controllers: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
