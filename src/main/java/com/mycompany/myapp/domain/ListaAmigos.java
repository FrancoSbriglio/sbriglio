package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ListaAmigos.
 */
@Entity
@Table(name = "lista_amigos")
public class ListaAmigos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_lista_amigos")
    private String nombreListaAmigos;

    @ManyToOne
    @JsonIgnoreProperties("listaAmigos")
    private Persona pertenece;

    @ManyToMany
    @JoinTable(name = "lista_amigos_amigos",
               joinColumns = @JoinColumn(name = "lista_amigos_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "amigos_id", referencedColumnName = "id"))
    private Set<Persona> amigos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreListaAmigos() {
        return nombreListaAmigos;
    }

    public ListaAmigos nombreListaAmigos(String nombreListaAmigos) {
        this.nombreListaAmigos = nombreListaAmigos;
        return this;
    }

    public void setNombreListaAmigos(String nombreListaAmigos) {
        this.nombreListaAmigos = nombreListaAmigos;
    }

    public Persona getPertenece() {
        return pertenece;
    }

    public ListaAmigos pertenece(Persona persona) {
        this.pertenece = persona;
        return this;
    }

    public void setPertenece(Persona persona) {
        this.pertenece = persona;
    }

    public Set<Persona> getAmigos() {
        return amigos;
    }

    public ListaAmigos amigos(Set<Persona> personas) {
        this.amigos = personas;
        return this;
    }

   

    public void setAmigos(Set<Persona> personas) {
        this.amigos = personas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ListaAmigos)) {
            return false;
        }
        return id != null && id.equals(((ListaAmigos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ListaAmigos{" +
            "id=" + getId() +
            ", nombreListaAmigos='" + getNombreListaAmigos() + "'" +
            "}";
    }
}
