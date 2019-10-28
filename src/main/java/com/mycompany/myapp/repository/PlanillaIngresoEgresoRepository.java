package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PlanillaIngresoEgreso;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the PlanillaIngresoEgreso entity.
 */
@Repository
public interface PlanillaIngresoEgresoRepository extends JpaRepository<PlanillaIngresoEgreso, Long> {

    @Query(value = "select distinct planillaIngresoEgreso from PlanillaIngresoEgreso planillaIngresoEgreso left join fetch planillaIngresoEgreso.planillaAcompaniantes",
        countQuery = "select count(distinct planillaIngresoEgreso) from PlanillaIngresoEgreso planillaIngresoEgreso")
    Page<PlanillaIngresoEgreso> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct planillaIngresoEgreso from PlanillaIngresoEgreso planillaIngresoEgreso left join fetch planillaIngresoEgreso.planillaAcompaniantes")
    List<PlanillaIngresoEgreso> findAllWithEagerRelationships();

    @Query("select planillaIngresoEgreso from PlanillaIngresoEgreso planillaIngresoEgreso left join fetch planillaIngresoEgreso.planillaAcompaniantes where planillaIngresoEgreso.id =:id")
    Optional<PlanillaIngresoEgreso> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select planillaIngresoEgreso from PlanillaIngresoEgreso planillaIngresoEgreso left join fetch planillaIngresoEgreso.planillaAcompaniantes where planillaIngresoEgreso.fechaEgreso is null")    
    List<PlanillaIngresoEgreso> findAllplanillaegreso();
    
    @Query("select planillaIngresoEgreso from PlanillaIngresoEgreso planillaIngresoEgreso left join fetch planillaIngresoEgreso.planillaPersona where planillaIngresoEgreso.planillaPersona.dniPersona=:dniPersona AND planillaIngresoEgreso.fechaEgreso is null")
    Optional<PlanillaIngresoEgreso> findAlldniegreso(@Param("dniPersona") Integer dniPersona);
    
    @Query("select planillaIngresoEgreso from PlanillaIngresoEgreso planillaIngresoEgreso where planillaIngresoEgreso.fechaIngreso>=:fechainicio AND planillaIngresoEgreso.fechaEgreso>=:fechafin")    
    List<PlanillaIngresoEgreso> findByAllentrefechas(@Param("fechainicio") ZonedDateTime fechainicio,@Param("fechafin") ZonedDateTime fechafin);
    
    @Query("select pie from PlanillaIngresoEgreso pie join pie.planillaDestino pied where pied.casaDomicilio =:casaDomicilio And pied.manzanaDomicilio=:manzanaDomicilio ")    
    List<PlanillaIngresoEgreso> findAllplanilladomicilio(@Param("casaDomicilio") String casaDomicilio,@Param("manzanaDomicilio") String manzanaDomicilio);
}
