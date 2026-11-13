import {chromium} from "playwright";
const browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
const urls=["https://habit-tracker.appsandgames.org/habit-tracker-cover.png","https://raw.githubusercontent.com/Soldatix/Habit-Tracker-Daily-Planner/main/public/habit-tracker-cover.png"];
try {
 const page=await browser.newPage({viewport:{width:1366,height:900}});
 page.on("requestfailed",req=>{if(req.url().includes("habit-tracker"))console.log("HABIT_BROWSER_FAILED "+req.url()+" "+req.failure()?.errorText)});
 page.on("response",res=>{if(res.url().includes("habit-tracker-cover"))console.log("HABIT_BROWSER_RESPONSE "+res.status()+" "+res.url())});
 await page.goto("http://127.0.0.1:4173/",{waitUntil:"domcontentloaded"});
 await page.evaluate(()=>document.querySelector("#utilitiesGrid")?.scrollIntoView());
 await page.waitForTimeout(2500);
 const app=await page.evaluate(()=>{
  const image=[...document.images].find(el=>el.alt?.includes("Habit Tracker"));
  return image?{source:image.src,complete:image.complete,naturalWidth:image.naturalWidth,naturalHeight:image.naturalHeight,loading:image.loading}:null;
 });
 console.log("HABIT_BROWSER_CATALOG="+JSON.stringify(app));
 for(const url of urls){
   const result=await page.evaluate(async(u)=>{
     const img=new Image(); img.src=u;
     return await Promise.race([
       new Promise(resolve=>{img.onload=()=>resolve({ok:true,width:img.naturalWidth});img.onerror=()=>resolve({ok:false});}),
       new Promise(resolve=>setTimeout(()=>resolve({timeout:true}),10000))
     ]);
   },url);
   console.log("HABIT_BROWSER_DIRECT="+JSON.stringify({url,result}));
 }
}finally{await browser.close();}
