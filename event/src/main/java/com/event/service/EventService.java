package com.event.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.event.exception.InvalidIdException;
import com.event.model.Event;
import com.event.model.Organizer;
import com.event.model.Venue;
import com.event.repository.EventRepository;
import com.event.repository.OrganizerRepository;
import com.event.repository.VenueRepository;
@Service
public class EventService {
	@Autowired
	private EventRepository eventRepository;
	@Autowired
	private OrganizerService organizerService;
	@Autowired
    private VenueRepository venueRepository;
	@Autowired
	private OrganizerRepository organizerRepository;
	
	public Event createEvent(int oid, Event event) throws InvalidIdException {
		Organizer organizer = organizerService.getOrganizerById(oid);
        event.setOrganizer(organizer);
        return eventRepository.save(event);
	}
	
	public List<Event> getAllEvents() {
		return eventRepository.findAll();
	}
	
	public Event getEventById(int id) throws InvalidIdException {
		Optional<Event> optional=eventRepository.findById(id);
		if(optional.isEmpty())
			throw new InvalidIdException("Event Id not found");
		return optional.get();
	}
	
	public List<Event> getEventsByOrganizerId(int organizerId) throws InvalidIdException {
	    return eventRepository.findByOrganizerId(organizerId); // ✅ pass only the ID
	}

	
	public Event updateEvent(int eventId, int organizerId, Event updatedEvent) throws InvalidIdException {
		Organizer organizer = organizerService.getOrganizerById(organizerId);
		if (organizer == null) {
            throw new InvalidIdException("Organizer Id not found");
        }
		Event event = getEventById(eventId);
		if (event.getOrganizer().getId() != organizerId) {
            throw new InvalidIdException("Event does not belong to the specified organizer");
        }
        
        event.setTitle(updatedEvent.getTitle());
        event.setDescription(updatedEvent.getDescription());
        event.setStartDateTime(updatedEvent.getStartDateTime());
        event.setEndDateTime(updatedEvent.getEndDateTime());
        event.setEventType(updatedEvent.getEventType());
		return eventRepository.save(event);
	}
	
	public void deleteEvent(int eventId, int organizerId) throws InvalidIdException {
		Organizer organizer = organizerService.getOrganizerById(organizerId); 
		if (organizer == null) {
            throw new InvalidIdException("Organizer Id not found");
        }
		Event event = getEventById(eventId); // Validate event
		if (event.getOrganizer().getId() != organizerId) {
            throw new InvalidIdException("Event does not belong to the specified organizer");
        }
	    eventRepository.delete(event);

		
	}
	public Event assignVenueToEvent(int eventId, int venueId) throws InvalidIdException {
	    Optional<Event> eventOptional = eventRepository.findById(eventId);
	    if (eventOptional.isEmpty()) {
	        throw new InvalidIdException("Event not found ");
	    }
	    Event event = eventOptional.get();

	    Optional<Venue> venueOptional = venueRepository.findById(venueId);
	    if (venueOptional.isEmpty()) {
	        throw new InvalidIdException("Venue not found ");
	    }
	    Venue venue = venueOptional.get();

	    event.setVenue(venue);
	    return eventRepository.save(event);
	}
	
	public Event scheduleEventByOrganizer(int organizerId, int eventId, int venueId, Event updatedEvent) throws InvalidIdException {
	    Optional<Organizer> optionalOrganizer = organizerRepository.findById(organizerId);
	    if (optionalOrganizer.isEmpty()) {
	        throw new InvalidIdException("Organizer ID not found");
	    }

	    Optional<Event> optionalEvent = eventRepository.findById(eventId);
	    if (optionalEvent.isEmpty()) {
	        throw new InvalidIdException("Event ID not found");
	    }

	    Optional<Venue> optionalVenue = venueRepository.findById(venueId);
	    if (optionalVenue.isEmpty()) {
	        throw new InvalidIdException("Venue ID not found");
	    }

	    Event event = optionalEvent.get();

	    // Ensure event belongs to the organizer
	    if (event.getOrganizer().getId() != organizerId) {
	        throw new InvalidIdException("Event does not belong to the specified organizer");
	    }

	    event.setStartDateTime(updatedEvent.getStartDateTime());
	    event.setEndDateTime(updatedEvent.getEndDateTime());
	    event.setVenue(optionalVenue.get());

	    return eventRepository.save(event);
	}

	public int countEventsByOrganizerId(int organizerId) {
		// TODO Auto-generated method stub
		return eventRepository.countByOrganizerId(organizerId);
	}

	public int countAllEvents() {
		// TODO Auto-generated method stub
		 return (int) eventRepository.count();
	}

	public Event createEvent(Event event) {
		// TODO Auto-generated method stub
		return eventRepository.save(event);
	}

	
	
}
