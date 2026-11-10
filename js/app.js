const BASE='https://sfeg-system.runasp.net';
const EP={login:'/api/author/login',logout:'/api/author/logout',revoke:'/api/author/revoke-refresh-token',refresh:'/api/author/refresh-token',info:'/Account/info',update:'/Account/info-Update',pass:'/Account/change-password'};
let MOCK=false; // true = fake backend for UI-only testing
const I={dumb:'<path d="M14.4 14.4 9.6 9.6M18.7 21.5l2.8-2.8a2 2 0 0 0 0-2.8l-1.4-1.4-4.2 4.2M5.3 2.5 2.5 5.3a2 2 0 0 0 0 2.8l1.4 1.4 4.2-4.2M21.2 19.4l-1.4-1.4M3.9 5.9 2.5 4.5M16.4 7.6l-2.8 2.8M7.6 16.4l2.8-2.8"/>',globe:'<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>',mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',lock:'<rect x="5" y="11" width="14" height="10" rx="3"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',eyeoff:'<path d="M3 3l18 18M10.6 5.1A9.7 9.7 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4.2M6.6 6.7C3.9 8.5 2 12 2 12s3.5 7 10 7c1.6 0 3-.4 4.3-1"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',phone:'<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',chk:'<path d="M5 12l5 5 9-10"/>'};
const ic=(n,c='')=>`<svg class="${c}" viewBox="0 0 24 24">${I[n]}</svg>`;
const LOGO='<svg viewBox="0 0 24 24" aria-hidden="true"><g transform="rotate(45 12 12)"><rect x="8.9" y="11.2" width="6.2" height="1.6"/><rect x="7.3" y="6.5" width="1.6" height="11"/><rect x="5.4" y="7.75" width="1.6" height="8.5"/><rect x="3.5" y="9" width="1.6" height="6"/><rect x="15.1" y="6.5" width="1.6" height="11"/><rect x="17" y="7.75" width="1.6" height="8.5"/><rect x="18.9" y="9" width="1.6" height="6"/></g></svg>';
const T={en:{brand1:'Smart Fitness',brand2:'& Nutrition',tag:'Smart fitness & nutrition system',eb:'Secure sign-in',h:'Manage Your Fitness & Nutrition Platform Seamlessly',sub:'Sign in to continue managing your platform today.',email:'Email',pw:'Password',rm:'Remember me on this device',si:'Sign in',f1:'Workout plans',f2:'Nutrition tracking',f3:'Progress reports',so:'Sign out',up:'Update profile',cp:'Change password',cur:'Current password',nw:'New password',cf:'Confirm password',pr:'Password requirements',r1:'At least 12 characters',r2:'At least one uppercase letter',r3:'At least one lowercase letter',r4:'At least one digit',r5:'At least one special character',pm:'Passwords match',save:'Save changes',name:'Full name',phone:'Phone',req:'This field is required',inv:'Enter a valid email',bad:'Incorrect email or password',na:'This account is not allowed to sign in',err:'Something went wrong. Please try again.',exp:'Your session expired. Please sign in again.',saved:'Changes saved successfully',lk:'Account locked after too many failed attempts. Try again later.',nc:'Please confirm your email before signing in.',ds:'This account has been disabled by an administrator.',pf:'Current password is incorrect or the new password is too weak.',fn:'First name',ln:'Last name',net:'Cannot reach the server. Check your connection or the server CORS settings.'},
ar:{brand1:'Smart Fitness',brand2:'& Nutrition',tag:'نظام اللياقة والتغذية الذكي',eb:'تسجيل دخول آمن',h:'أدِر منصة اللياقة والتغذية بسهولة تامة',sub:'سجّل الدخول لمتابعة إدارة منصتك اليوم.',email:'البريد الإلكتروني',pw:'كلمة المرور',rm:'تذكرني على هذا الجهاز',si:'تسجيل الدخول',f1:'خطط التمارين',f2:'تتبع التغذية',f3:'تقارير التقدم',so:'تسجيل الخروج',up:'تحديث الملف الشخصي',cp:'تغيير كلمة المرور',cur:'كلمة المرور الحالية',nw:'كلمة المرور الجديدة',cf:'تأكيد كلمة المرور',pr:'متطلبات كلمة المرور',r1:'12 حرفاً على الأقل',r2:'حرف كبير واحد على الأقل',r3:'حرف صغير واحد على الأقل',r4:'رقم واحد على الأقل',r5:'رمز خاص واحد على الأقل',pm:'كلمتا المرور متطابقتان',save:'حفظ التغييرات',name:'الاسم الكامل',phone:'رقم الهاتف',req:'هذا الحقل مطلوب',inv:'أدخل بريداً إلكترونياً صالحاً',bad:'البريد أو كلمة المرور غير صحيحة',na:'هذا الحساب غير مصرح له بالدخول',err:'حدث خطأ ما. حاول مرة أخرى.',exp:'انتهت جلستك. سجّل الدخول مرة أخرى.',saved:'تم حفظ التغييرات بنجاح',lk:'تم قفل الحساب بسبب كثرة المحاولات الخاطئة. حاول لاحقاً.',nc:'يرجى تأكيد بريدك الإلكتروني قبل تسجيل الدخول.',ds:'تم تعطيل هذا الحساب من قبل المسؤول.',pf:'كلمة المرور الحالية غير صحيحة أو الجديدة ضعيفة.',fn:'الاسم الأول',ln:'الاسم الأخير',net:'تعذر الوصول للسيرفر. تأكد من الاتصال أو من إعدادات CORS في الـ backend.'}};
let lang='en';try{lang=localStorage.getItem('lang')||((navigator.language||'').startsWith('ar')?'ar':'en')}catch(e){}
const t=k=>T[lang][k];
// ===== tokens: localStorage if "remember me", else sessionStorage =====
const st=()=>{try{return localStorage.getItem('rt')?localStorage:sessionStorage}catch(e){return sessionStorage}};
const S={get access(){return sessionStorage.getItem('at')||localStorage.getItem('at')},get refresh(){return sessionStorage.getItem('rt')||localStorage.getItem('rt')},
 set(a,r,rem){const s=rem===undefined?st():rem?localStorage:sessionStorage;try{s.setItem('at',a);if(r)s.setItem('rt',r)}catch(e){}},
 clear(){for(const s of[sessionStorage,localStorage])try{s.removeItem('at');s.removeItem('rt')}catch(e){}}};
// ===== mock backend =====
const mdb={u:{firstName:'SFNE',lastName:'Admin',email:'admin@sfne.com',phoneNumber:'01000000000'},pw:''};
async function mock(p,o){await new Promise(r=>setTimeout(r,350));let b={};try{b=JSON.parse(o.body)}catch(e){}const a=(o.headers||{}).Authorization,R=(s,d)=>({status:s,ok:s<300,json:async()=>d});
 const tk=()=>({token:'a'+Date.now(),refreshToken:'r'+Date.now(),expiresIn:3600});
 if(p==EP.login){mdb.u.email=b.email;mdb.pw=b.password;return R(200,tk())}
 if(p==EP.refresh)return S.refresh?R(200,{...tk(),refreshToken:S.refresh}):R(401,{title:'User.InvalidRefreshToken'});
 if(p==EP.revoke||p==EP.logout)return R(200,{isSuccess:true});
 if(!a)return R(401,{});
 if(p==EP.info)return R(200,mdb.u);
 if(p==EP.update){for(const[k,v]of o.body.entries())if(typeof v==='string'&&v)mdb.u[k[0].toLowerCase()+k.slice(1)]=v;return R(204,{})}
 if(p==EP.pass){if(b.currentPassword!==mdb.pw)return R(400,{});mdb.pw=b.newPassword;return R(204,{})}
 return R(404,{})}
const raw=(p,o={})=>MOCK?mock(p,o):fetch(BASE+p,o);
// ===== api client with single-flight refresh =====
let rf=null;
const doRefresh=()=>rf||(rf=(async()=>{try{if(!S.refresh)return false;const r=await raw(EP.refresh,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({token:S.access,refreshToken:S.refresh})});if(!r.ok)return false;const d=await r.json();S.set(d.token,d.refreshToken);return true}catch(e){return false}finally{rf=null}})());
async function api(p,m='GET',b){const fd=b instanceof FormData,go=()=>raw(p,{method:m,headers:{...(fd?{}:{'Content-Type':'application/json'}),Authorization:'Bearer '+S.access},body:b?(fd?b:JSON.stringify(b)):undefined});
 let r=await go();if(r.status===401){if(await doRefresh())r=await go();else{S.clear();sessionStorage.setItem('flash','exp');location.hash='#login';throw new Error('expired')}}return r}
