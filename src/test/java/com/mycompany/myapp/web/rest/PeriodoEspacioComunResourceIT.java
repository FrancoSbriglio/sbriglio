package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.PeriodoEspacioComun;
import com.mycompany.myapp.repository.PeriodoEspacioComunRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PeriodoEspacioComunResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class PeriodoEspacioComunResourceIT {

    private static final ZonedDateTime DEFAULT_PERIODO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_PERIODO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_PERIODO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private PeriodoEspacioComunRepository periodoEspacioComunRepository;

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

    private MockMvc restPeriodoEspacioComunMockMvc;

    private PeriodoEspacioComun periodoEspacioComun;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PeriodoEspacioComunResource periodoEspacioComunResource = new PeriodoEspacioComunResource(periodoEspacioComunRepository);
        this.restPeriodoEspacioComunMockMvc = MockMvcBuilders.standaloneSetup(periodoEspacioComunResource)
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
    public static PeriodoEspacioComun createEntity(EntityManager em) {
        PeriodoEspacioComun periodoEspacioComun = new PeriodoEspacioComun()
            .periodo(DEFAULT_PERIODO);
        return periodoEspacioComun;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PeriodoEspacioComun createUpdatedEntity(EntityManager em) {
        PeriodoEspacioComun periodoEspacioComun = new PeriodoEspacioComun()
            .periodo(UPDATED_PERIODO);
        return periodoEspacioComun;
    }

    @BeforeEach
    public void initTest() {
        periodoEspacioComun = createEntity(em);
    }

    @Test
    @Transactional
    public void createPeriodoEspacioComun() throws Exception {
        int databaseSizeBeforeCreate = periodoEspacioComunRepository.findAll().size();

        // Create the PeriodoEspacioComun
        restPeriodoEspacioComunMockMvc.perform(post("/api/periodo-espacio-comuns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoEspacioComun)))
            .andExpect(status().isCreated());

        // Validate the PeriodoEspacioComun in the database
        List<PeriodoEspacioComun> periodoEspacioComunList = periodoEspacioComunRepository.findAll();
        assertThat(periodoEspacioComunList).hasSize(databaseSizeBeforeCreate + 1);
        PeriodoEspacioComun testPeriodoEspacioComun = periodoEspacioComunList.get(periodoEspacioComunList.size() - 1);
        assertThat(testPeriodoEspacioComun.getPeriodo()).isEqualTo(DEFAULT_PERIODO);
    }

    @Test
    @Transactional
    public void createPeriodoEspacioComunWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = periodoEspacioComunRepository.findAll().size();

        // Create the PeriodoEspacioComun with an existing ID
        periodoEspacioComun.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPeriodoEspacioComunMockMvc.perform(post("/api/periodo-espacio-comuns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoEspacioComun)))
            .andExpect(status().isBadRequest());

        // Validate the PeriodoEspacioComun in the database
        List<PeriodoEspacioComun> periodoEspacioComunList = periodoEspacioComunRepository.findAll();
        assertThat(periodoEspacioComunList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPeriodoEspacioComuns() throws Exception {
        // Initialize the database
        periodoEspacioComunRepository.saveAndFlush(periodoEspacioComun);

        // Get all the periodoEspacioComunList
        restPeriodoEspacioComunMockMvc.perform(get("/api/periodo-espacio-comuns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(periodoEspacioComun.getId().intValue())))
            .andExpect(jsonPath("$.[*].periodo").value(hasItem(sameInstant(DEFAULT_PERIODO))));
    }
    
    @Test
    @Transactional
    public void getPeriodoEspacioComun() throws Exception {
        // Initialize the database
        periodoEspacioComunRepository.saveAndFlush(periodoEspacioComun);

        // Get the periodoEspacioComun
        restPeriodoEspacioComunMockMvc.perform(get("/api/periodo-espacio-comuns/{id}", periodoEspacioComun.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(periodoEspacioComun.getId().intValue()))
            .andExpect(jsonPath("$.periodo").value(sameInstant(DEFAULT_PERIODO)));
    }

    @Test
    @Transactional
    public void getNonExistingPeriodoEspacioComun() throws Exception {
        // Get the periodoEspacioComun
        restPeriodoEspacioComunMockMvc.perform(get("/api/periodo-espacio-comuns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePeriodoEspacioComun() throws Exception {
        // Initialize the database
        periodoEspacioComunRepository.saveAndFlush(periodoEspacioComun);

        int databaseSizeBeforeUpdate = periodoEspacioComunRepository.findAll().size();

        // Update the periodoEspacioComun
        PeriodoEspacioComun updatedPeriodoEspacioComun = periodoEspacioComunRepository.findById(periodoEspacioComun.getId()).get();
        // Disconnect from session so that the updates on updatedPeriodoEspacioComun are not directly saved in db
        em.detach(updatedPeriodoEspacioComun);
        updatedPeriodoEspacioComun
            .periodo(UPDATED_PERIODO);

        restPeriodoEspacioComunMockMvc.perform(put("/api/periodo-espacio-comuns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPeriodoEspacioComun)))
            .andExpect(status().isOk());

        // Validate the PeriodoEspacioComun in the database
        List<PeriodoEspacioComun> periodoEspacioComunList = periodoEspacioComunRepository.findAll();
        assertThat(periodoEspacioComunList).hasSize(databaseSizeBeforeUpdate);
        PeriodoEspacioComun testPeriodoEspacioComun = periodoEspacioComunList.get(periodoEspacioComunList.size() - 1);
        assertThat(testPeriodoEspacioComun.getPeriodo()).isEqualTo(UPDATED_PERIODO);
    }

    @Test
    @Transactional
    public void updateNonExistingPeriodoEspacioComun() throws Exception {
        int databaseSizeBeforeUpdate = periodoEspacioComunRepository.findAll().size();

        // Create the PeriodoEspacioComun

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPeriodoEspacioComunMockMvc.perform(put("/api/periodo-espacio-comuns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(periodoEspacioComun)))
            .andExpect(status().isBadRequest());

        // Validate the PeriodoEspacioComun in the database
        List<PeriodoEspacioComun> periodoEspacioComunList = periodoEspacioComunRepository.findAll();
        assertThat(periodoEspacioComunList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePeriodoEspacioComun() throws Exception {
        // Initialize the database
        periodoEspacioComunRepository.saveAndFlush(periodoEspacioComun);

        int databaseSizeBeforeDelete = periodoEspacioComunRepository.findAll().size();

        // Delete the periodoEspacioComun
        restPeriodoEspacioComunMockMvc.perform(delete("/api/periodo-espacio-comuns/{id}", periodoEspacioComun.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PeriodoEspacioComun> periodoEspacioComunList = periodoEspacioComunRepository.findAll();
        assertThat(periodoEspacioComunList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PeriodoEspacioComun.class);
        PeriodoEspacioComun periodoEspacioComun1 = new PeriodoEspacioComun();
        periodoEspacioComun1.setId(1L);
        PeriodoEspacioComun periodoEspacioComun2 = new PeriodoEspacioComun();
        periodoEspacioComun2.setId(periodoEspacioComun1.getId());
        assertThat(periodoEspacioComun1).isEqualTo(periodoEspacioComun2);
        periodoEspacioComun2.setId(2L);
        assertThat(periodoEspacioComun1).isNotEqualTo(periodoEspacioComun2);
        periodoEspacioComun1.setId(null);
        assertThat(periodoEspacioComun1).isNotEqualTo(periodoEspacioComun2);
    }
}
