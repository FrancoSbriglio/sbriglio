package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Barrio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Barrio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BarrioRepository extends JpaRepository<Barrio, Long> {

}
