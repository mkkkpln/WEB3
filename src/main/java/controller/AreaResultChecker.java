package controller;

import beans.PointBean;

public class AreaResultChecker {

    private AreaResultChecker() {
    }

    public static boolean isCoordinatesInArea(double x, double y, double r) {
        return inTriangle(x, y, r) ||
                inRect(x, y, r) ||
                inCircle(x, y, r);
    }

    public static boolean isPointInArea(PointBean point) {
        return isCoordinatesInArea(point.getX(), point.getY(), point.getR());
    }
    

    private static boolean inTriangle(double x, double y, double r) {
        return x <= 0 && y >= 0 && (-r <= 2*x - y) ;
    }

    private static boolean inRect(double x, double y, double r) {
        return x >= 0 && y <= 0 && x <= r && y >= -(r/2);
    }

    private static boolean inCircle(double x, double y, double r) {
        return x <= 0 && y <= 0 && x * x + y * y <= r/2 * r/2;
    }


}