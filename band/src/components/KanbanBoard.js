import React from 'react';
import Ticket from './Ticket';
import './styles/KanbanBoard.css';

function KanbanBoard({ tickets, grouping, onDelete, onTaskMoveToCompleted }) {
    const groupedTickets = groupTickets(tickets, grouping);

    return (
        <div className="kanban-board">
            {Object.keys(groupedTickets).map((groupKey) => (
                <div className="kanban-column" key={groupKey}>
                    <div className="kanban-column-header">
                        {grouping === 'priority' 
                            ? getPriorityLabel(groupKey) 
                            : grouping === 'user' 
                            ? `User: ${groupKey}` 
                            : `Group: ${groupKey}`
                        } 
                        ({groupedTickets[groupKey].length})
                    </div>
                    <div className="kanban-tickets">
                        {groupedTickets[groupKey].map((ticket) => (
                            <Ticket 
                                key={ticket.id} 
                                ticket={ticket} 
                                onDelete={() => {
                                    if (ticket.status === 'inprogress') {
                                        onTaskMoveToCompleted(ticket.id);  // Move to completed instead of deleting
                                    } else {
                                        onDelete(ticket.id);  // Regular delete for non-inprogress tasks
                                    }
                                }} 
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Function to group tickets by the specified property (priority, user, etc.)
function groupTickets(tickets, grouping) {
    const grouped = {};

    tickets.forEach((ticket) => {
        const groupKey = grouping === 'priority' 
            ? ticket.priority
            : grouping === 'user' 
            ? ticket.user || 'Unassigned' 
            : ticket[grouping]; 

        if (!grouped[groupKey]) {
            grouped[groupKey] = [];
        }
        grouped[groupKey].push(ticket);
    });

    return grouped;
}

// Function to get priority label based on priority number
function getPriorityLabel(priority) {
    switch (Number(priority)) {
        case 0: return 'No Priority';
        case 1: return 'Low Priority';
        case 2: return 'Medium Priority';
        case 3: return 'High Priority';
        case 4: return 'Urgent Priority';
        default: return 'Unknown Priority';
    }
}

export default KanbanBoard;


