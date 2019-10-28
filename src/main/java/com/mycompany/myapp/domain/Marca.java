package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Marca.
 */
@Entity
@Table(name = "marca")
public class Marca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_marca")
    private String nombreMarca;

    @ManyToMany
    @JoinTable(name = "marca_modelo",
               joinColumns = @JoinColumn(name = "marca_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "modelo_id", referencedColumnName = "id"))
    private Set<Modelo> modelos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreMarca() {
        return nombreMarca;
    }

    public Marca nombreMarca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
        return this;
    }

    public void setNombreMarca(String nombreMarca) {
        this.nombreMarca = nombreMarca;
    }

    public Set<Modelo> getModelos() {
        return modelos;
    }

    public Marca modelos(Set<Modelo> modelos) {
        this.modelos = modelos;
        return this;
    }

  
    public void setModelos(Set<Modelo> modelos) {
        this.modelos = modelos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Marca)) {
            return false;
        }
        return id != null && id.equals(((Marca) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Marca{" +
            "id=" + getId() +
            ", nombreMarca='" + getNombreMarca() + "'" +
            "}";
    }
}
