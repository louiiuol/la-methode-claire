"use strict";(self.webpackChunklmc_ui=self.webpackChunklmc_ui||[]).push([[592],{9677:(F,d,t)=>{t.d(d,{g:()=>P,C:()=>i});var h=t(7398),p=t(9397),o=t(5879),f=t(9862),l=t(2906);let u=(()=>{class r extends l.g{constructor(){super(...arguments),this.resource="users",this.forgotPassword=s=>this.create(s,{path:"forgotten-password",notifyOnSuccess:!0,notifyOnError:!1,customAction:"submit"}),this.resetpassword=(s,a)=>this.update(null,a,{path:"change-password",headers:new f.WM({Authorization:"Bearer "+s})})}}return r.\u0275fac=function(){let e;return function(a){return(e||(e=o.n5z(r)))(a||r)}}(),r.\u0275prov=o.Yz7({token:r,factory:r.\u0275fac}),r})();var w=t(67);let i=(()=>{class r{constructor(s,a){this.http=s,this.router=a,this.forgotPassword=c=>this.http.forgotPassword(c).pipe((0,h.U)(n=>(n.error&&(n.error="unknown_email"),n))),this.resetPassword=c=>{const{token:n,password:v,passwordConfirm:g}=c;return this.http.resetpassword(n,{password:v,_password:g}).pipe((0,p.b)(m=>{m.error||this.router.navigate(["/login"]).catch(y=>console.error("Failed to redirect to [LoginPage] ",y))}))}}}return r.\u0275fac=function(s){return new(s||r)(o.LFG(u),o.LFG(w.F0))},r.\u0275prov=o.Yz7({token:r,factory:r.\u0275fac}),r})(),P=(()=>{class r{}return r.\u0275fac=function(s){return new(s||r)},r.\u0275mod=o.oAB({type:r}),r.\u0275inj=o.cJS({providers:[u,i]}),r})()}}]);