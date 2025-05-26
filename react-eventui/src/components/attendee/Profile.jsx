import { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/Profile.css";
import { Link } from 'react-router-dom';
import '../css/AttendeeDashboard.css';

const MemberProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = 1;

    useEffect(() => {
        axios.get(`http://localhost:8081/api/profile/${id}`)
            .then(res => {
                setProfile(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch profile:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading profile...</div>;
    if (!profile) return <div>No profile found.</div>;

    return (
        <>
            {/* Navigation Bar */}
            <nav className="attendee-navbar">
                <div className="navbar-brand">
                    <Link to="/">EventSys Pro</Link>
                </div>
                <ul className="navbar-links">
                    <li><Link to="/attendee/profile" className="nav-link active">My Profile</Link></li>
                    <li><Link to="/attendee" className="nav-link">Browse & Register</Link></li>
                    <li><Link to="/attendee/ticket" className="nav-link ">Your Events</Link></li>
                </ul>
                <div className="navbar-user-actions">
                    <Link to="/" className="nav-link logout-button">Logout</Link>
                </div>
            </nav>

            {/* Profile Section */}
            <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#f9f9f9', borderRadius: 12, boxShadow: '0 2px 12px rgba(30,144,255,0.07)' }}>
                <h2 style={{ color: '#185a9d', marginBottom: 24 }}>My Profile</h2>
                <div style={{ marginBottom: 16 }}><b>Name:</b> {profile.fullName}</div>
                <div style={{ marginBottom: 16 }}><b>Email:</b> {profile.email}</div>
                <div style={{ marginBottom: 16 }}><b>Phone Number:</b> {profile.phone}</div>
                <div style={{ marginBottom: 16 }}><b>Location:</b> {profile.location}</div>
            </div>
        </>
    );
};



export default MemberProfile;
