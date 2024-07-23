import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  });
  const [role, setRole] = useState(() => sessionStorage.getItem('role') || '');
  const [token, setToken] = useState('');

  // const getUserProfile = async (token) => {
  //   console.log('token: ', token);
  //   try {
  //     const response = await axios.get(`${API_BASE_URL}/users/profile`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     console.log('Fetched Succesfully: ', response);
  //     setUser(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //     console.log(
  //       'Failed to get user details: ',
  //       error.data?.message || error.message
  //     );
  //   }
  // };

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    sessionStorage.setItem('userId', decodedToken.id);
    sessionStorage.setItem('role', decodedToken.role);
    sessionStorage.setItem('isAuthenticated', true);
    sessionStorage.setItem('token', token);
    setRole(decodedToken.role);
    setToken(sessionStorage.getItem('token'));
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Clear sessionStorage
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('token');
    localStorage.clear()
    sessionStorage.clear()

    setIsAuthenticated(false);
  };

  // secret key
  const secretKey = 'CafeteriaKonnect';

  // Encrypting data
  const encryptData = (data, secretKey) => {
    const ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      secretKey
    ).toString();
    return ciphertext;
  };

  // Decrypting data
  const decryptData = (ciphertext, secretKey) => {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  };

  useEffect(() => {
    setIsAuthenticated(sessionStorage.getItem('isAuthenticated') === 'true');
    setRole(sessionStorage.getItem('role') || '');
  }, [sessionStorage]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        role,
        token,
        login,
        logout,
        encryptData,
        decryptData,
        secretKey,
        // getUserProfile,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
