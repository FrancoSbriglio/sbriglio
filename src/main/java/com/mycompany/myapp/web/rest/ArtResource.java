package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Art;
import com.mycompany.myapp.repository.ArtRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Art}.
 */
@RestController
@RequestMapping("/api")
public class ArtResource {

    private final Logger log = LoggerFactory.getLogger(ArtResource.class);

    private static final String ENTITY_NAME = "art";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ArtRepository artRepository;

    public ArtResource(ArtRepository artRepository) {
        this.artRepository = artRepository;
    }

    /**
     * {@code POST  /arts} : Create a new art.
     *
     * @param art the art to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new art, or with status {@code 400 (Bad Request)} if the art has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/arts")
    public ResponseEntity<Art> createArt(@RequestBody Art art) throws URISyntaxException {
        log.debug("REST request to save Art : {}", art);
        if (art.getId() != null) {
            throw new BadRequestAlertException("A new art cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Art result = artRepository.save(art);
        return ResponseEntity.created(new URI("/api/arts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /arts} : Updates an existing art.
     *
     * @param art the art to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated art,
     * or with status {@code 400 (Bad Request)} if the art is not valid,
     * or with status {@code 500 (Internal Server Error)} if the art couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/arts")
    public ResponseEntity<Art> updateArt(@RequestBody Art art) throws URISyntaxException {
        log.debug("REST request to update Art : {}", art);
        if (art.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Art result = artRepository.save(art);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, art.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /arts} : get all the arts.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of arts in body.
     */
    @GetMapping("/arts")
    public List<Art> getAllArts() {
        log.debug("REST request to get all Arts");
        return artRepository.findAll();
    }

    /**
     * {@code GET  /arts/:id} : get the "id" art.
     *
     * @param id the id of the art to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the art, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/arts/{id}")
    public ResponseEntity<Art> getArt(@PathVariable Long id) {
        log.debug("REST request to get Art : {}", id);
        Optional<Art> art = artRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(art);
    }

    /**
     * {@code DELETE  /arts/:id} : delete the "id" art.
     *
     * @param id the id of the art to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/arts/{id}")
    public ResponseEntity<Void> deleteArt(@PathVariable Long id) {
        log.debug("REST request to delete Art : {}", id);
        artRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
