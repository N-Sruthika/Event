package com.event.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.event.exception.InvalidIdException;
import com.event.model.Ticket;
import com.event.service.TicketService;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
public class TicketController {
	@Autowired
    private TicketService ticketService;
	
	//post method to sell ticket for an attendee for the event
	@PostMapping("/api/sellTicket/attendeeId/eventId/{attendeeId}/{eventId}")
    public Ticket sellTicket(@PathVariable int attendeeId, @PathVariable int eventId, @RequestBody Ticket ticket) throws InvalidIdException {                            
        return ticketService.sellTicket(attendeeId, eventId, ticket);
    }
	@GetMapping("/api/tickets/byOrganizer/{organizerId}")
	public List<Ticket> getTicketsByOrganizer(@PathVariable int organizerId) {
	    return ticketService.getTicketsByOrganizer(organizerId);
	}
	@GetMapping("/api/tickets/byAttendee/{attendeeId}")
    public List<Ticket> getTicketsByAttendee(@PathVariable int attendeeId) {
        return ticketService.getTicketsByAttendee(attendeeId);
    }
	@GetMapping("/api/byEvent/{eventId}")
    public List<Ticket> getTicketsByEvent(@PathVariable int eventId) {
        return ticketService.getTicketsByEventId(eventId);
    }

}
