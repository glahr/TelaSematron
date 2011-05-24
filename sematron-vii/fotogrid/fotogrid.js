/* ***** BEGIN LICENSE BLOCK *****
* Version: MPL 1.1/GPL 2.0/LGPL 2.1
*
* The contents of this file are subject to the Mozilla Public License Version
* 1.1 (the "License"); you may not use this file except in compliance with
* the License. You may obtain a copy of the License at
* http://www.mozilla.org/MPL/
*
* Software distributed under the License is distributed on an "AS IS" basis,
* WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
* for the specific language governing rights and limitations under the
* License.
*
* The Original Code is TelaSocial
*
* The Initial Developer of the Original Code is Taboca TelaSocial.
* Portions created by the Initial Developer are Copyright (C) 2010
* the Initial Developer. All Rights Reserved.
*
* Contributor(s):
* Marcio Galli <mgalli@taboca.com>
* Rafael Sartori <faelsartori@gmail.com>
*
* Alternatively, the contents of this file may be used under the terms of
* either the GNU General Public License Version 2 or later (the "GPL"), or
* the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
* in which case the provisions of the GPL or the LGPL are applicable instead
* of those above. If you wish to allow use of your version of this file only
* under the terms of either the GPL or the LGPL, and not to allow others to
* use your version of this file under the terms of the MPL, indicate your
* decision by deleting the provisions above and replace them with the notice
* and other provisions required by the GPL or the LGPL. If you do not delete
* the provisions above, a recipient may use your version of this file under
* the terms of any one of the MPL, the GPL or the LGPL.
*
* ***** END LICENSE BLOCK ***** */

c     = require("choreographer");
timer = require("timer");

var fade_Widget =  {

        name        : __appName,
        target      : __targetName,
        targetId    : __targetId,
        feed        : null,
        feedURL     : "http://api.flickr.com/services/feeds/photos_public.gne?id=62735326@N03&lang=en-us&format=",
	refElement   : null, 
	imageNumber  : 0,
	element      : null,
	picWidth     : 450, 
	picHeight    : 337, 
        picQueue     : null, 
        totalElements: 8, 
	refContainers: null, 
        refContainerCycle : -1, 
		
	start: function () { 

                this.feed = this._service_jquery;
		this.picQueue = new Array();
		this.element = this._coreDoc.createElement('div');
		this.element.style.marginLeft="40px";
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this.refElement = this._coreDoc.createElement("div");
		this.element.appendChild(this.refElement);

		this.refContainers = new Array();

		for(var i=0; i<this.totalElements; i++) { 
			var k = this._coreDoc.createElement("span");
			k.style.width = this.picWidth + "px";
			k.style.height= this.picHeight + "px";
			k.style.marginLeft = "10px";
			k.style.marginTop ="50px"; 
			k.style.overflow="hidden";
			k.style.display="inline-block";
			this.element.insertBefore(k, this.element.firstChild);
			this.refContainers[i]=k;
		}

		var scopedThis = this;
               	timer.setTimeout( function () { scopedThis.popPic() }, 5500);

	},

	init : function() {
	},

	popPic: function() {
		if (this.picQueue.length == 0) { 
			var these = this;
			this.feed.ajax( { type:"POST", url: this.feedURL, dataType: "xml", success: function (xml) {  these.__feedUpdated(xml) }, error: function (xml) { console.log('error loading ajax for images ') }  });

		} else { 
			var t = this.picQueue.pop();
			this.refContainerCycle++;
			if(this.refContainerCycle == this.totalElements) { 
				this.refContainerCycle=0;
			} 
			var currentContainer = this.refContainers[this.refContainerCycle];
			currentContainer.innerHTML = "<img id='fadeimage"+this.imageNumber+"' src='"+t+"' style='-moz-box-shadow: black 5px 5px 10px;opacity:.3'>";
			these = this;
			this._coreDoc.getElementById("fadeimage"+this.imageNumber).onload = function () { these.imageLoaded() };
			return true;
		} 
	},

	imageLoaded : function() { 
		var currImage =  this._coreDoc.getElementById("fadeimage"+this.imageNumber);
		var x= parseInt(currImage.width); 
		var y= parseInt(currImage.height); 

		if(x>=y) {
			currImage.width=this.picWidth-10;

			var yy = parseInt ((this.picHeight-parseInt((this.picWidth*y)/x))/2 );
			currImage.style.marginTop=yy+"px";
		} else { 
			
			currImage.height=this.picHeight-10;
			var xx = parseInt ((this.picWidth-parseInt((this.picHeight*x)/y))/2 );
			currImage.style.marginLeft=xx+"px";
			
		} 
		currImage.style.opacity="1";
		this.imageNumber++;
		this.kickFadeIn();
	},

	kickFadeIn : function () { 
		var scopedThis = this;
               	timer.setTimeout( function () { scopedThis.popPic() }, 1000*10);
               	//timer.setTimeout( function () { scopedThis.popPic() }, 1000*30);
	},

	__feedUpdated : function(xml) {
		var self  = this;
		this.feed(xml).find('entry').each(function(){
			var link = self.feed(this).find('link[rel="enclosure"]');
			if(link.attr("rel") == "enclosure" ) { 
				var src = link.attr("href");
                       		if(src.indexOf("jpg")>-1) {
					self.picQueue.push(src);
                       		}
			} 
		});
		this.popPic();
	}
}

c.register(fade_Widget);

