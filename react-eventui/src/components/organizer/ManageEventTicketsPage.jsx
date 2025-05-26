import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/ManageEventTicketsPage.css';

function ManageEventTicketsPage() {
  const Organizerid = 1;

  // For event summary
  const [eventSales, setEventSales] = useState([]);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalSales, setTotalSales] = useState(0);

  // For detailed tickets with pagination
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const totalPages = Math.ceil(tickets.length / pageSize);
  const currentTickets = tickets.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/tickets/byOrganizer/${Organizerid}`);
        const allTickets = response.data;

        // 1) Prepare event summary data
        const eventMap = {};
        allTickets.forEach(ticket => {
          const eventId = ticket.event.id;
          if (!eventMap[eventId]) {
            eventMap[eventId] = {
              eventTitle: ticket.event.title,
              ticketsSold: 0,
              totalRevenue: 0,
            };
          }
          eventMap[eventId].ticketsSold += 1; // each ticket is one sale
          eventMap[eventId].totalRevenue += ticket.price;
        });

        setEventSales(Object.values(eventMap));
        setTotalTickets(allTickets.length);
        setTotalSales(allTickets.reduce((sum, t) => sum + t.price, 0));

        // 2) Set all tickets for detailed table + pagination
        setTickets(allTickets);
      } catch (error) {
        console.error('Error fetching ticket data:', error);
      }
    };

    fetchTickets();
  }, []);

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="organizer-page-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-brand">
          <Link to="/">EventSys Pro</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/organizer" className="nav-link">Dashboard</Link></li>
          <li><Link to="/organizer/events" className="nav-link">My Events</Link></li>
          <li><Link to="/organizer/attendees" className="nav-link">Attendees</Link></li>
          <li><Link to="/organizer/venues" className="nav-link">Venues</Link></li>
          <li><Link to="/organizer/reports/sales" className="nav-link active">Sales Reports</Link></li>
        </ul>
        <div className="navbar-user-actions">
          <Link to="/" className="nav-link logout-button">Logout</Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="ticket-sales-container">
        <div className="sales-header">
          <h1>Ticket Sales Report</h1>
          <p>Overview of ticket sales for your events.</p>
        </div>

        {/* Summary Cards */}
        <div className="sales-summary">
          <div className="summary-card">
            <h3>{totalTickets}</h3>
            <p>Total Tickets Sold</p>
          </div>
          <div className="summary-card">
            <h3>₹{(typeof totalSales === 'number' && !isNaN(totalSales)) ? totalSales.toFixed(2) : '0.00'}</h3>
            <p>Total Revenue</p>
          </div>
        </div>

        {/* Event Sales Summary Table */}
        <section className="ticket-sales-table-section">
          <h2>Event Sales Summary</h2>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Tickets Sold</th>
                <th>Total Revenue</th>
              </tr>
            </thead>
            <tbody>
              {eventSales.length === 0 ? (
                <tr><td colSpan="3">No sales data available.</td></tr>
              ) : (
                eventSales.map((event, index) => (
                  <tr key={index}>
                    <td>{event.eventTitle}</td>
                    <td>{event.ticketsSold}</td>
                    <td>₹{Number(event.totalRevenue || 0).toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        {/* Detailed Tickets Table with Pagination */}
        <section className="ticket-sales-table-section" style={{ marginTop: '40px' }}>
          <h2>Sales Breakdown</h2>
          <table className="sales-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Attendee</th>
                <th>Price</th>
                <th>Sold On</th>
              </tr>
            </thead>
            <tbody>
              {currentTickets.length === 0 ? (
                <tr><td colSpan="4">No ticket sales available.</td></tr>
              ) : (
                currentTickets.map((ticket, idx) => (
                  <tr key={idx}>
                    <td>{ticket.event?.title}</td>
                    <td>{ticket.attendee?.fullName}</td>
                    <td>₹{ticket.price},<br/>
                    <strong>Ticket:</strong>{ticket.totalTicket}
                    </td>
                    <td>{ticket.purchaseDate}</td>

                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls" style={{ marginTop: '10px' }}>
            <button onClick={handlePrevPage} disabled={currentPage === 0}>Prev</button>
            <span style={{ margin: '0 10px' }}>Page {currentPage + 1} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManageEventTicketsPage;
