// Calender

const monthYear = document.getElementById("monthYear");
const calenderDays = document.getElementById("calenderDays");
let date = new Date();

function renderCalender() {
    const year = date.getFullYear();
    const month = date.getMonth();

    const firstDay = new Date(
        year,
        month,
        1
    ).getDay();

    const lastDate = new Date(
        year,
        month + 1,
        0
    ).getDate();

    monthYear.innerText =
        `${date.toLocaleString("default", {
            month: "long"
        })} ${year}`;

    calenderDays.innerHTML = "";

    for (let i = 0; i < firstDay; i++) {
        calenderDays.innerHTML += `<div></div>`;
    }

    for (let d = 1; d <= lastDate; d++) {
        const today = new Date();
        const isToday =
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

        calenderDays.innerHTML += `
            <div class="${isToday ? "today" : ""}">
                ${d}
            </div>
        `;
    }
}

function prevMonth() {
    date.setMonth(
        date.getMonth() - 1
    );
    renderCalender();
}

function nextMonth() {
    date.setMonth(
        date.getMonth() + 1
    );
    renderCalender();
}

renderCalender();

// My task

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showTaskForm() {
    document.getElementById("taskForm").style.display = "block";
}

function saveTask() {
    const name = document.getElementById("taskName").value;
    const description = document.getElementById("taskDescription").value;
    const date = document.getElementById("taskDate").value;
    const priority = document.getElementById("taskPriority").value;
    const status = document.getElementById("taskStatus").value;
    
    if (name === "" || description === "" || date === "") {
        alert("Please fill all the fields");
        return;
    }

    if (tasks.length >= 10) {
        alert("You can create a maximum of 10 tasks.");
        return;
    }

    const task = {
        name: name,
        description: description,
        date: date,
        priority: priority,
        status:status
    };

    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();

    document.getElementById("taskForm").style.display = "none";

    document.getElementById("taskName").value = "";
    document.getElementById("taskDescription").value = "";
    document.getElementById("taskDate").value = "";
    document.getElementById("taskPriority").value = "Low";
    document.getElementById("taskStatus").value = "Not Started";
}

function displayTasks() {
    const taskList = document.getElementById("taskList");
    if (!taskList) {
    return;
}

    taskList.innerHTML = "";
    tasks.forEach(function(task, index) {
        taskList.innerHTML += `
            <div class="task-card">
                <h3>${task.name}</h3>

                <p>${task.description}</p>

                <p>
                    <strong>Due Date:</strong>
                    ${task.date}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${task.priority}
                </p>

                <p><strong>Status:</strong> ${task.status}</p>

                <div class="task-actions">

                    <button class="edit-btn"
                            onclick="editTask(${index})">
                        <i class="fas fa-pen"></i>
                        Edit
                    </button>

                    <button class="delete-btn"
                            onclick="deleteTask(${index})">
                        <i class="fas fa-trash"></i>
                        Delete
                    </button>
                </div>
            </div>
        `;
    });
}

function deleteTask(index) {
    const confirmDelete =
        confirm(
            "Are you sure you want to delete this task?"
        );
    if (confirmDelete) {
        tasks.splice(index, 1);
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
        );
        displayTasks();

        displayHomeMyTasks();

        displayTaskStatistics();
    }
}

function editTask(index) {
    const task = tasks[index];

    document.getElementById("taskName").value = task.name;
    document.getElementById("taskDescription").value = task.description;
    document.getElementById("taskDate").value = task.date;
    document.getElementById("taskPriority").value = task.priority;
    document.getElementById("taskPriority").value = task.status;

    document.getElementById("taskForm").style.display = "block";

    tasks.splice(index, 1);

    displayTasks();
}

// Vital task

let vitalTasks = JSON.parse(localStorage.getItem("vitalTasks")) || [];

function showVitalTaskForm() {
    document.getElementById("vitalTaskForm").style.display = "block";

}

function saveVitalTask() {
    const name =document.getElementById("vitalTaskName").value;
    const description =document.getElementById("vitalTaskDescription").value;
    const date =document.getElementById("vitalTaskDate").value;
    const time =document.getElementById("vitalTaskTime").value;
    const priority = document.getElementById("vitalTaskPriority").value;
    const status =document.getElementById("vitalTaskStatus").value;

    if (
        name === "" ||
        description === "" ||
        date === "" ||
        time === ""
    ) {

        alert("Please fill all the fields");
        return;
    }

    const task = {
        name: name,
        description: description,
        date: date,
        time: time,
        priority : priority,
        status: status
    };

    if (vitalTasks.length >= 10) {
        alert("You can create a maximum of 10 vital tasks.");
        return;
    }

    vitalTasks.push(task);

    localStorage.setItem(
        "vitalTasks",
        JSON.stringify(vitalTasks)
    );

    displayVitalTasks();
    displayHomeVitalTasks();
    displayTaskStatistics();

    document.getElementById("vitalTaskForm").style.display = "none";
    document.getElementById("vitalTaskName").value = "";
    document.getElementById("vitalTaskDescription").value = "";
    document.getElementById("vitalTaskDate").value = "";
    document.getElementById("vitalTaskTime").value = "";
    document.getElementById("vitalTaskPriority").value = "High";
    document.getElementById("vitalTaskStatus").value = "Not Started";
}

