const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: String,
  email: String,
  phoneNumber: String,
});

const Form = mongoose.model('Form', formSchema);

module.exports=Form;