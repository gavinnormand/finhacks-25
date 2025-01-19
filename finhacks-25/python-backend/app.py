from flask import Flask, jsonify, request
from flask_cors import CORS
import spending_visualizer
import csv
from io import StringIO

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173", "http://127.0.0.1:5173"])

@app.route('/upload_csv', methods=['POST'])
def upload_csv():
    if request.content_type == 'text/csv':
        # Read the CSV data from the request body
        csv_data = request.data.decode('utf-8')
        csv_reader = csv.reader(StringIO(csv_data))
        next(csv_reader)  # Skip the header

        # Parse rows into a list
        month_data = [row for row in csv_reader]

        # Generate the spending breakdown graph
        image = spending_visualizer.visualize_data_for_month(month_data)
        return jsonify({"data": image})
    else:
        return jsonify({"error": "Invalid content type. Expected 'text/csv'."}), 400

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
