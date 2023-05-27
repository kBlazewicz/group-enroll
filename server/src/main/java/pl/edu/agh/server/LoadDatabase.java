package pl.edu.agh.server;

import java.util.Arrays;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.server.security.User;
import pl.edu.agh.server.security.UserAuthorizationService;
import pl.edu.agh.server.security.UserRepository;
import pl.edu.agh.server.security.UserRole;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, UserAuthorizationService authorizationService) {
        return args -> {
            log.info("JWT token for admin: " + authorizationService.registerUser("admin", "test","test"));
            User user = userRepository.findByUsername("admin");
            user.setAuthorities(List.of(UserRole.ROLE_TUTOR));
            userRepository.save(user);
        };
    }
}
