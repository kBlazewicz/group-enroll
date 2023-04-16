package pl.edu.agh.server;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration

public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(VoteRepository voteRepository) {
        return args -> {
            log.info("Preloading " + voteRepository.save(new Vote( 1, 1, false, "ni ma jak")));
            log.info("Preloading " + voteRepository.save(new Vote( 1, 2, true, "oczywiście, że tak")));
        };
    }
}
