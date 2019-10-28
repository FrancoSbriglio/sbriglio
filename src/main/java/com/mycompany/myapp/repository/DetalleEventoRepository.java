package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.DetalleEvento;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DetalleEvento entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DetalleEventoRepository extends JpaRepository<DetalleEvento, Long> {

}
