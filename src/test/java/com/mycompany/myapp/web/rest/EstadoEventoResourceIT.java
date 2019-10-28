package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.EstadoEvento;
import com.mycompany.myapp.repository.EstadoEventoRepository;
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
 * Integration tests for the {@link EstadoEventoResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class EstadoEventoResourceIT {

    private static final String DEFAULT_NOMBRE_ESTADO_EVENTO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESTADO_EVENTO = "BBBBBBBBBB";

    @Autowired
    private EstadoEventoRepository estadoEventoRepository;

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

    private MockMvc restEstadoEventoMockMvc;

    private EstadoEvento estadoEvento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EstadoEventoResource estadoEventoResource = new EstadoEventoResource(estadoEventoRepository);
        this.restEstadoEventoMockMvc = MockMvcBuilders.standaloneSetup(estadoEventoResource)
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
    public static EstadoEvento createEntity(EntityManager em) {
        EstadoEvento estadoEvento = new EstadoEvento()
            .nombreEstadoEvento(DEFAULT_NOMBRE_ESTADO_EVENTO);
        return estadoEvento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EstadoEvento createUpdatedEntity(EntityManager em) {
        EstadoEvento estadoEvento = new EstadoEvento()
            .nombreEstadoEvento(UPDATED_NOMBRE_ESTADO_EVENTO);
        return estadoEvento;
    }

    @BeforeEach
    public void initTest() {
        estadoEvento = createEntity(em);
    }

    @Test
    @Transactional
    public void createEstadoEvento() throws Exception {
        int databaseSizeBeforeCreate = estadoEventoRepository.findAll().size();

        // Create the EstadoEvento
        restEstadoEventoMockMvc.perform(post("/api/estado-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoEvento)))
            .andExpect(status().isCreated());

        // Validate the EstadoEvento in the database
        List<EstadoEvento> estadoEventoList = estadoEventoRepository.findAll();
        assertThat(estadoEventoList).hasSize(databaseSizeBeforeCreate + 1);
        EstadoEvento testEstadoEvento = estadoEventoList.get(estadoEventoList.size() - 1);
        assertThat(testEstadoEvento.getNombreEstadoEvento()).isEqualTo(DEFAULT_NOMBRE_ESTADO_EVENTO);
    }

    @Test
    @Transactional
    public void createEstadoEventoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = estadoEventoRepository.findAll().size();

        // Create the EstadoEvento with an existing ID
        estadoEvento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEstadoEventoMockMvc.perform(post("/api/estado-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoEvento)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoEvento in the database
        List<EstadoEvento> estadoEventoList = estadoEventoRepository.findAll();
        assertThat(estadoEventoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEstadoEventos() throws Exception {
        // Initialize the database
        estadoEventoRepository.saveAndFlush(estadoEvento);

        // Get all the estadoEventoList
        restEstadoEventoMockMvc.perform(get("/api/estado-eventos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(estadoEvento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEstadoEvento").value(hasItem(DEFAULT_NOMBRE_ESTADO_EVENTO.toString())));
    }
    
    @Test
    @Transactional
    public void getEstadoEvento() throws Exception {
        // Initialize the database
        estadoEventoRepository.saveAndFlush(estadoEvento);

        // Get the estadoEvento
        restEstadoEventoMockMvc.perform(get("/api/estado-eventos/{id}", estadoEvento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(estadoEvento.getId().intValue()))
            .andExpect(jsonPath("$.nombreEstadoEvento").value(DEFAULT_NOMBRE_ESTADO_EVENTO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEstadoEvento() throws Exception {
        // Get the estadoEvento
        restEstadoEventoMockMvc.perform(get("/api/estado-eventos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEstadoEvento() throws Exception {
        // Initialize the database
        estadoEventoRepository.saveAndFlush(estadoEvento);

        int databaseSizeBeforeUpdate = estadoEventoRepository.findAll().size();

        // Update the estadoEvento
        EstadoEvento updatedEstadoEvento = estadoEventoRepository.findById(estadoEvento.getId()).get();
        // Disconnect from session so that the updates on updatedEstadoEvento are not directly saved in db
        em.detach(updatedEstadoEvento);
        updatedEstadoEvento
            .nombreEstadoEvento(UPDATED_NOMBRE_ESTADO_EVENTO);

        restEstadoEventoMockMvc.perform(put("/api/estado-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEstadoEvento)))
            .andExpect(status().isOk());

        // Validate the EstadoEvento in the database
        List<EstadoEvento> estadoEventoList = estadoEventoRepository.findAll();
        assertThat(estadoEventoList).hasSize(databaseSizeBeforeUpdate);
        EstadoEvento testEstadoEvento = estadoEventoList.get(estadoEventoList.size() - 1);
        assertThat(testEstadoEvento.getNombreEstadoEvento()).isEqualTo(UPDATED_NOMBRE_ESTADO_EVENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingEstadoEvento() throws Exception {
        int databaseSizeBeforeUpdate = estadoEventoRepository.findAll().size();

        // Create the EstadoEvento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEstadoEventoMockMvc.perform(put("/api/estado-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(estadoEvento)))
            .andExpect(status().isBadRequest());

        // Validate the EstadoEvento in the database
        List<EstadoEvento> estadoEventoList = estadoEventoRepository.findAll();
        assertThat(estadoEventoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEstadoEvento() throws Exception {
        // Initialize the database
        estadoEventoRepository.saveAndFlush(estadoEvento);

        int databaseSizeBeforeDelete = estadoEventoRepository.findAll().size();

        // Delete the estadoEvento
        restEstadoEventoMockMvc.perform(delete("/api/estado-eventos/{id}", estadoEvento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EstadoEvento> estadoEventoList = estadoEventoRepository.findAll();
        assertThat(estadoEventoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EstadoEvento.class);
        EstadoEvento estadoEvento1 = new EstadoEvento();
        estadoEvento1.setId(1L);
        EstadoEvento estadoEvento2 = new EstadoEvento();
        estadoEvento2.setId(estadoEvento1.getId());
        assertThat(estadoEvento1).isEqualTo(estadoEvento2);
        estadoEvento2.setId(2L);
        assertThat(estadoEvento1).isNotEqualTo(estadoEvento2);
        estadoEvento1.setId(null);
        assertThat(estadoEvento1).isNotEqualTo(estadoEvento2);
    }
}
