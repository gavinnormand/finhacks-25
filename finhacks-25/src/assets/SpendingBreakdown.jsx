import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const SpendingBreakdown = ({ csvData }) => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!csvData) {
      return;
    }

    const fetchGraph = async () => {
      try {
        const response = await fetch("http://localhost:5000/upload_csv", {
          method: "POST",
          headers: {
            "Content-Type": "text/csv",
          },
          body: csvData,
        });

        if (response.ok) {
          const result = await response.json();
          setImage(result.data);
        } else {
          setError("Failed to fetch the spending breakdown.");
        }
      } catch (err) {
        setError("Error communicating with the server." + err);
      }
    };

    fetchGraph();
  }, [csvData]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {image ? (
        <img
          className="center"
          src={`data:image/png;base64,${image}`}
          alt="Spending Breakdown"
        />
      ) : (
        <p>Loading graph...</p>
      )}
    </div>
  );
};

// Validate props
SpendingBreakdown.propTypes = {
  csvData: PropTypes.string.isRequired,
};

SpendingBreakdown.defaultProps = {
  csvData: "",
};

export default SpendingBreakdown;
