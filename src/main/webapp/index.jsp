<%@ page import="beans.BeanResult" %>
<%@ page import="beans.PointBean" %>
<%@ page contentType="text/html;charset=UTF-8" %>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="table" class="beans.BeanResult" scope="session"/>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>Веб-сайт</title>
    <meta name="author" content="Копалина Майя Алексеевна" />
    <meta
            name="description"
            content="Веб-программирование: Лабораторная работа №1"
    />
    <meta
            name="keywords"
            content="ITMO, ИТМО, ПИиКТ, ВТ, Лабораторная работа, Веб-программирование"
    />

    <link rel="stylesheet" href="assets/css/normalize.css" />
    <link rel="stylesheet" href="assets/css/style.css" />
    <link rel="stylesheet" href="assets/css/graph.css" />
    <link rel="stylesheet" href="assets/css/form.css" />
    <link rel="stylesheet" href="assets/css/result_table.css">

    <!-- Иконка страницы -->
    <link rel="icon" href="assets/img/itmoLogo.png" />
</head>

<body>
<!-- Шапка страницы -->
<header class="header">
    <div class="container">
        <div class="header-wrapper">
            <h3 class="header-title">
                ФИО: <br />
                Копалина Майя
            </h3>
            <p class="header-title">
                Группа: <br />
                P3232
            </p>
            <p class="header-title">
                Вариант: <br />
                1307
            </p>
        </div>
    </div>
</header>

<section class="laboratory-info">
    <div class="container">
        <div class="lab" >
            <h2 class="lab-title">Лабораторная работа №2</h2>
        </div>
    </div>
</section>

<section class="fields-and-graph">
    <div class="fields">
        <div class="container">
            <form class="fields-form" id="fields-form" action="#">
                <div class="form-wrapper">
                    <p class="fields-label">Выберите значение X</p>
                    <select id="select-x" name="x">
                        <option value="-2">-2</option>
                        <option value="-1.5">-1.5</option>
                        <option value="-1">-1</option>
                        <option value="-0.5">-0.5</option>
                        <option value="0">0</option>
                        <option value="0.5">0.5</option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                    </select>
                </div>

                <label class="fields-y">
                    <span class="fields-label">Введите значение Y</span>
                    <p>
                    <input
                            type="text"
                            id="y"
                            class="fields-input"
<%--                            required name="y"--%>
                            placeholder="(от -5 до 5)"
                    />
                    </p>
                </label>

                <label class="fields-r">
                    <div class="fields-radius">
                        <p><label class="fields-label">Выберите значение R</label>
                            <div class="line-of-buttons">
                                <input class="R" type="button" value=1 onclick="chooseButton(this,'R')">
                                <input class="R" type="button" value=2 onclick="chooseButton(this,'R')">
                                <input class="R" type="button" value=3 onclick="chooseButton(this,'R')">
                                <input class="R" type="button" value=4 onclick="chooseButton(this,'R')">
                                <input class="R" type="button" value=5 onclick="chooseButton(this,'R')">
                            </div>
                        </p>
                    </div>
                </label>

                <div class="btn">
                    <div class="btn-send">
                        <button id="send-button" type="submit">Send</button>
                    </div>
                    <div class="btn-clear">
                        <button class="clear-button" type="button" id="clearButton" onclick='clearTable()'>Clear</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

    <div class="graph">
        <svg xmlns="http://www.w3.org/2000/svg" id="svg" height="300">
            <line x1="0" y1="150" x2="300" y2="150" stroke="#000720"></line>
            <line x1="150" y1="0" x2="150" y2="300" stroke="#000720"></line>
            <line x1="270" y1="148" x2="270" y2="152" stroke="#000720"></line>
            <text x="265" y="140">4</text>
            <line x1="210" y1="148" x2="210" y2="152" stroke="#000720"></line>
            <text x="200" y="140">2</text>
            <line x1="90" y1="148" x2="90" y2="152" stroke="#000720"></line>
            <text x="75" y="140">-2</text>
            <line x1="30" y1="148" x2="30" y2="152" stroke="#000720"></line>
            <text x="20" y="140">-4</text>
            <line x1="148" y1="30" x2="152" y2="30" stroke="#000720"></line>
            <text x="156" y="35">4</text>
            <line x1="148" y1="90" x2="152" y2="90" stroke="#000720"></line>
            <text x="156" y="95">2</text>
            <line x1="148" y1="210" x2="152" y2="210" stroke="#000720"></line>
            <text x="156" y="215">-2</text>
            <line x1="148" y1="270" x2="152" y2="270" stroke="#000720"></line>
            <text x="156" y="275">-4</text>
<%--            <circle r="5" cx="170" cy="170" fill="blue" stroke="#000720"></circle>--%>
            <polygon points="300,150 295,155 295, 145" fill="#000720" stroke="#000720"></polygon>
            <polygon points="150,0 145,5 155,5" fill="#000720" stroke="#000720"></polygon>

            <rect x="150" y="30" width="120" height="120" fill-opacity="0.4" stroke="blue" fill="pink"></rect>
            <polygon points="150,150 270,150 150,270" fill-opacity="0.4" stroke="blue" fill="pink"></polygon>
            <path d="M 150 150 L 90 150 A 60 60 1 0 0 150 210 L Z" fill-opacity="0.4" stroke="blue" fill="pink"></path>
        </svg>

        <% BeanResult collection = (BeanResult) application.getAttribute("PointsCollection");
            double x,y;%>
        <% if(collection != null) { %>
        <% for(PointBean point: collection.getResults()){
            x = point.getCoordinates().getX();
            y=  point.getCoordinates().getY(); %>
        <script> createPoint(40*<%=x%>+150,(40*<%=y%>-150)*(-1))</script>
        <%}%>
        <%}%>

    </div>
</section>

<span class="error" id="error"> </span>

<section class="table">
    <table id="result_table" width="650">
        <thead>
        <tr>
            <th id="th_x">X</th>
            <th id="th_y">Y</th>
            <th id="th_r">R</th>
            <th id="hit">Попал/Промазал</th>
            <th id="time">Текущее время</th>
            <th id="scriptWork">Время работы скрипта</th>
        </tr>
        </thead>
        <tbody id="body_server">
        <c:forEach var="row" items="${table.results}">
            <tr>
                <td>${row.coordinates.x}</td>
                <td>${row.coordinates.y}</td>
                <td>${row.coordinates.r}</td>
                <td>${row.isHit}</td>
                <td>${row.currentDate}</td>
                <td>${row.executionTime}</td>
            </tr>
        </c:forEach>
        </tbody>
    </table>
</section>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.2/jquery.validate.min.js"></script>
<script src="//cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>
<script src="js/script.js"></script>
</body>
</html>