package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A EstadoPersona.
 */
@Entity
@Table(name = "estado_persona")
public class EstadoPersona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_estado_persona")
    private String nombreEstadoPersona;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEstadoPersona() {
        return nombreEstadoPersona;
    }

    public EstadoPersona nombreEstadoPersona(String nombreEstadoPersona) {
        this.nombreEstadoPersona = nombreEstadoPersona;
        return this;
    }

    public void setNombreEstadoPersona(String nombreEstadoPersona) {
        this.nombreEstadoPersona = nombreEstadoPersona;
    }

    public ZonedDateTime getFecha() {
        return fecha;
    }

    public EstadoPersona fecha(ZonedDateTime fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EstadoPersona)) {
            return false;
        }
        return id != null && id.equals(((EstadoPersona) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EstadoPersona{" +
            "id=" + getId() +
            ", nombreEstadoPersona='" + getNombreEstadoPersona() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
