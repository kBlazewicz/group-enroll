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

    private final VoteService voteService;

    public Term getTermFromDTO(TermDTO termDTO) {
        Set<Vote> votes = termDTO.getVotes().stream().map(voteService::getVote).collect(Collectors.toSet());
        return new Term(termDTO.getStartTime(), termDTO.getEndTime(), termDTO.getDayOfWeek(), votes);
    }
}
