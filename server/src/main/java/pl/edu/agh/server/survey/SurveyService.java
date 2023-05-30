package pl.edu.agh.server.survey;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import pl.edu.agh.server.term.Term;

import java.util.List;

@RequiredArgsConstructor
@Component
public class SurveyService {
    private final SurveyRepository surveyRepository;

    public String createSurvey(List<Term> terms){
        Survey survey;
        List<Survey> surveyList = surveyRepository.findAll();
        if (surveyList.size() == 0) {
            survey = new Survey(terms);
            surveyRepository.save(survey);
        }
        else {
            survey = surveyList
                    .stream()
                    .findFirst()
                    .orElseThrow();
        }

        return survey.linkCode;
    }

    public List<Term> getSurvey(String surveylinkCode){
        Survey survey = surveyRepository.findBylinkCode(surveylinkCode);
        if (survey == null) {
            throw new IllegalStateException("Survey with linkCode " + surveylinkCode + " not found");
        }
        return survey.getTermlist();
    }

    public boolean surveyExists(String linkCode) {
        return surveyRepository.existsByLinkCode(linkCode);
    }
}
