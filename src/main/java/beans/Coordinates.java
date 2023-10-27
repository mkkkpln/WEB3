package beans;


public class Coordinates {
    private final double X;
    private final double Y;
    private final double R;

    public Coordinates(double x, double y, double r) {
        X = x;
        Y = y;
        R = r;
    }

    public double getX() {
        return X;
    }

    public double getY() {
        return Y;
    }

    public double getR() {
        return R;
    }

    @Override
    public String toString() {
        return "Coordinates{" +
                "X=" + X +
                ", Y=" + Y +
                ", R=" + R +
                '}';
    }
}
