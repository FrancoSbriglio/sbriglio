package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Aseguradora;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Aseguradora entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AseguradoraRepository extends JpaRepository<Aseguradora, Long> {

}
