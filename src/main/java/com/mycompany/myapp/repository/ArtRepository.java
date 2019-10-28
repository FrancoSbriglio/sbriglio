package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Art;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Art entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtRepository extends JpaRepository<Art, Long> {

}
