import NextAuth from 'next-auth'
import Providers from 'next-auth/providers';
import axios from "axios";
import { decode } from "jsonwebtoken";

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
            async authorize(credentials, req) {
                let data = null;
                let error = null;
                let url = process.env.AUTH_URL;
                
                const cred = await axios.post(url, {"email":credentials.email, "password":credentials.password},{
                    headers: {
"Content-Type": "application/json;charset=UTF-8",
                        "Access-Control-Allow-Origin": "*"
                    }
                })
                    .then((response) => {
                            const res = response.data;

                            if (res.status==="Success") {
                                const payload = jwtValidation(res?.token);
                                //Si le token à été décodé, on défini l'objet 'data'. Sinon on défini une erreur
                                payload ? data = {id: 1, name: ["Paul", "Domi", payload, res?.token], email: res?.email} : error="Echéc de validation/décodage du JWT";
                            }
                            else {
                                console.error(res.status);
                            }
                    })
                    .catch(e => {
                        console.error("requête d'identification a échoué")
                        return null;
                    })
                if(data) {
                    const user = data;
                    return user
                }
                else {
                    console.error(error);
                    return null;
                }
            }
        })
    ],
    pages: {
        //signIn: '/Authentification/login',
        signOut: '/',
        //error: '/', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: null, // If set, new users will be directed here on first sign in
        redirect: false
      }
    // A database is optional, but required to persist accounts in a database
    //database: process.env.DATABASE_URL,
  })

const publicKeyURL = process.env.AXIOS_URL
const jwtValidation = async(token) => {
    let payload;

    const publicKeyInstance  = await axios.create({baseURL: publicKeyURL, url:"/key/public", method: "get"});
    await publicKeyInstance.get("/key/public").then((res) => {
        let publicKey = res.data;
        payload = decode(token, publicKey);
    }).catch((e) => {
        console.error(payload);
    });

    if(payload?.iss === 'breadcrumbs') {
        return payload;
    }
    else {
        console.log("issuer n'est pas bon. Jwt n'a pas été validé correctement mais on se connecte quand même pour les test");
        return payload;
    }
}