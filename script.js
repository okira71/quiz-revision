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
const dissertationPlanGameContainer = document.getElementById('dissertationPlanGameContainer');
const commentaireContainer = document.getElementById('commentaireContainer'); // Nouveau

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
const startDissertationPlanBtn = document.getElementById('startDissertationPlanBtn');
const startCommentaireBtn = document.getElementById('startCommentaireBtn'); // Nouveau
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

// Éléments du générateur de commentaire
const randomTextDisplay = document.getElementById('randomTextDisplay');
const getNewTextBtn = document.getElementById('getNewTextBtn');
const commentaireTextarea = document.getElementById('commentaireTextarea');
const backToMenuFromCommentaireBtn = document.getElementById('backToMenuFromCommentaireBtn');


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
            // ... (questions from quiz-figures.json)
        ]
    },
    'tonalites': {
        "title": "📘 Tonalités Littéraires",
        "quizId": "tonalites",
        "defaultLength": null, 
        "questions": [
            // ... (questions from quiz-tonalites.json)
        ]
    }
};

// NOUVEAU: Textes pour le générateur de commentaire
const textesPourCommentaire = [
    {
        auteur: "Charles Baudelaire, 'L'Albatros', Les Fleurs du Mal",
        texte: `Souvent, pour s’amuser, les hommes d’équipage\nPrennent des albatros, vastes oiseaux des mers,\nQui suivent, indolents compagnons de voyage,\nLe navire glissant sur les gouffres amers.\n\nÀ peine les ont-ils déposés sur les planches,\nQue ces rois de l'azur, maladroits et honteux,\nLaissent piteusement leurs grandes ailes blanches\nComme des avirons traîner à côté d'eux.`
    },
    {
        auteur: "Albert Camus, L'Étranger (Incipit)",
        texte: `Aujourd'hui, maman est morte. Ou peut-être hier, je ne sais pas. J'ai reçu un télégramme de l'asile : « Mère décédée. Enterrement demain. Sentiments distingués. » Cela ne veut rien dire. C'était peut-être hier.`
    },
    {
        auteur: "Victor Hugo, Les Misérables",
        texte: `Il était une fois, à Paris, un pauvre enfant nommé Gavroche. Il était né de parents qui ne s’étaient pas souciés de lui. C’était un de ces enfants dignes de pitié entre tous, qui ont père et mère et qui sont orphelins. Cet enfant ne se sentait jamais si bien que dans la rue. L’air du pavé lui semblait plus sain que l’air paternel.`
    },
    {
        auteur: "Arthur Rimbaud, 'Le Dormeur du val'",
        texte: `C'est un trou de verdure où chante une rivière\nAccrochant follement aux herbes des haillons\nD'argent ; où le soleil, de la montagne fière,\nLuit : c'est un petit val qui mousse de rayons.\n\nUn soldat jeune, bouche ouverte, tête nue,\nEt la nuque baignant dans le frais cresson bleu,\nDort ; il est étendu dans l'herbe, sous la nue,\nPâle dans son lit vert où la lumière pleut.`
    },
    {
        auteur: "Molière, L'Avare, Acte IV, scène 7 (Monologue d'Harpagon)",
        texte: `Au voleur ! au voleur ! à l'assassin ! au meurtrier ! Justice, juste Ciel ! je suis perdu, je suis assassiné, on m'a coupé la gorge, on m'a dérobé mon argent. Qui peut-ce être ? Qu'est-il devenu ? Où est-il ? Où se cache-t-il ? Que ferai-je pour le trouver ? Où courir ? Où ne pas courir ? N'est-il point là ? N'est-il point ici ? Qui est-ce ? Arrête. Rends-moi mon argent, coquin... (Il se prend lui-même le bras.) Ah ! c'est moi.`
    },
    {
        auteur: "Jean de La Fontaine, 'Le Corbeau et le Renard'",
        texte: `Maître Corbeau, sur un arbre perché,\nTenait en son bec un fromage.\nMaître Renard, par l'odeur alléché,\nLui tint à peu près ce langage :\n« Hé ! bonjour, Monsieur du Corbeau.\nQue vous êtes joli ! que vous me semblez beau !\nSans mentir, si votre ramage\nSe rapporte à votre plumage,\nVous êtes le Phénix des hôtes de ces bois. »`
    },
    {
        auteur: "Voltaire, Candide (Incipit)",
        texte: `Il y avait en Westphalie, dans le château de M. le baron de Thunder-ten-tronckh, un jeune garçon à qui la nature avait donné les mœurs les plus douces. Sa physionomie annonçait son âme. Il avait le jugement assez droit, avec l'esprit le plus simple ; c'est, je crois, pour cette raison qu'on le nommait Candide.`
    },
    {
        auteur: "Marcel Proust, Du côté de chez Swann",
        texte: `Et bientôt, machinalement, accablé par la morne journée et la perspective d'un triste lendemain, je portai à mes lèvres une cuillerée du thé où j'avais laissé s'amollir un morceau de madeleine. Mais à l'instant même où la gorgée mêlée des miettes du gâteau toucha mon palais, je tressaillis, attentif à ce qui se passait d'extraordinaire en moi. Un plaisir délicieux m'avait envahi, isolé, sans la notion de sa cause.`
    },
    {
        auteur: "Gustave Flaubert, Madame Bovary",
        texte: `Mais c’était surtout aux heures des repas qu’elle n’en pouvait plus, dans cette petite salle au rez-de-chaussée, avec le poêle qui fumait, la porte qui criait, les murs qui suintaient, les pavés humides ; toute l’amertume de l’existence lui semblait servie sur son assiette, et, à la fumée du bouilli, il montait du fond de son âme comme d’autres bouffées d’affadissement.`
    },
    {
        auteur: "Stendhal, Le Rouge et le Noir",
        texte: `Julien avait les joues en feu, il parlait sans savoir à qui il parlait. Il eût été au supplice, et cependant cent fois plus heureux que s'il eût fallu rentrer au séminaire avant d'avoir obtenu la place. Cette sensation de guerre le ranima. Il ne se sentait plus la même personne. "Ainsi, se disait-il, cette fameuse affaire, si difficile, qui me donnait tant de peine, est terminée en deux jours !"`
    }
];

