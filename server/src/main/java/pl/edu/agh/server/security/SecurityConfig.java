package pl.edu.agh.server.security;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity(debug = true)
public class SecurityConfig {

  private final String secret;

  public SecurityConfig(@Value("${jwt.secret}") String secret) {
    this.secret = secret;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http,
      AuthenticationManager authenticationManager,
      UserDetailsService userDetailsService) throws Exception {

    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    return http.authorizeRequests(
            authorizeRequests -> authorizeRequests.requestMatchers("/tutor/**")
                .authenticated()
                .anyRequest().permitAll())
        .addFilter(new JwtAuthorizationFilter(authenticationManager, userDetailsService, secret))
        .csrf().disable()
        .build();
  }

  @Bean
  public AuthenticationManager authenticationManager(
      AuthenticationConfiguration authenticationConfiguration) throws Exception {
    return authenticationConfiguration.getAuthenticationManager();
  }

  @Bean
  UserDetailsService userDetailsService(DataSource dataSource) {
    return new JdbcUserDetailsManager(dataSource);
  }


}
