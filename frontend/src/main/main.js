import React, { useState } from 'react';
import './main.css';
import axios from 'axios';

const Main = () => {
    const [expense, setExpense] = useState('');
    const [cost, setCost] = useState('');

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
                alert('Form submitted successfully');
            } else {
                alert('Error submitting the form');
            }
        } catch (error) {
            console.log('Error submitting the form', error);
            alert('Error submitting the form');
        }
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
                <button type="submit">Add Expense</button>
            </form>
        </>
    );
};

export default Main;
