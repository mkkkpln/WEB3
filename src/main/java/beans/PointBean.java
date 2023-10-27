package beans;

import java.util.Locale;

public class PointBean {
    private final Coordinates coordinates;
    private final String isHit;
    private final String currentDate;
    private final double executionTime;

    public PointBean(Coordinates coordinates, String isHit, String currentDate, double executionTime) {
        this.coordinates = coordinates;
        this.isHit = isHit;
        this.currentDate = currentDate;
        this.executionTime = executionTime;
    }

    public String getIsHit() {
        return isHit;
    }

    public Coordinates getCoordinates() {
        return coordinates;
    }

    public String getCurrentDate() {
        return currentDate;
    }

    public double getExecutionTime() {
        return executionTime;
    }

    public String toJSON(){
        return String.format(Locale.US,"{\"x\": %.3f, \"y\": %.3f, \"r\": %.3f, \"status\": \"%s\", \"time\": \"%s\", \"runtime\": %f}", coordinates.getX(), coordinates.getY(), coordinates.getR(), isHit, currentDate, executionTime);
    }

}
