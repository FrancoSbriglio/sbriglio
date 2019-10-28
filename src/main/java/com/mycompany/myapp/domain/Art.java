package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Art.
 */
@Entity
@Table(name = "art")
public class Art implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_vencimiento_art")
    private ZonedDateTime fechaVencimientoArt;

    @ManyToOne
    @JsonIgnoreProperties("arts")
    private Persona artDersona;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaVencimientoArt() {
        return fechaVencimientoArt;
    }

    public Art fechaVencimientoArt(ZonedDateTime fechaVencimientoArt) {
        this.fechaVencimientoArt = fechaVencimientoArt;
        return this;
    }

    public void setFechaVencimientoArt(ZonedDateTime fechaVencimientoArt) {
        this.fechaVencimientoArt = fechaVencimientoArt;
    }

    public Persona getArtDersona() {
        return artDersona;
    }

    public Art artDersona(Persona persona) {
        this.artDersona = persona;
        return this;
    }

    public void setArtDersona(Persona persona) {
        this.artDersona = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Art)) {
            return false;
        }
        return id != null && id.equals(((Art) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Art{" +
            "id=" + getId() +
            ", fechaVencimientoArt='" + getFechaVencimientoArt() + "'" +
            "}";
    }
}
