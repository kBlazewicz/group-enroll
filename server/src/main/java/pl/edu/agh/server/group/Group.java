package pl.edu.agh.server.group;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.term.Term;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class Group {

    private Term term;
    private List<Student> students;
}
