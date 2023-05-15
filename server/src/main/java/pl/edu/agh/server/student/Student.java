package pl.edu.agh.server.student;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.agh.server.vote.Vote;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Nonnull
    private String name;
    @Nonnull
    private String surname;
    @Nonnull
    private String album;
    @Nonnull
    private String email;
    @Nonnull
    private String faculty;
    @Nonnull
    private String fieldOfStudy;

    @OneToMany(mappedBy = "student")
    private Set<Vote> votes;

    public Student(String name, String surname, String album, String email, String faculty, String fieldOfStudy) {
        this.name = name;
        this.surname = surname;
        this.album = album;
        this.email = email;
        this.faculty = faculty;
        this.fieldOfStudy = fieldOfStudy;
        this.votes = new HashSet<>();
    }

    public Student(String name, String surname, String album, String email, String faculty, String fieldOfStudy, Set<Vote> votes) {
        this(name, surname, album, email, faculty, fieldOfStudy);
        this.votes = votes;
    }

    public void addVote(Vote vote) {
        votes.add(vote);
    }

}
