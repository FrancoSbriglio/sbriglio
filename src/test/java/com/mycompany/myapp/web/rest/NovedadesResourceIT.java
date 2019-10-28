package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.Novedades;
import com.mycompany.myapp.repository.NovedadesRepository;
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
 * Integration tests for the {@link NovedadesResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class NovedadesResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private NovedadesRepository novedadesRepository;

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

    private MockMvc restNovedadesMockMvc;

    private Novedades novedades;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NovedadesResource novedadesResource = new NovedadesResource(novedadesRepository);
        this.restNovedadesMockMvc = MockMvcBuilders.standaloneSetup(novedadesResource)
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
    public static Novedades createEntity(EntityManager em) {
        Novedades novedades = new Novedades()
            .fecha(DEFAULT_FECHA)
            .descripcion(DEFAULT_DESCRIPCION);
        return novedades;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Novedades createUpdatedEntity(EntityManager em) {
        Novedades novedades = new Novedades()
            .fecha(UPDATED_FECHA)
            .descripcion(UPDATED_DESCRIPCION);
        return novedades;
    }

    @BeforeEach
    public void initTest() {
        novedades = createEntity(em);
    }

    @Test
    @Transactional
    public void createNovedades() throws Exception {
        int databaseSizeBeforeCreate = novedadesRepository.findAll().size();

        // Create the Novedades
        restNovedadesMockMvc.perform(post("/api/novedades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(novedades)))
            .andExpect(status().isCreated());

        // Validate the Novedades in the database
        List<Novedades> novedadesList = novedadesRepository.findAll();
        assertThat(novedadesList).hasSize(databaseSizeBeforeCreate + 1);
        Novedades testNovedades = novedadesList.get(novedadesList.size() - 1);
        assertThat(testNovedades.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testNovedades.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createNovedadesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = novedadesRepository.findAll().size();

        // Create the Novedades with an existing ID
        novedades.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNovedadesMockMvc.perform(post("/api/novedades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(novedades)))
            .andExpect(status().isBadRequest());

        // Validate the Novedades in the database
        List<Novedades> novedadesList = novedadesRepository.findAll();
        assertThat(novedadesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNovedades() throws Exception {
        // Initialize the database
        novedadesRepository.saveAndFlush(novedades);

        // Get all the novedadesList
        restNovedadesMockMvc.perform(get("/api/novedades?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(novedades.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(sameInstant(DEFAULT_FECHA))))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getNovedades() throws Exception {
        // Initialize the database
        novedadesRepository.saveAndFlush(novedades);

        // Get the novedades
        restNovedadesMockMvc.perform(get("/api/novedades/{id}", novedades.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(novedades.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(sameInstant(DEFAULT_FECHA)))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNovedades() throws Exception {
        // Get the novedades
        restNovedadesMockMvc.perform(get("/api/novedades/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNovedades() throws Exception {
        // Initialize the database
        novedadesRepository.saveAndFlush(novedades);

        int databaseSizeBeforeUpdate = novedadesRepository.findAll().size();

        // Update the novedades
        Novedades updatedNovedades = novedadesRepository.findById(novedades.getId()).get();
        // Disconnect from session so that the updates on updatedNovedades are not directly saved in db
        em.detach(updatedNovedades);
        updatedNovedades
            .fecha(UPDATED_FECHA)
            .descripcion(UPDATED_DESCRIPCION);

        restNovedadesMockMvc.perform(put("/api/novedades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNovedades)))
            .andExpect(status().isOk());

        // Validate the Novedades in the database
        List<Novedades> novedadesList = novedadesRepository.findAll();
        assertThat(novedadesList).hasSize(databaseSizeBeforeUpdate);
        Novedades testNovedades = novedadesList.get(novedadesList.size() - 1);
        assertThat(testNovedades.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testNovedades.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingNovedades() throws Exception {
        int databaseSizeBeforeUpdate = novedadesRepository.findAll().size();

        // Create the Novedades

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNovedadesMockMvc.perform(put("/api/novedades")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(novedades)))
            .andExpect(status().isBadRequest());

        // Validate the Novedades in the database
        List<Novedades> novedadesList = novedadesRepository.findAll();
        assertThat(novedadesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNovedades() throws Exception {
        // Initialize the database
        novedadesRepository.saveAndFlush(novedades);

        int databaseSizeBeforeDelete = novedadesRepository.findAll().size();

        // Delete the novedades
        restNovedadesMockMvc.perform(delete("/api/novedades/{id}", novedades.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Novedades> novedadesList = novedadesRepository.findAll();
        assertThat(novedadesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Novedades.class);
        Novedades novedades1 = new Novedades();
        novedades1.setId(1L);
        Novedades novedades2 = new Novedades();
        novedades2.setId(novedades1.getId());
        assertThat(novedades1).isEqualTo(novedades2);
        novedades2.setId(2L);
        assertThat(novedades1).isNotEqualTo(novedades2);
        novedades1.setId(null);
        assertThat(novedades1).isNotEqualTo(novedades2);
    }
}
