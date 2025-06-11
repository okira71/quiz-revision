// --- Utils.js (fonctions utilitaires, y compris le hachage SHA-256) ---
class Utils {
    /**
     * Hache une chaîne de caractères en utilisant SHA-256.
     * @param {string} message La chaîne à hacher.
     * @returns {Promise<string>} La promesse résolue avec le hash en format hexadécimal.
     */
    static async sha256(message) {
        const textEncoder = new TextEncoder();
        const data = textEncoder.encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex;
    }
}

// --- Logger.js (pour afficher des messages dans la console au lieu d'alertes) ---
class Logger {
    /**
     * Affiche un message d'information dans la console.
     * @param {string} message Le message à afficher.
     */
    static info(message) {
        console.info(`[INFO] ${message}`);
    }

    /**
     * Affiche un message d'avertissement dans la console.
     * @param {string} message Le message à afficher.
     */
    static warn(message) {
        console.warn(`[WARN] ${message}`);
    }

    /**
     * Affiche un message d'erreur dans la console.
     * @param {string} message Le message à afficher.
     * @param {Error} [error] L'objet Error associé (facultatif).
     */
    static error(message, error) {
        console.error(`[ERROR] ${message}`, error);
    }
}

// --- Modal.js (gestion des modals personnalisés) ---
class Modal {
    constructor(modalId) {
        this.modalElement = document.getElementById(modalId);
        if (!this.modalElement) {
            Logger.error(`Modal element with ID "${modalId}" not found.`);
            return;
        }
        this.closeButtons = this.modalElement.querySelectorAll('.modal-close-btn');
        this.okButton = this.modalElement.querySelector('.modal-ok-btn');

        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => this.hide());
        });
        if (this.okButton) {
            this.okButton.addEventListener('click', () => this.hide());
        }

        // Cacher la modal si l'utilisateur clique en dehors du contenu
        this.modalElement.addEventListener('click', (e) => {
            if (e.target === this.modalElement) {
                this.hide();
            }
        });
    }

    /**
     * Affiche la modal.
     */
    show() {
        if (this.modalElement) {
            this.modalElement.classList.remove('hidden');
        }
    }

    /**
     * Cache la modal.
     */
    hide() {
        if (this.modalElement) {
            this.modalElement.classList.add('hidden');
        }
    }

    /**
     * Affiche une modal de message spécifique.
     * @param {string} title Le titre du message.
     * @param {string} message Le contenu du message.
     */
    static showMessage(title, message) {
        const messageModal = new Modal('message-modal'); // Instance unique pour les messages
        const titleElement = messageModal.modalElement.querySelector('#message-modal-title');
        const textElement = messageModal.modalElement.querySelector('#message-modal-text');

        if (titleElement) titleElement.textContent = title;
        if (textElement) textElement.textContent = message;
        messageModal.show();
    }
}


