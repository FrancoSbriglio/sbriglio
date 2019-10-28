package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Barrio.
 */
@Entity
@Table(name = "barrio")
public class Barrio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_barrio")
    private String nombreBarrio;

    @Column(name = "cuit_barrio")
    private Integer cuitBarrio;

    @ManyToOne
    @JsonIgnoreProperties("barrios")
    private NormaBarrio barrioNorma;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreBarrio() {
        return nombreBarrio;
    }

    public Barrio nombreBarrio(String nombreBarrio) {
        this.nombreBarrio = nombreBarrio;
        return this;
    }

    public void setNombreBarrio(String nombreBarrio) {
        this.nombreBarrio = nombreBarrio;
    }

    public Integer getCuitBarrio() {
        return cuitBarrio;
    }

    public Barrio cuitBarrio(Integer cuitBarrio) {
        this.cuitBarrio = cuitBarrio;
        return this;
    }

    public void setCuitBarrio(Integer cuitBarrio) {
        this.cuitBarrio = cuitBarrio;
    }

    public NormaBarrio getBarrioNorma() {
        return barrioNorma;
    }

    public Barrio barrioNorma(NormaBarrio normaBarrio) {
        this.barrioNorma = normaBarrio;
        return this;
    }

    public void setBarrioNorma(NormaBarrio normaBarrio) {
        this.barrioNorma = normaBarrio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Barrio)) {
            return false;
        }
        return id != null && id.equals(((Barrio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Barrio{" +
            "id=" + getId() +
            ", nombreBarrio='" + getNombreBarrio() + "'" +
            ", cuitBarrio=" + getCuitBarrio() +
            "}";
    }
}
