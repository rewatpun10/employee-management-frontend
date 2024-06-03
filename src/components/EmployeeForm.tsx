import React, { useEffect, useState } from "react"
import { Employee } from "../models/Employee";
import { getDeparments } from "../services/departmentService";
import { Department } from "../models/Department";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, updateEmployee, createEmployee } from "../services/employeeService";


interface EmployeeFormProps {
    onSubmit: (data: Employee) => void;
    mode: 'create' | 'edit' | 'view';
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onSubmit, mode }) => {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [departmentId, setDepartmentId] = useState<number | ''>('');
    const [departments, setDepartments] = useState<Department[]>([]);
    const [backendError, setBackendError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const [errors, setErrors] = useState<{ [KEY: string]: string}>({});

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDepartments = async () => {
            const { data } = await getDeparments();
            setDepartments(data);
        };
        fetchDepartments();

        if (id) {
            const fetchEmployee = async () => {
                try {
                    const employee = await getEmployeeById(Number(id));
                    setFirstName(employee.firstName);
                    setLastName(employee.lastName);
                    setEmail(employee.email);
                    setDepartmentId(employee.department.id);
                } catch (error) {
                    setBackendError('Employee with the specified ID not found');
                }
            };
            fetchEmployee();
        }
    }, [id]);

    const handleValidation = () => {
        let valid = true;
        let errors: {[key: string]: string} = {};

        if (!firstName) {
            valid = false;
            errors.firstName = 'First name is required';
        }

        if (!lastName) {
            valid = false;
            errors.lastName = 'Last name is required';
        }

        if (!email) {
            valid = false;
            errors.email = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
            valid = false;
            errors.email = 'Invalid email address';
        }

        if (!departmentId) {
            valid = false;
            errors.departmentId = 'Department is required;'
        }

        setErrors(errors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBackendError(null);
        if (handleValidation()) {
            const employee: Employee = {
                id: id ? Number(id) : 0,
                created: id ? new Date() : new Date(),
                firstName,
                lastName,
                email,
                department: { id: Number(departmentId), name: '' }
            };
            try {
                if (id) {
                    await updateEmployee(employee);
                    setSuccessMessage(`User with name ${firstName} ${lastName} updated successfully`);
                } else {
                    await createEmployee(employee);
                    setSuccessMessage(`User with name ${firstName} ${lastName} added successfully`);
                }
                setTimeout(() => {
                    navigate('/');
                }, 1000); // Redirect after 1 seconds
            } catch (error: any) {
                if (error.response && error.response.data) {
                    setBackendError(error.response.data || 'An error occurred');
                } else {
                    setBackendError('An error occurred');
                }
            }
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    // Update state and clear specific error on change
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
    };

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        let emailError = '';
        if (!newEmail) {
            emailError = 'Email is required';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newEmail)) {
            emailError = 'Invalid email address';
        }
        setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
    };

    const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDepartmentId(Number(e.target.value));
        setErrors((prevErrors) => ({ ...prevErrors, departmentId: '' }));
    };

    return (
        <div className="form-container">
            <h1>{mode === 'edit' ? "Edit Employee" : mode === 'view' ? "View Employee" : "Create Employee"}</h1>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        disabled={mode === 'view'}
                    />  
                    {errors.firstName && <span className="error-message">{errors.firstName}</span>} 
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={handleLastNameChange}
                        disabled={mode === 'view'}
                    />
                    {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        disabled={mode === 'view'}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <select
                        value={departmentId}
                        onChange={handleDepartmentChange}
                        disabled={mode === 'view'}
                        >
                        <option value= "">Select a department</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                    {errors.departmentId && <span className="error-message">{errors.departmentId}</span>}
                </div>

                {backendError && <div className="error-message">{backendError}</div>}

                <div className="button-container">
                    {mode !== 'view' && <button type="submit" className="button-submit">Submit</button>}
                    <button type="button" className="button-back" onClick={handleBack}>Back</button>
                </div>
            </form>
         </div>
    );
};
export default EmployeeForm;