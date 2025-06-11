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
const dissertationContainer = document.getElementById('dissertationContainer');
const dissertationPlanGameContainer = document.getElementById('dissertationPlanGameContainer'); // Nouveau : Conteneur du jeu de plan

const usernameInput = document.getElementById('usernameInput');
const createUserBtn = document.getElementById('createUserBtn');
const loadUserBtn = document.getElementById('loadUserBtn');
const profileList = document.getElementById('profileList');
const activeUserProfileDisplay = document.getElementById('activeUserProfile');
const currentUserDisplay = document.getElementById('currentUserDisplay');
const viewStatsBtn = document.getElementById('viewStatsBtn');
const deleteUserBtn = document.getElementById('deleteUserBtn');

const startFiguresBtn = document.getElementById('startFiguresBtn');
const startTonalitesBtn = document.getElementById('startTonalitesBtn');
const startDissertationBtn = document.getElementById('startDissertationBtn');
const startDissertationPlanBtn = document.getElementById('startDissertationPlanBtn'); // Nouveau : Bouton pour le jeu de plan
const gameOptionsSection = document.getElementById('gameOptionsSection');
const gameModeOptions = document.getElementById('gameModeOptions');
const difficultyOptions = document.getElementById('difficultyOptions');
const startSelectedQuizBtn = document.getElementById('startSelectedQuizBtn');

const quizTitleEl = document.getElementById('quizTitle');
const highScoreDisplay = document.getElementById('highScoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');
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
const viewQuizStatsBtn = document.getElementById('viewQuizStatsBtn');
const backToMainMenuFromStatsBtn = document.getElementById('backToMainMenuFromStatsBtn');
const themeToggleBtn = document.getElementById('themeToggleBtn');

const statsUserName = document.getElementById('statsUserName');
const statsForQuizTitle = document.getElementById('statsForQuizTitle');
const statsHighScore = document.getElementById('statsHighScore');
const failedQuestionsList = document.getElementById('failedQuestionsList');

// Éléments de la section dissertation
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

// Éléments du jeu de plan de dissertation
const sortablePlanBlocks = document.getElementById('sortablePlanBlocks');
const checkPlanBtn = document.getElementById('checkPlanBtn');
const planFeedback = document.getElementById('planFeedback');
const newPlanBtn = document.getElementById('newPlanBtn');
const backToMenuFromPlanBtn = document.getElementById('backToMenuFromPlanBtn');

// Nouveaux éléments pour les barres de progression
const figuresProgressBarFill = document.getElementById('figuresProgressBarFill');
const figuresProgressText = document.getElementById('figuresProgressText');
const tonalitesProgressBarFill = document.getElementById('tonalitesProgressBarFill');
const tonalitesProgressText = document.getElementById('tonalitesProgressText');
const dissertationPlanProgressBarFill = document.getElementById('dissertationPlanProgressBarFill');
const dissertationPlanProgressText = document.getElementById('dissertationPlanProgressText');
const startUltimateChallengeBtn = document.getElementById('startUltimateChallengeBtn');


// --- VARIABLES GLOBALES DU QUIZ ET DU PROFIL ---
let allQuizData = {
    'figures': {
        "title": "🧠 Figures de Style",
        "quizId": "figures",
        "defaultLength": 15,
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
            { "prompt": "Le texte invite à la méditation, à la réflexion sur la condition humaine.", "answer": "Tonalité philosophique", "difficulty": "medium", "explication": "Utilise un vocabulaire abstrait, des questions rhétoriques, et une argumentation logique pour provoquer la pensée."onese" },
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

// Nouveaux éléments du plan de dissertation pour augmenter la difficulté
const dissertationPlanElements = [
    "Accroche",
    "Présentation du texte + Auteur",
    "Problématique",
    "Annonce du Plan",
    "Première partie : Axe clair + Citations + Procédés + Analyse",
    "Sous-partie 1.1 (Argument / Exemple)",
    "Sous-partie 1.2 (Argument / Exemple)",
    "Transition vers la deuxième partie",
    "Deuxième partie : Axe clair + Citations + Procédés + Analyse",
    "Sous-partie 2.1 (Argument / Exemple)",
    "Sous-partie 2.2 (Argument / Exemple)",
    "Transition vers la troisième partie",
    "Troisième partie : Axe clair + Citations + Procédés + Analyse",
    "Sous-partie 3.1 (Argument / Exemple)",
    "Sous-partie 3.2 (Argument / Exemple)",
    "Conclusion : Bilan",
    "Conclusion : Ouverture"
];

// Définition du défi ultime
const ultimateChallengeData = {
    quizId: "ultimate-challenge",
    title: "🔥 DÉFI ULTIME : Casse-tête infernal ! 🔥",
    defaultLength: 50, // 50 questions
    timePerQuestion: 10, // 10 secondes par question
    lives: 3, // 3 vies
    questions: [] // Rempli dynamiquement
};


let currentQuizData = null;
let questionsForThisQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let remainingLives = 0; // Pour le mode Défi Ultime

let activeUser = null;
let users = {};

let selectedGameMode = 'normal';
let selectedDifficulty = 'any';
let quizTimer = null;
const TIME_PER_QUESTION_SECONDS = 15; // Default time per question

let selectedDissertationTopic = '';

// Pour le jeu de plan de dissertation
let correctPlanOrder = [];

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
        // Convert overallCompletedQuestions arrays back to Sets
        for (const userId in users) {
            for (const quizId in users[userId].quizStats) {
                if (users[userId].quizStats[quizId].overallCompletedQuestions) {
                    users[userId].quizStats[quizId].overallCompletedQuestions = new Set(users[userId].quizStats[quizId].overallCompletedQuestions);
                } else {
                    // Initialize if missing (e.g., from older user data)
                    users[userId].quizStats[quizId].overallCompletedQuestions = new Set();
                }
            }
        }
        const activeUserId = localStorage.getItem('activeQuizUser');
        if (activeUserId && users[activeUserId]) {
            activeUser = users[activeUserId];
            updateActiveUserDisplay();
            viewStatsBtn.style.display = 'block';
            deleteUserBtn.style.display = 'block';
        }
    }
    renderProfileList();
}

function saveUsers() {
    // Before saving, convert Sets back to Arrays for localStorage
    const usersToSave = JSON.parse(JSON.stringify(users)); // Deep copy to avoid modifying original
    for (const userId in usersToSave) {
        for (const quizId in usersToSave[userId].quizStats) {
            if (usersToSave[userId].quizStats[quizId].overallCompletedQuestions) {
                usersToSave[userId].quizStats[quizId].overallCompletedQuestions = Array.from(usersToSave[userId].quizStats[quizId].overallCompletedQuestions);
            }
        }
    }
    localStorage.setItem('quizUsers', JSON.stringify(usersToSave));
    if (activeUser) {
        localStorage.setItem('activeQuizUser', activeUser.id);
    } else {
        localStorage.removeItem('activeQuizUser');
    }
}

function unlockUltimateChallenge() {
    if (activeUser) {
        // Unlock all questions for Figures and Tonalites
        allQuizData['figures'].questions.forEach(q => {
            activeUser.quizStats['figures'].overallCompletedQuestions.add(stringToHash(q.prompt));
        });
        allQuizData['tonalites'].questions.forEach(q => {
            activeUser.quizStats['tonalites'].overallCompletedQuestions.add(stringToHash(q.prompt));
        });
        // Complete dissertation plan
        activeUser.quizStats['dissertationPlan'].isCompleted = true;
        // Set a high score for ultimate challenge if not already set (or set to 0 for a true "new" score)
        if (activeUser.quizStats['ultimate-challenge'].highScore === 0) {
             activeUser.quizStats['ultimate-challenge'].highScore = 0; // Or some initial value like 1
        }
        saveUsers();
        updateProgressBars();
        showMessageBox("🎉 Code secret activé ! Le Défi Ultime est débloqué !");
    }
}


function createUser() {
    console.log("createUser button clicked");
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
        id: username,
        name: username,
        quizStats: {
            'figures': { overallCompletedQuestions: new Set() },
            'tonalites': { overallCompletedQuestions: new Set() },
            'dissertationPlan': { isCompleted: false },
            'ultimate-challenge': { highScore: 0 } // Add stats for ultimate challenge
        },
        dissertationHistory: []
    };
    users[username] = newUser;
    activeUser = newUser;
    saveUsers();
    updateActiveUserDisplay();
    showMessageBox(`Profil '${username}' créé et sélectionné !`);
    viewStatsBtn.style.display = 'block';
    deleteUserBtn.style.display = 'block';
    renderProfileList();
    updateProgressBars(); // Update progress for new user
    usernameInput.value = ''; // Clear input field

    // Easter egg check
    if (username.toLowerCase() === 'le kk' || username.toLowerCase() === 'cuit') {
        unlockUltimateChallenge();
    }
}

