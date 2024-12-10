const Post = require('../models/post.model');
const Payment = require('../models/payment.model');
const getAllPostsAndPayments = async (req, res) => {
    try {
        const posts = await Post.find();
        if (!posts.length) {
            return res.status(404).json({ message: 'No posts found' });
        }
        const paymentIds = posts.map(post => post.paymentId);
        const payments = await Payment.find({ paymentId: { $in: paymentIds } });
        const result = posts.map(post => {
            const payment = payments.find(payment => payment.paymentId === post.paymentId);
            return {
                ...post.toObject(),
                payment: payment || null, 
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
        const posts = await Post.find({ userId }).populate('serviceId', 'name title_color');
        if (!posts.length) {
            return res.status(404).json({ message: 'No posts found for this user' });
        }
        const paymentIds = posts.map(post => post.paymentId);
        const payments = await Payment.find({ paymentId: { $in: paymentIds } });
        const result = posts.map(post => {
            const payment = payments.find(payment => payment.paymentId === post.paymentId);
            return {
                post,
                payment: payment || null, 
            };
        });
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching posts and payments:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
const deletePostAndPaymentById = async (req, res) => {
    const { paymentId } = req.params;

    try {
        const post = await Post.findOneAndDelete({ paymentId });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const payment = await Payment.findOneAndDelete({ paymentId });
        if (!payment) {
            return res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        console.error("Error deleting post and payment:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getAllPayments = async (req, res) => {
    try {
      const payments = await Payment.find(); // Lấy tất cả các bản ghi
      res.status(200).json(payments); // Trả về dữ liệu với mã trạng thái 200
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lỗi khi lấy dữ liệu thanh toán' }); // Trả về lỗi
    }
  };
  
module.exports = {
    getAllPayments,
    getAllPostsAndPayments,
    getPostsAndPaymentsByUserId,
    deletePostAndPaymentById,
};