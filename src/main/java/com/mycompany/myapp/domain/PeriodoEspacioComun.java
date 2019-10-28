package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A PeriodoEspacioComun.
 */
@Entity
@Table(name = "periodo_espacio_comun")
public class PeriodoEspacioComun implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "periodo")
    private ZonedDateTime periodo;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getPeriodo() {
        return periodo;
    }

    public PeriodoEspacioComun periodo(ZonedDateTime periodo) {
        this.periodo = periodo;
        return this;
    }

    public void setPeriodo(ZonedDateTime periodo) {
        this.periodo = periodo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PeriodoEspacioComun)) {
            return false;
        }
        return id != null && id.equals(((PeriodoEspacioComun) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "PeriodoEspacioComun{" +
            "id=" + getId() +
            ", periodo='" + getPeriodo() + "'" +
            "}";
    }
}
