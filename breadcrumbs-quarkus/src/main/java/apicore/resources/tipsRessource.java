package apicore.resources;

import apicore.entit.tips.interview_tips;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;
import io.smallrye.jwt.auth.principal.JWTParser;
import io.smallrye.jwt.util.ResourceUtils;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.Claims;
import org.eclipse.microprofile.jwt.JsonWebToken;

import javax.ws.rs.core.SecurityContext;

@Path("/tips")
public class tipsRessource {
    @Inject JWTParser parser;
    @Inject JsonWebToken jwt;
    @Inject
    @Claim(standard = Claims.full_name)
    String full_name;

    @GET
    public List<interview_tips> alltips() {
        return interview_tips.listAll();
    }

    @Path("/secu")
    //@RolesAllowed({ "candidate", "collaborator" })
    @PermitAll
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTips(@Context SecurityContext ctx) {

        String jj = "begin";

        if (ctx.getUserPrincipal() == null) {
            jj = "Not secured";
        }
        else {
            jj = ctx.getUserPrincipal().getName();
        }
/*        String principal = jwt.getClaim("name").toString();
        System.out.println("principal :");System.out.println(principal);System.out.println("/principal");*/
  /*      try {
            //System.out.println("jjr dans try-catch tips");System.out.println(jjr);System.out.println("/tips");
            String publicKey = ResourceUtils.readResource("publicKey.pem");
            //System.out.println(publicKey);System.out.println("/publicKey");
            //JsonWebToken jt = parser.parse(jjr);
            //JsonWebToken jt = parser.verify(jjr, publicKey).getClaim("name");
            String jt2 = jwt.getClaim("name").toString();
            //JsonWebToken jt = parser.verify("eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJicmVhZGNydW1icyIsInN1YiI6ImNhbmRpZGF0ZSIsImF1ZCI6Imh0dHBzOi8vYnJlYWRjcnVtYnMucHdhLmZyL2FwaSIsImlhdCI6MTYyNTE1MTAsImV4cCI6MTYyNTExMH0.fbsINzkpuClW3sDqdFgzgylV-F5iOBwxFqItRaUgvsqFxK8L1RTWPwjLbzEZkBzRfmQUTu8UOWZDhj4E87QI2zMlFglCj-5a9VIy-oPEad23K9ZFAV1BsoIdTy8wMLggSNVIHKeoU5QwdMLWXwKj2pHsZnPv2sclfgy-zT2CHyfKg_TWHsiDSjyOJLVoMWrQl3XAOoW5cR0l5AO6aWJGSdOCIhjcQtOMbbJCgyqdwBB0TNDwTt8_R27ex0tfJ_rCvsJ84Gf37VRql7yN-Hc0gTM9X8O_nuX1Ck0DZy8BRi97pgcMgr2gPNJmTX0HpZ6Lq68TiA1w74X2Ipp8T0WGFA", publicKey);
            //JsonWebToken jt = parser.parse("eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJicmVhZGNydW1icyIsInN1YiI6ImNhbmRpZGF0ZSIsImF1ZCI6Imh0dHBzOi8vYnJlYWRjcnVtYnMucHdhLmZyL2FwaSIsImlhdCI6MTYyNTE1MTAsImV4cCI6MTYyNTExMH0.fbsINzkpuClW3sDqdFgzgylV-F5iOBwxFqItRaUgvsqFxK8L1RTWPwjLbzEZkBzRfmQUTu8UOWZDhj4E87QI2zMlFglCj-5a9VIy-oPEad23K9ZFAV1BsoIdTy8wMLggSNVIHKeoU5QwdMLWXwKj2pHsZnPv2sclfgy-zT2CHyfKg_TWHsiDSjyOJLVoMWrQl3XAOoW5cR0l5AO6aWJGSdOCIhjcQtOMbbJCgyqdwBB0TNDwTt8_R27ex0tfJ_rCvsJ84Gf37VRql7yN-Hc0gTM9X8O_nuX1Ck0DZy8BRi97pgcMgr2gPNJmTX0HpZ6Lq68TiA1w74X2Ipp8T0WGFA");
            System.out.println("jwt tips");System.out.println(jt2);System.out.println("/tips jwt");
        }
        catch (Exception e) {
            e.printStackTrace();
        }
*/

        return Response.ok(jj).build();
    }

    @Path("/post")
    @POST @Transactional
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RolesAllowed("collaborator")
    public Response add(interview_tips tip) {
        String title = tip.title; String description = tip.description;
        interview_tips.add(title, description);
        return Response.ok("tip added").build();
    }
}
