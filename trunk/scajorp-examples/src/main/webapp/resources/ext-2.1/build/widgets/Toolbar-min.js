/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.Toolbar=function(A){if(Ext.isArray(A)){A={buttons:A}}Ext.Toolbar.superclass.constructor.call(this,A)};(function(){var A=Ext.Toolbar;Ext.extend(A,Ext.BoxComponent,{trackMenus:true,initComponent:function(){A.superclass.initComponent.call(this);if(this.items){this.buttons=this.items}this.items=new Ext.util.MixedCollection(false,function(B){return B.itemId||B.id||Ext.id()})},autoCreate:{cls:"x-toolbar x-small-editor",html:"<table cellspacing=\"0\"><tr></tr></table>"},onRender:function(C,B){this.el=C.createChild(Ext.apply({id:this.id},this.autoCreate),B);this.tr=this.el.child("tr",true)},afterRender:function(){A.superclass.afterRender.call(this);if(this.buttons){this.add.apply(this,this.buttons);delete this.buttons}},add:function(){var C=arguments,B=C.length;for(var D=0;D<B;D++){var E=C[D];if(E.isFormField){this.addField(E)}else{if(E.render){this.addItem(E)}else{if(typeof E=="string"){if(E=="separator"||E=="-"){this.addSeparator()}else{if(E==" "){this.addSpacer()}else{if(E=="->"){this.addFill()}else{this.addText(E)}}}}else{if(E.tagName){this.addElement(E)}else{if(typeof E=="object"){if(E.xtype){this.addField(Ext.ComponentMgr.create(E,"button"))}else{this.addButton(E)}}}}}}}},addSeparator:function(){return this.addItem(new A.Separator())},addSpacer:function(){return this.addItem(new A.Spacer())},addFill:function(){return this.addItem(new A.Fill())},addElement:function(B){return this.addItem(new A.Item(B))},addItem:function(B){var C=this.nextBlock();this.initMenuTracking(B);B.render(C);this.items.add(B);return B},addButton:function(D){if(Ext.isArray(D)){var F=[];for(var E=0,C=D.length;E<C;E++){F.push(this.addButton(D[E]))}return F}var B=D;if(!(D instanceof A.Button)){B=D.split?new A.SplitButton(D):new A.Button(D)}var G=this.nextBlock();this.initMenuTracking(B);B.render(G);this.items.add(B);return B},initMenuTracking:function(B){if(this.trackMenus&&B.menu){B.on({"menutriggerover":this.onButtonTriggerOver,"menushow":this.onButtonMenuShow,"menuhide":this.onButtonMenuHide,scope:this})}},addText:function(B){return this.addItem(new A.TextItem(B))},insertButton:function(C,F){if(Ext.isArray(F)){var E=[];for(var D=0,B=F.length;D<B;D++){E.push(this.insertButton(C+D,F[D]))}return E}if(!(F instanceof A.Button)){F=new A.Button(F)}var G=document.createElement("td");this.tr.insertBefore(G,this.tr.childNodes[C]);this.initMenuTracking(F);F.render(G);this.items.insert(C,F);return F},addDom:function(C,B){var E=this.nextBlock();Ext.DomHelper.overwrite(E,C);var D=new A.Item(E.firstChild);D.render(E);this.items.add(D);return D},addField:function(C){var D=this.nextBlock();C.render(D);var B=new A.Item(D.firstChild);B.render(D);this.items.add(B);return B},nextBlock:function(){var B=document.createElement("td");this.tr.appendChild(B);return B},onDestroy:function(){Ext.Toolbar.superclass.onDestroy.call(this);if(this.rendered){if(this.items){Ext.destroy.apply(Ext,this.items.items)}Ext.Element.uncache(this.tr)}},onDisable:function(){this.items.each(function(B){if(B.disable){B.disable()}})},onEnable:function(){this.items.each(function(B){if(B.enable){B.enable()}})},onButtonTriggerOver:function(B){if(this.activeMenuBtn&&this.activeMenuBtn!=B){this.activeMenuBtn.hideMenu();B.showMenu();this.activeMenuBtn=B}},onButtonMenuShow:function(B){this.activeMenuBtn=B},onButtonMenuHide:function(B){delete this.activeMenuBtn}});Ext.reg("toolbar",Ext.Toolbar);A.Item=function(B){this.el=Ext.getDom(B);this.id=Ext.id(this.el);this.hidden=false};A.Item.prototype={getEl:function(){return this.el},render:function(B){this.td=B;B.appendChild(this.el)},destroy:function(){if(this.td&&this.td.parentNode){this.td.parentNode.removeChild(this.td)}},show:function(){this.hidden=false;this.td.style.display=""},hide:function(){this.hidden=true;this.td.style.display="none"},setVisible:function(B){if(B){this.show()}else{this.hide()}},focus:function(){Ext.fly(this.el).focus()},disable:function(){Ext.fly(this.td).addClass("x-item-disabled");this.disabled=true;this.el.disabled=true},enable:function(){Ext.fly(this.td).removeClass("x-item-disabled");this.disabled=false;this.el.disabled=false}};Ext.reg("tbitem",A.Item);A.Separator=function(){var B=document.createElement("span");B.className="ytb-sep";A.Separator.superclass.constructor.call(this,B)};Ext.extend(A.Separator,A.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.reg("tbseparator",A.Separator);A.Spacer=function(){var B=document.createElement("div");B.className="ytb-spacer";A.Spacer.superclass.constructor.call(this,B)};Ext.extend(A.Spacer,A.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.reg("tbspacer",A.Spacer);A.Fill=Ext.extend(A.Spacer,{render:function(B){B.style.width="100%";A.Fill.superclass.render.call(this,B)}});Ext.reg("tbfill",A.Fill);A.TextItem=function(B){var C=document.createElement("span");C.className="ytb-text";C.innerHTML=B.text?B.text:B;A.TextItem.superclass.constructor.call(this,C)};Ext.extend(A.TextItem,A.Item,{enable:Ext.emptyFn,disable:Ext.emptyFn,focus:Ext.emptyFn});Ext.reg("tbtext",A.TextItem);A.Button=Ext.extend(Ext.Button,{hideParent:true,onDestroy:function(){A.Button.superclass.onDestroy.call(this);if(this.container){this.container.remove()}}});Ext.reg("tbbutton",A.Button);A.SplitButton=Ext.extend(Ext.SplitButton,{hideParent:true,onDestroy:function(){A.SplitButton.superclass.onDestroy.call(this);if(this.container){this.container.remove()}}});Ext.reg("tbsplit",A.SplitButton);A.MenuButton=A.SplitButton})();