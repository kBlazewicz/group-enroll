package pl.edu.agh.server.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.student.StudentConverter;
import pl.edu.agh.server.term.TermConverter;

import java.util.List;

@Component
@RequiredArgsConstructor
public class GroupConverter {

    private StudentConverter studentConverter;
    private TermConverter termConverter;

    public Group getGroupFromDTO(GroupDTO groupDTO) {
        List<Student> students = groupDTO.getStudents()
                .stream()
                .map(studentDTO -> studentConverter.getStudentFromDTO(studentDTO))
                .toList();
        return new Group(termConverter.getTermFromDTO(groupDTO.getTerm()), students);
    }
}
