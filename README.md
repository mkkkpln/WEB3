# Лабораторная работа #3 
## (Вариант 27837)

![image](https://github.com/mkkkpln/WEB3/assets/72685907/de8ebdae-2b7a-403d-89d0-acffbb6c85c9)


Разработать приложение на базе **JavaServer Faces Framework**, которое осуществляет проверку попадания точки в заданную область на координатной плоскости.

Приложение должно включать в себя **2 facelets-шаблона** - стартовую страницу и основную страницу приложения, а также набор управляемых бинов (`managed beans`), реализующих логику на стороне сервера.

### Стартовая страница должна содержать следующие элементы:

"Шапку", содержащую ФИО студента, номер группы и номер варианта.
Интерактивные часы, показывающие текущие дату и время, обновляющиеся раз в **6 секунд**.
Ссылку, позволяющую перейти на основную страницу приложения.

### Основная страница приложения должна содержать следующие элементы:

Набор компонентов для задания координат точки и радиуса области в соответствии с вариантом задания. Может потребоваться использование дополнительных библиотек компонентов - ICEfaces (префикс "ace") и PrimeFaces (префикс "p"). Если компонент допускает ввод заведомо некорректных данных (таких, например, как буквы в координатах точки или отрицательный радиус), то приложение должно осуществлять их валидацию.
Динамически обновляемую картинку, изображающую область на координатной плоскости в соответствии с номером варианта и точки, координаты которых были заданы пользователем. Клик по картинке должен инициировать сценарий, осуществляющий определение координат новой точки и отправку их на сервер для проверки её попадания в область. Цвет точек должен зависить от факта попадания / непопадания в область. Смена радиуса также должна инициировать перерисовку картинки.
Таблицу со списком результатов предыдущих проверок.
Ссылку, позволяющую вернуться на стартовую страницу.

### Дополнительные требования к приложению:

Все результаты проверки должны сохраняться в базе данных под управлением **СУБД Oracle**.
Для доступа к БД необходимо использовать **ORM Hibernate**.
Для управления списком результатов должен использоваться `Session-scoped Managed Bean`.
Конфигурация управляемых бинов должна быть задана с помощью параметров в **конфигурационном файле**.
Правила навигации между страницами приложения должны быть заданы в **отдельном конфигурационном файле**.


### Вопросы к защите лабораторной работы:

- Технология JavaServer Faces. Особенности, отличия от сервлетов и JSP, преимущества и недостатки. Структура JSF-приложения.
- Использование JSP-страниц и Facelets-шаблонов в JSF-приложениях.
- JSF-компоненты - особенности реализации, иерархия классов. Дополнительные библиотеки компонентов. Модель обработки событий в JSF-приложениях.
- Конвертеры и валидаторы данных.
- Представление страницы JSF на стороне сервера. Класс UIViewRoot.
- Управляемые бины - назначение, способы конфигурации. Контекст управляемых бинов.
- Конфигурация JSF-приложений. Файл faces-config.xml. Класс FacesServlet.
- Навигация в JSF-приложениях.
- Доступ к БД из Java-приложений. Протокол JDBC, формирование запросов, работа с драйверами СУБД.
- Концепция ORM. Библиотеки ORM в приложениях на Java. Основные API. Интеграция ORM-провайдеров с драйверами JDBC.
- Библиотеки ORM Hibernate и EclipseLink. Особенности, API, сходства и отличия.
- Технология JPA. Особенности, API, интеграция с ORM-провайдерами.

**Ответы**: [*новые*](https://github.com/EgorMIt/ITMO/blob/master/2%20-%20%D0%92%D0%B5%D0%B1-%D0%9F%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5/Lab3.md) и [*старые*](https://github.com/AppLoidx/Web-Development-Cheats/blob/master/itmo-university/labs/Lab3.md)
