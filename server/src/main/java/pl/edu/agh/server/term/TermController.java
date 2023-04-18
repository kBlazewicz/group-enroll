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

    @PostMapping
    public void createNewTerm(@RequestBody Term term){
        termService.createNewTerm(term);
    }
}
