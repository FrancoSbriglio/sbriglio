package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CarnetDeConducir;
import com.mycompany.myapp.repository.CarnetDeConducirRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CarnetDeConducir}.
 */
@RestController
@RequestMapping("/api")
public class CarnetDeConducirResource {

    private final Logger log = LoggerFactory.getLogger(CarnetDeConducirResource.class);

    private static final String ENTITY_NAME = "carnetDeConducir";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarnetDeConducirRepository carnetDeConducirRepository;

    public CarnetDeConducirResource(CarnetDeConducirRepository carnetDeConducirRepository) {
        this.carnetDeConducirRepository = carnetDeConducirRepository;
    }

    /**
     * {@code POST  /carnet-de-conducirs} : Create a new carnetDeConducir.
     *
     * @param carnetDeConducir the carnetDeConducir to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carnetDeConducir, or with status {@code 400 (Bad Request)} if the carnetDeConducir has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carnet-de-conducirs")
    public ResponseEntity<CarnetDeConducir> createCarnetDeConducir(@RequestBody CarnetDeConducir carnetDeConducir) throws URISyntaxException {
        log.debug("REST request to save CarnetDeConducir : {}", carnetDeConducir);
        if (carnetDeConducir.getId() != null) {
            throw new BadRequestAlertException("A new carnetDeConducir cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarnetDeConducir result = carnetDeConducirRepository.save(carnetDeConducir);
        return ResponseEntity.created(new URI("/api/carnet-de-conducirs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carnet-de-conducirs} : Updates an existing carnetDeConducir.
     *
     * @param carnetDeConducir the carnetDeConducir to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carnetDeConducir,
     * or with status {@code 400 (Bad Request)} if the carnetDeConducir is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carnetDeConducir couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carnet-de-conducirs")
    public ResponseEntity<CarnetDeConducir> updateCarnetDeConducir(@RequestBody CarnetDeConducir carnetDeConducir) throws URISyntaxException {
        log.debug("REST request to update CarnetDeConducir : {}", carnetDeConducir);
        if (carnetDeConducir.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarnetDeConducir result = carnetDeConducirRepository.save(carnetDeConducir);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, carnetDeConducir.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /carnet-de-conducirs} : get all the carnetDeConducirs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carnetDeConducirs in body.
     */
    @GetMapping("/carnet-de-conducirs")
    public List<CarnetDeConducir> getAllCarnetDeConducirs() {
        log.debug("REST request to get all CarnetDeConducirs");
        return carnetDeConducirRepository.findAll();
    }

    /**
     * {@code GET  /carnet-de-conducirs/:id} : get the "id" carnetDeConducir.
     *
     * @param id the id of the carnetDeConducir to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carnetDeConducir, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carnet-de-conducirs/{id}")
    public ResponseEntity<CarnetDeConducir> getCarnetDeConducir(@PathVariable Long id) {
        log.debug("REST request to get CarnetDeConducir : {}", id);
        Optional<CarnetDeConducir> carnetDeConducir = carnetDeConducirRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(carnetDeConducir);
    }

    /**
     * {@code DELETE  /carnet-de-conducirs/:id} : delete the "id" carnetDeConducir.
     *
     * @param id the id of the carnetDeConducir to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carnet-de-conducirs/{id}")
    public ResponseEntity<Void> deleteCarnetDeConducir(@PathVariable Long id) {
        log.debug("REST request to delete CarnetDeConducir : {}", id);
        carnetDeConducirRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
