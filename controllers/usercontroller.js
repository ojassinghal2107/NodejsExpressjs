// controllers/userController.js
const prisma = require("../config/db");

// 1. Create a brand new user account
const createUser = async (req, res) => {
    const { name, email } = req.body;

    // Validation: Ensure fields aren't empty
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required fields!" });
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email
            }
        });
        res.status(201).json({ message: "User account created!", user: newUser });
    } catch (error) {
        // If the email already exists, MySQL blocks it due to the @unique constraint, and Prisma throws an error
        res.status(400).json({ error: "Registration failed. Email might already be taken." });
    }
};

// 2. Fetch all users (Useful for checking our data)
const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong while fetching users." });
    }
};

module.exports = {
    createUser,
    getAllUsers
};