function displayVitalTasks() {
    const taskList =
        document.getElementById("vitalTaskList");

    if (!taskList) {
        return;
    }

    taskList.innerHTML = "";
    vitalTasks.forEach(function(task, index) {
        taskList.innerHTML += `
            <div class="vital-task-card">
                <h3>
                    🔴 ${task.name}
                </h3>

                <p>
                    ${task.description}
                </p>

                <p>
                    <strong>Due Date:</strong>
                    ${task.date}
                </p>

                <p>
                    <strong>Due Time:</strong>
                    ${task.time}
                </p>
                <p>
                    <strong>Priority:</strong>
                    ${task.prority || "high"}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${task.status || "Not Started"}
                </p>

                <div class="vital-task-actions">

                    <button
                        class="vital-edit-btn"
                        onclick="editVitalTask(${index})">

                        <i class="fas fa-pen"></i>
                        Edit

                    </button>

                    <button
                        class="vital-delete-btn"
                        onclick="deleteVitalTask(${index})">

                        <i class="fas fa-trash"></i>
                        Delete

                    </button>
                </div>
            </div>
        `;
    });
}

function deleteVitalTask(index) {
    const confirmDelete =
        confirm(
            "Are you sure you want to delete this vital task?"
        );
    if (confirmDelete) {
        vitalTasks.splice(index, 1);
        localStorage.setItem(
            "vitalTasks",
            JSON.stringify(vitalTasks)
        );
        displayVitalTasks();
        displayHomeVitalTasks();
        displayTaskStatistics();
    }
}

function editVitalTask(index) {
    const task = vitalTasks[index];

    document.getElementById("vitalTaskName").value = task.name;
    document.getElementById("vitalTaskDescription").value =task.description;
    document.getElementById("vitalTaskDate").value =task.date;
    document.getElementById("vitalTaskTime").value =task.time;
    document.getElementById("vitalTaskPriority").value =task.priority;
   document.getElementById("vitalTaskPriority").value = task.status;

    document.getElementById("vitalTaskForm").style.display ="block";
    vitalTasks.splice(index, 1);
displayVitalTasks();
}

displayTasks();
displayVitalTasks();

function displayCategories() {
    const vitalContainer = document.getElementById("categoryVitalTasks");
    const normalContainer = document.getElementById("categoryNormalTasks");

    vitalContainer.innerHTML = "";
    normalContainer.innerHTML = "";

    vitalTasks.forEach(function(task, index) {
        vitalContainer.innerHTML += `
            <div class="category-task-card">

                <h3>
                    🔴 ${task.name}
                </h3>

                <p>${task.description}</p>

                <p>
                    <strong>Due Date:</strong>
                    ${task.date}
                </p>

                <p>
                    <strong>Due Time:</strong>
                    ${task.time}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${task.priority}
                </p>

                <div class="category-actions">

                    <button
                        class="category-edit-btn"
                        onclick="editVitalTask(${index})">

                        <i class="fas fa-pen"></i>
                        Edit

                    </button>

                    <button
                        class="category-delete-btn"
                        onclick="deleteVitalTask(${index})">

                        <i class="fas fa-trash"></i>
                        Delete

                    </button>
                </div>
            </div>
        `;
    });

    tasks.forEach(function(task, index) {
        normalContainer.innerHTML += `
            <div class="category-task-card">

                <h3>
                    📋 ${task.name}
                </h3>

                <p>${task.description}</p>

                <p>
                    <strong>Due Date:</strong>
                    ${task.date}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${task.priority}
                </p>

                <div class="category-actions">

                    <button
                        class="category-edit-btn"
                        onclick="editTask(${index})">

                        <i class="fas fa-pen"></i>
                        Edit

                    </button>

                    <button
                        class="category-delete-btn"
                        onclick="deleteTask(${index})">

                        <i class="fas fa-trash"></i>
                        Delete

                    </button>
                </div>
            </div>
        `;
    });
}

