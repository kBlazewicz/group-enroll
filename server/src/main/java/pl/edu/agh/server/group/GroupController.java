package pl.edu.agh.server.group;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.edu.agh.server.algorithm.SimulatedAnnealing;
import pl.edu.agh.server.algorithm.Solution;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/groups")
@RequiredArgsConstructor
public class GroupController {
    private final GroupService groupService;
    private final GroupConverter groupConverter;

    @GetMapping(path = "{numberOfGroups}")
    public List<GroupDTO> generateGroups(@PathVariable int numberOfGroups) {

        ArrayList<ArrayList<Boolean>> preferences = groupService.getStudentsPreferences();
        SimulatedAnnealing simulatedAnnealing = new SimulatedAnnealing(preferences);
        Solution solution = simulatedAnnealing.solve(numberOfGroups);

        List<Group> groups = groupService.getGroups(solution, numberOfGroups);
        return groups.stream().map(GroupDTO::new).toList();
    }


}
