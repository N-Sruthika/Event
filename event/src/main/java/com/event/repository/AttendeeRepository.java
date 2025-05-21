package com.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.event.model.Attendee;

public interface AttendeeRepository extends JpaRepository<Attendee, Integer> {

}
