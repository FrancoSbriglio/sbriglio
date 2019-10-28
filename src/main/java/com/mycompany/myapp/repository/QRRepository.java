package com.mycompany.myapp.repository;

import java.util.List;

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

}
