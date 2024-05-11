import { project } from "../context/Projects.js";
import { notification } from "../context/notfication.js";

let create_btn = document.getElementById("create_btn");

create_btn.addEventListener("click", async (event) => {
  event.preventDefault();

  let project_name = document.getElementById("project_name").value;
  let test1 = new project(project_name);
  const notificationsContainer = document.querySelector(".notifications");
  const notifier = new notification();
  
  try {
    const result = await test1.create_project({
      name: project_name,
    });
    
    if (result) {
      if (result.name) {
        console.log(result.name);
        
      const customMessage = "The Project is Exists";
      const successNotification = notifier.createToast("error", customMessage);
      notificationsContainer.appendChild(successNotification);
    }
  }

} catch (error) {
  console.log("Failed to register user");
}
});

