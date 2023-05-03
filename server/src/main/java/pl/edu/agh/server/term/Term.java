package pl.edu.agh.server.term;

import jakarta.persistence.*;
import pl.edu.agh.server.Vote;
import pl.edu.agh.server.WeekDay;

import java.time.LocalTime;
import java.util.List;

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

    public Term() {
    }

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

//    public List<Vote> getVotelist() {
//        return votelist;
//    }
//
//    public void setVotelist(List<Vote> votelist) {
//        this.votelist = votelist;
//    }

    public long getTermId() {
        return termId;
    }

    public void setTermId(long termId) {
        this.termId = termId;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public WeekDay getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(WeekDay dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }
//
//    public List<Vote> getVotelist() {
//        return votelist;
//    }
//
//    public void setVotelist(List<Vote> votelist) {
//        this.votelist = votelist;
//    }
}
