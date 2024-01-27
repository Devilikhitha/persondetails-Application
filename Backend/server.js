// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Form = require('./model/Schema'); 

const app = express();
const PORT = process.env.PORT || 3001;
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://devilikhitha:devilikhitha@cluster0.estft3j.mongodb.net/persondetails?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// Define your API endpoint to handle form submissions
app.post('/submitForm', async (req, res) => {
  try {
    // Create a new form document based on the model
    const newForm = new Form(req.body);

    // Save the form to the database
    await newForm.save();

    // Send a response
    res.json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Define your API endpoint to fetch form data
app.get('/getFormData', async (req, res) => {
  try {
    // Fetch all form data from the database
    const formData = await Form.find();
    res.json({ success: true, data: formData });
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// In your server.js or wherever your routes are defined
app.delete('/deleteForm/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Use Mongoose or your preferred method to delete the document by ID
    await Form.findByIdAndDelete(id);
    res.json({ success: true, message: 'Form entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting form entry:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Define your API endpoint to update a form entry
app.put('/updateForm/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Form.findByIdAndUpdate(id, req.body);
    res.json({ success: true, message: 'Form entry updated successfully' });
  } catch (error) {
    console.error('Error updating form entry:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


// Start the server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});