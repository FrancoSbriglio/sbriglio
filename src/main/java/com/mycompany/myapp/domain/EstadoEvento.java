package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A EstadoEvento.
 */
@Entity
@Table(name = "estado_evento")
public class EstadoEvento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_estado_evento")
    private String nombreEstadoEvento;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEstadoEvento() {
        return nombreEstadoEvento;
    }

    public EstadoEvento nombreEstadoEvento(String nombreEstadoEvento) {
        this.nombreEstadoEvento = nombreEstadoEvento;
        return this;
    }

    public void setNombreEstadoEvento(String nombreEstadoEvento) {
        this.nombreEstadoEvento = nombreEstadoEvento;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EstadoEvento)) {
            return false;
        }
        return id != null && id.equals(((EstadoEvento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EstadoEvento{" +
            "id=" + getId() +
            ", nombreEstadoEvento='" + getNombreEstadoEvento() + "'" +
            "}";
    }
}
