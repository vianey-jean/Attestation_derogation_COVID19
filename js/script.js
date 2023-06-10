function $(id) { return document.getElementById(id); }
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (is_safari) {
    $('date').value = new Date().toLocaleDateString();
} else {
    $('date').valueAsDate = new Date();
}

// CANVAS HANDLING

var canvas = $('signature');
canvas.addEventListener('mousedown', ev_mousedown, false);
canvas.addEventListener('mousemove', ev_mousemove, false);
window.addEventListener('mouseup', ev_mouseup, false);

canvas.addEventListener('touchstart', ev_touchstart, false);
canvas.addEventListener('touchmove', ev_touchmove, false);
window.addEventListener('touchend', ev_mouseup, false);

ctx = canvas.getContext('2d');

var started = false;

function ev_mouseup(ev) {
    started = false;
}

function ev_touchstart(ev) {
    ev.preventDefault();
    started = true;
    var rect = canvas.getBoundingClientRect();
    var x = ev.touches[0].clientX;
    var y = ev.touches[0].clientY;
    x = x - rect.left;
    y = y - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
}

function ev_touchmove(ev) {
    ev.preventDefault();
    var rect = canvas.getBoundingClientRect();
    var x = ev.touches[0].clientX;
    var y = ev.touches[0].clientY;
    x = x - rect.left;
    y = y - rect.top;

    if (started) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function ev_mousedown(ev) {
    started = true;
    ctx.beginPath();
    ctx.moveTo(ev.offsetX, ev.offsetY);
}

function ev_mousemove(ev) {
    if (started) {
        ctx.lineTo(ev.offsetX, ev.offsetY);
        ctx.stroke();
    }
}

function can_clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    return false;
}

// RENDERING

function render() {
    canvas.removeEventListener('mousedown', ev_mousedown);
    canvas.style.cssText = "border: none;";

    $("clear_btn").remove();
    $("render_btn").remove();

    to_render = ['name', 'born', 'address', 'place', 'date'];
    to_render.forEach(function(el) {
        $(el).insertAdjacentHTML('afterend', $(el).value);
        $(el).remove();
    });

    to_disable = ['choix_a', 'choix_b', 'choix_c', 'choix_d', 'choix_e'];
    to_disable.forEach(function(el) {
        if (!$(el).checked) {
            $(el).remove();
            $('label_' + el).remove();
        }
    });

    window.print();
}