package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.EspacioComun;
import com.mycompany.myapp.repository.EspacioComunRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.EspacioComun}.
 */
@RestController
@RequestMapping("/api")
public class EspacioComunResource {

    private final Logger log = LoggerFactory.getLogger(EspacioComunResource.class);

    private static final String ENTITY_NAME = "espacioComun";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EspacioComunRepository espacioComunRepository;

    public EspacioComunResource(EspacioComunRepository espacioComunRepository) {
        this.espacioComunRepository = espacioComunRepository;
    }

    /**
     * {@code POST  /espacio-comuns} : Create a new espacioComun.
     *
     * @param espacioComun the espacioComun to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new espacioComun, or with status {@code 400 (Bad Request)} if the espacioComun has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/espacio-comuns")
    public ResponseEntity<EspacioComun> createEspacioComun(@RequestBody EspacioComun espacioComun) throws URISyntaxException {
        log.debug("REST request to save EspacioComun : {}", espacioComun);
        if (espacioComun.getId() != null) {
            throw new BadRequestAlertException("A new espacioComun cannot already have an ID", ENTITY_NAME, "idexists");
        }
        EspacioComun result = espacioComunRepository.save(espacioComun);
        return ResponseEntity.created(new URI("/api/espacio-comuns/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /espacio-comuns} : Updates an existing espacioComun.
     *
     * @param espacioComun the espacioComun to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated espacioComun,
     * or with status {@code 400 (Bad Request)} if the espacioComun is not valid,
     * or with status {@code 500 (Internal Server Error)} if the espacioComun couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/espacio-comuns")
    public ResponseEntity<EspacioComun> updateEspacioComun(@RequestBody EspacioComun espacioComun) throws URISyntaxException {
        log.debug("REST request to update EspacioComun : {}", espacioComun);
        if (espacioComun.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EspacioComun result = espacioComunRepository.save(espacioComun);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, espacioComun.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /espacio-comuns} : get all the espacioComuns.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of espacioComuns in body.
     */
    @GetMapping("/espacio-comuns")
    public List<EspacioComun> getAllEspacioComuns(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all EspacioComuns");
        return espacioComunRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /espacio-comuns/:id} : get the "id" espacioComun.
     *
     * @param id the id of the espacioComun to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the espacioComun, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/espacio-comuns/{id}")
    public ResponseEntity<EspacioComun> getEspacioComun(@PathVariable Long id) {
        log.debug("REST request to get EspacioComun : {}", id);
        Optional<EspacioComun> espacioComun = espacioComunRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(espacioComun);
    }

    /**
     * {@code DELETE  /espacio-comuns/:id} : delete the "id" espacioComun.
     *
     * @param id the id of the espacioComun to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/espacio-comuns/{id}")
    public ResponseEntity<Void> deleteEspacioComun(@PathVariable Long id) {
        log.debug("REST request to delete EspacioComun : {}", id);
        espacioComunRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
