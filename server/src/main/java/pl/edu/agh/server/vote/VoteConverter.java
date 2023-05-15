package pl.edu.agh.server.vote;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.student.StudentService;
import pl.edu.agh.server.term.Term;
import pl.edu.agh.server.term.TermService;

@RequiredArgsConstructor
@Component
public class VoteConverter {

    private final StudentService studentService;
    private final TermService termService;

    public Vote getVoteFromDTO(VoteDTO voteDTO) {
        Student student = studentService.getStudent(voteDTO.getStudentId());
        Term term = termService.getTerm(voteDTO.getTermId());
        return new Vote(student, term, voteDTO.isPossibility(), voteDTO.getComment());
    }

    public void applyChangesFromDTO(Vote vote, VoteDTO voteDTO) {
        vote.setStudent(studentService.getStudent(voteDTO.getStudentId()));
        vote.setTerm(termService.getTerm(voteDTO.getTermId()));
        vote.setPossibility(voteDTO.isPossibility());
        vote.setComment(voteDTO.getComment());
    }
}
