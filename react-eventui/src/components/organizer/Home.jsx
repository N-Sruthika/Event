import React from 'react';
import "../css/OrganizerDashboard.css"; // CSS for styling
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function OrganizerDashboard() {
    const [totalEvents, setTotalEvents] = useState(null)
    const [event, setEvent] = useState(null)
    const [eventList, setEventList] = useState([])
    const id = 1;

    useEffect(() => {
        const getEvent = async () => {
            const response = await axios.get(`http://localhost:8081/api/all/event/count`)
            setEvent(response.data)
        }
        const getTotalEvent = async () => {
            const response = await axios.get(`http://localhost:8081/api/event/count/${id}`)
            setTotalEvents(response.data)
        }
        const getEventList = async () => {
            const response = await axios.get(`http://localhost:8081/api/get/eventBy/organizerId/${id}`)
            setEventList(response.data)
        }
        getEvent();
        getTotalEvent();
        getEventList();
    })
    return (
        <div className="organizer-dashboard-container">
            <nav className="dashboard-navbar">
                <div className="navbar-brand">
                    <a href="/">EventSys Pro</a>
                </div>
                <ul className="navbar-links">
                    <li><a href="/organizer" className="nav-link active">Dashboard</a></li>
                    <li><a href="/organizer/events" className="nav-link">My Events</a></li>
                    <li><Link to="/organizer/attendees" className="nav-link">Attendees</Link></li>
                    <li><a href="/organizer/venues" className="nav-link">Venues</a></li>
                    <li><Link to="/organizer/reports/sales" className="nav-link">Sales Reports</Link></li>

                </ul>
                <div className="navbar-user-actions">

                    <a href="/" className="nav-link logout-button">Logout</a>
                </div>
            </nav>

            <div className="organizer-dashboard-page"> {/* Content area below navbar */}
                <header className="dashboard-header">
                    <h1>Welcome !!</h1>
                    <p>Your event management central hub.</p>
                </header>

                <section className="quick-stats-section">
                    <h2>At a Glance</h2>
                    <div className="stats-cards-container">
                        <div className="stat-card">
                            <h3>{event !== null ? event : "0"}</h3>
                            <p>Total Events</p>
                        </div>
                        <div className="stat-card">
                            <h3>{totalEvents !== null ? totalEvents : "0"}</h3>
                            <p>Allotted events</p>
                        </div>

                    </div>
                </section>

                <section className="main-actions-section">
                    <h2>Quick Actions</h2>
                    <div className="action-buttons-container">
                        <a href='/organizer/events'><button className="action-button primary">View All My Events</button></a>
                        <a href='/organizer/attendees'><button className="action-button primary">Manage Attendees</button></a>
                        <a href='/organizer/reports/sales'><button className="action-button primary">View Sales Reports</button></a>
                    </div>
                </section>

                <div className="dashboard-main-content-area">
                    <section className="upcoming-events-section">
                        <h2>Events</h2>
                        <table className="table">
                            <thead>
                                <tr>

                                    <th scope="col">title</th>
                                    <th scope="col">description</th>
                                    <th scope="col">startDateTime</th>
                                    <th scope="col">endDateTime</th>
                                    <th scope="col">eventType</th>
                                    <th scope="col">Venue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {eventList.map((e, index) => (
                                    <tr key={index}>

                                        <td>{e.title}</td>
                                        <td>{e.description}</td>
                                        <td>{e.startDateTime}</td>
                                        <td>{e.endDateTime}</td>
                                        <td>{e.eventType}</td>
                                        <td>{e.venue ? e.venue.name : 'No Venue'},<br></br>{e.venue ? e.venue.location : "Not Assigned"}</td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </section>
                </div>


            </div>
        </div>
    );
}

export default OrganizerDashboard;