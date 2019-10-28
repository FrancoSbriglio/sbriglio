package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Seguro;
import com.mycompany.myapp.repository.SeguroRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Seguro}.
 */
@RestController
@RequestMapping("/api")
public class SeguroResource {

    private final Logger log = LoggerFactory.getLogger(SeguroResource.class);

    private static final String ENTITY_NAME = "seguro";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SeguroRepository seguroRepository;

    public SeguroResource(SeguroRepository seguroRepository) {
        this.seguroRepository = seguroRepository;
    }

    /**
     * {@code POST  /seguros} : Create a new seguro.
     *
     * @param seguro the seguro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new seguro, or with status {@code 400 (Bad Request)} if the seguro has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/seguros")
    public ResponseEntity<Seguro> createSeguro(@RequestBody Seguro seguro) throws URISyntaxException {
        log.debug("REST request to save Seguro : {}", seguro);
        if (seguro.getId() != null) {
            throw new BadRequestAlertException("A new seguro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Seguro result = seguroRepository.save(seguro);
        return ResponseEntity.created(new URI("/api/seguros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /seguros} : Updates an existing seguro.
     *
     * @param seguro the seguro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated seguro,
     * or with status {@code 400 (Bad Request)} if the seguro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the seguro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/seguros")
    public ResponseEntity<Seguro> updateSeguro(@RequestBody Seguro seguro) throws URISyntaxException {
        log.debug("REST request to update Seguro : {}", seguro);
        if (seguro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Seguro result = seguroRepository.save(seguro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, seguro.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /seguros} : get all the seguros.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of seguros in body.
     */
    @GetMapping("/seguros")
    public List<Seguro> getAllSeguros() {
        log.debug("REST request to get all Seguros");
        return seguroRepository.findAll();
    }

    /**
     * {@code GET  /seguros/:id} : get the "id" seguro.
     *
     * @param id the id of the seguro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the seguro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/seguros/{id}")
    public ResponseEntity<Seguro> getSeguro(@PathVariable Long id) {
        log.debug("REST request to get Seguro : {}", id);
        Optional<Seguro> seguro = seguroRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(seguro);
    }

    /**
     * {@code DELETE  /seguros/:id} : delete the "id" seguro.
     *
     * @param id the id of the seguro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/seguros/{id}")
    public ResponseEntity<Void> deleteSeguro(@PathVariable Long id) {
        log.debug("REST request to delete Seguro : {}", id);
        seguroRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
