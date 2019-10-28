package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.ListaAmigos;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ListaAmigos entity.
 */
@Repository
public interface ListaAmigosRepository extends JpaRepository<ListaAmigos, Long> {

    @Query(value = "select distinct listaAmigos from ListaAmigos listaAmigos left join fetch listaAmigos.amigos",
        countQuery = "select count(distinct listaAmigos) from ListaAmigos listaAmigos")
    Page<ListaAmigos> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct listaAmigos from ListaAmigos listaAmigos left join fetch listaAmigos.amigos")
    List<ListaAmigos> findAllWithEagerRelationships();

    @Query("select listaAmigos from ListaAmigos listaAmigos left join fetch listaAmigos.amigos where listaAmigos.id =:id")
    Optional<ListaAmigos> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select listaAmigos from ListaAmigos listaAmigos left join fetch listaAmigos.amigos la where la.dniPersona =:dniPersona")
    List<ListaAmigos> findAlllistadni(@Param("dniPersona") Integer dniPersona);
}
