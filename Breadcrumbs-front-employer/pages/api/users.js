// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const users =  [
    { first_name: 'John' , last_name: "Doe", mail:"john@doe.com", phone_number:'+33769505151', profile_picture_id: 1, role: "candidate", position_applied: "dev" },
    { first_name: 'John2' , last_name: "Doe", mail:"john@doe.com", phone_number:'+33769505151', profile_picture_id: 1, role: "candidate" , position_applied: "dev" },
    { first_name: '3' , last_name: "Doe", mail:"john@doe.com", phone_number:'+33769505151', profile_picture_id: 1, role: "candidate" , position_applied: "dev" }
]


export default (req, res) => {
  res.status(200).json(users)
}
