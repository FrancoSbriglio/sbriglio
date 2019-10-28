package com.mycompany.myapp.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Color.
 */
@Entity
@Table(name = "color")
public class Color implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_color")
    private String nombreColor;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreColor() {
        return nombreColor;
    }

    public Color nombreColor(String nombreColor) {
        this.nombreColor = nombreColor;
        return this;
    }

    public void setNombreColor(String nombreColor) {
        this.nombreColor = nombreColor;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Color)) {
            return false;
        }
        return id != null && id.equals(((Color) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Color{" +
            "id=" + getId() +
            ", nombreColor='" + getNombreColor() + "'" +
            "}";
    }
}
