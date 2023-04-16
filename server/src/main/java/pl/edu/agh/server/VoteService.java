package pl.edu.agh.server;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    private final VoteRepository repository;

    public VoteService(VoteRepository repository) {
        this.repository = repository;
    }


    public void addForm(Vote vote) {
        repository.save(vote);
    }
    public List<Vote> getForms() {
        return repository.findAll();
    }
    public Vote getVote(Long id) {
        return repository.findById(id).orElseThrow(() -> null);
    }
    public Vote save(Vote vote) {
        return repository.save(vote);
    }
    public boolean deleteForm(Vote vote) {
        if (repository.findById(vote.getId()).isPresent()) {
            repository.delete(vote);
            return true;
        }
        return false;
    }
    public void updateForm(Vote vote) {
        repository.save(vote);
    }

}
