/*=====================================
    MISSION SUNDAY
    Version 1.1
=====================================*/

// ---------- MATRIX ----------

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

let matrixColor = "#00ff88";
// ===============================
// DATOS DE LA MISIÓN
// ===============================

let missionData = {

    comida: "",
    hora: ""

};

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters =
"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789MISSIONSUNDAY";

const chars = letters.split("");

const fontSize = 16;
const columns = Math.floor(window.innerWidth / fontSize);

const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height;
}

function drawMatrix() {

    ctx.fillStyle = "rgba(0,0,0,.08)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = matrixColor;
    ctx.font = fontSize + "px monospace";

    for(let i=0;i<drops.length;i++){

        const text =
        chars[Math.floor(Math.random()*chars.length)];

        ctx.fillText(
            text,
            i*fontSize,
            drops[i]*fontSize
        );

        if(
            drops[i]*fontSize>canvas.height &&
            Math.random()>0.975
        ){
            drops[i]=0;
        }

        drops[i]++;

    }

}

setInterval(drawMatrix,35);


// ---------- LOGIN ----------

const button =
document.getElementById("unlock");

const input =
document.getElementById("password");

const error =
document.getElementById("error");

const card =
document.querySelector(".card");

button.addEventListener("click",unlock);

input.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        unlock();

    }

});

function unlock(){

    const value =
    input.value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"");

    if(value==="corazon"){

        accessGranted();

    }else{

        accessDenied();

    }

}

// ---------- ERROR ----------

function accessDenied(){

    error.textContent =
    "Acceso denegado";

    card.animate(

        [

            {transform:"translateX(-8px)"},

            {transform:"translateX(8px)"},

            {transform:"translateX(-8px)"},

            {transform:"translateX(0px)"}

        ],

        {

            duration:250

        }

    );

}

// ---------- CORRECTO ----------

function accessGranted(){

    error.textContent="";

    button.innerHTML=
"🐉 Acceso concedido";

    button.disabled=true;

    // Cambia Matrix a dorado

    let colors=[
"#00ff88",
"#43ff8c",
"#72f78a",
"#b7d96f",
"#d8b14d"
];

let i=0;

const changeColor=setInterval(()=>{

    matrixColor=colors[i];

    i++;

    if(i>=colors.length){

        clearInterval(changeColor);

    }

},180);

    // Borde dorado

card.style.borderColor="#d8b14d";

card.style.boxShadow=`
0 0 15px rgba(216,177,77,.25),
0 0 35px rgba(216,177,77,.45),
0 0 80px rgba(216,177,77,.20)
`;

    // Cambia botón

    button.style.background=
    "linear-gradient(90deg,#d8b14d,#f6d878)";
button.style.boxShadow=
"0 0 25px rgba(216,177,77,.6)";

    // Cambia línea superior

    document.documentElement.style
    .setProperty(
        "--green",
        "#d8b14d"
    );

    // Cambia candado

   const hook = document.querySelector(".lock-hook");

if(hook){
    hook.style.transform = "rotate(-35deg)";
}

    setTimeout(()=>{

document.getElementById("screen").innerHTML=`

<div class="terminal">

<div class="line">

> Verificando identidad...

</div>

<div class="line">

> Usuario encontrado: Ángel

</div>

<div class="line">

> Inicializando Dragon Protocol...

</div>

<div class="line">

> Acceso autorizado.

</div>

<div class="line">

> Cargando misión...

</div>

</div>

`;

setTimeout(showDragon,5200);

},1500);


}

function showDragon(){

    document.getElementById("screen").innerHTML = `

        <div class="dragon">

            <img src="assets/dragon.png" alt="Dragon">

        </div>

        <h2>Bienvenido, Ángel.</h2>

        <p class="description">

            Tu identidad ha sido verificada correctamente.

            La misión ha comenzado.

        </p>

        <button id="continue">

            Continuar →

        </button>

    `;

    document
.getElementById("continue")
.addEventListener("click",showMissionOne);

}

