package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.NormaBarrio;
import com.mycompany.myapp.repository.NormaBarrioRepository;
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
 * Integration tests for the {@link NormaBarrioResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class NormaBarrioResourceIT {

    private static final String DEFAULT_TITULONORMA = "AAAAAAAAAA";
    private static final String UPDATED_TITULONORMA = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCIONNORMA = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCIONNORMA = "BBBBBBBBBB";

    @Autowired
    private NormaBarrioRepository normaBarrioRepository;

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

    private MockMvc restNormaBarrioMockMvc;

    private NormaBarrio normaBarrio;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final NormaBarrioResource normaBarrioResource = new NormaBarrioResource(normaBarrioRepository);
        this.restNormaBarrioMockMvc = MockMvcBuilders.standaloneSetup(normaBarrioResource)
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
    public static NormaBarrio createEntity(EntityManager em) {
        NormaBarrio normaBarrio = new NormaBarrio()
            .titulonorma(DEFAULT_TITULONORMA)
            .descripcionnorma(DEFAULT_DESCRIPCIONNORMA);
        return normaBarrio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NormaBarrio createUpdatedEntity(EntityManager em) {
        NormaBarrio normaBarrio = new NormaBarrio()
            .titulonorma(UPDATED_TITULONORMA)
            .descripcionnorma(UPDATED_DESCRIPCIONNORMA);
        return normaBarrio;
    }

    @BeforeEach
    public void initTest() {
        normaBarrio = createEntity(em);
    }

    @Test
    @Transactional
    public void createNormaBarrio() throws Exception {
        int databaseSizeBeforeCreate = normaBarrioRepository.findAll().size();

        // Create the NormaBarrio
        restNormaBarrioMockMvc.perform(post("/api/norma-barrios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(normaBarrio)))
            .andExpect(status().isCreated());

        // Validate the NormaBarrio in the database
        List<NormaBarrio> normaBarrioList = normaBarrioRepository.findAll();
        assertThat(normaBarrioList).hasSize(databaseSizeBeforeCreate + 1);
        NormaBarrio testNormaBarrio = normaBarrioList.get(normaBarrioList.size() - 1);
        assertThat(testNormaBarrio.getTitulonorma()).isEqualTo(DEFAULT_TITULONORMA);
        assertThat(testNormaBarrio.getDescripcionnorma()).isEqualTo(DEFAULT_DESCRIPCIONNORMA);
    }

    @Test
    @Transactional
    public void createNormaBarrioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = normaBarrioRepository.findAll().size();

        // Create the NormaBarrio with an existing ID
        normaBarrio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNormaBarrioMockMvc.perform(post("/api/norma-barrios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(normaBarrio)))
            .andExpect(status().isBadRequest());

        // Validate the NormaBarrio in the database
        List<NormaBarrio> normaBarrioList = normaBarrioRepository.findAll();
        assertThat(normaBarrioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllNormaBarrios() throws Exception {
        // Initialize the database
        normaBarrioRepository.saveAndFlush(normaBarrio);

        // Get all the normaBarrioList
        restNormaBarrioMockMvc.perform(get("/api/norma-barrios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(normaBarrio.getId().intValue())))
            .andExpect(jsonPath("$.[*].titulonorma").value(hasItem(DEFAULT_TITULONORMA.toString())))
            .andExpect(jsonPath("$.[*].descripcionnorma").value(hasItem(DEFAULT_DESCRIPCIONNORMA.toString())));
    }
    
    @Test
    @Transactional
    public void getNormaBarrio() throws Exception {
        // Initialize the database
        normaBarrioRepository.saveAndFlush(normaBarrio);

        // Get the normaBarrio
        restNormaBarrioMockMvc.perform(get("/api/norma-barrios/{id}", normaBarrio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(normaBarrio.getId().intValue()))
            .andExpect(jsonPath("$.titulonorma").value(DEFAULT_TITULONORMA.toString()))
            .andExpect(jsonPath("$.descripcionnorma").value(DEFAULT_DESCRIPCIONNORMA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingNormaBarrio() throws Exception {
        // Get the normaBarrio
        restNormaBarrioMockMvc.perform(get("/api/norma-barrios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNormaBarrio() throws Exception {
        // Initialize the database
        normaBarrioRepository.saveAndFlush(normaBarrio);

        int databaseSizeBeforeUpdate = normaBarrioRepository.findAll().size();

        // Update the normaBarrio
        NormaBarrio updatedNormaBarrio = normaBarrioRepository.findById(normaBarrio.getId()).get();
        // Disconnect from session so that the updates on updatedNormaBarrio are not directly saved in db
        em.detach(updatedNormaBarrio);
        updatedNormaBarrio
            .titulonorma(UPDATED_TITULONORMA)
            .descripcionnorma(UPDATED_DESCRIPCIONNORMA);

        restNormaBarrioMockMvc.perform(put("/api/norma-barrios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedNormaBarrio)))
            .andExpect(status().isOk());

        // Validate the NormaBarrio in the database
        List<NormaBarrio> normaBarrioList = normaBarrioRepository.findAll();
        assertThat(normaBarrioList).hasSize(databaseSizeBeforeUpdate);
        NormaBarrio testNormaBarrio = normaBarrioList.get(normaBarrioList.size() - 1);
        assertThat(testNormaBarrio.getTitulonorma()).isEqualTo(UPDATED_TITULONORMA);
        assertThat(testNormaBarrio.getDescripcionnorma()).isEqualTo(UPDATED_DESCRIPCIONNORMA);
    }

    @Test
    @Transactional
    public void updateNonExistingNormaBarrio() throws Exception {
        int databaseSizeBeforeUpdate = normaBarrioRepository.findAll().size();

        // Create the NormaBarrio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNormaBarrioMockMvc.perform(put("/api/norma-barrios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(normaBarrio)))
            .andExpect(status().isBadRequest());

        // Validate the NormaBarrio in the database
        List<NormaBarrio> normaBarrioList = normaBarrioRepository.findAll();
        assertThat(normaBarrioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNormaBarrio() throws Exception {
        // Initialize the database
        normaBarrioRepository.saveAndFlush(normaBarrio);

        int databaseSizeBeforeDelete = normaBarrioRepository.findAll().size();

        // Delete the normaBarrio
        restNormaBarrioMockMvc.perform(delete("/api/norma-barrios/{id}", normaBarrio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NormaBarrio> normaBarrioList = normaBarrioRepository.findAll();
        assertThat(normaBarrioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NormaBarrio.class);
        NormaBarrio normaBarrio1 = new NormaBarrio();
        normaBarrio1.setId(1L);
        NormaBarrio normaBarrio2 = new NormaBarrio();
        normaBarrio2.setId(normaBarrio1.getId());
        assertThat(normaBarrio1).isEqualTo(normaBarrio2);
        normaBarrio2.setId(2L);
        assertThat(normaBarrio1).isNotEqualTo(normaBarrio2);
        normaBarrio1.setId(null);
        assertThat(normaBarrio1).isNotEqualTo(normaBarrio2);
    }
}
