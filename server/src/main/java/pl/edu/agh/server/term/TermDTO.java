package pl.edu.agh.server.term;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.edu.agh.server.WeekDay;
import pl.edu.agh.server.vote.Vote;

import java.time.LocalTime;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
class TermDTO {

    private long id;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
    private WeekDay dayOfWeek;
    private Set<Long> votes;

    public TermDTO(Term term) {
        this.id = term.getId();
        this.startTime = term.getStartTime();
        this.endTime = term.getEndTime();
        this.dayOfWeek = term.getDayOfWeek();
        this.votes = term.getVotes().stream().map(Vote::getId).collect(Collectors.toSet());
    }
}