# BusDirect-partie2
# BusDirect — Partie 2

## Présentation du projet

BusDirect est une application web de gestion des trajets d'un réseau de transport en bus. Cette deuxième partie permet d'afficher plusieurs trajets et de consulter leurs informations principales.

## Technologies utilisées

- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6+)
- Git et GitHub
- LocalStorage
- Fetch API

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

### 3. État des trajets

Deux fonctions ont été créées dans `js/reservations.js` :

- `placesLibres(trip)` : calcule le nombre de places disponibles.
- `estComplet(trip)` : vérifie si le trajet est complet.

Chaque carte affiche un statut :

- **Disponible** : en vert.
- **Complet** : en rouge.

### 4. Statistiques du réseau

La page affiche également :

- La recette totale des trajets.
- Le nombre total de passagers.

### 5. Interface de la cabine

Une interface dédiée à la cabine a été préparée avec :

- `cabine.html`

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
│   └── store.js
│
├── img/
│   └── logo-orange.png
│
├── index.html
├── cabine.html
├── output.css
└── README.md
```

## Git et GitHub

Les modifications réalisées ont été enregistrées dans un commit et envoyées sur GitHub.

**Branche :** `feature/store`

**Dernier commit :**

`feat: implement busdirect network and cabin interface`

## État actuel

L'affichage des trajets, leurs informations, leurs statuts et les statistiques du réseau ont été intégrés. L'interface de la cabine a également été préparée.
