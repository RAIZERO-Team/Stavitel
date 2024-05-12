class redireect {
  constructor() {
    // Initialize any properties here
    this.lastPage = null;
  }

  // Function to perform actions and redirect based on filePath
  redirectTo(filePath) {
    // Save the current page as the last visited page
    this.lastPage = window.location.href;

    // Perform any necessary actions on the current page
    // For example, you can do some processing or call APIs

    // Simulate loading time (replace with actual operations)
    setTimeout(() => {
      // Navigate to the new page
      window.location.href = filePath;
    }, 1000); // Adjust this delay as needed
  }

  handleError(errorCode) {
    switch (errorCode) {
      case 400:
        window.location.href = "../View/Error/400_Bad_Request.html";
        break;

      case 401:
        window.location.href = "../View/Error/401_Unauthorized.html";
        break;

      case 403:
        window.location.href = "../View/Error/403_Forbidden.html";
        break;

      case 404:
        window.open("/Frontend/src/View/Error/404_Not_Found.html");
        break;

      case 500:
        window.location.href = "../View/Error/500_Internal_Server.html";
        break;

      case 503:
        window.location.href = "../View/Error/503_Service_Unavailable.html";
        break;

      case 504:
        window.location.href = "../View/Error/500_Internal_Server.html";
        break;
      default:
        // Handle any other error codes or unknown codes
        console.error("Unknown error code:", errorCode);
        break;
    }
  }

  navigateBack() {
    if (this.lastPage) {
      window.location.href = this.lastPage;
    } else {
      // If no lastPage is recorded, go to a default page
      window.location.href = "../View/index.html";
    }
  }
}

export { redireect };

// Example usage:
const redirector = new CallRedirect();

// Simulate calling redirectTo with a file path
redirector.redirectTo("newpage.html");

// Simulate handling a 404 error
redirector.handleError(404);

// Simulate navigating back to the last visited page
redirector.navigateBack();
