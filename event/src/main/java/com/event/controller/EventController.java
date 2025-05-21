package com.event.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.event.exception.InvalidIdException;
import com.event.model.Event;
import com.event.service.EventService;

@RestController
public class EventController {
	@Autowired
	private EventService eventService;
	//method to get all events
	@GetMapping("/api/getall/event")
	public List<Event> getAllEvents() {
       return eventService.getAllEvents();
    }
	
	//method to get event by id
	@GetMapping("/api/get/eventById/{id}")
	public Event getEventById(@PathVariable int id) throws InvalidIdException {
        return eventService.getEventById(id);
    }
	
	//method to add or create event by organizer id
	@PostMapping("/api/create/eventBy/organizerId/{oid}")
    public Event createEvent(@PathVariable int oid,@RequestBody Event event) throws InvalidIdException {
        return eventService.createEvent(oid,event);
    }
	// Get events by organizer ID
    @GetMapping("/api/get/eventBy/organizerId/{organizerId}")
    public List<Event> getEventsByOrganizer(@PathVariable int organizerId) throws InvalidIdException {
        return eventService.getEventsByOrganizerId(organizerId);
    }
    @PutMapping("/api/update/event/organizer/{eventId}/{organizerId}")
    public Event updateEvent(@PathVariable int eventId, @PathVariable int organizerId,@RequestBody Event updatedEvent) throws InvalidIdException {           
        return eventService.updateEvent(eventId, organizerId, updatedEvent);
    }
    @DeleteMapping("/api/delete/event/organizer/{eventId}/{organizerId}")
    public String deleteEvent(@PathVariable int eventId,@PathVariable int organizerId) throws InvalidIdException {
        eventService.deleteEvent(eventId, organizerId);
        return "Event deleted successfully.";
    }
    // manage event schedule by put method
    @PutMapping("/api/organizer/event/schedule/{organizerId}/{eventId}/{venueId}")
    public Event scheduleEvent(@PathVariable int organizerId, @PathVariable int eventId,
    		@PathVariable int venueId,@RequestBody Event updateEvent) throws InvalidIdException {
        return eventService.scheduleEventByOrganizer(organizerId, eventId, venueId, updateEvent);
    }


}
