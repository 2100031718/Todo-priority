// src/components/UserPage.js
import React from 'react';

const UserPage = ({ tickets }) => {
    // Group tickets by user
    const groupedTickets = groupTicketsByUser(tickets);

    return (
        <div>
            <h2>User Page</h2>
            {Object.keys(groupedTickets).length > 0 ? (
                Object.keys(groupedTickets).map((user) => (
                    <div key={user}>
                        <h3>{user} ({groupedTickets[user].length})</h3>
                        {groupedTickets[user].map((ticket) => (
                            <div key={ticket.id}>
                                {ticket.text} (Priority: {ticket.priority})
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <p>No tickets available.</p>
            )}
        </div>
    );
};

// Helper function to group tickets by user
function groupTicketsByUser(tickets) {
    const grouped = {};
    tickets.forEach((ticket) => {
        const user = ticket.user || 'Unassigned'; // Use 'Unassigned' if no user is specified
        if (!grouped[user]) {
            grouped[user] = [];
        }
        grouped[user].push(ticket);
    });
    return grouped;
}

export default UserPage;
