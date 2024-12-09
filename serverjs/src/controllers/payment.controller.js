// controllers/paymentController.js
const Post = require('../models/post.model');
const Payment = require('../models/payment.model');
const getAllPostsAndPayments = async (req, res) => {
    try {
        // Tìm tất cả bài đăng
        const posts = await Post.find();
        if (!posts.length) {
            return res.status(404).json({ message: 'No posts found' });
        }

        // Lọc ra các paymentId từ các bài đăng
        const paymentIds = posts.map(post => post.paymentId);

        // Tìm tất cả thanh toán dựa trên paymentId
        const payments = await Payment.find({ paymentId: { $in: paymentIds } });

        // Kết hợp thông tin từ bài đăng và thanh toán
        const result = posts.map(post => {
            const payment = payments.find(payment => payment.paymentId === post.paymentId);
            return {
                ...post.toObject(), // Chuyển đổi bài đăng thành đối tượng thông thường
                payment: payment || null, // Nếu không tìm thấy thanh toán, trả null
            };
        });

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching all posts and payments:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getPostsAndPaymentsByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        // Tìm tất cả bài đăng của người dùng
        const posts = await Post.find({ userId }).populate('serviceId', 'name title_color');
        if (!posts.length) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }

        // Lọc ra các paymentId từ các bài đăng
        const paymentIds = posts.map(post => post.paymentId);

        // Tìm tất cả thanh toán dựa trên paymentId
        const payments = await Payment.find({ paymentId: { $in: paymentIds } });

        // Kết hợp thông tin từ bài đăng và thanh toán
        const result = posts.map(post => {
            const payment = payments.find(payment => payment.paymentId === post.paymentId);
            return {
                post,
                payment: payment || null, // Nếu không tìm thấy thanh toán, trả null
            };
        });

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching posts and payments:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
// Xóa thông tin thanh toán và bài đăng theo paymentId
const deletePostAndPaymentById = async (req, res) => {
    const { paymentId } = req.params;

    try {
        // Tìm và xóa bài đăng theo paymentId
        const post = await Post.findOneAndDelete({ paymentId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Tìm và xóa thanh toán theo paymentId
        const payment = await Payment.findOneAndDelete({ paymentId });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }

        res.status(204).send(); // Gửi phản hồi 204 khi xóa thành công
    } catch (error) {
        console.error("Error deleting post and payment:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllPostsAndPayments,
    getPostsAndPaymentsByUserId,
    deletePostAndPaymentById,
};