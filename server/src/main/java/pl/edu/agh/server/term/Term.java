package pl.edu.agh.server.term;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.agh.server.WeekDay;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "terms")
public class Term {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long termId;
    LocalTime startTime;
    LocalTime endTime;
    WeekDay dayOfWeek;
//    TODO: uncomment voteList after merge with Vote
//    @OneToMany
//    List<Vote> votelist;

    public Term(LocalTime startTime, LocalTime endTime, WeekDay dayOfWeek) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek;
    }

    public Term(long id, LocalTime startTime, LocalTime endTime, WeekDay dayOfWeek) {
        this.termId = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek;
    }
}
