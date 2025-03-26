import React from "react";
import axios from "axios";
import "../css/modal.css"

const DeleteContact = ({ isOpen, onClose, contactId, refreshContacts }) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/contacts/${contactId}`);
            alert("Contact deleted successfully!");
            refreshContacts();
            onClose();
        } catch (error) {
            console.error("Error deleting contact:", error);
            alert("Failed to delete contact.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this contact?</p>
                <div className="modal-buttons">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleDelete} className="delete-confirm">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteContact;
