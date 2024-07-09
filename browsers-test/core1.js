var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);var ret=fs.readFileSync(filename);return ret};readAsync=(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return new Promise((resolve,reject)=>{fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)reject(err);else resolve(binary?data.buffer:data)})})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=url=>{if(isFileURI(url)){return new Promise((reject,resolve)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response)}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}return fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))})}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["d"];updateMemoryViews();addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={1920:()=>Module.getRandomValue(),1956:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={c:__emscripten_memcpy_js,b:_emscripten_asm_const_int,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
