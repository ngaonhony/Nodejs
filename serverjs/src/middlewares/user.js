const User = require('../models/user.model');

const middlewareUser = async (req, res, next) => {
    const { email } = req.body;
    if (email) {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email đã tồn tại.' });
        }
    }
    next();
};

module.exports = middlewareUser;