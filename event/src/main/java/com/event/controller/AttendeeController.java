package com.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.event.model.Attendee;
import com.event.service.AttendeeService;

@RestController
public class AttendeeController {
	@Autowired
    private AttendeeService attendeeService;
	// Register an attendee
    @PostMapping("/api/register/attendees")
    public Attendee registerAttendee(@RequestBody Attendee attendee) {
        return attendeeService.registerAttendee(attendee);
    }
}
