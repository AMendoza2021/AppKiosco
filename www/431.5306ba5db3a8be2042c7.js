(self.webpackChunkChecador=self.webpackChunkChecador||[]).push([[431],{431:(t,e,i)=>{"use strict";i.r(e),i.d(e,{ion_virtual_scroll:()=>d});var s=i(3150),r=i(2377);const l="item",n="header",h="footer",o=(t,e)=>{const i=a(t,e);return i&&t.ownerDocument?t.ownerDocument.importNode(i.content,!0).children[0]:null},a=(t,e)=>{switch(e){case l:return t.querySelector("template:not([name])");case n:return t.querySelector("template[name=header]");case h:return t.querySelector("template[name=footer]")}},c=(t,e,i,s,r,o,a,c,d,g,u,p)=>{const m=[],f=p+u;for(let v=u;v<f;v++){const u=t[v];if(r){const e=r(u,v,t);null!=e&&m.push({i:g++,type:n,value:e,index:v,height:i?i(e,v):a,reads:i?0:2,visible:!!i})}if(m.push({i:g++,type:l,value:u,index:v,height:e?e(u,v):d,reads:e?0:2,visible:!!e}),o){const e=o(u,v,t);null!=e&&m.push({i:g++,type:h,value:e,index:v,height:s?s(e,v):c,reads:s?0:2,visible:!!s})}}return m},d=class{constructor(t){(0,s.r)(this,t),this.range={offset:0,length:0},this.viewportHeight=0,this.cells=[],this.virtualDom=[],this.isEnabled=!1,this.viewportOffset=0,this.currentScrollTop=0,this.indexDirty=0,this.lastItemLen=0,this.totalHeight=0,this.approxItemHeight=45,this.approxHeaderHeight=30,this.approxFooterHeight=30,this.onScroll=()=>{this.updateVirtualScroll()}}itemsChanged(){this.calcCells(),this.updateVirtualScroll()}componentWillLoad(){console.warn("[Deprecation Warning]: ion-virtual-scroll has been deprecated and will be removed in Ionic Framework v7.0. See https://ionicframework.com/docs/angular/virtual-scroll for migration steps.")}async connectedCallback(){const t=this.el.closest("ion-content");t?(this.scrollEl=await t.getScrollElement(),this.contentEl=t,this.calcCells(),this.updateState()):console.error("<ion-virtual-scroll> must be used inside an <ion-content>")}componentDidUpdate(){this.updateState()}disconnectedCallback(){this.scrollEl=void 0}onResize(){this.calcCells(),this.updateVirtualScroll()}positionForItem(t){return Promise.resolve(((t,e,i)=>{const s=e.find(e=>e.type===l&&e.index===t);return s?i[s.i]:-1})(t,this.cells,this.getHeightIndex()))}async checkRange(t,e=-1){if(!this.items)return;const i=-1===e?this.items.length-t:e,s=((t,e)=>0===e?0:e===(t.length>0?t[t.length-1].index:0)+1?t.length:t.findIndex(t=>t.index===e))(this.cells,t),r=c(this.items,this.itemHeight,this.headerHeight,this.footerHeight,this.headerFn,this.footerFn,this.approxHeaderHeight,this.approxFooterHeight,this.approxItemHeight,s,t,i);this.cells=((t,e,i)=>{if(0===i&&e.length>=t.length)return e;for(let s=0;s<e.length;s++)t[s+i]=e[s];return t})(this.cells,r,s),this.lastItemLen=this.items.length,this.indexDirty=Math.max(t-1,0),this.scheduleUpdate()}async checkEnd(){this.items&&this.checkRange(this.lastItemLen)}updateVirtualScroll(){this.isEnabled&&this.scrollEl&&(this.timerUpdate&&(clearTimeout(this.timerUpdate),this.timerUpdate=void 0),(0,s.f)(this.readVS.bind(this)),(0,s.c)(this.writeVS.bind(this)))}readVS(){const{contentEl:t,scrollEl:e,el:i}=this;let s=0,r=i;for(;r&&r!==t;)s+=r.offsetTop,r=r.offsetParent;this.viewportOffset=s,e&&(this.viewportHeight=e.offsetHeight,this.currentScrollTop=e.scrollTop)}writeVS(){const t=this.indexDirty,e=(l=this.currentScrollTop-this.viewportOffset,n=this.viewportHeight,{top:Math.max(l-100,0),bottom:l+n+100}),i=this.getHeightIndex(),r=((t,e,i)=>{const s=e.top,r=e.bottom;let l=0;for(;l<t.length&&!(t[l]>s);l++);const n=Math.max(l-2-1,0);for(;l<t.length&&!(t[l]>=r);l++);return{offset:n,length:Math.min(l+2,t.length)-n}})(i,e);var l,n;((t,e,i)=>t<=i.offset+i.length||e.offset!==i.offset||e.length!==i.length)(t,this.range,r)&&(this.range=r,((t,e,i,s)=>{for(const h of t)h.change=0,h.d=!0;const r=[],l=s.offset+s.length;for(let h=s.offset;h<l;h++){const s=i[h],l=t.find(t=>t.d&&t.cell===s);if(l){const t=e[h];t!==l.top&&(l.top=t,l.change=1),l.d=!1}else r.push(s)}const n=t.filter(t=>t.d);for(const h of r){const i=n.find(t=>t.d&&t.cell.type===h.type),s=h.i;i?(i.d=!1,i.change=2,i.cell=h,i.top=e[s]):t.push({d:!1,cell:h,visible:!0,change:2,top:e[s]})}t.filter(t=>t.d&&-9999!==t.top).forEach(t=>{t.change=1,t.top=-9999})})(this.virtualDom,i,this.cells,r),this.nodeRender?((t,e,i,s)=>{const r=Array.from(t.children).filter(t=>"TEMPLATE"!==t.tagName),l=r.length;let n;for(let h=0;h<i.length;h++){const a=i[h],c=a.cell;if(2===a.change){if(h<l)n=r[h],e(n,c,h);else{const i=o(t,c.type);n=e(i,c,h)||i,n.classList.add("virtual-item"),t.appendChild(n)}n.$ionCell=c}else n=r[h];0!==a.change&&(n.style.transform=`translate3d(0,${a.top}px,0)`);const d=c.visible;a.visible!==d&&(d?n.classList.remove("virtual-loading"):n.classList.add("virtual-loading"),a.visible=d),c.reads>0&&(s(c,n),c.reads--)}})(this.el,this.nodeRender,this.virtualDom,this.updateCellHeight.bind(this)):this.domRender?this.domRender(this.virtualDom):this.renderItem&&(0,s.j)(this))}updateCellHeight(t,e){const i=()=>{if(e.$ionCell===t){const i=window.getComputedStyle(e),s=e.offsetHeight+parseFloat(i.getPropertyValue("margin-bottom"));this.setCellHeight(t,s)}};e?(0,r.c)(e,i):i()}setCellHeight(t,e){const i=t.i;t===this.cells[i]&&(t.height===e&&!0===t.visible||(t.visible=!0,t.height=e,this.indexDirty=Math.min(this.indexDirty,i),this.scheduleUpdate()))}scheduleUpdate(){clearTimeout(this.timerUpdate),this.timerUpdate=setTimeout(()=>this.updateVirtualScroll(),100)}updateState(){const t=!(!this.scrollEl||!this.cells);t!==this.isEnabled&&(this.enableScrollEvents(t),t&&this.updateVirtualScroll())}calcCells(){this.items&&(this.lastItemLen=this.items.length,this.cells=c(this.items,this.itemHeight,this.headerHeight,this.footerHeight,this.headerFn,this.footerFn,this.approxHeaderHeight,this.approxFooterHeight,this.approxItemHeight,0,0,this.lastItemLen),this.indexDirty=0)}getHeightIndex(){return this.indexDirty!==1/0&&this.calcHeightIndex(this.indexDirty),this.heightIndex}calcHeightIndex(t=0){this.heightIndex=((t,e)=>{if(!t)return new Uint32Array(e);if(t.length===e)return t;if(e>t.length){const i=new Uint32Array(e);return i.set(t),i}return t.subarray(0,e)})(this.heightIndex,this.cells.length),this.totalHeight=((t,e,i)=>{let s=t[i];for(let r=i;r<t.length;r++)t[r]=s,s+=e[r].height;return s})(this.heightIndex,this.cells,t),this.indexDirty=1/0}enableScrollEvents(t){this.rmEvent&&(this.rmEvent(),this.rmEvent=void 0);const e=this.scrollEl;e&&(this.isEnabled=t,e.addEventListener("scroll",this.onScroll),this.rmEvent=()=>{e.removeEventListener("scroll",this.onScroll)})}renderVirtualNode(t){const{type:e,value:i,index:s}=t.cell;switch(e){case l:return this.renderItem(i,s);case n:return this.renderHeader(i,s);case h:return this.renderFooter(i,s)}}render(){return(0,s.h)(s.H,{style:{height:`${this.totalHeight}px`}},this.renderItem&&(0,s.h)(g,{dom:this.virtualDom},this.virtualDom.map(t=>this.renderVirtualNode(t))))}get el(){return(0,s.i)(this)}static get watchers(){return{itemHeight:["itemsChanged"],headerHeight:["itemsChanged"],footerHeight:["itemsChanged"],items:["itemsChanged"]}}},g=({dom:t},e,i)=>i.map(e,(e,i)=>{const s=t[i],r=e.vattrs||{};let l=r.class||"";return l+="virtual-item ",s.visible||(l+="virtual-loading"),Object.assign(Object.assign({},e),{vattrs:Object.assign(Object.assign({},r),{class:l,style:Object.assign(Object.assign({},r.style),{transform:`translate3d(0,${s.top}px,0)`})})})});d.style="ion-virtual-scroll{display:block;position:relative;width:100%;contain:strict;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}ion-virtual-scroll>.virtual-loading{opacity:0}ion-virtual-scroll>.virtual-item{position:absolute !important;top:0 !important;right:0 !important;left:0 !important;-webkit-transition-duration:0ms;transition-duration:0ms;will-change:transform}"}}]);