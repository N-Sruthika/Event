import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/AttendeeDashboard.css';
import axios from 'axios';

function AttendeeDashboard() {
  const attendeeId = 1;
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketType, setTicketType] = useState("Regular");
  const [totalTicket, setTotalTicket] = useState("");
  const [price, setPrice] = useState(0);
  const [seatNumbers, setSeatNumbers] = useState([]);

  const getEvents = async () => {
    const response = await axios.get(`http://localhost:8081/api/getall/event`);
    setEvents(response.data);
  };

  const handleGetTicketClick = (event) => {
    setSelectedEvent(event);
    setShowTicketModal(true);
  };

  const handleTicketBooking = async () => {
    if (!totalTicket || isNaN(totalTicket) || Number(totalTicket) <= 0) {
      alert("Please enter a valid number of tickets.");
      return;
    }

    const ticketData = {
      ticketType,
      totalTicket: parseInt(totalTicket),
      price: price * parseInt(totalTicket),
      
    };

    try {
      await axios.post(
        `http://localhost:8081/api/sellTicket/attendeeId/eventId/${attendeeId}/${selectedEvent.id}`,
        ticketData
      );
      alert("Ticket booked!");
      setShowTicketModal(false);
      setTicketType("Regular");
      setTotalTicket("");
      
    } catch (err) {
      alert("Failed to book ticket.");
    }
  };

  // Fetch events on mount
  useEffect(() => {
    getEvents();
  }, []);

  // Update ticket price when type changes
  useEffect(() => {
    if (ticketType === "Regular") setPrice(100);
    else if (ticketType === "VIP") setPrice(200);
  }, [ticketType]);

 

  return (
    <div className="attendee-dashboard-page">
      <nav className="attendee-navbar">
        <div className="navbar-brand">
          <Link to="/">EventSys Pro</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/attendee/profile" className="nav-link">My Profile</Link></li>
          <li><Link to="/events" className="nav-link active">Browse & Register</Link></li>
          <li><Link to="/attendee/ticket" className="nav-link">Your Events</Link></li>
        </ul>
        <div className="navbar-user-actions">
          <Link to="/" className="nav-link logout-button">Logout</Link>
        </div>
      </nav>

      <main className="attendee-catalog-content">
        <header className="catalog-header-attendee">
          <h1>Explore & Book Tickets for Events</h1>
          <p>Find your next experience and secure your spot!</p>
        </header>

        <section className="event-listing-section">
          <h2>Available Events</h2>
          <div className="event-cards-container">
            {events.map(event => {
              const startDate = new Date(event.startDateTime);
              const formattedDate = startDate.toLocaleDateString();
              const formattedTime = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

              return (
                <div key={event.id} className="event-card attendee-view">
                  <div className="event-card-header">
                    <h3>{event.title}</h3>
                  </div>
                  <div className="event-card-body">
                    <p><strong>Date:</strong> {formattedDate}</p>
                    <p><strong>Time:</strong> {formattedTime}</p>
                    <p><strong>Venue:</strong> {event.venue ? `${event.venue.name}, ${event.venue.location}` : 'TBD'}</p>
                    <p className="event-description-catalog">{event.description}</p>
                  </div>
                  <div className="event-card-actions">
                    <button onClick={() => handleGetTicketClick(event)}>Get Ticket</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="attendee-footer">
        <p>© {new Date().getFullYear()} EventSys Pro. All rights reserved.</p>
      </footer>

      {showTicketModal && (
        <div className="modal-backdrop">
          <div className="ticket-modal">
            <h3>Book Ticket for {selectedEvent.title}</h3>

            <label>Ticket Type:</label>
            <select value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
              <option value="Regular">Regular</option>
              <option value="VIP">VIP</option>
            </select>

            <label>Total Tickets:</label>
            <input
              type="number"
              value={totalTicket}
              onChange={(e) => setTotalTicket(e.target.value)}
              min="1"
            />

            <p><strong>Price per ticket:</strong> ₹{price}</p>
            <p><strong>Total price:</strong> ₹{price * (parseInt(totalTicket) || 0)}</p>

            <button onClick={handleTicketBooking}>Confirm Booking</button>
            <button onClick={() => setShowTicketModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AttendeeDashboard;
