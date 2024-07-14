const asyncHandler = require('express-async-handler');

const getGoals = asyncHandler((req, res) => {
    res.status(200).json({ message: 'get from controller' });
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
