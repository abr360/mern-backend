const express = require('express');
const router = express.Router();
const { getGoals,postGoals,putGoals,deleteGoals } = require('../controllers/goalsController');

router.route('/').get(getGoals).post(postGoals);
router.route('/:id').put(putGoals).delete(deleteGoals);



module.exports = router;