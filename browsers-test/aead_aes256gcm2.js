var Module=typeof Module!="undefined"?Module:{};var ENVIRONMENT_IS_WEB=typeof window=="object";var ENVIRONMENT_IS_WORKER=typeof importScripts=="function";var ENVIRONMENT_IS_NODE=typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string";if(ENVIRONMENT_IS_NODE){}try{this["Module"]=Module;Module.test}catch(e){this["Module"]=Module={}}if(typeof process==="object"){if(typeof FS==="object"){Module["preRun"]=Module["preRun"]||[];Module["preRun"].push(function(){FS.init();FS.mkdir("/test-data");FS.mount(NODEFS,{root:"."},"/test-data")})}}else{Module["print"]=function(x){var event=new Event("test-output");event.data=x;window.dispatchEvent(event)}}var moduleOverrides=Object.assign({},Module);var arguments_=[];var thisProgram="./this.program";var quit_=(status,toThrow)=>{throw toThrow};var scriptDirectory="";var read_,readAsync,readBinary;if(ENVIRONMENT_IS_NODE){var fs=require("fs");var nodePath=require("path");scriptDirectory=__dirname+"/";read_=(filename,binary)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);return fs.readFileSync(filename,binary?undefined:"utf8")};readBinary=filename=>{var ret=read_(filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}return ret};readAsync=(filename,onload,onerror,binary=true)=>{filename=isFileURI(filename)?new URL(filename):nodePath.normalize(filename);fs.readFile(filename,binary?undefined:"utf8",(err,data)=>{if(err)onerror(err);else onload(binary?data.buffer:data)})};if(!Module["thisProgram"]&&process.argv.length>1){thisProgram=process.argv[1].replace(/\\/g,"/")}arguments_=process.argv.slice(2);if(typeof module!="undefined"){module["exports"]=Module}quit_=(status,toThrow)=>{process.exitCode=status;throw toThrow}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self.location.href}else if(typeof document!="undefined"&&document.currentScript){scriptDirectory=document.currentScript.src}if(scriptDirectory.startsWith("blob:")){scriptDirectory=""}else{scriptDirectory=scriptDirectory.substr(0,scriptDirectory.replace(/[?#].*/,"").lastIndexOf("/")+1)}{read_=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){readBinary=url=>{var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}readAsync=(url,onload,onerror)=>{if(isFileURI(url)){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=()=>{if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response);return}onerror()};xhr.onerror=onerror;xhr.send(null);return}fetch(url,{credentials:"same-origin"}).then(response=>{if(response.ok){return response.arrayBuffer()}return Promise.reject(new Error(response.status+" : "+response.url))}).then(onload,onerror)}}}else{}var out=Module["print"]||console.log.bind(console);var err=Module["printErr"]||console.error.bind(console);Object.assign(Module,moduleOverrides);moduleOverrides=null;if(Module["arguments"])arguments_=Module["arguments"];if(Module["thisProgram"])thisProgram=Module["thisProgram"];if(Module["quit"])quit_=Module["quit"];var wasmBinary;if(Module["wasmBinary"])wasmBinary=Module["wasmBinary"];function intArrayFromBase64(s){if(typeof ENVIRONMENT_IS_NODE!="undefined"&&ENVIRONMENT_IS_NODE){var buf=Buffer.from(s,"base64");return new Uint8Array(buf.buffer,buf.byteOffset,buf.length)}var decoded=atob(s);var bytes=new Uint8Array(decoded.length);for(var i=0;i<decoded.length;++i){bytes[i]=decoded.charCodeAt(i)}return bytes}function tryParseAsDataURI(filename){if(!isDataURI(filename)){return}return intArrayFromBase64(filename.slice(dataURIPrefix.length))}var wasmMemory;var ABORT=false;var EXITSTATUS;var HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateMemoryViews(){var b=wasmMemory.buffer;Module["HEAP8"]=HEAP8=new Int8Array(b);Module["HEAP16"]=HEAP16=new Int16Array(b);Module["HEAPU8"]=HEAPU8=new Uint8Array(b);Module["HEAPU16"]=HEAPU16=new Uint16Array(b);Module["HEAP32"]=HEAP32=new Int32Array(b);Module["HEAPU32"]=HEAPU32=new Uint32Array(b);Module["HEAPF32"]=HEAPF32=new Float32Array(b);Module["HEAPF64"]=HEAPF64=new Float64Array(b)}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function initRuntime(){runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}function addOnInit(cb){__ATINIT__.unshift(cb)}function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;Module["monitorRunDependencies"]?.(runDependencies)}function removeRunDependency(id){runDependencies--;Module["monitorRunDependencies"]?.(runDependencies);if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}function abort(what){Module["onAbort"]?.(what);what="Aborted("+what+")";err(what);ABORT=true;EXITSTATUS=1;what+=". Build with -sASSERTIONS for more info.";var e=new WebAssembly.RuntimeError(what);throw e}var dataURIPrefix="data:application/octet-stream;base64,";var isDataURI=filename=>filename.startsWith(dataURIPrefix);var isFileURI=filename=>filename.startsWith("file://");function findWasmBinary(){var f="data:application/octet-stream;base64,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AUEQaiQAQbDBAEEBNgIAQQALBH9B4wAFIwBBMGsiACQAQdoQEAQgAEEwaiQAQZgaEARBAAsLC78xEwBBgAgLgRQtKyAgIDBYMHgAdHYAX3VucHJvdGVjdGVkX3B0cl9mcm9tX3VzZXJfcHRyKHVzZXJfcHRyKSA9PSB1bnByb3RlY3RlZF9wdHIAc3RybGVuKHRlc3RzW2ldLmRldGFjaGVkX2NpcGhlcnRleHRfaGV4KSA9PSAyICogbWVzc2FnZV9sZW4AMDAwMDAwMDBmZmZmZmZmZgBhYWJiY2NkZGVlZmYAOTcyYWI0ZTA2MzkwY2FhZThmOTlkZDZlMjE4N2JlNmM3ZmYyYzA4YTI0YmUxNmVmADU2MTAwOGZhMDdhNjhmNWM2MTI4NWNkMDEzNDY0ZWFmADIwMjEyMjIzMjQyNTI2MjcyODI5MmEyYjJjMmQyZTJmADNmZjE1MTRiMWM1MDM5MTU5MThmMGMwYzMxMDk0YTZlMWYAMDAwMTAyMDMwNDA1MDYwNzA4MDkwYTBiMGMwZDBlMGYxMDExMTIxMzE0MTUxNjE3MTgxOTFhMWIxYzFkMWUxZgAwMDExMjIzMzQ0NTU2Njc3ODg5OWFhYmJjY2RkZWVmZjEwMjEzMjQzNTQ2NTc2ODc5OGE5YmFjYmRjZWRmZTBmADA4NDNmZmY1MmQ5MzRmYzdhMDcxZWE2MmMwYmQzNTFjZTg1Njc4Y2RlM2VhMmM5ZQA0Mzg5MWJjY2I1MjJiMWU3MmE2YjUzY2YzMWMwNzRlOWQ2YzJkZjhlADQzZmMxMDFiZmY0YjMyYmZhZGQzZGFmNTdhNTkwZQBpbnZhbGlkAGJlMzMwOGY3MmEyYzZhZWQAOTU2ODQ2YTIwOWUwODdlZABfc29kaXVtX21hbGxvYwBzb2RpdW0vdXRpbHMuYwBhZWFkX2FlczI1NmdjbTIuYwA2NzExOTYyN2JkOTg4ZWRhOTA2MjE5ZTA4YzBkMGQ3NzlhMDdkMjA4Y2U4YTRmZTA3MDlhZjc1NWVlZWM2ZGNiAGUyN2FiZGQyZDJhNTNkMmYxMzZiAGM2MTUyMjQ0Y2VhMTk3OGQzZTBiYzI3NGNmOGMwYjNiAGNmMzMyYTEyZmRlZTgwMGIAYjIwNjE0NTdjMDc1OWZjMTc0OWYxNzRlZTFjY2FkZmEAZjU4YzE2NjkwMTIyZDc1MzU2OTA3ZmQ5NmI1NzBmY2EANTlkNGVhZmI0ZGUwY2ZjN2QzZGI5OWE4ZjU0YjE1ZDdiMzlmMGFjYzhkYTY5NzYzYjAxOWMxNjk5Zjg3Njc0YQAyYQBzdHJsZW4odGVzdHNbaV0ua2V5X2hleCkgPT0gMiAqIGNyeXB0b19hZWFkX2FlczI1NmdjbV9LRVlCWVRFUwBzdHJsZW4odGVzdHNbaV0ubm9uY2VfaGV4KSA9PSAyICogY3J5cHRvX2FlYWRfYWVzMjU2Z2NtX05QVUJCWVRFUwBzdHJsZW4odGVzdHNbaV0ubWFjX2hleCkgPT0gMiAqIGNyeXB0b19hZWFkX2FlczI1NmdjbV9BQllURVMAT0sAMDAwMTAyMDMwNDA1MDYwNzA4MDkANTQ5YjM2NWFmOTEzZjNiMDgxMTMxY2NiNmI4MjU1ODgANDNkZGE4MzJlOTQyZTI4NmRhMzE0ZGFhOTliZWY1MDcxZDlkMmM3OAAwMjEyYThkZTUwMDdlZDg3YjMzZjFhNzA5MGI2MTE0ZjllMDhjZWZkOTYwN2YyYzI3NmJkY2ZkYmM1Y2U5Y2Q3AGNkY2NmZTNmNDZkNzgyZWY0N2RmNGU3MmYwYzAyZDljN2Y3NzRkZWY5NzBkMjM0ODZmMTFhNTdmNTQyNDdmMTcANTFmOGMxZjczMWVhMTRhY2RiMjEwYTZkOTczZTA3ADczYTZiNmY0NWY2Y2NjNTEzMWUwN2YyY2FhMWYyZTJmNTYAMDYAZTI4ZTBlOWY5ZDIyNDYzYWMwZTQyNjM5YjUzMGY0MjEwMmZkZWQ3NQBhOTI5ZWU3ZTY3YzdhMmY5MWJiY2VjNjM4OWEzY2FmNDNhYjQ5MzA1AGIyNzlmNTdlMTljOGY1M2YyZjk2M2Y1ZjI1MTlmZGI3YzE3NzliZTJjYTJiM2FlOGUxMTI4YjdkNmM2MjdmYzQAZjMyMzY0YjFkMzM5ZDgyZTRmMTMyZDhmNGEwZWMxZmY3ZTc0NjUxN2ZhMDdlZjFhN2Y0MjJmNGUyNWE0ODE5NABhYjJhYzdjNDRjNjBiZGY4MjI4Yzc4ODRhZGIyMDE4NAA3NDhiMjgwMzE2MjFkOTVlZTYxODEyYjRiNGY0N2QwNGM2ZmMyZmYzADIzMjkzZTliMDdjYTdkMWIwY2FlN2NjNDg5YTk3M2IzAGNjNTZiNjgwNTUyZWI3NTAwOGY1NDg0YjRjYjgwM2ZhNTA2M2ViZDZlYWI5MWY2YWI2YWVmNDkxNmE3NjYyNzMAMjlkM2E0NGY4NzIzZGM2NDAyMzkxMDBjMzY1NDIzYTMxMjkzNGFjODAyMzkyMTJhYzNkZjM0MjFhMjA5ODEyMwBmZWNhNDQ5NTI0NDcwMTViNWRmMWY0NTZkZjhjYTRiYjRlZWUyY2UyADUxZTRiZjJiYWQ5MmI3YWZmMWE0YmMwNTU1MGJhODFkZjRiOTZmYWJmNDFjMTJjN2IwMGU2MGU0OGRiN2UxNTIAZmYwMDg5ZWU4NzBhNGEzOWY2NDViMGE1ZGE3NzRmN2E1OTExZTk2OTZmYzljYWQ2NDY0NTJjMmFhODU5NWExMgBmY2M1MTViMjk0NDA4Yzg2NDVjOTE4M2UzZjRlY2VlNTEyNzg0NmQxAGViNTUwMGUzODI1OTUyODY2ZDkxMTI1M2Y4ZGU4NjBjMDA4MzFjODEAN2NiNmZjN2M2YWJjMDA5ZWZlOTU1MWE5OWYzNmE0MjEAMTBmMWVjZjljNjA1ODQ2NjVkOWFlNWVmZTI3OWU3ZjczNzdlZWE2OTE2ZDJiMTExADNiMjQ1OGQ4MTc2ZTE2MjFjMGNjMjRjMGMwZTI0YzFlODBkNzJmN2VlOTE0OWE0YjE2NjE3NjYyOTYxNmQwMTEAYzAAOTJhY2UzZTM0OGNkODIxMDkyY2Q5MjFhYTM1NDYzNzQyOTlhYjQ2MjA5NjkxYmMyOGI4NzUyZDE3ZjEyM2MyMAAtLS0gU1VDQ0VTUyAtLS0AKG51bGwpAEluY29ycmVjdCBkZWNyeXB0aW9uIG9mIHRlc3QgdmVjdG9yICMldQoAKioqIHRlc3QgY2FzZSAldSBmYWlsZWQsIHdhcyBzdXBwb3NlZCB0byBiZSAlcwoAKioqIHRlc3QgY2FzZSAldSBzdWNjZWVkZWQsIHdhcyBzdXBwb3NlZCB0byBiZSAlcwoAAAAAAAAZAAsAGRkZAAAAAAUAAAAAAAAJAAAAAAsAAAAAAAAAABkACgoZGRkDCgcAAQAJCxgAAAkGCwAACwAGGQAAABkZGQBBkRwLIQ4AAAAAAAAAABkACw0ZGRkADQAAAgAJDgAAAAkADgAADgBByxwLAQwAQdccCxUTAAAAABMAAAAACQwAAAAAAAwAAAwA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NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ5YWIxYmYxYmY4ODcyMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmRhYWIxYmYxYmY4ODcyMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYjcxYmY4ODcyMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmU4ODcyMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxM2Y4ODcyMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmZhODcyMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmY4ODczMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmY4ODcyMzJlYmI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmY4ODcyMzJlOGI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmY4ODcyMzI2YWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmY4ODcyMzJlYWI1OTBkYwAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmY4ODcyMzJlYWI1OTBkZgAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmY4ODcyMzJlYWI1OTA5ZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYmYxYmY4ODcyMzJlYWI1OTA1ZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5ZGU4ZmVmNmQ4YWIxYmYxYmU4ODcyMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmU3NmQ4YWIxYjcxYmY4ODcyMzJlYWI1OTBkZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5Y2U4ZmVmNmQ4YWIxYjcxYmY4ODcyMzJlYWI1OTA1ZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA2MzE3MDEwOTI3NTRlNDBlNDA3NzhkY2QxNTRhNmYyMgAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAABmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZgAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAAxYzY4N2U3NjU4MmI5YjcxM2YwOGYyYjI2YTM1MTA1ZAAAAAA0BgAAOQUAADUwNTE1MjUzNTQ1NTU2NTc1ODU5NWE1YgAAAAC6DQAA9QQAABYHAAA5ZGU5ZmZmN2Q5YWExYWYwYmU4OTczMzNlYmI0OTFkYwAAAAA0BgAAAAAAAAUAQaQ6CwEBAEG8OgsOAgAAAAMAAADoIAAAAAQAQdQ6CwEBAEHkOgsF/////woAQag7CwOgJwE=";return f}var wasmBinaryFile;function getBinarySync(file){if(file==wasmBinaryFile&&wasmBinary){return new Uint8Array(wasmBinary)}var binary=tryParseAsDataURI(file);if(binary){return binary}if(readBinary){return readBinary(file)}throw"both async and sync fetching of the wasm failed"}function getBinaryPromise(binaryFile){return Promise.resolve().then(()=>getBinarySync(binaryFile))}function instantiateArrayBuffer(binaryFile,imports,receiver){return getBinaryPromise(binaryFile).then(binary=>WebAssembly.instantiate(binary,imports)).then(receiver,reason=>{err(`failed to asynchronously prepare wasm: ${reason}`);abort(reason)})}function instantiateAsync(binary,binaryFile,imports,callback){return instantiateArrayBuffer(binaryFile,imports,callback)}function getWasmImports(){return{a:wasmImports}}function createWasm(){var info=getWasmImports();function receiveInstance(instance,module){wasmExports=instance.exports;wasmMemory=wasmExports["d"];updateMemoryViews();addOnInit(wasmExports["e"]);removeRunDependency("wasm-instantiate");return wasmExports}addRunDependency("wasm-instantiate");function receiveInstantiationResult(result){receiveInstance(result["instance"])}if(Module["instantiateWasm"]){try{return Module["instantiateWasm"](info,receiveInstance)}catch(e){err(`Module.instantiateWasm callback failed with error: ${e}`);return false}}if(!wasmBinaryFile)wasmBinaryFile=findWasmBinary();instantiateAsync(wasmBinary,wasmBinaryFile,info,receiveInstantiationResult);return{}}var ASM_CONSTS={7596:()=>Module.getRandomValue(),7632:()=>{if(Module.getRandomValue===undefined){try{var window_="object"===typeof window?window:self;var crypto_=typeof window_.crypto!=="undefined"?window_.crypto:window_.msCrypto;var randomValuesStandard=function(){var buf=new Uint32Array(1);crypto_.getRandomValues(buf);return buf[0]>>>0};randomValuesStandard();Module.getRandomValue=randomValuesStandard}catch(e){try{var crypto=require("crypto");var randomValueNodeJS=function(){var buf=crypto["randomBytes"](4);return(buf[0]<<24|buf[1]<<16|buf[2]<<8|buf[3])>>>0};randomValueNodeJS();Module.getRandomValue=randomValueNodeJS}catch(e){throw"No secure random number generator found"}}}}};function ExitStatus(status){this.name="ExitStatus";this.message=`Program terminated with exit(${status})`;this.status=status}var callRuntimeCallbacks=callbacks=>{while(callbacks.length>0){callbacks.shift()(Module)}};var noExitRuntime=Module["noExitRuntime"]||true;var UTF8Decoder=typeof TextDecoder!="undefined"?new TextDecoder("utf8"):undefined;var UTF8ArrayToString=(heapOrArray,idx,maxBytesToRead)=>{var endIdx=idx+maxBytesToRead;var endPtr=idx;while(heapOrArray[endPtr]&&!(endPtr>=endIdx))++endPtr;if(endPtr-idx>16&&heapOrArray.buffer&&UTF8Decoder){return UTF8Decoder.decode(heapOrArray.subarray(idx,endPtr))}var str="";while(idx<endPtr){var u0=heapOrArray[idx++];if(!(u0&128)){str+=String.fromCharCode(u0);continue}var u1=heapOrArray[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}var u2=heapOrArray[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u0=(u0&7)<<18|u1<<12|u2<<6|heapOrArray[idx++]&63}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}return str};var __emscripten_memcpy_js=(dest,src,num)=>HEAPU8.copyWithin(dest,src,src+num);var readEmAsmArgsArray=[];var readEmAsmArgs=(sigPtr,buf)=>{readEmAsmArgsArray.length=0;var ch;while(ch=HEAPU8[sigPtr++]){var wide=ch!=105;wide&=ch!=112;buf+=wide&&buf%8?4:0;readEmAsmArgsArray.push(ch==112?HEAPU32[buf>>2]:ch==105?HEAP32[buf>>2]:HEAPF64[buf>>3]);buf+=wide?8:4}return readEmAsmArgsArray};var runEmAsmFunction=(code,sigPtr,argbuf)=>{var args=readEmAsmArgs(sigPtr,argbuf);return ASM_CONSTS[code](...args)};var _emscripten_asm_const_int=(code,sigPtr,argbuf)=>runEmAsmFunction(code,sigPtr,argbuf);var printCharBuffers=[null,[],[]];var printChar=(stream,curr)=>{var buffer=printCharBuffers[stream];if(curr===0||curr===10){(stream===1?out:err)(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}};var _fd_write=(fd,iov,iovcnt,pnum)=>{var num=0;for(var i=0;i<iovcnt;i++){var ptr=HEAPU32[iov>>2];var len=HEAPU32[iov+4>>2];iov+=8;for(var j=0;j<len;j++){printChar(fd,HEAPU8[ptr+j])}num+=len}HEAPU32[pnum>>2]=num;return 0};var runtimeKeepaliveCounter=0;var keepRuntimeAlive=()=>noExitRuntime||runtimeKeepaliveCounter>0;var _proc_exit=code=>{EXITSTATUS=code;if(!keepRuntimeAlive()){Module["onExit"]?.(code);ABORT=true}quit_(code,new ExitStatus(code))};var exitJS=(status,implicit)=>{EXITSTATUS=status;_proc_exit(status)};var handleException=e=>{if(e instanceof ExitStatus||e=="unwind"){return EXITSTATUS}quit_(1,e)};var wasmImports={c:__emscripten_memcpy_js,b:_emscripten_asm_const_int,a:_fd_write};var wasmExports=createWasm();var ___wasm_call_ctors=()=>(___wasm_call_ctors=wasmExports["e"])();var _main=Module["_main"]=(a0,a1)=>(_main=Module["_main"]=wasmExports["f"])(a0,a1);var calledRun;dependenciesFulfilled=function runCaller(){if(!calledRun)run();if(!calledRun)dependenciesFulfilled=runCaller};function callMain(){var entryFunction=_main;var argc=0;var argv=0;try{var ret=entryFunction(argc,argv);exitJS(ret,true);return ret}catch(e){return handleException(e)}}function run(){if(runDependencies>0){return}preRun();if(runDependencies>0){return}function doRun(){if(calledRun)return;calledRun=true;Module["calledRun"]=true;if(ABORT)return;initRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(shouldRunNow)callMain();postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout(function(){setTimeout(function(){Module["setStatus"]("")},1);doRun()},1)}else{doRun()}}if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"])shouldRunNow=false;run();
