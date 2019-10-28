package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Seguro.
 */
@Entity
@Table(name = "seguro")
public class Seguro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_vencimiento_seguro")
    private ZonedDateTime fechaVencimientoSeguro;

    @ManyToOne
    @JsonIgnoreProperties("seguros")
    private Vehiculo seguroVehiculo;

    @ManyToOne
    @JsonIgnoreProperties("seguros")
    private Aseguradora seguroAseguradora;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaVencimientoSeguro() {
        return fechaVencimientoSeguro;
    }

    public Seguro fechaVencimientoSeguro(ZonedDateTime fechaVencimientoSeguro) {
        this.fechaVencimientoSeguro = fechaVencimientoSeguro;
        return this;
    }

    public void setFechaVencimientoSeguro(ZonedDateTime fechaVencimientoSeguro) {
        this.fechaVencimientoSeguro = fechaVencimientoSeguro;
    }

    public Vehiculo getSeguroVehiculo() {
        return seguroVehiculo;
    }

    public Seguro seguroVehiculo(Vehiculo vehiculo) {
        this.seguroVehiculo = vehiculo;
        return this;
    }

    public void setSeguroVehiculo(Vehiculo vehiculo) {
        this.seguroVehiculo = vehiculo;
    }

    public Aseguradora getSeguroAseguradora() {
        return seguroAseguradora;
    }

    public Seguro seguroAseguradora(Aseguradora aseguradora) {
        this.seguroAseguradora = aseguradora;
        return this;
    }

    public void setSeguroAseguradora(Aseguradora aseguradora) {
        this.seguroAseguradora = aseguradora;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Seguro)) {
            return false;
        }
        return id != null && id.equals(((Seguro) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Seguro{" +
            "id=" + getId() +
            ", fechaVencimientoSeguro='" + getFechaVencimientoSeguro() + "'" +
            "}";
    }
}
