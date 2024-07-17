import React from 'react';
import './main.css';
import { useState } from 'react';
import axios from 'axios';

const Main=()=>{
    const [expense, setExpense] = useState('');
    const [cost, setCost] = useState('');
  
    const handleExpenseChange = (event) => {
      setExpense(event.target.value);
    };
  
    const handleCostChange = (event) => {
      setCost(event.target.value);
    };
    const formData=new FormData();
    formData.append('expense',expense);
    formData.append('cost',cost);
    const handleSubmit=async()=>{
        try{
            const response=await axios.post('/addExpenses',
                formData
            )
            if(response.data.success){
                alert('Form submitted successfully')
            }
            else{
                alert('error')
            }
        }
        catch(error){
            console.log('Error submitting the form')
        }
    }
    return(
        <>
            <h1>Add Expenses</h1>
            <form>
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
    )
}


export default Main;