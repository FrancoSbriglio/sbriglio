package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Aseguradora.
 */
@Entity
@Table(name = "aseguradora")
public class Aseguradora implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_seguro")
    private String nombreSeguro;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreSeguro() {
        return nombreSeguro;
    }

    public Aseguradora nombreSeguro(String nombreSeguro) {
        this.nombreSeguro = nombreSeguro;
        return this;
    }

    public void setNombreSeguro(String nombreSeguro) {
        this.nombreSeguro = nombreSeguro;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aseguradora)) {
            return false;
        }
        return id != null && id.equals(((Aseguradora) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Aseguradora{" +
            "id=" + getId() +
            ", nombreSeguro='" + getNombreSeguro() + "'" +
            "}";
    }
}
