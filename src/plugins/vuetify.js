import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        boubou: "#DEC79B",
        navbarBackground: "#61B390",

        
      },
      light: {
        boubou: "#DEC79B",
        navbarBackground: "#61B390",
        textNavbar: "#E1EACD",
      },
    },
    dark: false,
  },
});
