import React, { useState } from "react";
import axios from "axios";
import "../css/modal.css"

const EditContact = ({ isOpen, onClose, contact, refreshContacts }) => {
    const [updatedContact, setUpdatedContact] = useState({ ...contact });

    const handleChange = (e) => {
        setUpdatedContact({ ...updatedContact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/contacts/${contact.id}`, updatedContact);
            alert("Contact updated successfully!");
            refreshContacts();
            onClose();
        } catch (error) {
            console.error("Error updating contact:", error);
            alert("Failed to update contact.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Edit Contact</h2>
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={updatedContact.firstName} onChange={handleChange} required />

                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={updatedContact.lastName} onChange={handleChange} required />

                    <label>Email:</label>
                    <input type="email" name="email" value={updatedContact.email} onChange={handleChange} required />

                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={updatedContact.phoneNumber} onChange={handleChange} required />

                    <label>Address:</label>
                    <input type="text" name="address" value={updatedContact.address} onChange={handleChange} required />

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditContact;
