package com.mycompany.myapp.security;

/**
 * Constants for Spring Security authorities.
 */
public final class AuthoritiesConstants {

    public static final String ADMIN = "ROLE_ADMIN";

    public static final String USER = "ROLE_USER";

    public static final String ANONYMOUS = "ROLE_ANONYMOUS";

    public static final String VISITA = "ROLE_VISITA";

    public static final String PROPIETARIO = "ROLE_PROPIETARIO";

    public static final String GUARDIA = "ROLE_PROPIETARIO";

    private AuthoritiesConstants() {
    }
}
