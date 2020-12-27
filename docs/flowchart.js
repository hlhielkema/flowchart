!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);function o(e){this.parent=e,this.canvas=null,this.context=null}o.prototype.init=function(){this.canvas=document.createElement("canvas"),this.context=this.canvas.getContext("2d"),this.parent.container.appendChild(this.canvas)},o.prototype.render=function(){const e=this.context;this.canvas.width=this.parent.container.clientWidth,this.canvas.height=this.parent.container.offsetHeight,e.clearRect(0,0,this.canvas.width,this.canvas.height),e.lineWidth=2,e.strokeStyle="#e4e4e4";const t=this.parent.nodes;for(var n=0;n<t.length;n++){const i=this.getNodeElementCenter(t[n]);for(var o=0;o<t[n].connections.length;o++){const s=this.parent.getNodeForId(t[n].connections[o].id),r=this.getNodeElementCenter(s);e.beginPath(),e.moveTo(i.x,i.y),e.lineTo(r.x,r.y),e.stroke()}}},o.prototype.getNodeElementCenter=function(e){return{x:e.x+130,y:e.y+37}};var i=o;function s(e,t){this.target=e.target,this.initialPageX=e.pageX,this.initialPageY=e.pageY,this.first=!0,this.transform=t.transform}s.prototype.setInitialPosition=function(e,t){this.initialX=e,this.initialY=t},s.prototype.setInitialSize=function(e,t){this.initialWidth=e,this.initialHeight=t},s.prototype.setTransformMode=function(e,t){this.hmode=e,this.vmode=t},s.prototype.setController=function(e){this.controller=e},s.prototype.setInnerTarget=function(e){this.innerTarget=e};var r=s;var l=function(){const e=this;e.session=null,e.start=function(t,n){const o=new r(t,n);return n.init(o),e.session=o,window.addEventListener("mousemove",e.moveHandler,!0),window.addEventListener("mouseup",e.moveUpHandler,!1),t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),t.cancelBubble=!0,t.returnValue=!1,!1},e.hasSession=function(){return null!==e.session},e.moveHandler=function(t){const n=t.pageX-e.session.initialPageX,o=t.pageY-e.session.initialPageY;return e.session.transform(e.session,n,o,t.pageX,t.pageY,e.session.first,!1),e.session.first=!1,t.stopPropagation&&t.stopPropagation(),t.preventDefault&&t.preventDefault(),t.cancelBubble=!0,t.returnValue=!1,!1},e.moveUpHandler=function(t){window.removeEventListener("mousemove",e.moveHandler,!0),window.removeEventListener("mouseup",e.moveUpHandler,!1);const n=t.pageX-e.session.initialPageX,o=t.pageY-e.session.initialPageY;e.session.transform(e.session,n,o,t.pageX,t.pageY,e.session.first,!0),e.session=null}};function a(e,t){this.parent=e,this.node=t,this.element=null,this.selected=!1}a.prototype.render=function(){const e=document.createElement("div");e.classList.add("node");const t=document.createElement("div");t.classList.add("inner"),e.appendChild(t),t.appendChild(this.renderActions()),t.appendChild(this.renderInfo()),e.style.top=this.node.y+"px",e.style.left=this.node.x+"px";const n=this;return e.addEventListener("mousedown",t=>{n.startDragDrop(t,e)}),this.element=e,e},a.prototype.renderInfo=function(){const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("div");e.classList.add("info"),t.classList.add("title"),n.classList.add("description"),e.appendChild(t),e.appendChild(n),t.innerText=this.node.title,n.innerText=this.node.description;const o=this;return e.addEventListener("click",(function(){o.onNodeSelected()})),e},a.prototype.renderActions=function(){const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("div");e.classList.add("actions"),t.innerText="Edit",n.innerText="Link",e.appendChild(t),e.appendChild(n);const o=this;return t.addEventListener("click",(function(){o.onEditNode()})),n.addEventListener("click",(function(){o.onLinkNode()})),e},a.prototype.applyPosition=function(){this.element.style.top=this.node.y+"px",this.element.style.left=this.node.x+"px",this.parent.onNodePositionChanged()},a.prototype.applySelected=function(){this.element.classList.contains("selected")!=this.selected&&(this.selected?this.element.classList.add("selected"):this.element.classList.remove("selected"))},a.prototype.startDragDrop=function(e){const t=this;this.parent.dragDropEngine.start(e,{init(e){e.setInitialPosition(t.node.x,t.node.y),t.onNodeSelected()},transform(e,n,o,i,s,r,l){r&&t.element.classList.contains("animate-position")&&t.element.classList.remove("animate-position"),t.node.x=e.initialX+n,t.node.y=e.initialY+o,t.applyPosition()}})},a.prototype.getNodeId=function(){return this.node.id},a.prototype.onEditNode=function(){this.parent.onEditNode(this)},a.prototype.onLinkNode=function(){this.parent.onLinkNode(this)},a.prototype.onNodeSelected=function(){this.selected||(this.selected=!0,this.applySelected(),this.selected&&this.parent.onNodeSelected(this))};var d=a;function c(e,t,n,o){this.parent=e,this.from=t,this.to=n,this.label=o,this.element=null,this.selected=!1}c.prototype.render=function(){const e=document.createElement("div");e.classList.add("label");const t=document.createElement("div");t.classList.add("inner"),t.innerText=this.label,t.appendChild(this.renderActions()),e.appendChild(t);const n=this.getLineCenter();e.style.top=n.y+"px",e.style.left=n.x+"px";const o=this;return e.addEventListener("click",(function(){o.onLabelSelected()})),this.element=e,e},c.prototype.renderActions=function(){const e=document.createElement("div"),t=document.createElement("div"),n=document.createElement("div");e.classList.add("actions"),t.innerText="Rename",n.innerText="Remove",e.appendChild(t),e.appendChild(n);const o=this;return t.addEventListener("click",(function(){o.onRenameLabel()})),n.addEventListener("click",(function(){o.onRemoveConnection()})),e},c.prototype.updatePosition=function(){var e=this.getLineCenter();this.element.style.top=e.y+"px",this.element.style.left=e.x+"px"},c.prototype.getLineCenter=function(){return{x:(this.from.x+this.to.x)/2+130-50,y:(this.from.y+this.to.y)/2+37-17}},c.prototype.applySelected=function(){this.element.classList.contains("selected")!=this.selected&&(this.selected?this.element.classList.add("selected"):this.element.classList.remove("selected"))},c.prototype.onRenameLabel=function(){this.parent.onRenameLabel(this.from,this.to)},c.prototype.onRemoveConnection=function(){this.parent.onRemoveConnection(this.from,this.to)},c.prototype.onLabelSelected=function(){this.selected||(this.selected=!0,this.applySelected(),this.parent.onLabelSelected(this))};var p=c;function h(e){this.parent=e,this.nodeControllers=null,this.labelControllers=null,this.container=null,this.dragDropEngine=new l}h.prototype.init=function(){this.container=document.createElement("div"),this.container.classList.add("node-container"),this.parent.container.appendChild(this.container)},h.prototype.createNodeControllers=function(){this.nodeControllers=[];const e=this.parent.nodes;for(var t=0;t<e.length;t++)this.nodeControllers.push(new d(this,e[t]))},h.prototype.createLabelControllers=function(){this.labelControllers=[];const e=this.parent.nodes;for(var t=0;t<e.length;t++)for(var n=0;n<e[t].connections.length;n++){var o=e[t],i=this.parent.getNodeForId(e[t].connections[n].id),s=e[t].connections[n].label;this.labelControllers.push(new p(this,o,i,s))}},h.prototype.render=function(){this.container.innerHTML="",this.createNodeControllers(),this.createLabelControllers();for(var e=0;e<this.nodeControllers.length;e++){var t=this.nodeControllers[e].render();this.container.appendChild(t)}for(e=0;e<this.labelControllers.length;e++){var n=this.labelControllers[e].render();this.container.appendChild(n)}},h.prototype.updateLabelPositions=function(){for(var e=0;e<this.labelControllers.length;e++)this.labelControllers[e].updatePosition()},h.prototype.onNodePositionChanged=function(){this.updateLabelPositions(),this.parent.onNodePositionChanged()},h.prototype.onLabelSelected=function(e){for(var t=0;t<this.nodeControllers.length;t++){const e=this.nodeControllers[t];e.selected=!1,e.applySelected()}for(var n=0;n<this.labelControllers.length;n++){const t=this.labelControllers[n];t!==e&&(t.selected=!1,t.applySelected())}},h.prototype.onNodeSelected=function(e){for(var t=0;t<this.nodeControllers.length;t++){const n=this.nodeControllers[t];n!==e&&(n.selected=!1,n.applySelected())}for(var n=0;n<this.labelControllers.length;n++){const e=this.labelControllers[n];e.selected=!1,e.applySelected()}},h.prototype.onEditNode=function(e){this.parent.onEditNode(e.node)},h.prototype.onLinkNode=function(e){this.parent.onLinkNode(e.node)},h.prototype.onRenameLabel=function(e,t){this.parent.onRenameLabel(e,t)},h.prototype.onRemoveConnection=function(e,t){this.parent.onRemoveConnection(e,t)};var u=h;function f(e){this.parentContainer=document.querySelector(e),this.container=document.createElement("div"),this.container.classList.add("flowchart"),this.parentContainer.appendChild(this.container),this.nodes=[],this.canvas=new i(this),this.dom=new u(this),this.editNodeHandler=null,this.renameLabelHandler=null,this.canvas.init(),this.dom.init()}f.prototype.render=function(){this.canvas.render(),this.dom.render()},f.prototype.setNodes=function(e){this.nodes=e,this.render()},f.prototype.getNodes=function(){return this.nodes},f.prototype.onNodePositionChanged=function(){this.canvas.render()},f.prototype.onRenameLabel=function(e,t){for(var n=null,o=0;o<e.connections.length;o++)e.connections[o].id===t.id&&(n=e.connections[o]);if(null===n)throw"Connection not found";const i=this;this.renameLabelHandler(n.label,(function(e){e.length>0&&n.label!==e&&(n.label=e,i.render())}))},f.prototype.onRemoveConnection=function(e,t){for(var n=0;n<e.connections.length;n++)if(e.connections[n].id===t.id){e.connections.splice(n,1);break}this.render()},f.prototype.onEditNode=function(e){null!==this.editNodeHandler&&this.editNodeHandler(e)},f.prototype.onLinkNode=function(e){alert("link node: "+e.id)},f.prototype.setEditNodeHandler=function(e){this.editNodeHandler=e},f.prototype.setRenameLabelHandler=function(e){this.renameLabelHandler=e},f.prototype.getNodeForId=function(e){for(var t=0;t<this.nodes.length;t++)if(this.nodes[t].id===e)return this.nodes[t];return null};var m=f;n(0);window.Flowchart=m}]);