package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Persona.
 */
@Entity
@Table(name = "persona")
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_persona")
    private String nombrePersona;

    @Column(name = "apellido_persona")
    private String apellidoPersona;

    @Column(name = "dni_persona")
    private Integer dniPersona;

    @Column(name = "telefono_persona")
    private Long telefonoPersona;

    @ManyToOne
    @JsonIgnoreProperties("personas")
    private User personaUser;

    @ManyToOne
    @JsonIgnoreProperties("personas")
    private Barrio personabarrio;

    @ManyToMany
    @JoinTable(name = "persona_vehiculo",
               joinColumns = @JoinColumn(name = "persona_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "vehiculo_id", referencedColumnName = "id"))
    private Set<Vehiculo> vehiculos = new HashSet<>();

    @ManyToMany(mappedBy = "domiciliopersonas")
    @JsonIgnore
    private Set<Domicilio> personadomicilios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombrePersona() {
        return nombrePersona;
    }

    public Persona nombrePersona(String nombrePersona) {
        this.nombrePersona = nombrePersona;
        return this;
    }

    public void setNombrePersona(String nombrePersona) {
        this.nombrePersona = nombrePersona;
    }

    public String getApellidoPersona() {
        return apellidoPersona;
    }

    public Persona apellidoPersona(String apellidoPersona) {
        this.apellidoPersona = apellidoPersona;
        return this;
    }

    public void setApellidoPersona(String apellidoPersona) {
        this.apellidoPersona = apellidoPersona;
    }

    public Integer getDniPersona() {
        return dniPersona;
    }

    public Persona dniPersona(Integer dniPersona) {
        this.dniPersona = dniPersona;
        return this;
    }

    public void setDniPersona(Integer dniPersona) {
        this.dniPersona = dniPersona;
    }

    public Long getTelefonoPersona() {
        return telefonoPersona;
    }

    public Persona telefonoPersona(Long defaultTelefonoPersona) {
        this.telefonoPersona = defaultTelefonoPersona;
        return this;
    }

    public void setTelefonoPersona(Long telefonoPersona) {
        this.telefonoPersona = telefonoPersona;
    }

    public User getPersonaUser() {
        return personaUser;
    }

    public Persona personaUser(User user) {
        this.personaUser = user;
        return this;
    }

    public void setPersonaUser(User user) {
        this.personaUser = user;
    }

    public Barrio getPersonabarrio() {
        return personabarrio;
    }

    public Persona personabarrio(Barrio barrio) {
        this.personabarrio = barrio;
        return this;
    }

    public void setPersonabarrio(Barrio barrio) {
        this.personabarrio = barrio;
    }

    public Set<Vehiculo> getVehiculos() {
        return vehiculos;
    }

    public Persona vehiculos(Set<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
        return this;
    }

 
    public void setVehiculos(Set<Vehiculo> vehiculos) {
        this.vehiculos = vehiculos;
    }

    public Set<Domicilio> getPersonadomicilios() {
        return personadomicilios;
    }

    public Persona personadomicilios(Set<Domicilio> domicilios) {
        this.personadomicilios = domicilios;
        return this;
    }

    public Persona addPersonadomicilio(Domicilio domicilio) {
        this.personadomicilios.add(domicilio);
        domicilio.getDomiciliopersonas().add(this);
        return this;
    }

    public Persona removePersonadomicilio(Domicilio domicilio) {
        this.personadomicilios.remove(domicilio);
        domicilio.getDomiciliopersonas().remove(this);
        return this;
    }

    public void setPersonadomicilios(Set<Domicilio> domicilios) {
        this.personadomicilios = domicilios;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Persona)) {
            return false;
        }
        return id != null && id.equals(((Persona) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", nombrePersona='" + getNombrePersona() + "'" +
            ", apellidoPersona='" + getApellidoPersona() + "'" +
            ", dniPersona=" + getDniPersona() +
            ", telefonoPersona=" + getTelefonoPersona() +
            "}";
    }
}
