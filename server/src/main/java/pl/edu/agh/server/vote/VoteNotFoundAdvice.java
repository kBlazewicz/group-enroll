package pl.edu.agh.server.vote;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class VoteNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(VoteNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String voteNotFoundExceptionHandler(VoteNotFoundException ex) {
        return ex.getMessage();
    }
}
