const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ajoute 'node_modules' aux dossiers surveillés pour éviter les problèmes de fichiers non suivis
config.watchFolders = [
  path.resolve(__dirname, 'node_modules'),
];

// Exclure des fichiers spécifiques du processus de bundling si nécessaire
config.blockList = [
  /node_modules\/@react-navigation\/core\/lib\/module\/useNavigationState.js/,
];

// Si tu rencontres des problèmes avec la résolution de modules, tu peux également spécifier un "resolver"
config.resolver = {
  ...config.resolver,
  // Exemple d'ajout de résolution pour des modules spécifiques
  extraNodeModules: {
    'react-native-safe-area-context': path.resolve(__dirname, 'node_modules/react-native-safe-area-context'),
  },
};

module.exports = config;
