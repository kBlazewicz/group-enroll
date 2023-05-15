package pl.edu.agh.server.term;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.server.WeekDay;

import java.time.LocalTime;
import java.util.List;

@Configuration
public class TermConfig {

    @Bean
    CommandLineRunner commandLineRunner(TermRepository termRepository) {
        return args -> {
            Term wednesday = new Term(
                    LocalTime.of(10, 0, 0),
                    LocalTime.of(11, 30, 0),
                    WeekDay.WEDNESDAY
//                        emptyList()
            );
            Term tuesday = new Term(
                    LocalTime.of(10, 0, 0),
                    LocalTime.of(11, 30, 0),
                    WeekDay.TUESDAY
//                        emptyList()
            );

            termRepository.saveAll(
                    List.of(wednesday, tuesday)
            );
        };
    }
}
