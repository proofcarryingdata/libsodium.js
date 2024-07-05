var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{if(isFileURI(url)){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null);return}fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))}).then(onload,onerror)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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AXNyOgAHIAEgAS0AByABKAIMLQACIAEoAggtAAJzcjoAByABIAEtAAcgASgCDC0AAyABKAIILQADc3I6AAcgASABLQAHIAEoAgwtAAQgASgCCC0ABHNyOgAHIAEgAS0AByABKAIMLQAFIAEoAggtAAVzcjoAByABIAEtAAcgASgCDC0ABiABKAIILQAGc3I6AAcgASABLQAHIAEoAgwtAAcgASgCCC0AB3NyOgAHIAEgAS0AByABKAIMLQAIIAEoAggtAAhzcjoAByABIAEtAAcgASgCDC0ACSABKAIILQAJc3I6AAcgASABLQAHIAEoAgwtAAogASgCCC0ACnNyOgAHIAEgAS0AByABKAIMLQALIAEoAggtAAtzcjoAByABIAEtAAcgASgCDC0ADCABKAIILQAMc3I6AAcgASABLQAHIAEoAgwtAA0gASgCCC0ADXNyOgAHIAEgAS0AByABKAIMLQAOIAEoAggtAA5zcjoAByABIAEtAAcgASgCDC0ADyABKAIILQAPc3I6AAcgAS0AB0EBa0GAAnFFDQIgASACIARqNgIMIAFB8BU2AgggAUEAOgAHIAEgAS0AByABKAIMLQAAIAEoAggtAABzcjoAByABIAEtAAcgASgCDC0AASABKAIILQABc3I6AAcgASABLQAHIAEoAgwtAAIgASgCCC0AAnNyOgAHIAEgAS0AByABKAIMLQADIAEoAggtAANzcjoAByABIAEtAAcgASgCDC0ABCABKAIILQAEc3I6AAcgASABLQAHIAEoAgwtAAUgASgCCC0ABXNyOgAHIAEgAS0AByABKAIMLQAGIAEoAggtAAZzcjoAByABIAEtAAcgASgCDC0AByABKAIILQAHc3I6AAcgASABLQAHIAEoAgwtAAggASgCCC0ACHNyOgAHIAEgAS0AByABKAIMLQAJIAEoAggtAAlzcjoAByABIAEtAAcgASgCDC0ACiABKAIILQAKc3I6AAcgASABLQAHIAEoAgwtAAsgASgCCC0AC3NyOgAHIAEgAS0AByABKAIMLQAMIAEoAggtAAxzcjoAByABIAEtAAcgASgCDC0ADSABKAIILQANc3I6AAcgASABLQAHIAEoAgwtAA4gASgCCC0ADnNyOgAHIAEgAS0AByABKAIMLQAPIAEoAggtAA9zcjoAByABLQAHQQFrQYACcUUN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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["g"];updateMemoryViews();addOnInit(wasmExports["h"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2012:()=>Module.getRandomValue(),2048:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var __abort_js=()=>{abort("")};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var getHeapMax=()=>2147483648;var growMemory=size=>{var b=wasmMemory.buffer;var pages=(size-b.byteLength+65535)/65536;try{wasmMemory.grow(pages);updateMemoryViews();return 1}catch(e){}};var _emscripten_resize_heap=requestedSize=>{var oldSize=HEAPU8.length;requestedSize>>>=0;var maxHeapSize=getHeapMax();if(requestedSize>maxHeapSize){return false}var alignUp=(x,multiple)=>x+(multiple-x%multiple)%multiple;for(var cutDown=1;cutDown<=4;cutDown*=2){var overGrownHeapSize=oldSize*(1+.2/cutDown);overGrownHeapSize=Math.min(overGrownHeapSize,requestedSize+100663296);var newSize=Math.min(maxHeapSize,alignUp(Math.max(requestedSize,overGrownHeapSize),65536));var replacement=growMemory(newSize);if(replacement){return true}}return false};var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={f:___assert_fail,e:__abort_js,d:__emscripten_memcpy_js,b:_emscripten_asm_const_int,c:_emscripten_resize_heap,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["h"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["i"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
