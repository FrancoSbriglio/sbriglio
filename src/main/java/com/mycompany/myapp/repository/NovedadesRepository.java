package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Novedades;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Novedades entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NovedadesRepository extends JpaRepository<Novedades, Long> {

    @Query("select novedades from Novedades novedades where novedades.creada.login = ?#{principal.username}")
    List<Novedades> findByCreadaIsCurrentUser();

}
