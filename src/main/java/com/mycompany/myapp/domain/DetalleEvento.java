package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A DetalleEvento.
 */
@Entity
@Table(name = "detalle_evento")
public class DetalleEvento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "hora_ingreso")
    private ZonedDateTime horaIngreso;

    @Column(name = "hora_engreso")
    private ZonedDateTime horaEngreso;

    @ManyToOne
    @JsonIgnoreProperties("detalleEventos")
    private ListaAmigos amigosevento;

    @ManyToOne
    @JsonIgnoreProperties("detalleEventos")
    private Persona detallePersonaEvento;

    @ManyToOne
    @JsonIgnoreProperties("detalleEventos")
    private Vehiculo detalleEventoVehiculo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getHoraIngreso() {
        return horaIngreso;
    }

    public DetalleEvento horaIngreso(ZonedDateTime horaIngreso) {
        this.horaIngreso = horaIngreso;
        return this;
    }

    public void setHoraIngreso(ZonedDateTime horaIngreso) {
        this.horaIngreso = horaIngreso;
    }

    public ZonedDateTime getHoraEngreso() {
        return horaEngreso;
    }

    public DetalleEvento horaEngreso(ZonedDateTime horaEngreso) {
        this.horaEngreso = horaEngreso;
        return this;
    }

    public void setHoraEngreso(ZonedDateTime horaEngreso) {
        this.horaEngreso = horaEngreso;
    }

    public ListaAmigos getAmigosevento() {
        return amigosevento;
    }

    public DetalleEvento amigosevento(ListaAmigos listaAmigos) {
        this.amigosevento = listaAmigos;
        return this;
    }

    public void setAmigosevento(ListaAmigos listaAmigos) {
        this.amigosevento = listaAmigos;
    }

    public Persona getDetallePersonaEvento() {
        return detallePersonaEvento;
    }

    public DetalleEvento detallePersonaEvento(Persona persona) {
        this.detallePersonaEvento = persona;
        return this;
    }

    public void setDetallePersonaEvento(Persona persona) {
        this.detallePersonaEvento = persona;
    }

    public Vehiculo getDetalleEventoVehiculo() {
        return detalleEventoVehiculo;
    }

    public DetalleEvento detalleEventoVehiculo(Vehiculo vehiculo) {
        this.detalleEventoVehiculo = vehiculo;
        return this;
    }

    public void setDetalleEventoVehiculo(Vehiculo vehiculo) {
        this.detalleEventoVehiculo = vehiculo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetalleEvento)) {
            return false;
        }
        return id != null && id.equals(((DetalleEvento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "DetalleEvento{" +
            "id=" + getId() +
            ", horaIngreso='" + getHoraIngreso() + "'" +
            ", horaEngreso='" + getHoraEngreso() + "'" +
            "}";
    }
}
