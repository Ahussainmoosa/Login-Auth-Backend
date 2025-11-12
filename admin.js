const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");
require("dotenv").config();

async function admin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    const existingAdmin = await User.findOne({ role: "school" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("Ali123", 10); // you can change this

    // Create admin user
    const adminUser = new User({
      username: "Ali admin",
      //email: "ALi123@example.com",
      hashedPassword: hashedPassword,
      role: "school",
    });

    await adminUser.save();
    console.log("Admin user created:", adminUser.email);
    process.exit();
  } catch (err) {
    console.error("Error seeding admin:", err);
    process.exit(1);
  }
}

admin();
