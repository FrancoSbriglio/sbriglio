package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A CarnetDeConducir.
 */
@Entity
@Table(name = "carnet_de_conducir")
public class CarnetDeConducir implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "fecha_otorgamiento")
    private ZonedDateTime fechaOtorgamiento;

    @Column(name = "fecha_vencimiento")
    private ZonedDateTime fechaVencimiento;

    @ManyToOne
    @JsonIgnoreProperties("carnetDeConducirs")
    private Persona carnetPersona;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategoria() {
        return categoria;
    }

    public CarnetDeConducir categoria(String categoria) {
        this.categoria = categoria;
        return this;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public ZonedDateTime getFechaOtorgamiento() {
        return fechaOtorgamiento;
    }

    public CarnetDeConducir fechaOtorgamiento(ZonedDateTime fechaOtorgamiento) {
        this.fechaOtorgamiento = fechaOtorgamiento;
        return this;
    }

    public void setFechaOtorgamiento(ZonedDateTime fechaOtorgamiento) {
        this.fechaOtorgamiento = fechaOtorgamiento;
    }

    public ZonedDateTime getFechaVencimiento() {
        return fechaVencimiento;
    }

    public CarnetDeConducir fechaVencimiento(ZonedDateTime fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
        return this;
    }

    public void setFechaVencimiento(ZonedDateTime fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public Persona getCarnetPersona() {
        return carnetPersona;
    }

    public CarnetDeConducir carnetPersona(Persona persona) {
        this.carnetPersona = persona;
        return this;
    }

    public void setCarnetPersona(Persona persona) {
        this.carnetPersona = persona;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CarnetDeConducir)) {
            return false;
        }
        return id != null && id.equals(((CarnetDeConducir) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "CarnetDeConducir{" +
            "id=" + getId() +
            ", categoria='" + getCategoria() + "'" +
            ", fechaOtorgamiento='" + getFechaOtorgamiento() + "'" +
            ", fechaVencimiento='" + getFechaVencimiento() + "'" +
            "}";
    }
}