// ===== router + guard =====
const $=s=>document.querySelector(s),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function route(){const h=(location.hash||'#').slice(1),ok=!!S.access;
 if(!ok&&h!=='login')return void(location.hash='#login');
 if(ok&&!['password','profile'].includes(h))return void(location.hash='#password');
 document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';
 h==='login'?login():page(h)}
addEventListener('hashchange',route);
const isDark=()=>{const r=document.documentElement;return r.dataset.theme==='dark'||(!r.dataset.theme&&matchMedia('(prefers-color-scheme:dark)').matches)};
const header=()=>`<div class="hd"><div class="brand"><div class="logo">${LOGO}</div><div><b>${t('brand1')} <i>${t('brand2')}</i></b><small>${t('tag')}</small></div></div><div class="tg"><button class="ib" id="lg" aria-label="Language">${ic('globe')}</button><button class="ib" id="th" aria-label="Theme">${ic(isDark()?'sun':'moon')}</button></div></div>`;
function wire(){$('#lg').onclick=()=>{lang=lang==='ar'?'en':'ar';try{localStorage.setItem('lang',lang)}catch(e){}route()};
 $('#th').onclick=()=>{document.documentElement.dataset.theme=isDark()?'light':'dark';route()};
 document.querySelectorAll('.eye').forEach(b=>b.onclick=()=>{const i=b.previousElementSibling,h=i.type==='password';i.type=h?'text':'password';b.innerHTML=ic(h?'eyeoff':'eye')})}
