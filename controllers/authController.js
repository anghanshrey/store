const Dukan = require("../models/Dukan");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
exports.register = async (req, res) => {

  try {

    const { dukanName, phone, password, address } = req.body;

    const existingDukan = await Dukan.findOne({ dukanName });

    if (existingDukan) {
      return res.status(400).json({ message: "Dukan already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const dukan = new Dukan({
      dukanName,
      phone,
      password: hashedPassword,
      address
    });

    await dukan.save();

    res.status(201).json({
      message: "Dukan registered successfully"
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};



// LOGIN
exports.login = async (req, res) => {

  try {

    const { dukanName, password } = req.body;

    const dukan = await Dukan.findOne({ dukanName });

    if (!dukan) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, dukan.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: dukan._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }
};

// GetProfile

exports.getProfile = async (req, res) => {

  try {

    const dukan = await Dukan.find(req.user.id).select("-password");

    res.status(200).json({
      dukan
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};