function loadUser(username) {
    console.log("loadUser button clicked for:", username);
    if (!users[username]) {
        showMessageBox("Profil non trouvé.");
        return;
    }
    activeUser = users[username];
    // Ensure all necessary stats fields are initialized for older users
    if (!activeUser.quizStats['figures']) activeUser.quizStats['figures'] = { overallCompletedQuestions: new Set() };
    if (!activeUser.quizStats['figures'].overallCompletedQuestions) activeUser.quizStats['figures'].overallCompletedQuestions = new Set();
    
    if (!activeUser.quizStats['tonalites']) activeUser.quizStats['tonalites'] = { overallCompletedQuestions: new Set() };
    if (!activeUser.quizStats['tonalites'].overallCompletedQuestions) activeUser.quizStats['tonalites'].overallCompletedQuestions = new Set();
    
    if (!activeUser.quizStats['dissertationPlan']) activeUser.quizStats['dissertationPlan'] = { isCompleted: false };
    if (typeof activeUser.quizStats['dissertationPlan'].isCompleted === 'undefined') activeUser.quizStats['dissertationPlan'].isCompleted = false;
    
    if (typeof activeUser.quizStats['ultimate-challenge'] === 'undefined') activeUser.quizStats['ultimate-challenge'] = { highScore: 0 };


    saveUsers(); // Re-save to ensure Sets are properly handled and new fields added
    updateActiveUserDisplay();
    showMessageBox(`Profil '${username}' chargé !`);
    viewStatsBtn.style.display = 'block';
    deleteUserBtn.style.display = 'block';
    renderProfileList();
    updateProgressBars(); // Update progress for loaded user
    usernameInput.value = ''; // Clear input field

    // Easter egg check
    if (username.toLowerCase() === 'le kk' || username.toLowerCase() === 'cuit') {
        unlockUltimateChallenge();
    }
}

