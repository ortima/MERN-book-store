import { request, response } from 'express'
import { Book } from '../models/book.js'

//Creating newBook
export const createBook = async (request, response) => {
  try {
    const { title, author, publishYear } = request.body
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: 'Send all neccessary fields',
      })
    }

    const isExistingBook = await Book.findOne({ title })
    if (isExistingBook) {
      return response.status(403).send({
        message: `Book with title '${title}' already exist`,
      })
    }
    const newBook = { title, author, publishYear }
    const book = await Book.create(newBook)

    return response.status(201).send(book)
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: error.message })
  }
}

//Get all books from database
export const getAllBooks = async (request, response) => {
  try {
    const books = await Book.find({})
    return response.status(200).send({
      count: books.length,
      data: books,
    })
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: error.message })
  }
}

//Get book by ID
export const getBookById = async (request, response) => {
  try {
    const { id } = request.params
    const book = await Book.findById(id)
    return response.status(200).send(book)
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: error.message })
  }
}

//Update book by ID
export const updateBook = async (request, response) => {
  try {
    const { title, author, publishYear } = request.body
    if (!title || !author || !publishYear) {
      return response.status(400).send({
        message: 'Send all neccessary fields',
      })
    }
    const { id } = request.params
    const book = await Book.findByIdAndUpdate(id, request.body, { new: true })
    if (!book) {
      return response.status(404).send({ message: 'Book not found' })
    }

    return response.status(200).send(book)
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: error.message })
  }
}

//Patch book by Id
export const patchBook = async (request, response) => {
  try {
    const { id } = request.params
    const book = await Book.findByIdAndUpdate(id, request.body, { new: true })

    if (!book) {
      return response.status(404).send({ message: 'Book not found' })
    }

    return response.status(200).send(book)
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: error.message })
  }
}

//Delete by Id
export const deleteBookById = async (request, response) => {
  try {
    const { id } = request.params
    const book = await Book.findByIdAndDelete(id)

    if (!book) {
      return response.status(404).send({ message: 'Book not found' })
    }

    return response
      .status(200)
      .send({ message: `Successfully deleted book with ID ${id}` })
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: error.message })
  }
}

//Delete many by array ids
export const deleteMany = async (request, response) => {
  try {
    const { ids } = request.body
    const result = await Book.deleteMany({ _id: { $in: ids } })
    if (result.deletedCount === 0) {
      return response.status(404).send({ message: 'No books found to delete' })
    }

    return response.status(200).send({
      message: `Successfully deleted ${result.deletedCount} books with ID ${ids}`,
    })
  } catch (error) {
    console.error(error)
    response.status(500).send({ message: error.message })
  }
}