function signupUser() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if (name === "" || email === "" || username === "" || password === "") {
        alert("Please fill all the fields");
        return;
    }

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Signup successful!");
    showLogin();
}

function loginUser() {
    const username =document.getElementById("loginUsername").value;
    const password =document.getElementById("loginPassword").value;
    const savedUsername =localStorage.getItem("username");
    const savedPassword =localStorage.getItem("password");

    if (
        username === savedUsername &&
        password === savedPassword
    ) {

        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";

    } else {
        alert("Invalid username or password");
    }
}
function showSignup() {
    document.querySelector(".auth-box").style.display = "none";
    document.querySelector(".signup-box").style.display = "block";
}

function showLogin() {
    document.querySelector(".auth-box").style.display = "block";
    document.querySelector(".signup-box").style.display = "block";
}

const userName = document.getElementById("userName");

if (userName) {
    const name = localStorage.getItem("name");
    userName.innerText = name || "User";
}

const profilePhoto = document.getElementById("profilePhoto");
const profileImage = document.getElementById("profileImage");
const userIcon = document.getElementById("userIcon");

if (profilePhoto) {
    profilePhoto.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const imageData = event.target.result;
                localStorage.setItem("profilePhoto", imageData);
                profileImage.src = imageData;
                profileImage.style.display = "block";
                userIcon.style.display = "none";
            };

            reader.readAsDataURL(file);
        }
    });
}

const savedPhoto = localStorage.getItem("profilePhoto");
if (savedPhoto && profileImage && userIcon) {
    profileImage.src = savedPhoto;
    profileImage.style.display = "block";
    userIcon.style.display = "none";
}

function checkTaskNotifications() {
    const notifications = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach(function(task) {
        const dueDate = new Date(task.date);
        dueDate.setHours(0, 0, 0, 0);
        const difference = dueDate - today;
        const daysRemaining =
            difference / (1000 * 60 * 60 * 24);
        if (daysRemaining === 1) {
            notifications.push(
                "📋 " + task.name + " is due tomorrow."
            );
        }

        else if (daysRemaining === 0) {
            notifications.push(
                "📋 " + task.name + " is due today."
            );
        }

        else if (daysRemaining < 0) {
            notifications.push(
                "⚠️ " + task.name + " is overdue."
            );
        }
    });

    vitalTasks.forEach(function(task) {
        const dueDate = new Date(task.date);
        dueDate.setHours(0, 0, 0, 0);
        const difference = dueDate - today;
        const daysRemaining = difference / (1000 * 60 * 60 * 24);
        if (daysRemaining === 1) {
            notifications.push(
                "🔴 " + task.name + " is due tomorrow."
            );
        }

        else if (daysRemaining === 0) {
            notifications.push(
                "🔴 " + task.name + " is due today."
            );
        }

        else if (daysRemaining < 0) {
            notifications.push(
                "⚠️ " + task.name + " is overdue."
            );
        }
    });


    displayNotifications(notifications);
}


function displayHomeVitalTasks() {
    const homeVitalTasks = document.getElementById("homeVitalTasks");
    if (!homeVitalTasks) return;
    homeVitalTasks.innerHTML = "";
    vitalTasks.forEach(function(task) {
        homeVitalTasks.innerHTML += `
            <div class="home-vital-task">
                <div>
                    <h3>${task.name}</h3>
                    <p>${task.description}</p>
                </div>

                <span>
                    Priority: ${task.priority}
                
                </span>
            </div>
        `;
    });
}


function displayHomeMyTasks() {
    const homeMyTasks = document.getElementById("homeMyTasks");
    if (!homeMyTasks) {
        return;
    }
    homeMyTasks.innerHTML = "";
    tasks.forEach(function(task) {
        homeMyTasks.innerHTML += `
            <div class="home-my-task">
                <div>
                    <h3>${task.name}</h3>
                    <p>${task.description}</p>
                </div>

                <span>
                    Priority: ${task.priority}
                </span>
            </div>
        `;
    });
}

displayTasks();
displayVitalTasks();
displayHomeMyTasks();
displayHomeVitalTasks();
displayTaskStatistics();

function displaySettings() {
    document.getElementById("settingsUsername").value = localStorage.getItem("username") || "";
    document.getElementById("settingsEmail").value = localStorage.getItem("email") || "";
    document.getElementById("settingsContact").value = localStorage.getItem("contact") || "";
}

