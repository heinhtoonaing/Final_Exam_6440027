"use client";
import React, { useEffect, useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const CustomerForm = ({ customer, onRefresh, onClose }) => {
  const [name, setName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [memberNumber, setMemberNumber] = useState('');
  const [interests, setInterests] = useState('');

  useEffect(() => {
    if (customer) {
      setName(customer.name);
      setDateOfBirth(customer.dateOfBirth.split('T')[0]); // Format date for input
      setMemberNumber(customer.memberNumber);
      setInterests(customer.interests);
    } else {
      setName('');
      setDateOfBirth('');
      setMemberNumber('');
      setInterests('');
    }
  }, [customer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = { name, dateOfBirth, memberNumber, interests };

    try {
      if (customer) {
        // Update existing customer
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/${customer._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerData),
        });

        if (!response.ok) {
          throw new Error('Failed to update customer');
        }
      } else {
        // Create new customer
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(customerData),
        });

        if (!response.ok) {
          throw new Error('Failed to create customer');
        }
      }

      onRefresh(); // Callback to refresh the customer list
      onClose(); // Callback to close the form
    } catch (error) {
      console.error(error);
      alert(error.message); // Show an error message to the user
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextField
        required
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        required
        label="Date of Birth"
        type="date"
        value={dateOfBirth}
        onChange={(e) => setDateOfBirth(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        required
        label="Member Number"
        type="number"
        value={memberNumber}
        onChange={(e) => setMemberNumber(e.target.value)}
        fullWidth
      />
      <TextField
        label="Interests"
        value={interests}
        onChange={(e) => setInterests(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        {customer ? 'Update Customer' : 'Add Customer'}
      </Button>
    </Box>
  );
};

export default CustomerForm;
