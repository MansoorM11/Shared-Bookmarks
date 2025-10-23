// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

import { getData, setData } from "./storage.js";

// window.onload = function () {
//   const users = getUserIds();
//   //document.querySelector("body").innerText = `There are ${users.length} users`;
// };

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
  const userData = getData(selectedValue) || []; // can it be current user as well?
  renderBookmarks(userData);
});

function renderBookmarks(userInfo) {
  displayUserUrl.innerHTML = "";
  if (userInfo.length === 0) {
    displayUserUrl.textContent = "No bookmarks saved for this user.";
    return; // why do we need return
  }
  // Create a simple list of the user’s bookmarks
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
  event.preventDefault(); // stop the page from reloading

  // Make sure a user is selected first
  if (!currentUser || currentUser === "default") {
    alert("Please select a user before adding a bookmark.");
    return;
  }

  // Get the input values
  const url = document.getElementById("bookmarkUrl").value.trim();
  const title = document.getElementById("urlTitle").value.trim();
  const description = document.getElementById("urlDescription").value.trim();

  // Basic validation
  if (!url || !title) {
    alert("Please fill in both the URL and title fields.");
    return; // i already have required on html ??
  }

  // Create a new bookmark object
  const timestamp = new Date().toLocaleString();
  const newBookmark = { url, title, description, timestamp };

  // Retrieve existing bookmarks (or start a new array)
  const existingBookmarks = getData(currentUser) || [];

  // Add the new one and save it
  existingBookmarks.push(newBookmark);
  setData(currentUser, existingBookmarks);

  // Re-render the updated list
  renderBookmarks(existingBookmarks);

  // Clear form fields
  form.reset();
});
