package com.event.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.event.model.Venue;
import com.event.repository.VenueRepository;
@Service
public class VenueService {
	@Autowired
    private VenueRepository venueRepository;

	public Venue createVenue(Venue venue) {
		// TODO Auto-generated method stub
		return venueRepository.save(venue);
	}

}
