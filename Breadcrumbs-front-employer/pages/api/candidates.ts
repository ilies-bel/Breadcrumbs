const candidates =[
    {
        name: "Vanessa Cody",
        Email: "email",
        phone: "514-514-5144",
        position: "HR Coordinator"
    },
    {
        name: "Itachi Uchiha",
        Email: "itachi@akatsuki.com",
        phone: "Non renseigné",
        position: "Lieutenant"
    },
    {
        name: "Zorro",
        Email: "Non renseigné",
        phone: "22-333-5522",
        position: "Bras droit"
    }
]

export default (req: any, res: any) => {
    res.status(200).json(candidates)
  }