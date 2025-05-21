package com.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.event.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {

}
