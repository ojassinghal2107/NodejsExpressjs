// controllers/registrationController.js
const prisma = require("../config/db");

const registerForEvent = async (req, res) => {
    const { userId, eventId } = req.body;

    if (!userId || !eventId) {
        return res.status(400).json({ error: "userId and eventId are required fields." });
    }

    try {
        // Run checks and generation inside a secure database transaction
        const entry = await prisma.$transaction(async (tx) => {
            
            // 1. Get total maximum capacity for the target event
            const targetEvent = await tx.event.findUnique({
                where: { id: parseInt(eventId) }
            });

            if (!targetEvent) {
                throw new Error("Target event does not exist.");
            }

            // 2. Count current bookings for this event
            const registeredCount = await tx.registration.count({
                where: { eventId: parseInt(eventId) }
            });

            // 3. Prevent booking if all chairs are filled
            if (registeredCount >= targetEvent.capacity) {
                throw new Error("Event is fully booked! No seats remaining.");
            }

            // 4. Create the registration row
            return await tx.registration.create({
                data: {
                    userId: parseInt(userId),
                    eventId: parseInt(eventId)
                }
            });
        });

        res.status(201).json({ message: "Seat successfully booked!", registration: entry });
    } catch (error) {
        // Handle custom capacity error or unique composite constraint errors
        res.status(400).json({ error: error.message || "Registration failed. Already registered?" });
    }
};

module.exports = { registerForEvent };
