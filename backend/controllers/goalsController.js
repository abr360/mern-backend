const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalmodel');
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
});

const postGoals = asyncHandler(async(req, res) => {
    if (!req.body || !req.body.text) {
        res.status(400);
        throw new Error('Request body or text property is missing');
      }
        const createdGoal = await Goal.create({
            text: req.body.text
        });
        res.status(201).json(createdGoal);
 
});

const putGoals = asyncHandler(async(req, res) => {
   const goal = Goal.findById(req.params.id);
    if(!goal){
        res.status(404);
        throw new Error('Goal not found');
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
       
    });
    res.status(200).json(updatedGoal);
});

const deleteGoals = asyncHandler(async(req, res) => {
    const goal = Goal.findById(req.params.id);
    if(!goal){
        res.status(404);
        throw new Error('Goal not found');
    }
   await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json(`Goal with id ${req.params.id} deleted`);
});

module.exports = { getGoals, postGoals, putGoals, deleteGoals };
