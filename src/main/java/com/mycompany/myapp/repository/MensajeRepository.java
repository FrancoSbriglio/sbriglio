package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Mensaje;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Mensaje entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MensajeRepository extends JpaRepository<Mensaje, Long> {

    @Query("select mensaje from Mensaje mensaje where mensaje.userDestino.login = ?#{principal.username}")
    List<Mensaje> findByUserDestinoIsCurrentUser();

    @Query("select mensaje from Mensaje mensaje where mensaje.userOrigen.login = ?#{principal.username}")
    List<Mensaje> findByUserOrigenIsCurrentUser();

    
    @Query("select mensaje from Mensaje mensaje left join fetch mensaje.userOrigen left join fetch mensaje.userDestino where mensaje.userOrigen.id=:id And mensaje.userDestino.id=:iddestino Or mensaje.userOrigen.id=:iddestino And mensaje.userDestino.id=:id")
    List<Mensaje> findAllmensaje(@Param("id") Long id,@Param("iddestino") Long iddestino);

}
