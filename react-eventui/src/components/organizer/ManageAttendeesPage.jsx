import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/ManageAttendeesPage.css'; // CSS for this page
import axios from 'axios';

function ManageAttendeesPage() {

    const [attendee, setAttendee] = useState([])
    const [attendeesBackup, setAttendeesBackup] = useState([]);
    const [locationInput, setLocationInput] = useState("");

    const getAttendee = async () => {
        const response = await axios.get(`http://localhost:8081/api/getAll/attendee`)
        setAttendee(response.data)
        setAttendeesBackup(response.data);
    }

    const filterByLocation = (location) => {
        if (location.trim() === "") {
            setAttendee(attendeesBackup); 
            // if it is empty space then it reset to original list
        } else {
            const filtered = attendeesBackup.filter(a =>
                a.location?.toLowerCase().includes(location.toLowerCase())
            );
            setAttendee(filtered);
            // Save the filtered list in attendee
        }
    };
    useEffect(() => {
        getAttendee()
    },[])

    return (
        <div className="organizer-page-container"> 

          
            <nav className="dashboard-navbar">
                <div className="navbar-brand">
                    <Link to="/">EventSys Pro</Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/organizer" className="nav-link">Dashboard</Link></li>
                    <li><Link to="/organizer/events" className="nav-link">My Events</Link></li>
                    <li><Link to="/organizer/attendees" className="nav-link active">Attendees</Link></li>
                    <li><Link to="/organizer/venues" className="nav-link">Venues</Link></li>
                     <li><Link to="/organizer/reports/sales" className="nav-link">Sales Reports</Link></li>

                </ul>
                <div className="navbar-user-actions">
                   
                    <Link to="/" className="nav-link logout-button">Logout</Link>
                </div>
            </nav>
            

            <div className="manage-attendees-page-content">
                <header className="page-header">
                    <h1>Manage Attendees</h1>
                    <div className="header-actions">
                    </div>
                </header>

                <section className="filter-and-search-section">
                    <div className="search-bar">
                        <input type="text" value={locationInput} placeholder="Search by location..." className="search-input"
                        onChange={(e) => { setLocationInput(e.target.value);
                        filterByLocation(e.target.value);}}/>
                    </div>
                    
                        <button className="action-button clear-filters-button"
                        onClick={() => {setLocationInput("");
                        setAttendee(attendeesBackup); }}>
                        Clear Filters </button>
                    
                </section>

                <section className="attendees-list-section">

                    <table className="attendees-table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Attendee Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {attendee.map((a, index) => (
                                <tr key={index}>
                                    <td>{a.id}</td>
                                    <td>{a.fullName}</td>
                                    <td>{a.email}</td>
                                    <td>{a.phone}</td>
                                    <td>{a.location}</td>
                                    <td><span className="status-badge status-checked-in">Registered</span></td>
                                    <td className="action-cell">
                                        
                                    </td>
                                </tr>

                            ))}

                        </tbody>
                    </table>
                </section>
            </div> 
        </div>
    );
}

export default ManageAttendeesPage;