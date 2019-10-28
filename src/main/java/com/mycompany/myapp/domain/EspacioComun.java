package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A EspacioComun.
 */
@Entity
@Table(name = "espacio_comun")
public class EspacioComun implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_espacio_comun")
    private String nombreEspacioComun;

    @Column(name = "disponibilidad_desde")
    private ZonedDateTime disponibilidadDesde;

    @Column(name = "disponibilidad_hasta")
    private ZonedDateTime disponibilidadHasta;

    @Lob
    @Column(name = "foto_espacio_comun")
    private byte[] fotoEspacioComun;

    @Column(name = "foto_espacio_comun_content_type")
    private String fotoEspacioComunContentType;

    @Column(name = "hora_desde")
    private ZonedDateTime horaDesde;

    @Column(name = "hora_hasta")
    private ZonedDateTime horaHasta;

    @ManyToOne
    @JsonIgnoreProperties("espacioComuns")
    private Barrio espacioBarrio;

    @ManyToMany
    @JoinTable(name = "espacio_comun_espacio_tipo",
               joinColumns = @JoinColumn(name = "espacio_comun_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "espacio_tipo_id", referencedColumnName = "id"))
    private Set<PeriodoEspacioComun> espacioTipos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEspacioComun() {
        return nombreEspacioComun;
    }

    public EspacioComun nombreEspacioComun(String nombreEspacioComun) {
        this.nombreEspacioComun = nombreEspacioComun;
        return this;
    }

    public void setNombreEspacioComun(String nombreEspacioComun) {
        this.nombreEspacioComun = nombreEspacioComun;
    }

    public ZonedDateTime getDisponibilidadDesde() {
        return disponibilidadDesde;
    }

    public EspacioComun disponibilidadDesde(ZonedDateTime disponibilidadDesde) {
        this.disponibilidadDesde = disponibilidadDesde;
        return this;
    }

    public void setDisponibilidadDesde(ZonedDateTime disponibilidadDesde) {
        this.disponibilidadDesde = disponibilidadDesde;
    }

    public ZonedDateTime getDisponibilidadHasta() {
        return disponibilidadHasta;
    }

    public EspacioComun disponibilidadHasta(ZonedDateTime disponibilidadHasta) {
        this.disponibilidadHasta = disponibilidadHasta;
        return this;
    }

    public void setDisponibilidadHasta(ZonedDateTime disponibilidadHasta) {
        this.disponibilidadHasta = disponibilidadHasta;
    }

    public byte[] getFotoEspacioComun() {
        return fotoEspacioComun;
    }

    public EspacioComun fotoEspacioComun(byte[] fotoEspacioComun) {
        this.fotoEspacioComun = fotoEspacioComun;
        return this;
    }

    public void setFotoEspacioComun(byte[] fotoEspacioComun) {
        this.fotoEspacioComun = fotoEspacioComun;
    }

    public String getFotoEspacioComunContentType() {
        return fotoEspacioComunContentType;
    }

    public EspacioComun fotoEspacioComunContentType(String fotoEspacioComunContentType) {
        this.fotoEspacioComunContentType = fotoEspacioComunContentType;
        return this;
    }

    public void setFotoEspacioComunContentType(String fotoEspacioComunContentType) {
        this.fotoEspacioComunContentType = fotoEspacioComunContentType;
    }

    public ZonedDateTime getHoraDesde() {
        return horaDesde;
    }

    public EspacioComun horaDesde(ZonedDateTime horaDesde) {
        this.horaDesde = horaDesde;
        return this;
    }

    public void setHoraDesde(ZonedDateTime horaDesde) {
        this.horaDesde = horaDesde;
    }

    public ZonedDateTime getHoraHasta() {
        return horaHasta;
    }

    public EspacioComun horaHasta(ZonedDateTime horaHasta) {
        this.horaHasta = horaHasta;
        return this;
    }

    public void setHoraHasta(ZonedDateTime horaHasta) {
        this.horaHasta = horaHasta;
    }

    public Barrio getEspacioBarrio() {
        return espacioBarrio;
    }

    public EspacioComun espacioBarrio(Barrio barrio) {
        this.espacioBarrio = barrio;
        return this;
    }

    public void setEspacioBarrio(Barrio barrio) {
        this.espacioBarrio = barrio;
    }

    public Set<PeriodoEspacioComun> getEspacioTipos() {
        return espacioTipos;
    }

    public EspacioComun espacioTipos(Set<PeriodoEspacioComun> periodoEspacioComuns) {
        this.espacioTipos = periodoEspacioComuns;
        return this;
    }

   

    public void setEspacioTipos(Set<PeriodoEspacioComun> periodoEspacioComuns) {
        this.espacioTipos = periodoEspacioComuns;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EspacioComun)) {
            return false;
        }
        return id != null && id.equals(((EspacioComun) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "EspacioComun{" +
            "id=" + getId() +
            ", nombreEspacioComun='" + getNombreEspacioComun() + "'" +
            ", disponibilidadDesde='" + getDisponibilidadDesde() + "'" +
            ", disponibilidadHasta='" + getDisponibilidadHasta() + "'" +
            ", fotoEspacioComun='" + getFotoEspacioComun() + "'" +
            ", fotoEspacioComunContentType='" + getFotoEspacioComunContentType() + "'" +
            ", horaDesde='" + getHoraDesde() + "'" +
            ", horaHasta='" + getHoraHasta() + "'" +
            "}";
    }
}
