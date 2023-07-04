import getVisitorAndTP from "./src/getVisitorAndTP";
import request from "./src/request";
import manualInto from "./src/manualInto";
let params = {
  prefix: "",
  baseParams: {},
  baseUrl: "",
  isVisTP: false,
};
/**
 * @param {*} options 同Options
 * @param {String | undefined} path 当前页面路由，不传手动注入则不会统计到当前页的UPV
 */
const manualIntoIndex = (options, path) => {
  manualInto(params, options);

  if (!path) return;
  request(params.baseUrl, {
    ...params.baseParams,
    UPVEventName: `${params.prefix}_${path}`,
  });
};

export { manualIntoIndex as manualInto };

export default {
  install: (app, options = {}) => {
    params.prefix = options.prefix || "tracking";
    params.baseParams = options.baseParams || "";
    params.baseUrl = options.baseUrl || "";
    params.isVisTP = options.isVisTP || false;
    app.directive("click", {
      created: (el, bind) => {
        el.addEventListener("click", () => {
          request(params.baseUrl, {
            ...bind.value,
            ...(params.baseParams || {}),
          });
        });
      },
    });
    //挂载全局用于手动上报
    app.config.globalProperties.$vtrack = (handleParams) => {
      request(params.baseUrl, { ...handleParams, ...params.baseParams });
    };

    if (!params.isVisTP) return;
    getVisitorAndTP(app, params);
  },
};
