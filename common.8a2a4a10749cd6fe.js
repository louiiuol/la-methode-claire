"use strict";(self.webpackChunklmc_ui=self.webpackChunklmc_ui||[]).push([[76],{9079:(m,c,s)=>{s.d(c,{O:()=>w,r:()=>n});var i=s(7025),p=s(6354),l=s(8141),u=s(4438),h=s(8498);let n=(()=>{var r;class o extends i.${constructor(t){super(),this.router=t,this.resource="users",this.forgotPassword=e=>this.post(e,{customResource:"",path:"forgot-password",notifyOnError:!1,customAction:"submit"}).pipe((0,p.T)(a=>(a.error&&(a.error="unknown_email"),a))),this.resetPassword=e=>{const{user:a,passwordConfirm:g,...f}=e;return this.update(`${a}/reset-password`,f).pipe((0,l.M)(v=>{v.error||this.router.navigate(["/login"]).catch(P=>console.error("Failed to redirect to [LoginPage] ",P))}))},this.updatePassword=e=>this.partialUpdate(null,e,{customResource:"",path:"update-password"})}}return(r=o).\u0275fac=function(t){return new(t||r)(u.KVO(h.Ix))},r.\u0275prov=u.jDH({token:r,factory:r.\u0275fac}),o})(),w=(()=>{var r;class o{}return(r=o).\u0275fac=function(t){return new(t||r)},r.\u0275mod=u.$C({type:r}),r.\u0275inj=u.G2t({providers:[n]}),o})()}}]);