function deleteCurrentUser() {
    console.log("deleteCurrentUser button clicked");
    if (!activeUser) {
        showMessageBox("Aucun profil actif à supprimer.");
        return;
    }
    showMessageBox(`Êtes-vous sûr de vouloir supprimer le profil de '${activeUser.name}' ? Toutes les statistiques associées seront perdues.<br><button id="confirmDeleteUserBtn" class="message-box-btn">Oui</button><button id="cancelDeleteUserBtn" class="message-box-btn">Non</button>`);

    document.getElementById('confirmDeleteUserBtn').addEventListener('click', () => {
        console.log("Confirm delete user button clicked");
        delete users[activeUser.id];
        activeUser = null;
        saveUsers();
        updateActiveUserDisplay();
        showMessageBox("Profil supprimé.");
        viewStatsBtn.style.display = 'none';
        deleteUserBtn.style.display = 'none';
        renderProfileList();
        showMenu(); // Calls updateProgressBars internally
        const messageBox = document.querySelector('.message-box');
        if (messageBox) {
            document.body.removeChild(messageBox);
        }
    });

    document.getElementById('cancelDeleteUserBtn').addEventListener('click', () => {
        console.log("Cancel delete user button clicked");
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
        userBtn.classList.add('profile-button');
        if (activeUser && activeUser.id === userId) {
            userBtn.classList.add('selected');
        }
        userBtn.addEventListener('click', () => {
            console.log("Profile button clicked for:", userId);
            loadUser(userId);
        });
        profileList.appendChild(userBtn);
    }
}

// --- FONCTIONS DE GESTION DES QUIZ (Chargement & Sélection) ---

function selectQuiz(quizId) {
    console.log("selectQuiz called for:", quizId);
    if (!activeUser) {
        showMessageBox("Veuillez créer ou charger un profil utilisateur avant de choisir un quiz.");
        return;
    }
    currentQuizData = allQuizData[quizId];
    if (currentQuizData) {
        gameOptionsSection.style.display = 'block';
        loadHighScore();
    }
}

// --- LOGIQUE DU HIGH SCORE ET STATS UTILISATEUR ---

function getQuizStatsForCurrentUser(quizId, gameMode = null, difficulty = null) {
    if (!activeUser) return null;
    if (!activeUser.quizStats[quizId]) {
        // Initialize basic structure if it doesn't exist
        activeUser.quizStats[quizId] = { 
            overallCompletedQuestions: new Set(),
            isCompleted: false, // For dissertationPlan
            highScore: 0 // For ultimate-challenge
        };
    }
    // For mode/difficulty specific stats, nest under 'modes'
    if (gameMode && difficulty) {
        if (!activeUser.quizStats[quizId].modes) {
            activeUser.quizStats[quizId].modes = {};
        }
        if (!activeUser.quizStats[quizId].modes[gameMode]) {
            activeUser.quizStats[quizId].modes[gameMode] = {};
        }
        if (!activeUser.quizStats[quizId].modes[gameMode][difficulty]) {
            activeUser.quizStats[quizId].modes[gameMode][difficulty] = {
                highScore: 0,
                totalPlayed: 0,
                totalCorrect: 0,
                totalQuestionsAnswered: 0,
                questionPerformance: {}
            };
        }
        return activeUser.quizStats[quizId].modes[gameMode][difficulty];
    } else {
        // For overall quiz stats (like overallCompletedQuestions or isCompleted for plan)
        return activeUser.quizStats[quizId];
    }
}

function loadHighScore() {
    if (!currentQuizData || !activeUser) {
        highScoreDisplay.textContent = '';
        return;
    }
    // Retrieve mode/difficulty specific high score
    let stats;
    if (currentQuizData.quizId === ultimateChallengeData.quizId) {
        stats = getQuizStatsForCurrentUser(currentQuizData.quizId); // Ultimate challenge doesn't have mode/difficulty specific stats
    } else {
        stats = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty);
    }

    const quizPossibleLength = currentQuizData.questions ? currentQuizData.questions.length : 0;
    
    highScoreDisplay.textContent = `🏆 Record (${activeUser.name} - ${selectedGameMode}, ${selectedDifficulty}) : ${stats.highScore} / ${currentQuizData.defaultLength || quizPossibleLength || ultimateChallengeData.defaultLength}`;
}

function saveQuizStats(quizId, finalScore, totalQuestionsPlayed, questionResults) {
    if (!activeUser) return;
    
    // Update mode/difficulty specific stats
    let modeDifficultyStats;
    if (quizId === ultimateChallengeData.quizId) {
        modeDifficultyStats = getQuizStatsForCurrentUser(quizId);
    } else {
        modeDifficultyStats = getQuizStatsForCurrentUser(quizId, selectedGameMode, selectedDifficulty);
    }
    
    modeDifficultyStats.totalPlayed = (modeDifficultyStats.totalPlayed || 0) + 1;
    modeDifficultyStats.totalCorrect = (modeDifficultyStats.totalCorrect || 0) + finalScore;
    modeDifficultyStats.totalQuestionsAnswered = (modeDifficultyStats.totalQuestionsAnswered || 0) + totalQuestionsPlayed;

    for (const promptHash in questionResults) {
        if (!modeDifficultyStats.questionPerformance) {
            modeDifficultyStats.questionPerformance = {};
        }
        if (!modeDifficultyStats.questionPerformance[promptHash]) {
            modeDifficultyStats.questionPerformance[promptHash] = { correct: 0, incorrect: 0 };
        }
        if (questionResults[promptHash] === 'correct') {
            modeDifficultyStats.questionPerformance[promptHash].correct++;
            // If answered correctly, add to overall completed questions (for non-revision modes)
            if (selectedGameMode !== 'revision' && quizId !== ultimateChallengeData.quizId) { // Ultimate challenge does not contribute to overall completion percentage for individual quizzes
                const overallStats = getQuizStatsForCurrentUser(quizId);
                if (overallStats && overallStats.overallCompletedQuestions) {
                    overallStats.overallCompletedQuestions.add(promptHash);
                }
            }
        } else {
            modeDifficultyStats.questionPerformance[promptHash].incorrect++;
        }
    }

    if (finalScore > modeDifficultyStats.highScore) {
        modeDifficultyStats.highScore = finalScore;
    }

    saveUsers();
    updateProgressBars(); // Recalculate progress after saving stats
}

