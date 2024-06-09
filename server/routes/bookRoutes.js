import express from 'express'
import {
  createBook,
  deleteBookById,
  deleteMany,
  getAllBooks,
  getBookById,
  patchBook,
  updateBook,
} from '../controllers/bookController.js'

const router = express.Router()

router.post('/books', createBook)
router.get('/books', getAllBooks)
router.get('/books/:id', getBookById)
router.put('/books/:id', updateBook)
router.patch('/books/:id', patchBook)
router.delete('/books/:id', deleteBookById)
router.delete('/books', deleteMany)

export default router
