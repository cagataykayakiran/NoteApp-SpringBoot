package noteApp.service;

import lombok.RequiredArgsConstructor;
import noteApp.entity.User;
import noteApp.dto.UserLoginRequest;
import noteApp.dto.UserLoginResponse;
import noteApp.dto.UserRegisterRequest;
import noteApp.enums.Role;
import noteApp.repository.UserRepository;
import noteApp.token.Token;
import noteApp.repository.TokenRepository;
import noteApp.token.TokenType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;

    public UserLoginResponse register(UserRegisterRequest userRequest) {
        User user = User.builder()
                .username(userRequest.getUsername())
                .firstname(userRequest.getFirstname())
                .lastname(userRequest.getLastname())
                .password(passwordEncoder.encode(userRequest.getPassword()))
                .role(Role.ADMIN)
                .build();
        var savedUser = userRepository.save(user);
        var token = jwtService.generateToken(user);
        savedUserToken(savedUser, token);
        return UserLoginResponse.builder().token(token).id(user.getId()).username(user.getUsername()).build();
    }

    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokensByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(t -> {
            t.setExpired(true);
            t.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    private void savedUserToken(User savedUser, String token) {
        var jwtToken = Token.builder()
                .user(savedUser)
                .token(token)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(jwtToken);
    }

    public UserLoginResponse auth(UserLoginRequest userRequest) {
        authenticationManager.
                authenticate(
                        new UsernamePasswordAuthenticationToken(
                                userRequest.getUsername(),
                                userRequest.getPassword()
                        )
                );
        User user = userRepository.findByUsername(userRequest.getUsername()).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
        String token = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        savedUserToken(user,token);
        return UserLoginResponse.builder().token(token).id(user.getId()).username(user.getUsername()).build();
    }
}
