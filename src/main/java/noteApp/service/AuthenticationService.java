package noteApp.service;

import lombok.RequiredArgsConstructor;
import noteApp.Entitiy.User;
import noteApp.dto.UserLoginRequest;
import noteApp.dto.UserLoginResponse;
import noteApp.dto.UserRegisterRequest;
import noteApp.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    public String register(UserRegisterRequest userRegisterRequest) {
        User user = User.builder()
                .firstname(userRegisterRequest.getFirstname())
                .lastname(userRegisterRequest.getLastname())
                .username(userRegisterRequest.getUsername())
                .password(passwordEncoder.encode(userRegisterRequest.getPassword()))
                .build();
        userRepository.save(user);
        return "User successfully created";
    }

    public UserLoginResponse login(UserLoginRequest userLoginRequest) {
        authenticationManager
                .authenticate(
                        new UsernamePasswordAuthenticationToken(
                                userLoginRequest.getUsername(), userLoginRequest.getPassword()));
        return UserLoginResponse.builder().username(userLoginRequest.getUsername()).build();
    }
}