function showMissionOne(){

document.getElementById("screen").innerHTML=`

<h2>🐉 OBJETIVO 01</h2>

<p class="description">

Selecciona tu equipamiento para el domingo.

</p>

<div class="mission-grid">

<div class="mission-card">

<div class="check">✓</div>

<div class="emoji">🍕</div>

<span>Pizza</span>

</div>

<div class="mission-card">

<div class="check">✓</div>

<div class="emoji">🍿</div>

<span>Palomitas</span>

</div>

<div class="mission-card">

<div class="check">✓</div>

<div class="emoji">🥤</div>

<span>Soda</span>

</div>

<div class="mission-card">

<div class="check">✓</div>

<div class="emoji">❤️</div>

<span>Me gustan todas</span>

</div>

</div>

<button id="nextMission">

Continuar →

</button>

`;

const cards=document.querySelectorAll(".mission-card");

const next=document.getElementById("nextMission");

cards.forEach(card=>{

card.addEventListener("click",()=>{

cards.forEach(c=>c.classList.remove("selected"));

card.classList.add("selected");

missionData.comida =
card.querySelector("span").textContent;

next.classList.add("active");

});

});

next.addEventListener("click",showMissionTwo);

}


function showMissionTwo(){

document.getElementById("screen").innerHTML=`

<h2>

🕕 OBJETIVO 02

</h2>

<p class="description">

Selecciona la hora de llegada.

</p>

<div class="hour-grid">

<div class="hour-card">

<div class="check">✓</div>

🕕

<span>6:00 PM</span>

</div>

<div class="hour-card">

<div class="check">✓</div>

🕖

<span>7:00 PM</span>

</div>

<div class="hour-card">

<div class="check">✓</div>

🕗

<span>8:00 PM</span>

</div>

<div class="hour-card">

<div class="check">✓</div>

🕘

<span>9:00 PM</span>

</div>

</div>

<button id="finishMission">

Finalizar misión →

</button>

`;

const cards=document.querySelectorAll(".hour-card");

const button=document.getElementById("finishMission");

cards.forEach(card=>{

card.addEventListener("click",()=>{

cards.forEach(c=>c.classList.remove("selected"));

card.classList.add("selected");

missionData.hora =
card.querySelector("span").textContent;

button.classList.add("active");

});

});

button.addEventListener("click",showFinalMission);

}

function showFinalMission(){

document.getElementById("screen").innerHTML=`

<div class="terminal">

<div class="line">

> Confirmando equipamiento...

</div>

<div class="line">

> Confirmando hora...

</div>

<div class="line">

> Enviando misión...

</div>

<div class="line">

██████████████████ 100%

</div>

<div class="line">

✓ Misión registrada.

</div>

</div>

`;

setTimeout(showInvitation,4500);

}

function showInvitation(){

document.getElementById("screen").innerHTML=`

<div class="dragon">

<img src="assets/dragon.png">

</div>

<h2>

Misión completada.

</h2>

<p class="description">

Estoy muy emocionada por verte.

❤️

Estaré bonita para ti.

</p>

<button id="playVideo">

📡 Enviar informe de misión

</button>

`;

document
.getElementById("playVideo")
.addEventListener("click",sendMissionReport);

}

function showVideo(){

document.getElementById("screen").innerHTML=`

<h2>

❤️ Hasta el domingo ❤️

</h2>

<p class="description">

Estoy muy emocionada por verte.

❤️

Estaré bonita para ti.

<br><br>

<b>Equipamiento:</b><br>
${missionData.comida}

<br><br>

<b>Hora:</b><br>
${missionData.hora}

</p>

<video
controls
autoplay
playsinline
width="100%">

<source
src="assets/video.mp4"
type="video/mp4">

</video>

`;

}

function sendMissionReport(){

    const params = {

        comida: missionData.comida,

        hora: missionData.hora,

        fecha: new Date().toLocaleString("es-PA")

    };

    emailjs
    .send(
        "service_uynn07c",
        "template_vmzax3g",
        params
    )
   .then(()=>{

    showVideo();

})
    .catch((error)=>{

        console.error(error);

        alert("Ocurrió un error al enviar el informe.");

    });

}

