const Image = require('../models/image.model');

const checkDuplicateImage = async (req, res, next) => {
    const { url } = req.body;
    if (url) {
        const existingImage = await Image.findOne({ url });
        if (existingImage) {
            return res.status(400).json({ error: 'URL hình ảnh đã tồn tại.' });
        }
    }
    next();
};

module.exports = checkDuplicateImage;