package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.QR;
import com.mycompany.myapp.repository.QRRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.QR}.
 */
@RestController
@RequestMapping("/api")
public class QRResource {

    private final Logger log = LoggerFactory.getLogger(QRResource.class);

    private static final String ENTITY_NAME = "qR";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QRRepository qRRepository;

    public QRResource(QRRepository qRRepository) {
        this.qRRepository = qRRepository;
    }

    /**
     * {@code POST  /qrs} : Create a new qR.
     *
     * @param qR the qR to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new qR, or with status {@code 400 (Bad Request)} if the qR has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/qrs")
    public ResponseEntity<QR> createQR(@RequestBody QR qR) throws URISyntaxException {
        log.debug("REST request to save QR : {}", qR);
        if (qR.getId() != null) {
            throw new BadRequestAlertException("A new qR cannot already have an ID", ENTITY_NAME, "idexists");
        }
        QR result = qRRepository.save(qR);
        return ResponseEntity.created(new URI("/api/qrs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /qrs} : Updates an existing qR.
     *
     * @param qR the qR to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated qR,
     * or with status {@code 400 (Bad Request)} if the qR is not valid,
     * or with status {@code 500 (Internal Server Error)} if the qR couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/qrs")
    public ResponseEntity<QR> updateQR(@RequestBody QR qR) throws URISyntaxException {
        log.debug("REST request to update QR : {}", qR);
        if (qR.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        QR result = qRRepository.save(qR);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, qR.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /qrs} : get all the qRS.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of qRS in body.
     */
    @GetMapping("/qrs")
    public List<QR> getAllQRS() {
        log.debug("REST request to get all QRS");
        return qRRepository.findAll();
    }

    /**
     * {@code GET  /qrs/:id} : get the "id" qR.
     *
     * @param id the id of the qR to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the qR, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/qrs/{id}")
    public ResponseEntity<QR> getQR(@PathVariable Long id) {
        log.debug("REST request to get QR : {}", id);
        Optional<QR> qR = qRRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(qR);
    }

    @GetMapping("/qrs/personaqr/{codigoqr}")
    public List<QR> getQR(@PathVariable String codigoqr) {
        log.debug("REST request to get QR : {}", codigoqr);
        List<QR> qR = qRRepository.findAllqrpersona(codigoqr);
        return qR;
    }

    /**
     * {@code DELETE  /qrs/:id} : delete the "id" qR.
     *
     * @param id the id of the qR to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/qrs/{id}")
    public ResponseEntity<Void> deleteQR(@PathVariable Long id) {
        log.debug("REST request to delete QR : {}", id);
        qRRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
