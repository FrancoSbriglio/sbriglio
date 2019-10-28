package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.Barrio;
import com.mycompany.myapp.repository.BarrioRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link BarrioResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class BarrioResourceIT {

    private static final String DEFAULT_NOMBRE_BARRIO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_BARRIO = "BBBBBBBBBB";

    private static final Integer DEFAULT_CUIT_BARRIO = 1;
    private static final Integer UPDATED_CUIT_BARRIO = 2;
    private static final Integer SMALLER_CUIT_BARRIO = 1 - 1;

    @Autowired
    private BarrioRepository barrioRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restBarrioMockMvc;

    private Barrio barrio;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final BarrioResource barrioResource = new BarrioResource(barrioRepository);
        this.restBarrioMockMvc = MockMvcBuilders.standaloneSetup(barrioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Barrio createEntity(EntityManager em) {
        Barrio barrio = new Barrio()
            .nombreBarrio(DEFAULT_NOMBRE_BARRIO)
            .cuitBarrio(DEFAULT_CUIT_BARRIO);
        return barrio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Barrio createUpdatedEntity(EntityManager em) {
        Barrio barrio = new Barrio()
            .nombreBarrio(UPDATED_NOMBRE_BARRIO)
            .cuitBarrio(UPDATED_CUIT_BARRIO);
        return barrio;
    }

    @BeforeEach
    public void initTest() {
        barrio = createEntity(em);
    }

    @Test
    @Transactional
    public void createBarrio() throws Exception {
        int databaseSizeBeforeCreate = barrioRepository.findAll().size();

        // Create the Barrio
        restBarrioMockMvc.perform(post("/api/barrios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrio)))
            .andExpect(status().isCreated());

        // Validate the Barrio in the database
        List<Barrio> barrioList = barrioRepository.findAll();
        assertThat(barrioList).hasSize(databaseSizeBeforeCreate + 1);
        Barrio testBarrio = barrioList.get(barrioList.size() - 1);
        assertThat(testBarrio.getNombreBarrio()).isEqualTo(DEFAULT_NOMBRE_BARRIO);
        assertThat(testBarrio.getCuitBarrio()).isEqualTo(DEFAULT_CUIT_BARRIO);
    }

    @Test
    @Transactional
    public void createBarrioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = barrioRepository.findAll().size();

        // Create the Barrio with an existing ID
        barrio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restBarrioMockMvc.perform(post("/api/barrios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrio)))
            .andExpect(status().isBadRequest());

        // Validate the Barrio in the database
        List<Barrio> barrioList = barrioRepository.findAll();
        assertThat(barrioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllBarrios() throws Exception {
        // Initialize the database
        barrioRepository.saveAndFlush(barrio);

        // Get all the barrioList
        restBarrioMockMvc.perform(get("/api/barrios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(barrio.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreBarrio").value(hasItem(DEFAULT_NOMBRE_BARRIO.toString())))
            .andExpect(jsonPath("$.[*].cuitBarrio").value(hasItem(DEFAULT_CUIT_BARRIO)));
    }
    
    @Test
    @Transactional
    public void getBarrio() throws Exception {
        // Initialize the database
        barrioRepository.saveAndFlush(barrio);

        // Get the barrio
        restBarrioMockMvc.perform(get("/api/barrios/{id}", barrio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(barrio.getId().intValue()))
            .andExpect(jsonPath("$.nombreBarrio").value(DEFAULT_NOMBRE_BARRIO.toString()))
            .andExpect(jsonPath("$.cuitBarrio").value(DEFAULT_CUIT_BARRIO));
    }

    @Test
    @Transactional
    public void getNonExistingBarrio() throws Exception {
        // Get the barrio
        restBarrioMockMvc.perform(get("/api/barrios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBarrio() throws Exception {
        // Initialize the database
        barrioRepository.saveAndFlush(barrio);

        int databaseSizeBeforeUpdate = barrioRepository.findAll().size();

        // Update the barrio
        Barrio updatedBarrio = barrioRepository.findById(barrio.getId()).get();
        // Disconnect from session so that the updates on updatedBarrio are not directly saved in db
        em.detach(updatedBarrio);
        updatedBarrio
            .nombreBarrio(UPDATED_NOMBRE_BARRIO)
            .cuitBarrio(UPDATED_CUIT_BARRIO);

        restBarrioMockMvc.perform(put("/api/barrios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedBarrio)))
            .andExpect(status().isOk());

        // Validate the Barrio in the database
        List<Barrio> barrioList = barrioRepository.findAll();
        assertThat(barrioList).hasSize(databaseSizeBeforeUpdate);
        Barrio testBarrio = barrioList.get(barrioList.size() - 1);
        assertThat(testBarrio.getNombreBarrio()).isEqualTo(UPDATED_NOMBRE_BARRIO);
        assertThat(testBarrio.getCuitBarrio()).isEqualTo(UPDATED_CUIT_BARRIO);
    }

    @Test
    @Transactional
    public void updateNonExistingBarrio() throws Exception {
        int databaseSizeBeforeUpdate = barrioRepository.findAll().size();

        // Create the Barrio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restBarrioMockMvc.perform(put("/api/barrios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(barrio)))
            .andExpect(status().isBadRequest());

        // Validate the Barrio in the database
        List<Barrio> barrioList = barrioRepository.findAll();
        assertThat(barrioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteBarrio() throws Exception {
        // Initialize the database
        barrioRepository.saveAndFlush(barrio);

        int databaseSizeBeforeDelete = barrioRepository.findAll().size();

        // Delete the barrio
        restBarrioMockMvc.perform(delete("/api/barrios/{id}", barrio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Barrio> barrioList = barrioRepository.findAll();
        assertThat(barrioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Barrio.class);
        Barrio barrio1 = new Barrio();
        barrio1.setId(1L);
        Barrio barrio2 = new Barrio();
        barrio2.setId(barrio1.getId());
        assertThat(barrio1).isEqualTo(barrio2);
        barrio2.setId(2L);
        assertThat(barrio1).isNotEqualTo(barrio2);
        barrio1.setId(null);
        assertThat(barrio1).isNotEqualTo(barrio2);
    }
}
