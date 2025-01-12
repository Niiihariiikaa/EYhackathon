import React, { useState, useEffect } from 'react';

const AutomatedCallbacks = () => {
    // State to store user input
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [claimAmount, setClaimAmount] = useState('');
    
    // State to store the list of scheduled callbacks
    const [callbacks, setCallbacks] = useState([]);

    // Fetch callbacks from the backend
    const fetchCallbacks = async () => {
        try {
            const response = await fetch('http://localhost:5000/callbacks');
            const data = await response.json();
            setCallbacks(data);
        } catch (error) {
            console.error('Error fetching callbacks:', error);
        }
    };

    // Submit callback to the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const token = localStorage.getItem('token'); // Retrieve token from localStorage or wherever you're storing it
      
        const callbackData = {
          name,
          phone,
          date,
          time,
          claim_amount: claimAmount,
        };
      
        try {
          const response = await fetch('http://localhost:5000/schedule', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            },
            body: JSON.stringify(callbackData),
          });
      
          if (response.ok) {
            alert('Callback scheduled successfully!');
      
            // Immediately update the callbacks state without re-fetching
            setCallbacks((prevCallbacks) => [
              ...prevCallbacks,
              callbackData,
            ]);
      
            // Clear the input fields
            setName('');
            setPhone('');
            setDate('');
            setTime('');
            setClaimAmount('');
          } else {
            alert('Error scheduling callback');
          }
        } catch (error) {
          console.error('Error submitting callback:', error);
          alert('Error scheduling callback');
        }
    };

    // Handle deleting a callback (mark done)
    const handleDelete = async (id) => {
        const token = localStorage.getItem('token'); // Retrieve token from localStorage or wherever you're storing it
      
        try {
            const response = await fetch(`http://localhost:5000/callbacks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                // Remove the callback from the state
                setCallbacks(callbacks.filter((callback) => callback._id !== id));
                alert('Callback marked as done!');
            } else {
                alert('Error marking callback as done');
            }
        } catch (error) {
            console.error('Error deleting callback:', error);
            alert('Error marking callback as done');
        }
    };

    // Fetch callbacks when the component is mounted
    useEffect(() => {
        fetchCallbacks();
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Form on the left side */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Schedule Callback</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                padding: '12px', 
                                width: '100%', 
                                borderRadius: '8px', 
                                border: '1px solid #ccc', 
                                fontSize: '16px', 
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: '0.3s',
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Your Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            style={{
                                padding: '12px',
                                width: '100%', 
                                borderRadius: '8px', 
                                border: '1px solid #ccc', 
                                fontSize: '16px', 
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: '0.3s',
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            style={{
                                padding: '12px', 
                                width: '100%', 
                                borderRadius: '8px', 
                                border: '1px solid #ccc', 
                                fontSize: '16px', 
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: '0.3s',
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                            style={{
                                padding: '12px', 
                                width: '100%', 
                                borderRadius: '8px', 
                                border: '1px solid #ccc', 
                                fontSize: '16px', 
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: '0.3s',
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Claim Amount"
                            value={claimAmount}
                            onChange={(e) => setClaimAmount(e.target.value)}
                            required
                            style={{
                                padding: '12px', 
                                width: '100%', 
                                borderRadius: '8px', 
                                border: '1px solid #ccc', 
                                fontSize: '16px', 
                                boxSizing: 'border-box',
                                outline: 'none',
                                transition: '0.3s',
                            }}
                        />
                    </div>
                    <button type="submit" style={{
                        padding: '12px', 
                        backgroundColor: ' rgb(26 192 33)', 
                        color: '#fff', 
                        borderRadius: '8px', 
                        border: 'none', 
                        cursor: 'pointer', 
                        fontSize: '16px',
                        transition: 'background-color 0.3s ease'
                    }}>
                        Schedule Callback
                    </button>
                </form>
            </div>

            {/* Table of scheduled callbacks on the right side */}
            <div style={{ flex: 1, padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>Scheduled Callbacks</h2>
                <table style={{
                    width: '100%', 
                    borderCollapse: 'collapse', 
                    borderRadius: '8px', 
                    overflow: 'hidden', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}>
                    <thead style={{ backgroundColor: 'rgb(26 192 33)', color: '#fff' }}>
                        <tr>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Name</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Phone</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Date</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Time</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Claim Amount</th>
                            <th style={{ padding: '12px', border: '1px solid #ddd' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {callbacks.length === 0 ? (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '20px', color: '#999' }}>No callbacks scheduled yet.</td>
                            </tr>
                        ) : (
                            callbacks.map((callback, index) => (
                                <tr key={index}>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{callback.name}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{callback.phone}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{callback.date}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>{callback.time}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>₹{callback.claim_amount}</td>
                                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>
                                        <button 
                                            onClick={() => handleDelete(callback._id)} 
                                            style={{
                                                padding: '8px 16px',
                                                backgroundColor: 'rgb(242 60 28)',
                                                color: '#fff',
                                                borderRadius: '8px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Mark Done
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AutomatedCallbacks;
