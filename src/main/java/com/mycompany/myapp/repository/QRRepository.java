package com.mycompany.myapp.repository;

import java.util.List;
import java.util.Set;

import com.mycompany.myapp.domain.Domicilio;
import com.mycompany.myapp.domain.Persona;
import com.mycompany.myapp.domain.QR;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the QR entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QRRepository extends JpaRepository<QR, Long> {

    @Query("select qr from QR qr join qr.qrAutorizador join qr.qrAutorizado join qr.qrDomicilio where qr.codigoQR=:codigoQR")   
    List<QR> findAllqrpersona(@Param ("codigoQR") String codigoQR);

    @Query("select qr from QR qr join qr.qrDomicilio dom where dom.id=:id")   
    List<QR> findAllqrdominio(@Param ("id") Long id);

    @Query("select qr from QR qr where qr.qrAutorizado.id=:id")   
    List<QR> findAllautorizado(@Param ("id") Long id);

    @Query("select qr.qrDomicilio from QR qr where qr.qrAutorizado.id=:id")   
    Domicilio findAllautorizado1(@Param ("id") Long id);

}