function displayOverallStats() {
    console.log("displayOverallStats button clicked");
    if (!activeUser) {
        showMessageBox("Veuillez charger un profil pour voir les statistiques.");
        return;
    }
    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    dissertationContainer.style.display = 'none';
    dissertationPlanGameContainer.style.display = 'none'; // Cacher le jeu de plan
    statsContainer.style.display = 'block';

    statsUserName.textContent = activeUser.name;
    statsForQuizTitle.textContent = "tous les quiz";

    let totalHighScoreSum = 0;
    let mostFailedQuestions = {};

    for (const quizId in activeUser.quizStats) {
        // Handle overall stats (like isCompleted for dissertationPlan or highScore for ultimate-challenge)
        if (quizId === 'dissertationPlan') {
            // No high score to add here for dissertationPlan
        } else if (quizId === 'ultimate-challenge') {
            totalHighScoreSum += activeUser.quizStats[quizId].highScore;
        }

        // Iterate over modes for quizzes with specific modes (Figures, Tonalites)
        if (activeUser.quizStats[quizId].modes) {
            for (const mode in activeUser.quizStats[quizId].modes) {
                for (const difficulty in activeUser.quizStats[quizId].modes[mode]) {
                    const stats = activeUser.quizStats[quizId].modes[mode][difficulty];
                    // Add high score from mode-specific stats if not ultimate challenge
                    if (quizId !== 'ultimate-challenge') {
                        totalHighScoreSum += stats.highScore;
                    }

                    for (const promptHash in stats.questionPerformance) {
                        // Find the original question text from allQuizData
                        let questionData = null;
                        if (allQuizData[quizId]) {
                            questionData = findQuestionByHash(quizId, promptHash);
                        }
                        
                        if (questionData) {
                            const prompt = questionData.prompt;
                            if (!mostFailedQuestions[prompt]) {
                                mostFailedQuestions[prompt] = { correct: 0, incorrect: 0 };
                            }
                            mostFailedQuestions[prompt].correct += stats.questionPerformance[promptHash].correct;
                            mostFailedQuestions[prompt].incorrect += stats.questionPerformance[promptHash].incorrect;
                        }
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

function findQuestionByHash(quizId, promptHash) {
    let quizQuestions = [];
    if (allQuizData[quizId]) {
        quizQuestions = allQuizData[quizId].questions;
    } else if (quizId === ultimateChallengeData.quizId) {
        // For ultimate challenge, we combine questions from all quizzes
        quizQuestions = ultimateChallengeData.questions;
    }
    return quizQuestions.find(q => stringToHash(q.prompt) === promptHash);
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
        hash |= 0;
    }
    return hash.toString();
}

function showMenu() {
    console.log("showMenu called");
    selectionContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    statsContainer.style.display = 'none';
    dissertationContainer.style.display = 'none';
    dissertationPlanGameContainer.style.display = 'none'; // Cacher le jeu de plan
    gameOptionsSection.style.display = 'none';
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
    updateProgressBars(); // Ensure progress bars are updated when returning to menu
}

function startQuiz() {
    console.log("startQuiz button clicked");
    if (!currentQuizData) {
        showMessageBox("Veuillez sélectionner un quiz.");
        return;
    }
    if (!activeUser) {
        showMessageBox("Veuillez créer ou charger un profil utilisateur.");
        return;
    }

    let availableQuestions = [...currentQuizData.questions];
    
    // For regular quizzes, apply difficulty filter
    if (currentQuizData.quizId !== ultimateChallengeData.quizId && selectedDifficulty !== 'any') {
        availableQuestions = availableQuestions.filter(q => q.difficulty === selectedDifficulty);
    }
    // For Ultimate Challenge, all questions are used, and difficulty is hardcoded
    if (currentQuizData.quizId === ultimateChallengeData.quizId) {
        selectedGameMode = 'ultimate-challenge';
        selectedDifficulty = 'hard';
        // Ensure defaultLength is used for ultimate challenge
        availableQuestions = availableQuestions.slice(0, ultimateChallengeData.defaultLength);
    }


    if (selectedGameMode === 'revision') {
        const stats = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty);
        const failedQuestionHashes = Object.keys(stats.questionPerformance).filter(hash =>
            stats.questionPerformance[hash].incorrect > (stats.questionPerformance[hash].correct || 0)
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
    loadHighScore();
    timerDisplay.style.display = 'none';

    currentQuestionIndex = 0;
    score = 0;
    remainingLives = (selectedGameMode === 'ultimate-challenge' || selectedGameMode === 'survival') ? ultimateChallengeData.lives : 0; // Initialize lives for ultimate challenge

    populateSelectOptions();
    updateQuestion();

    if (selectedGameMode === 'timetrial' || selectedGameMode === 'ultimate-challenge') {
        startTimer();
        timerDisplay.style.display = 'block';
    } else {
        stopTimer();
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
    if (selectedGameMode === 'ultimate-challenge' || selectedGameMode === 'survival') {
        scoreEl.textContent += ` | Vies : ${remainingLives}`;
    }
    form.style.display = "block";
    submitBtn.style.display = "block";
    submitBtn.disabled = false;

    const progress = (currentQuestionIndex / questionsForThisQuiz.length) * 100;
    progressBarFill.style.width = `${progress}%`;

    if (selectedGameMode === 'timetrial' || selectedGameMode === 'ultimate-challenge') {
        resetTimerForQuestion(currentQuizData.timePerQuestion || TIME_PER_QUESTION_SECONDS);
    }
}

let questionTimer = null;
let timeLeftForQuestion = TIME_PER_QUESTION_SECONDS;

function startTimer() {
    resetTimerForQuestion(currentQuizData.timePerQuestion || TIME_PER_QUESTION_SECONDS);
}

function resetTimerForQuestion(timeLimit) {
    clearInterval(questionTimer);
    timeLeftForQuestion = timeLimit;
    timerDisplay.textContent = `Temps restant : ${timeLeftForQuestion}s`;
    questionTimer = setInterval(() => {
        timeLeftForQuestion--;
        timerDisplay.textContent = `Temps restant : ${timeLeftForQuestion}s`;
        if (timeLeftForQuestion <= 0) {
            clearInterval(questionTimer);
            handleAnswer(false);
            if (selectedGameMode !== 'survival' && selectedGameMode !== 'ultimate-challenge') { // In survival/ultimate, wrong answer/timeout ends the game
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
    let questionResults = {};

    if (isCorrect) {
        score += DIFFICULTY_POINTS[currentQuestion.difficulty || 'easy'];
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
            endQuiz(true); // Game over for survival mode
            // Save stats for survival mode
            saveQuizStats(currentQuizData.quizId, score, currentQuestionIndex + 1, questionResults);
            return;
        } else if (selectedGameMode === 'ultimate-challenge') {
            remainingLives--;
            if (remainingLives <= 0) {
                endQuiz(true); // Game over for ultimate challenge
                // Save stats for ultimate challenge
                saveQuizStats(currentQuizData.quizId, score, currentQuestionIndex + 1, questionResults);
                return;
            } else {
                scoreEl.textContent = `Score : ${score} / ${currentQuestionIndex + 1} (Q. ${currentQuestionIndex + 1}/${questionsForThisQuiz.length}) | Vies : ${remainingLives}`;
            }
        }
    }

    saveQuizStats(currentQuizData.quizId, score, currentQuestionIndex + 1, questionResults);
    nextBtn.style.display = "block";
    scoreEl.textContent = `Score : ${score} / ${currentQuestionIndex + 1} (Q. ${currentQuestionIndex + 1}/${questionsForThisQuiz.length})`;
    if (selectedGameMode === 'ultimate-challenge' || selectedGameMode === 'survival') {
        scoreEl.textContent += ` | Vies : ${remainingLives}`;
    }
    form.style.display = "none";
}

form.addEventListener("submit", function(e) {
    console.log("Form submitted (submitBtn clicked)");
    e.preventDefault();
    submitBtn.disabled = true;
    stopTimer();
    const userAnswer = answerSelect.value;
    const currentQuestion = questionsForThisQuiz[currentQuestionIndex];
    const correctAnswer = currentQuestion.answer;

    handleAnswer(userAnswer === correctAnswer);
});

explanationBtn.addEventListener("click", () => {
    console.log("explanationBtn clicked");
    const currentQuestion = questionsForThisQuiz[currentQuestionIndex];
    const explicationText = `<br><br><strong>Explication :</strong><br>${currentQuestion.explication}`;

    if (explanationBtn.textContent === "Voir l'explication") {
        feedbackEl.innerHTML += explicationText;
        explanationBtn.textContent = "Cacher l'explication";
    } else {
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
    console.log("nextBtn clicked");
    currentQuestionIndex++;
    updateQuestion();
});

function endQuiz(survivalFailed = false) {
    stopTimer();

    const quizLength = questionsForThisQuiz.length;
    phraseEl.textContent = "🎉 Quiz terminé !";
    progressBarFill.style.width = '100%';

    let finalMessage = `Ton score final est de ${score} sur ${quizLength}.`;
    if (survivalFailed) {
        finalMessage = `Game Over ! Tu as échoué en mode Survie. Ton score était de ${score}.`;
    }

    // Special handling for Ultimate Challenge high score
    if (currentQuizData.quizId === ultimateChallengeData.quizId) {
        const ultimateStats = activeUser.quizStats[ultimateChallengeData.quizId];
        if (score > ultimateStats.highScore) {
            ultimateStats.highScore = score;
            finalMessage += "\n\n✨ Nouveau record personnel pour le Défi Ultime ! Félicitations ! ✨";
        }
    } else {
        const stats = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty);
        if (score > stats.highScore) {
            stats.highScore = score;
            finalMessage += "\n\n✨ Nouveau record personnel ! Félicitations ! ✨";
        }
    }

    saveUsers();

    feedbackEl.textContent = finalMessage;

    form.style.display = "none";
    explanationBtn.style.display = 'none';
    nextBtn.style.display = 'none';
    endQuizBtns.style.display = 'block';
    scoreEl.textContent = `Score final : ${score} / ${quizLength}`;
    viewQuizStatsBtn.style.display = 'block';
}

replayBtn.addEventListener('click', () => {
    console.log("replayBtn clicked");
    startQuiz();
});
viewQuizStatsBtn.addEventListener('click', () => {
    console.log("viewQuizStatsBtn clicked");
    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    dissertationContainer.style.display = 'none';
    dissertationPlanGameContainer.style.display = 'none'; // Cacher le jeu de plan
    statsContainer.style.display = 'block';

    statsUserName.textContent = activeUser.name;
    // Determine quiz title for stats display
    let statsQuizTitle = "";
    if (currentQuizData && currentQuizData.quizId === ultimateChallengeData.quizId) {
        statsQuizTitle = ultimateChallengeData.title;
    } else if (currentQuizData) {
        statsQuizTitle = `${currentQuizData.title} (${selectedGameMode}, ${selectedDifficulty})`;
    } else {
        statsQuizTitle = "tous les quiz";
    }
    statsForQuizTitle.textContent = statsQuizTitle;

    // Retrieve high score for the specific quiz/mode
    let currentHighScore = 0;
    if (currentQuizData && currentQuizData.quizId === ultimateChallengeData.quizId) {
        currentHighScore = activeUser.quizStats[ultimateChallengeData.quizId].highScore;
    } else if (currentQuizData) {
        currentHighScore = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty).highScore;
    }
    statsHighScore.textContent = currentHighScore;


    const stats = getQuizStatsForCurrentUser(currentQuizData.quizId, selectedGameMode, selectedDifficulty);
    const mostFailedQuestions = {};
    // Only process question performance if it exists for the current stats object
    if (stats && stats.questionPerformance) {
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
    }
    const sortedFailedQuestions = Object.entries(mostFailedQuestions)
        .filter(([, data]) => data.incorrect > 0)
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

backToMainMenuFromStatsBtn.addEventListener('click', () => {
    console.log("backToMainMenuFromStatsBtn clicked");
    showMenu();
});

// --- LOGIQUE DU THÈME SOMBRE ---
function applyTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    themeToggleBtn.textContent = theme === 'dark' ? 'Thème Clair' : 'Thème Sombre';
    localStorage.setItem('quizTheme', theme);
}
themeToggleBtn.addEventListener('click', () => {
    console.log("themeToggleBtn clicked");
    const currentTheme = localStorage.getItem('quizTheme') || 'light';
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
});

// --- GESTION DES SÉLECTIONS D'OPTIONS DE JEU ---
gameModeOptions.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        console.log("Game mode option clicked:", e.target.dataset.mode);
        Array.from(gameModeOptions.children).forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedGameMode = e.target.dataset.mode;
        loadHighScore();
    }
});

difficultyOptions.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        console.log("Difficulty option clicked:", e.target.dataset.difficulty);
        Array.from(difficultyOptions.children).forEach(btn => btn.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedDifficulty = e.target.dataset.difficulty;
        loadHighScore();
    }
});

startFiguresBtn.addEventListener('click', () => {
    console.log("startFiguresBtn clicked");
    selectQuiz('figures');
    gameOptionsSection.style.display = 'block'; // Show options after selecting quiz
});
startTonalitesBtn.addEventListener('click', () => {
    console.log("startTonalitesBtn clicked");
    selectQuiz('tonalites');
    gameOptionsSection.style.display = 'block'; // Show options after selecting quiz
});
startSelectedQuizBtn.addEventListener('click', () => {
    console.log("startSelectedQuizBtn clicked");
    startQuiz();
});

// --- FONCTIONS POUR LA DISSERTATION (Simulation) ---
function showDissertationSection() {
    console.log("showDissertationSection called");
    if (!activeUser) {
        showMessageBox("Veuillez créer ou charger un profil utilisateur pour rédiger une dissertation.");
        return;
    }
    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    statsContainer.style.display = 'none';
    dissertationPlanGameContainer.style.display = 'none'; // Cacher le jeu de plan
    dissertationContainer.style.display = 'block';

    if (selectedDissertationTopic) {
        dissertationTopicDisplay.textContent = `Sujet actuel : "${selectedDissertationTopic}"`;
        selectDissertationTopicBtn.style.display = 'block';
        dissertationTopicSelection.style.display = 'none';
    } else {
        dissertationTopicDisplay.textContent = 'Aucun sujet sélectionné.';
        selectDissertationTopicBtn.style.display = 'none';
        dissertationTopicSelection.style.display = 'block';
        dissertationSubjectSelect.innerHTML = '<option value="" disabled selected>Sélectionnez un sujet</option>';
        dissertationTopics.forEach(topic => {
            const option = document.createElement('option');
            option.value = topic;
            option.textContent = topic;
            dissertationSubjectSelect.appendChild(option);
        });
    }

    dissertationTextarea.value = '';
    dissertationFeedback.innerHTML = '';
    loadingIndicator.style.display = 'none';
}

startDissertationBtn.addEventListener('click', () => {
    console.log("startDissertationBtn clicked (disabled functionality)");
    showMessageBox("La fonctionnalité de rédaction et d'analyse de dissertation est actuellement en développement. Veuillez utiliser le jeu de 'Plan de Dissertation' à la place !");
    // Optionally still show the section but keep analyze button disabled
    showDissertationSection();
});


selectDissertationTopicBtn.addEventListener('click', () => {
    console.log("selectDissertationTopicBtn clicked");
    dissertationTopicDisplay.textContent = 'Aucun sujet sélectionné.';
    selectDissertationTopicBtn.style.display = 'none';
    dissertationTopicSelection.style.display = 'block';
    dissertationSubjectSelect.value = '';
});

confirmDissertationTopicBtn.addEventListener('click', () => {
    console.log("confirmDissertationTopicBtn clicked");
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
    console.log("analyzeDissertationBtn clicked (disabled functionality)");
    // This button is now disabled in HTML, but keeping the function for completeness
    showMessageBox("La fonctionnalité d'analyse de dissertation est désactivée pour le moment.");
    return; // Prevent execution
});


backToMenuFromDissertationBtn.addEventListener('click', () => {
    console.log("backToMenuFromDissertationBtn clicked");
    showMenu();
});

/**
 * Simule l'appel à une API backend pour l'analyse de dissertation par une IA.
 * (Fonctionnalité désactivée / non implémentée avec une vraie IA pour le moment)
 */
async function callAIAnalysisAPI(topic, content) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const simulatedResponse = {
        generalSummary: "Votre dissertation montre un bon potentiel, mais nécessite une structuration plus rigoureuse et une meilleure utilisation des exemples.",
        strengths: [],
        improvements: []
    };

    const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;
    const paragraphCount = content.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;

    if (wordCount < 150) {
        simulatedResponse.improvements.push(`Le texte est un peu court (${wordCount} mots). Pour une dissertation complète, visez au moins 500-800 mots afin d'approfondir vos arguments.`);
    } else if (wordCount < 500) {
        simulatedResponse.strengths.push(`Le volume de votre texte (${wordCount} mots) est un bon début.`);
        simulatedResponse.improvements.push(`La dissertation pourrait être davantage étoffée pour un traitement exhaustif du sujet.`);
    } else {
        simulatedResponse.strengths.push(`Excellent volume de texte (${wordCount} mots), vous avez bien développé vos idées.`);
    }

    if (paragraphCount < 3) {
        simulatedResponse.improvements.push("Assurez-vous d'avoir une introduction, un développement (en plusieurs parties) et une conclusion clairement distincts.");
    } else if (paragraphCount < 5) {
        simulatedResponse.strengths.push("La structure de votre texte est en train de prendre forme.");
        simulatedResponse.improvements.push("Pensez à structurer votre développement en 2 ou 3 grandes parties, chacune avec un argument principal et des sous-arguments.");
    } else {
        simulatedResponse.strengths.push("Votre structure semble bien organisée avec un bon découpage en paragraphes.");
    }

    if (content.toLowerCase().includes("problématique") || content.includes("?")) {
        simulatedResponse.strengths.push("La problématique est présente ou clairement suggérée en introduction.");
    } else {
        simulatedResponse.improvements.push("Pensez à clairement énoncer une problématique forte et pertinente en introduction, c'est le fil conducteur de votre dissertation.");
    }

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

    simulatedResponse.improvements.push("**Orthographe & Grammaire :** Relisez attentivement votre texte. Une IA réelle pourrait identifier et suggérer des corrections pour les fautes d'orthographe, de grammaire et de ponctuation.");
    simulatedResponse.improvements.push("**Style & Fluidité :** Variez la longueur et la structure de vos phrases pour un style plus dynamique. Évitez les répétitions et utilisez un vocabulaire plus précis. Une IA pourrait détecter les lourdeurs de style.");
    simulatedResponse.improvements.push("**Exemples & Arguments :** Chaque argument devrait être illustré par des exemples précis et analysés. Assurez-vous que vos exemples sont pertinents et expliqués en relation avec votre argument.");
    simulatedResponse.improvements.push("**Cohérence & Progression :** Le fil de votre pensée doit être clair et logique. Chaque paragraphe doit s'enchaîner naturellement et faire progresser votre argumentation.");


    return simulatedResponse;
}

// --- NOUVEAU JEU : PLAN DE DISSERTATION ---
startDissertationPlanBtn.addEventListener('click', () => {
    console.log("startDissertationPlanBtn clicked");
    showDissertationPlanGame();
});

function showDissertationPlanGame() {
    if (!activeUser) {
        showMessageBox("Veuillez créer ou charger un profil utilisateur pour jouer au jeu de Plan de Dissertation.");
        return;
    }
    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    statsContainer.style.display = 'none';
    dissertationContainer.style.display = 'none';
    dissertationPlanGameContainer.style.display = 'block';
    
    generateNewPlan();
}

function generateNewPlan() {
    console.log("generateNewPlan called");
    planFeedback.innerHTML = '';
    checkPlanBtn.style.display = 'block';
    newPlanBtn.style.display = 'none';

    // Make a copy and shuffle it
    const shuffledElements = [...dissertationPlanElements];
    shuffleArray(shuffledElements);
    correctPlanOrder = dissertationPlanElements; // Store the correct order

    sortablePlanBlocks.innerHTML = '';
    shuffledElements.forEach((text) => { // Removed index as it's not strictly necessary for unique data-text
        const block = document.createElement('div');
        block.classList.add('plan-block');
        block.setAttribute('draggable', 'true');
        block.dataset.text = text; // Store the original text to compare later
        block.innerHTML = `<span class="plan-block-handle">☰</span> ${text}`;
        sortablePlanBlocks.appendChild(block);
    });

    addDragAndDropListeners();
}

function addDragAndDropListeners() {
    let draggedItem = null;
    const placeholder = document.createElement('div');
    placeholder.classList.add('placeholder');
    placeholder.style.height = '50px'; // Initial height, can be adjusted dynamically

    // Helper function to get the draggable element before which to insert
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.plan-block:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2; // Calculate offset from the center of the child
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: -Infinity }).element;
    }

    sortablePlanBlocks.addEventListener('dragstart', (e) => {
        console.log("dragstart detected");
        draggedItem = e.target;
        if (!draggedItem.classList.contains('plan-block')) { // Ensure we are dragging a plan-block
            draggedItem = null;
            return;
        }
        e.dataTransfer.effectAllowed = 'move';
        // Set a timeout to allow the browser to capture the initial state before changing display
        setTimeout(() => {
            draggedItem.classList.add('dragging'); // Add dragging class to show reduced opacity
            // Insert placeholder at the original position of the dragged item
            sortablePlanBlocks.insertBefore(placeholder, draggedItem);
        }, 0);
    });

    sortablePlanBlocks.addEventListener('dragend', () => {
        console.log("dragend detected");
        // Cleanup: remove placeholder and remove dragging class
        if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }
        if (draggedItem) {
            draggedItem.classList.remove('dragging');
        }
        draggedItem = null;
    });

    sortablePlanBlocks.addEventListener('dragover', (e) => {
        e.preventDefault(); // Crucial: allow drop
        if (!draggedItem) return; // Only process if an item is being dragged

        // Remove placeholder from its current position before inserting it again
        if (placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }

        const afterElement = getDragAfterElement(sortablePlanBlocks, e.clientY);
        if (afterElement == null) {
            // If dropping at the end, append the placeholder
            sortablePlanBlocks.appendChild(placeholder);
        } else {
            // Otherwise, insert placeholder before the target element
            sortablePlanBlocks.insertBefore(placeholder, afterElement);
        }
    });

    sortablePlanBlocks.addEventListener('dragleave', (e) => {
        // Check if the drag is leaving the container or just moving over a child
        if (!sortablePlanBlocks.contains(e.relatedTarget)) {
            if (placeholder.parentNode) {
                placeholder.parentNode.removeChild(placeholder);
            }
        }
    });

    sortablePlanBlocks.addEventListener('drop', () => {
        console.log("drop detected");
        if (draggedItem && placeholder.parentNode) {
            // Replace the placeholder with the actual dragged item
            placeholder.parentNode.replaceChild(draggedItem, placeholder);
        }
    });
}

