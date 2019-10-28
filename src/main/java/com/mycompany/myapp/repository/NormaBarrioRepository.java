package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.NormaBarrio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NormaBarrio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NormaBarrioRepository extends JpaRepository<NormaBarrio, Long> {

}
