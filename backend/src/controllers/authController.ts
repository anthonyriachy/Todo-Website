import { Error } from 'mongoose'
import User from '../models/user.ts'
import { Request, Response } from 'express';

const test = async (req: Request, res: Response): Promise<void> => {
    console.log("hello from backend");

        try 
        {
            
    
        const name = req.body.name;
        const email= req.body.email;
        const password = req.body.password;
            
        if(!name || !email || !password){
            res.status(401).json({message:"all feilds are required"});
            return
        }
        // Create a new user
        const newUser = new User({
            name,
            email,
            password
        });
    
            // Save the user to the database

            const savedUser = await newUser.save();
            res.status(201).json(savedUser); // Respond with the created user
        } catch (error) {
            res.status(500).json({ message: 'Error creating user'+ error });
        }
    
};

export {test}