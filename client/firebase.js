import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
class FirebaseService {
  constructor() {
    ////should change this config
    this.firebaseConfig = {
      apiKey: "AIzaSyCHgct4LWvS_4azoV7jLR2rWNxQkazxHPc",
      authDomain: "hackelite-a5037.firebaseapp.com",
      projectId: "hackelite-a5037",
      storageBucket: "hackelite-a5037.firebasestorage.app",
      messagingSenderId: "562332384915",
      appId: "1:562332384915:web:b408fb39bdd68afc94d766",
      measurementId: "G-FEC3EQWQL6"
    };
    
    this.vapidKey ="BG1tha4LqkMaCDXoAfTeb_v-UEgeCPmRQ93gRYh5Y2jl3YgT9PSqfUeHwJuSPk9ffQpO4gtCHF8J63nhRBsfC-I";
    this.app = initializeApp(this.firebaseConfig);
    this.messaging = getMessaging(this.app);
  }
  async requestToken() {
    try {
      const currentToken = await getToken(this.messaging, {
        vapidKey: this.vapidKey,
      });
      if (currentToken) {
        console.log("FCM Token:", currentToken);
        return currentToken; // Return token if needed
      } else {
        console.warn("No registration token available. Request permission to generate one.");
        return null;
      }
    } catch (error) {
      console.error("An error occurred while retrieving token:", error);
      throw error; // Re-throw for further handling if necessary
    }
  }
}
const firebaseService = new FirebaseService();
export default firebaseService;
