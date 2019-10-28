package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.EstadoEvento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the EstadoEvento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstadoEventoRepository extends JpaRepository<EstadoEvento, Long> {

}
