package pl.edu.agh.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
public class UserAuthorizationService {

  private final UserRepository userRepository;
  private final AuthenticationManager authenticationManager;
  private final long expirationTime;
  private final String secret;

  public UserAuthorizationService(
      AuthenticationManager authenticationManager,
      @Value("${jwt.expirationTime}") long expirationTime,
      @Value("${jwt.secret}") String secret,
      UserRepository userRepository) {
    this.authenticationManager = authenticationManager;
    this.expirationTime = expirationTime;
    this.secret = secret;
    this.userRepository = userRepository;
  }

  public String authenticate(String username, String password) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(username, password)
    );

    UserDetails principal = (UserDetails) authentication.getPrincipal();
    return JWT.create()
        .withSubject(principal.getUsername())
        .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
        .sign(Algorithm.HMAC256(secret));
  }

  public String registerUser(String userName, String password, String repeatPassword)
      throws IllegalArgumentException {
    if (!password.equals(repeatPassword)) {
      throw new IllegalArgumentException("Passwords do not match");
    }
    if (userRepository.existsByUsername(userName)) {
      throw new IllegalArgumentException("User already exists");
    }

    userRepository.save(User.builder()
        .username(userName)
        .password("{bcrypt}" + new BCryptPasswordEncoder().encode(password))
        .enabled(true)
        .authorities(List.of(UserRole.ROLE_USER))
        .build());
    return authenticate(userName, password);
  }
}