// --- User.js (représentation d'un utilisateur) ---
class User {
    /**
     * Crée une instance de User.
     * @param {string} username - Le nom d'utilisateur.
     * @param {string} passwordHash - Le hash du mot de passe.
     * @param {number} [score=0] - Le score global de l'utilisateur.
     * @param {Array<Object>} [quizHistory=[]] - L'historique des quiz (ex: [{id: 'quiz1', success: true, date: '...'}])
     * @param {Array<string>} [fichesConsulted=[]] - Les IDs des fiches consultées.
     * @param {number} [timeSpent=0] - Le temps passé sur le site en millisecondes.
     */
    constructor(username, passwordHash, score = 0, quizHistory = [], fichesConsulted = [], timeSpent = 0) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.score = score;
        this.quizHistory = quizHistory;
        this.fichesConsulted = fichesConsulted;
        this.timeSpent = timeSpent;
    }

    /**
     * Met à jour le score de l'utilisateur.
     * @param {number} points - Le nombre de points à ajouter ou retirer.
     */
    updateScore(points) {
        this.score += points;
        if (this.score < 0) this.score = 0; // Le score ne peut pas être négatif
        Logger.info(`Score de ${this.username} mis à jour : ${this.score}`);
    }

    /**
     * Ajoute un résultat de quiz à l'historique.
     * @param {string} quizId - L'ID du quiz.
     * @param {boolean} success - Indique si le quiz a été réussi.
     */
    addQuizResult(quizId, success) {
        this.quizHistory.push({ id: quizId, success: success, date: new Date().toISOString() });
        Logger.info(`Résultat quiz ajouté pour ${this.username}: ${quizId}, réussi: ${success}`);
    }

    /**
     * Ajoute une fiche consultée à la liste.
     * @param {string} ficheId - L'ID de la fiche.
     */
    addFicheConsulted(ficheId) {
        if (!this.fichesConsulted.includes(ficheId)) {
            this.fichesConsulted.push(ficheId);
            Logger.info(`Fiche consultée ajoutée pour ${this.username}: ${ficheId}`);
        }
    }

    /**
     * Ajoute du temps passé sur le site.
     * @param {number} milliseconds - Le temps à ajouter en millisecondes.
     */
    addTimeSpent(milliseconds) {
        this.timeSpent += milliseconds;
        Logger.info(`Temps passé mis à jour pour ${this.username}: ${this.timeSpent} ms`);
    }

    /**
     * Réinitialise le profil de l'utilisateur (score, historique, etc., mais pas les identifiants).
     */
    resetProfile() {
        this.score = 0;
        this.quizHistory = [];
        this.fichesConsulted = [];
        this.timeSpent = 0;
        Logger.info(`Profil de ${this.username} réinitialisé.`);
    }

    /**
     * Convertit l'objet User en un objet simple pour le stockage.
     */
    toPlainObject() {
        return {
            username: this.username,
            passwordHash: this.passwordHash,
            score: this.score,
            quizHistory: this.quizHistory,
            fichesConsulted: this.fichesConsulted,
            timeSpent: this.timeSpent
        };
    }

    /**
     * Crée une instance de User à partir d'un objet simple.
     * @param {Object} data - L'objet simple contenant les données de l'utilisateur.
     * @returns {User} L'instance de User.
     */
    static fromPlainObject(data) {
        return new User(data.username, data.passwordHash, data.score, data.quizHistory, data.fichesConsulted, data.timeSpent);
    }
}


// --- UserManager.js (gestion de tous les utilisateurs) ---
class UserManager {
    static instance = null;
    static LOCAL_STORAGE_KEY = 'bacFrUsers';
    static CURRENT_USER_KEY = 'bacFrCurrentUser';

    constructor() {
        if (UserManager.instance) {
            return UserManager.instance;
        }
        this.users = this.loadAllUsersFromStorage();
        this.currentUser = this.loadCurrentUserFromStorage();
        UserManager.instance = this;
    }

    /**
     * Obtient l'instance unique de UserManager (Singleton).
     * @returns {UserManager} L'instance de UserManager.
     */
    static getInstance() {
        if (!UserManager.instance) {
            UserManager.instance = new UserManager();
        }
        return UserManager.instance;
    }

    /**
     * Initialise le UserManager en chargeant l'utilisateur courant.
     * À appeler au début de chaque page.
     */
    init() {
        this.currentUser = this.loadCurrentUserFromStorage();
        Logger.info(`UserManager initialisé. Utilisateur courant : ${this.currentUser ? this.currentUser.username : 'aucun'}`);
    }

    /**
     * Charge tous les utilisateurs depuis localStorage.
     * @returns {Object<string, User>} Un objet mappant les noms d'utilisateur aux instances de User.
     */
    loadAllUsersFromStorage() {
        try {
            const usersData = JSON.parse(localStorage.getItem(UserManager.LOCAL_STORAGE_KEY) || '{}');
            const users = {};
            for (const username in usersData) {
                users[username] = User.fromPlainObject(usersData[username]);
            }
            return users;
        } catch (e) {
            Logger.error("Erreur lors du chargement des utilisateurs depuis localStorage.", e);
            return {};
        }
    }

