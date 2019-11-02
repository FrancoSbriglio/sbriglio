package com.mycompany.myapp.repository;

import java.util.Optional;

import com.mycompany.myapp.domain.Art;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Art entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ArtRepository extends JpaRepository<Art, Long> {

    @Query("select a from Art a join a.artDersona ap where ap.id=:id")   
    Optional<Art> findAllart(@Param ("id") Long id);
}
