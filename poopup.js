(function() {
    function createNotification(config) {
      const notificationContainer = document.getElementById("notification-container") || createContainer();
  
      if (window.matchMedia("(max-width: 600px)").matches && notificationContainer.children.length > 0) {
        notificationContainer.firstChild.remove();
      }
  
      const notification = document.createElement("div");
      notification.className = "notification";
  
      notification.innerHTML = `
        <img src="${config.icon}" alt="Icon">
        <div class="content">
          <div class="title">${config.title}</div>
          <div class="description">${config.body}</div>
        </div>
        <div class="time">${config.timeAgo}</div>
      `;
  
      notificationContainer.appendChild(notification);
  
      setTimeout(() => {
        notification.style.opacity = 1;
      }, 500); 
  
      const displayDuration = config.displayDuration;
      setTimeout(() => {
        notification.style.opacity = 0;
        setTimeout(() => {
          notification.remove();
        }, 500);
      }, displayDuration);
    }
  
    function createContainer() {
      const container = document.createElement("div");
      container.id = "notification-container";
      document.body.appendChild(container);
      return container;
    }
  
    function generateRandomNotification(config) {
      createNotification(config);
  
      const nextNotificationTime = config.interval;
      setTimeout(() => generateRandomNotification(config), nextNotificationTime);
    }
  
    function getConfigFromScriptTag() {
      const scriptTag = document.querySelector('script[data-domain="zenvoice"]');
      return {
        title: scriptTag.getAttribute('data-title'),
        body: scriptTag.getAttribute('data-body'),
        icon: scriptTag.getAttribute('data-icon'),
        interval: parseInt(scriptTag.getAttribute('data-interval')),
        displayDuration: parseInt(scriptTag.getAttribute('data-display-duration')),
        timeAgo: scriptTag.getAttribute('data-time-ago')
      };
    }
  
    const config = getConfigFromScriptTag();
    setTimeout(() => generateRandomNotification(config), config.interval);
  
    const style = document.createElement('style');
    style.innerHTML = `
      #notification-container {
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 1000;
      }
  
      .notification {
        display: flex;
        align-items: center;
        background-color: #f9f9f9;
        border: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
      }
  
      .notification img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
  
      .notification .content {
        flex-grow: 1;
      }
  
      .notification .content .title {
        font-weight: bold;
      }
  
      .notification .content .description {
        font-size: 0.9em;
      }
  
      .notification .time {
        font-size: 0.8em;
        color: #777;
      }
  
      @media (max-width: 600px) {
        .notification + .notification {
          display: none;
        }
      }
    `;
    document.head.appendChild(style);
  })();
  
