package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Vehiculo.
 */
@Entity
@Table(name = "vehiculo")
public class Vehiculo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dominio")
    private String dominio;

    @ManyToOne
    @JsonIgnoreProperties("vehiculos")
    private Marca vehiculoMarca;

    @ManyToOne
    @JsonIgnoreProperties("vehiculos")
    private Modelo vehiculoModelo;

    @ManyToOne
    @JsonIgnoreProperties("vehiculos")
    private Color vehiculoColor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDominio() {
        return dominio;
    }

    public Vehiculo dominio(String dominio) {
        this.dominio = dominio;
        return this;
    }

    public void setDominio(String dominio) {
        this.dominio = dominio;
    }

    public Marca getVehiculoMarca() {
        return vehiculoMarca;
    }

    public Vehiculo vehiculoMarca(Marca marca) {
        this.vehiculoMarca = marca;
        return this;
    }

    public void setVehiculoMarca(Marca marca) {
        this.vehiculoMarca = marca;
    }

    public Modelo getVehiculoModelo() {
        return vehiculoModelo;
    }

    public Vehiculo vehiculoModelo(Modelo modelo) {
        this.vehiculoModelo = modelo;
        return this;
    }

    public void setVehiculoModelo(Modelo modelo) {
        this.vehiculoModelo = modelo;
    }

    public Color getVehiculoColor() {
        return vehiculoColor;
    }

    public Vehiculo vehiculoColor(Color color) {
        this.vehiculoColor = color;
        return this;
    }

    public void setVehiculoColor(Color color) {
        this.vehiculoColor = color;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vehiculo)) {
            return false;
        }
        return id != null && id.equals(((Vehiculo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Vehiculo{" +
            "id=" + getId() +
            ", dominio='" + getDominio() + "'" +
            "}";
    }
}
