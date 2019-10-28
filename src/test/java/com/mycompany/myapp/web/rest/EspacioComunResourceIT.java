package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.EspacioComun;
import com.mycompany.myapp.repository.EspacioComunRepository;
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
import org.springframework.util.Base64Utils;
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
 * Integration tests for the {@link EspacioComunResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class EspacioComunResourceIT {

    private static final String DEFAULT_NOMBRE_ESPACIO_COMUN = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_ESPACIO_COMUN = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_DISPONIBILIDAD_DESDE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DISPONIBILIDAD_DESDE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DISPONIBILIDAD_DESDE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_DISPONIBILIDAD_HASTA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DISPONIBILIDAD_HASTA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_DISPONIBILIDAD_HASTA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final byte[] DEFAULT_FOTO_ESPACIO_COMUN = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOTO_ESPACIO_COMUN = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FOTO_ESPACIO_COMUN_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOTO_ESPACIO_COMUN_CONTENT_TYPE = "image/png";

    private static final ZonedDateTime DEFAULT_HORA_DESDE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA_DESDE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_HORA_DESDE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final ZonedDateTime DEFAULT_HORA_HASTA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA_HASTA = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_HORA_HASTA = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private EspacioComunRepository espacioComunRepository;

    @Mock
    private EspacioComunRepository espacioComunRepositoryMock;

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

    private MockMvc restEspacioComunMockMvc;

    private EspacioComun espacioComun;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EspacioComunResource espacioComunResource = new EspacioComunResource(espacioComunRepository);
        this.restEspacioComunMockMvc = MockMvcBuilders.standaloneSetup(espacioComunResource)
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
    public static EspacioComun createEntity(EntityManager em) {
        EspacioComun espacioComun = new EspacioComun()
            .nombreEspacioComun(DEFAULT_NOMBRE_ESPACIO_COMUN)
            .disponibilidadDesde(DEFAULT_DISPONIBILIDAD_DESDE)
            .disponibilidadHasta(DEFAULT_DISPONIBILIDAD_HASTA)
            .fotoEspacioComun(DEFAULT_FOTO_ESPACIO_COMUN)
            .fotoEspacioComunContentType(DEFAULT_FOTO_ESPACIO_COMUN_CONTENT_TYPE)
            .horaDesde(DEFAULT_HORA_DESDE)
            .horaHasta(DEFAULT_HORA_HASTA);
        return espacioComun;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static EspacioComun createUpdatedEntity(EntityManager em) {
        EspacioComun espacioComun = new EspacioComun()
            .nombreEspacioComun(UPDATED_NOMBRE_ESPACIO_COMUN)
            .disponibilidadDesde(UPDATED_DISPONIBILIDAD_DESDE)
            .disponibilidadHasta(UPDATED_DISPONIBILIDAD_HASTA)
            .fotoEspacioComun(UPDATED_FOTO_ESPACIO_COMUN)
            .fotoEspacioComunContentType(UPDATED_FOTO_ESPACIO_COMUN_CONTENT_TYPE)
            .horaDesde(UPDATED_HORA_DESDE)
            .horaHasta(UPDATED_HORA_HASTA);
        return espacioComun;
    }

    @BeforeEach
    public void initTest() {
        espacioComun = createEntity(em);
    }

    @Test
    @Transactional
    public void createEspacioComun() throws Exception {
        int databaseSizeBeforeCreate = espacioComunRepository.findAll().size();

        // Create the EspacioComun
        restEspacioComunMockMvc.perform(post("/api/espacio-comuns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espacioComun)))
            .andExpect(status().isCreated());

        // Validate the EspacioComun in the database
        List<EspacioComun> espacioComunList = espacioComunRepository.findAll();
        assertThat(espacioComunList).hasSize(databaseSizeBeforeCreate + 1);
        EspacioComun testEspacioComun = espacioComunList.get(espacioComunList.size() - 1);
        assertThat(testEspacioComun.getNombreEspacioComun()).isEqualTo(DEFAULT_NOMBRE_ESPACIO_COMUN);
        assertThat(testEspacioComun.getDisponibilidadDesde()).isEqualTo(DEFAULT_DISPONIBILIDAD_DESDE);
        assertThat(testEspacioComun.getDisponibilidadHasta()).isEqualTo(DEFAULT_DISPONIBILIDAD_HASTA);
        assertThat(testEspacioComun.getFotoEspacioComun()).isEqualTo(DEFAULT_FOTO_ESPACIO_COMUN);
        assertThat(testEspacioComun.getFotoEspacioComunContentType()).isEqualTo(DEFAULT_FOTO_ESPACIO_COMUN_CONTENT_TYPE);
        assertThat(testEspacioComun.getHoraDesde()).isEqualTo(DEFAULT_HORA_DESDE);
        assertThat(testEspacioComun.getHoraHasta()).isEqualTo(DEFAULT_HORA_HASTA);
    }

    @Test
    @Transactional
    public void createEspacioComunWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = espacioComunRepository.findAll().size();

        // Create the EspacioComun with an existing ID
        espacioComun.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEspacioComunMockMvc.perform(post("/api/espacio-comuns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espacioComun)))
            .andExpect(status().isBadRequest());

        // Validate the EspacioComun in the database
        List<EspacioComun> espacioComunList = espacioComunRepository.findAll();
        assertThat(espacioComunList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEspacioComuns() throws Exception {
        // Initialize the database
        espacioComunRepository.saveAndFlush(espacioComun);

        // Get all the espacioComunList
        restEspacioComunMockMvc.perform(get("/api/espacio-comuns?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(espacioComun.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreEspacioComun").value(hasItem(DEFAULT_NOMBRE_ESPACIO_COMUN.toString())))
            .andExpect(jsonPath("$.[*].disponibilidadDesde").value(hasItem(sameInstant(DEFAULT_DISPONIBILIDAD_DESDE))))
            .andExpect(jsonPath("$.[*].disponibilidadHasta").value(hasItem(sameInstant(DEFAULT_DISPONIBILIDAD_HASTA))))
            .andExpect(jsonPath("$.[*].fotoEspacioComunContentType").value(hasItem(DEFAULT_FOTO_ESPACIO_COMUN_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fotoEspacioComun").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO_ESPACIO_COMUN))))
            .andExpect(jsonPath("$.[*].horaDesde").value(hasItem(sameInstant(DEFAULT_HORA_DESDE))))
            .andExpect(jsonPath("$.[*].horaHasta").value(hasItem(sameInstant(DEFAULT_HORA_HASTA))));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllEspacioComunsWithEagerRelationshipsIsEnabled() throws Exception {
        EspacioComunResource espacioComunResource = new EspacioComunResource(espacioComunRepositoryMock);
        when(espacioComunRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restEspacioComunMockMvc = MockMvcBuilders.standaloneSetup(espacioComunResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEspacioComunMockMvc.perform(get("/api/espacio-comuns?eagerload=true"))
        .andExpect(status().isOk());

        verify(espacioComunRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllEspacioComunsWithEagerRelationshipsIsNotEnabled() throws Exception {
        EspacioComunResource espacioComunResource = new EspacioComunResource(espacioComunRepositoryMock);
            when(espacioComunRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restEspacioComunMockMvc = MockMvcBuilders.standaloneSetup(espacioComunResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restEspacioComunMockMvc.perform(get("/api/espacio-comuns?eagerload=true"))
        .andExpect(status().isOk());

            verify(espacioComunRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getEspacioComun() throws Exception {
        // Initialize the database
        espacioComunRepository.saveAndFlush(espacioComun);

        // Get the espacioComun
        restEspacioComunMockMvc.perform(get("/api/espacio-comuns/{id}", espacioComun.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(espacioComun.getId().intValue()))
            .andExpect(jsonPath("$.nombreEspacioComun").value(DEFAULT_NOMBRE_ESPACIO_COMUN.toString()))
            .andExpect(jsonPath("$.disponibilidadDesde").value(sameInstant(DEFAULT_DISPONIBILIDAD_DESDE)))
            .andExpect(jsonPath("$.disponibilidadHasta").value(sameInstant(DEFAULT_DISPONIBILIDAD_HASTA)))
            .andExpect(jsonPath("$.fotoEspacioComunContentType").value(DEFAULT_FOTO_ESPACIO_COMUN_CONTENT_TYPE))
            .andExpect(jsonPath("$.fotoEspacioComun").value(Base64Utils.encodeToString(DEFAULT_FOTO_ESPACIO_COMUN)))
            .andExpect(jsonPath("$.horaDesde").value(sameInstant(DEFAULT_HORA_DESDE)))
            .andExpect(jsonPath("$.horaHasta").value(sameInstant(DEFAULT_HORA_HASTA)));
    }

    @Test
    @Transactional
    public void getNonExistingEspacioComun() throws Exception {
        // Get the espacioComun
        restEspacioComunMockMvc.perform(get("/api/espacio-comuns/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEspacioComun() throws Exception {
        // Initialize the database
        espacioComunRepository.saveAndFlush(espacioComun);

        int databaseSizeBeforeUpdate = espacioComunRepository.findAll().size();

        // Update the espacioComun
        EspacioComun updatedEspacioComun = espacioComunRepository.findById(espacioComun.getId()).get();
        // Disconnect from session so that the updates on updatedEspacioComun are not directly saved in db
        em.detach(updatedEspacioComun);
        updatedEspacioComun
            .nombreEspacioComun(UPDATED_NOMBRE_ESPACIO_COMUN)
            .disponibilidadDesde(UPDATED_DISPONIBILIDAD_DESDE)
            .disponibilidadHasta(UPDATED_DISPONIBILIDAD_HASTA)
            .fotoEspacioComun(UPDATED_FOTO_ESPACIO_COMUN)
            .fotoEspacioComunContentType(UPDATED_FOTO_ESPACIO_COMUN_CONTENT_TYPE)
            .horaDesde(UPDATED_HORA_DESDE)
            .horaHasta(UPDATED_HORA_HASTA);

        restEspacioComunMockMvc.perform(put("/api/espacio-comuns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEspacioComun)))
            .andExpect(status().isOk());

        // Validate the EspacioComun in the database
        List<EspacioComun> espacioComunList = espacioComunRepository.findAll();
        assertThat(espacioComunList).hasSize(databaseSizeBeforeUpdate);
        EspacioComun testEspacioComun = espacioComunList.get(espacioComunList.size() - 1);
        assertThat(testEspacioComun.getNombreEspacioComun()).isEqualTo(UPDATED_NOMBRE_ESPACIO_COMUN);
        assertThat(testEspacioComun.getDisponibilidadDesde()).isEqualTo(UPDATED_DISPONIBILIDAD_DESDE);
        assertThat(testEspacioComun.getDisponibilidadHasta()).isEqualTo(UPDATED_DISPONIBILIDAD_HASTA);
        assertThat(testEspacioComun.getFotoEspacioComun()).isEqualTo(UPDATED_FOTO_ESPACIO_COMUN);
        assertThat(testEspacioComun.getFotoEspacioComunContentType()).isEqualTo(UPDATED_FOTO_ESPACIO_COMUN_CONTENT_TYPE);
        assertThat(testEspacioComun.getHoraDesde()).isEqualTo(UPDATED_HORA_DESDE);
        assertThat(testEspacioComun.getHoraHasta()).isEqualTo(UPDATED_HORA_HASTA);
    }

    @Test
    @Transactional
    public void updateNonExistingEspacioComun() throws Exception {
        int databaseSizeBeforeUpdate = espacioComunRepository.findAll().size();

        // Create the EspacioComun

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEspacioComunMockMvc.perform(put("/api/espacio-comuns")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(espacioComun)))
            .andExpect(status().isBadRequest());

        // Validate the EspacioComun in the database
        List<EspacioComun> espacioComunList = espacioComunRepository.findAll();
        assertThat(espacioComunList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEspacioComun() throws Exception {
        // Initialize the database
        espacioComunRepository.saveAndFlush(espacioComun);

        int databaseSizeBeforeDelete = espacioComunRepository.findAll().size();

        // Delete the espacioComun
        restEspacioComunMockMvc.perform(delete("/api/espacio-comuns/{id}", espacioComun.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<EspacioComun> espacioComunList = espacioComunRepository.findAll();
        assertThat(espacioComunList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(EspacioComun.class);
        EspacioComun espacioComun1 = new EspacioComun();
        espacioComun1.setId(1L);
        EspacioComun espacioComun2 = new EspacioComun();
        espacioComun2.setId(espacioComun1.getId());
        assertThat(espacioComun1).isEqualTo(espacioComun2);
        espacioComun2.setId(2L);
        assertThat(espacioComun1).isNotEqualTo(espacioComun2);
        espacioComun1.setId(null);
        assertThat(espacioComun1).isNotEqualTo(espacioComun2);
    }
}
