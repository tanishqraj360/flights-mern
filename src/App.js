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
  const [getResponse, setGetResponse] = useState(null);

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
    try {
      const response = await axios.get(
        `http://localhost:8766/api/get?id=${getId}`,
      );
      if (response.data.data) {
        setGetResponse(response.data.data);
      } else {
        setGetResponse(response.data.message || "Flight not found");
      }
    } catch (error) {
      setGetResponse("Failed to fetch data");
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
        <pre>{getResponse && JSON.stringify(getResponse, null, 2)}</pre>
      </div>

      {/* Update Flight */}
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
