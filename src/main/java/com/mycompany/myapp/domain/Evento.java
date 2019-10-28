package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Evento.
 */
@Entity
@Table(name = "evento")
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_evento")
    private String nombreEvento;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @Column(name = "hora_inicio")
    private ZonedDateTime horaInicio;

    @Column(name = "hora_fin")
    private ZonedDateTime horaFin;

    @ManyToOne
    @JsonIgnoreProperties("eventos")
    private Domicilio eventoDomicilio;

    @ManyToOne
    @JsonIgnoreProperties("eventos")
    private EspacioComun eventoEspacio;

    @ManyToOne
    @JsonIgnoreProperties("eventos")
    private Persona eventoPersona;

    @ManyToOne
    @JsonIgnoreProperties("eventos")
    private EstadoEvento estadoEvento;

    @ManyToOne
    @JsonIgnoreProperties("eventos")
    private PeriodoEspacioComun eventoPeriodo;

    @ManyToMany
    @JoinTable(name = "evento_evento_detalle",
               joinColumns = @JoinColumn(name = "evento_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "evento_detalle_id", referencedColumnName = "id"))
    private Set<DetalleEvento> eventoDetalles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEvento() {
        return nombreEvento;
    }

    public Evento nombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
        return this;
    }

    public void setNombreEvento(String nombreEvento) {
        this.nombreEvento = nombreEvento;
    }

    public ZonedDateTime getFecha() {
        return fecha;
    }

    public Evento fecha(ZonedDateTime fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public ZonedDateTime getHoraInicio() {
        return horaInicio;
    }

    public Evento horaInicio(ZonedDateTime horaInicio) {
        this.horaInicio = horaInicio;
        return this;
    }

    public void setHoraInicio(ZonedDateTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public ZonedDateTime getHoraFin() {
        return horaFin;
    }

    public Evento horaFin(ZonedDateTime horaFin) {
        this.horaFin = horaFin;
        return this;
    }

    public void setHoraFin(ZonedDateTime horaFin) {
        this.horaFin = horaFin;
    }

    public Domicilio getEventoDomicilio() {
        return eventoDomicilio;
    }

    public Evento eventoDomicilio(Domicilio domicilio) {
        this.eventoDomicilio = domicilio;
        return this;
    }

    public void setEventoDomicilio(Domicilio domicilio) {
        this.eventoDomicilio = domicilio;
    }

    public EspacioComun getEventoEspacio() {
        return eventoEspacio;
    }

    public Evento eventoEspacio(EspacioComun espacioComun) {
        this.eventoEspacio = espacioComun;
        return this;
    }

    public void setEventoEspacio(EspacioComun espacioComun) {
        this.eventoEspacio = espacioComun;
    }

    public Persona getEventoPersona() {
        return eventoPersona;
    }

    public Evento eventoPersona(Persona persona) {
        this.eventoPersona = persona;
        return this;
    }

    public void setEventoPersona(Persona persona) {
        this.eventoPersona = persona;
    }

    public EstadoEvento getEstadoEvento() {
        return estadoEvento;
    }

    public Evento estadoEvento(EstadoEvento estadoEvento) {
        this.estadoEvento = estadoEvento;
        return this;
    }

    public void setEstadoEvento(EstadoEvento estadoEvento) {
        this.estadoEvento = estadoEvento;
    }

    public PeriodoEspacioComun getEventoPeriodo() {
        return eventoPeriodo;
    }

    public Evento eventoPeriodo(PeriodoEspacioComun periodoEspacioComun) {
        this.eventoPeriodo = periodoEspacioComun;
        return this;
    }

    public void setEventoPeriodo(PeriodoEspacioComun periodoEspacioComun) {
        this.eventoPeriodo = periodoEspacioComun;
    }

    public Set<DetalleEvento> getEventoDetalles() {
        return eventoDetalles;
    }

    public Evento eventoDetalles(Set<DetalleEvento> detalleEventos) {
        this.eventoDetalles = detalleEventos;
        return this;
    }

 

    public void setEventoDetalles(Set<DetalleEvento> detalleEventos) {
        this.eventoDetalles = detalleEventos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Evento)) {
            return false;
        }
        return id != null && id.equals(((Evento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Evento{" +
            "id=" + getId() +
            ", nombreEvento='" + getNombreEvento() + "'" +
            ", fecha='" + getFecha() + "'" +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", horaFin='" + getHoraFin() + "'" +
            "}";
    }
}
