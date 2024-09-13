// services/api.js
import axios from 'axios';
import {API_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/login`, {
      email: email,
      password: password
    });
    console.log('Login successful:', response.data);
    await AsyncStorage.setItem('token', response.data.token);
    return response.data; // Return data for further processing, e.g., saving the token
  } catch (error) {
    console.error('Login error:', error.response && error.response.data ? error.response.data : 'API Error');
    throw error; // Throw error to be handled by the calling function
  }
};

export const signup = async (name, phone, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/users/signup`, {
      name: name,
      phone: phone,
      email: email,
      password: password
    });
    console.log('Signup successful:', response.data);
    return response.data; // Return data for further processing
  } catch (error) {
    console.error('Signup error:', error.response && error.response.data ? error.response.data : 'API Error');
    throw error; // Throw error to be handled by the calling function
  }
};



export const getAvailableSlots = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/Slot/slots`, {
      headers: {
        Authorization: `Bearer ${yourTokenHere}`, // Ensure you're passing the user's token
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Could not fetch slots');
  }
};

export const bookSlot = async (slotId) => {
  try {
    const response = await axios.post(`${API_URL}/api/slots/book/${slotId}`, {}, {
      headers: {
        Authorization: `Bearer ${yourTokenHere}` // Ensure you're passing the user's token
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to book slot');
  }
};

// services/api.js

export const fetchUserName = async () => {
   try {
     const token = await AsyncStorage.getItem('token');
     if (!token) {
       throw new Error('Authentication token not available');
     }

     const response = await axios.get(`${API_URL}/api/users/name`, {
       headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'application/json'
       }
     });

     if (response.status !== 200) {
       throw new Error('Failed to fetch user data');
     }

     return response.data.name;  // assuming the backend sends the name as { name: 'User Name' }
   } catch (error) {
     console.error('Error fetching user name:', error);
     return ''; // Optionally handle the error differently
   }
 };


export const storeToken = async (token) => {
    try {
        await AsyncStorage.setItem('token', token);
    } catch (error) {
        console.error('Error saving token:', error);
    }
};

export const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.error('Error fetching token:', error);
        return null;
    }
 };
 export const removeToken = async () => {
     try {
         await AsyncStorage.removeItem('token');
     } catch (error) {
         console.error('Error removing token:', error);
     }
 };
