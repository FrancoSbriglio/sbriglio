package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.ListaAmigos;
import com.mycompany.myapp.repository.ListaAmigosRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.ListaAmigos}.
 */
@RestController
@RequestMapping("/api")
public class ListaAmigosResource {

    private final Logger log = LoggerFactory.getLogger(ListaAmigosResource.class);

    private static final String ENTITY_NAME = "listaAmigos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ListaAmigosRepository listaAmigosRepository;

    public ListaAmigosResource(ListaAmigosRepository listaAmigosRepository) {
        this.listaAmigosRepository = listaAmigosRepository;
    }

    /**
     * {@code POST  /lista-amigos} : Create a new listaAmigos.
     *
     * @param listaAmigos the listaAmigos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new listaAmigos, or with status {@code 400 (Bad Request)} if the listaAmigos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/lista-amigos")
    public ResponseEntity<ListaAmigos> createListaAmigos(@RequestBody ListaAmigos listaAmigos) throws URISyntaxException {
        log.debug("REST request to save ListaAmigos : {}", listaAmigos);
        if (listaAmigos.getId() != null) {
            throw new BadRequestAlertException("A new listaAmigos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ListaAmigos result = listaAmigosRepository.save(listaAmigos);
        return ResponseEntity.created(new URI("/api/lista-amigos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /lista-amigos} : Updates an existing listaAmigos.
     *
     * @param listaAmigos the listaAmigos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated listaAmigos,
     * or with status {@code 400 (Bad Request)} if the listaAmigos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the listaAmigos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/lista-amigos")
    public ResponseEntity<ListaAmigos> updateListaAmigos(@RequestBody ListaAmigos listaAmigos) throws URISyntaxException {
        log.debug("REST request to update ListaAmigos : {}", listaAmigos);
        if (listaAmigos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ListaAmigos result = listaAmigosRepository.save(listaAmigos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, listaAmigos.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /lista-amigos} : get all the listaAmigos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of listaAmigos in body.
     */
    @GetMapping("/lista-amigos")
    public List<ListaAmigos> getAllListaAmigos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all ListaAmigos");
        return listaAmigosRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /lista-amigos/:id} : get the "id" listaAmigos.
     *
     * @param id the id of the listaAmigos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the listaAmigos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/lista-amigos/{id}")
    public ResponseEntity<ListaAmigos> getListaAmigos(@PathVariable Long id) {
        log.debug("REST request to get ListaAmigos : {}", id);
        Optional<ListaAmigos> listaAmigos = listaAmigosRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(listaAmigos);
    }

    @GetMapping("/lista-amigos/dnilista/{dniPersona}")
    public ResponseEntity<ListaAmigos> getListaAmigosdni(@PathVariable Integer dniPersona) {
        log.debug("REST request to get ListaAmigos : {}", dniPersona);
        Optional<ListaAmigos> listaAmigos = listaAmigosRepository.findAlllistadni(dniPersona);
        return ResponseUtil.wrapOrNotFound(listaAmigos);
    }

    /**
     * {@code DELETE  /lista-amigos/:id} : delete the "id" listaAmigos.
     *
     * @param id the id of the listaAmigos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/lista-amigos/{id}")
    public ResponseEntity<Void> deleteListaAmigos(@PathVariable Long id) {
        log.debug("REST request to delete ListaAmigos : {}", id);
        listaAmigosRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
