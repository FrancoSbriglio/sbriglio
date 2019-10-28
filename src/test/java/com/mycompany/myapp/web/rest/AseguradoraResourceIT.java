package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.Aseguradora;
import com.mycompany.myapp.repository.AseguradoraRepository;
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
 * Integration tests for the {@link AseguradoraResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class AseguradoraResourceIT {

    private static final String DEFAULT_NOMBRE_SEGURO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_SEGURO = "BBBBBBBBBB";

    @Autowired
    private AseguradoraRepository aseguradoraRepository;

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

    private MockMvc restAseguradoraMockMvc;

    private Aseguradora aseguradora;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AseguradoraResource aseguradoraResource = new AseguradoraResource(aseguradoraRepository);
        this.restAseguradoraMockMvc = MockMvcBuilders.standaloneSetup(aseguradoraResource)
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
    public static Aseguradora createEntity(EntityManager em) {
        Aseguradora aseguradora = new Aseguradora()
            .nombreSeguro(DEFAULT_NOMBRE_SEGURO);
        return aseguradora;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Aseguradora createUpdatedEntity(EntityManager em) {
        Aseguradora aseguradora = new Aseguradora()
            .nombreSeguro(UPDATED_NOMBRE_SEGURO);
        return aseguradora;
    }

    @BeforeEach
    public void initTest() {
        aseguradora = createEntity(em);
    }

    @Test
    @Transactional
    public void createAseguradora() throws Exception {
        int databaseSizeBeforeCreate = aseguradoraRepository.findAll().size();

        // Create the Aseguradora
        restAseguradoraMockMvc.perform(post("/api/aseguradoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aseguradora)))
            .andExpect(status().isCreated());

        // Validate the Aseguradora in the database
        List<Aseguradora> aseguradoraList = aseguradoraRepository.findAll();
        assertThat(aseguradoraList).hasSize(databaseSizeBeforeCreate + 1);
        Aseguradora testAseguradora = aseguradoraList.get(aseguradoraList.size() - 1);
        assertThat(testAseguradora.getNombreSeguro()).isEqualTo(DEFAULT_NOMBRE_SEGURO);
    }

    @Test
    @Transactional
    public void createAseguradoraWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = aseguradoraRepository.findAll().size();

        // Create the Aseguradora with an existing ID
        aseguradora.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAseguradoraMockMvc.perform(post("/api/aseguradoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aseguradora)))
            .andExpect(status().isBadRequest());

        // Validate the Aseguradora in the database
        List<Aseguradora> aseguradoraList = aseguradoraRepository.findAll();
        assertThat(aseguradoraList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAseguradoras() throws Exception {
        // Initialize the database
        aseguradoraRepository.saveAndFlush(aseguradora);

        // Get all the aseguradoraList
        restAseguradoraMockMvc.perform(get("/api/aseguradoras?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(aseguradora.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreSeguro").value(hasItem(DEFAULT_NOMBRE_SEGURO.toString())));
    }
    
    @Test
    @Transactional
    public void getAseguradora() throws Exception {
        // Initialize the database
        aseguradoraRepository.saveAndFlush(aseguradora);

        // Get the aseguradora
        restAseguradoraMockMvc.perform(get("/api/aseguradoras/{id}", aseguradora.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(aseguradora.getId().intValue()))
            .andExpect(jsonPath("$.nombreSeguro").value(DEFAULT_NOMBRE_SEGURO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAseguradora() throws Exception {
        // Get the aseguradora
        restAseguradoraMockMvc.perform(get("/api/aseguradoras/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAseguradora() throws Exception {
        // Initialize the database
        aseguradoraRepository.saveAndFlush(aseguradora);

        int databaseSizeBeforeUpdate = aseguradoraRepository.findAll().size();

        // Update the aseguradora
        Aseguradora updatedAseguradora = aseguradoraRepository.findById(aseguradora.getId()).get();
        // Disconnect from session so that the updates on updatedAseguradora are not directly saved in db
        em.detach(updatedAseguradora);
        updatedAseguradora
            .nombreSeguro(UPDATED_NOMBRE_SEGURO);

        restAseguradoraMockMvc.perform(put("/api/aseguradoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAseguradora)))
            .andExpect(status().isOk());

        // Validate the Aseguradora in the database
        List<Aseguradora> aseguradoraList = aseguradoraRepository.findAll();
        assertThat(aseguradoraList).hasSize(databaseSizeBeforeUpdate);
        Aseguradora testAseguradora = aseguradoraList.get(aseguradoraList.size() - 1);
        assertThat(testAseguradora.getNombreSeguro()).isEqualTo(UPDATED_NOMBRE_SEGURO);
    }

    @Test
    @Transactional
    public void updateNonExistingAseguradora() throws Exception {
        int databaseSizeBeforeUpdate = aseguradoraRepository.findAll().size();

        // Create the Aseguradora

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAseguradoraMockMvc.perform(put("/api/aseguradoras")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(aseguradora)))
            .andExpect(status().isBadRequest());

        // Validate the Aseguradora in the database
        List<Aseguradora> aseguradoraList = aseguradoraRepository.findAll();
        assertThat(aseguradoraList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAseguradora() throws Exception {
        // Initialize the database
        aseguradoraRepository.saveAndFlush(aseguradora);

        int databaseSizeBeforeDelete = aseguradoraRepository.findAll().size();

        // Delete the aseguradora
        restAseguradoraMockMvc.perform(delete("/api/aseguradoras/{id}", aseguradora.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Aseguradora> aseguradoraList = aseguradoraRepository.findAll();
        assertThat(aseguradoraList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Aseguradora.class);
        Aseguradora aseguradora1 = new Aseguradora();
        aseguradora1.setId(1L);
        Aseguradora aseguradora2 = new Aseguradora();
        aseguradora2.setId(aseguradora1.getId());
        assertThat(aseguradora1).isEqualTo(aseguradora2);
        aseguradora2.setId(2L);
        assertThat(aseguradora1).isNotEqualTo(aseguradora2);
        aseguradora1.setId(null);
        assertThat(aseguradora1).isNotEqualTo(aseguradora2);
    }
}
