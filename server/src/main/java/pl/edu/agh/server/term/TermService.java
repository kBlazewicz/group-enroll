package pl.edu.agh.server.term;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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

    public Term getTerm(Long termId) {
        return termRepository.findById(termId).orElseThrow(() -> new IllegalStateException(
                "Term  with ID " + termId + " does not exist"));
    }

    public void createNewTerms(List<Term> terms){
        termRepository.saveAll(terms);
    }
}
