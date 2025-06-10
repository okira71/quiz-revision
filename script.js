// Custom alert function
function showMessageBox(message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    messageBox.innerHTML = `<p>${message}</p><button id="closeMessageBox">OK</button>`;
    document.body.appendChild(messageBox);

    document.getElementById('closeMessageBox').addEventListener('click', () => {
        document.body.removeChild(messageBox);
    });
}

// --- GESTION DES ÉLÉMENTS DU DOM ---
const selectionContainer = document.getElementById('selectionContainer');
const quizContainer = document.getElementById('quizContainer');
const statsContainer = document.getElementById('statsContainer');
const dissertationContainer = document.getElementById('dissertationContainer'); // Nouveau : Conteneur de la dissertation

const usernameInput = document.getElementById('usernameInput');
const createUserBtn = document.getElementById('createUserBtn');
const loadUserBtn = document.getElementById('loadUserBtn');
const profileList = document.getElementById('profileList');
const activeUserProfileDisplay = document.getElementById('activeUserProfile');
const currentUserDisplay = document.getElementById('currentUserDisplay'); // En-tête global
const viewStatsBtn = document.getElementById('viewStatsBtn');
const deleteUserBtn = document.getElementById('deleteUserBtn'); // Nouveau : Bouton supprimer

const startFiguresBtn = document.getElementById('startFiguresBtn');
const startTonalitesBtn = document.getElementById('startTonalitesBtn');
const startDissertationBtn = document.getElementById('startDissertationBtn'); // Nouveau : Bouton Dissertation
const gameOptionsSection = document.getElementById('gameOptionsSection');
const gameModeOptions = document.getElementById('gameModeOptions');
const difficultyOptions = document.getElementById('difficultyOptions');
const startSelectedQuizBtn = document.getElementById('startSelectedQuizBtn');

const quizTitleEl = document.getElementById('quizTitle');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const timerDisplay = document.getElementById('timerDisplay'); // Nouveau : Affichage du timer
const progressBarFill = document.getElementById('progressBarFill');
const phraseEl = document.getElementById('phrase');
const form = document.getElementById('form');
const answerSelect = document.getElementById('answer');
const feedbackEl = document.getElementById('feedback');
const scoreEl = document.getElementById('score');

