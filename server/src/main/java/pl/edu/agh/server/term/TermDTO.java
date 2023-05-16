package pl.edu.agh.server.term;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
    private WeekDay dayOfWeek;

    public TermDTO(Term term) {
        this.id = term.getId();
        this.startTime = term.getStartTime();
        this.endTime = term.getEndTime();
        this.dayOfWeek = term.getDayOfWeek();
    }
}