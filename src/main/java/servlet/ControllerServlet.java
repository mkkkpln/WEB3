package servlet;

import beans.BeanResult;

import javax.servlet.ServletConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "controller", value = "/controller")
public class ControllerServlet extends HttpServlet {
    @Override
    public void init(ServletConfig config) throws ServletException {
        super.init(config);
        ServletContext context = getServletContext();
        context.setAttribute("BeanResult",new BeanResult());
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getParameter("action") != null && request.getParameter("action").equals("clear")) {
            request.getServletContext().getRequestDispatcher("/clean").forward(request, response);
            return;
        }
        String strX = request.getParameter("x");
        String strY = request.getParameter("y");
        if (isDataCorrect(strX) && isDataCorrect(strY)) {
            request.getServletContext().getRequestDispatcher("/check").forward(request, response);
            return;
        }
        response.sendError(400, "Invalid coordinates");
    }
    private boolean isDataCorrect(String str) {
        if (str == null) {
            return false;
        }
        try {
            Double.parseDouble(str.replace(',', '.'));
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    @Override
    public void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        request.getRequestDispatcher("/clean").forward(request, response);
    }
}