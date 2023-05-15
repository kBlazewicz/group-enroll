package pl.edu.agh.server.term;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import pl.edu.agh.server.WeekDay;

import java.time.LocalTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public
class TermDTO {

    private long id;
    private LocalTime startTime;
    private LocalTime endTime;
    private WeekDay dayOfWeek;

    public TermDTO(Term term) {
        this.id = term.getTermId();
        this.startTime = term.getStartTime();
        this.endTime = term.getEndTime();
        this.dayOfWeek = term.getDayOfWeek();
    }
}