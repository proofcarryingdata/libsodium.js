var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{if(isFileURI(url)){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null);return}fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))}).then(onload,onerror)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,AGFzbQEAAAABWA5gA39/fwF/YAJ/fwF/YAN/f38AYAN/f34Bf2AAAGABfwF/YAR/f35/AX9gBH9/f38Bf2ADf39+AGAEf39/fwBgAX8AYAV/f39/fwBgAn9/AGADf35/AX4CGQQBYQFhAAcBYQFiAAABYQFjAAIBYQFkAAkDGhkKCwIEAggMCAAEBQQBAgUHAQMBBgYNBQABBAQBcAAJBQcBAYICgIACBggBfwFBoKIECwcRBAFlAgABZgAPAWcAHAFoAQAJDgEAQQELCBgXFhUUGhsZCt9LGccCAQZ/IwBBEGsiAyQAIAMgADYCDCMAQdABayIBJAAgASAANgLMASABQaABaiIAQQBBKBAIIAEgASgCzAE2AsgBAkBBACABQcgBaiABQdAAaiAAEBNBAEgNAEHkESgCAEEASCEGQZgRQZgRKAIAIgRBX3E2AgACfwJAAkBByBEoAgBFBEBByBFB0AA2AgBBtBFBADYCAEGoEUIANwMAQcQRKAIAIQJBxBEgATYCAAwBC0GoESgCAA0BC0F/QZgREA4NARoLQZgRIAFByAFqIAFB0ABqIAFBoAFqEBMLIQUgAgR/QZgRQQBBAEG8ESgCABEAABpByBFBADYCAEHEESACNgIAQbQRQQA2AgBBrBEoAgAaQagRQgA3AwBBAAUgBQsaQZgRQZgRKAIAIARBIHFyNgIAIAYNAAsgAUHQAWokACADQRBqJAALagEBfyMAQYACayIFJAACQCACIANMDQAgBEGAwARxDQAgBSABIAIgA2siA0GAAiADQYACSSIBGxAIIAFFBEADQCAAIAVBgAIQBiADQYACayIDQf8BSw0ACwsgACAFIAMQBgsgBUGAAmokAAsXACAALQAAQSBxRQRAIAEgAiAAEAwaCwvEAQEBfwJAAkBB5BEoAgAiAEEATgRAIABFDQFBpBkoAgAgAEH/////A3FHDQELAkBB6BEoAgBBCkYNAEGsESgCACIAQagRKAIARg0AQawRIABBAWo2AgAgAEEKOgAADAILEA0MAQtB5BFB5BEoAgAiAEH/////AyAAGzYCAAJAAkBB6BEoAgBBCkYNAEGsESgCACIAQagRKAIARg0AQawRIABBAWo2AgAgAEEKOgAADAELEA0LQeQRKAIAGkHkEUEANgIACwvwAgICfwF+AkAgAkUNACAAIAE6AAAgACACaiIDQQFrIAE6AAAgAkEDSQ0AIAAgAToAAiAAIAE6AAEgA0EDayABOgAAIANBAmsgAToAACACQQdJDQAgACABOgADIANBBGsgAToAACACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiADYCACADIAIgBGtBfHEiAmoiAUEEayAANgIAIAJBCUkNACADIAA2AgggAyAANgIEIAFBCGsgADYCACABQQxrIAA2AgAgAkEZSQ0AIAMgADYCGCADIAA2AhQgAyAANgIQIAMgADYCDCABQRBrIAA2AgAgAUEUayAANgIAIAFBGGsgADYCACABQRxrIAA2AgAgAiADQQRxQRhyIgFrIgJBIEkNACAArUKBgICAEH4hBSABIANqIQEDQCABIAU3AxggASAFNwMQIAEgBTcDCCABIAU3AwAgAUEgaiEBIAJBIGsiAkEfSw0ACwsLpgQCDn4KfyAAKAIkIRIgACgCICETIAAoAhwhFCAAKAIYIRUgACgCFCERIAJCEFoEQCAALQBQRUEYdCEWIAAoAhAiF60hDyAAKAIMIhitIQ0gACgCCCIZrSELIAAoAgQiGq0hCSAaQQVsrSEQIBlBBWytIQ4gGEEFbK0hDCAXQQVsrSEKIAA1AgAhCANAIAEoAANBAnZB////H3EgFWqtIgMgDX4gASgAAEH///8fcSARaq0iBCAPfnwgASgABkEEdkH///8fcSAUaq0iBSALfnwgASgACUEGdiATaq0iBiAJfnwgEiAWaiABKAAMQQh2aq0iByAIfnwgAyALfiAEIA1+fCAFIAl+fCAGIAh+fCAHIAp+fCADIAl+IAQgC358IAUgCH58IAYgCn58IAcgDH58IAMgCH4gBCAJfnwgBSAKfnwgBiAMfnwgByAOfnwgAyAKfiAEIAh+fCAFIAx+fCAGIA5+fCAHIBB+fCIDQhqIQv////8Pg3wiBEIaiEL/////D4N8IgVCGohC/////w+DfCIGQhqIQv////8Pg3wiB0IaiKdBBWwgA6dB////H3FqIhFBGnYgBKdB////H3FqIRUgBadB////H3EhFCAGp0H///8fcSETIAenQf///x9xIRIgEUH///8fcSERIAFBEGohASACQhB9IgJCD1YNAAsLIAAgETYCFCAAIBI2AiQgACATNgIgIAAgFDYCHCAAIBU2AhgLrgMC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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["e"];updateMemoryViews();addOnInit(wasmExports["f"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2344:()=>Module.getRandomValue(),2380:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={d:___assert_fail,c:__emscripten_memcpy_js,b:_emscripten_asm_const_int,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["f"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["g"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
