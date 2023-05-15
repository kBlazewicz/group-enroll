package pl.edu.agh.server.vote;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
class VoteDTO {

    private long id;
    private long studentId;
    private long termId;
    private String comment;
    private boolean possibility;

    public VoteDTO(Vote vote) {
        this.id = vote.getId();
        this.studentId = vote.getStudent().getId();
        this.termId = vote.getTerm().getTermId();
        this.possibility = vote.isPossibility();
        this.comment = vote.getComment();
    }
}