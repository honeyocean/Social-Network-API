import {Thought, User} from "../models/index.js";
import {Request, Response} from "express";

export const getThoughts = async (req: Request, res: Response): Promise<void>=>{
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    }catch (err){
        res.status(500).json({message: err.message});
    }
};

export const getThought = async (req:Request, res:Response): Promise<void>=>{
    try{
        const thought = await Thought.findById(req.params.id);
        if (!thought){
            res.status(404).json({messsage: 'Thought not found'});
        }
        else{
            res.json(thought);
        }
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const createThought = async (req: Request, res: Response):Promise<void>=>{
    try{
        const newThought = new Thought(req.body);
        await newThought.save();
        const user = await User.findOne({username: newThought.username});
        user?.thoughts.push(newThought._id as any);
        await user?.save();
        res.status(201).json({thought: newThought, user: user});
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

export const updateThought = async (req: Request, res: Response):Promise<void>=>{
    try{
        const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(thought);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

export const deleteThought = async (req: Request, res: Response):Promise<void>=>{
    try{
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if(!deletedThought){
            res.status(404).json({message : 'No thought found'});
            return;
        }
        res.json(deletedThought);
    }catch(err){
        res.status(404).json({message: err.message});
    }
};

export const addReaction = async (req: Request, res: Response):Promise<void>=>{
    try{
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            {$push:{reactions: req.body}},
            {new:true}
        );
        if(!thought){
            res.status(404).json({message : 'No thought found'});
        }
        res.json(thought);
    }catch(err){
        res.status(404).json({message: err.message});
    }
};

export const removeReaction = async(req: Request, res: Response):Promise<void>=>{
    try{
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            {$pull:{reactions: {_id: req.params.reactionId}}},
            {new:true}
        );
        if (!thought){
            res.status(404).json({message : 'Though not found'});
        }
        res.json(thought);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};