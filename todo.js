  const addTaskBtn = document.getElementById("addTaskBtn");
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");
    const themeBtn = document.getElementById("themeBtn");
    const filterButtons = document.querySelectorAll(".filters button");

    let currentFilter = "all";

    document.addEventListener("DOMContentLoaded", () => {
      loadTasks();
      if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
      }
    });

    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme");
      localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    });

    addTaskBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (text === "") return;
      const task = { text, completed: false };
      saveTask(task);
      taskInput.value = "";
      loadTasks();
    });

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.id.replace("Btn", "");
        loadTasks();
      });
    });

    function saveTask(task) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
      taskList.innerHTML = "";
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach((task, index) => {
        if (currentFilter === "completed" && !task.completed) return;
        if (currentFilter === "active" && task.completed) return;

        const li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", () => {
          tasks[index].completed = !tasks[index].completed;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          loadTasks();
        });

        const delBtn = document.createElement("button");
        delBtn.textContent = "❌";
        delBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          tasks.splice(index, 1);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          loadTasks();
        });

        li.appendChild(delBtn);
        taskList.appendChild(li);
      });
    }