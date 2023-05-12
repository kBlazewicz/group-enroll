package pl.edu.agh.server.algorithm;

import java.util.ArrayList;
import java.util.Collections;

public class Solution {
    private final ArrayList<ArrayList<Boolean>> preferences;
    private final int numberOfAllGroups;
    private final int numberOfGroups;
    private final ArrayList<Integer> groupIds;
    private final ArrayList<ArrayList<Integer>> currentSolution;

    private boolean hasNeighbour = false;
    private boolean neighbourSwappedGroups = false;
    private boolean neighbourSwappedStudents = false;

    private int neighbourGroup1;
    private int neighbourGroup2;
    private int neighbourStudent1;
    private int neighbourStudent2;

    public Solution(ArrayList<ArrayList<Boolean>> preferences, int numberOfGroups) {
        // Read arguments
        this.preferences = preferences;
        this.numberOfAllGroups = preferences.get(0).size();
        this.numberOfGroups = numberOfGroups;

        // Generate initial groupIds
        this.groupIds = new ArrayList<>();
        for (int i = 0; i < numberOfAllGroups; i++) {
            groupIds.add(i);
        }
        Collections.shuffle(groupIds);

        // Generate initial solution
        currentSolution = new ArrayList<>();
        for (int i = 0; i < numberOfGroups; i++) {
            currentSolution.add(new ArrayList<>());
        }

        ArrayList<Integer> studentIds = new ArrayList<>();
        for (int i = 0; i < preferences.size(); i++) {
            studentIds.add(i);
        }
        Collections.shuffle(studentIds);
        for (int i = 0; i < studentIds.size(); i++) {
            currentSolution.get(i % numberOfGroups).add(studentIds.get(i));
        }
    }

    public ArrayList<ArrayList<Integer>> getGroups() {
        return currentSolution;
    }

    public ArrayList<Integer> getGroupsIds() {
        return groupIds;
    }

    public int calculateCost() {
        int cost = 0;

        // Calculate cost for each group
        for (int i = 0; i < numberOfGroups; i++) {
            ArrayList<Integer> group = currentSolution.get(i);
            int groupId = groupIds.get(i);
            for (int studentId : group) {
                if (!preferences.get(studentId).get(groupId)) {
                    cost++;
                }
            }
        }
        return cost;
    }

    public void generateNeighbour(double groupSwapProbability) {
        if (hasNeighbour) {
            throw new IllegalStateException("Neighbour has already been generated");
        }
        if (Math.random() < groupSwapProbability) {
            chooseGroupsToSwap();
            neighbourSwappedGroups = true;
        } else {
            chooseStudentsToSwap();
            neighbourSwappedStudents = true;
        }
        hasNeighbour = true;
    }

    public int calculateNeighbourCost() {
        if (!hasNeighbour) {
            throw new IllegalStateException("Neighbour has not been generated");
        }
        applyNeighbourChanges();
        int cost = calculateCost();
        undoNeighbourChanges();
        return cost;
    }

    private void applyNeighbourChanges() {
        if (!hasNeighbour) {
            throw new IllegalStateException("Neighbour has not been generated");
        }

        if (neighbourSwappedGroups) {
            // Swap groups
            int temp = groupIds.get(neighbourGroup1);
            groupIds.set(neighbourGroup1, groupIds.get(neighbourGroup2));
            groupIds.set(neighbourGroup2, temp);
        } else if (neighbourSwappedStudents) {
            // Swap students
            int temp = currentSolution.get(neighbourGroup1).get(neighbourStudent1);
            currentSolution.get(neighbourGroup1).set(neighbourStudent1, currentSolution.get(neighbourGroup2).get(neighbourStudent2));
            currentSolution.get(neighbourGroup2).set(neighbourStudent2, temp);
        }
    }

    private void undoNeighbourChanges() {
        applyNeighbourChanges();
    }

    private void resetNeighbour() {
        if (!hasNeighbour) {
            throw new IllegalStateException("Neighbour has not been generated");
        }

        neighbourSwappedGroups = false;
        neighbourSwappedStudents = false;
        hasNeighbour = false;
        neighbourGroup1 = -1;
        neighbourGroup2 = -1;
        neighbourStudent1 = -1;
        neighbourStudent2 = -1;
    }

    public void acceptNeighbour() {
        applyNeighbourChanges();
        resetNeighbour();
    }

    public void rejectNeighbour() {
        resetNeighbour();
    }

    private void chooseGroupsToSwap() {
        if (numberOfAllGroups == 1) {
            return;
        }

        // Choose two groups
        int firstGroup = (int) (Math.random() * numberOfAllGroups);
        int secondGroup;
        do {
            secondGroup = (int) (Math.random() * numberOfAllGroups);
        } while (firstGroup == secondGroup);

        // Save chosen groups
        neighbourGroup1 = firstGroup;
        neighbourGroup2 = secondGroup;
    }

    private void chooseStudentsToSwap() {
        if (numberOfGroups == 1) {
            return;
        }

        // Choose two groups
        int firstGroup = (int) (Math.random() * numberOfGroups);
        int secondGroup;
        do {
            secondGroup = (int) (Math.random() * numberOfGroups);
        } while (firstGroup == secondGroup);

        // Save chosen groups
        neighbourGroup1 = firstGroup;
        neighbourGroup2 = secondGroup;

        // Choose two students
        int firstStudent = (int) (Math.random() * currentSolution.get(firstGroup).size());
        int secondStudent = (int) (Math.random() * currentSolution.get(secondGroup).size());

        // Save chosen students
        neighbourStudent1 = firstStudent;
        neighbourStudent2 = secondStudent;
    }

    public void sortGroups() {
        for (int i = 0; i < numberOfGroups; i++) {
            Collections.sort(currentSolution.get(i));
        }
    }
    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("Solution: ");
        stringBuilder.append("cost = ");
        stringBuilder.append(calculateCost());
        stringBuilder.append("\ngroupIds = ");
        stringBuilder.append(groupIds.subList(0, numberOfGroups));
        sortGroups();
        for (int i = 0; i < numberOfGroups; i++) {
            stringBuilder.append("\ngroup ");
            stringBuilder.append(groupIds.get(i));
            stringBuilder.append(": ");
            stringBuilder.append(currentSolution.get(i));
        }
        return stringBuilder.toString();
    }
}
