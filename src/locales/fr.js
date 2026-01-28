// French translations
export default {
  // Gender Selection
  welcome: {
    title: 'Bienvenue au Royaume des Maths !',
    subtitle: 'Choisis ton personnage pour commencer l\'aventure',
    princess: 'Princesse des Maths',
    princessDesc: 'Un monde rose de rêve',
    prince: 'Prince des Maths',
    princeDesc: 'Un pays d\'aventures bleu',
    defaultPrince: 'Petit Prince',
    defaultPrincess: 'Petite Princesse'
  },

  // Home Screen
  home: {
    princessTitle: 'Princesse des Maths',
    princeTitle: 'Prince des Maths',
    subtitle: 'Le Chemin vers la Royauté Mathématique',
    streakDays: 'Série',
    totalQuestions: 'Questions',
    accuracy: 'Précision',
    stickers: 'Autocollants',
    stickerWall: 'Mon Mur d\'Autocollants',
    viewAll: 'Tout voir →',
    startGame: 'Commencer la Pratique',
    stats: 'Statistiques',
    stickerWallBtn: 'Autocollants',
    reset: 'Réinitialiser les Données',
    noStickers: 'Termine des niveaux pour gagner des autocollants !',
    confirmReset: 'Confirmer la Réinitialisation',
    resetWarning: 'Es-tu sûr de vouloir réinitialiser toutes les données ? Cela effacera tout le progrès, les autocollants et les statistiques.',
    confirm: 'Confirmer',
    cancel: 'Annuler'
  },

  // Operation Selection
  operations: {
    title: 'Choisis le Type d\'Opération',
    addition: 'Addition',
    subtraction: 'Soustraction',
    multiplication: 'Multiplication',
    division: 'Division',
    fraction: 'Fractions',
    levelsCompleted: '{count}/6 niveaux terminés'
  },

  // Level Selection
  levels: {
    title: 'Sélectionner le Niveau',
    level: 'Niveau',
    best: 'Meilleur',
    levelNames: {
      1: 'Bébé des Nombres',
      2: 'Petit Explorateur',
      3: 'Fée des Nombres',
      4: 'Guerrier des Cent',
      5: 'Maître des Maths',
      6: '' // Dynamic based on operation
    },
    princeTitle: {
      addition: 'Prince de l\'Addition',
      subtraction: 'Prince de la Soustraction',
      multiplication: 'Prince de la Multiplication',
      division: 'Prince de la Division',
      fraction: 'Prince des Fractions'
    },
    princessTitle: {
      addition: 'Princesse de l\'Addition',
      subtraction: 'Princesse de la Soustraction',
      multiplication: 'Princesse de la Multiplication',
      division: 'Princesse de la Division',
      fraction: 'Princesse des Fractions'
    },
    levelDescriptions: {
      addition_1: '1-10 + 1-10',
      addition_2: '10-50 + 1-20',
      addition_3: '10-99 + 10-99',
      addition_4: '100-500 + dizaines',
      addition_5: '100-999 + unités non nulles',
      addition_6: 'Grands nombres mixtes',
      subtraction_1: '10-20 − 1-9',
      subtraction_2: '20-50 − 1-19',
      subtraction_3: '50-99 − 10-49',
      subtraction_4: '100-200 − dizaines',
      subtraction_5: '200-500 − unités non nulles',
      subtraction_6: 'Grands nombres mixtes',
      multiplication_1: '1-5 × 1-5',
      multiplication_2: '1-9 × 1-9 (tables)',
      multiplication_3: '10-20 × 2-9',
      multiplication_4: '11-19 × 11-19',
      multiplication_5: '20-50 × 2-9',
      multiplication_6: 'Défi mixte',
      division_1: 'Divisible par 2-5',
      division_2: 'Division avec tables',
      division_3: 'Dizaines ÷',
      division_4: 'Jusqu\'à 100 ÷',
      division_5: 'Grands nombres ÷',
      division_6: 'Défi mixte',
      fraction_1: 'Même dénominateur +',
      fraction_2: 'Même dénominateur −',
      fraction_3: 'Dénominateurs différents simples',
      fraction_4: 'Fraction × entier',
      fraction_5: 'Fraction ÷ entier',
      fraction_6: 'Opérations de fractions mixtes'
    }
  },

  // Game Screen
  game: {
    question: 'Question',
    yourAnswer: 'Ta réponse',
    submit: 'Envoyer',
    correct: 'Correct',
    wrong: 'Incorrect',
    correctAnswer: 'La bonne réponse est',
    retry: 'Réessayer',
    next: 'Suivant →',
    correctFeedback: '✓ Correct !',
    wrongFeedback: '✗ Incorrect',
    quit: 'Quitter',
    quitTitle: 'Prendre une pause ?',
    quitMessage: 'Ta progression dans cette manche ne sera pas sauvegardée. Veux-tu continuer à pratiquer ?',
    continueGame: 'Continuer !',
    quitConfirm: 'Prendre une Pause',
    numerator: 'Numérateur',
    denominator: 'Dénominateur',
    keyboardHint: 'Saisie clavier disponible',
    fractionKeyboardHint: 'Tab ou / pour changer',
    retriedBadge: 'Réessayé'
  },

  // Result Screen
  result: {
    correct: 'Correct',
    wrong: 'Incorrect',
    accuracy: 'Précision',
    time: 'Temps',
    retriedInfo: '{count} question(s) correcte(s) après réessai',
    unlockMessage: '🎉 Incroyable ! Niveau suivant débloqué !',
    newStickers: 'Nouveaux Autocollants Gagnés !',
    nextLevelIs: 'Le niveau suivant est',
    home: '🏠 Accueil',
    tryAgain: '🔄 Réessayer',
    nextLevel: '➡️ Niveau Suivant',
    showDetails: 'Afficher les Détails',
    hideDetails: 'Masquer les Détails',
    encouragement: {
      perfect: [
        "Incroyable ! Tu es un génie des maths !",
        "Parfait ! Tu es absolument brillant !",
        "Wow ! Tout juste ! Tu es incroyable !",
        "Score parfait ! Tu es l'étoile la plus brillante !",
        "Imbattable ! Le Royaume des Maths est fier de toi !"
      ],
      excellent: [
        "Excellent travail ! Continue, le niveau suivant t'attend !",
        "Fantastique ! Tu es si proche de la perfection !",
        "Génial ! Tes progrès sont étonnants !",
        "Brillant ! Tu es une star des maths !",
        "Super ! Continue comme ça !"
      ],
      good: [
        "Bien joué ! Continue à pratiquer !",
        "Bon travail ! Continue comme ça !",
        "Bien joué ! La pratique mène à la perfection !",
        "Continue ! Tu peux faire encore mieux !",
        "Pas mal ! La persévérance est la clé !"
      ],
      tryAgain: [
        "N'abandonne pas ! La pratique mène à la perfection !",
        "Continue d'essayer ! Tu peux le faire !",
        "C'est normal ! L'échec est le maître du succès !",
        "Réessaie ! Tu vas y arriver !",
        "Ne lâche pas ! Chaque pratique compte !"
      ]
    },
    nextLevelHint: {
      1: 'Prêt pour une nouvelle aventure ?',
      2: 'Allons relever des défis plus difficiles !',
      3: 'Les grands nombres arrivent, es-tu prêt ?',
      4: 'Tu vas bientôt devenir Maître des Maths !',
      5: 'Le défi final, c\'est l\'heure du couronnement !'
    }
  },

  // Sticker Wall
  stickerWall: {
    title: 'Mon Mur d\'Autocollants',
    collected: '{earned} / {total} autocollants collectés',
    bronze: 'Bronze',
    silver: 'Argent',
    gold: 'Or',
    crown: 'Couronne',
    notEarned: '🔒 Pas encore gagné',
    earnedDate: 'Gagné le',
    condition: {
      bronze: 'Terminer Niveau 1-2',
      silver: 'Terminer Niveau 3-4',
      gold: 'Terminer Niveau 5-6',
      crown: 'Terminer tous les niveaux + 90%+ précision'
    }
  },

  // Stats Panel
  stats: {
    title: 'Statistiques',
    totalQuestions: 'Total des Questions',
    overallAccuracy: 'Précision Globale',
    streakDays: 'Jours de Série',
    operationStats: 'Stats par Opération',
    questions: 'Questions',
    accuracy: 'Précision',
    sessions: 'Sessions',
    bestTime: 'Meilleur Temps',
    progressOverview: 'Progression des Niveaux'
  },

  // Common
  common: {
    back: 'Retour',
    close: 'Fermer',
    loading: 'Chargement...'
  },

  // User Menu
  userMenu: {
    welcome: 'Bienvenue',
    logout: 'Déconnexion',
    switchUser: 'Changer d\'Utilisateur',
    language: 'Langue',
    addUser: 'Ajouter Utilisateur',
    deleteUser: 'Supprimer Utilisateur',
    confirmDelete: 'Supprimer l\'Utilisateur ?',
    deleteWarning: 'Es-tu sûr de vouloir supprimer {name} ? Toutes les progressions et données de cet utilisateur seront définitivement supprimées.',
    userName: 'Nom (optionnel)',
    namePlaceholder: 'Entre ton nom...',
    selectGender: 'Choisir le Personnage',
    confirm: 'Créer Utilisateur',
    cancel: 'Annuler',
    delete: 'Supprimer'
  },

  // Login
  login: {
    enterName: "Comment t'appelles-tu ?",
    namePlaceholder: 'Entre ton nom...',
    selectGender: 'Je suis un...',
    boy: 'Garçon',
    girl: 'Fille',
    start: 'Commencer l\'Aventure !',
    nameRequired: 'Entre ton nom s\'il te plaît'
  },

  // Shop
  shop: {
    title: 'Boutique',
    tabs: {
      levels: 'Débloquer',
      stickers: 'Autocollants',
      frames: 'Cadres',
      backgrounds: 'Thèmes'
    },
    levelUnlockDesc: 'Utilise des pièces pour débloquer de nouveaux niveaux en avance !',
    framesDesc: 'Décore ton avatar avec de jolis cadres !',
    backgroundsDesc: 'Change le thème de ton royaume des maths !',
    allLevelsUnlocked: 'Tous les niveaux sont déjà débloqués !',
    unlocked: 'Débloqué',
    owned: 'Possédé',
    equipped: 'Équipé',
    tapToEquip: 'Appuie pour équiper',
    removeFrame: 'Retirer le Cadre',
    removeBackground: 'Réinitialiser le Thème',
    confirmPurchase: 'Confirmer l\'Achat',
    balanceAfter: 'Solde après achat',
    buy: 'Acheter',
    purchaseSuccess: 'Achat réussi !',
    purchaseFailed: 'Achat échoué',
    transactionHistory: 'Historique des Pièces',
    totalEarned: 'Total Gagné',
    totalSpent: 'Total Dépensé',
    noTransactions: 'Pas encore de transactions',
    transactionReasons: {
      purchase: 'Achat en boutique',
      levelUnlock: 'Déblocage de niveau',
      levelComplete: 'Niveau terminé'
    },
    stickerSeries: {
      special: 'Série Spéciale',
      animals: 'Amis Animaux',
      food: 'Nourriture Délicieuse',
      sports: 'Sports Amusants'
    },
    stickers: {
      rainbow: 'Arc-en-ciel',
      unicorn: 'Licorne',
      rocket: 'Fusée',
      diamond: 'Diamant',
      star: 'Étoile',
      sparklingHeart: 'Cœur Étincelant',
      sun: 'Soleil',
      moon: 'Lune',
      butterfly: 'Papillon',
      hibiscus: 'Hibiscus',
      panda: 'Panda',
      cat: 'Chat',
      dog: 'Chien',
      rabbit: 'Lapin',
      bear: 'Ours',
      fox: 'Renard',
      lion: 'Lion',
      penguin: 'Pingouin',
      owl: 'Hibou',
      dolphin: 'Dauphin',
      pizza: 'Pizza',
      iceCream: 'Glace',
      cake: 'Gâteau d\'Anniversaire',
      cookie: 'Cookie',
      candy: 'Bonbon',
      soccer: 'Football',
      basketball: 'Basketball',
      tennis: 'Tennis'
    },
    frames: {
      gold: 'Cadre Doré',
      rainbow: 'Cadre Arc-en-ciel',
      sparkle: 'Cadre Étincelant',
      diamond: 'Cadre Diamant',
      flower: 'Cadre Floral',
      star: 'Cadre Étoile',
      heart: 'Cadre Cœur',
      crown: 'Cadre Couronne'
    },
    backgrounds: {
      space: 'Aventure Spatiale',
      spaceDesc: 'Explore les étoiles !',
      ocean: 'Monde Océanique',
      oceanDesc: 'Plonge dans le bleu profond !',
      forest: 'Forêt Magique',
      forestDesc: 'Entre dans la forêt enchantée !',
      candy: 'Pays des Bonbons',
      candyDesc: 'Un paradis sucré !',
      sunset: 'Lueur du Coucher de Soleil',
      sunsetDesc: 'Belle heure dorée !',
      aurora: 'Nuit d\'Aurore',
      auroraDesc: 'Magie des aurores boréales !',
      sakura: 'Fleurs de Cerisier',
      sakuraDesc: 'Pétales tombant doucement !',
      galaxy: 'Courant Galactique',
      galaxyDesc: 'Voyage à travers le cosmos !'
    }
  },

  // Coins
  coins: {
    earned: 'Pièces Gagnées',
    correctAnswers: 'Réponses Correctes',
    levelBonus: 'Bonus de Niveau',
    perfectBonus: 'Bonus Score Parfait',
    noRetryBonus: 'Bonus Sans Réessai',
    total: 'Total'
  },

  // Hidden Achievements
  achievements: {
    title: 'Succès Cachés',
    hint: 'Débloque par des accomplissements spéciaux !',
    firstPerfect: 'Premier Parfait',
    firstPerfectDesc: 'Obtiens ton premier score parfait !',
    speedDemon: 'Démon de la Vitesse',
    speedDemonDesc: 'Score parfait en moins de 60 secondes !',
    sevenDay: 'Guerrier Hebdomadaire',
    sevenDayDesc: 'Série de 7 jours de pratique !',
    goldCollector: 'Collectionneur d\'Or',
    goldCollectorDesc: 'Gagne 1000 pièces au total !',
    thousand: 'Maître des Questions',
    thousandDesc: 'Réponds à 1000 questions !',
    allRounder: 'Polyvalent',
    allRounderDesc: 'Maîtrise toutes les opérations !',
    firstTry: 'Premier Essai',
    firstTryDesc: 'Score parfait sans réessai !',
    collector: 'Collectionneur',
    collectorDesc: 'Collecte 30 autocollants !',
    rich: 'Petit Magnat',
    richDesc: 'Gagne 5000 pièces au total !',
    mathMaster: 'Maître des Maths',
    mathMasterDesc: 'Perfectionne tous les niveaux dans toutes les opérations !'
  },

  // Footer
  footer: {
    privacy: 'Ceci est une application purement frontend. Toutes tes données sont stockées localement dans ton navigateur. Nous ne téléchargeons jamais aucune information.',
    aboutApp: 'À propos de cette app ✨',
    hideStory: 'Masquer l\'histoire',
    story: 'Cette application est née quand je pratiquais les maths avec ma fille et j\'ai pensé : "Ne serait-il pas merveilleux d\'avoir une application amusante et magique pour transformer l\'apprentissage des maths en aventure ?" Et ainsi, le Royaume des Maths est né ! 🏰',
    callToAction: 'Si tu as des idées pour l\'améliorer, partage-les sur GitHub ! Bonne chance à tous les petits mathématiciens ! 🌟',
    feedback: 'Commentaires & Suggestions'
  }
}
