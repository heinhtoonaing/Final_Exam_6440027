// CustomerList.js
"use client"; // This line enables the component to be a client component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Keep this import
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { apiCall } from '../../../lib/api'; // Import the apiCall utility

const CustomerList = ({ onEdit, onRefresh }) => {
  const [customers, setCustomers] = useState([]);
  const router = useRouter(); // Initialize the router

  const loadCustomers = async () => {
    try {
      const data = await apiCall(process.env.NEXT_PUBLIC_API_BASE);
      setCustomers(data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [onRefresh]);

  const handleDelete = async (id) => {
    try {
      await apiCall(`${process.env.NEXT_PUBLIC_API_BASE}/${id}`, {
        method: 'DELETE',
      });

      loadCustomers(); // Refresh the customer list after deletion
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleRowClick = (customerId) => {
    router.push(`/customers/${customerId}`); // Navigate to customer details page
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Date of Birth</TableCell>
            <TableCell>Member Number</TableCell>
            <TableCell>Interests</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer._id} onClick={() => handleRowClick(customer._id)} style={{ cursor: 'pointer' }}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{new Date(customer.dateOfBirth).toLocaleDateString()}</TableCell>
              <TableCell>{customer.memberNumber}</TableCell>
              <TableCell>{customer.interests}</TableCell>
              <TableCell>
                <Button onClick={(e) => { e.stopPropagation(); onEdit(customer); }}>Edit</Button>
                <Button onClick={(e) => { e.stopPropagation(); handleDelete(customer._id); }} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerList;
