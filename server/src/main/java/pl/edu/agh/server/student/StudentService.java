package pl.edu.agh.server.student;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    private final StudentRepository repository;

    public StudentService(StudentRepository repository) {
        this.repository = repository;
    }

    public void addStudent(Student student) {
        repository.save(student);
    }

    public List<Student> getStudents() {
        return repository.findAll();
    }

    public Student getStudent(Long id) {
        try {
            return repository.findById(id).orElseThrow(() -> new IllegalStateException("Student with id: " + id + "not found"));
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    public Student save(Student student) {
        return repository.save(student);
    }

    public List<Student> saveMany(List<Student> students) {
        return repository.saveAll(students);
    }

    public void deleteStudent(Long id) {
        repository.deleteById(id);
    }

    public void deleteStudent(Student student) {
        repository.delete(student);
    }

    public void updateStudent(Student student) {
        repository.save(student);
    }
}
