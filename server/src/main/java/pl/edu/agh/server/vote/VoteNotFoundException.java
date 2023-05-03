package pl.edu.agh.server.vote;

public class VoteNotFoundException extends RuntimeException {

    public VoteNotFoundException(Long id) {
        super("Could not find vote " + id);
    }
}
