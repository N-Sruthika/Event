import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/MyRegistrationsPage.css'; // Assuming this CSS file will be updated
import axios from 'axios';
function MyRegistrationsPage() {
  const [eventRegistration, setEventRegistration] = useState(null)
  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [phone, setPhone] = useState(null)
  const [location, setLocation] = useState(null)
  const addAttendee = async (e) => {
    e.preventDefault();
    let obj = {
      "fullName": name,
      "email": email,
      "phone": phone,
      "location": location
    }

    const response = await axios.post(`http://localhost:8081/api/register/attendees`, obj)
    setEventRegistration(response.data)
    alert("Registration successful!!")
    setEmail("")
    setName("")
    setLocation('')
    setPhone('')

  }
  return (
    <div className="my-registrations-page">
      <nav className="attendee-navbar">
        <div className="navbar-brand">
          <Link to="/">EventSys Pro</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/attendee/my-registrations" className="nav-link active">My Registrations</Link></li>
         
        </ul>
        <div className="navbar-user-actions">

          <Link to="/" className="nav-link logout-button">Logout</Link>
        </div>
      </nav>
      <p>
        Welcome!!!
      </p>
      <div className='form-container'>
        <form onSubmit={(e) => addAttendee(e)}>
          <h2>One Time Registration</h2>
          <input type="text" placeholder="Enter your Name" onChange={(e) => setName(e.target.value)} />
          <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="number" placeholder="Contact Number" onChange={(e) => setPhone(e.target.value)} required />
          <input type="text" placeholder="Location" onChange={(e) => setLocation(e.target.value)} />
          <div className="form-actions">
            <button type="submit" className="action-button submit">Register</button>
           
          </div><p>Note: Skip this if you already registered.</p>
        </form>
         <button className="action-button submit"><Link to="/attendee">Go to Dashboard</Link></button>
         
      </div>

    </div>
  );
}

export default MyRegistrationsPage;