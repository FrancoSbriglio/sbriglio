package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.ListaAmigos;
import com.mycompany.myapp.repository.ListaAmigosRepository;
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
 * Integration tests for the {@link ListaAmigosResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class ListaAmigosResourceIT {

    private static final String DEFAULT_NOMBRE_LISTA_AMIGOS = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_LISTA_AMIGOS = "BBBBBBBBBB";

    @Autowired
    private ListaAmigosRepository listaAmigosRepository;

    @Mock
    private ListaAmigosRepository listaAmigosRepositoryMock;

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

    private MockMvc restListaAmigosMockMvc;

    private ListaAmigos listaAmigos;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ListaAmigosResource listaAmigosResource = new ListaAmigosResource(listaAmigosRepository);
        this.restListaAmigosMockMvc = MockMvcBuilders.standaloneSetup(listaAmigosResource)
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
    public static ListaAmigos createEntity(EntityManager em) {
        ListaAmigos listaAmigos = new ListaAmigos()
            .nombreListaAmigos(DEFAULT_NOMBRE_LISTA_AMIGOS);
        return listaAmigos;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ListaAmigos createUpdatedEntity(EntityManager em) {
        ListaAmigos listaAmigos = new ListaAmigos()
            .nombreListaAmigos(UPDATED_NOMBRE_LISTA_AMIGOS);
        return listaAmigos;
    }

    @BeforeEach
    public void initTest() {
        listaAmigos = createEntity(em);
    }

    @Test
    @Transactional
    public void createListaAmigos() throws Exception {
        int databaseSizeBeforeCreate = listaAmigosRepository.findAll().size();

        // Create the ListaAmigos
        restListaAmigosMockMvc.perform(post("/api/lista-amigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaAmigos)))
            .andExpect(status().isCreated());

        // Validate the ListaAmigos in the database
        List<ListaAmigos> listaAmigosList = listaAmigosRepository.findAll();
        assertThat(listaAmigosList).hasSize(databaseSizeBeforeCreate + 1);
        ListaAmigos testListaAmigos = listaAmigosList.get(listaAmigosList.size() - 1);
        assertThat(testListaAmigos.getNombreListaAmigos()).isEqualTo(DEFAULT_NOMBRE_LISTA_AMIGOS);
    }

    @Test
    @Transactional
    public void createListaAmigosWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = listaAmigosRepository.findAll().size();

        // Create the ListaAmigos with an existing ID
        listaAmigos.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restListaAmigosMockMvc.perform(post("/api/lista-amigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaAmigos)))
            .andExpect(status().isBadRequest());

        // Validate the ListaAmigos in the database
        List<ListaAmigos> listaAmigosList = listaAmigosRepository.findAll();
        assertThat(listaAmigosList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllListaAmigos() throws Exception {
        // Initialize the database
        listaAmigosRepository.saveAndFlush(listaAmigos);

        // Get all the listaAmigosList
        restListaAmigosMockMvc.perform(get("/api/lista-amigos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(listaAmigos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreListaAmigos").value(hasItem(DEFAULT_NOMBRE_LISTA_AMIGOS.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllListaAmigosWithEagerRelationshipsIsEnabled() throws Exception {
        ListaAmigosResource listaAmigosResource = new ListaAmigosResource(listaAmigosRepositoryMock);
        when(listaAmigosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restListaAmigosMockMvc = MockMvcBuilders.standaloneSetup(listaAmigosResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restListaAmigosMockMvc.perform(get("/api/lista-amigos?eagerload=true"))
        .andExpect(status().isOk());

        verify(listaAmigosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllListaAmigosWithEagerRelationshipsIsNotEnabled() throws Exception {
        ListaAmigosResource listaAmigosResource = new ListaAmigosResource(listaAmigosRepositoryMock);
            when(listaAmigosRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restListaAmigosMockMvc = MockMvcBuilders.standaloneSetup(listaAmigosResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restListaAmigosMockMvc.perform(get("/api/lista-amigos?eagerload=true"))
        .andExpect(status().isOk());

            verify(listaAmigosRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getListaAmigos() throws Exception {
        // Initialize the database
        listaAmigosRepository.saveAndFlush(listaAmigos);

        // Get the listaAmigos
        restListaAmigosMockMvc.perform(get("/api/lista-amigos/{id}", listaAmigos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(listaAmigos.getId().intValue()))
            .andExpect(jsonPath("$.nombreListaAmigos").value(DEFAULT_NOMBRE_LISTA_AMIGOS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingListaAmigos() throws Exception {
        // Get the listaAmigos
        restListaAmigosMockMvc.perform(get("/api/lista-amigos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateListaAmigos() throws Exception {
        // Initialize the database
        listaAmigosRepository.saveAndFlush(listaAmigos);

        int databaseSizeBeforeUpdate = listaAmigosRepository.findAll().size();

        // Update the listaAmigos
        ListaAmigos updatedListaAmigos = listaAmigosRepository.findById(listaAmigos.getId()).get();
        // Disconnect from session so that the updates on updatedListaAmigos are not directly saved in db
        em.detach(updatedListaAmigos);
        updatedListaAmigos
            .nombreListaAmigos(UPDATED_NOMBRE_LISTA_AMIGOS);

        restListaAmigosMockMvc.perform(put("/api/lista-amigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedListaAmigos)))
            .andExpect(status().isOk());

        // Validate the ListaAmigos in the database
        List<ListaAmigos> listaAmigosList = listaAmigosRepository.findAll();
        assertThat(listaAmigosList).hasSize(databaseSizeBeforeUpdate);
        ListaAmigos testListaAmigos = listaAmigosList.get(listaAmigosList.size() - 1);
        assertThat(testListaAmigos.getNombreListaAmigos()).isEqualTo(UPDATED_NOMBRE_LISTA_AMIGOS);
    }

    @Test
    @Transactional
    public void updateNonExistingListaAmigos() throws Exception {
        int databaseSizeBeforeUpdate = listaAmigosRepository.findAll().size();

        // Create the ListaAmigos

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restListaAmigosMockMvc.perform(put("/api/lista-amigos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(listaAmigos)))
            .andExpect(status().isBadRequest());

        // Validate the ListaAmigos in the database
        List<ListaAmigos> listaAmigosList = listaAmigosRepository.findAll();
        assertThat(listaAmigosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteListaAmigos() throws Exception {
        // Initialize the database
        listaAmigosRepository.saveAndFlush(listaAmigos);

        int databaseSizeBeforeDelete = listaAmigosRepository.findAll().size();

        // Delete the listaAmigos
        restListaAmigosMockMvc.perform(delete("/api/lista-amigos/{id}", listaAmigos.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ListaAmigos> listaAmigosList = listaAmigosRepository.findAll();
        assertThat(listaAmigosList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ListaAmigos.class);
        ListaAmigos listaAmigos1 = new ListaAmigos();
        listaAmigos1.setId(1L);
        ListaAmigos listaAmigos2 = new ListaAmigos();
        listaAmigos2.setId(listaAmigos1.getId());
        assertThat(listaAmigos1).isEqualTo(listaAmigos2);
        listaAmigos2.setId(2L);
        assertThat(listaAmigos1).isNotEqualTo(listaAmigos2);
        listaAmigos1.setId(null);
        assertThat(listaAmigos1).isNotEqualTo(listaAmigos2);
    }
}
