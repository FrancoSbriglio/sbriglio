package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A NormaBarrio.
 */
@Entity
@Table(name = "norma_barrio")
public class NormaBarrio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "titulonorma")
    private String titulonorma;

    @Column(name = "descripcionnorma")
    private String descripcionnorma;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulonorma() {
        return titulonorma;
    }

    public NormaBarrio titulonorma(String titulonorma) {
        this.titulonorma = titulonorma;
        return this;
    }

    public void setTitulonorma(String titulonorma) {
        this.titulonorma = titulonorma;
    }

    public String getDescripcionnorma() {
        return descripcionnorma;
    }

    public NormaBarrio descripcionnorma(String descripcionnorma) {
        this.descripcionnorma = descripcionnorma;
        return this;
    }

    public void setDescripcionnorma(String descripcionnorma) {
        this.descripcionnorma = descripcionnorma;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NormaBarrio)) {
            return false;
        }
        return id != null && id.equals(((NormaBarrio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "NormaBarrio{" +
            "id=" + getId() +
            ", titulonorma='" + getTitulonorma() + "'" +
            ", descripcionnorma='" + getDescripcionnorma() + "'" +
            "}";
    }
}
