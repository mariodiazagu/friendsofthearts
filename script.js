const WEATHER_KEY = 'ecf0ee017f7436c7e9eede47c92e4247';

// Hora en tiempo real
function actualizarHora() {
  const ahora = new Date();
  const h = String(ahora.getHours()).padStart(2, '0');
  const m = String(ahora.getMinutes()).padStart(2, '0');
  const s = String(ahora.getSeconds()).padStart(2, '0');
  document.getElementById('hora').textContent = `${h}:${m}:${s}`;
}
setInterval(actualizarHora, 1000);
actualizarHora();

//Luciernagas
const canvas = document.getElementById('luciernagas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const particulas = Array.from({length: 300}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 0.6 + 0.1,           // casi invisibles individualmente
  dx: (Math.random() - 0.5) * 0.15,
  dy: -Math.random() * 0.3 - 0.05,        // siempre sube lentamente
  opacidad: Math.random() * 0.6 + 0.1,    // nunca del todo opacas
  velocidadParpadeo: Math.random() * 0.005 + 0.001
}));

function animar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particulas.forEach(p => {
    p.opacidad += p.velocidadParpadeo;
    if (p.opacidad > 1 || p.opacidad < 0) p.velocidadParpadeo *= -1;

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 255, 150, ${p.opacidad})`; /* color verde luciérnaga */
    ctx.fillStyle = `rgba(255, 235, 180, ${p.opacidad * 0.7})`;
    ctx.shadowBlur = 2;
    ctx.shadowColor = `rgba(255, 220, 150, ${p.opacidad * 0.5})`;
    ctx.fill();
  });

requestAnimationFrame(animar);
}

animar();

