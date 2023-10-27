<%--
  Created by IntelliJ IDEA.
  User: maya
  Date: 22.10.2023
  Time: 18:38
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<jsp:useBean id="table" class="beans.BeanResult" scope="session"/>
<!DOCTYPE html>
<html>
<head>
  <title>Result</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="assets/css/normalize.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/general_result_page.css">
</head>
<body>

<header class="header">
  <span id="title">Копалина Майя Алексеевна, группа: P3232, Вариант: 766766</span>
</header>

<table id="result_table" >
  <thead>
  <tr>
    <th>x value</th>
    <th>y value</th>
    <th>r value</th>
    <th>result</th>
    <th>current time</th>
    <th>execution time (ns)</th>
  </tr>
  </thead>
  <tbody id="body">
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
<a href="http://localhost:8080/WEB2" id="return-link" class="button">Назад</a>

</body>
</html>
