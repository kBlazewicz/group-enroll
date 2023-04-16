package pl.edu.agh.server;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class Vote {
    @Id
    @GeneratedValue
    @Getter
    @Setter
    private Long id;


    @Setter
    @Getter
    @Nonnull
    private Long studentId;


    public Vote() {}

    public Vote(long studentId, long termId, boolean possibility, String comment) {
        this.studentId = studentId;
        this.termId = termId;
        this.possibility = possibility;
        this.comment = comment;
    }

    @Getter
    @Setter
    @Nonnull
    private Long termId;

    //TODO
    //student and term classes
//    @ManyToOne
//    @Nonnull
//    @Getter
//    @Setter
//    private Student student;
//    @ManyToOne
//    @Nonnull
//    @Getter
//    @Setter
//    private Term term;
    @Getter
    @Setter
    @Nonnull
    private boolean possibility;

    @Getter
    @Setter
    private String comment;

}
