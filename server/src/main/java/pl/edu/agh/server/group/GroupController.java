package pl.edu.agh.server.group;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.server.algorithm.SimulatedAnnealing;
import pl.edu.agh.server.algorithm.Solution;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.student.StudentService;
import pl.edu.agh.server.term.Term;
import pl.edu.agh.server.term.TermService;
import pl.edu.agh.server.vote.Vote;

import javax.servlet.http.HttpServletResponse;
import java.util.*;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {
    private final TermService termService;
    private final StudentService studentService;
    private final GroupService groupService;
    private final GroupConverter groupConverter;

    @GetMapping(path = "{numberOfGroups}")
    public List<GroupDTO> generateGroups(@PathVariable int numberOfGroups) {
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
        SimulatedAnnealing simulatedAnnealing = new SimulatedAnnealing(preferences);
        Solution solution = simulatedAnnealing.solve(numberOfGroups);
        List<List<Student>> studentsList = solution.getGroups().stream().map(group -> {
            return group.stream().map(id -> studentService.getStudent((long) (id + 1))).toList();
        }).toList();
        List<Term> terms = solution.getGroupsIds()
                .subList(0, numberOfGroups)
                .stream()
                .map(id -> termService.getTerm((long) (id + 1)))
                .toList();

        List<Group> groups = new LinkedList<>();
        for (int i = 0; i < terms.size(); i++) {
            groups.add(new Group(terms.get(i), studentsList.get(i)));
        }
        return groups.stream().map(GroupDTO::new).toList();
    }

//    @SneakyThrows
//    @PostMapping("/export")
//    public void exportToExcel(@RequestBody List<GroupDTO> groupDTOS, HttpServletResponse response){
//        System.out.println("1");
//        response.setContentType("application/octet-stream");
//
//        String headerKey = "Content-Disposition";
//        String headerValue = "attachment;filename=courses.xls";
//
//        response.setHeader(headerKey, headerValue);
//
//        groupService.exportToExcel(groupDTOS, response);
//
//        response.flushBuffer();
//    }

    @SneakyThrows
    @PostMapping("/export")
    public void exportToExcel(@RequestBody List<GroupDTO> groupDTOS, HttpServletResponse response){
        System.out.println("1");
    }

}
