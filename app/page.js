"use client";
import * as React from 'react';
import CustomerList from './components/CustomerList';
import CustomerForm from './components/CustomerForm';
import { Container, Button } from '@mui/material';

export default function HomeV2() {
  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [refresh, setRefresh] = React.useState(false);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleClose = () => {
    setSelectedCustomer(null);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <main>
      <div className="w-full h-full my-10 mx-10">
        <h1 className="font-bold text-xl">Stock App</h1>
        <p>Simple stock management</p>

        <Button variant="contained" onClick={() => setSelectedCustomer(null)}>
          Add New Customer
        </Button>

        <CustomerList onEdit={handleEdit} onRefresh={refresh} />
        <CustomerForm customer={selectedCustomer} onRefresh={handleRefresh} onClose={handleClose} />
      </div>
    </main>
  );
}
