package com.mycompany.myapp.repository;

import java.util.Optional;

import com.mycompany.myapp.domain.Seguro;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Seguro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeguroRepository extends JpaRepository<Seguro, Long> {

    @Query("select s from Seguro s join s.seguroVehiculo sv where sv.id=:id")   
    Optional<Seguro> findAllseguro(@Param ("id") Long id);

}