const fld=(id,lbl,ico,type='text',v='',ph='')=>`<label for="${id}">${lbl}</label><div class="fw">${ic(ico)}<input id="${id}" type="${type==='pw'?'password':type}" value="${esc(v)}" placeholder="${ph}" autocomplete="${type==='pw'?'off':'on'}">${type==='pw'?`<button type="button" class="eye" tabindex="-1">${ic('eye')}</button>`:''}</div><div class="fe" id="e-${id}"></div>`;
const em=v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function bad(id,m){$('#'+id).classList.toggle('bad',!!m);$('#e-'+id).textContent=m||''}
// ===== login =====
function login(){
 $('#app').innerHTML=`<div class="split"><div class="l">${header()}<form id="f" novalidate><p class="eb">${t('eb')}</p><h1>${t('h')}</h1><p class="sub">${t('sub')}</p><div class="al" id="al"></div>${fld('email',t('email'),'mail','email','','name@sfne.com')}${fld('pw',t('pw'),'lock','pw')}<label class="rm"><input type="checkbox" id="rm"> ${t('rm')}</label><button class="btn" id="b">${t('si')} ${ic('arrow','ar')}</button></form></div><div class="r"><div class="mini"><div class="logo">${LOGO}</div>SFNE</div><ul><li>${t('f1')}</li><li>${t('f2')}</li><li>${t('f3')}</li></ul></div></div>`;
 wire();const fl=sessionStorage.getItem('flash');if(fl){sessionStorage.removeItem('flash');msg(t(fl))}
 $('#f').onsubmit=async e=>{e.preventDefault();msg('');const E=$('#email').value.trim(),P=$('#pw').value;
  const a=!E?t('req'):!em(E)?t('inv'):'',c=P?'':t('req');bad('email',a);bad('pw',c);if(a||c)return;
  $('#b').disabled=true;
  try{const r=await raw(EP.login,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:E,password:P})});
   if(r.ok){const d=await r.json();S.clear();S.set(d.token,d.refreshToken,$('#rm').checked);location.hash='#password';return}
   msg(await loginErr(r))}catch(x){console.error('Login request failed:',BASE+EP.login,x);msg(t('net')+' ('+(x&&x.message||x)+')')}
  $('#b').disabled=false}}
async function loginErr(r){let s='';try{s=JSON.stringify(await r.json())}catch(e){}
 return /LockedUser/.test(s)?t('lk'):/EmailNotConfirmed|EmailRegisteredButNotConfirmed/.test(s)?t('nc'):r.status===409||/User\.Disable/.test(s)?t('ds'):r.status===403?t('na'):r.status===401||r.status===400?t('bad'):t('err')}
