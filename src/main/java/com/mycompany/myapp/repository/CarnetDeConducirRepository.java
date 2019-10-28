package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.CarnetDeConducir;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CarnetDeConducir entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarnetDeConducirRepository extends JpaRepository<CarnetDeConducir, Long> {

}
