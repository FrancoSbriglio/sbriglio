package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PlanillaIngresoEgreso;
import com.mycompany.myapp.repository.PlanillaIngresoEgresoRepository;
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
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.PlanillaIngresoEgreso}.
 */
@RestController
@RequestMapping("/api")
public class PlanillaIngresoEgresoResource {

    private final Logger log = LoggerFactory.getLogger(PlanillaIngresoEgresoResource.class);

    private static final String ENTITY_NAME = "planillaIngresoEgreso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PlanillaIngresoEgresoRepository planillaIngresoEgresoRepository;

    public PlanillaIngresoEgresoResource(PlanillaIngresoEgresoRepository planillaIngresoEgresoRepository) {
        this.planillaIngresoEgresoRepository = planillaIngresoEgresoRepository;
    }

    /**
     * {@code POST  /planilla-ingreso-egresos} : Create a new planillaIngresoEgreso.
     *
     * @param planillaIngresoEgreso the planillaIngresoEgreso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new planillaIngresoEgreso, or with status {@code 400 (Bad Request)} if the planillaIngresoEgreso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/planilla-ingreso-egresos")
    public ResponseEntity<PlanillaIngresoEgreso> createPlanillaIngresoEgreso(@RequestBody PlanillaIngresoEgreso planillaIngresoEgreso) throws URISyntaxException {
        log.debug("REST request to save PlanillaIngresoEgreso : {}", planillaIngresoEgreso);
        if (planillaIngresoEgreso.getId() != null) {
            throw new BadRequestAlertException("A new planillaIngresoEgreso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PlanillaIngresoEgreso result = planillaIngresoEgresoRepository.save(planillaIngresoEgreso);
        return ResponseEntity.created(new URI("/api/planilla-ingreso-egresos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /planilla-ingreso-egresos} : Updates an existing planillaIngresoEgreso.
     *
     * @param planillaIngresoEgreso the planillaIngresoEgreso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated planillaIngresoEgreso,
     * or with status {@code 400 (Bad Request)} if the planillaIngresoEgreso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the planillaIngresoEgreso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/planilla-ingreso-egresos")
    public ResponseEntity<PlanillaIngresoEgreso> updatePlanillaIngresoEgreso(@RequestBody PlanillaIngresoEgreso planillaIngresoEgreso) throws URISyntaxException {
        log.debug("REST request to update PlanillaIngresoEgreso : {}", planillaIngresoEgreso);
        if (planillaIngresoEgreso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PlanillaIngresoEgreso result = planillaIngresoEgresoRepository.save(planillaIngresoEgreso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, planillaIngresoEgreso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /planilla-ingreso-egresos} : get all the planillaIngresoEgresos.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of planillaIngresoEgresos in body.
     */
    @GetMapping("/planilla-ingreso-egresos")
    public List<PlanillaIngresoEgreso> getAllPlanillaIngresoEgresos(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all PlanillaIngresoEgresos");
        return planillaIngresoEgresoRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /planilla-ingreso-egresos/:id} : get the "id" planillaIngresoEgreso.
     *
     * @param id the id of the planillaIngresoEgreso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the planillaIngresoEgreso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/planilla-ingreso-egresos/{id}")
    public ResponseEntity<PlanillaIngresoEgreso> getPlanillaIngresoEgreso(@PathVariable Long id) {
        log.debug("REST request to get PlanillaIngresoEgreso : {}", id);
        Optional<PlanillaIngresoEgreso> planillaIngresoEgreso = planillaIngresoEgresoRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(planillaIngresoEgreso);
    }


    @GetMapping("/planillaegreso")
    public List<PlanillaIngresoEgreso> findAllplanillaegreso(
) {
       // log.debug("REST request to get all PlanillaIES");
        return planillaIngresoEgresoRepository.findAllplanillaegreso();
    }

    @GetMapping("/planillaegreso/dni/{dnipersona}")
    public ResponseEntity<PlanillaIngresoEgreso> getPlanillaIngresoEgreso(@PathVariable Integer dnipersona) {
        log.debug("REST request to get PlanillaIngresoEgreso : {}", dnipersona);
        Optional<PlanillaIngresoEgreso> planillaIngresoEgreso = planillaIngresoEgresoRepository.findAlldniegreso(dnipersona);
        return ResponseUtil.wrapOrNotFound(planillaIngresoEgreso);
    }

    @GetMapping("/entrefechas/")
    public List<PlanillaIngresoEgreso> getPlanillaIngresoEgreso(@RequestParam(name="fechaingreso") String  fechaingreso,@RequestParam(name="fechaegreso")   String  fechaegreso) {
        log.debug("REST request to get PlanillaIngresoEgreso fmefeofkeopfkekfekfo: {}", fechaingreso);
        ZonedDateTime fecha1 = ZonedDateTime.parse(fechaingreso);
        ZonedDateTime fecha2 = ZonedDateTime.parse(fechaegreso);
        List<PlanillaIngresoEgreso> planillaIngresoEgreso = planillaIngresoEgresoRepository.findByAllentrefechas(fecha1,fecha2);
        return planillaIngresoEgreso;
    }

    @GetMapping("/planilladomicilio/")
    public List<PlanillaIngresoEgreso> getPlanillaIngresoEgresodom(@RequestParam(name="casaDomicilio") String  casaDomicilio,@RequestParam(name="manzanaDomicilio")   String  manzanaDomicilio) {
        log.debug("REST request to get PlanillaIngresoEgreso fmefeofkeopfkekfekfo: {}", casaDomicilio);
        List<PlanillaIngresoEgreso> planillaIngresoEgreso = planillaIngresoEgresoRepository.findAllplanilladomicilio(casaDomicilio,manzanaDomicilio);
        return planillaIngresoEgreso;
    }

    /**
     * {@code DELETE  /planilla-ingreso-egresos/:id} : delete the "id" planillaIngresoEgreso.
     *
     * @param id the id of the planillaIngresoEgreso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/planilla-ingreso-egresos/{id}")
    public ResponseEntity<Void> deletePlanillaIngresoEgreso(@PathVariable Long id) {
        log.debug("REST request to delete PlanillaIngresoEgreso : {}", id);
        planillaIngresoEgresoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
