package lk.ITPM.cco2;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class MarksCalculater {
    private final int[] playerScores;
    private final double[] categoryExpectedScores;
    private final double[] averageScores;
    private final double bonusFactor;
    private final double penaltyFactor;
    private final double guessCorrectionFactor;
    private final int[] categoryWeights;
    private final int[] levelThresholds;

    public MarksCalculater(int[] playerScores) {
        this.playerScores = new int[]{8, 7, 6}; // Fixed values [8, 7, 6]
        this.averageScores = fetchAverageScoresFromDatabase();
        this.categoryExpectedScores = new double[playerScores.length];
        this.bonusFactor = 1.2;
        this.penaltyFactor = 0.8;
        this.guessCorrectionFactor = 0.8;
        this.categoryWeights = new int[]{1, 2, 3};
        this.levelThresholds = new int[]{10, 20};

        for (int i = 0; i < categoryExpectedScores.length; i++) {
            categoryExpectedScores[i] = (double) playerScores[i] * 0.8;
        }
    }

    private double[] fetchAverageScoresFromDatabase() {
        int[][] quizMarks = {
            {8, 7, 6},
            {9, 8, 7},
            {7, 6, 5},
            {10, 9, 8},
            {6, 5, 4},
            {9, 8, 7},
            {8, 7, 6},
            {7, 6, 5},
            {10, 9, 8},
            {6, 5, 2}
        };

        List<Double> categoryAScores = new ArrayList<>();
        List<Double> categoryBScores = new ArrayList<>();
        List<Double> categoryCScores = new ArrayList<>();

        for (int[] marks : quizMarks) {
            double categoryAScore = marks[0];
            double categoryBScore = marks[1];
            double categoryCScore = marks[2];

            categoryAScores.add(categoryAScore);
            categoryBScores.add(categoryBScore);
            categoryCScores.add(categoryCScore);
        }

        double categoryAAverage = calculateAverage(categoryAScores);
        double categoryBAverage = calculateAverage(categoryBScores);
        double categoryCAverage = calculateAverage(categoryCScores);

        System.out.print(" A category Average " + categoryAAverage);
        System.out.print(" B category Average " + categoryBAverage);
        System.out.print(" C category Average " + categoryCAverage);

        return new double[]{categoryAAverage, categoryBAverage, categoryCAverage};
    }

    private double calculateAverage(List<Double> scores) {
        double sum = 0;
        for (double score : scores) {
            sum += score;
        }
        return sum / scores.size();
    }

    public double calculateTotalWeightedScore() {
        double totalWeightedScore = 0;
        for (int i = 0; i < playerScores.length; i++) {
            double categoryRelativePerformance = (double) playerScores[i] / averageScores[i];
            double categoryAdjustedScore = playerScores[i] * (categoryRelativePerformance < 1 ? bonusFactor : penaltyFactor);
            double categoryWeightedScore = categoryAdjustedScore * categoryWeights[i];
            double categoryFinalScore = categoryWeightedScore * guessCorrectionFactor;
            totalWeightedScore += categoryFinalScore;
        }
        return totalWeightedScore;
    }

    public String determineLevelOfKnowledge() {
        double totalWeightedScore = calculateTotalWeightedScore();
        if (totalWeightedScore < levelThresholds[0]) {
            return "Beginner";
        } else if (totalWeightedScore < levelThresholds[1]) {
            return "Intermediate";
        } else {
            return "Expert";
        }
    }

}

