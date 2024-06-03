import React from 'react';
import './App.css';
import Home from './components/Home';
import EmployeeForm from './components/EmployeeForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Employee } from './models/Employee';
import { createEmployee, updateEmployee } from './services/employeeService';
import Header from './components/Header';

const App = () => {
  const handleFormSubmit = async (data) => {
      if (data.id) {
          await updateEmployee(data);
      } else {
          await createEmployee(data);
      }
  };

  return (
      <Router>
        <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employee/new" element={<EmployeeForm mode="create" onSubmit={handleFormSubmit} />} />
              <Route path="/employee/edit/:id" element={<EmployeeForm mode="edit" onSubmit={handleFormSubmit} />} />
              <Route path="/employee/view/:id" element={<EmployeeForm mode="view" onSubmit={handleFormSubmit} />} />
          </Routes>
      </Router>
  );
};



export default App;
