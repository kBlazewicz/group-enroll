package pl.edu.agh.server.term;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.server.WeekDay;

import java.time.LocalTime;
import java.util.List;
import java.util.Map;

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
    public void createNewTerm(@RequestBody Term term){
        termService.createNewTerm(term);
    }

    @DeleteMapping(path="{termId}")
    public void deleteTerm(@PathVariable("termId") Long termId){
        termService.deleteTerm(termId);
    }

    @PutMapping("/{termId}")
    public void updateTerm(@PathVariable Long termId, @RequestBody Term term) {
        termService.updateTerm(termId, term);
    }

//    TODO: fix patch
    @PatchMapping(path = "{termId}")
    public Term updateTermByFields(@PathVariable Long termId, Map<String, Object> fields){
        return termService.updateTermByFields(termId, fields);
    }

}
