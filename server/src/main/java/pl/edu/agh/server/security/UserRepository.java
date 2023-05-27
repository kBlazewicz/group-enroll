package pl.edu.agh.server.security;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  boolean existsByUsername(String username);

  User findByUsername(String username);

  @Query("SELECT u.authorities FROM User u WHERE u.username = ?1")
  List<UserRole> findUserRoleByUsername(String username);
}
