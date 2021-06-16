# MainNav

## /hiring-proxess
page principal d'hiring-process
- \<Route>1 : /hiring-process
    - \<sous-rout> 1 : type d'interview
        path: /hiring-process/phone
        - sous-rout 1 :
            path: /hiring-process/operational/form/disponibilities
            composant : HiringProcessPage + SelectDate
- \<Route2>: /form/confirm

## Procédure
- index.js doit être composé de ces deux \<routes>
    \<route1> contiendra une \<route>
