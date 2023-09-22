package noteApp.dto;

import lombok.Data;

@Data
public class UserRegisterRequest {

    private String firstname;
    private String lastname;
    private String username;
    private String password;
}
