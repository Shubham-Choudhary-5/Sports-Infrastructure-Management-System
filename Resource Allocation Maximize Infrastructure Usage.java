Resource Allocation: Maximize Infrastructure Usage.java
// Resource Allocation: Optimize facility usage
app.get('/optimize-usage', async (req, res) => {
    try {
        const bookings = await Booking.find();
        const usageByFacility = bookings.reduce((usage, booking) => {
            usage[booking.facility] = (usage[booking.facility] || 0) + 1;
            return usage;
        }, {});
        const recommendations = Object.keys(usageByFacility).map(facility => ({
            facility,
            utilizationRate: usageByFacility[facility] / 24, // Assuming 24 slots per day
        }));
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
