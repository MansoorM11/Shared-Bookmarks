import { getData, setData } from "./storage.js";

let currentUser = null;
const userSelect = document.querySelector("#userSelection");
const form = document.querySelector("#form");
const displayUserUrl = document.querySelector("#displayUserUrl");

userSelect.addEventListener("change", () => {
  const selectedValue = userSelect.value;
  if (selectedValue === "default") {
    displayUserUrl.innerHTML = "";
    currentUser = null;
    return;
  }
  currentUser = selectedValue;
  const userData = getData(selectedValue) || [];
  renderBookmarks(userData);
});

function renderBookmarks(userInfo) {
  displayUserUrl.innerHTML = "";
  if (userInfo.length === 0) {
    displayUserUrl.textContent = "No bookmarks saved for this user.";
    return;
  }

  const list = document.createElement("ul");
  [...userInfo].reverse().forEach(({ title, url, description, timestamp }) => {
    const item = document.createElement("li");
    item.innerHTML = `<strong>${title}</strong> - <a href="${url}" target="_blank">${url}</a><br>${
      description ? description + "<br>" : ""
    }<small>Added on: ${timestamp}</small>`;
    list.appendChild(item);
  });
  displayUserUrl.appendChild(list);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!currentUser || currentUser === "default") {
    alert("Please select a user before adding a bookmark.");
    return;
  }

  const url = document.getElementById("bookmarkUrl").value.trim();
  const title = document.getElementById("urlTitle").value.trim();
  const description = document.getElementById("urlDescription").value.trim();

  if (!url || !title) {
    alert("Please fill in both the URL and title fields.");
    return;
  }

  const timestamp = new Date().toLocaleString();
  const newBookmark = { url, title, description, timestamp };

  const existingBookmarks = getData(currentUser) || [];

  existingBookmarks.push(newBookmark);
  setData(currentUser, existingBookmarks);

  renderBookmarks(existingBookmarks);

  form.reset();
});
