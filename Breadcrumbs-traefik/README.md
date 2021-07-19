# Mise en route du reverse proxy

## Variables d'environnement
### Dans le fichier .env
- modifier *TRAEFIK_DIR* pour lui donner la valeur du chemin de la racine de ce projet
- modifier *PWA_DIR* pour qu'il pointe vers le projet pwa
- modifier *EMPLOYER_DIR*
### Ports
La variable PWA_PORT correspond au port qui est utilisé par l'application candidate lors de de l'exécution de la commande _npm run serve_.
Il faut modifier cette variable pour que lui attribuer le même port mappé par le serveur de production de npm.

Il faut en faire de même avec la variable EMLOYER_PORT, c'est à dire modifier sa valeur pour le faire correspondre avec le port mappé par la commande _npm run start_ de l'application employer


## Nom d'hôte
### Fichier Hosts
Aller dans le fichier Hosts ( [C:\Windows\System32\drivers\etc\hosts](C:\Windows\System32\drivers\etc\hosts) ).
Ajouter des noms d'hotes pour les applications employer et candidate. Dans l'exemple de ce fichier, les nom d'hôtes sont breadcrumb.employer.com et breadcrumb.pwa.fr.
> Les noms d'hôtes se terminent par *.fr* et *.com* pour être accépté par l'API d'authentification de google
### .env
Dans le fichier .env attribuer aux variables PWA_HOST et EMPLOYER_HOST les noms d'hôtes définis précédemment dans le fichier Hosts.
### .env - APP Candidate et Employer
Si besoin, Modifier les variables définis dans les fichier .env.production. de ces appilications

### API Ruby
L'API ruby on rails n'est pas inclu dans ce reverse proxy, par conséquent il est nécessaire de le mettre en marche avant de lancer le reverse proxy.
Il faut aussi s'assurer que le serveur ruby accepte les requêtes CORS, car il est possible que cela soit source d'erreur.

### API Quarkus
Il faut faire un build du projet quarkus avant de son image docker.
Pour cela il faut se placer à la racine du projet breadcrumbs-quarkus et lancer la commande :
- >./mvnw package

## Lancer le projet traefik
1. Modifier les variables d'environnements comme indiqués ci-dessus
1. se placer à la racine de ce projet.
    - Lancer la commande :
        - > docker-compose up --build
3. Se rendre à l'adresse de la PWA définit dans le fichier .env.
    - Dans cet exemple, ce rendre à [breadcrumb.pwa.fr](https://breadcrumb.pwa.fr)

## Issues
*Pour le moment, on ne peut pas se connecter avec des credential sur l'APP Employer.
