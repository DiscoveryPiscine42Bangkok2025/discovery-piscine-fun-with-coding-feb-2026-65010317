let ft_list = document.getElementById("ft_list");
let newBtn = document.getElementById("newBtn");

// ------------------- COOKIE FUNCTIONS -------------------
function setCookie(name, value, days) {
  let date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + date.toUTCString() + ";path=/";
}

function getCookie(name) {
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookies = decodedCookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();
    if (c.indexOf(name + "=") === 0) {
      return c.substring(name.length + 1, c.length);
    }
  }
  return "";
}

// ------------------- SAVE LIST -------------------
function saveTodos() {
  let todos = [];
  let items = ft_list.querySelectorAll(".todo");

  items.forEach(item => {
    todos.push(item.textContent);
  });

  setCookie("todos", JSON.stringify(todos), 30);
}

// ------------------- CREATE TODO -------------------
function createTodo(text) {
  let div = document.createElement("div");
  div.className = "todo";
  div.textContent = text;

  div.addEventListener("click", function () {
    if (confirm("Do you want to remove this TO DO?")) {
      div.remove();
      saveTodos();
    }
  });

  // add at TOP
  ft_list.prepend(div);
  saveTodos();
}

// ------------------- LOAD TODOS FROM COOKIE -------------------
function loadTodos() {
  let cookieValue = getCookie("todos");
  if (cookieValue !== "") {
    let todos = JSON.parse(cookieValue);

    todos.forEach(todo => {
      // ต้อง append กลับแบบ reverse เพราะ cookie เก็บจากบนลงล่าง
      let div = document.createElement("div");
      div.className = "todo";
      div.textContent = todo;

      div.addEventListener("click", function () {
        if (confirm("Do you want to remove this TO DO?")) {
          div.remove();
          saveTodos();
        }
      });

      ft_list.append(div);
    });
  }
}

// ------------------- BUTTON EVENT -------------------
newBtn.addEventListener("click", function () {
  let text = prompt("Enter a new TO DO:");

  if (text !== null) {
    text = text.trim();
    if (text !== "") {
      createTodo(text);
    }
  }
});

// ------------------- START -------------------
loadTodos();
