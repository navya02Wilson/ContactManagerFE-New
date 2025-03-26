import React, { useState } from "react";
import axios from "axios";
import "../css/modal.css"

const AddContact = ({ isOpen, onClose, refreshContacts }) => {
    const [contact, setContact] = useState({ firstName: "", lastName: "", email: "", phoneNumber: "", address: "" });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newContact = { ...contact, userId: 1 };
            const response = await axios.post("http://localhost:8080/api/contacts/add-contact", newContact);
            if (response.status === 201) {
                alert("Contact added successfully!");
                setContact({ firstName: "", lastName: "", email: "", phoneNumber: "", address: "" });
                refreshContacts();  // Refresh the contact list
                onClose(); // Close the modal
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add contact.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Add Contact</h2>
                <form onSubmit={handleSubmit}>
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={contact.firstName} onChange={handleChange} required />

                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={contact.lastName} onChange={handleChange} required />

                    <label>Email:</label>
                    <input type="email" name="email" value={contact.email} onChange={handleChange} required />

                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" value={contact.phoneNumber} onChange={handleChange} required />

                    <label>Address:</label>
                    <input type="text" name="address" value={contact.address} onChange={handleChange} required />

                    <div className="modal-buttons">
                        <button type="button" onClick={onClose}>Cancel</button>
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddContact;
