package pl.edu.agh.server.vote;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.server.student.Student;
import pl.edu.agh.server.term.Term;
import pl.edu.agh.server.term.TermService;

import java.util.List;
import java.util.NoSuchElementException;


@RestController
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;
    private final VoteConverter voteConverter;
    private final ObjectMapper objectMapper;
    private final TermService termService;

    @GetMapping("/votes")
    public List<VoteDTO> getVotes() {
        List<Vote> votes = voteService.getVotes();
        return votes.stream().map(VoteDTO::new).toList();
    }


    @GetMapping("/votes/{id}")
    public VoteDTO getVote(@PathVariable Long id) {
        return new VoteDTO(voteService.getVote(id));
    }


    @PostMapping("/votes")
    public List<VoteDTO> saveVotes(@RequestBody List<VoteDTO> voteDTOS) {
        List<Vote> votes = voteDTOS.stream().map(voteConverter::getVoteFromDTO).toList();
        votes = voteService.saveMany(votes);

        List<Term> terms = termService.getTerms();
        Student student = votes.get(0).getStudent();
        for (Term term : terms){
            boolean voted = false;
            for (Vote studentVote : student.getVotes()) {
                if (studentVote.getTerm().getId() == term.getId()){
                    voted = true;
                    break;
                }
            }
            if (!voted){
                Vote notPossibleVote = new Vote(student, term, false, "");
                voteService.save(notPossibleVote);
            }
        }
        return voteDTOS;
    }

    @PostMapping("/vote")
    public VoteDTO saveVote(@RequestBody VoteDTO voteDTO) {
        voteService.save(voteConverter.getVoteFromDTO(voteDTO));
        return voteDTO;
    }

    @DeleteMapping("/votes/{id}")
    public void deleteVote(@PathVariable Long id) {
        voteService.deleteVote(id);
    }


    @PatchMapping(path = "/votes/{id}", consumes = "application/json-patch+json")
    public ResponseEntity<?> updateVote(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            Vote vote = voteService.getVote(id);
            VoteDTO voteDTO = new VoteDTO(vote);
            VoteDTO patchedVoteDTO = applyPatchToVote(patch, voteDTO);
            voteConverter.applyChangesFromDTO(vote, patchedVoteDTO);
            voteService.updateVote(vote);
            return ResponseEntity.ok(patchedVoteDTO);
        } catch (JsonPatchException | JsonProcessingException | NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e);
        }
    }

    private VoteDTO applyPatchToVote(JsonPatch patch, VoteDTO voteDTO) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(voteDTO, JsonNode.class));
        return objectMapper.treeToValue(patched, VoteDTO.class);
    }


}
