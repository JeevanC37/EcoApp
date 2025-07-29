import { useState, useEffect } from 'react';
import { 
  isStandalone, 
  canInstallPWA, 
  requestNotificationPermission,
  isOnline,
  onOnlineStatusChange
} from '../utils/pwaUtils';

export const usePWA = () => {
  const [isInstalled, setIsInstalled] = useState(isStandalone());
  const [canInstall, setCanInstall] = useState(canInstallPWA());
  const [isOffline, setIsOffline] = useState(!isOnline());
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setCanInstall(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Monitor online status
    onOnlineStatusChange(setIsOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
        setCanInstall(false);
      }
    }
  };

  const enableNotifications = async () => {
    const permission = await requestNotificationPermission();
    return permission === 'granted';
  };

  return {
    isInstalled,
    canInstall,
    isOffline: !isOnline(),
    installApp,
    enableNotifications
  };
};