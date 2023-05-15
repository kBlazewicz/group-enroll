package pl.edu.agh.server.security;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {

  private final UserAuthorizationService userAuthorizationService;

  @PostMapping("/login")
  public Token login(@RequestBody LoginCredentials loginCredentials) {
    return new Token(userAuthorizationService.authenticate(loginCredentials.getUsername(),
        loginCredentials.getPassword()));
  }

  @PostMapping("/register")
  public Token register(@RequestBody RegisterCredentials registerCredentials) {
    return new Token(userAuthorizationService.registerUser(registerCredentials.getUsername(),
        registerCredentials.getPassword(),
        registerCredentials.getRepeatPassword()));
  }

  @Getter
  private static class LoginCredentials {

    private String username;
    private String password;
  }

  @Getter
  private static class RegisterCredentials {

    @NotBlank
    private String username;
    @NotBlank
    private String password;
    @NotBlank
    private String repeatPassword;
  }

  @Getter
  @AllArgsConstructor
  private static class Token {

    private String token;
  }
}
