# Environnement de développement

Les application Candidate et Epmloyer, ainsi que le back-end Quarkus dispose tous les trois d'un dev serveur capable de faire du hot reloading.

---
## API Quarkus
Prérequis :
- Docker
- java JDK 11 ou supérieur

1. Se placer dans le dossier breadcrumbs-quarkus
2. Vérifier que JAVA_HOME est bien configuré et point bien vers un JDK
3. Dans le fichier application.properties (.\src\main\resources\application.properties) :
    - Commenter cette configuration pour que le dev server utilise sa propre base de données.
        - > quarkus.datasource.jdbc.url=jdbc\:postgresql\://breadcrumbs-api-core-database\:5432/Breadcrumbs_api_core_development
3. Lancer :
    - > ./mvnw compile quarkus:dev
4. Dans un navigateur, aller à l'adresse : [http://localhost:8080/api/tips]() pour tester que tout fonctionne
    - Il est aussi possible d'ouvrir le lien en appuyant sur *w*, comme suggéré par le server.

---
## APP Candidate
1. Se placer dans le dossier ./Breadcrumbs-front-candidate
2. Si besoin, lancer :
    - > npm install
3. Lancer :
    - > npm run start
4. Dans un navigateur, aller sur [http://localhost:5000]()

Le dev server de l'app candidate devrait être lancé.

- Tenter de ce connecter avec cet identifiant :
   - login : *candidate@breadcrumbs.com*
   - password: password

-------

## APP Employer
1. Se placer dans le dossier ./Breadcrumbs-front-employer
2. Si besoin, lancer :
    - > npm install
3. Lancer :
    - > npm run start
4. Dans un navigateur, aller sur [http://localhost:3000]()
4. Tenter de ce connecter avec cet identifiant :
    - login : *collaborator@breadcrumbs.com*
    - password: password
   
---

### API Quarkus du thème
1. Se placer dans le répertoire ./other/themer.
2. Lancer la commande
   - > ./mvnw compile quarkus:dev
3. Dans un navigateur, aller sur [http://localhost:8081/theme]()
Si ces dev server se sont lancé correctement, et qu'on peut les voir via un navigateur avec les liens suggérés, cela signifie qu'ils sont opérationnels **et qu'ils peuvent communiquer entre eux**.

# Environnement de production
L'environnement de développement est gérer par le sous-projet breadcrumbs-traefik, dans lequel sont indiquées les étapes à suivre pour la mise en place de cet environnement.
