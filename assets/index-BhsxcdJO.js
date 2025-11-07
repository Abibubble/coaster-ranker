(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const d of document.querySelectorAll('link[rel="modulepreload"]'))c(d);new MutationObserver(d=>{for(const m of d)if(m.type==="childList")for(const h of m.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&c(h)}).observe(document,{childList:!0,subtree:!0});function u(d){const m={};return d.integrity&&(m.integrity=d.integrity),d.referrerPolicy&&(m.referrerPolicy=d.referrerPolicy),d.crossOrigin==="use-credentials"?m.credentials="include":d.crossOrigin==="anonymous"?m.credentials="omit":m.credentials="same-origin",m}function c(d){if(d.ep)return;d.ep=!0;const m=u(d);fetch(d.href,m)}})();function Pg(l){return l&&l.__esModule&&Object.prototype.hasOwnProperty.call(l,"default")?l.default:l}var Pc={exports:{}},ur={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ng;function zb(){if(ng)return ur;ng=1;var l=Symbol.for("react.transitional.element"),r=Symbol.for("react.fragment");function u(c,d,m){var h=null;if(m!==void 0&&(h=""+m),d.key!==void 0&&(h=""+d.key),"key"in d){m={};for(var v in d)v!=="key"&&(m[v]=d[v])}else m=d;return d=m.ref,{$$typeof:l,type:c,key:h,ref:d!==void 0?d:null,props:m}}return ur.Fragment=r,ur.jsx=u,ur.jsxs=u,ur}var ag;function Ab(){return ag||(ag=1,Pc.exports=zb()),Pc.exports}var s=Ab(),Ic={exports:{}},me={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lg;function Tb(){if(lg)return me;lg=1;var l=Symbol.for("react.transitional.element"),r=Symbol.for("react.portal"),u=Symbol.for("react.fragment"),c=Symbol.for("react.strict_mode"),d=Symbol.for("react.profiler"),m=Symbol.for("react.consumer"),h=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),g=Symbol.for("react.suspense"),p=Symbol.for("react.memo"),x=Symbol.for("react.lazy"),S=Symbol.for("react.activity"),C=Symbol.iterator;function A(k){return k===null||typeof k!="object"?null:(k=C&&k[C]||k["@@iterator"],typeof k=="function"?k:null)}var U={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},N=Object.assign,L={};function O(k,q,I){this.props=k,this.context=q,this.refs=L,this.updater=I||U}O.prototype.isReactComponent={},O.prototype.setState=function(k,q){if(typeof k!="object"&&typeof k!="function"&&k!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,k,q,"setState")},O.prototype.forceUpdate=function(k){this.updater.enqueueForceUpdate(this,k,"forceUpdate")};function B(){}B.prototype=O.prototype;function K(k,q,I){this.props=k,this.context=q,this.refs=L,this.updater=I||U}var j=K.prototype=new B;j.constructor=K,N(j,O.prototype),j.isPureReactComponent=!0;var V=Array.isArray;function W(){}var Z={H:null,A:null,T:null,S:null},ce=Object.prototype.hasOwnProperty;function le(k,q,I){var te=I.ref;return{$$typeof:l,type:k,key:q,ref:te!==void 0?te:null,props:I}}function be(k,q){return le(k.type,q,k.props)}function Ae(k){return typeof k=="object"&&k!==null&&k.$$typeof===l}function Ce(k){var q={"=":"=0",":":"=2"};return"$"+k.replace(/[=:]/g,function(I){return q[I]})}var dt=/\/+/g;function ft(k,q){return typeof k=="object"&&k!==null&&k.key!=null?Ce(""+k.key):q.toString(36)}function re(k){switch(k.status){case"fulfilled":return k.value;case"rejected":throw k.reason;default:switch(typeof k.status=="string"?k.then(W,W):(k.status="pending",k.then(function(q){k.status==="pending"&&(k.status="fulfilled",k.value=q)},function(q){k.status==="pending"&&(k.status="rejected",k.reason=q)})),k.status){case"fulfilled":return k.value;case"rejected":throw k.reason}}throw k}function R(k,q,I,te,de){var he=typeof k;(he==="undefined"||he==="boolean")&&(k=null);var Re=!1;if(k===null)Re=!0;else switch(he){case"bigint":case"string":case"number":Re=!0;break;case"object":switch(k.$$typeof){case l:case r:Re=!0;break;case x:return Re=k._init,R(Re(k._payload),q,I,te,de)}}if(Re)return de=de(k),Re=te===""?"."+ft(k,0):te,V(de)?(I="",Re!=null&&(I=Re.replace(dt,"$&/")+"/"),R(de,q,I,"",function(On){return On})):de!=null&&(Ae(de)&&(de=be(de,I+(de.key==null||k&&k.key===de.key?"":(""+de.key).replace(dt,"$&/")+"/")+Re)),q.push(de)),1;Re=0;var et=te===""?".":te+":";if(V(k))for(var Ue=0;Ue<k.length;Ue++)te=k[Ue],he=et+ft(te,Ue),Re+=R(te,q,I,he,de);else if(Ue=A(k),typeof Ue=="function")for(k=Ue.call(k),Ue=0;!(te=k.next()).done;)te=te.value,he=et+ft(te,Ue++),Re+=R(te,q,I,he,de);else if(he==="object"){if(typeof k.then=="function")return R(re(k),q,I,te,de);throw q=String(k),Error("Objects are not valid as a React child (found: "+(q==="[object Object]"?"object with keys {"+Object.keys(k).join(", ")+"}":q)+"). If you meant to render a collection of children, use an array instead.")}return Re}function F(k,q,I){if(k==null)return k;var te=[],de=0;return R(k,te,"","",function(he){return q.call(I,he,de++)}),te}function ee(k){if(k._status===-1){var q=k._result;q=q(),q.then(function(I){(k._status===0||k._status===-1)&&(k._status=1,k._result=I)},function(I){(k._status===0||k._status===-1)&&(k._status=2,k._result=I)}),k._status===-1&&(k._status=0,k._result=q)}if(k._status===1)return k._result.default;throw k._result}var fe=typeof reportError=="function"?reportError:function(k){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var q=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof k=="object"&&k!==null&&typeof k.message=="string"?String(k.message):String(k),error:k});if(!window.dispatchEvent(q))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",k);return}console.error(k)},Te={map:F,forEach:function(k,q,I){F(k,function(){q.apply(this,arguments)},I)},count:function(k){var q=0;return F(k,function(){q++}),q},toArray:function(k){return F(k,function(q){return q})||[]},only:function(k){if(!Ae(k))throw Error("React.Children.only expected to receive a single React element child.");return k}};return me.Activity=S,me.Children=Te,me.Component=O,me.Fragment=u,me.Profiler=d,me.PureComponent=K,me.StrictMode=c,me.Suspense=g,me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Z,me.__COMPILER_RUNTIME={__proto__:null,c:function(k){return Z.H.useMemoCache(k)}},me.cache=function(k){return function(){return k.apply(null,arguments)}},me.cacheSignal=function(){return null},me.cloneElement=function(k,q,I){if(k==null)throw Error("The argument must be a React element, but you passed "+k+".");var te=N({},k.props),de=k.key;if(q!=null)for(he in q.key!==void 0&&(de=""+q.key),q)!ce.call(q,he)||he==="key"||he==="__self"||he==="__source"||he==="ref"&&q.ref===void 0||(te[he]=q[he]);var he=arguments.length-2;if(he===1)te.children=I;else if(1<he){for(var Re=Array(he),et=0;et<he;et++)Re[et]=arguments[et+2];te.children=Re}return le(k.type,de,te)},me.createContext=function(k){return k={$$typeof:h,_currentValue:k,_currentValue2:k,_threadCount:0,Provider:null,Consumer:null},k.Provider=k,k.Consumer={$$typeof:m,_context:k},k},me.createElement=function(k,q,I){var te,de={},he=null;if(q!=null)for(te in q.key!==void 0&&(he=""+q.key),q)ce.call(q,te)&&te!=="key"&&te!=="__self"&&te!=="__source"&&(de[te]=q[te]);var Re=arguments.length-2;if(Re===1)de.children=I;else if(1<Re){for(var et=Array(Re),Ue=0;Ue<Re;Ue++)et[Ue]=arguments[Ue+2];de.children=et}if(k&&k.defaultProps)for(te in Re=k.defaultProps,Re)de[te]===void 0&&(de[te]=Re[te]);return le(k,he,de)},me.createRef=function(){return{current:null}},me.forwardRef=function(k){return{$$typeof:v,render:k}},me.isValidElement=Ae,me.lazy=function(k){return{$$typeof:x,_payload:{_status:-1,_result:k},_init:ee}},me.memo=function(k,q){return{$$typeof:p,type:k,compare:q===void 0?null:q}},me.startTransition=function(k){var q=Z.T,I={};Z.T=I;try{var te=k(),de=Z.S;de!==null&&de(I,te),typeof te=="object"&&te!==null&&typeof te.then=="function"&&te.then(W,fe)}catch(he){fe(he)}finally{q!==null&&I.types!==null&&(q.types=I.types),Z.T=q}},me.unstable_useCacheRefresh=function(){return Z.H.useCacheRefresh()},me.use=function(k){return Z.H.use(k)},me.useActionState=function(k,q,I){return Z.H.useActionState(k,q,I)},me.useCallback=function(k,q){return Z.H.useCallback(k,q)},me.useContext=function(k){return Z.H.useContext(k)},me.useDebugValue=function(){},me.useDeferredValue=function(k,q){return Z.H.useDeferredValue(k,q)},me.useEffect=function(k,q){return Z.H.useEffect(k,q)},me.useEffectEvent=function(k){return Z.H.useEffectEvent(k)},me.useId=function(){return Z.H.useId()},me.useImperativeHandle=function(k,q,I){return Z.H.useImperativeHandle(k,q,I)},me.useInsertionEffect=function(k,q){return Z.H.useInsertionEffect(k,q)},me.useLayoutEffect=function(k,q){return Z.H.useLayoutEffect(k,q)},me.useMemo=function(k,q){return Z.H.useMemo(k,q)},me.useOptimistic=function(k,q){return Z.H.useOptimistic(k,q)},me.useReducer=function(k,q,I){return Z.H.useReducer(k,q,I)},me.useRef=function(k){return Z.H.useRef(k)},me.useState=function(k){return Z.H.useState(k)},me.useSyncExternalStore=function(k,q,I){return Z.H.useSyncExternalStore(k,q,I)},me.useTransition=function(){return Z.H.useTransition()},me.version="19.2.0",me}var ig;function Dd(){return ig||(ig=1,Ic.exports=Tb()),Ic.exports}var z=Dd();const ul=Pg(z);var ed={exports:{}},cr={},td={exports:{}},nd={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rg;function Db(){return rg||(rg=1,(function(l){function r(R,F){var ee=R.length;R.push(F);e:for(;0<ee;){var fe=ee-1>>>1,Te=R[fe];if(0<d(Te,F))R[fe]=F,R[ee]=Te,ee=fe;else break e}}function u(R){return R.length===0?null:R[0]}function c(R){if(R.length===0)return null;var F=R[0],ee=R.pop();if(ee!==F){R[0]=ee;e:for(var fe=0,Te=R.length,k=Te>>>1;fe<k;){var q=2*(fe+1)-1,I=R[q],te=q+1,de=R[te];if(0>d(I,ee))te<Te&&0>d(de,I)?(R[fe]=de,R[te]=ee,fe=te):(R[fe]=I,R[q]=ee,fe=q);else if(te<Te&&0>d(de,ee))R[fe]=de,R[te]=ee,fe=te;else break e}}return F}function d(R,F){var ee=R.sortIndex-F.sortIndex;return ee!==0?ee:R.id-F.id}if(l.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var m=performance;l.unstable_now=function(){return m.now()}}else{var h=Date,v=h.now();l.unstable_now=function(){return h.now()-v}}var g=[],p=[],x=1,S=null,C=3,A=!1,U=!1,N=!1,L=!1,O=typeof setTimeout=="function"?setTimeout:null,B=typeof clearTimeout=="function"?clearTimeout:null,K=typeof setImmediate<"u"?setImmediate:null;function j(R){for(var F=u(p);F!==null;){if(F.callback===null)c(p);else if(F.startTime<=R)c(p),F.sortIndex=F.expirationTime,r(g,F);else break;F=u(p)}}function V(R){if(N=!1,j(R),!U)if(u(g)!==null)U=!0,W||(W=!0,Ce());else{var F=u(p);F!==null&&re(V,F.startTime-R)}}var W=!1,Z=-1,ce=5,le=-1;function be(){return L?!0:!(l.unstable_now()-le<ce)}function Ae(){if(L=!1,W){var R=l.unstable_now();le=R;var F=!0;try{e:{U=!1,N&&(N=!1,B(Z),Z=-1),A=!0;var ee=C;try{t:{for(j(R),S=u(g);S!==null&&!(S.expirationTime>R&&be());){var fe=S.callback;if(typeof fe=="function"){S.callback=null,C=S.priorityLevel;var Te=fe(S.expirationTime<=R);if(R=l.unstable_now(),typeof Te=="function"){S.callback=Te,j(R),F=!0;break t}S===u(g)&&c(g),j(R)}else c(g);S=u(g)}if(S!==null)F=!0;else{var k=u(p);k!==null&&re(V,k.startTime-R),F=!1}}break e}finally{S=null,C=ee,A=!1}F=void 0}}finally{F?Ce():W=!1}}}var Ce;if(typeof K=="function")Ce=function(){K(Ae)};else if(typeof MessageChannel<"u"){var dt=new MessageChannel,ft=dt.port2;dt.port1.onmessage=Ae,Ce=function(){ft.postMessage(null)}}else Ce=function(){O(Ae,0)};function re(R,F){Z=O(function(){R(l.unstable_now())},F)}l.unstable_IdlePriority=5,l.unstable_ImmediatePriority=1,l.unstable_LowPriority=4,l.unstable_NormalPriority=3,l.unstable_Profiling=null,l.unstable_UserBlockingPriority=2,l.unstable_cancelCallback=function(R){R.callback=null},l.unstable_forceFrameRate=function(R){0>R||125<R?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ce=0<R?Math.floor(1e3/R):5},l.unstable_getCurrentPriorityLevel=function(){return C},l.unstable_next=function(R){switch(C){case 1:case 2:case 3:var F=3;break;default:F=C}var ee=C;C=F;try{return R()}finally{C=ee}},l.unstable_requestPaint=function(){L=!0},l.unstable_runWithPriority=function(R,F){switch(R){case 1:case 2:case 3:case 4:case 5:break;default:R=3}var ee=C;C=R;try{return F()}finally{C=ee}},l.unstable_scheduleCallback=function(R,F,ee){var fe=l.unstable_now();switch(typeof ee=="object"&&ee!==null?(ee=ee.delay,ee=typeof ee=="number"&&0<ee?fe+ee:fe):ee=fe,R){case 1:var Te=-1;break;case 2:Te=250;break;case 5:Te=1073741823;break;case 4:Te=1e4;break;default:Te=5e3}return Te=ee+Te,R={id:x++,callback:F,priorityLevel:R,startTime:ee,expirationTime:Te,sortIndex:-1},ee>fe?(R.sortIndex=ee,r(p,R),u(g)===null&&R===u(p)&&(N?(B(Z),Z=-1):N=!0,re(V,ee-fe))):(R.sortIndex=Te,r(g,R),U||A||(U=!0,W||(W=!0,Ce()))),R},l.unstable_shouldYield=be,l.unstable_wrapCallback=function(R){var F=C;return function(){var ee=C;C=F;try{return R.apply(this,arguments)}finally{C=ee}}}})(nd)),nd}var og;function Mb(){return og||(og=1,td.exports=Db()),td.exports}var ad={exports:{}},Ct={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var sg;function Ob(){if(sg)return Ct;sg=1;var l=Dd();function r(g){var p="https://react.dev/errors/"+g;if(1<arguments.length){p+="?args[]="+encodeURIComponent(arguments[1]);for(var x=2;x<arguments.length;x++)p+="&args[]="+encodeURIComponent(arguments[x])}return"Minified React error #"+g+"; visit "+p+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function u(){}var c={d:{f:u,r:function(){throw Error(r(522))},D:u,C:u,L:u,m:u,X:u,S:u,M:u},p:0,findDOMNode:null},d=Symbol.for("react.portal");function m(g,p,x){var S=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:d,key:S==null?null:""+S,children:g,containerInfo:p,implementation:x}}var h=l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function v(g,p){if(g==="font")return"";if(typeof p=="string")return p==="use-credentials"?p:""}return Ct.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=c,Ct.createPortal=function(g,p){var x=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!p||p.nodeType!==1&&p.nodeType!==9&&p.nodeType!==11)throw Error(r(299));return m(g,p,null,x)},Ct.flushSync=function(g){var p=h.T,x=c.p;try{if(h.T=null,c.p=2,g)return g()}finally{h.T=p,c.p=x,c.d.f()}},Ct.preconnect=function(g,p){typeof g=="string"&&(p?(p=p.crossOrigin,p=typeof p=="string"?p==="use-credentials"?p:"":void 0):p=null,c.d.C(g,p))},Ct.prefetchDNS=function(g){typeof g=="string"&&c.d.D(g)},Ct.preinit=function(g,p){if(typeof g=="string"&&p&&typeof p.as=="string"){var x=p.as,S=v(x,p.crossOrigin),C=typeof p.integrity=="string"?p.integrity:void 0,A=typeof p.fetchPriority=="string"?p.fetchPriority:void 0;x==="style"?c.d.S(g,typeof p.precedence=="string"?p.precedence:void 0,{crossOrigin:S,integrity:C,fetchPriority:A}):x==="script"&&c.d.X(g,{crossOrigin:S,integrity:C,fetchPriority:A,nonce:typeof p.nonce=="string"?p.nonce:void 0})}},Ct.preinitModule=function(g,p){if(typeof g=="string")if(typeof p=="object"&&p!==null){if(p.as==null||p.as==="script"){var x=v(p.as,p.crossOrigin);c.d.M(g,{crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0})}}else p==null&&c.d.M(g)},Ct.preload=function(g,p){if(typeof g=="string"&&typeof p=="object"&&p!==null&&typeof p.as=="string"){var x=p.as,S=v(x,p.crossOrigin);c.d.L(g,x,{crossOrigin:S,integrity:typeof p.integrity=="string"?p.integrity:void 0,nonce:typeof p.nonce=="string"?p.nonce:void 0,type:typeof p.type=="string"?p.type:void 0,fetchPriority:typeof p.fetchPriority=="string"?p.fetchPriority:void 0,referrerPolicy:typeof p.referrerPolicy=="string"?p.referrerPolicy:void 0,imageSrcSet:typeof p.imageSrcSet=="string"?p.imageSrcSet:void 0,imageSizes:typeof p.imageSizes=="string"?p.imageSizes:void 0,media:typeof p.media=="string"?p.media:void 0})}},Ct.preloadModule=function(g,p){if(typeof g=="string")if(p){var x=v(p.as,p.crossOrigin);c.d.m(g,{as:typeof p.as=="string"&&p.as!=="script"?p.as:void 0,crossOrigin:x,integrity:typeof p.integrity=="string"?p.integrity:void 0})}else c.d.m(g)},Ct.requestFormReset=function(g){c.d.r(g)},Ct.unstable_batchedUpdates=function(g,p){return g(p)},Ct.useFormState=function(g,p,x){return h.H.useFormState(g,p,x)},Ct.useFormStatus=function(){return h.H.useHostTransitionStatus()},Ct.version="19.2.0",Ct}var ug;function _b(){if(ug)return ad.exports;ug=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(r){console.error(r)}}return l(),ad.exports=Ob(),ad.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var cg;function Nb(){if(cg)return cr;cg=1;var l=Mb(),r=Dd(),u=_b();function c(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function d(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function m(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function h(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function v(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function g(e){if(m(e)!==e)throw Error(c(188))}function p(e){var t=e.alternate;if(!t){if(t=m(e),t===null)throw Error(c(188));return t!==e?null:e}for(var n=e,a=t;;){var i=n.return;if(i===null)break;var o=i.alternate;if(o===null){if(a=i.return,a!==null){n=a;continue}break}if(i.child===o.child){for(o=i.child;o;){if(o===n)return g(i),e;if(o===a)return g(i),t;o=o.sibling}throw Error(c(188))}if(n.return!==a.return)n=i,a=o;else{for(var f=!1,y=i.child;y;){if(y===n){f=!0,n=i,a=o;break}if(y===a){f=!0,a=i,n=o;break}y=y.sibling}if(!f){for(y=o.child;y;){if(y===n){f=!0,n=o,a=i;break}if(y===a){f=!0,a=o,n=i;break}y=y.sibling}if(!f)throw Error(c(189))}}if(n.alternate!==a)throw Error(c(190))}if(n.tag!==3)throw Error(c(188));return n.stateNode.current===n?e:t}function x(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=x(e),t!==null)return t;e=e.sibling}return null}var S=Object.assign,C=Symbol.for("react.element"),A=Symbol.for("react.transitional.element"),U=Symbol.for("react.portal"),N=Symbol.for("react.fragment"),L=Symbol.for("react.strict_mode"),O=Symbol.for("react.profiler"),B=Symbol.for("react.consumer"),K=Symbol.for("react.context"),j=Symbol.for("react.forward_ref"),V=Symbol.for("react.suspense"),W=Symbol.for("react.suspense_list"),Z=Symbol.for("react.memo"),ce=Symbol.for("react.lazy"),le=Symbol.for("react.activity"),be=Symbol.for("react.memo_cache_sentinel"),Ae=Symbol.iterator;function Ce(e){return e===null||typeof e!="object"?null:(e=Ae&&e[Ae]||e["@@iterator"],typeof e=="function"?e:null)}var dt=Symbol.for("react.client.reference");function ft(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===dt?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case N:return"Fragment";case O:return"Profiler";case L:return"StrictMode";case V:return"Suspense";case W:return"SuspenseList";case le:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case U:return"Portal";case K:return e.displayName||"Context";case B:return(e._context.displayName||"Context")+".Consumer";case j:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Z:return t=e.displayName||null,t!==null?t:ft(e.type)||"Memo";case ce:t=e._payload,e=e._init;try{return ft(e(t))}catch{}}return null}var re=Array.isArray,R=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,F=u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ee={pending:!1,data:null,method:null,action:null},fe=[],Te=-1;function k(e){return{current:e}}function q(e){0>Te||(e.current=fe[Te],fe[Te]=null,Te--)}function I(e,t){Te++,fe[Te]=e.current,e.current=t}var te=k(null),de=k(null),he=k(null),Re=k(null);function et(e,t){switch(I(he,t),I(de,e),I(te,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?wp(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=wp(t),e=kp(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}q(te),I(te,e)}function Ue(){q(te),q(de),q(he)}function On(e){e.memoizedState!==null&&I(Re,e);var t=te.current,n=kp(t,e.type);t!==n&&(I(de,e),I(te,n))}function _n(e){de.current===e&&(q(te),q(de)),Re.current===e&&(q(Re),ir._currentValue=ee)}var nn,ef;function Ga(e){if(nn===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);nn=t&&t[1]||"",ef=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+nn+e+ef}var _s=!1;function Ns(e,t){if(!e||_s)return"";_s=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var a={DetermineComponentFrameRoot:function(){try{if(t){var X=function(){throw Error()};if(Object.defineProperty(X.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(X,[])}catch(G){var _=G}Reflect.construct(e,[],X)}else{try{X.call()}catch(G){_=G}e.call(X.prototype)}}else{try{throw Error()}catch(G){_=G}(X=e())&&typeof X.catch=="function"&&X.catch(function(){})}}catch(G){if(G&&_&&typeof G.stack=="string")return[G.stack,_.stack]}return[null,null]}};a.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var i=Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot,"name");i&&i.configurable&&Object.defineProperty(a.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var o=a.DetermineComponentFrameRoot(),f=o[0],y=o[1];if(f&&y){var $=f.split(`
`),M=y.split(`
`);for(i=a=0;a<$.length&&!$[a].includes("DetermineComponentFrameRoot");)a++;for(;i<M.length&&!M[i].includes("DetermineComponentFrameRoot");)i++;if(a===$.length||i===M.length)for(a=$.length-1,i=M.length-1;1<=a&&0<=i&&$[a]!==M[i];)i--;for(;1<=a&&0<=i;a--,i--)if($[a]!==M[i]){if(a!==1||i!==1)do if(a--,i--,0>i||$[a]!==M[i]){var H=`
`+$[a].replace(" at new "," at ");return e.displayName&&H.includes("<anonymous>")&&(H=H.replace("<anonymous>",e.displayName)),H}while(1<=a&&0<=i);break}}}finally{_s=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Ga(n):""}function r0(e,t){switch(e.tag){case 26:case 27:case 5:return Ga(e.type);case 16:return Ga("Lazy");case 13:return e.child!==t&&t!==null?Ga("Suspense Fallback"):Ga("Suspense");case 19:return Ga("SuspenseList");case 0:case 15:return Ns(e.type,!1);case 11:return Ns(e.type.render,!1);case 1:return Ns(e.type,!0);case 31:return Ga("Activity");default:return""}}function tf(e){try{var t="",n=null;do t+=r0(e,n),n=e,e=e.return;while(e);return t}catch(a){return`
Error generating stack: `+a.message+`
`+a.stack}}var Us=Object.prototype.hasOwnProperty,Gs=l.unstable_scheduleCallback,Ls=l.unstable_cancelCallback,o0=l.unstable_shouldYield,s0=l.unstable_requestPaint,Yt=l.unstable_now,u0=l.unstable_getCurrentPriorityLevel,nf=l.unstable_ImmediatePriority,af=l.unstable_UserBlockingPriority,Ar=l.unstable_NormalPriority,c0=l.unstable_LowPriority,lf=l.unstable_IdlePriority,d0=l.log,f0=l.unstable_setDisableYieldValue,yi=null,qt=null;function ia(e){if(typeof d0=="function"&&f0(e),qt&&typeof qt.setStrictMode=="function")try{qt.setStrictMode(yi,e)}catch{}}var Qt=Math.clz32?Math.clz32:p0,m0=Math.log,h0=Math.LN2;function p0(e){return e>>>=0,e===0?32:31-(m0(e)/h0|0)|0}var Tr=256,Dr=262144,Mr=4194304;function La(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Or(e,t,n){var a=e.pendingLanes;if(a===0)return 0;var i=0,o=e.suspendedLanes,f=e.pingedLanes;e=e.warmLanes;var y=a&134217727;return y!==0?(a=y&~o,a!==0?i=La(a):(f&=y,f!==0?i=La(f):n||(n=y&~e,n!==0&&(i=La(n))))):(y=a&~o,y!==0?i=La(y):f!==0?i=La(f):n||(n=a&~e,n!==0&&(i=La(n)))),i===0?0:t!==0&&t!==i&&(t&o)===0&&(o=i&-i,n=t&-t,o>=n||o===32&&(n&4194048)!==0)?t:i}function vi(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function g0(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function rf(){var e=Mr;return Mr<<=1,(Mr&62914560)===0&&(Mr=4194304),e}function Hs(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function bi(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function y0(e,t,n,a,i,o){var f=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var y=e.entanglements,$=e.expirationTimes,M=e.hiddenUpdates;for(n=f&~n;0<n;){var H=31-Qt(n),X=1<<H;y[H]=0,$[H]=-1;var _=M[H];if(_!==null)for(M[H]=null,H=0;H<_.length;H++){var G=_[H];G!==null&&(G.lane&=-536870913)}n&=~X}a!==0&&of(e,a,0),o!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=o&~(f&~t))}function of(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var a=31-Qt(t);e.entangledLanes|=t,e.entanglements[a]=e.entanglements[a]|1073741824|n&261930}function sf(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var a=31-Qt(n),i=1<<a;i&t|e[a]&t&&(e[a]|=t),n&=~i}}function uf(e,t){var n=t&-t;return n=(n&42)!==0?1:Bs(n),(n&(e.suspendedLanes|t))!==0?0:n}function Bs(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ys(e){return e&=-e,2<e?8<e?(e&134217727)!==0?32:268435456:8:2}function cf(){var e=F.p;return e!==0?e:(e=window.event,e===void 0?32:Jp(e.type))}function df(e,t){var n=F.p;try{return F.p=e,t()}finally{F.p=n}}var ra=Math.random().toString(36).slice(2),vt="__reactFiber$"+ra,Tt="__reactProps$"+ra,pl="__reactContainer$"+ra,qs="__reactEvents$"+ra,v0="__reactListeners$"+ra,b0="__reactHandles$"+ra,ff="__reactResources$"+ra,xi="__reactMarker$"+ra;function Qs(e){delete e[vt],delete e[Tt],delete e[qs],delete e[v0],delete e[b0]}function gl(e){var t=e[vt];if(t)return t;for(var n=e.parentNode;n;){if(t=n[pl]||n[vt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Mp(e);e!==null;){if(n=e[vt])return n;e=Mp(e)}return t}e=n,n=e.parentNode}return null}function yl(e){if(e=e[vt]||e[pl]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Si(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(c(33))}function vl(e){var t=e[ff];return t||(t=e[ff]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function mt(e){e[xi]=!0}var mf=new Set,hf={};function Ha(e,t){bl(e,t),bl(e+"Capture",t)}function bl(e,t){for(hf[e]=t,e=0;e<t.length;e++)mf.add(t[e])}var x0=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),pf={},gf={};function S0(e){return Us.call(gf,e)?!0:Us.call(pf,e)?!1:x0.test(e)?gf[e]=!0:(pf[e]=!0,!1)}function _r(e,t,n){if(S0(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var a=t.toLowerCase().slice(0,5);if(a!=="data-"&&a!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function Nr(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function Nn(e,t,n,a){if(a===null)e.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+a)}}function an(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function yf(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function $0(e,t,n){var a=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof a<"u"&&typeof a.get=="function"&&typeof a.set=="function"){var i=a.get,o=a.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(f){n=""+f,o.call(this,f)}}),Object.defineProperty(e,t,{enumerable:a.enumerable}),{getValue:function(){return n},setValue:function(f){n=""+f},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Xs(e){if(!e._valueTracker){var t=yf(e)?"checked":"value";e._valueTracker=$0(e,t,""+e[t])}}function vf(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),a="";return e&&(a=yf(e)?e.checked?"true":"false":e.value),e=a,e!==n?(t.setValue(e),!0):!1}function Ur(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var C0=/[\n"\\]/g;function ln(e){return e.replace(C0,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function Vs(e,t,n,a,i,o,f,y){e.name="",f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"?e.type=f:e.removeAttribute("type"),t!=null?f==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+an(t)):e.value!==""+an(t)&&(e.value=""+an(t)):f!=="submit"&&f!=="reset"||e.removeAttribute("value"),t!=null?Zs(e,f,an(t)):n!=null?Zs(e,f,an(n)):a!=null&&e.removeAttribute("value"),i==null&&o!=null&&(e.defaultChecked=!!o),i!=null&&(e.checked=i&&typeof i!="function"&&typeof i!="symbol"),y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?e.name=""+an(y):e.removeAttribute("name")}function bf(e,t,n,a,i,o,f,y){if(o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"&&(e.type=o),t!=null||n!=null){if(!(o!=="submit"&&o!=="reset"||t!=null)){Xs(e);return}n=n!=null?""+an(n):"",t=t!=null?""+an(t):n,y||t===e.value||(e.value=t),e.defaultValue=t}a=a??i,a=typeof a!="function"&&typeof a!="symbol"&&!!a,e.checked=y?e.checked:!!a,e.defaultChecked=!!a,f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(e.name=f),Xs(e)}function Zs(e,t,n){t==="number"&&Ur(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function xl(e,t,n,a){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&a&&(e[n].defaultSelected=!0)}else{for(n=""+an(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,a&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function xf(e,t,n){if(t!=null&&(t=""+an(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+an(n):""}function Sf(e,t,n,a){if(t==null){if(a!=null){if(n!=null)throw Error(c(92));if(re(a)){if(1<a.length)throw Error(c(93));a=a[0]}n=a}n==null&&(n=""),t=n}n=an(t),e.defaultValue=n,a=e.textContent,a===n&&a!==""&&a!==null&&(e.value=a),Xs(e)}function Sl(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var j0=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function $f(e,t,n){var a=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?a?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":a?e.setProperty(t,n):typeof n!="number"||n===0||j0.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function Cf(e,t,n){if(t!=null&&typeof t!="object")throw Error(c(62));if(e=e.style,n!=null){for(var a in n)!n.hasOwnProperty(a)||t!=null&&t.hasOwnProperty(a)||(a.indexOf("--")===0?e.setProperty(a,""):a==="float"?e.cssFloat="":e[a]="");for(var i in t)a=t[i],t.hasOwnProperty(i)&&n[i]!==a&&$f(e,i,a)}else for(var o in t)t.hasOwnProperty(o)&&$f(e,o,t[o])}function Ks(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var w0=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),k0=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Gr(e){return k0.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Un(){}var Js=null;function Fs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var $l=null,Cl=null;function jf(e){var t=yl(e);if(t&&(e=t.stateNode)){var n=e[Tt]||null;e:switch(e=t.stateNode,t.type){case"input":if(Vs(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+ln(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var a=n[t];if(a!==e&&a.form===e.form){var i=a[Tt]||null;if(!i)throw Error(c(90));Vs(a,i.value,i.defaultValue,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name)}}for(t=0;t<n.length;t++)a=n[t],a.form===e.form&&vf(a)}break e;case"textarea":xf(e,n.value,n.defaultValue);break e;case"select":t=n.value,t!=null&&xl(e,!!n.multiple,t,!1)}}}var Ws=!1;function wf(e,t,n){if(Ws)return e(t,n);Ws=!0;try{var a=e(t);return a}finally{if(Ws=!1,($l!==null||Cl!==null)&&(ko(),$l&&(t=$l,e=Cl,Cl=$l=null,jf(t),e)))for(t=0;t<e.length;t++)jf(e[t])}}function $i(e,t){var n=e.stateNode;if(n===null)return null;var a=n[Tt]||null;if(a===null)return null;n=a[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(c(231,t,typeof n));return n}var Gn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ps=!1;if(Gn)try{var Ci={};Object.defineProperty(Ci,"passive",{get:function(){Ps=!0}}),window.addEventListener("test",Ci,Ci),window.removeEventListener("test",Ci,Ci)}catch{Ps=!1}var oa=null,Is=null,Lr=null;function kf(){if(Lr)return Lr;var e,t=Is,n=t.length,a,i="value"in oa?oa.value:oa.textContent,o=i.length;for(e=0;e<n&&t[e]===i[e];e++);var f=n-e;for(a=1;a<=f&&t[n-a]===i[o-a];a++);return Lr=i.slice(e,1<a?1-a:void 0)}function Hr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Br(){return!0}function Rf(){return!1}function Dt(e){function t(n,a,i,o,f){this._reactName=n,this._targetInst=i,this.type=a,this.nativeEvent=o,this.target=f,this.currentTarget=null;for(var y in e)e.hasOwnProperty(y)&&(n=e[y],this[y]=n?n(o):o[y]);return this.isDefaultPrevented=(o.defaultPrevented!=null?o.defaultPrevented:o.returnValue===!1)?Br:Rf,this.isPropagationStopped=Rf,this}return S(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Br)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Br)},persist:function(){},isPersistent:Br}),t}var Ba={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Yr=Dt(Ba),ji=S({},Ba,{view:0,detail:0}),R0=Dt(ji),eu,tu,wi,qr=S({},ji,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:au,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==wi&&(wi&&e.type==="mousemove"?(eu=e.screenX-wi.screenX,tu=e.screenY-wi.screenY):tu=eu=0,wi=e),eu)},movementY:function(e){return"movementY"in e?e.movementY:tu}}),Ef=Dt(qr),E0=S({},qr,{dataTransfer:0}),z0=Dt(E0),A0=S({},ji,{relatedTarget:0}),nu=Dt(A0),T0=S({},Ba,{animationName:0,elapsedTime:0,pseudoElement:0}),D0=Dt(T0),M0=S({},Ba,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),O0=Dt(M0),_0=S({},Ba,{data:0}),zf=Dt(_0),N0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},U0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},G0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function L0(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=G0[e])?!!t[e]:!1}function au(){return L0}var H0=S({},ji,{key:function(e){if(e.key){var t=N0[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Hr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?U0[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:au,charCode:function(e){return e.type==="keypress"?Hr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Hr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),B0=Dt(H0),Y0=S({},qr,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Af=Dt(Y0),q0=S({},ji,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:au}),Q0=Dt(q0),X0=S({},Ba,{propertyName:0,elapsedTime:0,pseudoElement:0}),V0=Dt(X0),Z0=S({},qr,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),K0=Dt(Z0),J0=S({},Ba,{newState:0,oldState:0}),F0=Dt(J0),W0=[9,13,27,32],lu=Gn&&"CompositionEvent"in window,ki=null;Gn&&"documentMode"in document&&(ki=document.documentMode);var P0=Gn&&"TextEvent"in window&&!ki,Tf=Gn&&(!lu||ki&&8<ki&&11>=ki),Df=" ",Mf=!1;function Of(e,t){switch(e){case"keyup":return W0.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function _f(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var jl=!1;function I0(e,t){switch(e){case"compositionend":return _f(t);case"keypress":return t.which!==32?null:(Mf=!0,Df);case"textInput":return e=t.data,e===Df&&Mf?null:e;default:return null}}function ev(e,t){if(jl)return e==="compositionend"||!lu&&Of(e,t)?(e=kf(),Lr=Is=oa=null,jl=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Tf&&t.locale!=="ko"?null:t.data;default:return null}}var tv={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Nf(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!tv[e.type]:t==="textarea"}function Uf(e,t,n,a){$l?Cl?Cl.push(a):Cl=[a]:$l=a,t=Mo(t,"onChange"),0<t.length&&(n=new Yr("onChange","change",null,n,a),e.push({event:n,listeners:t}))}var Ri=null,Ei=null;function nv(e){bp(e,0)}function Qr(e){var t=Si(e);if(vf(t))return e}function Gf(e,t){if(e==="change")return t}var Lf=!1;if(Gn){var iu;if(Gn){var ru="oninput"in document;if(!ru){var Hf=document.createElement("div");Hf.setAttribute("oninput","return;"),ru=typeof Hf.oninput=="function"}iu=ru}else iu=!1;Lf=iu&&(!document.documentMode||9<document.documentMode)}function Bf(){Ri&&(Ri.detachEvent("onpropertychange",Yf),Ei=Ri=null)}function Yf(e){if(e.propertyName==="value"&&Qr(Ei)){var t=[];Uf(t,Ei,e,Fs(e)),wf(nv,t)}}function av(e,t,n){e==="focusin"?(Bf(),Ri=t,Ei=n,Ri.attachEvent("onpropertychange",Yf)):e==="focusout"&&Bf()}function lv(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Qr(Ei)}function iv(e,t){if(e==="click")return Qr(t)}function rv(e,t){if(e==="input"||e==="change")return Qr(t)}function ov(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Xt=typeof Object.is=="function"?Object.is:ov;function zi(e,t){if(Xt(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),a=Object.keys(t);if(n.length!==a.length)return!1;for(a=0;a<n.length;a++){var i=n[a];if(!Us.call(t,i)||!Xt(e[i],t[i]))return!1}return!0}function qf(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Qf(e,t){var n=qf(e);e=0;for(var a;n;){if(n.nodeType===3){if(a=e+n.textContent.length,e<=t&&a>=t)return{node:n,offset:t-e};e=a}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=qf(n)}}function Xf(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Xf(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Vf(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Ur(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Ur(e.document)}return t}function ou(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var sv=Gn&&"documentMode"in document&&11>=document.documentMode,wl=null,su=null,Ai=null,uu=!1;function Zf(e,t,n){var a=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;uu||wl==null||wl!==Ur(a)||(a=wl,"selectionStart"in a&&ou(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Ai&&zi(Ai,a)||(Ai=a,a=Mo(su,"onSelect"),0<a.length&&(t=new Yr("onSelect","select",null,t,n),e.push({event:t,listeners:a}),t.target=wl)))}function Ya(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var kl={animationend:Ya("Animation","AnimationEnd"),animationiteration:Ya("Animation","AnimationIteration"),animationstart:Ya("Animation","AnimationStart"),transitionrun:Ya("Transition","TransitionRun"),transitionstart:Ya("Transition","TransitionStart"),transitioncancel:Ya("Transition","TransitionCancel"),transitionend:Ya("Transition","TransitionEnd")},cu={},Kf={};Gn&&(Kf=document.createElement("div").style,"AnimationEvent"in window||(delete kl.animationend.animation,delete kl.animationiteration.animation,delete kl.animationstart.animation),"TransitionEvent"in window||delete kl.transitionend.transition);function qa(e){if(cu[e])return cu[e];if(!kl[e])return e;var t=kl[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in Kf)return cu[e]=t[n];return e}var Jf=qa("animationend"),Ff=qa("animationiteration"),Wf=qa("animationstart"),uv=qa("transitionrun"),cv=qa("transitionstart"),dv=qa("transitioncancel"),Pf=qa("transitionend"),If=new Map,du="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");du.push("scrollEnd");function xn(e,t){If.set(e,t),Ha(t,[e])}var Xr=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},rn=[],Rl=0,fu=0;function Vr(){for(var e=Rl,t=fu=Rl=0;t<e;){var n=rn[t];rn[t++]=null;var a=rn[t];rn[t++]=null;var i=rn[t];rn[t++]=null;var o=rn[t];if(rn[t++]=null,a!==null&&i!==null){var f=a.pending;f===null?i.next=i:(i.next=f.next,f.next=i),a.pending=i}o!==0&&em(n,i,o)}}function Zr(e,t,n,a){rn[Rl++]=e,rn[Rl++]=t,rn[Rl++]=n,rn[Rl++]=a,fu|=a,e.lanes|=a,e=e.alternate,e!==null&&(e.lanes|=a)}function mu(e,t,n,a){return Zr(e,t,n,a),Kr(e)}function Qa(e,t){return Zr(e,null,null,t),Kr(e)}function em(e,t,n){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n);for(var i=!1,o=e.return;o!==null;)o.childLanes|=n,a=o.alternate,a!==null&&(a.childLanes|=n),o.tag===22&&(e=o.stateNode,e===null||e._visibility&1||(i=!0)),e=o,o=o.return;return e.tag===3?(o=e.stateNode,i&&t!==null&&(i=31-Qt(n),e=o.hiddenUpdates,a=e[i],a===null?e[i]=[t]:a.push(t),t.lane=n|536870912),o):null}function Kr(e){if(50<Pi)throw Pi=0,$c=null,Error(c(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var El={};function fv(e,t,n,a){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Vt(e,t,n,a){return new fv(e,t,n,a)}function hu(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ln(e,t){var n=e.alternate;return n===null?(n=Vt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function tm(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Jr(e,t,n,a,i,o){var f=0;if(a=e,typeof e=="function")hu(e)&&(f=1);else if(typeof e=="string")f=yb(e,n,te.current)?26:e==="html"||e==="head"||e==="body"?27:5;else e:switch(e){case le:return e=Vt(31,n,t,i),e.elementType=le,e.lanes=o,e;case N:return Xa(n.children,i,o,t);case L:f=8,i|=24;break;case O:return e=Vt(12,n,t,i|2),e.elementType=O,e.lanes=o,e;case V:return e=Vt(13,n,t,i),e.elementType=V,e.lanes=o,e;case W:return e=Vt(19,n,t,i),e.elementType=W,e.lanes=o,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case K:f=10;break e;case B:f=9;break e;case j:f=11;break e;case Z:f=14;break e;case ce:f=16,a=null;break e}f=29,n=Error(c(130,e===null?"null":typeof e,"")),a=null}return t=Vt(f,n,t,i),t.elementType=e,t.type=a,t.lanes=o,t}function Xa(e,t,n,a){return e=Vt(7,e,a,t),e.lanes=n,e}function pu(e,t,n){return e=Vt(6,e,null,t),e.lanes=n,e}function nm(e){var t=Vt(18,null,null,0);return t.stateNode=e,t}function gu(e,t,n){return t=Vt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var am=new WeakMap;function on(e,t){if(typeof e=="object"&&e!==null){var n=am.get(e);return n!==void 0?n:(t={value:e,source:t,stack:tf(t)},am.set(e,t),t)}return{value:e,source:t,stack:tf(t)}}var zl=[],Al=0,Fr=null,Ti=0,sn=[],un=0,sa=null,wn=1,kn="";function Hn(e,t){zl[Al++]=Ti,zl[Al++]=Fr,Fr=e,Ti=t}function lm(e,t,n){sn[un++]=wn,sn[un++]=kn,sn[un++]=sa,sa=e;var a=wn;e=kn;var i=32-Qt(a)-1;a&=~(1<<i),n+=1;var o=32-Qt(t)+i;if(30<o){var f=i-i%5;o=(a&(1<<f)-1).toString(32),a>>=f,i-=f,wn=1<<32-Qt(t)+i|n<<i|a,kn=o+e}else wn=1<<o|n<<i|a,kn=e}function yu(e){e.return!==null&&(Hn(e,1),lm(e,1,0))}function vu(e){for(;e===Fr;)Fr=zl[--Al],zl[Al]=null,Ti=zl[--Al],zl[Al]=null;for(;e===sa;)sa=sn[--un],sn[un]=null,kn=sn[--un],sn[un]=null,wn=sn[--un],sn[un]=null}function im(e,t){sn[un++]=wn,sn[un++]=kn,sn[un++]=sa,wn=t.id,kn=t.overflow,sa=e}var bt=null,Qe=null,Ee=!1,ua=null,cn=!1,bu=Error(c(519));function ca(e){var t=Error(c(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Di(on(t,e)),bu}function rm(e){var t=e.stateNode,n=e.type,a=e.memoizedProps;switch(t[vt]=e,t[Tt]=a,n){case"dialog":$e("cancel",t),$e("close",t);break;case"iframe":case"object":case"embed":$e("load",t);break;case"video":case"audio":for(n=0;n<er.length;n++)$e(er[n],t);break;case"source":$e("error",t);break;case"img":case"image":case"link":$e("error",t),$e("load",t);break;case"details":$e("toggle",t);break;case"input":$e("invalid",t),bf(t,a.value,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name,!0);break;case"select":$e("invalid",t);break;case"textarea":$e("invalid",t),Sf(t,a.value,a.defaultValue,a.children)}n=a.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||a.suppressHydrationWarning===!0||Cp(t.textContent,n)?(a.popover!=null&&($e("beforetoggle",t),$e("toggle",t)),a.onScroll!=null&&$e("scroll",t),a.onScrollEnd!=null&&$e("scrollend",t),a.onClick!=null&&(t.onclick=Un),t=!0):t=!1,t||ca(e,!0)}function om(e){for(bt=e.return;bt;)switch(bt.tag){case 5:case 31:case 13:cn=!1;return;case 27:case 3:cn=!0;return;default:bt=bt.return}}function Tl(e){if(e!==bt)return!1;if(!Ee)return om(e),Ee=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Uc(e.type,e.memoizedProps)),n=!n),n&&Qe&&ca(e),om(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));Qe=Dp(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(317));Qe=Dp(e)}else t===27?(t=Qe,ja(e.type)?(e=Yc,Yc=null,Qe=e):Qe=t):Qe=bt?fn(e.stateNode.nextSibling):null;return!0}function Va(){Qe=bt=null,Ee=!1}function xu(){var e=ua;return e!==null&&(Nt===null?Nt=e:Nt.push.apply(Nt,e),ua=null),e}function Di(e){ua===null?ua=[e]:ua.push(e)}var Su=k(null),Za=null,Bn=null;function da(e,t,n){I(Su,t._currentValue),t._currentValue=n}function Yn(e){e._currentValue=Su.current,q(Su)}function $u(e,t,n){for(;e!==null;){var a=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,a!==null&&(a.childLanes|=t)):a!==null&&(a.childLanes&t)!==t&&(a.childLanes|=t),e===n)break;e=e.return}}function Cu(e,t,n,a){var i=e.child;for(i!==null&&(i.return=e);i!==null;){var o=i.dependencies;if(o!==null){var f=i.child;o=o.firstContext;e:for(;o!==null;){var y=o;o=i;for(var $=0;$<t.length;$++)if(y.context===t[$]){o.lanes|=n,y=o.alternate,y!==null&&(y.lanes|=n),$u(o.return,n,e),a||(f=null);break e}o=y.next}}else if(i.tag===18){if(f=i.return,f===null)throw Error(c(341));f.lanes|=n,o=f.alternate,o!==null&&(o.lanes|=n),$u(f,n,e),f=null}else f=i.child;if(f!==null)f.return=i;else for(f=i;f!==null;){if(f===e){f=null;break}if(i=f.sibling,i!==null){i.return=f.return,f=i;break}f=f.return}i=f}}function Dl(e,t,n,a){e=null;for(var i=t,o=!1;i!==null;){if(!o){if((i.flags&524288)!==0)o=!0;else if((i.flags&262144)!==0)break}if(i.tag===10){var f=i.alternate;if(f===null)throw Error(c(387));if(f=f.memoizedProps,f!==null){var y=i.type;Xt(i.pendingProps.value,f.value)||(e!==null?e.push(y):e=[y])}}else if(i===Re.current){if(f=i.alternate,f===null)throw Error(c(387));f.memoizedState.memoizedState!==i.memoizedState.memoizedState&&(e!==null?e.push(ir):e=[ir])}i=i.return}e!==null&&Cu(t,e,n,a),t.flags|=262144}function Wr(e){for(e=e.firstContext;e!==null;){if(!Xt(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ka(e){Za=e,Bn=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function xt(e){return sm(Za,e)}function Pr(e,t){return Za===null&&Ka(e),sm(e,t)}function sm(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Bn===null){if(e===null)throw Error(c(308));Bn=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Bn=Bn.next=t;return n}var mv=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,a){e.push(a)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},hv=l.unstable_scheduleCallback,pv=l.unstable_NormalPriority,lt={$$typeof:K,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function ju(){return{controller:new mv,data:new Map,refCount:0}}function Mi(e){e.refCount--,e.refCount===0&&hv(pv,function(){e.controller.abort()})}var Oi=null,wu=0,Ml=0,Ol=null;function gv(e,t){if(Oi===null){var n=Oi=[];wu=0,Ml=Ec(),Ol={status:"pending",value:void 0,then:function(a){n.push(a)}}}return wu++,t.then(um,um),t}function um(){if(--wu===0&&Oi!==null){Ol!==null&&(Ol.status="fulfilled");var e=Oi;Oi=null,Ml=0,Ol=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function yv(e,t){var n=[],a={status:"pending",value:null,reason:null,then:function(i){n.push(i)}};return e.then(function(){a.status="fulfilled",a.value=t;for(var i=0;i<n.length;i++)(0,n[i])(t)},function(i){for(a.status="rejected",a.reason=i,i=0;i<n.length;i++)(0,n[i])(void 0)}),a}var cm=R.S;R.S=function(e,t){Zh=Yt(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&gv(e,t),cm!==null&&cm(e,t)};var Ja=k(null);function ku(){var e=Ja.current;return e!==null?e:qe.pooledCache}function Ir(e,t){t===null?I(Ja,Ja.current):I(Ja,t.pool)}function dm(){var e=ku();return e===null?null:{parent:lt._currentValue,pool:e}}var _l=Error(c(460)),Ru=Error(c(474)),eo=Error(c(542)),to={then:function(){}};function fm(e){return e=e.status,e==="fulfilled"||e==="rejected"}function mm(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Un,Un),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,pm(e),e;default:if(typeof t.status=="string")t.then(Un,Un);else{if(e=qe,e!==null&&100<e.shellSuspendCounter)throw Error(c(482));e=t,e.status="pending",e.then(function(a){if(t.status==="pending"){var i=t;i.status="fulfilled",i.value=a}},function(a){if(t.status==="pending"){var i=t;i.status="rejected",i.reason=a}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,pm(e),e}throw Wa=t,_l}}function Fa(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Wa=n,_l):n}}var Wa=null;function hm(){if(Wa===null)throw Error(c(459));var e=Wa;return Wa=null,e}function pm(e){if(e===_l||e===eo)throw Error(c(483))}var Nl=null,_i=0;function no(e){var t=_i;return _i+=1,Nl===null&&(Nl=[]),mm(Nl,e,t)}function Ni(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function ao(e,t){throw t.$$typeof===C?Error(c(525)):(e=Object.prototype.toString.call(t),Error(c(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function gm(e){function t(E,w){if(e){var D=E.deletions;D===null?(E.deletions=[w],E.flags|=16):D.push(w)}}function n(E,w){if(!e)return null;for(;w!==null;)t(E,w),w=w.sibling;return null}function a(E){for(var w=new Map;E!==null;)E.key!==null?w.set(E.key,E):w.set(E.index,E),E=E.sibling;return w}function i(E,w){return E=Ln(E,w),E.index=0,E.sibling=null,E}function o(E,w,D){return E.index=D,e?(D=E.alternate,D!==null?(D=D.index,D<w?(E.flags|=67108866,w):D):(E.flags|=67108866,w)):(E.flags|=1048576,w)}function f(E){return e&&E.alternate===null&&(E.flags|=67108866),E}function y(E,w,D,Q){return w===null||w.tag!==6?(w=pu(D,E.mode,Q),w.return=E,w):(w=i(w,D),w.return=E,w)}function $(E,w,D,Q){var ie=D.type;return ie===N?H(E,w,D.props.children,Q,D.key):w!==null&&(w.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===ce&&Fa(ie)===w.type)?(w=i(w,D.props),Ni(w,D),w.return=E,w):(w=Jr(D.type,D.key,D.props,null,E.mode,Q),Ni(w,D),w.return=E,w)}function M(E,w,D,Q){return w===null||w.tag!==4||w.stateNode.containerInfo!==D.containerInfo||w.stateNode.implementation!==D.implementation?(w=gu(D,E.mode,Q),w.return=E,w):(w=i(w,D.children||[]),w.return=E,w)}function H(E,w,D,Q,ie){return w===null||w.tag!==7?(w=Xa(D,E.mode,Q,ie),w.return=E,w):(w=i(w,D),w.return=E,w)}function X(E,w,D){if(typeof w=="string"&&w!==""||typeof w=="number"||typeof w=="bigint")return w=pu(""+w,E.mode,D),w.return=E,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case A:return D=Jr(w.type,w.key,w.props,null,E.mode,D),Ni(D,w),D.return=E,D;case U:return w=gu(w,E.mode,D),w.return=E,w;case ce:return w=Fa(w),X(E,w,D)}if(re(w)||Ce(w))return w=Xa(w,E.mode,D,null),w.return=E,w;if(typeof w.then=="function")return X(E,no(w),D);if(w.$$typeof===K)return X(E,Pr(E,w),D);ao(E,w)}return null}function _(E,w,D,Q){var ie=w!==null?w.key:null;if(typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint")return ie!==null?null:y(E,w,""+D,Q);if(typeof D=="object"&&D!==null){switch(D.$$typeof){case A:return D.key===ie?$(E,w,D,Q):null;case U:return D.key===ie?M(E,w,D,Q):null;case ce:return D=Fa(D),_(E,w,D,Q)}if(re(D)||Ce(D))return ie!==null?null:H(E,w,D,Q,null);if(typeof D.then=="function")return _(E,w,no(D),Q);if(D.$$typeof===K)return _(E,w,Pr(E,D),Q);ao(E,D)}return null}function G(E,w,D,Q,ie){if(typeof Q=="string"&&Q!==""||typeof Q=="number"||typeof Q=="bigint")return E=E.get(D)||null,y(w,E,""+Q,ie);if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case A:return E=E.get(Q.key===null?D:Q.key)||null,$(w,E,Q,ie);case U:return E=E.get(Q.key===null?D:Q.key)||null,M(w,E,Q,ie);case ce:return Q=Fa(Q),G(E,w,D,Q,ie)}if(re(Q)||Ce(Q))return E=E.get(D)||null,H(w,E,Q,ie,null);if(typeof Q.then=="function")return G(E,w,D,no(Q),ie);if(Q.$$typeof===K)return G(E,w,D,Pr(w,Q),ie);ao(w,Q)}return null}function ne(E,w,D,Q){for(var ie=null,De=null,ae=w,ge=w=0,we=null;ae!==null&&ge<D.length;ge++){ae.index>ge?(we=ae,ae=null):we=ae.sibling;var Me=_(E,ae,D[ge],Q);if(Me===null){ae===null&&(ae=we);break}e&&ae&&Me.alternate===null&&t(E,ae),w=o(Me,w,ge),De===null?ie=Me:De.sibling=Me,De=Me,ae=we}if(ge===D.length)return n(E,ae),Ee&&Hn(E,ge),ie;if(ae===null){for(;ge<D.length;ge++)ae=X(E,D[ge],Q),ae!==null&&(w=o(ae,w,ge),De===null?ie=ae:De.sibling=ae,De=ae);return Ee&&Hn(E,ge),ie}for(ae=a(ae);ge<D.length;ge++)we=G(ae,E,ge,D[ge],Q),we!==null&&(e&&we.alternate!==null&&ae.delete(we.key===null?ge:we.key),w=o(we,w,ge),De===null?ie=we:De.sibling=we,De=we);return e&&ae.forEach(function(za){return t(E,za)}),Ee&&Hn(E,ge),ie}function oe(E,w,D,Q){if(D==null)throw Error(c(151));for(var ie=null,De=null,ae=w,ge=w=0,we=null,Me=D.next();ae!==null&&!Me.done;ge++,Me=D.next()){ae.index>ge?(we=ae,ae=null):we=ae.sibling;var za=_(E,ae,Me.value,Q);if(za===null){ae===null&&(ae=we);break}e&&ae&&za.alternate===null&&t(E,ae),w=o(za,w,ge),De===null?ie=za:De.sibling=za,De=za,ae=we}if(Me.done)return n(E,ae),Ee&&Hn(E,ge),ie;if(ae===null){for(;!Me.done;ge++,Me=D.next())Me=X(E,Me.value,Q),Me!==null&&(w=o(Me,w,ge),De===null?ie=Me:De.sibling=Me,De=Me);return Ee&&Hn(E,ge),ie}for(ae=a(ae);!Me.done;ge++,Me=D.next())Me=G(ae,E,ge,Me.value,Q),Me!==null&&(e&&Me.alternate!==null&&ae.delete(Me.key===null?ge:Me.key),w=o(Me,w,ge),De===null?ie=Me:De.sibling=Me,De=Me);return e&&ae.forEach(function(Eb){return t(E,Eb)}),Ee&&Hn(E,ge),ie}function Ye(E,w,D,Q){if(typeof D=="object"&&D!==null&&D.type===N&&D.key===null&&(D=D.props.children),typeof D=="object"&&D!==null){switch(D.$$typeof){case A:e:{for(var ie=D.key;w!==null;){if(w.key===ie){if(ie=D.type,ie===N){if(w.tag===7){n(E,w.sibling),Q=i(w,D.props.children),Q.return=E,E=Q;break e}}else if(w.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===ce&&Fa(ie)===w.type){n(E,w.sibling),Q=i(w,D.props),Ni(Q,D),Q.return=E,E=Q;break e}n(E,w);break}else t(E,w);w=w.sibling}D.type===N?(Q=Xa(D.props.children,E.mode,Q,D.key),Q.return=E,E=Q):(Q=Jr(D.type,D.key,D.props,null,E.mode,Q),Ni(Q,D),Q.return=E,E=Q)}return f(E);case U:e:{for(ie=D.key;w!==null;){if(w.key===ie)if(w.tag===4&&w.stateNode.containerInfo===D.containerInfo&&w.stateNode.implementation===D.implementation){n(E,w.sibling),Q=i(w,D.children||[]),Q.return=E,E=Q;break e}else{n(E,w);break}else t(E,w);w=w.sibling}Q=gu(D,E.mode,Q),Q.return=E,E=Q}return f(E);case ce:return D=Fa(D),Ye(E,w,D,Q)}if(re(D))return ne(E,w,D,Q);if(Ce(D)){if(ie=Ce(D),typeof ie!="function")throw Error(c(150));return D=ie.call(D),oe(E,w,D,Q)}if(typeof D.then=="function")return Ye(E,w,no(D),Q);if(D.$$typeof===K)return Ye(E,w,Pr(E,D),Q);ao(E,D)}return typeof D=="string"&&D!==""||typeof D=="number"||typeof D=="bigint"?(D=""+D,w!==null&&w.tag===6?(n(E,w.sibling),Q=i(w,D),Q.return=E,E=Q):(n(E,w),Q=pu(D,E.mode,Q),Q.return=E,E=Q),f(E)):n(E,w)}return function(E,w,D,Q){try{_i=0;var ie=Ye(E,w,D,Q);return Nl=null,ie}catch(ae){if(ae===_l||ae===eo)throw ae;var De=Vt(29,ae,null,E.mode);return De.lanes=Q,De.return=E,De}finally{}}}var Pa=gm(!0),ym=gm(!1),fa=!1;function Eu(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function zu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ma(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ha(e,t,n){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,(Oe&2)!==0){var i=a.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),a.pending=t,t=Kr(e),em(e,null,n),t}return Zr(e,a,t,n),Kr(e)}function Ui(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,sf(e,n)}}function Au(e,t){var n=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,n===a)){var i=null,o=null;if(n=n.firstBaseUpdate,n!==null){do{var f={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};o===null?i=o=f:o=o.next=f,n=n.next}while(n!==null);o===null?i=o=t:o=o.next=t}else i=o=t;n={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:a.shared,callbacks:a.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Tu=!1;function Gi(){if(Tu){var e=Ol;if(e!==null)throw e}}function Li(e,t,n,a){Tu=!1;var i=e.updateQueue;fa=!1;var o=i.firstBaseUpdate,f=i.lastBaseUpdate,y=i.shared.pending;if(y!==null){i.shared.pending=null;var $=y,M=$.next;$.next=null,f===null?o=M:f.next=M,f=$;var H=e.alternate;H!==null&&(H=H.updateQueue,y=H.lastBaseUpdate,y!==f&&(y===null?H.firstBaseUpdate=M:y.next=M,H.lastBaseUpdate=$))}if(o!==null){var X=i.baseState;f=0,H=M=$=null,y=o;do{var _=y.lane&-536870913,G=_!==y.lane;if(G?(je&_)===_:(a&_)===_){_!==0&&_===Ml&&(Tu=!0),H!==null&&(H=H.next={lane:0,tag:y.tag,payload:y.payload,callback:null,next:null});e:{var ne=e,oe=y;_=t;var Ye=n;switch(oe.tag){case 1:if(ne=oe.payload,typeof ne=="function"){X=ne.call(Ye,X,_);break e}X=ne;break e;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=oe.payload,_=typeof ne=="function"?ne.call(Ye,X,_):ne,_==null)break e;X=S({},X,_);break e;case 2:fa=!0}}_=y.callback,_!==null&&(e.flags|=64,G&&(e.flags|=8192),G=i.callbacks,G===null?i.callbacks=[_]:G.push(_))}else G={lane:_,tag:y.tag,payload:y.payload,callback:y.callback,next:null},H===null?(M=H=G,$=X):H=H.next=G,f|=_;if(y=y.next,y===null){if(y=i.shared.pending,y===null)break;G=y,y=G.next,G.next=null,i.lastBaseUpdate=G,i.shared.pending=null}}while(!0);H===null&&($=X),i.baseState=$,i.firstBaseUpdate=M,i.lastBaseUpdate=H,o===null&&(i.shared.lanes=0),ba|=f,e.lanes=f,e.memoizedState=X}}function vm(e,t){if(typeof e!="function")throw Error(c(191,e));e.call(t)}function bm(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)vm(n[e],t)}var Ul=k(null),lo=k(0);function xm(e,t){e=Wn,I(lo,e),I(Ul,t),Wn=e|t.baseLanes}function Du(){I(lo,Wn),I(Ul,Ul.current)}function Mu(){Wn=lo.current,q(Ul),q(lo)}var Zt=k(null),dn=null;function pa(e){var t=e.alternate;I(tt,tt.current&1),I(Zt,e),dn===null&&(t===null||Ul.current!==null||t.memoizedState!==null)&&(dn=e)}function Ou(e){I(tt,tt.current),I(Zt,e),dn===null&&(dn=e)}function Sm(e){e.tag===22?(I(tt,tt.current),I(Zt,e),dn===null&&(dn=e)):ga()}function ga(){I(tt,tt.current),I(Zt,Zt.current)}function Kt(e){q(Zt),dn===e&&(dn=null),q(tt)}var tt=k(0);function io(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Hc(n)||Bc(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var qn=0,pe=null,He=null,it=null,ro=!1,Gl=!1,Ia=!1,oo=0,Hi=0,Ll=null,vv=0;function We(){throw Error(c(321))}function _u(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Xt(e[n],t[n]))return!1;return!0}function Nu(e,t,n,a,i,o){return qn=o,pe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,R.H=e===null||e.memoizedState===null?lh:Wu,Ia=!1,o=n(a,i),Ia=!1,Gl&&(o=Cm(t,n,a,i)),$m(e),o}function $m(e){R.H=qi;var t=He!==null&&He.next!==null;if(qn=0,it=He=pe=null,ro=!1,Hi=0,Ll=null,t)throw Error(c(300));e===null||rt||(e=e.dependencies,e!==null&&Wr(e)&&(rt=!0))}function Cm(e,t,n,a){pe=e;var i=0;do{if(Gl&&(Ll=null),Hi=0,Gl=!1,25<=i)throw Error(c(301));if(i+=1,it=He=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}R.H=ih,o=t(n,a)}while(Gl);return o}function bv(){var e=R.H,t=e.useState()[0];return t=typeof t.then=="function"?Bi(t):t,e=e.useState()[0],(He!==null?He.memoizedState:null)!==e&&(pe.flags|=1024),t}function Uu(){var e=oo!==0;return oo=0,e}function Gu(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Lu(e){if(ro){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}ro=!1}qn=0,it=He=pe=null,Gl=!1,Hi=oo=0,Ll=null}function kt(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return it===null?pe.memoizedState=it=e:it=it.next=e,it}function nt(){if(He===null){var e=pe.alternate;e=e!==null?e.memoizedState:null}else e=He.next;var t=it===null?pe.memoizedState:it.next;if(t!==null)it=t,He=e;else{if(e===null)throw pe.alternate===null?Error(c(467)):Error(c(310));He=e,e={memoizedState:He.memoizedState,baseState:He.baseState,baseQueue:He.baseQueue,queue:He.queue,next:null},it===null?pe.memoizedState=it=e:it=it.next=e}return it}function so(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Bi(e){var t=Hi;return Hi+=1,Ll===null&&(Ll=[]),e=mm(Ll,e,t),t=pe,(it===null?t.memoizedState:it.next)===null&&(t=t.alternate,R.H=t===null||t.memoizedState===null?lh:Wu),e}function uo(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return Bi(e);if(e.$$typeof===K)return xt(e)}throw Error(c(438,String(e)))}function Hu(e){var t=null,n=pe.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var a=pe.alternate;a!==null&&(a=a.updateQueue,a!==null&&(a=a.memoCache,a!=null&&(t={data:a.data.map(function(i){return i.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=so(),pe.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),a=0;a<e;a++)n[a]=be;return t.index++,n}function Qn(e,t){return typeof t=="function"?t(e):t}function co(e){var t=nt();return Bu(t,He,e)}function Bu(e,t,n){var a=e.queue;if(a===null)throw Error(c(311));a.lastRenderedReducer=n;var i=e.baseQueue,o=a.pending;if(o!==null){if(i!==null){var f=i.next;i.next=o.next,o.next=f}t.baseQueue=i=o,a.pending=null}if(o=e.baseState,i===null)e.memoizedState=o;else{t=i.next;var y=f=null,$=null,M=t,H=!1;do{var X=M.lane&-536870913;if(X!==M.lane?(je&X)===X:(qn&X)===X){var _=M.revertLane;if(_===0)$!==null&&($=$.next={lane:0,revertLane:0,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null}),X===Ml&&(H=!0);else if((qn&_)===_){M=M.next,_===Ml&&(H=!0);continue}else X={lane:0,revertLane:M.revertLane,gesture:null,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},$===null?(y=$=X,f=o):$=$.next=X,pe.lanes|=_,ba|=_;X=M.action,Ia&&n(o,X),o=M.hasEagerState?M.eagerState:n(o,X)}else _={lane:X,revertLane:M.revertLane,gesture:M.gesture,action:M.action,hasEagerState:M.hasEagerState,eagerState:M.eagerState,next:null},$===null?(y=$=_,f=o):$=$.next=_,pe.lanes|=X,ba|=X;M=M.next}while(M!==null&&M!==t);if($===null?f=o:$.next=y,!Xt(o,e.memoizedState)&&(rt=!0,H&&(n=Ol,n!==null)))throw n;e.memoizedState=o,e.baseState=f,e.baseQueue=$,a.lastRenderedState=o}return i===null&&(a.lanes=0),[e.memoizedState,a.dispatch]}function Yu(e){var t=nt(),n=t.queue;if(n===null)throw Error(c(311));n.lastRenderedReducer=e;var a=n.dispatch,i=n.pending,o=t.memoizedState;if(i!==null){n.pending=null;var f=i=i.next;do o=e(o,f.action),f=f.next;while(f!==i);Xt(o,t.memoizedState)||(rt=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,a]}function jm(e,t,n){var a=pe,i=nt(),o=Ee;if(o){if(n===void 0)throw Error(c(407));n=n()}else n=t();var f=!Xt((He||i).memoizedState,n);if(f&&(i.memoizedState=n,rt=!0),i=i.queue,Xu(Rm.bind(null,a,i,e),[e]),i.getSnapshot!==t||f||it!==null&&it.memoizedState.tag&1){if(a.flags|=2048,Hl(9,{destroy:void 0},km.bind(null,a,i,n,t),null),qe===null)throw Error(c(349));o||(qn&127)!==0||wm(a,t,n)}return n}function wm(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=pe.updateQueue,t===null?(t=so(),pe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function km(e,t,n,a){t.value=n,t.getSnapshot=a,Em(t)&&zm(e)}function Rm(e,t,n){return n(function(){Em(t)&&zm(e)})}function Em(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Xt(e,n)}catch{return!0}}function zm(e){var t=Qa(e,2);t!==null&&Ut(t,e,2)}function qu(e){var t=kt();if(typeof e=="function"){var n=e;if(e=n(),Ia){ia(!0);try{n()}finally{ia(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qn,lastRenderedState:e},t}function Am(e,t,n,a){return e.baseState=n,Bu(e,He,typeof a=="function"?a:Qn)}function xv(e,t,n,a,i){if(ho(e))throw Error(c(485));if(e=t.action,e!==null){var o={payload:i,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(f){o.listeners.push(f)}};R.T!==null?n(!0):o.isTransition=!1,a(o),n=t.pending,n===null?(o.next=t.pending=o,Tm(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Tm(e,t){var n=t.action,a=t.payload,i=e.state;if(t.isTransition){var o=R.T,f={};R.T=f;try{var y=n(i,a),$=R.S;$!==null&&$(f,y),Dm(e,t,y)}catch(M){Qu(e,t,M)}finally{o!==null&&f.types!==null&&(o.types=f.types),R.T=o}}else try{o=n(i,a),Dm(e,t,o)}catch(M){Qu(e,t,M)}}function Dm(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(a){Mm(e,t,a)},function(a){return Qu(e,t,a)}):Mm(e,t,n)}function Mm(e,t,n){t.status="fulfilled",t.value=n,Om(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Tm(e,n)))}function Qu(e,t,n){var a=e.pending;if(e.pending=null,a!==null){a=a.next;do t.status="rejected",t.reason=n,Om(t),t=t.next;while(t!==a)}e.action=null}function Om(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function _m(e,t){return t}function Nm(e,t){if(Ee){var n=qe.formState;if(n!==null){e:{var a=pe;if(Ee){if(Qe){t:{for(var i=Qe,o=cn;i.nodeType!==8;){if(!o){i=null;break t}if(i=fn(i.nextSibling),i===null){i=null;break t}}o=i.data,i=o==="F!"||o==="F"?i:null}if(i){Qe=fn(i.nextSibling),a=i.data==="F!";break e}}ca(a)}a=!1}a&&(t=n[0])}}return n=kt(),n.memoizedState=n.baseState=t,a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:_m,lastRenderedState:t},n.queue=a,n=th.bind(null,pe,a),a.dispatch=n,a=qu(!1),o=Fu.bind(null,pe,!1,a.queue),a=kt(),i={state:t,dispatch:null,action:e,pending:null},a.queue=i,n=xv.bind(null,pe,i,o,n),i.dispatch=n,a.memoizedState=e,[t,n,!1]}function Um(e){var t=nt();return Gm(t,He,e)}function Gm(e,t,n){if(t=Bu(e,t,_m)[0],e=co(Qn)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var a=Bi(t)}catch(f){throw f===_l?eo:f}else a=t;t=nt();var i=t.queue,o=i.dispatch;return n!==t.memoizedState&&(pe.flags|=2048,Hl(9,{destroy:void 0},Sv.bind(null,i,n),null)),[a,o,e]}function Sv(e,t){e.action=t}function Lm(e){var t=nt(),n=He;if(n!==null)return Gm(t,n,e);nt(),t=t.memoizedState,n=nt();var a=n.queue.dispatch;return n.memoizedState=e,[t,a,!1]}function Hl(e,t,n,a){return e={tag:e,create:n,deps:a,inst:t,next:null},t=pe.updateQueue,t===null&&(t=so(),pe.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(a=n.next,n.next=e,e.next=a,t.lastEffect=e),e}function Hm(){return nt().memoizedState}function fo(e,t,n,a){var i=kt();pe.flags|=e,i.memoizedState=Hl(1|t,{destroy:void 0},n,a===void 0?null:a)}function mo(e,t,n,a){var i=nt();a=a===void 0?null:a;var o=i.memoizedState.inst;He!==null&&a!==null&&_u(a,He.memoizedState.deps)?i.memoizedState=Hl(t,o,n,a):(pe.flags|=e,i.memoizedState=Hl(1|t,o,n,a))}function Bm(e,t){fo(8390656,8,e,t)}function Xu(e,t){mo(2048,8,e,t)}function $v(e){pe.flags|=4;var t=pe.updateQueue;if(t===null)t=so(),pe.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Ym(e){var t=nt().memoizedState;return $v({ref:t,nextImpl:e}),function(){if((Oe&2)!==0)throw Error(c(440));return t.impl.apply(void 0,arguments)}}function qm(e,t){return mo(4,2,e,t)}function Qm(e,t){return mo(4,4,e,t)}function Xm(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Vm(e,t,n){n=n!=null?n.concat([e]):null,mo(4,4,Xm.bind(null,t,e),n)}function Vu(){}function Zm(e,t){var n=nt();t=t===void 0?null:t;var a=n.memoizedState;return t!==null&&_u(t,a[1])?a[0]:(n.memoizedState=[e,t],e)}function Km(e,t){var n=nt();t=t===void 0?null:t;var a=n.memoizedState;if(t!==null&&_u(t,a[1]))return a[0];if(a=e(),Ia){ia(!0);try{e()}finally{ia(!1)}}return n.memoizedState=[a,t],a}function Zu(e,t,n){return n===void 0||(qn&1073741824)!==0&&(je&261930)===0?e.memoizedState=t:(e.memoizedState=n,e=Jh(),pe.lanes|=e,ba|=e,n)}function Jm(e,t,n,a){return Xt(n,t)?n:Ul.current!==null?(e=Zu(e,n,a),Xt(e,t)||(rt=!0),e):(qn&42)===0||(qn&1073741824)!==0&&(je&261930)===0?(rt=!0,e.memoizedState=n):(e=Jh(),pe.lanes|=e,ba|=e,t)}function Fm(e,t,n,a,i){var o=F.p;F.p=o!==0&&8>o?o:8;var f=R.T,y={};R.T=y,Fu(e,!1,t,n);try{var $=i(),M=R.S;if(M!==null&&M(y,$),$!==null&&typeof $=="object"&&typeof $.then=="function"){var H=yv($,a);Yi(e,t,H,Wt(e))}else Yi(e,t,a,Wt(e))}catch(X){Yi(e,t,{then:function(){},status:"rejected",reason:X},Wt())}finally{F.p=o,f!==null&&y.types!==null&&(f.types=y.types),R.T=f}}function Cv(){}function Ku(e,t,n,a){if(e.tag!==5)throw Error(c(476));var i=Wm(e).queue;Fm(e,i,t,ee,n===null?Cv:function(){return Pm(e),n(a)})}function Wm(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:ee,baseState:ee,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qn,lastRenderedState:ee},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Qn,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Pm(e){var t=Wm(e);t.next===null&&(t=e.alternate.memoizedState),Yi(e,t.next.queue,{},Wt())}function Ju(){return xt(ir)}function Im(){return nt().memoizedState}function eh(){return nt().memoizedState}function jv(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Wt();e=ma(n);var a=ha(t,e,n);a!==null&&(Ut(a,t,n),Ui(a,t,n)),t={cache:ju()},e.payload=t;return}t=t.return}}function wv(e,t,n){var a=Wt();n={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},ho(e)?nh(t,n):(n=mu(e,t,n,a),n!==null&&(Ut(n,e,a),ah(n,t,a)))}function th(e,t,n){var a=Wt();Yi(e,t,n,a)}function Yi(e,t,n,a){var i={lane:a,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(ho(e))nh(t,i);else{var o=e.alternate;if(e.lanes===0&&(o===null||o.lanes===0)&&(o=t.lastRenderedReducer,o!==null))try{var f=t.lastRenderedState,y=o(f,n);if(i.hasEagerState=!0,i.eagerState=y,Xt(y,f))return Zr(e,t,i,0),qe===null&&Vr(),!1}catch{}finally{}if(n=mu(e,t,i,a),n!==null)return Ut(n,e,a),ah(n,t,a),!0}return!1}function Fu(e,t,n,a){if(a={lane:2,revertLane:Ec(),gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},ho(e)){if(t)throw Error(c(479))}else t=mu(e,n,a,2),t!==null&&Ut(t,e,2)}function ho(e){var t=e.alternate;return e===pe||t!==null&&t===pe}function nh(e,t){Gl=ro=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function ah(e,t,n){if((n&4194048)!==0){var a=t.lanes;a&=e.pendingLanes,n|=a,t.lanes=n,sf(e,n)}}var qi={readContext:xt,use:uo,useCallback:We,useContext:We,useEffect:We,useImperativeHandle:We,useLayoutEffect:We,useInsertionEffect:We,useMemo:We,useReducer:We,useRef:We,useState:We,useDebugValue:We,useDeferredValue:We,useTransition:We,useSyncExternalStore:We,useId:We,useHostTransitionStatus:We,useFormState:We,useActionState:We,useOptimistic:We,useMemoCache:We,useCacheRefresh:We};qi.useEffectEvent=We;var lh={readContext:xt,use:uo,useCallback:function(e,t){return kt().memoizedState=[e,t===void 0?null:t],e},useContext:xt,useEffect:Bm,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,fo(4194308,4,Xm.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fo(4194308,4,e,t)},useInsertionEffect:function(e,t){fo(4,2,e,t)},useMemo:function(e,t){var n=kt();t=t===void 0?null:t;var a=e();if(Ia){ia(!0);try{e()}finally{ia(!1)}}return n.memoizedState=[a,t],a},useReducer:function(e,t,n){var a=kt();if(n!==void 0){var i=n(t);if(Ia){ia(!0);try{n(t)}finally{ia(!1)}}}else i=t;return a.memoizedState=a.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},a.queue=e,e=e.dispatch=wv.bind(null,pe,e),[a.memoizedState,e]},useRef:function(e){var t=kt();return e={current:e},t.memoizedState=e},useState:function(e){e=qu(e);var t=e.queue,n=th.bind(null,pe,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Vu,useDeferredValue:function(e,t){var n=kt();return Zu(n,e,t)},useTransition:function(){var e=qu(!1);return e=Fm.bind(null,pe,e.queue,!0,!1),kt().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var a=pe,i=kt();if(Ee){if(n===void 0)throw Error(c(407));n=n()}else{if(n=t(),qe===null)throw Error(c(349));(je&127)!==0||wm(a,t,n)}i.memoizedState=n;var o={value:n,getSnapshot:t};return i.queue=o,Bm(Rm.bind(null,a,o,e),[e]),a.flags|=2048,Hl(9,{destroy:void 0},km.bind(null,a,o,n,t),null),n},useId:function(){var e=kt(),t=qe.identifierPrefix;if(Ee){var n=kn,a=wn;n=(a&~(1<<32-Qt(a)-1)).toString(32)+n,t="_"+t+"R_"+n,n=oo++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=vv++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:Ju,useFormState:Nm,useActionState:Nm,useOptimistic:function(e){var t=kt();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=Fu.bind(null,pe,!0,n),n.dispatch=t,[e,t]},useMemoCache:Hu,useCacheRefresh:function(){return kt().memoizedState=jv.bind(null,pe)},useEffectEvent:function(e){var t=kt(),n={impl:e};return t.memoizedState=n,function(){if((Oe&2)!==0)throw Error(c(440));return n.impl.apply(void 0,arguments)}}},Wu={readContext:xt,use:uo,useCallback:Zm,useContext:xt,useEffect:Xu,useImperativeHandle:Vm,useInsertionEffect:qm,useLayoutEffect:Qm,useMemo:Km,useReducer:co,useRef:Hm,useState:function(){return co(Qn)},useDebugValue:Vu,useDeferredValue:function(e,t){var n=nt();return Jm(n,He.memoizedState,e,t)},useTransition:function(){var e=co(Qn)[0],t=nt().memoizedState;return[typeof e=="boolean"?e:Bi(e),t]},useSyncExternalStore:jm,useId:Im,useHostTransitionStatus:Ju,useFormState:Um,useActionState:Um,useOptimistic:function(e,t){var n=nt();return Am(n,He,e,t)},useMemoCache:Hu,useCacheRefresh:eh};Wu.useEffectEvent=Ym;var ih={readContext:xt,use:uo,useCallback:Zm,useContext:xt,useEffect:Xu,useImperativeHandle:Vm,useInsertionEffect:qm,useLayoutEffect:Qm,useMemo:Km,useReducer:Yu,useRef:Hm,useState:function(){return Yu(Qn)},useDebugValue:Vu,useDeferredValue:function(e,t){var n=nt();return He===null?Zu(n,e,t):Jm(n,He.memoizedState,e,t)},useTransition:function(){var e=Yu(Qn)[0],t=nt().memoizedState;return[typeof e=="boolean"?e:Bi(e),t]},useSyncExternalStore:jm,useId:Im,useHostTransitionStatus:Ju,useFormState:Lm,useActionState:Lm,useOptimistic:function(e,t){var n=nt();return He!==null?Am(n,He,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:Hu,useCacheRefresh:eh};ih.useEffectEvent=Ym;function Pu(e,t,n,a){t=e.memoizedState,n=n(a,t),n=n==null?t:S({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Iu={enqueueSetState:function(e,t,n){e=e._reactInternals;var a=Wt(),i=ma(a);i.payload=t,n!=null&&(i.callback=n),t=ha(e,i,a),t!==null&&(Ut(t,e,a),Ui(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var a=Wt(),i=ma(a);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=ha(e,i,a),t!==null&&(Ut(t,e,a),Ui(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Wt(),a=ma(n);a.tag=2,t!=null&&(a.callback=t),t=ha(e,a,n),t!==null&&(Ut(t,e,n),Ui(t,e,n))}};function rh(e,t,n,a,i,o,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,o,f):t.prototype&&t.prototype.isPureReactComponent?!zi(n,a)||!zi(i,o):!0}function oh(e,t,n,a){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,a),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,a),t.state!==e&&Iu.enqueueReplaceState(t,t.state,null)}function el(e,t){var n=t;if("ref"in t){n={};for(var a in t)a!=="ref"&&(n[a]=t[a])}if(e=e.defaultProps){n===t&&(n=S({},n));for(var i in e)n[i]===void 0&&(n[i]=e[i])}return n}function sh(e){Xr(e)}function uh(e){console.error(e)}function ch(e){Xr(e)}function po(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(a){setTimeout(function(){throw a})}}function dh(e,t,n){try{var a=e.onCaughtError;a(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(i){setTimeout(function(){throw i})}}function ec(e,t,n){return n=ma(n),n.tag=3,n.payload={element:null},n.callback=function(){po(e,t)},n}function fh(e){return e=ma(e),e.tag=3,e}function mh(e,t,n,a){var i=n.type.getDerivedStateFromError;if(typeof i=="function"){var o=a.value;e.payload=function(){return i(o)},e.callback=function(){dh(t,n,a)}}var f=n.stateNode;f!==null&&typeof f.componentDidCatch=="function"&&(e.callback=function(){dh(t,n,a),typeof i!="function"&&(xa===null?xa=new Set([this]):xa.add(this));var y=a.stack;this.componentDidCatch(a.value,{componentStack:y!==null?y:""})})}function kv(e,t,n,a,i){if(n.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){if(t=n.alternate,t!==null&&Dl(t,n,i,!0),n=Zt.current,n!==null){switch(n.tag){case 31:case 13:return dn===null?Ro():n.alternate===null&&Pe===0&&(Pe=3),n.flags&=-257,n.flags|=65536,n.lanes=i,a===to?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([a]):t.add(a),wc(e,a,i)),!1;case 22:return n.flags|=65536,a===to?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([a])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([a]):n.add(a)),wc(e,a,i)),!1}throw Error(c(435,n.tag))}return wc(e,a,i),Ro(),!1}if(Ee)return t=Zt.current,t!==null?((t.flags&65536)===0&&(t.flags|=256),t.flags|=65536,t.lanes=i,a!==bu&&(e=Error(c(422),{cause:a}),Di(on(e,n)))):(a!==bu&&(t=Error(c(423),{cause:a}),Di(on(t,n))),e=e.current.alternate,e.flags|=65536,i&=-i,e.lanes|=i,a=on(a,n),i=ec(e.stateNode,a,i),Au(e,i),Pe!==4&&(Pe=2)),!1;var o=Error(c(520),{cause:a});if(o=on(o,n),Wi===null?Wi=[o]:Wi.push(o),Pe!==4&&(Pe=2),t===null)return!0;a=on(a,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=i&-i,n.lanes|=e,e=ec(n.stateNode,a,e),Au(n,e),!1;case 1:if(t=n.type,o=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||o!==null&&typeof o.componentDidCatch=="function"&&(xa===null||!xa.has(o))))return n.flags|=65536,i&=-i,n.lanes|=i,i=fh(i),mh(i,e,n,a),Au(n,i),!1}n=n.return}while(n!==null);return!1}var tc=Error(c(461)),rt=!1;function St(e,t,n,a){t.child=e===null?ym(t,null,n,a):Pa(t,e.child,n,a)}function hh(e,t,n,a,i){n=n.render;var o=t.ref;if("ref"in a){var f={};for(var y in a)y!=="ref"&&(f[y]=a[y])}else f=a;return Ka(t),a=Nu(e,t,n,f,o,i),y=Uu(),e!==null&&!rt?(Gu(e,t,i),Xn(e,t,i)):(Ee&&y&&yu(t),t.flags|=1,St(e,t,a,i),t.child)}function ph(e,t,n,a,i){if(e===null){var o=n.type;return typeof o=="function"&&!hu(o)&&o.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=o,gh(e,t,o,a,i)):(e=Jr(n.type,null,a,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(o=e.child,!uc(e,i)){var f=o.memoizedProps;if(n=n.compare,n=n!==null?n:zi,n(f,a)&&e.ref===t.ref)return Xn(e,t,i)}return t.flags|=1,e=Ln(o,a),e.ref=t.ref,e.return=t,t.child=e}function gh(e,t,n,a,i){if(e!==null){var o=e.memoizedProps;if(zi(o,a)&&e.ref===t.ref)if(rt=!1,t.pendingProps=a=o,uc(e,i))(e.flags&131072)!==0&&(rt=!0);else return t.lanes=e.lanes,Xn(e,t,i)}return nc(e,t,n,a,i)}function yh(e,t,n,a){var i=a.children,o=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),a.mode==="hidden"){if((t.flags&128)!==0){if(o=o!==null?o.baseLanes|n:n,e!==null){for(a=t.child=e.child,i=0;a!==null;)i=i|a.lanes|a.childLanes,a=a.sibling;a=i&~o}else a=0,t.child=null;return vh(e,t,o,n,a)}if((n&536870912)!==0)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ir(t,o!==null?o.cachePool:null),o!==null?xm(t,o):Du(),Sm(t);else return a=t.lanes=536870912,vh(e,t,o!==null?o.baseLanes|n:n,n,a)}else o!==null?(Ir(t,o.cachePool),xm(t,o),ga(),t.memoizedState=null):(e!==null&&Ir(t,null),Du(),ga());return St(e,t,i,n),t.child}function Qi(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function vh(e,t,n,a,i){var o=ku();return o=o===null?null:{parent:lt._currentValue,pool:o},t.memoizedState={baseLanes:n,cachePool:o},e!==null&&Ir(t,null),Du(),Sm(t),e!==null&&Dl(e,t,a,!0),t.childLanes=i,null}function go(e,t){return t=vo({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function bh(e,t,n){return Pa(t,e.child,null,n),e=go(t,t.pendingProps),e.flags|=2,Kt(t),t.memoizedState=null,e}function Rv(e,t,n){var a=t.pendingProps,i=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ee){if(a.mode==="hidden")return e=go(t,a),t.lanes=536870912,Qi(null,e);if(Ou(t),(e=Qe)?(e=Tp(e,cn),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:sa!==null?{id:wn,overflow:kn}:null,retryLane:536870912,hydrationErrors:null},n=nm(e),n.return=t,t.child=n,bt=t,Qe=null)):e=null,e===null)throw ca(t);return t.lanes=536870912,null}return go(t,a)}var o=e.memoizedState;if(o!==null){var f=o.dehydrated;if(Ou(t),i)if(t.flags&256)t.flags&=-257,t=bh(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(c(558));else if(rt||Dl(e,t,n,!1),i=(n&e.childLanes)!==0,rt||i){if(a=qe,a!==null&&(f=uf(a,n),f!==0&&f!==o.retryLane))throw o.retryLane=f,Qa(e,f),Ut(a,e,f),tc;Ro(),t=bh(e,t,n)}else e=o.treeContext,Qe=fn(f.nextSibling),bt=t,Ee=!0,ua=null,cn=!1,e!==null&&im(t,e),t=go(t,a),t.flags|=4096;return t}return e=Ln(e.child,{mode:a.mode,children:a.children}),e.ref=t.ref,t.child=e,e.return=t,e}function yo(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(c(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function nc(e,t,n,a,i){return Ka(t),n=Nu(e,t,n,a,void 0,i),a=Uu(),e!==null&&!rt?(Gu(e,t,i),Xn(e,t,i)):(Ee&&a&&yu(t),t.flags|=1,St(e,t,n,i),t.child)}function xh(e,t,n,a,i,o){return Ka(t),t.updateQueue=null,n=Cm(t,a,n,i),$m(e),a=Uu(),e!==null&&!rt?(Gu(e,t,o),Xn(e,t,o)):(Ee&&a&&yu(t),t.flags|=1,St(e,t,n,o),t.child)}function Sh(e,t,n,a,i){if(Ka(t),t.stateNode===null){var o=El,f=n.contextType;typeof f=="object"&&f!==null&&(o=xt(f)),o=new n(a,o),t.memoizedState=o.state!==null&&o.state!==void 0?o.state:null,o.updater=Iu,t.stateNode=o,o._reactInternals=t,o=t.stateNode,o.props=a,o.state=t.memoizedState,o.refs={},Eu(t),f=n.contextType,o.context=typeof f=="object"&&f!==null?xt(f):El,o.state=t.memoizedState,f=n.getDerivedStateFromProps,typeof f=="function"&&(Pu(t,n,f,a),o.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof o.getSnapshotBeforeUpdate=="function"||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(f=o.state,typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount(),f!==o.state&&Iu.enqueueReplaceState(o,o.state,null),Li(t,a,o,i),Gi(),o.state=t.memoizedState),typeof o.componentDidMount=="function"&&(t.flags|=4194308),a=!0}else if(e===null){o=t.stateNode;var y=t.memoizedProps,$=el(n,y);o.props=$;var M=o.context,H=n.contextType;f=El,typeof H=="object"&&H!==null&&(f=xt(H));var X=n.getDerivedStateFromProps;H=typeof X=="function"||typeof o.getSnapshotBeforeUpdate=="function",y=t.pendingProps!==y,H||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(y||M!==f)&&oh(t,o,a,f),fa=!1;var _=t.memoizedState;o.state=_,Li(t,a,o,i),Gi(),M=t.memoizedState,y||_!==M||fa?(typeof X=="function"&&(Pu(t,n,X,a),M=t.memoizedState),($=fa||rh(t,n,$,a,_,M,f))?(H||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(t.flags|=4194308)):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=a,t.memoizedState=M),o.props=a,o.state=M,o.context=f,a=$):(typeof o.componentDidMount=="function"&&(t.flags|=4194308),a=!1)}else{o=t.stateNode,zu(e,t),f=t.memoizedProps,H=el(n,f),o.props=H,X=t.pendingProps,_=o.context,M=n.contextType,$=El,typeof M=="object"&&M!==null&&($=xt(M)),y=n.getDerivedStateFromProps,(M=typeof y=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(f!==X||_!==$)&&oh(t,o,a,$),fa=!1,_=t.memoizedState,o.state=_,Li(t,a,o,i),Gi();var G=t.memoizedState;f!==X||_!==G||fa||e!==null&&e.dependencies!==null&&Wr(e.dependencies)?(typeof y=="function"&&(Pu(t,n,y,a),G=t.memoizedState),(H=fa||rh(t,n,H,a,_,G,$)||e!==null&&e.dependencies!==null&&Wr(e.dependencies))?(M||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(a,G,$),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(a,G,$)),typeof o.componentDidUpdate=="function"&&(t.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof o.componentDidUpdate!="function"||f===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||f===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),t.memoizedProps=a,t.memoizedState=G),o.props=a,o.state=G,o.context=$,a=H):(typeof o.componentDidUpdate!="function"||f===e.memoizedProps&&_===e.memoizedState||(t.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||f===e.memoizedProps&&_===e.memoizedState||(t.flags|=1024),a=!1)}return o=a,yo(e,t),a=(t.flags&128)!==0,o||a?(o=t.stateNode,n=a&&typeof n.getDerivedStateFromError!="function"?null:o.render(),t.flags|=1,e!==null&&a?(t.child=Pa(t,e.child,null,i),t.child=Pa(t,null,n,i)):St(e,t,n,i),t.memoizedState=o.state,e=t.child):e=Xn(e,t,i),e}function $h(e,t,n,a){return Va(),t.flags|=256,St(e,t,n,a),t.child}var ac={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function lc(e){return{baseLanes:e,cachePool:dm()}}function ic(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Ft),e}function Ch(e,t,n){var a=t.pendingProps,i=!1,o=(t.flags&128)!==0,f;if((f=o)||(f=e!==null&&e.memoizedState===null?!1:(tt.current&2)!==0),f&&(i=!0,t.flags&=-129),f=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ee){if(i?pa(t):ga(),(e=Qe)?(e=Tp(e,cn),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:sa!==null?{id:wn,overflow:kn}:null,retryLane:536870912,hydrationErrors:null},n=nm(e),n.return=t,t.child=n,bt=t,Qe=null)):e=null,e===null)throw ca(t);return Bc(e)?t.lanes=32:t.lanes=536870912,null}var y=a.children;return a=a.fallback,i?(ga(),i=t.mode,y=vo({mode:"hidden",children:y},i),a=Xa(a,i,n,null),y.return=t,a.return=t,y.sibling=a,t.child=y,a=t.child,a.memoizedState=lc(n),a.childLanes=ic(e,f,n),t.memoizedState=ac,Qi(null,a)):(pa(t),rc(t,y))}var $=e.memoizedState;if($!==null&&(y=$.dehydrated,y!==null)){if(o)t.flags&256?(pa(t),t.flags&=-257,t=oc(e,t,n)):t.memoizedState!==null?(ga(),t.child=e.child,t.flags|=128,t=null):(ga(),y=a.fallback,i=t.mode,a=vo({mode:"visible",children:a.children},i),y=Xa(y,i,n,null),y.flags|=2,a.return=t,y.return=t,a.sibling=y,t.child=a,Pa(t,e.child,null,n),a=t.child,a.memoizedState=lc(n),a.childLanes=ic(e,f,n),t.memoizedState=ac,t=Qi(null,a));else if(pa(t),Bc(y)){if(f=y.nextSibling&&y.nextSibling.dataset,f)var M=f.dgst;f=M,a=Error(c(419)),a.stack="",a.digest=f,Di({value:a,source:null,stack:null}),t=oc(e,t,n)}else if(rt||Dl(e,t,n,!1),f=(n&e.childLanes)!==0,rt||f){if(f=qe,f!==null&&(a=uf(f,n),a!==0&&a!==$.retryLane))throw $.retryLane=a,Qa(e,a),Ut(f,e,a),tc;Hc(y)||Ro(),t=oc(e,t,n)}else Hc(y)?(t.flags|=192,t.child=e.child,t=null):(e=$.treeContext,Qe=fn(y.nextSibling),bt=t,Ee=!0,ua=null,cn=!1,e!==null&&im(t,e),t=rc(t,a.children),t.flags|=4096);return t}return i?(ga(),y=a.fallback,i=t.mode,$=e.child,M=$.sibling,a=Ln($,{mode:"hidden",children:a.children}),a.subtreeFlags=$.subtreeFlags&65011712,M!==null?y=Ln(M,y):(y=Xa(y,i,n,null),y.flags|=2),y.return=t,a.return=t,a.sibling=y,t.child=a,Qi(null,a),a=t.child,y=e.child.memoizedState,y===null?y=lc(n):(i=y.cachePool,i!==null?($=lt._currentValue,i=i.parent!==$?{parent:$,pool:$}:i):i=dm(),y={baseLanes:y.baseLanes|n,cachePool:i}),a.memoizedState=y,a.childLanes=ic(e,f,n),t.memoizedState=ac,Qi(e.child,a)):(pa(t),n=e.child,e=n.sibling,n=Ln(n,{mode:"visible",children:a.children}),n.return=t,n.sibling=null,e!==null&&(f=t.deletions,f===null?(t.deletions=[e],t.flags|=16):f.push(e)),t.child=n,t.memoizedState=null,n)}function rc(e,t){return t=vo({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function vo(e,t){return e=Vt(22,e,null,t),e.lanes=0,e}function oc(e,t,n){return Pa(t,e.child,null,n),e=rc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function jh(e,t,n){e.lanes|=t;var a=e.alternate;a!==null&&(a.lanes|=t),$u(e.return,t,n)}function sc(e,t,n,a,i,o){var f=e.memoizedState;f===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:a,tail:n,tailMode:i,treeForkCount:o}:(f.isBackwards=t,f.rendering=null,f.renderingStartTime=0,f.last=a,f.tail=n,f.tailMode=i,f.treeForkCount=o)}function wh(e,t,n){var a=t.pendingProps,i=a.revealOrder,o=a.tail;a=a.children;var f=tt.current,y=(f&2)!==0;if(y?(f=f&1|2,t.flags|=128):f&=1,I(tt,f),St(e,t,a,n),a=Ee?Ti:0,!y&&e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&jh(e,n,t);else if(e.tag===19)jh(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&io(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),sc(t,!1,i,n,o,a);break;case"backwards":case"unstable_legacy-backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&io(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}sc(t,!0,n,null,o,a);break;case"together":sc(t,!1,null,null,void 0,a);break;default:t.memoizedState=null}return t.child}function Xn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ba|=t.lanes,(n&t.childLanes)===0)if(e!==null){if(Dl(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(c(153));if(t.child!==null){for(e=t.child,n=Ln(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ln(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function uc(e,t){return(e.lanes&t)!==0?!0:(e=e.dependencies,!!(e!==null&&Wr(e)))}function Ev(e,t,n){switch(t.tag){case 3:et(t,t.stateNode.containerInfo),da(t,lt,e.memoizedState.cache),Va();break;case 27:case 5:On(t);break;case 4:et(t,t.stateNode.containerInfo);break;case 10:da(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ou(t),null;break;case 13:var a=t.memoizedState;if(a!==null)return a.dehydrated!==null?(pa(t),t.flags|=128,null):(n&t.child.childLanes)!==0?Ch(e,t,n):(pa(t),e=Xn(e,t,n),e!==null?e.sibling:null);pa(t);break;case 19:var i=(e.flags&128)!==0;if(a=(n&t.childLanes)!==0,a||(Dl(e,t,n,!1),a=(n&t.childLanes)!==0),i){if(a)return wh(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),I(tt,tt.current),a)break;return null;case 22:return t.lanes=0,yh(e,t,n,t.pendingProps);case 24:da(t,lt,e.memoizedState.cache)}return Xn(e,t,n)}function kh(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)rt=!0;else{if(!uc(e,n)&&(t.flags&128)===0)return rt=!1,Ev(e,t,n);rt=(e.flags&131072)!==0}else rt=!1,Ee&&(t.flags&1048576)!==0&&lm(t,Ti,t.index);switch(t.lanes=0,t.tag){case 16:e:{var a=t.pendingProps;if(e=Fa(t.elementType),t.type=e,typeof e=="function")hu(e)?(a=el(e,a),t.tag=1,t=Sh(null,t,e,a,n)):(t.tag=0,t=nc(null,t,e,a,n));else{if(e!=null){var i=e.$$typeof;if(i===j){t.tag=11,t=hh(null,t,e,a,n);break e}else if(i===Z){t.tag=14,t=ph(null,t,e,a,n);break e}}throw t=ft(e)||e,Error(c(306,t,""))}}return t;case 0:return nc(e,t,t.type,t.pendingProps,n);case 1:return a=t.type,i=el(a,t.pendingProps),Sh(e,t,a,i,n);case 3:e:{if(et(t,t.stateNode.containerInfo),e===null)throw Error(c(387));a=t.pendingProps;var o=t.memoizedState;i=o.element,zu(e,t),Li(t,a,null,n);var f=t.memoizedState;if(a=f.cache,da(t,lt,a),a!==o.cache&&Cu(t,[lt],n,!0),Gi(),a=f.element,o.isDehydrated)if(o={element:a,isDehydrated:!1,cache:f.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=$h(e,t,a,n);break e}else if(a!==i){i=on(Error(c(424)),t),Di(i),t=$h(e,t,a,n);break e}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Qe=fn(e.firstChild),bt=t,Ee=!0,ua=null,cn=!0,n=ym(t,null,a,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Va(),a===i){t=Xn(e,t,n);break e}St(e,t,a,n)}t=t.child}return t;case 26:return yo(e,t),e===null?(n=Up(t.type,null,t.pendingProps,null))?t.memoizedState=n:Ee||(n=t.type,e=t.pendingProps,a=Oo(he.current).createElement(n),a[vt]=t,a[Tt]=e,$t(a,n,e),mt(a),t.stateNode=a):t.memoizedState=Up(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return On(t),e===null&&Ee&&(a=t.stateNode=Op(t.type,t.pendingProps,he.current),bt=t,cn=!0,i=Qe,ja(t.type)?(Yc=i,Qe=fn(a.firstChild)):Qe=i),St(e,t,t.pendingProps.children,n),yo(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ee&&((i=a=Qe)&&(a=lb(a,t.type,t.pendingProps,cn),a!==null?(t.stateNode=a,bt=t,Qe=fn(a.firstChild),cn=!1,i=!0):i=!1),i||ca(t)),On(t),i=t.type,o=t.pendingProps,f=e!==null?e.memoizedProps:null,a=o.children,Uc(i,o)?a=null:f!==null&&Uc(i,f)&&(t.flags|=32),t.memoizedState!==null&&(i=Nu(e,t,bv,null,null,n),ir._currentValue=i),yo(e,t),St(e,t,a,n),t.child;case 6:return e===null&&Ee&&((e=n=Qe)&&(n=ib(n,t.pendingProps,cn),n!==null?(t.stateNode=n,bt=t,Qe=null,e=!0):e=!1),e||ca(t)),null;case 13:return Ch(e,t,n);case 4:return et(t,t.stateNode.containerInfo),a=t.pendingProps,e===null?t.child=Pa(t,null,a,n):St(e,t,a,n),t.child;case 11:return hh(e,t,t.type,t.pendingProps,n);case 7:return St(e,t,t.pendingProps,n),t.child;case 8:return St(e,t,t.pendingProps.children,n),t.child;case 12:return St(e,t,t.pendingProps.children,n),t.child;case 10:return a=t.pendingProps,da(t,t.type,a.value),St(e,t,a.children,n),t.child;case 9:return i=t.type._context,a=t.pendingProps.children,Ka(t),i=xt(i),a=a(i),t.flags|=1,St(e,t,a,n),t.child;case 14:return ph(e,t,t.type,t.pendingProps,n);case 15:return gh(e,t,t.type,t.pendingProps,n);case 19:return wh(e,t,n);case 31:return Rv(e,t,n);case 22:return yh(e,t,n,t.pendingProps);case 24:return Ka(t),a=xt(lt),e===null?(i=ku(),i===null&&(i=qe,o=ju(),i.pooledCache=o,o.refCount++,o!==null&&(i.pooledCacheLanes|=n),i=o),t.memoizedState={parent:a,cache:i},Eu(t),da(t,lt,i)):((e.lanes&n)!==0&&(zu(e,t),Li(t,null,null,n),Gi()),i=e.memoizedState,o=t.memoizedState,i.parent!==a?(i={parent:a,cache:a},t.memoizedState=i,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=i),da(t,lt,a)):(a=o.cache,da(t,lt,a),a!==i.cache&&Cu(t,[lt],n,!0))),St(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(c(156,t.tag))}function Vn(e){e.flags|=4}function cc(e,t,n,a,i){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(i&335544128)===i)if(e.stateNode.complete)e.flags|=8192;else if(Ih())e.flags|=8192;else throw Wa=to,Ru}else e.flags&=-16777217}function Rh(e,t){if(t.type!=="stylesheet"||(t.state.loading&4)!==0)e.flags&=-16777217;else if(e.flags|=16777216,!Yp(t))if(Ih())e.flags|=8192;else throw Wa=to,Ru}function bo(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?rf():536870912,e.lanes|=t,Ql|=t)}function Xi(e,t){if(!Ee)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function Xe(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,a=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags&65011712,a|=i.flags&65011712,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=a,e.childLanes=n,t}function zv(e,t,n){var a=t.pendingProps;switch(vu(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Xe(t),null;case 1:return Xe(t),null;case 3:return n=t.stateNode,a=null,e!==null&&(a=e.memoizedState.cache),t.memoizedState.cache!==a&&(t.flags|=2048),Yn(lt),Ue(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Tl(t)?Vn(t):e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,xu())),Xe(t),null;case 26:var i=t.type,o=t.memoizedState;return e===null?(Vn(t),o!==null?(Xe(t),Rh(t,o)):(Xe(t),cc(t,i,null,a,n))):o?o!==e.memoizedState?(Vn(t),Xe(t),Rh(t,o)):(Xe(t),t.flags&=-16777217):(e=e.memoizedProps,e!==a&&Vn(t),Xe(t),cc(t,i,e,a,n)),null;case 27:if(_n(t),n=he.current,i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Vn(t);else{if(!a){if(t.stateNode===null)throw Error(c(166));return Xe(t),null}e=te.current,Tl(t)?rm(t):(e=Op(i,a,n),t.stateNode=e,Vn(t))}return Xe(t),null;case 5:if(_n(t),i=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==a&&Vn(t);else{if(!a){if(t.stateNode===null)throw Error(c(166));return Xe(t),null}if(o=te.current,Tl(t))rm(t);else{var f=Oo(he.current);switch(o){case 1:o=f.createElementNS("http://www.w3.org/2000/svg",i);break;case 2:o=f.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;default:switch(i){case"svg":o=f.createElementNS("http://www.w3.org/2000/svg",i);break;case"math":o=f.createElementNS("http://www.w3.org/1998/Math/MathML",i);break;case"script":o=f.createElement("div"),o.innerHTML="<script><\/script>",o=o.removeChild(o.firstChild);break;case"select":o=typeof a.is=="string"?f.createElement("select",{is:a.is}):f.createElement("select"),a.multiple?o.multiple=!0:a.size&&(o.size=a.size);break;default:o=typeof a.is=="string"?f.createElement(i,{is:a.is}):f.createElement(i)}}o[vt]=t,o[Tt]=a;e:for(f=t.child;f!==null;){if(f.tag===5||f.tag===6)o.appendChild(f.stateNode);else if(f.tag!==4&&f.tag!==27&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;f=f.return}f.sibling.return=f.return,f=f.sibling}t.stateNode=o;e:switch($t(o,i,a),i){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}a&&Vn(t)}}return Xe(t),cc(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==a&&Vn(t);else{if(typeof a!="string"&&t.stateNode===null)throw Error(c(166));if(e=he.current,Tl(t)){if(e=t.stateNode,n=t.memoizedProps,a=null,i=bt,i!==null)switch(i.tag){case 27:case 5:a=i.memoizedProps}e[vt]=t,e=!!(e.nodeValue===n||a!==null&&a.suppressHydrationWarning===!0||Cp(e.nodeValue,n)),e||ca(t,!0)}else e=Oo(e).createTextNode(a),e[vt]=t,t.stateNode=e}return Xe(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(a=Tl(t),n!==null){if(e===null){if(!a)throw Error(c(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(c(557));e[vt]=t}else Va(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Xe(t),e=!1}else n=xu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Kt(t),t):(Kt(t),null);if((t.flags&128)!==0)throw Error(c(558))}return Xe(t),null;case 13:if(a=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(i=Tl(t),a!==null&&a.dehydrated!==null){if(e===null){if(!i)throw Error(c(318));if(i=t.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(c(317));i[vt]=t}else Va(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;Xe(t),i=!1}else i=xu(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=i),i=!0;if(!i)return t.flags&256?(Kt(t),t):(Kt(t),null)}return Kt(t),(t.flags&128)!==0?(t.lanes=n,t):(n=a!==null,e=e!==null&&e.memoizedState!==null,n&&(a=t.child,i=null,a.alternate!==null&&a.alternate.memoizedState!==null&&a.alternate.memoizedState.cachePool!==null&&(i=a.alternate.memoizedState.cachePool.pool),o=null,a.memoizedState!==null&&a.memoizedState.cachePool!==null&&(o=a.memoizedState.cachePool.pool),o!==i&&(a.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),bo(t,t.updateQueue),Xe(t),null);case 4:return Ue(),e===null&&Dc(t.stateNode.containerInfo),Xe(t),null;case 10:return Yn(t.type),Xe(t),null;case 19:if(q(tt),a=t.memoizedState,a===null)return Xe(t),null;if(i=(t.flags&128)!==0,o=a.rendering,o===null)if(i)Xi(a,!1);else{if(Pe!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(o=io(e),o!==null){for(t.flags|=128,Xi(a,!1),e=o.updateQueue,t.updateQueue=e,bo(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)tm(n,e),n=n.sibling;return I(tt,tt.current&1|2),Ee&&Hn(t,a.treeForkCount),t.child}e=e.sibling}a.tail!==null&&Yt()>jo&&(t.flags|=128,i=!0,Xi(a,!1),t.lanes=4194304)}else{if(!i)if(e=io(o),e!==null){if(t.flags|=128,i=!0,e=e.updateQueue,t.updateQueue=e,bo(t,e),Xi(a,!0),a.tail===null&&a.tailMode==="hidden"&&!o.alternate&&!Ee)return Xe(t),null}else 2*Yt()-a.renderingStartTime>jo&&n!==536870912&&(t.flags|=128,i=!0,Xi(a,!1),t.lanes=4194304);a.isBackwards?(o.sibling=t.child,t.child=o):(e=a.last,e!==null?e.sibling=o:t.child=o,a.last=o)}return a.tail!==null?(e=a.tail,a.rendering=e,a.tail=e.sibling,a.renderingStartTime=Yt(),e.sibling=null,n=tt.current,I(tt,i?n&1|2:n&1),Ee&&Hn(t,a.treeForkCount),e):(Xe(t),null);case 22:case 23:return Kt(t),Mu(),a=t.memoizedState!==null,e!==null?e.memoizedState!==null!==a&&(t.flags|=8192):a&&(t.flags|=8192),a?(n&536870912)!==0&&(t.flags&128)===0&&(Xe(t),t.subtreeFlags&6&&(t.flags|=8192)):Xe(t),n=t.updateQueue,n!==null&&bo(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),a=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),a!==n&&(t.flags|=2048),e!==null&&q(Ja),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Yn(lt),Xe(t),null;case 25:return null;case 30:return null}throw Error(c(156,t.tag))}function Av(e,t){switch(vu(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Yn(lt),Ue(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return _n(t),null;case 31:if(t.memoizedState!==null){if(Kt(t),t.alternate===null)throw Error(c(340));Va()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Kt(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(c(340));Va()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return q(tt),null;case 4:return Ue(),null;case 10:return Yn(t.type),null;case 22:case 23:return Kt(t),Mu(),e!==null&&q(Ja),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Yn(lt),null;case 25:return null;default:return null}}function Eh(e,t){switch(vu(t),t.tag){case 3:Yn(lt),Ue();break;case 26:case 27:case 5:_n(t);break;case 4:Ue();break;case 31:t.memoizedState!==null&&Kt(t);break;case 13:Kt(t);break;case 19:q(tt);break;case 10:Yn(t.type);break;case 22:case 23:Kt(t),Mu(),e!==null&&q(Ja);break;case 24:Yn(lt)}}function Vi(e,t){try{var n=t.updateQueue,a=n!==null?n.lastEffect:null;if(a!==null){var i=a.next;n=i;do{if((n.tag&e)===e){a=void 0;var o=n.create,f=n.inst;a=o(),f.destroy=a}n=n.next}while(n!==i)}}catch(y){Le(t,t.return,y)}}function ya(e,t,n){try{var a=t.updateQueue,i=a!==null?a.lastEffect:null;if(i!==null){var o=i.next;a=o;do{if((a.tag&e)===e){var f=a.inst,y=f.destroy;if(y!==void 0){f.destroy=void 0,i=t;var $=n,M=y;try{M()}catch(H){Le(i,$,H)}}}a=a.next}while(a!==o)}}catch(H){Le(t,t.return,H)}}function zh(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{bm(t,n)}catch(a){Le(e,e.return,a)}}}function Ah(e,t,n){n.props=el(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(a){Le(e,t,a)}}function Zi(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var a=e.stateNode;break;case 30:a=e.stateNode;break;default:a=e.stateNode}typeof n=="function"?e.refCleanup=n(a):n.current=a}}catch(i){Le(e,t,i)}}function Rn(e,t){var n=e.ref,a=e.refCleanup;if(n!==null)if(typeof a=="function")try{a()}catch(i){Le(e,t,i)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(i){Le(e,t,i)}else n.current=null}function Th(e){var t=e.type,n=e.memoizedProps,a=e.stateNode;try{e:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&a.focus();break e;case"img":n.src?a.src=n.src:n.srcSet&&(a.srcset=n.srcSet)}}catch(i){Le(e,e.return,i)}}function dc(e,t,n){try{var a=e.stateNode;Pv(a,e.type,n,t),a[Tt]=t}catch(i){Le(e,e.return,i)}}function Dh(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ja(e.type)||e.tag===4}function fc(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Dh(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ja(e.type)||e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function mc(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Un));else if(a!==4&&(a===27&&ja(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(mc(e,t,n),e=e.sibling;e!==null;)mc(e,t,n),e=e.sibling}function xo(e,t,n){var a=e.tag;if(a===5||a===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(a!==4&&(a===27&&ja(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(xo(e,t,n),e=e.sibling;e!==null;)xo(e,t,n),e=e.sibling}function Mh(e){var t=e.stateNode,n=e.memoizedProps;try{for(var a=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);$t(t,a,n),t[vt]=e,t[Tt]=n}catch(o){Le(e,e.return,o)}}var Zn=!1,ot=!1,hc=!1,Oh=typeof WeakSet=="function"?WeakSet:Set,ht=null;function Tv(e,t){if(e=e.containerInfo,_c=Bo,e=Vf(e),ou(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var a=n.getSelection&&n.getSelection();if(a&&a.rangeCount!==0){n=a.anchorNode;var i=a.anchorOffset,o=a.focusNode;a=a.focusOffset;try{n.nodeType,o.nodeType}catch{n=null;break e}var f=0,y=-1,$=-1,M=0,H=0,X=e,_=null;t:for(;;){for(var G;X!==n||i!==0&&X.nodeType!==3||(y=f+i),X!==o||a!==0&&X.nodeType!==3||($=f+a),X.nodeType===3&&(f+=X.nodeValue.length),(G=X.firstChild)!==null;)_=X,X=G;for(;;){if(X===e)break t;if(_===n&&++M===i&&(y=f),_===o&&++H===a&&($=f),(G=X.nextSibling)!==null)break;X=_,_=X.parentNode}X=G}n=y===-1||$===-1?null:{start:y,end:$}}else n=null}n=n||{start:0,end:0}}else n=null;for(Nc={focusedElem:e,selectionRange:n},Bo=!1,ht=t;ht!==null;)if(t=ht,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ht=e;else for(;ht!==null;){switch(t=ht,o=t.alternate,e=t.flags,t.tag){case 0:if((e&4)!==0&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)i=e[n],i.ref.impl=i.nextImpl;break;case 11:case 15:break;case 1:if((e&1024)!==0&&o!==null){e=void 0,n=t,i=o.memoizedProps,o=o.memoizedState,a=n.stateNode;try{var ne=el(n.type,i);e=a.getSnapshotBeforeUpdate(ne,o),a.__reactInternalSnapshotBeforeUpdate=e}catch(oe){Le(n,n.return,oe)}}break;case 3:if((e&1024)!==0){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Lc(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Lc(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((e&1024)!==0)throw Error(c(163))}if(e=t.sibling,e!==null){e.return=t.return,ht=e;break}ht=t.return}}function _h(e,t,n){var a=n.flags;switch(n.tag){case 0:case 11:case 15:Jn(e,n),a&4&&Vi(5,n);break;case 1:if(Jn(e,n),a&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(f){Le(n,n.return,f)}else{var i=el(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(f){Le(n,n.return,f)}}a&64&&zh(n),a&512&&Zi(n,n.return);break;case 3:if(Jn(e,n),a&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{bm(e,t)}catch(f){Le(n,n.return,f)}}break;case 27:t===null&&a&4&&Mh(n);case 26:case 5:Jn(e,n),t===null&&a&4&&Th(n),a&512&&Zi(n,n.return);break;case 12:Jn(e,n);break;case 31:Jn(e,n),a&4&&Gh(e,n);break;case 13:Jn(e,n),a&4&&Lh(e,n),a&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Hv.bind(null,n),rb(e,n))));break;case 22:if(a=n.memoizedState!==null||Zn,!a){t=t!==null&&t.memoizedState!==null||ot,i=Zn;var o=ot;Zn=a,(ot=t)&&!o?Fn(e,n,(n.subtreeFlags&8772)!==0):Jn(e,n),Zn=i,ot=o}break;case 30:break;default:Jn(e,n)}}function Nh(e){var t=e.alternate;t!==null&&(e.alternate=null,Nh(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Qs(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Ke=null,Mt=!1;function Kn(e,t,n){for(n=n.child;n!==null;)Uh(e,t,n),n=n.sibling}function Uh(e,t,n){if(qt&&typeof qt.onCommitFiberUnmount=="function")try{qt.onCommitFiberUnmount(yi,n)}catch{}switch(n.tag){case 26:ot||Rn(n,t),Kn(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ot||Rn(n,t);var a=Ke,i=Mt;ja(n.type)&&(Ke=n.stateNode,Mt=!1),Kn(e,t,n),nr(n.stateNode),Ke=a,Mt=i;break;case 5:ot||Rn(n,t);case 6:if(a=Ke,i=Mt,Ke=null,Kn(e,t,n),Ke=a,Mt=i,Ke!==null)if(Mt)try{(Ke.nodeType===9?Ke.body:Ke.nodeName==="HTML"?Ke.ownerDocument.body:Ke).removeChild(n.stateNode)}catch(o){Le(n,t,o)}else try{Ke.removeChild(n.stateNode)}catch(o){Le(n,t,o)}break;case 18:Ke!==null&&(Mt?(e=Ke,zp(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),Pl(e)):zp(Ke,n.stateNode));break;case 4:a=Ke,i=Mt,Ke=n.stateNode.containerInfo,Mt=!0,Kn(e,t,n),Ke=a,Mt=i;break;case 0:case 11:case 14:case 15:ya(2,n,t),ot||ya(4,n,t),Kn(e,t,n);break;case 1:ot||(Rn(n,t),a=n.stateNode,typeof a.componentWillUnmount=="function"&&Ah(n,t,a)),Kn(e,t,n);break;case 21:Kn(e,t,n);break;case 22:ot=(a=ot)||n.memoizedState!==null,Kn(e,t,n),ot=a;break;default:Kn(e,t,n)}}function Gh(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Pl(e)}catch(n){Le(t,t.return,n)}}}function Lh(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Pl(e)}catch(n){Le(t,t.return,n)}}function Dv(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Oh),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Oh),t;default:throw Error(c(435,e.tag))}}function So(e,t){var n=Dv(e);t.forEach(function(a){if(!n.has(a)){n.add(a);var i=Bv.bind(null,e,a);a.then(i,i)}})}function Ot(e,t){var n=t.deletions;if(n!==null)for(var a=0;a<n.length;a++){var i=n[a],o=e,f=t,y=f;e:for(;y!==null;){switch(y.tag){case 27:if(ja(y.type)){Ke=y.stateNode,Mt=!1;break e}break;case 5:Ke=y.stateNode,Mt=!1;break e;case 3:case 4:Ke=y.stateNode.containerInfo,Mt=!0;break e}y=y.return}if(Ke===null)throw Error(c(160));Uh(o,f,i),Ke=null,Mt=!1,o=i.alternate,o!==null&&(o.return=null),i.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Hh(t,e),t=t.sibling}var Sn=null;function Hh(e,t){var n=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:Ot(t,e),_t(e),a&4&&(ya(3,e,e.return),Vi(3,e),ya(5,e,e.return));break;case 1:Ot(t,e),_t(e),a&512&&(ot||n===null||Rn(n,n.return)),a&64&&Zn&&(e=e.updateQueue,e!==null&&(a=e.callbacks,a!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?a:n.concat(a))));break;case 26:var i=Sn;if(Ot(t,e),_t(e),a&512&&(ot||n===null||Rn(n,n.return)),a&4){var o=n!==null?n.memoizedState:null;if(a=e.memoizedState,n===null)if(a===null)if(e.stateNode===null){e:{a=e.type,n=e.memoizedProps,i=i.ownerDocument||i;t:switch(a){case"title":o=i.getElementsByTagName("title")[0],(!o||o[xi]||o[vt]||o.namespaceURI==="http://www.w3.org/2000/svg"||o.hasAttribute("itemprop"))&&(o=i.createElement(a),i.head.insertBefore(o,i.querySelector("head > title"))),$t(o,a,n),o[vt]=e,mt(o),a=o;break e;case"link":var f=Hp("link","href",i).get(a+(n.href||""));if(f){for(var y=0;y<f.length;y++)if(o=f[y],o.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&o.getAttribute("rel")===(n.rel==null?null:n.rel)&&o.getAttribute("title")===(n.title==null?null:n.title)&&o.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){f.splice(y,1);break t}}o=i.createElement(a),$t(o,a,n),i.head.appendChild(o);break;case"meta":if(f=Hp("meta","content",i).get(a+(n.content||""))){for(y=0;y<f.length;y++)if(o=f[y],o.getAttribute("content")===(n.content==null?null:""+n.content)&&o.getAttribute("name")===(n.name==null?null:n.name)&&o.getAttribute("property")===(n.property==null?null:n.property)&&o.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&o.getAttribute("charset")===(n.charSet==null?null:n.charSet)){f.splice(y,1);break t}}o=i.createElement(a),$t(o,a,n),i.head.appendChild(o);break;default:throw Error(c(468,a))}o[vt]=e,mt(o),a=o}e.stateNode=a}else Bp(i,e.type,e.stateNode);else e.stateNode=Lp(i,a,e.memoizedProps);else o!==a?(o===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):o.count--,a===null?Bp(i,e.type,e.stateNode):Lp(i,a,e.memoizedProps)):a===null&&e.stateNode!==null&&dc(e,e.memoizedProps,n.memoizedProps)}break;case 27:Ot(t,e),_t(e),a&512&&(ot||n===null||Rn(n,n.return)),n!==null&&a&4&&dc(e,e.memoizedProps,n.memoizedProps);break;case 5:if(Ot(t,e),_t(e),a&512&&(ot||n===null||Rn(n,n.return)),e.flags&32){i=e.stateNode;try{Sl(i,"")}catch(ne){Le(e,e.return,ne)}}a&4&&e.stateNode!=null&&(i=e.memoizedProps,dc(e,i,n!==null?n.memoizedProps:i)),a&1024&&(hc=!0);break;case 6:if(Ot(t,e),_t(e),a&4){if(e.stateNode===null)throw Error(c(162));a=e.memoizedProps,n=e.stateNode;try{n.nodeValue=a}catch(ne){Le(e,e.return,ne)}}break;case 3:if(Uo=null,i=Sn,Sn=_o(t.containerInfo),Ot(t,e),Sn=i,_t(e),a&4&&n!==null&&n.memoizedState.isDehydrated)try{Pl(t.containerInfo)}catch(ne){Le(e,e.return,ne)}hc&&(hc=!1,Bh(e));break;case 4:a=Sn,Sn=_o(e.stateNode.containerInfo),Ot(t,e),_t(e),Sn=a;break;case 12:Ot(t,e),_t(e);break;case 31:Ot(t,e),_t(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,So(e,a)));break;case 13:Ot(t,e),_t(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Co=Yt()),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,So(e,a)));break;case 22:i=e.memoizedState!==null;var $=n!==null&&n.memoizedState!==null,M=Zn,H=ot;if(Zn=M||i,ot=H||$,Ot(t,e),ot=H,Zn=M,_t(e),a&8192)e:for(t=e.stateNode,t._visibility=i?t._visibility&-2:t._visibility|1,i&&(n===null||$||Zn||ot||tl(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){$=n=t;try{if(o=$.stateNode,i)f=o.style,typeof f.setProperty=="function"?f.setProperty("display","none","important"):f.display="none";else{y=$.stateNode;var X=$.memoizedProps.style,_=X!=null&&X.hasOwnProperty("display")?X.display:null;y.style.display=_==null||typeof _=="boolean"?"":(""+_).trim()}}catch(ne){Le($,$.return,ne)}}}else if(t.tag===6){if(n===null){$=t;try{$.stateNode.nodeValue=i?"":$.memoizedProps}catch(ne){Le($,$.return,ne)}}}else if(t.tag===18){if(n===null){$=t;try{var G=$.stateNode;i?Ap(G,!0):Ap($.stateNode,!1)}catch(ne){Le($,$.return,ne)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}a&4&&(a=e.updateQueue,a!==null&&(n=a.retryQueue,n!==null&&(a.retryQueue=null,So(e,n))));break;case 19:Ot(t,e),_t(e),a&4&&(a=e.updateQueue,a!==null&&(e.updateQueue=null,So(e,a)));break;case 30:break;case 21:break;default:Ot(t,e),_t(e)}}function _t(e){var t=e.flags;if(t&2){try{for(var n,a=e.return;a!==null;){if(Dh(a)){n=a;break}a=a.return}if(n==null)throw Error(c(160));switch(n.tag){case 27:var i=n.stateNode,o=fc(e);xo(e,o,i);break;case 5:var f=n.stateNode;n.flags&32&&(Sl(f,""),n.flags&=-33);var y=fc(e);xo(e,y,f);break;case 3:case 4:var $=n.stateNode.containerInfo,M=fc(e);mc(e,M,$);break;default:throw Error(c(161))}}catch(H){Le(e,e.return,H)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Bh(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Bh(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function Jn(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)_h(e,t.alternate,t),t=t.sibling}function tl(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:ya(4,t,t.return),tl(t);break;case 1:Rn(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&Ah(t,t.return,n),tl(t);break;case 27:nr(t.stateNode);case 26:case 5:Rn(t,t.return),tl(t);break;case 22:t.memoizedState===null&&tl(t);break;case 30:tl(t);break;default:tl(t)}e=e.sibling}}function Fn(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var a=t.alternate,i=e,o=t,f=o.flags;switch(o.tag){case 0:case 11:case 15:Fn(i,o,n),Vi(4,o);break;case 1:if(Fn(i,o,n),a=o,i=a.stateNode,typeof i.componentDidMount=="function")try{i.componentDidMount()}catch(M){Le(a,a.return,M)}if(a=o,i=a.updateQueue,i!==null){var y=a.stateNode;try{var $=i.shared.hiddenCallbacks;if($!==null)for(i.shared.hiddenCallbacks=null,i=0;i<$.length;i++)vm($[i],y)}catch(M){Le(a,a.return,M)}}n&&f&64&&zh(o),Zi(o,o.return);break;case 27:Mh(o);case 26:case 5:Fn(i,o,n),n&&a===null&&f&4&&Th(o),Zi(o,o.return);break;case 12:Fn(i,o,n);break;case 31:Fn(i,o,n),n&&f&4&&Gh(i,o);break;case 13:Fn(i,o,n),n&&f&4&&Lh(i,o);break;case 22:o.memoizedState===null&&Fn(i,o,n),Zi(o,o.return);break;case 30:break;default:Fn(i,o,n)}t=t.sibling}}function pc(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Mi(n))}function gc(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Mi(e))}function $n(e,t,n,a){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Yh(e,t,n,a),t=t.sibling}function Yh(e,t,n,a){var i=t.flags;switch(t.tag){case 0:case 11:case 15:$n(e,t,n,a),i&2048&&Vi(9,t);break;case 1:$n(e,t,n,a);break;case 3:$n(e,t,n,a),i&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Mi(e)));break;case 12:if(i&2048){$n(e,t,n,a),e=t.stateNode;try{var o=t.memoizedProps,f=o.id,y=o.onPostCommit;typeof y=="function"&&y(f,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch($){Le(t,t.return,$)}}else $n(e,t,n,a);break;case 31:$n(e,t,n,a);break;case 13:$n(e,t,n,a);break;case 23:break;case 22:o=t.stateNode,f=t.alternate,t.memoizedState!==null?o._visibility&2?$n(e,t,n,a):Ki(e,t):o._visibility&2?$n(e,t,n,a):(o._visibility|=2,Bl(e,t,n,a,(t.subtreeFlags&10256)!==0||!1)),i&2048&&pc(f,t);break;case 24:$n(e,t,n,a),i&2048&&gc(t.alternate,t);break;default:$n(e,t,n,a)}}function Bl(e,t,n,a,i){for(i=i&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var o=e,f=t,y=n,$=a,M=f.flags;switch(f.tag){case 0:case 11:case 15:Bl(o,f,y,$,i),Vi(8,f);break;case 23:break;case 22:var H=f.stateNode;f.memoizedState!==null?H._visibility&2?Bl(o,f,y,$,i):Ki(o,f):(H._visibility|=2,Bl(o,f,y,$,i)),i&&M&2048&&pc(f.alternate,f);break;case 24:Bl(o,f,y,$,i),i&&M&2048&&gc(f.alternate,f);break;default:Bl(o,f,y,$,i)}t=t.sibling}}function Ki(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,a=t,i=a.flags;switch(a.tag){case 22:Ki(n,a),i&2048&&pc(a.alternate,a);break;case 24:Ki(n,a),i&2048&&gc(a.alternate,a);break;default:Ki(n,a)}t=t.sibling}}var Ji=8192;function Yl(e,t,n){if(e.subtreeFlags&Ji)for(e=e.child;e!==null;)qh(e,t,n),e=e.sibling}function qh(e,t,n){switch(e.tag){case 26:Yl(e,t,n),e.flags&Ji&&e.memoizedState!==null&&vb(n,Sn,e.memoizedState,e.memoizedProps);break;case 5:Yl(e,t,n);break;case 3:case 4:var a=Sn;Sn=_o(e.stateNode.containerInfo),Yl(e,t,n),Sn=a;break;case 22:e.memoizedState===null&&(a=e.alternate,a!==null&&a.memoizedState!==null?(a=Ji,Ji=16777216,Yl(e,t,n),Ji=a):Yl(e,t,n));break;default:Yl(e,t,n)}}function Qh(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fi(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];ht=a,Vh(a,e)}Qh(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Xh(e),e=e.sibling}function Xh(e){switch(e.tag){case 0:case 11:case 15:Fi(e),e.flags&2048&&ya(9,e,e.return);break;case 3:Fi(e);break;case 12:Fi(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,$o(e)):Fi(e);break;default:Fi(e)}}function $o(e){var t=e.deletions;if((e.flags&16)!==0){if(t!==null)for(var n=0;n<t.length;n++){var a=t[n];ht=a,Vh(a,e)}Qh(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:ya(8,t,t.return),$o(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,$o(t));break;default:$o(t)}e=e.sibling}}function Vh(e,t){for(;ht!==null;){var n=ht;switch(n.tag){case 0:case 11:case 15:ya(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var a=n.memoizedState.cachePool.pool;a!=null&&a.refCount++}break;case 24:Mi(n.memoizedState.cache)}if(a=n.child,a!==null)a.return=n,ht=a;else e:for(n=e;ht!==null;){a=ht;var i=a.sibling,o=a.return;if(Nh(a),a===n){ht=null;break e}if(i!==null){i.return=o,ht=i;break e}ht=o}}}var Mv={getCacheForType:function(e){var t=xt(lt),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return xt(lt).controller.signal}},Ov=typeof WeakMap=="function"?WeakMap:Map,Oe=0,qe=null,Se=null,je=0,Ge=0,Jt=null,va=!1,ql=!1,yc=!1,Wn=0,Pe=0,ba=0,nl=0,vc=0,Ft=0,Ql=0,Wi=null,Nt=null,bc=!1,Co=0,Zh=0,jo=1/0,wo=null,xa=null,ct=0,Sa=null,Xl=null,Pn=0,xc=0,Sc=null,Kh=null,Pi=0,$c=null;function Wt(){return(Oe&2)!==0&&je!==0?je&-je:R.T!==null?Ec():cf()}function Jh(){if(Ft===0)if((je&536870912)===0||Ee){var e=Dr;Dr<<=1,(Dr&3932160)===0&&(Dr=262144),Ft=e}else Ft=536870912;return e=Zt.current,e!==null&&(e.flags|=32),Ft}function Ut(e,t,n){(e===qe&&(Ge===2||Ge===9)||e.cancelPendingCommit!==null)&&(Vl(e,0),$a(e,je,Ft,!1)),bi(e,n),((Oe&2)===0||e!==qe)&&(e===qe&&((Oe&2)===0&&(nl|=n),Pe===4&&$a(e,je,Ft,!1)),En(e))}function Fh(e,t,n){if((Oe&6)!==0)throw Error(c(327));var a=!n&&(t&127)===0&&(t&e.expiredLanes)===0||vi(e,t),i=a?Uv(e,t):jc(e,t,!0),o=a;do{if(i===0){ql&&!a&&$a(e,t,0,!1);break}else{if(n=e.current.alternate,o&&!_v(n)){i=jc(e,t,!1),o=!1;continue}if(i===2){if(o=t,e.errorRecoveryDisabledLanes&o)var f=0;else f=e.pendingLanes&-536870913,f=f!==0?f:f&536870912?536870912:0;if(f!==0){t=f;e:{var y=e;i=Wi;var $=y.current.memoizedState.isDehydrated;if($&&(Vl(y,f).flags|=256),f=jc(y,f,!1),f!==2){if(yc&&!$){y.errorRecoveryDisabledLanes|=o,nl|=o,i=4;break e}o=Nt,Nt=i,o!==null&&(Nt===null?Nt=o:Nt.push.apply(Nt,o))}i=f}if(o=!1,i!==2)continue}}if(i===1){Vl(e,0),$a(e,t,0,!0);break}e:{switch(a=e,o=i,o){case 0:case 1:throw Error(c(345));case 4:if((t&4194048)!==t)break;case 6:$a(a,t,Ft,!va);break e;case 2:Nt=null;break;case 3:case 5:break;default:throw Error(c(329))}if((t&62914560)===t&&(i=Co+300-Yt(),10<i)){if($a(a,t,Ft,!va),Or(a,0,!0)!==0)break e;Pn=t,a.timeoutHandle=Rp(Wh.bind(null,a,n,Nt,wo,bc,t,Ft,nl,Ql,va,o,"Throttled",-0,0),i);break e}Wh(a,n,Nt,wo,bc,t,Ft,nl,Ql,va,o,null,-0,0)}}break}while(!0);En(e)}function Wh(e,t,n,a,i,o,f,y,$,M,H,X,_,G){if(e.timeoutHandle=-1,X=t.subtreeFlags,X&8192||(X&16785408)===16785408){X={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Un},qh(t,o,X);var ne=(o&62914560)===o?Co-Yt():(o&4194048)===o?Zh-Yt():0;if(ne=bb(X,ne),ne!==null){Pn=o,e.cancelPendingCommit=ne(ip.bind(null,e,t,o,n,a,i,f,y,$,H,X,null,_,G)),$a(e,o,f,!M);return}}ip(e,t,o,n,a,i,f,y,$)}function _v(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var a=0;a<n.length;a++){var i=n[a],o=i.getSnapshot;i=i.value;try{if(!Xt(o(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function $a(e,t,n,a){t&=~vc,t&=~nl,e.suspendedLanes|=t,e.pingedLanes&=~t,a&&(e.warmLanes|=t),a=e.expirationTimes;for(var i=t;0<i;){var o=31-Qt(i),f=1<<o;a[o]=-1,i&=~f}n!==0&&of(e,n,t)}function ko(){return(Oe&6)===0?(Ii(0),!1):!0}function Cc(){if(Se!==null){if(Ge===0)var e=Se.return;else e=Se,Bn=Za=null,Lu(e),Nl=null,_i=0,e=Se;for(;e!==null;)Eh(e.alternate,e),e=e.return;Se=null}}function Vl(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,tb(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Pn=0,Cc(),qe=e,Se=n=Ln(e.current,null),je=t,Ge=0,Jt=null,va=!1,ql=vi(e,t),yc=!1,Ql=Ft=vc=nl=ba=Pe=0,Nt=Wi=null,bc=!1,(t&8)!==0&&(t|=t&32);var a=e.entangledLanes;if(a!==0)for(e=e.entanglements,a&=t;0<a;){var i=31-Qt(a),o=1<<i;t|=e[i],a&=~o}return Wn=t,Vr(),n}function Ph(e,t){pe=null,R.H=qi,t===_l||t===eo?(t=hm(),Ge=3):t===Ru?(t=hm(),Ge=4):Ge=t===tc?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Jt=t,Se===null&&(Pe=1,po(e,on(t,e.current)))}function Ih(){var e=Zt.current;return e===null?!0:(je&4194048)===je?dn===null:(je&62914560)===je||(je&536870912)!==0?e===dn:!1}function ep(){var e=R.H;return R.H=qi,e===null?qi:e}function tp(){var e=R.A;return R.A=Mv,e}function Ro(){Pe=4,va||(je&4194048)!==je&&Zt.current!==null||(ql=!0),(ba&134217727)===0&&(nl&134217727)===0||qe===null||$a(qe,je,Ft,!1)}function jc(e,t,n){var a=Oe;Oe|=2;var i=ep(),o=tp();(qe!==e||je!==t)&&(wo=null,Vl(e,t)),t=!1;var f=Pe;e:do try{if(Ge!==0&&Se!==null){var y=Se,$=Jt;switch(Ge){case 8:Cc(),f=6;break e;case 3:case 2:case 9:case 6:Zt.current===null&&(t=!0);var M=Ge;if(Ge=0,Jt=null,Zl(e,y,$,M),n&&ql){f=0;break e}break;default:M=Ge,Ge=0,Jt=null,Zl(e,y,$,M)}}Nv(),f=Pe;break}catch(H){Ph(e,H)}while(!0);return t&&e.shellSuspendCounter++,Bn=Za=null,Oe=a,R.H=i,R.A=o,Se===null&&(qe=null,je=0,Vr()),f}function Nv(){for(;Se!==null;)np(Se)}function Uv(e,t){var n=Oe;Oe|=2;var a=ep(),i=tp();qe!==e||je!==t?(wo=null,jo=Yt()+500,Vl(e,t)):ql=vi(e,t);e:do try{if(Ge!==0&&Se!==null){t=Se;var o=Jt;t:switch(Ge){case 1:Ge=0,Jt=null,Zl(e,t,o,1);break;case 2:case 9:if(fm(o)){Ge=0,Jt=null,ap(t);break}t=function(){Ge!==2&&Ge!==9||qe!==e||(Ge=7),En(e)},o.then(t,t);break e;case 3:Ge=7;break e;case 4:Ge=5;break e;case 7:fm(o)?(Ge=0,Jt=null,ap(t)):(Ge=0,Jt=null,Zl(e,t,o,7));break;case 5:var f=null;switch(Se.tag){case 26:f=Se.memoizedState;case 5:case 27:var y=Se;if(f?Yp(f):y.stateNode.complete){Ge=0,Jt=null;var $=y.sibling;if($!==null)Se=$;else{var M=y.return;M!==null?(Se=M,Eo(M)):Se=null}break t}}Ge=0,Jt=null,Zl(e,t,o,5);break;case 6:Ge=0,Jt=null,Zl(e,t,o,6);break;case 8:Cc(),Pe=6;break e;default:throw Error(c(462))}}Gv();break}catch(H){Ph(e,H)}while(!0);return Bn=Za=null,R.H=a,R.A=i,Oe=n,Se!==null?0:(qe=null,je=0,Vr(),Pe)}function Gv(){for(;Se!==null&&!o0();)np(Se)}function np(e){var t=kh(e.alternate,e,Wn);e.memoizedProps=e.pendingProps,t===null?Eo(e):Se=t}function ap(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=xh(n,t,t.pendingProps,t.type,void 0,je);break;case 11:t=xh(n,t,t.pendingProps,t.type.render,t.ref,je);break;case 5:Lu(t);default:Eh(n,t),t=Se=tm(t,Wn),t=kh(n,t,Wn)}e.memoizedProps=e.pendingProps,t===null?Eo(e):Se=t}function Zl(e,t,n,a){Bn=Za=null,Lu(t),Nl=null,_i=0;var i=t.return;try{if(kv(e,i,t,n,je)){Pe=1,po(e,on(n,e.current)),Se=null;return}}catch(o){if(i!==null)throw Se=i,o;Pe=1,po(e,on(n,e.current)),Se=null;return}t.flags&32768?(Ee||a===1?e=!0:ql||(je&536870912)!==0?e=!1:(va=e=!0,(a===2||a===9||a===3||a===6)&&(a=Zt.current,a!==null&&a.tag===13&&(a.flags|=16384))),lp(t,e)):Eo(t)}function Eo(e){var t=e;do{if((t.flags&32768)!==0){lp(t,va);return}e=t.return;var n=zv(t.alternate,t,Wn);if(n!==null){Se=n;return}if(t=t.sibling,t!==null){Se=t;return}Se=t=e}while(t!==null);Pe===0&&(Pe=5)}function lp(e,t){do{var n=Av(e.alternate,e);if(n!==null){n.flags&=32767,Se=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Se=e;return}Se=e=n}while(e!==null);Pe=6,Se=null}function ip(e,t,n,a,i,o,f,y,$){e.cancelPendingCommit=null;do zo();while(ct!==0);if((Oe&6)!==0)throw Error(c(327));if(t!==null){if(t===e.current)throw Error(c(177));if(o=t.lanes|t.childLanes,o|=fu,y0(e,n,o,f,y,$),e===qe&&(Se=qe=null,je=0),Xl=t,Sa=e,Pn=n,xc=o,Sc=i,Kh=a,(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?(e.callbackNode=null,e.callbackPriority=0,Yv(Ar,function(){return cp(),null})):(e.callbackNode=null,e.callbackPriority=0),a=(t.flags&13878)!==0,(t.subtreeFlags&13878)!==0||a){a=R.T,R.T=null,i=F.p,F.p=2,f=Oe,Oe|=4;try{Tv(e,t,n)}finally{Oe=f,F.p=i,R.T=a}}ct=1,rp(),op(),sp()}}function rp(){if(ct===1){ct=0;var e=Sa,t=Xl,n=(t.flags&13878)!==0;if((t.subtreeFlags&13878)!==0||n){n=R.T,R.T=null;var a=F.p;F.p=2;var i=Oe;Oe|=4;try{Hh(t,e);var o=Nc,f=Vf(e.containerInfo),y=o.focusedElem,$=o.selectionRange;if(f!==y&&y&&y.ownerDocument&&Xf(y.ownerDocument.documentElement,y)){if($!==null&&ou(y)){var M=$.start,H=$.end;if(H===void 0&&(H=M),"selectionStart"in y)y.selectionStart=M,y.selectionEnd=Math.min(H,y.value.length);else{var X=y.ownerDocument||document,_=X&&X.defaultView||window;if(_.getSelection){var G=_.getSelection(),ne=y.textContent.length,oe=Math.min($.start,ne),Ye=$.end===void 0?oe:Math.min($.end,ne);!G.extend&&oe>Ye&&(f=Ye,Ye=oe,oe=f);var E=Qf(y,oe),w=Qf(y,Ye);if(E&&w&&(G.rangeCount!==1||G.anchorNode!==E.node||G.anchorOffset!==E.offset||G.focusNode!==w.node||G.focusOffset!==w.offset)){var D=X.createRange();D.setStart(E.node,E.offset),G.removeAllRanges(),oe>Ye?(G.addRange(D),G.extend(w.node,w.offset)):(D.setEnd(w.node,w.offset),G.addRange(D))}}}}for(X=[],G=y;G=G.parentNode;)G.nodeType===1&&X.push({element:G,left:G.scrollLeft,top:G.scrollTop});for(typeof y.focus=="function"&&y.focus(),y=0;y<X.length;y++){var Q=X[y];Q.element.scrollLeft=Q.left,Q.element.scrollTop=Q.top}}Bo=!!_c,Nc=_c=null}finally{Oe=i,F.p=a,R.T=n}}e.current=t,ct=2}}function op(){if(ct===2){ct=0;var e=Sa,t=Xl,n=(t.flags&8772)!==0;if((t.subtreeFlags&8772)!==0||n){n=R.T,R.T=null;var a=F.p;F.p=2;var i=Oe;Oe|=4;try{_h(e,t.alternate,t)}finally{Oe=i,F.p=a,R.T=n}}ct=3}}function sp(){if(ct===4||ct===3){ct=0,s0();var e=Sa,t=Xl,n=Pn,a=Kh;(t.subtreeFlags&10256)!==0||(t.flags&10256)!==0?ct=5:(ct=0,Xl=Sa=null,up(e,e.pendingLanes));var i=e.pendingLanes;if(i===0&&(xa=null),Ys(n),t=t.stateNode,qt&&typeof qt.onCommitFiberRoot=="function")try{qt.onCommitFiberRoot(yi,t,void 0,(t.current.flags&128)===128)}catch{}if(a!==null){t=R.T,i=F.p,F.p=2,R.T=null;try{for(var o=e.onRecoverableError,f=0;f<a.length;f++){var y=a[f];o(y.value,{componentStack:y.stack})}}finally{R.T=t,F.p=i}}(Pn&3)!==0&&zo(),En(e),i=e.pendingLanes,(n&261930)!==0&&(i&42)!==0?e===$c?Pi++:(Pi=0,$c=e):Pi=0,Ii(0)}}function up(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Mi(t)))}function zo(){return rp(),op(),sp(),cp()}function cp(){if(ct!==5)return!1;var e=Sa,t=xc;xc=0;var n=Ys(Pn),a=R.T,i=F.p;try{F.p=32>n?32:n,R.T=null,n=Sc,Sc=null;var o=Sa,f=Pn;if(ct=0,Xl=Sa=null,Pn=0,(Oe&6)!==0)throw Error(c(331));var y=Oe;if(Oe|=4,Xh(o.current),Yh(o,o.current,f,n),Oe=y,Ii(0,!1),qt&&typeof qt.onPostCommitFiberRoot=="function")try{qt.onPostCommitFiberRoot(yi,o)}catch{}return!0}finally{F.p=i,R.T=a,up(e,t)}}function dp(e,t,n){t=on(n,t),t=ec(e.stateNode,t,2),e=ha(e,t,2),e!==null&&(bi(e,2),En(e))}function Le(e,t,n){if(e.tag===3)dp(e,e,n);else for(;t!==null;){if(t.tag===3){dp(t,e,n);break}else if(t.tag===1){var a=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(xa===null||!xa.has(a))){e=on(n,e),n=fh(2),a=ha(t,n,2),a!==null&&(mh(n,a,t,e),bi(a,2),En(a));break}}t=t.return}}function wc(e,t,n){var a=e.pingCache;if(a===null){a=e.pingCache=new Ov;var i=new Set;a.set(t,i)}else i=a.get(t),i===void 0&&(i=new Set,a.set(t,i));i.has(n)||(yc=!0,i.add(n),e=Lv.bind(null,e,t,n),t.then(e,e))}function Lv(e,t,n){var a=e.pingCache;a!==null&&a.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,qe===e&&(je&n)===n&&(Pe===4||Pe===3&&(je&62914560)===je&&300>Yt()-Co?(Oe&2)===0&&Vl(e,0):vc|=n,Ql===je&&(Ql=0)),En(e)}function fp(e,t){t===0&&(t=rf()),e=Qa(e,t),e!==null&&(bi(e,t),En(e))}function Hv(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),fp(e,n)}function Bv(e,t){var n=0;switch(e.tag){case 31:case 13:var a=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:a=e.stateNode;break;case 22:a=e.stateNode._retryCache;break;default:throw Error(c(314))}a!==null&&a.delete(t),fp(e,n)}function Yv(e,t){return Gs(e,t)}var Ao=null,Kl=null,kc=!1,To=!1,Rc=!1,Ca=0;function En(e){e!==Kl&&e.next===null&&(Kl===null?Ao=Kl=e:Kl=Kl.next=e),To=!0,kc||(kc=!0,Qv())}function Ii(e,t){if(!Rc&&To){Rc=!0;do for(var n=!1,a=Ao;a!==null;){if(e!==0){var i=a.pendingLanes;if(i===0)var o=0;else{var f=a.suspendedLanes,y=a.pingedLanes;o=(1<<31-Qt(42|e)+1)-1,o&=i&~(f&~y),o=o&201326741?o&201326741|1:o?o|2:0}o!==0&&(n=!0,gp(a,o))}else o=je,o=Or(a,a===qe?o:0,a.cancelPendingCommit!==null||a.timeoutHandle!==-1),(o&3)===0||vi(a,o)||(n=!0,gp(a,o));a=a.next}while(n);Rc=!1}}function qv(){mp()}function mp(){To=kc=!1;var e=0;Ca!==0&&eb()&&(e=Ca);for(var t=Yt(),n=null,a=Ao;a!==null;){var i=a.next,o=hp(a,t);o===0?(a.next=null,n===null?Ao=i:n.next=i,i===null&&(Kl=n)):(n=a,(e!==0||(o&3)!==0)&&(To=!0)),a=i}ct!==0&&ct!==5||Ii(e),Ca!==0&&(Ca=0)}function hp(e,t){for(var n=e.suspendedLanes,a=e.pingedLanes,i=e.expirationTimes,o=e.pendingLanes&-62914561;0<o;){var f=31-Qt(o),y=1<<f,$=i[f];$===-1?((y&n)===0||(y&a)!==0)&&(i[f]=g0(y,t)):$<=t&&(e.expiredLanes|=y),o&=~y}if(t=qe,n=je,n=Or(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a=e.callbackNode,n===0||e===t&&(Ge===2||Ge===9)||e.cancelPendingCommit!==null)return a!==null&&a!==null&&Ls(a),e.callbackNode=null,e.callbackPriority=0;if((n&3)===0||vi(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(a!==null&&Ls(a),Ys(n)){case 2:case 8:n=af;break;case 32:n=Ar;break;case 268435456:n=lf;break;default:n=Ar}return a=pp.bind(null,e),n=Gs(n,a),e.callbackPriority=t,e.callbackNode=n,t}return a!==null&&a!==null&&Ls(a),e.callbackPriority=2,e.callbackNode=null,2}function pp(e,t){if(ct!==0&&ct!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(zo()&&e.callbackNode!==n)return null;var a=je;return a=Or(e,e===qe?a:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),a===0?null:(Fh(e,a,t),hp(e,Yt()),e.callbackNode!=null&&e.callbackNode===n?pp.bind(null,e):null)}function gp(e,t){if(zo())return null;Fh(e,t,!0)}function Qv(){nb(function(){(Oe&6)!==0?Gs(nf,qv):mp()})}function Ec(){if(Ca===0){var e=Ml;e===0&&(e=Tr,Tr<<=1,(Tr&261888)===0&&(Tr=256)),Ca=e}return Ca}function yp(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Gr(""+e)}function vp(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Xv(e,t,n,a,i){if(t==="submit"&&n&&n.stateNode===i){var o=yp((i[Tt]||null).action),f=a.submitter;f&&(t=(t=f[Tt]||null)?yp(t.formAction):f.getAttribute("formAction"),t!==null&&(o=t,f=null));var y=new Yr("action","action",null,a,i);e.push({event:y,listeners:[{instance:null,listener:function(){if(a.defaultPrevented){if(Ca!==0){var $=f?vp(i,f):new FormData(i);Ku(n,{pending:!0,data:$,method:i.method,action:o},null,$)}}else typeof o=="function"&&(y.preventDefault(),$=f?vp(i,f):new FormData(i),Ku(n,{pending:!0,data:$,method:i.method,action:o},o,$))},currentTarget:i}]})}}for(var zc=0;zc<du.length;zc++){var Ac=du[zc],Vv=Ac.toLowerCase(),Zv=Ac[0].toUpperCase()+Ac.slice(1);xn(Vv,"on"+Zv)}xn(Jf,"onAnimationEnd"),xn(Ff,"onAnimationIteration"),xn(Wf,"onAnimationStart"),xn("dblclick","onDoubleClick"),xn("focusin","onFocus"),xn("focusout","onBlur"),xn(uv,"onTransitionRun"),xn(cv,"onTransitionStart"),xn(dv,"onTransitionCancel"),xn(Pf,"onTransitionEnd"),bl("onMouseEnter",["mouseout","mouseover"]),bl("onMouseLeave",["mouseout","mouseover"]),bl("onPointerEnter",["pointerout","pointerover"]),bl("onPointerLeave",["pointerout","pointerover"]),Ha("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ha("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ha("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ha("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ha("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ha("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var er="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Kv=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(er));function bp(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var a=e[n],i=a.event;a=a.listeners;e:{var o=void 0;if(t)for(var f=a.length-1;0<=f;f--){var y=a[f],$=y.instance,M=y.currentTarget;if(y=y.listener,$!==o&&i.isPropagationStopped())break e;o=y,i.currentTarget=M;try{o(i)}catch(H){Xr(H)}i.currentTarget=null,o=$}else for(f=0;f<a.length;f++){if(y=a[f],$=y.instance,M=y.currentTarget,y=y.listener,$!==o&&i.isPropagationStopped())break e;o=y,i.currentTarget=M;try{o(i)}catch(H){Xr(H)}i.currentTarget=null,o=$}}}}function $e(e,t){var n=t[qs];n===void 0&&(n=t[qs]=new Set);var a=e+"__bubble";n.has(a)||(xp(t,e,2,!1),n.add(a))}function Tc(e,t,n){var a=0;t&&(a|=4),xp(n,e,a,t)}var Do="_reactListening"+Math.random().toString(36).slice(2);function Dc(e){if(!e[Do]){e[Do]=!0,mf.forEach(function(n){n!=="selectionchange"&&(Kv.has(n)||Tc(n,!1,e),Tc(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Do]||(t[Do]=!0,Tc("selectionchange",!1,t))}}function xp(e,t,n,a){switch(Jp(t)){case 2:var i=$b;break;case 8:i=Cb;break;default:i=Zc}n=i.bind(null,t,n,e),i=void 0,!Ps||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),a?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function Mc(e,t,n,a,i){var o=a;if((t&1)===0&&(t&2)===0&&a!==null)e:for(;;){if(a===null)return;var f=a.tag;if(f===3||f===4){var y=a.stateNode.containerInfo;if(y===i)break;if(f===4)for(f=a.return;f!==null;){var $=f.tag;if(($===3||$===4)&&f.stateNode.containerInfo===i)return;f=f.return}for(;y!==null;){if(f=gl(y),f===null)return;if($=f.tag,$===5||$===6||$===26||$===27){a=o=f;continue e}y=y.parentNode}}a=a.return}wf(function(){var M=o,H=Fs(n),X=[];e:{var _=If.get(e);if(_!==void 0){var G=Yr,ne=e;switch(e){case"keypress":if(Hr(n)===0)break e;case"keydown":case"keyup":G=B0;break;case"focusin":ne="focus",G=nu;break;case"focusout":ne="blur",G=nu;break;case"beforeblur":case"afterblur":G=nu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":G=Ef;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":G=z0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":G=Q0;break;case Jf:case Ff:case Wf:G=D0;break;case Pf:G=V0;break;case"scroll":case"scrollend":G=R0;break;case"wheel":G=K0;break;case"copy":case"cut":case"paste":G=O0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":G=Af;break;case"toggle":case"beforetoggle":G=F0}var oe=(t&4)!==0,Ye=!oe&&(e==="scroll"||e==="scrollend"),E=oe?_!==null?_+"Capture":null:_;oe=[];for(var w=M,D;w!==null;){var Q=w;if(D=Q.stateNode,Q=Q.tag,Q!==5&&Q!==26&&Q!==27||D===null||E===null||(Q=$i(w,E),Q!=null&&oe.push(tr(w,Q,D))),Ye)break;w=w.return}0<oe.length&&(_=new G(_,ne,null,n,H),X.push({event:_,listeners:oe}))}}if((t&7)===0){e:{if(_=e==="mouseover"||e==="pointerover",G=e==="mouseout"||e==="pointerout",_&&n!==Js&&(ne=n.relatedTarget||n.fromElement)&&(gl(ne)||ne[pl]))break e;if((G||_)&&(_=H.window===H?H:(_=H.ownerDocument)?_.defaultView||_.parentWindow:window,G?(ne=n.relatedTarget||n.toElement,G=M,ne=ne?gl(ne):null,ne!==null&&(Ye=m(ne),oe=ne.tag,ne!==Ye||oe!==5&&oe!==27&&oe!==6)&&(ne=null)):(G=null,ne=M),G!==ne)){if(oe=Ef,Q="onMouseLeave",E="onMouseEnter",w="mouse",(e==="pointerout"||e==="pointerover")&&(oe=Af,Q="onPointerLeave",E="onPointerEnter",w="pointer"),Ye=G==null?_:Si(G),D=ne==null?_:Si(ne),_=new oe(Q,w+"leave",G,n,H),_.target=Ye,_.relatedTarget=D,Q=null,gl(H)===M&&(oe=new oe(E,w+"enter",ne,n,H),oe.target=D,oe.relatedTarget=Ye,Q=oe),Ye=Q,G&&ne)t:{for(oe=Jv,E=G,w=ne,D=0,Q=E;Q;Q=oe(Q))D++;Q=0;for(var ie=w;ie;ie=oe(ie))Q++;for(;0<D-Q;)E=oe(E),D--;for(;0<Q-D;)w=oe(w),Q--;for(;D--;){if(E===w||w!==null&&E===w.alternate){oe=E;break t}E=oe(E),w=oe(w)}oe=null}else oe=null;G!==null&&Sp(X,_,G,oe,!1),ne!==null&&Ye!==null&&Sp(X,Ye,ne,oe,!0)}}e:{if(_=M?Si(M):window,G=_.nodeName&&_.nodeName.toLowerCase(),G==="select"||G==="input"&&_.type==="file")var De=Gf;else if(Nf(_))if(Lf)De=rv;else{De=lv;var ae=av}else G=_.nodeName,!G||G.toLowerCase()!=="input"||_.type!=="checkbox"&&_.type!=="radio"?M&&Ks(M.elementType)&&(De=Gf):De=iv;if(De&&(De=De(e,M))){Uf(X,De,n,H);break e}ae&&ae(e,_,M),e==="focusout"&&M&&_.type==="number"&&M.memoizedProps.value!=null&&Zs(_,"number",_.value)}switch(ae=M?Si(M):window,e){case"focusin":(Nf(ae)||ae.contentEditable==="true")&&(wl=ae,su=M,Ai=null);break;case"focusout":Ai=su=wl=null;break;case"mousedown":uu=!0;break;case"contextmenu":case"mouseup":case"dragend":uu=!1,Zf(X,n,H);break;case"selectionchange":if(sv)break;case"keydown":case"keyup":Zf(X,n,H)}var ge;if(lu)e:{switch(e){case"compositionstart":var we="onCompositionStart";break e;case"compositionend":we="onCompositionEnd";break e;case"compositionupdate":we="onCompositionUpdate";break e}we=void 0}else jl?Of(e,n)&&(we="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(we="onCompositionStart");we&&(Tf&&n.locale!=="ko"&&(jl||we!=="onCompositionStart"?we==="onCompositionEnd"&&jl&&(ge=kf()):(oa=H,Is="value"in oa?oa.value:oa.textContent,jl=!0)),ae=Mo(M,we),0<ae.length&&(we=new zf(we,e,null,n,H),X.push({event:we,listeners:ae}),ge?we.data=ge:(ge=_f(n),ge!==null&&(we.data=ge)))),(ge=P0?I0(e,n):ev(e,n))&&(we=Mo(M,"onBeforeInput"),0<we.length&&(ae=new zf("onBeforeInput","beforeinput",null,n,H),X.push({event:ae,listeners:we}),ae.data=ge)),Xv(X,e,M,n,H)}bp(X,t)})}function tr(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Mo(e,t){for(var n=t+"Capture",a=[];e!==null;){var i=e,o=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||o===null||(i=$i(e,n),i!=null&&a.unshift(tr(e,i,o)),i=$i(e,t),i!=null&&a.push(tr(e,i,o))),e.tag===3)return a;e=e.return}return[]}function Jv(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Sp(e,t,n,a,i){for(var o=t._reactName,f=[];n!==null&&n!==a;){var y=n,$=y.alternate,M=y.stateNode;if(y=y.tag,$!==null&&$===a)break;y!==5&&y!==26&&y!==27||M===null||($=M,i?(M=$i(n,o),M!=null&&f.unshift(tr(n,M,$))):i||(M=$i(n,o),M!=null&&f.push(tr(n,M,$)))),n=n.return}f.length!==0&&e.push({event:t,listeners:f})}var Fv=/\r\n?/g,Wv=/\u0000|\uFFFD/g;function $p(e){return(typeof e=="string"?e:""+e).replace(Fv,`
`).replace(Wv,"")}function Cp(e,t){return t=$p(t),$p(e)===t}function Be(e,t,n,a,i,o){switch(n){case"children":typeof a=="string"?t==="body"||t==="textarea"&&a===""||Sl(e,a):(typeof a=="number"||typeof a=="bigint")&&t!=="body"&&Sl(e,""+a);break;case"className":Nr(e,"class",a);break;case"tabIndex":Nr(e,"tabindex",a);break;case"dir":case"role":case"viewBox":case"width":case"height":Nr(e,n,a);break;case"style":Cf(e,a,o);break;case"data":if(t!=="object"){Nr(e,"data",a);break}case"src":case"href":if(a===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(a==null||typeof a=="function"||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Gr(""+a),e.setAttribute(n,a);break;case"action":case"formAction":if(typeof a=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof o=="function"&&(n==="formAction"?(t!=="input"&&Be(e,t,"name",i.name,i,null),Be(e,t,"formEncType",i.formEncType,i,null),Be(e,t,"formMethod",i.formMethod,i,null),Be(e,t,"formTarget",i.formTarget,i,null)):(Be(e,t,"encType",i.encType,i,null),Be(e,t,"method",i.method,i,null),Be(e,t,"target",i.target,i,null)));if(a==null||typeof a=="symbol"||typeof a=="boolean"){e.removeAttribute(n);break}a=Gr(""+a),e.setAttribute(n,a);break;case"onClick":a!=null&&(e.onclick=Un);break;case"onScroll":a!=null&&$e("scroll",e);break;case"onScrollEnd":a!=null&&$e("scrollend",e);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(c(60));e.innerHTML=n}}break;case"multiple":e.multiple=a&&typeof a!="function"&&typeof a!="symbol";break;case"muted":e.muted=a&&typeof a!="function"&&typeof a!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(a==null||typeof a=="function"||typeof a=="boolean"||typeof a=="symbol"){e.removeAttribute("xlink:href");break}n=Gr(""+a),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""+a):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":a&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":a===!0?e.setAttribute(n,""):a!==!1&&a!=null&&typeof a!="function"&&typeof a!="symbol"?e.setAttribute(n,a):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":a!=null&&typeof a!="function"&&typeof a!="symbol"&&!isNaN(a)&&1<=a?e.setAttribute(n,a):e.removeAttribute(n);break;case"rowSpan":case"start":a==null||typeof a=="function"||typeof a=="symbol"||isNaN(a)?e.removeAttribute(n):e.setAttribute(n,a);break;case"popover":$e("beforetoggle",e),$e("toggle",e),_r(e,"popover",a);break;case"xlinkActuate":Nn(e,"http://www.w3.org/1999/xlink","xlink:actuate",a);break;case"xlinkArcrole":Nn(e,"http://www.w3.org/1999/xlink","xlink:arcrole",a);break;case"xlinkRole":Nn(e,"http://www.w3.org/1999/xlink","xlink:role",a);break;case"xlinkShow":Nn(e,"http://www.w3.org/1999/xlink","xlink:show",a);break;case"xlinkTitle":Nn(e,"http://www.w3.org/1999/xlink","xlink:title",a);break;case"xlinkType":Nn(e,"http://www.w3.org/1999/xlink","xlink:type",a);break;case"xmlBase":Nn(e,"http://www.w3.org/XML/1998/namespace","xml:base",a);break;case"xmlLang":Nn(e,"http://www.w3.org/XML/1998/namespace","xml:lang",a);break;case"xmlSpace":Nn(e,"http://www.w3.org/XML/1998/namespace","xml:space",a);break;case"is":_r(e,"is",a);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=w0.get(n)||n,_r(e,n,a))}}function Oc(e,t,n,a,i,o){switch(n){case"style":Cf(e,a,o);break;case"dangerouslySetInnerHTML":if(a!=null){if(typeof a!="object"||!("__html"in a))throw Error(c(61));if(n=a.__html,n!=null){if(i.children!=null)throw Error(c(60));e.innerHTML=n}}break;case"children":typeof a=="string"?Sl(e,a):(typeof a=="number"||typeof a=="bigint")&&Sl(e,""+a);break;case"onScroll":a!=null&&$e("scroll",e);break;case"onScrollEnd":a!=null&&$e("scrollend",e);break;case"onClick":a!=null&&(e.onclick=Un);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!hf.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(i=n.endsWith("Capture"),t=n.slice(2,i?n.length-7:void 0),o=e[Tt]||null,o=o!=null?o[n]:null,typeof o=="function"&&e.removeEventListener(t,o,i),typeof a=="function")){typeof o!="function"&&o!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,a,i);break e}n in e?e[n]=a:a===!0?e.setAttribute(n,""):_r(e,n,a)}}}function $t(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":$e("error",e),$e("load",e);var a=!1,i=!1,o;for(o in n)if(n.hasOwnProperty(o)){var f=n[o];if(f!=null)switch(o){case"src":a=!0;break;case"srcSet":i=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:Be(e,t,o,f,n,null)}}i&&Be(e,t,"srcSet",n.srcSet,n,null),a&&Be(e,t,"src",n.src,n,null);return;case"input":$e("invalid",e);var y=o=f=i=null,$=null,M=null;for(a in n)if(n.hasOwnProperty(a)){var H=n[a];if(H!=null)switch(a){case"name":i=H;break;case"type":f=H;break;case"checked":$=H;break;case"defaultChecked":M=H;break;case"value":o=H;break;case"defaultValue":y=H;break;case"children":case"dangerouslySetInnerHTML":if(H!=null)throw Error(c(137,t));break;default:Be(e,t,a,H,n,null)}}bf(e,o,y,$,M,f,i,!1);return;case"select":$e("invalid",e),a=f=o=null;for(i in n)if(n.hasOwnProperty(i)&&(y=n[i],y!=null))switch(i){case"value":o=y;break;case"defaultValue":f=y;break;case"multiple":a=y;default:Be(e,t,i,y,n,null)}t=o,n=f,e.multiple=!!a,t!=null?xl(e,!!a,t,!1):n!=null&&xl(e,!!a,n,!0);return;case"textarea":$e("invalid",e),o=i=a=null;for(f in n)if(n.hasOwnProperty(f)&&(y=n[f],y!=null))switch(f){case"value":a=y;break;case"defaultValue":i=y;break;case"children":o=y;break;case"dangerouslySetInnerHTML":if(y!=null)throw Error(c(91));break;default:Be(e,t,f,y,n,null)}Sf(e,a,i,o);return;case"option":for($ in n)if(n.hasOwnProperty($)&&(a=n[$],a!=null))switch($){case"selected":e.selected=a&&typeof a!="function"&&typeof a!="symbol";break;default:Be(e,t,$,a,n,null)}return;case"dialog":$e("beforetoggle",e),$e("toggle",e),$e("cancel",e),$e("close",e);break;case"iframe":case"object":$e("load",e);break;case"video":case"audio":for(a=0;a<er.length;a++)$e(er[a],e);break;case"image":$e("error",e),$e("load",e);break;case"details":$e("toggle",e);break;case"embed":case"source":case"link":$e("error",e),$e("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(M in n)if(n.hasOwnProperty(M)&&(a=n[M],a!=null))switch(M){case"children":case"dangerouslySetInnerHTML":throw Error(c(137,t));default:Be(e,t,M,a,n,null)}return;default:if(Ks(t)){for(H in n)n.hasOwnProperty(H)&&(a=n[H],a!==void 0&&Oc(e,t,H,a,n,void 0));return}}for(y in n)n.hasOwnProperty(y)&&(a=n[y],a!=null&&Be(e,t,y,a,n,null))}function Pv(e,t,n,a){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var i=null,o=null,f=null,y=null,$=null,M=null,H=null;for(G in n){var X=n[G];if(n.hasOwnProperty(G)&&X!=null)switch(G){case"checked":break;case"value":break;case"defaultValue":$=X;default:a.hasOwnProperty(G)||Be(e,t,G,null,a,X)}}for(var _ in a){var G=a[_];if(X=n[_],a.hasOwnProperty(_)&&(G!=null||X!=null))switch(_){case"type":o=G;break;case"name":i=G;break;case"checked":M=G;break;case"defaultChecked":H=G;break;case"value":f=G;break;case"defaultValue":y=G;break;case"children":case"dangerouslySetInnerHTML":if(G!=null)throw Error(c(137,t));break;default:G!==X&&Be(e,t,_,G,a,X)}}Vs(e,f,y,$,M,H,o,i);return;case"select":G=f=y=_=null;for(o in n)if($=n[o],n.hasOwnProperty(o)&&$!=null)switch(o){case"value":break;case"multiple":G=$;default:a.hasOwnProperty(o)||Be(e,t,o,null,a,$)}for(i in a)if(o=a[i],$=n[i],a.hasOwnProperty(i)&&(o!=null||$!=null))switch(i){case"value":_=o;break;case"defaultValue":y=o;break;case"multiple":f=o;default:o!==$&&Be(e,t,i,o,a,$)}t=y,n=f,a=G,_!=null?xl(e,!!n,_,!1):!!a!=!!n&&(t!=null?xl(e,!!n,t,!0):xl(e,!!n,n?[]:"",!1));return;case"textarea":G=_=null;for(y in n)if(i=n[y],n.hasOwnProperty(y)&&i!=null&&!a.hasOwnProperty(y))switch(y){case"value":break;case"children":break;default:Be(e,t,y,null,a,i)}for(f in a)if(i=a[f],o=n[f],a.hasOwnProperty(f)&&(i!=null||o!=null))switch(f){case"value":_=i;break;case"defaultValue":G=i;break;case"children":break;case"dangerouslySetInnerHTML":if(i!=null)throw Error(c(91));break;default:i!==o&&Be(e,t,f,i,a,o)}xf(e,_,G);return;case"option":for(var ne in n)if(_=n[ne],n.hasOwnProperty(ne)&&_!=null&&!a.hasOwnProperty(ne))switch(ne){case"selected":e.selected=!1;break;default:Be(e,t,ne,null,a,_)}for($ in a)if(_=a[$],G=n[$],a.hasOwnProperty($)&&_!==G&&(_!=null||G!=null))switch($){case"selected":e.selected=_&&typeof _!="function"&&typeof _!="symbol";break;default:Be(e,t,$,_,a,G)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var oe in n)_=n[oe],n.hasOwnProperty(oe)&&_!=null&&!a.hasOwnProperty(oe)&&Be(e,t,oe,null,a,_);for(M in a)if(_=a[M],G=n[M],a.hasOwnProperty(M)&&_!==G&&(_!=null||G!=null))switch(M){case"children":case"dangerouslySetInnerHTML":if(_!=null)throw Error(c(137,t));break;default:Be(e,t,M,_,a,G)}return;default:if(Ks(t)){for(var Ye in n)_=n[Ye],n.hasOwnProperty(Ye)&&_!==void 0&&!a.hasOwnProperty(Ye)&&Oc(e,t,Ye,void 0,a,_);for(H in a)_=a[H],G=n[H],!a.hasOwnProperty(H)||_===G||_===void 0&&G===void 0||Oc(e,t,H,_,a,G);return}}for(var E in n)_=n[E],n.hasOwnProperty(E)&&_!=null&&!a.hasOwnProperty(E)&&Be(e,t,E,null,a,_);for(X in a)_=a[X],G=n[X],!a.hasOwnProperty(X)||_===G||_==null&&G==null||Be(e,t,X,_,a,G)}function jp(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Iv(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),a=0;a<n.length;a++){var i=n[a],o=i.transferSize,f=i.initiatorType,y=i.duration;if(o&&y&&jp(f)){for(f=0,y=i.responseEnd,a+=1;a<n.length;a++){var $=n[a],M=$.startTime;if(M>y)break;var H=$.transferSize,X=$.initiatorType;H&&jp(X)&&($=$.responseEnd,f+=H*($<y?1:(y-M)/($-M)))}if(--a,t+=8*(o+f)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var _c=null,Nc=null;function Oo(e){return e.nodeType===9?e:e.ownerDocument}function wp(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function kp(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Uc(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Gc=null;function eb(){var e=window.event;return e&&e.type==="popstate"?e===Gc?!1:(Gc=e,!0):(Gc=null,!1)}var Rp=typeof setTimeout=="function"?setTimeout:void 0,tb=typeof clearTimeout=="function"?clearTimeout:void 0,Ep=typeof Promise=="function"?Promise:void 0,nb=typeof queueMicrotask=="function"?queueMicrotask:typeof Ep<"u"?function(e){return Ep.resolve(null).then(e).catch(ab)}:Rp;function ab(e){setTimeout(function(){throw e})}function ja(e){return e==="head"}function zp(e,t){var n=t,a=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"||n==="/&"){if(a===0){e.removeChild(i),Pl(t);return}a--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")a++;else if(n==="html")nr(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,nr(n);for(var o=n.firstChild;o;){var f=o.nextSibling,y=o.nodeName;o[xi]||y==="SCRIPT"||y==="STYLE"||y==="LINK"&&o.rel.toLowerCase()==="stylesheet"||n.removeChild(o),o=f}}else n==="body"&&nr(e.ownerDocument.body);n=i}while(n);Pl(t)}function Ap(e,t){var n=e;e=0;do{var a=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=a}while(n)}function Lc(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Lc(n),Qs(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function lb(e,t,n,a){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!a&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(a){if(!e[xi])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(o=e.getAttribute("rel"),o==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(o!==i.rel||e.getAttribute("href")!==(i.href==null||i.href===""?null:i.href)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute("title")!==(i.title==null?null:i.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(o=e.getAttribute("src"),(o!==(i.src==null?null:i.src)||e.getAttribute("type")!==(i.type==null?null:i.type)||e.getAttribute("crossorigin")!==(i.crossOrigin==null?null:i.crossOrigin))&&o&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var o=i.name==null?null:""+i.name;if(i.type==="hidden"&&e.getAttribute("name")===o)return e}else return e;if(e=fn(e.nextSibling),e===null)break}return null}function ib(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=fn(e.nextSibling),e===null))return null;return e}function Tp(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=fn(e.nextSibling),e===null))return null;return e}function Hc(e){return e.data==="$?"||e.data==="$~"}function Bc(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function rb(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var a=function(){t(),n.removeEventListener("DOMContentLoaded",a)};n.addEventListener("DOMContentLoaded",a),e._reactRetry=a}}function fn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Yc=null;function Dp(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return fn(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function Mp(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Op(e,t,n){switch(t=Oo(n),e){case"html":if(e=t.documentElement,!e)throw Error(c(452));return e;case"head":if(e=t.head,!e)throw Error(c(453));return e;case"body":if(e=t.body,!e)throw Error(c(454));return e;default:throw Error(c(451))}}function nr(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Qs(e)}var mn=new Map,_p=new Set;function _o(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var In=F.d;F.d={f:ob,r:sb,D:ub,C:cb,L:db,m:fb,X:hb,S:mb,M:pb};function ob(){var e=In.f(),t=ko();return e||t}function sb(e){var t=yl(e);t!==null&&t.tag===5&&t.type==="form"?Pm(t):In.r(e)}var Jl=typeof document>"u"?null:document;function Np(e,t,n){var a=Jl;if(a&&typeof t=="string"&&t){var i=ln(t);i='link[rel="'+e+'"][href="'+i+'"]',typeof n=="string"&&(i+='[crossorigin="'+n+'"]'),_p.has(i)||(_p.add(i),e={rel:e,crossOrigin:n,href:t},a.querySelector(i)===null&&(t=a.createElement("link"),$t(t,"link",e),mt(t),a.head.appendChild(t)))}}function ub(e){In.D(e),Np("dns-prefetch",e,null)}function cb(e,t){In.C(e,t),Np("preconnect",e,t)}function db(e,t,n){In.L(e,t,n);var a=Jl;if(a&&e&&t){var i='link[rel="preload"][as="'+ln(t)+'"]';t==="image"&&n&&n.imageSrcSet?(i+='[imagesrcset="'+ln(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(i+='[imagesizes="'+ln(n.imageSizes)+'"]')):i+='[href="'+ln(e)+'"]';var o=i;switch(t){case"style":o=Fl(e);break;case"script":o=Wl(e)}mn.has(o)||(e=S({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),mn.set(o,e),a.querySelector(i)!==null||t==="style"&&a.querySelector(ar(o))||t==="script"&&a.querySelector(lr(o))||(t=a.createElement("link"),$t(t,"link",e),mt(t),a.head.appendChild(t)))}}function fb(e,t){In.m(e,t);var n=Jl;if(n&&e){var a=t&&typeof t.as=="string"?t.as:"script",i='link[rel="modulepreload"][as="'+ln(a)+'"][href="'+ln(e)+'"]',o=i;switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":o=Wl(e)}if(!mn.has(o)&&(e=S({rel:"modulepreload",href:e},t),mn.set(o,e),n.querySelector(i)===null)){switch(a){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(lr(o)))return}a=n.createElement("link"),$t(a,"link",e),mt(a),n.head.appendChild(a)}}}function mb(e,t,n){In.S(e,t,n);var a=Jl;if(a&&e){var i=vl(a).hoistableStyles,o=Fl(e);t=t||"default";var f=i.get(o);if(!f){var y={loading:0,preload:null};if(f=a.querySelector(ar(o)))y.loading=5;else{e=S({rel:"stylesheet",href:e,"data-precedence":t},n),(n=mn.get(o))&&qc(e,n);var $=f=a.createElement("link");mt($),$t($,"link",e),$._p=new Promise(function(M,H){$.onload=M,$.onerror=H}),$.addEventListener("load",function(){y.loading|=1}),$.addEventListener("error",function(){y.loading|=2}),y.loading|=4,No(f,t,a)}f={type:"stylesheet",instance:f,count:1,state:y},i.set(o,f)}}}function hb(e,t){In.X(e,t);var n=Jl;if(n&&e){var a=vl(n).hoistableScripts,i=Wl(e),o=a.get(i);o||(o=n.querySelector(lr(i)),o||(e=S({src:e,async:!0},t),(t=mn.get(i))&&Qc(e,t),o=n.createElement("script"),mt(o),$t(o,"link",e),n.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},a.set(i,o))}}function pb(e,t){In.M(e,t);var n=Jl;if(n&&e){var a=vl(n).hoistableScripts,i=Wl(e),o=a.get(i);o||(o=n.querySelector(lr(i)),o||(e=S({src:e,async:!0,type:"module"},t),(t=mn.get(i))&&Qc(e,t),o=n.createElement("script"),mt(o),$t(o,"link",e),n.head.appendChild(o)),o={type:"script",instance:o,count:1,state:null},a.set(i,o))}}function Up(e,t,n,a){var i=(i=he.current)?_o(i):null;if(!i)throw Error(c(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=Fl(n.href),n=vl(i).hoistableStyles,a=n.get(t),a||(a={type:"style",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Fl(n.href);var o=vl(i).hoistableStyles,f=o.get(e);if(f||(i=i.ownerDocument||i,f={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},o.set(e,f),(o=i.querySelector(ar(e)))&&!o._p&&(f.instance=o,f.state.loading=5),mn.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},mn.set(e,n),o||gb(i,e,n,f.state))),t&&a===null)throw Error(c(528,""));return f}if(t&&a!==null)throw Error(c(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Wl(n),n=vl(i).hoistableScripts,a=n.get(t),a||(a={type:"script",instance:null,count:0,state:null},n.set(t,a)),a):{type:"void",instance:null,count:0,state:null};default:throw Error(c(444,e))}}function Fl(e){return'href="'+ln(e)+'"'}function ar(e){return'link[rel="stylesheet"]['+e+"]"}function Gp(e){return S({},e,{"data-precedence":e.precedence,precedence:null})}function gb(e,t,n,a){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?a.loading=1:(t=e.createElement("link"),a.preload=t,t.addEventListener("load",function(){return a.loading|=1}),t.addEventListener("error",function(){return a.loading|=2}),$t(t,"link",n),mt(t),e.head.appendChild(t))}function Wl(e){return'[src="'+ln(e)+'"]'}function lr(e){return"script[async]"+e}function Lp(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var a=e.querySelector('style[data-href~="'+ln(n.href)+'"]');if(a)return t.instance=a,mt(a),a;var i=S({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return a=(e.ownerDocument||e).createElement("style"),mt(a),$t(a,"style",i),No(a,n.precedence,e),t.instance=a;case"stylesheet":i=Fl(n.href);var o=e.querySelector(ar(i));if(o)return t.state.loading|=4,t.instance=o,mt(o),o;a=Gp(n),(i=mn.get(i))&&qc(a,i),o=(e.ownerDocument||e).createElement("link"),mt(o);var f=o;return f._p=new Promise(function(y,$){f.onload=y,f.onerror=$}),$t(o,"link",a),t.state.loading|=4,No(o,n.precedence,e),t.instance=o;case"script":return o=Wl(n.src),(i=e.querySelector(lr(o)))?(t.instance=i,mt(i),i):(a=n,(i=mn.get(o))&&(a=S({},n),Qc(a,i)),e=e.ownerDocument||e,i=e.createElement("script"),mt(i),$t(i,"link",a),e.head.appendChild(i),t.instance=i);case"void":return null;default:throw Error(c(443,t.type))}else t.type==="stylesheet"&&(t.state.loading&4)===0&&(a=t.instance,t.state.loading|=4,No(a,n.precedence,e));return t.instance}function No(e,t,n){for(var a=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),i=a.length?a[a.length-1]:null,o=i,f=0;f<a.length;f++){var y=a[f];if(y.dataset.precedence===t)o=y;else if(o!==i)break}o?o.parentNode.insertBefore(e,o.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function qc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Qc(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var Uo=null;function Hp(e,t,n){if(Uo===null){var a=new Map,i=Uo=new Map;i.set(n,a)}else i=Uo,a=i.get(n),a||(a=new Map,i.set(n,a));if(a.has(e))return a;for(a.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var o=n[i];if(!(o[xi]||o[vt]||e==="link"&&o.getAttribute("rel")==="stylesheet")&&o.namespaceURI!=="http://www.w3.org/2000/svg"){var f=o.getAttribute(t)||"";f=e+f;var y=a.get(f);y?y.push(o):a.set(f,[o])}}return a}function Bp(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function yb(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function Yp(e){return!(e.type==="stylesheet"&&(e.state.loading&3)===0)}function vb(e,t,n,a){if(n.type==="stylesheet"&&(typeof a.media!="string"||matchMedia(a.media).matches!==!1)&&(n.state.loading&4)===0){if(n.instance===null){var i=Fl(a.href),o=t.querySelector(ar(i));if(o){t=o._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Go.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=o,mt(o);return}o=t.ownerDocument||t,a=Gp(a),(i=mn.get(i))&&qc(a,i),o=o.createElement("link"),mt(o);var f=o;f._p=new Promise(function(y,$){f.onload=y,f.onerror=$}),$t(o,"link",a),n.instance=o}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&(n.state.loading&3)===0&&(e.count++,n=Go.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var Xc=0;function bb(e,t){return e.stylesheets&&e.count===0&&Ho(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var a=setTimeout(function(){if(e.stylesheets&&Ho(e,e.stylesheets),e.unsuspend){var o=e.unsuspend;e.unsuspend=null,o()}},6e4+t);0<e.imgBytes&&Xc===0&&(Xc=62500*Iv());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&Ho(e,e.stylesheets),e.unsuspend)){var o=e.unsuspend;e.unsuspend=null,o()}},(e.imgBytes>Xc?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(a),clearTimeout(i)}}:null}function Go(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Ho(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Lo=null;function Ho(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Lo=new Map,t.forEach(xb,e),Lo=null,Go.call(e))}function xb(e,t){if(!(t.state.loading&4)){var n=Lo.get(e);if(n)var a=n.get(null);else{n=new Map,Lo.set(e,n);for(var i=e.querySelectorAll("link[data-precedence],style[data-precedence]"),o=0;o<i.length;o++){var f=i[o];(f.nodeName==="LINK"||f.getAttribute("media")!=="not all")&&(n.set(f.dataset.precedence,f),a=f)}a&&n.set(null,a)}i=t.instance,f=i.getAttribute("data-precedence"),o=n.get(f)||a,o===a&&n.set(null,i),n.set(f,i),this.count++,a=Go.bind(this),i.addEventListener("load",a),i.addEventListener("error",a),o?o.parentNode.insertBefore(i,o.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var ir={$$typeof:K,Provider:null,Consumer:null,_currentValue:ee,_currentValue2:ee,_threadCount:0};function Sb(e,t,n,a,i,o,f,y,$){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Hs(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Hs(0),this.hiddenUpdates=Hs(null),this.identifierPrefix=a,this.onUncaughtError=i,this.onCaughtError=o,this.onRecoverableError=f,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=$,this.incompleteTransitions=new Map}function qp(e,t,n,a,i,o,f,y,$,M,H,X){return e=new Sb(e,t,n,f,$,M,H,X,y),t=1,o===!0&&(t|=24),o=Vt(3,null,null,t),e.current=o,o.stateNode=e,t=ju(),t.refCount++,e.pooledCache=t,t.refCount++,o.memoizedState={element:a,isDehydrated:n,cache:t},Eu(o),e}function Qp(e){return e?(e=El,e):El}function Xp(e,t,n,a,i,o){i=Qp(i),a.context===null?a.context=i:a.pendingContext=i,a=ma(t),a.payload={element:n},o=o===void 0?null:o,o!==null&&(a.callback=o),n=ha(e,a,t),n!==null&&(Ut(n,e,t),Ui(n,e,t))}function Vp(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Vc(e,t){Vp(e,t),(e=e.alternate)&&Vp(e,t)}function Zp(e){if(e.tag===13||e.tag===31){var t=Qa(e,67108864);t!==null&&Ut(t,e,67108864),Vc(e,67108864)}}function Kp(e){if(e.tag===13||e.tag===31){var t=Wt();t=Bs(t);var n=Qa(e,t);n!==null&&Ut(n,e,t),Vc(e,t)}}var Bo=!0;function $b(e,t,n,a){var i=R.T;R.T=null;var o=F.p;try{F.p=2,Zc(e,t,n,a)}finally{F.p=o,R.T=i}}function Cb(e,t,n,a){var i=R.T;R.T=null;var o=F.p;try{F.p=8,Zc(e,t,n,a)}finally{F.p=o,R.T=i}}function Zc(e,t,n,a){if(Bo){var i=Kc(a);if(i===null)Mc(e,t,a,Yo,n),Fp(e,a);else if(wb(i,e,t,n,a))a.stopPropagation();else if(Fp(e,a),t&4&&-1<jb.indexOf(e)){for(;i!==null;){var o=yl(i);if(o!==null)switch(o.tag){case 3:if(o=o.stateNode,o.current.memoizedState.isDehydrated){var f=La(o.pendingLanes);if(f!==0){var y=o;for(y.pendingLanes|=2,y.entangledLanes|=2;f;){var $=1<<31-Qt(f);y.entanglements[1]|=$,f&=~$}En(o),(Oe&6)===0&&(jo=Yt()+500,Ii(0))}}break;case 31:case 13:y=Qa(o,2),y!==null&&Ut(y,o,2),ko(),Vc(o,2)}if(o=Kc(a),o===null&&Mc(e,t,a,Yo,n),o===i)break;i=o}i!==null&&a.stopPropagation()}else Mc(e,t,a,null,n)}}function Kc(e){return e=Fs(e),Jc(e)}var Yo=null;function Jc(e){if(Yo=null,e=gl(e),e!==null){var t=m(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=h(t),e!==null)return e;e=null}else if(n===31){if(e=v(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Yo=e,null}function Jp(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(u0()){case nf:return 2;case af:return 8;case Ar:case c0:return 32;case lf:return 268435456;default:return 32}default:return 32}}var Fc=!1,wa=null,ka=null,Ra=null,rr=new Map,or=new Map,Ea=[],jb="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Fp(e,t){switch(e){case"focusin":case"focusout":wa=null;break;case"dragenter":case"dragleave":ka=null;break;case"mouseover":case"mouseout":Ra=null;break;case"pointerover":case"pointerout":rr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":or.delete(t.pointerId)}}function sr(e,t,n,a,i,o){return e===null||e.nativeEvent!==o?(e={blockedOn:t,domEventName:n,eventSystemFlags:a,nativeEvent:o,targetContainers:[i]},t!==null&&(t=yl(t),t!==null&&Zp(t)),e):(e.eventSystemFlags|=a,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function wb(e,t,n,a,i){switch(t){case"focusin":return wa=sr(wa,e,t,n,a,i),!0;case"dragenter":return ka=sr(ka,e,t,n,a,i),!0;case"mouseover":return Ra=sr(Ra,e,t,n,a,i),!0;case"pointerover":var o=i.pointerId;return rr.set(o,sr(rr.get(o)||null,e,t,n,a,i)),!0;case"gotpointercapture":return o=i.pointerId,or.set(o,sr(or.get(o)||null,e,t,n,a,i)),!0}return!1}function Wp(e){var t=gl(e.target);if(t!==null){var n=m(t);if(n!==null){if(t=n.tag,t===13){if(t=h(n),t!==null){e.blockedOn=t,df(e.priority,function(){Kp(n)});return}}else if(t===31){if(t=v(n),t!==null){e.blockedOn=t,df(e.priority,function(){Kp(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function qo(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Kc(e.nativeEvent);if(n===null){n=e.nativeEvent;var a=new n.constructor(n.type,n);Js=a,n.target.dispatchEvent(a),Js=null}else return t=yl(n),t!==null&&Zp(t),e.blockedOn=n,!1;t.shift()}return!0}function Pp(e,t,n){qo(e)&&n.delete(t)}function kb(){Fc=!1,wa!==null&&qo(wa)&&(wa=null),ka!==null&&qo(ka)&&(ka=null),Ra!==null&&qo(Ra)&&(Ra=null),rr.forEach(Pp),or.forEach(Pp)}function Qo(e,t){e.blockedOn===t&&(e.blockedOn=null,Fc||(Fc=!0,l.unstable_scheduleCallback(l.unstable_NormalPriority,kb)))}var Xo=null;function Ip(e){Xo!==e&&(Xo=e,l.unstable_scheduleCallback(l.unstable_NormalPriority,function(){Xo===e&&(Xo=null);for(var t=0;t<e.length;t+=3){var n=e[t],a=e[t+1],i=e[t+2];if(typeof a!="function"){if(Jc(a||n)===null)continue;break}var o=yl(n);o!==null&&(e.splice(t,3),t-=3,Ku(o,{pending:!0,data:i,method:n.method,action:a},a,i))}}))}function Pl(e){function t($){return Qo($,e)}wa!==null&&Qo(wa,e),ka!==null&&Qo(ka,e),Ra!==null&&Qo(Ra,e),rr.forEach(t),or.forEach(t);for(var n=0;n<Ea.length;n++){var a=Ea[n];a.blockedOn===e&&(a.blockedOn=null)}for(;0<Ea.length&&(n=Ea[0],n.blockedOn===null);)Wp(n),n.blockedOn===null&&Ea.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(a=0;a<n.length;a+=3){var i=n[a],o=n[a+1],f=i[Tt]||null;if(typeof o=="function")f||Ip(n);else if(f){var y=null;if(o&&o.hasAttribute("formAction")){if(i=o,f=o[Tt]||null)y=f.formAction;else if(Jc(i)!==null)continue}else y=f.action;typeof y=="function"?n[a+1]=y:(n.splice(a,3),a-=3),Ip(n)}}}function eg(){function e(o){o.canIntercept&&o.info==="react-transition"&&o.intercept({handler:function(){return new Promise(function(f){return i=f})},focusReset:"manual",scroll:"manual"})}function t(){i!==null&&(i(),i=null),a||setTimeout(n,20)}function n(){if(!a&&!navigation.transition){var o=navigation.currentEntry;o&&o.url!=null&&navigation.navigate(o.url,{state:o.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var a=!1,i=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){a=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),i!==null&&(i(),i=null)}}}function Wc(e){this._internalRoot=e}Vo.prototype.render=Wc.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(c(409));var n=t.current,a=Wt();Xp(n,a,e,t,null,null)},Vo.prototype.unmount=Wc.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Xp(e.current,2,null,e,null,null),ko(),t[pl]=null}};function Vo(e){this._internalRoot=e}Vo.prototype.unstable_scheduleHydration=function(e){if(e){var t=cf();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ea.length&&t!==0&&t<Ea[n].priority;n++);Ea.splice(n,0,e),n===0&&Wp(e)}};var tg=r.version;if(tg!=="19.2.0")throw Error(c(527,tg,"19.2.0"));F.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(c(188)):(e=Object.keys(e).join(","),Error(c(268,e)));return e=p(t),e=e!==null?x(e):null,e=e===null?null:e.stateNode,e};var Rb={bundleType:0,version:"19.2.0",rendererPackageName:"react-dom",currentDispatcherRef:R,reconcilerVersion:"19.2.0"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Zo=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Zo.isDisabled&&Zo.supportsFiber)try{yi=Zo.inject(Rb),qt=Zo}catch{}}return cr.createRoot=function(e,t){if(!d(e))throw Error(c(299));var n=!1,a="",i=sh,o=uh,f=ch;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(a=t.identifierPrefix),t.onUncaughtError!==void 0&&(i=t.onUncaughtError),t.onCaughtError!==void 0&&(o=t.onCaughtError),t.onRecoverableError!==void 0&&(f=t.onRecoverableError)),t=qp(e,1,!1,null,null,n,a,null,i,o,f,eg),e[pl]=t.current,Dc(e),new Wc(t)},cr.hydrateRoot=function(e,t,n){if(!d(e))throw Error(c(299));var a=!1,i="",o=sh,f=uh,y=ch,$=null;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onUncaughtError!==void 0&&(o=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError),n.formState!==void 0&&($=n.formState)),t=qp(e,1,!0,t,n??null,a,i,$,o,f,y,eg),t.context=Qp(null),n=t.current,a=Wt(),a=Bs(a),i=ma(a),i.callback=null,ha(n,i,a),n=a,t.current.lanes=n,bi(t,n),En(t),e[pl]=t.current,Dc(e),new Vo(t)},cr.version="19.2.0",cr}var dg;function Ub(){if(dg)return ed.exports;dg=1;function l(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(l)}catch(r){console.error(r)}}return l(),ed.exports=Nb(),ed.exports}var Gb=Ub();const Lb=Pg(Gb);/**
 * react-router v7.9.5
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var fg="popstate";function Hb(l={}){function r(c,d){let{pathname:m,search:h,hash:v}=c.location;return bd("",{pathname:m,search:h,hash:v},d.state&&d.state.usr||null,d.state&&d.state.key||"default")}function u(c,d){return typeof d=="string"?d:xr(d)}return Yb(r,u,null,l)}function Je(l,r){if(l===!1||l===null||typeof l>"u")throw new Error(r)}function An(l,r){if(!l){typeof console<"u"&&console.warn(r);try{throw new Error(r)}catch{}}}function Bb(){return Math.random().toString(36).substring(2,10)}function mg(l,r){return{usr:l.state,key:l.key,idx:r}}function bd(l,r,u=null,c){return{pathname:typeof l=="string"?l:l.pathname,search:"",hash:"",...typeof r=="string"?fi(r):r,state:u,key:r&&r.key||c||Bb()}}function xr({pathname:l="/",search:r="",hash:u=""}){return r&&r!=="?"&&(l+=r.charAt(0)==="?"?r:"?"+r),u&&u!=="#"&&(l+=u.charAt(0)==="#"?u:"#"+u),l}function fi(l){let r={};if(l){let u=l.indexOf("#");u>=0&&(r.hash=l.substring(u),l=l.substring(0,u));let c=l.indexOf("?");c>=0&&(r.search=l.substring(c),l=l.substring(0,c)),l&&(r.pathname=l)}return r}function Yb(l,r,u,c={}){let{window:d=document.defaultView,v5Compat:m=!1}=c,h=d.history,v="POP",g=null,p=x();p==null&&(p=0,h.replaceState({...h.state,idx:p},""));function x(){return(h.state||{idx:null}).idx}function S(){v="POP";let L=x(),O=L==null?null:L-p;p=L,g&&g({action:v,location:N.location,delta:O})}function C(L,O){v="PUSH";let B=bd(N.location,L,O);p=x()+1;let K=mg(B,p),j=N.createHref(B);try{h.pushState(K,"",j)}catch(V){if(V instanceof DOMException&&V.name==="DataCloneError")throw V;d.location.assign(j)}m&&g&&g({action:v,location:N.location,delta:1})}function A(L,O){v="REPLACE";let B=bd(N.location,L,O);p=x();let K=mg(B,p),j=N.createHref(B);h.replaceState(K,"",j),m&&g&&g({action:v,location:N.location,delta:0})}function U(L){return qb(L)}let N={get action(){return v},get location(){return l(d,h)},listen(L){if(g)throw new Error("A history only accepts one active listener");return d.addEventListener(fg,S),g=L,()=>{d.removeEventListener(fg,S),g=null}},createHref(L){return r(d,L)},createURL:U,encodeLocation(L){let O=U(L);return{pathname:O.pathname,search:O.search,hash:O.hash}},push:C,replace:A,go(L){return h.go(L)}};return N}function qb(l,r=!1){let u="http://localhost";typeof window<"u"&&(u=window.location.origin!=="null"?window.location.origin:window.location.href),Je(u,"No window.location.(origin|href) available to create URL");let c=typeof l=="string"?l:xr(l);return c=c.replace(/ $/,"%20"),!r&&c.startsWith("//")&&(c=u+c),new URL(c,u)}function Ig(l,r,u="/"){return Qb(l,r,u,!1)}function Qb(l,r,u,c){let d=typeof r=="string"?fi(r):r,m=na(d.pathname||"/",u);if(m==null)return null;let h=ey(l);Xb(h);let v=null;for(let g=0;v==null&&g<h.length;++g){let p=nx(m);v=ex(h[g],p,c)}return v}function ey(l,r=[],u=[],c="",d=!1){let m=(h,v,g=d,p)=>{let x={relativePath:p===void 0?h.path||"":p,caseSensitive:h.caseSensitive===!0,childrenIndex:v,route:h};if(x.relativePath.startsWith("/")){if(!x.relativePath.startsWith(c)&&g)return;Je(x.relativePath.startsWith(c),`Absolute route path "${x.relativePath}" nested under path "${c}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),x.relativePath=x.relativePath.slice(c.length)}let S=ta([c,x.relativePath]),C=u.concat(x);h.children&&h.children.length>0&&(Je(h.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${S}".`),ey(h.children,r,C,S,g)),!(h.path==null&&!h.index)&&r.push({path:S,score:Pb(S,h.index),routesMeta:C})};return l.forEach((h,v)=>{if(h.path===""||!h.path?.includes("?"))m(h,v);else for(let g of ty(h.path))m(h,v,!0,g)}),r}function ty(l){let r=l.split("/");if(r.length===0)return[];let[u,...c]=r,d=u.endsWith("?"),m=u.replace(/\?$/,"");if(c.length===0)return d?[m,""]:[m];let h=ty(c.join("/")),v=[];return v.push(...h.map(g=>g===""?m:[m,g].join("/"))),d&&v.push(...h),v.map(g=>l.startsWith("/")&&g===""?"/":g)}function Xb(l){l.sort((r,u)=>r.score!==u.score?u.score-r.score:Ib(r.routesMeta.map(c=>c.childrenIndex),u.routesMeta.map(c=>c.childrenIndex)))}var Vb=/^:[\w-]+$/,Zb=3,Kb=2,Jb=1,Fb=10,Wb=-2,hg=l=>l==="*";function Pb(l,r){let u=l.split("/"),c=u.length;return u.some(hg)&&(c+=Wb),r&&(c+=Kb),u.filter(d=>!hg(d)).reduce((d,m)=>d+(Vb.test(m)?Zb:m===""?Jb:Fb),c)}function Ib(l,r){return l.length===r.length&&l.slice(0,-1).every((c,d)=>c===r[d])?l[l.length-1]-r[r.length-1]:0}function ex(l,r,u=!1){let{routesMeta:c}=l,d={},m="/",h=[];for(let v=0;v<c.length;++v){let g=c[v],p=v===c.length-1,x=m==="/"?r:r.slice(m.length)||"/",S=us({path:g.relativePath,caseSensitive:g.caseSensitive,end:p},x),C=g.route;if(!S&&p&&u&&!c[c.length-1].route.index&&(S=us({path:g.relativePath,caseSensitive:g.caseSensitive,end:!1},x)),!S)return null;Object.assign(d,S.params),h.push({params:d,pathname:ta([m,S.pathname]),pathnameBase:rx(ta([m,S.pathnameBase])),route:C}),S.pathnameBase!=="/"&&(m=ta([m,S.pathnameBase]))}return h}function us(l,r){typeof l=="string"&&(l={path:l,caseSensitive:!1,end:!0});let[u,c]=tx(l.path,l.caseSensitive,l.end),d=r.match(u);if(!d)return null;let m=d[0],h=m.replace(/(.)\/+$/,"$1"),v=d.slice(1);return{params:c.reduce((p,{paramName:x,isOptional:S},C)=>{if(x==="*"){let U=v[C]||"";h=m.slice(0,m.length-U.length).replace(/(.)\/+$/,"$1")}const A=v[C];return S&&!A?p[x]=void 0:p[x]=(A||"").replace(/%2F/g,"/"),p},{}),pathname:m,pathnameBase:h,pattern:l}}function tx(l,r=!1,u=!0){An(l==="*"||!l.endsWith("*")||l.endsWith("/*"),`Route path "${l}" will be treated as if it were "${l.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${l.replace(/\*$/,"/*")}".`);let c=[],d="^"+l.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(h,v,g)=>(c.push({paramName:v,isOptional:g!=null}),g?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return l.endsWith("*")?(c.push({paramName:"*"}),d+=l==="*"||l==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):u?d+="\\/*$":l!==""&&l!=="/"&&(d+="(?:(?=\\/|$))"),[new RegExp(d,r?void 0:"i"),c]}function nx(l){try{return l.split("/").map(r=>decodeURIComponent(r).replace(/\//g,"%2F")).join("/")}catch(r){return An(!1,`The URL path "${l}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${r}).`),l}}function na(l,r){if(r==="/")return l;if(!l.toLowerCase().startsWith(r.toLowerCase()))return null;let u=r.endsWith("/")?r.length-1:r.length,c=l.charAt(u);return c&&c!=="/"?null:l.slice(u)||"/"}function ax(l,r="/"){let{pathname:u,search:c="",hash:d=""}=typeof l=="string"?fi(l):l;return{pathname:u?u.startsWith("/")?u:lx(u,r):r,search:ox(c),hash:sx(d)}}function lx(l,r){let u=r.replace(/\/+$/,"").split("/");return l.split("/").forEach(d=>{d===".."?u.length>1&&u.pop():d!=="."&&u.push(d)}),u.length>1?u.join("/"):"/"}function ld(l,r,u,c){return`Cannot include a '${l}' character in a manually specified \`to.${r}\` field [${JSON.stringify(c)}].  Please separate it out to the \`to.${u}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function ix(l){return l.filter((r,u)=>u===0||r.route.path&&r.route.path.length>0)}function ny(l){let r=ix(l);return r.map((u,c)=>c===r.length-1?u.pathname:u.pathnameBase)}function ay(l,r,u,c=!1){let d;typeof l=="string"?d=fi(l):(d={...l},Je(!d.pathname||!d.pathname.includes("?"),ld("?","pathname","search",d)),Je(!d.pathname||!d.pathname.includes("#"),ld("#","pathname","hash",d)),Je(!d.search||!d.search.includes("#"),ld("#","search","hash",d)));let m=l===""||d.pathname==="",h=m?"/":d.pathname,v;if(h==null)v=u;else{let S=r.length-1;if(!c&&h.startsWith("..")){let C=h.split("/");for(;C[0]==="..";)C.shift(),S-=1;d.pathname=C.join("/")}v=S>=0?r[S]:"/"}let g=ax(d,v),p=h&&h!=="/"&&h.endsWith("/"),x=(m||h===".")&&u.endsWith("/");return!g.pathname.endsWith("/")&&(p||x)&&(g.pathname+="/"),g}var ta=l=>l.join("/").replace(/\/\/+/g,"/"),rx=l=>l.replace(/\/+$/,"").replace(/^\/*/,"/"),ox=l=>!l||l==="?"?"":l.startsWith("?")?l:"?"+l,sx=l=>!l||l==="#"?"":l.startsWith("#")?l:"#"+l;function ux(l){return l!=null&&typeof l.status=="number"&&typeof l.statusText=="string"&&typeof l.internal=="boolean"&&"data"in l}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var ly=["POST","PUT","PATCH","DELETE"];new Set(ly);var cx=["GET",...ly];new Set(cx);var mi=z.createContext(null);mi.displayName="DataRouter";var Ss=z.createContext(null);Ss.displayName="DataRouterState";z.createContext(!1);var iy=z.createContext({isTransitioning:!1});iy.displayName="ViewTransition";var dx=z.createContext(new Map);dx.displayName="Fetchers";var fx=z.createContext(null);fx.displayName="Await";var Mn=z.createContext(null);Mn.displayName="Navigation";var Cr=z.createContext(null);Cr.displayName="Location";var la=z.createContext({outlet:null,matches:[],isDataRoute:!1});la.displayName="Route";var Md=z.createContext(null);Md.displayName="RouteError";function mx(l,{relative:r}={}){Je(jr(),"useHref() may be used only in the context of a <Router> component.");let{basename:u,navigator:c}=z.useContext(Mn),{hash:d,pathname:m,search:h}=wr(l,{relative:r}),v=m;return u!=="/"&&(v=m==="/"?u:ta([u,m])),c.createHref({pathname:v,search:h,hash:d})}function jr(){return z.useContext(Cr)!=null}function fl(){return Je(jr(),"useLocation() may be used only in the context of a <Router> component."),z.useContext(Cr).location}var ry="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function oy(l){z.useContext(Mn).static||z.useLayoutEffect(l)}function sy(){let{isDataRoute:l}=z.useContext(la);return l?kx():hx()}function hx(){Je(jr(),"useNavigate() may be used only in the context of a <Router> component.");let l=z.useContext(mi),{basename:r,navigator:u}=z.useContext(Mn),{matches:c}=z.useContext(la),{pathname:d}=fl(),m=JSON.stringify(ny(c)),h=z.useRef(!1);return oy(()=>{h.current=!0}),z.useCallback((g,p={})=>{if(An(h.current,ry),!h.current)return;if(typeof g=="number"){u.go(g);return}let x=ay(g,JSON.parse(m),d,p.relative==="path");l==null&&r!=="/"&&(x.pathname=x.pathname==="/"?r:ta([r,x.pathname])),(p.replace?u.replace:u.push)(x,p.state,p)},[r,u,m,d,l])}z.createContext(null);function wr(l,{relative:r}={}){let{matches:u}=z.useContext(la),{pathname:c}=fl(),d=JSON.stringify(ny(u));return z.useMemo(()=>ay(l,JSON.parse(d),c,r==="path"),[l,d,c,r])}function px(l,r){return uy(l,r)}function uy(l,r,u,c,d){Je(jr(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:m}=z.useContext(Mn),{matches:h}=z.useContext(la),v=h[h.length-1],g=v?v.params:{},p=v?v.pathname:"/",x=v?v.pathnameBase:"/",S=v&&v.route;{let B=S&&S.path||"";cy(p,!S||B.endsWith("*")||B.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${p}" (under <Route path="${B}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${B}"> to <Route path="${B==="/"?"*":`${B}/*`}">.`)}let C=fl(),A;if(r){let B=typeof r=="string"?fi(r):r;Je(x==="/"||B.pathname?.startsWith(x),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${x}" but pathname "${B.pathname}" was given in the \`location\` prop.`),A=B}else A=C;let U=A.pathname||"/",N=U;if(x!=="/"){let B=x.replace(/^\//,"").split("/");N="/"+U.replace(/^\//,"").split("/").slice(B.length).join("/")}let L=Ig(l,{pathname:N});An(S||L!=null,`No routes matched location "${A.pathname}${A.search}${A.hash}" `),An(L==null||L[L.length-1].route.element!==void 0||L[L.length-1].route.Component!==void 0||L[L.length-1].route.lazy!==void 0,`Matched leaf route at location "${A.pathname}${A.search}${A.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let O=xx(L&&L.map(B=>Object.assign({},B,{params:Object.assign({},g,B.params),pathname:ta([x,m.encodeLocation?m.encodeLocation(B.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:B.pathname]),pathnameBase:B.pathnameBase==="/"?x:ta([x,m.encodeLocation?m.encodeLocation(B.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:B.pathnameBase])})),h,u,c,d);return r&&O?z.createElement(Cr.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...A},navigationType:"POP"}},O):O}function gx(){let l=wx(),r=ux(l)?`${l.status} ${l.statusText}`:l instanceof Error?l.message:JSON.stringify(l),u=l instanceof Error?l.stack:null,c="rgba(200,200,200, 0.5)",d={padding:"0.5rem",backgroundColor:c},m={padding:"2px 4px",backgroundColor:c},h=null;return console.error("Error handled by React Router default ErrorBoundary:",l),h=z.createElement(z.Fragment,null,z.createElement("p",null,"💿 Hey developer 👋"),z.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",z.createElement("code",{style:m},"ErrorBoundary")," or"," ",z.createElement("code",{style:m},"errorElement")," prop on your route.")),z.createElement(z.Fragment,null,z.createElement("h2",null,"Unexpected Application Error!"),z.createElement("h3",{style:{fontStyle:"italic"}},r),u?z.createElement("pre",{style:d},u):null,h)}var yx=z.createElement(gx,null),vx=class extends z.Component{constructor(l){super(l),this.state={location:l.location,revalidation:l.revalidation,error:l.error}}static getDerivedStateFromError(l){return{error:l}}static getDerivedStateFromProps(l,r){return r.location!==l.location||r.revalidation!=="idle"&&l.revalidation==="idle"?{error:l.error,location:l.location,revalidation:l.revalidation}:{error:l.error!==void 0?l.error:r.error,location:r.location,revalidation:l.revalidation||r.revalidation}}componentDidCatch(l,r){this.props.unstable_onError?this.props.unstable_onError(l,r):console.error("React Router caught the following error during render",l)}render(){return this.state.error!==void 0?z.createElement(la.Provider,{value:this.props.routeContext},z.createElement(Md.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function bx({routeContext:l,match:r,children:u}){let c=z.useContext(mi);return c&&c.static&&c.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(c.staticContext._deepestRenderedBoundaryId=r.route.id),z.createElement(la.Provider,{value:l},u)}function xx(l,r=[],u=null,c=null,d=null){if(l==null){if(!u)return null;if(u.errors)l=u.matches;else if(r.length===0&&!u.initialized&&u.matches.length>0)l=u.matches;else return null}let m=l,h=u?.errors;if(h!=null){let p=m.findIndex(x=>x.route.id&&h?.[x.route.id]!==void 0);Je(p>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(h).join(",")}`),m=m.slice(0,Math.min(m.length,p+1))}let v=!1,g=-1;if(u)for(let p=0;p<m.length;p++){let x=m[p];if((x.route.HydrateFallback||x.route.hydrateFallbackElement)&&(g=p),x.route.id){let{loaderData:S,errors:C}=u,A=x.route.loader&&!S.hasOwnProperty(x.route.id)&&(!C||C[x.route.id]===void 0);if(x.route.lazy||A){v=!0,g>=0?m=m.slice(0,g+1):m=[m[0]];break}}}return m.reduceRight((p,x,S)=>{let C,A=!1,U=null,N=null;u&&(C=h&&x.route.id?h[x.route.id]:void 0,U=x.route.errorElement||yx,v&&(g<0&&S===0?(cy("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),A=!0,N=null):g===S&&(A=!0,N=x.route.hydrateFallbackElement||null)));let L=r.concat(m.slice(0,S+1)),O=()=>{let B;return C?B=U:A?B=N:x.route.Component?B=z.createElement(x.route.Component,null):x.route.element?B=x.route.element:B=p,z.createElement(bx,{match:x,routeContext:{outlet:p,matches:L,isDataRoute:u!=null},children:B})};return u&&(x.route.ErrorBoundary||x.route.errorElement||S===0)?z.createElement(vx,{location:u.location,revalidation:u.revalidation,component:U,error:C,children:O(),routeContext:{outlet:null,matches:L,isDataRoute:!0},unstable_onError:c}):O()},null)}function Od(l){return`${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Sx(l){let r=z.useContext(mi);return Je(r,Od(l)),r}function $x(l){let r=z.useContext(Ss);return Je(r,Od(l)),r}function Cx(l){let r=z.useContext(la);return Je(r,Od(l)),r}function _d(l){let r=Cx(l),u=r.matches[r.matches.length-1];return Je(u.route.id,`${l} can only be used on routes that contain a unique "id"`),u.route.id}function jx(){return _d("useRouteId")}function wx(){let l=z.useContext(Md),r=$x("useRouteError"),u=_d("useRouteError");return l!==void 0?l:r.errors?.[u]}function kx(){let{router:l}=Sx("useNavigate"),r=_d("useNavigate"),u=z.useRef(!1);return oy(()=>{u.current=!0}),z.useCallback(async(d,m={})=>{An(u.current,ry),u.current&&(typeof d=="number"?l.navigate(d):await l.navigate(d,{fromRouteId:r,...m}))},[l,r])}var pg={};function cy(l,r,u){!r&&!pg[l]&&(pg[l]=!0,An(!1,u))}z.memo(Rx);function Rx({routes:l,future:r,state:u,unstable_onError:c}){return uy(l,void 0,u,c,r)}function Cn(l){Je(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function Ex({basename:l="/",children:r=null,location:u,navigationType:c="POP",navigator:d,static:m=!1}){Je(!jr(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let h=l.replace(/^\/*/,"/"),v=z.useMemo(()=>({basename:h,navigator:d,static:m,future:{}}),[h,d,m]);typeof u=="string"&&(u=fi(u));let{pathname:g="/",search:p="",hash:x="",state:S=null,key:C="default"}=u,A=z.useMemo(()=>{let U=na(g,h);return U==null?null:{location:{pathname:U,search:p,hash:x,state:S,key:C},navigationType:c}},[h,g,p,x,S,C,c]);return An(A!=null,`<Router basename="${h}"> is not able to match the URL "${g}${p}${x}" because it does not start with the basename, so the <Router> won't render anything.`),A==null?null:z.createElement(Mn.Provider,{value:v},z.createElement(Cr.Provider,{children:r,value:A}))}function zx({children:l,location:r}){return px(xd(l),r)}function xd(l,r=[]){let u=[];return z.Children.forEach(l,(c,d)=>{if(!z.isValidElement(c))return;let m=[...r,d];if(c.type===z.Fragment){u.push.apply(u,xd(c.props.children,m));return}Je(c.type===Cn,`[${typeof c.type=="string"?c.type:c.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Je(!c.props.index||!c.props.children,"An index route cannot have child routes.");let h={id:c.props.id||m.join("-"),caseSensitive:c.props.caseSensitive,element:c.props.element,Component:c.props.Component,index:c.props.index,path:c.props.path,middleware:c.props.middleware,loader:c.props.loader,action:c.props.action,hydrateFallbackElement:c.props.hydrateFallbackElement,HydrateFallback:c.props.HydrateFallback,errorElement:c.props.errorElement,ErrorBoundary:c.props.ErrorBoundary,hasErrorBoundary:c.props.hasErrorBoundary===!0||c.props.ErrorBoundary!=null||c.props.errorElement!=null,shouldRevalidate:c.props.shouldRevalidate,handle:c.props.handle,lazy:c.props.lazy};c.props.children&&(h.children=xd(c.props.children,m)),u.push(h)}),u}var ts="get",ns="application/x-www-form-urlencoded";function $s(l){return l!=null&&typeof l.tagName=="string"}function Ax(l){return $s(l)&&l.tagName.toLowerCase()==="button"}function Tx(l){return $s(l)&&l.tagName.toLowerCase()==="form"}function Dx(l){return $s(l)&&l.tagName.toLowerCase()==="input"}function Mx(l){return!!(l.metaKey||l.altKey||l.ctrlKey||l.shiftKey)}function Ox(l,r){return l.button===0&&(!r||r==="_self")&&!Mx(l)}var Ko=null;function _x(){if(Ko===null)try{new FormData(document.createElement("form"),0),Ko=!1}catch{Ko=!0}return Ko}var Nx=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function id(l){return l!=null&&!Nx.has(l)?(An(!1,`"${l}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ns}"`),null):l}function Ux(l,r){let u,c,d,m,h;if(Tx(l)){let v=l.getAttribute("action");c=v?na(v,r):null,u=l.getAttribute("method")||ts,d=id(l.getAttribute("enctype"))||ns,m=new FormData(l)}else if(Ax(l)||Dx(l)&&(l.type==="submit"||l.type==="image")){let v=l.form;if(v==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let g=l.getAttribute("formaction")||v.getAttribute("action");if(c=g?na(g,r):null,u=l.getAttribute("formmethod")||v.getAttribute("method")||ts,d=id(l.getAttribute("formenctype"))||id(v.getAttribute("enctype"))||ns,m=new FormData(v,l),!_x()){let{name:p,type:x,value:S}=l;if(x==="image"){let C=p?`${p}.`:"";m.append(`${C}x`,"0"),m.append(`${C}y`,"0")}else p&&m.append(p,S)}}else{if($s(l))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');u=ts,c=null,d=ns,h=l}return m&&d==="text/plain"&&(h=m,m=void 0),{action:c,method:u.toLowerCase(),encType:d,formData:m,body:h}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function Nd(l,r){if(l===!1||l===null||typeof l>"u")throw new Error(r)}function Gx(l,r,u){let c=typeof l=="string"?new URL(l,typeof window>"u"?"server://singlefetch/":window.location.origin):l;return c.pathname==="/"?c.pathname=`_root.${u}`:r&&na(c.pathname,r)==="/"?c.pathname=`${r.replace(/\/$/,"")}/_root.${u}`:c.pathname=`${c.pathname.replace(/\/$/,"")}.${u}`,c}async function Lx(l,r){if(l.id in r)return r[l.id];try{let u=await import(l.module);return r[l.id]=u,u}catch(u){return console.error(`Error loading route module \`${l.module}\`, reloading page...`),console.error(u),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Hx(l){return l==null?!1:l.href==null?l.rel==="preload"&&typeof l.imageSrcSet=="string"&&typeof l.imageSizes=="string":typeof l.rel=="string"&&typeof l.href=="string"}async function Bx(l,r,u){let c=await Promise.all(l.map(async d=>{let m=r.routes[d.route.id];if(m){let h=await Lx(m,u);return h.links?h.links():[]}return[]}));return Xx(c.flat(1).filter(Hx).filter(d=>d.rel==="stylesheet"||d.rel==="preload").map(d=>d.rel==="stylesheet"?{...d,rel:"prefetch",as:"style"}:{...d,rel:"prefetch"}))}function gg(l,r,u,c,d,m){let h=(g,p)=>u[p]?g.route.id!==u[p].route.id:!0,v=(g,p)=>u[p].pathname!==g.pathname||u[p].route.path?.endsWith("*")&&u[p].params["*"]!==g.params["*"];return m==="assets"?r.filter((g,p)=>h(g,p)||v(g,p)):m==="data"?r.filter((g,p)=>{let x=c.routes[g.route.id];if(!x||!x.hasLoader)return!1;if(h(g,p)||v(g,p))return!0;if(g.route.shouldRevalidate){let S=g.route.shouldRevalidate({currentUrl:new URL(d.pathname+d.search+d.hash,window.origin),currentParams:u[0]?.params||{},nextUrl:new URL(l,window.origin),nextParams:g.params,defaultShouldRevalidate:!0});if(typeof S=="boolean")return S}return!0}):[]}function Yx(l,r,{includeHydrateFallback:u}={}){return qx(l.map(c=>{let d=r.routes[c.route.id];if(!d)return[];let m=[d.module];return d.clientActionModule&&(m=m.concat(d.clientActionModule)),d.clientLoaderModule&&(m=m.concat(d.clientLoaderModule)),u&&d.hydrateFallbackModule&&(m=m.concat(d.hydrateFallbackModule)),d.imports&&(m=m.concat(d.imports)),m}).flat(1))}function qx(l){return[...new Set(l)]}function Qx(l){let r={},u=Object.keys(l).sort();for(let c of u)r[c]=l[c];return r}function Xx(l,r){let u=new Set;return new Set(r),l.reduce((c,d)=>{let m=JSON.stringify(Qx(d));return u.has(m)||(u.add(m),c.push({key:m,link:d})),c},[])}function dy(){let l=z.useContext(mi);return Nd(l,"You must render this element inside a <DataRouterContext.Provider> element"),l}function Vx(){let l=z.useContext(Ss);return Nd(l,"You must render this element inside a <DataRouterStateContext.Provider> element"),l}var Ud=z.createContext(void 0);Ud.displayName="FrameworkContext";function fy(){let l=z.useContext(Ud);return Nd(l,"You must render this element inside a <HydratedRouter> element"),l}function Zx(l,r){let u=z.useContext(Ud),[c,d]=z.useState(!1),[m,h]=z.useState(!1),{onFocus:v,onBlur:g,onMouseEnter:p,onMouseLeave:x,onTouchStart:S}=r,C=z.useRef(null);z.useEffect(()=>{if(l==="render"&&h(!0),l==="viewport"){let N=O=>{O.forEach(B=>{h(B.isIntersecting)})},L=new IntersectionObserver(N,{threshold:.5});return C.current&&L.observe(C.current),()=>{L.disconnect()}}},[l]),z.useEffect(()=>{if(c){let N=setTimeout(()=>{h(!0)},100);return()=>{clearTimeout(N)}}},[c]);let A=()=>{d(!0)},U=()=>{d(!1),h(!1)};return u?l!=="intent"?[m,C,{}]:[m,C,{onFocus:dr(v,A),onBlur:dr(g,U),onMouseEnter:dr(p,A),onMouseLeave:dr(x,U),onTouchStart:dr(S,A)}]:[!1,C,{}]}function dr(l,r){return u=>{l&&l(u),u.defaultPrevented||r(u)}}function Kx({page:l,...r}){let{router:u}=dy(),c=z.useMemo(()=>Ig(u.routes,l,u.basename),[u.routes,l,u.basename]);return c?z.createElement(Fx,{page:l,matches:c,...r}):null}function Jx(l){let{manifest:r,routeModules:u}=fy(),[c,d]=z.useState([]);return z.useEffect(()=>{let m=!1;return Bx(l,r,u).then(h=>{m||d(h)}),()=>{m=!0}},[l,r,u]),c}function Fx({page:l,matches:r,...u}){let c=fl(),{manifest:d,routeModules:m}=fy(),{basename:h}=dy(),{loaderData:v,matches:g}=Vx(),p=z.useMemo(()=>gg(l,r,g,d,c,"data"),[l,r,g,d,c]),x=z.useMemo(()=>gg(l,r,g,d,c,"assets"),[l,r,g,d,c]),S=z.useMemo(()=>{if(l===c.pathname+c.search+c.hash)return[];let U=new Set,N=!1;if(r.forEach(O=>{let B=d.routes[O.route.id];!B||!B.hasLoader||(!p.some(K=>K.route.id===O.route.id)&&O.route.id in v&&m[O.route.id]?.shouldRevalidate||B.hasClientLoader?N=!0:U.add(O.route.id))}),U.size===0)return[];let L=Gx(l,h,"data");return N&&U.size>0&&L.searchParams.set("_routes",r.filter(O=>U.has(O.route.id)).map(O=>O.route.id).join(",")),[L.pathname+L.search]},[h,v,c,d,p,r,l,m]),C=z.useMemo(()=>Yx(x,d),[x,d]),A=Jx(x);return z.createElement(z.Fragment,null,S.map(U=>z.createElement("link",{key:U,rel:"prefetch",as:"fetch",href:U,...u})),C.map(U=>z.createElement("link",{key:U,rel:"modulepreload",href:U,...u})),A.map(({key:U,link:N})=>z.createElement("link",{key:U,nonce:u.nonce,...N})))}function Wx(...l){return r=>{l.forEach(u=>{typeof u=="function"?u(r):u!=null&&(u.current=r)})}}var my=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{my&&(window.__reactRouterVersion="7.9.5")}catch{}function Px({basename:l,children:r,window:u}){let c=z.useRef();c.current==null&&(c.current=Hb({window:u,v5Compat:!0}));let d=c.current,[m,h]=z.useState({action:d.action,location:d.location}),v=z.useCallback(g=>{z.startTransition(()=>h(g))},[h]);return z.useLayoutEffect(()=>d.listen(v),[d,v]),z.createElement(Ex,{basename:l,children:r,location:m.location,navigationType:m.action,navigator:d})}var hy=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Cs=z.forwardRef(function({onClick:r,discover:u="render",prefetch:c="none",relative:d,reloadDocument:m,replace:h,state:v,target:g,to:p,preventScrollReset:x,viewTransition:S,...C},A){let{basename:U}=z.useContext(Mn),N=typeof p=="string"&&hy.test(p),L,O=!1;if(typeof p=="string"&&N&&(L=p,my))try{let le=new URL(window.location.href),be=p.startsWith("//")?new URL(le.protocol+p):new URL(p),Ae=na(be.pathname,U);be.origin===le.origin&&Ae!=null?p=Ae+be.search+be.hash:O=!0}catch{An(!1,`<Link to="${p}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let B=mx(p,{relative:d}),[K,j,V]=Zx(c,C),W=n1(p,{replace:h,state:v,target:g,preventScrollReset:x,relative:d,viewTransition:S});function Z(le){r&&r(le),le.defaultPrevented||W(le)}let ce=z.createElement("a",{...C,...V,href:L||B,onClick:O||m?r:Z,ref:Wx(A,j),target:g,"data-discover":!N&&u==="render"?"true":void 0});return K&&!N?z.createElement(z.Fragment,null,ce,z.createElement(Kx,{page:B})):ce});Cs.displayName="Link";var Ix=z.forwardRef(function({"aria-current":r="page",caseSensitive:u=!1,className:c="",end:d=!1,style:m,to:h,viewTransition:v,children:g,...p},x){let S=wr(h,{relative:p.relative}),C=fl(),A=z.useContext(Ss),{navigator:U,basename:N}=z.useContext(Mn),L=A!=null&&o1(S)&&v===!0,O=U.encodeLocation?U.encodeLocation(S).pathname:S.pathname,B=C.pathname,K=A&&A.navigation&&A.navigation.location?A.navigation.location.pathname:null;u||(B=B.toLowerCase(),K=K?K.toLowerCase():null,O=O.toLowerCase()),K&&N&&(K=na(K,N)||K);const j=O!=="/"&&O.endsWith("/")?O.length-1:O.length;let V=B===O||!d&&B.startsWith(O)&&B.charAt(j)==="/",W=K!=null&&(K===O||!d&&K.startsWith(O)&&K.charAt(O.length)==="/"),Z={isActive:V,isPending:W,isTransitioning:L},ce=V?r:void 0,le;typeof c=="function"?le=c(Z):le=[c,V?"active":null,W?"pending":null,L?"transitioning":null].filter(Boolean).join(" ");let be=typeof m=="function"?m(Z):m;return z.createElement(Cs,{...p,"aria-current":ce,className:le,ref:x,style:be,to:h,viewTransition:v},typeof g=="function"?g(Z):g)});Ix.displayName="NavLink";var e1=z.forwardRef(({discover:l="render",fetcherKey:r,navigate:u,reloadDocument:c,replace:d,state:m,method:h=ts,action:v,onSubmit:g,relative:p,preventScrollReset:x,viewTransition:S,...C},A)=>{let U=i1(),N=r1(v,{relative:p}),L=h.toLowerCase()==="get"?"get":"post",O=typeof v=="string"&&hy.test(v),B=K=>{if(g&&g(K),K.defaultPrevented)return;K.preventDefault();let j=K.nativeEvent.submitter,V=j?.getAttribute("formmethod")||h;U(j||K.currentTarget,{fetcherKey:r,method:V,navigate:u,replace:d,state:m,relative:p,preventScrollReset:x,viewTransition:S})};return z.createElement("form",{ref:A,method:L,action:N,onSubmit:c?g:B,...C,"data-discover":!O&&l==="render"?"true":void 0})});e1.displayName="Form";function t1(l){return`${l} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function py(l){let r=z.useContext(mi);return Je(r,t1(l)),r}function n1(l,{target:r,replace:u,state:c,preventScrollReset:d,relative:m,viewTransition:h}={}){let v=sy(),g=fl(),p=wr(l,{relative:m});return z.useCallback(x=>{if(Ox(x,r)){x.preventDefault();let S=u!==void 0?u:xr(g)===xr(p);v(l,{replace:S,state:c,preventScrollReset:d,relative:m,viewTransition:h})}},[g,v,p,u,c,r,l,d,m,h])}var a1=0,l1=()=>`__${String(++a1)}__`;function i1(){let{router:l}=py("useSubmit"),{basename:r}=z.useContext(Mn),u=jx();return z.useCallback(async(c,d={})=>{let{action:m,method:h,encType:v,formData:g,body:p}=Ux(c,r);if(d.navigate===!1){let x=d.fetcherKey||l1();await l.fetch(x,u,d.action||m,{preventScrollReset:d.preventScrollReset,formData:g,body:p,formMethod:d.method||h,formEncType:d.encType||v,flushSync:d.flushSync})}else await l.navigate(d.action||m,{preventScrollReset:d.preventScrollReset,formData:g,body:p,formMethod:d.method||h,formEncType:d.encType||v,replace:d.replace,state:d.state,fromRouteId:u,flushSync:d.flushSync,viewTransition:d.viewTransition})},[l,r,u])}function r1(l,{relative:r}={}){let{basename:u}=z.useContext(Mn),c=z.useContext(la);Je(c,"useFormAction must be used inside a RouteContext");let[d]=c.matches.slice(-1),m={...wr(l||".",{relative:r})},h=fl();if(l==null){m.search=h.search;let v=new URLSearchParams(m.search),g=v.getAll("index");if(g.some(x=>x==="")){v.delete("index"),g.filter(S=>S).forEach(S=>v.append("index",S));let x=v.toString();m.search=x?`?${x}`:""}}return(!l||l===".")&&d.route.index&&(m.search=m.search?m.search.replace(/^\?/,"?index&"):"?index"),u!=="/"&&(m.pathname=m.pathname==="/"?u:ta([u,m.pathname])),xr(m)}function o1(l,{relative:r}={}){let u=z.useContext(iy);Je(u!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:c}=py("useViewTransitionState"),d=wr(l,{relative:r});if(!u.isTransitioning)return!1;let m=na(u.currentLocation.pathname,c)||u.currentLocation.pathname,h=na(u.nextLocation.pathname,c)||u.nextLocation.pathname;return us(d.pathname,h)!=null||us(d.pathname,m)!=null}var Lt=function(){return Lt=Object.assign||function(r){for(var u,c=1,d=arguments.length;c<d;c++){u=arguments[c];for(var m in u)Object.prototype.hasOwnProperty.call(u,m)&&(r[m]=u[m])}return r},Lt.apply(this,arguments)};function cs(l,r,u){if(u||arguments.length===2)for(var c=0,d=r.length,m;c<d;c++)(m||!(c in r))&&(m||(m=Array.prototype.slice.call(r,0,c)),m[c]=r[c]);return l.concat(m||Array.prototype.slice.call(r))}var Ve="-ms-",br="-moz-",_e="-webkit-",gy="comm",js="rule",Gd="decl",s1="@import",yy="@keyframes",u1="@layer",vy=Math.abs,Ld=String.fromCharCode,Sd=Object.assign;function c1(l,r){return pt(l,0)^45?(((r<<2^pt(l,0))<<2^pt(l,1))<<2^pt(l,2))<<2^pt(l,3):0}function by(l){return l.trim()}function ea(l,r){return(l=r.exec(l))?l[0]:l}function ve(l,r,u){return l.replace(r,u)}function as(l,r,u){return l.indexOf(r,u)}function pt(l,r){return l.charCodeAt(r)|0}function ii(l,r,u){return l.slice(r,u)}function zn(l){return l.length}function xy(l){return l.length}function vr(l,r){return r.push(l),l}function d1(l,r){return l.map(r).join("")}function yg(l,r){return l.filter(function(u){return!ea(u,r)})}var ws=1,ri=1,Sy=0,gn=0,st=0,hi="";function ks(l,r,u,c,d,m,h,v){return{value:l,root:r,parent:u,type:c,props:d,children:m,line:ws,column:ri,length:h,return:"",siblings:v}}function Da(l,r){return Sd(ks("",null,null,"",null,null,0,l.siblings),l,{length:-l.length},r)}function Il(l){for(;l.root;)l=Da(l.root,{children:[l]});vr(l,l.siblings)}function f1(){return st}function m1(){return st=gn>0?pt(hi,--gn):0,ri--,st===10&&(ri=1,ws--),st}function jn(){return st=gn<Sy?pt(hi,gn++):0,ri++,st===10&&(ri=1,ws++),st}function ol(){return pt(hi,gn)}function ls(){return gn}function Rs(l,r){return ii(hi,l,r)}function $d(l){switch(l){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function h1(l){return ws=ri=1,Sy=zn(hi=l),gn=0,[]}function p1(l){return hi="",l}function rd(l){return by(Rs(gn-1,Cd(l===91?l+2:l===40?l+1:l)))}function g1(l){for(;(st=ol())&&st<33;)jn();return $d(l)>2||$d(st)>3?"":" "}function y1(l,r){for(;--r&&jn()&&!(st<48||st>102||st>57&&st<65||st>70&&st<97););return Rs(l,ls()+(r<6&&ol()==32&&jn()==32))}function Cd(l){for(;jn();)switch(st){case l:return gn;case 34:case 39:l!==34&&l!==39&&Cd(st);break;case 40:l===41&&Cd(l);break;case 92:jn();break}return gn}function v1(l,r){for(;jn()&&l+st!==57;)if(l+st===84&&ol()===47)break;return"/*"+Rs(r,gn-1)+"*"+Ld(l===47?l:jn())}function b1(l){for(;!$d(ol());)jn();return Rs(l,gn)}function x1(l){return p1(is("",null,null,null,[""],l=h1(l),0,[0],l))}function is(l,r,u,c,d,m,h,v,g){for(var p=0,x=0,S=h,C=0,A=0,U=0,N=1,L=1,O=1,B=0,K="",j=d,V=m,W=c,Z=K;L;)switch(U=B,B=jn()){case 40:if(U!=108&&pt(Z,S-1)==58){as(Z+=ve(rd(B),"&","&\f"),"&\f",vy(p?v[p-1]:0))!=-1&&(O=-1);break}case 34:case 39:case 91:Z+=rd(B);break;case 9:case 10:case 13:case 32:Z+=g1(U);break;case 92:Z+=y1(ls()-1,7);continue;case 47:switch(ol()){case 42:case 47:vr(S1(v1(jn(),ls()),r,u,g),g);break;default:Z+="/"}break;case 123*N:v[p++]=zn(Z)*O;case 125*N:case 59:case 0:switch(B){case 0:case 125:L=0;case 59+x:O==-1&&(Z=ve(Z,/\f/g,"")),A>0&&zn(Z)-S&&vr(A>32?bg(Z+";",c,u,S-1,g):bg(ve(Z," ","")+";",c,u,S-2,g),g);break;case 59:Z+=";";default:if(vr(W=vg(Z,r,u,p,x,d,v,K,j=[],V=[],S,m),m),B===123)if(x===0)is(Z,r,W,W,j,m,S,v,V);else switch(C===99&&pt(Z,3)===110?100:C){case 100:case 108:case 109:case 115:is(l,W,W,c&&vr(vg(l,W,W,0,0,d,v,K,d,j=[],S,V),V),d,V,S,v,c?j:V);break;default:is(Z,W,W,W,[""],V,0,v,V)}}p=x=A=0,N=O=1,K=Z="",S=h;break;case 58:S=1+zn(Z),A=U;default:if(N<1){if(B==123)--N;else if(B==125&&N++==0&&m1()==125)continue}switch(Z+=Ld(B),B*N){case 38:O=x>0?1:(Z+="\f",-1);break;case 44:v[p++]=(zn(Z)-1)*O,O=1;break;case 64:ol()===45&&(Z+=rd(jn())),C=ol(),x=S=zn(K=Z+=b1(ls())),B++;break;case 45:U===45&&zn(Z)==2&&(N=0)}}return m}function vg(l,r,u,c,d,m,h,v,g,p,x,S){for(var C=d-1,A=d===0?m:[""],U=xy(A),N=0,L=0,O=0;N<c;++N)for(var B=0,K=ii(l,C+1,C=vy(L=h[N])),j=l;B<U;++B)(j=by(L>0?A[B]+" "+K:ve(K,/&\f/g,A[B])))&&(g[O++]=j);return ks(l,r,u,d===0?js:v,g,p,x,S)}function S1(l,r,u,c){return ks(l,r,u,gy,Ld(f1()),ii(l,2,-2),0,c)}function bg(l,r,u,c,d){return ks(l,r,u,Gd,ii(l,0,c),ii(l,c+1,-1),c,d)}function $y(l,r,u){switch(c1(l,r)){case 5103:return _e+"print-"+l+l;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return _e+l+l;case 4789:return br+l+l;case 5349:case 4246:case 4810:case 6968:case 2756:return _e+l+br+l+Ve+l+l;case 5936:switch(pt(l,r+11)){case 114:return _e+l+Ve+ve(l,/[svh]\w+-[tblr]{2}/,"tb")+l;case 108:return _e+l+Ve+ve(l,/[svh]\w+-[tblr]{2}/,"tb-rl")+l;case 45:return _e+l+Ve+ve(l,/[svh]\w+-[tblr]{2}/,"lr")+l}case 6828:case 4268:case 2903:return _e+l+Ve+l+l;case 6165:return _e+l+Ve+"flex-"+l+l;case 5187:return _e+l+ve(l,/(\w+).+(:[^]+)/,_e+"box-$1$2"+Ve+"flex-$1$2")+l;case 5443:return _e+l+Ve+"flex-item-"+ve(l,/flex-|-self/g,"")+(ea(l,/flex-|baseline/)?"":Ve+"grid-row-"+ve(l,/flex-|-self/g,""))+l;case 4675:return _e+l+Ve+"flex-line-pack"+ve(l,/align-content|flex-|-self/g,"")+l;case 5548:return _e+l+Ve+ve(l,"shrink","negative")+l;case 5292:return _e+l+Ve+ve(l,"basis","preferred-size")+l;case 6060:return _e+"box-"+ve(l,"-grow","")+_e+l+Ve+ve(l,"grow","positive")+l;case 4554:return _e+ve(l,/([^-])(transform)/g,"$1"+_e+"$2")+l;case 6187:return ve(ve(ve(l,/(zoom-|grab)/,_e+"$1"),/(image-set)/,_e+"$1"),l,"")+l;case 5495:case 3959:return ve(l,/(image-set\([^]*)/,_e+"$1$`$1");case 4968:return ve(ve(l,/(.+:)(flex-)?(.*)/,_e+"box-pack:$3"+Ve+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+_e+l+l;case 4200:if(!ea(l,/flex-|baseline/))return Ve+"grid-column-align"+ii(l,r)+l;break;case 2592:case 3360:return Ve+ve(l,"template-","")+l;case 4384:case 3616:return u&&u.some(function(c,d){return r=d,ea(c.props,/grid-\w+-end/)})?~as(l+(u=u[r].value),"span",0)?l:Ve+ve(l,"-start","")+l+Ve+"grid-row-span:"+(~as(u,"span",0)?ea(u,/\d+/):+ea(u,/\d+/)-+ea(l,/\d+/))+";":Ve+ve(l,"-start","")+l;case 4896:case 4128:return u&&u.some(function(c){return ea(c.props,/grid-\w+-start/)})?l:Ve+ve(ve(l,"-end","-span"),"span ","")+l;case 4095:case 3583:case 4068:case 2532:return ve(l,/(.+)-inline(.+)/,_e+"$1$2")+l;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(zn(l)-1-r>6)switch(pt(l,r+1)){case 109:if(pt(l,r+4)!==45)break;case 102:return ve(l,/(.+:)(.+)-([^]+)/,"$1"+_e+"$2-$3$1"+br+(pt(l,r+3)==108?"$3":"$2-$3"))+l;case 115:return~as(l,"stretch",0)?$y(ve(l,"stretch","fill-available"),r,u)+l:l}break;case 5152:case 5920:return ve(l,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(c,d,m,h,v,g,p){return Ve+d+":"+m+p+(h?Ve+d+"-span:"+(v?g:+g-+m)+p:"")+l});case 4949:if(pt(l,r+6)===121)return ve(l,":",":"+_e)+l;break;case 6444:switch(pt(l,pt(l,14)===45?18:11)){case 120:return ve(l,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+_e+(pt(l,14)===45?"inline-":"")+"box$3$1"+_e+"$2$3$1"+Ve+"$2box$3")+l;case 100:return ve(l,":",":"+Ve)+l}break;case 5719:case 2647:case 2135:case 3927:case 2391:return ve(l,"scroll-","scroll-snap-")+l}return l}function ds(l,r){for(var u="",c=0;c<l.length;c++)u+=r(l[c],c,l,r)||"";return u}function $1(l,r,u,c){switch(l.type){case u1:if(l.children.length)break;case s1:case Gd:return l.return=l.return||l.value;case gy:return"";case yy:return l.return=l.value+"{"+ds(l.children,c)+"}";case js:if(!zn(l.value=l.props.join(",")))return""}return zn(u=ds(l.children,c))?l.return=l.value+"{"+u+"}":""}function C1(l){var r=xy(l);return function(u,c,d,m){for(var h="",v=0;v<r;v++)h+=l[v](u,c,d,m)||"";return h}}function j1(l){return function(r){r.root||(r=r.return)&&l(r)}}function w1(l,r,u,c){if(l.length>-1&&!l.return)switch(l.type){case Gd:l.return=$y(l.value,l.length,u);return;case yy:return ds([Da(l,{value:ve(l.value,"@","@"+_e)})],c);case js:if(l.length)return d1(u=l.props,function(d){switch(ea(d,c=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":Il(Da(l,{props:[ve(d,/:(read-\w+)/,":"+br+"$1")]})),Il(Da(l,{props:[d]})),Sd(l,{props:yg(u,c)});break;case"::placeholder":Il(Da(l,{props:[ve(d,/:(plac\w+)/,":"+_e+"input-$1")]})),Il(Da(l,{props:[ve(d,/:(plac\w+)/,":"+br+"$1")]})),Il(Da(l,{props:[ve(d,/:(plac\w+)/,Ve+"input-$1")]})),Il(Da(l,{props:[d]})),Sd(l,{props:yg(u,c)});break}return""})}}var k1={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,boxFlex:1,boxFlexGroup:1,boxOrdinalGroup:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexPositive:1,flexShrink:1,flexNegative:1,flexOrder:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,msGridRow:1,msGridRowSpan:1,msGridColumn:1,msGridColumnSpan:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1},Pt={},oi=typeof process<"u"&&Pt!==void 0&&(Pt.REACT_APP_SC_ATTR||Pt.SC_ATTR)||"data-styled",Cy="active",jy="data-styled-version",Es="6.1.19",Hd=`/*!sc*/
`,fs=typeof window<"u"&&typeof document<"u",R1=!!(typeof SC_DISABLE_SPEEDY=="boolean"?SC_DISABLE_SPEEDY:typeof process<"u"&&Pt!==void 0&&Pt.REACT_APP_SC_DISABLE_SPEEDY!==void 0&&Pt.REACT_APP_SC_DISABLE_SPEEDY!==""?Pt.REACT_APP_SC_DISABLE_SPEEDY!=="false"&&Pt.REACT_APP_SC_DISABLE_SPEEDY:typeof process<"u"&&Pt!==void 0&&Pt.SC_DISABLE_SPEEDY!==void 0&&Pt.SC_DISABLE_SPEEDY!==""&&Pt.SC_DISABLE_SPEEDY!=="false"&&Pt.SC_DISABLE_SPEEDY),zs=Object.freeze([]),si=Object.freeze({});function E1(l,r,u){return u===void 0&&(u=si),l.theme!==u.theme&&l.theme||r||u.theme}var wy=new Set(["a","abbr","address","area","article","aside","audio","b","base","bdi","bdo","big","blockquote","body","br","button","canvas","caption","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","div","dl","dt","em","embed","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","track","u","ul","use","var","video","wbr","circle","clipPath","defs","ellipse","foreignObject","g","image","line","linearGradient","marker","mask","path","pattern","polygon","polyline","radialGradient","rect","stop","svg","text","tspan"]),z1=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,A1=/(^-|-$)/g;function xg(l){return l.replace(z1,"-").replace(A1,"")}var T1=/(a)(d)/gi,Jo=52,Sg=function(l){return String.fromCharCode(l+(l>25?39:97))};function jd(l){var r,u="";for(r=Math.abs(l);r>Jo;r=r/Jo|0)u=Sg(r%Jo)+u;return(Sg(r%Jo)+u).replace(T1,"$1-$2")}var od,ky=5381,li=function(l,r){for(var u=r.length;u;)l=33*l^r.charCodeAt(--u);return l},Ry=function(l){return li(ky,l)};function D1(l){return jd(Ry(l)>>>0)}function M1(l){return l.displayName||l.name||"Component"}function sd(l){return typeof l=="string"&&!0}var Ey=typeof Symbol=="function"&&Symbol.for,zy=Ey?Symbol.for("react.memo"):60115,O1=Ey?Symbol.for("react.forward_ref"):60112,_1={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},N1={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ay={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},U1=((od={})[O1]={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},od[zy]=Ay,od);function $g(l){return("type"in(r=l)&&r.type.$$typeof)===zy?Ay:"$$typeof"in l?U1[l.$$typeof]:_1;var r}var G1=Object.defineProperty,L1=Object.getOwnPropertyNames,Cg=Object.getOwnPropertySymbols,H1=Object.getOwnPropertyDescriptor,B1=Object.getPrototypeOf,jg=Object.prototype;function Ty(l,r,u){if(typeof r!="string"){if(jg){var c=B1(r);c&&c!==jg&&Ty(l,c,u)}var d=L1(r);Cg&&(d=d.concat(Cg(r)));for(var m=$g(l),h=$g(r),v=0;v<d.length;++v){var g=d[v];if(!(g in N1||u&&u[g]||h&&g in h||m&&g in m)){var p=H1(r,g);try{G1(l,g,p)}catch{}}}}return l}function ui(l){return typeof l=="function"}function Bd(l){return typeof l=="object"&&"styledComponentId"in l}function rl(l,r){return l&&r?"".concat(l," ").concat(r):l||r||""}function wg(l,r){if(l.length===0)return"";for(var u=l[0],c=1;c<l.length;c++)u+=l[c];return u}function Sr(l){return l!==null&&typeof l=="object"&&l.constructor.name===Object.name&&!("props"in l&&l.$$typeof)}function wd(l,r,u){if(u===void 0&&(u=!1),!u&&!Sr(l)&&!Array.isArray(l))return r;if(Array.isArray(r))for(var c=0;c<r.length;c++)l[c]=wd(l[c],r[c]);else if(Sr(r))for(var c in r)l[c]=wd(l[c],r[c]);return l}function Yd(l,r){Object.defineProperty(l,"toString",{value:r})}function kr(l){for(var r=[],u=1;u<arguments.length;u++)r[u-1]=arguments[u];return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(l," for more information.").concat(r.length>0?" Args: ".concat(r.join(", ")):""))}var Y1=(function(){function l(r){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=r}return l.prototype.indexOfGroup=function(r){for(var u=0,c=0;c<r;c++)u+=this.groupSizes[c];return u},l.prototype.insertRules=function(r,u){if(r>=this.groupSizes.length){for(var c=this.groupSizes,d=c.length,m=d;r>=m;)if((m<<=1)<0)throw kr(16,"".concat(r));this.groupSizes=new Uint32Array(m),this.groupSizes.set(c),this.length=m;for(var h=d;h<m;h++)this.groupSizes[h]=0}for(var v=this.indexOfGroup(r+1),g=(h=0,u.length);h<g;h++)this.tag.insertRule(v,u[h])&&(this.groupSizes[r]++,v++)},l.prototype.clearGroup=function(r){if(r<this.length){var u=this.groupSizes[r],c=this.indexOfGroup(r),d=c+u;this.groupSizes[r]=0;for(var m=c;m<d;m++)this.tag.deleteRule(c)}},l.prototype.getGroup=function(r){var u="";if(r>=this.length||this.groupSizes[r]===0)return u;for(var c=this.groupSizes[r],d=this.indexOfGroup(r),m=d+c,h=d;h<m;h++)u+="".concat(this.tag.getRule(h)).concat(Hd);return u},l})(),rs=new Map,ms=new Map,os=1,Fo=function(l){if(rs.has(l))return rs.get(l);for(;ms.has(os);)os++;var r=os++;return rs.set(l,r),ms.set(r,l),r},q1=function(l,r){os=r+1,rs.set(l,r),ms.set(r,l)},Q1="style[".concat(oi,"][").concat(jy,'="').concat(Es,'"]'),X1=new RegExp("^".concat(oi,'\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')),V1=function(l,r,u){for(var c,d=u.split(","),m=0,h=d.length;m<h;m++)(c=d[m])&&l.registerName(r,c)},Z1=function(l,r){for(var u,c=((u=r.textContent)!==null&&u!==void 0?u:"").split(Hd),d=[],m=0,h=c.length;m<h;m++){var v=c[m].trim();if(v){var g=v.match(X1);if(g){var p=0|parseInt(g[1],10),x=g[2];p!==0&&(q1(x,p),V1(l,x,g[3]),l.getTag().insertRules(p,d)),d.length=0}else d.push(v)}}},kg=function(l){for(var r=document.querySelectorAll(Q1),u=0,c=r.length;u<c;u++){var d=r[u];d&&d.getAttribute(oi)!==Cy&&(Z1(l,d),d.parentNode&&d.parentNode.removeChild(d))}};function K1(){return typeof __webpack_nonce__<"u"?__webpack_nonce__:null}var Dy=function(l){var r=document.head,u=l||r,c=document.createElement("style"),d=(function(v){var g=Array.from(v.querySelectorAll("style[".concat(oi,"]")));return g[g.length-1]})(u),m=d!==void 0?d.nextSibling:null;c.setAttribute(oi,Cy),c.setAttribute(jy,Es);var h=K1();return h&&c.setAttribute("nonce",h),u.insertBefore(c,m),c},J1=(function(){function l(r){this.element=Dy(r),this.element.appendChild(document.createTextNode("")),this.sheet=(function(u){if(u.sheet)return u.sheet;for(var c=document.styleSheets,d=0,m=c.length;d<m;d++){var h=c[d];if(h.ownerNode===u)return h}throw kr(17)})(this.element),this.length=0}return l.prototype.insertRule=function(r,u){try{return this.sheet.insertRule(u,r),this.length++,!0}catch{return!1}},l.prototype.deleteRule=function(r){this.sheet.deleteRule(r),this.length--},l.prototype.getRule=function(r){var u=this.sheet.cssRules[r];return u&&u.cssText?u.cssText:""},l})(),F1=(function(){function l(r){this.element=Dy(r),this.nodes=this.element.childNodes,this.length=0}return l.prototype.insertRule=function(r,u){if(r<=this.length&&r>=0){var c=document.createTextNode(u);return this.element.insertBefore(c,this.nodes[r]||null),this.length++,!0}return!1},l.prototype.deleteRule=function(r){this.element.removeChild(this.nodes[r]),this.length--},l.prototype.getRule=function(r){return r<this.length?this.nodes[r].textContent:""},l})(),W1=(function(){function l(r){this.rules=[],this.length=0}return l.prototype.insertRule=function(r,u){return r<=this.length&&(this.rules.splice(r,0,u),this.length++,!0)},l.prototype.deleteRule=function(r){this.rules.splice(r,1),this.length--},l.prototype.getRule=function(r){return r<this.length?this.rules[r]:""},l})(),Rg=fs,P1={isServer:!fs,useCSSOMInjection:!R1},My=(function(){function l(r,u,c){r===void 0&&(r=si),u===void 0&&(u={});var d=this;this.options=Lt(Lt({},P1),r),this.gs=u,this.names=new Map(c),this.server=!!r.isServer,!this.server&&fs&&Rg&&(Rg=!1,kg(this)),Yd(this,function(){return(function(m){for(var h=m.getTag(),v=h.length,g="",p=function(S){var C=(function(O){return ms.get(O)})(S);if(C===void 0)return"continue";var A=m.names.get(C),U=h.getGroup(S);if(A===void 0||!A.size||U.length===0)return"continue";var N="".concat(oi,".g").concat(S,'[id="').concat(C,'"]'),L="";A!==void 0&&A.forEach(function(O){O.length>0&&(L+="".concat(O,","))}),g+="".concat(U).concat(N,'{content:"').concat(L,'"}').concat(Hd)},x=0;x<v;x++)p(x);return g})(d)})}return l.registerId=function(r){return Fo(r)},l.prototype.rehydrate=function(){!this.server&&fs&&kg(this)},l.prototype.reconstructWithOptions=function(r,u){return u===void 0&&(u=!0),new l(Lt(Lt({},this.options),r),this.gs,u&&this.names||void 0)},l.prototype.allocateGSInstance=function(r){return this.gs[r]=(this.gs[r]||0)+1},l.prototype.getTag=function(){return this.tag||(this.tag=(r=(function(u){var c=u.useCSSOMInjection,d=u.target;return u.isServer?new W1(d):c?new J1(d):new F1(d)})(this.options),new Y1(r)));var r},l.prototype.hasNameForId=function(r,u){return this.names.has(r)&&this.names.get(r).has(u)},l.prototype.registerName=function(r,u){if(Fo(r),this.names.has(r))this.names.get(r).add(u);else{var c=new Set;c.add(u),this.names.set(r,c)}},l.prototype.insertRules=function(r,u,c){this.registerName(r,u),this.getTag().insertRules(Fo(r),c)},l.prototype.clearNames=function(r){this.names.has(r)&&this.names.get(r).clear()},l.prototype.clearRules=function(r){this.getTag().clearGroup(Fo(r)),this.clearNames(r)},l.prototype.clearTag=function(){this.tag=void 0},l})(),I1=/&/g,eS=/^\s*\/\/.*$/gm;function Oy(l,r){return l.map(function(u){return u.type==="rule"&&(u.value="".concat(r," ").concat(u.value),u.value=u.value.replaceAll(",",",".concat(r," ")),u.props=u.props.map(function(c){return"".concat(r," ").concat(c)})),Array.isArray(u.children)&&u.type!=="@keyframes"&&(u.children=Oy(u.children,r)),u})}function tS(l){var r,u,c,d=si,m=d.options,h=m===void 0?si:m,v=d.plugins,g=v===void 0?zs:v,p=function(C,A,U){return U.startsWith(u)&&U.endsWith(u)&&U.replaceAll(u,"").length>0?".".concat(r):C},x=g.slice();x.push(function(C){C.type===js&&C.value.includes("&")&&(C.props[0]=C.props[0].replace(I1,u).replace(c,p))}),h.prefix&&x.push(w1),x.push($1);var S=function(C,A,U,N){A===void 0&&(A=""),U===void 0&&(U=""),N===void 0&&(N="&"),r=N,u=A,c=new RegExp("\\".concat(u,"\\b"),"g");var L=C.replace(eS,""),O=x1(U||A?"".concat(U," ").concat(A," { ").concat(L," }"):L);h.namespace&&(O=Oy(O,h.namespace));var B=[];return ds(O,C1(x.concat(j1(function(K){return B.push(K)})))),B};return S.hash=g.length?g.reduce(function(C,A){return A.name||kr(15),li(C,A.name)},ky).toString():"",S}var nS=new My,kd=tS(),_y=ul.createContext({shouldForwardProp:void 0,styleSheet:nS,stylis:kd});_y.Consumer;ul.createContext(void 0);function Eg(){return z.useContext(_y)}var aS=(function(){function l(r,u){var c=this;this.inject=function(d,m){m===void 0&&(m=kd);var h=c.name+m.hash;d.hasNameForId(c.id,h)||d.insertRules(c.id,h,m(c.rules,h,"@keyframes"))},this.name=r,this.id="sc-keyframes-".concat(r),this.rules=u,Yd(this,function(){throw kr(12,String(c.name))})}return l.prototype.getName=function(r){return r===void 0&&(r=kd),this.name+r.hash},l})(),lS=function(l){return l>="A"&&l<="Z"};function zg(l){for(var r="",u=0;u<l.length;u++){var c=l[u];if(u===1&&c==="-"&&l[0]==="-")return l;lS(c)?r+="-"+c.toLowerCase():r+=c}return r.startsWith("ms-")?"-"+r:r}var Ny=function(l){return l==null||l===!1||l===""},Uy=function(l){var r,u,c=[];for(var d in l){var m=l[d];l.hasOwnProperty(d)&&!Ny(m)&&(Array.isArray(m)&&m.isCss||ui(m)?c.push("".concat(zg(d),":"),m,";"):Sr(m)?c.push.apply(c,cs(cs(["".concat(d," {")],Uy(m),!1),["}"],!1)):c.push("".concat(zg(d),": ").concat((r=d,(u=m)==null||typeof u=="boolean"||u===""?"":typeof u!="number"||u===0||r in k1||r.startsWith("--")?String(u).trim():"".concat(u,"px")),";")))}return c};function sl(l,r,u,c){if(Ny(l))return[];if(Bd(l))return[".".concat(l.styledComponentId)];if(ui(l)){if(!ui(m=l)||m.prototype&&m.prototype.isReactComponent||!r)return[l];var d=l(r);return sl(d,r,u,c)}var m;return l instanceof aS?u?(l.inject(u,c),[l.getName(c)]):[l]:Sr(l)?Uy(l):Array.isArray(l)?Array.prototype.concat.apply(zs,l.map(function(h){return sl(h,r,u,c)})):[l.toString()]}function iS(l){for(var r=0;r<l.length;r+=1){var u=l[r];if(ui(u)&&!Bd(u))return!1}return!0}var rS=Ry(Es),oS=(function(){function l(r,u,c){this.rules=r,this.staticRulesId="",this.isStatic=(c===void 0||c.isStatic)&&iS(r),this.componentId=u,this.baseHash=li(rS,u),this.baseStyle=c,My.registerId(u)}return l.prototype.generateAndInjectStyles=function(r,u,c){var d=this.baseStyle?this.baseStyle.generateAndInjectStyles(r,u,c):"";if(this.isStatic&&!c.hash)if(this.staticRulesId&&u.hasNameForId(this.componentId,this.staticRulesId))d=rl(d,this.staticRulesId);else{var m=wg(sl(this.rules,r,u,c)),h=jd(li(this.baseHash,m)>>>0);if(!u.hasNameForId(this.componentId,h)){var v=c(m,".".concat(h),void 0,this.componentId);u.insertRules(this.componentId,h,v)}d=rl(d,h),this.staticRulesId=h}else{for(var g=li(this.baseHash,c.hash),p="",x=0;x<this.rules.length;x++){var S=this.rules[x];if(typeof S=="string")p+=S;else if(S){var C=wg(sl(S,r,u,c));g=li(g,C+x),p+=C}}if(p){var A=jd(g>>>0);u.hasNameForId(this.componentId,A)||u.insertRules(this.componentId,A,c(p,".".concat(A),void 0,this.componentId)),d=rl(d,A)}}return d},l})(),Gy=ul.createContext(void 0);Gy.Consumer;var ud={};function sS(l,r,u){var c=Bd(l),d=l,m=!sd(l),h=r.attrs,v=h===void 0?zs:h,g=r.componentId,p=g===void 0?(function(j,V){var W=typeof j!="string"?"sc":xg(j);ud[W]=(ud[W]||0)+1;var Z="".concat(W,"-").concat(D1(Es+W+ud[W]));return V?"".concat(V,"-").concat(Z):Z})(r.displayName,r.parentComponentId):g,x=r.displayName,S=x===void 0?(function(j){return sd(j)?"styled.".concat(j):"Styled(".concat(M1(j),")")})(l):x,C=r.displayName&&r.componentId?"".concat(xg(r.displayName),"-").concat(r.componentId):r.componentId||p,A=c&&d.attrs?d.attrs.concat(v).filter(Boolean):v,U=r.shouldForwardProp;if(c&&d.shouldForwardProp){var N=d.shouldForwardProp;if(r.shouldForwardProp){var L=r.shouldForwardProp;U=function(j,V){return N(j,V)&&L(j,V)}}else U=N}var O=new oS(u,C,c?d.componentStyle:void 0);function B(j,V){return(function(W,Z,ce){var le=W.attrs,be=W.componentStyle,Ae=W.defaultProps,Ce=W.foldedComponentIds,dt=W.styledComponentId,ft=W.target,re=ul.useContext(Gy),R=Eg(),F=W.shouldForwardProp||R.shouldForwardProp,ee=E1(Z,re,Ae)||si,fe=(function(de,he,Re){for(var et,Ue=Lt(Lt({},he),{className:void 0,theme:Re}),On=0;On<de.length;On+=1){var _n=ui(et=de[On])?et(Ue):et;for(var nn in _n)Ue[nn]=nn==="className"?rl(Ue[nn],_n[nn]):nn==="style"?Lt(Lt({},Ue[nn]),_n[nn]):_n[nn]}return he.className&&(Ue.className=rl(Ue.className,he.className)),Ue})(le,Z,ee),Te=fe.as||ft,k={};for(var q in fe)fe[q]===void 0||q[0]==="$"||q==="as"||q==="theme"&&fe.theme===ee||(q==="forwardedAs"?k.as=fe.forwardedAs:F&&!F(q,Te)||(k[q]=fe[q]));var I=(function(de,he){var Re=Eg(),et=de.generateAndInjectStyles(he,Re.styleSheet,Re.stylis);return et})(be,fe),te=rl(Ce,dt);return I&&(te+=" "+I),fe.className&&(te+=" "+fe.className),k[sd(Te)&&!wy.has(Te)?"class":"className"]=te,ce&&(k.ref=ce),z.createElement(Te,k)})(K,j,V)}B.displayName=S;var K=ul.forwardRef(B);return K.attrs=A,K.componentStyle=O,K.displayName=S,K.shouldForwardProp=U,K.foldedComponentIds=c?rl(d.foldedComponentIds,d.styledComponentId):"",K.styledComponentId=C,K.target=c?d.target:l,Object.defineProperty(K,"defaultProps",{get:function(){return this._foldedDefaultProps},set:function(j){this._foldedDefaultProps=c?(function(V){for(var W=[],Z=1;Z<arguments.length;Z++)W[Z-1]=arguments[Z];for(var ce=0,le=W;ce<le.length;ce++)wd(V,le[ce],!0);return V})({},d.defaultProps,j):j}}),Yd(K,function(){return".".concat(K.styledComponentId)}),m&&Ty(K,l,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),K}function Ag(l,r){for(var u=[l[0]],c=0,d=r.length;c<d;c+=1)u.push(r[c],l[c+1]);return u}var Tg=function(l){return Object.assign(l,{isCss:!0})};function cl(l){for(var r=[],u=1;u<arguments.length;u++)r[u-1]=arguments[u];if(ui(l)||Sr(l))return Tg(sl(Ag(zs,cs([l],r,!0))));var c=l;return r.length===0&&c.length===1&&typeof c[0]=="string"?sl(c):Tg(sl(Ag(c,r)))}function Rd(l,r,u){if(u===void 0&&(u=si),!r)throw kr(1,r);var c=function(d){for(var m=[],h=1;h<arguments.length;h++)m[h-1]=arguments[h];return l(r,u,cl.apply(void 0,cs([d],m,!1)))};return c.attrs=function(d){return Rd(l,r,Lt(Lt({},u),{attrs:Array.prototype.concat(u.attrs,d).filter(Boolean)}))},c.withConfig=function(d){return Rd(l,r,Lt(Lt({},u),d))},c}var Ly=function(l){return Rd(sS,l)},T=Ly;wy.forEach(function(l){T[l]=Ly(l)});const gt="360px",ut="400px",Ze="480px",ue="640px",pn="768px",ml="1024px",Dg="1200px",ke="#ffffff",Tn="#000000",Rt="#333333",pi="#666666",en="#cccccc",yn="#f0f0f0",yt="#f8f9fa",vn="#e9ecef",Fe="#dee2e6",gi="#495057",Dn="#212529",ye="#007acc",_a="#007bff",tn="#005c99",ci="#0056b3",hl="#f0f8ff",qd="#2c3e50",Rr="#1d7231",Qd="#28a745",hs="#155724",Er="#d4edda",Na="#ffc107",Hy="#856404",As="#fff3cd",Ma="#fd7e14",Xd="#dc3545",ps="#fee",gs="#fcc",Vd="#efe",Zd="#cfc",By="#f8d7da",Yy="#721c24",Kd="#f5c6cb",Ts="#6c757d",ys="#c82333",Jd="#777",bn="rgba(0, 0, 0, 0.1)",di="rgba(0, 0, 0, 0.2)",qy="rgba(0, 0, 0, 0.4)",uS={white:ke,black:Tn,darkGrey:Rt,mediumGrey:pi,lightGrey:en,veryLightGrey:yn,paleGrey:yt,softGrey:vn,borderGrey:Fe,slateGrey:gi,charcoal:Dn,blue:ye,lightBlue:_a,darkBlue:tn,darkerBlue:ci,veryLightBlue:hl,navyBlue:qd,green:Rr,lightGreen:Qd,successGreen:hs,successBg:Er,yellow:Na,warningYellow:Hy,warningBg:As,orange:Ma,red:Xd,lightRed:ps,redBorder:gs,lightGreenBg:Vd,greenBorder:Zd,errorBg:By,errorText:Yy,errorBorder:Kd,mutedGrey:Ts,darkRed:ys,textGrey:Jd,shadowLight:bn,shadowMedium:di,shadowDark:qy},Ed=Object.freeze(Object.defineProperty({__proto__:null,black:Tn,blue:ye,borderGrey:Fe,charcoal:Dn,darkBlue:tn,darkGrey:Rt,darkRed:ys,darkerBlue:ci,default:uS,errorBg:By,errorBorder:Kd,errorText:Yy,green:Rr,greenBorder:Zd,lightBlue:_a,lightGreen:Qd,lightGreenBg:Vd,lightGrey:en,lightRed:ps,mediumGrey:pi,mutedGrey:Ts,navyBlue:qd,orange:Ma,paleGrey:yt,red:Xd,redBorder:gs,shadowDark:qy,shadowLight:bn,shadowMedium:di,slateGrey:gi,softGrey:vn,successBg:Er,successGreen:hs,textGrey:Jd,veryLightBlue:hl,veryLightGrey:yn,warningBg:As,warningYellow:Hy,white:ke,yellow:Na},Symbol.toStringTag,{value:"Module"})),Fd="3.5rem",Wd="3rem",Ds="1.5rem",Ms="1.25rem",wt="1rem",at="0.875rem",cS={title:Fd,huge:Wd,large:Ds,medium:Ms,body:wt,small:at},dS=Object.freeze(Object.defineProperty({__proto__:null,body:wt,default:cS,huge:Wd,large:Ds,medium:Ms,small:at,title:Fd},Symbol.toStringTag,{value:"Module"})),Pd="0 2px 4px rgba(0, 0, 0, 0.05)",fS="0 4px 8px rgba(0, 0, 0, 0.1)",mS="0 8px 16px rgba(0, 0, 0, 0.15)",Qy="0 0 0 3px rgba(0, 123, 255, 0.25)",ze="1px",Ne="2px",xe="4px",P="8px",Y="16px",J="24px",Bt="44px",se="48px",Oa="96px",hS={micro:ze,mini:Ne,fine:xe,tiny:P,small:Y,medium:J,tapTarget:Bt,large:se,giant:Oa},Mg=Object.freeze(Object.defineProperty({__proto__:null,default:hS,fine:xe,giant:Oa,large:se,medium:J,micro:ze,mini:Ne,small:Y,tapTarget:Bt,tiny:P},Symbol.toStringTag,{value:"Module"})),aa="0.5rem",At="1rem",Ht="1.5rem",hn="3rem",Xy="4.5rem",cd=T.button`
  padding: ${P};
  border: ${Ne} solid transparent;
  border-radius: ${P};
  cursor: pointer;
  font-size: ${at};
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: ${Bt};
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${ke};
  width: auto;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (min-width: ${Ze}) {
    font-size: ${wt};
    padding: ${Y} ${J};
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${fS};
  }

  &:focus {
    outline: none;
    border-color: ${Rt};
    box-shadow: 0 0 0 3px ${yn};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${Pd};
  }

  ${l=>l.$variant==="default"&&`
    background: ${ye};

    &:hover {
      background: ${tn};
    }

    &:focus {
      border-color: ${tn};
      box-shadow: ${Qy};
    }
  `}

  ${l=>l.$variant==="destructive"&&`
    background: ${Xd};

    &:hover {
      background: ${ys};
    }

    &:focus {
      border-color: ${ys};
      box-shadow: 0 0 0 3px ${Kd};
    }
  `}

  ${l=>l.$variant==="success"&&`
    background: ${Rr};

    &:hover {
      background: ${hs};
    }

    &:focus {
      border-color: ${hs};
      box-shadow: 0 0 0 3px ${Er};
    }
  `}

  ${l=>l.$variant==="disabled"&&`
    background: ${pi};

    &:hover {
      background: ${Rt};
    }
  `}

  ${l=>l.$variant==="warning"&&`
    background: ${Na};
    color: ${Tn};

    &:hover {
      background: ${Ma};
    }

    &:focus {
      border-color: ${Ma};
      box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.25);
    }
  `}
`;function Ie({children:l,onClick:r,variant:u="default",as:c="button",href:d,to:m,type:h,className:v,external:g=!1,...p}){return c==="link"&&m?s.jsx(cd,{as:Cs,to:m,onClick:r,$variant:u,className:v,...p,children:l}):c==="a"&&(d||g)?s.jsx(cd,{as:"a",href:d,onClick:r,$variant:u,className:v,...p,children:l}):s.jsx(cd,{as:"button",onClick:r,$variant:u,type:h,className:v,...p,children:l})}const pS=T.div`
  max-width: 100%;
  width: 100%;
  padding: ${Y};
  margin: 0 ${P};
  background: ${yt};
  border: ${Ne} solid ${vn};
  border-radius: ${Y};
  text-align: left;
  transition: all 0.2s ease;
  cursor: ${l=>l.$clickable?"pointer":"default"};
  box-sizing: border-box;

  @media (min-width: ${gt}) {
    margin: 0;
  }

  @media (min-width: ${Ze}) {
    padding: ${J};
  }

  @media (min-width: ${pn}) {
    max-width: ${l=>l.$maxWidth||"300px"};
  }

  ${l=>l.$variant==="elevated"&&`
    box-shadow: 0 ${xe} ${Y} ${bn};
    border: none;
  `}

  ${l=>l.$variant==="outlined"&&`
    background: transparent;
    border: ${Ne} solid ${ye};
  `}

  ${l=>l.$clickable&&`
    &:hover {
      background: ${vn};
      border-color: ${ye};
      transform: translateY(-${Ne});
      box-shadow: 0 ${xe} ${Y} ${bn};
    }

    &:focus {
      outline: none;
      border-color: ${ye};
      box-shadow: 0 0 0 ${xe} rgba(0, 123, 255, 0.25);
    }

    &:active {
      transform: translateY(0);
    }
  `}
`,gS=T.div`
  margin-bottom: ${Y};
`,yS=T.div`
  color: ${Jd};
  line-height: 1.5;

  > p:not([class]) {
    margin: ${xe} 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`,vS=T.div`
  margin-top: ${Y};
  padding-top: ${Y};
  border-top: 1px solid ${Fe};
`,bS=T.div`
  display: flex;
  flex-direction: column;
  gap: ${P};
  margin-top: ${Y};
  justify-content: flex-end;
  flex-wrap: wrap;

  @media (min-width: ${Ze}) {
    flex-direction: row;
    gap: ${Y};
  }
`,xS=T.span`
  color: ${({$colour:l})=>l?Ed[l]:Tn};
  font-size: ${({$fontSize:l})=>l?dS[l]:wt};
  text-align: ${({$center:l})=>l?"center":"left"};
  margin-bottom: ${({$mb:l})=>l?Mg[l]:"0"};
  margin-top: ${({$mt:l})=>l?Mg[l]:"0"};
  margin-left: 0;
  margin-right: 0;
  overflow-wrap: normal;
  word-wrap: normal;
  hyphens: none;
  white-space: normal;
  max-width: 100%;

  ${({$bold:l})=>l&&cl`
      font-weight: 600;
    `}

  ${({$italic:l})=>l&&cl`
      font-style: italic;
    `}
`;function b({children:l,as:r="span",bold:u=!1,center:c=!1,className:d,colour:m="black",fontSize:h="body",htmlFor:v,id:g,italic:p=!1,mb:x,mt:S,role:C,"aria-live":A}){const U={};return r&&(U.as=r),d&&(U.className=d),v&&(U.htmlFor=v),g&&(U.id=g),C&&(U.role=C),A&&(U["aria-live"]=A),s.jsx(xS,{...U,$bold:u,$center:c,$colour:m,$fontSize:h,$italic:p,$mb:x,$mt:S,children:l})}function vs({children:l,title:r,subtitle:u,titleSize:c="medium",clickable:d=!1,variant:m="default",maxWidth:h,footer:v,actions:g,onClick:p,className:x,"aria-label":S,role:C}){const A=d?"button":"div";return s.jsxs(pS,{as:A,$clickable:d,$variant:m,$maxWidth:h,onClick:p,className:x,"aria-label":S,role:C,children:[(r||u)&&s.jsxs(gS,{children:[r&&s.jsx(b,{as:"h3",bold:!0,colour:"darkGrey",fontSize:c,mb:"tiny",children:r}),u&&s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"small",children:u})]}),s.jsx(yS,{children:l}),v&&s.jsx(vS,{children:v}),g&&s.jsx(bS,{children:g})]})}const SS=T(b).withConfig({shouldForwardProp:l=>!["colour","fontSize","mb","mt"].includes(l)})`
  background-color: ${yt};
  border: ${ze} solid ${vn};
  border-radius: ${xe};
  padding: ${Y};
  font-family: 'Courier New', Monaco, monospace;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre;
`;function Vy({children:l,className:r}){return s.jsx(SS,{as:"pre",className:r,colour:"slateGrey",fontSize:"small",mb:"small",mt:"small",children:l})}const zd=l=>!l||l.trim()===""?"":` (${l})`,It=(l,r)=>{if(l.id===r.id)throw new Error(`Invalid comparison: Cannot compare coaster '${l.name}' against itself (ID: ${l.id}). This suggests duplicate IDs in your data. Please check that all coasters have unique IDs. Other coaster details: '${r.name}' (ID: ${r.id})`);return l.id<r.id?`${l.id}-${r.id}`:`${r.id}-${l.id}`},$S=l=>{const r=l.filter(h=>h.isPreRanked&&h.originalRankPosition!==void 0||h.rankPosition!==void 0&&!h.isNewCoaster),u=l.filter(h=>h.isNewCoaster||!h.isPreRanked&&h.rankPosition===void 0),d=r.sort((h,v)=>{const g=h.originalRankPosition||h.rankPosition||0,p=v.originalRankPosition||v.rankPosition||0;return g-p}).map(h=>h.id);return{coasters:l.map(h=>u.includes(h)&&u[0]===h?{...h,isCurrentlyRanking:!0}:{...h,isCurrentlyRanking:!1}),rankedCoasters:d}},CS=l=>{if(l.length===0)return"individual";const r=new Map;l.forEach(m=>{const h=m.park;r.has(h)||r.set(h,[]),r.get(h).push(m)});const u=new Map;l.forEach(m=>{const h=m.model||"Unknown Model";u.has(h)||u.set(h,[]),u.get(h).push(m)});const c=l.length/r.size,d=l.length/u.size;return r.size>=3&&r.size<=10&&c>=4?"park":u.size>=3&&u.size<=15&&d>=3?"model":"individual"},jS=(l,r,u,c,d)=>{const m=l.includes(r),h=l.includes(u);if(m&&h){const v=l.indexOf(r),g=l.indexOf(u);if(v<g)return l;{const p=[...l];p.splice(v,1);const x=p.indexOf(u);return p.splice(x,0,r),p}}if(!m&&h){const v=d.find(p=>p.id===r),g=l.map(p=>d.find(x=>x.id===p)).filter(p=>p!==void 0);if(v){const p=Td(v,g,c);if(p===-1)return l;const x=[...l];return x.splice(p,0,r),x}}if(m&&!h){const v=d.find(p=>p.id===u),g=l.map(p=>d.find(x=>x.id===p)).filter(p=>p!==void 0);if(v){const p=Td(v,g,c);if(p===-1)return l;const x=l.indexOf(r),S=Math.max(p,x+1),C=[...l];return C.splice(S,0,u),C}}return!m&&!h?[r,u]:l},wS=(l,r,u,c)=>{if(r.length===0)return{newRanking:[l.id],insertPosition:0};const d=kS(l,r,u,c),m=[...r];return m.splice(d,0,l.id),{newRanking:m,insertPosition:d}},kS=(l,r,u,c)=>{if(r.length===0)return 0;const d=r.map(h=>c.find(v=>v.id===h)).filter(h=>h!==void 0),m=Td(l,d,u);return m===-1?r.length:m},RS=(l,r,u,c)=>{if(r.length===0)return!0;const d=r.map(m=>c.find(h=>h.id===m)).filter(m=>m!==void 0);return ES(l,d,u)},Ad=(l,r)=>l.map(u=>({...u,rankPosition:r.includes(u.id)?r.indexOf(u.id)+1:void 0})),Td=(l,r,u)=>{if(r.length===0)return 0;let c=0,d=r.length;for(;c<d;){const m=Math.floor((c+d)/2),h=r[m],v=It(l,h),g=u.get(v);if(g===void 0)return-1;g===l.id?d=m:c=m+1}return c},ES=(l,r,u)=>{if(r.length===0)return!0;let c=0,d=r.length;for(;c<d;){const m=Math.floor((c+d)/2),h=r[m],v=It(l,h),g=u.get(v);if(g===void 0)return!1;g===l.id?d=m:c=m+1}return!0},zS=(l,r,u)=>{if(r.length===0)return null;let c=0,d=r.length;for(;c<d;){const m=Math.floor((c+d)/2),h=r[m];if(h.id===l.id){c=m+1;continue}const v=It(l,h),g=u.get(v);if(g===void 0)return h;g===l.id?d=m:c=m+1}return null},AS=(l,r)=>{const u=[],c=l.filter(h=>!h.isNewCoaster),d=l.filter(h=>h.isNewCoaster),m=(h,v)=>h.isPreRanked&&v.isPreRanked;if(c.length>0&&d.length>0){if(c.some(v=>v.rankPosition!==void 0)&&c.length>=3){const v=TS(l,r);u.push(...v);for(const g of d.filter(p=>!p.isPreRanked)){const p=c.filter(S=>{const C=It(g,S);return r.has(C)}).length,x=Math.min(5,Math.ceil(c.length/2));if(p<x){const S=[...c].sort((U,N)=>{const L=U.rankPosition||Number.MAX_SAFE_INTEGER,O=N.rankPosition||Number.MAX_SAFE_INTEGER;return L-O}),C=S[S.length-1],A=It(g,C);if(r.has(A)||u.push([g,C]),p<2){const U=S[0],N=It(g,U);r.has(N)||u.push([g,U])}}}}else for(const v of d)for(const g of c){const p=It(v,g);r.has(p)||u.push([v,g])}for(let v=0;v<d.length-1;v++)for(let g=v+1;g<d.length;g++){const p=d[v],x=d[g];if(m(p,x))continue;const S=It(p,x);r.has(S)||u.push([p,x])}}else for(let h=0;h<l.length-1;h++)for(let v=h+1;v<l.length;v++){const g=l[h],p=l[v];if(m(g,p))continue;const x=It(g,p);r.has(x)||u.push([g,p])}return u},ss=(l,r,u,c)=>{const d=[];if(r.length===0&&l.length>=2){const S=l.filter(C=>!C.isPreRanked&&C.rankPosition===void 0);if(S.length>=2&&(d.push([S[0],S[1]]),S.length>=3)){const C=S[2];d.push([C,S[0]]),d.push([C,S[1]])}return d}const m=new Set(r),h=l.filter(S=>!S.isPreRanked&&!m.has(S.id)&&S.rankPosition===void 0);if(h.length===0)return MS(l,r,u);let g=l.find(S=>S.isCurrentlyRanking);if(!g&&h.length>0&&(g=h[0]),!g)return d;const p=r.map(S=>l.find(C=>C.id===S)).filter(S=>S!==void 0&&S.id!==g.id);if(p.length===0)return d;const x=zS(g,p,c||new Map);if(x&&x.id!==g.id){const S=It(g,x);u.has(S)||d.push([g,x])}return d},TS=(l,r)=>{const u=[],c=l.filter(h=>h.isNewCoaster&&!h.isPreRanked),d=l.filter(h=>!h.isNewCoaster&&h.rankPosition!==void 0);if(c.length===0||d.length===0)return u;const m=d.sort((h,v)=>{const g=h.rankPosition||Number.MAX_SAFE_INTEGER,p=v.rankPosition||Number.MAX_SAFE_INTEGER;return g-p});for(const h of c){const v=DS(h,m,r);u.push(...v)}return u},DS=(l,r,u)=>{const c=[];let d=0,m=r.length;for(;d<m&&c.length<3;){const h=Math.floor((d+m)/2),v=r[h],g=It(l,v);u.has(g)||c.push([l,v]);break}return c},MS=(l,r,u)=>{const c=[],d=r.map(m=>l.find(h=>h.id===m)).filter(m=>m!==void 0);if(d.length<2)return c;for(let m=0;m<Math.min(d.length-1,3);m++){const h=d[m],v=d[m+1],g=It(h,v);u.has(g)||c.push([h,v])}return c},OS=T.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: ${Y};
  margin: ${J} 0;
  padding: 0 ${P};

  @media (min-width: ${Ze}) {
    padding: 0;
    margin: ${se} 0;
  }

  @media (min-width: ${pn}) {
    flex-direction: row;
    gap: ${J};
  }
`,_S=T.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${pi};
  margin: ${P} 0;
  font-size: ${Ms};

  @media (min-width: ${Ze}) {
    margin: ${Y} 0;
    font-size: ${Ds};
  }

  @media (min-width: ${pn}) {
    margin: 0 ${Y};
  }
`;function Os({coaster1:l,coaster2:r,onChoose1:u,onChoose2:c,clickable:d=!0,coaster1Label:m=l.name,coaster2Label:h=r.name}){return s.jsxs(OS,{children:[s.jsxs(vs,{title:m,subtitle:`${l.park}${zd(l.country)}`,clickable:d,"aria-label":d?`Choose ${l.name} as your favorite`:void 0,onClick:d?u:void 0,children:[s.jsxs("p",{children:[s.jsx(b,{bold:!0,children:"Manufacturer:"})," ",l.manufacturer]}),s.jsxs("p",{children:[s.jsx(b,{bold:!0,children:"Model:"})," ",l.model]}),s.jsxs("p",{children:[s.jsx(b,{bold:!0,children:"Material:"})," ",l.material]}),s.jsxs("p",{children:[s.jsx(b,{bold:!0,children:"Country:"})," ",l.country||"Not specified"]})]}),s.jsx(_S,{children:"VS"}),s.jsxs(vs,{title:h,subtitle:`${r.park}${zd(r.country)}`,clickable:d,"aria-label":d?`Choose ${r.name} as your favorite`:void 0,onClick:d?c:void 0,children:[s.jsxs("p",{children:[s.jsx(b,{bold:!0,children:"Manufacturer:"})," ",r.manufacturer]}),s.jsxs("p",{children:[s.jsx(b,{bold:!0,children:"Model:"})," ",r.model]}),s.jsxs("p",{children:[s.jsx(b,{bold:!0,children:"Material:"})," ",r.material]}),s.jsxs("p",{children:[s.jsx(b,{bold:!0,children:"Country:"})," ",r.country||"Not specified"]})]})]})}const NS=T.div`
  background-color: ${yt};
  border: ${ze} solid ${vn};
  border-radius: ${P};
  padding: ${Y};
  margin-bottom: ${Y};
  color: ${Dn};
  font-size: ${at};
  display: flex;
  flex-direction: column;
  gap: ${Y};

  @media (min-width: ${Ze}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: ${J};
  }

  p {
    margin: 0;
    flex: 1;
  }

  a {
    flex-shrink: 0;
    font-size: ${at};
    padding: ${P} ${Y};
    text-align: center;
    min-width: fit-content;
  }
`;function zr({coasterCount:l}){return s.jsxs(NS,{children:[s.jsxs(b,{as:"p",children:["You currently have ",s.jsxs(b,{bold:!0,children:[l," coasters"]})," in your collection."]}),s.jsx(jt,{href:"/view-coasters",variant:"button",children:"View all coasters"})]})}function US(l,r){const u=["name","park","manufacturer","model"],c=[];return u.forEach(d=>{const m=l[d]?.toLowerCase().trim(),h=r[d]?.toLowerCase().trim();m&&h&&m===h&&c.push(d)}),{matchingFields:c,matchCount:c.length}}function Zy(l,r){const u=[];return r.forEach(c=>{l.forEach(d=>{const m=US(d,c);m.matchCount>=3&&u.push({existingCoaster:d,newCoaster:c,matchingFields:m.matchingFields,matchCount:m.matchCount})})}),{hasDuplicates:u.length>0,duplicates:u}}function GS(l){const r=l.map(u=>{switch(u){case"name":return"Name";case"park":return"Park";case"manufacturer":return"Manufacturer";case"model":return"Model";default:return u}});return r.length===1?r[0]:r.length===2?`${r[0]} and ${r[1]}`:`${r.slice(0,-1).join(", ")}, and ${r[r.length-1]}`}const LS=T.div`
  background: ${Er};
  border: ${ze} solid ${Na};
  border-radius: ${P};
  padding: ${At};
  margin: ${At} 0;
`,HS=T.div`
  margin-bottom: ${At};
`,BS=T.div`
  background: ${ke};
  border: ${ze} solid ${Na};
  border-radius: ${P};
  padding: ${At};
  margin: ${At} 0;

  @media (max-width: ${pn}) {
    padding: ${aa};
    margin: ${aa} 0;
  }
`,YS=T(b).withConfig({shouldForwardProp:l=>!["fontSize","mb","mt"].includes(l)})`
  background: ${hl};
  border: ${ze} solid ${_a};
  border-radius: ${xe};
  padding: ${aa};
`,qS=T.div`
  display: flex;
  gap: ${aa};
  margin-top: ${Ht};
  flex-wrap: wrap;
`,fr=T(Ie)`
  padding: ${P} ${Y};
  font-size: ${at};
  min-height: auto;
  opacity: ${l=>l.$isSelected?1:.7};
  font-weight: ${l=>l.$isSelected?"bold":"normal"};
`,QS=T.div`
  display: flex;
  gap: ${Ht};
  margin-top: ${hn};
  flex-wrap: wrap;
  align-items: center;
`,XS=T.div`
  background: ${hl};
  border: ${ze} solid ${_a};
  border-radius: ${xe};
  padding: ${aa};
  font-size: ${at};
  color: ${ci};
  flex: 1;
  min-width: ${ut};
`;function Id({duplicates:l,onResolve:r,onCancel:u}){const[c,d]=ul.useState(new Map),m=(p,x)=>{d(S=>new Map(S.set(x,p)))},h=()=>{if(!v){const x=l.length-c.size;alert(`Please choose an action for ${x} more duplicate${x!==1?"s":""} before confirming.`);return}const p=l.map((x,S)=>({duplicateIndex:S,action:c.get(S)||"keep-both"}));r(p)},v=l.every((p,x)=>c.has(x)),g=l.length-c.size;return s.jsxs(LS,{children:[s.jsxs(HS,{children:[s.jsx(b,{as:"h3",colour:"warningYellow",fontSize:"large",mb:"tiny",children:"Potential Duplicate Coasters Detected"}),s.jsxs(b,{as:"p",colour:"warningYellow",fontSize:"small",children:["We found ",l.length," potential duplicate",l.length!==1?"s":""," in your upload. Please review each match and choose how to handle them."]})]}),l.map((p,x)=>s.jsxs(BS,{children:[s.jsxs(YS,{as:"p",fontSize:"small",mb:"small",mt:"small",children:[s.jsxs(b,{bold:!0,colour:"darkerBlue",children:["Match ",x+1,":"]})," ",GS(p.matchingFields)," match (",p.matchCount," of 4 fields)"]}),s.jsx(Os,{coaster1:p.existingCoaster,coaster2:p.newCoaster,clickable:!1,coaster1Label:"Existing Coaster",coaster2Label:"New Coaster"}),s.jsxs(qS,{children:[s.jsx(fr,{onClick:()=>m("keep-existing",x),$isSelected:c.get(x)==="keep-existing",variant:"destructive",children:"Keep Existing Only"}),s.jsx(fr,{onClick:()=>m("keep-new",x),$isSelected:c.get(x)==="keep-new",variant:"success",children:"Keep New Only"}),s.jsx(fr,{onClick:()=>m("keep-both",x),$isSelected:c.get(x)==="keep-both",variant:"default",children:"Keep Both (Different Experiences)"})]})]},x)),s.jsxs(QS,{children:[s.jsx(fr,{"aria-describedby":v?void 0:"confirm-help-text",onClick:h,variant:"default",children:"Confirm Choices"}),!v&&s.jsxs(XS,{id:"confirm-help-text",children:["Please choose an action for ",g," more duplicate",g!==1?"s":""]}),s.jsx(fr,{onClick:u,variant:"disabled",children:"Cancel Upload"})]})]})}const VS=T.footer`
  background-color: ${Tn};
  padding: ${J};
  margin-top: auto;
`,ZS=T.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${J};

  @media (min-width: ${ue}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: ${se};
  }
`,KS=T.nav`
  display: flex;
  flex-wrap: wrap;
  gap: ${Y};
  justify-content: center;

  @media (min-width: ${ue}) {
    justify-content: flex-start;
    gap: ${J};
  }

  a {
    color: ${en};
    text-decoration: none;
    font-size: ${at};
    font-weight: 400;
    padding: ${P} ${Y};
    border-radius: ${xe};
    transition: all 0.2s ease-in-out;
    position: relative;

    &:hover,
    &:focus {
      color: ${ke};
      background-color: ${Rt};
      transform: translateY(-1px);
    }

    &:focus {
      outline: ${Ne} solid ${_a};
      outline-offset: ${Ne};
    }

    &:active {
      transform: translateY(0);
    }
  }
`,JS=T(b).withConfig({shouldForwardProp:l=>!["colour","fontSize"].includes(l)})`
  color: ${ke};
  font-weight: 300;
  text-align: center;

  @media (min-width: ${ue}) {
    text-align: right;
  }
`,FS=cl`
  display: inline-block;
  background-color: ${ye};
  color: ${ke};
  padding: ${P};
  border-radius: ${P};
  font-weight: bold;
  transition: all 0.2s ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${tn};
    color: ${ke};
    text-decoration: none;
  }

  &:focus {
    color: ${ke};
    text-decoration: none;
  }

  &:visited {
    color: ${ke};
    background-color: ${ye};
  }

  &:link {
    color: ${ke};
    background-color: ${ye};
  }

  &:active {
    transform: translateY(1px);
  }
`,WS=cl`
  display: inline-block;
  margin-top: ${J};
  color: ${ye};
  font-size: ${at};

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: ${ye};
  }
`,PS=cl`
  ${({$dark:l})=>l?`color: ${Tn};`:`color: ${ke};`}

  &:hover {
    text-decoration: underline;
  }

  &:focus {
    text-decoration: underline;
  }

  &:visited {
    ${({$dark:l})=>l?`color: ${Tn};`:`color: ${ke};`}
  }
`,Og=T.a`
  ${({$center:l})=>l&&"text-align: center; display: block;"}
  ${({$bold:l})=>l&&"font-weight: bold;"}
  ${({$fontSize:l})=>l&&`font-size: ${l};`}
  text-decoration: none;

  &:focus {
    outline: ${Ne} solid ${ye};
    outline-offset: ${Ne};
  }

  ${({$variant:l})=>{switch(l){case"button":return FS;case"back":return WS;default:return PS}}}
`;function jt({children:l,href:r,bold:u=!1,center:c=!1,dark:d=!1,fontSize:m=wt,variant:h="text",onClick:v,external:g=!1}){return g||r.startsWith("http")?s.jsx(Og,{as:"a",href:r,$bold:u,$center:c,$dark:d,$fontSize:m,$variant:h,onClick:v,children:l}):s.jsx(Og,{as:Cs,to:r,$bold:u,$center:c,$dark:d,$fontSize:m,$variant:h,onClick:v,children:l})}function IS(){return s.jsx(VS,{children:s.jsxs(ZS,{children:[s.jsxs(KS,{children:[s.jsx(jt,{href:"/accessibility",children:"Accessibility"}),s.jsx(jt,{href:"/privacy-policy",children:"Privacy Policy"})]}),s.jsx(JS,{as:"p",colour:"white",fontSize:"small",children:"© Bubble & Squeak"})]})})}const e$=T.div`
  text-align: center;
  margin-bottom: ${J};
  padding: ${Y} ${J};
  background: ${yt};
  border-radius: ${P};
  border: ${ze} solid ${vn};
`,t$=T.div`
  width: 100%;
  background-color: ${Fe};
  border-radius: ${P};
  margin: ${At} 0 0 0;
  height: ${P};
`,n$=T.div`
  width: ${l=>l.$progress}%;
  background-color: ${ye};
  height: 100%;
  border-radius: ${P};
  transition: width 0.3s ease;
`;function Ky({remainingComparisons:l,showProgressBar:r=!1,title:u="Which coaster do you prefer?",totalComparisons:c,totalCoasters:d,rankedCoasters:m,showCoastersLeft:h=!1}){const v=c&&l!==void 0?Math.round((c-l)/c*100):0,g=d&&m!==void 0?d-m:0;return s.jsxs(e$,{children:[s.jsx(b,{as:"h4",bold:!0,colour:"slateGrey",fontSize:"large",mb:"small",children:u}),s.jsx(b,{as:"p",colour:"mutedGrey",children:h?s.jsxs(s.Fragment,{children:[s.jsx(b,{bold:!0,colour:"blue",fontSize:"large",children:g})," ","coaster",g!==1?"s":""," left to rank"]}):s.jsxs(s.Fragment,{children:[s.jsx(b,{bold:!0,colour:"blue",fontSize:"large",children:l||0})," ","comparisons remaining"]})}),r&&c&&l!==void 0&&s.jsx(t$,{children:s.jsx(n$,{$progress:v})})]})}const a$=T.div`
  text-align: center;
  margin-bottom: ${hn};
  padding: ${Ht};
  background: linear-gradient(
    135deg,
    ${yt} 0%,
    ${vn} 100%
  );
  border-radius: ${Y};
  border: ${ze} solid ${Fe};
  box-shadow: ${Pd};
`,l$=T.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${At};
  margin-bottom: ${At};
  flex-wrap: wrap;
`,_g=T.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${aa};
`,Ng=T(b)`
  line-height: 1;
`,Ug=T(b)`
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,i$=T.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: ${vn};
  border-radius: ${P};
  height: ${P};
  overflow: hidden;
  position: relative;
`,r$=T.div`
  width: ${l=>l.$progress}%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${_a} 0%,
    ${ci} 100%
  );
  border-radius: ${P};
  transition: width 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;function o$({coasters:l,onComplete:r,hideProgress:u=!1}){const[c,d]=z.useState(null),[m,h]=z.useState([]),[v,g]=z.useState(new Map),[p,x]=z.useState(0);z.useEffect(()=>{if(l.length<2){r(l);return}const C=[];for(let U=0;U<l.length-1;U++)for(let N=U+1;N<l.length;N++)C.push([l[U],l[N]]);h(C),x(C.length),d(C[0]||null);const A=new Map;l.forEach(U=>{A.set(U.id,0)}),g(A)},[l,r]);const S=C=>{if(!c)return;const A=new Map(v),U=A.get(C.id)||0;A.set(C.id,U+1),g(A);const N=m.slice(1);if(h(N),N.length>0)d(N[0]);else{const L=[...l].sort((O,B)=>{const K=A.get(O.id)||0,j=A.get(B.id)||0;return K!==j?j-K:O.id.localeCompare(B.id)});r(L)}};return c?s.jsxs("div",{children:[!u&&s.jsxs(a$,{children:[s.jsx(b,{as:"h4",bold:!0,colour:"navyBlue",fontSize:"large",mb:"small",children:"Which coaster do you prefer?"}),s.jsxs(l$,{children:[s.jsxs(_g,{children:[s.jsx(Ng,{bold:!0,colour:"lightBlue",fontSize:"large",children:m.length}),s.jsx(Ug,{colour:"mutedGrey",fontSize:"small",mt:"fine",children:"Comparisons Remaining"})]}),s.jsxs(_g,{children:[s.jsx(Ng,{bold:!0,colour:"lightBlue",fontSize:"large",children:p-m.length}),s.jsx(Ug,{colour:"mutedGrey",fontSize:"small",mt:"fine",children:"Completed"})]})]}),(()=>{const C=Math.round((p-m.length)/p*100);return s.jsxs(s.Fragment,{children:[s.jsx(i$,{children:s.jsx(r$,{$progress:C})}),s.jsxs(b,{as:"p",colour:"slateGrey",fontSize:"small",mt:"tiny",children:[C,"% Complete"]})]})})()]}),s.jsx(Os,{coaster1:c[0],coaster2:c[1],onChoose1:()=>S(c[0]),onChoose2:()=>S(c[1])})]}):s.jsx("div",{children:"Completing ranking..."})}function s$(l){const{coasters:r,groupBy:u}=l,c=new Map;r.forEach(h=>{const v=u==="park"?h.park:`${h.manufacturer} ${h.model}`;c.has(v)||c.set(v,{name:v,coasters:[],isRanked:!1}),c.get(v).coasters.push(h)});const d=Array.from(c.keys()),m=Array.from(c.values()).some(h=>h.coasters.length>1);return{groups:c,groupNames:d,hasMultipleCoasterGroups:m}}function u$(l){let r=0;return l.forEach(u=>{if(!u.isRanked&&u.coasters.length>1){const c=u.coasters.length;r+=c*(c-1)/2}}),r}function dd(l,r){const u=[];return l.forEach(c=>{const d=r.get(c);d&&u.push(...d.coasters)}),u}T.div`
  text-align: center;
  margin-bottom: ${hn};
  padding: ${Ht};
  background: linear-gradient(
    135deg,
    ${yt} 0%,
    ${vn} 100%
  );
  border-radius: ${Y};
  border: ${ze} solid ${Fe};
  box-shadow: ${Pd};
`;const c$=T.div`
  margin-bottom: ${Ht};
`,d$=T.div`
  margin: ${Ht} 0;
`,f$=T.li`
  margin-bottom: ${aa};
`,m$=T(b).withConfig({shouldForwardProp:l=>!["colour","fontSize"].includes(l)})`
  font-size: ${at};
  color: ${pi};
  margin-left: ${aa};
`;function h$({coasters:l,groupBy:r,onRankingComplete:u,onHierarchicalFallback:c}){const[d,m]=z.useState(new Map),[h,v]=z.useState(null),[g,p]=z.useState(null),[x,S]=z.useState([]),[C,A]=z.useState("group-ranking"),U=z.useCallback((O,B)=>{u(dd(O,B))},[u]);z.useEffect(()=>{const O=s$({coasters:l,groupBy:r});m(O.groups),S(O.groupNames);const B=Array.from(O.groups.entries()).find(([K,j])=>j.coasters.length>1);B?v(B[0]):(A("complete"),u(dd(O.groupNames,O.groups)))},[l,r,u]);const N=(O,B)=>{const K=new Map(d),j=K.get(O);j.isRanked=!0,j.coasters=B,K.set(O,j),m(K);const V=Array.from(K.entries()).find(([W,Z])=>!Z.isRanked&&Z.coasters.length>1);V?v(V[0]):(v(null),A("complete"),u(dd(x,K)))},L=O=>{if(!g)return;const{higherGroupLowest:B}=g;p(null),O.id===B.id?setTimeout(()=>{A("complete"),U(x,d)},10):setTimeout(()=>{c(r)},10)};if(C==="group-ranking"&&h){const O=d.get(h),B=u$(d);return s.jsxs("div",{children:[s.jsx(Ky,{remainingComparisons:B}),s.jsx(o$,{coasters:O.coasters,onComplete:K=>N(h,K),hideProgress:!0})]})}return C==="hierarchical-comparison"&&g?s.jsxs("div",{children:[s.jsxs(c$,{children:[s.jsx("h4",{children:"Which coaster do you prefer?"}),s.jsx("p",{children:"Finalizing your ranking..."})]}),s.jsx(Os,{coaster1:g.higherGroupLowest,coaster2:g.lowerGroupHighest,onChoose1:()=>L(g.higherGroupLowest),onChoose2:()=>L(g.lowerGroupHighest)})]}):C==="complete"?s.jsxs("div",{children:[s.jsx("h3",{children:"Hierarchical Ranking Complete!"}),s.jsxs("p",{children:["Your coasters have been ranked using the ",r,"-based hierarchy."]}),s.jsxs(d$,{children:[s.jsx("h4",{children:"Group Order:"}),s.jsx("ol",{children:x.map((O,B)=>s.jsxs(f$,{children:[s.jsx(b,{bold:!0,children:O}),s.jsxs(m$,{colour:"mediumGrey",fontSize:"small",children:["(",d.get(O)?.coasters.length||0," coasters)"]})]},O))})]})]}):s.jsx("div",{children:"Initializing hierarchical ranking..."})}const p$=T.header`
  background-color: ${Tn};
  color: ${ke};
  overflow: hidden;
  contain: layout;
  position: relative;

  @media (min-width: ${pn}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: ${Oa};
    padding: 0 ${J};
  }
`,g$=T.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding: ${P} ${Y};

  @media (min-width: ${gt}) {
    padding: ${Y};
  }

  @media (min-width: ${pn}) {
    padding: 0;
    flex: 0 0 auto;
  }

  a {
    text-decoration: none;
    color: ${ke};
    padding: ${P};
    border-radius: ${xe};
    transition: background-color 0.2s ease;
    display: flex;
    align-items: center;
    min-height: ${Bt};

    &:hover,
    &:focus {
      background-color: ${Rt};
      text-decoration: underline;
    }

    &:focus {
      outline: ${Ne} solid ${ye};
      outline-offset: ${Ne};
    }

    p {
      margin: 0;
      font-weight: bold;
      line-height: 1.2;
      overflow-wrap: break-word;
    }
  }
`,y$=T.button`
  display: flex;
  flex-direction: column;
  gap: ${xe};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${P};
  border-radius: ${xe};
  transition: background-color 0.2s ease;
  min-height: ${Bt};
  min-width: ${Bt};
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${Rt};
  }

  &:focus {
    outline: ${Ne} solid ${ye};
    outline-offset: ${Ne};
  }

  @media (min-width: ${pn}) {
    display: none;
  }
`,fd=T.div`
  width: ${J};
  height: ${xe};
  background-color: ${ke};
  transition: all 0.3s ease;
  transform-origin: center;

  &:nth-child(1) {
    transform: ${l=>l.$isOpen?"rotate(45deg) translate(6px, 6px)":"none"};
  }

  &:nth-child(2) {
    opacity: ${l=>l.$isOpen?"0":"1"};
  }

  &:nth-child(3) {
    transform: ${l=>l.$isOpen?"rotate(-45deg) translate(6px, -6px)":"none"};
  }
`,v$=T.nav`
  overflow: hidden;

  @media (max-width: ${parseInt(pn)-1}px) {
    display: ${l=>l.$isOpen?"block":"none"};
    border-top: ${ze} solid ${Rt};
  }

  @media (min-width: ${pn}) {
    display: block;
    flex: 1;
  }
`,b$=T.ul`
  display: grid;
  grid-template-columns: 1fr;
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  li {
    box-sizing: border-box;
  }

  li a {
    display: block;
    width: 100%;
    height: 100%;
    padding: ${Y};
    text-decoration: none;
    color: ${ke};
    transition: background-color 0.2s ease;
    box-sizing: border-box;

    &:hover,
    &:focus {
      background-color: ${Rt};
      text-decoration: underline;
      border-radius: ${xe};
    }
  }

  @media (max-width: ${parseInt(pn)-1}px) {
    gap: 0;

    li:not(:last-child) {
      border-bottom: ${ze} solid ${Rt};
    }
  }

  @media (min-width: ${ut}) and (max-width: ${parseInt(pn)-1}px) {
    grid-template-columns: repeat(2, 1fr);

    li {
      border-bottom: ${ze} solid ${Rt};
    }

    li:nth-child(odd) {
      border-right: ${ze} solid ${Rt};
    }
  }

  @media (min-width: ${pn}) {
    display: flex;
    justify-content: flex-end;
    gap: ${J};
    align-items: center;
    height: 100%;

    li {
      height: auto;
    }

    li a {
      text-align: center;
      padding: ${Y} ${J};
      line-height: 1.2;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      height: auto;
      width: auto;

      &:hover,
      &:focus {
        background-color: ${Rt};
        text-decoration: underline;
        border-radius: ${xe};
      }
    }
  }
`;function x$(){const[l,r]=z.useState(!1),u=()=>{r(!l)},c=()=>{r(!1)};return s.jsxs(p$,{children:[s.jsxs(g$,{children:[s.jsx(jt,{href:"/","aria-label":"Coaster Ranker Home",children:s.jsx("p",{children:"Coaster Ranker"})}),s.jsxs(y$,{onClick:u,"aria-label":"Toggle navigation menu","aria-expanded":l,"aria-controls":"main-navigation",children:[s.jsx(fd,{$isOpen:l}),s.jsx(fd,{$isOpen:l}),s.jsx(fd,{$isOpen:l})]})]}),s.jsx(v$,{$isOpen:l,children:s.jsx("nav",{id:"main-navigation","aria-label":"Main navigation",children:s.jsxs(b$,{children:[s.jsx("li",{children:s.jsx(jt,{href:"/",onClick:c,children:"Home"})}),s.jsx("li",{children:s.jsx(jt,{href:"/upload",onClick:c,children:"Upload"})}),s.jsx("li",{children:s.jsx(jt,{href:"/view-coasters",onClick:c,children:"View Coasters"})}),s.jsx("li",{children:s.jsx(jt,{href:"/rank",onClick:c,children:"Rank"})}),s.jsx("li",{children:s.jsx(jt,{href:"/download",onClick:c,children:"Download"})})]})})})]})}const S$=T(b)`
  background-color: ${({$bgColour:l})=>l};
  border: ${ze} solid ${({$borderColour:l})=>l};
  border-radius: ${xe};
  padding: ${Y};
  display: flex;
  align-items: center;
  gap: ${P};
`,$$=l=>{switch(l){case"error":return{backgroundColor:ps,borderColor:gs};case"success":return{backgroundColor:Vd,borderColor:Zd};case"info":return{backgroundColor:As,borderColor:Na};default:return{backgroundColor:ps,borderColor:gs}}};function dl({variant:l,children:r,bgColour:u,borderColour:c,role:d,"aria-live":m,className:h}){const v=$$(l),g=u?Ed[u]:v.backgroundColor,p=c?Ed[c]:v.borderColor;return s.jsx(S$,{as:"p",mt:"small",$bgColour:g,$borderColour:p,role:d,"aria-live":m,className:h,children:r})}const C$=T.section`
  margin: 0 auto;
  width: 100%;
  padding: 0 ${P};
  background: ${ke};
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-x: hidden;

  @media (min-width: ${Ze}) {
    padding: 0 ${Y};
  }

  @media (min-width: ${Dg}) {
    max-width: 1140px;
  }

  @media (max-width: ${parseInt(Dg)-1}px) {
    max-width: 95%;
  }

  @media (max-width: 320px) {
    padding: 0 ${P};
    max-width: 100%;
  }
`;function Et({children:l}){return s.jsx(C$,{id:"main-content",children:l})}const Gg=T.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${J};
`,Lg=T.div`
  background: ${ke};
  border-radius: ${P};
  box-shadow: ${mS};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`,Hg=T.div`
  padding: ${se} ${se} ${J};
  border-bottom: ${ze} solid ${Fe};
`,Bg=T.div`
  padding: ${J} ${se};
`,Wo=T(b).withConfig({shouldForwardProp:l=>!["colour","fontSize","mb"].includes(l)})`
  line-height: 1.5;
`,Yg=T.div`
  padding: ${J} ${se} ${se};
  display: flex;
  flex-direction: column;
  gap: ${Y};
`,md=T(Ie)`
  width: 100%;
`;function Jy({coasterCount:l,onAnswer:r,onCancel:u,existingCoasterCount:c=0,filename:d,hasExistingRankedData:m=!1}){return m?s.jsx(Gg,{children:s.jsxs(Lg,{children:[s.jsxs(Hg,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"charcoal",fontSize:"large",mb:"tiny",children:"Adding to existing ranking"}),s.jsxs(b,{as:"p",colour:"mediumGrey",fontSize:"small",children:["You're uploading ",l," coasters",d&&` from "${d}"`]})]}),s.jsxs(Bg,{children:[s.jsxs(b,{as:"p",bold:!0,colour:"charcoal",mb:"medium",children:["You already have ",c," ranked coasters in your collection."]}),s.jsxs(Wo,{children:[s.jsx(b,{bold:!0,children:"New coasters will be ranked:"})," Your new uploads will be compared against your existing rankings to find their proper position."]}),s.jsx(Wo,{children:"This ensures your complete collection maintains accurate ranking order."})]}),s.jsxs(Yg,{children:[s.jsx(md,{onClick:()=>r(!1),variant:"success","aria-label":"Continue with upload",children:"Continue Upload"}),s.jsx(Ie,{variant:"disabled",onClick:u,"aria-label":"Cancel upload",children:"Cancel upload"})]})]})}):s.jsx(Gg,{children:s.jsxs(Lg,{children:[s.jsxs(Hg,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"charcoal",fontSize:"large",mb:"tiny",children:"Ranking order question"}),s.jsxs(b,{as:"p",colour:"mediumGrey",fontSize:"small",children:["You're uploading ",l," coasters",d&&` from "${d}"`]})]}),s.jsxs(Bg,{children:[s.jsx(b,{as:"p",bold:!0,colour:"charcoal",mb:"medium",children:"Are these coasters already ranked in your preferred order?"}),s.jsxs(Wo,{as:"p",colour:"mediumGrey",fontSize:"small",mb:"small",children:[s.jsx(b,{as:"span",bold:!0,colour:"charcoal",children:"If YES:"})," ","The order in your file will be preserved, and new coasters will be ranked relative to this order."]}),s.jsxs(Wo,{children:[s.jsx(b,{bold:!0,children:"If NO:"})," All coasters will be treated equally and you'll rank them through comparisons."]})]}),s.jsxs(Yg,{children:[s.jsx(md,{onClick:()=>r(!0),variant:"success","aria-label":"Yes, these coasters are already ranked in order",children:"Yes, already ranked"}),s.jsx(md,{onClick:()=>r(!1),variant:"default","aria-label":"No, these coasters are not ranked",children:"No, not ranked"}),s.jsx(Ie,{variant:"disabled",onClick:u,"aria-label":"Cancel upload",children:"Cancel upload"})]})]})})}const Fy=z.createContext(void 0),Po="coaster-ranker-data";function j$({children:l}){const[r,u]=z.useState(null),[c,d]=z.useState(!1);z.useEffect(()=>{try{const h=localStorage.getItem(Po);if(h){const v=JSON.parse(h);if(v.uploadedAt&&(v.uploadedAt=new Date(v.uploadedAt)),v.rankingMetadata){const g=v.rankingMetadata;g.completedComparisons&&Array.isArray(g.completedComparisons)?g.completedComparisons=new Set(g.completedComparisons):g.completedComparisons=new Set}u(v)}}catch(h){console.error("Error loading data from localStorage:",h),localStorage.removeItem(Po)}},[]);const m=h=>{u(h);try{if(h){const v=JSON.parse(JSON.stringify(h,(g,p)=>g==="completedComparisons"&&p instanceof Set?Array.from(p):p));localStorage.setItem(Po,JSON.stringify(v))}else localStorage.removeItem(Po)}catch(v){console.error("Error saving data to localStorage:",v)}};return s.jsx(Fy.Provider,{value:{uploadedData:r,setUploadedData:m,isLoading:c,setIsLoading:d},children:l})}function Ua(){const l=z.useContext(Fy);if(l===void 0)throw new Error("useData must be used within a DataProvider");return l}const w$=T.div`
  text-align: left;

  /* Mobile-first: smaller margin */
  margin: ${Y} 0;

  /* Mobile medium and up */
  @media (min-width: ${ut}) {
    margin: ${J} 0;
  }

  ol {
    /* Mobile-first: smaller padding */
    padding-left: ${Y};

    /* Tablet and up */
    @media (min-width: ${ue}) {
      padding-left: ${J};
    }
  }

  li {
    margin-bottom: ${P};
    line-height: 1.4;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`,k$=T.div`
  text-align: center;
  background: ${Er};
  border-radius: ${P};
  border-left: ${xe} solid ${Qd};

  /* Mobile-first: small padding for mobile */
  padding: ${At};

  /* Mobile medium and up */
  @media (min-width: ${ut}) {
    padding: ${Ht};
  }

  /* Tablet and up */
  @media (min-width: ${ue}) {
    padding: ${hn};
  }

  /* Desktop and up */
  @media (min-width: ${ml}) {
    padding: ${hn} ${Xy};
  }
`,qg=T.div`
  display: flex;
  justify-content: center;

  /* Mobile-first: stack vertically with small gap and margin */
  flex-direction: column;
  align-items: center;
  gap: ${Y};
  margin: ${Y} 0;
  width: 100%;

  > * {
    width: 100%;
    max-width: 300px;
  }

  /* Tablet and up: horizontal layout with more margin */
  @media (min-width: ${ue}) {
    flex-direction: row;
    margin: ${J} 0;

    > * {
      width: auto;
      max-width: none;
    }
  }
`,R$=T(b).withConfig({shouldForwardProp:l=>!["center","colour","fontSize","mb"].includes(l)})`
  background: ${yn};
  padding: ${Y};
  border-radius: 4px;
  border: 1px solid ${en};
`,E$=T.div`
  text-align: left;

  /* Mobile-first: smaller margin */
  margin: ${Y} 0;

  /* Mobile medium and up */
  @media (min-width: ${ut}) {
    margin: ${J} 0;
  }

  ol {
    padding-left: 0;
    list-style: none;
  }
`,z$=T.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${Y};
  border: 1px solid ${en};
  border-radius: 6px;
  background: ${ke};
  box-shadow: 0 1px 3px ${bn};
  transition: border-color 0.2s ease;

  /* Mobile-first: smaller padding */
  padding: ${Y};

  /* Mobile medium and up */
  @media (min-width: ${ut}) {
    padding: ${Y} ${J};
  }

  /* Tablet and up: more generous padding */
  @media (min-width: ${ue}) {
    padding: ${J};
  }

  &:hover {
    border-color: ${ye};
  }

  &:focus-within {
    border-color: ${ye};
    box-shadow: 0 0 0 2px ${hl};
  }
`,A$=T(b).withConfig({shouldForwardProp:l=>!["bold","colour"].includes(l)})`
  font-size: ${wt};

  /* Mobile-first: smaller width and margin */
  min-width: 30px;
  margin-right: ${P};

  /* Mobile medium and up */
  @media (min-width: ${ut}) {
    min-width: 35px;
    margin-right: ${Y};
  }

  /* Tablet and up */
  @media (min-width: ${ue}) {
    min-width: 40px;
  }
`,T$=T.div`
  flex: 1;
  line-height: 1.5;
  min-width: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;

  /* Mobile-first: smaller margin */
  margin-right: ${P};

  /* Mobile medium and up */
  @media (min-width: ${ut}) {
    margin-right: ${Y};
  }
`,D$=T.div`
  display: flex;
  align-items: center;

  /* Mobile-first: horizontal layout for easier touch */
  flex-direction: row;
  gap: ${P};

  /* Tablet and up: vertical layout */
  @media (min-width: ${ue}) {
    flex-direction: column;
  }
`,Qg=T.button`
  background: ${Rt};
  color: ${ke};
  border: 2px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;

  /* Mobile-first: larger touch targets, smaller font */
  width: ${Bt};
  height: ${Bt};
  font-size: 16px;

  /* Tablet and up: slightly smaller, larger font */
  @media (min-width: ${ue}) {
    font-size: 18px;
  }

  &:hover {
    background: ${ye};
    border-color: ${tn};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${di};
  }

  &:focus {
    outline: none;
    border-color: ${ye};
    box-shadow: 0 0 0 3px ${hl};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px ${di};
  }
`,M$=T.div`
  text-align: center;
  margin-top: ${Y};

  /* Mobile medium and up */
  @media (min-width: ${ut}) {
    margin-top: ${J};
  }

  /* Override Link component styling for this specific use case */
  a {
    color: ${tn} !important;
    text-decoration: underline !important;

    &:hover {
      color: ${ci} !important;
      text-decoration: underline !important;
    }

    &:visited {
      color: ${tn} !important;
    }

    &:focus {
      color: ${ci} !important;
      text-decoration: underline !important;
    }
  }
`;function O$({rankedCoasters:l,onRankAgain:r}){const{uploadedData:u,setUploadedData:c}=Ua(),[d,m]=z.useState(!1),[h,v]=z.useState(l),p=(()=>{if(!u?.rankingMetadata?.isRanked||!u?.rankingMetadata?.rankedCoasters)return l;const L=u.coasters.filter(O=>O.rankPosition!==void 0).sort((O,B)=>(O.rankPosition||0)-(B.rankPosition||0));return L.length>0?L:l})();z.useEffect(()=>{v([...l])},[l]),z.useEffect(()=>{if(!d&&u?.rankingMetadata?.isRanked&&u.coasters){const L=u.coasters.filter(O=>O.rankPosition!==void 0).sort((O,B)=>(O.rankPosition||0)-(B.rankPosition||0));L.length>0&&v([...L])}},[u?.rankingMetadata?.isRanked,u?.coasters,d]);const x=()=>{m(!0),v([...p])},S=()=>{m(!1),v([...p])},C=()=>{if(u){const L=[...u.coasters];h.forEach((K,j)=>{const V=L.findIndex(W=>W.id===K.id);V!==-1&&(L[V]={...K,rankPosition:j+1})});const O=u.rankingMetadata?{...u.rankingMetadata,rankedCoasters:h.map(K=>K.id)}:void 0,B={...u,coasters:L,rankingMetadata:O};c(B)}m(!1)},A=(L,O)=>{const B=[...h],[K]=B.splice(L,1);B.splice(O,0,K),v(B)},U=(L,O,B)=>{L.key==="ArrowUp"&&B>0?(L.preventDefault(),A(B,B-1)):L.key==="ArrowDown"&&B<h.length-1&&(L.preventDefault(),A(B,B+1))},N=d?h:p;return s.jsxs(k$,{children:[s.jsx(b,{as:"h2",colour:"successGreen",mb:"small",children:"Ranking Complete!"}),s.jsxs(b,{as:"p",colour:"successGreen",mb:"small",children:["Your coasters have been ranked based on your preferences!"," ",N.length>10?"Here's your top 10:":"Here's your final ranking:"]}),d?s.jsxs(E$,{children:[s.jsx(R$,{as:"p",center:!0,colour:"mediumGrey",fontSize:"small",mb:"medium",children:"Use the arrow buttons or arrow keys to reorder your coasters. Press Tab to navigate between items."}),s.jsx("ol",{children:N.slice(0,10).map((L,O)=>s.jsxs(z$,{tabIndex:0,onKeyDown:B=>U(B,L,O),role:"listitem","aria-label":`${L.name} at ${L.park}, position ${O+1} of ${N.length}. Use arrow keys or buttons to reorder.`,children:[s.jsxs(A$,{bold:!0,colour:"darkGrey",children:[O+1,"."]}),s.jsxs(T$,{children:[s.jsx(b,{bold:!0,children:L.name})," at ",L.park]}),s.jsxs(D$,{children:[s.jsx(Qg,{onClick:()=>{O>0&&A(O,O-1)},"aria-label":`Move ${L.name} up one position`,title:`Move ${L.name} up one position`,children:"↑"}),s.jsx(Qg,{onClick:()=>{O<N.length-1&&A(O,O+1)},"aria-label":`Move ${L.name} down one position`,title:`Move ${L.name} down one position`,children:"↓"})]})]},L.id))}),s.jsxs(qg,{children:[s.jsx(Ie,{variant:"success",onClick:C,children:"Save Changes"}),s.jsx(Ie,{variant:"disabled",onClick:S,children:"Cancel"})]})]}):s.jsxs(w$,{children:[s.jsx("ol",{children:N.slice(0,10).map((L,O)=>s.jsxs("li",{children:[s.jsx(b,{bold:!0,children:L.name})," at ",L.park]},L.id))}),N.length>10&&s.jsx(M$,{children:s.jsxs(jt,{href:"/view-coasters",children:["View all ",N.length," ranked coasters"]})})]}),s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"small",mb:"small",children:"This ranking order will be used when you download your coaster collection."}),!d&&s.jsxs(qg,{children:[s.jsx(Ie,{onClick:x,children:"Adjust Rankings"}),s.jsx(Ie,{as:"a",href:"/download",children:"Download rankings"}),s.jsx(Ie,{variant:"destructive",onClick:r,children:"Rank again"})]})]})}const _$=T.div`
  display: flex;
  gap: ${Y};
  justify-content: center;
  margin: ${Y} 0;
`,N$=T(b).withConfig({shouldForwardProp:l=>!["colour","fontSize","mt"].includes(l)})`
  display: block;
  font-weight: normal;
`;function Xg({onReset:l,canUndo:r=!1,onUndo:u}){const c=()=>{r&&u&&u()};return s.jsxs(_$,{children:[u&&s.jsxs(Ie,{onClick:c,variant:r?"warning":"disabled","aria-label":r?"Undo last choice":"No choices to undo - make some comparisons first",children:[r?"Undo last choice":"No choices to undo",!r&&s.jsx(N$,{colour:"white",fontSize:"small",mt:"fine",children:"Make some comparisons first"})]}),s.jsx(Ie,{onClick:l,variant:"destructive","aria-label":"Reset all rankings",children:"Reset all rankings"})]})}const U$=T.div`
  border: 0;
  clip: rect(0 0 0 0);
  height: 0.0625rem;
  margin: -0.0625rem;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 0.0625rem;
  white-space: nowrap;
`;function $r({children:l,as:r="span",id:u}){return s.jsx(U$,{as:r,id:u,children:l})}const G$=T.a`
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  background-color: ${ke};
  color: ${Tn};
  padding: ${P} ${Y};
  text-decoration: none;
  border-radius: ${xe};
  z-index: 9999;
  font-weight: bold;

  &:focus {
    position: absolute;
    left: ${xe};
    top: ${xe};
    width: auto;
    height: auto;
    overflow: visible;
  }
`;function L$(){const l=r=>{r.preventDefault();const u=document.getElementById("main-content");u&&(u.focus(),u.scrollIntoView())};return s.jsx(G$,{href:"#main-content",onClick:l,children:"Skip to main content"})}const H$=T(b).withConfig({shouldForwardProp:l=>!["center","colour"].includes(l)})`
  font-size: ${Ds};
  padding: ${Y} 0;
  line-height: 1.2;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (min-width: ${Ze}) {
    font-size: ${Wd};
  }

  @media (min-width: ${ue}) {
    font-size: ${Fd};
  }
`;function zt({children:l}){return s.jsx(H$,{as:"h1",center:!0,colour:"darkGrey",children:l})}const B$=T.div`
  margin-bottom: ${se};
  padding: 0 ${P};

  @media (min-width: ${Ze}) {
    padding: 0 ${J};
  }
`,ei=T.section`
  margin-bottom: ${se};
`,Aa=T.ul`
  margin: ${Y} 0 ${J};
  padding-left: ${J};

  li {
    margin-bottom: ${Y};
  }
`;T.div`
  background-color: ${yt};
  border: ${Ne} solid ${Fe};
  border-radius: ${P};
  margin: ${J} 0;
  box-sizing: border-box;
  padding: ${Y};
  margin: ${Y} 0;

  @media (min-width: ${Ze}) {
    padding: ${J} ${se};
    margin: ${J} 0;
  }
`;const mr=T(b).withConfig({shouldForwardProp:l=>!["colour"].includes(l)})`
  background-color: ${Rt};
  color: ${ke};
  border: ${ze} solid ${Tn};
  border-radius: ${xe};
  padding: ${P} ${Y};
  font-family: 'Courier New', monospace;
  font-size: ${wt};
  font-weight: 500;
  display: inline-block;
  margin-left: ${xe};
  margin-right: ${xe};
`,Y$=T(b).withConfig({shouldForwardProp:l=>!["italic","mt"].includes(l)})`
  padding-top: ${J};
  border-top: 1px solid ${en};
`;function q$(){return s.jsx(Et,{children:s.jsxs(B$,{children:[s.jsx(zt,{children:"Accessibility Statement"}),s.jsx(b,{as:"p",mb:"medium",children:"Coaster Ranker is committed to being accessible to all users, including those with disabilities. We've built this application to comply with WCAG 2.2 Level AA standards and work seamlessly with screen readers, keyboard navigation, and other assistive technologies."}),s.jsxs(ei,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Accessibility standards"}),s.jsxs(Aa,{children:[s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"WCAG 2.2 Level AA Compliance:"})," We meet the latest international accessibility guidelines"]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Responsive Design:"})," Fully accessible across all devices, from 320px mobile screens to desktop"]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Component Architecture:"})," Reusable, accessible components ensure consistency throughout the application"]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Mobile-First Approach:"})," Touch targets and interactions optimized for all screen sizes"]})]})]}),s.jsxs(ei,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Using Coaster Ranker"}),s.jsx(b,{as:"h3",bold:!0,colour:"darkGrey",mb:"small",mt:"medium",children:"Keyboard navigation"}),s.jsx(b,{as:"p",mb:"small",children:"You can navigate the entire application using only your keyboard:"}),s.jsxs(Aa,{children:[s.jsxs(b,{as:"li",children:[s.jsx(mr,{as:"code",colour:"white",children:"Tab"})," ","- Move to the next button, link, or form field"]}),s.jsxs(b,{as:"li",children:[s.jsx(mr,{as:"code",colour:"white",children:"Shift + Tab"})," ","- Move to the previous element"]}),s.jsxs(b,{as:"li",children:[s.jsx(mr,{as:"code",colour:"white",children:"Enter"})," ","- Activate buttons and links"]}),s.jsxs(b,{as:"li",children:[s.jsx(mr,{as:"code",colour:"white",children:"Space"})," ","- Activate buttons and checkboxes"]}),s.jsxs(b,{as:"li",children:[s.jsx(mr,{as:"code",colour:"white",children:"Arrow Keys"})," ","- Navigate dropdown menus"]})]}),s.jsx(b,{as:"h3",bold:!0,colour:"darkGrey",mb:"small",mt:"medium",children:"Screen reader support"}),s.jsxs(Aa,{children:[s.jsx(b,{as:"li",children:"All images have descriptive alternative text"}),s.jsx(b,{as:"li",children:"Form fields are clearly labeled"}),s.jsx(b,{as:"li",children:"Error messages are announced when they appear"}),s.jsx(b,{as:"li",children:"Page structure uses proper headings for easy navigation"}),s.jsx(b,{as:"li",children:"Skip link available to jump to main content"})]}),s.jsx(b,{as:"h3",bold:!0,colour:"darkGrey",mb:"small",mt:"medium",children:"Visual features"}),s.jsxs(Aa,{children:[s.jsx(b,{as:"li",children:"WCAG 2.2 AA compliant color contrast ratios throughout"}),s.jsx(b,{as:"li",children:"Responsive typography that maintains proper heading hierarchy at all screen sizes"}),s.jsx(b,{as:"li",children:"Text remains readable when zoomed up to 200%"}),s.jsx(b,{as:"li",children:"Clear focus indicators show where you are on the page"}),s.jsx(b,{as:"li",children:"No information is conveyed by color alone"}),s.jsx(b,{as:"li",children:"Optimized touch targets (44px minimum) for mobile accessibility"})]}),s.jsx(b,{as:"h3",bold:!0,colour:"darkGrey",mb:"small",mt:"medium",children:"Collection management"}),s.jsxs(Aa,{children:[s.jsx(b,{as:"li",children:"Real-time status displays for uploaded coaster collections"}),s.jsx(b,{as:"li",children:"Consistent interface components across all upload methods"}),s.jsx(b,{as:"li",children:"Clear progress indicators and success/error messages"}),s.jsx(b,{as:"li",children:"Duplicate detection with accessible resolution interface"})]})]}),s.jsxs(ei,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Supported assistive technologies"}),s.jsx(b,{as:"p",mb:"small",children:"Coaster Ranker works with:"}),s.jsxs(Aa,{children:[s.jsx(b,{as:"li",children:"Screen readers (JAWS, NVDA, VoiceOver, TalkBack)"}),s.jsx(b,{as:"li",children:"Voice control software"}),s.jsx(b,{as:"li",children:"Screen magnification tools"}),s.jsx(b,{as:"li",children:"Switch navigation devices"}),s.jsx(b,{as:"li",children:"Eye tracking systems"})]})]}),s.jsxs(ei,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Browser compatibility"}),s.jsx(b,{as:"p",mb:"small",children:"This application works best with recent versions of:"}),s.jsxs(Aa,{children:[s.jsx(b,{as:"li",children:"Chrome (recommended for full feature support)"}),s.jsx(b,{as:"li",children:"Firefox"}),s.jsx(b,{as:"li",children:"Safari"}),s.jsx(b,{as:"li",children:"Edge"})]}),s.jsxs(b,{as:"p",mt:"small",children:[s.jsx(b,{bold:!0,children:"Note:"})," The application is optimized for modern browsers and requires an internet connection to load."]})]}),s.jsxs(ei,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Need help?"}),s.jsx(b,{as:"p",mb:"small",children:"If you encounter any accessibility issues or have suggestions for improvement, please let us know. We're committed to making this application work for everyone."})]}),s.jsxs(ei,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Learn more About web accessibility"}),s.jsxs(Aa,{children:[s.jsx(b,{as:"li",children:s.jsx(jt,{dark:!0,href:"https://www.w3.org/WAI/WCAG22/quickref/",external:!0,children:"WCAG 2.2 Guidelines (Quick Reference)"})}),s.jsx(b,{as:"li",children:s.jsx(jt,{dark:!0,href:"https://www.w3.org/WAI/",external:!0,children:"Web Accessibility Initiative (WAI)"})}),s.jsx(b,{as:"li",children:s.jsx(jt,{dark:!0,href:"https://webaim.org/",external:!0,children:"WebAIM - Web Accessibility In Mind"})})]})]}),s.jsx(Y$,{as:"p",italic:!0,mt:"large",children:"Last updated: November 6, 2025"})]})})}function Q$(l){return l.map(r=>{const u={id:r.id,name:r.name,park:r.park,country:r.country,manufacturer:r.manufacturer,model:r.model,material:r.material,thrillLevel:r.thrillLevel};return r.isCurrentlyRanking!==void 0&&(u.isCurrentlyRanking=r.isCurrentlyRanking),r.isNewCoaster!==void 0&&(u.isNewCoaster=r.isNewCoaster),r.isPreRanked!==void 0&&(u.isPreRanked=r.isPreRanked),r.originalRankPosition!==void 0&&(u.originalRankPosition=r.originalRankPosition),r.rankPosition!==void 0&&(u.rankPosition=r.rankPosition),u})}function X$(l){return l.map(r=>({id:r.id,name:r.name,park:r.park,country:r.country,manufacturer:r.manufacturer,model:r.model,material:r.material,thrillLevel:r.thrillLevel}))}function Wy(l,r){return l.map(u=>{const c={id:u.id,name:u.name,park:u.park,country:u.country,manufacturer:u.manufacturer,model:u.model,material:u.material,thrillLevel:u.thrillLevel};if(u.rankPosition!==void 0&&u.rankPosition>0)c.rank=u.rankPosition;else if(r?.isRanked&&r?.rankedCoasters){const d=r.rankedCoasters.indexOf(u.id);d>=0&&(c.rank=d+1)}return c})}function V$(l){if(!l)return!1;const r=l.coasters.some(c=>c.rankPosition!==void 0&&c.rankPosition>0),u=l.rankingMetadata?.isRanked===!0;return r||u}function Z$(l){const{coasters:r,headers:u,includeRanking:c=!1,rankingMetadata:d}=l;if(r.length===0)return{content:"",isEmpty:!0,rowCount:0};let m;c?m=Wy(r,d):m=X$(r);const h=u||(c?["id","name","park","country","manufacturer","model","type","rank"]:["id","name","park","country","manufacturer","model","type"]),v=h.join(","),g=m.map(x=>h.map(S=>{const C=x[S];if(C==null)return"";const A=String(C);return A.includes(",")||A.includes('"')||A.includes(`
`)?`"${A.replace(/"/g,'""')}"`:A}).join(","));return{content:[v,...g].join(`
`),isEmpty:!1,rowCount:r.length}}function K$(l){const{coasters:r,includeMetadata:u=!0,includeRanking:c=!1,rankingMetadata:d,customMetadata:m={}}=l;if(r.length===0)return{content:'{"coasters": [], "totalCount": 0}',isEmpty:!0,dataSize:0};let h;c?h=Wy(r,d):h=Q$(r);let v;return u?v={coasters:h,exportedAt:new Date().toISOString(),totalCount:h.length,source:"Coaster Ranker",...m}:v=h,{content:JSON.stringify(v,null,2),isEmpty:!1,dataSize:r.length}}function J$(l){const{content:r,filename:u,contentType:c}=l;try{if(!r||!u)return{success:!1,error:"Content and filename are required"};const d=new Blob([r],{type:c}),m=URL.createObjectURL(d),h=document.createElement("a");return h.href=m,h.download=u,document.body.appendChild(h),h.click(),document.body.removeChild(h),URL.revokeObjectURL(m),{success:!0}}catch(d){return{success:!1,error:d instanceof Error?d.message:"Unknown download error"}}}const F$=T.div`
  padding: ${Y};
  max-width: 100%;

  @media (min-width: ${ut}) {
    padding: ${Y} ${J};
  }

  @media (min-width: ${Ze}) {
    padding: ${J};
  }

  @media (min-width: ${ue}) {
    padding: ${J} ${se};
    max-width: 800px;
    margin: 0 auto;
  }

  @media (min-width: ${ml}) {
    padding: ${se};
    max-width: 900px;
  }
`,W$=T.div`
  margin-bottom: ${J};

  @media (min-width: ${ut}) {
    margin-bottom: ${se};
  }

  @media (min-width: ${ue}) {
    margin-bottom: ${Oa};
  }
`,Vg=T.button`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${ke};
  border: ${Ne} solid ${Fe};
  border-radius: ${Y};
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: ${Bt};
  box-sizing: border-box;
  box-shadow: 0 1px 3px ${bn};
  position: relative;
  overflow: hidden;
  padding: ${Y};
  margin-bottom: ${Y};
  background: linear-gradient(
    135deg,
    ${ke} 0%,
    ${yn} 100%
  );
  border-left: ${xe} solid ${ye};
  animation: slideInUp 0.3s ease-out;

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(${Y});
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (min-width: ${ut}) {
    padding: ${Y} ${J};
    margin-bottom: ${J};
    min-height: calc(${Bt} + ${Y});
  }

  @media (min-width: ${Ze}) {
    padding: ${J};
    border-radius: ${J};
    margin-bottom: ${J};
  }

  @media (min-width: ${ue}) {
    padding: ${se};
    min-height: auto;
    border-width: ${xe};
  }

  @media (min-width: ${ml}) {
    padding: ${se} ${Oa};
  }

  &:hover {
    background: linear-gradient(
      135deg,
      ${yn} 0%,
      ${yt} 100%
    );
    border-color: ${ye};
    border-left-color: ${tn};
    transform: translateY(-${Ne});
    box-shadow: 0 4px 12px ${di};
  }

  &:focus {
    outline: none;
    border-color: ${ye};
    border-left-color: ${tn};
    box-shadow: 0 0 0 ${xe} rgba(0, 123, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px ${di};
  }
`,Zg=T.div`
  text-align: left;
  flex: 1;
  min-width: 0;

  h4 {
    margin-bottom: ${P};
    text-shadow: 0 1px 2px ${bn};

    @media (min-width: ${ut}) {
      margin-bottom: ${Y};
    }
  }
`,Kg=T(b).withConfig({shouldForwardProp:l=>!["colour","fontSize"].includes(l)})`
  margin: 0;
  line-height: 1.5;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: ${gt}) {
    font-size: 0.875rem;
  }

  @media (min-width: ${ue}) {
    line-height: 1.6;
  }
`,P$=T.div`
  text-align: center;

  @media (min-width: ${ut}) {
    margin-bottom: ${Y};
  }

  p {
    margin: 0;
    line-height: 1.6;

    @media (max-width: ${gt}) {
      font-size: 0.875rem;
    }
  }
`,I$=T.div`
  text-align: center;
  background: linear-gradient(
    135deg,
    ${yn} 0%,
    ${yt} 100%
  );
  border: ${Ne} solid ${Fe};
  border-radius: ${Y};
  border-left: ${xe} solid ${pi};
  box-shadow: 0 2px 8px ${bn};
  padding: ${J} ${Y};

  @media (min-width: ${ut}) {
    padding: ${se} ${J};
  }

  @media (min-width: ${Ze}) {
    padding: ${se};
  }

  @media (min-width: ${ue}) {
    padding: ${Oa} ${se};
    border-radius: ${J};
    max-width: 600px;
    margin: 0 auto;
  }

  @media (min-width: ${ml}) {
    padding: ${Oa};
  }

  p {
    line-height: 1.6;
    margin: 0 auto ${se} auto;
    max-width: 300px;

    @media (min-width: ${ut}) {
      max-width: 400px;
    }

    @media (min-width: ${ue}) {
      max-width: 500px;
      font-size: 1.1rem;
      line-height: 1.7;
    }
  }

  /* Ensure buttons are centered on small screens */
  a[role='button'],
  button {
    display: inline-block;
    margin: 0 auto;
  }

  /* For very small screens, ensure proper centering */
  @media (max-width: ${ut}) {
    a[role='button'],
    button {
      display: block;
      width: fit-content;
      margin: 0 auto;
    }
  }
`,eC=T.div`
  margin-bottom: ${J};

  @media (min-width: ${ut}) {
    margin-bottom: ${se};
  }

  h3 {
    position: relative;
    padding-bottom: ${Y};

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: ${se};
      height: ${Ne};
      background: ${ye};
      border-radius: ${ze};
    }
  }
`,tC=T.div`
  display: flex;
  flex-direction: column;
  gap: ${Y};

  @media (min-width: ${ut}) {
    gap: ${J};
  }

  @media (min-width: ${ue}) {
    gap: ${se};
  }
`;T.div`
  border: 1px solid ${vn};
  background: ${yt};
  border-radius: ${P};
  box-sizing: border-box;
  padding: ${P};
  margin-bottom: ${Y};

  @media (min-width: ${gt}) {
    padding: ${Y};
    margin-bottom: ${J};
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    min-height: ${Bt};
    gap: ${P};

    @media (min-width: ${gt}) {
      gap: ${Y};
    }

    input[type='checkbox'] {
      width: 16px;
      height: 16px;
      accent-color: ${ye};
      min-width: 16px;
    }
  }
`;function nC(){const{uploadedData:l}=Ua(),[r,u]=z.useState(null),c=l?.coasters||[],d=V$(l),m=(v,g)=>{const p=new Date().toISOString().split("T")[0];return`${v}-${p}.${g}`},h=v=>{try{let g,p;if(v==="csv"?(g=Z$({coasters:c,includeRanking:d,rankingMetadata:l?.rankingMetadata}),p="text/csv"):(g=K$({coasters:c,includeRanking:d,rankingMetadata:l?.rankingMetadata}),p="application/json"),g.content&&!g.isEmpty){const x=m("coaster-collection",v),S=J$({content:g.content,filename:x,contentType:p});S.success?u(`${v.toUpperCase()} downloaded successfully!`):u(S.error||`Error downloading ${v.toUpperCase()} file`),setTimeout(()=>u(null),3e3)}}catch{u(`Error generating ${v.toUpperCase()} file`),setTimeout(()=>u(null),3e3)}};return c.length===0?s.jsxs(Et,{children:[s.jsx(zt,{children:"Download Your Collection"}),s.jsx("section",{children:s.jsxs(I$,{children:[s.jsx(b,{as:"h2",center:!0,colour:"darkGrey",mb:"small",children:"No Coasters Yet"}),s.jsx(b,{as:"p",center:!0,colour:"mediumGrey",mb:"large",children:"Upload some coasters to download your collection in CSV or JSON format."}),s.jsx(Ie,{as:"a",href:"/upload",children:"Upload Coasters"})]})})]}):s.jsxs(Et,{children:[s.jsx(zt,{children:"Download Your Collection"}),s.jsx("section",{children:s.jsxs(F$,{children:[s.jsx(zr,{coasterCount:c.length}),s.jsxs(W$,{children:[s.jsx(eC,{children:s.jsx(b,{as:"h3",colour:"darkGrey",mb:"tiny",children:"Choose your format:"})}),s.jsxs(tC,{children:[s.jsx(Vg,{onClick:()=>h("csv"),"aria-describedby":"csv-description",children:s.jsxs(Zg,{children:[s.jsx(b,{as:"h4",bold:!0,colour:"darkGrey",fontSize:"large",mb:"fine",children:"Download as CSV"}),s.jsxs(Kg,{as:"p",colour:"mediumGrey",fontSize:"small",id:"csv-description",children:["For Excel, Google Sheets, and other spreadsheet apps",d&&" (includes rank column)"]})]})}),s.jsx(Vg,{onClick:()=>h("json"),"aria-describedby":"json-description",children:s.jsxs(Zg,{children:[s.jsx(b,{as:"h4",bold:!0,colour:"darkGrey",fontSize:"large",mb:"fine",children:"Download as JSON"}),s.jsxs(Kg,{as:"p",colour:"mediumGrey",fontSize:"small",id:"json-description",children:["Developer-friendly format for importing into other apps",d&&" (includes rank field)"]})]})})]})]}),r&&s.jsx(dl,{variant:r.includes("successfully")?"success":"error",role:"status","aria-live":"polite",children:r}),s.jsx(P$,{children:s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"small",children:"Files are generated locally in your browser - your data stays private."})}),s.jsx(jt,{href:"/view-coasters",variant:"back",children:"Back to View Coasters"})]})})]})}const aC="/coaster-ranker/assets/hyperia-thorpe-park-QN4YTyKM.webp",lC=T.section`
  margin-bottom: ${se};
  display: flex;
  justify-content: center;
`,iC=T.section`
  position: relative;
  background: linear-gradient(
    135deg,
    ${qd} 0%,
    ${tn} 100%
  );
  color: ${ke};
  padding: ${J} ${P};
  margin: -${P} -${P} ${J};
  border-radius: 0 0 ${J} ${J};
  overflow: hidden;
  min-height: 280px;
  display: flex;
  align-items: center;

  @media (min-width: ${gt}) {
    padding: ${J} ${Y};
    margin: -${Y} -${Y} ${J};
    min-height: 320px;
  }

  @media (min-width: ${Ze}) {
    padding: ${se} ${Y};
    margin: -${Y} -${Y} ${se};
    min-height: 400px;
  }

  @media (min-width: ${ue}) {
    padding: ${Oa} ${J} ${se};
    margin: -${J} -${J} ${se};
    min-height: 500px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(
      45deg,
      rgba(0, 120, 204, 0.1) 0%,
      rgba(44, 62, 80, 0.3) 100%
    );
    z-index: 1;
  }
`,rC=T.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`,oC=T.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: url(${aC});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.3;
  z-index: 0;

  @media (max-width: ${ue}) {
    opacity: 0.2;
  }
`,Jg=T.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${P};
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: ${gt}) {
    gap: ${Y};
  }

  @media (min-width: ${Ze}) {
    flex-direction: row;
  }
`,sC=T.section`
  margin-bottom: ${se};

  h2 {
    margin-bottom: ${J};
  }

  @media (min-width: ${Ze}) {
    h2 {
      margin-bottom: ${se};
    }
  }
`,uC=T.div`
  display: grid;
  gap: ${Y};
  max-width: 1200px;
  margin: 0 auto;
  grid-template-columns: 1fr;

  @media (min-width: ${Ze}) {
    gap: ${J};
  }

  @media (min-width: ${ue}) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (min-width: ${ml}) {
    grid-template-columns: repeat(3, 1fr);
    gap: ${se};
  }
`,hd=T.div`
  background: linear-gradient(
    135deg,
    ${ke} 0%,
    ${yt} 100%
  );
  border: 1px solid ${Fe};
  border-radius: ${Y};
  box-shadow: 0 ${xe} ${J} ${bn};
  position: relative;
  overflow: hidden;
  padding: ${Y};
  margin: 0 ${P};

  @media (min-width: ${gt}) {
    margin: 0;
  }

  @media (min-width: ${Ze}) {
    padding: ${J};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: ${xe};
    background: linear-gradient(
      90deg,
      ${ye} 0%,
      ${_a} 50%,
      ${ye} 100%
    );
  }
`;T.div`
  font-size: 48px;
  text-align: center;
  margin-bottom: ${Y};
  filter: drop-shadow(0 2px 4px ${bn});
`;const pd=T.div`
  text-align: center;
  padding: ${Y};
`,cC=T.div`
  display: flex;
  flex-direction: column;
  gap: ${J};
`,Io=T.div`
  display: flex;
  gap: ${P};
  flex-direction: column;
  align-items: center;
  text-align: center;

  h3,
  p {
    text-align: center;
  }

  @media (min-width: ${gt}) {
    flex-direction: row;
    align-items: flex-start;
    text-align: left;
    gap: ${Y};

    h3,
    p {
      text-align: left;
    }
  }
`,es=T.div`
  background: ${ye};
  color: ${ke};
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
  margin-top: ${xe};
`,dC=T.section`
  margin-bottom: ${se};
  display: flex;
  justify-content: center;
  text-align: center;
`;T.ol`
  margin: ${At} 0;
  padding-left: ${Ht};
`;function fC(){return s.jsxs(Et,{children:[s.jsxs(iC,{children:[s.jsxs(rC,{children:[s.jsx(zt,{children:"Coaster Ranker"}),s.jsx(b,{as:"p",fontSize:"large",center:!0,mb:"medium",colour:"white",children:"Create your own personalized ranking of roller coasters. Compare coasters head-to-head to build your ultimate coaster tier list."}),s.jsxs(Jg,{children:[s.jsx(Ie,{as:"link",to:"/upload",variant:"success",children:"Get Started"}),s.jsx(Ie,{as:"link",to:"/upload-csv",variant:"default",children:"Try Example Data"})]})]}),s.jsx(oC,{})]}),s.jsxs(sC,{children:[s.jsx(b,{as:"h2",center:!0,fontSize:"large",children:"Why Choose Coaster Ranker?"}),s.jsxs(uC,{children:[s.jsx(hd,{children:s.jsxs(pd,{children:[s.jsx(b,{as:"h3",bold:!0,fontSize:"medium",colour:"darkGrey",mb:"small",children:"Privacy First"}),s.jsxs(b,{as:"p",colour:"mediumGrey",fontSize:"body",children:[s.jsx(b,{bold:!0,children:"We store nothing on our servers."})," All your data stays securely in your browser's local storage. Your rankings are completely private and only accessible to you."]})]})}),s.jsx(hd,{children:s.jsxs(pd,{children:[s.jsx(b,{as:"h3",bold:!0,fontSize:"medium",colour:"darkGrey",mb:"small",children:"Quick & Easy"}),s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"body",children:"Simple head-to-head comparisons make ranking effortless. Just pick your favorite between two coasters and let our algorithm build your personalized tier list."})]})}),s.jsx(hd,{children:s.jsxs(pd,{children:[s.jsx(b,{as:"h3",bold:!0,fontSize:"medium",colour:"darkGrey",mb:"small",children:"Export Rankings"}),s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"body",children:"Download your completed rankings as JSON or view them anytime. Keep your lists safe by exporting them before clearing browser data."})]})})]})]}),s.jsx(lC,{children:s.jsx(vs,{title:"How to Get Started",variant:"outlined",maxWidth:"800px",children:s.jsxs(cC,{children:[s.jsxs(Io,{children:[s.jsx(es,{children:"1"}),s.jsxs("div",{children:[s.jsx(b,{as:"h3",bold:!0,mb:"tiny",children:"Add Your Coasters"}),s.jsx(b,{as:"p",colour:"mediumGrey",children:"Upload your coaster list via CSV, JSON, or enter them manually. New users can try our example data to see how it works."})]})]}),s.jsxs(Io,{children:[s.jsx(es,{children:"2"}),s.jsxs("div",{children:[s.jsx(b,{as:"h3",bold:!0,mb:"tiny",children:"Start Ranking"}),s.jsx(b,{as:"p",colour:"mediumGrey",children:"Compare coasters head-to-head in simple matchups. Just pick your favorite between two options."})]})]}),s.jsxs(Io,{children:[s.jsx(es,{children:"3"}),s.jsxs("div",{children:[s.jsx(b,{as:"h3",bold:!0,mb:"tiny",children:"Build Your List"}),s.jsx(b,{as:"p",colour:"mediumGrey",children:"The app intelligently sorts your coasters based on your preferences using advanced ranking algorithms."})]})]}),s.jsxs(Io,{children:[s.jsx(es,{children:"4"}),s.jsxs("div",{children:[s.jsx(b,{as:"h3",bold:!0,mb:"tiny",children:"Download Results"}),s.jsx(b,{as:"p",colour:"mediumGrey",children:"Save your final ranking as a downloadable file to keep your personalized tier list forever."})]})]})]})})}),s.jsx(dC,{children:s.jsxs(vs,{variant:"elevated",maxWidth:"600px",children:[s.jsx(b,{as:"h2",center:!0,mb:"small",children:"Ready to Rank Your Coasters?"}),s.jsx(b,{as:"p",center:!0,mb:"medium",colour:"mediumGrey",children:"Join thousands of coaster enthusiasts creating their perfect rankings. Start building your ultimate coaster tier list today!"}),s.jsx(Jg,{children:s.jsx(Ie,{as:"a",href:"/upload",variant:"success",children:"Start Ranking Now"})})]})})]})}const mC=T.div`
  margin-bottom: ${se};
  box-sizing: border-box;
  padding: 0 ${P};

  @media (min-width: ${Ze}) {
    padding: 0 ${J};
  }
`,al=T.section`
  margin-bottom: ${se};
`,hr=T.ul`
  margin: ${Y} 0 ${J};
  padding-left: ${J};

  li {
    margin-bottom: ${Y};
  }
`,hC=T(b).withConfig({shouldForwardProp:l=>!["italic","mt"].includes(l)})`
  padding-top: ${J};
  border-top: 1px solid ${en};
`;function pC(){return s.jsx(Et,{children:s.jsxs(mC,{children:[s.jsx(zt,{children:"Privacy Policy"}),s.jsx(b,{as:"p",mb:"medium",children:"Coaster Ranker respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we handle your data when you use our application."}),s.jsxs(al,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Data Collection"}),s.jsx(b,{as:"p",mb:"small",children:"Coaster Ranker is designed to prioritize your privacy:"}),s.jsxs(hr,{children:[s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"No personal information collected:"})," We do not collect, store, or process any personal information such as names, email addresses, or contact details."]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Local data only:"})," All coaster data you upload and rankings you create are stored locally in your browser. This data never leaves your device."]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"No tracking:"})," We do not use cookies, analytics, or tracking technologies to monitor your usage."]})]})]}),s.jsxs(al,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"How Your Data is Used"}),s.jsx(b,{as:"p",mb:"small",children:"Any data you provide to Coaster Ranker is used solely for:"}),s.jsxs(hr,{children:[s.jsx(b,{as:"li",children:"Displaying your coaster information"}),s.jsx(b,{as:"li",children:"Enabling you to rank and compare coasters"}),s.jsx(b,{as:"li",children:"Generating downloadable rankings"})]}),s.jsx(b,{as:"p",mb:"medium",children:"Since all data is stored locally, you have complete control over your information and can clear it at any time by clearing your browser's local storage."})]}),s.jsxs(al,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Data Storage and Security"}),s.jsxs(hr,{children:[s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Local storage:"})," All data is stored in your browser's local storage and never transmitted to external servers."]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"No server storage:"})," We do not maintain any databases or servers that store your information."]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Browser security:"})," Your data is protected by your browser's built-in security features."]})]})]}),s.jsxs(al,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Third-Party Services"}),s.jsx(b,{as:"p",mb:"medium",children:"Coaster Ranker does not integrate with any third-party services that would have access to your data. The application runs entirely in your browser without external dependencies that could compromise your privacy."})]}),s.jsxs(al,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Your Rights"}),s.jsx(b,{as:"p",mb:"small",children:"Since all data is stored locally on your device, you have complete control:"}),s.jsxs(hr,{children:[s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Delete your data:"})," Clear your browser's local storage to remove all Coaster Ranker data"]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Export your data:"})," Use the download feature to export your rankings in various formats"]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Data portability:"})," Your data is yours to keep and use as you see fit"]})]})]}),s.jsxs(al,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"How to Clear Your Data"}),s.jsx(b,{as:"p",mb:"small",children:"To completely remove all Coaster Ranker data from your browser:"}),s.jsxs(hr,{children:[s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Chrome:"}),' Go to Settings → Privacy and security → Clear browsing data → Advanced → Select "Local storage" → Clear data']}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Firefox:"})," Go to Settings → Privacy & Security → Cookies and Site Data → Manage Data → Search for this site → Remove"]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Safari:"})," Go to Preferences → Privacy → Manage Website Data → Search for this site → Remove"]}),s.jsxs(b,{as:"li",children:[s.jsx(b,{bold:!0,children:"Edge:"}),' Go to Settings → Privacy, search, and services → Clear browsing data → Choose what to clear → Select "Local storage" → Clear']})]}),s.jsxs(b,{as:"p",mb:"medium",children:[s.jsx(b,{bold:!0,children:"Note:"})," Clearing your browser's local storage will remove all your coaster data and rankings permanently. Make sure to download your rankings first if you want to keep them."]})]}),s.jsxs(al,{children:[s.jsx(b,{as:"h2",bold:!0,colour:"darkGrey",fontSize:"large",mb:"medium",children:"Changes to This Policy"}),s.jsx(b,{as:"p",mb:"medium",children:"We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. Since we don't collect contact information, we recommend checking this page periodically for updates."})]}),s.jsx(hC,{as:"p",italic:!0,mt:"large",children:"Last updated: November 6, 2025"})]})})}const gC=T.div`
  margin-bottom: ${J};

  p {
    line-height: 1.6;
  }

  @media (min-width: ${ue}) {
    margin-bottom: ${se};
  }
`,yC=T.div`
  display: grid;
  gap: ${J};
  margin: ${J} 0;
  grid-template-columns: 1fr;

  @media (min-width: ${ue}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (min-width: ${ml}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${se};
  }
`,gd=T.div`
  display: block;
  text-decoration: none;
  color: inherit;
  background-color: ${ke};
  border: ${Ne} solid ${Fe};
  border-radius: ${P};
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-sizing: border-box;
  padding: ${Y};
  margin: 0 ${P};

  @media (min-width: ${gt}) {
    margin: 0;
  }

  @media (min-width: ${Ze}) {
    padding: ${J};
  }

  &:hover {
    border-color: ${ye};
    box-shadow: 0 ${xe} ${Y} ${bn};
    transform: translateY(-${Ne});
  }

  &:focus {
    outline: ${Ne} solid ${ye};
    outline-offset: ${Ne};
  }

  p {
    margin: 0;
    line-height: 1.4;
  }
`,yd=T.div`
  background-color: ${ye};
  color: ${ke};
  font-size: ${at};
  font-weight: bold;
  padding: ${P} ${Y};
  border-radius: ${xe};
  margin-bottom: ${Y};
  text-align: center;
  letter-spacing: ${ze};
  pointer-events: none;
`;function vC(){const{uploadedData:l}=Ua(),r=sy(),u=l?.coasters?.length||0,c=d=>{r(d)};return s.jsxs(Et,{children:[s.jsx(zt,{children:"Upload your coaster data"}),s.jsxs("section",{children:[s.jsxs(gC,{children:[u>0&&s.jsxs(s.Fragment,{children:[s.jsx(zr,{coasterCount:u}),s.jsx(b,{as:"h2",colour:"charcoal",fontSize:"medium",mb:"small",children:"Choose your upload method"})]}),u===0&&s.jsx($r,{as:"h2",children:"Choose your upload method"}),s.jsx(b,{as:"p",colour:"mediumGrey",mb:"small",children:"Select how you'd like to add coasters to your collection. You can use multiple methods - all data will be combined together."})]}),s.jsxs(yC,{children:[s.jsx("div",{children:s.jsxs(gd,{onClick:()=>c("/upload-csv"),onKeyDown:d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c("/upload-csv"))},children:[s.jsx(yd,{children:"CSV"}),s.jsx(b,{as:"h3",colour:"charcoal",mb:"tiny",mt:"small",children:"Upload CSV file"}),s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"small",children:"Import coaster data from a CSV spreadsheet file"})]})}),s.jsx("div",{children:s.jsxs(gd,{onClick:()=>c("/upload-json"),onKeyDown:d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c("/upload-json"))},children:[s.jsx(yd,{children:"JSON"}),s.jsx(b,{as:"h3",colour:"charcoal",mb:"tiny",mt:"small",children:"Upload JSON data"}),s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"small",children:"Paste JSON data or upload a JSON file"})]})}),s.jsx("div",{children:s.jsxs(gd,{onClick:()=>c("/upload-manual"),onKeyDown:d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),c("/upload-manual"))},children:[s.jsx(yd,{children:"FORM"}),s.jsx(b,{as:"h3",colour:"charcoal",mb:"tiny",mt:"small",children:"Enter manually"}),s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"small",children:"Add coasters one at a time using a form"})]})})]})]})]})}function Py(){const[l,r]=z.useState(null),[u,c]=z.useState(null),[d,m]=z.useState([]),[h,v]=z.useState([]),[g,p]=z.useState(""),[x,S]=z.useState(!1),[C,A]=z.useState(!1);return{error:l,success:u,duplicates:d,pendingCoasters:h,pendingFilename:g,showDuplicateResolver:x,showPreRankingQuestion:C,setError:r,setSuccess:c,setDuplicates:m,setPendingCoasters:v,setPendingFilename:p,setShowDuplicateResolver:S,setShowPreRankingQuestion:A,resetUploadState:()=>{r(null),c(null),m([]),v([]),p(""),S(!1),A(!1)},clearPendingData:()=>{m([]),v([]),p(""),S(!1),A(!1)}}}const Gt=(l,r,u,c=!0)=>{let d=l,m;switch(c&&typeof d=="string"&&(d=d.replace(/\s*\(([^)]+)\)\s*/g,(h,v,g)=>(g===0?"":"-")+v),d=d.replace(/&/g,"and").replace(/½/g,"-5").replace(/['#:.\\\\/]/g,"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim(),d=d.replace(/-+/g,"-"),d=d.replace(/^[-\s]+|[-\s]+$/g,"")),!/\s/.test(d)&&!/^[A-Z\s]+$/.test(d)&&(d=d.replace(/(?!^)([A-Z])/g," $1")),r){case"space":d=d.split("-").join(" "),d=d.split("_").join(" ");break;case"dash":d=d.split(" ").join("-"),d=d.split("_").join("-"),d=d.replace(/-+/g,"-");break;case"under":d=d.split(" ").join("_"),d=d.split("-").join("_");break;default:d=d.split("-").join(""),d=d.split("_").join(""),d=d.split(" ").join("");break}switch(u){case"upper":m=d.toUpperCase();break;case"lower":case"lowercase":m=d.toLowerCase();break;case"first-string":m=d.charAt(0).toUpperCase()+d.slice(1).toLowerCase();break;case"first-word":m=d.toLowerCase().replace(/(?:^|\s)\S/g,h=>h.toUpperCase());break;default:m=d.toLowerCase().replace(/(?:^|\s)\S/g,h=>h.toUpperCase());break}return m};function bC(l){const r=l.trim().split(`
`);if(r.length<2)throw new Error("CSV must have at least a header row and one data row");const u=r[0].split(",").map(d=>d.trim().replace(/"/g,"")),c=[];for(let d=1;d<r.length;d++){const m=xC(r[d]);if(m.length!==u.length){console.warn(`Line ${d+1} has ${m.length} values but expected ${u.length}`);continue}const h={};u.forEach((v,g)=>{h[v]=m[g]||""}),c.push(h)}return c}function xC(l){const r=[];let u="",c=!1;for(let d=0;d<l.length;d++){const m=l[d];m==='"'?c=!c:m===","&&!c?(r.push(u.trim()),u=""):u+=m}return r.push(u.trim()),r}function SC(l){return l.map((r,u)=>{if(!r.name)throw new Error(`Row ${u+1}: Coaster name is required`);if(!r.park)throw new Error(`Row ${u+1}: Park name is required`);if(!r.manufacturer)throw new Error(`Row ${u+1}: Manufacturer is required`);if(!r.country)throw new Error(`Row ${u+1}: Country is required`);const c=r.material||r.type;return{id:r.id||`coaster_${u}`,name:Gt(r.name,"space","first-word",!1),park:Gt(r.park,"space","first-word",!1),country:Gt(r.country,"space","first-word",!1),manufacturer:Gt(r.manufacturer,"space","first-word",!1),model:r.model?Gt(r.model,"space","first-word",!1):void 0,material:c?Gt(c,"space","first-word",!1):void 0,thrillLevel:r.thrillLevel?Gt(r.thrillLevel,"space","first-word",!1):void 0}})}function $C(l,r){return new Promise((u,c)=>{try{let d;if(l.type==="application/json"||l.name.endsWith(".json")){const C=JSON.parse(r);if(Array.isArray(C))d=C;else if(C.coasters&&Array.isArray(C.coasters))d=C.coasters;else throw new Error('JSON must be an array of coasters or contain a "coasters" property with an array')}else d=bC(r);if(d.length===0)throw new Error("No coaster data found in file");const m=d[0],h=Object.keys(m).map(C=>C.toLowerCase()),g=["name","park","manufacturer"].filter(C=>!h.includes(C));if(h.includes("material")||h.includes("type")||g.push("material (or type)"),g.length>0)throw new Error(`Coaster data must include these required fields: ${g.join(", ")}`);const S={coasters:SC(d),uploadedAt:new Date,filename:l.name};u(S)}catch(d){c(d)}})}const CC=l=>{const r=new Set,u=new Map;if(l.forEach(m=>{if(r.has(m.id)){if(!u.has(m.id)){const h=l.find(v=>v.id===m.id);h&&u.set(m.id,[h])}u.get(m.id)?.push(m)}else r.add(m.id)}),u.size===0)return l;console.warn(`Found ${u.size} duplicate ID groups:`,Array.from(u.entries()).map(([m,h])=>`ID "${m}": ${h.map(v=>v.name).join(", ")}`).join("; "));let c=1;return l.map(m=>{const h=u.get(m.id);if(h&&h.length>1&&h.findIndex(g=>g.name===m.name&&g.park===m.park&&g.manufacturer===m.manufacturer)>0){for(;r.has(c.toString().padStart(3,"0"));)c++;const g=c.toString().padStart(3,"0");return r.add(g),c++,console.warn(`Reassigning ID for duplicate coaster: "${m.name}" at ${m.park} from "${m.id}" to "${g}"`),{...m,id:g}}return m})};function bs(l){const{newCoasters:r,filename:u,existingData:c,isPreRanked:d=!1}=l,m=c?.coasters||[],h=Date.now().toString(),v=r.map((U,N)=>({...U,isNewCoaster:!0,...d&&{originalRankPosition:N,isPreRanked:!0}})),g=m.map(U=>({...U,isNewCoaster:!1})),p=c?.rankingMetadata||{completedComparisons:new Set,rankedCoasters:[]},x=c?.filename?`${c.filename}, ${u}`:u,S=[...g,...v],C=CC(S);return{combinedData:{coasters:C,uploadedAt:new Date,filename:x,rankingMetadata:{completedComparisons:p.completedComparisons,rankedCoasters:p.rankedCoasters,isRanked:!1,hasPreRankedCoasters:p.hasPreRankedCoasters||!1||d,preRankedGroups:d?[...p.preRankedGroups||[],h]:p.preRankedGroups||[]}},newCoasterCount:r.length,totalCount:C.length}}function Iy(l){const{newCoasters:r,existingData:u,filename:c}=l,d=u?.coasters||[];if(d.length===0){const h=bs({newCoasters:r,filename:c,existingData:u,isPreRanked:!1});return{hasDuplicates:!1,duplicates:[],combinedData:h.combinedData,newCoasterCount:h.newCoasterCount,totalCount:h.totalCount}}const m=Zy(d,r);if(m.duplicates.length===0){const h=bs({newCoasters:r,filename:c,existingData:u,isPreRanked:!1});return{hasDuplicates:!1,duplicates:[],combinedData:h.combinedData,newCoasterCount:h.newCoasterCount,totalCount:h.totalCount}}return{hasDuplicates:!0,duplicates:m.duplicates}}function jC(l){const{resolutions:r,duplicates:u,pendingCoasters:c,existingData:d,filename:m,isPreRanked:h}=l;let g=[...d?.coasters||[]],p=[];const x=new Set(c);r.forEach((A,U)=>{const N=u[U];switch(A.action){case"keep-existing":x.delete(N.newCoaster);break;case"keep-new":g=g.filter(L=>L.id!==N.existingCoaster.id),x.has(N.newCoaster)&&(p.push(N.newCoaster),x.delete(N.newCoaster));break;case"keep-both":x.has(N.newCoaster)&&(p.push(N.newCoaster),x.delete(N.newCoaster));break}}),p.push(...Array.from(x));const S=d?{...d,coasters:g,rankingMetadata:{completedComparisons:d.rankingMetadata?.completedComparisons||new Set,rankedCoasters:d.rankingMetadata?.rankedCoasters?.filter(A=>g.some(U=>U.id===A))||g.map(A=>A.id),isRanked:d.rankingMetadata?.isRanked||!1,hasPreRankedCoasters:d.rankingMetadata?.hasPreRankedCoasters||!1,preRankedGroups:d.rankingMetadata?.preRankedGroups||[]}}:null,C=bs({newCoasters:p,filename:m,existingData:S,isPreRanked:h});return{combinedData:C.combinedData,addedCount:C.newCoasterCount,totalCount:C.totalCount}}async function wC(l){const{fileContent:r,filename:u,existingData:c}=l;try{const d=new File([r],u,{type:u.toLowerCase().endsWith(".json")?"application/json":"text/csv"}),m=await $C(d,r);if(m.coasters.length===1){const h=Iy({newCoasters:m.coasters,existingData:c,filename:m.filename});return h.hasDuplicates?{success:!0,needsPreRankingDecision:!1,needsDuplicateResolution:!0,parsedCoasters:m.coasters,duplicates:h.duplicates}:{success:!0,needsPreRankingDecision:!1,needsDuplicateResolution:!1,combinedData:h.combinedData,newCoasterCount:h.newCoasterCount,totalCount:h.totalCount}}return{success:!0,needsPreRankingDecision:!0,needsDuplicateResolution:!1,parsedCoasters:m.coasters}}catch(d){return{success:!1,needsPreRankingDecision:!1,needsDuplicateResolution:!1,error:d instanceof Error?d.message:"Failed to process file"}}}function kC(l){const{coasters:r,filename:u,existingData:c,isPreRanked:d}=l,m=Iy({newCoasters:r,existingData:c,filename:u});if(m.hasDuplicates)return{needsDuplicateResolution:!0,duplicates:m.duplicates};{const h=bs({newCoasters:r,filename:u,existingData:c,isPreRanked:d});return{needsDuplicateResolution:!1,combinedData:h.combinedData,newCoasterCount:h.newCoasterCount,totalCount:h.totalCount}}}function RC(l){return jC(l)}function e0(l){const{isPreRanked:r,pendingCoasters:u,pendingFilename:c,uploadedData:d,uploadStateActions:m,setUploadedData:h,successMessagePrefix:v="Successfully processed file!",onAdditionalCleanup:g}=l,{setShowPreRankingQuestion:p,setDuplicates:x,setShowDuplicateResolver:S,setSuccess:C,setPendingCoasters:A,setPendingFilename:U}=m;if(p(!1),u.length===0)return{success:!1,needsDuplicateResolution:!1};const N=kC({coasters:u,filename:c,existingData:d,isPreRanked:r});if(N.needsDuplicateResolution)return x(N.duplicates||[]),S(!0),sessionStorage.setItem("pendingPreRanked",r.toString()),{success:!0,needsDuplicateResolution:!0};{h(N.combinedData);const L=r?" (marked as pre-ranked)":"";return C(`${v} Added ${N.newCoasterCount} new coasters${L}. You now have ${N.totalCount} coasters total.`),A([]),U(""),g&&g(),{success:!0,needsDuplicateResolution:!1}}}function t0(l){const{uploadStateActions:r,onAdditionalCleanup:u}=l,{setShowPreRankingQuestion:c,setPendingCoasters:d,setPendingFilename:m,setError:h}=r;c(!1),d([]),m(""),h("Upload cancelled by user."),u&&u()}function n0(l){const{resolutions:r,duplicates:u,pendingCoasters:c,pendingFilename:d,uploadedData:m,uploadStateActions:h,setUploadedData:v,successMessagePrefix:g="Successfully processed file!",onAdditionalCleanup:p}=l,{setShowDuplicateResolver:x,setDuplicates:S,setPendingCoasters:C,setPendingFilename:A,setSuccess:U}=h;if(c.length===0)return{success:!1,addedCount:0,totalCount:0};const N=sessionStorage.getItem("pendingPreRanked")==="true";sessionStorage.removeItem("pendingPreRanked");const L=RC({resolutions:r,duplicates:u,pendingCoasters:c,existingData:m,filename:d,isPreRanked:N});v(L.combinedData);const O=N?" (marked as pre-ranked)":"";return U(`${g} Added ${L.addedCount} new coasters${O}. You now have ${L.totalCount} coasters total.`),x(!1),S([]),C([]),A(""),p&&p(),{success:!0,addedCount:L.addedCount,totalCount:L.totalCount}}function EC(l){const{result:r,filename:u,uploadStateActions:c,setUploadedData:d,successMessagePrefix:m="Successfully processed file!",onAdditionalCleanup:h}=l,{setError:v,setSuccess:g,setPendingCoasters:p,setPendingFilename:x,setShowPreRankingQuestion:S,setDuplicates:C,setShowDuplicateResolver:A}=c;return r.success?(p(r.parsedCoasters||[]),x(u),r.needsPreRankingDecision?(S(!0),{success:!0,needsPreRankingDecision:!0,needsDuplicateResolution:!1}):r.needsDuplicateResolution?(C(r.duplicates||[]),A(!0),sessionStorage.setItem("pendingPreRanked","false"),{success:!0,needsPreRankingDecision:!1,needsDuplicateResolution:!0}):(d(r.combinedData),g(`${m} Added ${r.newCoasterCount} new coasters. You now have ${r.totalCount} coasters total.`),p([]),x(""),h&&h(),{success:!0,needsPreRankingDecision:!1,needsDuplicateResolution:!1})):(v(r.error||"Failed to process file"),{success:!1,needsPreRankingDecision:!1,needsDuplicateResolution:!1})}async function a0(l){const{fileContent:r,filename:u,uploadedData:c,uploadStateActions:d,setUploadedData:m,setIsLoading:h,successMessagePrefix:v,onAdditionalCleanup:g}=l,{setError:p,setSuccess:x}=d;h(!0),p(null),x(null);try{const S=await wC({fileContent:r,filename:u,existingData:c});return EC({result:S,filename:u,uploadStateActions:d,setUploadedData:m,successMessagePrefix:v,onAdditionalCleanup:g})}catch(S){return p(`Error processing file: ${S instanceof Error?S.message:"Unknown error"}`),{success:!1,needsPreRankingDecision:!1,needsDuplicateResolution:!1}}finally{h(!1)}}const zC=T.div`
  margin-bottom: ${J};

  p {
    line-height: 1.6;
  }

  @media (min-width: ${ue}) {
    margin-bottom: ${se};
  }
`,AC=T.div`
  margin: ${J} 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: ${P} 0;
    line-height: 1.5;
    position: relative;
    padding-left: ${se};

    &::before {
      content: '✓';
      color: ${Rr};
      font-weight: bold;
      font-size: ${wt};
      position: absolute;
      left: 0;
      top: ${P};
    }
  }

  @media (min-width: ${ue}) {
    margin-bottom: ${se};
  }
`,TC=T.div`
  margin: ${J} 0;

  details {
    border: ${ze} solid ${Fe};
    border-radius: ${P};
    padding: ${Y};
    background-color: ${yn};
  }

  summary {
    cursor: pointer;
    padding: ${P} 0;
    margin-bottom: 0;
    list-style: none;
    user-select: none;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▶';
      color: ${Ma};
      font-size: ${at};
      margin-right: ${P};
      transition: transform 0.2s ease;
    }
  }

  details[open] summary::before {
    transform: rotate(90deg);
  }

  @media (min-width: ${ue}) {
    margin: ${se} 0;
  }
`,DC=T.div`
  margin-bottom: ${J};

  @media (min-width: ${ue}) {
    margin-bottom: ${se};
  }
`,MC=T.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Y};
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${P};

  @media (min-width: ${gt}) {
    padding: 0;
  }
`,OC=T.input`
  display: none;
`,_C=T.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${l=>l.$isLoading?en:ye};
  color: ${ke};
  border-radius: ${xe};
  cursor: ${l=>l.$isLoading?"wait":"pointer"};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: ${Bt};
  box-sizing: border-box;
  text-align: center;
  padding: ${Y};
  font-size: ${at};
  width: calc(100% - ${J});
  margin: 0 ${P};

  @media (min-width: ${gt}) {
    width: auto;
    max-width: 100%;
    margin: 0;
    padding: ${Y} ${J};
  }

  @media (min-width: ${Ze}) {
    padding: ${Y} ${se};
    font-size: ${wt};
  }

  ${l=>l.$isLoading&&`
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `}

  &:hover {
    background-color: ${l=>l.$isLoading?en:tn};
    transform: ${l=>l.$isLoading?"none":"translateY(-1px)"};
  }

  &:focus {
    outline: ${Ne} solid ${ye};
    outline-offset: ${Ne};
  }

  &:active {
    transform: ${l=>l.$isLoading?"none":"translateY(0)"};
  }
`;function NC(){const{uploadedData:l,setUploadedData:r,isLoading:u,setIsLoading:c}=Ua(),d=Py(),m=l?.coasters?.length||0,h=S=>{n0({resolutions:S,duplicates:d.duplicates,pendingCoasters:d.pendingCoasters,pendingFilename:d.pendingFilename,uploadedData:l,uploadStateActions:d,setUploadedData:r,successMessagePrefix:"Successfully processed CSV file!"})},v=()=>{d.clearPendingData(),d.setError("Upload cancelled.")},g=S=>{e0({isPreRanked:S,pendingCoasters:d.pendingCoasters,pendingFilename:d.pendingFilename,uploadedData:l,uploadStateActions:d,setUploadedData:r,successMessagePrefix:"Successfully processed CSV file!"})},p=()=>{t0({uploadStateActions:d})},x=S=>{if(u){S.preventDefault();return}const C=S.target.files?.[0];if(!C)return;d.setError(""),d.setSuccess(""),c(!0);const A=new FileReader;A.onload=async U=>{try{const N=U.target?.result;await a0({fileContent:N,filename:C.name,uploadedData:l,uploadStateActions:d,setUploadedData:r,setIsLoading:c,successMessagePrefix:"Successfully processed CSV file!"})}catch(N){d.setError(N instanceof Error?N.message:"Failed to process file")}finally{c(!1)}},A.onerror=()=>{d.setError("Failed to read file"),c(!1)},A.readAsText(C)};return s.jsxs(Et,{children:[s.jsx(zt,{children:"Upload CSV File"}),s.jsxs("section",{children:[s.jsxs(zC,{children:[m>0&&s.jsxs(s.Fragment,{children:[s.jsx(zr,{coasterCount:m}),s.jsx(b,{as:"h2",colour:"charcoal",fontSize:"medium",mb:"small",children:"Import from CSV Spreadsheet"})]}),m===0&&s.jsx($r,{as:"h2",children:"Import from CSV Spreadsheet"}),s.jsx(b,{as:"p",colour:"mediumGrey",mb:"small",children:"Upload a CSV file containing your coaster data. Each row should represent one coaster with the required fields."})]}),s.jsxs(AC,{children:[s.jsx(b,{as:"h3",colour:"darkBlue",mb:"small",children:"Required Fields:"}),s.jsxs("ul",{children:[s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,children:"name:"})," Coaster name"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,children:"park:"})," Theme park"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,children:"manufacturer:"})," Builder company"]})]}),s.jsx(b,{as:"h3",colour:"darkBlue",mb:"small",mt:"medium",children:"Optional Fields:"}),s.jsxs("ul",{children:[s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,children:"model:"})," Model name"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,children:"material:"})," Steel/Wood/Hybrid"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,children:"thrillLevel:"})," Kiddie/Family/Family Thrill/Thrill"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,children:"country:"})," Country location"]})]})]}),s.jsx(TC,{children:s.jsxs("details",{children:[s.jsx(b,{as:"summary",bold:!0,colour:"orange",children:"CSV Format Example"}),s.jsx(Vy,{children:`name,park,manufacturer,model,material,thrillLevel,country
The Smiler,Alton Towers,Gerstlauer,Euro-Fighter,Steel,Thrill,United Kingdom
Nemesis,Alton Towers,Bolliger & Mabillard,Inverted Coaster,Steel,Thrill,United Kingdom
Stealth,Thorpe Park,Intamin,Accelerator Coaster,Steel,Family Thrill,United Kingdom`})]})}),s.jsxs(DC,{children:[s.jsx(b,{as:"h3",colour:"charcoal",mb:"small",children:"Select CSV File"}),s.jsxs(MC,{children:[s.jsx(OC,{type:"file",id:"csv-file-upload",accept:".csv,text/csv",onChange:x,"aria-describedby":"file-status"}),s.jsx(_C,{htmlFor:"csv-file-upload",$isLoading:u,tabIndex:0,onKeyDown:S=>{(S.key==="Enter"||S.key===" ")&&u&&S.preventDefault()},children:u?"Processing File...":"Choose CSV File"})]}),s.jsx(b,{as:"p",center:!0,colour:"mutedGrey",fontSize:"small",id:"file-status",mt:"tiny",children:u?"Please wait while your file is being processed...":"Only CSV files are accepted. The file should have headers in the first row."})]}),d.showDuplicateResolver&&d.duplicates.length>0&&s.jsx(Id,{duplicates:d.duplicates,onResolve:h,onCancel:v}),d.error&&s.jsxs(dl,{variant:"error",role:"alert","aria-live":"assertive",children:[s.jsx(b,{as:"span",bold:!0,colour:"errorText",fontSize:"small",children:"ERROR:"}),s.jsx(b,{as:"span",colour:"errorText",fontSize:"small",children:d.error})]}),d.success&&s.jsxs(dl,{variant:"success",role:"status","aria-live":"polite",children:[s.jsx(b,{as:"span",bold:!0,colour:"successGreen",fontSize:"small",children:"SUCCESS:"}),s.jsx(b,{as:"span",colour:"successGreen",fontSize:"small",children:d.success})]})]}),d.showPreRankingQuestion&&s.jsx(Jy,{coasterCount:d.pendingCoasters.length,existingCoasterCount:m,filename:d.pendingFilename,hasExistingRankedData:l?.rankingMetadata?.isRanked||!1,onAnswer:g,onCancel:p})]})}const vd=T.div`
  margin-bottom: ${J};

  p {
    line-height: 1.6;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: ${Y};
  }

  @media (min-width: ${ue}) {
    margin-bottom: ${se};
  }
`,UC=T.div`
  margin: ${J} 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    padding: ${P} 0;
    line-height: 1.5;
    position: relative;
    padding-left: ${se};

    &::before {
      content: '✓';
      color: ${Rr};
      font-weight: bold;
      font-size: ${wt};
      position: absolute;
      left: 0;
      top: ${P};
    }

    span {
      margin-right: ${P};
    }
  }

  @media (min-width: ${ue}) {
    margin-bottom: ${se};
  }
`,GC=T.div`
  margin: ${J} 0;

  details {
    border: ${ze} solid ${Fe};
    border-radius: ${P};
    padding: ${Y};
    background-color: ${yn};
  }

  summary {
    cursor: pointer;
    padding: ${P} 0;
    margin-bottom: 0;
    list-style: none;
    user-select: none;

    &::-webkit-details-marker {
      display: none;
    }

    &::before {
      content: '▶';
      color: ${Ma};
      font-size: ${at};
      margin-right: ${P};
      transition: transform 0.2s ease;
    }
  }

  details[open] summary::before {
    transform: rotate(90deg);
  }

  @media (min-width: ${ue}) {
    margin: ${se} 0;
  }
`,LC=T.textarea`
  width: 100%;
  min-height: 200px;
  padding: ${Y};
  border: ${Ne} solid ${en};
  border-radius: ${P};
  font-family: 'Courier New', monospace;
  font-size: ${at};
  line-height: 1.4;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${ye};
    box-shadow: ${Qy};
  }

  &:disabled {
    background-color: ${yn};
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${Ts};
    font-style: italic;
  }
`,HC=T.div`
  display: flex;
  align-items: center;
  margin: ${J} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: ${ze};
    background: ${en};
  }

  span {
    padding: 0 ${Y};
  }

  @media (min-width: ${ue}) {
    margin: ${se} 0;
  }
`,BC=T.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${Y};
  width: 100%;
  box-sizing: border-box;
  padding: 0 ${P};

  @media (min-width: ${gt}) {
    padding: 0;
  }
`,YC=T.input`
  display: none;
`,qC=T.label`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${l=>l.$disabled?en:Ma};
  color: ${ke};
  border-radius: ${xe};
  cursor: ${l=>l.$disabled?"not-allowed":"pointer"};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  min-height: ${Bt};
  box-sizing: border-box;
  text-align: center;
  padding: ${Y};
  font-size: ${at};
  width: calc(100% - ${J});
  margin: 0 ${P};

  @media (min-width: ${gt}) {
    width: auto;
    max-width: 100%;
    margin: 0;
    padding: ${Y} ${J};
  }

  @media (min-width: ${Ze}) {
    padding: ${Y} ${se};
    font-size: ${wt};
  }

  ${l=>l.$disabled&&`
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `}

  &:hover {
    background-color: ${l=>l.$disabled?en:Na};
    transform: ${l=>l.$disabled?"none":"translateY(-1px)"};
  }

  &:focus {
    outline: ${Ne} solid ${Ma};
    outline-offset: ${Ne};
  }

  &:active {
    transform: ${l=>l.$disabled?"none":"translateY(0)"};
  }
`;function QC(){const{uploadedData:l,setUploadedData:r,isLoading:u,setIsLoading:c}=Ua(),d=Py(),[m,h]=z.useState(""),v=l?.coasters?.length||0,g=N=>{n0({resolutions:N,duplicates:d.duplicates,pendingCoasters:d.pendingCoasters,pendingFilename:d.pendingFilename,uploadedData:l,uploadStateActions:d,setUploadedData:r,successMessagePrefix:"Successfully processed JSON data!",onAdditionalCleanup:()=>h("")})},p=()=>{d.clearPendingData(),d.setError("Upload cancelled."),h("")},x=N=>{e0({isPreRanked:N,pendingCoasters:d.pendingCoasters,pendingFilename:d.pendingFilename,uploadedData:l,uploadStateActions:d,setUploadedData:r,successMessagePrefix:"Successfully processed JSON data!",onAdditionalCleanup:()=>h("")})},S=()=>{t0({uploadStateActions:d}),h("")},C=async(N,L="pasted-data.json")=>{d.setError(""),d.setSuccess(""),c(!0);try{await a0({fileContent:N,filename:L,uploadedData:l,uploadStateActions:d,setUploadedData:r,setIsLoading:c,successMessagePrefix:"Successfully processed JSON data!",onAdditionalCleanup:()=>h("")})}catch(O){d.setError(`Error processing JSON: ${O instanceof Error?O.message:"Unknown error"}`),c(!1)}},A=async N=>{if(N.target.files&&N.target.files[0]){const L=N.target.files[0];if(!L.name.toLowerCase().endsWith(".json")){d.setError("Please select a JSON file.");return}try{const O=await L.text();await C(O,L.name)}catch{d.setError("Error reading file.")}}},U=N=>{N.preventDefault(),m.trim()&&C(m.trim())};return s.jsxs(Et,{children:[s.jsx(zt,{children:"Upload JSON Data"}),s.jsxs("section",{children:[s.jsxs(vd,{children:[v>0&&s.jsxs(s.Fragment,{children:[s.jsx(zr,{coasterCount:v}),s.jsx(b,{as:"h2",colour:"charcoal",fontSize:"medium",mb:"small",children:"Import JSON Data"})]}),v===0&&s.jsx($r,{as:"h2",children:"Import JSON Data"}),s.jsx(b,{as:"p",colour:"mediumGrey",mb:"small",children:"Paste your coaster data as JSON or upload a JSON file. Your data should be an array of coaster objects."})]}),s.jsxs(UC,{children:[s.jsx(b,{as:"h3",colour:"darkBlue",mb:"small",children:"Required Fields:"}),s.jsxs("ul",{children:[s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,colour:"charcoal",children:"name:"})," ","Coaster name"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,colour:"charcoal",children:"park:"})," ","Theme park"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,colour:"charcoal",children:"manufacturer:"})," ","Builder company"]})]}),s.jsx(b,{as:"h3",colour:"darkBlue",mb:"small",mt:"medium",children:"Optional Fields:"}),s.jsxs("ul",{children:[s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,colour:"charcoal",children:"model:"})," ","Model name"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,colour:"charcoal",children:"material:"})," ","Steel/Wood/Hybrid"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,colour:"charcoal",children:"thrillLevel:"})," ","Kiddie/Family/Family Thrill/Thrill"]}),s.jsxs(b,{as:"li",colour:"slateGrey",children:[s.jsx(b,{bold:!0,colour:"charcoal",children:"country:"})," ","Country location"]})]})]}),s.jsx(GC,{children:s.jsxs("details",{children:[s.jsx(b,{as:"summary",bold:!0,colour:"orange",children:"JSON Format Example"}),s.jsx(Vy,{children:`[
  {
    "name": "The Smiler",
    "park": "Alton Towers",
    "manufacturer": "Gerstlauer",
    "model": "Euro-Fighter",
    "material": "Steel",
    "thrillLevel": "Thrill",
    "country": "United Kingdom"
  },
  {
    "name": "Nemesis",
    "park": "Alton Towers",
    "manufacturer": "Bolliger & Mabillard",
    "model": "Inverted Coaster",
    "material": "Steel",
    "thrillLevel": "Family Thrill",
    "country": "United Kingdom"
  }
]`})]})}),s.jsxs(vd,{children:[s.jsx(b,{as:"h3",colour:"charcoal",mb:"small",children:"Paste JSON Data"}),s.jsxs("form",{onSubmit:U,children:[s.jsx($r,{as:"label",htmlFor:"json-textarea",children:"JSON data input area"}),s.jsx(LC,{id:"json-textarea",value:m,onChange:N=>h(N.target.value),placeholder:"Paste your JSON data here...",disabled:u}),s.jsx(Ie,{type:"submit",variant:u?"disabled":"default",children:u?"Processing...":"Process JSON"})]})]}),s.jsx(HC,{children:s.jsx(b,{colour:"mediumGrey",italic:!0,children:"or"})}),s.jsxs(vd,{children:[s.jsx(b,{as:"h3",colour:"charcoal",mb:"small",children:"Upload JSON File"}),s.jsxs(BC,{children:[s.jsx(YC,{type:"file",id:"json-file-upload",accept:".json,application/json",onChange:A,disabled:u}),s.jsx(qC,{htmlFor:"json-file-upload",$disabled:u,children:u?"Processing...":"Choose JSON File"})]}),s.jsx(b,{as:"p",center:!0,colour:"mutedGrey",fontSize:"small",mt:"tiny",children:"Only JSON files are accepted. File should contain an array of coaster objects."})]}),d.showDuplicateResolver&&d.duplicates.length>0&&s.jsx(Id,{duplicates:d.duplicates,onResolve:g,onCancel:p}),d.error&&s.jsxs(dl,{variant:"error",role:"alert","aria-live":"assertive",children:[s.jsx(b,{as:"span",bold:!0,colour:"errorText",fontSize:"small",children:"ERROR:"}),s.jsx(b,{as:"span",colour:"errorText",fontSize:"small",children:d.error})]}),d.success&&s.jsxs(dl,{variant:"success",role:"status","aria-live":"polite",children:[s.jsx(b,{as:"span",bold:!0,colour:"successGreen",fontSize:"small",children:"SUCCESS:"}),s.jsx(b,{as:"span",colour:"successGreen",fontSize:"small",children:d.success})]})]}),d.showPreRankingQuestion&&s.jsx(Jy,{coasterCount:d.pendingCoasters.length,existingCoasterCount:v,filename:d.pendingFilename,hasExistingRankedData:l?.rankingMetadata?.isRanked||!1,onAnswer:x,onCancel:S})]})}const XC=(l,r,u,c,d,m)=>jS(r,u,c,m,d);function VC(l){const{coasterA:r,coasterB:u,chosenWinner:c,uploadedData:d,comparisonResults:m,remainingComparisons:h}=l,v=[r,u],g=It(r,u),p={pair:v,chosenCoaster:c,comparisonKey:g},x=c,S=v.find(N=>N.id!==c.id),C=new Map(m);C.set(g,x.id);let A=null,U=[];if(d.rankingMetadata?.rankedCoasters){const L=XC("positional",d.rankingMetadata.rankedCoasters,x.id,S.id,d.coasters,C),O={};d.coasters.forEach(le=>{O[le.id]=`${le.name} (${le.park})`});const B=d.rankingMetadata?.completedComparisons||new Set,K=new Set(B);K.add(g);const j=d.coasters.find(le=>le.isCurrentlyRanking);let V=L,W=d.coasters;if(j&&(x.id===j.id||S.id===j.id)){const le=L.includes(j.id);let be=!1;if(le?be=!0:be=RS(j,L,C,W),be){le?V=L:V=wS(j,L,C,W).newRanking;const Ae=d.coasters.filter(R=>!R.isPreRanked&&!V.includes(R.id)&&R.id!==j.id),Ce=V.map(R=>d.coasters.find(F=>F.id===R)).filter(R=>R!==void 0),dt=Ce.length>0?Math.ceil(Math.log2(Ce.length+1)):0,re=Ce.filter(R=>{const F=j.id<R.id?`${j.id}-${R.id}`:`${R.id}-${j.id}`;return C.has(F)}).length>=dt||Ce.length===0;if(W=d.coasters.map(R=>R.id===j.id?le?{...R,isCurrentlyRanking:!1,rankPosition:V.indexOf(R.id)+1}:{...R,isCurrentlyRanking:!re,rankPosition:re?V.indexOf(R.id)+1:void 0}:R.isCurrentlyRanking?{...R,isCurrentlyRanking:!1}:re&&Ae.length>0&&R.id===Ae[0].id&&!V.includes(R.id)?{...R,isCurrentlyRanking:!0}:V.includes(R.id)?{...R,rankPosition:V.indexOf(R.id)+1}:R),A=ss(W,V,K,C),Ae.length===0){const R=W.sort((ee,fe)=>(ee.rankPosition||0)-(fe.rankPosition||0));return{updatedData:{...d,coasters:W.map(ee=>({...ee,isCurrentlyRanking:!1,isNewCoaster:!1})),rankingMetadata:{...d.rankingMetadata,completedComparisons:K,rankedCoasters:V,isRanked:!0}},updatedComparisonResults:C,nextComparisons:[],isRankingComplete:!0,rankedCoasters:R,lastComparison:p}}}else V=L,A=ss(W,V,K,C)}else A=ss(W,V,K,C);const Z={...d,coasters:W,rankingMetadata:{...d.rankingMetadata,completedComparisons:K,rankedCoasters:V,isRanked:!1}};let ce;if(A&&A.length>0?ce=A:ce=h.slice(1),ce.length===0){Z.rankingMetadata?.rankedCoasters&&(U=Ad(Z.coasters,Z.rankingMetadata.rankedCoasters).sort((re,R)=>(re.rankPosition||0)-(R.rankPosition||0)));const be=Ad(d.coasters,Z.rankingMetadata?.rankedCoasters||[]).sort((dt,ft)=>(dt.rankPosition||0)-(ft.rankPosition||0)),Ae={completedComparisons:new Set,rankedCoasters:d.rankingMetadata?.rankedCoasters||[],isRanked:!0};return{updatedData:{...d,coasters:be,rankingMetadata:Ae},updatedComparisonResults:C,nextComparisons:[],isRankingComplete:!0,rankedCoasters:U,lastComparison:p}}return{updatedData:Z,updatedComparisonResults:C,nextComparisons:ce,isRankingComplete:!1,rankedCoasters:[],lastComparison:p}}return{updatedData:d,updatedComparisonResults:C,nextComparisons:h.slice(1),isRankingComplete:!1,rankedCoasters:[],lastComparison:p}}function ZC(l){const{uploadedData:r}=l;return window.confirm("Are you sure you want to reset all rankings? This will permanently delete all your ranking progress and you will need to start over from the beginning.")?r?{updatedData:{...r,coasters:r.coasters.map(d=>({...d,rankPosition:void 0,isCurrentlyRanking:!1,isNewCoaster:!0})),rankingMetadata:{completedComparisons:new Set,rankedCoasters:[],isRanked:!1}},confirmed:!0}:{updatedData:null,confirmed:!0}:{updatedData:r,confirmed:!1}}function KC(l){const{lastComparison:r,uploadedData:u,comparisonCount:c,remainingComparisons:d}=l;if(!r||!u)return{updatedData:u,updatedComparisonCount:c,updatedRemainingComparisons:d,currentPair:d[0]||null,success:!1};const{pair:m,comparisonKey:h}=r,v=Math.max(0,c-1),g=u.rankingMetadata?.completedComparisons||new Set,p=new Set(g);p.delete(h);const x=[m,...d],S=m;return{updatedData:{...u,rankingMetadata:{completedComparisons:p,rankedCoasters:u.rankingMetadata?.rankedCoasters||u.coasters.map(A=>A.id),isRanked:!1}},updatedComparisonCount:v,updatedRemainingComparisons:x,currentPair:S,success:!0}}const JC=({coasters:l,rankedCoasters:r})=>({type:"positional",reason:"Sequential binary search insertion strategy for efficient ranking"}),FC=(l,r)=>{const{coasters:u,rankedCoasters:c,completedComparisons:d,comparisonResults:m}=r;switch(l.type){case"full":return AS(u,d);case"positional":return ss(u,c,d,m);default:throw new Error(`Unknown comparison strategy: ${l.type}`)}},WC=l=>{const r=JC(l),u=FC(r,l);return{strategy:r,comparisons:u}},PC=({comparisons:l,totalPossibleComparisons:r,isRankingComplete:u,rankedCoasters:c})=>({currentPair:l[0]||null,remainingComparisons:l,totalComparisons:r,comparisonCount:0,lastComparison:null,isRankingComplete:u,rankedCoasters:u?c:[]}),IC=l=>Math.floor(l*(l-1)/2),ej=(l,r,u)=>l.length===0&&r===u,tj=(l,r)=>({isRankingComplete:l,rankedCoasters:l?r:[]}),nj=({uploadedData:l,comparisonResults:r})=>{const u=$S(l.coasters),c=Ad(u.coasters,u.rankedCoasters),m=u.coasters.some(A=>A.isCurrentlyRanking)?new Set:l.rankingMetadata?.completedComparisons||new Set,h={coasters:c,rankedCoasters:u.rankedCoasters,completedComparisons:m,comparisonResults:r},{comparisons:v}=WC(h),g=IC(l.coasters.length),p=ej(v,u.rankedCoasters.length,l.coasters.length),{isRankingComplete:x,rankedCoasters:S}=tj(p,c),C={...l,coasters:c,rankingMetadata:{...l.rankingMetadata,rankedCoasters:u.rankedCoasters,completedComparisons:m,isRanked:l.rankingMetadata?.isRanked||!1}};return{comparisons:v,coastersWithPositions:c,totalPossibleComparisons:g,completedComparisons:m,updatedData:C,isRankingComplete:x,rankedCoasters:S}},aj=T.form`
  display: flex;
  flex-direction: column;
  gap: ${Y};
  margin-bottom: ${J};

  @media (min-width: ${ue}) {
    margin-bottom: ${se};
  }
`;T(b).withConfig({shouldForwardProp:l=>!["colour","mb"].includes(l)})`
  border-bottom: ${ze} solid ${Fe};
  padding-bottom: ${P};
`;const Fg=T.div`
  display: grid;
  gap: ${Y};
  margin-bottom: ${Y};
  grid-template-columns: 1fr;

  > div {
    margin-bottom: 0;
  }

  @media (min-width: ${ue}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  @media (min-width: ${ml}) {
    grid-template-columns: repeat(2, 1fr);
  }
`,ll=T.div`
  display: flex;
  flex-direction: column;
  gap: ${P};
  margin-bottom: ${Y};
`,l0=cl`
  border: ${ze} solid ${Fe};
  border-radius: ${xe};
  background-color: ${ke};
  box-sizing: border-box;
  min-height: ${Bt};
  width: 100%;
  padding: ${P} ${Y};
  font-size: ${at};

  @media (min-width: ${gt}) {
    padding: ${Y};
  }

  @media (min-width: ${Ze}) {
    font-size: ${wt};
  }

  &:focus {
    outline: none;
    border-color: ${ye};
    box-shadow: 0 0 0 ${Ne} ${bn};
  }

  &:required {
    border-left: ${xe} solid ${ye};
  }
`,pr=T.input`
  ${l0}

  &::placeholder {
    color: ${Ts};
  }
`,Wg=T.select`
  ${l0}
  cursor: pointer;
`;function lj(){const{uploadedData:l,setUploadedData:r}=Ua(),[u,c]=z.useState(null),[d,m]=z.useState(null),[h,v]=z.useState([]),[g,p]=z.useState(null),[x,S]=z.useState(!1),[C,A]=z.useState({name:"",park:"",manufacturer:"",model:"",material:"",thrillLevel:"",country:""}),U=V=>{const{name:W,value:Z}=V.target;A(ce=>({...ce,[W]:Z}))},N=()=>Math.random().toString(36).substr(2,9),L=V=>{const Z={coasters:[...l?.coasters||[],V],uploadedAt:l?.uploadedAt||new Date,filename:l?.filename||"manual-entry",rankingMetadata:l?.rankingMetadata||{completedComparisons:new Set,rankedCoasters:[],isRanked:!1}};r(Z),m(`Successfully added "${V.name}" to your collection!`),A({name:"",park:"",manufacturer:"",model:"",material:"",thrillLevel:"",country:""})},O=V=>{V.preventDefault(),c(null),m(null);const Z=["name","park","manufacturer"].filter(Ae=>!C[Ae]?.trim());if(Z.length>0){c(`Please fill in all required fields: ${Z.join(", ")}`);return}const ce={id:N(),name:Gt(C.name.trim(),"space","first-word",!1),park:Gt(C.park.trim(),"space","first-word",!1),manufacturer:Gt(C.manufacturer.trim(),"space","first-word",!1),model:C.model?.trim()?Gt(C.model.trim(),"space","first-word",!1):void 0,material:C.material?.trim()?Gt(C.material.trim(),"space","first-word",!1):void 0,thrillLevel:C.thrillLevel?.trim()?Gt(C.thrillLevel.trim(),"space","first-word",!1):void 0,country:Gt(C.country.trim(),"space","first-word",!1),isNewCoaster:!0},le=l?.coasters||[],be=Zy(le,[ce]);be.hasDuplicates?(v(be.duplicates),p(ce),S(!0)):L(ce)},B=V=>{if(!g)return;let Z=[...l?.coasters||[]];V.forEach((be,Ae)=>{const Ce=h[Ae];switch(be.action){case"keep-existing":break;case"keep-new":Z=Z.filter(dt=>dt.id!==Ce.existingCoaster.id),Z.push(g);break;case"keep-both":Z.push(g);break}});const ce=V.some(be=>be.action==="keep-new"||be.action==="keep-both");!ce&&V.length>0&&V[0].action==="keep-existing"||ce||Z.push(g);const le={coasters:Z,uploadedAt:l?.uploadedAt||new Date,filename:l?.filename||"manual-entry",rankingMetadata:l?.rankingMetadata||{completedComparisons:new Set,rankedCoasters:[],isRanked:!1}};r(le),m(`Successfully processed coaster: "${g.name}"!`),S(!1),v([]),p(null),A({name:"",park:"",manufacturer:"",model:"",material:"",thrillLevel:"",country:""})},K=()=>{S(!1),v([]),p(null),c("Upload cancelled due to potential duplicates.")},j=l?.coasters?.length||0;return s.jsxs(Et,{children:[s.jsx(zt,{children:"Add Coaster Manually"}),s.jsxs("section",{children:[j>0&&s.jsxs(s.Fragment,{children:[s.jsx(zr,{coasterCount:j}),s.jsx(b,{as:"h2",colour:"charcoal",fontSize:"medium",mb:"small",children:"Enter Coaster Details"})]}),j===0&&s.jsx($r,{as:"h2",children:"Enter Coaster Details"}),s.jsx(b,{as:"p",colour:"mediumGrey",mb:"small",children:"Add a single coaster to your collection by filling out the form below. You can add multiple coasters by submitting the form multiple times."}),s.jsxs("section",{children:[s.jsxs(aj,{onSubmit:O,children:[s.jsxs("div",{children:[s.jsxs(Fg,{children:[s.jsxs(ll,{children:[s.jsx(b,{as:"label",bold:!0,colour:"charcoal",fontSize:"small",htmlFor:"name",children:"Name *"}),s.jsx(pr,{type:"text",id:"name",name:"name",value:C.name||"",onChange:U,placeholder:"e.g. The Smiler",required:!0})]}),s.jsxs(ll,{children:[s.jsx(b,{as:"label",bold:!0,colour:"charcoal",fontSize:"small",htmlFor:"park",children:"Theme Park *"}),s.jsx(pr,{type:"text",id:"park",name:"park",value:C.park||"",onChange:U,placeholder:"e.g. Alton Towers",required:!0})]})]}),s.jsxs(Fg,{children:[s.jsxs(ll,{children:[s.jsx(b,{as:"label",bold:!0,colour:"charcoal",fontSize:"small",htmlFor:"manufacturer",children:"Manufacturer *"}),s.jsx(pr,{type:"text",id:"manufacturer",name:"manufacturer",value:C.manufacturer||"",onChange:U,placeholder:"e.g. Gerstlauer",required:!0})]}),s.jsxs(ll,{children:[s.jsx(b,{as:"label",bold:!0,colour:"charcoal",fontSize:"small",htmlFor:"model",children:"Model"}),s.jsx(pr,{type:"text",id:"model",name:"model",value:C.model||"",onChange:U,placeholder:"e.g. Euro-Fighter"})]})]}),s.jsxs(ll,{children:[s.jsx(b,{as:"label",bold:!0,colour:"charcoal",fontSize:"small",htmlFor:"material",children:"Material"}),s.jsxs(Wg,{id:"material",name:"material",value:C.material||"",onChange:U,children:[s.jsx("option",{value:"",children:"Select material..."}),s.jsx("option",{value:"Steel",children:"Steel"}),s.jsx("option",{value:"Wood",children:"Wood"}),s.jsx("option",{value:"Hybrid",children:"Hybrid"})]})]}),s.jsxs(ll,{children:[s.jsx(b,{as:"label",bold:!0,colour:"charcoal",fontSize:"small",htmlFor:"thrillLevel",children:"Thrill Level"}),s.jsxs(Wg,{id:"thrillLevel",name:"thrillLevel",value:C.thrillLevel||"",onChange:U,children:[s.jsx("option",{value:"",children:"Select thrill level..."}),s.jsx("option",{value:"Kiddie",children:"Kiddie"}),s.jsx("option",{value:"Family",children:"Family"}),s.jsx("option",{value:"Family Thrill",children:"Family Thrill"}),s.jsx("option",{value:"Thrill",children:"Thrill"})]})]}),s.jsxs(ll,{children:[s.jsx(b,{as:"label",bold:!0,colour:"charcoal",fontSize:"small",htmlFor:"country",children:"Country"}),s.jsx(pr,{type:"text",id:"country",name:"country",value:C.country||"",onChange:U,placeholder:"e.g. United Kingdom"})]})]}),s.jsx(Ie,{type:"submit",children:"Add Coaster to Collection"})]}),x&&h.length>0&&s.jsx(Id,{duplicates:h,onResolve:B,onCancel:K}),u&&s.jsxs(dl,{variant:"error",role:"alert","aria-live":"assertive",children:[s.jsx(b,{as:"span",bold:!0,colour:"errorText",fontSize:"small",children:"ERROR:"}),s.jsx(b,{as:"span",colour:"errorText",fontSize:"small",children:u})]}),d&&s.jsxs(dl,{variant:"success",role:"status","aria-live":"polite",children:[s.jsx(b,{as:"span",bold:!0,colour:"successGreen",fontSize:"small",children:"SUCCESS:"}),s.jsx(b,{as:"span",colour:"successGreen",fontSize:"small",children:d})]})]})]})]})}const ij=T.div`
  text-align: center;
  padding: ${J};

  @media (max-width: ${ue}) {
    padding: ${se};
  }
`,rj=T.div`
  margin-bottom: ${J};
`,oj=T.div`
  margin-bottom: ${J};
  padding: ${J};
  background-color: ${yn};
  border-radius: ${P};
  border: ${ze} solid ${Fe};
`,sj=T.h3`
  @media (max-width: ${ue}) {
    display: none;
  }
`,uj=T.button`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font-size: ${Ms};
  font-weight: bold;
  color: ${Dn};
  cursor: pointer;
  line-height: 1;
  min-height: auto;

  &:hover {
    color: ${ye};
  }

  &:focus {
    outline: 2px solid ${ye};
    outline-offset: 2px;
  }

  @media (min-width: ${ue}) {
    display: none;
  }
`,cj=T.span`
  transform: ${({$isOpen:l})=>l?"rotate(180deg)":"rotate(0deg)"};
  transition: transform 0.2s ease;

  &::after {
    content: '▼';
  }
`,dj=T.div`
  @media (max-width: ${ue}) {
    display: ${({$isOpen:l})=>l?"block":"none"};
  }
`,fj=T.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${J};
  margin-bottom: ${J};

  @media (max-width: ${ue}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: ${Ze}) {
    grid-template-columns: 1fr;
  }
`,ti=T.div`
  display: flex;
  flex-direction: column;
  gap: ${P};
`,ni=T.label`
  font-size: ${at};
  font-weight: bold;
  color: ${Dn};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`,ai=T.select`
  padding: ${Y};
  border: ${ze} solid ${Fe};
  border-radius: ${ze};
  background-color: ${ke};
  color: ${Dn};
  font-size: ${wt};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${gi};
  }

  &:focus {
    outline: none;
    border-color: ${Dn};
    box-shadow: 0 0 0 2px ${yt};
  }
`,mj=T.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${Y};
`,hj=T.div`
  margin-bottom: ${J};
  text-align: center;
`,pj=T.a`
  display: inline-block;
  margin-left: ${J};
  color: ${ye};
  font-size: ${at};
  text-decoration: underline;

  &:hover {
    color: ${tn};
  }

  &:focus {
    outline: 2px solid ${ye};
    outline-offset: 2px;
  }
`,gj=T.div`
  display: flex;
  gap: ${J};
  margin-bottom: ${J};
  flex-wrap: wrap;

  @media (max-width: ${Ze}) {
    flex-direction: column;
  }
`,yj=T.div`
  overflow-x: auto;
  margin-bottom: ${J};
  border: ${ze} solid ${Fe};
  border-radius: ${P};

  @media (max-width: ${ue}) {
    overflow-x: visible;
    border: none;
  }
`,vj=T.div`
  display: grid;
  grid-template-columns: ${({$hasRank:l})=>l?`minmax(80px, 0.5fr)
         minmax(200px, 2fr)
         minmax(150px, 1.5fr)
         minmax(150px, 1fr)
         minmax(120px, 1fr)
         minmax(100px, 1fr)
         minmax(100px, 1fr)`:`minmax(200px, 2fr)
         minmax(150px, 1.5fr)
         minmax(150px, 1fr)
         minmax(120px, 1fr)
         minmax(100px, 1fr)
         minmax(100px, 1fr)`};
  background-color: ${yn};
  border-bottom: ${ze} solid ${Fe};

  @media (max-width: ${ue}) {
    display: none;
  }
`,Ta=T.div`
  padding: ${J};
  font-weight: bold;
  color: ${Dn};
  font-size: ${at};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: ${ue}) {
    ${({$isHiddenOnTablet:l})=>l&&`
      display: none;
    `}
  }
`,bj=T.div`
  display: grid;
  grid-template-columns: ${({$hasRank:l})=>l?`minmax(80px, 0.5fr)
         minmax(200px, 2fr)
         minmax(150px, 1.5fr)
         minmax(150px, 1fr)
         minmax(120px, 1fr)
         minmax(100px, 1fr)
         minmax(100px, 1fr)`:`minmax(200px, 2fr)
         minmax(150px, 1.5fr)
         minmax(150px, 1fr)
         minmax(120px, 1fr)
         minmax(100px, 1fr)
         minmax(100px, 1fr)`};
  border-bottom: ${ze} solid ${Fe};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${yt};
  }

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: ${ue}) {
    display: block;
    border: ${ze} solid ${Fe};
    border-radius: ${Y};
    padding: ${Y};
    margin-bottom: ${Y};
    background-color: ${ke};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

    &:hover {
      background-color: ${ke};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transform: none;
    }

    &:last-child {
      border-bottom: ${ze} solid ${Fe};
    }
  }
`,xs=T.div`
  padding: ${J};
  color: ${gi};
  font-size: ${wt};
  align-self: center;

  @media (max-width: ${ue}) {
    padding: 0;
    margin-bottom: ${P};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${Y};
    align-items: start;

    &:last-child {
      margin-bottom: 0;
      margin-top: ${Y};
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`,gr=T(xs)`
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: ${ze};
  position: relative;

  &:hover {
    background-color: ${yt};
    color: ${Dn};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid ${ye};
    outline-offset: 2px;
    background-color: ${yt};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: ${vn};
    transform: translateY(0);
  }
  @media (max-width: ${ue}) {
    padding: 0;
    margin-bottom: ${P};
    border-radius: ${Y};
    background-color: transparent;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${Y};
    align-items: start;

    &:hover {
      background-color: transparent;
      transform: none;
      box-shadow: none;
    }

    &:last-child {
      margin-bottom: 0;
      margin-top: ${Y};
      background-color: transparent;
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`,il=T.span`
  display: none;

  @media (max-width: ${ue}) {
    display: block;
    font-size: ${at};
    font-weight: bold;
    color: ${Dn};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    justify-self: start;
    align-self: center;
  }
`,xj=T.div`
  @media (max-width: ${ue}) {
    font-size: ${wt};
    color: ${gi};
    justify-self: start;
    align-self: center;
  }
`,yr=T.div`
  @media (max-width: ${ue}) {
    font-size: ${wt};
    color: ${gi};
    justify-self: start;
    align-self: center;
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      color: ${ye};
    }
  }
`,Sj=T(xs)`
  @media (max-width: ${ue}) {
    padding: 0;
    margin-bottom: ${P};
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${Y};
    align-items: center;

    &:last-child {
      margin-bottom: 0;
      margin-top: ${Y};
      grid-template-columns: 1fr;
      justify-items: center;
    }
  }
`;function $j(){const{uploadedData:l,setUploadedData:r}=Ua(),[u,c]=z.useState(""),[d,m]=z.useState(!1),[h,v]=z.useState({park:"",manufacturer:"",model:"",material:"",thrillLevel:"",country:""}),g=z.useMemo(()=>l?.coasters||[],[l?.coasters]),p=z.useMemo(()=>{let j=[...g];return h.park&&(j=j.filter(W=>W.park.toLowerCase().includes(h.park.toLowerCase()))),h.manufacturer&&(j=j.filter(W=>W.manufacturer.toLowerCase().includes(h.manufacturer.toLowerCase()))),h.model&&(j=j.filter(W=>W.model?.toLowerCase().includes(h.model.toLowerCase()))),h.material&&(j=j.filter(W=>W.material?.toLowerCase().includes(h.material.toLowerCase()))),h.thrillLevel&&(j=j.filter(W=>W.thrillLevel?.toLowerCase().includes(h.thrillLevel.toLowerCase()))),h.country&&(j=j.filter(W=>W.country.toLowerCase().includes(h.country.toLowerCase()))),l?.rankingMetadata?.isRanked&&l?.rankingMetadata?.rankedCoasters&&j.sort((W,Z)=>{const ce=W.rankPosition||Number.MAX_SAFE_INTEGER,le=Z.rankPosition||Number.MAX_SAFE_INTEGER;return ce-le}),j},[g,h,l?.rankingMetadata]),x=z.useMemo(()=>({parks:[...new Set(g.map(j=>j.park))].sort(),manufacturers:[...new Set(g.map(j=>j.manufacturer))].sort(),models:[...new Set(g.map(j=>j.model).filter(Boolean))].sort(),materials:[...new Set(g.map(j=>j.material).filter(Boolean))].sort(),thrillLevels:[...new Set(g.map(j=>j.thrillLevel).filter(Boolean))].sort(),countries:[...new Set(g.map(j=>j.country))].sort()}),[g]),S=g.some(j=>j.model&&j.model.trim()!==""),C=g.some(j=>j.material&&j.material.trim()!==""),A=g.some(j=>j.thrillLevel&&j.thrillLevel.trim()!==""),U=(j,V)=>{v(W=>({...W,[j]:V}))},N=()=>{v({park:"",manufacturer:"",model:"",material:"",thrillLevel:"",country:""})},L=Object.values(h).some(j=>j!==""),O=(j,V)=>{V&&V.trim()&&v(W=>({...W,[j]:V}))},B=j=>{if(!l)return;const V=l.coasters.find(be=>be.id===j),W=V?V.name:"this coaster";if(!window.confirm(`Are you sure you want to remove "${W}" from your collection? This action cannot be undone.`))return;const ce=l.coasters.filter(be=>be.id!==j);let le=l.rankingMetadata;if(le&&le.rankedCoasters){const be=le.rankedCoasters.filter(Ae=>Ae!==j);le={...le,rankedCoasters:be,isRanked:be.length===ce.length&&ce.length>0,completedComparisons:new Set(Array.from(le.completedComparisons||[]).filter(Ae=>!Ae.includes(j)))}}r({...l,coasters:ce,rankingMetadata:le}),c(`${W} has been removed from your collection.`),setTimeout(()=>c(""),3e3)},K=()=>{if(!l||g.length===0)return;const j=g.length;window.confirm(`Are you sure you want to remove all ${j} coaster${j===1?"":"s"} from your collection? This action cannot be undone.`)&&(r(null),c(`All ${j} coaster${j===1?"":"s"} have been removed from your collection.`),setTimeout(()=>c(""),3e3))};return g.length===0?s.jsxs(Et,{children:[s.jsx(zt,{children:"Your Coasters"}),s.jsx("section",{children:s.jsxs(ij,{children:[s.jsx(b,{as:"h2",center:!0,colour:"darkGrey",mb:"medium",fontSize:"large",children:"No coasters yet"}),s.jsx(b,{as:"p",center:!0,colour:"mediumGrey",mb:"large",children:"You haven't uploaded any coasters yet. Use one of the upload methods to add some coasters to your collection."}),s.jsx(jt,{href:"/upload",variant:"button",children:"Go to upload page"})]})})]}):s.jsxs(Et,{children:[s.jsx(zt,{children:"Your Coasters"}),u&&s.jsx("div",{role:"status","aria-live":"polite",style:{position:"absolute",left:"-10000px",width:"1px",height:"1px",overflow:"hidden"},children:u}),s.jsxs("section",{children:[s.jsxs(rj,{children:[s.jsxs(b,{as:"p",colour:"mediumGrey",mb:"small",children:["You have ",s.jsx(b,{bold:!0,children:g.length})," coaster",g.length===1?"":"s"," in your collection.",p.length!==g.length&&s.jsxs(b,{colour:"darkGrey",children:[" ","(Showing ",p.length," after filtering)"]})]}),l?.uploadedAt&&s.jsxs(b,{as:"p",colour:"mutedGrey",fontSize:"small",italic:!0,children:["Last updated: ",l.uploadedAt.toLocaleDateString()]})]}),s.jsxs(oj,{children:[s.jsx(sj,{as:b,colour:"charcoal",fontSize:"medium",mb:"small",children:"Filter coasters"}),s.jsxs(uj,{onClick:()=>m(!d),"aria-expanded":d,"aria-label":`${d?"Hide":"Show"} filter options`,children:["Filter coasters",s.jsx(cj,{$isOpen:d})]}),s.jsxs(dj,{$isOpen:d,children:[s.jsxs(fj,{children:[s.jsxs(ti,{children:[s.jsx(ni,{children:"Park"}),s.jsxs(ai,{value:h.park,onChange:j=>U("park",j.target.value),children:[s.jsx("option",{value:"",children:"All Parks"}),x.parks.map(j=>s.jsx("option",{value:j,children:j},j))]})]}),s.jsxs(ti,{children:[s.jsx(ni,{children:"Manufacturer"}),s.jsxs(ai,{value:h.manufacturer,onChange:j=>U("manufacturer",j.target.value),children:[s.jsx("option",{value:"",children:"All Manufacturers"}),x.manufacturers.map(j=>s.jsx("option",{value:j,children:j},j))]})]}),s.jsxs(ti,{children:[s.jsx(ni,{children:"Country"}),s.jsxs(ai,{value:h.country,onChange:j=>U("country",j.target.value),children:[s.jsx("option",{value:"",children:"All Countries"}),x.countries.map(j=>s.jsx("option",{value:j,children:j},j))]})]}),S&&s.jsxs(ti,{children:[s.jsx(ni,{children:"Model"}),s.jsxs(ai,{value:h.model,onChange:j=>U("model",j.target.value),children:[s.jsx("option",{value:"",children:"All Models"}),x.models.map(j=>s.jsx("option",{value:j,children:j},j))]})]}),C&&s.jsxs(ti,{children:[s.jsx(ni,{children:"Material"}),s.jsxs(ai,{value:h.material,onChange:j=>U("material",j.target.value),children:[s.jsx("option",{value:"",children:"All Materials"}),x.materials.map(j=>s.jsx("option",{value:j,children:j},j))]})]}),A&&s.jsxs(ti,{children:[s.jsx(ni,{children:"Thrill Level"}),s.jsxs(ai,{value:h.thrillLevel,onChange:j=>U("thrillLevel",j.target.value),children:[s.jsx("option",{value:"",children:"All Thrill Levels"}),x.thrillLevels.map(j=>s.jsx("option",{value:j,children:j},j))]})]})]}),L&&s.jsx(mj,{children:s.jsx(Ie,{variant:"default",onClick:N,children:"Clear all filters"})})]})]}),s.jsxs(gj,{children:[s.jsx(Ie,{as:"a",href:"/upload",children:"Add more coasters"}),s.jsx(Ie,{as:"a",href:"/rank",children:"Start ranking"}),s.jsx(Ie,{variant:"destructive",onClick:K,"aria-label":`Remove all ${p.length} coaster${p.length===1?"":"s"} from collection`,children:"Remove all coasters"})]}),s.jsxs(hj,{children:[s.jsx(b,{as:"p",colour:"mediumGrey",fontSize:"small",italic:!0,children:"Tip: Click on any park, manufacturer, model, material, or thrill level to filter by that value. On smaller screens, each coaster is shown as a card for easier viewing."}),s.jsx(pj,{href:"#table-end",onKeyDown:j=>{j.key==="Enter"&&(j.preventDefault(),document.getElementById("table-end")?.focus())},children:"Skip table navigation"})]}),s.jsxs(yj,{role:"table","aria-label":"Coaster collection data",children:[s.jsxs(vj,{role:"row",$hasRank:l?.rankingMetadata?.isRanked,children:[l?.rankingMetadata?.isRanked&&s.jsx(Ta,{role:"columnheader",children:"Rank"}),s.jsx(Ta,{role:"columnheader",children:"Name"}),s.jsx(Ta,{role:"columnheader",children:"Park"}),s.jsx(Ta,{role:"columnheader",$isHiddenOnTablet:!0,children:"Manufacturer"}),S&&s.jsx(Ta,{role:"columnheader",$isHiddenOnTablet:!0,children:"Model"}),C&&s.jsx(Ta,{role:"columnheader",$isHiddenOnTablet:!0,children:"Material"}),A&&s.jsx(Ta,{role:"columnheader",$isHiddenOnTablet:!0,children:"Thrill Level"}),s.jsx(Ta,{role:"columnheader",children:"Actions"})]}),s.jsx("div",{role:"rowgroup",children:p.map(j=>s.jsxs(bj,{role:"row",$hasRank:l?.rankingMetadata?.isRanked,children:[l?.rankingMetadata?.isRanked&&s.jsxs(Sj,{role:"cell",children:[s.jsx(il,{children:"Rank"}),j.rankPosition&&s.jsxs(b,{bold:!0,colour:"charcoal",children:["#",j.rankPosition]})]}),s.jsxs(xs,{role:"cell",children:[s.jsx(il,{children:"Name"}),s.jsx(xj,{children:s.jsx(b,{bold:!0,colour:"charcoal",mb:"tiny",children:j.name})})]}),s.jsxs(gr,{role:"button",onClick:()=>O("park",j.park),onKeyDown:V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),O("park",j.park))},tabIndex:0,title:`Filter by park: ${j.park}`,"aria-label":`Filter by park: ${j.park}`,children:[s.jsx(il,{children:"Park"}),s.jsx(yr,{children:j.park})]}),s.jsxs(gr,{role:"button",$isHiddenOnTablet:!0,onClick:()=>O("manufacturer",j.manufacturer),onKeyDown:V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),O("manufacturer",j.manufacturer))},tabIndex:0,title:`Filter by manufacturer: ${j.manufacturer}`,"aria-label":`Filter by manufacturer: ${j.manufacturer}`,children:[s.jsx(il,{children:"Manufacturer"}),s.jsx(yr,{children:j.manufacturer})]}),S&&s.jsxs(gr,{role:"button",$isHiddenOnTablet:!0,onClick:()=>j.model&&O("model",j.model),onKeyDown:V=>{(V.key==="Enter"||V.key===" ")&&j.model&&(V.preventDefault(),O("model",j.model))},tabIndex:0,title:j.model?`Filter by model: ${j.model}`:void 0,"aria-label":j.model?`Filter by model: ${j.model}`:void 0,children:[s.jsx(il,{children:"Model"}),s.jsx(yr,{children:j.model})]}),C&&s.jsxs(gr,{role:"button",$isHiddenOnTablet:!0,onClick:()=>j.material&&O("material",j.material),onKeyDown:V=>{(V.key==="Enter"||V.key===" ")&&j.material&&(V.preventDefault(),O("material",j.material))},tabIndex:0,title:j.material?`Filter by material: ${j.material}`:void 0,"aria-label":j.material?`Filter by material: ${j.material}`:void 0,children:[s.jsx(il,{children:"Material"}),s.jsx(yr,{children:j.material})]}),A&&s.jsxs(gr,{role:"button",$isHiddenOnTablet:!0,onClick:()=>j.thrillLevel&&O("thrillLevel",j.thrillLevel),onKeyDown:V=>{(V.key==="Enter"||V.key===" ")&&j.thrillLevel&&(V.preventDefault(),O("thrillLevel",j.thrillLevel))},tabIndex:0,title:j.thrillLevel?`Filter by thrill level: ${j.thrillLevel}`:void 0,"aria-label":j.thrillLevel?`Filter by thrill level: ${j.thrillLevel}`:void 0,children:[s.jsx(il,{children:"Thrill Level"}),s.jsx(yr,{children:j.thrillLevel})]}),s.jsx(xs,{role:"cell",children:s.jsx(Ie,{variant:"destructive",onClick:()=>B(j.id),"aria-label":`Remove ${j.name} from collection`,children:"Remove"})})]},j.id))})]}),s.jsx("div",{id:"table-end",tabIndex:-1,children:s.jsxs(b,{as:"div",center:!0,colour:"mutedGrey",fontSize:"small",italic:!0,mb:"medium",mt:"medium",children:["Showing ",p.length," coaster",p.length===1?"":"s"]})})]})]})}const Cj=T.div`
  margin-top: ${At};
  padding: ${At};
  background: ${As};
  border-radius: ${P};
  border-left: ${xe} solid ${Na};
`,jj=T.div`
  margin: 0 0 ${Y};

  @media (min-width: ${ue}) {
    margin: ${J} 0;
  }
`,wj=T.div`
  text-align: center;
  padding: ${hn};
`,kj=T.div`
  margin-bottom: ${Ht};
`,Rj=T.div`
  margin: ${Ht} 0;

  ul {
    list-style-type: decimal;
    padding-left: ${Ht};
  }

  li {
    margin-bottom: ${aa};
    line-height: 1.4;
  }
`,Ej=T.div`
  margin-top: ${hn};
  padding: ${At};
  background: ${yt};
  border-radius: ${P};

  p {
    margin: 0;
  }
`,zj=T.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${hn} ${Ht};
  margin: ${hn} 0;
  background: ${hl};
  border: ${Ne} solid ${_a};
  border-radius: ${Y};

  @media (max-width: ${gt}) {
    padding: ${Ht} ${At};
    margin: ${Ht} 0;
  }

  @media (min-width: ${gt}) and (max-width: ${ut}) {
    padding: ${hn} ${At};
  }

  @media (min-width: ${ue}) {
    padding: ${Xy} ${hn};
    max-width: 600px;
    margin: ${hn} auto;
  }
`;function Aj(){const{uploadedData:l,setUploadedData:r}=Ua(),[u,c]=z.useState("individual"),[d,m]=z.useState("auto-ranking"),[h,v]=z.useState(null),[g,p]=z.useState([]),[x,S]=z.useState(!1),[C,A]=z.useState([]),[U,N]=z.useState(0),[L,O]=z.useState(new Map),[B,K]=z.useState(null),[j,V]=z.useState({attemptedMode:null,failed:!1}),W=z.useCallback(re=>{if(!l)return;const R=re.map((ee,fe)=>({...ee,id:`${fe+1}`.padStart(3,"0"),isNewCoaster:!1})),F={completedComparisons:new Set,rankedCoasters:R.map(ee=>ee.id),isRanked:!0};r({...l,coasters:R,rankingMetadata:F}),S(!0),A(re)},[l,r]),Z=z.useCallback(()=>{if(!l)return;const re=new Map;O(re),N(0),K(null),p([]);const R=nj({uploadedData:l,comparisonResults:re}),F=PC({comparisons:R.comparisons,totalPossibleComparisons:R.totalPossibleComparisons,isRankingComplete:R.isRankingComplete,rankedCoasters:R.rankedCoasters});p(F.remainingComparisons),v(F.currentPair),N(F.comparisonCount),K(F.lastComparison),S(F.isRankingComplete),A(F.rankedCoasters),r(R.updatedData)},[l,r]),ce=z.useCallback(re=>{V({attemptedMode:re,failed:!0}),c("individual"),m("individual-fallback"),Z()},[Z]),le=()=>{const re=ZC({uploadedData:l});re.confirmed&&(m("auto-ranking"),S(!1),v(null),p([]),A([]),K(null),O(new Map),N(0),V({attemptedMode:null,failed:!1}),re.updatedData&&r(re.updatedData))};z.useEffect(()=>{window.debugResetCoasterRanker=()=>{localStorage.removeItem("coaster-ranker-data"),r(null),O(new Map),N(0),v(null),p([]),S(!1),A([]),K(null),m("auto-ranking")}},[r]);const be=()=>{const re=KC({lastComparison:B,uploadedData:l,comparisonCount:U,remainingComparisons:g});re.success&&(N(re.updatedComparisonCount),p(re.updatedRemainingComparisons),v(re.currentPair),re.updatedData&&r(re.updatedData),K(null))};z.useEffect(()=>{if(l&&l.coasters.length>=2&&!x&&d==="auto-ranking"){if(l.rankingMetadata?.isRanked&&l.rankingMetadata?.rankedCoasters){const R=l.coasters.filter(ee=>ee.rankPosition!==void 0).sort((ee,fe)=>(ee.rankPosition||0)-(fe.rankPosition||0)),F=R.length>0?R:l.rankingMetadata.rankedCoasters.map(ee=>l.coasters.find(fe=>fe.id===ee)).filter(ee=>ee!==void 0);S(!0),A(F),m("complete");return}const re=CS(l.coasters);c(re),re==="individual"&&(m("individual-fallback"),Z())}},[l,x,d,Z]);const Ae=re=>{if(!h||!l)return;const R=VC({coasterA:h[0],coasterB:h[1],chosenWinner:re,uploadedData:l,comparisonResults:L,remainingComparisons:g});N(U+1),O(R.updatedComparisonResults),K(R.lastComparison),r(R.updatedData),R.isRankingComplete?(A(R.rankedCoasters),S(!0),v(null),p([])):R.nextComparisons&&R.nextComparisons.length>0?(v(R.nextComparisons[0]||null),p(R.nextComparisons.slice(1))):(v(null),p([]),S(!0),A(R.rankedCoasters))};if(!l)return s.jsxs(Et,{children:[s.jsx(zt,{children:"Rank Your Coasters"}),s.jsx(zj,{children:s.jsxs(b,{as:"p",children:["No coaster data uploaded yet. Please visit the"," ",s.jsx(jt,{href:"/upload",dark:!0,children:"Upload page"})," ","to upload your coaster experiences. You'll need at least 2 coasters to start ranking."]})})]});const{coasters:Ce,filename:dt,uploadedAt:ft}=l;return Ce.length>=2?(u==="park"||u==="model")&&d==="auto-ranking"?s.jsxs(Et,{children:[s.jsx(zt,{children:"Rank Your Coasters"}),s.jsx("section",{children:s.jsx(h$,{coasters:Ce,groupBy:u,onRankingComplete:W,onHierarchicalFallback:ce})})]}):s.jsxs(Et,{children:[s.jsx(zt,{children:"Rank Your Coasters"}),s.jsxs("section",{children:[j.failed&&s.jsxs(Cj,{children:[s.jsx(b,{as:"p",bold:!0,colour:"warningYellow",mb:"tiny",children:"Switched to Individual Ranking"}),s.jsxs(b,{as:"p",colour:"warningYellow",fontSize:"small",children:[j.attemptedMode==="park"?"Park-based":"Manufacturer & Model-based"," ","ranking didn't work well for your collection, so we've switched to comparing each coaster individually for the most accurate results."]})]}),s.jsx(jj,{children:x?s.jsx(O$,{rankedCoasters:C,onRankAgain:le}):h?s.jsxs(s.Fragment,{children:[s.jsx(Ky,{totalCoasters:Ce.length,rankedCoasters:C.length,showCoastersLeft:!0,showProgressBar:!0}),s.jsx(Os,{coaster1:h[0],coaster2:h[1],onChoose1:()=>Ae(h[0]),onChoose2:()=>Ae(h[1])}),s.jsx(Xg,{onUndo:be,onReset:le,canUndo:!!B})]}):s.jsxs(wj,{children:[s.jsx(b,{as:"p",children:"Preparing comparisons..."}),s.jsx(Xg,{onReset:le})]})})]})]}):s.jsxs(Et,{children:[s.jsx(zt,{children:"Rank Your Coasters"}),s.jsxs("section",{children:[s.jsx("h2",{children:"Your Coaster Collection"}),s.jsxs(kj,{"aria-label":"Upload summary",children:[s.jsxs(b,{as:"p",children:[s.jsx(b,{bold:!0,children:"File:"})," ",dt]}),s.jsxs(b,{as:"p",children:[s.jsx(b,{bold:!0,children:"Uploaded:"})," ",ft.toLocaleDateString()," at"," ",ft.toLocaleTimeString()]}),s.jsxs(b,{as:"p",children:[s.jsx(b,{bold:!0,children:"Total Coasters:"})," ",Ce.length]})]}),s.jsx("h3",{children:"Coasters Ready for Ranking"}),s.jsx(Rj,{role:"region","aria-label":"Coaster list",children:s.jsxs("ul",{children:[Ce.slice(0,10).map((re,R)=>s.jsxs("li",{children:[s.jsx(b,{bold:!0,children:re.name})," at ",re.park,zd(re.country),s.jsxs(b,{as:"span","aria-label":`Manufacturer: ${re.manufacturer}, Model: ${re.model}, Material: ${re.material}`,children:[" ","- ",re.manufacturer," ",re.model," (",re.material,")"]})]},re.id)),Ce.length>10&&s.jsx("li",{children:s.jsxs(b,{italic:!0,children:["...and ",Ce.length-10," more coaster",Ce.length-10===1?"":"s"]})})]})}),Ce.length>0&&s.jsx(Ej,{children:Ce.length>=2?s.jsxs(b,{as:"p",colour:"mediumGrey",italic:!0,children:["Ranking functionality is available! You can start ranking your"," ",Ce.length," coasters."]}):s.jsx(b,{as:"p",colour:"mediumGrey",italic:!0,children:"Upload at least one more coaster to start ranking. You need a minimum of 2 coasters to compare and rank."})})]})]})}const i0=document.getElementById("root");if(!i0)throw new Error("Failed to find the root element");const Tj=Lb.createRoot(i0);Tj.render(s.jsx(ul.StrictMode,{children:s.jsx(j$,{children:s.jsxs(Px,{basename:"/coaster-ranker",children:[s.jsx(L$,{}),s.jsx(x$,{}),s.jsx("main",{id:"main-content",children:s.jsxs(zx,{children:[s.jsx(Cn,{path:"/",element:s.jsx(fC,{})}),s.jsx(Cn,{path:"/accessibility",element:s.jsx(q$,{})}),s.jsx(Cn,{path:"/download",element:s.jsx(nC,{})}),s.jsx(Cn,{path:"/privacy-policy",element:s.jsx(pC,{})}),s.jsx(Cn,{path:"/rank",element:s.jsx(Aj,{})}),s.jsx(Cn,{path:"/upload",element:s.jsx(vC,{})}),s.jsx(Cn,{path:"/upload-csv",element:s.jsx(NC,{})}),s.jsx(Cn,{path:"/upload-json",element:s.jsx(QC,{})}),s.jsx(Cn,{path:"/upload-manual",element:s.jsx(lj,{})}),s.jsx(Cn,{path:"/view-coasters",element:s.jsx($j,{})})]})}),s.jsx(IS,{})]})})}));
