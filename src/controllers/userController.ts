import Thought from '../models/Thought.js';
import {User} from '../models/User.js';
import {Request, Response} from "express";

export const getAllUsers = async (req: Request, res: Response): Promise<void>=>{
    try{
        const users = await User.find().populate("thoughts").populate("friends");
        res.json(users);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void>=>{
    try{
        const user =  await User.findById(req.params.userId).populate("thoughts").populate("friends");
        if(!user){
            res.status(404).json({message:'User not found'});
        }
        else{
            res.json(user);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const createUser = async (req: Request, res: Response): Promise<void>=>{
    const{username,email,thoughts,friends} = req.body;
    try{
        const user = await User.create({username,email,thoughts,friends});
        res.json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void>=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {new:true});
        
        if(!user){
            res.status(404).json({message:'User not found'});
        }
        res.json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void>=>{
    try{
        const user =  await User.findByIdAndDelete(req.params.userId);
        if(!user){
            res.status(404).json({message:'User not found'});
        }
        else{
            res.json({message: 'user deleted'});
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const addFriend = async (req: Request, res: Response): Promise<void>=>{
    try{
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            {$push: {friends: req.params.friendId}},
            {new:true}
        );
        if(!user){
            res.status(404).json({message:'User not found'});
        }
        res.json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const removeFriend = async (req: Request, res: Response): Promise<void>=>{
    try{
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            {$pull:{friends: req.params.friendId}},
            {new:true}
        );
        if(!user){
            res.status(404).json({message:'User not found'});
        }
        res.json(user);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