    /**
     * Sauvegarde tous les utilisateurs dans localStorage.
     */
    saveAllUsersToStorage() {
        try {
            const plainUsers = {};
            for (const username in this.users) {
                plainUsers[username] = this.users[username].toPlainObject();
            }
            localStorage.setItem(UserManager.LOCAL_STORAGE_KEY, JSON.stringify(plainUsers));
            Logger.info("Tous les utilisateurs sauvegardés dans localStorage.");
        } catch (e) {
            Logger.error("Erreur lors de la sauvegarde des utilisateurs dans localStorage.", e);
        }
    }

    /**
     * Charge l'utilisateur courant depuis sessionStorage.
     * @returns {User|null} L'instance de User si connecté, sinon null.
     */
    loadCurrentUserFromStorage() {
        try {
            const userData = JSON.parse(sessionStorage.getItem(UserManager.CURRENT_USER_KEY));
            if (userData && this.users[userData.username]) {
                // Assurez-vous que c'est bien l'instance de User de notre collection `this.users`
                // pour que les modifications soient répercutées.
                return this.users[userData.username];
            }
            return null;
        } catch (e) {
            Logger.error("Erreur lors du chargement de l'utilisateur courant depuis sessionStorage.", e);
            return null;
        }
    }

    /**
     * Sauvegarde l'utilisateur courant dans sessionStorage.
     */
    saveCurrentUserToSessionStorage() {
        try {
            if (this.currentUser) {
                sessionStorage.setItem(UserManager.CURRENT_USER_KEY, JSON.stringify(this.currentUser.toPlainObject()));
                Logger.info(`Utilisateur courant "${this.currentUser.username}" sauvegardé dans sessionStorage.`);
            } else {
                sessionStorage.removeItem(UserManager.CURRENT_USER_KEY);
                Logger.info("Aucun utilisateur courant à sauvegarder.");
            }
        } catch (e) {
            Logger.error("Erreur lors de la sauvegarde de l'utilisateur courant dans sessionStorage.", e);
        }
    }

    /**
     * Enregistre un nouvel utilisateur.
     * @param {string} username - Le nom d'utilisateur.
     * @param {string} password - Le mot de passe (non haché).
     * @returns {Promise<boolean>} Vrai si l'enregistrement est réussi, faux sinon.
     */
    async register(username, password) {
        if (this.users[username]) {
            Modal.showMessage('Erreur d\'inscription', 'Ce nom d\'utilisateur existe déjà.');
            Logger.warn(`Tentative d'enregistrement d'un utilisateur existant : ${username}`);
            return false;
        }

        if (username.length < 3 || password.length < 6) {
            Modal.showMessage('Erreur d\'inscription', 'Le nom d\'utilisateur doit avoir au moins 3 caractères et le mot de passe au moins 6.');
            return false;
        }

        try {
            const passwordHash = await Utils.sha256(password);
            const newUser = new User(username, passwordHash);
            this.users[username] = newUser;
            this.saveAllUsersToStorage();
            this.currentUser = newUser;
            this.saveCurrentUserToSessionStorage();
            Modal.showMessage('Succès !', `Bienvenue, ${username} ! Votre compte a été créé.`);
            Logger.info(`Nouvel utilisateur enregistré : ${username}`);
            return true;
        } catch (e) {
            Modal.showMessage('Erreur', 'Une erreur est survenue lors de l\'inscription.');
            Logger.error("Erreur lors de l'enregistrement de l'utilisateur.", e);
            return false;
        }
    }

