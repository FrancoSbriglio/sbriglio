package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.SbriglioApp;
import com.mycompany.myapp.domain.QR;
import com.mycompany.myapp.repository.QRRepository;
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
import org.springframework.util.Base64Utils;
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
 * Integration tests for the {@link QRResource} REST controller.
 */
@SpringBootTest(classes = SbriglioApp.class)
public class QRResourceIT {

    private static final String DEFAULT_CODIGO_QR = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO_QR = "BBBBBBBBBB";

    private static final ZonedDateTime DEFAULT_FECHA_FIN_QR = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_FIN_QR = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final ZonedDateTime SMALLER_FECHA_FIN_QR = ZonedDateTime.ofInstant(Instant.ofEpochMilli(-1L), ZoneOffset.UTC);

    private static final byte[] DEFAULT_FOTO_QR = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FOTO_QR = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FOTO_QR_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FOTO_QR_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_TIPO_VISIRA = "AAAAAAAAAA";
    private static final String UPDATED_TIPO_VISIRA = "BBBBBBBBBB";

    @Autowired
    private QRRepository qRRepository;

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

    private MockMvc restQRMockMvc;

    private QR qR;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final QRResource qRResource = new QRResource(qRRepository);
        this.restQRMockMvc = MockMvcBuilders.standaloneSetup(qRResource)
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
    public static QR createEntity(EntityManager em) {
        QR qR = new QR()
            .codigoQR(DEFAULT_CODIGO_QR)
            .fechaFinQR(DEFAULT_FECHA_FIN_QR)
            .fotoQR(DEFAULT_FOTO_QR)
            .fotoQRContentType(DEFAULT_FOTO_QR_CONTENT_TYPE)
            .tipoVisira(DEFAULT_TIPO_VISIRA);
        return qR;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static QR createUpdatedEntity(EntityManager em) {
        QR qR = new QR()
            .codigoQR(UPDATED_CODIGO_QR)
            .fechaFinQR(UPDATED_FECHA_FIN_QR)
            .fotoQR(UPDATED_FOTO_QR)
            .fotoQRContentType(UPDATED_FOTO_QR_CONTENT_TYPE)
            .tipoVisira(UPDATED_TIPO_VISIRA);
        return qR;
    }

    @BeforeEach
    public void initTest() {
        qR = createEntity(em);
    }

    @Test
    @Transactional
    public void createQR() throws Exception {
        int databaseSizeBeforeCreate = qRRepository.findAll().size();

        // Create the QR
        restQRMockMvc.perform(post("/api/qrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qR)))
            .andExpect(status().isCreated());

        // Validate the QR in the database
        List<QR> qRList = qRRepository.findAll();
        assertThat(qRList).hasSize(databaseSizeBeforeCreate + 1);
        QR testQR = qRList.get(qRList.size() - 1);
        assertThat(testQR.getCodigoQR()).isEqualTo(DEFAULT_CODIGO_QR);
        assertThat(testQR.getFechaFinQR()).isEqualTo(DEFAULT_FECHA_FIN_QR);
        assertThat(testQR.getFotoQR()).isEqualTo(DEFAULT_FOTO_QR);
        assertThat(testQR.getFotoQRContentType()).isEqualTo(DEFAULT_FOTO_QR_CONTENT_TYPE);
        assertThat(testQR.getTipoVisira()).isEqualTo(DEFAULT_TIPO_VISIRA);
    }

    @Test
    @Transactional
    public void createQRWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = qRRepository.findAll().size();

        // Create the QR with an existing ID
        qR.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQRMockMvc.perform(post("/api/qrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qR)))
            .andExpect(status().isBadRequest());

        // Validate the QR in the database
        List<QR> qRList = qRRepository.findAll();
        assertThat(qRList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllQRS() throws Exception {
        // Initialize the database
        qRRepository.saveAndFlush(qR);

        // Get all the qRList
        restQRMockMvc.perform(get("/api/qrs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(qR.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigoQR").value(hasItem(DEFAULT_CODIGO_QR.toString())))
            .andExpect(jsonPath("$.[*].fechaFinQR").value(hasItem(sameInstant(DEFAULT_FECHA_FIN_QR))))
            .andExpect(jsonPath("$.[*].fotoQRContentType").value(hasItem(DEFAULT_FOTO_QR_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fotoQR").value(hasItem(Base64Utils.encodeToString(DEFAULT_FOTO_QR))))
            .andExpect(jsonPath("$.[*].tipoVisira").value(hasItem(DEFAULT_TIPO_VISIRA.toString())));
    }
    
    @Test
    @Transactional
    public void getQR() throws Exception {
        // Initialize the database
        qRRepository.saveAndFlush(qR);

        // Get the qR
        restQRMockMvc.perform(get("/api/qrs/{id}", qR.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(qR.getId().intValue()))
            .andExpect(jsonPath("$.codigoQR").value(DEFAULT_CODIGO_QR.toString()))
            .andExpect(jsonPath("$.fechaFinQR").value(sameInstant(DEFAULT_FECHA_FIN_QR)))
            .andExpect(jsonPath("$.fotoQRContentType").value(DEFAULT_FOTO_QR_CONTENT_TYPE))
            .andExpect(jsonPath("$.fotoQR").value(Base64Utils.encodeToString(DEFAULT_FOTO_QR)))
            .andExpect(jsonPath("$.tipoVisira").value(DEFAULT_TIPO_VISIRA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQR() throws Exception {
        // Get the qR
        restQRMockMvc.perform(get("/api/qrs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQR() throws Exception {
        // Initialize the database
        qRRepository.saveAndFlush(qR);

        int databaseSizeBeforeUpdate = qRRepository.findAll().size();

        // Update the qR
        QR updatedQR = qRRepository.findById(qR.getId()).get();
        // Disconnect from session so that the updates on updatedQR are not directly saved in db
        em.detach(updatedQR);
        updatedQR
            .codigoQR(UPDATED_CODIGO_QR)
            .fechaFinQR(UPDATED_FECHA_FIN_QR)
            .fotoQR(UPDATED_FOTO_QR)
            .fotoQRContentType(UPDATED_FOTO_QR_CONTENT_TYPE)
            .tipoVisira(UPDATED_TIPO_VISIRA);

        restQRMockMvc.perform(put("/api/qrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQR)))
            .andExpect(status().isOk());

        // Validate the QR in the database
        List<QR> qRList = qRRepository.findAll();
        assertThat(qRList).hasSize(databaseSizeBeforeUpdate);
        QR testQR = qRList.get(qRList.size() - 1);
        assertThat(testQR.getCodigoQR()).isEqualTo(UPDATED_CODIGO_QR);
        assertThat(testQR.getFechaFinQR()).isEqualTo(UPDATED_FECHA_FIN_QR);
        assertThat(testQR.getFotoQR()).isEqualTo(UPDATED_FOTO_QR);
        assertThat(testQR.getFotoQRContentType()).isEqualTo(UPDATED_FOTO_QR_CONTENT_TYPE);
        assertThat(testQR.getTipoVisira()).isEqualTo(UPDATED_TIPO_VISIRA);
    }

    @Test
    @Transactional
    public void updateNonExistingQR() throws Exception {
        int databaseSizeBeforeUpdate = qRRepository.findAll().size();

        // Create the QR

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restQRMockMvc.perform(put("/api/qrs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(qR)))
            .andExpect(status().isBadRequest());

        // Validate the QR in the database
        List<QR> qRList = qRRepository.findAll();
        assertThat(qRList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteQR() throws Exception {
        // Initialize the database
        qRRepository.saveAndFlush(qR);

        int databaseSizeBeforeDelete = qRRepository.findAll().size();

        // Delete the qR
        restQRMockMvc.perform(delete("/api/qrs/{id}", qR.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<QR> qRList = qRRepository.findAll();
        assertThat(qRList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(QR.class);
        QR qR1 = new QR();
        qR1.setId(1L);
        QR qR2 = new QR();
        qR2.setId(qR1.getId());
        assertThat(qR1).isEqualTo(qR2);
        qR2.setId(2L);
        assertThat(qR1).isNotEqualTo(qR2);
        qR1.setId(null);
        assertThat(qR1).isNotEqualTo(qR2);
    }
}
