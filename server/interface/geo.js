import Router from "koa-router";
import axios from "axios";
import Config from "./config";
let router = new Router({
  prefix: "/geo"
});
router.get("/getPosition", async ctx => {
  const {
    status,
    data: { province, city }
  } = await axios.get(`${Config.URL}/geo/Position`);
  if (status === 200) {
    ctx.body = {
      province,
      city
    };
  } else {
    ctx.body = {
      province: "",
      city: ""
    };
  }
});
router.get("/menu", async ctx => {
  const {
    status,
    data: { menu }
  } = await axios.get("http://117.51.155.165/geo/menu");
  if (status === 200) {
    ctx.body = {
      menu
    };
  } else {
    ctx.body = {
      menu: []
    };
  }
});
router.get("/province", async ctx => {
  const {
    status,
    data: { province }
  } = await axios.get(`${Config.URL}/geo/province`);
  console.log(JSON.stringify(province));
  ctx.body = {
    province: status === 200 ? province : []
  };
});
export default router;
