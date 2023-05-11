package pl.edu.agh.server.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tutor")
public class TestClassTutor {

    @GetMapping
    public String test() {
        return "Hello from tutor";
    }
}
