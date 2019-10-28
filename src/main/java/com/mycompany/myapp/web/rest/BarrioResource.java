package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Barrio;
import com.mycompany.myapp.repository.BarrioRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Barrio}.
 */
@RestController
@RequestMapping("/api")
public class BarrioResource {

    private final Logger log = LoggerFactory.getLogger(BarrioResource.class);

    private static final String ENTITY_NAME = "barrio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final BarrioRepository barrioRepository;

    public BarrioResource(BarrioRepository barrioRepository) {
        this.barrioRepository = barrioRepository;
    }

    /**
     * {@code POST  /barrios} : Create a new barrio.
     *
     * @param barrio the barrio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new barrio, or with status {@code 400 (Bad Request)} if the barrio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/barrios")
    public ResponseEntity<Barrio> createBarrio(@RequestBody Barrio barrio) throws URISyntaxException {
        log.debug("REST request to save Barrio : {}", barrio);
        if (barrio.getId() != null) {
            throw new BadRequestAlertException("A new barrio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Barrio result = barrioRepository.save(barrio);
        return ResponseEntity.created(new URI("/api/barrios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /barrios} : Updates an existing barrio.
     *
     * @param barrio the barrio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated barrio,
     * or with status {@code 400 (Bad Request)} if the barrio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the barrio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/barrios")
    public ResponseEntity<Barrio> updateBarrio(@RequestBody Barrio barrio) throws URISyntaxException {
        log.debug("REST request to update Barrio : {}", barrio);
        if (barrio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Barrio result = barrioRepository.save(barrio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, barrio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /barrios} : get all the barrios.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of barrios in body.
     */
    @GetMapping("/barrios")
    public List<Barrio> getAllBarrios() {
        log.debug("REST request to get all Barrios");
        return barrioRepository.findAll();
    }

    /**
     * {@code GET  /barrios/:id} : get the "id" barrio.
     *
     * @param id the id of the barrio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the barrio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/barrios/{id}")
    public ResponseEntity<Barrio> getBarrio(@PathVariable Long id) {
        log.debug("REST request to get Barrio : {}", id);
        Optional<Barrio> barrio = barrioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(barrio);
    }

    /**
     * {@code DELETE  /barrios/:id} : delete the "id" barrio.
     *
     * @param id the id of the barrio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/barrios/{id}")
    public ResponseEntity<Void> deleteBarrio(@PathVariable Long id) {
        log.debug("REST request to delete Barrio : {}", id);
        barrioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
