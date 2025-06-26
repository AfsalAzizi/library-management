import connectDB from "./config/db";
import dotenv from "dotenv";

import { UserModel } from "./models/UserModel";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    await UserModel.deleteMany();

    const users = [
      {
        name: "Antoh",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Sam",
        email: "user1@example.com",
        password: "user123",
        role: "user",
      },
      {
        name: "Rahul",
        email: "user2@example.com",
        password: "user123",
        role: "user",
      },
    ];

    for (const user of users) {
      const newUser = new UserModel(user);
      await newUser.save();
    }

    console.log("✅ Seed users created successfully");
    process.exit(1);
  } catch (error) {
    console.error("❌ Could not create seed users:", error);
    process.exit(1);
  }
};

seedUsers();
