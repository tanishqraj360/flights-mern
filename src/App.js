import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [insertData, setInsertData] = useState({
    id: "",
    airline: "",
    source: "",
    destination: "",
    fare: "",
    duration: "",
  });
  const [insertResponse, setInsertResponse] = useState("");

  const [getId, setGetId] = useState("");
  const [getResponse, setGetResponse] = useState([]);

  const [updateData, setUpdateData] = useState({
    id: "",
    airline: "",
    source: "",
    destination: "",
    fare: "",
    duration: "",
  });
  const [updateResponse, setUpdateResponse] = useState("");

  const [deleteId, setDeleteId] = useState("");
  const [deleteResponse, setDeleteResponse] = useState("");

  const insertFlight = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8766/api/insert",
        insertData,
      );
      setInsertResponse(response.data.message);
      setInsertData({
        id: "",
        airline: "",
        source: "",
        destination: "",
        fare: "",
        duration: "",
      });
    } catch (error) {
      setInsertResponse("Failed to insert data");
    }
  };

  const getFlight = async () => {
    if (!getId) {
      alert("Please Enter valid flight id");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8766/api/data/${getId}`,
      );
      if (response.data.data) {
        const flightData = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
        setGetResponse(flightData);
      } else {
        setGetResponse([]);
        alert(response.data.message || "Flight Not Found");
      }
    } catch (error) {
      setGetResponse([]);
      alert("Failed to fetch data");
    }
  };

  const updateFlight = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8766/api/update",
        updateData,
      );
      setUpdateResponse(response.data.message);
      setUpdateData({
        id: "",
        airline: "",
        source: "",
        destination: "",
        fare: "",
        duration: "",
      });
    } catch (error) {
      setUpdateResponse("Failed to update data");
    }
  };

  const deleteFlight = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8766/api/delete/${deleteId}`,
      );
      setDeleteResponse(response.data.message);
      setDeleteId("");
    } catch (error) {
      setDeleteResponse("Failed to delete data");
    }
  };

  return (
    <div className="App">
      <h1>Flight Management System</h1>

      {/* Insert Flight */}
      <div className="section">
        <h2>Insert Flight</h2>
        {["id", "airline", "source", "destination", "fare", "duration"].map(
          (field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={insertData[field]}
              onChange={(e) =>
                setInsertData({ ...insertData, [field]: e.target.value })
              }
            />
          ),
        )}
        <button onClick={insertFlight}>Insert Flight</button>
        <p>{insertResponse}</p>
      </div>

      {/* Get Flight */}
      <div className="section">
        <h2>Get Flight</h2>
        <input
          placeholder="Flight ID"
          value={getId}
          onChange={(e) => setGetId(e.target.value)}
        />
        <button onClick={getFlight}>Get Flight</button>
      </div>

      {getResponse.length > 0 && (
        <table
          border="1"
          cellPadding="10"
          style={{
            marginTop: "20px",
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Fare</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {getResponse.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.airline}</td>
                <td>{flight.source}</td>
                <td>{flight.destination}</td>
                <td>{flight.fare}</td>
                <td>{flight.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {getResponse.length === 0 && <p>No flight data available</p>}

      {/* Update Flight */}
      <div style={{ height: "20px" }}></div>
      <div className="section">
        <h2>Update Flight</h2>
        {["id", "airline", "source", "destination", "fare", "duration"].map(
          (field) => (
            <input
              key={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={updateData[field]}
              onChange={(e) =>
                setUpdateData({ ...updateData, [field]: e.target.value })
              }
            />
          ),
        )}
        <button onClick={updateFlight}>Update Flight</button>
        <p>{updateResponse}</p>
      </div>

      {/* Delete Flight */}
      <div className="section">
        <h2>Delete Flight</h2>
        <input
          placeholder="Flight ID"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button onClick={deleteFlight}>Delete Flight</button>
        <p>{deleteResponse}</p>
      </div>
    </div>
  );
}

export default App;
