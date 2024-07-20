import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    expense: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
});

const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;
