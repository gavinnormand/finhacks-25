import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import PersonalForm from "../assets/PersonalForm.jsx";
import SpendingBreakdown from "../assets/SpendingBreakdown.jsx";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const Personal = () => {
  const [finances, setFinances] = useState([]);
  const [csvData, setCsvData] = useState(null);

  const fetchFinances = async () => {
    const { data, error } = await supabase.from("personal").select();
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setFinances(data);
      const csv = convertToCSV(data);
      console.log("Generated CSV:", csv);
      setCsvData(csv);
    }
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";
    const headers = Object.keys(data[0]).join(",") + "\n";
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    return headers + rows;
  };

  const deleteFinance = async (id) => {
    const { error } = await supabase.from("personal").delete().eq("id", id);
    if (error) {
      console.error("Error deleting finance:", error);
    } else {
      fetchFinances();
    }
  };

  useEffect(() => {
    fetchFinances();
  });

  return (
    <div>
      <PersonalForm fetchFinances={fetchFinances} />
      <h2>Your Expenses:</h2>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date Purchased</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {finances.map((finance) => (
            <tr key={finance.id}>
              <td>{finance.name}</td>
              <td>{finance.category}</td>
              <td>{finance.amount}</td>
              <td>{finance.date_purchased}</td>
              <td>
                <button
                  className="deleteButton"
                  onClick={() => deleteFinance(finance.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pass the CSV data to SpendingBreakdown */}
      <SpendingBreakdown csvData={csvData} />
    </div>
  );
};

export default Personal;
