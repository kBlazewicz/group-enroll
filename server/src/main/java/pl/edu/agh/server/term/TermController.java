package pl.edu.agh.server.term;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.server.WeekDay;
import pl.edu.agh.server.vote.Vote;
import pl.edu.agh.server.vote.VoteService;

import java.time.LocalTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/terms")
@RequiredArgsConstructor
public class TermController {
    private final TermService termService;
    private final VoteService voteService;

    @GetMapping
    public List<TermDTO> getTerms(){
        return termService.getTerms().stream().map(TermDTO::new).toList();
    }

    @GetMapping(path = "{termId}")
    public TermDTO getTerm(@PathVariable("termId") Long termId){
        return new TermDTO(termService.getTerm(termId));
    }

    @PostMapping
    public void createNewTerm(@RequestBody List<TermDTO> termDTOS){
        List<Term> terms = termDTOS.stream().map(this::getTermFromDTO).toList();
        termService.createNewTerms(terms);
    }


    public Term getTermFromDTO(TermDTO termDTO) {
        Set<Vote> votes = termDTO.getVotes().stream().map(voteService::getVote).collect(Collectors.toSet());
        return new Term(termDTO.getStartTime(), termDTO.getEndTime(), termDTO.getDayOfWeek(), votes);
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class TermDTO {

        private long id;
        private LocalTime startTime;
        private LocalTime endTime;
        private WeekDay dayOfWeek;
        private Set<Long> votes;

        public TermDTO(Term term) {
            this.id = term.getTermId();
            this.startTime = term.getStartTime();
            this.endTime = term.getEndTime();
            this.dayOfWeek = term.getDayOfWeek();
            this.votes = term.getVotes().stream().map(Vote::getId).collect(Collectors.toSet());
        }
    }
}
