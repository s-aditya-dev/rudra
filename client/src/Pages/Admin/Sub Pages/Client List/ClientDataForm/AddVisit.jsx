import React from 'react';
import './AddVisit.css'

function AddVisit({ switchComponent, clientName }) {

    const handleSubmit = () =>{

        switchComponent
    }

    const handleCancel = () =>{

        switchComponent
    }

    return (
        <div className={`visit-form-container ${switchComponent ? ('active'):('')}`}>
            <form className='visit-form'>

                <h2>{`Add Client Visit: ${clientName}`}</h2>

                {/* <div className="date-time input-container">
                    <label htmlFor="visitDate">Date Time:</label>
                    <div>
                        <input type="date" id="visitDate w-45" required />
                        <input type="time" id="visitTime w-45" required />
                    </div>
                </div> */}

                <div className="reference-container input-container w-100">
                    <label htmlFor="reference">Reference by:</label>
                    <input type="text" id="reference" placeholder="Enter your Reference" />
                    {/* <p>*This Field is required to fill</p> */}
                </div>

                <div className="drop-down">
                    <div className="source-container input-container w-45">
                        <label htmlFor="source">Source:</label>
                        <select id="source">
                            <option value="" disabled selected>Select Source</option>
                        </select>
                    </div>

                    <div className="relation-container input-container w-45">
                        <label htmlFor="relation">Relation:</label>
                        <select id="relation">
                            <option value="" disabled selected>Select Relation</option>
                        </select>
                    </div>

                    <div className="closing-container input-container w-45">
                        <label htmlFor="closing">Closing:</label>
                        <select id="closing">
                            <option value="" disabled selected>Select Closing</option>
                        </select>
                    </div>

                    <div className="status-container input-container w-45">
                        <label htmlFor="status">Status:</label>
                        <select id="status">
                            <option value="" disabled selected>Select Status</option>
                            <option value="warm">Warm</option>
                            <option value="cold">Cold</option>
                            <option value="lost">Lost</option>
                            <option value="booked">Booked</option>
                        </select>
                    </div>
                </div>

                <div className="remark input-container w-100">
                    <label htmlFor="remark">Remark:</label>
                    <textarea id="remark" placeholder="Enter your remark"></textarea>
                </div>
                <div className="controls w-100">
                    <button type="cancel" onClick={handleCancel}>Cancel</button>
                    <button type="submit" onClick={handleSubmit}>Confirm Visit+</button>
                </div>
            </form>
        </div>
    );
}

export default AddVisit;