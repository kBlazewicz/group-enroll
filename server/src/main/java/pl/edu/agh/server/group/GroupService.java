package pl.edu.agh.server.group;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.server.algorithm.Solution;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.student.StudentService;
import pl.edu.agh.server.term.Term;
import pl.edu.agh.server.term.TermService;
import pl.edu.agh.server.vote.Vote;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class GroupService {

    private final StudentService studentService;
    private final TermService termService;

    public ArrayList<ArrayList<Boolean>> getStudentsPreferences() {
        List<Student> students = studentService.getStudents();
        ArrayList<ArrayList<Boolean>> preferences = new ArrayList<>();
        for (Student student : students) {
            List<Vote> votes = student.getVotes()
                    .stream()
                    .sorted(Comparator.comparingLong(vote -> vote.getTerm().getId()))
                    .toList();
            ArrayList<Boolean> possibilities = new ArrayList<>();
            for (Vote vote : votes) {
                possibilities.add(vote.isPossibility());
            }
            preferences.add(possibilities);
        }
        return preferences;
    }

    public List<Group> getGroups(Solution solution, int numberOfGroups) {
        List<List<Student>> studentsList = solution.getGroups()
                .stream()
                .map(group -> group.stream()
                        .map(id -> studentService.getStudent((long) (id + 1)))
                        .toList())
                .toList();
        List<Term> terms = solution.getGroupsIds()
                .subList(0, numberOfGroups)
                .stream()
                .map(id -> termService.getTerm((long) (id + 1)))
                .toList();

        List<Group> groups = new LinkedList<>();
        for (int i = 0; i < terms.size(); i++) {
            groups.add(new Group(terms.get(i), studentsList.get(i)));
        }
        return groups;
    }
}
