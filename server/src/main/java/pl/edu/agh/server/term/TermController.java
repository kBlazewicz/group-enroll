package pl.edu.agh.server.term;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TermController {
    private final TermService termService;
    private final TermConverter termConverter;

    @GetMapping("/terms")
    public List<TermDTO> getTerms() {
        return termService.getTerms().stream().map(TermDTO::new).toList();
    }

    @GetMapping(path = "/terms{termId}")
    public TermDTO getTerm(@PathVariable("termId") Long termId) {
        return new TermDTO(termService.getTerm(termId));
    }

    @PostMapping("/terms")
    public String createNewTerms(@RequestBody List<TermDTO> termDTOS) {
        List<Term> terms = termDTOS.stream().map(termConverter::getTermFromDTO).toList();
        return termService.createNewTerms(terms);
    }
}
