package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Authority;
import com.mycompany.myapp.domain.Domicilio;
import com.mycompany.myapp.domain.Persona;
import com.mycompany.myapp.domain.Vehiculo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

/**aa
 * Spring Data  repository for the Persona entity.
 */
@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {

    @Query("select persona from Persona persona where persona.personaUser.login = ?#{principal.username}")
    List<Persona> findByPersonaUserIsCurrentUser();

    @Query(value = "select distinct persona from Persona persona left join fetch persona.vehiculos",
        countQuery = "select count(distinct persona) from Persona persona")
    Page<Persona> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct persona from Persona persona left join fetch persona.vehiculos")
    List<Persona> findAllWithEagerRelationships();

    @Query("select persona from Persona persona left join fetch persona.vehiculos where persona.id =:id")
    Optional<Persona> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select persona from Persona persona left join fetch persona.vehiculos where persona.dniPersona =:dniPersona")
    Optional<Persona> findAlldnipersona(@Param ("dniPersona") Integer dniPersona);
  

    @Query("select p from Persona p join p.personaUser.authorities a where a.name=:role")   
    List<Persona> findAlluserrol(@Param ("role") String role);

    @Query("select p from Persona p join p.personaUser pu join p.personaUser.authorities join p.vehiculos where pu.id=:id")   
    Persona findAlluserperson(@Param ("id") Long id);

  //  @Query("select p.vehiculos from Persona p join p.personaUser pu where pu.id=:id")   
   // Set<Vehiculo> findAlluserpersonvehicle(@Param ("id") Long id);

    @Query("select p from Persona p join p.personaUser pu join p.personaUser.authorities where pu.email=:email")   
    Persona findAlluseremail(@Param ("email") String email);

    @Query("select p.personaUser.authorities from Persona p  where p.personaUser.email=:email")   
    Set<Authority> findAlluserperson1(@Param ("email") String email);

      
    @Query("select p.personadomicilios from Persona p where p.id=:id")   
    Set<Domicilio> findAlldomicilio(@Param ("id") Long id);

    @Query("select p from Persona p join p.personadomicilios d where :id_casa = d.id")   
    List<Persona> findAlldomicilio1(@Param ("id_casa") Long id_casa);
}
