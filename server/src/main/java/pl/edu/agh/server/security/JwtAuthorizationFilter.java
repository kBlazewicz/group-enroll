package pl.edu.agh.server.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

  private static final String TOKEN_HEADER = "Authorization";
  private static final String TOKEN_PREFIX = "Bearer ";
  private final UserDetailsService userDetailsService;
  private final String secret;

  public JwtAuthorizationFilter(AuthenticationManager authenticationManager,
      UserDetailsService userDetailsService, String secret) {
    super(authenticationManager);
    this.userDetailsService = userDetailsService;
    this.secret = secret;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain chain) throws IOException, jakarta.servlet.ServletException {
    UsernamePasswordAuthenticationToken authentication = getAuthentication(request);
    if (authentication == null) {
      chain.doFilter(request, response);
      return;
    }
    SecurityContextHolder.getContext().setAuthentication(authentication);
    chain.doFilter(request, response);
  }


  private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
    String token = request.getHeader(TOKEN_HEADER);
    if (token != null && token.startsWith(TOKEN_PREFIX)) {
      String userName = JWT.require(Algorithm.HMAC256(secret)).build()
          .verify(token.replace(TOKEN_PREFIX, "")).getSubject();
      if (userName != null) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
        return new UsernamePasswordAuthenticationToken(userDetails.getUsername(), null,
            userDetails.getAuthorities());
      }
    }
    return null;
  }
}