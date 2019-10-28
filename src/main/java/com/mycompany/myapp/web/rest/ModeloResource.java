package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Modelo;
import com.mycompany.myapp.repository.ModeloRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Modelo}.
 */
@RestController
@RequestMapping("/api")
public class ModeloResource {

    private final Logger log = LoggerFactory.getLogger(ModeloResource.class);

    private static final String ENTITY_NAME = "modelo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ModeloRepository modeloRepository;

    public ModeloResource(ModeloRepository modeloRepository) {
        this.modeloRepository = modeloRepository;
    }

    /**
     * {@code POST  /modelos} : Create a new modelo.
     *
     * @param modelo the modelo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new modelo, or with status {@code 400 (Bad Request)} if the modelo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/modelos")
    public ResponseEntity<Modelo> createModelo(@RequestBody Modelo modelo) throws URISyntaxException {
        log.debug("REST request to save Modelo : {}", modelo);
        if (modelo.getId() != null) {
            throw new BadRequestAlertException("A new modelo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Modelo result = modeloRepository.save(modelo);
        return ResponseEntity.created(new URI("/api/modelos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /modelos} : Updates an existing modelo.
     *
     * @param modelo the modelo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modelo,
     * or with status {@code 400 (Bad Request)} if the modelo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the modelo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/modelos")
    public ResponseEntity<Modelo> updateModelo(@RequestBody Modelo modelo) throws URISyntaxException {
        log.debug("REST request to update Modelo : {}", modelo);
        if (modelo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Modelo result = modeloRepository.save(modelo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, modelo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /modelos} : get all the modelos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of modelos in body.
     */
    @GetMapping("/modelos")
    public List<Modelo> getAllModelos() {
        log.debug("REST request to get all Modelos");
        return modeloRepository.findAll();
    }

    /**
     * {@code GET  /modelos/:id} : get the "id" modelo.
     *
     * @param id the id of the modelo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the modelo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/modelos/{id}")
    public ResponseEntity<Modelo> getModelo(@PathVariable Long id) {
        log.debug("REST request to get Modelo : {}", id);
        Optional<Modelo> modelo = modeloRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(modelo);
    }

    /**
     * {@code DELETE  /modelos/:id} : delete the "id" modelo.
     *
     * @param id the id of the modelo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/modelos/{id}")
    public ResponseEntity<Void> deleteModelo(@PathVariable Long id) {
        log.debug("REST request to delete Modelo : {}", id);
        modeloRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
