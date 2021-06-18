const results = [{
    first_name: "Raito",
    last_name: "Yagami",
    mail: "kira@interpol.com",
    profile_picture_id: 1
    },
    {
        first_name: "Misa",
        last_name: "Misa",
        mail: "misamisa@idol.com",
        profile_picture_id: 2
    },
    {
        first_name: "Nutella",
        last_name: "Thermos",
        mail: "nutella@ferrero.com",
        profile_picture_id: 3
    },
]

export default (req, res) => {
    res.status(200).json(results)
  }
  