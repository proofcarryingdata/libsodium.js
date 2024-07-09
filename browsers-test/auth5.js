var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";readBinary=filename=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);var ret=fs.readFileSync(filename);return ret};readAsync=(filename,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return new Promise((resolve,reject)=>{fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)reject(err);else resolve(binary?data.buffer:data)})})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=url=>{if(isFileURI(url)){return new Promise((reject,resolve)=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){resolve(xhr.response)}reject(xhr.status)};xhr.onerror=reject;xhr.send(null)})}return fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))})}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,AGFzbQEAAAABXQ9gA39/fwF/YAN/f38AYAJ/fwBgAX8Bf2AEf39/fwBgAX8AYAJ/fwF/YAR/f39/AX9gBX9/f39/AGADf39+AGACf34Bf2ACf34AYAAAYAV/f39/fwF/YAN/fn8BfgIZBAFhAWEABwFhAWIAAAFhAWMAAQFhAWQABAMaGQEIAQIJCgQLAAMCAQwCBQIFBgEDDQ4DAAYEBAFwAAQFBwEBggKAgAIGCAF/AUHgrAQLBxEEAWUCAAFmABABZwAcAWgBAAkJAQBBAQsDGhsZCspgGfACAgJ/AX4CQCACRQ0AIAAgAToAACAAIAJqIgNBAWsgAToAACACQQNJDQAgACABOgACIAAgAToAASADQQNrIAE6AAAgA0ECayABOgAAIAJBB0kNACAAIAE6AAMgA0EEayABOgAAIAJBCUkNACAAQQAgAGtBA3EiBGoiAyABQf8BcUGBgoQIbCIANgIAIAMgAiAEa0F8cSICaiIBQQRrIAA2AgAgAkEJSQ0AIAMgADYCCCADIAA2AgQgAUEIayAANgIAIAFBDGsgADYCACACQRlJDQAgAyAANgIYIAMgADYCFCADIAA2AhAgAyAANgIMIAFBEGsgADYCACABQRRrIAA2AgAgAUEYayAANgIAIAFBHGsgADYCACACIANBBHFBGHIiAWsiAkEgSQ0AIACtQoGAgIAQfiEFIAEgA2ohAQNAIAEgBTcDGCABIAU3AxAgASAFNwMIIAEgBTcDACABQSBqIQEgAkEgayICQR9LDQALCwtqAQF/IwBBgAJrIgUkAAJAIAIgA0wNACAEQYDABHENACAFIAEgAiADayIDQYACIANBgAJJIgEbEAQgAUUEQANAIAAgBUGAAhAGIANBgAJrIgNB/wFLDQALCyAAIAUgAxAGCyAFQYACaiQACxcAIAAtAABBIHFFBEAgASACIAAQDBoLC0MBAn8jAEEQayICJAAgAQRAA0AgAkEAOgAPIAAgA2pBsBQgAkEPakEAEAE6AAAgA0EBaiIDIAFHDQALCyACQRBqJAALiQYCB34DfyMAQcAFayILJAACQCACUA0AIAAgACkDSCIDIAJCA4Z8IgQ3A0ggACAAKQNAIAMgBFatfCACQj2IfDcDQCAAQdAAaiEKQoABIANCA4hC/wCDIgR9IgUgAlgEQEIAIQMgBEL/AIVCA1oEQCAFQvwBgyEGA0AgCiADIAR8p2ogASADp2otAAA6AAAgCiADQgGEIgggBHynaiABIAinai0AADoAACAKIANCAoQiCCAEfKdqIAEgCKdqLQAAOgAAIAogA0IDhCIIIAR8p2ogASAIp2otAAA6AAAgA0IEfCEDIAlCBHwiCSAGUg0ACwsgBUIDgyIJQgBSBEADQCAKIAMgBHynaiABIAOnai0AADoAACADQgF8IQMgB0IBfCIHIAlSDQALCyAAIAogCyALQYAFaiIMEAogASAFp2ohASACIAV9IgJC/wBWBEADQCAAIAEgCyAMEAogAUGAAWohASACQoABfSICQv8AVg0ACwsCQCACUA0AIAJCA4MhBEIAIQdCACEDIAJCBFoEQCACQvwAgyEFQgAhAgNAIAogA6ciAGogACABai0AADoAACAKIABBAXIiDGogASAMai0AADoAACAKIABBAnIiDGogASAMai0AADoAACAKIABBA3IiAGogACABai0AADoAACADQgR8IQMgAkIEfCICIAVSDQALCyAEUA0AA0AgCiADpyIAaiAAIAFqLQAAOgAAIANCAXwhAyAHQgF8IgcgBFINAAsLIAtBAEHABRAEDAELQgAhAyACQgRaBEAgAkJ8gyEFA0AgCiADIAR8p2ogASADp2otAAA6AAAgCiADQgGEIgYgBHynaiABIAanai0AADoAACAKIANCAoQiBiAEfKdqIAEgBqdqLQAAOgAAIAogA0IDhCIGIAR8p2ogASAGp2otAAA6AAAgA0IEfCEDIAlCBHwiCSAFUg0ACwsgAkIDgyICUA0AA0AgCiADIAR8p2ogASADp2otAAA6AAAgA0IBfCEDIAdCAXwiByACUg0ACwsgC0HABWokAAuKAwEGfyMAQYAEayICJAAgAkEgaiIDEBQgAyAAIAEQCCADIAJBwANqEBMgAiACKQPYAzcDGCACIAIpA9ADNwMQIAIgAikDyAM3AwggAiACKQPAAzcDACMAQRBrIgBBwCI2AgwgACACNgIIQQAhAyAAQQA2AgQDQCAAIAAoAgQgACgCDCADai0AACAAKAIIIANqLQAAc3I2AgQgACAAKAIEIANBAXIiBCAAKAIMai0AACAAKAIIIARqLQAAc3I2AgQgA0ECaiIDQSBHDQALIAAoAgRBAWtBCHZBAXFBAWshBUEAIQQjAEEQayIA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";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["e"];updateMemoryViews();addOnInit(wasmExports["f"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={2608:()=>Module.getRandomValue(),2644:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder:undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var UTF8ToString=(ptr,maxBytesToRead)=>ptr?UTF8ArrayToString(HEAPU8,ptr,maxBytesToRead):"";var ___assert_fail=(condition,filename,line,func)=>{abort(`Assertion failed: ${UTF8ToString(condition)}, at: `+[filename?UTF8ToString(filename):"unknown filename",line,func?UTF8ToString(func):"unknown function"])};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={d:___assert_fail,c:__emscripten_memcpy_js,b:_emscripten_asm_const_int,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["f"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["g"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();Module["onRuntimeInitialized"]?.();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
