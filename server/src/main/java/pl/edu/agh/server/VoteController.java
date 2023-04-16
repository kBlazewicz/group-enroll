package pl.edu.agh.server;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.hateoas.EntityModel;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class VoteController {

    private final VoteService voteService;
    public VoteController(VoteService formService) {
        this.voteService = formService;
    }

    @GetMapping("/votes")
    CollectionModel<EntityModel<Vote>> getForms() {
        List<EntityModel<Vote>> votes = voteService.getForms().stream()
                .map(vote -> {
                    return EntityModel.of(vote,
                            linkTo(methodOn(VoteController.class).getForm(vote.getId())).withSelfRel(),
                            linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
                }).toList();
        return CollectionModel.of(votes, linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
    }


    @GetMapping("/votes/{id}")
    EntityModel<Vote> getForm(@PathVariable Long id) {
        Vote vote = voteService.getVote(id);
        return EntityModel.of(vote,
                linkTo(methodOn(VoteController.class).getForm(vote.getId())).withSelfRel(),
                linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
    }


    @PostMapping("/votes")
    ResponseEntity<?> saveForms(@RequestBody List<Vote> votes) {
        ArrayList<EntityModel<Vote>> voteModels = new ArrayList<>();
        for (Vote vote: votes) {
            EntityModel<Vote> entityModel = EntityModel.of(voteService.save(vote),
                    linkTo(methodOn(VoteController.class).getForm(vote.getId())).withSelfRel(),
                    linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
            voteModels.add(entityModel);
        }
        CollectionModel<EntityModel<Vote>> votesCollection = CollectionModel.of(voteModels,
                linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
        return ResponseEntity.created(votesCollection.getRequiredLink("votes").toUri())
                .body(votesCollection);
    }

    @PostMapping("/vote")
    ResponseEntity<?> saveForm(@RequestBody Vote vote) {
        EntityModel<Vote> entityModel = EntityModel.of(voteService.save(vote),
                linkTo(methodOn(VoteController.class).getForm(vote.getId())).withSelfRel(),
                linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

}
