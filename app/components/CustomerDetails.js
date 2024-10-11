// CustomerDetails.js
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Typography, Box, CircularProgress } from '@mui/material';
import { apiCall } from '../../../lib/api'; // Import the apiCall utility

const CustomerDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get customer ID from the query parameters
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) return; // If ID is not available, return early
      try {
        const data = await apiCall(`${process.env.NEXT_PUBLIC_API_BASE}/${id}`);
        setCustomer(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) return <CircularProgress />; // Show loading spinner while fetching data

  if (!customer) {
    return <Typography variant="h6">Customer not found</Typography>; // Handle case where customer is not found
  }

  return (
    <Box>
      <Typography variant="h4">{customer.name}</Typography>
      <Typography variant="body1">Date of Birth: {new Date(customer.dateOfBirth).toLocaleDateString()}</Typography>
      <Typography variant="body1">Member Number: {customer.memberNumber}</Typography>
      <Typography variant="body1">Interests: {customer.interests}</Typography>
      {/* Add any additional fields you want to display here */}
    </Box>
  );
};

export default CustomerDetails;
