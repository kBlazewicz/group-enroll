package pl.edu.agh.server.vote;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.fge.jsonpatch.JsonPatch;
import com.github.fge.jsonpatch.JsonPatchException;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.hateoas.EntityModel;

import java.util.List;
import java.util.NoSuchElementException;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
@RequiredArgsConstructor
public class VoteController {

    private final VoteService voteService;
    private final ObjectMapper objectMapper;
    private final VoteModelAssembler assembler;

    @GetMapping("/votes")
    CollectionModel<EntityModel<Vote>> getForms() {
        List<EntityModel<Vote>> votes = voteService.getForms().stream()
                .map(assembler::toModel).toList();
        return CollectionModel.of(votes, linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
    }


        @GetMapping("/votes/{id}")
        EntityModel<Vote> getForm(@PathVariable Long id) {
            Vote vote = voteService.getVote(id);
        return assembler.toModel(vote);
    }


    @PostMapping("/votes")
    ResponseEntity<?> saveForms(@RequestBody List<Vote> votes) {
        votes = voteService.saveMany(votes);
        CollectionModel<EntityModel<Vote>> votesCollection = assembler.toCollectionModel(votes);
        return ResponseEntity.created(votesCollection.getRequiredLink("votes").toUri())
                .body(votesCollection);
    }

    @PostMapping("/vote")
    ResponseEntity<?> saveForm(@RequestBody Vote vote) {
        EntityModel<Vote> entityModel = assembler.toModel(voteService.save(vote));
        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }
    @DeleteMapping("/vote/{id}")
    ResponseEntity<?> deleteVote(@PathVariable Long id) {
        voteService.deleteVote(id);
        return ResponseEntity.noContent().build();
    }


    @PatchMapping(path = "/votes/{id}", consumes = "application/json-patch+json")
    ResponseEntity<?> updateVote(@PathVariable Long id, @RequestBody JsonPatch patch) {
        try {
            Vote vote = voteService.getVote(id);
            Vote patchedVote = applyPatchToVote(patch, vote);
            voteService.updateVote(patchedVote);
            EntityModel<Vote> entityModel = assembler.toModel(patchedVote);
            return ResponseEntity
                    .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                    .body(entityModel);
        } catch (JsonPatchException | JsonProcessingException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    private Vote applyPatchToVote(JsonPatch patch, Vote vote) throws JsonPatchException, JsonProcessingException {
        JsonNode patched = patch.apply(objectMapper.convertValue(vote, JsonNode.class));
        return objectMapper.treeToValue(patched, Vote.class);
    }
}
