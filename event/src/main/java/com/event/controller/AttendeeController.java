package com.event.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.event.model.Attendee;
import com.event.service.AttendeeService;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
public class AttendeeController {
	@Autowired
    private AttendeeService attendeeService;
	// Register an attendee
    @PostMapping("/api/register/attendees")
    public Attendee registerAttendee(@RequestBody Attendee attendee) {
        return attendeeService.registerAttendee(attendee);
    }
    
    
    @GetMapping("/api/getAll/attendee")
    public List<Attendee> getAll() {
		return attendeeService.getAll();
    	
    }
    @GetMapping("/api/profile/{id}")
    public Attendee getProfileById(@PathVariable int id) {
        return attendeeService.getProfileById(id)
                .orElseThrow(() -> new RuntimeException("Member not found"));
    }
}
