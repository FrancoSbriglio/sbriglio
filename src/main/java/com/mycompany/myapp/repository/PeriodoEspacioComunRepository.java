package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.PeriodoEspacioComun;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PeriodoEspacioComun entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PeriodoEspacioComunRepository extends JpaRepository<PeriodoEspacioComun, Long> {

}
