import {EAS_PROJECT_ID} from '@env';

export default {
  expo: {
    name: "ShopShpere",
    slug: "shopsphere",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/AppIcon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/SplashScreen.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.ahz_khn_05.shopsphere",
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: ["expo-secure-store"],
    extra: {
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    owner: "ahz_khn_05",
  },
};
