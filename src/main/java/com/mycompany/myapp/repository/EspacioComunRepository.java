package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.EspacioComun;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the EspacioComun entity.
 */
@Repository
public interface EspacioComunRepository extends JpaRepository<EspacioComun, Long> {

    @Query(value = "select distinct espacioComun from EspacioComun espacioComun left join fetch espacioComun.espacioTipos",
        countQuery = "select count(distinct espacioComun) from EspacioComun espacioComun")
    Page<EspacioComun> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct espacioComun from EspacioComun espacioComun left join fetch espacioComun.espacioTipos")
    List<EspacioComun> findAllWithEagerRelationships();

    @Query("select espacioComun from EspacioComun espacioComun left join fetch espacioComun.espacioTipos where espacioComun.id =:id")
    Optional<EspacioComun> findOneWithEagerRelationships(@Param("id") Long id);

}
