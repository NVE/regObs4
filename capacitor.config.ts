import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'no.nve.regobs4',
  appName: 'Varsom',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
    iosScheme: 'ionic'
  },
  plugins: {
    'SplashScreen': {
      'launchAutoHide': false
    },
    Keyboard: {
      resize: KeyboardResize.Ionic,
      resizeOnFullScreen: true,
      style: KeyboardStyle.Default
    },
  },
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      'android-minSdkVersion': '24',
      'android-compileSdkVersion': '30',
      'android-build-tool': '30.0.3',
      'android-targetSdkVersion': '30',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      AutoHideSplashScreen: 'true',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000',
      FadeSplashScreenDuration: '300',
      AndroidLaunchMode: 'singleTask',
      AndroidPersistentFileLocation: 'Compatibility',
      WKWebViewOnly: 'true',
      ResolveServiceWorkerRequests: 'true',
      AndroidXEnabled: 'true'
    }
  }
};

export default config;
