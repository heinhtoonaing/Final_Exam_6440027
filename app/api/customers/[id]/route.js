// app/api/customers/[id]/route.js
import Customer from '../../../../models/Customer'; // Ensure the path is correct
import dbConnect from '../../../../lib/db'; // Ensure the path is correct

// Connect to the database
const connectToDatabase = async () => {
  await dbConnect();
};

// GET - Get a customer by ID
export async function GET(req, { params }) {
  await connectToDatabase();
  
  const { id } = params; // Extract ID from params

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return new Response(JSON.stringify({ error: 'Customer not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    return new Response(JSON.stringify(customer), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch customer' }), {
      status: 500,
    });
  }
}

// PUT - Update a customer by ID
export async function PUT(req, { params }) {
  await connectToDatabase();
  
  const { id } = params; // Extract ID from params
  const body = await req.json(); // Parse the incoming request body

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, body, { new: true });
    if (!updatedCustomer) {
      return new Response(JSON.stringify({ error: 'Customer not found' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(updatedCustomer), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update customer' }), {
      status: 400,
    });
  }
}

// DELETE - Delete a customer by ID
export async function DELETE(req, { params }) {
  await connectToDatabase();
  
  const { id } = params; // Extract ID from params

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return new Response(JSON.stringify({ error: 'Customer not found' }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify({ message: 'Customer deleted successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete customer' }), {
      status: 500,
    });
  }
}
