'use client'; // This line enables the component to be a client component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Keep this import
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const CustomerList = ({ onEdit, onRefresh }) => {
  const [customers, setCustomers] = useState([]);
  const router = useRouter(); // Initialize the router

  const fetchCustomers = async () => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const loadCustomers = async () => {
    const data = await fetchCustomers();
    if (data) setCustomers(data);
  };

  useEffect(() => {
    loadCustomers();
  }, [onRefresh]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }
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
                <Button onClick={() => onEdit(customer)}>Edit</Button>
                <Button onClick={() => handleDelete(customer._id)} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerList;
