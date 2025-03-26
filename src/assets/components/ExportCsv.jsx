import React from "react";
import axios from "axios";
import "../css/export-button.css";

const ExportCSVButton = () => {
    const handleExport = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/contacts/export-csv", {
                responseType: "blob", // Ensure binary data
            });

            const blob = new Blob([response.data], { type: "text/csv" });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "contacts.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Error exporting contacts:", error);
            alert("Failed to export contacts.");
        }
    };

    return (
        <button className="export-btn" onClick={handleExport}>
            Export CSV
        </button>
    );
};

export default ExportCSVButton;
