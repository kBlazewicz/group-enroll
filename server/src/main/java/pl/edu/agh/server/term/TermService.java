package pl.edu.agh.server.term;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.edu.agh.server.WeekDay;

import java.time.LocalTime;
import java.util.List;

@Component
public class TermService {
    private final TermRepository termRepository;

    @Autowired
    public TermService(TermRepository termRepository) {
        this.termRepository = termRepository;
    }

    public List<Term> getTerms(){
        return termRepository.findAll();
    }

    public void createNewTerm(Term term) {
        System.out.println(term);
    }
}
