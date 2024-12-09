// app.config.js
import { config } from "dotenv";
config(); 

export default {
  expo: {
    name: "ShopSphere",
    slug: "shopsphere",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/Images/app-icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/Images/splash-screen.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/Images/app-icon.png",
        backgroundColor: "#ffffff"
      },
      package: "com.ahz_khn_05.shopsphere",
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      "expo-secure-store"
    ],
    extra: {
      eas: {
        projectId: process.env.EAS_PROJECT_ID  // Load the project ID from .env
      }
    },
    ower: "ahz_khn_05",
    newArchEnabled: true
  }
};
