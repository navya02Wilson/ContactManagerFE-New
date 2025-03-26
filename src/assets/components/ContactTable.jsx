import React, { useState } from "react";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
import "../css/contactTable.css"

const ContactTable = ({ contacts, refreshContacts }) => {
    const [selectedContact, setSelectedContact] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <div className="contact-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={contact.id}>
                            <td>{index+1}</td>
                            <td>{contact.firstName}</td>
                            <td>{contact.lastName}</td>
                            <td>{contact.email}</td>
                            <td>{contact.phoneNumber}</td>
                            <td>{contact.address}</td>
                            <td>
                                <button 
                                    className="edit-btn" 
                                    onClick={() => { setSelectedContact(contact); setIsEditModalOpen(true); }}>
                                    Edit
                                </button>
                                <button 
                                    className="delete-btn" 
                                    onClick={() => { setSelectedContact(contact); setIsDeleteModalOpen(true); }}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Contact Modal */}
            {isEditModalOpen && (
                <EditContact 
                    isOpen={isEditModalOpen} 
                    onClose={() => setIsEditModalOpen(false)} 
                    contact={selectedContact} 
                    refreshContacts={refreshContacts} 
                />
            )}

            {/* Delete Contact Modal */}
            {isDeleteModalOpen && (
                <DeleteContact 
                    isOpen={isDeleteModalOpen} 
                    onClose={() => setIsDeleteModalOpen(false)} 
                    contactId={selectedContact.id} 
                    refreshContacts={refreshContacts} 
                />
            )}
        </div>
    );
};

export default ContactTable;
