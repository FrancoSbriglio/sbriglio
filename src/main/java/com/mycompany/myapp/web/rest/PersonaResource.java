package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Authority;
import com.mycompany.myapp.domain.Domicilio;
import com.mycompany.myapp.domain.Persona;
import com.mycompany.myapp.domain.Vehiculo;
import com.mycompany.myapp.repository.PersonaRepository;
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
import java.util.Set;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Persona}.
 */
@RestController
@RequestMapping("/api")
public class PersonaResource {

    private final Logger log = LoggerFactory.getLogger(PersonaResource.class);

    private static final String ENTITY_NAME = "persona";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PersonaRepository personaRepository;

    public PersonaResource(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    /**
     * {@code POST  /personas} : Create a new persona.
     *
     * @param persona the persona to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new persona, or with status {@code 400 (Bad Request)} if the persona has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/personas")
    public ResponseEntity<Persona> createPersona(@RequestBody Persona persona) throws URISyntaxException {
        log.debug("REST request to save Persona : {}", persona);
        if (persona.getId() != null) {
            throw new BadRequestAlertException("A new persona cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Persona result = personaRepository.save(persona);
        return ResponseEntity.created(new URI("/api/personas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /personas} : Updates an existing persona.
     *
     * @param persona the persona to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated persona,
     * or with status {@code 400 (Bad Request)} if the persona is not valid,
     * or with status {@code 500 (Internal Server Error)} if the persona couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/personas")
    public ResponseEntity<Persona> updatePersona(@RequestBody Persona persona) throws URISyntaxException {
        log.debug("REST request to update Persona : {}", persona);
        if (persona.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Persona result = personaRepository.save(persona);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, persona.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /personas} : get all the personas.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of personas in body.
     */
    @GetMapping("/personas")
    public List<Persona> getAllPersonas(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Personas");
        return personaRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /personas/:id} : get the "id" persona.
     *
     * @param id the id of the persona to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the persona, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/personas/{id}")
    public ResponseEntity<Persona> getPersona(@PathVariable Long id) {
        log.debug("REST request to get Persona : {}", id);
        Optional<Persona> persona = personaRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(persona);
    }

    @GetMapping("/personas/dni/{dnipersona}")
    public ResponseEntity<Persona> getPersona(@PathVariable Integer dnipersona) {
        log.debug("REST request to get Persona : {}", dnipersona);
        Optional<Persona> persona = personaRepository.findAlldnipersona(dnipersona);
        return ResponseUtil.wrapOrNotFound(persona);
    }

    
    @GetMapping("/persona/personarol/")
    public List<Persona> getUserrol(@RequestParam(required = false, defaultValue = "false") String role) { //ya se que va param igual funciona lo probe para ver si no me tiraba error
        log.debug("REST request to get Persona : {}",role);
        List<Persona> persona = personaRepository.findAlluserrol(role);
        return persona;
    }

    @GetMapping("/persona/userperson/")
    public Persona getUserpersona(@RequestParam(required = false, defaultValue = "false") Long id) { //ya se que va param igual funciona lo probe para ver si no me tiraba error
        log.debug("REST request to get Persona : {}",id);
        Persona persona = personaRepository.findAlluserperson(id);
        Set<Vehiculo> vehiculo = personaRepository.findAlluserperson1(id);
        persona.setVehiculos(vehiculo);
        return persona;
    }



    @GetMapping("/personasdom/domicilio/{id}")
    public List<Persona> getPersonadom(@PathVariable Long id) {
        log.debug("REST request to get Persona : {}", id);
        
        Set<Domicilio> domicilios = personaRepository.findAlldomicilio(id);
        // iterator.next se usa para obtener el primer elemento de la lsita domicilios
        Long id_casa = domicilios.iterator().next().getId();
        List<Persona> persona = personaRepository.findAlldomicilio1(id_casa);  
         return persona;
     } 

     @GetMapping("/persona/useremail/{email}")
     public Persona getUserperson(@PathVariable String email) { 
         log.debug("REST request to get Persona : {}",email);
         Persona persona = personaRepository.findAlluseremail(email);
         Set<Authority> auth = personaRepository.findAlluseremail1(email);
        //  for (Persona p : persona) {
             persona.getPersonaUser().setAuthorities(auth);
          //} 
         
         return persona;
     }

    /**
     * {@code DELETE  /personas/:id} : delete the "id" persona.
     *
     * @param id the id of the persona to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/personas/{id}")
    public ResponseEntity<Void> deletePersona(@PathVariable Long id) {
        log.debug("REST request to delete Persona : {}", id);
        personaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
