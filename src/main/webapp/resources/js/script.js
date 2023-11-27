const scaleR = 120;
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
        let x1 = rect.width/2 + 120*x/r;
        let y1 = rect.width/2 - 120*y/r;
        console.log(x1, y1, r)
        createPoint(x1, y1, +r);
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
    const x = transformCoordinate(point.x).toFixed(4)*r.value;
    const y = -1*transformCoordinate(point.y).toFixed(4)*r.value;
    console.log(`Переведенные координаты: x=${x}, y=${y}, r=${r.value}`);
    document.getElementById("svg-form:r").value = r.value;
    document.getElementById("svg-form:x").value = x;
    document.getElementById("svg-form:y").value = y;
    return true;
}

