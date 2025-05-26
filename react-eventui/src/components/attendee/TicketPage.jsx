import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/AttendeeDashboard.css';  // Assuming you use same CSS for navbar styling
import axios from 'axios';

function TicketPage() {
    const [tickets, setTickets] = useState([]);

    const attendeeId = 1

    useEffect(() => {
        const fetchTickets = async () => {
            try {

                const response = await axios.get(`http://localhost:8081/api/tickets/byAttendee/${attendeeId}`);
                setTickets(response.data);

            } catch (err) {
                console.log("no Tickets found")
            }
        };

        fetchTickets();
    }, []);

    return (
        <div className="attendee-dashboard-page">
            <nav className="attendee-navbar">
                <div className="navbar-brand">
                    <Link to="/">EventSys Pro</Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/attendee/profile" className="nav-link ">My Profile</Link></li>
                    <li><Link to="/attendee" className="nav-link">Browse & Register</Link></li>
                    <li><Link to="/attendee/ticket" className="nav-link active">Your Events</Link></li>
                </ul>
                <div className="navbar-user-actions">
                    <Link to="/" className="nav-link logout-button">Logout</Link>
                </div>
            </nav>

            <main className="attendee-catalog-content">
                <header className="catalog-header-attendee">
                    <h1>My Purchased Tickets</h1>
                    <p>View your tickets for upcoming and past events.</p>
                </header>

                <table className="tickets-table">
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Ticket Type</th>
                            <th>Price</th>
                            <th>Booking Date</th>
                            <th>Total Tickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.event?.title || 'N/A'}</td>
                                <td>{ticket.ticketType}</td>
                                <td>₹{ticket.price}</td>
                                <td>{ticket.purchaseDate}</td>
                                <td>{ticket.totalTicket}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>

            </main>

        </div>
    );
}

export default TicketPage;
