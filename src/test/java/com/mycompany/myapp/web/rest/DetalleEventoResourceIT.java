package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.DetalleEvento;
import com.mycompany.myapp.repository.DetalleEventoRepository;
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
 * Integration tests for the {@link DetalleEventoResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class DetalleEventoResourceIT {

    private static final ZonedDateTime DEFAULT_HORA_INGRESO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA_INGRESO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_HORA_INGRESO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_HORA_ENGRESO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA_ENGRESO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_HORA_ENGRESO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private DetalleEventoRepository detalleEventoRepository;

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

    private MockMvc restDetalleEventoMockMvc;

    private DetalleEvento detalleEvento;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DetalleEventoResource detalleEventoResource = new DetalleEventoResource(detalleEventoRepository);
        this.restDetalleEventoMockMvc = MockMvcBuilders.standaloneSetup(detalleEventoResource)
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
    public static DetalleEvento createEntity(EntityManager em) {
        DetalleEvento detalleEvento = new DetalleEvento()
            .horaIngreso(DEFAULT_HORA_INGRESO)
            .horaEngreso(DEFAULT_HORA_ENGRESO);
        return detalleEvento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DetalleEvento createUpdatedEntity(EntityManager em) {
        DetalleEvento detalleEvento = new DetalleEvento()
            .horaIngreso(UPDATED_HORA_INGRESO)
            .horaEngreso(UPDATED_HORA_ENGRESO);
        return detalleEvento;
    }

    @BeforeEach
    public void initTest() {
        detalleEvento = createEntity(em);
    }

    @Test
    @Transactional
    public void createDetalleEvento() throws Exception {
        int databaseSizeBeforeCreate = detalleEventoRepository.findAll().size();

        // Create the DetalleEvento
        restDetalleEventoMockMvc.perform(post("/api/detalle-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleEvento)))
            .andExpect(status().isCreated());

        // Validate the DetalleEvento in the database
        List<DetalleEvento> detalleEventoList = detalleEventoRepository.findAll();
        assertThat(detalleEventoList).hasSize(databaseSizeBeforeCreate + 1);
        DetalleEvento testDetalleEvento = detalleEventoList.get(detalleEventoList.size() - 1);
        assertThat(testDetalleEvento.getHoraIngreso()).isEqualTo(DEFAULT_HORA_INGRESO);
        assertThat(testDetalleEvento.getHoraEngreso()).isEqualTo(DEFAULT_HORA_ENGRESO);
    }

    @Test
    @Transactional
    public void createDetalleEventoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = detalleEventoRepository.findAll().size();

        // Create the DetalleEvento with an existing ID
        detalleEvento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDetalleEventoMockMvc.perform(post("/api/detalle-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleEvento)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleEvento in the database
        List<DetalleEvento> detalleEventoList = detalleEventoRepository.findAll();
        assertThat(detalleEventoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllDetalleEventos() throws Exception {
        // Initialize the database
        detalleEventoRepository.saveAndFlush(detalleEvento);

        // Get all the detalleEventoList
        restDetalleEventoMockMvc.perform(get("/api/detalle-eventos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(detalleEvento.getId().intValue())))
            .andExpect(jsonPath("$.[*].horaIngreso").value(hasItem(sameInstant(DEFAULT_HORA_INGRESO))))
            .andExpect(jsonPath("$.[*].horaEngreso").value(hasItem(sameInstant(DEFAULT_HORA_ENGRESO))));
    }
    
    @Test
    @Transactional
    public void getDetalleEvento() throws Exception {
        // Initialize the database
        detalleEventoRepository.saveAndFlush(detalleEvento);

        // Get the detalleEvento
        restDetalleEventoMockMvc.perform(get("/api/detalle-eventos/{id}", detalleEvento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(detalleEvento.getId().intValue()))
            .andExpect(jsonPath("$.horaIngreso").value(sameInstant(DEFAULT_HORA_INGRESO)))
            .andExpect(jsonPath("$.horaEngreso").value(sameInstant(DEFAULT_HORA_ENGRESO)));
    }

    @Test
    @Transactional
    public void getNonExistingDetalleEvento() throws Exception {
        // Get the detalleEvento
        restDetalleEventoMockMvc.perform(get("/api/detalle-eventos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDetalleEvento() throws Exception {
        // Initialize the database
        detalleEventoRepository.saveAndFlush(detalleEvento);

        int databaseSizeBeforeUpdate = detalleEventoRepository.findAll().size();

        // Update the detalleEvento
        DetalleEvento updatedDetalleEvento = detalleEventoRepository.findById(detalleEvento.getId()).get();
        // Disconnect from session so that the updates on updatedDetalleEvento are not directly saved in db
        em.detach(updatedDetalleEvento);
        updatedDetalleEvento
            .horaIngreso(UPDATED_HORA_INGRESO)
            .horaEngreso(UPDATED_HORA_ENGRESO);

        restDetalleEventoMockMvc.perform(put("/api/detalle-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDetalleEvento)))
            .andExpect(status().isOk());

        // Validate the DetalleEvento in the database
        List<DetalleEvento> detalleEventoList = detalleEventoRepository.findAll();
        assertThat(detalleEventoList).hasSize(databaseSizeBeforeUpdate);
        DetalleEvento testDetalleEvento = detalleEventoList.get(detalleEventoList.size() - 1);
        assertThat(testDetalleEvento.getHoraIngreso()).isEqualTo(UPDATED_HORA_INGRESO);
        assertThat(testDetalleEvento.getHoraEngreso()).isEqualTo(UPDATED_HORA_ENGRESO);
    }

    @Test
    @Transactional
    public void updateNonExistingDetalleEvento() throws Exception {
        int databaseSizeBeforeUpdate = detalleEventoRepository.findAll().size();

        // Create the DetalleEvento

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDetalleEventoMockMvc.perform(put("/api/detalle-eventos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(detalleEvento)))
            .andExpect(status().isBadRequest());

        // Validate the DetalleEvento in the database
        List<DetalleEvento> detalleEventoList = detalleEventoRepository.findAll();
        assertThat(detalleEventoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDetalleEvento() throws Exception {
        // Initialize the database
        detalleEventoRepository.saveAndFlush(detalleEvento);

        int databaseSizeBeforeDelete = detalleEventoRepository.findAll().size();

        // Delete the detalleEvento
        restDetalleEventoMockMvc.perform(delete("/api/detalle-eventos/{id}", detalleEvento.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DetalleEvento> detalleEventoList = detalleEventoRepository.findAll();
        assertThat(detalleEventoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DetalleEvento.class);
        DetalleEvento detalleEvento1 = new DetalleEvento();
        detalleEvento1.setId(1L);
        DetalleEvento detalleEvento2 = new DetalleEvento();
        detalleEvento2.setId(detalleEvento1.getId());
        assertThat(detalleEvento1).isEqualTo(detalleEvento2);
        detalleEvento2.setId(2L);
        assertThat(detalleEvento1).isNotEqualTo(detalleEvento2);
        detalleEvento1.setId(null);
        assertThat(detalleEvento1).isNotEqualTo(detalleEvento2);
    }
}
