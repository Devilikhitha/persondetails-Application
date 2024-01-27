// EditForm.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './EditForm.css';

const EditForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phoneNumber: '',
  });

  useEffect(() => {
    // Fetch data for the specific ID when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/getFormData/${id}`);
        setFormData(response.data.data);
        // Set other form field values based on response.data
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async () => {
    try {
      // Send a request to update the form data
      await axios.put(`http://localhost:3001/updateForm/${id}`, formData);
      // Handle success, e.g., redirect to the main form page
      window.location.href = '/';
    } catch (error) {
      console.error('Error updating form entry:', error);
    }
  };

  const handleChange = (e) => {
    // Update the state when form fields change
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edit-form-container">
      <h2>Edit Form Entry</h2>
      <form>
        <label  className="edit-form-label">
          First Name:
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange} 
            className="edit-form-input"
          />
        </label>
        <br />
        <label  className="edit-form-label">
          Last Name:
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange} 
            className="edit-form-input"
          />
        </label>
        <br />
        <label  className="edit-form-label">
          Age:
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="edit-form-input"
          />
        </label>
        <br />
        <label  className="edit-form-label">
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="edit-form-input"
          />
        </label>
        <br />
        <label  className="edit-form-label">
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="edit-form-input"
          />
        </label>
        <br />
        <button type="button" onClick={handleUpdate}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditForm;























































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditForm = ({ match, history }) => {
//   const [editedData, setEditedData] = useState({
//     firstName: '',
//     lastName: '',
//     age: '',
//     email: '',
//     phoneNumber: '',
//   });

//   useEffect(() => {
//     // Fetch data for the specified ID when the component mounts
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3001/getFormData/${match.params.id}`);
//         setEditedData(response.data.data);
//       } catch (error) {
//         console.error('Error fetching form data for edit:', error);
//       }
//     };

//     fetchData();
//   }, [match.params.id]);

//   const handleSave = async () => {
//     try {
//       await axios.put(`http://localhost:3001/updateForm/${match.params.id}`, editedData);
//       alert('Form entry updated successfully');
//       // Redirect back to the main page or the page displaying all data
//       history.push('/');
//     } catch (error) {
//       console.error('Error updating form entry:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   return (
//     <div>
//       <h2>Edit Form Entry</h2>
//       <form>
//         <label>
//           First Name:
//           <input
//             type="text"
//             name="firstName"
//             value={editedData.firstName}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Last Name:
//           <input
//             type="text"
//             name="lastName"
//             value={editedData.lastName}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Age:
//           <input type="text" name="age" value={editedData.age} onChange={handleInputChange} />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input
//             type="email"
//             name="email"
//             value={editedData.email}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <label>
//           Phone Number:
//           <input
//             type="text"
//             name="phoneNumber"
//             value={editedData.phoneNumber}
//             onChange={handleInputChange}
//           />
//         </label>
//         <br />
//         <button type="button" onClick={handleSave}>
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditForm;
