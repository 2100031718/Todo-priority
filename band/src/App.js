import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import Controls from './components/Controls';
import PriorityDropdown from './components/PriorityDropdown';
import './components/styles/App.css';

// Import SVG icons
import { ReactComponent as TodoIcon } from './assets/To-do.svg';
import { ReactComponent as InProgressIcon } from './assets/in-progress.svg';
import { ReactComponent as CompletedIcon } from './assets/Done.svg';

// Define status options with SVG icons
const statusOptions = [
    { value: 'todo', label: 'To Do', icon: <TodoIcon className="status-icon" /> },
    { value: 'inprogress', label: 'In Progress', icon: <InProgressIcon className="status-icon" /> },
    { value: 'completed', label: 'Completed', icon: <CompletedIcon className="status-icon" /> },
];

// API URL
const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

function App() {
    const [tickets, setTickets] = useState([]);
    const [grouping, setGrouping] = useState(localStorage.getItem('grouping') || 'status');
    const [sortOrder, setSortOrder] = useState(localStorage.getItem('sortOrder') || 'priority');
    const [taskInput, setTaskInput] = useState('');
    const [taskPriority, setTaskPriority] = useState(0);
    const [taskDescription, setTaskDescription] = useState(''); // New state for description
    const [taskStatus, setTaskStatus] = useState(statusOptions[0].value); // Default to first status
    const [loadingTickets, setLoadingTickets] = useState(true);
    const [error, setError] = useState(null);

    // Effect to fetch tickets from the API
    useEffect(() => {
        const loadTickets = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setTickets(data.tickets);
            } catch (err) {
                console.error('Error fetching tickets:', err);
                setError('Failed to load tickets');
            } finally {
                setLoadingTickets(false);
            }
        };
        loadTickets();
    }, []);

    // Effect to save grouping and sortOrder preferences to localStorage
    useEffect(() => {
        localStorage.setItem('grouping', grouping);
        localStorage.setItem('sortOrder', sortOrder);
    }, [grouping, sortOrder]);

    // Add a new task
    const addTask = () => {
        if (taskInput.trim() === '') return;

        const newTask = {
            id: Date.now(),
            text: taskInput,
            priority: taskPriority,
            description: taskDescription, // Include description
            user: 'User1',
            status: taskStatus // Default status
        };

        setTickets((prevTickets) => [...prevTickets, newTask]);
        setTaskInput('');
        setTaskPriority(0);
        setTaskDescription(''); // Clear description after adding task
        setTaskStatus('todo'); // Reset to default status
    };

    // Function to delete task by removing it from the tickets array
    const deleteTask = (id) => {
        setTickets((prevTickets) => prevTickets.filter(ticket => ticket.id !== id));
    };

    // Function to sort tickets by priority
    const sortedTickets = tickets.sort((a, b) => b.priority - a.priority);

    // Get selected status option for icon display
    const selectedStatus = statusOptions.find(option => option.value === taskStatus);

    return (
        <div className="App">
            {loadingTickets ? (
                <p>Loading tickets...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <Controls 
                    grouping={grouping} 
                    setGrouping={setGrouping} 
                    sortOrder={sortOrder} 
                    setSortOrder={setSortOrder} 
                />
            )}

            <div>
                <input
                    type="text"
                    value={taskInput}
                    onChange={(e) => setTaskInput(e.target.value)}
                    placeholder="Add a new task"
                />
                <input
                    type="text"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Add a description"
                />
                <PriorityDropdown selectedPriority={taskPriority} setTaskPriority={setTaskPriority} />

                {/* Custom Status Selector */}
                <div className="task-status-container">
                    <div className="status-icon-display">{selectedStatus?.icon}</div>
                    <div className="status-dropdown">
                        {statusOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`status-option ${option.value === taskStatus ? 'selected' : ''}`}
                                onClick={() => setTaskStatus(option.value)}
                            >
                                {option.icon}
                                {option.label}
                            </div>
                        ))}
                    </div>
                </div>

                <button onClick={addTask}>Add Task</button>
            </div>

            <KanbanBoard 
                tickets={sortedTickets}  // Pass sorted tickets to the KanbanBoard
                grouping={grouping} 
                sortOrder={sortOrder} 
                onDelete={deleteTask} 
            />
        </div>
    );
}

export default App;