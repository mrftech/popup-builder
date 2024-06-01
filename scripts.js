// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  function createNotification(title, description, timeAgo) {
    const notificationContainer = document.getElementById("notification-container");

    // Check if there is an existing notification on small screens
    if (window.matchMedia("(max-width: 600px)").matches && notificationContainer.children.length > 0) {
      // Remove the existing notification before adding a new one
      notificationContainer.firstChild.remove();
    }

    const notification = document.createElement("div");
    notification.className = "notification";

    notification.innerHTML = `
      <img src="icon.png" alt="Icon">
      <div class="content">
        <div class="title">${title}</div>
        <div class="description">${description}</div>
      </div>
      <div class="time">${timeAgo}</div>
    `;

    notificationContainer.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = 1;
    }, 500); // Show after 500ms

    const displayDuration = getRandomInt(3000, 5000); // Display between 3000ms to 5000ms
    setTimeout(() => {
      notification.style.opacity = 0;
      setTimeout(() => {
        notification.remove();
      }, 500); // Remove from DOM after fade out
    }, displayDuration);
  }

  function generateRandomNotification() {
    const titles = ["New Message", "Update Available", "Reminder"];
    const descriptions = ["You have a new message.", "An update is available for your app.", "Don't forget your meeting at 3 PM."];
    const times = ["1m", "2d", "3h"];

    const randomIndex = Math.floor(Math.random() * titles.length);

    createNotification(titles[randomIndex], descriptions[randomIndex], times[randomIndex]);

    // Randomize the interval between notifications
    const nextNotificationTime = getRandomInt(3000, 7000); // Between 3s and 7s
    setTimeout(generateRandomNotification, nextNotificationTime);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Start the first notification
  setTimeout(generateRandomNotification, getRandomInt(1000, 3000)); // First popup between 1s and 3s
});
