import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/ManageEventsPage.css';
import axios from 'axios';
function ManageEventsPage() {
    const Organizerid = 1;
    const [event, setEvent] = useState([])
    const [title, setTitle] = useState(null)
    const [description, setDescription] = useState(null)
    const [startDateTime, setStartDateTime] = useState(null)
    const [endDateTime, setEndDateTime] = useState(null)
    const [eventType, setEventType] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [editModal, setEditModal] = useState(false);//modal popup
    const [editEventId, setEditEventId] = useState(null);//tracks which event is being edited.
    const [filterDate, setFilterDate] = useState('');
    const [filterEventType, setFilterEventType] = useState('');
    const [filteredEvents, setFilteredEvents] = useState([]);//Stores the list of events after applying filters


    const addEvent = async ($e) => {
        $e.preventDefault();
        let obj = {
            "title": title,
            "description": description,
            "startDateTime": startDateTime,
            "endDateTime": endDateTime,
            "eventType": eventType,
        }
        const response = await axios.post(`http://localhost:8081/api/create/eventBy/organizerId/${Organizerid}`, obj);
        alert("event created successfully")
        getEvent()
        setTitle("")
        setDescription("")
        setEndDateTime("")
        setStartDateTime("")
        setEventType("")
        setShowForm(false)
    }

    const getEvent = async () => {
        const response = await axios.get(`http://localhost:8081/api/get/eventBy/organizerId/${Organizerid}`)
        setEvent(response.data)
        setFilteredEvents(response.data);
    }

    const deleteEvent = async (id) => {
        const response = await axios.delete(`http://localhost:8081/api/delete/event/organizer/${id}/${Organizerid}`)
        let temp = [...event]
        temp = temp.filter(e => e.id !== id)
        setEvent(temp)
        setFilteredEvents(temp);
        alert("Event deleted successfully!!")
    }
    const handleEditClick = (eventData) => {
        setEditEventId(eventData.id);
        setTitle(eventData.title);
        setDescription(eventData.description);
        setStartDateTime(eventData.startDateTime);
        setEndDateTime(eventData.endDateTime);
        setEventType(eventData.eventType);
        setEditModal(true);
    };
    const updateEvent = async (e) => {
        e.preventDefault();
        const obj = {
            title,
            description,
            startDateTime,
            endDateTime,
            eventType,
        };
        await axios.put(`http://localhost:8081/api/update/event/organizer/${editEventId}/1`, obj);
        alert("Event updated successfully");
        setEditModal(false);
        getEvent();
    };
    const applyFilters = () => {
        let filtered = [...event];

        if (filterDate) {
            filtered = filtered.filter(e => e.startDateTime.startsWith(filterDate));
        }

        if (filterEventType) {
            filtered = filtered.filter(e => e.eventType.toLowerCase().includes(filterEventType.toLowerCase()));
        }

        setFilteredEvents(filtered);
    };


    useEffect(() => {
        getEvent()
    }, [])

    return (
        <div className="organizer-page-container">


            <nav className="dashboard-navbar">
                <div className="navbar-brand">
                    <Link to="/">EventSys Pro</Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/organizer" className="nav-link">Dashboard</Link></li>
                    <li><Link to="/organizer/events" className="nav-link active">My Events</Link></li>
                    <li><Link to="/organizer/attendees" className="nav-link">Attendees</Link></li>
                    <li><Link to="/organizer/venues" className="nav-link">Venues</Link></li>
                    <li><Link to="/organizer/reports/sales" className="nav-link">Sales Reports</Link></li>

                </ul>
                <div className="navbar-user-actions">
                    <Link to="/" className="nav-link logout-button">Logout</Link>
                </div>
            </nav>


            <div className="manage-events-page-content">
                <header className="page-header">
                    <h1>My Events</h1>
                    <div className="header-actions">
                        <button className="btn btn-success" onClick={() => setShowForm(true)}>Create Event</button>
                    </div>
                </header>
                {showForm && (
                    <div className="modal-overlay" onClick={() => setShowForm(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2>Create New Event</h2>
                            <form onSubmit={(e) => addEvent(e)}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" value={title}
                                        onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" className="form-control" value={description}
                                        onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Start Date and Time</label>
                                    <input type="datetime-local" className="form-control" value={startDateTime}
                                        onChange={(e) => setStartDateTime(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>End Date and Time</label>
                                    <input type="datetime-local" className="form-control" value={endDateTime}
                                        onChange={(e) => setEndDateTime(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Event Type</label>
                                    <input type="text" className="form-control" value={eventType}
                                        onChange={(e) => setEventType(e.target.value)} required />
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit" className="btn btn-success">Create</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {editModal && (
                    <div className="modal-overlay" onClick={() => setEditModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h2>Edit Event</h2>
                            <form onSubmit={updateEvent}>
                                <div className="form-group">
                                    <label>Title</label>
                                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Start Date and Time</label>
                                    <input type="datetime-local" className="form-control" value={startDateTime} onChange={(e) => setStartDateTime(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>End Date and Time</label>
                                    <input type="datetime-local" className="form-control" value={endDateTime} onChange={(e) => setEndDateTime(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Event Type</label>
                                    <input type="text" className="form-control" value={eventType} onChange={(e) => setEventType(e.target.value)} required />
                                </div>
                                <div className="modal-buttons">
                                    <button type="submit" className="btn btn-success">Update</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setEditModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


                <section className="filter-and-search-section">

                    <div className="filter-controls">
                        <input type="date" className="filter-date" value={filterDate}
                            onChange={(e) => { setFilterDate(e.target.value); }} onBlur={applyFilters} />
                        <input type="text" placeholder="Event Type" className="filter-dropdown" value={filterEventType}
                            onChange={(e) => { setFilterEventType(e.target.value); }} onBlur={applyFilters} />
                        <button
                            className="action-button clear-filters-button"
                            onClick={() => {
                                setFilterDate('');
                                setFilterEventType('');
                                setFilteredEvents(event);
                            }}
                        >clear

                        </button>
                    </div>

                </section>

                <section className="events-list-table-section">
                    <table className="events-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Start date and time</th>
                                <th>End date and time</th>
                                <th>Event type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filteredEvents.map((e, index) => (


                                <tr key={index}>
                                    <td>{e.id}</td>
                                    <td>{e.title}</td>
                                    <td>{e.description}</td>
                                    <td>{e.startDateTime}</td>
                                    <td>{e.endDateTime}</td>
                                    <td>{e.eventType}</td>
                                    <td className="action-cell">
                                        <button className="table-action-button edit" title="Edit Event" onClick={() => handleEditClick(e)}>Edit</button>
                                        <button className="table-action-button delete" title="Delete Event" onClick={() => deleteEvent(e.id)}>Delete</button>
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

export default ManageEventsPage;