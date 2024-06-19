import React, { useState, useEffect } from "react";
import "./Client.css";
import newRequest from "../../../../utils/newRequest.js";
import { useQuery } from "@tanstack/react-query";

// Util Components
import Loader from "../../../../Components/Loader/Loader.jsx";

function ClientList() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery({
    queryKey: ["clients"],
    queryFn: () =>
      newRequest.get("/clients").then((res) => {
        return res.data;
      }),
  });
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (data) {
      setClients(
        data.map((client) => ({
          ...client,
        }))
      );
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }
  
  if (error) {
    return <Loader message={`Something went wrong: ${error.message}`} />;
  }
  return (

    <div className="client-table">
      <div className="client-table-header">
        <div className="searchbar">
          <input type="text" />
          <button><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg></button>
        </div>
        <button>Add Client</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Requirement</th>
            <th>Budget</th>
            <th>Reference</th>
            <th>Source</th>
            <th>Relation</th>
            <th>Closing</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => {
            const lastVisit =
              client.clientVisits[client.clientVisits.length - 1];

            const isCurrentUserManager =
              lastVisit &&
              (lastVisit.sourcingManager === currentUser.firstName ||
                lastVisit.relationshipManager === currentUser.firstName ||
                lastVisit.closingManager === currentUser.firstName);

            if (!isCurrentUserManager) {
              return null;
            }

            return (
              <tr key={client._id}>
                <td>{client.clientId}</td>
                <td>{client.firstName + " " + client.lastName}</td>
                <td>{client.contact}</td>
                <td>{client.requirement}</td>
                <td>{client.budget}</td>
                {lastVisit && (
                  <>
                    <td>{lastVisit.sourcingManager}</td>
                    <td>{lastVisit.relationshipManager}</td>
                    <td>{lastVisit.closingManager}</td>
                    <td>{lastVisit.status}</td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClientList;

