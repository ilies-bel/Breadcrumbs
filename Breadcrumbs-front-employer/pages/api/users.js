// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const users =  [
    { first_name: 'John' , last_name: "Doe", mail:"john@doe.com", phone_number:'+33769505151', profile_picture_id: 1, role: "candidate" },
    { first_name: 'Alice' , last_name: "Simone", mail:"john@doe.com", phone_number:'+33769505151', profile_picture_id: 1, role: "candidate", image: 'https://s2.qwant.com/thumbr/0x380/c/f/f32d8ae71ed349ae9b7a2e28fbe72b0c1c12a6f1c3df2b932bc0912fe41e8f/Thornton-Tomasetti-1.jpg?u=https%3A%2F%2Fcee.northeastern.edu%2Fwp-content%2Fuploads%2Fsites%2F3%2FThornton-Tomasetti-1.jpg&q=0&b=1&p=0&a=0' },
    { first_name: 'Lucas' , last_name: "Doe", mail:"john@doe.com", phone_number:'+33769505151', profile_picture_id: 1, role: "candidate" },

    {
        first_name: 'Jane',
        last_name: "Cooper",
        title: 'Regional Paradigm Technician',
        department: 'Optimization',
        role: 'Admin',
        mail: 'jane.cooper@example.com',
        profile_picture_id: 4,
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
        first_name: "Raito",
        last_name: "Yagami",
        mail: "kira@interpol.com",
        profile_picture_id: 1,
        role: 'ambassador',
        image: 'https://s2.qwant.com/thumbr/0x380/c/f/f32d8ae71ed349ae9b7a2e28fbe72b0c1c12a6f1c3df2b932bc0912fe41e8f/Thornton-Tomasetti-1.jpg?u=https%3A%2F%2Fcee.northeastern.edu%2Fwp-content%2Fuploads%2Fsites%2F3%2FThornton-Tomasetti-1.jpg&q=0&b=1&p=0&a=0'
    },
]


export default (req, res) => {
  res.status(200).json(users)
}
