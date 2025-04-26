import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route to save a new book
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishedYear
        ) {
            return response.status(400).json({
                message: 'Send all required fields: title, author, publishedYear',
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).json(book);
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: error.message });
    }
});

// Route to get all books
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message,
        });
    }
});

// Route to get a single book by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);

        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json(book);
    } catch (error) {
        console.log(error);
        response.status(500).json({
            message: error.message,
        });
    }
});

// Route to update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishedYear
        ) {
            return response.status(400).json({
                message: 'Send all required fields: title, author, publishedYear',
            });
        }

        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body, { new: true });

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json({ 
            message: 'Book updated successfully!',
            data: result
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: error.message });
    }
});

// Route to delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: error.message });
    }
});

export default router;
