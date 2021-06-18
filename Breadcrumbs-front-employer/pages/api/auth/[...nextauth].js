import NextAuth from 'next-auth'
import Providers from 'next-auth/providers';
import axios from "axios";

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            id: "google",
            clientId: "1030856253415-8qv7lejjga6im2od2u200glgqutrf8ee.apps.googleusercontent.com",
            clientSecret: "YUtKAk1smVozdY3lM6tTjOyd",
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
            }),
      // ...add more providers here
      Providers.LinkedIn({
        id: "linkedProviderId",
        clientId: "78xqyjqta1nc2n",
        clientSecret: "LgW3aOtc0HgG5rL0",
        authorizationUrl: " https://www.linkedin.com/oauth/v2/authorization",
        accessTokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
        authorizationParams: {
          grant_type: 'authorization_code'
        }
      }),
       Providers.Credentials({
            name: 'email',
            credentials: {
                email: { label: "user", type: "text", placeholder: "your email" },
                password: { label: "type your password", type: "password" }
            },
            async authorize(credentials) {
                let data = null;
                const c = await axios.post(`http://localhost:3000/users/login`, {"user":{"email":credentials.email, "password":credentials.password}})
                    .then(res => data = res.data.json )
                if(data.token) {
                    const token = data.token
                    const dataUser = data.user;
                    const name = [dataUser.first_name, dataUser?.last_name]
                    const mail = dataUser.email
                    const user = { id: 1, name: name, email: mail };
                    //throw '/tips/dlo'
                    return user
                }
                else {
                    // throw '/tips/kfkfkffk';
                    return null;
                }
            }
        })
    ],
    pages: {
        //signIn: '/Authentification/login',
        signOut: '/',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: null // If set, new users will be directed here on first sign in
      }
    // A database is optional, but required to persist accounts in a database
    //database: process.env.DATABASE_URL,
  })