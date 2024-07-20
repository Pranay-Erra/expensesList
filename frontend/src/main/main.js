import React, { useState } from 'react';
import './main.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const [expense, setExpense] = useState('');
    const [cost, setCost] = useState('');
    const navigate = useNavigate();

    const handleExpenseChange = (event) => {
        setExpense(event.target.value);
    };

    const handleCostChange = (event) => {
        setCost(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            expense,
            cost,
        };

        try {
            const response = await axios.post('http://localhost:8000/addExpenses', formData);
            if (response.data.success) {
                toast.success('Form submitted successfully');
                navigate('/expenses');
            } else {
                toast.error('Error submitting the form');
            }
        } catch (error) {
            console.log('Error submitting the form', error);
            toast.error('Error submitting the form');
        }
    };

    const handleGoToExpenses = () => {
        navigate('/expenses');
    };

    return (
        <>
            <h1>Add Expenses</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Add Expense:
                        <input
                            type="text"
                            value={expense}
                            onChange={handleExpenseChange}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Cost:
                        <input
                            type="number"
                            value={cost}
                            onChange={handleCostChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit" className="add-expenses-button">Add Expense</button>
            </form>
            <div className="button-container">
                <button onClick={handleGoToExpenses} className="go-to-expenses-button">
                    Go to Expenses
                </button>
                {/* Add another button here if needed */}
            </div>
            <ToastContainer />
        </>
    );
};

export default Main;
