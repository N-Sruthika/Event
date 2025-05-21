package com.event.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.event.model.Event;
import com.event.model.Organizer;

public interface EventRepository extends JpaRepository<Event, Integer> {

	List<Event> findByOrganizer(Organizer organizer);
}
