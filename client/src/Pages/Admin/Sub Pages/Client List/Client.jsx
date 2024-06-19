import React, { useState, useEffect } from "react";
import "./Client.css";
import newRequest from "../../../../utils/newRequest.js";
import { useQuery } from "@tanstack/react-query";

// Util Components
import Loader from "../../../../Components/Loader/Loader.jsx";

function ClientList() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  let count = 0;

  const { isLoading, error, data } = useQuery({
    queryKey: ["clients"],
    queryFn: () =>
      newRequest.get("/clients").then((res) => {
        return res.data;
      }),
  });

  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (data) {
      setClients(data.map((client) => ({ ...client })));
    }
  }, [data]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Loader message={`Something went wrong: ${error.message}`} />;
  }

  const searchFields = (client, term) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const termLower = term.toLowerCase();
    const lastVisit = client.clientVisits[client.clientVisits.length - 1];

    return (
      fullName.includes(termLower) ||
      // (client.clientId && client.clientId.toLowerCase().includes(termLower)) ||
      (client.contact && client.contact.toString().toLowerCase().includes(termLower)) ||
      (client.requirement && client.requirement.toLowerCase().includes(termLower)) ||
      (client.budget && client.budget.toString().toLowerCase().includes(termLower)) ||
      (lastVisit && (
        (lastVisit.referenceBy && lastVisit.referenceBy.toLowerCase().includes(termLower)) ||
        (lastVisit.sourcingManager && lastVisit.sourcingManager.toLowerCase().includes(termLower)) ||
        (lastVisit.relationshipManager && lastVisit.relationshipManager.toLowerCase().includes(termLower)) ||
        (lastVisit.closingManager && lastVisit.closingManager.toLowerCase().includes(termLower)) ||
        (lastVisit.status && lastVisit.status.toLowerCase().includes(termLower))
      ))
    );
  };

  const filteredClients = clients.filter((client) => searchFields(client, searchTerm));

  return (
    <div className="client-table">
      <div className="client-table-header">
        <div className="searchbar">
          <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>
        {/* <button>Add Client</button> */}
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
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
          {filteredClients.map((client) => {
            const lastVisit = client.clientVisits[client.clientVisits.length - 1];

            if (!currentUser.admin) {
              const isCurrentUserManager =
                lastVisit &&
                (lastVisit.sourcingManager === currentUser.firstName ||
                  lastVisit.relationshipManager === currentUser.firstName ||
                  lastVisit.closingManager === currentUser.firstName);

              if (!isCurrentUserManager) {
                return null;
              }
            }

            return (
              <tr key={client._id}>
                <td>{count+=1}</td>
                <td>{client.firstName + " " + client.lastName}</td>
                <td>{client.contact}</td>
                <td>{client.requirement}</td>
                <td>{client.budget}</td>
                {lastVisit && (
                  <>
                    <td>{lastVisit.referenceBy}</td>
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
