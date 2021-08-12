package themer.Resources.messageRessource;

import io.smallrye.common.annotation.Blocking;
import org.eclipse.microprofile.reactive.messaging.Incoming;
import org.eclipse.microprofile.reactive.messaging.Outgoing;
import themer.layouts.Layout;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class processorresource {


    @Incoming("layout")
    @Blocking
    public Layout pprocess(Layout layout) {
        return layout;
    }
}
