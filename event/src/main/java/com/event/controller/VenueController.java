package com.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
public class VenueController {
	@Autowired
    private VenueService venueService;
	@Autowired
    private EventService eventService;

	@PostMapping("/api/add/venue")
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.createVenue(venue);
    }
	@PutMapping("/api/eventId/venueId/{eventId}/{venueId}")
    public Event assignVenue(@PathVariable int eventId, @PathVariable int venueId) throws InvalidIdException {
        return eventService.assignVenueToEvent(eventId, venueId);
    }
	

}
