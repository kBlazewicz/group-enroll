package pl.edu.agh.server.term;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;
import pl.edu.agh.server.WeekDay;

import java.lang.reflect.Field;
import java.sql.Ref;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    public void createNewTerm(Term term) {
        termRepository.save(term);
    }

    public void deleteTerm(Long termId) {
        boolean exists = termRepository.existsById(termId);
        if (!exists){
            throw new IllegalStateException("Term with ID " + termId + " does not exist");
        }
        termRepository.deleteById(termId);
    }

//    public Term partialUpdateTerm(Long termId, Map<String, Object> fields) {
//        Term term = termRepository.findById(termId).orElseThrow(() -> new IllegalStateException(
//                "Term  with ID " + termId + " does not exist"));
//
//        fields.forEach((key, value)->{
//            Field field = ReflectionUtils.findField(Term.class, key);
//            field.setAccessible(true);
//            ReflectionUtils.setField(field, term, value);
//        });
//
//        return termRepository.save(term);
//    }

    public void updateTerm(Long termId, Term term) {
        Term oldTerm = termRepository.findById(termId).get();
        oldTerm.setStartTime(term.getStartTime());
        oldTerm.setEndTime(term.getEndTime());
        oldTerm.setDayOfWeek(term.dayOfWeek);
        termRepository.save(oldTerm);
    }

    public Term updateTermByFields(Long termId, Map<String, Object> fields) {
        Optional<Term> term = termRepository.findById(termId);

        if (term.isPresent()) {
            fields.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(Term.class, key);
                field.setAccessible(true);
                ReflectionUtils.setField(field, term.get(), value);
            });
            return termRepository.save(term.get());
        }
        return null;
    }
}
