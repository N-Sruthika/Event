package com.event.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.event.exception.InvalidIdException;
import com.event.model.Attendee;
import com.event.repository.AttendeeRepository;
@Service
public class AttendeeService {
	@Autowired
    private AttendeeRepository attendeeRepository;

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

}
