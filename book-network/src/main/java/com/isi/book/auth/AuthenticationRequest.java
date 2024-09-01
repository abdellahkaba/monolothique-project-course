package com.isi.book.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuthenticationRequest {

    @NotEmpty(message = "Le mail est requis")
    @NotBlank(message = "Le mail est requis")
    @Email(message = "Email is not formatted")
    private String email;
    @NotEmpty(message = "Le Mot de pass est requis")
    @NotBlank(message = "Le Mot de pass est requis")
    @Size(min = 8, message = "Le mail doit avoir au moins 8 caractère au minimum")
    private String password;

}
