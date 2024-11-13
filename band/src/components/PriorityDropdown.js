import React, { useState } from 'react';
import noPriorityIcon from '../assets/No-priority.svg';
import lowIcon from '../assets/Img - Low Priority.svg';
import mediumIcon from '../assets/Img - Medium Priority.svg';
import highIcon from '../assets/Img - High Priority.svg';
import urgentIcon from '../assets/SVG - Urgent Priority grey.svg';
import './styles/PriorityDropdown.css';

const priorities = [
    { value: 0, label: 'No Priority', icon: noPriorityIcon },
    { value: 1, label: 'Low', icon: lowIcon },
    { value: 2, label: 'Medium', icon: mediumIcon },
    { value: 3, label: 'High', icon: highIcon },
    { value: 4, label: 'Urgent', icon: urgentIcon },
];

function PriorityDropdown({ selectedPriority, setTaskPriority }) {
    const [open, setOpen] = useState(false);
    const selected = priorities.find(p => p.value === selectedPriority);

    const handleSelect = (value) => {
        setTaskPriority(value);
        setOpen(false);
    };

    return (
        <div className="priority-dropdown">
            <div className="priority-selected" onClick={() => setOpen(!open)}>
                <img src={selected.icon} alt={selected.label} className="priority-icon" />
                <span>{selected.label}</span>
                <span className="dropdown-arrow">{open ? '▲' : '▼'}</span>
            </div>
            {open && (
                <div className="priority-options">
                    {priorities.map((priority) => (
                        <div 
                            key={priority.value} 
                            className="priority-option" 
                            onClick={() => handleSelect(priority.value)}
                        >
                            <img src={priority.icon} alt={priority.label} className="priority-icon" />
                            <span>{priority.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PriorityDropdown;