const submitBtn = document.getElementById('submitBtn');
const explanationBtn = document.getElementById('explanationBtn');
const nextBtn = document.getElementById('nextBtn');
const endQuizBtns = document.getElementById('endQuizBtns');
const replayBtn = document.getElementById('replayBtn');
const backToMenuBtn = document.getElementById('backToMenuBtn');
const viewQuizStatsBtn = document.getElementById('viewQuizStatsBtn'); // Bouton pour voir stats du quiz terminé
const backToMainMenuFromStatsBtn = document.getElementById('backToMainMenuFromStatsBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

const statsUserName = document.getElementById('statsUserName');
const statsForQuizTitle = document.getElementById('statsForQuizTitle');
const statsHighScore = document.getElementById('statsHighScore');
const failedQuestionsList = document.getElementById('failedQuestionsList');

// Éléments de la nouvelle section dissertation
const dissertationTopicDisplay = document.getElementById('dissertationTopicDisplay');
const selectDissertationTopicBtn = document.getElementById('selectDissertationTopicBtn');
const dissertationTopicSelection = document.getElementById('dissertationTopicSelection');
const dissertationSubjectSelect = document.getElementById('dissertationSubjectSelect');
const confirmDissertationTopicBtn = document.getElementById('confirmDissertationTopicBtn');
const dissertationTextarea = document.getElementById('dissertationTextarea');
const analyzeDissertationBtn = document.getElementById('analyzeDissertationBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const dissertationFeedback = document.getElementById('dissertationFeedback');
const backToMenuFromDissertationBtn = document.getElementById('backToMenuFromDissertationBtn');

// --- VARIABLES GLOBALES DU QUIZ ET DU PROFIL ---
let allQuizData = {
    'figures': {
        "title": "🧠 Figures de Style",
        "quizId": "figures",
        "defaultLength": 15, // Augmenté à 15 questions par défaut
        "questions": [
            { "prompt": "La mer est un miroir.", "answer": "métaphore", "explication": "La mer est comparée directement à un miroir sans outil de comparaison.", "difficulty": "easy" },
            { "prompt": "Ses yeux étaient deux étoiles brillantes.", "answer": "métaphore", "explication": "Les yeux sont directement comparés à des étoiles sans outil de comparaison.", "difficulty": "easy" },
            { "prompt": "Cette femme est une véritable vipère.", "answer": "métaphore", "explication": "La femme est directement associée à une vipère pour signifier sa méchanceté.", "difficulty": "medium" },
            { "prompt": "Le temps, c'est de l'argent.", "answer": "métaphore", "explication": "Association directe entre le temps et l'argent pour en souligner la valeur.", "difficulty": "easy" },
            { "prompt": "Il est rusé comme un renard.", "answer": "comparaison", "explication": "On utilise 'comme' pour comparer deux choses.", "difficulty": "easy" },
            { "prompt": "Ton rire est doux comme une mélodie.", "answer": "comparaison", "explication": "Utilisation de 'comme' pour comparer le rire à une mélodie.", "difficulty": "easy" },
            { "prompt": "Ses cheveux sont blonds comme les blés.", "answer": "comparaison", "explication": "L'outil 'comme' est utilisé pour comparer la couleur des cheveux à celle du blé.", "difficulty": "medium" },
            { "prompt": "Il est fort tel un chêne.", "answer": "comparaison", "explication": "L'outil 'tel' est utilisé pour comparer la force de la personne à celle d'un chêne.", "difficulty": "medium" },
            { "prompt": "Le vent hurlait dans la nuit.", "answer": "personnification", "explication": "Le vent est décrit comme s'il avait une action humaine : hurler.", "difficulty": "easy" },
            { "prompt": "Les arbres murmuraient des secrets.", "answer": "personnification", "explication": "Les arbres sont dotés de la capacité humaine de murmurer des secrets.", "difficulty": "easy" },
            { "prompt": "La fortune lui souriait.", "answer": "personnification", "explication": "On attribue une action humaine ('sourire') à un concept abstrait ('la fortune').", "difficulty": "medium" },
            { "prompt": "Le soleil caressait les champs.", "answer": "personnification", "explication": "Le soleil est doté d'une action humaine : caresser.", "difficulty": "medium" },
            { "prompt": "Je suis mort de fatigue.", "answer": "hyperbole", "explication": "Exagération forte pour insister sur la fatigue.", "difficulty": "easy" },
            { "prompt": "J'ai une faim de loup.", "answer": "hyperbole", "explication": "Exagération pour exprimer une très grande faim.", "difficulty": "easy" },
            { "prompt": "Il a versé des torrents de larmes.", "answer": "hyperbole", "explication": "Exagération de la quantité de larmes pour montrer une grande tristesse.", "difficulty": "medium" },
            { "prompt": "J'ai des tonnes de travail.", "answer": "hyperbole", "explication": "Exagération pour insister sur la quantité de travail.", "difficulty": "medium" },
            { "prompt": "Cette obscure clarté.", "answer": "oxymore", "explication": "Association de mots contraires : 'obscure' et 'clarté'.", "difficulty": "medium" },
            { "prompt": "Un silence éloquent.", "answer": "oxymore", "explication": "Association des termes 'silence' et 'éloquent' qui sont contraires.", "difficulty": "medium" },
            { "prompt": "Une douce violence.", "answer": "oxymore", "explication": "Association de 'douce' et 'violence', termes opposés.", "difficulty": "hard" },
            { "prompt": "Un mort-vivant.", "answer": "oxymore", "explication": "Les termes 'mort' et 'vivant' sont directement opposés et accolés.", "difficulty": "hard" },
            { "prompt": "Le roi des animaux.", "answer": "périphrase", "explication": "Expression qui remplace 'Le lion'.", "difficulty": "easy" },
            { "prompt": "La ville Lumière.", "answer": "périphrase", "explication": "Expression qui remplace 'Paris'.", "difficulty": "easy" },
            { "prompt": "Le septième art.", "answer": "périphrase", "explication": "Expression qui remplace 'le cinéma'.", "difficulty": "medium" },
            { "prompt": "L'île de Beauté.", "answer": "périphrase", "explication": "Expression qui désigne 'la Corse'.", "difficulty": "medium" },
            { "prompt": "Va, je ne te hais point.", "answer": "litote", "explication": "On dit moins ('ne pas haïr') pour suggérer plus ('aimer').", "difficulty": "hard" },
            { "prompt": "Ce n'est pas mal du tout.", "answer": "litote", "explication": "Dire 'pas mal' pour signifier 'très bien'.", "difficulty": "medium" },
            { "prompt": "Il n'est pas sot.", "answer": "litote", "explication": "Négation de 'sot' pour affirmer qu'il est intelligent.", "difficulty": "medium" },
            { "prompt": "Ce plat n'est pas mauvais.", "answer": "litote", "explication": "Atténuation pour dire que le plat est bon.", "difficulty": "easy" },
            { "prompt": "Il a rejoint les étoiles.", "answer": "euphémisme", "explication": "Adoucissement pour dire qu'il est mort.", "difficulty": "easy" },
            { "prompt": "Il nous a quittés.", "answer": "euphémisme", "explication": "Adoucissement pour dire qu'il est décédé.", "difficulty": "easy" },
            { "prompt": "Les personnes du troisième âge.", "answer": "euphémisme", "explication": "Expression adoucie pour parler des personnes âgées.", "difficulty": "medium" },
            { "prompt": "Un technicien de surface.", "answer": "euphémisme", "explication": "Expression valorisante pour désigner un balayeur.", "difficulty": "medium" },
            { "prompt": "Je suis le roi, le maître, le dieu.", "answer": "gradation", "explication": "Liste de mots de force croissante.", "difficulty": "medium" },
            { "prompt": "Elle marcha, courut, s'envola.", "answer": "gradation", "explication": "Énumération d'actions d'intensité croissante.", "difficulty": "medium" },
            { "prompt": "Il gémit, il crie, il hurle.", "answer": "gradation", "explication": "La progression de l'intensité du son est croissante.", "difficulty": "hard" },
            { "prompt": "C'est un roc, c'est un pic, c'est un cap !", "answer": "gradation", "explication": "Célèbre gradation de Cyrano de Bergerac, d'intensité croissante.", "difficulty": "hard" },
            { "prompt": "Jour après jour, il revenait. Jour après jour, l'espoir grandissait.", "answer": "anaphore", "explication": "Répétition de 'Jour après jour' en début de phrase pour insister.", "difficulty": "medium" },
            { "prompt": "Rien ne l'arrêtait. Rien ne le freinait. Rien ne le déviait.", "answer": "anaphore", "explication": "Répétition de 'Rien ne' en début de phrase.", "difficulty": "medium" },
            { "prompt": "Paris ! Paris outragé ! Paris brisé ! Paris martyrisé ! mais Paris libéré !", "answer": "anaphore", "explication": "Répétition du mot 'Paris' en début de membre de phrase.", "difficulty": "hard" },
            { "prompt": "Il aime la vie mais déteste la mort.", "answer": "antithèse", "explication": "Opposition forte entre 'aime la vie' et 'déteste la mort'.", "difficulty": "easy" },
            { "prompt": "Je t'aime, je te hais.", "answer": "antithèse", "explication": "Opposition forte entre 'aimer' et 'haïr'.", "difficulty": "easy" },
            { "prompt": "Être ou ne pas être, telle est la question.", "answer": "antithèse", "explication": "Opposition fondamentale entre les concepts 'être' et 'ne pas être'.", "difficulty": "medium" },
            { "prompt": "Lire un Zola.", "answer": "métonymie", "explication": "On utilise le nom de l'auteur pour désigner son œuvre.", "difficulty": "easy" },
            { "prompt": "Boire un bordeaux.", "answer": "métonymie", "explication": "On utilise le nom de la région pour désigner le vin.", "difficulty": "easy" },
            { "prompt": "Respecter le drapeau.", "answer": "métonymie", "explication": "Le symbole ('drapeau') est utilisé pour désigner le pays ou la nation.", "difficulty": "medium" },
            { "prompt": "J'ai acheté une nouvelle voile.", "answer": "synecdoque", "explication": "On utilise une partie ('voile') pour désigner le tout ('bateau').", "difficulty": "medium" },
            { "prompt": "Il y a quarante têtes dans la classe.", "answer": "synecdoque", "explication": "Une partie ('têtes') désigne le tout (les élèves).", "difficulty": "medium" },
            { "prompt": "Les mortels ne peuvent échapper à leur destin.", "answer": "synecdoque", "explication": "Le terme 'mortels' (une caractéristique) est utilisé pour désigner 'les humains' (le tout).", "difficulty": "hard" },
            { "prompt": "Je te promets... le bonheur... la joie...", "answer": "ellipses", "explication": "Omission volontaire de mots pour créer un effet de suspension ou d'émotion.", "difficulty": "medium" },
            { "prompt": "Il est parti... sans un mot...", "answer": "ellipses", "explication": "Omission des mots pour laisser le lecteur imaginer la suite ou l'émotion.", "difficulty": "medium" },
            { "prompt": "Heureux qui, comme Ulysse, a fait un beau voyage...", "answer": "ellipses", "explication": "Sous-entendu : 'Heureux est celui qui...' par allusion.", "difficulty": "hard" },
            { "prompt": "Monter en haut.", "answer": "pléonasme", "explication": "Répétition inutile de l'idée de hauteur, car 'monter' implique déjà 'en haut'.", "difficulty": "easy" },
            { "prompt": "Prévoir à l'avance.", "answer": "pléonasme", "explication": "Le verbe 'prévoir' contient déjà l'idée d''à l'avance'.", "difficulty": "easy" },
            { "prompt": "Un bref résumé.", "answer": "pléonasme", "explication": "Un résumé est par définition bref, la répétition est stylistique.", "difficulty": "medium" },
            { "prompt": "Ah, c'est du joli !", "answer": "antiphrase", "explication": "Dire l'inverse de ce que l'on pense pour exprimer de l'ironie (ici, cela signifie 'c'est moche').", "difficulty": "easy" },
            { "prompt": "Quelle belle journée de pluie !", "answer": "antiphrase", "explication": "Dire 'belle journée' pour signifier 'mauvaise journée', avec intention ironique.", "difficulty": "easy" },
            { "prompt": "Ne te gêne surtout pas !", "answer": "antiphrase", "explication": "Dit ironiquement à quelqu'un qui dérange, pour signifier 'Tu me gênes'.", "difficulty": "medium" },
            { "prompt": "Un océan de larmes.", "answer": "hyperbole", "explication": "Exagération pour signifier une immense quantité de larmes.", "difficulty": "easy" },
            { "prompt": "Il a ri aux éclats.", "answer": "hyperbole", "explication": "Exagération pour exprimer un rire très fort.", "difficulty": "easy" },
            { "prompt": "C'est un lion sur le terrain.", "answer": "métaphore", "explication": "Comparaison directe sans outil de comparaison pour souligner la bravoure et la force.", "difficulty": "medium" },
            { "prompt": "La nature est une artiste.", "answer": "personnification", "explication": "On attribue une capacité humaine (être artiste) à la nature.", "difficulty": "easy" },
            { "prompt": "Je meurs d'envie de te voir.", "answer": "hyperbole", "explication": "Exagération extrême pour exprimer un grand désir.", "difficulty": "easy" }
        ]
    },
    'tonalites': {
        "title": "📘 Tonalités Littéraires",
        "quizId": "tonalites",
        "defaultLength": null, // Toutes les questions seront posées par défaut
        "questions": [
            { "prompt": "Le texte cherche à faire rire ou sourire.", "answer": "Tonalité comique", "explication": "Situation absurde ou exagérée, jeux de mots, répétitions, caricature, ironie ou personnages ridicules.", "difficulty": "easy" },
            { "prompt": "Le personnage est condamné d’avance, il n’y a pas d’issue.", "answer": "Tonalité tragique", "explication": "Le personnage est face au destin, à la mort. On trouve un vocabulaire du malheur, du destin, de la fatalité et un ton grave et solennel.", "difficulty": "medium" },
            { "prompt": "Le texte veut toucher le lecteur, montrer la douleur ou la souffrance.", "answer": "Tonalité pathétique", "explication": "On trouve un vocabulaire de la tristesse, de la douleur, des phrases courtes ou exclamatives et des apostrophes (on parle à quelqu’un ou à Dieu).", "difficulty": "medium" },
            { "prompt": "Le texte exprime les émotions personnelles (amour, nostalgie, joie, etc.).", "answer": "Tonalité lyrique", "explication": "Emploi de la 1re personne, champs lexicaux des sentiments (amour, tristesse, bonheur…) et ponctuation expressive (! ? …).", "difficulty": "easy" },
            { "prompt": "C’est du lyrisme triste, souvent sur la mort, l’absence ou le temps qui passe.", "answer": "Tonalité élégiaque", "explication": "C'est une forme de lyrisme mais plus mélancolique, souvent dans des poèmes (ex : Lamartine, Hugo).", "difficulty": "hard" },
            { "prompt": "Le texte met en valeur un héros dans un combat grandiose.", "answer": "Tonalité épique", "explication": "Utilisation d'exagérations (hyperboles), de nombreux adjectifs, d'un vocabulaire du combat et du courage, et description d'actions spectaculaires.", "difficulty": "medium" },
            { "prompt": "Le texte attaque une idée ou une personne, parfois violemment.", "answer": "Tonalité polémique", "explication": "On repère un vocabulaire péjoratif, des questions oratoires, des interpellations, de l'ironie et des critiques fortes.", "difficulty": "hard" },
            { "prompt": "Le texte se moque pour dénoncer.", "answer": "Tonalité satirique", "explication": "On trouve un humour grinçant, un détournement d’idées ou de situations, de l'ironie et des caricatures.", "difficulty": "hard" },
            { "prompt": "Le texte veut transmettre un savoir ou une leçon.", "answer": "Tonalité didactique", "explication": "Les phrases sont claires et structurées, avec des exemples ou des définitions, dans un style logique et parfois impératif.", "difficulty": "easy" },
            { "prompt": "Quelque chose d’étrange ou de surnaturel arrive dans un monde réaliste, créant une hésitation.", "answer": "Tonalité fantastique", "explication": "Il y a une hésitation entre rêve et réalité, un vocabulaire du doute (peut-être, on dirait que…) et une ambiance inquiétante.", "difficulty": "medium" },
            { "prompt": "Le texte présente un monde magique, où le surnaturel est accepté naturellement.", "answer": "Tonalité merveilleuse", "explication": "On trouve des éléments magiques (fées, dragons…) dans un vocabulaire féérique et imaginaire, sans aucun doute chez les personnages.", "difficulty": "easy" },
            { "prompt": "Tonalité qui met en scène des situations extrêmes et des personnages aux passions violentes.", "answer": "Dramatique", "difficulty": "hard", "explication": "La tonalité dramatique est caractéristique des œuvres où les événements s'enchaînent de manière tendue, aboutissant souvent à une crise ou un dénouement intense." },
            { "prompt": "Le texte exprime la joie, l'enthousiasme, la célébration.", "answer": "Tonalité épidictique (louange)", "difficulty": "medium", "explication": "Caractérisée par un vocabulaire mélioratif, des exclamations et un ton solennel, elle vise à louer ou blâmer." },
            { "prompt": "Le texte invite à la méditation, à la réflexion sur la condition humaine.", "answer": "Tonalité philosophique", "difficulty": "medium", "explication": "Utilise un vocabulaire abstrait, des questions rhétoriques, et une argumentation logique pour provoquer la pensée." },
            { "prompt": "Le texte vise à émouvoir, à provoquer des sentiments de pitié ou d'horreur.", "answer": "Tonalité pathétique", "difficulty": "easy", "explication": "Elle se manifeste par un vocabulaire de la souffrance, des larmes, et des exclamations." },
            { "prompt": "Le texte relate des événements passés, souvent avec une visée historique ou documentaire.", "answer": "Tonalité narrative", "difficulty": "easy", "explication": "Caractérisée par l'emploi du passé simple, de marqueurs temporels, et une succession d'actions." }
        ]
    }
};

const dissertationTopics = [
    "La poésie est-elle seulement une affaire de sentiments ?",
    "Dans quelle mesure le roman est-il une ouverture sur le monde ?",
    "Le théâtre a-t-il pour seule vocation de divertir ?",
    "Les personnages de fiction nous aident-ils à mieux comprendre le réel ?"
];


let currentQuizData = null; // Données du quiz actuellement sélectionné
let questionsForThisQuiz = []; // Questions pour la session de quiz actuelle
let currentQuestionIndex = 0;
let score = 0;

let activeUser = null; // L'objet du profil utilisateur actif
let users = {}; // Tous les profils d'utilisateurs chargés depuis localStorage

let selectedGameMode = 'normal';
let selectedDifficulty = 'any';
let quizTimer = null; // Pour le mode contre-la-montre
const TIME_PER_QUESTION_SECONDS = 15; // Temps par question en mode contre-la-montre

let selectedDissertationTopic = ''; // Sujet de dissertation sélectionné


// --- PONDÉRATION DES SCORES PAR DIFFICULTÉ ---
const DIFFICULTY_POINTS = {
    'easy': 1,
    'medium': 2,
    'hard': 3
};

// --- FONCTIONS DE GESTION DES PROFILS UTILISATEUR ---

function loadUsers() {
    const storedUsers = localStorage.getItem('quizUsers');
    if (storedUsers) {
        users = JSON.parse(storedUsers);
        const activeUserId = localStorage.getItem('activeQuizUser');
        if (activeUserId && users[activeUserId]) {
            activeUser = users[activeUserId];
            updateActiveUserDisplay();
            viewStatsBtn.style.display = 'block';
            deleteUserBtn.style.display = 'block'; // Afficher le bouton de suppression
        }
    }
    renderProfileList();
}

function saveUsers() {
    localStorage.setItem('quizUsers', JSON.stringify(users));
    if (activeUser) {
        localStorage.setItem('activeQuizUser', activeUser.id);
    } else {
        localStorage.removeItem('activeQuizUser');
    }
}

function createUser() {
    const username = usernameInput.value.trim();
    if (username.length < 3) {
        showMessageBox("Le nom d'utilisateur doit contenir au moins 3 caractères.");
        return;
    }
    if (users[username]) {
        showMessageBox("Ce nom d'utilisateur existe déjà. Veuillez en choisir un autre ou le charger.");
        return;
    }

    const newUser = {
        id: username, // Pour la simplicité, l'ID est le nom d'utilisateur
        name: username,
        quizStats: {}, // Stockera les performances de chaque quiz
        dissertationHistory: [] // Historique des dissertations analysées
    };
    users[username] = newUser;
    activeUser = newUser;
    saveUsers();
    updateActiveUserDisplay();
    showMessageBox(`Profil '${username}' créé et sélectionné !`);
    viewStatsBtn.style.display = 'block';
    deleteUserBtn.style.display = 'block';
    renderProfileList(); // Refresh list to show new user
}

function loadUser(username) {
    if (!users[username]) {
        showMessageBox("Profil non trouvé.");
        return;
    }
    activeUser = users[username];
    saveUsers();
    updateActiveUserDisplay();
    showMessageBox(`Profil '${username}' chargé !`);
    viewStatsBtn.style.display = 'block';
    deleteUserBtn.style.display = 'block';
    renderProfileList(); // Refresh list to highlight selected user if needed (though not currently implemented visually)
}

function deleteCurrentUser() {
    if (!activeUser) {
        showMessageBox("Aucun profil actif à supprimer.");
        return;
    }
    // Utilisez showMessageBox pour une confirmation sans bloquer le thread
    showMessageBox(`Êtes-vous sûr de vouloir supprimer le profil de '${activeUser.name}' ? Toutes les statistiques associées seront perdues.<br><button id="confirmDeleteUserBtn" class="message-box-btn">Oui</button><button id="cancelDeleteUserBtn" class="message-box-btn">Non</button>`);

    document.getElementById('confirmDeleteUserBtn').addEventListener('click', () => {
        delete users[activeUser.id];
        activeUser = null;
        saveUsers();
        updateActiveUserDisplay();
        showMessageBox("Profil supprimé."); // Message de confirmation après suppression
        viewStatsBtn.style.display = 'none';
        deleteUserBtn.style.display = 'none';
        renderProfileList();
        showMenu(); // Retour au menu principal après suppression
        // Supprimez la messageBox après confirmation
        const messageBox = document.querySelector('.message-box');
        if (messageBox) {
            document.body.removeChild(messageBox);
        }
    });

    document.getElementById('cancelDeleteUserBtn').addEventListener('click', () => {
        // Supprimez la messageBox si l'utilisateur annule
        const messageBox = document.querySelector('.message-box');
        if (messageBox) {
            document.body.removeChild(messageBox);
        }
    });
}


function updateActiveUserDisplay() {
    if (activeUser) {
        activeUserProfileDisplay.textContent = activeUser.name;
        currentUserDisplay.textContent = `Bienvenue, ${activeUser.name} !`;
    } else {
        activeUserProfileDisplay.textContent = 'Aucun';
        currentUserDisplay.textContent = '';
    }
}

function renderProfileList() {
    profileList.innerHTML = '';
    for (const userId in users) {
        const userBtn = document.createElement('button');
        userBtn.textContent = users[userId].name;
        userBtn.classList.add('profile-button'); // Add a class for potential styling
        if (activeUser && activeUser.id === userId) {
            userBtn.classList.add('selected'); // Highlight active user
        }
        userBtn.addEventListener('click', () => loadUser(userId));
        profileList.appendChild(userBtn);
    }
}

// --- FONCTIONS DE GESTION DES QUIZ (Chargement & Sélection) ---

function selectQuiz(quizId) {
    if (!activeUser) {
        showMessageBox("Veuillez créer ou charger un profil utilisateur avant de choisir un quiz.");
        return;
    }
    currentQuizData = allQuizData[quizId];
    if (currentQuizData) {
        // Afficher les options de jeu
        gameOptionsSection.style.display = 'block';
        // Mettre à jour l'affichage du meilleur score pour le quiz sélectionné
        loadHighScore();
    }
}

// --- LOGIQUE DU HIGH SCORE ET STATS UTILISATEUR ---

function getQuizStatsForCurrentUser(quizId, gameMode, difficulty) {
    if (!activeUser) return null;
    if (!activeUser.quizStats[quizId]) {
        activeUser.quizStats[quizId] = {};
    }
    if (!activeUser.quizStats[quizId][gameMode]) {
        activeUser.quizStats[quizId][gameMode] = {};
    }
    if (!activeUser.quizStats[quizId][gameMode][difficulty]) {
        activeUser.quizStats[quizId][gameMode][difficulty] = {
            highScore: 0,
            totalPlayed: 0,
            totalCorrect: 0,
            totalQuestionsAnswered: 0,
            questionPerformance: {} // { "prompt_hash": { correct: X, incorrect: Y } }
        };
    }
    return activeUser.quizStats[quizId][gameMode][difficulty];
}

function loadHighScore() {
    if (!currentQuizData || !activeUser) {
        highScoreDisplay.textContent = '';
        return;
    }
    const stats = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty);
    // Utilise la longueur par défaut du quiz pour l'affichage du record si définie, sinon la longueur totale des questions disponibles.
    const quizPossibleLength = currentQuizData.questions.filter(q => selectedDifficulty === 'any' || q.difficulty === selectedDifficulty).length;
    highScoreDisplay.textContent = `🏆 Record (${activeUser.name} - ${selectedGameMode}, ${selectedDifficulty}) : ${stats.highScore} / ${currentQuizData.defaultLength || quizPossibleLength}`;
}

function saveQuizStats(quizId, finalScore, totalQuestionsPlayed, questionResults) {
    if (!activeUser) return;
    const stats = getQuizStatsForCurrentUser(quizId, selectedGameMode, selectedDifficulty);

    stats.totalPlayed++;
    stats.totalCorrect += finalScore;
    stats.totalQuestionsAnswered += totalQuestionsPlayed;

    // Mise à jour du meilleur score - ne devrait être mis à jour qu'à la fin du quiz
    // Cette fonction est appelée à chaque question, donc nous allons déplacer la logique du high score à la fin du quiz.
    // Pour l'instant, elle met à jour les performances par question.

    // Mise à jour des performances par question
    for (const promptHash in questionResults) {
        if (!stats.questionPerformance[promptHash]) {
            stats.questionPerformance[promptHash] = { correct: 0, incorrect: 0 };
        }
        if (questionResults[promptHash] === 'correct') {
            stats.questionPerformance[promptHash].correct++;
        } else {
            stats.questionPerformance[promptHash].incorrect++;
        }
    }
    saveUsers(); // Sauvegarde tout l'objet users
}

function displayOverallStats() {
    if (!activeUser) {
        showMessageBox("Veuillez charger un profil pour voir les statistiques.");
        return;
    }
    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    dissertationContainer.style.display = 'none'; // Cacher la section dissertation
    statsContainer.style.display = 'block';

    statsUserName.textContent = activeUser.name;
    statsForQuizTitle.textContent = "tous les quiz"; // Afficher les stats générales

    let totalHighScoreSum = 0;
    let mostFailedQuestions = {}; // { prompt: { correct: X, incorrect: Y } }

    for (const quizId in activeUser.quizStats) {
        for (const mode in activeUser.quizStats[quizId]) {
            for (const difficulty in activeUser.quizStats[quizId][mode]) {
                const stats = activeUser.quizStats[quizId][mode][difficulty];
                totalHighScoreSum += stats.highScore; // Cumuler les meilleurs scores

                for (const promptHash in stats.questionPerformance) {
                    const qPerf = stats.questionPerformance[promptHash];
                    const questionData = findQuestionByHash(quizId, promptHash);
                    if (questionData) {
                        const prompt = questionData.prompt;
                        if (!mostFailedQuestions[prompt]) {
                            mostFailedQuestions[prompt] = { correct: 0, incorrect: 0 };
                        }
                        mostFailedQuestions[prompt].correct += qPerf.correct;
                        mostFailedQuestions[prompt].incorrect += qPerf.incorrect;
                    }
                }
            }
        }
    }

    statsHighScore.textContent = `${totalHighScoreSum} points (sur les meilleurs scores cumulés)`;

    const sortedFailedQuestions = Object.entries(mostFailedQuestions)
        .filter(([, data]) => data.incorrect > data.correct)
        .sort((a, b) => (b[1].incorrect - b[1].correct) - (a[1].incorrect - a[1].correct))
        .slice(0, 5);

    failedQuestionsList.innerHTML = '';
    if (sortedFailedQuestions.length > 0) {
        sortedFailedQuestions.forEach(([prompt, data]) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>"${prompt}"</strong> <br> (Correct: <span class="stat-correct">${data.correct}</span>, Incorrect: <span class="stat-incorrect">${data.incorrect}</span>)`;
            failedQuestionsList.appendChild(li);
        });
    } else {
        failedQuestionsList.innerHTML = '<li>Aucune question n\'a été ratée plus d\'une fois. Continuez comme ça !</li>';
    }
}

// Utility to find question data by hash (for stats display)
function findQuestionByHash(quizId, promptHash) {
    const quiz = allQuizData[quizId];
    if (quiz) {
        return quiz.questions.find(q => stringToHash(q.prompt) === promptHash);
    }
    return null;
}


// --- LOGIQUE DU QUIZ (Générique) ---

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function populateSelectOptions() {
    answerSelect.innerHTML = '<option value="" disabled selected>Choisis une réponse</option>';
    const answers = currentQuizData.questions.map(q => q.answer);
    const uniqueAnswers = [...new Set(answers)].sort();
    uniqueAnswers.forEach(answer => {
        const option = document.createElement('option');
        option.value = answer;
        option.textContent = answer.charAt(0).toUpperCase() + answer.slice(1);
        answerSelect.appendChild(option);
    });
}

function stringToHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
}

function showMenu() {
    selectionContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    statsContainer.style.display = 'none';
    dissertationContainer.style.display = 'none'; // Cacher la section dissertation
    gameOptionsSection.style.display = 'none'; // Hide game options when returning to main menu
    // Reset selected game mode and difficulty to defaults for next selection
    selectedGameMode = 'normal';
    selectedDifficulty = 'any';
    Array.from(gameModeOptions.children).forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.mode === 'normal') btn.classList.add('selected');
    });
    Array.from(difficultyOptions.children).forEach(btn => {
        btn.classList.remove('selected');
        if (btn.dataset.difficulty === 'any') btn.classList.add('selected');
    });
}

function startQuiz() {
    if (!currentQuizData) {
        showMessageBox("Veuillez sélectionner un quiz.");
        return;
    }
    if (!activeUser) {
        showMessageBox("Veuillez créer ou charger un profil utilisateur.");
        return;
    }

    // Filtration des questions par difficulté
    let availableQuestions = [...currentQuizData.questions];
    if (selectedDifficulty !== 'any') {
        availableQuestions = availableQuestions.filter(q => q.difficulty === selectedDifficulty);
    }

    // Logique du mode Révision
    if (selectedGameMode === 'revision') {
        const stats = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty);
        const failedQuestionHashes = Object.keys(stats.questionPerformance).filter(hash =>
            stats.questionPerformance[hash].incorrect > (stats.questionPerformance[hash].correct || 0) // Ensure correct is treated as 0 if undefined
        );

        if (failedQuestionHashes.length > 0) {
            questionsForThisQuiz = failedQuestionHashes.map(hash =>
                currentQuizData.questions.find(q => stringToHash(q.prompt) === hash)
            ).filter(q => q !== undefined && (selectedDifficulty === 'any' || q.difficulty === selectedDifficulty));

            if (questionsForThisQuiz.length === 0) {
                 showMessageBox("Pas de questions à réviser avec la difficulté sélectionnée, ou toutes les questions ratées ont été maîtrisées !");
                 showMenu();
                 return;
            }
        } else {
            showMessageBox("Vous n'avez pas encore de questions à réviser pour ce quiz.");
            showMenu();
            return;
        }
    } else {
        // Pour les autres modes, mélanger et prendre le nombre par défaut ou toutes
        shuffleArray(availableQuestions);
        const quizLength = currentQuizData.defaultLength ?
                           Math.min(currentQuizData.defaultLength, availableQuestions.length) :
                           availableQuestions.length;
        questionsForThisQuiz = availableQuestions.slice(0, quizLength);
    }

    if (questionsForThisQuiz.length === 0) {
        showMessageBox("Aucune question ne correspond à vos critères de sélection (difficulté, etc.) pour ce quiz.");
        showMenu();
        return;
    }

    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    quizTitleEl.textContent = currentQuizData.title;
    loadHighScore(); // Appel sans arguments, car les valeurs sont globales
    timerDisplay.style.display = 'none'; // Cacher par défaut

    currentQuestionIndex = 0;
    score = 0;

    populateSelectOptions();
    updateQuestion();

    // Démarrer le timer si en mode contre-la-montre
    if (selectedGameMode === 'timetrial') {
        startTimer();
        timerDisplay.style.display = 'block';
    } else {
        stopTimer(); // S'assurer que le timer est arrêté si non en mode contre-la-montre
    }
}

function updateQuestion() {
    endQuizBtns.style.display = 'none';
    nextBtn.style.display = 'none';
    explanationBtn.style.display = 'none';

    if (currentQuestionIndex >= questionsForThisQuiz.length) {
        endQuiz();
        return;
    }

    const currentQuestion = questionsForThisQuiz[currentQuestionIndex];
    phraseEl.textContent = currentQuestion.prompt;
    answerSelect.value = "";
    feedbackEl.innerHTML = "";
    feedbackEl.className = 'feedback';
    scoreEl.textContent = `Score : ${score} / ${currentQuestionIndex} (Q. ${currentQuestionIndex + 1}/${questionsForThisQuiz.length})`;
    form.style.display = "block";
    submitBtn.style.display = "block";
    submitBtn.disabled = false;

    // Met à jour la barre de progression
    const progress = (currentQuestionIndex / questionsForThisQuiz.length) * 100;
    progressBarFill.style.width = `${progress}%`;

    // Réinitialiser le timer pour la nouvelle question si en mode contre-la-montre
    if (selectedGameMode === 'timetrial') {
        resetTimerForQuestion();
    }
}

let questionTimer = null;
let timeLeftForQuestion = TIME_PER_QUESTION_SECONDS;

function startTimer() {
    resetTimerForQuestion(); // Démarre le timer pour la première question
    // Le timer principal gère l'affichage du temps restant pour la question actuelle
    // Pas besoin de timer global pour le quiz entier pour l'instant.
}

function resetTimerForQuestion() {
    clearInterval(questionTimer);
    timeLeftForQuestion = TIME_PER_QUESTION_SECONDS;
    timerDisplay.textContent = `Temps restant : ${timeLeftForQuestion}s`;
    questionTimer = setInterval(() => {
        timeLeftForQuestion--;
        timerDisplay.textContent = `Temps restant : ${timeLeftForQuestion}s`;
        if (timeLeftForQuestion <= 0) {
            clearInterval(questionTimer);
            // Simuler une mauvaise réponse ou passer à la question suivante
            handleAnswer(false); // Réponse incorrecte due au temps écoulé
            // Pas besoin de nextBtn.click() ici, handleAnswer gère déjà le passage à la question suivante en mode survie.
            // Pour les autres modes, le "Suivant" est cliqué manuellement ou par le timer.
            if (selectedGameMode !== 'survival') {
                // Force next question if not in survival mode and time runs out
                currentQuestionIndex++;
                updateQuestion();
            }
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(questionTimer);
    timerDisplay.textContent = '';
}

function handleAnswer(isCorrect) {
    const currentQuestion = questionsForThisQuiz[currentQuestionIndex];
    const promptHash = stringToHash(currentQuestion.prompt);
    let questionResults = {}; // Pour stocker le résultat de cette question pour saveQuizStats

    if (isCorrect) {
        score += DIFFICULTY_POINTS[currentQuestion.difficulty || 'easy']; // Ajoute des points pondérés
        feedbackEl.className = 'feedback correct';
        feedbackEl.textContent = "✅ Bonne réponse !";
        questionResults[promptHash] = 'correct';
    } else {
        feedbackEl.className = 'feedback incorrect';
        feedbackEl.innerHTML = `❌ Mauvaise réponse.<br>La bonne réponse était : <strong>${currentQuestion.answer}</strong>.`;
        if (currentQuestion.explication) {
            explanationBtn.style.display = "block";
            explanationBtn.textContent = "Voir l'explication";
        }
        questionResults[promptHash] = 'incorrect';

        if (selectedGameMode === 'survival') {
            endQuiz(true); // Termine le quiz immédiatement en mode survie
            saveQuizStats(currentQuizData.quizId, score, currentQuestionIndex + 1, questionResults); // Sauvegarde les stats avant de quitter
            return;
        }
    }

    saveQuizStats(currentQuizData.quizId, score, currentQuestionIndex + 1, questionResults); // Sauvegarde les stats à chaque question
    nextBtn.style.display = "block";
    scoreEl.textContent = `Score : ${score} / ${currentQuestionIndex + 1} (Q. ${currentQuestionIndex + 1}/${questionsForThisQuiz.length})`;
    form.style.display = "none";
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    submitBtn.disabled = true;
    stopTimer(); // Arrête le timer quand l'utilisateur répond
    const userAnswer = answerSelect.value;
    const currentQuestion = questionsForThisQuiz[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    handleAnswer(userAnswer === correctAnswer);
});

explanationBtn.addEventListener("click", () => {
    const currentQuestion = questionsForThisQuiz[currentQuestionIndex];
    const explicationText = `<br><br><strong>Explication :</strong><br>${currentQuestion.explication}`;

    if (explanationBtn.textContent === "Voir l'explication") {
        feedbackEl.innerHTML += explicationText;
        explanationBtn.textContent = "Cacher l'explication";
    } else {
        // Remet le feedback original sans l'explication
        const isCorrect = (answerSelect.value === currentQuestion.answer);
        if (isCorrect) {
            feedbackEl.textContent = "✅ Bonne réponse !";
        } else {
            feedbackEl.innerHTML = `❌ Mauvaise réponse.<br>La bonne réponse était : <strong>${currentQuestion.answer}</strong>.`;
        }
        explanationBtn.textContent = "Voir l'explication";
    }
});

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    updateQuestion();
});

function endQuiz(survivalFailed = false) {
    stopTimer(); // S'assurer que le timer est arrêté

    const quizLength = questionsForThisQuiz.length;
    phraseEl.textContent = "🎉 Quiz terminé !";
    progressBarFill.style.width = '100%';

    let finalMessage = `Ton score final est de ${score} sur ${quizLength}.`;
    if (survivalFailed) {
        finalMessage = `Game Over ! Tu as échoué en mode Survie. Ton score était de ${score}.`;
    }

    const stats = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty);

    // Vérifie si c'est un nouveau record
    if (score > stats.highScore) {
        stats.highScore = score;
        finalMessage += "\n\n✨ Nouveau record personnel ! Félicitations ! ✨";
    }
    saveUsers(); // Sauvegarde finale des stats

    feedbackEl.textContent = finalMessage;

    form.style.display = "none";
    explanationBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    endQuizBtns.style.display = 'block';
    scoreEl.textContent = `Score final : ${score} / ${quizLength}`;
    viewQuizStatsBtn.style.display = 'block'; // Afficher le bouton pour voir les stats du quiz terminé
}

replayBtn.addEventListener('click', startQuiz); // Rejoue avec les mêmes options
viewQuizStatsBtn.addEventListener('click', () => {
    // Passe en mode affichage des statistiques
    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    dissertationContainer.style.display = 'none'; // Cacher la section dissertation
    statsContainer.style.display = 'block';

    statsUserName.textContent = activeUser.name;
    statsForQuizTitle.textContent = `${currentQuizData.title} (${selectedGameMode}, ${selectedDifficulty})`;
    statsHighScore.textContent = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty).highScore;

    const stats = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty);
    const mostFailedQuestions = {};
    for (const promptHash in stats.questionPerformance) {
        const qPerf = stats.questionPerformance[promptHash];
        const questionData = findQuestionByHash(currentQuizData.quizId, promptHash);
        if (questionData) {
            const prompt = questionData.prompt;
            if (!mostFailedQuestions[prompt]) {
                mostFailedQuestions[prompt] = { correct: 0, incorrect: 0 };
            }
            mostFailedQuestions[prompt].correct += qPerf.correct;
            mostFailedQuestions[prompt].incorrect += qPerf.incorrect;
        }
    }
    const sortedFailedQuestions = Object.entries(mostFailedQuestions)
        .filter(([, data]) => data.incorrect > 0) // Only show questions answered incorrectly at least once
        .sort((a, b) => (b[1].incorrect - b[1].correct) - (a[1].incorrect - a[1].correct))
        .slice(0, 5);

    failedQuestionsList.innerHTML = '';
    if (sortedFailedQuestions.length > 0) {
        sortedFailedQuestions.forEach(([prompt, data]) => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>"${prompt}"</strong> <br> (Correct: <span class="stat-correct">${data.correct}</span>, Incorrect: <span class="stat-incorrect">${data.incorrect}</span>)`;
            failedQuestionsList.appendChild(li);
        });
    } else {
        failedQuestionsList.innerHTML = '<li>Aucune question n\'a été ratée. Excellent travail !</li>';
    }
});

