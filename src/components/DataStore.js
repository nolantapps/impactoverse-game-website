import user from './LoginForm';
import Cookies from 'js-cookie';
import handleLogin from './LoginForm';
const DataStore = {
  token: null,
  email: null,
  displayName: null,

  // Setters for token, email, and displayName
  setToken(newToken) {
    this.token = newToken;
    this.storeInSessionStorage('token', newToken); // Store token in sessionStorage
    this.storeInCookies('token', newToken);  //store token in cookies
    //console.log(this.token + " new Token Received");
    
  },

  setEmail(newEmail) {
    this.email = newEmail;
    this.storeInSessionStorage('email', newEmail); // Store email in sessionStorage
    this.storeInCookies('email', newEmail); // Store in cookies
    //console.log(this.email + " new Email Received");
  },

  setDisplayName(newDisplayName) {
    this.displayName = newDisplayName;
    this.storeInSessionStorage('displayName', newDisplayName); // Store displayName in sessionStorage
    this.storeInCookies('displayName', newDisplayName); // Store in cookies
    //console.log(this.displayName + " new Display Name Received");
  },

  // Helper methods to store and retrieve from both storages
  storeInSessionStorage(key, value) {
    if (sessionStorage) {
      sessionStorage.setItem(key, value); // Store in sessionStorage
    }
  },
  storeInCookies(key, value) {
    Cookies.set(key, value, { expires: 3 }); // Store in cookies with 3-day expiration
  },
  getFromSessionStorage(key) {
    if (sessionStorage) {
      return sessionStorage.getItem(key); // Retrieve from sessionStorage
    }
    return null;
  },

  getFromCookies(key) {
    return Cookies.get(key) || null; // Retrieve from cookies
  },
  getFromLocalStorage(key) {
    if (localStorage) {
      return localStorage.getItem(key); // Retrieve from localStorage
    }
    return null;
  },

  // Getters for token, email, and displayName, retrieving from sessionStorage, cookies first, then localStorage if needed
  getToken() {
    if (!this.token) {
      this.token = this.getFromSessionStorage('token') ||this.getFromCookies('token') || this.getFromLocalStorage('token'); // Check sessionStorage first, then localStorage
    }
    return this.token;
  },

  getEmail() {
    if (!this.email) {
      this.email = this.getFromSessionStorage('email') ||this.getFromCookies('email') || this.getFromLocalStorage('email'); // Check sessionStorage first, then localStorage
    }
    return this.email;
  },

  getDisplayName() {
    if (!this.displayName) {
      this.displayName = this.getFromSessionStorage('displayName') || this.getFromCookies('displayName') || this.getFromLocalStorage('displayName'); // Check sessionStorage, cookies first, then localStorage
      console.log(this.displayName);
    }
    return this.displayName;
  },
  setUserInSessionStorage( user)
  {
    //const userString= JSON.stringify({user});
    this.storeInSessionStorage('User', user); 
    this.storeInCookies('User', user);

  },
  checkForCookies()
  {
    if(this.getFromCookies('email')&&this.getFromCookies('password'))
    {
       const _email = this.getFromCookies('email');
       const _password = this.getFromCookies('password');
       handleLogin({_email , _password });
    }
    
  },
  setPasswordInCookies(password)
  {
    this.storeInCookies(password);
  },
  // This method will be used to send data to Unity
  sendDataToUnity() {
    if (window.unityInstance) {
      // Ensure that token, email, and displayName are loaded from sessionStorage or localStorage if necessary
      const email = this.getEmail();
      const token = this.getToken();
      const displayName = this.getDisplayName();

      if (email && token && displayName) {
        console.log('Sending data to Unity from DataStore.js');
        console.log('Email:', email);
        console.log('Token:', token);
        console.log('Display Name:', displayName);
        
        window.unityInstance.SendMessage(
          "DataReciever",  // Unity GameObject name (ensure it matches in Unity)
          "ReceiveData",   // Unity method to call (ensure it matches Unity method name)
         
          JSON.stringify({ user }) // Data to send as a JSON string displayName token
          
        );

        // Remove items from sessionStorage after sending
        sessionStorage.removeItem('token'); 
        console.log('token removed from session storage');
        
        sessionStorage.removeItem('email');
        console.log('email removed from session storage');
        
        sessionStorage.removeItem('displayName');
        console.log('displayName removed from session storage');
        
        Cookies.remove('token');
        console.log('token removed from cookies');
        Cookies.remove('email');
        console.log('email removed from cookies');
        Cookies.remove('displayName');
        console.log('display name removed from cookies');

        this.token = null;
        this.email = null;
        this.displayName = null;
      } else {
        console.error("Email, token, or displayName is missing.");
      }
    } else {
      console.error("Unity instance is not available.");
    }
  }
};

// Expose the DataStore globally to the window object 
window.DataStore = DataStore;
window.sendDataToUnity = DataStore.sendDataToUnity.bind(DataStore);
window.dataStoreLoaded = true;
console.log("DataStore has been loaded and is ready.");

export default DataStore;
