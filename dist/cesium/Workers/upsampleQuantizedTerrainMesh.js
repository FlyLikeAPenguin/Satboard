define(["./AttributeCompression-f7a901f9","./Transforms-f15de320","./Matrix2-c6c16658","./when-4bbc8319","./TerrainEncoding-6d07f5d8","./IndexDatatype-ddbc25a7","./RuntimeError-5b082e8f","./ComponentDatatype-3d0a0aac","./OrientedBoundingBox-f3d80bd4","./createTaskProcessorWorker","./combine-e9466e32","./WebGLConstants-508b9636","./EllipsoidTangentPlane-41514392","./AxisAlignedBoundingBox-a572809f","./IntersectionTests-a4e54d9a","./Plane-26e67b94"],(function(e,t,n,i,s,h,r,u,o,p,d,a,l,f,c,g){"use strict";const m=function(e,t,n,s,h,r){let u,o,p;i.defined(r)?r.length=0:r=[],t?(u=n<e,o=s<e,p=h<e):(u=n>e,o=s>e,p=h>e);const d=u+o+p;let a,l,f,c,g,m;return 1===d?u?(a=(e-n)/(s-n),l=(e-n)/(h-n),r.push(1),r.push(2),1!==l&&(r.push(-1),r.push(0),r.push(2),r.push(l)),1!==a&&(r.push(-1),r.push(0),r.push(1),r.push(a))):o?(f=(e-s)/(h-s),c=(e-s)/(n-s),r.push(2),r.push(0),1!==c&&(r.push(-1),r.push(1),r.push(0),r.push(c)),1!==f&&(r.push(-1),r.push(1),r.push(2),r.push(f))):p&&(g=(e-h)/(n-h),m=(e-h)/(s-h),r.push(0),r.push(1),1!==m&&(r.push(-1),r.push(2),r.push(1),r.push(m)),1!==g&&(r.push(-1),r.push(2),r.push(0),r.push(g))):2===d?u||n===e?o||s===e?p||h===e||(l=(e-n)/(h-n),f=(e-s)/(h-s),r.push(2),r.push(-1),r.push(0),r.push(2),r.push(l),r.push(-1),r.push(1),r.push(2),r.push(f)):(m=(e-h)/(s-h),a=(e-n)/(s-n),r.push(1),r.push(-1),r.push(2),r.push(1),r.push(m),r.push(-1),r.push(0),r.push(1),r.push(a)):(c=(e-s)/(n-s),g=(e-h)/(n-h),r.push(0),r.push(-1),r.push(1),r.push(0),r.push(c),r.push(-1),r.push(2),r.push(0),r.push(g)):3!==d&&(r.push(0),r.push(1),r.push(2)),r},x=32767,w=16383,C=[],B=[],y=[],I=new n.Cartographic;let b=new n.Cartesian3;const v=[],A=[],z=[],M=[],N=[],V=new n.Cartesian3,E=new t.BoundingSphere,R=new o.OrientedBoundingBox,H=new n.Cartesian2,T=new n.Cartesian3;function O(){this.vertexBuffer=void 0,this.index=void 0,this.first=void 0,this.second=void 0,this.ratio=void 0}O.prototype.clone=function(e){return i.defined(e)||(e=new O),e.uBuffer=this.uBuffer,e.vBuffer=this.vBuffer,e.heightBuffer=this.heightBuffer,e.normalBuffer=this.normalBuffer,e.index=this.index,e.first=this.first,e.second=this.second,e.ratio=this.ratio,e},O.prototype.initializeIndexed=function(e,t,n,i,s){this.uBuffer=e,this.vBuffer=t,this.heightBuffer=n,this.normalBuffer=i,this.index=s,this.first=void 0,this.second=void 0,this.ratio=void 0},O.prototype.initializeFromClipResult=function(e,t,n){let i=t+1;return-1!==e[t]?n[e[t]].clone(this):(this.vertexBuffer=void 0,this.index=void 0,this.first=n[e[i]],++i,this.second=n[e[i]],++i,this.ratio=e[i],++i),i},O.prototype.getKey=function(){return this.isIndexed()?this.index:JSON.stringify({first:this.first.getKey(),second:this.second.getKey(),ratio:this.ratio})},O.prototype.isIndexed=function(){return i.defined(this.index)},O.prototype.getH=function(){return i.defined(this.index)?this.heightBuffer[this.index]:u.CesiumMath.lerp(this.first.getH(),this.second.getH(),this.ratio)},O.prototype.getU=function(){return i.defined(this.index)?this.uBuffer[this.index]:u.CesiumMath.lerp(this.first.getU(),this.second.getU(),this.ratio)},O.prototype.getV=function(){return i.defined(this.index)?this.vBuffer[this.index]:u.CesiumMath.lerp(this.first.getV(),this.second.getV(),this.ratio)};let U=new n.Cartesian2,F=-1;const P=[new n.Cartesian3,new n.Cartesian3],S=[new n.Cartesian3,new n.Cartesian3];function D(t,i){++F;let s=P[F],h=S[F];return s=e.AttributeCompression.octDecode(t.first.getNormalX(),t.first.getNormalY(),s),h=e.AttributeCompression.octDecode(t.second.getNormalX(),t.second.getNormalY(),h),b=n.Cartesian3.lerp(s,h,t.ratio,b),n.Cartesian3.normalize(b,b),e.AttributeCompression.octEncode(b,i),--F,i}O.prototype.getNormalX=function(){return i.defined(this.index)?this.normalBuffer[2*this.index]:(U=D(this,U),U.x)},O.prototype.getNormalY=function(){return i.defined(this.index)?this.normalBuffer[2*this.index+1]:(U=D(this,U),U.y)};const W=[];function X(e,t,n,s,h,r,u,o,p){if(0===u.length)return;let d=0,a=0;for(;a<u.length;)a=W[d++].initializeFromClipResult(u,a,o);for(let h=0;h<d;++h){const u=W[h];if(u.isIndexed())u.newIndex=r[u.index],u.uBuffer=e,u.vBuffer=t,u.heightBuffer=n,p&&(u.normalBuffer=s);else{const h=u.getKey();if(i.defined(r[h]))u.newIndex=r[h];else{const i=e.length;e.push(u.getU()),t.push(u.getV()),n.push(u.getH()),p&&(s.push(u.getNormalX()),s.push(u.getNormalY())),u.newIndex=i,r[h]=i}}}3===d?(h.push(W[0].newIndex),h.push(W[1].newIndex),h.push(W[2].newIndex)):4===d&&(h.push(W[0].newIndex),h.push(W[1].newIndex),h.push(W[2].newIndex),h.push(W[0].newIndex),h.push(W[2].newIndex),h.push(W[3].newIndex))}return W.push(new O),W.push(new O),W.push(new O),W.push(new O),p((function(e,i){const r=e.isEastChild,p=e.isNorthChild,d=r?w:0,a=r?x:w,l=p?w:0,f=p?x:w,c=v,g=A,U=z,F=N;c.length=0,g.length=0,U.length=0,F.length=0;const P=M;P.length=0;const S={},D=e.vertices;let W=e.indices;W=W.subarray(0,e.indexCountWithoutSkirts);const k=s.TerrainEncoding.clone(e.encoding),K=k.hasVertexNormals;let Y=0;const L=e.vertexCountWithoutSkirts,_=e.minimumHeight,G=e.maximumHeight,J=new Array(L),Z=new Array(L),j=new Array(L),q=K?new Array(2*L):void 0;let Q,$,ee,te,ne;for($=0,ee=0;$<L;++$,ee+=2){const e=k.decodeTextureCoordinates(D,$,H);if(Q=k.decodeHeight(D,$),te=u.CesiumMath.clamp(e.x*x|0,0,x),ne=u.CesiumMath.clamp(e.y*x|0,0,x),j[$]=u.CesiumMath.clamp((Q-_)/(G-_)*x|0,0,x),te<20&&(te=0),ne<20&&(ne=0),x-te<20&&(te=x),x-ne<20&&(ne=x),J[$]=te,Z[$]=ne,K){const e=k.getOctEncodedNormal(D,$,T);q[ee]=e.x,q[ee+1]=e.y}(r&&te>=w||!r&&te<=w)&&(p&&ne>=w||!p&&ne<=w)&&(S[$]=Y,c.push(te),g.push(ne),U.push(j[$]),K&&(F.push(q[ee]),F.push(q[ee+1])),++Y)}const ie=[];ie.push(new O),ie.push(new O),ie.push(new O);const se=[];let he,re;for(se.push(new O),se.push(new O),se.push(new O),$=0;$<W.length;$+=3){const e=W[$],t=W[$+1],n=W[$+2],i=J[e],s=J[t],h=J[n];ie[0].initializeIndexed(J,Z,j,q,e),ie[1].initializeIndexed(J,Z,j,q,t),ie[2].initializeIndexed(J,Z,j,q,n);const u=m(w,r,i,s,h,C);he=0,he>=u.length||(he=se[0].initializeFromClipResult(u,he,ie),he>=u.length||(he=se[1].initializeFromClipResult(u,he,ie),he>=u.length||(he=se[2].initializeFromClipResult(u,he,ie),re=m(w,p,se[0].getV(),se[1].getV(),se[2].getV(),B),X(c,g,U,F,P,S,re,se,K),he<u.length&&(se[2].clone(se[1]),se[2].initializeFromClipResult(u,he,ie),re=m(w,p,se[0].getV(),se[1].getV(),se[2].getV(),B),X(c,g,U,F,P,S,re,se,K)))))}const ue=r?-32767:0,oe=p?-32767:0,pe=[],de=[],ae=[],le=[];let fe=Number.MAX_VALUE,ce=-fe;const ge=y;ge.length=0;const me=n.Ellipsoid.clone(e.ellipsoid),xe=n.Rectangle.clone(e.childRectangle),we=xe.north,Ce=xe.south;let Be=xe.east;const ye=xe.west;for(Be<ye&&(Be+=u.CesiumMath.TWO_PI),$=0;$<c.length;++$)te=Math.round(c[$]),te<=d?(pe.push($),te=0):te>=a?(ae.push($),te=x):te=2*te+ue,c[$]=te,ne=Math.round(g[$]),ne<=l?(de.push($),ne=0):ne>=f?(le.push($),ne=x):ne=2*ne+oe,g[$]=ne,Q=u.CesiumMath.lerp(_,G,U[$]/x),Q<fe&&(fe=Q),Q>ce&&(ce=Q),U[$]=Q,I.longitude=u.CesiumMath.lerp(ye,Be,te/x),I.latitude=u.CesiumMath.lerp(Ce,we,ne/x),I.height=Q,me.cartographicToCartesian(I,b),ge.push(b.x),ge.push(b.y),ge.push(b.z);const Ie=t.BoundingSphere.fromVertices(ge,n.Cartesian3.ZERO,3,E),be=o.OrientedBoundingBox.fromRectangle(xe,fe,ce,me,R),ve=new s.EllipsoidalOccluder(me).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(Ie.center,ge,3,Ie.center,fe,V),Ae=ce-fe,ze=new Uint16Array(c.length+g.length+U.length);for($=0;$<c.length;++$)ze[$]=c[$];let Me=c.length;for($=0;$<g.length;++$)ze[Me+$]=g[$];for(Me+=g.length,$=0;$<U.length;++$)ze[Me+$]=x*(U[$]-fe)/Ae;const Ne=h.IndexDatatype.createTypedArray(c.length,P);let Ve;if(K){const e=new Uint8Array(F);i.push(ze.buffer,Ne.buffer,e.buffer),Ve=e.buffer}else i.push(ze.buffer,Ne.buffer);return{vertices:ze.buffer,encodedNormals:Ve,indices:Ne.buffer,minimumHeight:fe,maximumHeight:ce,westIndices:pe,southIndices:de,eastIndices:ae,northIndices:le,boundingSphere:Ie,orientedBoundingBox:be,horizonOcclusionPoint:ve}}))}));