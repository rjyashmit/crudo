const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const model = require('./model');
const Student = require('./model'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));
console.log('Mongo URI:', process.env.MONGO_URI);

app.post('/save', async function (req, res) {
    const newStudent = new model(req.body); 

    try {
        const savedStudent = await newStudent.save(); 
        res.status(201).send("Data inserted"); 
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error inserting data"); 
    }
});


app.get('/findall', async function (req, res) {
    try {
        const data = await model.find(); 
        res.send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error retrieving data");
    }
});

// app.delete('/delete', async function (req, res) {
//     try {
//         const result = await model.deleteOne({ StudentId: 171 }); 
//         if (result.deletedCount === 0) {
//             return res.status(404).send("No data found to delete");
//         }
//         console.log("Data deleted!");
//         res.send("Data deleted successfully");
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send("Error deleting data");
//     }
// });


// app.delete('/deleteById/:id}', async function (req, res) {
//     try {
//         const data = await model.findByIdAndDelete(req.params.id);
//         if (!data) {
//             return res.status(404).send("No data found to delete");
//         }
//         console.log("Data Deleted!");
//         res.send(data);
//     } catch (err) {
//         console.log(err);
//         return res.status(500).send("Error deleting data");
//     }
// });

// app.delete('/delete', async function (req, res) {
//     try {
//         const studentId = req.body.StudentId;  // Assuming StudentId is sent in the body

//         if (!studentId) {
//             return res.status(400).send("StudentId is required for deletion");
//         }

//         // Delete by StudentId
//         const result = await Student.deleteOne({ StudentId: studentId});

//         if (result.deletedCount === 0) {
//             return res.status(404).send("No student found with the given StudentId");
//         }

//         console.log(`Student with StudentId ${studentId} deleted!`);
//         return res.send(`Student with StudentId ${studentId} deleted successfully`);

//     } catch (err) {
//         console.log(err);
//         return res.status(500).send("Error deleting student data");
//     }
// });

app.delete('/delete', async function (req, res) {
    try {
        const studentId = req.body.StudentId;  // Ensure this line is executed

        // Some other code...

        console.log(studentId); // This should work if studentId is defined
    } catch (err) {
        console.error(err);
        return res.status(500).send("Error deleting student data");
    }
});

app.put('/update', async function (req, res) {
    try {
        const data = await model.findByIdAndUpdate(req.body.id, { Name: req.body.Name }, { new: true });
        if (!data) {
            return res.status(404).send("No data found to update");
        }
        console.log("Data updated!");
        res.send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Error updating data");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));