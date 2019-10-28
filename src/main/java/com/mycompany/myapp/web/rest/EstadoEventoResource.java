package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.EstadoEvento;
import com.mycompany.myapp.repository.EstadoEventoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.EstadoEvento}.
 */
@RestController
@RequestMapping("/api")
public class EstadoEventoResource {

    private final Logger log = LoggerFactory.getLogger(EstadoEventoResource.class);

    private static final String ENTITY_NAME = "estadoEvento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EstadoEventoRepository estadoEventoRepository;

    public EstadoEventoResource(EstadoEventoRepository estadoEventoRepository) {
        this.estadoEventoRepository = estadoEventoRepository;
    }

    /**
     * {@code POST  /estado-eventos} : Create a new estadoEvento.
     *
     * @param estadoEvento the estadoEvento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estadoEvento, or with status {@code 400 (Bad Request)} if the estadoEvento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estado-eventos")
    public ResponseEntity<EstadoEvento> createEstadoEvento(@RequestBody EstadoEvento estadoEvento) throws URISyntaxException {
        log.debug("REST request to save EstadoEvento : {}", estadoEvento);
        if (estadoEvento.getId() != null) {
            throw new BadRequestAlertException("A new estadoEvento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EstadoEvento result = estadoEventoRepository.save(estadoEvento);
        return ResponseEntity.created(new URI("/api/estado-eventos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /estado-eventos} : Updates an existing estadoEvento.
     *
     * @param estadoEvento the estadoEvento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estadoEvento,
     * or with status {@code 400 (Bad Request)} if the estadoEvento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estadoEvento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estado-eventos")
    public ResponseEntity<EstadoEvento> updateEstadoEvento(@RequestBody EstadoEvento estadoEvento) throws URISyntaxException {
        log.debug("REST request to update EstadoEvento : {}", estadoEvento);
        if (estadoEvento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstadoEvento result = estadoEventoRepository.save(estadoEvento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, estadoEvento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /estado-eventos} : get all the estadoEventos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estadoEventos in body.
     */
    @GetMapping("/estado-eventos")
    public List<EstadoEvento> getAllEstadoEventos() {
        log.debug("REST request to get all EstadoEventos");
        return estadoEventoRepository.findAll();
    }

    /**
     * {@code GET  /estado-eventos/:id} : get the "id" estadoEvento.
     *
     * @param id the id of the estadoEvento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estadoEvento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estado-eventos/{id}")
    public ResponseEntity<EstadoEvento> getEstadoEvento(@PathVariable Long id) {
        log.debug("REST request to get EstadoEvento : {}", id);
        Optional<EstadoEvento> estadoEvento = estadoEventoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(estadoEvento);
    }

    /**
     * {@code DELETE  /estado-eventos/:id} : delete the "id" estadoEvento.
     *
     * @param id the id of the estadoEvento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estado-eventos/{id}")
    public ResponseEntity<Void> deleteEstadoEvento(@PathVariable Long id) {
        log.debug("REST request to delete EstadoEvento : {}", id);
        estadoEventoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
