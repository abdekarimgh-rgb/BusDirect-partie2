# BusDirect — Partie 2

## Présentation du projet

BusDirect est une application web de gestion des trajets d'un réseau de transport en bus. Cette deuxième partie permet de gérer plusieurs trajets, de consulter leurs informations et de gérer les réservations des passagers.

## Technologies utilisées

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6+)
- Modules JavaScript (import/export)
- Fetch API
- LocalStorage
- Git et GitHub

## Fonctionnalités réalisées

### 1. Gestion des trajets

- Chargement des trajets depuis le fichier `data/trips.json`.
- Initialisation des données avec `fetch` et `async/await`.
- Sauvegarde des données dans `localStorage`.
- Récupération des données depuis `localStorage` lorsqu'elles sont déjà disponibles.

### 2. Affichage des trajets

Chaque trajet est présenté sous forme de carte contenant :

- L'identifiant du trajet.
- La ville de départ et la ville d'arrivée.
- L'heure de départ et d'arrivée.
- Le prix du trajet.
- Le nombre de places libres.
- Le nombre de personnes sur la liste d'attente.
- La recette du trajet.

### 3. Recherche et filtrage

- Recherche d'un trajet par ville de départ ou d'arrivée.
- Filtrage des trajets selon leur statut.
- Affichage des résultats avec une pagination de 6 trajets par page.

### 4. État des trajets

Deux fonctions ont été créées dans `js/reservations.js` :

- `placesLibres(trip)` : calcule le nombre de places disponibles.
- `estComplet(trip)` : vérifie si le trajet est complet.

Chaque carte affiche un statut :

- **Disponible** : en vert.
- **Complet** : en rouge.

### 5. Statistiques du réseau

La page affiche également :

- La recette totale des trajets.
- Le nombre total de passagers.

### 6. Gestion de la cabine

Une interface dédiée à chaque trajet est accessible depuis `cabine.html?id=...`.

Elle permet de :

- Afficher les 20 sièges de la cabine.
- Distinguer les places libres, occupées et VIP.
- Afficher les informations des passagers.
- Réserver une place en choisissant un siège disponible.
- Modifier une réservation existante.
- Supprimer une réservation.
- Mettre à jour automatiquement l'affichage des sièges après chaque opération.

### 7. Gestion des places VIP

- Identification des places VIP.
- Application d'un supplément de 10 % sur le prix des places VIP.
- Calcul de la recette selon les sièges réservés.

### 8. Gestion de la liste d'attente

- Affichage des passagers en attente.
- Ajout des passagers à la liste d'attente lorsque le trajet est complet.
- Attribution automatique d'une place disponible au premier passager de la liste d'attente après une suppression de réservation.

### 9. Interface responsive

- Adaptation de l'interface aux différentes tailles d'écran.
- Utilisation de Tailwind CSS et CSS pour organiser les éléments.
- Adaptation de l'affichage de la cabine et des formulaires sur mobile, tablette et ordinateur.

## Organisation du projet

```text
BusDirect-partie2/
│
├── data/
│   └── trips.json
│
├── css/
│   ├── input.css
│   ├── output.css
│   ├── style.css
│   └── stylecabine.css
│
├── js/
│   ├── main-trajets.js
│   ├── main-cabine.js
│   ├── render.js
│   ├── reservations.js
│   ├── store.js
│   └── validators.js
│
├── img/
│   └── logo-orange.png
│
├── index.html
├── cabine.html
└── README.md
```

## Git et GitHub

Le projet est développé avec Git et GitHub pour assurer le suivi des modifications et la gestion des versions.

- Utilisation de branches pour organiser le développement.
- Enregistrement des modifications avec des commits.
- Synchronisation du projet avec le dépôt GitHub.

**Branche :** `feature/store`

**Dernier commit :**

`feat: implement busdirect network and cabin interface`

## État actuel du projet

Les principales fonctionnalités de gestion et d'affichage des trajets ont été développées. La recherche, le filtrage et la pagination ont été intégrés.

L'interface de la cabine permet également de gérer les réservations, les places VIP et la liste d'attente, avec une mise à jour des informations après les opérations effectuées.
