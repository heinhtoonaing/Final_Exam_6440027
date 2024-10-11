import Customer from '../../../models/Customer'; // Adjust this path if necessary
import dbConnect from '../../../lib/db'; // Ensure this path points to your db connection logic

// Connect to the database
const connectToDatabase = async () => {
  await dbConnect();
};

// Function to add CORS headers
const addCorsHeaders = (response) => {
  response.headers.append('Access-Control-Allow-Origin', '*'); // Allow any origin
  response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
  response.headers.append('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers
  return response;
};

// GET - Fetch all customers  
export async function GET(req) {
  await connectToDatabase();

  try {
    const customers = await Customer.find({});
    const response = new Response(JSON.stringify(customers), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return addCorsHeaders(response); // Add CORS headers
  } catch (error) {
    console.error("Error fetching customers:", error); // Log error for debugging
    const response = new Response(JSON.stringify({ error: 'Failed to fetch customers' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return addCorsHeaders(response); // Add CORS headers
  }
}

// POST - Create a new customer
export async function POST(req) {
  await connectToDatabase();

  const body = await req.json(); // Parse the incoming request body
  console.log("Incoming request body for POST:", body); // Debugging line

  try {
    const newCustomer = await Customer.create(body);
    const response = new Response(JSON.stringify(newCustomer), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return addCorsHeaders(response); // Add CORS headers
  } catch (error) {
    console.error("Error creating customer:", error); // Log the error for debugging
    const response = new Response(JSON.stringify({ error: 'Failed to create customer' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return addCorsHeaders(response); // Add CORS headers
  }
}

// PUT - Update an existing customer
export async function PUT(req) {
  await connectToDatabase();

  const body = await req.json(); // Parse the incoming request body

  try {
    const { id, ...updateData } = body; // Get ID and update data
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCustomer) {
      const response = new Response(JSON.stringify({ error: 'Customer not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return addCorsHeaders(response); // Add CORS headers
    }
    const response = new Response(JSON.stringify(updatedCustomer), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return addCorsHeaders(response); // Add CORS headers
  } catch (error) {
    console.error("Error updating customer:", error); // Log error for debugging
    const response = new Response(JSON.stringify({ error: 'Failed to update customer' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return addCorsHeaders(response); // Add CORS headers
  }
}

// DELETE - Delete a customer
export async function DELETE(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url); // Get query parameters from the request URL
  const id = searchParams.get('id'); // Assuming ID is passed as a query parameter

  if (!id) {
    const response = new Response(JSON.stringify({ error: 'ID parameter is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return addCorsHeaders(response); // Add CORS headers
  }

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      const response = new Response(JSON.stringify({ error: 'Customer not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return addCorsHeaders(response); // Add CORS headers
    }
    return new Response(null, { status: 204 }); // No content
  } catch (error) {
    console.error("Error deleting customer:", error); // Log error for debugging
    const response = new Response(JSON.stringify({ error: 'Failed to delete customer' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return addCorsHeaders(response); // Add CORS headers
  }
}
