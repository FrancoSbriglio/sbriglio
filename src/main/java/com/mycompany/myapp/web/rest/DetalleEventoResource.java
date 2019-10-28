package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DetalleEvento;
import com.mycompany.myapp.repository.DetalleEventoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.DetalleEvento}.
 */
@RestController
@RequestMapping("/api")
public class DetalleEventoResource {

    private final Logger log = LoggerFactory.getLogger(DetalleEventoResource.class);

    private static final String ENTITY_NAME = "detalleEvento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DetalleEventoRepository detalleEventoRepository;

    public DetalleEventoResource(DetalleEventoRepository detalleEventoRepository) {
        this.detalleEventoRepository = detalleEventoRepository;
    }

    /**
     * {@code POST  /detalle-eventos} : Create a new detalleEvento.
     *
     * @param detalleEvento the detalleEvento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new detalleEvento, or with status {@code 400 (Bad Request)} if the detalleEvento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/detalle-eventos")
    public ResponseEntity<DetalleEvento> createDetalleEvento(@RequestBody DetalleEvento detalleEvento) throws URISyntaxException {
        log.debug("REST request to save DetalleEvento : {}", detalleEvento);
        if (detalleEvento.getId() != null) {
            throw new BadRequestAlertException("A new detalleEvento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DetalleEvento result = detalleEventoRepository.save(detalleEvento);
        return ResponseEntity.created(new URI("/api/detalle-eventos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /detalle-eventos} : Updates an existing detalleEvento.
     *
     * @param detalleEvento the detalleEvento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated detalleEvento,
     * or with status {@code 400 (Bad Request)} if the detalleEvento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the detalleEvento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/detalle-eventos")
    public ResponseEntity<DetalleEvento> updateDetalleEvento(@RequestBody DetalleEvento detalleEvento) throws URISyntaxException {
        log.debug("REST request to update DetalleEvento : {}", detalleEvento);
        if (detalleEvento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DetalleEvento result = detalleEventoRepository.save(detalleEvento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, detalleEvento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /detalle-eventos} : get all the detalleEventos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of detalleEventos in body.
     */
    @GetMapping("/detalle-eventos")
    public List<DetalleEvento> getAllDetalleEventos() {
        log.debug("REST request to get all DetalleEventos");
        return detalleEventoRepository.findAll();
    }

    /**
     * {@code GET  /detalle-eventos/:id} : get the "id" detalleEvento.
     *
     * @param id the id of the detalleEvento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the detalleEvento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/detalle-eventos/{id}")
    public ResponseEntity<DetalleEvento> getDetalleEvento(@PathVariable Long id) {
        log.debug("REST request to get DetalleEvento : {}", id);
        Optional<DetalleEvento> detalleEvento = detalleEventoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(detalleEvento);
    }

    /**
     * {@code DELETE  /detalle-eventos/:id} : delete the "id" detalleEvento.
     *
     * @param id the id of the detalleEvento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/detalle-eventos/{id}")
    public ResponseEntity<Void> deleteDetalleEvento(@PathVariable Long id) {
        log.debug("REST request to delete DetalleEvento : {}", id);
        detalleEventoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
