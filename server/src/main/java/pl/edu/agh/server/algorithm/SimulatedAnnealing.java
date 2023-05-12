package pl.edu.agh.server.algorithm;

import java.util.ArrayList;

public class SimulatedAnnealing {
    // This class implements the simulated annealing algorithm for the group generation problem.
    // To use this class, simply create an instance of it, providing the preferences of students
    // (a 2D ArrayList of booleans, where preferences.get(i).get(j) is true if student i can attend group j) and
    // call the solve method, providing the number of groups you want to create.

    // Additionally, you can provide the groupSwapProbability parameter, which is the probability of
    // swapping two groups instead of swapping two students in every iteration.
    // The default value of this parameter is 0.5.
    // The solve method returns a Solution object, which contains the generated groups that can be extracted
    // using getGroups() method and their ids using getGroupsIds() method.

    // The constructor of this class can also take the numberOfSteps parameter, which is the number of iterations of
    // the algorithm. The default value of this parameter is 10000.

    // Note that student and group ids represent their order in the preferences array,
    // and they may not be the same as their ids in the database.

    private final int numberOfSteps;
    private final ArrayList<ArrayList<Boolean>> preferences;

    public SimulatedAnnealing(ArrayList<ArrayList<Boolean>> preferences, int numberOfSteps) {
        this.preferences = preferences;
        this.numberOfSteps = numberOfSteps;
    }

    public SimulatedAnnealing(ArrayList<ArrayList<Boolean>> preferences) {
        this.preferences = preferences;
        this.numberOfSteps = 10000;
    }

    public Solution solve(int numberOfGroups) {
        return solve(numberOfGroups, 0.5);
    }

    public Solution solve(int numberOfGroups, double groupSwapProbability) {
        // Generate initial solution
        Solution solution = new Solution(preferences, numberOfGroups);
        double temperature;
        double currentCost;
        double neighbourCost;

        // Main loop
        for (int i = 0; i < numberOfSteps; i++) {
            temperature = 1 - (double) i / numberOfSteps;
            currentCost = solution.calculateCost();
            solution.generateNeighbour(groupSwapProbability);
            neighbourCost = solution.calculateNeighbourCost();

            if (acceptance(currentCost, neighbourCost, temperature) > Math.random()) {
                solution.acceptNeighbour();
            } else {
                solution.rejectNeighbour();
            }
        }
        solution.sortGroups();
        return solution;
    }

    private double acceptance(double currentCost, double neighbourCost, double temperature) {
        if (neighbourCost < currentCost) {
            return 1;
        } else {
            return Math.exp(-(neighbourCost - currentCost) / temperature);
        }
    }
}
