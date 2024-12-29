import axios from 'axios'


export const apiClient = axios.create({
    baseURL:"http://localhost:8080/",
    timeout:5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  }  
})