package com.bytatech.ayoos.doctor.service;

import com.bytatech.ayoos.doctor.domain.Doctor;
import com.bytatech.ayoos.doctor.service.dto.DoctorDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;

import java.time.LocalDate;
import java.util.Optional;

/**
 * Service Interface for managing Doctor.
 */
public interface DoctorService {

    /**
     * Save a doctor.
     *
     * @param doctorDTO the entity to save
     * @return the persisted entity
     */
    DoctorDTO save(DoctorDTO doctorDTO);

    /**
     * Get all the doctors.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DoctorDTO> findAll(Pageable pageable);


    /**
     * Get the "id" doctor.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<DoctorDTO> findOne(Long id);

    /**
     * Delete the "id" doctor.
     *
     * @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the doctor corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<DoctorDTO> search(String query, Pageable pageable);
    void setBusySessionsByProfileNameAndDate(String profileName, LocalDate date);
    
	Page<DoctorDTO> findByLocationNear(Point point, Distance value, Pageable pageable);
	Page<DoctorDTO> findByLocationWithin(Point point, Distance value, Pageable pageable);
 
}
