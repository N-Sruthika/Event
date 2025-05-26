import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/organizer/Home.jsx'  // capital H assumed
import ManageEventsPage from './components/organizer/ManageEventsPage'

import ManageVenuesPage from './components/organizer/ManageVenuesPage'
import ManageAttendeesPage from './components/organizer/ManageAttendeesPage'
import ManageEventTicketsPage from './components/organizer/ManageEventTicketsPage'
import LandingPage from './components/base/LandingPage.jsx'
import AttendeeDashboard from './components/attendee/AttendeeDashboard.jsx'
import MyRegistrationsPage from './components/attendee/MyRegistrationsPage.jsx'
import TicketPage from './components/attendee/TicketPage.jsx'
import MemberProfile from './components/attendee/Profile.jsx'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
       <Route path="/" element={<LandingPage />} />
      <Route path="/organizer" element={<Home />} />      
      <Route path="/organizer/events" element={<ManageEventsPage />} /> 
      <Route path="/organizer/venues" element={<ManageVenuesPage />} />
      <Route path="/organizer/attendees" element={<ManageAttendeesPage />} />
      <Route path="/organizer/reports/sales" element={<ManageEventTicketsPage />} /> 
      <Route path="/attendee" element={<AttendeeDashboard />} /> 
      <Route path="/attendee/dashboard" element={<MyRegistrationsPage />} />
      <Route path="/attendee/ticket" element={<TicketPage/>} />
      <Route path="/attendee/profile" element={<MemberProfile/>} />
      

    </Routes>
  )
}

export default App