checkPlanBtn.addEventListener('click', () => {
    console.log("checkPlanBtn clicked");
    checkPlanOrder();
});

function checkPlanOrder() {
    const currentOrderElements = Array.from(sortablePlanBlocks.children);
    // Use the dataset.text for comparison as textContent might include the handle
    const currentOrderTexts = currentOrderElements.map(block => block.dataset.text.trim());

    let isCorrect = true;
    if (currentOrderTexts.length !== correctPlanOrder.length) {
        isCorrect = false; // Incorrect number of elements
    } else {
        for (let i = 0; i < correctPlanOrder.length; i++) {
            if (currentOrderTexts[i] !== correctPlanOrder[i]) {
                isCorrect = false;
                break;
            }
        }
    }


    if (isCorrect) {
        planFeedback.textContent = "✅ Félicitations ! Le plan est parfait !";
        planFeedback.className = 'feedback correct';
        if (activeUser) {
            activeUser.quizStats['dissertationPlan'].isCompleted = true;
            saveUsers();
            updateProgressBars(); // Update progress after completing the plan game
        }
    } else {
        planFeedback.textContent = "❌ Ce n'est pas le bon ordre. Réessayez !";
        planFeedback.className = 'feedback incorrect';
    }
    checkPlanBtn.style.display = 'none';
    newPlanBtn.style.display = 'block';
}