    /**
     * Connecte un utilisateur.
     * @param {string} username - Le nom d'utilisateur.
     * @param {string} password - Le mot de passe (non haché).
     * @returns {Promise<boolean>} Vrai si la connexion est réussie, faux sinon.
     */
    async login(username, password) {
        const user = this.users[username];
        if (!user) {
            Modal.showMessage('Échec de la connexion', 'Nom d\'utilisateur ou mot de passe incorrect.');
            Logger.warn(`Tentative de connexion avec un nom d'utilisateur inconnu : ${username}`);
            return false;
        }

        try {
            const passwordHash = await Utils.sha256(password);
            if (user.passwordHash === passwordHash) {
                this.currentUser = user;
                this.saveCurrentUserToSessionStorage();
                Modal.showMessage('Connexion réussie', `Bienvenue, ${username} !`);
                Logger.info(`Utilisateur connecté : ${username}`);
                return true;
            } else {
                Modal.showMessage('Échec de la connexion', 'Nom d\'utilisateur ou mot de passe incorrect.');
                Logger.warn(`Tentative de connexion échouée pour ${username} (mauvais mot de passe).`);
                return false;
            }
        } catch (e) {
            Modal.showMessage('Erreur', 'Une erreur est survenue lors de la connexion.');
            Logger.error("Erreur lors de la connexion de l'utilisateur.", e);
            return false;
        }
    }

    /**
     * Déconnecte l'utilisateur courant.
     */
    logout() {
        if (this.currentUser) {
            // Sauvegarder les dernières modifications de l'utilisateur avant de le déconnecter
            this.saveAllUsersToStorage();
            Logger.info(`Utilisateur "${this.currentUser.username}" déconnecté.`);
        }
        this.currentUser = null;
        this.saveCurrentUserToSessionStorage(); // Vide la session
        Modal.showMessage('Déconnexion', 'Vous avez été déconnecté.');
        // Recharger la page pour refléter l'état non connecté
        setTimeout(() => location.reload(), 1000);
    }

    /**
     * Met à jour l'utilisateur courant dans la liste des utilisateurs et sauvegarde.
     */
    updateCurrentUser() {
        if (this.currentUser) {
            this.users[this.currentUser.username] = this.currentUser;
            this.saveAllUsersToStorage();
            this.saveCurrentUserToSessionStorage(); // Met à jour la session aussi
            Logger.info(`Profil de ${this.currentUser.username} mis à jour et sauvegardé.`);
        }
    }

    /**
     * Récupère tous les utilisateurs enregistrés sous forme de tableau d'objets (pour le classement).
     * @returns {Array<Object>} Tableau d'objets utilisateur.
     */
    getAllUsers() {
        return Object.values(this.users).map(user => user.toPlainObject());
    }
}


