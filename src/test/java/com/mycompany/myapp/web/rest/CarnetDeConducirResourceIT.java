package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.CarnetDeConducir;
import com.mycompany.myapp.repository.CarnetDeConducirRepository;
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
 * Integration tests for the {@link CarnetDeConducirResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class CarnetDeConducirResourceIT {

    private static final String DEFAULT_CATEGORIA = "AAAAAAAAAA";
    private static final String UPDATED_CATEGORIA = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_OTORGAMIENTO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_OTORGAMIENTO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA_OTORGAMIENTO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_FECHA_VENCIMIENTO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_VENCIMIENTO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA_VENCIMIENTO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private CarnetDeConducirRepository carnetDeConducirRepository;

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

    private MockMvc restCarnetDeConducirMockMvc;

    private CarnetDeConducir carnetDeConducir;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CarnetDeConducirResource carnetDeConducirResource = new CarnetDeConducirResource(carnetDeConducirRepository);
        this.restCarnetDeConducirMockMvc = MockMvcBuilders.standaloneSetup(carnetDeConducirResource)
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
    public static CarnetDeConducir createEntity(EntityManager em) {
        CarnetDeConducir carnetDeConducir = new CarnetDeConducir()
            .categoria(DEFAULT_CATEGORIA)
            .fechaOtorgamiento(DEFAULT_FECHA_OTORGAMIENTO)
            .fechaVencimiento(DEFAULT_FECHA_VENCIMIENTO);
        return carnetDeConducir;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CarnetDeConducir createUpdatedEntity(EntityManager em) {
        CarnetDeConducir carnetDeConducir = new CarnetDeConducir()
            .categoria(UPDATED_CATEGORIA)
            .fechaOtorgamiento(UPDATED_FECHA_OTORGAMIENTO)
            .fechaVencimiento(UPDATED_FECHA_VENCIMIENTO);
        return carnetDeConducir;
    }

    @BeforeEach
    public void initTest() {
        carnetDeConducir = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarnetDeConducir() throws Exception {
        int databaseSizeBeforeCreate = carnetDeConducirRepository.findAll().size();

        // Create the CarnetDeConducir
        restCarnetDeConducirMockMvc.perform(post("/api/carnet-de-conducirs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carnetDeConducir)))
            .andExpect(status().isCreated());

        // Validate the CarnetDeConducir in the database
        List<CarnetDeConducir> carnetDeConducirList = carnetDeConducirRepository.findAll();
        assertThat(carnetDeConducirList).hasSize(databaseSizeBeforeCreate + 1);
        CarnetDeConducir testCarnetDeConducir = carnetDeConducirList.get(carnetDeConducirList.size() - 1);
        assertThat(testCarnetDeConducir.getCategoria()).isEqualTo(DEFAULT_CATEGORIA);
        assertThat(testCarnetDeConducir.getFechaOtorgamiento()).isEqualTo(DEFAULT_FECHA_OTORGAMIENTO);
        assertThat(testCarnetDeConducir.getFechaVencimiento()).isEqualTo(DEFAULT_FECHA_VENCIMIENTO);
    }

    @Test
    @Transactional
    public void createCarnetDeConducirWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carnetDeConducirRepository.findAll().size();

        // Create the CarnetDeConducir with an existing ID
        carnetDeConducir.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarnetDeConducirMockMvc.perform(post("/api/carnet-de-conducirs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carnetDeConducir)))
            .andExpect(status().isBadRequest());

        // Validate the CarnetDeConducir in the database
        List<CarnetDeConducir> carnetDeConducirList = carnetDeConducirRepository.findAll();
        assertThat(carnetDeConducirList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCarnetDeConducirs() throws Exception {
        // Initialize the database
        carnetDeConducirRepository.saveAndFlush(carnetDeConducir);

        // Get all the carnetDeConducirList
        restCarnetDeConducirMockMvc.perform(get("/api/carnet-de-conducirs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carnetDeConducir.getId().intValue())))
            .andExpect(jsonPath("$.[*].categoria").value(hasItem(DEFAULT_CATEGORIA.toString())))
            .andExpect(jsonPath("$.[*].fechaOtorgamiento").value(hasItem(sameInstant(DEFAULT_FECHA_OTORGAMIENTO))))
            .andExpect(jsonPath("$.[*].fechaVencimiento").value(hasItem(sameInstant(DEFAULT_FECHA_VENCIMIENTO))));
    }
    
    @Test
    @Transactional
    public void getCarnetDeConducir() throws Exception {
        // Initialize the database
        carnetDeConducirRepository.saveAndFlush(carnetDeConducir);

        // Get the carnetDeConducir
        restCarnetDeConducirMockMvc.perform(get("/api/carnet-de-conducirs/{id}", carnetDeConducir.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(carnetDeConducir.getId().intValue()))
            .andExpect(jsonPath("$.categoria").value(DEFAULT_CATEGORIA.toString()))
            .andExpect(jsonPath("$.fechaOtorgamiento").value(sameInstant(DEFAULT_FECHA_OTORGAMIENTO)))
            .andExpect(jsonPath("$.fechaVencimiento").value(sameInstant(DEFAULT_FECHA_VENCIMIENTO)));
    }

    @Test
    @Transactional
    public void getNonExistingCarnetDeConducir() throws Exception {
        // Get the carnetDeConducir
        restCarnetDeConducirMockMvc.perform(get("/api/carnet-de-conducirs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarnetDeConducir() throws Exception {
        // Initialize the database
        carnetDeConducirRepository.saveAndFlush(carnetDeConducir);

        int databaseSizeBeforeUpdate = carnetDeConducirRepository.findAll().size();

        // Update the carnetDeConducir
        CarnetDeConducir updatedCarnetDeConducir = carnetDeConducirRepository.findById(carnetDeConducir.getId()).get();
        // Disconnect from session so that the updates on updatedCarnetDeConducir are not directly saved in db
        em.detach(updatedCarnetDeConducir);
        updatedCarnetDeConducir
            .categoria(UPDATED_CATEGORIA)
            .fechaOtorgamiento(UPDATED_FECHA_OTORGAMIENTO)
            .fechaVencimiento(UPDATED_FECHA_VENCIMIENTO);

        restCarnetDeConducirMockMvc.perform(put("/api/carnet-de-conducirs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarnetDeConducir)))
            .andExpect(status().isOk());

        // Validate the CarnetDeConducir in the database
        List<CarnetDeConducir> carnetDeConducirList = carnetDeConducirRepository.findAll();
        assertThat(carnetDeConducirList).hasSize(databaseSizeBeforeUpdate);
        CarnetDeConducir testCarnetDeConducir = carnetDeConducirList.get(carnetDeConducirList.size() - 1);
        assertThat(testCarnetDeConducir.getCategoria()).isEqualTo(UPDATED_CATEGORIA);
        assertThat(testCarnetDeConducir.getFechaOtorgamiento()).isEqualTo(UPDATED_FECHA_OTORGAMIENTO);
        assertThat(testCarnetDeConducir.getFechaVencimiento()).isEqualTo(UPDATED_FECHA_VENCIMIENTO);
    }

    @Test
    @Transactional
    public void updateNonExistingCarnetDeConducir() throws Exception {
        int databaseSizeBeforeUpdate = carnetDeConducirRepository.findAll().size();

        // Create the CarnetDeConducir

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarnetDeConducirMockMvc.perform(put("/api/carnet-de-conducirs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(carnetDeConducir)))
            .andExpect(status().isBadRequest());

        // Validate the CarnetDeConducir in the database
        List<CarnetDeConducir> carnetDeConducirList = carnetDeConducirRepository.findAll();
        assertThat(carnetDeConducirList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarnetDeConducir() throws Exception {
        // Initialize the database
        carnetDeConducirRepository.saveAndFlush(carnetDeConducir);

        int databaseSizeBeforeDelete = carnetDeConducirRepository.findAll().size();

        // Delete the carnetDeConducir
        restCarnetDeConducirMockMvc.perform(delete("/api/carnet-de-conducirs/{id}", carnetDeConducir.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CarnetDeConducir> carnetDeConducirList = carnetDeConducirRepository.findAll();
        assertThat(carnetDeConducirList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CarnetDeConducir.class);
        CarnetDeConducir carnetDeConducir1 = new CarnetDeConducir();
        carnetDeConducir1.setId(1L);
        CarnetDeConducir carnetDeConducir2 = new CarnetDeConducir();
        carnetDeConducir2.setId(carnetDeConducir1.getId());
        assertThat(carnetDeConducir1).isEqualTo(carnetDeConducir2);
        carnetDeConducir2.setId(2L);
        assertThat(carnetDeConducir1).isNotEqualTo(carnetDeConducir2);
        carnetDeConducir1.setId(null);
        assertThat(carnetDeConducir1).isNotEqualTo(carnetDeConducir2);
    }
}