backToMainMenuFromStatsBtn.addEventListener('click', showMenu);

// --- LOGIQUE DU THÈME SOMBRE ---
function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    themeToggleBtn.textContent = theme === 'dark' ? 'Thème Clair' : 'Thème Sombre';
    localStorage.setItem('quizTheme', theme);
}
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('quizTheme') || 'light';
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// --- GESTION DES SÉLECTIONS D'OPTIONS DE JEU ---
gameModeOptions.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        Array.from(gameModeOptions.children).forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedGameMode = e.target.dataset.mode;
        loadHighScore(); // Mettre à jour l'affichage du meilleur score pour la nouvelle sélection
    }
});

difficultyOptions.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        Array.from(difficultyOptions.children).forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedDifficulty = e.target.dataset.difficulty;
        loadHighScore(); // Mettre à jour l'affichage du meilleur score pour la nouvelle sélection
    }
});

startFiguresBtn.addEventListener('click', () => selectQuiz('figures'));
startTonalitesBtn.addEventListener('click', () => selectQuiz('tonalites'));
startSelectedQuizBtn.addEventListener('click', startQuiz);

// --- NOUVELLES FONCTIONS POUR LA DISSERTATION ---
function showDissertationSection() {
    if (!activeUser) {
        showMessageBox("Veuillez créer ou charger un profil utilisateur pour rédiger une dissertation.");
        return;
    }
    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    statsContainer.style.display = 'none';
    dissertationContainer.style.display = 'block';

    // Initialiser le sélecteur de sujet ou afficher le sujet choisi
    if (selectedDissertationTopic) {
        dissertationTopicDisplay.textContent = `Sujet actuel : "${selectedDissertationTopic}"`;
        selectDissertationTopicBtn.style.display = 'block';
        dissertationTopicSelection.style.display = 'none';
    } else {
        dissertationTopicDisplay.textContent = 'Aucun sujet sélectionné.';
        selectDissertationTopicBtn.style.display = 'none';
        dissertationTopicSelection.style.display = 'block';
        // Remplir le sélecteur avec les sujets disponibles
        dissertationSubjectSelect.innerHTML = '<option value="" disabled selected>Sélectionnez un sujet</option>';
        dissertationTopics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            dissertationSubjectSelect.appendChild(option);
        });
    }

    dissertationTextarea.value = ''; // Réinitialiser le texte
    dissertationFeedback.innerHTML = ''; // Réinitialiser le feedback
    loadingIndicator.style.display = 'none';
}

