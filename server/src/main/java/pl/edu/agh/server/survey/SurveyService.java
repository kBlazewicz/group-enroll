package pl.edu.agh.server.survey;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class SurveyService {
    private final SurveyRepository surveyRepository;

    public Survey getSurvey(String surveylinkCode){
        Survey survey = surveyRepository.findBylinkCode(surveylinkCode);
        if (survey == null) {
            throw new IllegalStateException("Survey with linkCode " + surveylinkCode + " not found");
        }
        return survey;
    }
}
