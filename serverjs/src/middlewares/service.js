const Service = require('../models/service.model');

const middlewareService = async (req, res, next) => {
    const { name } = req.body;
    if (name) {
        const existingService = await Service.findOne({ name });
        if (existingService) {
            return res.status(400).json({ error: 'Tên dịch vụ đã tồn tại.' });
        }
    }
    next();
};

module.exports = middlewareService;