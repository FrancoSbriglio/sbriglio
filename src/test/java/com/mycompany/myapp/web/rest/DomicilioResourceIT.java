package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.Domicilio;
import com.mycompany.myapp.repository.DomicilioRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DomicilioResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class DomicilioResourceIT {

    private static final String DEFAULT_CASA_DOMICILIO = "AAAAAAAAAA";
    private static final String UPDATED_CASA_DOMICILIO = "BBBBBBBBBB";

    private static final Integer DEFAULT_DEPTO_DOMICILIO = 1;
    private static final Integer UPDATED_DEPTO_DOMICILIO = 2;
    private static final Integer SMALLER_DEPTO_DOMICILIO = 1 - 1;

    private static final String DEFAULT_MANZANA_DOMICILIO = "AAAAAAAAAA";
    private static final String UPDATED_MANZANA_DOMICILIO = "BBBBBBBBBB";

    private static final Integer DEFAULT_PISO_DOMICILIO = 1;
    private static final Integer UPDATED_PISO_DOMICILIO = 2;
    private static final Integer SMALLER_PISO_DOMICILIO = 1 - 1;

    @Autowired
    private DomicilioRepository domicilioRepository;

    @Mock
    private DomicilioRepository domicilioRepositoryMock;

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

    private MockMvc restDomicilioMockMvc;

    private Domicilio domicilio;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DomicilioResource domicilioResource = new DomicilioResource(domicilioRepository);
        this.restDomicilioMockMvc = MockMvcBuilders.standaloneSetup(domicilioResource)
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
    public static Domicilio createEntity(EntityManager em) {
        Domicilio domicilio = new Domicilio()
            .casaDomicilio(DEFAULT_CASA_DOMICILIO)
            .deptoDomicilio(DEFAULT_DEPTO_DOMICILIO)
            .manzanaDomicilio(DEFAULT_MANZANA_DOMICILIO)
            .pisoDomicilio(DEFAULT_PISO_DOMICILIO);
        return domicilio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Domicilio createUpdatedEntity(EntityManager em) {
        Domicilio domicilio = new Domicilio()
            .casaDomicilio(UPDATED_CASA_DOMICILIO)
            .deptoDomicilio(UPDATED_DEPTO_DOMICILIO)
            .manzanaDomicilio(UPDATED_MANZANA_DOMICILIO)
            .pisoDomicilio(UPDATED_PISO_DOMICILIO);
        return domicilio;
    }

    @BeforeEach
    public void initTest() {
        domicilio = createEntity(em);
    }

    @Test
    @Transactional
    public void createDomicilio() throws Exception {
        int databaseSizeBeforeCreate = domicilioRepository.findAll().size();

        // Create the Domicilio
        restDomicilioMockMvc.perform(post("/api/domicilios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(domicilio)))
            .andExpect(status().isCreated());

        // Validate the Domicilio in the database
        List<Domicilio> domicilioList = domicilioRepository.findAll();
        assertThat(domicilioList).hasSize(databaseSizeBeforeCreate + 1);
        Domicilio testDomicilio = domicilioList.get(domicilioList.size() - 1);
        assertThat(testDomicilio.getCasaDomicilio()).isEqualTo(DEFAULT_CASA_DOMICILIO);
        assertThat(testDomicilio.getDeptoDomicilio()).isEqualTo(DEFAULT_DEPTO_DOMICILIO);
        assertThat(testDomicilio.getManzanaDomicilio()).isEqualTo(DEFAULT_MANZANA_DOMICILIO);
        assertThat(testDomicilio.getPisoDomicilio()).isEqualTo(DEFAULT_PISO_DOMICILIO);
    }

    @Test
    @Transactional
    public void createDomicilioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = domicilioRepository.findAll().size();

        // Create the Domicilio with an existing ID
        domicilio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDomicilioMockMvc.perform(post("/api/domicilios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(domicilio)))
            .andExpect(status().isBadRequest());

        // Validate the Domicilio in the database
        List<Domicilio> domicilioList = domicilioRepository.findAll();
        assertThat(domicilioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDomicilios() throws Exception {
        // Initialize the database
        domicilioRepository.saveAndFlush(domicilio);

        // Get all the domicilioList
        restDomicilioMockMvc.perform(get("/api/domicilios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(domicilio.getId().intValue())))
            .andExpect(jsonPath("$.[*].casaDomicilio").value(hasItem(DEFAULT_CASA_DOMICILIO.toString())))
            .andExpect(jsonPath("$.[*].deptoDomicilio").value(hasItem(DEFAULT_DEPTO_DOMICILIO)))
            .andExpect(jsonPath("$.[*].manzanaDomicilio").value(hasItem(DEFAULT_MANZANA_DOMICILIO.toString())))
            .andExpect(jsonPath("$.[*].pisoDomicilio").value(hasItem(DEFAULT_PISO_DOMICILIO)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllDomiciliosWithEagerRelationshipsIsEnabled() throws Exception {
        DomicilioResource domicilioResource = new DomicilioResource(domicilioRepositoryMock);
        when(domicilioRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restDomicilioMockMvc = MockMvcBuilders.standaloneSetup(domicilioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restDomicilioMockMvc.perform(get("/api/domicilios?eagerload=true"))
        .andExpect(status().isOk());

        verify(domicilioRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllDomiciliosWithEagerRelationshipsIsNotEnabled() throws Exception {
        DomicilioResource domicilioResource = new DomicilioResource(domicilioRepositoryMock);
            when(domicilioRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restDomicilioMockMvc = MockMvcBuilders.standaloneSetup(domicilioResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restDomicilioMockMvc.perform(get("/api/domicilios?eagerload=true"))
        .andExpect(status().isOk());

            verify(domicilioRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getDomicilio() throws Exception {
        // Initialize the database
        domicilioRepository.saveAndFlush(domicilio);

        // Get the domicilio
        restDomicilioMockMvc.perform(get("/api/domicilios/{id}", domicilio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(domicilio.getId().intValue()))
            .andExpect(jsonPath("$.casaDomicilio").value(DEFAULT_CASA_DOMICILIO.toString()))
            .andExpect(jsonPath("$.deptoDomicilio").value(DEFAULT_DEPTO_DOMICILIO))
            .andExpect(jsonPath("$.manzanaDomicilio").value(DEFAULT_MANZANA_DOMICILIO.toString()))
            .andExpect(jsonPath("$.pisoDomicilio").value(DEFAULT_PISO_DOMICILIO));
    }

    @Test
    @Transactional
    public void getNonExistingDomicilio() throws Exception {
        // Get the domicilio
        restDomicilioMockMvc.perform(get("/api/domicilios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDomicilio() throws Exception {
        // Initialize the database
        domicilioRepository.saveAndFlush(domicilio);

        int databaseSizeBeforeUpdate = domicilioRepository.findAll().size();

        // Update the domicilio
        Domicilio updatedDomicilio = domicilioRepository.findById(domicilio.getId()).get();
        // Disconnect from session so that the updates on updatedDomicilio are not directly saved in db
        em.detach(updatedDomicilio);
        updatedDomicilio
            .casaDomicilio(UPDATED_CASA_DOMICILIO)
            .deptoDomicilio(UPDATED_DEPTO_DOMICILIO)
            .manzanaDomicilio(UPDATED_MANZANA_DOMICILIO)
            .pisoDomicilio(UPDATED_PISO_DOMICILIO);

        restDomicilioMockMvc.perform(put("/api/domicilios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDomicilio)))
            .andExpect(status().isOk());

        // Validate the Domicilio in the database
        List<Domicilio> domicilioList = domicilioRepository.findAll();
        assertThat(domicilioList).hasSize(databaseSizeBeforeUpdate);
        Domicilio testDomicilio = domicilioList.get(domicilioList.size() - 1);
        assertThat(testDomicilio.getCasaDomicilio()).isEqualTo(UPDATED_CASA_DOMICILIO);
        assertThat(testDomicilio.getDeptoDomicilio()).isEqualTo(UPDATED_DEPTO_DOMICILIO);
        assertThat(testDomicilio.getManzanaDomicilio()).isEqualTo(UPDATED_MANZANA_DOMICILIO);
        assertThat(testDomicilio.getPisoDomicilio()).isEqualTo(UPDATED_PISO_DOMICILIO);
    }

    @Test
    @Transactional
    public void updateNonExistingDomicilio() throws Exception {
        int databaseSizeBeforeUpdate = domicilioRepository.findAll().size();

        // Create the Domicilio

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDomicilioMockMvc.perform(put("/api/domicilios")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(domicilio)))
            .andExpect(status().isBadRequest());

        // Validate the Domicilio in the database
        List<Domicilio> domicilioList = domicilioRepository.findAll();
        assertThat(domicilioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDomicilio() throws Exception {
        // Initialize the database
        domicilioRepository.saveAndFlush(domicilio);

        int databaseSizeBeforeDelete = domicilioRepository.findAll().size();

        // Delete the domicilio
        restDomicilioMockMvc.perform(delete("/api/domicilios/{id}", domicilio.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Domicilio> domicilioList = domicilioRepository.findAll();
        assertThat(domicilioList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Domicilio.class);
        Domicilio domicilio1 = new Domicilio();
        domicilio1.setId(1L);
        Domicilio domicilio2 = new Domicilio();
        domicilio2.setId(domicilio1.getId());
        assertThat(domicilio1).isEqualTo(domicilio2);
        domicilio2.setId(2L);
        assertThat(domicilio1).isNotEqualTo(domicilio2);
        domicilio1.setId(null);
        assertThat(domicilio1).isNotEqualTo(domicilio2);
    }
}
