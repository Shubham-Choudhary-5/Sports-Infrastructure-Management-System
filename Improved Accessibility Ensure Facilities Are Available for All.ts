// Accessibility Check
app.get('/check-availability', async (req, res) => {
    try {
        const { facility, date } = req.query;

        if (!facility || !date) {
            return res.status(400).send('Facility and date are required.');
        }

        const bookings = await Booking.find({ facility, date });
        const availableSlots = Array.from({ length: 24 }, (_, i) => i).filter(slot => !bookings.find(b => b.timeSlot == slot));

        res.status(200).json({
            facility,
            date,
            availableSlots,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
