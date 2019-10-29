package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ListaAmigos;
import com.mycompany.myapp.domain.Persona;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

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

    @Query("select listaAmigos from ListaAmigos listaAmigos join listaAmigos.amigos la where listaAmigos.pertenece.dniPersona =:dniPersona")
    Set<ListaAmigos> findAlllistadni(@Param("dniPersona") Integer dniPersona);

    @Query("select listaAmigos.amigos from ListaAmigos listaAmigos where listaAmigos.pertenece.dniPersona =:dniPersona")
    Set<Persona> findAlllistadni1(@Param("dniPersona") Integer dniPersona);
}
