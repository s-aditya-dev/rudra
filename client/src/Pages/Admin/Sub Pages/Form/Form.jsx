import React, { useState, useEffect } from "react";
import "./Form.css";
import { useNavigate } from "react-router-dom";
import newRequest from "../../../../utils/newRequest.js";
import { useQuery } from "@tanstack/react-query";

const ClientListForm = ({ switchComponent }) => {
  const [formVisible, setFormVisible] = useState("dontShowForm");

  const { isLoading, error, data } = useQuery({
    queryKey: ["managers"],
    queryFn: () =>
      newRequest.get("/clientVisits/managers").then((res) => {
        return res.data;
      }),
  });

  const [managers, setManagers] = useState([]);

  useEffect(() => {
    if (data) {
      setManagers(
        data.map((manager) => ({
          ...manager,
        }))
      );
    }
  }, [data]);

  const [user, setUser] = useState({
    clientId: null,
    firstName: "",
    lastName: "",
    address: "",
    occupation: "",
    contact: null,
    altContact: null,
    email: "",
    requirement: "",
    budget: null,
    note: "",
  });

  const [visitsourceData, setVisitsourceData] = useState({
    time: "",
    date: "",
    referenceBy: "",
    sourcingManager: "",
    relationshipManager: "",
    closingManager: "",
    status: "",
    visitRemark: "",
  });

  const [clientID, setClientID] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleVisitChange = (e) => {
    setVisitsourceData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleCombinedSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await newRequest.post("/clients", {
        ...user,
      });
      setClientID(response.data._id);

      await newRequest.post(`/clients/${response.data._id}/clientVisits`, {
        ...visitsourceData,
      });

      navigate("/admin");
    } catch (err) {
      console.log(err);
    }

    e.target.reset();
  };

  return (
    <div className="form-container">
      <form className="client-form" onSubmit={handleCombinedSubmit}>
        <div className="personal-info">
          <div className="clientId input-container">
            <label htmlFor="clientId">Client ID:</label>
            <input
              type="text"
              name="clientId"
              onChange={handleChange}
              id="clientId"
              placeholder="Client ID"
            />
          </div>

          <div className="name input-container">
            <label htmlFor="firstName">Name:</label>
            <div className="flex">
              <input
                type="text"
                className="w-45"
                id="firstName"
                placeholder="Enter First Name"
                name="firstName"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                className="w-45"
                id="lastName"
                placeholder="Enter Last Name"
                required
                name="lastName"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="occupation input-container full-flex">
            <label htmlFor="occupation">Occupation:</label>
            <input
              type="text"
              id="occupation"
              placeholder="Occupation"
              required
              name="occupation"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="contact">
          <div className="phone input-container">
            <label htmlFor="phone">Phone:</label>
            <div className="div flex">
              <input
                type="number"
                className="w-45"
                id="phone"
                placeholder="Phone Number"
                required
                name="contact"
                onChange={handleChange}
              />
              <input
                type="number"
                className="w-45"
                id="altPhone"
                placeholder="Alt Phone Number"
                name="altContact"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="email input-container full-flex">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              id="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="address input-container full-flex">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              onChange={handleChange}
              placeholder="Address"
              required
            ></textarea>
          </div>
        </div>

        <div className="interests">
          <div className="flex">
            <div className="w-45 requirement input-container">
              <label htmlFor="requirement">Requirement:</label>
              <select
                name="requirement"
                onChange={handleChange}
                className="w-100"
                id="requirement"
                required
              >
                <option value="" disabled selected>
                  Select Requirement
                </option>
                <option value="1BHK">1BHK</option>
                <option value="2BHK">2BHK</option>
                <option value="2.5BHK">2.5BHK</option>
                <option value="3.5BHK">3.5BHK</option>
                <option value="4.5BHK">4.5BHK</option>
                <option value="SHOP">SHOP</option>
                <option value="OFFICE">OFFICE</option>
              </select>
            </div>
            <div className="w-45 budget input-container">
              <label htmlFor="budget">Budget:</label>
              <input
                className="w-100"
                type="number"
                name="budget"
                onChange={handleChange}
                id="budget"
                placeholder="Budget"
                required
              />
            </div>
          </div>
          <div className="note input-container full-flex">
            <label htmlFor="note">Note:</label>
            <textarea
              className="w-100"
              id="note"
              name="note"
              onChange={handleChange}
              placeholder="Note"
              re
            ></textarea>
          </div>
        </div>

        <div className={`AddVisit ${formVisible}`}>
          <div className="date-time input-container">
            <label htmlFor="visitDate">Date Time:</label>
            <div className="flex">
              <input
                name="date"
                onChange={handleVisitChange}
                type="date"
                id="visitDate"
                className="w-45"
                required
              />
              <input
                name="time"
                onChange={handleVisitChange}
                type="time"
                id="visitTime"
                className="w-45"
                required
              />
            </div>
          </div>

          <div className="reference-container input-container w-100">
            <label htmlFor="reference">Reference by:</label>
            <input
              type="text"
              id="reference"
              name="referenceBy"
              onChange={handleVisitChange}
              placeholder="Enter Reference"
              required
            />
          </div>

          <div className="drop-down flex">
            <div className="source-container input-container">
              <label htmlFor="source">Source:</label>
              <select
                id="source"
                onChange={handleVisitChange}
                name="sourcingManager"
                required
              >
                <option value="" disabled selected>
                  Select Source
                </option>
                {managers.map(
                  (manager) =>
                    manager.manager === "source" && (
                      <option key={manager._id} value={manager.firstName}>
                        {manager.firstName} {manager.lastName}
                      </option>
                    )
                )}
              </select>
            </div>

            <div className="relation-container input-container">
              <label htmlFor="relation">Relation:</label>
              <select
                id="relation"
                onChange={handleVisitChange}
                name="relationshipManager"
                required
              >
                <option value="" disabled selected>
                  Select Relation
                </option>
                {managers.map(
                  (manager) =>
                    manager.manager === "relation" && (
                      <option key={manager._id} value={manager.firstName}>
                        {manager.firstName} {manager.lastName}
                      </option>
                    )
                )}
              </select>
            </div>

            <div className="closing-container input-container">
              <label htmlFor="closing">Closing:</label>
              <select
                id="closing"
                onChange={handleVisitChange}
                name="closingManager"
                required
              >
                <option value="" disabled selected>
                  Select Closing
                </option>
                {managers.map(
                  (manager) =>
                    manager.manager === "closing" && (
                      <option key={manager._id} value={manager.firstName}>
                        {manager.firstName} {manager.lastName}
                      </option>
                    )
                )}
              </select>
            </div>

            <div className="status-container input-container">
              <label htmlFor="status">Status:</label>
              <select id="status" onChange={handleVisitChange} name="status" required>
                <option value="" disabled selected>
                  Select Status
                </option>
                <option value="warm">Warm</option>
                <option value="cold">Cold</option>
                <option value="lost">Lost</option>
                <option value="booked">Booked</option>
              </select>
            </div>
          </div>

          <div className="remark input-container w-100">
            <label htmlFor="remark">Remark:</label>
            <textarea
              onChange={handleVisitChange}
              name="visitRemark"
              id="remark"
              placeholder="Enter your remark"
            ></textarea>
          </div>
        </div>
        
        <div className="controls flex">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ClientListForm;
