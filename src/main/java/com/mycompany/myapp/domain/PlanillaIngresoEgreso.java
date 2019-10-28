package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A PlanillaIngresoEgreso.
 */
@Entity
@Table(name = "planilla_ingreso_egreso")
public class PlanillaIngresoEgreso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "autorizado_previo")
    private Boolean autorizadoPrevio;

    @Column(name = "acompaniantes")
    private Integer acompaniantes;

    @Column(name = "fecha_ingreso")
    private ZonedDateTime fechaIngreso;

    @Column(name = "fecha_egreso")
    private ZonedDateTime fechaEgreso;

    @Column(name = "tipovisita")
    private String tipovisita;

    @Column(name = "ingreso_a_pie")
    private Boolean ingresoAPie;

    @ManyToOne
    @JsonIgnoreProperties("planillaIngresoEgresos")
    private Barrio planillaBarrio;

    @ManyToOne
    @JsonIgnoreProperties("planillaIngresoEgresos")
    private Persona planillaPersona;

    @ManyToOne
    @JsonIgnoreProperties("planillaIngresoEgresos")
    private QR planillaQr;

    @ManyToOne
    @JsonIgnoreProperties("planillaIngresoEgresos")
    private Domicilio planillaDestino;

    @ManyToOne
    @JsonIgnoreProperties("planillaIngresoEgresos")
    private Vehiculo planillaVehiculo;

    @ManyToOne
    @JsonIgnoreProperties("planillaIngresoEgresos")
    private Empresa planillaEmpresa;

    @ManyToOne
    @JsonIgnoreProperties("planillaIngresoEgresos")
    private Persona planillaAutorizador;

    @ManyToMany
    @JoinTable(name = "planilla_ingreso_egreso_planilla_acompaniantes",
               joinColumns = @JoinColumn(name = "planilla_ingreso_egreso_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "planilla_acompaniantes_id", referencedColumnName = "id"))
    private Set<Persona> planillaAcompaniantes = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isAutorizadoPrevio() {
        return autorizadoPrevio;
    }

    public PlanillaIngresoEgreso autorizadoPrevio(Boolean autorizadoPrevio) {
        this.autorizadoPrevio = autorizadoPrevio;
        return this;
    }

    public void setAutorizadoPrevio(Boolean autorizadoPrevio) {
        this.autorizadoPrevio = autorizadoPrevio;
    }

    public Integer getAcompaniantes() {
        return acompaniantes;
    }

    public PlanillaIngresoEgreso acompaniantes(Integer acompaniantes) {
        this.acompaniantes = acompaniantes;
        return this;
    }

    public void setAcompaniantes(Integer acompaniantes) {
        this.acompaniantes = acompaniantes;
    }

    public ZonedDateTime getFechaIngreso() {
        return fechaIngreso;
    }

    public PlanillaIngresoEgreso fechaIngreso(ZonedDateTime fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
        return this;
    }

    public void setFechaIngreso(ZonedDateTime fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public ZonedDateTime getFechaEgreso() {
        return fechaEgreso;
    }

    public PlanillaIngresoEgreso fechaEgreso(ZonedDateTime fechaEgreso) {
        this.fechaEgreso = fechaEgreso;
        return this;
    }

    public void setFechaEgreso(ZonedDateTime fechaEgreso) {
        this.fechaEgreso = fechaEgreso;
    }

    public String getTipovisita() {
        return tipovisita;
    }

    public PlanillaIngresoEgreso tipovisita(String tipovisita) {
        this.tipovisita = tipovisita;
        return this;
    }

    public void setTipovisita(String tipovisita) {
        this.tipovisita = tipovisita;
    }

    public Boolean isIngresoAPie() {
        return ingresoAPie;
    }

    public PlanillaIngresoEgreso ingresoAPie(Boolean ingresoAPie) {
        this.ingresoAPie = ingresoAPie;
        return this;
    }

    public void setIngresoAPie(Boolean ingresoAPie) {
        this.ingresoAPie = ingresoAPie;
    }

    public Barrio getPlanillaBarrio() {
        return planillaBarrio;
    }

    public PlanillaIngresoEgreso planillaBarrio(Barrio barrio) {
        this.planillaBarrio = barrio;
        return this;
    }

    public void setPlanillaBarrio(Barrio barrio) {
        this.planillaBarrio = barrio;
    }

    public Persona getPlanillaPersona() {
        return planillaPersona;
    }

    public PlanillaIngresoEgreso planillaPersona(Persona persona) {
        this.planillaPersona = persona;
        return this;
    }

    public void setPlanillaPersona(Persona persona) {
        this.planillaPersona = persona;
    }

    public QR getPlanillaQr() {
        return planillaQr;
    }

    public PlanillaIngresoEgreso planillaQr(QR qR) {
        this.planillaQr = qR;
        return this;
    }

    public void setPlanillaQr(QR qR) {
        this.planillaQr = qR;
    }

    public Domicilio getPlanillaDestino() {
        return planillaDestino;
    }

    public PlanillaIngresoEgreso planillaDestino(Domicilio domicilio) {
        this.planillaDestino = domicilio;
        return this;
    }

    public void setPlanillaDestino(Domicilio domicilio) {
        this.planillaDestino = domicilio;
    }

    public Vehiculo getPlanillaVehiculo() {
        return planillaVehiculo;
    }

    public PlanillaIngresoEgreso planillaVehiculo(Vehiculo vehiculo) {
        this.planillaVehiculo = vehiculo;
        return this;
    }

    public void setPlanillaVehiculo(Vehiculo vehiculo) {
        this.planillaVehiculo = vehiculo;
    }

    public Empresa getPlanillaEmpresa() {
        return planillaEmpresa;
    }

    public PlanillaIngresoEgreso planillaEmpresa(Empresa empresa) {
        this.planillaEmpresa = empresa;
        return this;
    }

    public void setPlanillaEmpresa(Empresa empresa) {
        this.planillaEmpresa = empresa;
    }

    public Persona getPlanillaAutorizador() {
        return planillaAutorizador;
    }

    public PlanillaIngresoEgreso planillaAutorizador(Persona persona) {
        this.planillaAutorizador = persona;
        return this;
    }

    public void setPlanillaAutorizador(Persona persona) {
        this.planillaAutorizador = persona;
    }

    public Set<Persona> getPlanillaAcompaniantes() {
        return planillaAcompaniantes;
    }

    public PlanillaIngresoEgreso planillaAcompaniantes(Set<Persona> personas) {
        this.planillaAcompaniantes = personas;
        return this;
    }

    

    public void setPlanillaAcompaniantes(Set<Persona> personas) {
        this.planillaAcompaniantes = personas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PlanillaIngresoEgreso)) {
            return false;
        }
        return id != null && id.equals(((PlanillaIngresoEgreso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PlanillaIngresoEgreso{" +
            "id=" + getId() +
            ", autorizadoPrevio='" + isAutorizadoPrevio() + "'" +
            ", acompaniantes=" + getAcompaniantes() +
            ", fechaIngreso='" + getFechaIngreso() + "'" +
            ", fechaEgreso='" + getFechaEgreso() + "'" +
            ", tipovisita='" + getTipovisita() + "'" +
            ", ingresoAPie='" + isIngresoAPie() + "'" +
            "}";
    }
}
