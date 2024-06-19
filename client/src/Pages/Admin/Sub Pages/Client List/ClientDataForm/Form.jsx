import React, { useState } from 'react';
import './Form.css';

const ClientListForm = ({ switchComponent }) => {

    const handleAddVisit = () => {

        switchComponent
    }

    return (
        <div className="form-container">
            <form className="client-form">
                <div className="personal-info">
                    <div className="clientId input-container">
                        <label htmlFor="clientId">Client ID:</label>
                        <input type="text" id="clientId" placeholder="Client ID" />
                    </div>

                    <div className="name input-container">
                        <label htmlFor="firstName">Name:</label>
                        <div className='flex'>
                            <input type="text" className='w-45' id="firstName" placeholder="Enter First Name" />
                            <input type="text" className='w-45' id="lastName" placeholder="Enter Last Name" />
                        </div>
                    </div>

                    <div className="occupation input-container full-flex">
                        <label htmlFor="occupation">Occupation:</label>
                        <input type="text" id="occupation" placeholder="Occupation" />
                    </div>
                </div>

                <div className="contact">
                    <div className="phone input-container">
                        <label htmlFor="phone">Phone:</label>
                        <div className="div flex">
                            <input type="number" className='w-45' id="phone" placeholder="Phone Number" />
                            <input type="number" className='w-45' id="altPhone" placeholder="Alt Phone Number" />
                        </div>
                    </div>
                    <div className="email input-container full-flex">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" placeholder="Email" />
                    </div>

                    <div className="address input-container full-flex">
                        <label htmlFor="address">Address:</label>
                        <textarea id="address" placeholder="Address"></textarea>
                    </div>
                </div>

                <div className="interests">
                    <div className='flex'>
                        <div className="w-45 requirement input-container">
                            <label htmlFor="requirement">Requirement:</label>
                            <select className='w-100' id="requirement">
                                <option value="" disabled selected>Select Requirement</option>
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
                            <input className='w-100' type="number" id="budget" placeholder="Budget" />
                        </div>
                    </div>
                    <div className="note input-container full-flex">
                        <label htmlFor="note">Note:</label>
                        <textarea className='w-100' id="note" placeholder="Note"></textarea>
                    </div>

                    <div className="controls flex">
                        <button>Delete Client</button>
                        <button onClick={switchComponent}>Add Visit</button>
                    </div>
                </div>
            </form>

            <div className="visit-table">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Reference</th>
                            <th>Source</th>
                            <th>Relation</th>
                            <th>Closing</th>
                            <th>Status</th>
                            <th>Remark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Add table rows here */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ClientListForm;
