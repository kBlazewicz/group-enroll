package pl.edu.agh.server.vote;

import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import java.util.LinkedList;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class VoteModelAssembler implements RepresentationModelAssembler<Vote, EntityModel<Vote>> {

    @Override
    public EntityModel<Vote> toModel(Vote vote) {
        return EntityModel.of(vote,
                linkTo(methodOn(VoteController.class).getForm(vote.getId())).withSelfRel(),
                linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
    }

    @Override
    public CollectionModel<EntityModel<Vote>> toCollectionModel(Iterable<? extends Vote> votes) {
        LinkedList<EntityModel<Vote>> voteModels = new LinkedList<>();
        for (Vote vote: votes) {
            EntityModel<Vote> entityModel = toModel(vote);
            voteModels.add(entityModel);
        }
        return CollectionModel.of(voteModels,
                linkTo(methodOn(VoteController.class).getForms()).withRel("votes"));
    }
}
