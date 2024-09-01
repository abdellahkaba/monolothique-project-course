package com.isi.book.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_IMPLEMENTED;
@Getter
public enum BusinessErrorCodes {

    NO_CODE(0, NOT_IMPLEMENTED, "Aucun code"),
    INCORRECT_CURRENT_PASSWORD(300, BAD_REQUEST, "Le mot de passe actuel est incorrect"),
    NEW_PASSWORD_DOES_NOT_MATCH(301, BAD_REQUEST, "Le nouveau mot de passe ne correspond pas"),
    ACCOUNT_LOCKED(302, FORBIDDEN, "Le compte utilisateur est verrouillé"),
    ACCOUNT_DISABLED(303, FORBIDDEN, "Le compte utilisateur est désactivé"),
    BAD_CREDENTIALS(304, FORBIDDEN, "Le login et/ou le mot de passe sont incorrects"),
    ;
    private final int code;
    private final String description;
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus status, String description) {
        this.code = code;
        this.description = description;
        this.httpStatus = status;
    }
}