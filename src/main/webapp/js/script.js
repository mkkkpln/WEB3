const graph =document.getElementById('svg');
const svg = document.querySelector('svg');

let r;
const scaleR =30;
const Oy = 150;
const Ox = 150;
const x = document.getElementById("select-x");
const y = document.getElementById("y");
const table = document.getElementById("result_table");
const body_server = document.getElementById("body_server");

const applicantForm = document.getElementById('fields-form');
if(applicantForm) {
    applicantForm.addEventListener('submit', getDataFromFormAndClick)
}


graph.addEventListener('click', (event)=>{
    if(checkR()) {
        const svgPoint = svg.createSVGPoint();
        svgPoint.x = event.clientX;
        svgPoint.y = event.clientY;
        const point = svgPoint.matrixTransform(svg.getScreenCTM().inverse());
        console.log(`Координаты: x=${point.x}, y=${point.y}, r=${r}`);
        createPoint(point.x,point.y)
        const x = transformCoordinate(point.x).toFixed(4);
        const y = -1*transformCoordinate(point.y).toFixed(4)
        console.log(`Переведенные координаты: x=${x}, y=${y}, r=${r}`);
        sendDataToServer(x,y,r, function (e)
        {
            const tr = document.createElement("tr");
            const td_x = tr.insertCell(0);
            const td_y = tr.insertCell(1);
            const td_r = tr.insertCell(2);
            const td_hit = tr.insertCell(3);
            const td_date = tr.insertCell(4);
            const td_time = tr.insertCell(5);
            td_x.innerText = e.x;
            td_y.innerText=e.y;
            td_r.innerText=e.r;
            td_hit.innerText=e.status;
            td_date.innerText=e.time;
            td_time.innerText=e.runtime;
            body_server.appendChild(tr);
            console.log(e)
        });
    }else {
        alert("Введите корректно координату R");
    }
});

function drawGraph(r){
    createRect(r*scaleR,r*scaleR);
    createPolygon(Ox+r*scaleR,Oy+r*scaleR);
    createPath(Ox-r*scaleR/2,Oy+r*scaleR/2,r*scaleR/2);
}
function createRect(width,height){
    const rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect.setAttribute('x',Ox);
    rect.setAttribute('y',Oy-height);
    rect.setAttribute('width',width);
    rect.setAttribute('height',height);
    rect.setAttribute('fill-opacity',0.4);
    rect.setAttribute('stroke','blue');
    rect.setAttribute('fill','pink');
    svg.appendChild(rect)

}
function createPolygon(x,y){
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', `150,150 ${x},150 150,${y}`);
    polygon.setAttribute('fill-opacity',0.4);
    polygon.setAttribute('stroke','blue');
    polygon.setAttribute('fill', 'pink');
    svg.appendChild(polygon);
}
function createPath(x,y,r){
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M 150 150 L ${x} 150 A ${r} ${r} 1 0 0 150 ${y} L Z`);
    path.setAttribute('fill', 'pink');
    path.setAttribute('fill-opacity',0.4);
    path.setAttribute('stroke', 'blue');
    svg.appendChild(path);
}

function deleteGraph(){
    const rect = document.getElementsByTagName("rect")[0];
    rect.parentNode.removeChild(rect);
    const path = document.getElementsByTagName("path")[0];
    path.parentNode.removeChild(path);
    const polygon = document.getElementsByTagName("polygon")[2];
    polygon.parentNode.removeChild(polygon);
}

function transformCoordinate(x){
    return (x-Ox)/scaleR;
}

function clearPoints(){
    const circles = svg.querySelectorAll("circle");
    circles.forEach(circle => {
        circle.remove();
    });
}

function createPoint(x,y){
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", "rgb(60, 60, 176)");
    circle.setAttribute("stroke", "rgb(47, 47, 137)");
    circle.setAttribute("stroke-width", "1");
    circle.setAttribute("opacity","0.9");
    graph.appendChild(circle);
}

y.addEventListener("input",function (event){
        showError();
        let value = Number(y.value.replace(",", "."));
        if (!isNumeric(value)) {
            y.setCustomValidity("Неверный ввод. Нужно ввести число Y.");
        } else if(value > 5 || value < -5){
            y.setCustomValidity("Неверный ввод. Диапазон числа Y от -5 до 5");
        } else {
            y.setCustomValidity("");
        }
    }
);

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function checkR(){
    return(r!==undefined);
}


function chooseButton(element,className){
    if(className==='R') {
        r = element.value;
        deleteGraph();
        drawGraph(element.value);
    }
    console.log(className);
    [...document.getElementsByClassName(className)].forEach(function (btn){
        btn.style.backgroundColor="#ffdefb";
        btn.style.color="darkblue";

    });
    element.style.backgroundColor="darkblue";
    element.style.color="#ffdefb";
    console.log(r)
}

function showError() {
    let showErr = document.querySelector('.error');
    showErr.innerHTML = '';
    showErr.classList.remove("show");
}



function getDataFromFormAndClick(event) {
    event.preventDefault();
    if(!checkR()) {
        alert("Для отправки формы выберите R");
    } else{
        sendDataToServer(x.value, y.value,r, function () {
            window.location.replace('result.jsp');
        });
    }
}


function sendDataToServer(x,y,r, callBack) {
    if (x !== undefined && y !== undefined && r !== undefined) {
        $.ajax({
            type: "POST",
            url: "controller",
            dataType: "json",
            async: false,
            data: {
                "x": x.toString().trim(), "y": y.toString().trim(), "r": r.toString().trim(),
                "timezone": new Date().getTimezoneOffset()
            },
            success: callBack,
            // error: function (xhr, textStatus, err) {
            //     window.location.replace('error.jsp');
            // }
        });
    }
}


function clearTable() {
    $.ajax({
        type: "DELETE",
        url: "controller",
        async: false,
        success: function () {
            clear_table()
            clearPoints();
        }
    })
}

function clear_table(){
    for(let i = table.rows.length-1; i>0; i--){
        table.deleteRow(i);
    }
}

