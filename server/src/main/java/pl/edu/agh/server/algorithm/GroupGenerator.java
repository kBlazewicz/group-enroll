package pl.edu.agh.server.algorithm;

import java.util.ArrayList;

public class GroupGenerator {
    // This class is used purely for testing and visualising the simulated annealing algorithm and
    // should not be used in production.

    public static ArrayList<ArrayList<Boolean>> generatePreferences(
            int numberOfStudents,
            int numberOfGroups,
            double preferenceProbability
    ) {
        // This method generates random preferences for students and its purpose is purely for running tests.
        ArrayList<ArrayList<Boolean>> preferences = new ArrayList<>();
        for (int i = 0; i < numberOfStudents; i++) {
            preferences.add(new ArrayList<>());
            for (int j = 0; j < numberOfGroups; j++) {
                preferences.get(i).add(Math.random() < preferenceProbability);
            }
        }
        return preferences;
    }

    public static void main(String[] args) {
        // Generating random preferences
        ArrayList<ArrayList<Boolean>> preferences = generatePreferences(
                50,
                10,
                0.6
        );

        // Solving the problem
        SimulatedAnnealing simulatedAnnealing = new SimulatedAnnealing(preferences);
        Solution solution = simulatedAnnealing.solve(3);

        System.out.println(solution);
    }
}
