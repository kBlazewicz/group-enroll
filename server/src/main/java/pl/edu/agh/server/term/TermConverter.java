package pl.edu.agh.server.term;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.agh.server.vote.Vote;
import pl.edu.agh.server.vote.VoteService;

import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Component
public class TermConverter {

    public Term getTermFromDTO(TermDTO termDTO) {
        return new Term(termDTO.getStartTime(), termDTO.getEndTime(), termDTO.getDayOfWeek());
    }
}
