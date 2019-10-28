package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Domicilio;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Domicilio entity.
 */
@Repository
public interface DomicilioRepository extends JpaRepository<Domicilio, Long> {

    @Query(value = "select distinct domicilio from Domicilio domicilio left join fetch domicilio.domiciliopersonas",
        countQuery = "select count(distinct domicilio) from Domicilio domicilio")
    Page<Domicilio> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct domicilio from Domicilio domicilio left join fetch domicilio.domiciliopersonas")
    List<Domicilio> findAllWithEagerRelationships();

    @Query("select domicilio from Domicilio domicilio left join fetch domicilio.domiciliopersonas where domicilio.id =:id")
    Optional<Domicilio> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select domicilio from Domicilio domicilio left join fetch domicilio.domiciliopersonas where domicilio.casaDomicilio =:casaDomicilio And domicilio.manzanaDomicilio=:manzanaDomicilio")
    Optional<Domicilio> findAllcasadomicilio(@Param("casaDomicilio") String casaDomicilio,@Param("manzanaDomicilio") String manzanaDomicilio);

    @Query("select domicilio from Domicilio domicilio left join fetch domicilio.domiciliopersonas dp where dp.apellidoPersona =:apellido")
    List<Domicilio> findAlldomperson(@Param("apellido") String apellido);

    @Query("select d from Domicilio d join d.domiciliopersonas dom where dom.id =:id")
    Optional<Domicilio> findAllpersonadomicilioid(@Param("id") Long id);

}
