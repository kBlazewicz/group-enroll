package pl.edu.agh.server.vote;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.term.Term;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    public Vote(Student student, Term term, boolean possibility, String comment) {
        this.student = student;
        this.term = term;
        this.possibility = possibility;
        this.comment = comment;

    }

    @ManyToOne
    @JoinColumn(name="student_id", nullable=false)
    @Nonnull
    private Student student;
    @ManyToOne
    @JoinColumn(name="term_id", nullable=false)
    @Nonnull
    private Term term;

    @Nonnull
    private boolean possibility;

    private String comment;

}