startDissertationBtn.addEventListener('click', showDissertationSection);

selectDissertationTopicBtn.addEventListener('click', () => {
    dissertationTopicDisplay.textContent = 'Aucun sujet sélectionné.';
    selectDissertationTopicBtn.style.display = 'none';
    dissertationTopicSelection.style.display = 'block';
    dissertationSubjectSelect.value = ''; // Réinitialiser la sélection
});

confirmDissertationTopicBtn.addEventListener('click', () => {
    const selectedTopic = dissertationSubjectSelect.value;
    if (selectedTopic) {
        selectedDissertationTopic = selectedTopic;
        dissertationTopicDisplay.textContent = `Sujet actuel : "${selectedDissertationTopic}"`;
        selectDissertationTopicBtn.style.display = 'block';
        dissertationTopicSelection.style.display = 'none';
        showMessageBox(`Sujet sélectionné : "${selectedTopic}"`);
    } else {
        showMessageBox("Veuillez sélectionner un sujet de dissertation.");
    }
});

analyzeDissertationBtn.addEventListener('click', async () => {
    if (!activeUser) {
        showMessageBox("Veuillez créer ou charger un profil utilisateur.");
        return;
    }
    if (!selectedDissertationTopic) {
        showMessageBox("Veuillez d'abord sélectionner un sujet de dissertation.");
        return;
    }
    const dissertationContent = dissertationTextarea.value.trim();
    if (dissertationContent.length < 50) {
        showMessageBox("Votre texte est trop court pour une analyse pertinente. Veuillez écrire au moins 50 caractères.");
        return;
    }

    loadingIndicator.style.display = 'block';
    analyzeDissertationBtn.disabled = true;
    dissertationFeedback.innerHTML = ''; // Clear previous feedback

    try {
        const feedback = await callAIAnalysisAPI(selectedDissertationTopic, dissertationContent); // Appel à la vraie fonction
        
        // Afficher le feedback structuré de l'IA
        let feedbackHtml = `<h3>Bilan de l'IA :</h3><p>${feedback.generalSummary}</p>`;
        
        if (feedback.strengths && feedback.strengths.length > 0) {
            feedbackHtml += `<h3>Points Forts :</h3><ul>`;
            feedback.strengths.forEach(point => {
                feedbackHtml += `<li>✅ ${point}</li>`;
            });
            feedbackHtml += `</ul>`;
        }

        if (feedback.improvements && feedback.improvements.length > 0) {
            feedbackHtml += `<h3>Axes d'Amélioration :</h3><ul>`;
            feedback.improvements.forEach(point => {
                feedbackHtml += `<li>⚠️ ${point}</li>`;
            });
            feedbackHtml += `</ul>`;
        }
        
        feedbackHtml += `<p><em>Ce feedback est une simulation de la structure de réponse d'une IA. Une véritable IA fournirait une analyse plus détaillée et contextuelle après intégration d'un backend.</em></p>`;

        dissertationFeedback.innerHTML = feedbackHtml;

        // Enregistrer l'analyse dans l'historique de l'utilisateur
        activeUser.dissertationHistory.push({
            topic: selectedDissertationTopic,
            content: dissertationContent,
            feedback: feedbackHtml, // Sauvegarder le HTML généré pour affichage futur
            timestamp: new Date().toISOString()
        });
        saveUsers();

    } catch (error) {
        console.error("Erreur lors de l'analyse de la dissertation :", error);
        dissertationFeedback.innerHTML = `<p class="feedback incorrect">Une erreur est survenue lors de l'analyse. Veuillez réessayer.</p>`;
    } finally {
        loadingIndicator.style.display = 'none';
        analyzeDissertationBtn.disabled = false;
    }
});