const dissertationTopics = [
    "La poésie est-elle seulement une affaire de sentiments ?",
    "Dans quelle mesure le roman est-il une ouverture sur le monde ?",
    "Le théâtre a-t-il pour seule vocation de divertir ?",
    "Les personnages de fiction nous aident-ils à mieux comprendre le réel ?"
];

// ... (le reste du code JavaScript reste identique)

let currentQuizData = null;
let questionsForThisQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let remainingLives = 0;

let activeUser = null;
let users = {};

let selectedGameMode = 'normal';
let selectedDifficulty = 'any';
let quizTimer = null;
const TIME_PER_QUESTION_SECONDS = 15;

let selectedDissertationTopic = '';

// ... (le reste du code est long, je vais insérer les modifications aux bons endroits)

// --- FONCTIONS DE GESTION DE L'AFFICHAGE ---
function showMenu() {
    selectionContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    statsContainer.style.display = 'none';
    dissertationContainer.style.display = 'none';
    dissertationPlanGameContainer.style.display = 'none';
    commentaireContainer.style.display = 'none'; // Cacher la nouvelle section
    gameOptionsSection.style.display = 'none';
    // ... (reste de la fonction showMenu)
}


// --- NOUVELLES FONCTIONS POUR LE GÉNÉRATEUR DE COMMENTAIRE ---

function loadRandomTextForCommentaire() {
    const randomIndex = Math.floor(Math.random() * textesPourCommentaire.length);
    const selectedText = textesPourCommentaire[randomIndex];
    
    randomTextDisplay.innerHTML = `<strong>${selectedText.auteur}</strong>\n\n${selectedText.texte}`;
    commentaireTextarea.value = ''; // Vider la zone de texte
}

function showCommentaireSection() {
    selectionContainer.style.display = 'none';
    quizContainer.style.display = 'none';
    statsContainer.style.display = 'none';
    dissertationContainer.style.display = 'none';
    dissertationPlanGameContainer.style.display = 'none';
    commentaireContainer.style.display = 'block';

    loadRandomTextForCommentaire();
}

// ... (le reste du code JavaScript)

// --- Initialisation de la page ---
async function initialize() {
    // ... (le code existant dans initialize)

    // Charger les données des quiz depuis les fichiers JSON (simulation)
    // En pratique, vous utiliseriez fetch pour charger ces fichiers.
    // Pour cet exemple, je vais les copier directement dans l'objet allQuizData pour que ça fonctionne.
    allQuizData.figures.questions = [
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
        { "prompt": "Ne te gêne surtout pas !", "answer": "antiphrase", "explication": "Dit ironiquement à quelqu'un qui dérange, pour signifier 'Tu me gênes'.", "difficulty": "medium" }
    ];

    allQuizData.tonalites.questions = [
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
        { "prompt": "Le texte présente un monde magique, où le surnaturel est accepté naturellement.", "answer": "Tonalité merveilleuse", "explication": "On trouve des éléments magiques (fées, dragons…) dans un vocabulaire féérique et imaginaire, sans aucun doute chez les personnages.", "difficulty": "easy" }
    ];

    const savedTheme = localStorage.getItem('quizTheme') || 'light';
    applyTheme(savedTheme);
    loadUsers();
    showMenu(); // Call showMenu to ensure progress bars are updated on load
}

// ... (le reste du code JavaScript)

// --- AJOUT DES NOUVEAUX EVENT LISTENERS ---
startCommentaireBtn.addEventListener('click', showCommentaireSection);
getNewTextBtn.addEventListener('click', loadRandomTextForCommentaire);
backToMenuFromCommentaireBtn.addEventListener('click', showMenu);


// ... (le reste du code est le même, j'ajoute juste l'appel à initialize à la fin)
initialize();
