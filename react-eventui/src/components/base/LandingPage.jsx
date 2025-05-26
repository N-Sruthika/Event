import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo-container">
          <h1 className="brand-name">EventSys Pro</h1>
        </div>

      </header>

      <main className="landing-main">
        <section className="hero-section">
          <div className="hero-content">
            <h2>Discover & Manage Your Next Event</h2>
            <p className="hero-subtitle">
              The ultimate platform for event organizers and attendees. Plan, promote, and experience unforgettable events.
            </p>
            <div className="cta-buttons">
              <Link to="/organizer" className="cta-button primary">
                Organizer Dashboard
              </Link>
              <Link to="/attendee/dashboard" className="cta-button secondary">
                Attendee Dashboard
              </Link>
            </div>
          </div>

        </section>


      </main>

    </div>
  );
}

export default LandingPage;