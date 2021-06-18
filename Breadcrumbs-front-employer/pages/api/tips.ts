import { redirect } from "next/dist/next-server/server/api-utils"

const tipsList =  [
    {
        ranking: 5,
        title: "Bien serrer la main",
        description: "Serrer très fort"
    },
    {
        ranking: 2,
        title: "Se tenir droit",
        description: "Ne pas voûter le dos"
    },
    {
        ranking: 15,
        title: "Prendre des notes",
        description: "Prévoir un bloc-note"
    },
    {
        ranking: 15,
        title: "Porter une Chemise",
        description: "Prévoir un bloc-note"
    },
]


export default (req: any, res) => {
    if(req.method === 'GET'){
    res.status(200).json(tipsList)
    }
    if(req.method === 'POST'){
        res.redirect('/candidates')
    }
  }
