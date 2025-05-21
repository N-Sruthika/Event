package com.event.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.event.exception.InvalidIdException;
import com.event.model.Organizer;
import com.event.repository.OrganizerRepository;
@Service
public class OrganizerService {
	@Autowired
    private OrganizerRepository organizerRepository;

	public Organizer createOrganizer(Organizer organizer) {
		return organizerRepository.save(organizer);
	}

	public List<Organizer> getAllOrganizers() {
		
		return organizerRepository.findAll();
	}

	public Organizer getOrganizerById(int oid) throws InvalidIdException {
		Optional<Organizer> optional = organizerRepository.findById(oid);
        if (optional.isEmpty()) {
            throw new InvalidIdException("Organizer ID not found");
        }
        return optional.get();
	}

	public Organizer updateOrganizer(int oid, Organizer newOrganizer) throws InvalidIdException {
        Organizer organizer = getOrganizerById(oid);
        organizer.setName(newOrganizer.getName());
        organizer.setEmail(newOrganizer.getEmail());
        organizer.setContactNumber(newOrganizer.getContactNumber());
        return organizerRepository.save(organizer);
    }

	public void deleteOrganizerById(int oid) throws InvalidIdException {
		Organizer organizer = getOrganizerById(oid);
		organizerRepository.delete(organizer);
		
	}	

}
