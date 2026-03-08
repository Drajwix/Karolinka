var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// --- OBRÁZEK ---
var myImage = new Image();
myImage.src = "https://cdn.discordapp.com/attachments/926492676856107058/1480315702471823561/Y0Kb.png?ex=69af3aee&is=69ade96e&hm=0624e527c08dc7315af4ef246e94dc8a985657b9953549c19854d51e152d97d6&"; 
var imgOpacity = 0;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

const button = document.getElementById("valentinesButton");
button.addEventListener("click", () => {
    window.open("https://www.instagram.com/drajwix/", "_blank");
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

// Funkce pro zjednodušení psaní
function showText(text, opacityVal, yOffset = 0, isMultiLine = false, lines = []) {
    context.fillStyle = `rgba(45, 45, 255, ${opacityVal})`;
    if(isMultiLine) {
        drawTextWithLineBreaks(lines, canvas.width/2, canvas.height/2 + yOffset, Math.min(30, window.innerWidth / 24), 8);
    } else {
        context.fillText(text, canvas.width/2, canvas.height/2 + yOffset);
    }
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;

    // --- LOGIKA ČASOVÁNÍ ---
    // FadeIn (0-200), Hold (200-500), FadeOut (500-700)
    
    // 1. ZPRÁVA
    if(frameNumber < 700) {
        if(frameNumber < 200) opacity += 0.005; // Fade In
        else if (frameNumber > 500) opacity -= 0.005; // Fade Out
        showText("Každej den co jsem s tebou nemužu uvěřit jak moc velký stěstí mám že mam někoho jako tebe, Miluju tě", opacity);
    } 
    // 2. ZPRÁVA
    else if(frameNumber >= 700 && frameNumber < 1400) {
        if(frameNumber < 900) opacity += 0.005;
        else if (frameNumber > 1200) opacity -= 0.005;
        
        let lines = ["I když vím že jsem teď hodně věcí pokazil,", "nechci tě ztratit"];
        if (window.innerWidth < 600) showText("", opacity, 0, true, lines);
        else showText("I když vím že jsem teď hodně věcí pokazil, nechci tě ztratit", opacity);
    }
    // 3. ZPRÁVA
    else if(frameNumber >= 1400 && frameNumber < 2100) {
        if(frameNumber < 1600) opacity += 0.005;
        else if (frameNumber > 1900) opacity -= 0.005;
        showText("Znamenáš pro mně vše, a nic jinýho na světě si nepřeju než jen být s tebou", opacity);
    }
    // 4. ZPRÁVA
    else if(frameNumber >= 2100 && frameNumber < 2800) {
        if(frameNumber < 2300) opacity += 0.005;
        else if (frameNumber > 2600) opacity -= 0.005;
        showText("Proto se ti omlouvám, že jsem poslední dny se nechoval úplně vhodně, a chci to vše napravit.", opacity);
    }
    // 5. ZPRÁVA
    else if(frameNumber >= 2800 && frameNumber < 3500) {
        if(frameNumber < 3000) opacity += 0.005;
        else if (frameNumber > 3300) opacity -= 0.005;
        let lines = ["A začnu s tímhle,", "Tyhle podobný webový stranky budu dělat ve škole a je to jedna z věcí co mě baví"];
        if (window.innerWidth < 600) showText("", opacity, 0, true, lines);
        else showText("A začnu s tímhle, Tyhle podobný webový stranky budu dělat ve škole a je to jedna z věcí co mě baví", opacity);
    }
    // FINÁLE
    else if(frameNumber >= 3500) {
        if(opacity < 1) opacity += 0.005;
        showText("Chci abys viděla že se fakt snažím, a že semnou ta budoucnost nebude špatná, chtěla si vidět nějakou práci tak tady ji máš", opacity, -50);
        
        if(frameNumber >= 3800) {
            showText("Víš nechci tě ztratit, zbožnuju trávit čas s tebou, znamenáš pro mě všechno a chci to napravit!", secondOpacity, 20);
            if(secondOpacity < 1) secondOpacity += 0.005;
        }
        
        if(frameNumber >= 4100) {
            showText("Miluju tě Karolinko <3", thirdOpacity, 90);
            if(thirdOpacity < 1) thirdOpacity += 0.005;

            // Obrázek
            context.globalAlpha = imgOpacity;
            context.drawImage(myImage, canvas.width/2 - 100, canvas.height/2 - 300, 200, 200);
            context.globalAlpha = 1.0;
            if(imgOpacity < 1) imgOpacity += 0.01;

            button.style.display = "block";
        }
    }

    context.shadowColor = "transparent";
}

function draw() {
    context.putImageData(baseFrame, 0, 0);
    drawStars();
    updateStars();
    drawText();
    frameNumber++;
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);