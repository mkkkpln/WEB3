const scaleR = 60;
const Oy = 150;
const Ox = 150;

document.addEventListener("DOMContentLoaded", () => {

    const rows = document.querySelector("#result_table table").tBodies[0].rows;
    const svg = document.querySelector('svg');
    for (let row of rows) {
        let x = row.cells[0].innerText;
        let y = row.cells[1].innerText;
        let r = row.cells[2].innerText;
        let rect = svg.getBoundingClientRect();
        let x1 = rect.width/2 + scaleR*x;
        let y1 = rect.width/2 - scaleR*y;
        console.log(x1, y1, r)
        createPoint(x1, y1, +r);
    }


    const submitButton = document.getElementById("send-button");
    const slider = document.querySelector("p\\:slider[name='r']");
    const rField = document.getElementById("fields-form:R-field");

    let lastR = 0;
    let onFrame = () => {
        requestAnimationFrame(onFrame)
        if(lastR != rField.value){
            lastR = rField.value;
            drawGraph(lastR);
        }
    }
    requestAnimationFrame(onFrame);

    submitButton.addEventListener("click", (event) => {
        event.preventDefault();
        rField.value = slider.value;
        drawGraph(slider.value);
    });

    function drawGraph(r) {
        deleteGraph();
        createRect((r/2) * scaleR, (r/2) * scaleR / 2);
        createPolygon(Ox - (r/2) * scaleR / 2, Oy - (r/2) * scaleR);
        createPath(Ox - (r/2) * scaleR / 2, Oy + (r/2) * scaleR / 2, (r/2) * scaleR / 2);
    }

})

const svg = document.querySelector('svg');
const r = document.getElementById("fields-form:R-field");
const x = document.getElementById("fields-form:select-x");
const y = document.getElementById("fields-form:y");
const table = document.getElementById("result_table");



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

function showError() {
    let showErr = document.querySelector('.error');
    showErr.innerHTML = '';
    showErr.classList.remove("show");
}



function transformCoordinate(x){
    return (x-Ox)/scaleR;
}

function isInArea(x,y,r){
    x = transformCoordinate(x);
    y = -1*transformCoordinate(y);
    r = 1;
    if (Math.pow(x,2)+Math.pow(y,2)<=Math.pow(r/2,2) && x<=0 && y<=0){
        return true;
    } else if (x <= r && y >= -r/2 && x >= 0 && y <= 0) {
        return true;
    } else return x <= 0 && y >= 0 && (-r <= 2*x - y);
}

function createPoint(x,y,r){
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", "5");
    circle.setAttribute("fill", "rgb(60, 60, 176)");
    circle.setAttribute("stroke", "rgb(47, 47, 137)");
    circle.setAttribute("stroke-width", "1");
    circle.setAttribute("opacity","0.9");
    if(!isInArea(x,y,r)) {
        circle.setAttribute("fill", "red")
    } else circle.setAttribute("fill", "green")
    svg.appendChild(circle);
    document.getElementById('svg').appendChild(circle);
}

function onClick(event) {
    const svgPoint = svg.createSVGPoint();
    svgPoint.x = event.clientX;
    svgPoint.y = event.clientY;
    const point = svgPoint.matrixTransform(svg.getScreenCTM().inverse());
    console.log(`Координаты: x=${point.x}, y=${point.y}, r=${r.value}`);
    createPoint(point.x,point.y, r.value);
    const x = transformCoordinate(point.x).toFixed(4);
    const y = -1*transformCoordinate(point.y).toFixed(4);
    console.log(`Переведенные координаты: x=${x}, y=${y}, r=${r.value}`);
    document.getElementById("svg-form:r").value = r.value;
    document.getElementById("svg-form:x").value = x;
    document.getElementById("svg-form:y").value = y;
    return true;
}


function createRect(width,height){
    const rect = document.createElementNS("http://www.w3.org/2000/svg","rect");
    rect.setAttribute('x',Ox);
    rect.setAttribute('y',Oy-height);
    rect.setAttribute('width',width);
    rect.setAttribute('height',height);
    rect.setAttribute('fill-opacity',0.4);
    rect.setAttribute('stroke','blue');
    rect.setAttribute('fill','lightblue');
    svg.appendChild(rect)

}
function createPolygon(x,y){
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    polygon.setAttribute('points', `150,150 ${x},150 150,${y}`);
    polygon.setAttribute('fill-opacity',0.4);
    polygon.setAttribute('stroke','blue');
    polygon.setAttribute('fill', 'lightblue');
    svg.appendChild(polygon);
}
function createPath(x,y,r){
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M 150 150 L ${x} 150 A ${r} ${r} 1 0 0 150 ${y} L Z`);
    path.setAttribute('fill', 'lightblue');
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

