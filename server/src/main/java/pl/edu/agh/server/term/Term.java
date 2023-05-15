package pl.edu.agh.server.term;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import pl.edu.agh.server.WeekDay;
import pl.edu.agh.server.vote.Vote;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

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
    @OneToMany(mappedBy="term")
    Set<Vote> votes;

    public Term(LocalTime startTime, LocalTime endTime, WeekDay dayOfWeek) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek;
        votes = new HashSet<>();
    }

    public Term(LocalTime startTime, LocalTime endTime, WeekDay dayOfWeek, Set<Vote> votes) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek;
        this.votes = votes;
    }

    public void addVote(Vote vote) {
        votes.add(vote);
    }
}
