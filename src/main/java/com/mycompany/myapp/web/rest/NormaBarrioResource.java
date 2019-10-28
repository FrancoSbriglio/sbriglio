package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.NormaBarrio;
import com.mycompany.myapp.repository.NormaBarrioRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.NormaBarrio}.
 */
@RestController
@RequestMapping("/api")
public class NormaBarrioResource {

    private final Logger log = LoggerFactory.getLogger(NormaBarrioResource.class);

    private static final String ENTITY_NAME = "normaBarrio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NormaBarrioRepository normaBarrioRepository;

    public NormaBarrioResource(NormaBarrioRepository normaBarrioRepository) {
        this.normaBarrioRepository = normaBarrioRepository;
    }

    /**
     * {@code POST  /norma-barrios} : Create a new normaBarrio.
     *
     * @param normaBarrio the normaBarrio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new normaBarrio, or with status {@code 400 (Bad Request)} if the normaBarrio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/norma-barrios")
    public ResponseEntity<NormaBarrio> createNormaBarrio(@RequestBody NormaBarrio normaBarrio) throws URISyntaxException {
        log.debug("REST request to save NormaBarrio : {}", normaBarrio);
        if (normaBarrio.getId() != null) {
            throw new BadRequestAlertException("A new normaBarrio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NormaBarrio result = normaBarrioRepository.save(normaBarrio);
        return ResponseEntity.created(new URI("/api/norma-barrios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /norma-barrios} : Updates an existing normaBarrio.
     *
     * @param normaBarrio the normaBarrio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated normaBarrio,
     * or with status {@code 400 (Bad Request)} if the normaBarrio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the normaBarrio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/norma-barrios")
    public ResponseEntity<NormaBarrio> updateNormaBarrio(@RequestBody NormaBarrio normaBarrio) throws URISyntaxException {
        log.debug("REST request to update NormaBarrio : {}", normaBarrio);
        if (normaBarrio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NormaBarrio result = normaBarrioRepository.save(normaBarrio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, normaBarrio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /norma-barrios} : get all the normaBarrios.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of normaBarrios in body.
     */
    @GetMapping("/norma-barrios")
    public List<NormaBarrio> getAllNormaBarrios() {
        log.debug("REST request to get all NormaBarrios");
        return normaBarrioRepository.findAll();
    }

    /**
     * {@code GET  /norma-barrios/:id} : get the "id" normaBarrio.
     *
     * @param id the id of the normaBarrio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the normaBarrio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/norma-barrios/{id}")
    public ResponseEntity<NormaBarrio> getNormaBarrio(@PathVariable Long id) {
        log.debug("REST request to get NormaBarrio : {}", id);
        Optional<NormaBarrio> normaBarrio = normaBarrioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(normaBarrio);
    }

    /**
     * {@code DELETE  /norma-barrios/:id} : delete the "id" normaBarrio.
     *
     * @param id the id of the normaBarrio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/norma-barrios/{id}")
    public ResponseEntity<Void> deleteNormaBarrio(@PathVariable Long id) {
        log.debug("REST request to delete NormaBarrio : {}", id);
        normaBarrioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
