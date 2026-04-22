const display = document.getElementById('display');
const title = document.getElementById('current-tool-title');

function toggleMenu() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('overlay').classList.toggle('active');
}

function switchTool(toolId) {
    document.querySelectorAll('.tool-section').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(toolId + '-tool');
    if(target) target.classList.add('active');
    title.innerText = toolId.toUpperCase();
    toggleMenu();
}

// Math API Calculator
function appendToDisplay(v) { display.value += v; }
function clearDisplay() { display.value = ''; }
function deleteLast() { display.value = display.value.slice(0,-1); }
function calculateResult() {
    try {
        let res = "math".evaluate(display.value);
        display.value = Number.isInteger(res) ? res : res.toFixed(4);
    } catch { display.value = "Error"; }
}

// specialty Logic
function calcBMI() {
    let w = document.getElementById('weight').value, h = document.getElementById('height').value / 100;
    if(w && h) document.getElementById('bmi-res').innerText = "BMI: " + (w/(h*h)).toFixed(2);
}

function calcEMI() {
    let p = document.getElementById('loan-amt').value, r = document.getElementById('interest-rate').value/12/100, n = document.getElementById('tenure').value;
    if(p && r && n) {
        let emi = (p * r * Math.pow(1+r, n)) / (Math.pow(1+r, n)-1);
        document.getElementById('emi-res').innerText = "EMI: ₹" + emi.toFixed(2);
    }
}

function calcGST() {
    let a = parseFloat(document.getElementById('base-amt').value), r = parseFloat(document.getElementById('gst-perc').value);
    if(a && r) document.getElementById('gst-res').innerText = "Total: ₹" + (a + (a*r/100)).toFixed(2);
}

function convertUnits() {
    let val = parseFloat(document.getElementById('unit-input').value), type = document.getElementById('unit-type').value, res = 0;
    if(!val) return;
    if(type === 'cm-km') res = val / 100000;
    else if(type === 'km-cm') res = val * 100000;
    else if(type === 'kg-g') res = val * 1000;
    else if(type === 'g-kg') res = val / 1000;
    document.getElementById('unit-res').innerText = "Result: " + res;
}

function toggleTheme() { document.body.classList.toggle('dark'); }
function openPage(u) { window.location.href = u; }
// Vibration Function
function playVibration() {
    const isVibrateOn = document.getElementById('vibrate-toggle')?.checked;
    if (isVibrateOn && navigator.vibrate) {
        navigator.vibrate(50); // 50ms vibration
    }
}

// Update Standard Calc Buttons to vibrate
// Example: pehle wale appendToDisplay ko modify karein
function appendToDisplay(v) {
    playVibration();
    display.value += v;
}

// Settings Save karein (Local Storage mein)
function saveSettings() {
    const precision = document.getElementById('precision-select').value;
    localStorage.setItem('vishingh_precision', precision);
    alert("Settings Saved!");
}

// Page load par settings apply karein
window.onload = function() {
    const savedPrecision = localStorage.getItem('vishingh_precision');
    if(savedPrecision && document.getElementById('precision-select')) {
        document.getElementById('precision-select').value = savedPrecision;
    }
};
