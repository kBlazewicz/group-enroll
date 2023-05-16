package pl.edu.agh.server.survey;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.server.term.Term;
import pl.edu.agh.server.term.TermConverter;
import pl.edu.agh.server.term.TermDTO;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/survey")
public class SurveyController {
    private final SurveyService surveyService;

    @GetMapping(path = "{linkCode}")
    public List<TermDTO> getSurvey(@PathVariable("linkCode") String surveyLinkCode){
        return surveyService.getSurvey(surveyLinkCode).stream().map(TermDTO::new).toList();
    }
}
