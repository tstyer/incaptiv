const base=process.env.EXPO_PUBLIC_API_URL;
export async function request(path,options={}){
 if(!base)throw Error('Set EXPO_PUBLIC_API_URL in mobile/.env, then restart Expo.');
 const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),10000);
 try{const response=await fetch(base.replace(/\/$/,'')+path,{...options,signal:controller.signal,headers:{'Content-Type':'application/json',...options.headers}});
 const data=await response.json();if(!response.ok)throw Error(data.error||'Request failed');return data;
 }finally{clearTimeout(timer);}
}
