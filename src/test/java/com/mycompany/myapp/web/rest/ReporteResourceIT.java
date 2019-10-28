package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.Reporte;
import com.mycompany.myapp.repository.ReporteRepository;
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
 * Integration tests for the {@link ReporteResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class ReporteResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    @Autowired
    private ReporteRepository reporteRepository;

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

    private MockMvc restReporteMockMvc;

    private Reporte reporte;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ReporteResource reporteResource = new ReporteResource(reporteRepository);
        this.restReporteMockMvc = MockMvcBuilders.standaloneSetup(reporteResource)
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
    public static Reporte createEntity(EntityManager em) {
        Reporte reporte = new Reporte()
            .fecha(DEFAULT_FECHA)
            .descripcion(DEFAULT_DESCRIPCION);
        return reporte;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Reporte createUpdatedEntity(EntityManager em) {
        Reporte reporte = new Reporte()
            .fecha(UPDATED_FECHA)
            .descripcion(UPDATED_DESCRIPCION);
        return reporte;
    }

    @BeforeEach
    public void initTest() {
        reporte = createEntity(em);
    }

    @Test
    @Transactional
    public void createReporte() throws Exception {
        int databaseSizeBeforeCreate = reporteRepository.findAll().size();

        // Create the Reporte
        restReporteMockMvc.perform(post("/api/reportes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporte)))
            .andExpect(status().isCreated());

        // Validate the Reporte in the database
        List<Reporte> reporteList = reporteRepository.findAll();
        assertThat(reporteList).hasSize(databaseSizeBeforeCreate + 1);
        Reporte testReporte = reporteList.get(reporteList.size() - 1);
        assertThat(testReporte.getFecha()).isEqualTo(DEFAULT_FECHA);
        assertThat(testReporte.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
    }

    @Test
    @Transactional
    public void createReporteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reporteRepository.findAll().size();

        // Create the Reporte with an existing ID
        reporte.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReporteMockMvc.perform(post("/api/reportes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporte)))
            .andExpect(status().isBadRequest());

        // Validate the Reporte in the database
        List<Reporte> reporteList = reporteRepository.findAll();
        assertThat(reporteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReportes() throws Exception {
        // Initialize the database
        reporteRepository.saveAndFlush(reporte);

        // Get all the reporteList
        restReporteMockMvc.perform(get("/api/reportes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(reporte.getId().intValue())))
            .andExpect(jsonPath("$.[*].fecha").value(hasItem(sameInstant(DEFAULT_FECHA))))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION.toString())));
    }
    
    @Test
    @Transactional
    public void getReporte() throws Exception {
        // Initialize the database
        reporteRepository.saveAndFlush(reporte);

        // Get the reporte
        restReporteMockMvc.perform(get("/api/reportes/{id}", reporte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(reporte.getId().intValue()))
            .andExpect(jsonPath("$.fecha").value(sameInstant(DEFAULT_FECHA)))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingReporte() throws Exception {
        // Get the reporte
        restReporteMockMvc.perform(get("/api/reportes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReporte() throws Exception {
        // Initialize the database
        reporteRepository.saveAndFlush(reporte);

        int databaseSizeBeforeUpdate = reporteRepository.findAll().size();

        // Update the reporte
        Reporte updatedReporte = reporteRepository.findById(reporte.getId()).get();
        // Disconnect from session so that the updates on updatedReporte are not directly saved in db
        em.detach(updatedReporte);
        updatedReporte
            .fecha(UPDATED_FECHA)
            .descripcion(UPDATED_DESCRIPCION);

        restReporteMockMvc.perform(put("/api/reportes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedReporte)))
            .andExpect(status().isOk());

        // Validate the Reporte in the database
        List<Reporte> reporteList = reporteRepository.findAll();
        assertThat(reporteList).hasSize(databaseSizeBeforeUpdate);
        Reporte testReporte = reporteList.get(reporteList.size() - 1);
        assertThat(testReporte.getFecha()).isEqualTo(UPDATED_FECHA);
        assertThat(testReporte.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
    }

    @Test
    @Transactional
    public void updateNonExistingReporte() throws Exception {
        int databaseSizeBeforeUpdate = reporteRepository.findAll().size();

        // Create the Reporte

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReporteMockMvc.perform(put("/api/reportes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(reporte)))
            .andExpect(status().isBadRequest());

        // Validate the Reporte in the database
        List<Reporte> reporteList = reporteRepository.findAll();
        assertThat(reporteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReporte() throws Exception {
        // Initialize the database
        reporteRepository.saveAndFlush(reporte);

        int databaseSizeBeforeDelete = reporteRepository.findAll().size();

        // Delete the reporte
        restReporteMockMvc.perform(delete("/api/reportes/{id}", reporte.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Reporte> reporteList = reporteRepository.findAll();
        assertThat(reporteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Reporte.class);
        Reporte reporte1 = new Reporte();
        reporte1.setId(1L);
        Reporte reporte2 = new Reporte();
        reporte2.setId(reporte1.getId());
        assertThat(reporte1).isEqualTo(reporte2);
        reporte2.setId(2L);
        assertThat(reporte1).isNotEqualTo(reporte2);
        reporte1.setId(null);
        assertThat(reporte1).isNotEqualTo(reporte2);
    }
}
