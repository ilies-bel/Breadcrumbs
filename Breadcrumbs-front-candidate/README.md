## Getting started

```
yarn install
yarn start
```

## Generate assets

```
npm i -g pwa-asset-generator
cd public
pwa-asset-generator ./icon-512x512.png ./ --splash-only
```
## Import statement
Au lieu de faire des imports avec des chemins relatif vers le dossier components (import from '../../../components'), on peut directement pointer vers le dossier qui nous intéresse : import from 'components'.
Cela est configuré avec dans le block 'resolver' de webpack.config.js

## Serveur de production HTTPS
- Modifier le script ssl-serve dans package.json
    - donner le chemin menant au certificat SSL et à la clé public
- Lancer 'npm run ssl-serve'

Pour l'instant la redirection HTTP -> HTTPS n'est pas encore pris en charge
### Générer Certificat SSL
Prérequis : avoir openssl
Lancer cett commande : 
    - openssl req -newkey rsa:2048 -nodes -keyout domain.key -x509 -days 365 -out domain.crt

## Static server

Enable debugging service workers

```
yarn run build
yarn run serve
```
