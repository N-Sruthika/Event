package com.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.event.exception.InvalidIdException;
import com.event.model.Ticket;
import com.event.service.TicketService;

@RestController
public class TicketController {
	@Autowired
    private TicketService ticketService;
	@PostMapping("/api/sellTicket/attendeeId/eventId/{attendeeId}/{eventId}")
    public Ticket sellTicket(@PathVariable int attendeeId, @PathVariable int eventId, @RequestBody Ticket ticket) throws InvalidIdException {                            
        return ticketService.sellTicket(attendeeId, eventId, ticket);
    }

}
