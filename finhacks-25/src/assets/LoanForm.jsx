import { useState } from 'react';
import PropTypes from 'prop-types';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const LoanForm = ({ fetchFinances }) => {
  // State to track form inputs
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    principal: '',
    interestRate: '',
    amountPaid: ''
  });

  // State to track form validation errors
  const [errors, setErrors] = useState({
    name: '',
    date: '',
    principal: '',
    interestRate: '',
    amountPaid: ''
  });

  // State to track submission status
  const [submissionError, setSubmissionError] = useState('');

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
      name: '',
      date: '',
      principal: '',
      interestRate: '',
      amountPaid: ''
    });
    setSubmissionError('');

    // Check if all required fields are filled and valid
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Loan name is required';
      isValid = false;
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
      isValid = false;
    }
    if (!formData.principal) {
      newErrors.principal = 'Principal amount is required';
      isValid = false;
    } else if (isNaN(formData.principal) || parseFloat(formData.principal) <= 0) {
      newErrors.principal = 'Principal must be a positive number';
      isValid = false;
    }
    if (!formData.interestRate) {
      newErrors.interestRate = 'Annual interest rate is required';
      isValid = false;
    } else if (isNaN(formData.interestRate) || parseFloat(formData.interestRate) < 0) {
      newErrors.interestRate = 'Interest rate must be a valid number';
      isValid = false;
    }
    if (!formData.amountPaid) {
      newErrors.amountPaid = 'Amount already paid is required';
      isValid = false;
    } else if (isNaN(formData.amountPaid) || parseFloat(formData.amountPaid) < 0) {
      newErrors.amountPaid = 'Amount paid must be a non-negative number';
      isValid = false;
    }

    // If any validation fails, set the errors state and return
    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    // Convert values to numbers
    const principal = parseFloat(formData.principal);
    const interestRate = parseFloat(formData.interestRate);
    const amountPaid = parseFloat(formData.amountPaid);

    // Insert data into Supabase
    const { error } = await supabase.from("educational").insert([
      {
        date: formData.date,
        name: formData.name,
        interest_rate: interestRate,
        principal: principal,
        paid: amountPaid
      }
    ]);

    // Handle Supabase insertion error
    if (error) {
      setSubmissionError(`Error: ${error.message}`);
      return;
    }

    // Optionally reset the form after submission
    setFormData({
      name: '',
      date: '',
      principal: '',
      interestRate: '',
      amountPaid: ''
    });

    // Fetch updated loans list after submitting the form
    fetchFinances();
  };

  return (
    <div>
      <h1>Loan Financing Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Loan Name</label>
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
          <label>Date Taken</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
        </div>

        <div>
          <label>Principal Amount ($)</label>
          <input
            type="text"
            name="principal"
            value={formData.principal}
            onChange={handleChange}
            required
          />
          {errors.principal && <p style={{ color: 'red' }}>{errors.principal}</p>}
        </div>

        <div>
          <label>Annual Interest Rate (%)</label>
          <input
            type="text"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleChange}
            required
          />
          {errors.interestRate && <p style={{ color: 'red' }}>{errors.interestRate}</p>}
        </div>

        <div>
          <label>Amount Already Paid ($)</label>
          <input
            type="text"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            required
          />
          {errors.amountPaid && <p style={{ color: 'red' }}>{errors.amountPaid}</p>}
        </div>

        <button className='submitButton' type="submit">Submit</button>
      </form>

      {submissionError && <p style={{ color: 'red' }}>{submissionError}</p>}
    </div>
  );
};

// Validate the props using PropTypes
LoanForm.propTypes = {
  fetchFinances: PropTypes.func.isRequired // Validate fetchFinances as a required function
};

export default LoanForm;
