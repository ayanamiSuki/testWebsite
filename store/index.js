import geo from "./moudules/geo";
import home from "./moudules/home";
const modules = {
  geo,
  home
};
const actions = {
  async nuxtServerInit({ commit }, { req, app }) {
    const {
      status,
      data: { province, city }
    } = await app.$axios.get("/geo/getPosition");
    commit(
      "geo/setPosition",
      status === 200 ? { city, province } : { city: "", province: "" }
    );
    const {
      status: status2,
      data: { menu }
    } = await app.$axios.get("/geo/menu");
    commit("home/getMenu", status2 === 200 ? menu : []);
    const {
      status: status3,
      data: { result }
    } = await app.$axios.get("/search/hotPlace", {
      params: {
        // city: app.store.state.geo.position.city.replace("市", "")
        city: "天津"
      }
    });
    commit("geo/getHotPlace", status3 === 200 ? result : []);
  }
};

export default { modules, actions };
