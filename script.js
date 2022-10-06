function createButtons() {

  let names = ["crash", "floor-tom", "hi-hat", "snare", "medium-tom", "ride", "high-tom", "bass-drum"];
  let left = [64.5, 22.5, 75.2, 57, 35, 16, 54, 36];
  let above = [5, 32, 22.5, 35, 23.5, 4, 24.5, 45];
  let width = [26, 20, 17, 19, 17, 30, 14.5, 34];
  let height = [9, 28, 4, 11, 20, 11.5, 17, 48];
  let radius = [];
  let deg = [];

  for (let i = 0; i < names.length; i++){
    let parent = document.getElementById("buttons");
    let btn = document.createElement("button");
    btn.id = `${names[i]}-btn`;
    btn.style.opacity = 0.4;
    btn.style.backgroundColor = 'lightBlue';
    // btn.style.border = 'transparent';
    // btn.style.backgroundColor = 'transparent';
    // btn.style.color = 'orange';
    btn.style.left = `${left[i]}%`;
    btn.style.top = `${above[i]}%`;
    btn.style.width = `${width[i]}%`;
    btn.style.height = `${height[i]}%`;
    btn.style.cursor = 'pointer';
    btn.innerHTML = `${names[i]}`;
    btn.addEventListener("click", () => {
      const audio = new Audio();
      audio.src = `assets/${names[i]}.wav`;
      audio.play();
    });
    parent.appendChild(btn);
  }
}

createButtons();