// controllers/eventController.js
const prisma = require("../config/db");

// 1. Let a user host an event
const createEvent = async (req, res) => {
    const { title, description, date, location, capacity, hostId } = req.body;

    if (!title || !description || !date || !location || !capacity || !hostId) {
        return res.status(400).json({ error: "All fields are required to host an event!" });
    }

    try {
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date), // Formats string date to database datetime
                location,
                capacity: parseInt(capacity),
                hostId: parseInt(hostId) // Connects event to the host's User ID
            }
        });
        res.status(201).json({ message: "Event successfully created!", event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create event. Make sure the hostId exists." });
    }
};

// 2. Fetch all events along with host details (The Notice Board)
const getAllEvents = async (req, res) => {
    try {
        const events = await prisma.event.findMany({
            include: {
                host: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong while fetching events." });
    }
};

module.exports = { createEvent, getAllEvents };
