import { JSDOM } from 'jsdom';
import { createServer } from 'vite';
const dom = new JSDOM('<!doctype html><html><body><main id="main-content" tabindex="-1"></main><div id="test-root"></div></body></html>', { url:'http://localhost/', pretendToBeVisual:true });
const media=new Map();
const getMedia=query=> { if (query === "(prefers-reduced-motion)") query = "(prefers-reduced-motion: reduce)"; if (!media.has(query)) media.set(query,{ media:query,matches:false,listeners:new Set() }); return media.get(query); };
dom.window.matchMedia=query=> { const entry=getMedia(query); return { get matches(){ return entry.matches; },media:query,addEventListener:(_,fn)=>entry.listeners.add(fn),removeEventListener:(_,fn)=>entry.listeners.delete(fn),addListener:fn=>entry.listeners.add(fn),removeListener:fn=>entry.listeners.delete(fn) }; };
const setMedia=(query,matches)=> { const entry=getMedia(query); entry.matches=matches; for (const listener of entry.listeners) listener({matches,media:query}); };
for (const name of ['window','document','navigator','HTMLElement','HTMLInputElement','Element','SVGElement','Node','Event','MouseEvent','StorageEvent']) Object.defineProperty(globalThis,name,{configurable:true,writable:true,value:name==='window' ? dom.window : dom.window[name]});
globalThis.requestAnimationFrame=dom.window.requestAnimationFrame.bind(dom.window);
globalThis.cancelAnimationFrame=dom.window.cancelAnimationFrame.bind(dom.window);
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try { const {runInteractionChecks}=await server.ssrLoadModule('/tests/interactive-dom.tsx'); await runInteractionChecks({setMedia,listenerCount:query=>getMedia(query).listeners.size}); }
finally { await server.close(); dom.window.close(); }