function msg(m,ok){const a=$('#al');if(!a)return;a.textContent=m;a.className='al'+(ok?' ok':'');a.style.display=m?'block':'none'}
// ===== dashboard pages =====
const rule=[['r1',v=>v.length>=12],['r2',v=>/\p{Lu}/u.test(v)],['r3',v=>/\p{Ll}/u.test(v)],['r4',v=>/\d/.test(v)],['r5',v=>/[^A-Za-z0-9]/.test(v)]];
async function page(h){
 const other=h==='password'?['profile','up']:['password','cp'];
 $('#app').innerHTML=`<div class="dash">${header()}<div class="grid"><div class="side"><div class="c t"><div class="al" id="al"></div><button class="so" id="so">${t('so')}</button></div><a class="c s nav" href="#${other[0]}">${t(other[1])}</a></div><div class="c main" id="m"></div></div></div>`;wire();
 $('#so').onclick=async()=>{const h={'Content-Type':'application/json',Authorization:'Bearer '+S.access};try{await raw(EP.revoke,{method:'POST',headers:h,body:JSON.stringify({token:S.access,refreshToken:S.refresh})})}catch(x){}try{await raw(EP.logout,{method:'POST',headers:h})}catch(x){}S.clear();location.hash='#login'};
 const fail=x=>{if(x&&x.message!=='expired')msg(t('err'))};
 if(h==='password'){
  $('#m').innerHTML=`<h2>${t('cp')}</h2><form id="f" novalidate>${fld('cur',t('cur'),'lock','pw')}${fld('nw',t('nw'),'lock','pw')}<div class="rq"><b>${t('pr')}</b>${rule.map(([k])=>`<div id="${k}"><span class="dot">${ic('chk')}</span>${t(k)}</div>`).join('')}</div>${fld('cf',t('cf'),'lock','pw')}<div class="mt" id="pm"><span class="dot">${ic('chk')}</span>${t('pm')}</div><button class="btn" id="b" disabled>${t('save')}</button></form>`;wire();
  const upd=()=>{const n=$('#nw').value,c=$('#cf').value;let all=true;rule.forEach(([k,f])=>{const o=f(n);$('#'+k).classList.toggle('ok',o);if(!o)all=false});
   const m=all&&!!c&&c===n;$('#pm').classList.toggle('ok',m);$('#b').disabled=!(all&&m&&$('#cur').value)};
  ['cur','nw','cf'].forEach(i=>['input','keyup','change','paste'].forEach(ev=>$('#'+i).addEventListener(ev,()=>setTimeout(upd,0))));
  $('#f').onsubmit=async e=>{e.preventDefault();msg('');$('#b').disabled=true;
   try{const r=await api(EP.pass,'PUT',{currentPassword:$('#cur').value,newPassword:$('#nw').value});
    r.ok?(msg(t('saved'),1),$('#f').reset(),upd()):(msg(r.status===400?t('pf'):t('err')),upd())}catch(x){fail(x);upd()}}}
 else{let u={};try{const r=await api(EP.info);if(!r.ok)throw 0;u=await r.json()}catch(x){fail(x||{});}
  $('#m').innerHTML=`<h2>${t('up')}</h2><form id="f" novalidate>${fld('fn',t('fn'),'user','text',u.firstName)}${fld('ln',t('ln'),'user','text',u.lastName)}${fld('email',t('email'),'mail','email',u.email)}${fld('phone',t('phone'),'phone','tel',u.phoneNumber??u.phone)}<button class="btn" id="b">${t('save')}</button></form>`;wire();
  $('#f').onsubmit=async e=>{e.preventDefault();msg('');const n=$('#fn').value.trim(),l=$('#ln').value.trim(),E=$('#email').value.trim(),a=n?'':t('req'),d=l?'':t('req'),c=!E?t('req'):em(E)?'':t('inv');bad('fn',a);bad('ln',d);bad('email',c);if(a||d||c)return;$('#b').disabled=true;
   try{const f=new FormData();f.append('FirstName',n);f.append('LastName',l);f.append('Email',E);f.append('PhoneNumber',$('#phone').value.trim());const r=await api(EP.update,'PUT',f);msg(r.ok?t('saved'):t('err'),r.ok)}catch(x){fail(x)}$('#b').disabled=false}}}
route();
