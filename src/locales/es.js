// Spanish translations
export default {
  // Gender Selection
  welcome: {
    title: '¡Bienvenido al Reino de las Matemáticas!',
    subtitle: 'Elige tu personaje para comenzar la aventura',
    princess: 'Princesa Matemática',
    princessDesc: 'Un mundo rosa de ensueño',
    prince: 'Príncipe Matemático',
    princeDesc: 'Una tierra de aventuras azul',
    defaultPrince: 'Pequeño Príncipe',
    defaultPrincess: 'Pequeña Princesa'
  },

  // Home Screen
  home: {
    princessTitle: 'Princesa Matemática',
    princeTitle: 'Príncipe Matemático',
    subtitle: 'El Camino hacia la Realeza Matemática',
    streakDays: 'Racha',
    totalQuestions: 'Preguntas',
    accuracy: 'Precisión',
    stickers: 'Pegatinas',
    stickerWall: 'Mi Muro de Pegatinas',
    viewAll: 'Ver Todo →',
    startGame: 'Comenzar Práctica',
    stats: 'Estadísticas',
    stickerWallBtn: 'Pegatinas',
    reset: 'Reiniciar Datos',
    noStickers: '¡Completa niveles para ganar pegatinas!',
    confirmReset: 'Confirmar Reinicio',
    resetWarning: '¿Estás seguro de que quieres reiniciar todos los datos? Esto borrará todo el progreso, pegatinas y estadísticas.',
    confirm: 'Confirmar',
    cancel: 'Cancelar'
  },

  // Operation Selection
  operations: {
    title: 'Elige el Tipo de Operación',
    addition: 'Suma',
    subtraction: 'Resta',
    multiplication: 'Multiplicación',
    division: 'División',
    fraction: 'Fracciones',
    levelsCompleted: '{count}/6 niveles completados'
  },

  // Level Selection
  levels: {
    title: 'Seleccionar Nivel',
    level: 'Nivel',
    best: 'Mejor',
    levelNames: {
      1: 'Bebé Numérico',
      2: 'Pequeño Explorador',
      3: 'Hada de los Números',
      4: 'Guerrero del Cien',
      5: 'Maestro Matemático',
      6: '' // Dynamic based on operation
    },
    princeTitle: {
      addition: 'Príncipe de la Suma',
      subtraction: 'Príncipe de la Resta',
      multiplication: 'Príncipe de la Multiplicación',
      division: 'Príncipe de la División',
      fraction: 'Príncipe de las Fracciones'
    },
    princessTitle: {
      addition: 'Princesa de la Suma',
      subtraction: 'Princesa de la Resta',
      multiplication: 'Princesa de la Multiplicación',
      division: 'Princesa de la División',
      fraction: 'Princesa de las Fracciones'
    },
    levelDescriptions: {
      addition_1: '1-10 + 1-10',
      addition_2: '10-50 + 1-20',
      addition_3: '10-99 + 10-99',
      addition_4: '100-500 + decenas',
      addition_5: '100-999 + unidades no cero',
      addition_6: 'Números grandes mixtos',
      subtraction_1: '10-20 − 1-9',
      subtraction_2: '20-50 − 1-19',
      subtraction_3: '50-99 − 10-49',
      subtraction_4: '100-200 − decenas',
      subtraction_5: '200-500 − unidades no cero',
      subtraction_6: 'Números grandes mixtos',
      multiplication_1: '1-5 × 1-5',
      multiplication_2: '1-9 × 1-9 (tablas)',
      multiplication_3: '10-20 × 2-9',
      multiplication_4: '11-19 × 11-19',
      multiplication_5: '20-50 × 2-9',
      multiplication_6: 'Desafío mixto',
      division_1: 'Divisible por 2-5',
      division_2: 'División con tablas',
      division_3: 'Decenas ÷',
      division_4: 'Hasta 100 ÷',
      division_5: 'Números mayores ÷',
      division_6: 'Desafío mixto',
      fraction_1: 'Mismo denominador +',
      fraction_2: 'Mismo denominador −',
      fraction_3: 'Denominadores diferentes simples',
      fraction_4: 'Fracción × entero',
      fraction_5: 'Fracción ÷ entero',
      fraction_6: 'Operaciones de fracciones mixtas'
    }
  },

  // Game Screen
  game: {
    question: 'Pregunta',
    yourAnswer: 'Tu respuesta',
    submit: 'Enviar',
    correct: 'Correcto',
    wrong: 'Incorrecto',
    correctAnswer: 'La respuesta correcta es',
    retry: 'Intentar de Nuevo',
    next: 'Siguiente →',
    correctFeedback: '✓ ¡Correcto!',
    wrongFeedback: '✗ Incorrecto',
    quit: 'Salir',
    quitTitle: '¿Tomar un descanso?',
    quitMessage: 'Tu progreso en esta ronda no se guardará. ¿Quieres continuar practicando?',
    continueGame: '¡Seguir Adelante!',
    quitConfirm: 'Tomar un Descanso',
    numerator: 'Numerador',
    denominator: 'Denominador',
    keyboardHint: 'Entrada por teclado disponible',
    fractionKeyboardHint: 'Tab o / para cambiar',
    retriedBadge: 'Reintentado'
  },

  // Result Screen
  result: {
    correct: 'Correctas',
    wrong: 'Incorrectas',
    accuracy: 'Precisión',
    time: 'Tiempo',
    retriedInfo: '{count} pregunta(s) correcta(s) después de reintentar',
    unlockMessage: '🎉 ¡Increíble! ¡Siguiente nivel desbloqueado!',
    newStickers: '¡Nuevas Pegatinas Ganadas!',
    nextLevelIs: 'El siguiente nivel es',
    home: '🏠 Inicio',
    tryAgain: '🔄 Intentar de Nuevo',
    nextLevel: '➡️ Siguiente Nivel',
    showDetails: 'Mostrar Detalles',
    hideDetails: 'Ocultar Detalles',
    encouragement: {
      perfect: [
        "¡Increíble! ¡Eres un genio de las matemáticas!",
        "¡Perfecto! ¡Eres absolutamente brillante!",
        "¡Wow! ¡Todo correcto! ¡Eres increíble!",
        "¡Puntuación perfecta! ¡Eres la estrella más brillante!",
        "¡Imbatible! ¡El Reino Matemático está orgulloso de ti!"
      ],
      excellent: [
        "¡Excelente trabajo! ¡Sigue adelante, el siguiente nivel te espera!",
        "¡Fantástico! ¡Estás muy cerca de la perfección!",
        "¡Genial! ¡Tu progreso es asombroso!",
        "¡Brillante! ¡Eres una estrella matemática!",
        "¡Súper! ¡Sigue con el gran trabajo!"
      ],
      good: [
        "¡Bien hecho! ¡Sigue practicando!",
        "¡Buen trabajo! ¡Continúa así!",
        "¡Buen trabajo! ¡La práctica hace al maestro!",
        "¡Sigue adelante! ¡Puedes hacerlo aún mejor!",
        "¡Nada mal! ¡La persistencia es clave!"
      ],
      tryAgain: [
        "¡No te rindas! ¡La práctica hace al maestro!",
        "¡Sigue intentando! ¡Tú puedes!",
        "¡Está bien! ¡El fracaso es el maestro del éxito!",
        "¡Inténtalo de nuevo! ¡Definitivamente lo lograrás!",
        "¡No te detengas! ¡Cada práctica cuenta!"
      ]
    },
    nextLevelHint: {
      1: '¿Listo para una nueva aventura?',
      2: '¡Vamos a desafiar problemas más difíciles!',
      3: 'Vienen números grandes, ¿estás listo?',
      4: '¡A punto de convertirte en Maestro Matemático!',
      5: '¡El desafío final, momento de coronación!'
    }
  },

  // Sticker Wall
  stickerWall: {
    title: 'Mi Muro de Pegatinas',
    collected: 'Coleccionadas {earned} / {total} pegatinas',
    bronze: 'Bronce',
    silver: 'Plata',
    gold: 'Oro',
    crown: 'Corona',
    notEarned: '🔒 Aún no ganada',
    earnedDate: 'Ganada el',
    condition: {
      bronze: 'Completa Nivel 1-2',
      silver: 'Completa Nivel 3-4',
      gold: 'Completa Nivel 5-6',
      crown: 'Completa todos los niveles + 90%+ precisión'
    }
  },

  // Stats Panel
  stats: {
    title: 'Estadísticas',
    totalQuestions: 'Total de Preguntas',
    overallAccuracy: 'Precisión General',
    streakDays: 'Días de Racha',
    operationStats: 'Estadísticas por Operación',
    questions: 'Preguntas',
    accuracy: 'Precisión',
    sessions: 'Sesiones',
    bestTime: 'Mejor Tiempo',
    progressOverview: 'Progreso de Niveles'
  },

  // Common
  common: {
    back: 'Volver',
    close: 'Cerrar',
    loading: 'Cargando...'
  },

  // User Menu
  userMenu: {
    welcome: 'Bienvenido',
    logout: 'Cerrar Sesión',
    switchUser: 'Cambiar Usuario',
    language: 'Idioma',
    addUser: 'Agregar Usuario',
    deleteUser: 'Eliminar Usuario',
    confirmDelete: '¿Eliminar Usuario?',
    deleteWarning: '¿Estás seguro de que quieres eliminar a {name}? Todo el progreso y datos de este usuario se eliminarán permanentemente.',
    userName: 'Nombre (opcional)',
    namePlaceholder: 'Ingresa el nombre...',
    selectGender: 'Seleccionar Personaje',
    confirm: 'Crear Usuario',
    cancel: 'Cancelar',
    delete: 'Eliminar'
  },

  // Login
  login: {
    enterName: "¿Cuál es tu nombre?",
    namePlaceholder: 'Ingresa tu nombre...',
    selectGender: 'Soy un...',
    boy: 'Niño',
    girl: 'Niña',
    start: '¡Comenzar Aventura!',
    nameRequired: 'Por favor ingresa tu nombre'
  },

  // Shop
  shop: {
    title: 'Tienda',
    tabs: {
      levels: 'Desbloquear',
      stickers: 'Pegatinas',
      frames: 'Marcos',
      backgrounds: 'Temas'
    },
    levelUnlockDesc: '¡Usa monedas para desbloquear nuevos niveles antes!',
    framesDesc: '¡Decora tu avatar con hermosos marcos!',
    backgroundsDesc: '¡Cambia el tema de tu reino matemático!',
    allLevelsUnlocked: '¡Todos los niveles ya están desbloqueados!',
    unlocked: 'Desbloqueado',
    owned: 'Adquirido',
    equipped: 'Equipado',
    tapToEquip: 'Toca para equipar',
    removeFrame: 'Quitar Marco',
    removeBackground: 'Restablecer Tema',
    confirmPurchase: 'Confirmar Compra',
    balanceAfter: 'Saldo después de la compra',
    buy: 'Comprar',
    purchaseSuccess: '¡Compra exitosa!',
    purchaseFailed: 'Compra fallida',
    transactionHistory: 'Historial de Monedas',
    totalEarned: 'Total Ganado',
    totalSpent: 'Total Gastado',
    noTransactions: 'Sin transacciones aún',
    transactionReasons: {
      purchase: 'Compra en tienda',
      levelUnlock: 'Desbloqueo de nivel',
      levelComplete: 'Nivel completado'
    },
    stickerSeries: {
      special: 'Serie Especial',
      animals: 'Amigos Animales',
      food: 'Comida Deliciosa',
      sports: 'Diversión Deportiva'
    },
    stickers: {
      rainbow: 'Arcoíris',
      unicorn: 'Unicornio',
      rocket: 'Cohete',
      diamond: 'Diamante',
      star: 'Estrella',
      sparklingHeart: 'Corazón Brillante',
      sun: 'Sol',
      moon: 'Luna',
      butterfly: 'Mariposa',
      hibiscus: 'Hibisco',
      panda: 'Panda',
      cat: 'Gato',
      dog: 'Perro',
      rabbit: 'Conejo',
      bear: 'Oso',
      fox: 'Zorro',
      lion: 'León',
      penguin: 'Pingüino',
      owl: 'Búho',
      dolphin: 'Delfín',
      pizza: 'Pizza',
      iceCream: 'Helado',
      cake: 'Pastel de Cumpleaños',
      cookie: 'Galleta',
      candy: 'Caramelo',
      soccer: 'Fútbol',
      basketball: 'Baloncesto',
      tennis: 'Tenis'
    },
    frames: {
      gold: 'Marco Dorado',
      rainbow: 'Marco Arcoíris',
      sparkle: 'Marco Brillante',
      diamond: 'Marco Diamante',
      flower: 'Marco Floral',
      star: 'Marco Estrella',
      heart: 'Marco Corazón',
      crown: 'Marco Corona'
    },
    backgrounds: {
      space: 'Aventura Espacial',
      spaceDesc: '¡Explora las estrellas!',
      ocean: 'Mundo Oceánico',
      oceanDesc: '¡Sumérgete en el azul profundo!',
      forest: 'Bosque Mágico',
      forestDesc: '¡Entra al bosque encantado!',
      candy: 'País de los Dulces',
      candyDesc: '¡Un paraíso dulce!',
      sunset: 'Resplandor del Atardecer',
      sunsetDesc: '¡Hermosa hora dorada!',
      aurora: 'Noche de Aurora',
      auroraDesc: '¡Magia de auroras boreales!',
      sakura: 'Flores de Cerezo',
      sakuraDesc: '¡Pétalos cayendo suavemente!',
      galaxy: 'Corriente Galáctica',
      galaxyDesc: '¡Viaje a través del cosmos!'
    }
  },

  // Coins
  coins: {
    earned: 'Monedas Ganadas',
    correctAnswers: 'Respuestas Correctas',
    levelBonus: 'Bono de Nivel',
    perfectBonus: 'Bono de Puntuación Perfecta',
    noRetryBonus: 'Bono Sin Reintentos',
    total: 'Total'
  },

  // Hidden Achievements
  achievements: {
    title: 'Logros Ocultos',
    hint: '¡Desbloquea a través de logros especiales!',
    firstPerfect: 'Primer Perfecto',
    firstPerfectDesc: '¡Obtén tu primera puntuación perfecta!',
    speedDemon: 'Demonio de la Velocidad',
    speedDemonDesc: '¡Puntuación perfecta en menos de 60 segundos!',
    sevenDay: 'Guerrero Semanal',
    sevenDayDesc: '¡7 días de racha de práctica!',
    goldCollector: 'Coleccionista de Oro',
    goldCollectorDesc: '¡Gana 1000 monedas en total!',
    thousand: 'Maestro de Preguntas',
    thousandDesc: '¡Responde 1000 preguntas!',
    allRounder: 'Todoterreno',
    allRounderDesc: '¡Domina todas las operaciones!',
    firstTry: 'Primer Intento',
    firstTryDesc: '¡Puntuación perfecta sin reintentos!',
    collector: 'Coleccionista',
    collectorDesc: '¡Colecciona 30 pegatinas!',
    rich: 'Pequeño Magnate',
    richDesc: '¡Gana 5000 monedas en total!',
    mathMaster: 'Maestro Matemático',
    mathMasterDesc: '¡Perfecciona todos los niveles en todas las operaciones!'
  },

  // Footer
  footer: {
    privacy: 'Esta es una aplicación puramente frontend. Todos tus datos se almacenan localmente en tu navegador. Nunca subimos ninguna información.',
    aboutApp: 'Sobre esta app ✨',
    hideStory: 'Ocultar historia',
    story: 'Esta aplicación nació cuando estaba practicando matemáticas con mi hija y pensé: "¿No sería maravilloso tener una aplicación divertida y mágica para convertir el aprendizaje de matemáticas en una aventura?" ¡Y así nació el Reino de las Matemáticas! 🏰',
    callToAction: 'Si tienes ideas para mejorarla, ¡por favor compártelas en GitHub! ¡Deseando mucho éxito a todos los pequeños matemáticos! 🌟',
    feedback: 'Comentarios y Sugerencias'
  }
}
