package pl.edu.agh.server.group;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.agh.server.student.StudentDTO;
import pl.edu.agh.server.term.TermDTO;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GroupDTO {

    private TermDTO term;
    private List<StudentDTO> students;

    public GroupDTO(Group group) {
        students = group.getStudents().stream().map(StudentDTO::new).toList();
        term = new TermDTO(group.getTerm());
    }
}
