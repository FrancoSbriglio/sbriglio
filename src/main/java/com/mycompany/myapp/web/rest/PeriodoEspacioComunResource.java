package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PeriodoEspacioComun;
import com.mycompany.myapp.repository.PeriodoEspacioComunRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PeriodoEspacioComun}.
 */
@RestController
@RequestMapping("/api")
public class PeriodoEspacioComunResource {

    private final Logger log = LoggerFactory.getLogger(PeriodoEspacioComunResource.class);

    private static final String ENTITY_NAME = "periodoEspacioComun";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PeriodoEspacioComunRepository periodoEspacioComunRepository;

    public PeriodoEspacioComunResource(PeriodoEspacioComunRepository periodoEspacioComunRepository) {
        this.periodoEspacioComunRepository = periodoEspacioComunRepository;
    }

    /**
     * {@code POST  /periodo-espacio-comuns} : Create a new periodoEspacioComun.
     *
     * @param periodoEspacioComun the periodoEspacioComun to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new periodoEspacioComun, or with status {@code 400 (Bad Request)} if the periodoEspacioComun has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/periodo-espacio-comuns")
    public ResponseEntity<PeriodoEspacioComun> createPeriodoEspacioComun(@RequestBody PeriodoEspacioComun periodoEspacioComun) throws URISyntaxException {
        log.debug("REST request to save PeriodoEspacioComun : {}", periodoEspacioComun);
        if (periodoEspacioComun.getId() != null) {
            throw new BadRequestAlertException("A new periodoEspacioComun cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PeriodoEspacioComun result = periodoEspacioComunRepository.save(periodoEspacioComun);
        return ResponseEntity.created(new URI("/api/periodo-espacio-comuns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /periodo-espacio-comuns} : Updates an existing periodoEspacioComun.
     *
     * @param periodoEspacioComun the periodoEspacioComun to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated periodoEspacioComun,
     * or with status {@code 400 (Bad Request)} if the periodoEspacioComun is not valid,
     * or with status {@code 500 (Internal Server Error)} if the periodoEspacioComun couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/periodo-espacio-comuns")
    public ResponseEntity<PeriodoEspacioComun> updatePeriodoEspacioComun(@RequestBody PeriodoEspacioComun periodoEspacioComun) throws URISyntaxException {
        log.debug("REST request to update PeriodoEspacioComun : {}", periodoEspacioComun);
        if (periodoEspacioComun.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PeriodoEspacioComun result = periodoEspacioComunRepository.save(periodoEspacioComun);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, periodoEspacioComun.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /periodo-espacio-comuns} : get all the periodoEspacioComuns.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of periodoEspacioComuns in body.
     */
    @GetMapping("/periodo-espacio-comuns")
    public List<PeriodoEspacioComun> getAllPeriodoEspacioComuns() {
        log.debug("REST request to get all PeriodoEspacioComuns");
        return periodoEspacioComunRepository.findAll();
    }

    /**
     * {@code GET  /periodo-espacio-comuns/:id} : get the "id" periodoEspacioComun.
     *
     * @param id the id of the periodoEspacioComun to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the periodoEspacioComun, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/periodo-espacio-comuns/{id}")
    public ResponseEntity<PeriodoEspacioComun> getPeriodoEspacioComun(@PathVariable Long id) {
        log.debug("REST request to get PeriodoEspacioComun : {}", id);
        Optional<PeriodoEspacioComun> periodoEspacioComun = periodoEspacioComunRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(periodoEspacioComun);
    }

    /**
     * {@code DELETE  /periodo-espacio-comuns/:id} : delete the "id" periodoEspacioComun.
     *
     * @param id the id of the periodoEspacioComun to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/periodo-espacio-comuns/{id}")
    public ResponseEntity<Void> deletePeriodoEspacioComun(@PathVariable Long id) {
        log.debug("REST request to delete PeriodoEspacioComun : {}", id);
        periodoEspacioComunRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
