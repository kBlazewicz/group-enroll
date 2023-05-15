package pl.edu.agh.server.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.server.vote.Vote;
import pl.edu.agh.server.vote.VoteService;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final VoteService voteService;
    private final ObjectMapper objectMapper;
    @GetMapping("/students")
    public List<StudentDTO> getStudents() {
        return studentService.getStudents().stream().map(StudentDTO::new).toList();
    }


    @GetMapping("/students/{id}")
    public StudentDTO getStudent(@PathVariable Long id) {
        return new StudentDTO(studentService.getStudent(id));
    }


    @PostMapping
    public List<StudentDTO> saveStudents(@RequestBody List<StudentDTO> studentDTOS) {
        List<Student> students = studentDTOS.stream().map(this::getStudentFromDTO).toList();
        studentService.saveMany(students);
        return studentDTOS;
    }

    @PostMapping("student")
    public long saveStudent(@RequestBody StudentDTO student) {
        return studentService.save(getStudentFromDTO(student)).getId();
    }
    @DeleteMapping("/students/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }


    @PatchMapping(path = "/students/{id}", consumes = "application/json-patch+json")
    public StudentDTO updateStudent(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            Student student = studentService.getStudent(id);
            Student patchedStudent = applyPatchToStudent(patch, student);
            studentService.updateStudent(patchedStudent);
            return new StudentDTO(patchedStudent);
        } catch (JsonPatchException | JsonProcessingException | NoSuchElementException e) {
            return null;
        }
    }

    private Student applyPatchToStudent(JsonPatch patch, Student student) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(student, JsonNode.class));
        return objectMapper.treeToValue(patched, Student.class);
    }


    public Student getStudentFromDTO(StudentDTO studentDTO) {
        Set<Vote> votes = studentDTO.getVotes().stream().map(voteService::getVote).collect(Collectors.toSet());
        return new Student(studentDTO.getName(), studentDTO.getSurname(), studentDTO.getAlbum(), studentDTO.getEmail(),
                studentDTO.getFaculty(), studentDTO.getFieldOfStudy(), votes);
    }
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class StudentDTO {

        private long id;

        private String name;

        private String surname;

        private String album;

        private String email;
        private String faculty;
        private String fieldOfStudy;

        private Set<Long> votes;

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
}
