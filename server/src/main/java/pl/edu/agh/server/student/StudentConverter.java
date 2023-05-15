package pl.edu.agh.server.student;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.agh.server.vote.Vote;
import pl.edu.agh.server.vote.VoteService;

import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class StudentConverter {

    private final VoteService voteService;

    public Student getStudentFromDTO(StudentDTO studentDTO) {
        Set<Vote> votes = studentDTO.getVotes().stream().map(voteService::getVote).collect(Collectors.toSet());
        return new Student(studentDTO.getName(), studentDTO.getSurname(), studentDTO.getAlbum(), studentDTO.getEmail(),
                studentDTO.getFaculty(), studentDTO.getFieldOfStudy(), votes);
    }

    public void applyChangesFromDTO(Student student, StudentDTO studentDTO) {
        student.setAlbum(studentDTO.getAlbum());
        student.setName(studentDTO.getName());
        student.setSurname(studentDTO.getSurname());
        student.setEmail(studentDTO.getEmail());
        student.setFaculty(studentDTO.getFaculty());
        student.setFieldOfStudy(studentDTO.getFieldOfStudy());
        student.setVotes(studentDTO.getVotes().stream().map(voteService::getVote).collect(Collectors.toSet()));
    }

}
