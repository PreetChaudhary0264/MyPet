const Pet = require("../models/registerpet");
exports.registerPet = async (req, res) => {
  try {
    const { name, breed, age, bio } = req.body;
    // const profilePhoto = req.file ? req.file.path : "";
    const profilePhoto = req.file ? req.file.path.replace(/\\/g, "/") : "";


    if (!name || !breed || !age || !bio) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required pet details.",
      });
    }

    const ownerId = req.user.id;

    const newPet = await Pet.create({
      name,
      breed,
      age,
      bio,
      profilePhoto,
      owner: ownerId,
    });

    return res.status(201).json({
      success: true,
      message: "Pet registered successfully",
      pet: newPet,
    });
  } catch (error) {
    console.error("Error registering pet:", error);

    console.error("Error registering pet:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};





