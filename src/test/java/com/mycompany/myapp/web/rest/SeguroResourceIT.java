package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.Seguro;
import com.mycompany.myapp.repository.SeguroRepository;
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
 * Integration tests for the {@link SeguroResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class SeguroResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA_VENCIMIENTO_SEGURO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_VENCIMIENTO_SEGURO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA_VENCIMIENTO_SEGURO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private SeguroRepository seguroRepository;

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

    private MockMvc restSeguroMockMvc;

    private Seguro seguro;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SeguroResource seguroResource = new SeguroResource(seguroRepository);
        this.restSeguroMockMvc = MockMvcBuilders.standaloneSetup(seguroResource)
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
    public static Seguro createEntity(EntityManager em) {
        Seguro seguro = new Seguro()
            .fechaVencimientoSeguro(DEFAULT_FECHA_VENCIMIENTO_SEGURO);
        return seguro;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Seguro createUpdatedEntity(EntityManager em) {
        Seguro seguro = new Seguro()
            .fechaVencimientoSeguro(UPDATED_FECHA_VENCIMIENTO_SEGURO);
        return seguro;
    }

    @BeforeEach
    public void initTest() {
        seguro = createEntity(em);
    }

    @Test
    @Transactional
    public void createSeguro() throws Exception {
        int databaseSizeBeforeCreate = seguroRepository.findAll().size();

        // Create the Seguro
        restSeguroMockMvc.perform(post("/api/seguros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seguro)))
            .andExpect(status().isCreated());

        // Validate the Seguro in the database
        List<Seguro> seguroList = seguroRepository.findAll();
        assertThat(seguroList).hasSize(databaseSizeBeforeCreate + 1);
        Seguro testSeguro = seguroList.get(seguroList.size() - 1);
        assertThat(testSeguro.getFechaVencimientoSeguro()).isEqualTo(DEFAULT_FECHA_VENCIMIENTO_SEGURO);
    }

    @Test
    @Transactional
    public void createSeguroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = seguroRepository.findAll().size();

        // Create the Seguro with an existing ID
        seguro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSeguroMockMvc.perform(post("/api/seguros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seguro)))
            .andExpect(status().isBadRequest());

        // Validate the Seguro in the database
        List<Seguro> seguroList = seguroRepository.findAll();
        assertThat(seguroList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSeguros() throws Exception {
        // Initialize the database
        seguroRepository.saveAndFlush(seguro);

        // Get all the seguroList
        restSeguroMockMvc.perform(get("/api/seguros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(seguro.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaVencimientoSeguro").value(hasItem(sameInstant(DEFAULT_FECHA_VENCIMIENTO_SEGURO))));
    }
    
    @Test
    @Transactional
    public void getSeguro() throws Exception {
        // Initialize the database
        seguroRepository.saveAndFlush(seguro);

        // Get the seguro
        restSeguroMockMvc.perform(get("/api/seguros/{id}", seguro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(seguro.getId().intValue()))
            .andExpect(jsonPath("$.fechaVencimientoSeguro").value(sameInstant(DEFAULT_FECHA_VENCIMIENTO_SEGURO)));
    }

    @Test
    @Transactional
    public void getNonExistingSeguro() throws Exception {
        // Get the seguro
        restSeguroMockMvc.perform(get("/api/seguros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSeguro() throws Exception {
        // Initialize the database
        seguroRepository.saveAndFlush(seguro);

        int databaseSizeBeforeUpdate = seguroRepository.findAll().size();

        // Update the seguro
        Seguro updatedSeguro = seguroRepository.findById(seguro.getId()).get();
        // Disconnect from session so that the updates on updatedSeguro are not directly saved in db
        em.detach(updatedSeguro);
        updatedSeguro
            .fechaVencimientoSeguro(UPDATED_FECHA_VENCIMIENTO_SEGURO);

        restSeguroMockMvc.perform(put("/api/seguros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSeguro)))
            .andExpect(status().isOk());

        // Validate the Seguro in the database
        List<Seguro> seguroList = seguroRepository.findAll();
        assertThat(seguroList).hasSize(databaseSizeBeforeUpdate);
        Seguro testSeguro = seguroList.get(seguroList.size() - 1);
        assertThat(testSeguro.getFechaVencimientoSeguro()).isEqualTo(UPDATED_FECHA_VENCIMIENTO_SEGURO);
    }

    @Test
    @Transactional
    public void updateNonExistingSeguro() throws Exception {
        int databaseSizeBeforeUpdate = seguroRepository.findAll().size();

        // Create the Seguro

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSeguroMockMvc.perform(put("/api/seguros")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(seguro)))
            .andExpect(status().isBadRequest());

        // Validate the Seguro in the database
        List<Seguro> seguroList = seguroRepository.findAll();
        assertThat(seguroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSeguro() throws Exception {
        // Initialize the database
        seguroRepository.saveAndFlush(seguro);

        int databaseSizeBeforeDelete = seguroRepository.findAll().size();

        // Delete the seguro
        restSeguroMockMvc.perform(delete("/api/seguros/{id}", seguro.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Seguro> seguroList = seguroRepository.findAll();
        assertThat(seguroList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Seguro.class);
        Seguro seguro1 = new Seguro();
        seguro1.setId(1L);
        Seguro seguro2 = new Seguro();
        seguro2.setId(seguro1.getId());
        assertThat(seguro1).isEqualTo(seguro2);
        seguro2.setId(2L);
        assertThat(seguro1).isNotEqualTo(seguro2);
        seguro1.setId(null);
        assertThat(seguro1).isNotEqualTo(seguro2);
    }
}
