import React, { useState, useEffect } from "react";
import axios from "axios";
import ContactTable from "../components/ContactTable";
import AddContact from "../components/AddContact";
import SearchComponent from "../components/Search";
import "../css/page.css"

const ContactsPage = () => {
    const [contacts, setContacts] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const fetchContacts = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/contacts/all");
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <div className="contacts-page">
            <h1>Contact Manager</h1>

            <SearchComponent setContacts={setContacts}/>
            <button className="add-contact-btn" onClick={() => setIsAddModalOpen(true)}>Add Contact</button>

            <ContactTable contacts={contacts} refreshContacts={fetchContacts} />

            {/* Add Contact Modal */}
            {isAddModalOpen && (
                <AddContact 
                    isOpen={isAddModalOpen} 
                    onClose={() => setIsAddModalOpen(false)} 
                    refreshContacts={fetchContacts} 
                />
            )}
        </div>
    );
};

export default ContactsPage;
