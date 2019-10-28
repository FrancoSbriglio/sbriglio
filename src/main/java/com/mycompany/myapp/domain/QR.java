package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A QR.
 */
@Entity
@Table(name = "qr")
public class QR implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo_qr")
    private String codigoQR;

    @Column(name = "fecha_fin_qr")
    private ZonedDateTime fechaFinQR;

    @Lob
    @Column(name = "foto_qr")
    private byte[] fotoQR;

    @Column(name = "foto_qr_content_type")
    private String fotoQRContentType;

    @Column(name = "tipo_visira")
    private String tipoVisira;

    @ManyToOne
    @JsonIgnoreProperties("qRS")
    private Persona qrAutorizador;

    @ManyToOne
    @JsonIgnoreProperties("qRS")
    private Persona qrAutorizado;

    @ManyToOne
    @JsonIgnoreProperties("qRS")
    private Domicilio qrDomicilio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigoQR() {
        return codigoQR;
    }

    public QR codigoQR(String codigoQR) {
        this.codigoQR = codigoQR;
        return this;
    }

    public void setCodigoQR(String codigoQR) {
        this.codigoQR = codigoQR;
    }

    public ZonedDateTime getFechaFinQR() {
        return fechaFinQR;
    }

    public QR fechaFinQR(ZonedDateTime fechaFinQR) {
        this.fechaFinQR = fechaFinQR;
        return this;
    }

    public void setFechaFinQR(ZonedDateTime fechaFinQR) {
        this.fechaFinQR = fechaFinQR;
    }

    public byte[] getFotoQR() {
        return fotoQR;
    }

    public QR fotoQR(byte[] fotoQR) {
        this.fotoQR = fotoQR;
        return this;
    }

    public void setFotoQR(byte[] fotoQR) {
        this.fotoQR = fotoQR;
    }

    public String getFotoQRContentType() {
        return fotoQRContentType;
    }

    public QR fotoQRContentType(String fotoQRContentType) {
        this.fotoQRContentType = fotoQRContentType;
        return this;
    }

    public void setFotoQRContentType(String fotoQRContentType) {
        this.fotoQRContentType = fotoQRContentType;
    }

    public String getTipoVisira() {
        return tipoVisira;
    }

    public QR tipoVisira(String tipoVisira) {
        this.tipoVisira = tipoVisira;
        return this;
    }

    public void setTipoVisira(String tipoVisira) {
        this.tipoVisira = tipoVisira;
    }

    public Persona getQrAutorizador() {
        return qrAutorizador;
    }

    public QR qrAutorizador(Persona persona) {
        this.qrAutorizador = persona;
        return this;
    }

    public void setQrAutorizador(Persona persona) {
        this.qrAutorizador = persona;
    }

    public Persona getQrAutorizado() {
        return qrAutorizado;
    }

    public QR qrAutorizado(Persona persona) {
        this.qrAutorizado = persona;
        return this;
    }

    public void setQrAutorizado(Persona persona) {
        this.qrAutorizado = persona;
    }

    public Domicilio getQrDomicilio() {
        return qrDomicilio;
    }

    public QR qrDomicilio(Domicilio domicilio) {
        this.qrDomicilio = domicilio;
        return this;
    }

    public void setQrDomicilio(Domicilio domicilio) {
        this.qrDomicilio = domicilio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QR)) {
            return false;
        }
        return id != null && id.equals(((QR) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "QR{" +
            "id=" + getId() +
            ", codigoQR='" + getCodigoQR() + "'" +
            ", fechaFinQR='" + getFechaFinQR() + "'" +
            ", fotoQR='" + getFotoQR() + "'" +
            ", fotoQRContentType='" + getFotoQRContentType() + "'" +
            ", tipoVisira='" + getTipoVisira() + "'" +
            "}";
    }
}
