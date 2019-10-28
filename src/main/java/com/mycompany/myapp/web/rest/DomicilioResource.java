package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Domicilio;
import com.mycompany.myapp.repository.DomicilioRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Domicilio}.
 */
@RestController
@RequestMapping("/api")
public class DomicilioResource {

    private final Logger log = LoggerFactory.getLogger(DomicilioResource.class);

    private static final String ENTITY_NAME = "domicilio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DomicilioRepository domicilioRepository;

    public DomicilioResource(DomicilioRepository domicilioRepository) {
        this.domicilioRepository = domicilioRepository;
    }

    /**
     * {@code POST  /domicilios} : Create a new domicilio.
     *
     * @param domicilio the domicilio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new domicilio, or with status {@code 400 (Bad Request)} if the domicilio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/domicilios")
    public ResponseEntity<Domicilio> createDomicilio(@RequestBody Domicilio domicilio) throws URISyntaxException {
        log.debug("REST request to save Domicilio : {}", domicilio);
        if (domicilio.getId() != null) {
            throw new BadRequestAlertException("A new domicilio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Domicilio result = domicilioRepository.save(domicilio);
        return ResponseEntity.created(new URI("/api/domicilios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /domicilios} : Updates an existing domicilio.
     *
     * @param domicilio the domicilio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated domicilio,
     * or with status {@code 400 (Bad Request)} if the domicilio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the domicilio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/domicilios")
    public ResponseEntity<Domicilio> updateDomicilio(@RequestBody Domicilio domicilio) throws URISyntaxException {
        log.debug("REST request to update Domicilio : {}", domicilio);
        if (domicilio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Domicilio result = domicilioRepository.save(domicilio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, domicilio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /domicilios} : get all the domicilios.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of domicilios in body.
     */
    @GetMapping("/domicilios")
    public List<Domicilio> getAllDomicilios(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Domicilios");
        return domicilioRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /domicilios/:id} : get the "id" domicilio.
     *
     * @param id the id of the domicilio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the domicilio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/domicilios/{id}")
    public ResponseEntity<Domicilio> getDomicilio(@PathVariable Long id) {
        log.debug("REST request to get Domicilio : {}", id);
        Optional<Domicilio> domicilio = domicilioRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(domicilio);
    }

    @GetMapping("/dompersona/{id}")
    public ResponseEntity<Domicilio> getDomicilioidpersona(@PathVariable Long id) {
        log.debug("REST request to get Domicilio : {}", id);
        Optional<Domicilio> domicilio = domicilioRepository.findAllpersonadomicilioid(id);
        return ResponseUtil.wrapOrNotFound(domicilio);
    }

     @GetMapping("/domicilios/domiciliospersona/")
    public ResponseEntity<Domicilio> getDomicilio(@RequestParam(name="casaDomicilio") String  casaDomicilio,@RequestParam(name="manzanaDomicilio")   String  manzanaDomicilio) {
        log.debug("REST request to get Domicilio : {}", casaDomicilio);
        Optional<Domicilio> domicilio = domicilioRepository.findAllcasadomicilio(casaDomicilio,manzanaDomicilio);
        return ResponseUtil.wrapOrNotFound(domicilio);
      }


      @GetMapping("/domicilios/pers/{apellido}")
    public List<Domicilio> getDomiciliopers(@PathVariable String apellido) {
        log.debug("REST request to get Domicilio : {}", apellido);
        List<Domicilio> domicilio = domicilioRepository.findAlldomperson(apellido);
        // Set<Persona> per = domicilioRepository.findAlldompersona(apellido);
        // for(Domicilio dom : domicilio){
        //     dom.setDomiciliopersonas(per);
        // }
        return domicilio;
    } 

    /**
     * {@code DELETE  /domicilios/:id} : delete the "id" domicilio.
     *
     * @param id the id of the domicilio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/domicilios/{id}")
    public ResponseEntity<Void> deleteDomicilio(@PathVariable Long id) {
        log.debug("REST request to delete Domicilio : {}", id);
        domicilioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
