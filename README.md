TEST TECHNIQUE CAPTAIN CONTRAT

## Étapes

### 0. ~~Forker~~ Cloner ce repo

Le repo a été cloné.
Pour des raisons de compatibilité avec capibara, ruby a été rétrogradé à la version 2.7.4.
Le CI de heroku a été implémenté ainsi que quelques tests.

### 1. Page d'accueil statique

Une petite page d'accueil a été ajouté à la racine.
Afin de garder une page d'accueil solide, react-rails a été utilisé pour construire un composant. La bannière est en haml.
### 2. Pouvoir créer un personnage

Le thème du tribunal a été choisi.

Les avocats ont deux attributs:
 - la répartie, pour attaquer
 - la crédibilitée, pour les points de vie
### 3. READY? FIGHT!

Les affrontements se déroulent au tour par tour.
Les avocats ont plusieurs actions possibles.
Les statistiques des personnages sont sauvegardés et consultable à l'index des avocats.
### 4. Des armes

Avant chaque procès, les avocats choisissent deux objets spéciaux qui leur permettent de retourner la situation en leur faveur.
