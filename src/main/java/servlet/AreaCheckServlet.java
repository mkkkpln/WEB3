package servlet;

import beans.BeanResult;
import beans.PointBean;
import beans.Coordinates;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet(name="check", value = "/check")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        try {
            PrintWriter printWriter = response.getWriter();
            HttpSession session = request.getSession();
            final long startTime = System.nanoTime();
            double x = Double.parseDouble(request.getParameter("x"));
            double y = Double.parseDouble(request.getParameter("y"));
            double r = Double.parseDouble(request.getParameter("r"));

            DateFormat dateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
            Date date = new Date();
            long endTime = System.nanoTime();
            double totalTime = (double)(endTime - startTime)/1000/1000;
            PointBean bean = new PointBean(new Coordinates(x,y,r),isHit(x,y,r),dateFormat.format(date),totalTime);
            BeanResult results = (BeanResult) session.getAttribute("table");
            if (results == null) {
                results = new BeanResult();
            }
            results.addRow(bean);
            session.setAttribute("table", results);
            response.setStatus(HttpServletResponse.SC_OK);
            response.setCharacterEncoding("Windows-1251");
            printWriter.write(bean.toJSON());
            printWriter.flush();
        }catch (NumberFormatException e){
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid parameter");
        }

    }
    private String isHit(double x, double y, double r){
        if (Math.pow(x,2)+Math.pow(y,2)<=Math.pow(r,2) && x<=0 && y<=0){
            return "HIT";
        } else if (Math.abs(x)<=(r) && Math.abs(y)<=r && x>=0 && y>=0) {
            return "NIT";
        } else if(y<=x-r && x>=0 && y<=0){
            return "NIT";
        }else return "NOT HIT";
    }


}