package noteApp.controller;

import lombok.RequiredArgsConstructor;
import noteApp.dto.UserLoginRequest;
import noteApp.dto.UserLoginResponse;
import noteApp.dto.UserRegisterRequest;
import noteApp.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<UserLoginResponse> register(@RequestBody UserRegisterRequest userRegisterRequest) {
        return ResponseEntity.ok(authenticationService.register(userRegisterRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<?> auth(@RequestBody UserLoginRequest userLoginRequest) {
        return ResponseEntity.ok(authenticationService.auth(userLoginRequest));
    }
}
