package pl.edu.agh.server.student;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.edu.agh.server.vote.Vote;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {

    private long id;

    private String name;

    private String surname;

    private String album;

    private String email;
    private String faculty;
    private String fieldOfStudy;

    private Set<Long> votes = new HashSet<>();

    public StudentDTO(Student student) {
        this.id = student.getId();
        this.name = student.getName();
        this.surname = student.getSurname();
        this.album = student.getAlbum();
        this.email = student.getEmail();
        this.faculty = student.getFaculty();
        this.fieldOfStudy = student.getFieldOfStudy();
        this.votes = student.getVotes().stream().map(Vote::getId).collect(Collectors.toSet());
    }

}
