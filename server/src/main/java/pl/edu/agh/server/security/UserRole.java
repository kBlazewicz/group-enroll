package pl.edu.agh.server.security;

public enum UserRole {
  ROLE_TUTOR("TUTOR"),
  ROLE_USER("USER");

  private final String role;

  UserRole(String role) {
    this.role = role;
  }
}
