import React from "react";
import { Employee } from "../models/Employee";

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (id: number) => void;
    onView: (id: number) => void;
    onDelete: (id: number) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onView, onDelete }) => {
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={employee.id} onClick={() => onView(employee.id)} className="table-row">
                            <td>{index + 1}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.department.name}</td>
                            <td>
                                <button className="button button-edit" onClick={(e) => { e.stopPropagation(); onEdit(employee.id); }}>Edit</button>
                                <button className="button button-delete" onClick={(e) => { e.stopPropagation(); onDelete(employee.id); }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeTable;