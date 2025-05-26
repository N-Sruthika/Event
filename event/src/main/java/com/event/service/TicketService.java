package com.event.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.event.exception.InvalidIdException;
import com.event.model.Attendee;
import com.event.model.Event;
import com.event.model.Ticket;
import com.event.repository.TicketRepository;
@Service
public class TicketService {
	@Autowired
    private TicketRepository ticketRepository;
	@Autowired
    private AttendeeService attendeeService;
	@Autowired
	private EventService eventService;

	public Ticket sellTicket(int attendeeId, int eventId, Ticket ticket) throws InvalidIdException {
		Attendee attendee = attendeeService.getAttendeeById(attendeeId);
        Event event = eventService.getEventById(eventId);
        ticket.setAttendee(attendee);
        ticket.setEvent(event);
        ticket.setPurchaseDate(LocalDateTime.now());
        return ticketRepository.save(ticket);
	}

	public List<Ticket> getTicketsByOrganizer(int organizerId) {
		 return ticketRepository.findTicketsByEventOrganizerId(organizerId);
	}

	 public List<Ticket> getTicketsByAttendee(int attendeeId) {
	        return ticketRepository.findByAttendeeId(attendeeId);
	    }

	public List<Ticket> getTicketsByEventId(int eventId) {
		// TODO Auto-generated method stub
		return ticketRepository.findByEventId(eventId);
	}
}
