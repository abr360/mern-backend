const asyncHandler = require('express-async-handler');
const Goal = require('../model/goalmodel');
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
    res.status(200).json(goals);
});

const postGoals = asyncHandler((req, res) => {
    res.status(200).json({ message: 'post from controller' });
});

const putGoals = asyncHandler((req, res) => {
    res.status(200).json({ message: `put from controller and id is ${req.params.id}` });
});

const deleteGoals = asyncHandler((req, res) => {
    res.status(200).json({ message: `delete from controller and id is ${req.params.id}` });
});

module.exports = { getGoals, postGoals, putGoals, deleteGoals };
