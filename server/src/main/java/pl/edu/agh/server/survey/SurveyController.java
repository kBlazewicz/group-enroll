package pl.edu.agh.server.survey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.server.term.Term;

import java.util.List;

@RestController
@RequestMapping("/survey")
public class SurveyController {
    private final SurveyService surveyService;

    @Autowired
    public SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @PostMapping
    public String createSurvey(@RequestBody List<Term> terms){
        return surveyService.createSurvey(terms);
    }

    @GetMapping(path = "{linkCode}")
    public Survey getSurvey(@PathVariable("linkCode") String surveyLinkCode){
        return surveyService.getSurvey(surveyLinkCode);
    }
}
