import Router from "koa-router";
import axios from "axios";
import Poi from "../dbs/models/poi";
import Config from "./config";

let router = new Router({
  prefix: "/search"
});
router.get("/top", async ctx => {
  let {
    status,
    data: { top }
  } = await axios.get(`${Config.URL}/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city
    }
  });
  ctx.body = {
    top: status === 200 ? top : []
  };
});
router.get("/hotPlace", async ctx => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city;
  let {
    status,
    data: { result }
  } = await axios.get(`${Config.URL}/search/hotPlace`, {
    params: {
      city
    }
  });
  ctx.body = {
    result: status === 200 ? result : []
  };
});
export default router;
