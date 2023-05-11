package pl.edu.agh.server.security;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.validation.annotation.Validated;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@NotNull
@Builder
@ToString
@EqualsAndHashCode
@Validated
public class Authorities {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.AUTO)
    private long id;

    @NotNull
    @OneToOne
    private User user;

    @Size(min = 2, max = 50)
    @NotNull
    private String authority;
}
