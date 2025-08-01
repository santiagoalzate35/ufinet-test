package com.example.registroautos.dto;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;
@Data
public class LoginRequest {
    @NotBlank @Email private String email;
    @NotBlank        private String password;
}