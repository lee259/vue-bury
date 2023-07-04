import { reactive, effect } from "@vue/reactivity";
import request from "./request";
//上报uv&pv&TP
export default (app, params) => {
  const globalProperties = reactive(app.config.globalProperties);
  let startTime = new Date().getTime();
  let path = "";
  let lastPath = "";
  window.addEventListener("beforeunload", () => {
    //ios 请求会中断哦~
    const endTime = new Date().getTime();
    const TP = endTime - startTime;

    request(params.baseUrl, {
      ...params.baseParams,
      TP: {
        path: path,
        time: TP,
      },
    });
  });
  effect(() => {
    const endTime = new Date().getTime();
    const TP = endTime - startTime;
    startTime = endTime;
    lastPath = path;
    path = globalProperties.$route.path;
    //间隔为0不上报
    if (!TP || !params.baseUrl) return;
    request(params.baseUrl, {
      ...params.baseParams,
      UPVEventName: `${params.prefix}_${path}`,
    });
    //页面停留时长小于0.5s不上报
    if (TP < 500) return;
    request(params.baseUrl, {
      ...params.baseParams,
      TP: {
        path: lastPath,
        time: TP,
      },
    });
  });
};
