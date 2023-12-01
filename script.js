let modeBtn = document.querySelector(".mode__btn");
let sun = document.querySelector(".sun");
let moon = document.querySelector(".mode__moon");
let form = document.querySelector(".todo__content");
let input = document.querySelector(".parent__input");
let taskBox = document.querySelector(".task__box");
let ul = document.querySelector(".task__list");
let modeLogo = modeBtn.querySelector("img");
let taskCounter = document.querySelector(".task-count");
let spanCount = document.querySelector(".span__count");
let spanText = document.querySelector(".span__count-text");
let activeBtn = document.querySelector(".activeBtn");
let completed = document.querySelector(".completed");
let clearCompleted = document.querySelector(".clear-completed");

let innerContainerdarkMode = document.querySelectorAll("[data='dark-mode']");

let el = document.body;

modeBtn.addEventListener("click", () => {
  el.classList.toggle("dark");

  if (el.classList.contains("dark")) {
    modeBtn.removeChild(moon);
    let image = document.createElement("img");
    image.classList.add("sun");
    image.src = "img/sun.svg";
    modeBtn.append(image);

    innerContainerdarkMode.forEach((el) => {
      el.classList.add("dark-mode");
    });
  } else {
    let sun = document.querySelector(".sun");
    modeBtn.removeChild(sun);
    modeBtn.append(moon);
    innerContainerdarkMode.forEach((el) => {
      el.classList.remove("dark-mode");
    });
  }
});

let taskArr = [];
let id = 1;
let li;
let div;
let img;

let deletBtn;
let editBtn;
form.addEventListener("submit", (e) => {
  e.preventDefault();

  taskArr.push({
    text: input.value,
    id: id,
    completed: false,
  });
  input.value = "";
  id++;

  createTask(taskArr);
 
});

function createTask(arr) {
  ul.innerHTML = "";

  arr.forEach((el) => {
    li = document.createElement("li");
    li.classList.add("task__item");
    li.setAttribute("data", "dark-mode");
    li.style.backgroundColor = "transparent";
    li.style.fontFamily = "Josefin Sans";

    ul.prepend(li);

    div = document.createElement("div");
    div.classList.add("circle");
    li.append(div);

    let p = document.createElement("p");
    p.classList.add("task__p");
    li.append(p);
    p.textContent = el.text;

    img = document.createElement("img");
    img.src = "img/cross.svg";
    img.classList.add("delete__task");

    li.append(img);
    countTask(taskArr);

    deletBtn = document.querySelector(".delete__task");
    deletBtn.addEventListener("click", () => deleteTask(el.id));

    editBtn = taskBox.querySelector(".circle");
    editBtn.addEventListener("click", () => editTask(el.id));

    div.style.background = el.completed
      ? "linear-gradient(#44DBFD, #BD5BF3)"
      : "";
    p.style.color = el.completed ? p.classList.add("textdecoration") : "none";
  });
}

function deleteTask(id) {
  taskArr = taskArr.filter((el) => el.id !== id);
  createTask(taskArr);
}

function editTask(id) {
  taskArr = taskArr.map((el) => {
    if (el.id == id) {
      return { ...el, completed: !el.completed };
    } else {
      return el;
    }
  });
  createTask(taskArr);
}

function countTask(arr) {
  if (arr.length > 0) {
    count = arr.length;
    if (count > 0 && count == 1) {
      spanCount.innerHTML = count;
      spanText.innerHTML = "item left";
    } else if (count > 0 && count > 1) {
      spanCount.innerHTML = count;
      spanText.innerHTML = "items left";
    }
    let deleteTask = document.querySelector(".delete__task");

    deleteTask.addEventListener("click", () => {
      count = arr.length;
      console.log(count);
      if (count == 1) {
        spanCount.innerHTML = 0;
      }
    });
  }
}
countTask(taskArr);

let all = document.querySelector(".all");

all.addEventListener("click", () => {
  createTask(taskArr);
});

activeBtn.addEventListener("click", () => {
  let filterForActive = taskArr.filter((el) => !el.completed);
  createTask(filterForActive);
  countTask(filterForActive);
});

completed.addEventListener("click", () => {
  let filterForCompleted = taskArr.filter((el) => el.completed);
  createTask(filterForCompleted);
  countTask(filterForCompleted);
});

clearCompleted.addEventListener("click", () => {
  let newArr = taskArr.filter((el) => el.completed !== true);
  console.log(newArr);
  createTask(newArr);
  countTask(newArr);
});
