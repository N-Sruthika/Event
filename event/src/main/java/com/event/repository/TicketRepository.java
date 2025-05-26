package com.event.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.event.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

	List<Ticket> findTicketsByEventOrganizerId(int organizerId);

	List<Ticket> findByAttendeeId(int attendeeId);

	List<Ticket> findByEventId(int eventId);

}