newPlanBtn.addEventListener('click', () => {
    console.log("newPlanBtn clicked");
    generateNewPlan();
});
backToMenuFromPlanBtn.addEventListener('click', () => {
    console.log("backToMenuFromPlanBtn clicked");
    showMenu();
});

// --- FONCTIONS DE GESTION DE LA PROGRESSION ET DU DÉFI ULTIME ---

function calculateGameProgress(quizId) {
    if (!activeUser || !activeUser.quizStats[quizId]) {
        return 0; // No user or quiz stats found
    }

    if (quizId === 'dissertationPlan') {
        return activeUser.quizStats['dissertationPlan'].isCompleted ? 100 : 0;
    } else {
        const totalQuestions = allQuizData[quizId].questions.length;
        if (totalQuestions === 0) return 0;
        const completedQuestionsCount = activeUser.quizStats[quizId].overallCompletedQuestions.size;
        return Math.floor((completedQuestionsCount / totalQuestions) * 100);
    }
}

function updateProgressBars() {
    if (!activeUser) {
        // If no active user, set all to 0% and hide ultimate challenge button
        figuresProgressBarFill.style.width = '0%';
        figuresProgressText.textContent = '0%';
        tonalitesProgressBarFill.style.width = '0%';
        tonalitesProgressText.textContent = '0%';
        dissertationPlanProgressBarFill.style.width = '0%';
        dissertationPlanProgressText.textContent = '0%';
        startUltimateChallengeBtn.style.display = 'none';
        return;
    }

    const figuresProgress = calculateGameProgress('figures');
    figuresProgressBarFill.style.width = `${figuresProgress}%`;
    figuresProgressText.textContent = `${figuresProgress}%`;

    const tonalitesProgress = calculateGameProgress('tonalites');
    tonalitesProgressBarFill.style.width = `${tonalitesProgress}%`;
    tonalitesProgressText.textContent = `${tonalitesProgress}%`;

    const dissertationPlanProgress = calculateGameProgress('dissertationPlan');
    dissertationPlanProgressBarFill.style.width = `${dissertationPlanProgress}%`;
    dissertationPlanProgressText.textContent = `${dissertationPlanProgress}%`;

    // Check if all games are 100% complete to unlock ultimate challenge
    if (figuresProgress === 100 && tonalitesProgress === 100 && dissertationPlanProgress === 100) {
        startUltimateChallengeBtn.style.display = 'block';
    } else {
        startUltimateChallengeBtn.style.display = 'none';
    }
}

