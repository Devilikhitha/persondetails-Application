
import React, { useState, useEffect } from 'react';
//eslint-disable-next-line
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './HomePage.css';

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/submitForm', {
        firstName,
        lastName,
        age,
        email,
        phoneNumber,
      });
      console.log('Form submitted:', response.data);
      alert('Form submitted', response.data);

      // Reset form fields
      setFirstName('');
      setLastName('');
      setAge('');
      setEmail('');
      setPhoneNumber('');

      // Refresh form data
      handleShowAllData();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleShowAllData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getFormData');
      setFormData(response.data.data);
    } catch (error) {
      console.error('Error fetching form data:', error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    // handleShowAllData();
  }, []);

  const handleEdit = (id) => {
    // Handle edit logic, you can navigate to an edit page or open a modal
    console.log('Edit button clicked for id:', id); 
     // Set the editId in the URL and let the route handle the redirection
     window.location.href = `/edit/${id}`;
  };

  // const handleDelete = async (id) => {
  //   // Prompt for confirmation before deleting
  //   const confirmDelete = window.confirm('Are you sure you want to delete this entry?');

  //   if (confirmDelete) {
  //     try {
  //       await axios.delete(`http://localhost:3001/deleteForm/${id}`);
       
  //       handleShowAllData();
  //       console.log("form deleted ")
  //       alert('Form entry deleted');
  //       // handleShowAllData();
  //     } catch (error) {
  //       console.error('Error deleting form entry:', error);
  //     }
  //   }
  // };

  const handleDelete = async (id) => {
    // Prompt for confirmation before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3001/deleteForm/${id}`);
        
        // Refresh form data after successful deletion
        handleShowAllData();
        
        // Show alert only after refreshing the data
        // alert('Form entry deleted');
      } catch (error) {
        console.error('Error deleting form entry:', error);
      }
    }
  };
  

  return (
    <div className="formcontainer">
      <form onSubmit={handleSubmit} className="booking-form" method="POST">
      <label className="form-group">
            First Name:
    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
         </label>
         <br />
         <label className="form-group">
            Last Name:
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
         </label>
        <br />
        <label className="form-group">
           Age:
           <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
        </label>
        <br />
         <label className="form-group">
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
         </label>
         <br />
         <label className="form-group">
         Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
         <br />

        <button className="formbtn" type="submit">
          Save
        </button>
      </form>

      <button className="formbtn1" onClick={handleShowAllData}>
        Show All Data
      </button>

      {formData.length > 0 && (
        <div className="table-container">
          <h2>Form Data</h2>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data) => (
                <tr key={data._id}>
                  <td>{data.firstName}</td>
                  <td>{data.lastName}</td>
                  <td>{data.age}</td>
                  <td>{data.email}</td>
                  <td>{data.phoneNumber}</td>
                  <td>
                    <button className="button-edit" onClick={() => handleEdit(data._id)}>Edit</button>
                    <button  className='button-delete'  onClick={() => handleDelete(data._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;












































// Form.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './HomePage.css';

// const Form = () => {

//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [age, setAge] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [formData, setFormData] = useState([]);

//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/submitForm', {
//         firstName,
//         lastName,
//         age,
//         email,
//         phoneNumber,
//       });
//       console.log('Form submitted:', response.data);
//       alert('Form submitted', response.data);

//       // Reset form fields
//       setFirstName('');
//       setLastName('');
//       setAge('');
//       setEmail('');
//       setPhoneNumber('');

//       // Refresh form data
//       handleShowAllData();
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleShowAllData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/getFormData');
//       setFormData(response.data.data);
//     } catch (error) {
//       console.error('Error fetching form data:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch data when the component mounts
//     // handleShowAllData();
//   }, []);

//   const handleEdit = (id) => {
//     // Handle edit logic, you can navigate to an edit page or open a modal
//     // console.log('Edit button clicked for id:', id);
//      // Navigate to the edit page with the form ID
//      navigate(`/edit/${id}`);
//   };

//   const handleDelete = async (id) => {
//     // Prompt for confirmation before deleting
//     const confirmDelete = window.confirm('Are you sure you want to delete this entry?');

//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:3001/deleteForm/${id}`);
//         alert('Form entry deleted');
//         handleShowAllData();
//       } catch (error) {
//         console.error('Error deleting form entry:', error);
//       }
//     }
//   };

//   return (
//     <div className="formcontainer">
//       <form onSubmit={handleSubmit} className="booking-form" method="POST">
//         <label className="form-group">
//           First Name:
//           <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Last Name:
//           <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Age:
//           <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Phone Number:
//           <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//         </label>
//         <br />
//         <button className="formbtn" type="submit">
//           Save
//         </button>
//       </form>

//       <button className="formbtn1" onClick={handleShowAllData}>
//         Show All Data
//       </button>

//       {formData.length > 0 && (
//         <div className="table-container">
//           <h2>Form Data</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Age</th>
//                 <th>Email</th>
//                 <th>Phone Number</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formData.map((data) => (
//                 <tr key={data._id}>
//                   <td>{data.firstName}</td>
//                   <td>{data.lastName}</td>
//                   <td>{data.age}</td>
//                   <td>{data.email}</td>
//                   <td>{data.phoneNumber}</td>
//                   <td>
//                     <button onClick={() => handleEdit(data._id)}>Edit</button>
//                     <button onClick={() => handleDelete(data._id)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Form;
















// import React, { useState,useEffect } from 'react';
// import axios from 'axios';
// import './HomePage.css';

// const Form = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [age, setAge] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [formData, setFormData] = useState([]); // State to store form data

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/submitForm', {
//         firstName,
//         lastName,
//         age,
//         email,
//         phoneNumber,
//       });
//       console.log('Form submitted:', response.data);
//       alert('Form submitted', response.data);

//       // Reset form fields
//       setFirstName('');
//       setLastName('');
//       setAge('');
//       setEmail('');
//       setPhoneNumber('');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   const handleShowAllData = async () => {
//     try {
//       // Fetch all form data from the server
//       const response = await axios.get('http://localhost:3001/getFormData');
//       setFormData(response.data.data);
//     } catch (error) {
//       console.error('Error fetching form data:', error);
//     }
//   };
// //useeffect
//   useEffect(() => {
//     // Fetch data when the component mounts
//     // handleShowAllData();
//   }, []); // Empty dependency array ensures the effect runs only once when mounted

//   return (
//     <div className="formcontainer">
//       <form onSubmit={handleSubmit} className="booking-form" method="POST">
//       <label className="form-group">
//            First Name:
//    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//            Last Name:
//            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Age:
//           <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
//         </label>
//        <br />
//         <label className="form-group">
//          Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//          <label className="form-group">
//          Phone Number:
//            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//         </label>
//         <br />
//         <button className="formbtn" type="submit">
//           Save
//         </button>
//       </form>
//       <button className="formbtn1" onClick={handleShowAllData}>
//         Show All Data
//       </button>

//       {/* Display form data in a table */}
//       {formData.length > 0 && (
//         <div className="table-container">
//           <h2>Form Data</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>First Name</th>
//                 <th>Last Name</th>
//                 <th>Age</th>
//                 <th>Email</th>
//                 <th>Phone Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               {formData.map((data) => (
//                 <tr key={data._id}>
//                   <td>{data.firstName}</td>
//                   <td>{data.lastName}</td>
//                   <td>{data.age}</td>
//                   <td>{data.email}</td>
//                   <td>{data.phoneNumber}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Form;






































// import React, { useState } from 'react';
// import axios from 'axios';
// import './HomePage.css';

// const Form = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [age, setAge] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

  



// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/submitForm', {
//         firstName,
//         lastName,
//         age,
//         email,
//         phoneNumber,
//       });
//       console.log('Form submitted:', response.data);
//       alert('Form submitted', response.data);
  
//       // Reset form fields
//       setFirstName('');
//       setLastName('');
//       setAge('');
//       setEmail('');
//       setPhoneNumber('');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
  

  

//   return (
//     <div className="formcontainer">
//       <form onSubmit={handleSubmit} className="booking-form" method="POST">
//         <h2>Book a Room</h2>
//         <p>Fill out the form below to book your room.</p>
//         <label className="form-group">
//           First Name:
//           <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Last Name:
//           <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Age:
//           <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Phone Number:
//           <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//         </label>
//         <br />
//         {/* Other form fields remain the same */}
//         <button className="formbtn" type="submit">
//           Save
//         </button>
//       </form> 
//       <button className="formbtn1">Show All Data</button>
//     </div> 

    
//   );
// };

// export default Form;











































// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './HomePage.css';

//  const Form = () => {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [age, setAge] = useState('');
//   const [email, setEmail] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

  



// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:3001/submitForm', {
//         firstName,
//         lastName,
//         age,
//         email,
//         phoneNumber,
//       });
//       console.log('Form submitted:', response.data);
//       alert('Form submitted', response.data);
  
//       // Reset form fields
//       setFirstName('');
//       setLastName('');
//       setAge('');
//       setEmail('');
//       setPhoneNumber('');
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };
  

  

//   return (
//     <div className="formcontainer">
//       <form onSubmit={handleSubmit} className="booking-form" method="POST">
//         <label className="form-group">
//           First Name:
//           <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Last Name:
//           <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Age:
//           <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Email:
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//         <label className="form-group">
//           Phone Number:
//           <input type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//         </label>
//         <br />
//         {/* Other form fields remain the same */}
//         <button className="formbtn" type="submit">
//           Save
//         </button>
//       </form>
      
//     </div> 

    
//   );
// };  

// export default Form;