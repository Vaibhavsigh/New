import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { notificationService } from './src/services/notificationService';

notificationService.setBackgroundMessageHandler();

AppRegistry.registerComponent(appName, () => App);
