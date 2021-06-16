import React from "react";
import FlashyButton from 'littleComponents/flashyButton';
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const SignInLinkedinBase = () => {
    /* const [{ data, loading, error }, refetch] = useAxios({
      baseURL: "https://www.linkedin.com/oauth/v2/authorization",
      params: new URLSearchParams("response_type=code&state=76313eba022e338757284774d3464c2eb709326f4031dd7c727416c99b15bc11&redirect_uri=http://localhost:5000/hiring-process&scope=r_liteprofile&client_id=78xqyjqta1nc2n")
    });
   */
    /* if(error) return <strong>Error linke</strong>
    if(loading) return <loading>loading ...</loading> */
    const onSubmit = (event) => {

        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);


        event.preventDefault();
    };

    return (
        <>
            <form onSubmit={() => onSubmit}>
                <button disabled onClick={() =>
                    window.open("https://www.linkedin.com/oauth/v2/authorization?response_type=code&state=76313eba022e338d3464c2eb709326f4031dd7c727416c99b15bc11&redirect_uri=https://localhost:5000/hiring-process&scope=r_liteprofile&client_id=78xqyjqta1nc2n",
                                'Authentifie toi avec Linkedin',
                                'menubar=no,location=no,status=no, width=400, heigth=600',)
                } >Sign in with Linkedin<LinkedInIcon /></button>
            </form>
        </>
    )

}

export default SignInLinkedinBase;