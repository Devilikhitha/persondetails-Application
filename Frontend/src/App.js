// App.js
// App.js
// App.js or your main entry point
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EditForm from './components/EditForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit/:id" element={<EditForm />} />
      </Routes>
    </Router>
  );
}

export default App;

















// import React from 'react';

// import  Form  from './components/HomePage'; // import statement



// function App() {
//   return (
//     <div>
//       {/* <h1>My App</h1> */}
//       <Form/>
      
//     </div>
//   );
// }

// export default App;
