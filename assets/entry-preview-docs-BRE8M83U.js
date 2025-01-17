import{B as l}from"./entry-preview-DcSiYK6A.js";import{c as w,g as u,y as S}from"./index-u5I_DdWt.js";import{i as b}from"./tiny-invariant-CopsF_GD.js";import"./index-DrFu-skq.js";const{global:d}=__STORYBOOK_MODULE_GLOBAL__,{setDefaultProjectAnnotations:N,setProjectAnnotations:P}=__STORYBOOK_MODULE_PREVIEW_API__;var{window:v}=d;v.STORYBOOK_ENV="web-components";function c(e){if(!e)return!1;if(typeof e=="string")return!0;throw new Error('Provided component needs to be a string. e.g. component: "my-element"')}function f(e){if(!e)return!1;if(e.tags&&Array.isArray(e.tags)||e.modules&&Array.isArray(e.modules))return!0;throw new Error(`You need to setup valid meta data in your config.js via setCustomElements().
    See the readme of addon-docs for web components for more details.`)}function O(){return d.__STORYBOOK_CUSTOM_ELEMENTS__||d.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__}var{window:A,EventSource:D}=d,_;typeof module<"u"&&((_=module==null?void 0:module.hot)!=null&&_.decline)&&(module.hot.decline(),new D("__webpack_hmr").addEventListener("message",function(e){try{let{action:r}=JSON.parse(e.data);r==="built"&&A.location.reload()}catch{}}));const{logger:m}=__STORYBOOK_MODULE_CLIENT_LOGGER__,{useEffect:C,addons:h}=__STORYBOOK_MODULE_PREVIEW_API__;function E(e,r){var n,a;let t;switch(r){case"attributes":case"properties":t={name:((n=e.type)==null?void 0:n.text)||e.type};break;case"slots":t={name:"string"};break;default:t={name:"void"};break}return{name:e.name,required:!1,description:e.description,type:t,table:{category:r,type:{summary:((a=e.type)==null?void 0:a.text)||e.type},defaultValue:{summary:e.default!==void 0?e.default:e.defaultValue}}}}function M(e){let r=e.name.replace(/(-|_|:|\.|\s)+(.)?/g,(t,n,a)=>a?a.toUpperCase():"").replace(/^([A-Z])/,t=>t.toLowerCase());return r=`on${r.charAt(0).toUpperCase()+r.substr(1)}`,[{name:r,action:{name:e.name},table:{disable:!0}},E(e,"events")]}function o(e,r){return e&&e.filter(t=>t&&t.name).reduce((t,n)=>{if(n.kind==="method")return t;switch(r){case"events":M(n).forEach(a=>{b(a.name),t[a.name]=a});break;default:t[n.name]=E(n,r);break}return t},{})}var T=(e,r)=>{if(!c(e)||!f(r))return null;let t=r.tags.find(n=>n.name.toUpperCase()===e.toUpperCase());return t||m.warn(`Component not found in custom-elements.json: ${e}`),t},L=(e,r)=>{var n;if(!c(e)||!f(r))return null;let t;return(n=r==null?void 0:r.modules)==null||n.forEach(a=>{var s;(s=a==null?void 0:a.declarations)==null||s.forEach(i=>{i.tagName===e&&(t=i)})}),t||m.warn(`Component not found in custom-elements.json: ${e}`),t},y=(e,r)=>(r==null?void 0:r.version)==="experimental"?T(e,r):L(e,r),R=(e,r)=>{let t=y(e,r);return t&&{...o(t.members??[],"properties"),...o(t.properties??[],"properties"),...o(t.attributes??[],"attributes"),...o(t.events??[],"events"),...o(t.slots??[],"slots"),...o(t.cssProperties??[],"css custom properties"),...o(t.cssParts??[],"css shadow parts")}},I=e=>{let r=O();return R(e,r)},U=e=>{let r=y(e,O());return r&&r.description},Y=/<!--\?lit\$[0-9]+\$-->|<!--\??-->/g;function B(e){var n;let r=(n=e==null?void 0:e.parameters.docs)==null?void 0:n.source,t=e==null?void 0:e.parameters.__isArgsStory;return(r==null?void 0:r.type)===u.DYNAMIC?!1:!t||(r==null?void 0:r.code)||(r==null?void 0:r.type)===u.CODE}function k(e,r){var s,i;let t=e(),n=(i=(s=r==null?void 0:r.parameters.docs)==null?void 0:s.source)!=null&&i.excludeDecorators?r.originalStoryFn(r.args,r):t,a;if(C(()=>{let{id:p,unmappedArgs:g}=r;a&&h.getChannel().emit(S,{id:p,source:a,args:g})}),!B(r)){let p=window.document.createElement("div");n instanceof DocumentFragment?l(n.cloneNode(!0),p):l(n,p),a=p.innerHTML.replace(Y,"")}return t}var F=[k],G={docs:{extractArgTypes:I,extractComponentDescription:U,story:{inline:!0},source:{type:u.DYNAMIC,language:"html"}}},W=[w];export{W as argTypesEnhancers,F as decorators,G as parameters};
