// Booking a facility
app.post('/book', async (req, res) => {
    try {
        const { facility, user, date, timeSlot } = req.body;

        // Validate input
        if (!facility || !user || !date || !timeSlot) {
            return res.status(400).send('All booking details are required.');
        }

        const booking = new Booking({ facility, user, date, timeSlot });
        await booking.save();
        res.status(200).send('Booking successful');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Fetch all bookings
app.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
