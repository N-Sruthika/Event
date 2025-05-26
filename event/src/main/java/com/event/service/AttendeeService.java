package com.event.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.event.exception.InvalidIdException;
import com.event.model.Attendee;
import com.event.repository.AttendeeRepository;
import com.event.repository.EventRepository;
@Service
public class AttendeeService {
	@Autowired
    private AttendeeRepository attendeeRepository;
	@Autowired
    private EventRepository eventRepository;
	public Attendee registerAttendee(Attendee attendee) {
		// TODO Auto-generated method stub
		return attendeeRepository.save(attendee);
	}

	public Attendee getAttendeeById(int id) throws InvalidIdException {
	    Optional<Attendee> optional = attendeeRepository.findById(id);
	    if (optional.isEmpty())
	        throw new InvalidIdException("Attendee not found with id: " + id);
	    return optional.get();
	}

	public List<Attendee> getAll() {
		// TODO Auto-generated method stub
		return attendeeRepository.findAll();
	}

	public Optional<Attendee> getProfileById(int id) {
		// TODO Auto-generated method stub
		return attendeeRepository.findById(id);
	}

	
}