// --- DOM Elements & Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    const userManager = UserManager.getInstance();
    const burgerMenuToggle = document.querySelector('.burger-menu-toggle');
    const navList = document.querySelector('.nav-list');
    const authModal = new Modal('auth-modal');
    const authModalTitle = document.getElementById('auth-modal-title');
    const authForm = document.getElementById('auth-form');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const switchToSignupLink = document.getElementById('switch-to-signup-link');
    const switchToLoginLink = document.getElementById('switch-to-login-link');
    const switchToSignupText = document.getElementById('switch-to-signup-text');
    const switchToLoginText = document.getElementById('switch-to-login-text');

    const btnLoginHeader = document.getElementById('btn-login-header');
    const btnSignupHeader = document.getElementById('btn-signup-header');
    const userProfileInfo = document.getElementById('user-profile-info');
    const welcomeMessage = document.getElementById('welcome-message');
    const btnLogout = document.getElementById('btn-logout');

    let isLoginMode = true; // true pour connexion, false pour inscription

    // Initialisation de l'état de l'interface utilisateur en fonction de la connexion
    function updateUIForAuthStatus() {
        if (userManager.currentUser) {
            btnLoginHeader.classList.add('hidden');
            btnSignupHeader.classList.add('hidden');
            welcomeMessage.textContent = `Bienvenue, ${userManager.currentUser.username} !`;
            userProfileInfo.classList.remove('hidden');
            Logger.info(`UI mise à jour : Utilisateur connecté (${userManager.currentUser.username})`);
        } else {
            btnLoginHeader.classList.remove('hidden');
            btnSignupHeader.classList.remove('hidden');
            userProfileInfo.classList.add('hidden');
            Logger.info('UI mise à jour : Aucun utilisateur connecté.');
        }
    }

    // Gestion du menu burger
    burgerMenuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        burgerMenuToggle.querySelector('i').classList.toggle('fa-bars');
        burgerMenuToggle.querySelector('i').classList.toggle('fa-times'); // Icône croix pour fermer
    });

    // Afficher la modal de connexion
    btnLoginHeader.addEventListener('click', () => {
        isLoginMode = true;
        authModalTitle.textContent = 'Connexion';
        authSubmitBtn.textContent = 'Se connecter';
        switchToSignupText.classList.remove('hidden');
        switchToLoginText.classList.add('hidden');
        authForm.reset(); // Réinitialise les champs du formulaire
        authModal.show();
    });

    // Afficher la modal d'inscription
    btnSignupHeader.addEventListener('click', () => {
        isLoginMode = false;
        authModalTitle.textContent = 'Créer un compte';
        authSubmitBtn.textContent = 'S\'inscrire';
        switchToSignupText.classList.add('hidden');
        switchToLoginText.classList.remove('hidden');
        authForm.reset();
        authModal.show();
    });

    // Basculer vers l'inscription depuis la modal
    switchToSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = false;
        authModalTitle.textContent = 'Créer un compte';
        authSubmitBtn.textContent = 'S\'inscrire';
        switchToSignupText.classList.add('hidden');
        switchToLoginText.classList.remove('hidden');
        authForm.reset();
    });

    // Basculer vers la connexion depuis la modal
    switchToLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        isLoginMode = true;
        authModalTitle.textContent = 'Connexion';
        authSubmitBtn.textContent = 'Se connecter';
        switchToSignupText.classList.remove('hidden');
        switchToLoginText.classList.add('hidden');
        authForm.reset();
    });

    // Soumission du formulaire de connexion/inscription
    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (isLoginMode) {
            const success = await userManager.login(username, password);
            if (success) {
                authModal.hide();
                updateUIForAuthStatus();
                // Rediriger ou rafraîchir la page après connexion réussie
                // Pour l'instant, juste rafraîchir pour que les stats et le top 5 se mettent à jour
                setTimeout(() => location.reload(), 1000);
            }
        } else {
            const success = await userManager.register(username, password);
            if (success) {
                authModal.hide();
                updateUIForAuthStatus();
                // Rediriger ou rafraîchir la page après inscription réussie
                setTimeout(() => location.reload(), 1000);
            }
        }
    });

    // Déconnexion
    btnLogout.addEventListener('click', () => {
        userManager.logout();
        updateUIForAuthStatus(); // Met à jour l'UI après déconnexion (sera aussi géré par le reload)
    });

    // Temps passé sur la page
    let timeSpentInterval;
    if (userManager.currentUser) {
        const startTimestamp = Date.now(); // Temps au chargement de la page
        timeSpentInterval = setInterval(() => {
            const currentTime = Date.now();
            const timeDifference = currentTime - startTimestamp; // Temps écoulé depuis le chargement
            // Ajoutez ce temps au temps passé de l'utilisateur
            // Pour l'exemple, nous allons ajouter toutes les 5 secondes et sauvegarder
            userManager.currentUser.addTimeSpent(5000); // Ajoute 5 secondes
            userManager.updateCurrentUser(); // Sauvegarde le profil mis à jour
        }, 5000); // Met à jour toutes les 5 secondes
    }

    // Gestion de l'événement unload pour sauvegarder le temps passé avant de quitter
    window.addEventListener('beforeunload', () => {
        // Le `setInterval` ci-dessus gère déjà la sauvegarde régulière
        // Si l'utilisateur quitte rapidement, il peut y avoir une petite perte, mais c'est suffisant pour la démo.
        // Assurez-vous que le dernier intervalle a eu le temps de s'exécuter.
        if (timeSpentInterval) {
            clearInterval(timeSpentInterval);
        }
        userManager.saveAllUsersToStorage(); // Assure une dernière sauvegarde
        userManager.saveCurrentUserToSessionStorage(); // Assure que la session est à jour
    });


    // Initialisation de l'UI au chargement de la page
    updateUIForAuthStatus();

    // Exemple d'utilisation (pour tester les fonctionnalités User/UserManager)
    // Ne pas laisser en production, c'est juste pour le développement
    // window.userManager = userManager;
});
