// Usage Analytics
app.get('/usage-analytics', async (req, res) => {
    try {
        const usageData = await Usage.find();
        const insights = usageData.map(facilityUsage => ({
            facility: facilityUsage.facility,
            totalUsage: facilityUsage.usageData.reduce((total, usage) => total + usage.duration, 0),
            averageDailyUsage: facilityUsage.usageData.reduce((total, usage) => total + usage.duration, 0) / facilityUsage.usageData.length,
        }));
        res.status(200).json(insights);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
