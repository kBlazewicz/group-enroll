package pl.edu.agh.server.term;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/terms")
@RequiredArgsConstructor
public class TermController {
    private final TermService termService;
    private final TermConverter termConverter;

    @GetMapping
    public List<TermDTO> getTerms() {
        return termService.getTerms().stream().map(TermDTO::new).toList();
    }

    @GetMapping(path = "{termId}")
    public TermDTO getTerm(@PathVariable("termId") Long termId) {
        return new TermDTO(termService.getTerm(termId));
    }

    @PostMapping
    public void createNewTerm(@RequestBody List<TermDTO> termDTOS) {
        List<Term> terms = termDTOS.stream().map(termConverter::getTermFromDTO).toList();
        termService.createNewTerms(terms);
    }


}
