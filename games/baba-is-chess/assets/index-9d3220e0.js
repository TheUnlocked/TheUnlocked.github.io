(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();var At={};(function(t){/**
 * @license
 * Copyright (c) 2023, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */Object.defineProperty(t,"__esModule",{value:!0}),t.Chess=t.validateFen=t.SQUARES=t.DEFAULT_POSITION=t.KING=t.QUEEN=t.ROOK=t.BISHOP=t.KNIGHT=t.PAWN=t.BLACK=t.WHITE=void 0,t.WHITE="w",t.BLACK="b",t.PAWN="p",t.KNIGHT="n",t.BISHOP="b",t.ROOK="r",t.QUEEN="q",t.KING="k",t.DEFAULT_POSITION="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";const e=-1,s={NORMAL:"n",CAPTURE:"c",BIG_PAWN:"b",EP_CAPTURE:"e",PROMOTION:"p",KSIDE_CASTLE:"k",QSIDE_CASTLE:"q"};t.SQUARES=["a8","b8","c8","d8","e8","f8","g8","h8","a7","b7","c7","d7","e7","f7","g7","h7","a6","b6","c6","d6","e6","f6","g6","h6","a5","b5","c5","d5","e5","f5","g5","h5","a4","b4","c4","d4","e4","f4","g4","h4","a3","b3","c3","d3","e3","f3","g3","h3","a2","b2","c2","d2","e2","f2","g2","h2","a1","b1","c1","d1","e1","f1","g1","h1"];const i={NORMAL:1,CAPTURE:2,BIG_PAWN:4,EP_CAPTURE:8,PROMOTION:16,KSIDE_CASTLE:32,QSIDE_CASTLE:64},n={a8:0,b8:1,c8:2,d8:3,e8:4,f8:5,g8:6,h8:7,a7:16,b7:17,c7:18,d7:19,e7:20,f7:21,g7:22,h7:23,a6:32,b6:33,c6:34,d6:35,e6:36,f6:37,g6:38,h6:39,a5:48,b5:49,c5:50,d5:51,e5:52,f5:53,g5:54,h5:55,a4:64,b4:65,c4:66,d4:67,e4:68,f4:69,g4:70,h4:71,a3:80,b3:81,c3:82,d3:83,e3:84,f3:85,g3:86,h3:87,a2:96,b2:97,c2:98,d2:99,e2:100,f2:101,g2:102,h2:103,a1:112,b1:113,c1:114,d1:115,e1:116,f1:117,g1:118,h1:119},r={b:[16,32,17,15],w:[-16,-32,-17,-15]},a={n:[-18,-33,-31,-14,18,33,31,14],b:[-17,-15,17,15],r:[-16,1,16,-1],q:[-17,-16,-15,1,17,16,15,-1],k:[-17,-16,-15,1,17,16,15,-1]},_=[20,0,0,0,0,0,0,24,0,0,0,0,0,0,20,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,24,24,24,24,24,24,56,0,56,24,24,24,24,24,24,0,0,0,0,0,0,2,53,56,53,2,0,0,0,0,0,0,0,0,0,0,0,20,2,24,2,20,0,0,0,0,0,0,0,0,0,0,20,0,0,24,0,0,20,0,0,0,0,0,0,0,0,20,0,0,0,24,0,0,0,20,0,0,0,0,0,0,20,0,0,0,0,24,0,0,0,0,20,0,0,0,0,20,0,0,0,0,0,24,0,0,0,0,0,20,0,0,20,0,0,0,0,0,0,24,0,0,0,0,0,0,20],p=[17,0,0,0,0,0,0,16,0,0,0,0,0,0,15,0,0,17,0,0,0,0,0,16,0,0,0,0,0,15,0,0,0,0,17,0,0,0,0,16,0,0,0,0,15,0,0,0,0,0,0,17,0,0,0,16,0,0,0,15,0,0,0,0,0,0,0,0,17,0,0,16,0,0,15,0,0,0,0,0,0,0,0,0,0,17,0,16,0,15,0,0,0,0,0,0,0,0,0,0,0,0,17,16,15,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-15,-16,-17,0,0,0,0,0,0,0,0,0,0,0,0,-15,0,-16,0,-17,0,0,0,0,0,0,0,0,0,0,-15,0,0,-16,0,0,-17,0,0,0,0,0,0,0,0,-15,0,0,0,-16,0,0,0,-17,0,0,0,0,0,0,-15,0,0,0,0,-16,0,0,0,0,-17,0,0,0,0,-15,0,0,0,0,0,-16,0,0,0,0,0,-17,0,0,-15,0,0,0,0,0,0,-16,0,0,0,0,0,0,-17],m={p:1,n:2,b:4,r:8,q:16,k:32},T="pnbrqkPNBRQK",b=[t.KNIGHT,t.BISHOP,t.ROOK,t.QUEEN],E=7,N=6,Q=1,G=0,V={w:[{square:n.a1,flag:i.QSIDE_CASTLE},{square:n.h1,flag:i.KSIDE_CASTLE}],b:[{square:n.a8,flag:i.QSIDE_CASTLE},{square:n.h8,flag:i.KSIDE_CASTLE}]},Jt={b:Q,w:N},Zt=["1-0","0-1","1/2-1/2","*"];function te(w){return w>>4}function ye(w){return w&15}function ot(w){return"0123456789".indexOf(w)!==-1}function x(w){const o=ye(w),c=te(w);return"abcdefgh".substring(o,o+1)+"87654321".substring(c,c+1)}function $e(w){return w===t.WHITE?t.BLACK:t.WHITE}function at(w){const o=w.split(/\s+/);if(o.length!==6)return{ok:!1,error:"Invalid FEN: must contain six space-delimited fields"};const c=parseInt(o[5],10);if(isNaN(c)||c<=0)return{ok:!1,error:"Invalid FEN: move number must be a positive integer"};const l=parseInt(o[4],10);if(isNaN(l)||l<0)return{ok:!1,error:"Invalid FEN: half move counter number must be a non-negative integer"};if(!/^(-|[abcdefgh][36])$/.test(o[3]))return{ok:!1,error:"Invalid FEN: en-passant square is invalid"};if(/[^kKqQ-]/.test(o[2]))return{ok:!1,error:"Invalid FEN: castling availability is invalid"};if(!/^(w|b)$/.test(o[1]))return{ok:!1,error:"Invalid FEN: side-to-move is invalid"};const h=o[0].split("/");if(h.length!==8)return{ok:!1,error:"Invalid FEN: piece data does not contain 8 '/'-delimited rows"};for(let g=0;g<h.length;g++){let u=0,f=!1;for(let y=0;y<h[g].length;y++)if(ot(h[g][y])){if(f)return{ok:!1,error:"Invalid FEN: piece data is invalid (consecutive number)"};u+=parseInt(h[g][y],10),f=!0}else{if(!/^[prnbqkPRNBQK]$/.test(h[g][y]))return{ok:!1,error:"Invalid FEN: piece data is invalid (invalid piece)"};u+=1,f=!1}if(u!==8)return{ok:!1,error:"Invalid FEN: piece data is invalid (too many squares in rank)"}}if(o[3][1]=="3"&&o[1]=="w"||o[3][1]=="6"&&o[1]=="b")return{ok:!1,error:"Invalid FEN: illegal en-passant square"};const d=[{color:"white",regex:/K/g},{color:"black",regex:/k/g}];for(const{color:g,regex:u}of d){if(!u.test(o[0]))return{ok:!1,error:`Invalid FEN: missing ${g} king`};if((o[0].match(u)||[]).length>1)return{ok:!1,error:`Invalid FEN: too many ${g} kings`}}return{ok:!0}}t.validateFen=at;function es(w,o){const c=w.from,l=w.to,h=w.piece;let d=0,g=0,u=0;for(let f=0,y=o.length;f<y;f++){const C=o[f].from,$=o[f].to,v=o[f].piece;h===v&&c!==C&&l===$&&(d++,te(c)===te(C)&&g++,ye(c)===ye(C)&&u++)}return d>0?g>0&&u>0?x(c):u>0?x(c).charAt(1):x(c).charAt(0):""}function Y(w,o,c,l,h,d=void 0,g=i.NORMAL){const u=te(l);if(h===t.PAWN&&(u===E||u===G))for(let f=0;f<b.length;f++){const y=b[f];w.push({color:o,from:c,to:l,piece:h,captured:d,promotion:y,flags:g|i.PROMOTION})}else w.push({color:o,from:c,to:l,piece:h,captured:d,flags:g})}function lt(w){let o=w.charAt(0);return o>="a"&&o<="h"?w.match(/[a-h]\d.*[a-h]\d/)?void 0:t.PAWN:(o=o.toLowerCase(),o==="o"?t.KING:o)}function ct(w){return w.replace(/=/,"").replace(/[+#]?[?!]*$/,"")}class ts{constructor(o=t.DEFAULT_POSITION){this._board=new Array(128),this._turn=t.WHITE,this._header={},this._kings={w:e,b:e},this._epSquare=-1,this._halfMoves=0,this._moveNumber=0,this._history=[],this._comments={},this._castling={w:0,b:0},this.load(o)}clear(o=!1){this._board=new Array(128),this._kings={w:e,b:e},this._turn=t.WHITE,this._castling={w:0,b:0},this._epSquare=e,this._halfMoves=0,this._moveNumber=1,this._history=[],this._comments={},this._header=o?this._header:{},this._updateSetup(this.fen())}load(o,c=!1){let l=o.split(/\s+/);if(l.length>=2&&l.length<6){const f=["-","-","0","1"];o=l.concat(f.slice(-(6-l.length))).join(" ")}l=o.split(/\s+/);const{ok:h,error:d}=at(o);if(!h)throw new Error(d);const g=l[0];let u=0;this.clear(c);for(let f=0;f<g.length;f++){const y=g.charAt(f);if(y==="/")u+=8;else if(ot(y))u+=parseInt(y,10);else{const C=y<"a"?t.WHITE:t.BLACK;this.put({type:y.toLowerCase(),color:C},x(u)),u++}}this._turn=l[1],l[2].indexOf("K")>-1&&(this._castling.w|=i.KSIDE_CASTLE),l[2].indexOf("Q")>-1&&(this._castling.w|=i.QSIDE_CASTLE),l[2].indexOf("k")>-1&&(this._castling.b|=i.KSIDE_CASTLE),l[2].indexOf("q")>-1&&(this._castling.b|=i.QSIDE_CASTLE),this._epSquare=l[3]==="-"?e:n[l[3]],this._halfMoves=parseInt(l[4],10),this._moveNumber=parseInt(l[5],10),this._updateSetup(this.fen())}fen(){var o,c;let l=0,h="";for(let u=n.a8;u<=n.h1;u++){if(this._board[u]){l>0&&(h+=l,l=0);const{color:f,type:y}=this._board[u];h+=f===t.WHITE?y.toUpperCase():y.toLowerCase()}else l++;u+1&136&&(l>0&&(h+=l),u!==n.h1&&(h+="/"),l=0,u+=8)}let d="";this._castling[t.WHITE]&i.KSIDE_CASTLE&&(d+="K"),this._castling[t.WHITE]&i.QSIDE_CASTLE&&(d+="Q"),this._castling[t.BLACK]&i.KSIDE_CASTLE&&(d+="k"),this._castling[t.BLACK]&i.QSIDE_CASTLE&&(d+="q"),d=d||"-";let g="-";if(this._epSquare!==e){const u=this._epSquare+(this._turn===t.WHITE?16:-16),f=[u+1,u-1];for(const y of f){if(y&136)continue;const C=this._turn;if(((o=this._board[y])===null||o===void 0?void 0:o.color)===C&&((c=this._board[y])===null||c===void 0?void 0:c.type)===t.PAWN){this._makeMove({color:C,from:y,to:this._epSquare,piece:t.PAWN,captured:t.PAWN,flags:i.EP_CAPTURE});const $=!this._isKingAttacked(C);if(this._undoMove(),$){g=x(this._epSquare);break}}}}return[h,this._turn,d,g,this._halfMoves,this._moveNumber].join(" ")}_updateSetup(o){this._history.length>0||(o!==t.DEFAULT_POSITION?(this._header.SetUp="1",this._header.FEN=o):(delete this._header.SetUp,delete this._header.FEN))}reset(){this.load(t.DEFAULT_POSITION)}get(o){return this._board[n[o]]||!1}put({type:o,color:c},l){if(T.indexOf(o.toLowerCase())===-1||!(l in n))return!1;const h=n[l];return o==t.KING&&!(this._kings[c]==e||this._kings[c]==h)?!1:(this._board[h]={type:o,color:c},o===t.KING&&(this._kings[c]=h),this._updateSetup(this.fen()),!0)}remove(o){const c=this.get(o);return delete this._board[n[o]],c&&c.type===t.KING&&(this._kings[c.color]=e),this._updateSetup(this.fen()),c}_attacked(o,c){for(let l=n.a8;l<=n.h1;l++){if(l&136){l+=7;continue}if(this._board[l]===void 0||this._board[l].color!==o)continue;const h=this._board[l],d=l-c;if(d===0)continue;const g=d+119;if(_[g]&m[h.type]){if(h.type===t.PAWN){if(d>0){if(h.color===t.WHITE)return!0}else if(h.color===t.BLACK)return!0;continue}if(h.type==="n"||h.type==="k")return!0;const u=p[g];let f=l+u,y=!1;for(;f!==c;){if(this._board[f]!=null){y=!0;break}f+=u}if(!y)return!0}}return!1}_isKingAttacked(o){return this._attacked($e(o),this._kings[o])}isAttacked(o,c){return this._attacked(c,n[o])}isCheck(){return this._isKingAttacked(this._turn)}inCheck(){return this.isCheck()}isCheckmate(){return this.isCheck()&&this._moves().length===0}isStalemate(){return!this.isCheck()&&this._moves().length===0}isInsufficientMaterial(){const o={b:0,n:0,r:0,q:0,k:0,p:0},c=[];let l=0,h=0;for(let d=n.a8;d<=n.h1;d++){if(h=(h+1)%2,d&136){d+=7;continue}const g=this._board[d];g&&(o[g.type]=g.type in o?o[g.type]+1:1,g.type===t.BISHOP&&c.push(h),l++)}if(l===2)return!0;if(l===3&&(o[t.BISHOP]===1||o[t.KNIGHT]===1))return!0;if(l===o[t.BISHOP]+2){let d=0;const g=c.length;for(let u=0;u<g;u++)d+=c[u];if(d===0||d===g)return!0}return!1}isThreefoldRepetition(){const o=[],c={};let l=!1;for(;;){const h=this._undoMove();if(!h)break;o.push(h)}for(;;){const h=this.fen().split(" ").slice(0,4).join(" ");c[h]=h in c?c[h]+1:1,c[h]>=3&&(l=!0);const d=o.pop();if(d)this._makeMove(d);else break}return l}isDraw(){return this._halfMoves>=100||this.isStalemate()||this.isInsufficientMaterial()||this.isThreefoldRepetition()}isGameOver(){return this.isCheckmate()||this.isStalemate()||this.isDraw()}moves({verbose:o=!1,square:c=void 0}={}){const l=this._moves({square:c});return o?l.map(h=>this._makePretty(h)):l.map(h=>this._moveToSan(h,l))}_moves({legal:o=!0,piece:c=void 0,square:l=void 0}={}){var h;const d=l?l.toLowerCase():void 0,g=c==null?void 0:c.toLowerCase(),u=[],f=this._turn,y=$e(f);let C=n.a8,$=n.h1,v=!1;if(d)if(d in n)C=$=n[d],v=!0;else return[];for(let P=C;P<=$;P++){if(P&136){P+=7;continue}if(!this._board[P]||this._board[P].color===y)continue;const{type:S}=this._board[P];let L;if(S===t.PAWN){if(g&&g!==S)continue;L=P+r[f][0],this._board[L]||(Y(u,f,P,L,t.PAWN),L=P+r[f][1],Jt[f]===te(P)&&!this._board[L]&&Y(u,f,P,L,t.PAWN,void 0,i.BIG_PAWN));for(let U=2;U<4;U++)L=P+r[f][U],!(L&136)&&(((h=this._board[L])===null||h===void 0?void 0:h.color)===y?Y(u,f,P,L,t.PAWN,this._board[L].type,i.CAPTURE):L===this._epSquare&&Y(u,f,P,L,t.PAWN,t.PAWN,i.EP_CAPTURE))}else{if(g&&g!==S)continue;for(let U=0,oe=a[S].length;U<oe;U++){const k=a[S][U];for(L=P;L+=k,!(L&136);){if(!this._board[L])Y(u,f,P,L,S);else{if(this._board[L].color===f)break;Y(u,f,P,L,S,this._board[L].type,i.CAPTURE);break}if(S===t.KNIGHT||S===t.KING)break}}}}if((g===void 0||g===t.KING)&&(!v||$===this._kings[f])){if(this._castling[f]&i.KSIDE_CASTLE){const P=this._kings[f],S=P+2;!this._board[P+1]&&!this._board[S]&&!this._attacked(y,this._kings[f])&&!this._attacked(y,P+1)&&!this._attacked(y,S)&&Y(u,f,this._kings[f],S,t.KING,void 0,i.KSIDE_CASTLE)}if(this._castling[f]&i.QSIDE_CASTLE){const P=this._kings[f],S=P-2;!this._board[P-1]&&!this._board[P-2]&&!this._board[P-3]&&!this._attacked(y,this._kings[f])&&!this._attacked(y,P-1)&&!this._attacked(y,S)&&Y(u,f,this._kings[f],S,t.KING,void 0,i.QSIDE_CASTLE)}}if(!o)return u;const M=[];for(let P=0,S=u.length;P<S;P++)this._makeMove(u[P]),this._isKingAttacked(f)||M.push(u[P]),this._undoMove();return M}move(o,{strict:c=!1}={}){let l=null;if(typeof o=="string")l=this._moveFromSan(o,c);else if(typeof o=="object"){const d=this._moves();for(let g=0,u=d.length;g<u;g++)if(o.from===x(d[g].from)&&o.to===x(d[g].to)&&(!("promotion"in d[g])||o.promotion===d[g].promotion)){l=d[g];break}}if(!l)throw typeof o=="string"?new Error(`Invalid move: ${o}`):new Error(`Invalid move: ${JSON.stringify(o)}`);const h=this._makePretty(l);return this._makeMove(l),h}_push(o){this._history.push({move:o,kings:{b:this._kings.b,w:this._kings.w},turn:this._turn,castling:{b:this._castling.b,w:this._castling.w},epSquare:this._epSquare,halfMoves:this._halfMoves,moveNumber:this._moveNumber})}_makeMove(o){const c=this._turn,l=$e(c);if(this._push(o),this._board[o.to]=this._board[o.from],delete this._board[o.from],o.flags&i.EP_CAPTURE&&(this._turn===t.BLACK?delete this._board[o.to-16]:delete this._board[o.to+16]),o.promotion&&(this._board[o.to]={type:o.promotion,color:c}),this._board[o.to].type===t.KING){if(this._kings[c]=o.to,o.flags&i.KSIDE_CASTLE){const h=o.to-1,d=o.to+1;this._board[h]=this._board[d],delete this._board[d]}else if(o.flags&i.QSIDE_CASTLE){const h=o.to+1,d=o.to-2;this._board[h]=this._board[d],delete this._board[d]}this._castling[c]=0}if(this._castling[c]){for(let h=0,d=V[c].length;h<d;h++)if(o.from===V[c][h].square&&this._castling[c]&V[c][h].flag){this._castling[c]^=V[c][h].flag;break}}if(this._castling[l]){for(let h=0,d=V[l].length;h<d;h++)if(o.to===V[l][h].square&&this._castling[l]&V[l][h].flag){this._castling[l]^=V[l][h].flag;break}}o.flags&i.BIG_PAWN?c===t.BLACK?this._epSquare=o.to-16:this._epSquare=o.to+16:this._epSquare=e,o.piece===t.PAWN?this._halfMoves=0:o.flags&(i.CAPTURE|i.EP_CAPTURE)?this._halfMoves=0:this._halfMoves++,c===t.BLACK&&this._moveNumber++,this._turn=l}undo(){const o=this._undoMove();return o?this._makePretty(o):null}_undoMove(){const o=this._history.pop();if(o===void 0)return null;const c=o.move;this._kings=o.kings,this._turn=o.turn,this._castling=o.castling,this._epSquare=o.epSquare,this._halfMoves=o.halfMoves,this._moveNumber=o.moveNumber;const l=this._turn,h=$e(l);if(this._board[c.from]=this._board[c.to],this._board[c.from].type=c.piece,delete this._board[c.to],c.captured)if(c.flags&i.EP_CAPTURE){let d;l===t.BLACK?d=c.to-16:d=c.to+16,this._board[d]={type:t.PAWN,color:h}}else this._board[c.to]={type:c.captured,color:h};if(c.flags&(i.KSIDE_CASTLE|i.QSIDE_CASTLE)){let d,g;c.flags&i.KSIDE_CASTLE?(d=c.to+1,g=c.to-1):(d=c.to-2,g=c.to+1),this._board[d]=this._board[g],delete this._board[g]}return c}pgn({newline:o=`
`,maxWidth:c=0}={}){const l=[];let h=!1;for(const v in this._header)l.push("["+v+' "'+this._header[v]+'"]'+o),h=!0;h&&this._history.length&&l.push(o);const d=v=>{const M=this._comments[this.fen()];if(typeof M<"u"){const P=v.length>0?" ":"";v=`${v}${P}{${M}}`}return v},g=[];for(;this._history.length>0;)g.push(this._undoMove());const u=[];let f="";for(g.length===0&&u.push(d(""));g.length>0;){f=d(f);const v=g.pop();if(!v)break;if(!this._history.length&&v.color==="b"){const M=`${this._moveNumber}. ...`;f=f?`${f} ${M}`:M}else v.color==="w"&&(f.length&&u.push(f),f=this._moveNumber+".");f=f+" "+this._moveToSan(v,this._moves({legal:!0})),this._makeMove(v)}if(f.length&&u.push(d(f)),typeof this._header.Result<"u"&&u.push(this._header.Result),c===0)return l.join("")+u.join(" ");const y=function(){return l.length>0&&l[l.length-1]===" "?(l.pop(),!0):!1},C=function(v,M){for(const P of M.split(" "))if(P){if(v+P.length>c){for(;y();)v--;l.push(o),v=0}l.push(P),v+=P.length,l.push(" "),v++}return y()&&v--,v};let $=0;for(let v=0;v<u.length;v++){if($+u[v].length>c&&u[v].includes("{")){$=C($,u[v]);continue}$+u[v].length>c&&v!==0?(l[l.length-1]===" "&&l.pop(),l.push(o),$=0):v!==0&&(l.push(" "),$++),l.push(u[v]),$+=u[v].length}return l.join("")}header(...o){for(let c=0;c<o.length;c+=2)typeof o[c]=="string"&&typeof o[c+1]=="string"&&(this._header[o[c]]=o[c+1]);return this._header}loadPgn(o,{strict:c=!1,newlineChar:l=`\r?
`}={}){function h(k){return k.replace(/\\/g,"\\")}function d(k){const K={},X=k.split(new RegExp(h(l)));let Be="",ht="";for(let Le=0;Le<X.length;Le++){const dt=/^\s*\[\s*([A-Za-z]+)\s*"(.*)"\s*\]\s*$/;Be=X[Le].replace(dt,"$1"),ht=X[Le].replace(dt,"$2"),Be.trim().length>0&&(K[Be]=ht)}return K}o=o.trim();const u=new RegExp("^(\\[((?:"+h(l)+")|.)*\\])((?:\\s*"+h(l)+"){2}|(?:\\s*"+h(l)+")*$)").exec(o),f=u&&u.length>=2?u[1]:"";this.reset();const y=d(f);let C="";for(const k in y)k.toLowerCase()==="fen"&&(C=y[k]),this.header(k,y[k]);if(!c)C&&this.load(C,!0);else if(y.SetUp==="1"){if(!("FEN"in y))throw new Error("Invalid PGN: FEN tag must be supplied with SetUp tag");this.load(y.FEN,!0)}function $(k){return Array.from(k).map(function(K){return K.charCodeAt(0)<128?K.charCodeAt(0).toString(16):encodeURIComponent(K).replace(/%/g,"").toLowerCase()}).join("")}function v(k){return k.length==0?"":decodeURIComponent("%"+(k.match(/.{1,2}/g)||[]).join("%"))}const M=function(k){return k=k.replace(new RegExp(h(l),"g")," "),`{${$(k.slice(1,k.length-1))}}`},P=function(k){if(k.startsWith("{")&&k.endsWith("}"))return v(k.slice(1,k.length-1))};let S=o.replace(f,"").replace(new RegExp(`({[^}]*})+?|;([^${h(l)}]*)`,"g"),function(k,K,X){return K!==void 0?M(K):" "+M(`{${X.slice(1)}}`)}).replace(new RegExp(h(l),"g")," ");const L=/(\([^()]+\))+?/g;for(;L.test(S);)S=S.replace(L,"");S=S.replace(/\d+\.(\.\.)?/g,""),S=S.replace(/\.\.\./g,""),S=S.replace(/\$\d+/g,"");let U=S.trim().split(new RegExp(/\s+/));U=U.filter(k=>k!=="");let oe="";for(let k=0;k<U.length;k++){const K=P(U[k]);if(K!==void 0){this._comments[this.fen()]=K;continue}const X=this._moveFromSan(U[k],c);if(X==null)if(Zt.indexOf(U[k])>-1)oe=U[k];else throw new Error(`Invalid move in PGN: ${U[k]}`);else oe="",this._makeMove(X)}oe&&Object.keys(this._header).length&&!this._header.Result&&this.header("Result",oe)}_moveToSan(o,c){let l="";if(o.flags&i.KSIDE_CASTLE)l="O-O";else if(o.flags&i.QSIDE_CASTLE)l="O-O-O";else{if(o.piece!==t.PAWN){const h=es(o,c);l+=o.piece.toUpperCase()+h}o.flags&(i.CAPTURE|i.EP_CAPTURE)&&(o.piece===t.PAWN&&(l+=x(o.from)[0]),l+="x"),l+=x(o.to),o.promotion&&(l+="="+o.promotion.toUpperCase())}return this._makeMove(o),this.isCheck()&&(this.isCheckmate()?l+="#":l+="+"),this._undoMove(),l}_moveFromSan(o,c=!1){const l=ct(o);let h=lt(l),d=this._moves({legal:!0,piece:h});for(let v=0,M=d.length;v<M;v++)if(l===ct(this._moveToSan(d[v],d)))return d[v];if(c)return null;let g,u,f,y,C,$=!1;u=l.match(/([pnbrqkPNBRQK])?([a-h][1-8])x?-?([a-h][1-8])([qrbnQRBN])?/),u?(g=u[1],f=u[2],y=u[3],C=u[4],f.length==1&&($=!0)):(u=l.match(/([pnbrqkPNBRQK])?([a-h]?[1-8]?)x?-?([a-h][1-8])([qrbnQRBN])?/),u&&(g=u[1],f=u[2],y=u[3],C=u[4],f.length==1&&($=!0))),h=lt(l),d=this._moves({legal:!0,piece:g||h});for(let v=0,M=d.length;v<M;v++)if(f&&y){if((!g||g.toLowerCase()==d[v].piece)&&n[f]==d[v].from&&n[y]==d[v].to&&(!C||C.toLowerCase()==d[v].promotion))return d[v];if($){const P=x(d[v].from);if((!g||g.toLowerCase()==d[v].piece)&&n[y]==d[v].to&&(f==P[0]||f==P[1])&&(!C||C.toLowerCase()==d[v].promotion))return d[v]}}return null}ascii(){let o=`   +------------------------+
`;for(let c=n.a8;c<=n.h1;c++){if(ye(c)===0&&(o+=" "+"87654321"[te(c)]+" |"),this._board[c]){const l=this._board[c].type,d=this._board[c].color===t.WHITE?l.toUpperCase():l.toLowerCase();o+=" "+d+" "}else o+=" . ";c+1&136&&(o+=`|
`,c+=8)}return o+=`   +------------------------+
`,o+="     a  b  c  d  e  f  g  h",o}perft(o){const c=this._moves({legal:!1});let l=0;const h=this._turn;for(let d=0,g=c.length;d<g;d++)this._makeMove(c[d]),this._isKingAttacked(h)||(o-1>0?l+=this.perft(o-1):l++),this._undoMove();return l}_makePretty(o){const{color:c,piece:l,from:h,to:d,flags:g,captured:u,promotion:f}=o;let y="";for(const M in i)i[M]&g&&(y+=s[M]);const C=x(h),$=x(d),v={color:c,piece:l,from:C,to:$,san:this._moveToSan(o,this._moves({legal:!0})),flags:y,lan:C+$};return u&&(v.captured=u),f&&(v.promotion=f,v.lan+=f),v}turn(){return this._turn}board(){const o=[];let c=[];for(let l=n.a8;l<=n.h1;l++)this._board[l]==null?c.push(null):c.push({square:x(l),type:this._board[l].type,color:this._board[l].color}),l+1&136&&(o.push(c),c=[],l+=8);return o}squareColor(o){if(o in n){const c=n[o];return(te(c)+ye(c))%2===0?"light":"dark"}return null}history({verbose:o=!1}={}){const c=[],l=[];for(;this._history.length>0;)c.push(this._undoMove());for(;;){const h=c.pop();if(!h)break;o?l.push(Object.assign({fen:this.fen()},this._makePretty(h))):l.push(this._moveToSan(h,this._moves())),this._makeMove(h)}return l}_pruneComments(){const o=[],c={},l=h=>{h in this._comments&&(c[h]=this._comments[h])};for(;this._history.length>0;)o.push(this._undoMove());for(l(this.fen());;){const h=o.pop();if(!h)break;this._makeMove(h),l(this.fen())}this._comments=c}getComment(){return this._comments[this.fen()]}setComment(o){this._comments[this.fen()]=o.replace("{","[").replace("}","]")}deleteComment(){const o=this._comments[this.fen()];return delete this._comments[this.fen()],o}getComments(){return this._pruneComments(),Object.keys(this._comments).map(o=>({fen:o,comment:this._comments[o]}))}deleteComments(){return this._pruneComments(),Object.keys(this._comments).map(o=>{const c=this._comments[o];return delete this._comments[o],{fen:o,comment:c}})}}t.Chess=ts})(At);function $t([t,e]){return"abcdefgh"[t]+"12345678"[e]}function Lt([t,e]){return["abcdefgh".indexOf(t),"12345678".indexOf(e)]}function ss(t){return Object.fromEntries(t.flatMap((e,s)=>e.map((i,n)=>[$t([n,s]),i])))}function is(t){return[t&15,7-(t>>4)]}function Ie(t){return t._history}const et=["        ","ppp  ppp","bn    nb","r  pp  r","r  pp  r","bn    nb","ppp  ppp","        "].map(t=>t.split("")),tt=ss(et);function ns(t){return t._moves().filter(e=>e.piece!=="k"||tt[$t(is(e.to))]===" ")}function de(t){return ns(t).length===0||t.isThreefoldRepetition()||t._halfMoves>=100}function rs(t,e){const s=t.turn(),i=t.move(e),[n,r]=Lt(i.to),a=et[r][n];return a!==" "&&(t.put({type:a,color:s},i.to),Ie(t).at(-1).move.promotion=a),i}async function os(t,e,s){const i=t.turn(),n=t.move(e);await s();const[r,a]=Lt(n.to),_=et[a][r];return _!==" "&&(t.put({type:_,color:i},n.to),Ie(t).at(-1).move.promotion=_),n}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qe=window,st=qe.ShadowRoot&&(qe.ShadyCSS===void 0||qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol(),ut=new WeakMap;let Tt=class{constructor(e,s,i){if(this._$cssResult$=!0,i!==it)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=s}get styleSheet(){let e=this.o;const s=this.t;if(st&&e===void 0){const i=s!==void 0&&s.length===1;i&&(e=ut.get(s)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ut.set(s,e))}return e}toString(){return this.cssText}};const as=t=>new Tt(typeof t=="string"?t:t+"",void 0,it),ls=(t,...e)=>{const s=t.length===1?t[0]:e.reduce((i,n,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1],t[0]);return new Tt(s,t,it)},cs=(t,e)=>{st?t.adoptedStyleSheets=e.map(s=>s instanceof CSSStyleSheet?s:s.styleSheet):e.forEach(s=>{const i=document.createElement("style"),n=qe.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=s.cssText,t.appendChild(i)})},ft=st?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let s="";for(const i of e.cssRules)s+=i.cssText;return as(s)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var je;const Oe=window,pt=Oe.trustedTypes,hs=pt?pt.emptyScript:"",gt=Oe.reactiveElementPolyfillSupport,Ge={toAttribute(t,e){switch(e){case Boolean:t=t?hs:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=t!==null;break;case Number:s=t===null?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch{s=null}}return s}},Mt=(t,e)=>e!==t&&(e==e||t==t),Ke={attribute:!0,type:String,converter:Ge,reflect:!1,hasChanged:Mt};let he=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var s;this.finalize(),((s=this.h)!==null&&s!==void 0?s:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((s,i)=>{const n=this._$Ep(i,s);n!==void 0&&(this._$Ev.set(n,i),e.push(n))}),e}static createProperty(e,s=Ke){if(s.state&&(s.attribute=!1),this.finalize(),this.elementProperties.set(e,s),!s.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,s);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,s,i){return{get(){return this[s]},set(n){const r=this[e];this[s]=n,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ke}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const s=this.properties,i=[...Object.getOwnPropertyNames(s),...Object.getOwnPropertySymbols(s)];for(const n of i)this.createProperty(n,s[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const s=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)s.unshift(ft(n))}else e!==void 0&&s.push(ft(e));return s}static _$Ep(e,s){const i=s.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(s=>this.enableUpdating=s),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(s=>s(this))}addController(e){var s,i;((s=this._$ES)!==null&&s!==void 0?s:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var s;(s=this._$ES)===null||s===void 0||s.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,s)=>{this.hasOwnProperty(s)&&(this._$Ei.set(s,this[s]),delete this[s])})}createRenderRoot(){var e;const s=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return cs(s,this.constructor.elementStyles),s}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostConnected)===null||i===void 0?void 0:i.call(s)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostDisconnected)===null||i===void 0?void 0:i.call(s)})}attributeChangedCallback(e,s,i){this._$AK(e,i)}_$EO(e,s,i=Ke){var n;const r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){const a=(((n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?i.converter:Ge).toAttribute(s,i.type);this._$El=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$El=null}}_$AK(e,s){var i;const n=this.constructor,r=n._$Ev.get(e);if(r!==void 0&&this._$El!==r){const a=n.getPropertyOptions(r),_=typeof a.converter=="function"?{fromAttribute:a.converter}:((i=a.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?a.converter:Ge;this._$El=r,this[r]=_.fromAttribute(s,a.type),this._$El=null}}requestUpdate(e,s,i){let n=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Mt)(this[e],s)?(this._$AL.has(e)||this._$AL.set(e,s),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(s){Promise.reject(s)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let s=!1;const i=this._$AL;try{s=this.shouldUpdate(i),s?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(i)):this._$Ek()}catch(n){throw s=!1,this._$Ek(),n}s&&this._$AE(i)}willUpdate(e){}_$AE(e){var s;(s=this._$ES)===null||s===void 0||s.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((s,i)=>this._$EO(i,this[i],s)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};he.finalized=!0,he.elementProperties=new Map,he.elementStyles=[],he.shadowRootOptions={mode:"open"},gt==null||gt({ReactiveElement:he}),((je=Oe.reactiveElementVersions)!==null&&je!==void 0?je:Oe.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ze;const Re=window,pe=Re.trustedTypes,_t=pe?pe.createPolicy("lit-html",{createHTML:t=>t}):void 0,J=`lit$${(Math.random()+"").slice(9)}$`,Nt="?"+J,ds=`<${Nt}>`,ge=document,Ee=(t="")=>ge.createComment(t),Se=t=>t===null||typeof t!="object"&&typeof t!="function",qt=Array.isArray,us=t=>qt(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",be=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,mt=/-->/g,vt=/>/g,se=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,bt=/"/g,Ot=/^(?:script|style|textarea|title)$/i,Rt=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),W=Rt(1),z=Rt(2),ee=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Pt=new WeakMap,ue=ge.createTreeWalker(ge,129,null,!1),fs=(t,e)=>{const s=t.length-1,i=[];let n,r=e===2?"<svg>":"",a=be;for(let p=0;p<s;p++){const m=t[p];let T,b,E=-1,N=0;for(;N<m.length&&(a.lastIndex=N,b=a.exec(m),b!==null);)N=a.lastIndex,a===be?b[1]==="!--"?a=mt:b[1]!==void 0?a=vt:b[2]!==void 0?(Ot.test(b[2])&&(n=RegExp("</"+b[2],"g")),a=se):b[3]!==void 0&&(a=se):a===se?b[0]===">"?(a=n??be,E=-1):b[1]===void 0?E=-2:(E=a.lastIndex-b[2].length,T=b[1],a=b[3]===void 0?se:b[3]==='"'?bt:yt):a===bt||a===yt?a=se:a===mt||a===vt?a=be:(a=se,n=void 0);const Q=a===se&&t[p+1].startsWith("/>")?" ":"";r+=a===be?m+ds:E>=0?(i.push(T),m.slice(0,E)+"$lit$"+m.slice(E)+J+Q):m+J+(E===-2?(i.push(void 0),p):Q)}const _=r+(t[s]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[_t!==void 0?_t.createHTML(_):_,i]};class Ce{constructor({strings:e,_$litType$:s},i){let n;this.parts=[];let r=0,a=0;const _=e.length-1,p=this.parts,[m,T]=fs(e,s);if(this.el=Ce.createElement(m,i),ue.currentNode=this.el.content,s===2){const b=this.el.content,E=b.firstChild;E.remove(),b.append(...E.childNodes)}for(;(n=ue.nextNode())!==null&&p.length<_;){if(n.nodeType===1){if(n.hasAttributes()){const b=[];for(const E of n.getAttributeNames())if(E.endsWith("$lit$")||E.startsWith(J)){const N=T[a++];if(b.push(E),N!==void 0){const Q=n.getAttribute(N.toLowerCase()+"$lit$").split(J),G=/([.?@])?(.*)/.exec(N);p.push({type:1,index:r,name:G[2],strings:Q,ctor:G[1]==="."?gs:G[1]==="?"?ms:G[1]==="@"?vs:Ue})}else p.push({type:6,index:r})}for(const E of b)n.removeAttribute(E)}if(Ot.test(n.tagName)){const b=n.textContent.split(J),E=b.length-1;if(E>0){n.textContent=pe?pe.emptyScript:"";for(let N=0;N<E;N++)n.append(b[N],Ee()),ue.nextNode(),p.push({type:2,index:++r});n.append(b[E],Ee())}}}else if(n.nodeType===8)if(n.data===Nt)p.push({type:2,index:r});else{let b=-1;for(;(b=n.data.indexOf(J,b+1))!==-1;)p.push({type:7,index:r}),b+=J.length-1}r++}}static createElement(e,s){const i=ge.createElement("template");return i.innerHTML=e,i}}function _e(t,e,s=t,i){var n,r,a,_;if(e===ee)return e;let p=i!==void 0?(n=s._$Co)===null||n===void 0?void 0:n[i]:s._$Cl;const m=Se(e)?void 0:e._$litDirective$;return(p==null?void 0:p.constructor)!==m&&((r=p==null?void 0:p._$AO)===null||r===void 0||r.call(p,!1),m===void 0?p=void 0:(p=new m(t),p._$AT(t,s,i)),i!==void 0?((a=(_=s)._$Co)!==null&&a!==void 0?a:_._$Co=[])[i]=p:s._$Cl=p),p!==void 0&&(e=_e(t,p._$AS(t,e.values),p,i)),e}class ps{constructor(e,s){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=s}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var s;const{el:{content:i},parts:n}=this._$AD,r=((s=e==null?void 0:e.creationScope)!==null&&s!==void 0?s:ge).importNode(i,!0);ue.currentNode=r;let a=ue.nextNode(),_=0,p=0,m=n[0];for(;m!==void 0;){if(_===m.index){let T;m.type===2?T=new we(a,a.nextSibling,this,e):m.type===1?T=new m.ctor(a,m.name,m.strings,this,e):m.type===6&&(T=new ys(a,this,e)),this.u.push(T),m=n[++p]}_!==(m==null?void 0:m.index)&&(a=ue.nextNode(),_++)}return r}p(e){let s=0;for(const i of this.u)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,s),s+=i.strings.length-2):i._$AI(e[s])),s++}}class we{constructor(e,s,i,n){var r;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=s,this._$AM=i,this.options=n,this._$Cm=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var e,s;return(s=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&s!==void 0?s:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const s=this._$AM;return s!==void 0&&e.nodeType===11&&(e=s.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,s=this){e=_e(this,e,s),Se(e)?e===A||e==null||e===""?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==ee&&this.g(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):us(e)?this.k(e):this.g(e)}O(e,s=this._$AB){return this._$AA.parentNode.insertBefore(e,s)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==A&&Se(this._$AH)?this._$AA.nextSibling.data=e:this.T(ge.createTextNode(e)),this._$AH=e}$(e){var s;const{values:i,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=Ce.createElement(n.h,this.options)),n);if(((s=this._$AH)===null||s===void 0?void 0:s._$AD)===r)this._$AH.p(i);else{const a=new ps(r,this),_=a.v(this.options);a.p(i),this.T(_),this._$AH=a}}_$AC(e){let s=Pt.get(e.strings);return s===void 0&&Pt.set(e.strings,s=new Ce(e)),s}k(e){qt(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,n=0;for(const r of e)n===s.length?s.push(i=new we(this.O(Ee()),this.O(Ee()),this,this.options)):i=s[n],i._$AI(r),n++;n<s.length&&(this._$AR(i&&i._$AB.nextSibling,n),s.length=n)}_$AR(e=this._$AA.nextSibling,s){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,s);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var s;this._$AM===void 0&&(this._$Cm=e,(s=this._$AP)===null||s===void 0||s.call(this,e))}}class Ue{constructor(e,s,i,n,r){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=s,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=A}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,s=this,i,n){const r=this.strings;let a=!1;if(r===void 0)e=_e(this,e,s,0),a=!Se(e)||e!==this._$AH&&e!==ee,a&&(this._$AH=e);else{const _=e;let p,m;for(e=r[0],p=0;p<r.length-1;p++)m=_e(this,_[i+p],s,p),m===ee&&(m=this._$AH[p]),a||(a=!Se(m)||m!==this._$AH[p]),m===A?e=A:e!==A&&(e+=(m??"")+r[p+1]),this._$AH[p]=m}a&&!n&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class gs extends Ue{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}}const _s=pe?pe.emptyScript:"";class ms extends Ue{constructor(){super(...arguments),this.type=4}j(e){e&&e!==A?this.element.setAttribute(this.name,_s):this.element.removeAttribute(this.name)}}class vs extends Ue{constructor(e,s,i,n,r){super(e,s,i,n,r),this.type=5}_$AI(e,s=this){var i;if((e=(i=_e(this,e,s,0))!==null&&i!==void 0?i:A)===ee)return;const n=this._$AH,r=e===A&&n!==A||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,a=e!==A&&(n===A||r);r&&this.element.removeEventListener(this.name,this,n),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var s,i;typeof this._$AH=="function"?this._$AH.call((i=(s=this.options)===null||s===void 0?void 0:s.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class ys{constructor(e,s,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=s,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){_e(this,e)}}const kt=Re.litHtmlPolyfillSupport;kt==null||kt(Ce,we),((ze=Re.litHtmlVersions)!==null&&ze!==void 0?ze:Re.litHtmlVersions=[]).push("2.6.1");const nt=(t,e,s)=>{var i,n;const r=(i=s==null?void 0:s.renderBefore)!==null&&i!==void 0?i:e;let a=r._$litPart$;if(a===void 0){const _=(n=s==null?void 0:s.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=a=new we(e.insertBefore(Ee(),_),_,void 0,s??{})}return a._$AI(t),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var He,Fe;class ke extends he{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,s;const i=super.createRenderRoot();return(e=(s=this.renderOptions).renderBefore)!==null&&e!==void 0||(s.renderBefore=i.firstChild),i}update(e){const s=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=nt(s,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ee}}ke.finalized=!0,ke._$litElement$=!0,(He=globalThis.litElementHydrateSupport)===null||He===void 0||He.call(globalThis,{LitElement:ke});const Et=globalThis.litElementPolyfillSupport;Et==null||Et({LitElement:ke});((Fe=globalThis.litElementVersions)!==null&&Fe!==void 0?Fe:globalThis.litElementVersions=[]).push("3.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const bs=t=>e=>typeof e=="function"?((s,i)=>(customElements.define(s,i),i))(t,e):((s,i)=>{const{kind:n,elements:r}=i;return{kind:n,elements:r,finisher(a){customElements.define(s,a)}}})(t,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ps=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(s){s.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(s){s.createProperty(e.key,t)}};function j(t){return(e,s)=>s!==void 0?((i,n,r)=>{n.constructor.createProperty(r,i)})(t,e,s):Ps(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ks=({finisher:t,descriptor:e})=>(s,i)=>{var n;if(i===void 0){const r=(n=s.originalKey)!==null&&n!==void 0?n:s.key,a=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(s.key)}:{...s,key:r};return t!=null&&(a.finisher=function(_){t(_,r)}),a}{const r=s.constructor;e!==void 0&&Object.defineProperty(s,i,e(i)),t==null||t(r,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Es(t,e){return ks({descriptor:s=>{const i={get(){var n,r;return(r=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(t))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const n=typeof s=="symbol"?Symbol():"__"+s;i.get=function(){var r,a;return this[n]===void 0&&(this[n]=(a=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(t))!==null&&a!==void 0?a:null),this[n]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var We;((We=window.HTMLSlotElement)===null||We===void 0?void 0:We.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ss={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},It=t=>(...e)=>({_$litDirective$:t,values:e});let Ut=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,s,i){this._$Ct=e,this._$AM=s,this._$Ci=i}_$AS(e,s){return this.update(e,s)}update(e,s){return this.render(...s)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=It(class extends Ut{constructor(t){var e;if(super(t),t.type!==Ss.ATTRIBUTE||t.name!=="style"||((e=t.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,s)=>{const i=t[s];return i==null?e:e+`${s=s.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(t,[e]){const{style:s}=t.element;if(this.vt===void 0){this.vt=new Set;for(const i in e)this.vt.add(i);return this.render(e)}this.vt.forEach(i=>{e[i]==null&&(this.vt.delete(i),i.includes("-")?s.removeProperty(i):s[i]="")});for(const i in e){const n=e[i];n!=null&&(this.vt.add(i),i.includes("-")?s.setProperty(i,n):s[i]=n)}return ee}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Cs=t=>t??A,ve=t=>typeof t=="string",Ve=t=>typeof t=="function",R=t=>JSON.parse(JSON.stringify(t)),ie=(t,e)=>{for(const[s,i]of Object.entries(e)){const n="{"+s+"}";for(;t.includes(n);)t=t.replace(n,i)}return t};console.assert(ie("abc",{a:"x"})==="abc"),console.assert(ie("{a}bc",{})==="{a}bc"),console.assert(ie("{a}bc",{p:"q"})==="{a}bc"),console.assert(ie("{a}bc",{a:"x"})==="xbc"),console.assert(ie("{a}bc{a}bc",{a:"x"})==="xbcxbc"),console.assert(ie("{a}{a}{b}",{a:"x",b:"y"})==="xxy");const ws=ls`
  :host {
    display: block;
    position: relative;
    --light-color: #f0d9b5;
    --dark-color: #b58863;
    --highlight-color: yellow;
  }

  [part~='board'] {
    border: 2px solid #404040;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(8, 12.5%);
    grid-template-rows: repeat(8, 12.5%);
  }

  [part~='square'] {
    position: relative;

    /* disable any native browser highlighting */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  [part~='piece'],
  .piece-image {
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  [part~='spare-pieces'] {
    display: grid;
    position: relative;
    padding: 0 2px;
    grid-template-columns: repeat(8, 12.5%);
  }

  [part~='dragged-piece'] {
    display: none;
    position: absolute;
  }

  [part~='white'] {
    background-color: var(--light-color);
    color: var(--dark-color);
  }

  [part~='black'] {
    background-color: var(--dark-color);
    color: var(--light-color);
  }

  [part~='highlight'] {
    box-shadow: inset 0 0 3px 3px var(--highlight-color);
  }

  [part~='notation'] {
    cursor: default;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 14px;
    position: absolute;
  }

  [part~='alpha'] {
    bottom: 1px;
    right: 3px;
  }

  [part~='numeric'] {
    top: 2px;
    left: 2px;
  }
`,De="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",me="abcdefgh".split(""),As=["wK","wQ","wR","wB","wN","wP"],$s=["bK","bQ","bR","bB","bN","bP"],Ls=t=>t.charCodeAt(0)%2^t.charCodeAt(1)%2?"white":"black",q=t=>ve(t)&&t.search(/^[a-h][1-8]$/)!==-1,Ts=t=>{if(!ve(t))return!1;const e=t.split("-");return e.length!==2?!1:q(e[0])&&q(e[1])};console.assert(q("a1")),console.assert(q("e2")),console.assert(!q("D2")),console.assert(!q("g9")),console.assert(!q("a")),console.assert(!q(!0)),console.assert(!q(null)),console.assert(!q({}));const F=t=>ve(t)&&t.search(/^[bw][KQRNBP]$/)!==-1;console.assert(F("bP")),console.assert(F("bK")),console.assert(F("wK")),console.assert(F("wR")),console.assert(!F("WR")),console.assert(!F("Wr")),console.assert(!F("a")),console.assert(!F(!0)),console.assert(!F(null)),console.assert(!F({}));const Ms=t=>t.replace(/11111111/g,"8").replace(/1111111/g,"7").replace(/111111/g,"6").replace(/11111/g,"5").replace(/1111/g,"4").replace(/111/g,"3").replace(/11/g,"2"),Ns=t=>t.replace(/8/g,"11111111").replace(/7/g,"1111111").replace(/6/g,"111111").replace(/5/g,"11111").replace(/4/g,"1111").replace(/3/g,"111").replace(/2/g,"11"),B=t=>{if(!ve(t))return!1;t=t.replace(/ .+$/,""),t=Ns(t);const e=t.split("/");if(e.length!==8)return!1;for(let s=0;s<8;s++)if(e[s].length!==8||e[s].search(/[^kqrnbpKQRNBP1]/)!==-1)return!1;return!0};console.assert(B(De)),console.assert(B("8/8/8/8/8/8/8/8")),console.assert(B("r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R")),console.assert(B("3r3r/1p4pp/2nb1k2/pP3p2/8/PB2PN2/p4PPP/R4RK1 b - - 0 1")),console.assert(!B("3r3z/1p4pp/2nb1k2/pP3p2/8/PB2PN2/p4PPP/R4RK1 b - - 0 1")),console.assert(!B("anbqkbnr/8/8/8/8/8/PPPPPPPP/8")),console.assert(!B("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/")),console.assert(!B("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBN")),console.assert(!B("888888/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR")),console.assert(!B("888888/pppppppp/74/8/8/8/PPPPPPPP/RNBQKBNR")),console.assert(!B({}));const H=t=>{if(typeof t!="object"||t===null)return!1;for(const[e,s]of Object.entries(t))if(!q(e)||!F(s))return!1;return!0};console.assert(H({})),console.assert(H({e2:"wP"})),console.assert(H({e2:"wP",d2:"wP"})),console.assert(!H({e2:"BP"})),console.assert(!H({y2:"wP"})),console.assert(!H(null)),console.assert(!H(void 0)),console.assert(!H(1)),console.assert(!H("start")),console.assert(!H(De));const qs=t=>t.toLowerCase()===t?"b"+t.toUpperCase():"w"+t.toUpperCase(),Os=t=>{const e=t.split("");return e[0]==="w"?e[1].toUpperCase():e[1].toLowerCase()},Dt=t=>{if(!B(t))return!1;t=t.replace(/ .+$/,"");const e=t.split("/"),s={};let i=8;for(let n=0;n<8;n++){const r=e[n].split("");let a=0;for(let _=0;_<r.length;_++)if(r[_].search(/[1-8]/)!==-1){const p=parseInt(r[_],10);a=a+p}else{const p=me[a]+i;s[p]=qs(r[_]),a=a+1}i=i-1}return s},xt=Dt(De),fe=t=>{if(!H(t))return!1;let e="",s=8;for(let i=0;i<8;i++){for(let n=0;n<8;n++){const r=me[n]+s;t.hasOwnProperty(r)?e=e+Os(t[r]):e=e+"1"}i!==7&&(e=e+"/"),s=s-1}return e=Ms(e),e};console.assert(fe(xt)===De),console.assert(fe({})==="8/8/8/8/8/8/8/8"),console.assert(fe({a2:"wP",b2:"bP"})==="8/8/8/8/8/8/Pp6/8");const Bt=t=>t==null?{}:(ve(t)&&t.toLowerCase()==="start"&&(t=R(xt)),B(t)&&(t=Dt(t)),t),Rs=(t,e)=>{const s=t.split(""),i=me.indexOf(s[0])+1,n=parseInt(s[1],10),r=e.split(""),a=me.indexOf(r[0])+1,_=parseInt(r[1],10),p=Math.abs(i-a),m=Math.abs(n-_);return p>=m?p:m},Is=t=>{const e=[];for(let i=0;i<8;i++)for(let n=0;n<8;n++){const r=me[i]+(n+1);t!==r&&e.push({square:r,distance:Rs(t,r)})}e.sort(function(i,n){return i.distance-n.distance});const s=[];for(let i=0;i<e.length;i++)s.push(e[i].square);return s},Us=(t,e,s)=>{const i=Is(s);for(let n=0;n<i.length;n++){const r=i[n];if(t.hasOwnProperty(r)&&t[r]===e)return r}return!1},Ds=(t,e)=>{const s=R(t);for(const i in e){if(!e.hasOwnProperty(i)||!s.hasOwnProperty(i))continue;const n=s[i];delete s[i],s[e[i]]=n}return s},xs=(t,e)=>{nt(W` <svg class="piece-image" viewBox="0 0 45 45">${Bs[t]}</svg> `,e)},Bs={bB:z`
    <g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <g style="fill:#000000; stroke:#000000; stroke-linecap:butt;"> 
        <path
          d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
        <path
          d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
        <path
          d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
      </g>
      <path
        d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
        style="fill:none; stroke:#ffffff; stroke-linejoin:miter;" />
    </g>
  `,wB:z`
    <g style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <g style="fill:#ffffff; stroke:#000000; stroke-linecap:butt;"> 
        <path
          d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z" />
        <path
          d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z" />
        <path
          d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
      </g>
      <path
        d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
    </g>
  `,bK:z`
    <g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 22.5,11.63 L 22.5,6"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;"
        id="path6570" />
      <path
        d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
        style="fill:#000000;fill-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;" />
      <path
        d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
        style="fill:#000000; stroke:#000000;" />
      <path
        d="M 20,8 L 25,8"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
      <path
        d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"
        style="fill:none; stroke:#ffffff;" />
      <path
        d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"
        style="fill:none; stroke:#ffffff;" />
    </g>
  `,wK:z`
    <g style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 22.5,11.63 L 22.5,6"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
      <path
        d="M 20,8 L 25,8"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
      <path
        d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
        style="fill:#ffffff; stroke:#000000; stroke-linecap:butt; stroke-linejoin:miter;" />
      <path
        d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
        style="fill:#ffffff; stroke:#000000;" />
      <path
        d="M 11.5,30 C 17,27 27,27 32.5,30"
        style="fill:none; stroke:#000000;" />
      <path
        d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"
        style="fill:none; stroke:#000000;" />
      <path
        d="M 11.5,37 C 17,34 27,34 32.5,37"
        style="fill:none; stroke:#000000;" />
    </g>
  `,bN:z`
    <g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
        style="fill:#000000; stroke:#000000;" />
      <path
        d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
        style="fill:#000000; stroke:#000000;" />
      <path
        d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
        style="fill:#ffffff; stroke:#ffffff;" />
      <path
        d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
        transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
        style="fill:#ffffff; stroke:#ffffff;" />
      <path
        d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "
        style="fill:#ffffff; stroke:none;" />
    </g>
  `,wN:z`
    <g style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
        style="fill:#ffffff; stroke:#000000;" />
      <path
        d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
        style="fill:#ffffff; stroke:#000000;" />
      <path
        d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
        style="fill:#000000; stroke:#000000;" />
      <path
        d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
        transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
        style="fill:#000000; stroke:#000000;" />
    </g>
  `,bP:z`
    <path
      d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
      style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" />
  `,wP:z`
    <path
      d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
      style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;" />
  `,bQ:z`
    <g style="opacity:1; fill:000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <g style="fill:#000000; stroke:none;">
        <circle cx="6"    cy="12" r="2.75" />
        <circle cx="14"   cy="9"  r="2.75" />
        <circle cx="22.5" cy="8"  r="2.75" />
        <circle cx="31"   cy="9"  r="2.75" />
        <circle cx="39"   cy="12" r="2.75" />
      </g>
      <path
        d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
        style="stroke-linecap:butt; stroke:#000000;" />
      <path
        d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
        style="stroke-linecap:butt;" />
      <path
        d="M 11,38.5 A 35,35 1 0 0 34,38.5"
        style="fill:none; stroke:#000000; stroke-linecap:butt;" />
      <path
        d="M 11,29 A 35,35 1 0 1 34,29"
        style="fill:none; stroke:#ffffff;" />
      <path
        d="M 12.5,31.5 L 32.5,31.5"
        style="fill:none; stroke:#ffffff;" />
      <path
        d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"
        style="fill:none; stroke:#ffffff;" />
      <path
        d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"
        style="fill:none; stroke:#ffffff;" />
    </g>
  `,wQ:z`
    <g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(-1,-1)" />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(15.5,-5.5)" />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(32,-1)" />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(7,-4.5)" />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(24,-4)" />
      <path
        d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 11.5,30 C 15,29 30,29 33.5,30"
        style="fill:none;" />
      <path
        d="M 12,33.5 C 18,32.5 27,32.5 33,33.5"
        style="fill:none;" />
    </g>
  `,bR:z`
    <g style="opacity:1; fill:000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
        style="stroke-linecap:butt;stroke-linejoin:miter;" />
      <path
        d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 12,35.5 L 33,35.5 L 33,35.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
      <path
        d="M 13,31.5 L 32,31.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
      <path
        d="M 14,29.5 L 31,29.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
      <path
        d="M 14,16.5 L 31,16.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
      <path
        d="M 11,14 L 34,14"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;" />
    </g>
  `,wR:z`
    <g style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;">
      <path
        d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
        style="stroke-linecap:butt;" />
      <path
        d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
        style="stroke-linecap:butt;" />
      <path
        d="M 34,14 L 31,17 L 14,17 L 11,14" />
      <path
        d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
        style="stroke-linecap:butt; stroke-linejoin:miter;" />
      <path
        d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
      <path
        d="M 11,14 L 34,14"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;" />
    </g>
  `};var D=globalThis&&globalThis.__decorate||function(t,e,s,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(t,e,s,i);else for(var _=t.length-1;_>=0;_--)(a=t[_])&&(r=(n<3?a(r):n>3?a(e,s,r):a(e,s))||r);return n>3&&r&&Object.defineProperty(e,s,r),r};const js=200,Ks=200,zs=60,Hs=30,Fs=100;function Pe(t){if((t==null?void 0:t.state)!=="dragging")throw new Error(`unexpected drag state ${JSON.stringify(t)}`)}const ae=t=>typeof t=="number"?t:t==="fast"?200:t==="slow"?600:parseInt(t,10),St=t=>`square-${t}`,Ct=t=>`spare-piece-${t}`;class Ws extends Ut{render(e,s){return A}update(e,[s,i]){return Ve(i)?i(s,e.element):e.element.replaceChildren(),ee}}const Qs=It(Ws);let I=class extends ke{constructor(){super(...arguments),this.hideNotation=!1,this.orientation="white",this.draggablePieces=!1,this.dropOffBoard="snapback",this.renderPiece=(e,s)=>{let i;ve(this.pieceTheme)?i=ie(this.pieceTheme,{piece:e}):Ve(this.pieceTheme)&&(i=this.pieceTheme(e)),i===void 0?xs(e,s):nt(W`<img class="piece-image" src=${i} />`,s)},this.moveSpeed=Ks,this.snapbackSpeed=zs,this.snapSpeed=Hs,this.trashSpeed=Fs,this.appearSpeed=js,this.sparePieces=!1,this._highlightedSquares=new Set,this._animations=new Map,this._currentPosition={},this._mousemoveWindow=e=>{var s;if(((s=this._dragState)===null||s===void 0?void 0:s.state)!=="dragging")return;e.preventDefault();const i=e instanceof MouseEvent?e:e.changedTouches[0];this._updateDraggedPiece(i.clientX,i.clientY)},this._mouseupWindow=e=>{var s;if(((s=this._dragState)===null||s===void 0?void 0:s.state)!=="dragging")return;const i=e instanceof MouseEvent?e:e.changedTouches[0],n=this._isXYOnSquare(i.clientX,i.clientY);this._stopDraggedPiece(n)}}get position(){return this._currentPosition}set position(e){const s=this._currentPosition;this._setCurrentPosition(e),this.requestUpdate("position",s)}get showNotation(){return!this.hideNotation}set showNotation(e){this.hideNotation=!e}get _squareSize(){return this.offsetWidth/8}_getSquareElement(e){return this.shadowRoot.getElementById(St(e))}_getSparePieceElement(e){return this.shadowRoot.getElementById(Ct(e))}render(){return W`
      <div part="spare-pieces">
        ${this._renderSparePieces(this.orientation==="white"?"black":"white")}
      </div>
      ${this._renderBoard()}
      <div part="spare-pieces">
        ${this._renderSparePieces(this.orientation==="white"?"white":"black")}
      </div>
      <div
        id="dragged-pieces"
        style=${Qe({width:`${this._squareSize}px`,height:`${this._squareSize}px`})}
      >
        ${this._renderDraggedPiece()}
      </div>
    `}_renderSparePieces(e){return this.sparePieces?W`
      <div></div>
      ${(e==="black"?$s:As).map(i=>W`
            <div
              id="spare-${i}"
              @mousedown=${this._mousedownSparePiece}
              @touchstart=${this._mousedownSparePiece}
            >
              ${this._renderPiece(i,{},!1,Ct(i))}
            </div>
          `)}
      <div></div>
    `:A}_renderDraggedPiece(){var e,s;const i={height:`${this._squareSize}px`,width:`${this._squareSize}px`},n=this._dragState;if(n!==void 0){i.display="block";const r=this.getBoundingClientRect();if(n.state==="dragging"){const{x:a,y:_}=n;Object.assign(i,{top:`${_-r.top-this._squareSize/2}px`,left:`${a-r.left-this._squareSize/2}px`})}else if(n.state==="snapback"){const{source:a}=n,p=this._getSquareElement(a).getBoundingClientRect();Object.assign(i,{transitionProperty:"top, left",transitionDuration:`${ae(this.snapbackSpeed)}ms`,top:`${p.top-r.top}px`,left:`${p.left-r.left}px`})}else if(n.state==="trash"){const{x:a,y:_}=n;Object.assign(i,{transitionProperty:"opacity",transitionDuration:`${ae(this.trashSpeed)}ms`,opacity:"0",top:`${_-r.top-this._squareSize/2}px`,left:`${a-r.left-this._squareSize/2}px`})}else if(n.state==="snap"){const _=this._getSquareElement(n.location).getBoundingClientRect();Object.assign(i,{transitionProperty:"top, left",transitionDuration:`${ae(this.snapSpeed)}ms`,top:`${_.top-r.top}px`,left:`${_.left-r.left}px`})}}return this._renderPiece((s=(e=this._dragState)===null||e===void 0?void 0:e.piece)!==null&&s!==void 0?s:"",i,!1,void 0,"dragged-piece")}_renderBoard(){var e;const s=[],i=this.orientation==="black";for(let r=0;r<8;r++)for(let a=0;a<8;a++){const _=me[i?7-a:a],p=i?r+1:8-r,m=`${_}${p}`,T=Ls(m);let b=this._currentPosition[m];const E=m===((e=this._dragState)===null||e===void 0?void 0:e.source),N=this._animations.get(m),Q=E||this._highlightedSquares.has(m)?"highlight":"",G=this._getAnimationStyles(b,N);!b&&(N==null?void 0:N.type)==="clear"&&(b=N.piece),s.push(W`
          <div
            class="square"
            id=${St(m)}
            data-square=${m}
            part="square ${m} ${T} ${Q}"
            @mousedown=${this._mousedownSquare}
            @mouseenter=${this._mouseenterSquare}
            @mouseleave=${this._mouseleaveSquare}
            @touchstart=${this._mousedownSquare}
          >
            ${this.showNotation&&r===7?W`<div part="notation alpha">${_}</div>`:A}
            ${this.showNotation&&a===0?W`<div part="notation numeric">${p}</div>`:A}
            ${this._renderPiece(b,G,E)}
          </div>
        `)}const n={width:this._squareSize*8+"px",height:this._squareSize*8+"px"};return W`<div part="board" style=${Qe(n)}>${s}</div>`}_renderPiece(e,s,i,n,r){if(e===void 0)return A;const a=Object.assign({opacity:"1",transitionProperty:"",transitionDuration:"0ms"},s);return(i||e==="")&&(a.display="none"),e===""?A:(Ve(this.renderPiece)||this._error(8272,"invalid renderPiece."),W`
      <div
        id=${Cs(n)}
        part="piece ${r??""}"
        piece=${e}
        style=${Qe(a)}
        ...=${Qs(e,this.renderPiece)}
      ></div>
    `)}_getAnimationStyles(e,s){if(s){if(e&&(s.type==="move-start"||s.type==="add-start"&&this.draggablePieces)){const i=s.type==="move-start"?this._getSquareElement(s.source):this._getSparePieceElement(e),n=s.type==="move-start"?this._getSquareElement(s.destination):this._getSquareElement(s.square),r=i.getBoundingClientRect(),a=n.getBoundingClientRect();return{position:"absolute",left:`${r.left-a.left}px`,top:`${r.top-a.top}px`,width:`${this._squareSize}px`,height:`${this._squareSize}px`}}if(e&&(s.type==="move"||s.type==="add"&&this.draggablePieces))return{position:"absolute",transitionProperty:"top, left",transitionDuration:`${ae(this.moveSpeed)}ms`,top:"0",left:"0",width:`${this._squareSize}px`,height:`${this._squareSize}px`};if(!e&&s.type==="clear")return e=s.piece,{transitionProperty:"opacity",transitionDuration:`${ae(this.trashSpeed)}ms`,opacity:"0"};if(e&&s.type==="add-start")return{opacity:"0"};if(e&&s.type==="add")return{transitionProperty:"opacity",transitionDuration:`${ae(this.appearSpeed)}ms`}}return{}}_mousedownSquare(e){if(!this.draggablePieces&&!this.sparePieces)return;const i=e.currentTarget.getAttribute("data-square");if(i===null||!this._currentPosition.hasOwnProperty(i))return;e.preventDefault();const n=e instanceof MouseEvent?e:e.changedTouches[0];this._beginDraggingPiece(i,this._currentPosition[i],n.clientX,n.clientY)}_mousedownSparePiece(e){if(!this.sparePieces)return;const n=e.currentTarget.querySelector("[part~=piece]").getAttribute("piece");e.preventDefault();const r=e instanceof MouseEvent?e:e.changedTouches[0];this._beginDraggingPiece("spare",n,r.clientX,r.clientY)}_mouseenterSquare(e){if(this._dragState!==void 0)return;const s=e.currentTarget.getAttribute("data-square");if(!q(s))return;const i=this._currentPosition.hasOwnProperty(s)&&this._currentPosition[s];this.dispatchEvent(new CustomEvent("mouseover-square",{bubbles:!0,detail:{square:s,piece:i,position:R(this._currentPosition),orientation:this.orientation}}))}_mouseleaveSquare(e){if(this._dragState!==void 0)return;const s=e.currentTarget.getAttribute("data-square");if(!q(s))return;const i=this._currentPosition.hasOwnProperty(s)&&this._currentPosition[s];this.dispatchEvent(new CustomEvent("mouseout-square",{bubbles:!0,detail:{square:s,piece:i,position:R(this._currentPosition),orientation:this.orientation}}))}setPosition(e,s=!0){if(e=Bt(e),!H(e))throw this._error(6482,"Invalid value passed to the position method.",e);if(s){const i=this._calculateAnimations(this._currentPosition,e);this._doAnimations(i,this._currentPosition,e)}this._setCurrentPosition(e),this.requestUpdate()}fen(){return fe(this._currentPosition)}start(e){this.setPosition("start",e)}clear(e){this.setPosition({},e)}move(...e){let s=!0;const i={};for(const r of e){if(r===!1){s=!1;continue}if(!Ts(r)){this._error(2826,"Invalid move passed to the move method.",r);continue}const[a,_]=r.split("-");i[a]=_}const n=Ds(this._currentPosition,i);return this.setPosition(n,s),n}flip(){this.orientation=this.orientation==="white"?"black":"white"}resize(){this.requestUpdate()}firstUpdated(){this.requestUpdate(),window.ResizeObserver!==void 0&&new ResizeObserver(()=>{this.resize()}).observe(this)}connectedCallback(){super.connectedCallback(),window.addEventListener("mousemove",this._mousemoveWindow),window.addEventListener("mouseup",this._mouseupWindow),window.addEventListener("touchmove",this._mousemoveWindow,{passive:!1}),window.addEventListener("touchend",this._mouseupWindow,{passive:!1})}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("mousemove",this._mousemoveWindow),window.removeEventListener("mouseup",this._mouseupWindow),window.removeEventListener("touchmove",this._mousemoveWindow),window.removeEventListener("touchend",this._mouseupWindow)}_setCurrentPosition(e){const s=R(this._currentPosition),i=R(e),n=fe(s),r=fe(i);n!==r&&(this.dispatchEvent(new CustomEvent("change",{bubbles:!0,detail:{value:i,oldValue:s}})),this._currentPosition=e)}_isXYOnSquare(e,s){const n=this.shadowRoot.elementsFromPoint(e,s).find(a=>a.classList.contains("square"));return n===void 0?"offboard":n.getAttribute("data-square")}_highlightSquare(e,s=!0){s?this._highlightedSquares.add(e):this._highlightedSquares.delete(e),this.requestUpdate("_highlightedSquares")}async _snapbackDraggedPiece(){Pe(this._dragState);const{source:e,piece:s}=this._dragState;return e==="spare"?this._trashDraggedPiece():(this._dragState={state:"snapback",piece:s,source:e},this.requestUpdate(),await new Promise(i=>setTimeout(i,0)),new Promise(i=>{const n=()=>{this._draggedPieceElement.removeEventListener("transitionend",n),i(),this.dispatchEvent(new CustomEvent("snapback-end",{bubbles:!0,detail:{piece:s,square:e,position:R(this._currentPosition),orientation:this.orientation}}))};this._draggedPieceElement.addEventListener("transitionend",n)}))}async _trashDraggedPiece(){Pe(this._dragState);const{source:e,piece:s}=this._dragState,i=R(this._currentPosition);return delete i[e],this._setCurrentPosition(i),this._dragState={state:"trash",piece:s,x:this._dragState.x,y:this._dragState.y,source:this._dragState.source},this.requestUpdate(),await new Promise(n=>setTimeout(n,0)),new Promise(n=>{const r=()=>{this._draggedPieceElement.removeEventListener("transitionend",r),n()};this._draggedPieceElement.addEventListener("transitionend",r)})}async _dropDraggedPieceOnSquare(e){Pe(this._dragState);const{source:s,piece:i}=this._dragState,n=R(this._currentPosition);return delete n[s],n[e]=i,this._setCurrentPosition(n),this._dragState={state:"snap",piece:i,location:e,source:e},this.requestUpdate(),await new Promise(r=>setTimeout(r,0)),new Promise(r=>{const a=()=>{this._draggedPieceElement.removeEventListener("transitionend",a),r(),this.dispatchEvent(new CustomEvent("snap-end",{bubbles:!0,detail:{source:s,square:e,piece:i}}))};this._draggedPieceElement.addEventListener("transitionend",a)})}_beginDraggingPiece(e,s,i,n){const r=new CustomEvent("drag-start",{bubbles:!0,cancelable:!0,detail:{source:e,piece:s,position:R(this._currentPosition),orientation:this.orientation}});this.dispatchEvent(r),!r.defaultPrevented&&(this._dragState={state:"dragging",x:i,y:n,piece:s,location:e==="spare"?"offboard":e,source:e},this.requestUpdate())}_updateDraggedPiece(e,s){Pe(this._dragState),this._dragState.x=e,this._dragState.y=s,this.requestUpdate();const i=this._isXYOnSquare(e,s);i!==this._dragState.location&&(q(this._dragState.location)&&this._highlightSquare(this._dragState.location,!1),q(i)&&this._highlightSquare(i),this.dispatchEvent(new CustomEvent("drag-move",{bubbles:!0,detail:{newLocation:i,oldLocation:this._dragState.location,source:this._dragState.source,piece:this._dragState.piece,position:R(this._currentPosition),orientation:this.orientation}})),this._dragState.location=i)}async _stopDraggedPiece(e){Pe(this._dragState);const{source:s,piece:i}=this._dragState;let n="drop";e==="offboard"&&(n=this.dropOffBoard==="trash"?"trash":"snapback");const r=R(this._currentPosition),a=R(this._currentPosition);s==="spare"&&q(e)&&(r[e]=i),q(s)&&(delete r[s],q(e)&&(r[e]=i));const _=new CustomEvent("drop",{bubbles:!0,detail:{source:s,target:e,piece:i,newPosition:r,oldPosition:a,orientation:this.orientation,setAction(p){n=p}}});this.dispatchEvent(_),this._highlightedSquares.clear(),n==="snapback"?await this._snapbackDraggedPiece():n==="trash"?await this._trashDraggedPiece():n==="drop"&&await this._dropDraggedPieceOnSquare(e),this._dragState=void 0,this.requestUpdate()}_calculateAnimations(e,s){e=R(e),s=R(s);const i=[],n={};for(const r in s)s.hasOwnProperty(r)&&e.hasOwnProperty(r)&&e[r]===s[r]&&(delete e[r],delete s[r]);for(const r in s){if(!s.hasOwnProperty(r))continue;const a=Us(e,s[r],r);a&&(i.push({type:"move",source:a,destination:r,piece:s[r]}),delete e[a],delete s[r],n[r]=!0)}for(const r in s)s.hasOwnProperty(r)&&(i.push({type:"add",square:r,piece:s[r]}),delete s[r]);for(const r in e)e.hasOwnProperty(r)&&(n.hasOwnProperty(r)||(i.push({type:"clear",square:r,piece:e[r]}),delete e[r]));return i}async _doAnimations(e,s,i){if(e.length===0)return;let n=0;const r=()=>{n++,n===e.length&&(this.shadowRoot.removeEventListener("transitionend",r),this._animations.clear(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("move-end",{bubbles:!0,detail:{oldPosition:R(s),newPosition:R(i)}})))};this.shadowRoot.addEventListener("transitionend",r),this._animations.clear();for(const a of e)a.type==="add"||a.type==="add-start"?this._animations.set(a.square,Object.assign(Object.assign({},a),{type:"add-start"})):a.type==="move"||a.type==="move-start"?this._animations.set(a.destination,Object.assign(Object.assign({},a),{type:"move-start"})):this._animations.set(a.square,a);this.requestUpdate(),await new Promise(a=>setTimeout(a,0)),this._animations.clear();for(const a of e)a.type==="move"||a.type==="move-start"?this._animations.set(a.destination,a):this._animations.set(a.square,a);this.requestUpdate()}_error(e,s,i){const n=`Chessboard Error ${e} : ${s}`;return this.dispatchEvent(new ErrorEvent("error",{message:n})),new Error(n)}};I.styles=ws;D([j({converter:t=>Bt(t)})],I.prototype,"position",null);D([j({attribute:"hide-notation",type:Boolean})],I.prototype,"hideNotation",void 0);D([j()],I.prototype,"orientation",void 0);D([j({attribute:"draggable-pieces",type:Boolean})],I.prototype,"draggablePieces",void 0);D([j({attribute:"drop-off-board"})],I.prototype,"dropOffBoard",void 0);D([j({attribute:"piece-theme"})],I.prototype,"pieceTheme",void 0);D([j({attribute:!1})],I.prototype,"renderPiece",void 0);D([j({attribute:"move-speed"})],I.prototype,"moveSpeed",void 0);D([j({attribute:"snapback-speed"})],I.prototype,"snapbackSpeed",void 0);D([j({attribute:"snap-speed"})],I.prototype,"snapSpeed",void 0);D([j({attribute:"trash-speed"})],I.prototype,"trashSpeed",void 0);D([j({attribute:"appear-speed"})],I.prototype,"appearSpeed",void 0);D([j({attribute:"spare-pieces",type:Boolean})],I.prototype,"sparePieces",void 0);D([Es('[part~="dragged-piece"]')],I.prototype,"_draggedPieceElement",void 0);I=D([bs("chess-board")],I);const jt=Symbol("Comlink.proxy"),Gs=Symbol("Comlink.endpoint"),Vs=Symbol("Comlink.releaseProxy"),Ye=Symbol("Comlink.thrown"),Kt=t=>typeof t=="object"&&t!==null||typeof t=="function",Ys={canHandle:t=>Kt(t)&&t[jt],serialize(t){const{port1:e,port2:s}=new MessageChannel;return Ht(t,e),[s,[s]]},deserialize(t){return t.start(),Wt(t)}},Xs={canHandle:t=>Kt(t)&&Ye in t,serialize({value:t}){let e;return t instanceof Error?e={isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:e={isError:!1,value:t},[e,[]]},deserialize(t){throw t.isError?Object.assign(new Error(t.value.message),t.value):t.value}},zt=new Map([["proxy",Ys],["throw",Xs]]);function Ht(t,e=self){e.addEventListener("message",function s(i){if(!i||!i.data)return;const{id:n,type:r,path:a}=Object.assign({path:[]},i.data),_=(i.data.argumentList||[]).map(ne);let p;try{const m=a.slice(0,-1).reduce((b,E)=>b[E],t),T=a.reduce((b,E)=>b[E],t);switch(r){case"GET":p=T;break;case"SET":m[a.slice(-1)[0]]=ne(i.data.value),p=!0;break;case"APPLY":p=T.apply(m,_);break;case"CONSTRUCT":{const b=new T(..._);p=ti(b)}break;case"ENDPOINT":{const{port1:b,port2:E}=new MessageChannel;Ht(t,E),p=ei(b,[b])}break;case"RELEASE":p=void 0;break;default:return}}catch(m){p={value:m,[Ye]:0}}Promise.resolve(p).catch(m=>({value:m,[Ye]:0})).then(m=>{const[T,b]=rt(m);e.postMessage(Object.assign(Object.assign({},T),{id:n}),b),r==="RELEASE"&&(e.removeEventListener("message",s),Ft(e))})}),e.start&&e.start()}function Js(t){return t.constructor.name==="MessagePort"}function Ft(t){Js(t)&&t.close()}function Wt(t,e){return Xe(t,[],e)}function Te(t){if(t)throw new Error("Proxy has been released and is not useable")}function Xe(t,e=[],s=function(){}){let i=!1;const n=new Proxy(s,{get(r,a){if(Te(i),a===Vs)return()=>le(t,{type:"RELEASE",path:e.map(_=>_.toString())}).then(()=>{Ft(t),i=!0});if(a==="then"){if(e.length===0)return{then:()=>n};const _=le(t,{type:"GET",path:e.map(p=>p.toString())}).then(ne);return _.then.bind(_)}return Xe(t,[...e,a])},set(r,a,_){Te(i);const[p,m]=rt(_);return le(t,{type:"SET",path:[...e,a].map(T=>T.toString()),value:p},m).then(ne)},apply(r,a,_){Te(i);const p=e[e.length-1];if(p===Gs)return le(t,{type:"ENDPOINT"}).then(ne);if(p==="bind")return Xe(t,e.slice(0,-1));const[m,T]=wt(_);return le(t,{type:"APPLY",path:e.map(b=>b.toString()),argumentList:m},T).then(ne)},construct(r,a){Te(i);const[_,p]=wt(a);return le(t,{type:"CONSTRUCT",path:e.map(m=>m.toString()),argumentList:_},p).then(ne)}});return n}function Zs(t){return Array.prototype.concat.apply([],t)}function wt(t){const e=t.map(rt);return[e.map(s=>s[0]),Zs(e.map(s=>s[1]))]}const Qt=new WeakMap;function ei(t,e){return Qt.set(t,e),t}function ti(t){return Object.assign(t,{[jt]:!0})}function rt(t){for(const[e,s]of zt)if(s.canHandle(t)){const[i,n]=s.serialize(t);return[{type:"HANDLER",name:e,value:i},n]}return[{type:"RAW",value:t},Qt.get(t)||[]]}function ne(t){switch(t.type){case"HANDLER":return zt.get(t.name).deserialize(t.value);case"RAW":return t.value}}function le(t,e,s){return new Promise(i=>{const n=si();t.addEventListener("message",function r(a){!a.data||!a.data.id||a.data.id!==n||(t.removeEventListener("message",r),i(a.data))}),t.start&&t.start(),t.postMessage(Object.assign({id:n},e),s)})}function si(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const ii=navigator.hardwareConcurrency,Me=[];let ce=0;function Gt(){return ce>=ii&&(ce=0),Me[ce]??(Me[ce]=Wt(new Worker(new URL("/assets/evaluate-e8af3be0.js",self.location),{type:"module"}))),Me[ce++]}function ni(t,e){return Gt().evaluate(t.fen(),Ie(t),e)}function ri(t,e){return Gt().findBestMove(t.fen(),Ie(t),e)}const Ne=document.getElementById("evaluation"),oi=document.getElementById("mode-select"),ai=document.getElementById("difficulty-select"),li=document.getElementById("start-button"),Vt=document.getElementById("show-eval");let re="bot-b",Je=3,Yt=3;li.addEventListener("click",()=>{Xt()});Vt.addEventListener("click",()=>{xe()});function ci(t){return{" ":"",p:"is pawn",r:"is rook",n:"is kn ight",b:"is bi shop",q:"is qu een",k:"is king"}[t]}function hi(){const t=document.createElement("style");return t.textContent=Object.entries(tt).map(([e,s])=>`
    chess-board::part(${e})::after {
        display: block;
        position: absolute;
        top: 0.25em;
        font-size: 30px;
        content: ${JSON.stringify(ci(s))};
        text-transform: uppercase;
        line-height: 1;
        font-family: 'Patrick Hand', cursive;
        text-align: center;
        font-weight: 900;
    }`).join(`
`),t.textContent+=`
    chess-board::part(piece) {
        position: relative;
        z-index: 1;
    }

    chess-board::part(dragged-piece) {
        position: absolute;
        opacity: 0.8 !important;
    }

    chess-board::part(piece):hover {
        opacity: 0.5;
    }
    `,t}const O=new At.Chess,Z=document.getElementById("board");async function di(){return"q"}let Ae=!1;Z.addEventListener("drag-start",t=>{const{piece:e}=t.detail;if(!Ae||O.turn()!==e[0]||re.endsWith(O.turn())||re==="bot-all"){t.preventDefault();return}});Z.addEventListener("drop",async t=>{const{source:e,target:s,piece:i,setAction:n}=t.detail,r=i[0],a=i[1];if(a==="K"&&tt[s]!==" "){n("snapback");return}try{rs(O,{from:e,to:s,promotion:a==="P"&&s[1]===(r==="b"?"1":"8")?await di():void 0}),n("drop"),xe(),de(O)&&(Ae=!1)}catch{n("snapback")}});Z.addEventListener("snap-end",()=>{Z.setPosition(O.fen()),Ae&&re.startsWith("bot")&&re.endsWith(O.turn())&&Ze()});async function Ze(){const t=await ri(O,Je);t&&(await os(O,t,async()=>{Z.setPosition(O.fen(),!0),await new Promise(e=>setTimeout(e,Z.moveSpeed))}),Z.setPosition(O.fen())),xe(),de(O)&&(Ae=!1)}async function xe(){if(Vt.checked){const t=await ni(O,Yt);t===1/0?Ne.innerText=de(O)?"Checkmate by white":"Forced checkmate by white":t===-1/0?Ne.innerText=de(O)?"Checkmate by black":"Forced checkmate by black":Ne.innerText=de(O)?"Draw":(Math.round(t*100)/100).toPrecision(3)}else Ne.innerText="Hidden"}function Xt(){switch(re=oi.value,Je=+ai.value,Yt=Je-1,O.reset(),Z.setPosition(O.fen()),xe(),re){case"bot-w":Ze();break;case"bot-b":case"manual":break;case"bot-all":(async()=>{if(re==="bot-all")for(;!de(O);)await Ze()})();break}Ae=!0}document.head.appendChild(hi());Xt();
