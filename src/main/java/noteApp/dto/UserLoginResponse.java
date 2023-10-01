package noteApp.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserLoginResponse {

    private String token;
    private Long id;
    private String username;
}
