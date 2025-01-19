import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const PersonalForm = ({ fetchFinances }) => { // Added fetchFinances as a prop
  // State to track form inputs
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    amount: '',
    date: ''
  });

  // State to track form validation errors
  const [errors, setErrors] = useState({
    category: '',
    name: '',
    amount: '',
    date: ''
  });

  // State to track submission status
  const [submissionError, setSubmissionError] = useState('');

  // Available categories for the dropdown
  const categories = [
    'Clothes',
    'Groceries',
    'Living Expenses',
    'Travel/Transportation',
    'Savings and Investments',
    'Subscriptions',
    'Income',
    'Medical Expenses',
    'Charity',
    'Church',
    'Gifts',
    'Rent',
    'Utilities',
    'Food',
    'Misc. Shopping',
    'Electronics'
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors and submission error
    setErrors({
      category: '',
      name: '',
      amount: '',
      date: ''
    });
    setSubmissionError('');

    // Check if all required fields are filled
    let isValid = true;
    const newErrors = {};

    if (!formData.category) {
      newErrors.category = 'Category is required';
      isValid = false;
    }
    if (!formData.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
      isValid = false;
    } else if (isNaN(formData.amount)) {
      newErrors.amount = 'Amount must be a valid number';
      isValid = false;
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }

    // If any validation fails, set the errors state and return
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Convert amount to a number
    const amount = parseFloat(formData.amount);

    // If all fields are valid, you can process the form (e.g., submit it)
    const { error } = await supabase.from("personal").insert([
      {
        name: formData.name,
        amount: amount,  // Convert amount to number
        category: formData.category,
        date_purchased: formData.date
      }
    ]);

    // Handle Supabase insertion error
    if (error) {
      setSubmissionError(`Error: ${error.message}`);
      return;
    }

    // Optionally reset the form after submission
    setFormData({
      category: '',
      name: '',
      amount: '',
      date: ''
    });

    // Fetch updated finances list after submitting the form
    fetchFinances();
  };

  return (
    <div className='center'>
      <h1>Enter Your Personal Finances!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>}
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>

        <div>
          <label>Amount:</label>
          <input
            type="text"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          {errors.amount && <p style={{ color: 'red' }}>{errors.amount}</p>}
        </div>

        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
        </div>

        <button className="submitButton" type="submit">Submit</button>
      </form>

      {submissionError && <p style={{ color: 'red' }}>{submissionError}</p>}
    </div>
  );
};

// Validate the props using PropTypes
PersonalForm.propTypes = {
  fetchFinances: PropTypes.func.isRequired // Validate fetchFinances as a required function
};

export default PersonalForm;
