// Ticket.js
import React from 'react';
import TypingEffect from './TypingEffect';
import './styles/Ticket.css';

const Ticket = ({ ticket, onDelete }) => {
    const priorityClass = getPriorityClass(ticket.priority);

    return (
        <div className={`ticket ${priorityClass}`}>
            <div className="ticket-header">
                <h3>{ticket.text || 'Untitled'}</h3>
                <button onClick={() => onDelete(ticket.id)}>Delete</button>
            </div>
            <div className="ticket-description">
                <TypingEffect text={ticket.description || 'No description provided.'} speed={50} />
            </div>
            <div className="ticket-footer">
                <span className="ticket-type">{ticket.type || 'General'}</span>
                {ticket.user && (
                    <span className="ticket-user">{ticket.user}</span>
                )}
            </div>
        </div>
    );
};

function getPriorityClass(priority) {
    switch (priority) {
        case 2:
            return 'priority-high';
        case 1:
            return 'priority-medium';
        case 0:
            return 'priority-low';
        default:
            return 'priority-none';
    }
}

export default Ticket;
