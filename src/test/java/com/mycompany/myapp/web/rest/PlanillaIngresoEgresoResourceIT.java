package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.PlanillaIngresoEgreso;
import com.mycompany.myapp.repository.PlanillaIngresoEgresoRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PlanillaIngresoEgresoResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class PlanillaIngresoEgresoResourceIT {

    private static final Boolean DEFAULT_AUTORIZADO_PREVIO = false;
    private static final Boolean UPDATED_AUTORIZADO_PREVIO = true;

    private static final Integer DEFAULT_ACOMPANIANTES = 1;
    private static final Integer UPDATED_ACOMPANIANTES = 2;
    private static final Integer SMALLER_ACOMPANIANTES = 1 - 1;

    private static final ZonedDateTime DEFAULT_FECHA_INGRESO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_INGRESO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA_INGRESO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_FECHA_EGRESO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_EGRESO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA_EGRESO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final String DEFAULT_TIPOVISITA = "AAAAAAAAAA";
    private static final String UPDATED_TIPOVISITA = "BBBBBBBBBB";

    private static final Boolean DEFAULT_INGRESO_A_PIE = false;
    private static final Boolean UPDATED_INGRESO_A_PIE = true;

    @Autowired
    private PlanillaIngresoEgresoRepository planillaIngresoEgresoRepository;

    @Mock
    private PlanillaIngresoEgresoRepository planillaIngresoEgresoRepositoryMock;

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

    private MockMvc restPlanillaIngresoEgresoMockMvc;

    private PlanillaIngresoEgreso planillaIngresoEgreso;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PlanillaIngresoEgresoResource planillaIngresoEgresoResource = new PlanillaIngresoEgresoResource(planillaIngresoEgresoRepository);
        this.restPlanillaIngresoEgresoMockMvc = MockMvcBuilders.standaloneSetup(planillaIngresoEgresoResource)
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
    public static PlanillaIngresoEgreso createEntity(EntityManager em) {
        PlanillaIngresoEgreso planillaIngresoEgreso = new PlanillaIngresoEgreso()
            .autorizadoPrevio(DEFAULT_AUTORIZADO_PREVIO)
            .acompaniantes(DEFAULT_ACOMPANIANTES)
            .fechaIngreso(DEFAULT_FECHA_INGRESO)
            .fechaEgreso(DEFAULT_FECHA_EGRESO)
            .tipovisita(DEFAULT_TIPOVISITA)
            .ingresoAPie(DEFAULT_INGRESO_A_PIE);
        return planillaIngresoEgreso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PlanillaIngresoEgreso createUpdatedEntity(EntityManager em) {
        PlanillaIngresoEgreso planillaIngresoEgreso = new PlanillaIngresoEgreso()
            .autorizadoPrevio(UPDATED_AUTORIZADO_PREVIO)
            .acompaniantes(UPDATED_ACOMPANIANTES)
            .fechaIngreso(UPDATED_FECHA_INGRESO)
            .fechaEgreso(UPDATED_FECHA_EGRESO)
            .tipovisita(UPDATED_TIPOVISITA)
            .ingresoAPie(UPDATED_INGRESO_A_PIE);
        return planillaIngresoEgreso;
    }

    @BeforeEach
    public void initTest() {
        planillaIngresoEgreso = createEntity(em);
    }

    @Test
    @Transactional
    public void createPlanillaIngresoEgreso() throws Exception {
        int databaseSizeBeforeCreate = planillaIngresoEgresoRepository.findAll().size();

        // Create the PlanillaIngresoEgreso
        restPlanillaIngresoEgresoMockMvc.perform(post("/api/planilla-ingreso-egresos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planillaIngresoEgreso)))
            .andExpect(status().isCreated());

        // Validate the PlanillaIngresoEgreso in the database
        List<PlanillaIngresoEgreso> planillaIngresoEgresoList = planillaIngresoEgresoRepository.findAll();
        assertThat(planillaIngresoEgresoList).hasSize(databaseSizeBeforeCreate + 1);
        PlanillaIngresoEgreso testPlanillaIngresoEgreso = planillaIngresoEgresoList.get(planillaIngresoEgresoList.size() - 1);
        assertThat(testPlanillaIngresoEgreso.isAutorizadoPrevio()).isEqualTo(DEFAULT_AUTORIZADO_PREVIO);
        assertThat(testPlanillaIngresoEgreso.getAcompaniantes()).isEqualTo(DEFAULT_ACOMPANIANTES);
        assertThat(testPlanillaIngresoEgreso.getFechaIngreso()).isEqualTo(DEFAULT_FECHA_INGRESO);
        assertThat(testPlanillaIngresoEgreso.getFechaEgreso()).isEqualTo(DEFAULT_FECHA_EGRESO);
        assertThat(testPlanillaIngresoEgreso.getTipovisita()).isEqualTo(DEFAULT_TIPOVISITA);
        assertThat(testPlanillaIngresoEgreso.isIngresoAPie()).isEqualTo(DEFAULT_INGRESO_A_PIE);
    }

    @Test
    @Transactional
    public void createPlanillaIngresoEgresoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = planillaIngresoEgresoRepository.findAll().size();

        // Create the PlanillaIngresoEgreso with an existing ID
        planillaIngresoEgreso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPlanillaIngresoEgresoMockMvc.perform(post("/api/planilla-ingreso-egresos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planillaIngresoEgreso)))
            .andExpect(status().isBadRequest());

        // Validate the PlanillaIngresoEgreso in the database
        List<PlanillaIngresoEgreso> planillaIngresoEgresoList = planillaIngresoEgresoRepository.findAll();
        assertThat(planillaIngresoEgresoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPlanillaIngresoEgresos() throws Exception {
        // Initialize the database
        planillaIngresoEgresoRepository.saveAndFlush(planillaIngresoEgreso);

        // Get all the planillaIngresoEgresoList
        restPlanillaIngresoEgresoMockMvc.perform(get("/api/planilla-ingreso-egresos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(planillaIngresoEgreso.getId().intValue())))
            .andExpect(jsonPath("$.[*].autorizadoPrevio").value(hasItem(DEFAULT_AUTORIZADO_PREVIO.booleanValue())))
            .andExpect(jsonPath("$.[*].acompaniantes").value(hasItem(DEFAULT_ACOMPANIANTES)))
            .andExpect(jsonPath("$.[*].fechaIngreso").value(hasItem(sameInstant(DEFAULT_FECHA_INGRESO))))
            .andExpect(jsonPath("$.[*].fechaEgreso").value(hasItem(sameInstant(DEFAULT_FECHA_EGRESO))))
            .andExpect(jsonPath("$.[*].tipovisita").value(hasItem(DEFAULT_TIPOVISITA.toString())))
            .andExpect(jsonPath("$.[*].ingresoAPie").value(hasItem(DEFAULT_INGRESO_A_PIE.booleanValue())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPlanillaIngresoEgresosWithEagerRelationshipsIsEnabled() throws Exception {
        PlanillaIngresoEgresoResource planillaIngresoEgresoResource = new PlanillaIngresoEgresoResource(planillaIngresoEgresoRepositoryMock);
        when(planillaIngresoEgresoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPlanillaIngresoEgresoMockMvc = MockMvcBuilders.standaloneSetup(planillaIngresoEgresoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPlanillaIngresoEgresoMockMvc.perform(get("/api/planilla-ingreso-egresos?eagerload=true"))
        .andExpect(status().isOk());

        verify(planillaIngresoEgresoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPlanillaIngresoEgresosWithEagerRelationshipsIsNotEnabled() throws Exception {
        PlanillaIngresoEgresoResource planillaIngresoEgresoResource = new PlanillaIngresoEgresoResource(planillaIngresoEgresoRepositoryMock);
            when(planillaIngresoEgresoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPlanillaIngresoEgresoMockMvc = MockMvcBuilders.standaloneSetup(planillaIngresoEgresoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPlanillaIngresoEgresoMockMvc.perform(get("/api/planilla-ingreso-egresos?eagerload=true"))
        .andExpect(status().isOk());

            verify(planillaIngresoEgresoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPlanillaIngresoEgreso() throws Exception {
        // Initialize the database
        planillaIngresoEgresoRepository.saveAndFlush(planillaIngresoEgreso);

        // Get the planillaIngresoEgreso
        restPlanillaIngresoEgresoMockMvc.perform(get("/api/planilla-ingreso-egresos/{id}", planillaIngresoEgreso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(planillaIngresoEgreso.getId().intValue()))
            .andExpect(jsonPath("$.autorizadoPrevio").value(DEFAULT_AUTORIZADO_PREVIO.booleanValue()))
            .andExpect(jsonPath("$.acompaniantes").value(DEFAULT_ACOMPANIANTES))
            .andExpect(jsonPath("$.fechaIngreso").value(sameInstant(DEFAULT_FECHA_INGRESO)))
            .andExpect(jsonPath("$.fechaEgreso").value(sameInstant(DEFAULT_FECHA_EGRESO)))
            .andExpect(jsonPath("$.tipovisita").value(DEFAULT_TIPOVISITA.toString()))
            .andExpect(jsonPath("$.ingresoAPie").value(DEFAULT_INGRESO_A_PIE.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPlanillaIngresoEgreso() throws Exception {
        // Get the planillaIngresoEgreso
        restPlanillaIngresoEgresoMockMvc.perform(get("/api/planilla-ingreso-egresos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePlanillaIngresoEgreso() throws Exception {
        // Initialize the database
        planillaIngresoEgresoRepository.saveAndFlush(planillaIngresoEgreso);

        int databaseSizeBeforeUpdate = planillaIngresoEgresoRepository.findAll().size();

        // Update the planillaIngresoEgreso
        PlanillaIngresoEgreso updatedPlanillaIngresoEgreso = planillaIngresoEgresoRepository.findById(planillaIngresoEgreso.getId()).get();
        // Disconnect from session so that the updates on updatedPlanillaIngresoEgreso are not directly saved in db
        em.detach(updatedPlanillaIngresoEgreso);
        updatedPlanillaIngresoEgreso
            .autorizadoPrevio(UPDATED_AUTORIZADO_PREVIO)
            .acompaniantes(UPDATED_ACOMPANIANTES)
            .fechaIngreso(UPDATED_FECHA_INGRESO)
            .fechaEgreso(UPDATED_FECHA_EGRESO)
            .tipovisita(UPDATED_TIPOVISITA)
            .ingresoAPie(UPDATED_INGRESO_A_PIE);

        restPlanillaIngresoEgresoMockMvc.perform(put("/api/planilla-ingreso-egresos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPlanillaIngresoEgreso)))
            .andExpect(status().isOk());

        // Validate the PlanillaIngresoEgreso in the database
        List<PlanillaIngresoEgreso> planillaIngresoEgresoList = planillaIngresoEgresoRepository.findAll();
        assertThat(planillaIngresoEgresoList).hasSize(databaseSizeBeforeUpdate);
        PlanillaIngresoEgreso testPlanillaIngresoEgreso = planillaIngresoEgresoList.get(planillaIngresoEgresoList.size() - 1);
        assertThat(testPlanillaIngresoEgreso.isAutorizadoPrevio()).isEqualTo(UPDATED_AUTORIZADO_PREVIO);
        assertThat(testPlanillaIngresoEgreso.getAcompaniantes()).isEqualTo(UPDATED_ACOMPANIANTES);
        assertThat(testPlanillaIngresoEgreso.getFechaIngreso()).isEqualTo(UPDATED_FECHA_INGRESO);
        assertThat(testPlanillaIngresoEgreso.getFechaEgreso()).isEqualTo(UPDATED_FECHA_EGRESO);
        assertThat(testPlanillaIngresoEgreso.getTipovisita()).isEqualTo(UPDATED_TIPOVISITA);
        assertThat(testPlanillaIngresoEgreso.isIngresoAPie()).isEqualTo(UPDATED_INGRESO_A_PIE);
    }

    @Test
    @Transactional
    public void updateNonExistingPlanillaIngresoEgreso() throws Exception {
        int databaseSizeBeforeUpdate = planillaIngresoEgresoRepository.findAll().size();

        // Create the PlanillaIngresoEgreso

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPlanillaIngresoEgresoMockMvc.perform(put("/api/planilla-ingreso-egresos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(planillaIngresoEgreso)))
            .andExpect(status().isBadRequest());

        // Validate the PlanillaIngresoEgreso in the database
        List<PlanillaIngresoEgreso> planillaIngresoEgresoList = planillaIngresoEgresoRepository.findAll();
        assertThat(planillaIngresoEgresoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePlanillaIngresoEgreso() throws Exception {
        // Initialize the database
        planillaIngresoEgresoRepository.saveAndFlush(planillaIngresoEgreso);

        int databaseSizeBeforeDelete = planillaIngresoEgresoRepository.findAll().size();

        // Delete the planillaIngresoEgreso
        restPlanillaIngresoEgresoMockMvc.perform(delete("/api/planilla-ingreso-egresos/{id}", planillaIngresoEgreso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PlanillaIngresoEgreso> planillaIngresoEgresoList = planillaIngresoEgresoRepository.findAll();
        assertThat(planillaIngresoEgresoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PlanillaIngresoEgreso.class);
        PlanillaIngresoEgreso planillaIngresoEgreso1 = new PlanillaIngresoEgreso();
        planillaIngresoEgreso1.setId(1L);
        PlanillaIngresoEgreso planillaIngresoEgreso2 = new PlanillaIngresoEgreso();
        planillaIngresoEgreso2.setId(planillaIngresoEgreso1.getId());
        assertThat(planillaIngresoEgreso1).isEqualTo(planillaIngresoEgreso2);
        planillaIngresoEgreso2.setId(2L);
        assertThat(planillaIngresoEgreso1).isNotEqualTo(planillaIngresoEgreso2);
        planillaIngresoEgreso1.setId(null);
        assertThat(planillaIngresoEgreso1).isNotEqualTo(planillaIngresoEgreso2);
    }
}
