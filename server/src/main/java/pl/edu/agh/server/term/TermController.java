package pl.edu.agh.server.term;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/terms")
public class TermController {
    private final TermService termService;

    @Autowired
    public TermController(TermService termService) {
        this.termService = termService;
    }

    @GetMapping
    public List<Term> getTerms(){
        return termService.getTerms();
    }

    @GetMapping(path = "{termId}")
    public Term getTerm(@PathVariable("termId") Long termId){
        return termService.getTerm(termId);
    }

    @PostMapping
    public String createNewTerm(@RequestBody List<Term> terms){
        return termService.createNewTerms(terms);
    }
}
