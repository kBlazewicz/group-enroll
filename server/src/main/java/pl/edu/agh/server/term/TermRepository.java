package pl.edu.agh.server.term;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.server.term.Term;

@Repository
public interface TermRepository extends JpaRepository<Term, Long> {
}
