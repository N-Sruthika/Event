package com.event.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.event.model.Event;

public interface EventRepository extends JpaRepository<Event, Integer> {


	List<Event> findByOrganizerId(int organizerId);

	int countByOrganizerId(int organizerId);
}
