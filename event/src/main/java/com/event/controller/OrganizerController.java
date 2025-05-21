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
import com.event.model.Organizer;
import com.event.service.OrganizerService;

@RestController
public class OrganizerController {
	@Autowired
    private OrganizerService organizerService;
	 // Create new organizer
    @PostMapping("/api/create/organizer")
    public Organizer createOrganizer(@RequestBody Organizer organizer) {
        return organizerService.createOrganizer(organizer);
    }
	
    // Get all organizers
    @GetMapping("/api/getall/organizer")
    public List<Organizer> getAllOrganizers() {
        return organizerService.getAllOrganizers();
    }

    // Get organizer by ID
    @GetMapping("/api/get/organizerById/{oid}")
    public Organizer getOrganizerById(@PathVariable int oid) throws InvalidIdException {
        return organizerService.getOrganizerById(oid);
    }
    
    // Update organizer
    @PutMapping("/api/update/organizerById/{oid}")
    public Organizer updateOrganizer(@PathVariable int oid, @RequestBody Organizer newOrganizer) throws InvalidIdException {
        return organizerService.updateOrganizer(oid, newOrganizer);
    }


    // Delete organizer
    @DeleteMapping("/api/delete/organizerById/{oid}")
    public String deleteOrganizer(@PathVariable int oid) throws InvalidIdException {
        organizerService.deleteOrganizerById(oid);
        return "Organizer deleted successfully.";
    }
   
}