function updateAccount() {
    const username = document.getElementById("settingsUsername").value;
    const email = document.getElementById("settingsEmail").value;
    const contact = document.getElementById("settingsContact").value;

    if (username === "" || email === "" || contact === "") {
        alert("Please fill all the fields.");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("contact", contact);

    alert("Account information updated successfully!");
}


function changePassword() {
    const currentPassword =document.getElementById("currentPassword").value;
    const newPassword =document.getElementById("newPassword").value;
    const confirmPassword =document.getElementById("confirmPassword").value;
    const savedPassword =localStorage.getItem("password");

    if (currentPassword !== savedPassword) {
        alert("Current password is incorrect.");
        return;
    }

    if (newPassword === "" || confirmPassword === "") {
        alert("Please fill all the fields.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
    }

    localStorage.setItem("password", newPassword);

    alert("Password changed successfully!");

    document.getElementById("currentPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
}

function showPage(pageName) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.style.display = "none";
    });

    const selectedPage = document.getElementById(pageName);

    if (selectedPage) {
        selectedPage.style.display = "block";
    }

    if (pageName === "settings") {
        displaySettings();
    }

    if (pageName === "tasks") {
        displayTasks();
    }

    if (pageName === "vital") {
        displayVitalTasks();
    }

    if (pageName === "categories") {
        displayCategories();
    }

    if (pageName === "home") {
        displayHomeVitalTasks();
        displayHomeMyTasks();
    }
}

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question) {
    question.addEventListener("click", function() {
        const answer = this.nextElementSibling;
        const symbol = this.querySelector("span");
        if (answer.style.display === "block") {
            answer.style.display = "none";
            symbol.innerText = "+";
        } else {
            answer.style.display = "block";
            symbol.innerText = "−";
        }
    });
});

function logoutUser() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
}

function displayTaskStatistics() {
    const allTasks = [...tasks, ...vitalTasks];

    const total = allTasks.length;

    let notStarted = 0;
    let inProgress = 0;
    let completed = 0;

    allTasks.forEach(function(task) {
        if (task.status === "Not Started") {
            notStarted++;
        }
        else if (task.status === "In Progress") {
            inProgress++;
        }
        else if (task.status === "Completed") {
            completed++;

        }

    });

    document.getElementById("totalTaskCount").textContent = total;
    document.getElementById("notStartedCount").textContent = notStarted;
    document.getElementById("inProgressCount").textContent = inProgress;
    document.getElementById("completedCount").textContent = completed;
}

function displayWeeklyProgress() {
    const allTasks = [...tasks, ...vitalTasks];

    const days = [
        "sun",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat"
    ];

    const weeklyData = {
        sun: { total: 0, completed: 0 },
        mon: { total: 0, completed: 0 },
        tue: { total: 0, completed: 0 },
        wed: { total: 0, completed: 0 },
        thu: { total: 0, completed: 0 },
        fri: { total: 0, completed: 0 },
        sat: { total: 0, completed: 0 }
    };

    allTasks.forEach(function(task) {
        if (!task.date) {
            return;
        }

        const taskDate = new Date(task.date + "T00:00:00");
        const dayNumber = taskDate.getDay();
        const dayName = days[dayNumber];
        weeklyData[dayName].total++;

        if (task.status === "Completed") {
            weeklyData[dayName].completed++;
        }

    });

    days.forEach(function(day) {
        const data = weeklyData[day];
        let percentage = 0;
        if (data.total > 0) {
            percentage =
                Math.round(
                    (data.completed / data.total) * 100
                );
        }

        const progressBar = document.getElementById(day + "Progress");

        const percentText = document.getElementById(day + "Percent");

        if (progressBar) {
            progressBar.style.width = percentage + "%";
        }

        if (percentText) {
            percentText.textContent = percentage + "%";
        }
    });
}
displayWeeklyProgress();

function displayDailyProgress() {
    const allTasks = [...tasks, ...vitalTasks];
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;

    const todayTasks = allTasks.filter(function(task) {
        return task.date === todayDate;
    });

    const total = todayTasks.length;

    const completed = todayTasks.filter(function(task) {
        return task.status === "Completed";
    }).length;

    const remaining = total - completed;

    let percentage = 0;
    if (total > 0) {
        percentage = Math.round(
            (completed / total) * 100
        );
    }

    document.getElementById( "dailyProgressPercent").textContent = percentage + "%";
    document.getElementById("dailyProgressCount").textContent = completed + " / " + total;
    document.getElementById("dailyCompletedCount").textContent = completed;
    document.getElementById("dailyRemainingCount").textContent = remaining;
    const circle =document.querySelector(".daily-progress-circle");
    if (circle) {
        const degree = percentage * 3.6;
        circle.style.background =
            `conic-gradient(
                #2ecc71 0deg,
                #2ecc71 ${degree}deg,
                #e5e5e5 ${degree}deg,
                #e5e5e5 360deg
            )`;
    }
}
displayDailyProgress();
