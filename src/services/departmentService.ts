import axios from "axios";
import { Department } from "../models/Department";

const API_URL = 'http://localhost:8080/api/departments';

export const getDeparments = async() => {
    return axios.get<Department[]>(API_URL);
}