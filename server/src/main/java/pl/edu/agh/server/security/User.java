package pl.edu.agh.server.security;

import jakarta.annotation.Nonnull;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import java.io.Serializable;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@ToString
@EqualsAndHashCode
@Table(name = "users")
public class User implements Serializable {

  @Id
  @GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
  private Long id;

  @Nonnull
  @Column(unique = true)
  private String username;

  @Nonnull
  private String password;

  @Nonnull
  private boolean enabled;

  @ElementCollection
  @CollectionTable(name = "authorities", joinColumns = @JoinColumn(name = "username", referencedColumnName = "username"))
  @Column(name = "authorities")
  @Enumerated(EnumType.STRING)
  private List<UserRole> authorities;
}
