# Employee Management Frontend

This is the frontend application for the Employee Management system. It allows users to create, edit, view, and delete employee records. The application is built using React and TypeScript.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (>= 12.x)
- npm (>= 6.x) or yarn (>= 1.x)

## Installation

Follow these steps to install the necessary dependencies and set up the application:

1. **Clone the repository:**

   git clone https://github.com/rewatpun10/employee-management-frontend.git
   cd employee-management-frontend

 2. **Install dependencies:**
   Using npm: npm install
   Using yarn: yarn install

## Running the Application
   Using npm: npm start
   Using yarn: yarn start

   The application will run at http://localhost:3000.

## usage

Home Page
The home page displays a list of all employees with pagination and a search feature.

//Pagination
The employee list is paginated, displaying 10 employees per page.
When there are more than 10 employees, additional pages are added.
For example, if there are 50 employees, the pagination will include 5 pages, each showing 10 employees.
Users can navigate between pages using the "Previous" and "Next" buttons, or by clicking on the specific page numbers.

// Adding an Employee
Click on the "Add Employee" button on the home page.
Fill in the employee details in the form.
Click "Submit" to save the new employee.
A success message will be displayed, and you will be redirected to the home page.


// Editing an Employee
Click the "Edit" button next to the employee you want to edit.
Update the employee details in the form.
Click "Submit" to save the changes.
A success message will be displayed, and you will be redirected to the home page.


// Viewing an Employee
Click the "View" button next to the employee you want to view.
The employee details will be displayed in a read-only format.

// Deleting an Employee
Click the "Delete" button next to the employee you want to delete.
Confirm the deletion in the confirmation modal.
The employee will be deleted, and the list will be updated.

// Searching Employees
The home page includes a search field to filter employees by their name.
As you type in the search field, it performs a search on the backend to fetch and display the relevant employees.
The search results are also paginated, similar to the main employee list.

## api-endpoints

The frontend application interacts with the following backend API endpoints:

GET /api/employees - Retrieve all employees

GET /api/employees/{id} - Retrieve an employee by ID

POST /api/employees - Create a new employee

PUT /api/employees/{id} - Update an existing employee

DELETE /api/employees/{id} - Delete an employee

GET /api/departments - Retrieve all departments

GET /api/employees/search - Search employees by name with pagination

Ensure your backend server is running and accessible at http://localhost:8080.

