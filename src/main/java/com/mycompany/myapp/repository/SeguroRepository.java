package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Seguro;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Seguro entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SeguroRepository extends JpaRepository<Seguro, Long> {

}
