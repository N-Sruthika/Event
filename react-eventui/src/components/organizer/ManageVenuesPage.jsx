import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ManageVenuesPage.css'; 

function ManageVenuesPage() {
  const Organizerid=1;
  const [venues, setVenues] = useState([]);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
 

  const getVenues = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/getAll/venue');
      setVenues(response.data);
    } catch (error) {
      console.error('Failed to fetch venues:', error);
    }
  };

  const AddVenue = async (e) => {
    e.preventDefault();
    const venue = { name, location, capacity };
    try {
      await axios.post('http://localhost:8081/api/add/venue', venue);
      alert('Venue added successfully!');
      setName('');
      setLocation('');
      setCapacity('');
      setShowForm(false);
      getVenues();
    } catch (error) {
      console.error('Failed to add venue:', error);
    }
  };
  const getEvents=async()=>{
        const response=await axios.get(`http://localhost:8081/api/get/eventBy/organizerId/${Organizerid}`)
        setEvents(response.data)
    }
  const assignVenueToEvent = async (venueId) => {
    if (!selectedEventId) {
      alert('Please select an event first.');
      return;
    }
    try {
      await axios.put(`http://localhost:8081/api/eventId/venueId/${selectedEventId}/${venueId}`);
      alert('Venue assigned to event successfully!');
      
    } catch (error) {
      console.error('Failed to assign venue:', error);
      alert('Error assigning venue to event');
    }
  };

  useEffect(() => {
    getVenues();
    getEvents();
  }, []);

  return (
    <div className="organizer-page-container"> 

      <nav className="dashboard-navbar">
        <div className="navbar-brand">
          <Link to="/">EventSys Pro</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/organizer" className="nav-link">Dashboard</Link></li>
          <li><Link to="/organizer/events" className="nav-link">My Events</Link></li>
          <li><Link to="/organizer/attendees" className="nav-link">Attendees</Link></li>
          <li><Link to="/organizer/venues" className="nav-link active">Venues</Link></li> 
           <li><Link to="/organizer/reports/sales" className="nav-link">Sales Reports</Link></li>
        </ul>
        <div className="navbar-user-actions">
           <Link to="/" className="nav-link logout-button">Logout</Link>
        </div>
      </nav>
     
      <div className="manage-venues-page-content">
        <header className="page-header">
          <h1>Manage Venues</h1>
          <div className="header-actions">
              <div>
              <label htmlFor="eventSelect">Select Event: </label>
              <select
                id="eventSelect"
                value={selectedEventId}
                onChange={(e) => setSelectedEventId(e.target.value)}
              >
                <option value="">-- Select an event --</option>
                {events.map((event) => (
                  <option key={event.id} value={event.id}>
                    {event.title}
                  </option>
                ))}
              </select><br></br>

            </div>
       <button className="action-button" onClick={() => setShowForm(true)}>Add Venue</button>


          </div>
        </header>
        {showForm && (
          <div className="modal-popup">
            <form className="popup-form" onSubmit={AddVenue}>
              <h2>Create New Venue</h2>
              <input type="text" placeholder="Venue Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
              <input type="number" placeholder="Capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} required />
              <div className="form-actions">
                <button type="submit" className="action-button submit">Add</button>
                <button type="button" className="action-button cancel" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

       

        <section className="venues-list-section">

          <table className="venues-table"> {/* Can reuse .events-table styles */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Venue Name</th>
                <th>Address</th>
                <th>Capacity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {venues.map((venue) => (
                <tr key={venue.id}>
                  <td>{venue.id}</td>
                  <td>{venue.name}</td>
                  <td>{venue.location}</td>
                  <td>{venue.capacity}</td>
                  <td className="action-cell">
                    <button
                      className="table-action-button assign"
                      onClick={() => assignVenueToEvent(venue.id)}
                      style={{ marginLeft: '8px' }}
                    >
                      Assign to Event
                    </button>
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

export default ManageVenuesPage;