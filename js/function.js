let data = getData();
data.map(item => creatItem(item.text, item.done));
updateCount();

function getData() {
    return JSON.parse(localStorage.getItem("data")) || [];
}

function saveData(text) {
    let data = getData();
    data.push({ text, done: false });

    localStorage.setItem("data", JSON.stringify(data));
}

function removeData(text) {
    let data = getData();
    let result = data.filter(item => item.text != text);
    localStorage.setItem("data", JSON.stringify(result));
}

function checkData(text) {
    let data = getData();
    let result = data.filter(item => {
        if (item.text === text) item.done = true;
        return item;
    });
    localStorage.setItem("data", JSON.stringify(result));
}

function clearData() {
    let data = getData();
    let result = data.filter(item => !item.done);
    localStorage.setItem("data", JSON.stringify(result));
}

document.querySelector("#clear").onclick = () => {
    document.querySelector("#done").textContent = "";
    clearData();
};
function updateCount() {
    document.querySelector(".badge").textContent =
        document.querySelectorAll("#todo li").length;
}
document.querySelector("button").onclick = () => {
    let text = document.querySelector("input").value;
    if (text === "") return false;

    creatItem(text);
    updateCount();
    saveData(text);

    document.querySelector("input").value = "";
    document.querySelector("input").focus();
};

document.querySelector("input").onkeydown = e => {
    if (e.key === "Enter") document.querySelector("button").onclick();
};

function creatItem(text, done = false) {
    let li = document.createElement("li");
    li.classList.add("list-group-item");
    li.textContent = text;

    let check = document.createElement("a");
    check.classList.add("fa-solid", "fa-check", "float-start", "me-2");
    check.setAttribute("href", "#");
    check.onclick = () => {
        document.querySelector("#done").appendChild(li);
        check.remove();
        updateCount();
        checkData(text);
    };

    if (!done) li.appendChild(check);

    let del = document.createElement("a");
    del.classList.add("fa-solid", "fa-trash", "float-end", "text-danger");
    del.setAttribute("href", "#");
    del.onclick = () => {
        li.remove();
        updateCount();
        removeData(text);
    };

    li.appendChild(del);

    if (done) document.querySelector("#done").appendChild(li);
    else document.querySelector("#todo").appendChild(li);
}
