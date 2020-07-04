var rough=function(){"use strict";function t(t,e,s){if(t&&t.length){const[n,o]=e,a=Math.PI/180*s,r=Math.cos(a),h=Math.sin(a);t.forEach(t=>{const[e,s]=t;t[0]=(e-n)*r-(s-o)*h+n,t[1]=(e-n)*h+(s-o)*r+o})}}function e(t){const e=t[0],s=t[1];return Math.sqrt(Math.pow(e[0]-s[0],2)+Math.pow(e[1]-s[1],2))}function s(t,e,s,n){const o=e[1]-t[1],a=t[0]-e[0],r=o*t[0]+a*t[1],h=n[1]-s[1],i=s[0]-n[0],c=h*s[0]+i*s[1],l=o*i-h*a;return l?[(i*r-a*c)/l,(o*c-h*r)/l]:null}function n(t,e,s){const n=t.length;if(n<3)return!1;const h=[Number.MAX_SAFE_INTEGER,s],i=[e,s];let c=0;for(let e=0;e<n;e++){const s=t[e],l=t[(e+1)%n];if(r(s,l,i,h)){if(0===a(s,i,l))return o(s,i,l);c++}}return c%2==1}function o(t,e,s){return e[0]<=Math.max(t[0],s[0])&&e[0]>=Math.min(t[0],s[0])&&e[1]<=Math.max(t[1],s[1])&&e[1]>=Math.min(t[1],s[1])}function a(t,e,s){const n=(e[1]-t[1])*(s[0]-e[0])-(e[0]-t[0])*(s[1]-e[1]);return 0===n?0:n>0?1:2}function r(t,e,s,n){const r=a(t,e,s),h=a(t,e,n),i=a(s,n,t),c=a(s,n,e);return r!==h&&i!==c||(!(0!==r||!o(t,s,e))||(!(0!==h||!o(t,n,e))||(!(0!==i||!o(s,t,n))||!(0!==c||!o(s,e,n)))))}function h(e,s){const n=[0,0],o=Math.round(s.hachureAngle+90);o&&t(e,n,o);const a=function(t,e){const s=[...t];s[0].join(",")!==s[s.length-1].join(",")&&s.push([s[0][0],s[0][1]]);const n=[];if(s&&s.length>2){let t=e.hachureGap;t<0&&(t=4*e.strokeWidth),t=Math.max(t,.1);const o=[];for(let t=0;t<s.length-1;t++){const e=s[t],n=s[t+1];if(e[1]!==n[1]){const t=Math.min(e[1],n[1]);o.push({ymin:t,ymax:Math.max(e[1],n[1]),x:t===e[1]?e[0]:n[0],islope:(n[0]-e[0])/(n[1]-e[1])})}}if(o.sort((t,e)=>t.ymin<e.ymin?-1:t.ymin>e.ymin?1:t.x<e.x?-1:t.x>e.x?1:t.ymax===e.ymax?0:(t.ymax-e.ymax)/Math.abs(t.ymax-e.ymax)),!o.length)return n;let a=[],r=o[0].ymin;for(;a.length||o.length;){if(o.length){let t=-1;for(let e=0;e<o.length&&!(o[e].ymin>r);e++)t=e;o.splice(0,t+1).forEach(t=>{a.push({s:r,edge:t})})}if(a=a.filter(t=>!(t.edge.ymax<=r)),a.sort((t,e)=>t.edge.x===e.edge.x?0:(t.edge.x-e.edge.x)/Math.abs(t.edge.x-e.edge.x)),a.length>1)for(let t=0;t<a.length;t+=2){const e=t+1;if(e>=a.length)break;const s=a[t].edge,o=a[e].edge;n.push([[Math.round(s.x),r],[Math.round(o.x),r]])}r+=t,a.forEach(e=>{e.edge.x=e.edge.x+t*e.edge.islope})}}return n}(e,s);return o&&(t(e,n,-o),function(e,s,n){const o=[];e.forEach(t=>o.push(...t)),t(o,s,n)}(a,n,-o)),a}class i{constructor(t){this.helper=t}fillPolygon(t,e){return this._fillPolygon(t,e)}_fillPolygon(t,e,s=!1){let n=h(t,e);if(s){const e=this.connectingLines(t,n);n=n.concat(e)}return{type:"fillSketch",ops:this.renderLines(n,e)}}renderLines(t,e){const s=[];for(const n of t)s.push(...this.helper.doubleLineOps(n[0][0],n[0][1],n[1][0],n[1][1],e));return s}connectingLines(t,s){const n=[];if(s.length>1)for(let o=1;o<s.length;o++){const a=s[o-1];if(e(a)<3)continue;const r=[s[o][0],a[1]];if(e(r)>3){const e=this.splitOnIntersections(t,r);n.push(...e)}}return n}midPointInPolygon(t,e){return n(t,(e[0][0]+e[1][0])/2,(e[0][1]+e[1][1])/2)}splitOnIntersections(t,o){const a=Math.max(5,.1*e(o)),h=[];for(let n=0;n<t.length;n++){const i=t[n],c=t[(n+1)%t.length];if(r(i,c,...o)){const t=s(i,c,o[0],o[1]);if(t){const s=e([t,o[0]]),n=e([t,o[1]]);s>a&&n>a&&h.push({point:t,distance:s})}}}if(h.length>1){const e=h.sort((t,e)=>t.distance-e.distance).map(t=>t.point);if(n(t,...o[0])||e.shift(),n(t,...o[1])||e.pop(),e.length<=1)return this.midPointInPolygon(t,o)?[o]:[];const s=[o[0],...e,o[1]],a=[];for(let e=0;e<s.length-1;e+=2){const n=[s[e],s[e+1]];this.midPointInPolygon(t,n)&&a.push(n)}return a}return this.midPointInPolygon(t,o)?[o]:[]}}class c extends i{fillPolygon(t,e){return this._fillPolygon(t,e,!0)}}class l extends i{fillPolygon(t,e){const s=this._fillPolygon(t,e),n=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),o=this._fillPolygon(t,n);return s.ops=s.ops.concat(o.ops),s}}class u{constructor(t){this.helper=t}fillPolygon(t,e){const s=h(t,e=Object.assign({},e,{curveStepCount:4,hachureAngle:0,roughness:1}));return this.dotsOnLines(s,e)}dotsOnLines(t,s){const n=[];let o=s.hachureGap;o<0&&(o=4*s.strokeWidth),o=Math.max(o,.1);let a=s.fillWeight;a<0&&(a=s.strokeWidth/2);const r=o/4;for(const h of t){const t=e(h),i=t/o,c=Math.ceil(i)-1,l=t-c*o,u=(h[0][0]+h[1][0])/2-o/4,f=Math.min(h[0][1],h[1][1]);for(let t=0;t<c;t++){const e=f+l+t*o,h=this.helper.randOffsetWithRange(u-r,u+r,s),i=this.helper.randOffsetWithRange(e-r,e+r,s),c=this.helper.ellipse(h,i,a,a,s);n.push(...c.ops)}}return{type:"fillSketch",ops:n}}}class f{constructor(t){this.helper=t}fillPolygon(t,e){const s=h(t,e);return{type:"fillSketch",ops:this.dashedLine(s,e)}}dashedLine(t,s){const n=s.dashOffset<0?s.hachureGap<0?4*s.strokeWidth:s.hachureGap:s.dashOffset,o=s.dashGap<0?s.hachureGap<0?4*s.strokeWidth:s.hachureGap:s.dashGap,a=[];return t.forEach(t=>{const r=e(t),h=Math.floor(r/(n+o)),i=(r+o-h*(n+o))/2;let c=t[0],l=t[1];c[0]>l[0]&&(c=t[1],l=t[0]);const u=Math.atan((l[1]-c[1])/(l[0]-c[0]));for(let t=0;t<h;t++){const e=t*(n+o),r=e+n,h=[c[0]+e*Math.cos(u)+i*Math.cos(u),c[1]+e*Math.sin(u)+i*Math.sin(u)],l=[c[0]+r*Math.cos(u)+i*Math.cos(u),c[1]+r*Math.sin(u)+i*Math.sin(u)];a.push(...this.helper.doubleLineOps(h[0],h[1],l[0],l[1],s))}}),a}}class p{constructor(t){this.helper=t}fillPolygon(t,e){const s=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,n=e.zigzagOffset<0?s:e.zigzagOffset,o=h(t,e=Object.assign({},e,{hachureGap:s+n}));return{type:"fillSketch",ops:this.zigzagLines(o,n,e)}}zigzagLines(t,s,n){const o=[];return t.forEach(t=>{const a=e(t),r=Math.round(a/(2*s));let h=t[0],i=t[1];h[0]>i[0]&&(h=t[1],i=t[0]);const c=Math.atan((i[1]-h[1])/(i[0]-h[0]));for(let t=0;t<r;t++){const e=2*t*s,a=2*(t+1)*s,r=Math.sqrt(2*Math.pow(s,2)),i=[h[0]+e*Math.cos(c),h[1]+e*Math.sin(c)],l=[h[0]+a*Math.cos(c),h[1]+a*Math.sin(c)],u=[i[0]+r*Math.cos(c+Math.PI/4),i[1]+r*Math.sin(c+Math.PI/4)];o.push(...this.helper.doubleLineOps(i[0],i[1],u[0],u[1],n),...this.helper.doubleLineOps(u[0],u[1],l[0],l[1],n))}}),o}}const d={};class g{constructor(t){this.seed=t}next(){return this.seed?(2**31-1&(this.seed=Math.imul(48271,this.seed)))/2**31:Math.random()}}const M={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:2,t:2,V:1,v:1,Z:0,z:0};function k(t,e){return t.type===e}function b(t){const e=[],s=function(t){const e=new Array;for(;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:0,text:RegExp.$1},t=t.substr(RegExp.$1.length);else{if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return[];e[e.length]={type:1,text:""+parseFloat(RegExp.$1)},t=t.substr(RegExp.$1.length)}return e[e.length]={type:2,text:""},e}(t);let n="BOD",o=0,a=s[o];for(;!k(a,2);){let r=0;const h=[];if("BOD"===n){if("M"!==a.text&&"m"!==a.text)return b("M0,0"+t);o++,r=M[a.text],n=a.text}else k(a,1)?r=M[n]:(o++,r=M[a.text],n=a.text);if(!(o+r<s.length))throw new Error("Path data ended short");for(let t=o;t<o+r;t++){const e=s[t];if(!k(e,1))throw new Error("Param not a number: "+n+","+e.text);h[h.length]=+e.text}if("number"!=typeof M[n])throw new Error("Bad segment: "+n);{const t={key:n,data:h};e.push(t),o+=r,a=s[o],"M"===n&&(n="L"),"m"===n&&(n="l")}}return e}function y(t){let e=0,s=0,n=0,o=0;const a=[];for(const{key:r,data:h}of t)switch(r){case"M":a.push({key:"M",data:[...h]}),[e,s]=h,[n,o]=h;break;case"m":e+=h[0],s+=h[1],a.push({key:"M",data:[e,s]}),n=e,o=s;break;case"L":a.push({key:"L",data:[...h]}),[e,s]=h;break;case"l":e+=h[0],s+=h[1],a.push({key:"L",data:[e,s]});break;case"C":a.push({key:"C",data:[...h]}),e=h[4],s=h[5];break;case"c":{const t=h.map((t,n)=>n%2?t+s:t+e);a.push({key:"C",data:t}),e=t[4],s=t[5];break}case"Q":a.push({key:"Q",data:[...h]}),e=h[2],s=h[3];break;case"q":{const t=h.map((t,n)=>n%2?t+s:t+e);a.push({key:"Q",data:t}),e=t[2],s=t[3];break}case"A":a.push({key:"A",data:[...h]}),e=h[5],s=h[6];break;case"a":e+=h[5],s+=h[6],a.push({key:"A",data:[h[0],h[1],h[2],h[3],h[4],e,s]});break;case"H":a.push({key:"H",data:[...h]}),e=h[0];break;case"h":e+=h[0],a.push({key:"H",data:[e]});break;case"V":a.push({key:"V",data:[...h]}),s=h[0];break;case"v":s+=h[0],a.push({key:"V",data:[s]});break;case"S":a.push({key:"S",data:[...h]}),e=h[2],s=h[3];break;case"s":{const t=h.map((t,n)=>n%2?t+s:t+e);a.push({key:"S",data:t}),e=t[2],s=t[3];break}case"T":a.push({key:"T",data:[...h]}),e=h[0],s=h[1];break;case"t":e+=h[0],s+=h[1],a.push({key:"T",data:[e,s]});break;case"Z":case"z":a.push({key:"Z",data:[]}),e=n,s=o}return a}function m(t){const e=[];let s="",n=0,o=0,a=0,r=0,h=0,i=0;for(const{key:c,data:l}of t){switch(c){case"M":e.push({key:"M",data:[...l]}),[n,o]=l,[a,r]=l;break;case"C":e.push({key:"C",data:[...l]}),n=l[4],o=l[5],h=l[2],i=l[3];break;case"L":e.push({key:"L",data:[...l]}),[n,o]=l;break;case"H":n=l[0],e.push({key:"L",data:[n,o]});break;case"V":o=l[0],e.push({key:"L",data:[n,o]});break;case"S":{let t=0,a=0;"C"===s||"S"===s?(t=n+(n-h),a=o+(o-i)):(t=n,a=o),e.push({key:"C",data:[t,a,...l]}),h=l[0],i=l[1],n=l[2],o=l[3];break}case"T":{const[t,a]=l;let r=0,c=0;"Q"===s||"T"===s?(r=n+(n-h),c=o+(o-i)):(r=n,c=o);const u=n+2*(r-n)/3,f=o+2*(c-o)/3,p=t+2*(r-t)/3,d=a+2*(c-a)/3;e.push({key:"C",data:[u,f,p,d,t,a]}),h=r,i=c,n=t,o=a;break}case"Q":{const[t,s,a,r]=l,c=n+2*(t-n)/3,u=o+2*(s-o)/3,f=a+2*(t-a)/3,p=r+2*(s-r)/3;e.push({key:"C",data:[c,u,f,p,a,r]}),h=t,i=s,n=a,o=r;break}case"A":{const t=Math.abs(l[0]),s=Math.abs(l[1]),a=l[2],r=l[3],h=l[4],i=l[5],c=l[6];if(0===t||0===s)e.push({key:"C",data:[n,o,i,c,i,c]}),n=i,o=c;else if(n!==i||o!==c){P(n,o,i,c,t,s,a,r,h).forEach((function(t){e.push({key:"C",data:t})})),n=i,o=c}break}case"Z":e.push({key:"Z",data:[]}),n=a,o=r}s=c}return e}function w(t,e,s){return[t*Math.cos(s)-e*Math.sin(s),t*Math.sin(s)+e*Math.cos(s)]}function P(t,e,s,n,o,a,r,h,i,c){const l=(u=r,Math.PI*u/180);var u;let f=[],p=0,d=0,g=0,M=0;if(c)[p,d,g,M]=c;else{[t,e]=w(t,e,-l),[s,n]=w(s,n,-l);const r=(t-s)/2,c=(e-n)/2;let u=r*r/(o*o)+c*c/(a*a);u>1&&(u=Math.sqrt(u),o*=u,a*=u);const f=o*o,k=a*a,b=f*k-f*c*c-k*r*r,y=f*c*c+k*r*r,m=(h===i?-1:1)*Math.sqrt(Math.abs(b/y));g=m*o*c/a+(t+s)/2,M=m*-a*r/o+(e+n)/2,p=Math.asin(parseFloat(((e-M)/a).toFixed(9))),d=Math.asin(parseFloat(((n-M)/a).toFixed(9))),t<g&&(p=Math.PI-p),s<g&&(d=Math.PI-d),p<0&&(p=2*Math.PI+p),d<0&&(d=2*Math.PI+d),i&&p>d&&(p-=2*Math.PI),!i&&d>p&&(d-=2*Math.PI)}let k=d-p;if(Math.abs(k)>120*Math.PI/180){const t=d,e=s,h=n;d=i&&d>p?p+120*Math.PI/180*1:p+120*Math.PI/180*-1,f=P(s=g+o*Math.cos(d),n=M+a*Math.sin(d),e,h,o,a,r,0,i,[d,t,g,M])}k=d-p;const b=Math.cos(p),y=Math.sin(p),m=Math.cos(d),x=Math.sin(d),v=Math.tan(k/4),O=4/3*o*v,S=4/3*a*v,L=[t,e],T=[t+O*y,e-S*b],I=[s+O*x,n-S*m],A=[s,n];if(T[0]=2*L[0]-T[0],T[1]=2*L[1]-T[1],c)return[T,I,A].concat(f);{f=[T,I,A].concat(f);const t=[];for(let e=0;e<f.length;e+=3){const s=w(f[e][0],f[e][1],l),n=w(f[e+1][0],f[e+1][1],l),o=w(f[e+2][0],f[e+2][1],l);t.push([s[0],s[1],n[0],n[1],o[0],o[1]])}return t}}const x={randOffset:function(t,e){return W(t,e)},randOffsetWithRange:function(t,e,s){return E(t,e,s)},ellipse:function(t,e,s,n,o){const a=T(s,n,o);return I(t,e,o,a).opset},doubleLineOps:function(t,e,s,n,o){return z(t,e,s,n,o,!0)}};function v(t,e,s,n,o){return{type:"path",ops:z(t,e,s,n,o)}}function O(t,e,s){const n=(t||[]).length;if(n>2){const o=[];for(let e=0;e<n-1;e++)o.push(...z(t[e][0],t[e][1],t[e+1][0],t[e+1][1],s));return e&&o.push(...z(t[n-1][0],t[n-1][1],t[0][0],t[0][1],s)),{type:"path",ops:o}}return 2===n?v(t[0][0],t[0][1],t[1][0],t[1][1],s):{type:"path",ops:[]}}function S(t,e,s,n,o){return function(t,e){return O(t,!0,e)}([[t,e],[t+s,e],[t+s,e+n],[t,e+n]],o)}function L(t,e){let s=$(t,1*(1+.2*e.roughness),e);if(!e.disableMultiStroke){const n=$(t,1.5*(1+.22*e.roughness),function(t){const e=Object.assign({},t);e.randomizer=void 0,t.seed&&(e.seed=t.seed+1);return e}(e));s=s.concat(n)}return{type:"path",ops:s}}function T(t,e,s){const n=Math.sqrt(2*Math.PI*Math.sqrt((Math.pow(t/2,2)+Math.pow(e/2,2))/2)),o=Math.max(s.curveStepCount,s.curveStepCount/Math.sqrt(200)*n),a=2*Math.PI/o;let r=Math.abs(t/2),h=Math.abs(e/2);const i=1-s.curveFitting;return r+=W(r*i,s),h+=W(h*i,s),{increment:a,rx:r,ry:h}}function I(t,e,s,n){const[o,a]=q(n.increment,t,e,n.rx,n.ry,1,n.increment*E(.1,E(.4,1,s),s),s);let r=G(o,null,s);if(!s.disableMultiStroke){const[o]=q(n.increment,t,e,n.rx,n.ry,1.5,0,s),a=G(o,null,s);r=r.concat(a)}return{estimatedPoints:a,opset:{type:"path",ops:r}}}function A(t,e,s,n,o,a,r,h,i){const c=t,l=e;let u=Math.abs(s/2),f=Math.abs(n/2);u+=W(.01*u,i),f+=W(.01*f,i);let p=o,d=a;for(;p<0;)p+=2*Math.PI,d+=2*Math.PI;d-p>2*Math.PI&&(p=0,d=2*Math.PI);const g=2*Math.PI/i.curveStepCount,M=Math.min(g/2,(d-p)/2),k=F(M,c,l,u,f,p,d,1,i);if(!i.disableMultiStroke){const t=F(M,c,l,u,f,p,d,1.5,i);k.push(...t)}return r&&(h?k.push(...z(c,l,c+u*Math.cos(p),l+f*Math.sin(p),i),...z(c,l,c+u*Math.cos(d),l+f*Math.sin(d),i)):k.push({op:"lineTo",data:[c,l]},{op:"lineTo",data:[c+u*Math.cos(p),l+f*Math.sin(p)]})),{type:"path",ops:k}}function _(t,e){const s=[];if(t.length){const n=e.maxRandomnessOffset||0,o=t.length;if(o>2){s.push({op:"move",data:[t[0][0]+W(n,e),t[0][1]+W(n,e)]});for(let a=1;a<o;a++)s.push({op:"lineTo",data:[t[a][0]+W(n,e),t[a][1]+W(n,e)]})}}return{type:"fillPath",ops:s}}function C(t,e){return function(t,e){let s=t.fillStyle||"hachure";if(!d[s])switch(s){case"zigzag":d[s]||(d[s]=new c(e));break;case"cross-hatch":d[s]||(d[s]=new l(e));break;case"dots":d[s]||(d[s]=new u(e));break;case"dashed":d[s]||(d[s]=new f(e));break;case"zigzag-line":d[s]||(d[s]=new p(e));break;case"hachure":default:s="hachure",d[s]||(d[s]=new i(e))}return d[s]}(e,x).fillPolygon(t,e)}function D(t){return t.randomizer||(t.randomizer=new g(t.seed||0)),t.randomizer.next()}function E(t,e,s,n=1){return s.roughness*n*(D(s)*(e-t)+t)}function W(t,e,s=1){return E(-t,t,e,s)}function z(t,e,s,n,o,a=!1){const r=a?o.disableMultiStrokeFill:o.disableMultiStroke,h=R(t,e,s,n,o,!0,!1);if(r)return h;const i=R(t,e,s,n,o,!0,!0);return h.concat(i)}function R(t,e,s,n,o,a,r){const h=Math.pow(t-s,2)+Math.pow(e-n,2),i=Math.sqrt(h);let c=1;c=i<200?1:i>500?.4:-.0016668*i+1.233334;let l=o.maxRandomnessOffset||0;l*l*100>h&&(l=i/10);const u=l/2,f=.2+.2*D(o);let p=o.bowing*o.maxRandomnessOffset*(n-e)/200,d=o.bowing*o.maxRandomnessOffset*(t-s)/200;p=W(p,o,c),d=W(d,o,c);const g=[],M=()=>W(u,o,c),k=()=>W(l,o,c);return a&&(r?g.push({op:"move",data:[t+M(),e+M()]}):g.push({op:"move",data:[t+W(l,o,c),e+W(l,o,c)]})),r?g.push({op:"bcurveTo",data:[p+t+(s-t)*f+M(),d+e+(n-e)*f+M(),p+t+2*(s-t)*f+M(),d+e+2*(n-e)*f+M(),s+M(),n+M()]}):g.push({op:"bcurveTo",data:[p+t+(s-t)*f+k(),d+e+(n-e)*f+k(),p+t+2*(s-t)*f+k(),d+e+2*(n-e)*f+k(),s+k(),n+k()]}),g}function $(t,e,s){const n=[];n.push([t[0][0]+W(e,s),t[0][1]+W(e,s)]),n.push([t[0][0]+W(e,s),t[0][1]+W(e,s)]);for(let o=1;o<t.length;o++)n.push([t[o][0]+W(e,s),t[o][1]+W(e,s)]),o===t.length-1&&n.push([t[o][0]+W(e,s),t[o][1]+W(e,s)]);return G(n,null,s)}function G(t,e,s){const n=t.length,o=[];if(n>3){const a=[],r=1-s.curveTightness;o.push({op:"move",data:[t[1][0],t[1][1]]});for(let e=1;e+2<n;e++){const s=t[e];a[0]=[s[0],s[1]],a[1]=[s[0]+(r*t[e+1][0]-r*t[e-1][0])/6,s[1]+(r*t[e+1][1]-r*t[e-1][1])/6],a[2]=[t[e+1][0]+(r*t[e][0]-r*t[e+2][0])/6,t[e+1][1]+(r*t[e][1]-r*t[e+2][1])/6],a[3]=[t[e+1][0],t[e+1][1]],o.push({op:"bcurveTo",data:[a[1][0],a[1][1],a[2][0],a[2][1],a[3][0],a[3][1]]})}if(e&&2===e.length){const t=s.maxRandomnessOffset;o.push({op:"lineTo",data:[e[0]+W(t,s),e[1]+W(t,s)]})}}else 3===n?(o.push({op:"move",data:[t[1][0],t[1][1]]}),o.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===n&&o.push(...z(t[0][0],t[0][1],t[1][0],t[1][1],s));return o}function q(t,e,s,n,o,a,r,h){const i=[],c=[],l=W(.5,h)-Math.PI/2;c.push([W(a,h)+e+.9*n*Math.cos(l-t),W(a,h)+s+.9*o*Math.sin(l-t)]);for(let r=l;r<2*Math.PI+l-.01;r+=t){const t=[W(a,h)+e+n*Math.cos(r),W(a,h)+s+o*Math.sin(r)];i.push(t),c.push(t)}return c.push([W(a,h)+e+n*Math.cos(l+2*Math.PI+.5*r),W(a,h)+s+o*Math.sin(l+2*Math.PI+.5*r)]),c.push([W(a,h)+e+.98*n*Math.cos(l+r),W(a,h)+s+.98*o*Math.sin(l+r)]),c.push([W(a,h)+e+.9*n*Math.cos(l+.5*r),W(a,h)+s+.9*o*Math.sin(l+.5*r)]),[c,i]}function F(t,e,s,n,o,a,r,h,i){const c=a+W(.1,i),l=[];l.push([W(h,i)+e+.9*n*Math.cos(c-t),W(h,i)+s+.9*o*Math.sin(c-t)]);for(let a=c;a<=r;a+=t)l.push([W(h,i)+e+n*Math.cos(a),W(h,i)+s+o*Math.sin(a)]);return l.push([e+n*Math.cos(r),s+o*Math.sin(r)]),l.push([e+n*Math.cos(r),s+o*Math.sin(r)]),G(l,null,i)}function j(t,e,s,n,o,a,r,h){const i=[],c=[h.maxRandomnessOffset||1,(h.maxRandomnessOffset||1)+.3];let l=[0,0];const u=h.disableMultiStroke?1:2;for(let f=0;f<u;f++)0===f?i.push({op:"move",data:[r[0],r[1]]}):i.push({op:"move",data:[r[0]+W(c[0],h),r[1]+W(c[0],h)]}),l=[o+W(c[f],h),a+W(c[f],h)],i.push({op:"bcurveTo",data:[t+W(c[f],h),e+W(c[f],h),s+W(c[f],h),n+W(c[f],h),l[0],l[1]]});return i}function N(t){return[...t]}function Z(t,e){return Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2)}function Q(t,e,s){const n=Z(e,s);if(0===n)return Z(t,e);let o=((t[0]-e[0])*(s[0]-e[0])+(t[1]-e[1])*(s[1]-e[1]))/n;return o=Math.max(0,Math.min(1,o)),Z(t,H(e,s,o))}function H(t,e,s){return[t[0]+(e[0]-t[0])*s,t[1]+(e[1]-t[1])*s]}function V(t,e,s,n){const o=n||[];if(function(t,e){const s=t[e+0],n=t[e+1],o=t[e+2],a=t[e+3];let r=3*n[0]-2*s[0]-a[0];r*=r;let h=3*n[1]-2*s[1]-a[1];h*=h;let i=3*o[0]-2*a[0]-s[0];i*=i;let c=3*o[1]-2*a[1]-s[1];return c*=c,r<i&&(r=i),h<c&&(h=c),r+h}(t,e)<s){const s=t[e+0];if(o.length){(a=o[o.length-1],r=s,Math.sqrt(Z(a,r)))>1&&o.push(s)}else o.push(s);o.push(t[e+3])}else{const n=.5,a=t[e+0],r=t[e+1],h=t[e+2],i=t[e+3],c=H(a,r,n),l=H(r,h,n),u=H(h,i,n),f=H(c,l,n),p=H(l,u,n),d=H(f,p,n);V([a,c,f,d],0,s,o),V([d,p,u,i],0,s,o)}var a,r;return o}function B(t,e){return X(t,0,t.length,e)}function X(t,e,s,n,o){const a=o||[],r=t[e],h=t[s-1];let i=0,c=1;for(let n=e+1;n<s-1;++n){const e=Q(t[n],r,h);e>i&&(i=e,c=n)}return Math.sqrt(i)>n?(X(t,e,c+1,n,a),X(t,c,s,n,a)):(a.length||a.push(r),a.push(h)),a}function J(t,e=.15,s){const n=[],o=(t.length-1)/3;for(let s=0;s<o;s++){V(t,3*s,e,n)}return s&&s>0?X(n,0,n.length,s):n}const K="none";class U{constructor(t){this.defaultOptions={maxRandomnessOffset:2,roughness:1,bowing:1,stroke:"#000",strokeWidth:1,curveTightness:0,curveFitting:.95,curveStepCount:9,fillStyle:"hachure",fillWeight:-1,hachureAngle:-41,hachureGap:-1,dashOffset:-1,dashGap:-1,zigzagOffset:-1,seed:0,combineNestedSvgPaths:!1,disableMultiStroke:!1,disableMultiStrokeFill:!1},this.config=t||{},this.config.options&&(this.defaultOptions=this._o(this.config.options))}static newSeed(){return Math.floor(Math.random()*2**31)}_o(t){return t?Object.assign({},this.defaultOptions,t):this.defaultOptions}_d(t,e,s){return{shape:t,sets:e||[],options:s||this.defaultOptions}}line(t,e,s,n,o){const a=this._o(o);return this._d("line",[v(t,e,s,n,a)],a)}rectangle(t,e,s,n,o){const a=this._o(o),r=[],h=S(t,e,s,n,a);if(a.fill){const o=[[t,e],[t+s,e],[t+s,e+n],[t,e+n]];"solid"===a.fillStyle?r.push(_(o,a)):r.push(C(o,a))}return a.stroke!==K&&r.push(h),this._d("rectangle",r,a)}ellipse(t,e,s,n,o){const a=this._o(o),r=[],h=T(s,n,a),i=I(t,e,a,h);if(a.fill)if("solid"===a.fillStyle){const s=I(t,e,a,h).opset;s.type="fillPath",r.push(s)}else r.push(C(i.estimatedPoints,a));return a.stroke!==K&&r.push(i.opset),this._d("ellipse",r,a)}circle(t,e,s,n){const o=this.ellipse(t,e,s,s,n);return o.shape="circle",o}linearPath(t,e){const s=this._o(e);return this._d("linearPath",[O(t,!1,s)],s)}arc(t,e,s,n,o,a,r=!1,h){const i=this._o(h),c=[],l=A(t,e,s,n,o,a,r,!0,i);if(r&&i.fill)if("solid"===i.fillStyle){const r=A(t,e,s,n,o,a,!0,!1,i);r.type="fillPath",c.push(r)}else c.push(function(t,e,s,n,o,a,r){const h=t,i=e;let c=Math.abs(s/2),l=Math.abs(n/2);c+=W(.01*c,r),l+=W(.01*l,r);let u=o,f=a;for(;u<0;)u+=2*Math.PI,f+=2*Math.PI;f-u>2*Math.PI&&(u=0,f=2*Math.PI);const p=(f-u)/r.curveStepCount,d=[];for(let t=u;t<=f;t+=p)d.push([h+c*Math.cos(t),i+l*Math.sin(t)]);return d.push([h+c*Math.cos(f),i+l*Math.sin(f)]),d.push([h,i]),C(d,r)}(t,e,s,n,o,a,i));return i.stroke!==K&&c.push(l),this._d("arc",c,i)}curve(t,e){const s=this._o(e),n=[],o=L(t,s);if(s.fill&&s.fill!==K&&t.length>=3){const e=J(function(t,e=0){const s=t.length;if(s<3)throw new Error("A curve must have at least three points.");const n=[];if(3===s)n.push(N(t[0]),N(t[1]),N(t[2]),N(t[2]));else{const s=[];s.push(t[0],t[0]);for(let e=1;e<t.length;e++)s.push(t[e]),e===t.length-1&&s.push(t[e]);const o=[],a=1-e;n.push(N(s[0]));for(let t=1;t+2<s.length;t++){const e=s[t];o[0]=[e[0],e[1]],o[1]=[e[0]+(a*s[t+1][0]-a*s[t-1][0])/6,e[1]+(a*s[t+1][1]-a*s[t-1][1])/6],o[2]=[s[t+1][0]+(a*s[t][0]-a*s[t+2][0])/6,s[t+1][1]+(a*s[t][1]-a*s[t+2][1])/6],o[3]=[s[t+1][0],s[t+1][1]],n.push(o[1],o[2],o[3])}}return n}(t),10,(1+s.roughness)/2);"solid"===s.fillStyle?n.push(_(e,s)):n.push(C(e,s))}return s.stroke!==K&&n.push(o),this._d("curve",n,s)}polygon(t,e){const s=this._o(e),n=[],o=O(t,!0,s);return s.fill&&("solid"===s.fillStyle?n.push(_(t,s)):n.push(C(t,s))),s.stroke!==K&&n.push(o),this._d("polygon",n,s)}path(t,e){const s=this._o(e),n=[];if(!t)return this._d("path",n,s);t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");const o=s.fill&&"transparent"!==s.fill&&s.fill!==K,a=s.stroke!==K,r=!!(s.simplification&&s.simplification<1),h=function(t,e,s){const n=m(y(b(t))),o=[];let a=[],r=[0,0],h=[];const i=()=>{h.length>=4&&a.push(...J(h,e)),h=[]},c=()=>{i(),a.length&&(o.push(a),a=[])};for(const{key:t,data:e}of n)switch(t){case"M":c(),r=[e[0],e[1]],a.push(r);break;case"L":i(),a.push([e[0],e[1]]);break;case"C":if(!h.length){const t=a.length?a[a.length-1]:r;h.push([t[0],t[1]])}h.push([e[0],e[1]]),h.push([e[2],e[3]]),h.push([e[4],e[5]]);break;case"Z":i(),a.push([r[0],r[1]])}if(c(),!s)return o;const l=[];for(const t of o){const e=B(t,s);e.length&&l.push(e)}return l}(t,1,r?4-4*s.simplification:(1+s.roughness)/2);if(o)if(s.combineNestedSvgPaths){const t=[];h.forEach(e=>t.push(...e)),"solid"===s.fillStyle?n.push(_(t,s)):n.push(C(t,s))}else h.forEach(t=>{"solid"===s.fillStyle?n.push(_(t,s)):n.push(C(t,s))});return a&&(r?h.forEach(t=>{n.push(O(t,!1,s))}):n.push(function(t,e){const s=m(y(b(t))),n=[];let o=[0,0],a=[0,0];for(const{key:t,data:r}of s)switch(t){case"M":{const t=1*(e.maxRandomnessOffset||0);n.push({op:"move",data:r.map(s=>s+W(t,e))}),a=[r[0],r[1]],o=[r[0],r[1]];break}case"L":n.push(...z(a[0],a[1],r[0],r[1],e)),a=[r[0],r[1]];break;case"C":{const[t,s,o,h,i,c]=r;n.push(...j(t,s,o,h,i,c,a,e)),a=[i,c];break}case"Z":n.push(...z(a[0],a[1],o[0],o[1],e)),a=[o[0],o[1]]}return{type:"path",ops:n}}(t,s))),this._d("path",n,s)}opsToPath(t){let e="";for(const s of t.ops){const t=s.data;switch(s.op){case"move":e+=`M${t[0]} ${t[1]} `;break;case"bcurveTo":e+=`C${t[0]} ${t[1]}, ${t[2]} ${t[3]}, ${t[4]} ${t[5]} `;break;case"lineTo":e+=`L${t[0]} ${t[1]} `}}return e.trim()}toPaths(t){const e=t.sets||[],s=t.options||this.defaultOptions,n=[];for(const t of e){let e=null;switch(t.type){case"path":e={d:this.opsToPath(t),stroke:s.stroke,strokeWidth:s.strokeWidth,fill:K};break;case"fillPath":e={d:this.opsToPath(t),stroke:K,strokeWidth:0,fill:s.fill||K};break;case"fillSketch":e=this.fillSketch(t,s)}e&&n.push(e)}return n}fillSketch(t,e){let s=e.fillWeight;return s<0&&(s=e.strokeWidth/2),{d:this.opsToPath(t),stroke:e.fill||K,strokeWidth:s,fill:K}}}class Y{constructor(t,e){this.canvas=t,this.ctx=this.canvas.getContext("2d"),this.gen=new U(e)}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),n=this.ctx;for(const o of e)switch(o.type){case"path":n.save(),n.strokeStyle="none"===s.stroke?"transparent":s.stroke,n.lineWidth=s.strokeWidth,s.strokeLineDash&&n.setLineDash(s.strokeLineDash),s.strokeLineDashOffset&&(n.lineDashOffset=s.strokeLineDashOffset),this._drawToContext(n,o),n.restore();break;case"fillPath":n.save(),n.fillStyle=s.fill||"";const e="curve"===t.shape||"polygon"===t.shape?"evenodd":"nonzero";this._drawToContext(n,o,e),n.restore();break;case"fillSketch":this.fillSketch(n,o,s)}}fillSketch(t,e,s){let n=s.fillWeight;n<0&&(n=s.strokeWidth/2),t.save(),s.fillLineDash&&t.setLineDash(s.fillLineDash),s.fillLineDashOffset&&(t.lineDashOffset=s.fillLineDashOffset),t.strokeStyle=s.fill||"",t.lineWidth=n,this._drawToContext(t,e),t.restore()}_drawToContext(t,e,s="nonzero"){t.beginPath();for(const s of e.ops){const e=s.data;switch(s.op){case"move":t.moveTo(e[0],e[1]);break;case"bcurveTo":t.bezierCurveTo(e[0],e[1],e[2],e[3],e[4],e[5]);break;case"lineTo":t.lineTo(e[0],e[1])}}"fillPath"===e.type?t.fill(s):t.stroke()}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}line(t,e,s,n,o){const a=this.gen.line(t,e,s,n,o);return this.draw(a),a}rectangle(t,e,s,n,o){const a=this.gen.rectangle(t,e,s,n,o);return this.draw(a),a}ellipse(t,e,s,n,o){const a=this.gen.ellipse(t,e,s,n,o);return this.draw(a),a}circle(t,e,s,n){const o=this.gen.circle(t,e,s,n);return this.draw(o),o}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s),s}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s),s}arc(t,e,s,n,o,a,r=!1,h){const i=this.gen.arc(t,e,s,n,o,a,r,h);return this.draw(i),i}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s),s}path(t,e){const s=this.gen.path(t,e);return this.draw(s),s}}const tt="http://www.w3.org/2000/svg";class et{constructor(t,e){this.svg=t,this.gen=new U(e)}draw(t){const e=t.sets||[],s=t.options||this.getDefaultOptions(),n=this.svg.ownerDocument||window.document,o=n.createElementNS(tt,"g");for(const a of e){let e=null;switch(a.type){case"path":e=n.createElementNS(tt,"path"),e.setAttribute("d",this.opsToPath(a)),e.setAttribute("stroke",s.stroke),e.setAttribute("stroke-width",s.strokeWidth+""),e.setAttribute("fill","none"),s.strokeLineDash&&e.setAttribute("stroke-dasharray",s.strokeLineDash.join(" ").trim()),s.strokeLineDashOffset&&e.setAttribute("stroke-dashoffset",""+s.strokeLineDashOffset);break;case"fillPath":e=n.createElementNS(tt,"path"),e.setAttribute("d",this.opsToPath(a)),e.setAttribute("stroke","none"),e.setAttribute("stroke-width","0"),e.setAttribute("fill",s.fill||""),"curve"!==t.shape&&"polygon"!==t.shape||e.setAttribute("fill-rule","evenodd");break;case"fillSketch":e=this.fillSketch(n,a,s)}e&&o.appendChild(e)}return o}fillSketch(t,e,s){let n=s.fillWeight;n<0&&(n=s.strokeWidth/2);const o=t.createElementNS(tt,"path");return o.setAttribute("d",this.opsToPath(e)),o.setAttribute("stroke",s.fill||""),o.setAttribute("stroke-width",n+""),o.setAttribute("fill","none"),s.fillLineDash&&o.setAttribute("stroke-dasharray",s.fillLineDash.join(" ").trim()),s.fillLineDashOffset&&o.setAttribute("stroke-dashoffset",""+s.fillLineDashOffset),o}get generator(){return this.gen}getDefaultOptions(){return this.gen.defaultOptions}opsToPath(t){return this.gen.opsToPath(t)}line(t,e,s,n,o){const a=this.gen.line(t,e,s,n,o);return this.draw(a)}rectangle(t,e,s,n,o){const a=this.gen.rectangle(t,e,s,n,o);return this.draw(a)}ellipse(t,e,s,n,o){const a=this.gen.ellipse(t,e,s,n,o);return this.draw(a)}circle(t,e,s,n){const o=this.gen.circle(t,e,s,n);return this.draw(o)}linearPath(t,e){const s=this.gen.linearPath(t,e);return this.draw(s)}polygon(t,e){const s=this.gen.polygon(t,e);return this.draw(s)}arc(t,e,s,n,o,a,r=!1,h){const i=this.gen.arc(t,e,s,n,o,a,r,h);return this.draw(i)}curve(t,e){const s=this.gen.curve(t,e);return this.draw(s)}path(t,e){const s=this.gen.path(t,e);return this.draw(s)}}return{canvas:(t,e)=>new Y(t,e),svg:(t,e)=>new et(t,e),generator:t=>new U(t),newSeed:()=>U.newSeed()}}();
