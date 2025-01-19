import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import LoanForm from "../assets/LoanForm.jsx";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Educational = () => {
  const [loans, setLoans] = useState([]);
  const [monthlyPayment, setMonthlyPayment] = useState("");

  const fetchLoans = async () => {
    const { data, error } = await supabase.from("educational").select();
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setLoans(data);
    }
  };

  const deleteLoan = async (id) => {
    const { error } = await supabase.from("educational").delete().eq("id", id);
    if (error) {
      console.error("Error deleting loan:", error);
    } else {
      fetchLoans();
    }
  };

  const calculateAllocations = () => {
    if (!monthlyPayment || isNaN(monthlyPayment) || monthlyPayment <= 0) {
      alert("Please enter a valid monthly payment.");
      return;
    }

    const totalInterestRate = loans.reduce(
      (sum, loan) => sum + parseFloat(loan.interest_rate || 0),
      0
    );

    if (totalInterestRate === 0) {
      alert("No interest rates found to allocate payments.");
      return;
    }

    const updatedLoans = loans.map((loan) => {
      const allocation = (
        (loan.interest_rate / totalInterestRate) *
        monthlyPayment
      ).toFixed(2);
      return { ...loan, allocation };
    });

    setLoans(updatedLoans);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <div>
      <LoanForm fetchFinances={fetchLoans} />
      <h3>Monthly Payment:</h3>
      <div style={{ textAlign: "center" }}>
        <input
          type="number"
          placeholder="Enter a payment"
          value={monthlyPayment}
          onChange={(e) => setMonthlyPayment(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button onClick={calculateAllocations}>Calculate Allocations</button>
      </div>
      <h2>Your Loans:</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Interest Rate</th>
            <th>Principal</th>
            <th>Paid</th>
            <th>Allocation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.id}>
              <td>{loan.name}</td>
              <td>{loan.interest_rate}</td>
              <td>{loan.principal}</td>
              <td>{loan.paid}</td>
              <td>{loan.allocation ? `$${loan.allocation}` : "-"}</td>
              <td>
                <button
                  className="deleteButton"
                  onClick={() => deleteLoan(loan.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Educational;
