import { useEffect, useState, useCallback } from "react"
import { Employee } from "../models/Employee";
import { deleteEmployee, getEmployees, searchEmployees, getEmployeeById } from "../services/employeeService";
import EmployeeTable from "./EmployeeTable";
import React from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import { useDebounce } from "../hooks/useDebounce";
import { Page } from "../models/Page";



const Home: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);

    const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);

    //for searching employee with name
    const [searchQuery, setSearchQuery] = useState('');

    //for pagination setup
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const fetchEmployees = async (page:number , query: string = '') => {
        const data: Page<Employee> = query ? await searchEmployees(query, page, 10) : await getEmployees(page, 10); // Page size is 5
        setEmployees(data.content);
        setTotalPages(data.totalPages);
    };

    useEffect(() => {
        fetchEmployees(page, searchQuery);
    }, [page, searchQuery]);

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query);
        setPage(0);  // Reset to first page when a new search is performed
    }, []);

    //for delaying the execution of the handleSearch funtion
    const debouncedSearch = useDebounce(handleSearch, 300);

    const handleEdit = async (id: number) => {
        try {
            await getEmployeeById(id);
            navigate(`/employee/edit/${id}`);
        } catch (error) {
            setErrorMessage('Employee with the specified ID not found');
            setErrorModalOpen(true);
        }

    };

    const handleView = async (id: number) => {
        try {
            await getEmployeeById(id);
            navigate(`/employee/view/${id}`);
        } catch (error) {
            setErrorMessage('Employee with the specified ID not found');
            setErrorModalOpen(true);
        }
    };

    const handleDelete = async (id: number) => {
        setEmployeeToDelete(id);
        setIsModalOpen(true);
    };

    const confirmDelete = async () => {
        if (employeeToDelete !== null) {
            await deleteEmployee(employeeToDelete);
            fetchEmployees(page);
            setIsModalOpen(false);
            setEmployeeToDelete(null);
        }
    };

    const cancelDelete = () => {
        setIsModalOpen(false);
        setEmployeeToDelete(null);
    };

    const handleAdd = () => {
        navigate('/employee/new');
    };

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        debouncedSearch(e.target.value);
    };

    const handleNextPage = () => {
        if (page < totalPages - 1) {
            setPage(page + 1);
        }
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pages = [];
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <button
                    key={i}
                    className="pagination-button"
                    onClick={() => handlePageClick(i)}
                    disabled={i === page}
                    style={i === page ? { fontWeight: 'bold', backgroundColor: 'lightgray' } : {}}
                >
                    {i + 1}
                </button>
            );
        }
        return pages;
    };


    return (
        <div className="container">
            <h1>Employee List</h1>
            <div className="button-container">
                <input
                    type="text"
                    placeholder="Search by partial name"
                    value={searchQuery}
                    onChange={onSearchChange}
                />
                <button onClick={(handleAdd)}>Add Employee</button>
            </div>

            <EmployeeTable employees={employees} onEdit={handleEdit}  onView={handleView} onDelete={handleDelete} />

            <div className="pagination-container">
                <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
                {renderPageNumbers()}
                <button onClick={handleNextPage} disabled={page >= totalPages - 1}>Next</button>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                message="Are you sure you want to delete this employee?"
            />
        </div>
    );
};

export default Home;