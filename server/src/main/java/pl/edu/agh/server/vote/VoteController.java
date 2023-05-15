package pl.edu.agh.server.vote;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.student.StudentService;
import pl.edu.agh.server.term.Term;
import pl.edu.agh.server.term.TermService;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;
    private final StudentService studentService;
    private final TermService termService;
    private final ObjectMapper objectMapper;

    @GetMapping("/votes")
    public List<VoteDTO> getVotes() {
        List<Vote> votes = voteService.getVotes();
        List<VoteDTO> voteDTOS = votes.stream().map(VoteDTO::new).toList();
        return voteDTOS;
    }


    @GetMapping("/votes/{id}")
    public VoteDTO getVote(@PathVariable Long id) {
        return new VoteDTO(voteService.getVote(id));
    }


    @PostMapping("/votes")
    public List<VoteDTO> saveVotes(@RequestBody List<VoteDTO> voteDTOS) {
        List<Vote> votes = voteDTOS.stream().map(this::getVoteFromDTO).toList();
        votes = voteService.saveMany(votes);
        return voteDTOS;
    }

    @PostMapping("/vote")
    public VoteDTO saveVote(@RequestBody VoteDTO voteDTO) {
        voteService.save(getVoteFromDTO(voteDTO));
        return voteDTO;
    }
    @DeleteMapping("/votes/{id}")
    public void deleteVote(@PathVariable Long id) {
        voteService.deleteVote(id);
    }


    @PatchMapping(path = "/votes/{id}", consumes = "application/json-patch+json")
    public VoteDTO updateVote(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            Vote vote = voteService.getVote(id);
            VoteDTO voteDTO = new VoteDTO(vote);
            VoteDTO patchedVoteDTO = applyPatchToVote(patch, voteDTO);
            vote.setStudent(studentService.getStudent(patchedVoteDTO.getStudentId()));
            vote.setTerm(termService.getTerm(patchedVoteDTO.getTermId()));
            vote.setPossibility(patchedVoteDTO.isPossibility());
            vote.setComment(patchedVoteDTO.getComment());
            voteService.updateVote(vote);
            return patchedVoteDTO;
        } catch (JsonPatchException | JsonProcessingException | NoSuchElementException e) {
            return null;
        }
    }

    private VoteDTO applyPatchToVote(JsonPatch patch, VoteDTO voteDTO) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(voteDTO, JsonNode.class));
        return objectMapper.treeToValue(patched, VoteDTO.class);
    }


    public Vote getVoteFromDTO(VoteDTO voteDTO) {
        Student student = studentService.getStudent(voteDTO.getStudentId());
        Term term = termService.getTerm(voteDTO.getTermId());
        return new Vote(student, term, voteDTO.isPossibility(), voteDTO.getComment());
    }
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    private static class VoteDTO {

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
}
