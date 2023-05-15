package pl.edu.agh.server.term;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class TermService {
    private final TermRepository termRepository;

    public List<Term> getTerms() {
        return termRepository.findAll();
    }

    public Term getTerm(Long termId) {
        return termRepository.findById(termId).orElseThrow(() -> new IllegalStateException(
                "Term  with ID " + termId + " does not exist"));
    }

    public void createNewTerms(List<Term> terms) {
        termRepository.saveAll(terms);
    }
}