backToMenuFromDissertationBtn.addEventListener('click', showMenu);

/**
 * Simule l'appel à une API backend pour l'analyse de dissertation par une IA.
 * DANS UNE VRAIE APPLICATION, CELA SERAIT UN APPEL `fetch` VERS UN BACKEND SÉCURISÉ,
 * ET NON UNE LOGIQUE DIRECTE D'ANALYSE CÔTÉ CLIENT AVEC UNE CLÉ API EXPOSÉE.
 * Le backend interagirait ensuite avec une API de modèle de langage (ex: Gemini API).
 *
 * @param {string} topic Le sujet de la dissertation.
 * @param {string} content Le contenu de la dissertation ou du plan.
 * @returns {Promise<object>} Le feedback de l'IA au format JSON.
 */
async function callAIAnalysisAPI(topic, content) {
    // --- DÉBUT DE LA SIMULATION (À REMPLACER PAR UN VRAI APPEL API) ---
    // Simuler le délai de l'appel API
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Définir une réponse structurée simulée
    const simulatedResponse = {
        generalSummary: "Votre dissertation montre un bon potentiel, mais nécessite une structuration plus rigoureuse et une meilleure utilisation des exemples.",
        strengths: [],
        improvements: []
    };

    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    const paragraphCount = content.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    // Analyse de la longueur
    if (wordCount < 150) {
        simulatedResponse.improvements.push(`Le texte est un peu court (${wordCount} mots). Pour une dissertation complète, visez au moins 500-800 mots afin d'approfondir vos arguments.`);
    } else if (wordCount < 500) {
        simulatedResponse.strengths.push(`Le volume de votre texte (${wordCount} mots) est un bon début.`);
        simulatedResponse.improvements.push(`La dissertation pourrait être davantage étoffée pour un traitement exhaustif du sujet.`);
    } else {
        simulatedResponse.strengths.push(`Excellent volume de texte (${wordCount} mots), vous avez bien développé vos idées.`);
    }

    // Analyse de la structure
    if (paragraphCount < 3) {
        simulatedResponse.improvements.push("Assurez-vous d'avoir une introduction, un développement (en plusieurs parties) et une conclusion clairement distincts.");
    } else if (paragraphCount < 5) {
        simulatedResponse.strengths.push("La structure de votre texte est en train de prendre forme.");
        simulatedResponse.improvements.push("Pensez à structurer votre développement en 2 ou 3 grandes parties, chacune avec un argument principal et des sous-arguments.");
    } else {
        simulatedResponse.strengths.push("Votre structure semble bien organisée avec un bon découpage en paragraphes.");
    }

    // Vérification de la problématique
    if (content.toLowerCase().includes("problématique") || content.includes("?")) {
        simulatedResponse.strengths.push("La problématique est présente ou clairement suggérée en introduction.");
    } else {
        simulatedResponse.improvements.push("Pensez à clairement énoncer une problématique forte et pertinente en introduction, c'est le fil conducteur de votre dissertation.");
    }

    // Pertinence au sujet
    const topicKeywords = topic.toLowerCase().split(' ').filter(w => w.length > 3);
    let relevantKeywordsFound = 0;
    topicKeywords.forEach(keyword => {
        if (content.toLowerCase().includes(keyword)) {
            relevantKeywordsFound++;
        }
    });
    if (relevantKeywordsFound >= Math.ceil(topicKeywords.length / 2)) {
        simulatedResponse.strengths.push("Votre texte est bien ancré dans le sujet. Vous utilisez les termes clés de manière appropriée.");
    } else {
        simulatedResponse.improvements.push("Vérifiez que vous répondez précisément au sujet. Assurez-vous d'utiliser les termes clés du sujet tout au long de votre argumentation pour éviter le hors-sujet.");
    }

    // Placeholders pour une analyse réelle (orthographe, grammaire, style)
    simulatedResponse.improvements.push("**Orthographe & Grammaire :** Relisez attentivement votre texte. Une IA réelle pourrait identifier et suggérer des corrections pour les fautes d'orthographe, de grammaire et de ponctuation.");
    simulatedResponse.improvements.push("**Style & Fluidité :** Variez la longueur et la structure de vos phrases pour un style plus dynamique. Évitez les répétitions et utilisez un vocabulaire plus précis. Une IA pourrait détecter les lourdeurs de style.");
    simulatedResponse.improvements.push("**Exemples & Arguments :** Chaque argument devrait être illustré par des exemples précis et analysés. Assurez-vous que vos exemples sont pertinents et expliqués en relation avec votre argument.");
    simulatedResponse.improvements.push("**Cohérence & Progression :** Le fil de votre pensée doit être clair et logique. Chaque paragraphe doit s'enchaîner naturellement et faire progresser votre argumentation.");


    return simulatedResponse;
    // --- FIN DE LA SIMULATION ---


    /*
    // --- DÉBUT DU VRAI APPEL API (EXEMPLE) ---
    // ATTENTION : L'URL CI-DESSOUS EST UN EXEMPLE. VOUS DEVRIEZ LA REMPLACER PAR L'URL DE VOTRE BACKEND.
    // L'API_KEY NE DOIT JAMAIS ÊTRE EXPOSÉE CÔTÉ CLIENT. ELLE DOIT RESTER SUR VOTRE BACKEND.
    const apiUrl = '/api/analyze-dissertation'; // Exemple d'endpoint sur votre backend

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // N'ajoutez PAS votre clé API ici. Le backend s'en chargera.
            },
            body: JSON.stringify({ topic, content })
        });

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const result = await response.json();
        return result; // L'IA renverrait un objet JSON avec l'analyse
    } catch (error) {
        console.error("Erreur lors de l'appel à l'API d'analyse de dissertation :", error);
        throw error;
    }
    // --- FIN DU VRAI APPEL API (EXEMPLE) ---
    */
}


// --- Initialisation de la page ---
async function initialize() {
    const savedTheme = localStorage.getItem('quizTheme') || 'light';
    applyTheme(savedTheme);
    loadUsers(); // Charger les profils utilisateur
    showMenu();
}

// Événements des boutons de profil
createUserBtn.addEventListener('click', createUser);
loadUserBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        loadUser(username);
    } else {
        showMessageBox("Veuillez entrer un nom d'utilisateur à charger.");
    }
});
viewStatsBtn.addEventListener('click', displayOverallStats);
deleteUserBtn.addEventListener('click', deleteCurrentUser); // Ajout de l'écouteur pour le bouton de suppression


initialize();
