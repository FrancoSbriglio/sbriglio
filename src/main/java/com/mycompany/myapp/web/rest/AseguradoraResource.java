package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Aseguradora;
import com.mycompany.myapp.repository.AseguradoraRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Aseguradora}.
 */
@RestController
@RequestMapping("/api")
public class AseguradoraResource {

    private final Logger log = LoggerFactory.getLogger(AseguradoraResource.class);

    private static final String ENTITY_NAME = "aseguradora";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AseguradoraRepository aseguradoraRepository;

    public AseguradoraResource(AseguradoraRepository aseguradoraRepository) {
        this.aseguradoraRepository = aseguradoraRepository;
    }

    /**
     * {@code POST  /aseguradoras} : Create a new aseguradora.
     *
     * @param aseguradora the aseguradora to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aseguradora, or with status {@code 400 (Bad Request)} if the aseguradora has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/aseguradoras")
    public ResponseEntity<Aseguradora> createAseguradora(@RequestBody Aseguradora aseguradora) throws URISyntaxException {
        log.debug("REST request to save Aseguradora : {}", aseguradora);
        if (aseguradora.getId() != null) {
            throw new BadRequestAlertException("A new aseguradora cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Aseguradora result = aseguradoraRepository.save(aseguradora);
        return ResponseEntity.created(new URI("/api/aseguradoras/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /aseguradoras} : Updates an existing aseguradora.
     *
     * @param aseguradora the aseguradora to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aseguradora,
     * or with status {@code 400 (Bad Request)} if the aseguradora is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aseguradora couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/aseguradoras")
    public ResponseEntity<Aseguradora> updateAseguradora(@RequestBody Aseguradora aseguradora) throws URISyntaxException {
        log.debug("REST request to update Aseguradora : {}", aseguradora);
        if (aseguradora.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Aseguradora result = aseguradoraRepository.save(aseguradora);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, aseguradora.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /aseguradoras} : get all the aseguradoras.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aseguradoras in body.
     */
    @GetMapping("/aseguradoras")
    public List<Aseguradora> getAllAseguradoras() {
        log.debug("REST request to get all Aseguradoras");
        return aseguradoraRepository.findAll();
    }

    /**
     * {@code GET  /aseguradoras/:id} : get the "id" aseguradora.
     *
     * @param id the id of the aseguradora to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aseguradora, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/aseguradoras/{id}")
    public ResponseEntity<Aseguradora> getAseguradora(@PathVariable Long id) {
        log.debug("REST request to get Aseguradora : {}", id);
        Optional<Aseguradora> aseguradora = aseguradoraRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(aseguradora);
    }

    /**
     * {@code DELETE  /aseguradoras/:id} : delete the "id" aseguradora.
     *
     * @param id the id of the aseguradora to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/aseguradoras/{id}")
    public ResponseEntity<Void> deleteAseguradora(@PathVariable Long id) {
        log.debug("REST request to delete Aseguradora : {}", id);
        aseguradoraRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
