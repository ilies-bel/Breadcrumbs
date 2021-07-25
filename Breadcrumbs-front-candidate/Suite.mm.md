# L'utilisateur arrive sur la page hiring-process
## requête qui récupère son hiring-process le liant à l'entreprise
- instance de useAxios.get(process)
- Côté back le process sera retrouvé via l'email renseigné dans son JWT
    - email = jwt.getClaim(upn);
    - candidate = User.findByEmail(email)
    - interview_process process = interview_process.find("candidate = ?1 AND Entreprise = ?2", candidate, entreprise)
### Requête qui récupère ses milestones
- On envoie à l'utilisteur les milestones correspondant à son hiring-process
    - List(milestones() = interview_process.milestone
        - return response.ok(List(milestones)).build
    - On affiche les milestones

### Les milestones sont affichées, on clique
- On arrive sur la page qui décrit le type d'entretien
    - une requête affiche le type d'entretien et sa description
        - Instance de useAxios.get(interview_types)
            - data : 
                - id: "id_milestone"
                - milestone_name: "milestone_name"
            - headers :
                - Authorization: Bearer token
        - Côté quarkus on retrouve le type lié au milestone :
            - return Response.ok(interview_milestone.type)
        - Une fois la requête reçu par le front on affiche les données contenus dans cet objet :
            - {title: "title", description : "description"}

### L'utilisateur demande un rendez-vous et doit choisir parmi une liste de disponibilités
- Une requête affiche les disponibilités
- Un bouton 'confirm' envoie une requête d'ajout d'appointment

### L'ajout de l'appointment
L'objet à requêter sera de la forme
{
    title: "milestone_name,
    startDate: "startDate",
    endDate: "endDate",
    interview_email : "email du collaborateur contenu dans l'objet availability",
}
