define(["./AttributeCompression-f7a901f9","./Matrix2-c6c16658","./Color-b12fd141","./when-4bbc8319","./IndexDatatype-ddbc25a7","./ComponentDatatype-3d0a0aac","./OrientedBoundingBox-f3d80bd4","./createTaskProcessorWorker","./RuntimeError-5b082e8f","./Transforms-f15de320","./combine-e9466e32","./WebGLConstants-508b9636","./EllipsoidTangentPlane-41514392","./AxisAlignedBoundingBox-a572809f","./IntersectionTests-a4e54d9a","./Plane-26e67b94"],(function(e,t,n,a,r,o,i,s,c,f,d,l,u,h,g,p){"use strict";const b=new t.Cartesian3,m=new t.Ellipsoid,y=new t.Rectangle,C={min:void 0,max:void 0,indexBytesPerElement:void 0},I=new t.Cartesian3,w=new t.Cartesian3,x=new t.Cartesian3,A=new t.Cartesian3,E=new t.Cartesian3,N=new t.Cartographic,T=new t.Rectangle;return s((function(s,c){let f;!function(e){const n=new Float64Array(e);let a=0;C.indexBytesPerElement=n[a++],C.min=n[a++],C.max=n[a++],t.Cartesian3.unpack(n,a,b),a+=t.Cartesian3.packedLength,t.Ellipsoid.unpack(n,a,m),a+=t.Ellipsoid.packedLength,t.Rectangle.unpack(n,a,y)}(s.packedBuffer),f=2===C.indexBytesPerElement?new Uint16Array(s.indices):new Uint32Array(s.indices);const d=new Uint16Array(s.positions),l=new Uint32Array(s.counts),u=new Uint32Array(s.indexCounts),h=new Uint32Array(s.batchIds),g=new Uint32Array(s.batchTableColors),p=new Array(l.length),B=b,k=m;let L=y;const O=C.min,U=C.max;let P,F,S,D=s.minimumHeights,R=s.maximumHeights;a.defined(D)&&a.defined(R)&&(D=new Float32Array(D),R=new Float32Array(R));const M=d.length/2,_=d.subarray(0,M),G=d.subarray(M,2*M);e.AttributeCompression.zigZagDeltaDecode(_,G);const Y=new Float64Array(3*M);for(P=0;P<M;++P){const e=_[P],n=G[P],a=o.CesiumMath.lerp(L.west,L.east,e/32767),r=o.CesiumMath.lerp(L.south,L.north,n/32767),i=t.Cartographic.fromRadians(a,r,0,N),s=k.cartographicToCartesian(i,I);t.Cartesian3.pack(s,Y,3*P)}const V=l.length,v=new Array(V),H=new Array(V);let W=0,z=0;for(P=0;P<V;++P)v[P]=W,H[P]=z,W+=l[P],z+=u[P];const Z=new Float32Array(3*M*2),j=new Uint16Array(2*M),q=new Uint32Array(H.length),J=new Uint32Array(u.length);let K=[];const Q={};for(P=0;P<V;++P)S=g[P],a.defined(Q[S])?(Q[S].positionLength+=l[P],Q[S].indexLength+=u[P],Q[S].batchIds.push(P)):Q[S]={positionLength:l[P],indexLength:u[P],offset:0,indexOffset:0,batchIds:[P]};let X,$=0,ee=0;for(S in Q)if(Q.hasOwnProperty(S)){X=Q[S],X.offset=$,X.indexOffset=ee;const e=2*X.positionLength,t=2*X.indexLength+6*X.positionLength;$+=e,ee+=t,X.indexLength=t}const te=[];for(S in Q)Q.hasOwnProperty(S)&&(X=Q[S],te.push({color:n.Color.fromRgba(parseInt(S)),offset:X.indexOffset,count:X.indexLength,batchIds:X.batchIds}));for(P=0;P<V;++P){S=g[P],X=Q[S];const e=X.offset;let n=3*e,r=e;const o=v[P],s=l[P],c=h[P];let d=O,b=U;a.defined(D)&&a.defined(R)&&(d=D[P],b=R[P]);let m=Number.POSITIVE_INFINITY,y=Number.NEGATIVE_INFINITY,C=Number.POSITIVE_INFINITY,M=Number.NEGATIVE_INFINITY;for(F=0;F<s;++F){const e=t.Cartesian3.unpack(Y,3*o+3*F,I);k.scaleToGeodeticSurface(e,e);const a=k.cartesianToCartographic(e,N),i=a.latitude,s=a.longitude;m=Math.min(i,m),y=Math.max(i,y),C=Math.min(s,C),M=Math.max(s,M);const f=k.geodeticSurfaceNormal(e,w);let l=t.Cartesian3.multiplyByScalar(f,d,x);const u=t.Cartesian3.add(e,l,A);l=t.Cartesian3.multiplyByScalar(f,b,l);const h=t.Cartesian3.add(e,l,E);t.Cartesian3.subtract(h,B,h),t.Cartesian3.subtract(u,B,u),t.Cartesian3.pack(h,Z,n),t.Cartesian3.pack(u,Z,n+3),j[r]=c,j[r+1]=c,n+=6,r+=2}L=T,L.west=C,L.east=M,L.south=m,L.north=y,p[P]=i.OrientedBoundingBox.fromRectangle(L,O,U,k);let _=X.indexOffset;const G=H[P],V=u[P];for(q[P]=_,F=0;F<V;F+=3){const t=f[G+F]-o,n=f[G+F+1]-o,a=f[G+F+2]-o;K[_++]=2*t+e,K[_++]=2*n+e,K[_++]=2*a+e,K[_++]=2*a+1+e,K[_++]=2*n+1+e,K[_++]=2*t+1+e}for(F=0;F<s;++F){const t=F,n=(F+1)%s;K[_++]=2*t+1+e,K[_++]=2*n+e,K[_++]=2*t+e,K[_++]=2*t+1+e,K[_++]=2*n+1+e,K[_++]=2*n+e}X.offset+=2*s,X.indexOffset=_,J[P]=_-q[P]}K=r.IndexDatatype.createTypedArray(Z.length/3,K);const ne=te.length;for(let e=0;e<ne;++e){const t=te[e].batchIds;let n=0;const a=t.length;for(let e=0;e<a;++e)n+=J[t[e]];te[e].count=n}const ae=function(e,t,a){const r=t.length,o=2+r*i.OrientedBoundingBox.packedLength+1+function(e){const t=e.length;let a=0;for(let r=0;r<t;++r)a+=n.Color.packedLength+3+e[r].batchIds.length;return a}(a),s=new Float64Array(o);let c=0;s[c++]=e,s[c++]=r;for(let e=0;e<r;++e)i.OrientedBoundingBox.pack(t[e],s,c),c+=i.OrientedBoundingBox.packedLength;const f=a.length;s[c++]=f;for(let e=0;e<f;++e){const t=a[e];n.Color.pack(t.color,s,c),c+=n.Color.packedLength,s[c++]=t.offset,s[c++]=t.count;const r=t.batchIds,o=r.length;s[c++]=o;for(let e=0;e<o;++e)s[c++]=r[e]}return s}(2===K.BYTES_PER_ELEMENT?r.IndexDatatype.UNSIGNED_SHORT:r.IndexDatatype.UNSIGNED_INT,p,te);return c.push(Z.buffer,K.buffer,q.buffer,J.buffer,j.buffer,ae.buffer),{positions:Z.buffer,indices:K.buffer,indexOffsets:q.buffer,indexCounts:J.buffer,batchIds:j.buffer,packedBuffer:ae.buffer}}))}));