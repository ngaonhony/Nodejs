import axios from 'axios';

const API_URL = 'http://localhost:3000/api/posts';

// Hàm lấy tất cả bài viết
export const getPosts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Trả về dữ liệu bài viết
    } catch (error) {
        console.error('Error fetching posts:', error); // Log lỗi ra console
        throw new Error('Error fetching posts: ' + error.message);
    }
};

// Hàm lấy bài viết theo ID
export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; // Trả về bài viết cụ thể
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        throw new Error('Error fetching post: ' + error.message);
    }
};

// Hàm tạo bài viết
export const createPost = async (postData) => {
    try {
        const response = await axios.post(API_URL, postData);
        return response.data; // Trả về bài viết mới được tạo
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Error creating post: ' + error.message);
    }
};

// Hàm cập nhật bài viết
export const updatePost = async (id, postData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, postData);
        return response.data; // Trả về bài viết đã được cập nhật
    } catch (error) {
        console.error('Error updating post:', error);
        throw new Error('Error updating post: ' + error.message);
    }
};

// Hàm xóa bài viết
export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data; // Trả về phản hồi sau khi xóa
    } catch (error) {
        console.error('Error deleting post:', error);
        throw new Error('Error deleting post: ' + error.message);
    }
};