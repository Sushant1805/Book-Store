import express from 'express'
import { Book } from '../models/bookModel.js';
const router = express.Router();

// route for save new book
router.post('/',async (request,response)=>{
    try{
        if(!request.body.title || 
            !request.body.author ||
            !request.body.publishedYear
        ){
            return response.status(400).send(
                {
                    message : 'Send all reqired fields: title, author, publishedYear',
                }
            )
        };
        const newBook = {
            title : request.body.title,
            author:request.body.author,
            publishedYear:request.body.publishedYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }catch(error){
        console.log(error);
        response.status(500).send({message:error.message});
    }
})

// get all books

router.get('/',async(request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json(
            {
                count : books.length,
                data : books
            }
        );
    }catch(error){
        console.log(error);
        response.status(400).send(
            {
                message : error.message
            }
        )
    }
})

// get one book

router.get('/:id',async(request,response)=>{
    try{
        const {id} = request.params
        const book = await Book.findById(id);
        return response.status(200).json(book);
    }catch(error){
        console.log(error);
        response.status(400).send(
            {
                message : error.message
            }
        )
    }
})

// update

router.put('/:id',async(request,response)=>{
    try{
        if(!request.body.title || 
            !request.body.author ||
            !request.body.publishedYear
        ){
            return response.status(400).send(
                {
                    message : 'Send all reqired fields: title, author, publishedYear',
                }
            )
        };

        const {id} = request.params

        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message:'book not found'});
        }

        return response.status(400).send({message:'book updated successfully!'});
    }catch(error){
        console.log(error);
        response.status(400).send({message:error.message})
    }
})

//delete

router.delete('/:id', async(request,response)=>{
    try{
        const {id} = request.params
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message:'book not found'})
        }

        return response.status(200).json({message:'book deleted successfully'})
    }catch(error){
        console.log(error);
        response.status(400).send({message:error.message});
    }
})

export default router