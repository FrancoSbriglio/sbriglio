package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Domicilio.
 */
@Entity
@Table(name = "domicilio")
public class Domicilio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "casa_domicilio")
    private String casaDomicilio;

    @Column(name = "depto_domicilio")
    private Integer deptoDomicilio;

    @Column(name = "manzana_domicilio")
    private String manzanaDomicilio;

    @Column(name = "piso_domicilio")
    private Integer pisoDomicilio;

    @ManyToMany
    @JoinTable(name = "domicilio_domiciliopersona",
               joinColumns = @JoinColumn(name = "domicilio_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "domiciliopersona_id", referencedColumnName = "id"))
    private Set<Persona> domiciliopersonas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCasaDomicilio() {
        return casaDomicilio;
    }

    public Domicilio casaDomicilio(String casaDomicilio) {
        this.casaDomicilio = casaDomicilio;
        return this;
    }

    public void setCasaDomicilio(String casaDomicilio) {
        this.casaDomicilio = casaDomicilio;
    }

    public Integer getDeptoDomicilio() {
        return deptoDomicilio;
    }

    public Domicilio deptoDomicilio(Integer deptoDomicilio) {
        this.deptoDomicilio = deptoDomicilio;
        return this;
    }

    public void setDeptoDomicilio(Integer deptoDomicilio) {
        this.deptoDomicilio = deptoDomicilio;
    }

    public String getManzanaDomicilio() {
        return manzanaDomicilio;
    }

    public Domicilio manzanaDomicilio(String manzanaDomicilio) {
        this.manzanaDomicilio = manzanaDomicilio;
        return this;
    }

    public void setManzanaDomicilio(String manzanaDomicilio) {
        this.manzanaDomicilio = manzanaDomicilio;
    }

    public Integer getPisoDomicilio() {
        return pisoDomicilio;
    }

    public Domicilio pisoDomicilio(Integer pisoDomicilio) {
        this.pisoDomicilio = pisoDomicilio;
        return this;
    }

    public void setPisoDomicilio(Integer pisoDomicilio) {
        this.pisoDomicilio = pisoDomicilio;
    }

    public Set<Persona> getDomiciliopersonas() {
        return domiciliopersonas;
    }

    public Domicilio domiciliopersonas(Set<Persona> personas) {
        this.domiciliopersonas = personas;
        return this;
    }

    public Domicilio addDomiciliopersona(Persona persona) {
        this.domiciliopersonas.add(persona);
        persona.getPersonadomicilios().add(this);
        return this;
    }

    public Domicilio removeDomiciliopersona(Persona persona) {
        this.domiciliopersonas.remove(persona);
        persona.getPersonadomicilios().remove(this);
        return this;
    }

    public void setDomiciliopersonas(Set<Persona> personas) {
        this.domiciliopersonas = personas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Domicilio)) {
            return false;
        }
        return id != null && id.equals(((Domicilio) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Domicilio{" +
            "id=" + getId() +
            ", casaDomicilio='" + getCasaDomicilio() + "'" +
            ", deptoDomicilio=" + getDeptoDomicilio() +
            ", manzanaDomicilio='" + getManzanaDomicilio() + "'" +
            ", pisoDomicilio=" + getPisoDomicilio() +
            "}";
    }
}
