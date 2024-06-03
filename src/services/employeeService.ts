import axios from "axios";
import { Employee } from "../models/Employee";
import { Page } from "../models/Page";

const API_URL = 'http://localhost:8080/api/employees';

//fetching all the employees
export const getEmployees = async (page: number, size: number) => {
    const response = await axios.get<Page<Employee>>(`${API_URL}?page=${page}&size=${size}`);
    return response.data;
};

//fetching single employee
export const getEmployeeById = async (id: number) => {
    try {
        const response = await axios.get<Employee>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
            throw new Error('Employee with the specified ID not found');
        } else {
            throw new Error('An error occurred while fetching the employee');
        }
    }
};

//creating a new employee
export const createEmployee = async (employee: Employee) => {
    return axios.post<Employee>(API_URL, employee);
};

//updating a employee
export const updateEmployee = async (employee: Employee) => {
    return axios.put<Employee>(`${API_URL}/${employee.id}`, employee);
};

//delete employee
export const deleteEmployee = async (id: number) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const searchEmployees = async (query: string, page: number, size: number) => {
    const response = await axios.get<Page<Employee>>(`${API_URL}/search`, {
        params: {
            query,
            page,
            size
        }
    });
    return response.data; // Extract the data property
};
