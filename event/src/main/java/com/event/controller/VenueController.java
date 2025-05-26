package com.event.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.event.exception.InvalidIdException;
import com.event.model.Event;
import com.event.model.Venue;
import com.event.service.EventService;
import com.event.service.VenueService;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
public class VenueController {
	@Autowired
    private VenueService venueService;
	@Autowired
    private EventService eventService;
	
	//add venue by post method
	@PostMapping("/api/add/venue")
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.createVenue(venue);
    }
	//assign venue to the event
	@PutMapping("/api/eventId/venueId/{eventId}/{venueId}")
    public Event assignVenue(@PathVariable int eventId, @PathVariable int venueId) throws InvalidIdException {
        return eventService.assignVenueToEvent(eventId, venueId);
    }
	
	//method to list down all venue
	@GetMapping("/api/getAll/venue")
	public List<Venue> getAllVenue() {
		return venueService.getAllVenue();
	}
	

}
