import React from 'react';
import './expense.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Expense = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['expense'],
        queryFn: async () => {
            const response = await fetch("https://expenseslist.onrender.com/expenses");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const response = await fetch(`https://expenseslist.onrender.com/expensedelete/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['expense']);
            toast.success('Expense Deleted');
        },
    });

    const handleDelete = (id) => {
        deleteMutation.mutate(id);
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <>
            <h1>Expenses List</h1>
            {data && data.length === 0 ? (
                <p>No expenses available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Expense</th>
                            <th>Cost</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((expense) => (
                            <tr key={expense._id}>
                                <td>{expense.expense}</td>
                                <td>{expense.cost}</td>
                                <td>
                                    <button onClick={() => handleDelete(expense._id)} className='Del'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ToastContainer />
        </>
    );
};

export default Expense;
