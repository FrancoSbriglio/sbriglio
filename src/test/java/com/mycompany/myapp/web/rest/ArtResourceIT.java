package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.Art;
import com.mycompany.myapp.repository.ArtRepository;
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
 * Integration tests for the {@link ArtResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class ArtResourceIT {

    private static final ZonedDateTime DEFAULT_FECHA_VENCIMIENTO_ART = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_VENCIMIENTO_ART = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA_VENCIMIENTO_ART = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    @Autowired
    private ArtRepository artRepository;

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

    private MockMvc restArtMockMvc;

    private Art art;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ArtResource artResource = new ArtResource(artRepository);
        this.restArtMockMvc = MockMvcBuilders.standaloneSetup(artResource)
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
    public static Art createEntity(EntityManager em) {
        Art art = new Art()
            .fechaVencimientoArt(DEFAULT_FECHA_VENCIMIENTO_ART);
        return art;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Art createUpdatedEntity(EntityManager em) {
        Art art = new Art()
            .fechaVencimientoArt(UPDATED_FECHA_VENCIMIENTO_ART);
        return art;
    }

    @BeforeEach
    public void initTest() {
        art = createEntity(em);
    }

    @Test
    @Transactional
    public void createArt() throws Exception {
        int databaseSizeBeforeCreate = artRepository.findAll().size();

        // Create the Art
        restArtMockMvc.perform(post("/api/arts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(art)))
            .andExpect(status().isCreated());

        // Validate the Art in the database
        List<Art> artList = artRepository.findAll();
        assertThat(artList).hasSize(databaseSizeBeforeCreate + 1);
        Art testArt = artList.get(artList.size() - 1);
        assertThat(testArt.getFechaVencimientoArt()).isEqualTo(DEFAULT_FECHA_VENCIMIENTO_ART);
    }

    @Test
    @Transactional
    public void createArtWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = artRepository.findAll().size();

        // Create the Art with an existing ID
        art.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restArtMockMvc.perform(post("/api/arts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(art)))
            .andExpect(status().isBadRequest());

        // Validate the Art in the database
        List<Art> artList = artRepository.findAll();
        assertThat(artList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllArts() throws Exception {
        // Initialize the database
        artRepository.saveAndFlush(art);

        // Get all the artList
        restArtMockMvc.perform(get("/api/arts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(art.getId().intValue())))
            .andExpect(jsonPath("$.[*].fechaVencimientoArt").value(hasItem(sameInstant(DEFAULT_FECHA_VENCIMIENTO_ART))));
    }
    
    @Test
    @Transactional
    public void getArt() throws Exception {
        // Initialize the database
        artRepository.saveAndFlush(art);

        // Get the art
        restArtMockMvc.perform(get("/api/arts/{id}", art.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(art.getId().intValue()))
            .andExpect(jsonPath("$.fechaVencimientoArt").value(sameInstant(DEFAULT_FECHA_VENCIMIENTO_ART)));
    }

    @Test
    @Transactional
    public void getNonExistingArt() throws Exception {
        // Get the art
        restArtMockMvc.perform(get("/api/arts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateArt() throws Exception {
        // Initialize the database
        artRepository.saveAndFlush(art);

        int databaseSizeBeforeUpdate = artRepository.findAll().size();

        // Update the art
        Art updatedArt = artRepository.findById(art.getId()).get();
        // Disconnect from session so that the updates on updatedArt are not directly saved in db
        em.detach(updatedArt);
        updatedArt
            .fechaVencimientoArt(UPDATED_FECHA_VENCIMIENTO_ART);

        restArtMockMvc.perform(put("/api/arts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedArt)))
            .andExpect(status().isOk());

        // Validate the Art in the database
        List<Art> artList = artRepository.findAll();
        assertThat(artList).hasSize(databaseSizeBeforeUpdate);
        Art testArt = artList.get(artList.size() - 1);
        assertThat(testArt.getFechaVencimientoArt()).isEqualTo(UPDATED_FECHA_VENCIMIENTO_ART);
    }

    @Test
    @Transactional
    public void updateNonExistingArt() throws Exception {
        int databaseSizeBeforeUpdate = artRepository.findAll().size();

        // Create the Art

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restArtMockMvc.perform(put("/api/arts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(art)))
            .andExpect(status().isBadRequest());

        // Validate the Art in the database
        List<Art> artList = artRepository.findAll();
        assertThat(artList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteArt() throws Exception {
        // Initialize the database
        artRepository.saveAndFlush(art);

        int databaseSizeBeforeDelete = artRepository.findAll().size();

        // Delete the art
        restArtMockMvc.perform(delete("/api/arts/{id}", art.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Art> artList = artRepository.findAll();
        assertThat(artList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Art.class);
        Art art1 = new Art();
        art1.setId(1L);
        Art art2 = new Art();
        art2.setId(art1.getId());
        assertThat(art1).isEqualTo(art2);
        art2.setId(2L);
        assertThat(art1).isNotEqualTo(art2);
        art1.setId(null);
        assertThat(art1).isNotEqualTo(art2);
    }
}
