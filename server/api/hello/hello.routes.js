const express = require('express');
const router = express.Router();
// const { authenticateUser, checkUserRole } = require('../middleware/auth');

// Define your book-related routes here
// Example protected route for creating a book
// router.post('/create-book', authenticateUser, checkUserRole('admin'), (req, res) => {
//   // This route is for 'admin' users only and requires authentication
//   // Implement the logic to create a book here
//   res.json({ message: 'Book created successfully.' });
// });

// Example public route to get a list of books
router.get('/', (req, res) => {
  res.json({ message: 'It works' });
});

module.exports = router;
