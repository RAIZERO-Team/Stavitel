// import fetchData from "api.js";

class redireect {

  // constructor (){
  //   this.tt_Error = error;
  // }

  goTo(handel_Error) {
    switch (handel_Error) {
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
        window.location.href = "../View/Error/404_Not_Found.html";
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
    }
  }
}
