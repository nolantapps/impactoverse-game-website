
import DataStore from "./DataStore";


 
  function SendDataToUnity() {
    if (typeof window.DataStore.sendDataToUnity === 'function') {
      window.DataStore.sendDataToUnity();
    } else {
      console.error("sendDataToUnity function is not available in DataStore.");
    }
   
  };


export default SendDataToUnity;
