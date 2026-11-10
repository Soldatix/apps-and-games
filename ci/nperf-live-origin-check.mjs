// Read-only production verification from an external GitHub Actions runner.
// Does not mutate, purge caches, deploy, or access private provider dashboards.
const origin="https://appsandgames.org";
const cases=[
  {name:"speed-page",path:"/speed-test/",markers:['id="themeToggle"','data-ag-language-menu','../assets/js/ag-language-menu.js']},
  {name:"svg-preview",path:"/assets/images/speed-test.svg",markers:['Apps &amp; Games','SPEED TEST']},
  {name:"language-script",path:"/assets/js/ag-language-menu.js",markers:['const FLAGS','ag-language-flag']},
  {name:"homepage",path:"/",markers:['assets/images/speed-test.svg','speed-test-button']}
];
let stale=false,unavailable=false;
for(const item of cases){
  for(const variant of ["normal","fresh"]){
    const url=origin+item.path+(variant==="fresh"?"?nperf_diagnostic=20261110_pr55":"");
    try{
      const response=await fetch(url,{headers:{"Accept":"text/html,application/xml,*/*","Cache-Control":"no-cache","Pragma":"no-cache"},redirect:"follow",signal:AbortSignal.timeout(18000)});
      const body=await response.text();
      const probe={page:item.name,variant,status:response.status,finalUrl:response.url,contentType:response.headers.get("content-type"),cfCacheStatus:response.headers.get("cf-cache-status"),server:response.headers.get("server"),bytes:body.length,markers:Object.fromEntries(item.markers.map(m=>[m,body.includes(m)]))};
      console.log("NPerfProductionProbe="+JSON.stringify(probe));
      if(!response.ok)unavailable=true;
      else if(item.markers.some(m=>!body.includes(m)))stale=true;
    }catch(error){
      unavailable=true;
      console.log("NPerfProductionProbe="+JSON.stringify({page:item.name,variant,error:String(error)}));
    }
  }
}
console.log("PRODUCTION_STALE="+(stale?"TRUE":"FALSE"));
console.log("PRODUCTION_UNAVAILABLE="+(unavailable?"TRUE":"FALSE"));
// Informational; never block builds for external uptime, bot protection or regional caching.
