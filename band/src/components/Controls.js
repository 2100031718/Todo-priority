import React from 'react';

const Controls = ({ grouping, setGrouping, sortOrder, setSortOrder }) => {
    return (
        <div className="controls">
            <div className="grouping">
                <label>Group By:</label>
                <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                    <option value="status">Status</option>
                    <option value="priority">Priority</option>
                    <option value="user">User</option> {/* Add user option */}
                </select>
            </div>
            <div className="sorting">
                <label>Sort By:</label>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>
    );
};

export default Controls;
