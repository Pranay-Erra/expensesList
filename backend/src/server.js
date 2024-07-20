import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';
import { db, connectToDB } from './db.js';

const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

connectToDB(() => {
    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  });
  

app.get('/', (req, res) => {
    res.send("Server Running Successfully ✅");
});

app.get('/hello', (req, res) => {
    res.status(200).send('OK');
});

app.post('/addExpenses', async (req, res) => {
    const { expense, cost } = req.body;

    if (!expense || !cost) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const expensesCollection = db.collection('expenses');
        await expensesCollection.insertOne({ expense, cost });
        res.status(200).json({ success: true, message: 'Expense added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/expenses', async (req, res) => {
    try {
        const details = await db.collection('expenses').find().toArray();
        res.json(details);
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Function to validate ObjectId format
const isValidObjectId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

// DELETE endpoint to remove an expense by ID
app.delete('/expensedelete/:id', async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }

    try {
        const expensesCollection = db.collection('expenses');
        const result = await expensesCollection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'Expense not found' });
        }

        res.status(200).json({ success: true, message: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});
