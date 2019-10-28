package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Marca;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Marca entity.
 */
@Repository
public interface MarcaRepository extends JpaRepository<Marca, Long> {

    @Query(value = "select distinct marca from Marca marca left join fetch marca.modelos",
        countQuery = "select count(distinct marca) from Marca marca")
    Page<Marca> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct marca from Marca marca left join fetch marca.modelos")
    List<Marca> findAllWithEagerRelationships();

    @Query("select marca from Marca marca left join fetch marca.modelos where marca.id =:id")
    Optional<Marca> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select marca from Marca marca left join fetch marca.modelos where marca.nombreMarca =:nombreMarca")
    Optional<Marca> findByNombreMarca(@Param("nombreMarca") String nombreMarca);
}
