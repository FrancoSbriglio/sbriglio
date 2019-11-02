package com.mycompany.myapp.repository;

import java.util.Optional;

import com.mycompany.myapp.domain.CarnetDeConducir;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CarnetDeConducir entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarnetDeConducirRepository extends JpaRepository<CarnetDeConducir, Long> {

    @Query("select c from CarnetDeConducir c join c.carnetPersona cp where cp.id =:id")
    Optional<CarnetDeConducir> findAllcarnet(@Param("id") Long id);

}
