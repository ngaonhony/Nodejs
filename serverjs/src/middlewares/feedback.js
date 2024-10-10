const Feedback = require('../models/feedback.model');

const middlewareFeedback = async (req, res, next) => {
    const { user, category} = req.body;

    // Kiểm tra xem phản hồi đã tồn tại cho người dùng và danh mục hay không
    if (user && category) {
        const existingFeedback = await Feedback.findOne({ user, category });
        if (existingFeedback) {
            return res.status(400).json({ error: 'Phản hồi đã tồn tại cho người dùng này trong danh mục này.' });
        }
    }

    next();
};

module.exports = middlewareFeedback;