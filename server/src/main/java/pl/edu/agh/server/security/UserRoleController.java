package pl.edu.agh.server.security;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-role")
public class UserRoleController {

  private final UserRepository userRepository;

  @GetMapping("/{username}")
  public UserRole getUserRole(@PathVariable("username") String username) {
    return userRepository.findUserRoleByUsername(username).stream()
        .filter(userRole -> userRole == UserRole.ROLE_TUTOR).findFirst().orElse(UserRole.ROLE_USER);
  }

  @PatchMapping("/{username}/add")
  public void setUserRole(@PathVariable("username") String username, @Param("role") UserRole role) {
    User user = userRepository.findByUsername(username);
    user.setAuthorities(List.of(role));
    userRepository.save(user);
  }

  @PatchMapping("/{username}/remove")
  public void resetUserRole(@PathVariable("username") String username) {
    User user = userRepository.findByUsername(username);
    user.setAuthorities(List.of(UserRole.ROLE_USER));
    userRepository.save(user);
  }
}
