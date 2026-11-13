import { setTimeout as wait } from "node:timers/promises";
const urls=[
  "https://habit-tracker.appsandgames.org/habit-tracker-cover.png",
  "https://raw.githubusercontent.com/Soldatix/Habit-Tracker-Daily-Planner/main/public/habit-tracker-cover.png",
  "https://habit-tracker.appsandgames.org/"
];
for(const url of urls) {
  for(const referer of ["", "https://appsandgames.org/"]){
    try {
      const r=await fetch(url,{headers:referer?{"Referer":referer}:{},signal:AbortSignal.timeout(12000),redirect:"follow"});
      const response=(await r.arrayBuffer()).byteLength;
      console.log("HABIT_ASSET_PROBE="+JSON.stringify({url,referer:referer||"none",status:r.status,ok:r.ok,contentType:r.headers.get("content-type"),length:response,final:r.url}));
    } catch(e) {
      console.log("HABIT_ASSET_PROBE="+JSON.stringify({url,referer:referer||"none",error:String(e)}));
    }
  }
}
