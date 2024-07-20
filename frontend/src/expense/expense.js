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
            const response = await fetch("http://localhost:8000/expenses");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const response = await fetch(`http://localhost:8000/expensedelete/${id}`, {
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
                                <button onClick={() => handleDelete(expense._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ToastContainer />
        </>
    );
};

export default Expense;
