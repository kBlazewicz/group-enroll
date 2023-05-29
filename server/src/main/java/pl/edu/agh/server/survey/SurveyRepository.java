package pl.edu.agh.server.survey;

import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, Long> {
    Survey findBylinkCode(String linkCode);
    boolean existsByLinkCode(String linkCode);

    @NotNull List<Survey> findAll();
}
