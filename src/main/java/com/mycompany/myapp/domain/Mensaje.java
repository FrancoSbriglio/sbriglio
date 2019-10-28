package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Mensaje.
 */
@Entity
@Table(name = "mensaje")
public class Mensaje implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_hora_mensaje")
    private ZonedDateTime fechaHoraMensaje;

    @Column(name = "descripcion_mensaje")
    private String descripcionMensaje;

    @Column(name = "estado_mensaje")
    private String estadoMensaje;

    @ManyToOne
    @JsonIgnoreProperties("mensajes")
    private User userDestino;

    @ManyToOne
    @JsonIgnoreProperties("mensajes")
    private User userOrigen;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaHoraMensaje() {
        return fechaHoraMensaje;
    }

    public Mensaje fechaHoraMensaje(ZonedDateTime fechaHoraMensaje) {
        this.fechaHoraMensaje = fechaHoraMensaje;
        return this;
    }

    public void setFechaHoraMensaje(ZonedDateTime fechaHoraMensaje) {
        this.fechaHoraMensaje = fechaHoraMensaje;
    }

    public String getDescripcionMensaje() {
        return descripcionMensaje;
    }

    public Mensaje descripcionMensaje(String descripcionMensaje) {
        this.descripcionMensaje = descripcionMensaje;
        return this;
    }

    public void setDescripcionMensaje(String descripcionMensaje) {
        this.descripcionMensaje = descripcionMensaje;
    }

    public String getEstadoMensaje() {
        return estadoMensaje;
    }

    public Mensaje estadoMensaje(String estadoMensaje) {
        this.estadoMensaje = estadoMensaje;
        return this;
    }

    public void setEstadoMensaje(String estadoMensaje) {
        this.estadoMensaje = estadoMensaje;
    }

    public User getUserDestino() {
        return userDestino;
    }

    public Mensaje userDestino(User user) {
        this.userDestino = user;
        return this;
    }

    public void setUserDestino(User user) {
        this.userDestino = user;
    }

    public User getUserOrigen() {
        return userOrigen;
    }

    public Mensaje userOrigen(User user) {
        this.userOrigen = user;
        return this;
    }

    public void setUserOrigen(User user) {
        this.userOrigen = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mensaje)) {
            return false;
        }
        return id != null && id.equals(((Mensaje) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Mensaje{" +
            "id=" + getId() +
            ", fechaHoraMensaje='" + getFechaHoraMensaje() + "'" +
            ", descripcionMensaje='" + getDescripcionMensaje() + "'" +
            ", estadoMensaje='" + getEstadoMensaje() + "'" +
            "}";
    }
}
