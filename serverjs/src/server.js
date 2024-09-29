const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware để parse JSON
app.use(express.json());

// Định nghĩa một route đơn giản
app.get('/', (req, res) => {
    res.send('Hello, this is my updated server!');
});

// Bắt đầu server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});