startUltimateChallengeBtn.addEventListener('click', () => {
    console.log("startUltimateChallengeBtn clicked");
    startUltimateChallenge();
});

function startUltimateChallenge() {
    console.log("startUltimateChallenge function called.");
    if (!activeUser) {
        console.log("No active user found. Showing message box.");
        showMessageBox("Veuillez créer ou charger un profil utilisateur.");
        return;
    }

    // Combine all questions from Figures de Style and Tonalités Littéraires
    const allAvailableQuestions = [
        ...allQuizData['figures'].questions,
        ...allQuizData['tonalites'].questions
    ];

    // Add some generic "dissertation plan" questions if needed, or re-use existing elements for questions
    // For now, let's just make it a random selection from existing questions.
    // To make it more "dissertation plan" specific, we'd need new questions here.
    // Example for a simple 'plan' question:
    const planQuestions = [
        {"prompt": "Quelle est la première étape d'une introduction de dissertation ?", "answer": "Accroche", "explication": "L'accroche est l'élément initial qui capte l'attention du lecteur et introduit le sujet.", "difficulty": "easy", "quizId": "ultimate-challenge-plan"},
        {"prompt": "Que doit-on trouver après la problématique dans une introduction ?", "answer": "Annonce du Plan", "explication": "L'annonce du plan présente l'organisation des arguments qui seront développés dans le corps de la dissertation.", "difficulty": "easy", "quizId": "ultimate-challenge-plan"},
        {"prompt": "Quel est le rôle d'une transition entre deux parties de développement ?", "answer": "Faire le lien et annoncer la suite", "explication": "Une transition assure la cohérence du raisonnement en résumant la partie précédente et en introduisant la suivante.", "difficulty": "medium", "quizId": "ultimate-challenge-plan"},
        {"prompt": "Quels éléments composent généralement la conclusion d'une dissertation ?", "answer": "Bilan et Ouverture", "explication": "La conclusion récapitule les points essentiels et ouvre vers de nouvelles perspectives ou questions.", "difficulty": "medium", "quizId": "ultimate-challenge-plan"},
        {"prompt": "Outre l'accroche, la problématique et l'annonce du plan, que trouve-t-on d'autre dans l'introduction ?", "answer": "Présentation du texte et de l'auteur", "explication": "Après l'accroche, il est crucial de présenter l'œuvre ou l'extrait étudié et son auteur avant d'énoncer la problématique.", "difficulty": "medium", "quizId": "ultimate-challenge-plan"},
    ];

    // Combine all questions, remove duplicates if necessary (using a Map for prompts)
    const uniqueUltimateQuestionsMap = new Map();
    [...allAvailableQuestions, ...planQuestions].forEach(q => {
        const hash = stringToHash(q.prompt);
        if (!uniqueUltimateQuestionsMap.has(hash)) {
            uniqueUltimateQuestionsMap.set(hash, q);
        }
    });

    ultimateChallengeData.questions = Array.from(uniqueUltimateQuestionsMap.values());
    shuffleArray(ultimateChallengeData.questions);

    // Limit to defaultLength if specified
    ultimateChallengeData.questions = ultimateChallengeData.questions.slice(0, ultimateChallengeData.defaultLength);
    
    console.log("Number of questions for Ultimate Challenge:", ultimateChallengeData.questions.length);
    if (ultimateChallengeData.questions.length === 0) {
        showMessageBox("Impossible de démarrer le Défi Ultime : pas assez de questions disponibles.");
        showMenu();
        return;
    }

    currentQuizData = ultimateChallengeData; // Set current quiz data to ultimate challenge
    selectedGameMode = 'ultimate-challenge'; // Set specific game mode
    selectedDifficulty = 'hard'; // Force difficulty to hard for ultimate challenge

    startQuiz(); // Reuse the existing startQuiz logic
}


// --- Initialisation de la page ---
async function initialize() {
    const savedTheme = localStorage.getItem('quizTheme') || 'light';
    applyTheme(savedTheme);
    loadUsers();
    showMenu(); // Call showMenu to ensure progress bars are updated on load
}

// Attach event listeners
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
deleteUserBtn.addEventListener('click', deleteCurrentUser);

initialize();

