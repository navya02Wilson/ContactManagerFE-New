import React, { useState } from "react";
import axios from "axios";
import "../css/search.css"

const SearchComponent = ({ setContacts }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/contacts/search?keyword=${searchQuery}`);
            setContacts(response.data); // Update the contact list
        } catch (error) {
            console.error("Error searching contacts:", error);
            alert("Failed to search contacts.");
        }
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by name or phone number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchComponent;
