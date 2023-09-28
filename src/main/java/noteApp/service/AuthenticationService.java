package noteApp.service;

import lombok.RequiredArgsConstructor;
import noteApp.entity.User;
import noteApp.dto.UserLoginRequest;
import noteApp.dto.UserLoginResponse;
import noteApp.dto.UserRegisterRequest;
import noteApp.enums.Role;
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
    private final JwtService jwtService;

    public UserLoginResponse register(UserRegisterRequest userRequest) {
        User user = User.builder()
                .username(userRequest.getUsername())
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.getLastname())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);
        String token = jwtService.generateToken(user);
        return UserLoginResponse.builder().token(token).id(user.getId()).build();
    }

    public UserLoginResponse auth(UserLoginRequest userRequest) {
        authenticationManager.
                authenticate(new UsernamePasswordAuthenticationToken
                        (userRequest.getUsername(), userRequest.getPassword()));
        User user = userRepository.findByUsername(userRequest.getUsername()).orElse(null);
        String token = jwtService.generateToken(user);
        return UserLoginResponse.builder().token(token).id(user.getId()).build();
    }
}
