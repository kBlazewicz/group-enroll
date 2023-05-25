package pl.edu.agh.server.vote;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    private final VoteRepository repository;

    public VoteService(VoteRepository repository) {
        this.repository = repository;
    }


    public void addVote(Vote vote) {
        repository.save(vote);
    }

    public List<Vote> getVotes() {
        return repository.findAll();
    }

    public Vote getVote(Long id) {
        return repository.findById(id).orElseThrow(() -> new IllegalStateException("Vote with id: " + id + " does not exist"));
    }

    public Vote save(Vote vote) {
        return repository.save(vote);
    }

    public List<Vote> saveMany(List<Vote> votes) {
        return repository.saveAll(votes);
    }

    public void deleteVote(Long id) {
        repository.deleteById(id);
    }

    public void deleteVote(Vote vote) {
        repository.delete(vote);
    }

    public void updateVote(Vote vote) {
        repository.save(vote);
    }

}
