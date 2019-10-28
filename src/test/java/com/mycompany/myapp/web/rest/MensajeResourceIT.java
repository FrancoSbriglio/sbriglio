package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.Mensaje;
import com.mycompany.myapp.repository.MensajeRepository;
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
 * Integration tests for the {@link MensajeResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class MensajeResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA_HORA_MENSAJE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_HORA_MENSAJE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA_HORA_MENSAJE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final String DEFAULT_DESCRIPCION_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION_MENSAJE = "BBBBBBBBBB";

    private static final String DEFAULT_ESTADO_MENSAJE = "AAAAAAAAAA";
    private static final String UPDATED_ESTADO_MENSAJE = "BBBBBBBBBB";

    @Autowired
    private MensajeRepository mensajeRepository;

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

    private MockMvc restMensajeMockMvc;

    private Mensaje mensaje;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MensajeResource mensajeResource = new MensajeResource(mensajeRepository);
        this.restMensajeMockMvc = MockMvcBuilders.standaloneSetup(mensajeResource)
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
    public static Mensaje createEntity(EntityManager em) {
        Mensaje mensaje = new Mensaje()
            .fechaHoraMensaje(DEFAULT_FECHA_HORA_MENSAJE)
            .descripcionMensaje(DEFAULT_DESCRIPCION_MENSAJE)
            .estadoMensaje(DEFAULT_ESTADO_MENSAJE);
        return mensaje;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mensaje createUpdatedEntity(EntityManager em) {
        Mensaje mensaje = new Mensaje()
            .fechaHoraMensaje(UPDATED_FECHA_HORA_MENSAJE)
            .descripcionMensaje(UPDATED_DESCRIPCION_MENSAJE)
            .estadoMensaje(UPDATED_ESTADO_MENSAJE);
        return mensaje;
    }

    @BeforeEach
    public void initTest() {
        mensaje = createEntity(em);
    }

    @Test
    @Transactional
    public void createMensaje() throws Exception {
        int databaseSizeBeforeCreate = mensajeRepository.findAll().size();

        // Create the Mensaje
        restMensajeMockMvc.perform(post("/api/mensajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensaje)))
            .andExpect(status().isCreated());

        // Validate the Mensaje in the database
        List<Mensaje> mensajeList = mensajeRepository.findAll();
        assertThat(mensajeList).hasSize(databaseSizeBeforeCreate + 1);
        Mensaje testMensaje = mensajeList.get(mensajeList.size() - 1);
        assertThat(testMensaje.getFechaHoraMensaje()).isEqualTo(DEFAULT_FECHA_HORA_MENSAJE);
        assertThat(testMensaje.getDescripcionMensaje()).isEqualTo(DEFAULT_DESCRIPCION_MENSAJE);
        assertThat(testMensaje.getEstadoMensaje()).isEqualTo(DEFAULT_ESTADO_MENSAJE);
    }

    @Test
    @Transactional
    public void createMensajeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mensajeRepository.findAll().size();

        // Create the Mensaje with an existing ID
        mensaje.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMensajeMockMvc.perform(post("/api/mensajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensaje)))
            .andExpect(status().isBadRequest());

        // Validate the Mensaje in the database
        List<Mensaje> mensajeList = mensajeRepository.findAll();
        assertThat(mensajeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMensajes() throws Exception {
        // Initialize the database
        mensajeRepository.saveAndFlush(mensaje);

        // Get all the mensajeList
        restMensajeMockMvc.perform(get("/api/mensajes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mensaje.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaHoraMensaje").value(hasItem(sameInstant(DEFAULT_FECHA_HORA_MENSAJE))))
            .andExpect(jsonPath("$.[*].descripcionMensaje").value(hasItem(DEFAULT_DESCRIPCION_MENSAJE.toString())))
            .andExpect(jsonPath("$.[*].estadoMensaje").value(hasItem(DEFAULT_ESTADO_MENSAJE.toString())));
    }
    
    @Test
    @Transactional
    public void getMensaje() throws Exception {
        // Initialize the database
        mensajeRepository.saveAndFlush(mensaje);

        // Get the mensaje
        restMensajeMockMvc.perform(get("/api/mensajes/{id}", mensaje.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mensaje.getId().intValue()))
            .andExpect(jsonPath("$.fechaHoraMensaje").value(sameInstant(DEFAULT_FECHA_HORA_MENSAJE)))
            .andExpect(jsonPath("$.descripcionMensaje").value(DEFAULT_DESCRIPCION_MENSAJE.toString()))
            .andExpect(jsonPath("$.estadoMensaje").value(DEFAULT_ESTADO_MENSAJE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingMensaje() throws Exception {
        // Get the mensaje
        restMensajeMockMvc.perform(get("/api/mensajes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMensaje() throws Exception {
        // Initialize the database
        mensajeRepository.saveAndFlush(mensaje);

        int databaseSizeBeforeUpdate = mensajeRepository.findAll().size();

        // Update the mensaje
        Mensaje updatedMensaje = mensajeRepository.findById(mensaje.getId()).get();
        // Disconnect from session so that the updates on updatedMensaje are not directly saved in db
        em.detach(updatedMensaje);
        updatedMensaje
            .fechaHoraMensaje(UPDATED_FECHA_HORA_MENSAJE)
            .descripcionMensaje(UPDATED_DESCRIPCION_MENSAJE)
            .estadoMensaje(UPDATED_ESTADO_MENSAJE);

        restMensajeMockMvc.perform(put("/api/mensajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMensaje)))
            .andExpect(status().isOk());

        // Validate the Mensaje in the database
        List<Mensaje> mensajeList = mensajeRepository.findAll();
        assertThat(mensajeList).hasSize(databaseSizeBeforeUpdate);
        Mensaje testMensaje = mensajeList.get(mensajeList.size() - 1);
        assertThat(testMensaje.getFechaHoraMensaje()).isEqualTo(UPDATED_FECHA_HORA_MENSAJE);
        assertThat(testMensaje.getDescripcionMensaje()).isEqualTo(UPDATED_DESCRIPCION_MENSAJE);
        assertThat(testMensaje.getEstadoMensaje()).isEqualTo(UPDATED_ESTADO_MENSAJE);
    }

    @Test
    @Transactional
    public void updateNonExistingMensaje() throws Exception {
        int databaseSizeBeforeUpdate = mensajeRepository.findAll().size();

        // Create the Mensaje

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMensajeMockMvc.perform(put("/api/mensajes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mensaje)))
            .andExpect(status().isBadRequest());

        // Validate the Mensaje in the database
        List<Mensaje> mensajeList = mensajeRepository.findAll();
        assertThat(mensajeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMensaje() throws Exception {
        // Initialize the database
        mensajeRepository.saveAndFlush(mensaje);

        int databaseSizeBeforeDelete = mensajeRepository.findAll().size();

        // Delete the mensaje
        restMensajeMockMvc.perform(delete("/api/mensajes/{id}", mensaje.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mensaje> mensajeList = mensajeRepository.findAll();
        assertThat(mensajeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mensaje.class);
        Mensaje mensaje1 = new Mensaje();
        mensaje1.setId(1L);
        Mensaje mensaje2 = new Mensaje();
        mensaje2.setId(mensaje1.getId());
        assertThat(mensaje1).isEqualTo(mensaje2);
        mensaje2.setId(2L);
        assertThat(mensaje1).isNotEqualTo(mensaje2);
        mensaje1.setId(null);
        assertThat(mensaje1).isNotEqualTo(mensaje2);
    }
}
