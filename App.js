import './src/i18n';
import AppNavigator from './src/navigation/AppNavigator';
import { LanguageProvider } from './src/context/LanguageContext';

export default function App() {
  return (
    <LanguageProvider>
      <AppNavigator />
    </LanguageProvider>
  );
}