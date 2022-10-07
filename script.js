let names = ["crash", "floor-tom", "hi-hat", "snare", "medium-tom", "ride", "high-tom", "bass-drum"];

function createButtons() {
  let left = [64.5, 22.5, 75.2, 57, 35, 16, 54, 36];
  let above = [5, 32, 22.5, 35, 23.5, 4, 24.5, 45];
  let width = [26, 20, 17, 19, 17, 30, 14.5, 34];
  let height = [9, 28, 4, 11, 20, 11.5, 17, 48];
  let radius = [50, 10, 50, 10, 15, 50, 10, 50];
  let deg = [-6, 5, 3, 0, 5, 9, 0, 0];
  let parent = document.getElementById("buttons");
  let size = parseInt(document.getElementById("drums").clientHeight) / 40;

  for (let i = 0; i < names.length; i++){
    let btn = document.createElement("button");
    btn.id = `${names[i]}-btn`;
    btn.style.borderColor = 'transparent';
    btn.style.backgroundColor = 'transparent';
    btn.style.opacity = '0';
    btn.style.left = `${left[i]}%`;
    btn.style.top = `${above[i]}%`;
    btn.style.width = `${width[i]}%`;
    btn.style.height = `${height[i]}%`;
    btn.style.borderRadius = `${radius[i]}%`;
    btn.style.transform = `rotate(${deg[i]}deg)`;
    btn.style.cursor = 'pointer';
    btn.style.color = 'red';
    btn.style.transition = 'background-color 2s';
    btn.style.fontSize = `${size}px`;
    btn.innerHTML = `${names[i].toUpperCase()}`;
    btn.addEventListener("click", () => {
      const audio = new Audio();
      audio.src = `assets/${names[i]}.wav`;
      audio.play();
    });
    parent.appendChild(btn);
  }
}

createButtons();

document.getElementById("names").addEventListener("click", () => {
  const btns = document.getElementById("buttons").children;
  let opOne = document.getElementById("crash-btn").style.opacity;
  let op = (opOne === '0') ? '1' : '0';
  let text = (opOne === '0') ? 'Hide' : 'Display';

  for (let i = 0; i < btns.length; i++){
    btns[i].style.opacity = op;
  }
  document.getElementById("names").innerHTML = `${text} Names`;
});

document.getElementById("show").addEventListener("click", () => {
  document.getElementById("names").disabled = true;

  const btns = document.getElementById("buttons").children;
  let opOne = document.getElementById("crash-btn").style.opacity;

  for (let i = 0; i < btns.length; i++){
    btns[i].style.fontSize = 0;
    btns[i].style.opacity = 1;
    btns[i].style.backgroundColor = 'lightGreen';
  }

  setTimeout( () => {
    setTimeout( () => {
      for (let i = 0; i < btns.length; i++){
        btns[i].style.fontSize = 'min(90%, 2vw)';
        btns[i].style.opacity = opOne;
      }
    }, 1000);
    for (let i = 0; i < btns.length; i++){
      btns[i].style.backgroundColor = 'transparent';
    }
  }, 1000);

  setTimeout( () => {
    document.getElementById("names").disabled = false;
  }, 2000);
});

window.addEventListener("resize", () => {
  let size = parseInt(document.getElementById("drums").clientHeight) / 40;
  const btns = document.getElementById("buttons").children;

  for (let i = 0; i < btns.length; i++){
    btns[i].style.fontSize = `${size}px`;
  }
  document.querySelector("h1").style.fontSize = `${(size * 4)}px`;
});

document.getElementById("falling").addEventListener("click", () => {

  const btn1 = document.getElementById("names");
  const btn2 = document.getElementById("show");
  const btns = document.getElementById("buttons").children;

  if (document.getElementById("show").style.opacity !== '0.6') {
    doPotato();
  } else {
    stopPotato();
  }
  
  function doPotato() {
    btn1.disabled = true;
    btn2.disabled = true;
    btn1.style.opacity = 0.6;
    btn2.style.opacity = 0.6;
    document.getElementById("falling").innerHTML = "Stopping the style";

    for (let i = 0; i < btns.length; i++){
      btns[i].replaceWith(btns[i].cloneNode(true));
      btns[i].addEventListener("click", (event) => {

        const p = document.createElement("img");
        p.src =  (Math.random() < 0.5) ? "https://play-lh.googleusercontent.com/9UDY3O4wSwlBm-kHHfjKf85Yk5GCt0nckL5ZdMR-nYotAfNjODvR4sZ-scPXG3ABVF65" : "https://pngimg.com/uploads/carrot/carrot_PNG99141.png";
        p.alt = "Falling potato picture.";
        p.style.position = 'absolute';
        let pY = -40;
        p.style.top = pY + 'px';
        p.style.width = '40px';
        document.querySelector("body").appendChild(p);

        let x = (event.clientX - (p.clientWidth / 2));
        let y = (event.clientY - (p.clientHeight * 1.0));

        p.style.left = x  + 'px';

        let myInterval = setInterval( () => {
          pY += 2;
          p.style.top = pY + 'px';

          if (pY >= (y)){
            const audio = new Audio();
            audio.src = `assets/${names[i]}.wav`;
            audio.play();
            p.remove();
            clearInterval(myInterval);
          }
        }, 15);
      });
    }

  }

  function stopPotato() {
    btn1.disabled = false;
    btn2.disabled = false;
    btn1.style.opacity = 1;
    btn2.style.opacity = 1;
    document.getElementById("falling").innerHTML = "Falling in style";

    for (let i = 0; i < btns.length; i++){
      btns[i].replaceWith(btns[i].cloneNode(true));
      btns[i].addEventListener("click", () => {
        const audio = new Audio();
        audio.src = `assets/${names[i]}.wav`;
        audio.play();
      });
    }
  }
});