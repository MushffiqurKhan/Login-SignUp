const { fetchExpenses, addExpenses, deleteExpenses } = require('../controllers/ExpenseController')
const  router = require('express').Router();

router.get('/',fetchExpenses);

router.post('/',addExpenses);

router.delete('/:expenseId',deleteExpenses)

module.exports= router;