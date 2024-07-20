import express,{json} from 'express';
import cors from 'cors';
import {db,connectToDB} from "./db.js";
const app=express()
import Expense from './expenses.js';
app.use(express.json())

app.use(cors())

connectToDB(() => {
    app.listen(8000, () => {
      console.log(`Server started at 8000`);
    });
  });
  
  app.get('/', (req, res) => {
    res.send("Server Running Successfully ✅");
  });
  
  app.get('/hello', (req, res) => {
    res.status(200).send('OK');
  });
  

// app.post('/addexpenses',async(req,res)=>{
//     const { expense, cost } = req.body;

//     if (!expense || !cost) {
//         return res.status(400).json({ success: false, message: 'Missing required fields' });
//     }
//     const cred_s=await db.collection('expenses').insertOne(
//         {
//             expense,
//             cost
//         }
//         );
//     // Simulate saving the data (in a real app, you'd save this to a database)
//     console.log(`Expense: ${expense}, Cost: ${cost}`);

//     // Respond with a success message
//     res.status(200).json({ success: true, message: 'Expense added successfully' });
// })


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
