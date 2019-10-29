package com.mycompany.myapp.repository;

import java.security.cert.PKIXRevocationChecker.Option;
import java.util.Optional;

import com.mycompany.myapp.domain.Vehiculo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Vehiculo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {

    Optional<Vehiculo> findByDominio(String dominio);

}
