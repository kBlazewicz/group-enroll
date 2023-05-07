package pl.edu.agh.server.vote;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @Nonnull
    private Long studentId;


    public Vote(long studentId, long termId, boolean possibility, String comment) {
        this.studentId = studentId;
        this.termId = termId;
        this.possibility = possibility;
        this.comment = comment;
    }

    @Nonnull
    private Long termId;

    //TODO
    //student and term classes
//    @ManyToOne
//    @Nonnull

//    private Student student;
//    @ManyToOne
//    @Nonnull

//    private Term term;

    @Nonnull
    private boolean possibility;

    private String comment;

}
