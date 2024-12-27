// Maintenance Alerts: Detect and schedule repairs
app.post('/maintenance-alert', async (req, res) => {
    try {
        const { facility, issue } = req.body;

        // Validate input
        if (!facility || !issue) {
            return res.status(400).send('Facility and issue are required.');
        }

        const maintenance = new Maintenance({
            facility,
            issue,
            alertDate: new Date(),
            resolved: false,
        });

        await maintenance.save();
        res.status(200).json({ message: 'Maintenance alert created', maintenance });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
