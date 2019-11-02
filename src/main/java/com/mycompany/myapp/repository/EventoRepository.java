package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Evento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Evento entity.
 */
@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    @Query(value = "select distinct evento from Evento evento left join fetch evento.eventoDetalles",
        countQuery = "select count(distinct evento) from Evento evento")
    Page<Evento> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct evento from Evento evento left join fetch evento.eventoDetalles")
    List<Evento> findAllWithEagerRelationships();

    @Query("select evento from Evento evento left join fetch evento.eventoDetalles where evento.id =:id")
    Optional<Evento> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select e from Evento e  join e.eventoEspacio ec where e.fecha =:fecha and ec.id=:id")
    List<Evento> findAlleventosdia(@Param("fecha") ZonedDateTime fecha,@Param("id") Long id);


}
