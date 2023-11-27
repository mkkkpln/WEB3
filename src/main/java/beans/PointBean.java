package beans;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.*;

import java.io.Serializable;

@Entity

@Named("pointBean")
@SessionScoped
public class PointBean implements Serializable {

    public PointBean(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public PointBean() {

    }



    public static record Coordinates (double x, double y, double r, boolean result) { }


    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="id", nullable=false, unique=true)
    private int id;

    @NotNull
    @Column(name="x", nullable=false)
    private double x;

    @NotNull
    @Column(name="y", nullable=false)
    private double y;

    @NotNull
    @Column(name="r", nullable=false)
    private double r = 1;

    @NotNull
    @Column(name="result", nullable=false)
    private boolean result;

    @NotNull
    @Column(name="created_at", nullable=false)
    private long createdAt;

    @NotNull
    @Column(name="execution_time", nullable=false)
    private double executionTime;

    public Coordinates getCoordinates() {
        return new Coordinates(x, y, r, result);
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public long getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(long createdAt) {
        this.createdAt = createdAt;
    }

    public double getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }
}