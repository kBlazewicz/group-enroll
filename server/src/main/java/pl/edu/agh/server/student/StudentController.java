package pl.edu.agh.server.student;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final StudentConverter studentConverter;
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
        List<Student> students = studentDTOS.stream().map(studentConverter::getStudentFromDTO).toList();
        studentService.saveMany(students);
        return studentDTOS;
    }

    @PostMapping("student")
    public long saveStudent(@RequestBody StudentDTO student) {
        return studentService.save(studentConverter.getStudentFromDTO(student)).getId();
    }

    @DeleteMapping("/students/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }


    @PatchMapping(path = "/students/{id}", consumes = "application/json-patch+json")
    public StudentDTO updateStudent(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            Student student = studentService.getStudent(id);
            StudentDTO studentDTO = new StudentDTO(student);
            StudentDTO patchedStudentDTO = applyPatchToStudent(patch, studentDTO);
            studentConverter.applyChangesFromDTO(student, patchedStudentDTO);
            studentService.updateStudent(student);
            return patchedStudentDTO;
        } catch (JsonPatchException | JsonProcessingException | NoSuchElementException e) {
            return null;
        }
    }

    private StudentDTO applyPatchToStudent(JsonPatch patch, StudentDTO studentDTO) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(studentDTO, JsonNode.class));
        return objectMapper.treeToValue(patched, StudentDTO.class);
    }

}
