var __importMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var Yb=Object.create;var Ha=Object.defineProperty;var Xb=Object.getOwnPropertyDescriptor;var Qb=Object.getOwnPropertyNames;var Zb=Object.getPrototypeOf,eS=Object.prototype.hasOwnProperty;var Ue=(r,e)=>()=>(r&&(e=r(r=0)),e);var k=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),tS=(r,e)=>{for(var t in e)Ha(r,t,{get:e[t],enumerable:!0})},rS=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Qb(e))!eS.call(r,i)&&i!==t&&Ha(r,i,{get:()=>e[i],enumerable:!(n=Xb(e,i))||n.enumerable});return r};var U=(r,e,t)=>(t=r!=null?Yb(Zb(r)):{},rS(e||!r||!r.__esModule?Ha(t,"default",{value:r,enumerable:!0}):t,r));var Pd,It,Ln=Ue(()=>{"use strict";Pd={"plugin-config":"Per-plugin setting values, enabled/disabled state + hotkeys at load","plugin-load":"One line per bundled/user/remote plugin as it loads",proxy:"[DIAG-*] client/server socket lifecycle traces",reconnect:"HELLO / RECONNECT key + byte-level diagnostics",scripts:"Script SDK UI-bridge / ScriptHost probe traces",accounts:"DevServer account-file reads \u2014 WARNING: dumps raw creds incl. password"},It=class r{static active=r.parseEnv();static hintShown=!1;static parseEnv(){let e=(process.env.RE_DEBUG??"").trim().toLowerCase();return e?e==="all"||e==="*"||e==="1"||e==="true"?new Set(Object.keys(Pd)):new Set(e.split(/[\s,]+/).filter(Boolean)):new Set}static enabled(e){return r.maybeShowHint(),r.active.has(e)}static get anyEnabled(){return r.active.size>0}static maybeShowHint(){if(r.hintShown)return;r.hintShown=!0;let e=new Date().toISOString().slice(11,23),t=Object.keys(Pd).join(", ");if(r.active.size===0)console.log(`[${e}] [Debug] Verbose logging OFF \u2014 channels: ${t}. Enable with RE_DEBUG=all or RE_DEBUG=<channel,\u2026> (see util/DebugManager.ts).`);else{let n=[...r.active].join(", ");console.log(`[${e}] [Debug] Verbose channels ON: ${n}. (RE_DEBUG=all for every channel \u2014 see util/DebugManager.ts).`)}}}});function Ki(r){try{(0,vd.appendFileSync)(nS,r+`
`)}catch{}}var vd,xd,Cd,nS,m,X=Ue(()=>{"use strict";vd=require("fs"),xd=require("path"),Cd=require("os");Ln();nS=(0,xd.join)((0,Cd.tmpdir)(),"realm-engine-proxy.log");m=class r{static packetDebugEnabled=process.env.PROXY_PACKET_DEBUG==="1"||process.env.PROXY_PACKET_DEBUG==="true";static isPacketDebugEnabled(){return r.packetDebugEnabled}static log(e,t){let i=`[${new Date().toISOString().slice(11,23)}] [${e}] ${t}`;console.log(i),Ki(i)}static debug(e,t,n){if(!It.enabled(e))return;let s=`[${new Date().toISOString().slice(11,23)}] [${t}] ${n}`;console.log(s),Ki(s)}static warn(e,t){let i=`[${new Date().toISOString().slice(11,23)}] [${e}] WARN: ${t}`;console.warn(i),Ki(i)}static error(e,t,n){let s=`[${new Date().toISOString().slice(11,23)}] [${e}] ERROR: ${t}`;console.error(s),n?.stack&&console.error(n.stack),Ki(s+(n?.stack?`
`+n.stack:""))}}});var at,_e,Ua,Id,bt,$n=Ue(()=>{"use strict";at=require("fs"),_e=require("path"),Ua=require("os");X();Id="RotMG Exalt.exe",bt=class r{static find(){let e=r.findAll();return e.length>0?(m.log("ExaltFinder",`Found Exalt at: ${e[0]}`),e[0]):(m.warn("ExaltFinder","Could not auto-detect Exalt installation."),m.warn("ExaltFinder","Set the ROTMG_PATH environment variable to your Exalt directory."),m.warn("ExaltFinder",`Expected to find ${Id} in the directory.`),null)}static parseLibraryFolders(e){let t=[];try{if(!(0,at.existsSync)(e))return t;let i=(0,at.readFileSync)(e,"utf8").matchAll(/"path"\s+"([^"]+)"/g);for(let s of i)s[1]&&t.push(s[1].replace(/\\\\/g,"\\"))}catch{}return t}static getSteamRoots(){let e=(0,Ua.homedir)();return[(0,_e.join)(e,".local","share","Steam"),(0,_e.join)(e,".steam","steam"),(0,_e.join)(e,".steam","root"),(0,_e.join)(e,".steam"),(0,_e.join)(e,".var","app","com.valvesoftware.Steam",".local","share","Steam"),(0,_e.join)(e,".var","app","com.valvesoftware.Steam",".steam","steam"),"C:\\Program Files (x86)\\Steam","C:\\Program Files\\Steam","D:\\Steam","D:\\SteamLibrary","E:\\Steam","E:\\SteamLibrary"].filter(n=>{try{return(0,at.existsSync)(n)}catch{return!1}})}static findAll(){let e=(0,Ua.homedir)(),t=process.env.LOCALAPPDATA||(0,_e.join)(e,"AppData","Local"),n=[process.env.ROTMG_PATH,(0,_e.join)(t,"RealmOfTheMadGod","Production"),(0,_e.join)(e,"Documents","RealmOfTheMadGod","Production"),(0,_e.join)(e,".wine","drive_c","users",process.env.USER||"steamuser","AppData","Local","RealmOfTheMadGod","Production"),(0,_e.join)(e,".wine","drive_c","Program Files (x86)","RealmOfTheMadGod","Production")],i=["RotMG Exalt","Realm of the Mad God","rotmg"],s=new Set;for(let l of r.getSteamRoots()){s.add(l);let c=(0,_e.join)(l,"steamapps","libraryfolders.vdf");for(let u of r.parseLibraryFolders(c))s.add(u)}let o=["/run/media/mmcblk0p1","/run/media/deck","/media","/mnt"];for(let l of o)try{if((0,at.existsSync)(l)){s.add(l);let c=(0,at.readdirSync)(l,{withFileTypes:!0});for(let u of c)u.isDirectory()&&s.add((0,_e.join)(l,u.name))}}catch{}for(let l of s){for(let u of i)n.push((0,_e.join)(l,"steamapps","common",u));let c=(0,_e.join)(l,"steamapps","compatdata");try{if((0,at.existsSync)(c)){let u=(0,at.readdirSync)(c,{withFileTypes:!0});for(let d of u)if(d.isDirectory()){let p=["steamuser",process.env.USER||"jyun"];for(let f of p)n.push((0,_e.join)(c,d.name,"pfx","drive_c","users",f,"AppData","Local","RealmOfTheMadGod","Production"),(0,_e.join)(c,d.name,"pfx","drive_c","users",f,"Documents","RealmOfTheMadGod","Production"),(0,_e.join)(c,d.name,"pfx","drive_c","Program Files (x86)","RealmOfTheMadGod","Production"))}}}catch{}}n.push("C:\\Program Files (x86)\\Steam\\steamapps\\common\\RotMG Exalt","C:\\Program Files\\Steam\\steamapps\\common\\RotMG Exalt","C:\\Program Files (x86)\\Steam\\steamapps\\common\\Realm of the Mad God","C:\\Program Files\\Steam\\steamapps\\common\\Realm of the Mad God","C:\\Games\\Realm of the Mad God","D:\\Steam\\steamapps\\common\\RotMG Exalt","D:\\SteamLibrary\\steamapps\\common\\RotMG Exalt","E:\\Steam\\steamapps\\common\\RotMG Exalt","E:\\SteamLibrary\\steamapps\\common\\RotMG Exalt");let a=[];for(let l of n)l&&r.isValidExaltDir(l)&&!a.includes(l)&&a.push(l);return a}static isSteamInstall(e){return/[\\/]steamapps[\\/]common[\\/]/i.test(String(e||""))}static isValidExaltDir(e){try{return(0,at.existsSync)(e)&&(0,at.existsSync)((0,_e.join)(e,Id))}catch{return!1}}}});var Xa=k(as=>{"use strict";Object.defineProperty(as,"__esModule",{value:!0});as.Self=void 0;var Ya=class{static getX(){throw new Error("Must be run inside RealmEngine client")}static getY(){throw new Error("Must be run inside RealmEngine client")}static getPosition(){throw new Error("Must be run inside RealmEngine client")}static distanceTo(e){throw new Error("Must be run inside RealmEngine client")}static getHP(){throw new Error("Must be run inside RealmEngine client")}static getMaxHP(){throw new Error("Must be run inside RealmEngine client")}static getHPPercent(){throw new Error("Must be run inside RealmEngine client")}static getMP(){throw new Error("Must be run inside RealmEngine client")}static getMaxMP(){throw new Error("Must be run inside RealmEngine client")}static getMPPercent(){throw new Error("Must be run inside RealmEngine client")}static getStats(){throw new Error("Must be run inside RealmEngine client")}static getExaltedBonuses(){throw new Error("Must be run inside RealmEngine client")}static getExaltedMaxHP(){throw new Error("Must be run inside RealmEngine client")}static getExaltedMaxMP(){throw new Error("Must be run inside RealmEngine client")}static getExaltedAtk(){throw new Error("Must be run inside RealmEngine client")}static getExaltedDef(){throw new Error("Must be run inside RealmEngine client")}static getExaltedSpd(){throw new Error("Must be run inside RealmEngine client")}static getExaltedDex(){throw new Error("Must be run inside RealmEngine client")}static getExaltedVit(){throw new Error("Must be run inside RealmEngine client")}static getExaltedWis(){throw new Error("Must be run inside RealmEngine client")}static getGearBonuses(){throw new Error("Must be run inside RealmEngine client")}static getGearMaxHP(){throw new Error("Must be run inside RealmEngine client")}static getGearMaxMP(){throw new Error("Must be run inside RealmEngine client")}static getGearAtk(){throw new Error("Must be run inside RealmEngine client")}static getGearDef(){throw new Error("Must be run inside RealmEngine client")}static getGearSpd(){throw new Error("Must be run inside RealmEngine client")}static getGearDex(){throw new Error("Must be run inside RealmEngine client")}static getGearVit(){throw new Error("Must be run inside RealmEngine client")}static getGearWis(){throw new Error("Must be run inside RealmEngine client")}static getAtk(){throw new Error("Must be run inside RealmEngine client")}static getDef(){throw new Error("Must be run inside RealmEngine client")}static getSpd(){throw new Error("Must be run inside RealmEngine client")}static getDex(){throw new Error("Must be run inside RealmEngine client")}static getVit(){throw new Error("Must be run inside RealmEngine client")}static getWis(){throw new Error("Must be run inside RealmEngine client")}static hasEffect(e){throw new Error("Must be run inside RealmEngine client")}static getEffects(){throw new Error("Must be run inside RealmEngine client")}static getWeapon(){throw new Error("Must be run inside RealmEngine client")}static getAbility(){throw new Error("Must be run inside RealmEngine client")}static getArmor(){throw new Error("Must be run inside RealmEngine client")}static getRing(){throw new Error("Must be run inside RealmEngine client")}static getName(){throw new Error("Must be run inside RealmEngine client")}static getClass(){throw new Error("Must be run inside RealmEngine client")}static isDead(){throw new Error("Must be run inside RealmEngine client")}static isInCombat(){throw new Error("Must be run inside RealmEngine client")}static isInvisible(){throw new Error("Must be run inside RealmEngine client")}static getAccountFame(){throw new Error("Must be run inside RealmEngine client")}static getCharacterFame(){throw new Error("Must be run inside RealmEngine client")}static getPowerLevel(){throw new Error("Must be run inside RealmEngine client")}};as.Self=Ya});var Za=k(ls=>{"use strict";Object.defineProperty(ls,"__esModule",{value:!0});ls.Walking=void 0;var Qa=class{static walkTo(e,t){throw new Error("Must be run inside RealmEngine client")}static walkToPosition(e){throw new Error("Must be run inside RealmEngine client")}static walkToEnemy(e){throw new Error("Must be run inside RealmEngine client")}static walkToPortal(e){throw new Error("Must be run inside RealmEngine client")}static walkToNearestPortal(){throw new Error("Must be run inside RealmEngine client")}static walkToNexusPortal(){throw new Error("Must be run inside RealmEngine client")}static walkToLeftWall(){throw new Error("Must be run inside RealmEngine client")}static walkToRightWall(){throw new Error("Must be run inside RealmEngine client")}static walkToTopWall(){throw new Error("Must be run inside RealmEngine client")}static walkToBottomWall(){throw new Error("Must be run inside RealmEngine client")}static followPlayer(e){throw new Error("Must be run inside RealmEngine client")}static stopMoving(){throw new Error("Must be run inside RealmEngine client")}static isMoving(){throw new Error("Must be run inside RealmEngine client")}static hasReached(e,t){throw new Error("Must be run inside RealmEngine client")}static nexus(){throw new Error("Must be run inside RealmEngine client")}static getDodgePosition(){throw new Error("Must be run inside RealmEngine client")}static dodge(){throw new Error("Must be run inside RealmEngine client")}static dodgeFrom(e){throw new Error("Must be run inside RealmEngine client")}static canTeleport(){throw new Error("Must be run inside RealmEngine client")}static teleportToPlayer(e){throw new Error("Must be run inside RealmEngine client")}static teleportToBeacon(e){throw new Error("Must be run inside RealmEngine client")}};ls.Walking=Qa});var tl=k(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.Combat=void 0;var el=class{static aimAt(e){throw new Error("Must be run inside RealmEngine client")}static aimAtPosition(e,t){throw new Error("Must be run inside RealmEngine client")}static stopAiming(){throw new Error("Must be run inside RealmEngine client")}static autoAimOff(){throw new Error("Must be run inside RealmEngine client")}static useAbility(){throw new Error("Must be run inside RealmEngine client")}static useAbilityAt(e,t){throw new Error("Must be run inside RealmEngine client")}static useAbilityOn(e){throw new Error("Must be run inside RealmEngine client")}static accuracy(){throw new Error("Must be run inside RealmEngine client")}static recentAccuracy(e){throw new Error("Must be run inside RealmEngine client")}static resetAccuracy(){throw new Error("Must be run inside RealmEngine client")}};cs.Combat=el});var nl=k(us=>{"use strict";Object.defineProperty(us,"__esModule",{value:!0});us.Players=void 0;var rl=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static getNearest(){throw new Error("Must be run inside RealmEngine client")}static find(e){throw new Error("Must be run inside RealmEngine client")}static getHP(e){throw new Error("Must be run inside RealmEngine client")}static getMaxHP(e){throw new Error("Must be run inside RealmEngine client")}static getHPPercent(e){throw new Error("Must be run inside RealmEngine client")}static getMP(e){throw new Error("Must be run inside RealmEngine client")}static getAccountFame(e){throw new Error("Must be run inside RealmEngine client")}static getCharacterFame(e){throw new Error("Must be run inside RealmEngine client")}static count(){throw new Error("Must be run inside RealmEngine client")}static getPlayerGuild(e,t="equals"){throw new Error("Must be run inside RealmEngine client")}static getNearbyGuilds(){throw new Error("Must be run inside RealmEngine client")}};us.Players=rl});var sl=k(ds=>{"use strict";Object.defineProperty(ds,"__esModule",{value:!0});ds.Enemies=void 0;var il=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static getNearest(){throw new Error("Must be run inside RealmEngine client")}static getNearestTo(e){throw new Error("Must be run inside RealmEngine client")}static getBoss(){throw new Error("Must be run inside RealmEngine client")}static getTargetingMe(){throw new Error("Must be run inside RealmEngine client")}static find(e){throw new Error("Must be run inside RealmEngine client")}static count(){throw new Error("Must be run inside RealmEngine client")}static getById(e){throw new Error("Must be run inside RealmEngine client")}static getByType(e){throw new Error("Must be run inside RealmEngine client")}};ds.Enemies=il});var ol=k(ct=>{"use strict";Object.defineProperty(ct,"__esModule",{value:!0});ct.inventory=ct.INVENTORY_TOTAL_SLOT_COUNT=ct.INVENTORY_BACKPACK_SLOT_COUNT=ct.INVENTORY_MAIN_SLOT_COUNT=void 0;ct.INVENTORY_MAIN_SLOT_COUNT=12;ct.INVENTORY_BACKPACK_SLOT_COUNT=16;ct.INVENTORY_TOTAL_SLOT_COUNT=ct.INVENTORY_MAIN_SLOT_COUNT+ct.INVENTORY_BACKPACK_SLOT_COUNT;ct.inventory={getSlot(r){return null},getAll(){return[]},findItem(r){return null},findItems(r){return[]},useItem(r){},swapSlots(r,e){},isFull(){return!1},emptySlotCount(){return 0},getBackpack(){throw new Error("Must be run inside RealmEngine client")},getVault(){throw new Error("Must be run inside RealmEngine client")},getEntireVault(){throw new Error("Must be run inside RealmEngine client")},getMaterials(){throw new Error("Must be run inside RealmEngine client")},getPotions(){throw new Error("Must be run inside RealmEngine client")},getGifts(){throw new Error("Must be run inside RealmEngine client")},getSeasonalSpoils(){throw new Error("Must be run inside RealmEngine client")},withdraw(r,e){throw new Error("Must be run inside RealmEngine client")},deposit(r,e){throw new Error("Must be run inside RealmEngine client")}}});var Gd=k(fs=>{"use strict";Object.defineProperty(fs,"__esModule",{value:!0});fs.GiftChest=void 0;var al=class{static getItems(){throw new Error("Must be run inside RealmEngine client")}static withdraw(e){throw new Error("Must be run inside RealmEngine client")}static withdrawAll(){throw new Error("Must be run inside RealmEngine client")}static contains(e){throw new Error("Must be run inside RealmEngine client")}};fs.GiftChest=al});var ll=k(ps=>{"use strict";Object.defineProperty(ps,"__esModule",{value:!0});ps.Vault=void 0;var fS=Gd();ps.Vault={giftChest:fS.GiftChest,get(r){throw new Error("Must be run inside RealmEngine client")},vaultChest:{get(r){throw new Error("Must be run inside RealmEngine client")},findChestWith(r){throw new Error("Must be run inside RealmEngine client")},getAll(){throw new Error("Must be run inside RealmEngine client")}},findItem(r){throw new Error("Must be run inside RealmEngine client")},getAllItems(){throw new Error("Must be run inside RealmEngine client")}}});var ul=k(ms=>{"use strict";Object.defineProperty(ms,"__esModule",{value:!0});ms.World=void 0;var cl=class{static isNexus(){throw new Error("Must be run inside RealmEngine client")}static isRealm(){throw new Error("Must be run inside RealmEngine client")}static isDungeon(){throw new Error("Must be run inside RealmEngine client")}static isVault(){throw new Error("Must be run inside RealmEngine client")}static getName(){throw new Error("Must be run inside RealmEngine client")}};ms.World=cl});var fl=k(hs=>{"use strict";Object.defineProperty(hs,"__esModule",{value:!0});hs.Tiles=void 0;var dl=class{static getAll(e){throw new Error("Must be run inside RealmEngine client")}static getNearby(e,t){throw new Error("Must be run inside RealmEngine client")}static getByType(e){throw new Error("Must be run inside RealmEngine client")}static getAt(e,t){throw new Error("Must be run inside RealmEngine client")}static isBlocking(e,t){throw new Error("Must be run inside RealmEngine client")}static isSafe(e,t){throw new Error("Must be run inside RealmEngine client")}};hs.Tiles=dl});var ml=k(gs=>{"use strict";Object.defineProperty(gs,"__esModule",{value:!0});gs.Objects=void 0;var pl=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static getById(e){throw new Error("Must be run inside RealmEngine client")}static getByType(e){throw new Error("Must be run inside RealmEngine client")}static count(){throw new Error("Must be run inside RealmEngine client")}static exists(e){throw new Error("Must be run inside RealmEngine client")}static getByCategory(e){throw new Error("Must be run inside RealmEngine client")}static getEnemies(){throw new Error("Must be run inside RealmEngine client")}static getPlayers(){throw new Error("Must be run inside RealmEngine client")}static getPortals(){throw new Error("Must be run inside RealmEngine client")}static getContainers(){throw new Error("Must be run inside RealmEngine client")}static getPets(){throw new Error("Must be run inside RealmEngine client")}static getBeacons(){throw new Error("Must be run inside RealmEngine client")}static getQuestObject(){throw new Error("Must be run inside RealmEngine client")}static getQuestTargetId(){throw new Error("Must be run inside RealmEngine client")}static getQuestTargetType(){throw new Error("Must be run inside RealmEngine client")}static getQuestId(){throw new Error("Must be run inside RealmEngine client")}static getQuestType(){throw new Error("Must be run inside RealmEngine client")}static getNearest(){throw new Error("Must be run inside RealmEngine client")}static getNearestTo(e){throw new Error("Must be run inside RealmEngine client")}static getNearestOfType(e){throw new Error("Must be run inside RealmEngine client")}static getNearestOfCategory(e){throw new Error("Must be run inside RealmEngine client")}static getWithinRadius(e){throw new Error("Must be run inside RealmEngine client")}static getWithinRadiusFrom(e,t){throw new Error("Must be run inside RealmEngine client")}static getWithinBounds(e,t,n,i){throw new Error("Must be run inside RealmEngine client")}static sortByDistance(){throw new Error("Must be run inside RealmEngine client")}static sortByDistanceFrom(e){throw new Error("Must be run inside RealmEngine client")}static findByName(e){throw new Error("Must be run inside RealmEngine client")}static findAllByName(e){throw new Error("Must be run inside RealmEngine client")}static findPortal(e){throw new Error("Must be run inside RealmEngine client")}static getNearestPortal(){throw new Error("Must be run inside RealmEngine client")}static getOpenPortals(){throw new Error("Must be run inside RealmEngine client")}static getNearestContainer(){throw new Error("Must be run inside RealmEngine client")}static findContainer(e){throw new Error("Must be run inside RealmEngine client")}static getCategory(e){throw new Error("Must be run inside RealmEngine client")}static getTypeName(e){throw new Error("Must be run inside RealmEngine client")}static isEnemy(e){throw new Error("Must be run inside RealmEngine client")}static isPortal(e){throw new Error("Must be run inside RealmEngine client")}static isContainer(e){throw new Error("Must be run inside RealmEngine client")}static isBoss(e){throw new Error("Must be run inside RealmEngine client")}static hasType(e){throw new Error("Must be run inside RealmEngine client")}};gs.Objects=pl});var gl=k(ys=>{"use strict";Object.defineProperty(ys,"__esModule",{value:!0});ys.Projectiles=void 0;var hl=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static getNearby(e){throw new Error("Must be run inside RealmEngine client")}static getIncoming(){throw new Error("Must be run inside RealmEngine client")}static count(){throw new Error("Must be run inside RealmEngine client")}};ys.Projectiles=hl});var Ss=k(bs=>{"use strict";Object.defineProperty(bs,"__esModule",{value:!0});bs.Log=void 0;var yl=class{static info(e){throw new Error("Must be run inside RealmEngine client")}static warn(e){throw new Error("Must be run inside RealmEngine client")}static error(e){throw new Error("Must be run inside RealmEngine client")}};bs.Log=yl});var Sl=k(ws=>{"use strict";Object.defineProperty(ws,"__esModule",{value:!0});ws.Settings=void 0;var bl=class{static get(e){throw new Error("Must be run inside RealmEngine client")}static getString(e,t){throw new Error("Must be run inside RealmEngine client")}static getNumber(e,t){throw new Error("Must be run inside RealmEngine client")}static getBoolean(e,t){throw new Error("Must be run inside RealmEngine client")}};ws.Settings=bl});var El=k(Es=>{"use strict";Object.defineProperty(Es,"__esModule",{value:!0});Es.Timing=void 0;var wl=class{static now(){throw new Error("Must be run inside RealmEngine client")}static timeSince(e){throw new Error("Must be run inside RealmEngine client")}static sleep(e){throw new Error("Must be run inside RealmEngine client")}static every(e,t){throw new Error("Must be run inside RealmEngine client")}static after(e,t){throw new Error("Must be run inside RealmEngine client")}static debounce(e,t){throw new Error("Must be run inside RealmEngine client")}};Es.Timing=wl});var Tl=k(Ts=>{"use strict";Object.defineProperty(Ts,"__esModule",{value:!0});Ts.chat=void 0;var Er=()=>{};Ts.chat={onMessage(r){return Er},onMessageFrom(r,e){return Er},onMessageContaining(r,e){return Er},onChannelMessage(r,e){return Er},onWhisper(r){return Er},onSystemMessage(r){return Er},send(r,e){},notify(r,e){},say(r){},yell(r){},tell(r,e){},party(r){},guild(r){},blockOutgoing(r,...e){return Er}}});var Pl=k(Ps=>{"use strict";Object.defineProperty(Ps,"__esModule",{value:!0});Ps.party=void 0;Ps.party={createParty(r){},getPartyList(){return Promise.reject(new Error("RealmEngine.party.getPartyList is only available in Realm Engine"))},join(r){},kick(r){},getPartyMembers(){return[]},getId(r,e){return null},leave(){}}});var vl=k(Tr=>{"use strict";Object.defineProperty(Tr,"__esModule",{value:!0});Tr.trade=void 0;Tr.trade={start(r){return!1},startTrade(r){return Tr.trade.start(r)},isActive(){return!1},getPartnerName(){return""},getOurItems(){return[]},getPartnerItems(){return[]},getOurOffer(){return[]},getPartnerOffer(){return[]},offer(r){return!1},offerAll(){return!1},clearOffer(){return!1},accept(){return!1},acceptTrade(){return Tr.trade.accept()},cancel(){return!1},cancelTrade(){return Tr.trade.cancel()}}});var xl=k(vs=>{"use strict";Object.defineProperty(vs,"__esModule",{value:!0});vs.events=void 0;var Ke=()=>{};function pS(r,e,t,n){return Ke}function mS(r,e,t){return Ke}vs.events={onPlayerDied(r){return Ke},onEnemySpawned(r){return Ke},onEnemySpawnedOfType(r,e){return Ke},onMapChanged(r){return Ke},onConnected(r){return Ke},onDisconnected(r){return Ke},onLevelUp(r){return Ke},onItemPickedUp(r){return Ke},onPortalOpened(r){return Ke},onCharacterFameAtLeast(r,e){return Ke},onChat(r,e){return Ke},onPlayerNearby(r,e,t){return Ke},onGuildNearby:pS,onPlayerJoinParty:mS}});var Cl=k(Cs=>{"use strict";Object.defineProperty(Cs,"__esModule",{value:!0});Cs.loot=void 0;var xs=()=>{};Cs.loot={getBags(){return[]},getNearbyBags(r){return[]},getBagsByRarity(r){return[]},getBagsContaining(r){return[]},onBagDropped(r){return xs},onRareBagDropped(r,e){return xs},onItemDropped(r,e){return xs},onBagRemoved(r){return xs},pickup(r,e,t){return!1},useFromBag(r,e){return!1},pickupId(r,e){return-1},shouldPickup(r,e){return!1},isUT(r){return!1},isST(r){return!1},isStatPot(r){return!1},isHpPot(r){return!1},isMpPot(r){return!1},isLifeManaPot(r){return!1}}});var kl=k(ir=>{"use strict";var hS=ir&&ir.__awaiter||function(r,e,t,n){function i(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(n.next(u))}catch(d){o(d)}}function l(u){try{c(n.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):i(u.value).then(a,l)}c((n=n.apply(r,e||[])).next())})};Object.defineProperty(ir,"__esModule",{value:!0});ir.DiscordWebhook=ir.discord=void 0;ir.discord={createWebhook(r){return new ks(r)}};var ks=class{constructor(e){this.options=e}send(e){return Promise.resolve()}sendSafe(e){return hS(this,void 0,void 0,function*(){try{return yield this.send(e),!0}catch{return!1}})}sendText(e){return Promise.resolve()}sendEmbed(e,t){return Promise.resolve()}sendDeath(e){return Promise.resolve()}sendLoot(e){return Promise.resolve()}sendFameSnapshot(){return Promise.resolve()}sendPartyStatus(){return Promise.resolve()}};ir.DiscordWebhook=ks});var _l=k(Kr=>{"use strict";Object.defineProperty(Kr,"__esModule",{value:!0});Kr.panel=Kr.Panel=void 0;Kr.Panel={group(r,e,t={}){return Object.assign({type:"group",title:r,children:e},t)},row(r,e={}){return Object.assign({type:"row",children:r},e)},tabs(r){return Object.assign({type:"tabs"},r)},heading(r,e=2){return{type:"heading",text:r,level:e}},label(r,e={}){return Object.assign({type:"label",text:r},e)},image(r){return Object.assign({type:"image"},r)},item(r){return Object.assign({type:"item"},r)},itemGrid(r){return Object.assign({type:"itemGrid"},r)},button(r){return Object.assign({type:"button"},r)},toggle(r){return Object.assign({type:"toggle"},r)},slider(r){return Object.assign({type:"slider"},r)},number(r){return Object.assign({type:"number"},r)},text(r){return Object.assign({type:"text"},r)},select(r){return Object.assign({type:"select"},r)},progress(r){return Object.assign({type:"progress"},r)},log(r){return Object.assign({type:"log"},r)},spacer(r=8){return{type:"spacer",size:r}}};function gS(){throw new Error("RealmEngine.ui.panel must be run inside the RealmEngine client")}Kr.panel={define(r){gS()}}});var Ud=k(_s=>{"use strict";Object.defineProperty(_s,"__esModule",{value:!0});_s.RealmEngine=void 0;var yS=Xa(),bS=Za(),SS=tl(),wS=nl(),ES=sl(),TS=ol(),PS=ll(),Fn=ul(),vS=fl(),xS=ml(),CS=gl(),kS=Ss(),_S=Sl(),IS=El(),RS=Tl(),NS=Pl(),AS=vl(),OS=xl(),MS=Cl(),DS=kl(),LS=_l();_s.RealmEngine={self:yS.Self,walking:bS.Walking,combat:SS.Combat,players:wS.Players,enemies:ES.Enemies,inventory:TS.inventory,vault:PS.Vault,world:{isNexus:Fn.World.isNexus,isRealm:Fn.World.isRealm,isDungeon:Fn.World.isDungeon,isVault:Fn.World.isVault,getName:Fn.World.getName,tiles:vS.Tiles,objects:xS.Objects,projectiles:CS.Projectiles},log:kS.Log,settings:_S.Settings,timing:IS.Timing,chat:RS.chat,party:NS.party,trade:AS.trade,events:OS.events,loot:MS.loot,discord:DS.discord,ui:{status(r){throw new Error("Must be run inside RealmEngine client")},setStatus(r){throw new Error("Must be run inside RealmEngine client")},panel:LS.panel}}});var Vd=k(Is=>{"use strict";Object.defineProperty(Is,"__esModule",{value:!0});Is.Position=void 0;var Il=class r{constructor(e,t){this.x=e,this.y=t}distanceTo(e){return Math.sqrt(Math.pow(this.x-e.x,2)+Math.pow(this.y-e.y,2))}isWithin(e,t){return this.distanceTo(e)<=t}offset(e,t){return new r(this.x+e,this.y+t)}toString(){return`Position(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`}};Is.Position=Il});var Jd=k(Rs=>{"use strict";Object.defineProperty(Rs,"__esModule",{value:!0});Rs.StatusEffect=void 0;var qd;(function(r){r.CURSED="cursed",r.SLOWED="slowed",r.STUNNED="stunned",r.BLIND="blind",r.HALLUCINATING="hallucinating",r.DRUNK="drunk",r.CONFUSED="confused",r.STASIS="stasis",r.INVISIBLE="invisible",r.ARMORED="armored",r.INVINCIBLE="invincible",r.SPEEDY="speedy",r.HEALING="healing",r.DAMAGING="damaging",r.BERSERK="berserk",r.PETRIFIED="petrified",r.SICK="sick",r.BLEEDING="bleeding",r.QUIET="quiet",r.EXPOSED="exposed",r.HEXED="hexed"})(qd||(Rs.StatusEffect=qd={}))});var Kd=k(Ns=>{"use strict";Object.defineProperty(Ns,"__esModule",{value:!0});Ns.GuildRank=void 0;var zd;(function(r){r[r.Initiate=0]="Initiate",r[r.Member=10]="Member",r[r.Officer=20]="Officer",r[r.Leader=30]="Leader",r[r.Founder=40]="Founder"})(zd||(Ns.GuildRank=zd={}))});var Yd=k(Yr=>{"use strict";Object.defineProperty(Yr,"__esModule",{value:!0});Yr.guild=Yr.GuildRank=void 0;var $S=Kd();Object.defineProperty(Yr,"GuildRank",{enumerable:!0,get:function(){return $S.GuildRank}});Yr.guild={invite(r){},remove(r){},leave(){},join(r){},setRank(r,e){},onInvited(r){return()=>{}},onResult(r){return()=>{}}}});var Xd=k(As=>{"use strict";Object.defineProperty(As,"__esModule",{value:!0});As.Inventory=void 0;var Rl=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static contains(e){throw new Error("Must be run inside RealmEngine client")}static getCount(e){throw new Error("Must be run inside RealmEngine client")}static getFreeSlots(){throw new Error("Must be run inside RealmEngine client")}static isFull(){throw new Error("Must be run inside RealmEngine client")}static use(e){throw new Error("Must be run inside RealmEngine client")}static useBySlot(e){throw new Error("Must be run inside RealmEngine client")}static drop(e){throw new Error("Must be run inside RealmEngine client")}};As.Inventory=Rl});var Ms=k(Os=>{"use strict";Object.defineProperty(Os,"__esModule",{value:!0});Os.Leaf=void 0;var Hn=class{constructor(e){this._name=e??this.constructor.name}getName(){return this._name}setName(e){this._name=e}static of(e){return new Nl(e.name,e.isValid,e.onLoop)}};Os.Leaf=Hn;Hn.STOP=-1;var Nl=class extends Hn{constructor(e,t,n){super(e??"Leaf"),this._isValid=t,this._onLoop=n}isValid(){return this._isValid()}onLoop(){return this._onLoop()}}});var Gn=k(Ds=>{"use strict";Object.defineProperty(Ds,"__esModule",{value:!0});Ds.Branch=void 0;var BS=Ms(),Wn=class r extends BS.Leaf{constructor(){super(...arguments),this._children=[],this.idleSleep=100}addLeaves(...e){for(let t of e)this._children.push(t);return this}getLeaves(){return this._children.slice()}size(){return this._children.length}clear(){this._children=[]}next(){for(let e of this._children)if(e.isValid())return e;return null}tick(e){for(let t of this._children)if(e.isValidSafe(t))return t instanceof r?e.enterBranch(t):e.runLeaf(t);return e.idle()}onLoop(){let e=this.next();return e?e.onLoop():this.idleSleep}_iterateChildren(){return this._children}static of(e){var t;let n=new Al(e.name,e.isValid);return!((t=e.children)===null||t===void 0)&&t.length&&n.addLeaves(...e.children),n}};Ds.Branch=Wn;Wn._walkerMethods=["enterBranch","runLeaf","idle"];var Al=class extends Wn{constructor(e,t){super(e??"Branch"),this._isValid=t}isValid(){return this._isValid()}}});var Ml=k(Ls=>{"use strict";Object.defineProperty(Ls,"__esModule",{value:!0});Ls.Root=void 0;var jS=Gn(),Ol=class extends jS.Branch{constructor(){super("Root")}isValid(){return!0}};Ls.Root=Ol});var ef=k($s=>{"use strict";Object.defineProperty($s,"__esModule",{value:!0});$s.TreeScript=void 0;var Qd=Ss(),Zd=Gn(),FS=Ml(),Dl=class r{constructor(){this.root=new FS.Root,this.idleSleep=100,this.trace=!1,this._currentBranchName="",this._currentLeafName=""}onStart(){}onLoop(){return this._currentBranchName="",this._currentLeafName="",this.root.tick(this)}onStop(){}addBranches(...e){return this.root.addLeaves(...e),this.root}addChildren(...e){return this.addBranches(...e)}clear(){this.root.clear(),this._currentBranchName="",this._currentLeafName=""}getRoot(){return this.root}getCurrentBranchName(){return this._currentBranchName}setCurrentBranchName(e){this._currentBranchName=e}getCurrentLeafName(){return this._currentLeafName}setCurrentLeafName(e){this._currentLeafName=e}enterBranch(e){this._currentBranchName=e.getName(),this.trace&&this.log(`\u2192 ${e.getName()} (branch)`);try{return e.tick(this)}catch(t){return this.logError(e,t),this.idleSleep}}runLeaf(e){this._currentLeafName=e.getName(),this.trace&&this.log(`\u25B6 ${e.getName()} (leaf)`);try{return e.onLoop()}catch(t){return this.logError(e,t),this.idleSleep}}idle(){return this.trace&&this.log("\u2026 idle"),this.idleSleep}isValidSafe(e){try{return e.isValid()}catch(t){return this.logError(e,t,"isValid"),!1}}describe(){return r._describeNode(this.root,"",!0,!0)}getActivePath(){let e=[],t=this.root;for(;t;){e.push(t);let n=null;for(let i of t._iterateChildren())if(this.isValidSafe(i)){n=i;break}if(!n)break;if(n instanceof Zd.Branch){t=n;continue}e.push(n);break}return e}log(e){try{Qd.Log.info(`[tree] ${e}`)}catch{}}logError(e,t,n="onLoop"){let i=t instanceof Error?t.message:String(t);try{Qd.Log.error(`[tree] ${e.getName()}.${n}() threw: ${i}`)}catch{console.error(`[tree] ${e.getName()}.${n}() threw: ${i}`)}}static _describeNode(e,t,n,i){let o=`${t}${i?"":n?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 "}${e.getName()}
`;if(e instanceof Zd.Branch){let a=e._iterateChildren(),l=i?t:t+(n?"    ":"\u2502   ");a.forEach((c,u)=>{o+=r._describeNode(c,l,u===a.length-1,!1)})}return o}};$s.TreeScript=Dl});var tf=k(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.leaf=HS;St.branch=WS;St.when=GS;St.not=US;St.always=VS;St.cooldown=qS;St.once=JS;St.sequence=zS;St.parallel=KS;var Pr=Ms(),Un=Gn();function HS(r){return Pr.Leaf.of(r)}function WS(r){return Un.Branch.of(r)}function GS(r,e){return Pr.Leaf.of({name:`when(${e.getName()})`,isValid:()=>r()&&e.isValid(),onLoop:()=>e.onLoop()})}function US(r){return Pr.Leaf.of({name:`not(${r.getName()})`,isValid:()=>!r.isValid(),onLoop:()=>r.onLoop()})}function VS(r){return Pr.Leaf.of({name:`always(${r.getName()})`,isValid:()=>!0,onLoop:()=>r.onLoop()})}function qS(r,e){let t=-1/0;return Pr.Leaf.of({name:`cooldown(${r}ms, ${e.getName()})`,isValid:()=>Date.now()-t>=r&&e.isValid(),onLoop:()=>(t=Date.now(),e.onLoop())})}function JS(r){let e=!1;return Pr.Leaf.of({name:`once(${r.getName()})`,isValid:()=>!e&&r.isValid(),onLoop:()=>(e=!0,r.onLoop())})}function zS(r,...e){let t=0;return new class extends Un.Branch{constructor(){super(r),super.addLeaves(...e)}isValid(){let n=this._iterateChildren();for(let i=0;i<n.length;i++){let s=(t+i)%n.length;if(n[s].isValid())return!0}return!1}tick(n){let i=this._iterateChildren();for(let s=0;s<i.length;s++){let o=(t+s)%i.length,a=i[o];if(n.isValidSafe(a))return t=(o+1)%i.length,a instanceof Un.Branch?n.enterBranch(a):n.runLeaf(a)}return n.idle()}}}function KS(r,...e){return new class extends Un.Branch{constructor(){super(r),super.addLeaves(...e)}isValid(){for(let t of this._iterateChildren())if(t.isValid())return!0;return!1}tick(t){let n=1/0,i=!1;for(let s of this._iterateChildren()){if(!t.isValidSafe(s))continue;i=!0;let o=s instanceof Un.Branch?t.enterBranch(s):t.runLeaf(s);if(o<=Pr.Leaf.STOP)return o;o<n&&(n=o)}return i?n:t.idle()}}}});var rf=k(oe=>{"use strict";Object.defineProperty(oe,"__esModule",{value:!0});oe.parallel=oe.sequence=oe.once=oe.cooldown=oe.always=oe.not=oe.when=oe.branch=oe.leaf=oe.TreeScript=oe.Root=oe.Branch=oe.Leaf=void 0;var YS=Ms();Object.defineProperty(oe,"Leaf",{enumerable:!0,get:function(){return YS.Leaf}});var XS=Gn();Object.defineProperty(oe,"Branch",{enumerable:!0,get:function(){return XS.Branch}});var QS=Ml();Object.defineProperty(oe,"Root",{enumerable:!0,get:function(){return QS.Root}});var ZS=ef();Object.defineProperty(oe,"TreeScript",{enumerable:!0,get:function(){return ZS.TreeScript}});var Gt=tf();Object.defineProperty(oe,"leaf",{enumerable:!0,get:function(){return Gt.leaf}});Object.defineProperty(oe,"branch",{enumerable:!0,get:function(){return Gt.branch}});Object.defineProperty(oe,"when",{enumerable:!0,get:function(){return Gt.when}});Object.defineProperty(oe,"not",{enumerable:!0,get:function(){return Gt.not}});Object.defineProperty(oe,"always",{enumerable:!0,get:function(){return Gt.always}});Object.defineProperty(oe,"cooldown",{enumerable:!0,get:function(){return Gt.cooldown}});Object.defineProperty(oe,"once",{enumerable:!0,get:function(){return Gt.once}});Object.defineProperty(oe,"sequence",{enumerable:!0,get:function(){return Gt.sequence}});Object.defineProperty(oe,"parallel",{enumerable:!0,get:function(){return Gt.parallel}})});var fe=k(C=>{"use strict";var G=globalThis.__realmengineSDK;if(G)C.chat=G.chat,C.party=G.party,C.trade=G.trade,C.events=G.events,C.inventory=G.inventory,C.guild=G.guild,C.GuildRank=G.GuildRank,C.INVENTORY_MAIN_SLOT_COUNT=G.INVENTORY_MAIN_SLOT_COUNT,C.INVENTORY_BACKPACK_SLOT_COUNT=G.INVENTORY_BACKPACK_SLOT_COUNT,C.INVENTORY_TOTAL_SLOT_COUNT=G.INVENTORY_TOTAL_SLOT_COUNT,C.loot=G.loot,C.discord=G.discord,C.DiscordWebhook=G.DiscordWebhook,C.Self=G.Self,C.Walking=G.Walking,C.Combat=G.Combat,C.Players=G.Players,C.Enemies=G.Enemies,C.Inventory=G.Inventory,C.Vault=G.Vault,C.World=G.World,C.Tiles=G.Tiles,C.Objects=G.Objects,C.Projectiles=G.Projectiles,C.Log=G.Log,C.Settings=G.Settings,C.Timing=G.Timing,C.RealmEngine=G.RealmEngine,C.Position=G.Position,C.StatusEffect=G.StatusEffect,C.Panel=G.Panel,C.uiPanel=G.uiPanel,C.TreeScript=G.TreeScript,C.Root=G.Root,C.Branch=G.Branch,C.Leaf=G.Leaf,C.leaf=G.leaf,C.branch=G.branch,C.when=G.when,C.not=G.not,C.always=G.always,C.cooldown=G.cooldown,C.once=G.once,C.sequence=G.sequence,C.parallel=G.parallel;else{let r={};Object.assign(r,Ud()),Object.assign(r,Vd()),Object.assign(r,Jd()),Object.assign(r,Tl()),Object.assign(r,Pl()),Object.assign(r,vl()),Object.assign(r,xl()),Object.assign(r,ol()),Object.assign(r,Cl()),Object.assign(r,kl()),Object.assign(r,Yd()),Object.assign(r,Xa()),Object.assign(r,Za()),Object.assign(r,tl()),Object.assign(r,nl()),Object.assign(r,sl()),Object.assign(r,Xd()),Object.assign(r,ll()),Object.assign(r,ul()),Object.assign(r,fl()),Object.assign(r,ml()),Object.assign(r,gl()),Object.assign(r,Ss()),Object.assign(r,Sl()),Object.assign(r,El()),Object.assign(r,_l()),Object.assign(r,rf()),r.uiPanel=r.panel,C.chat=r.chat,C.party=r.party,C.trade=r.trade,C.events=r.events,C.inventory=r.inventory,C.guild=r.guild,C.GuildRank=r.GuildRank,C.INVENTORY_MAIN_SLOT_COUNT=r.INVENTORY_MAIN_SLOT_COUNT,C.INVENTORY_BACKPACK_SLOT_COUNT=r.INVENTORY_BACKPACK_SLOT_COUNT,C.INVENTORY_TOTAL_SLOT_COUNT=r.INVENTORY_TOTAL_SLOT_COUNT,C.loot=r.loot,C.discord=r.discord,C.DiscordWebhook=r.DiscordWebhook,C.Self=r.Self,C.Walking=r.Walking,C.Combat=r.Combat,C.Players=r.Players,C.Enemies=r.Enemies,C.Inventory=r.Inventory,C.Vault=r.Vault,C.World=r.World,C.Tiles=r.Tiles,C.Objects=r.Objects,C.Projectiles=r.Projectiles,C.Log=r.Log,C.Settings=r.Settings,C.Timing=r.Timing,C.RealmEngine=r.RealmEngine,C.Position=r.Position,C.StatusEffect=r.StatusEffect,C.Panel=r.Panel,C.uiPanel=r.uiPanel,C.TreeScript=r.TreeScript,C.Root=r.Root,C.Branch=r.Branch,C.Leaf=r.Leaf,C.leaf=r.leaf,C.branch=r.branch,C.when=r.when,C.not=r.not,C.always=r.always,C.cooldown=r.cooldown,C.once=r.once,C.sequence=r.sequence,C.parallel=r.parallel}});var oi=k(Et=>{"use strict";var yp=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",hE=yp+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",bp="["+yp+"]["+hE+"]*",gE=new RegExp("^"+bp+"$"),yE=function(r,e){let t=[],n=e.exec(r);for(;n;){let i=[];i.startIndex=e.lastIndex-n[0].length;let s=n.length;for(let o=0;o<s;o++)i.push(n[o]);t.push(i),n=e.exec(r)}return t},bE=function(r){let e=gE.exec(r);return!(e===null||typeof e>"u")};Et.isExist=function(r){return typeof r<"u"};Et.isEmptyObject=function(r){return Object.keys(r).length===0};Et.merge=function(r,e,t){if(e){let n=Object.keys(e),i=n.length;for(let s=0;s<i;s++)t==="strict"?r[n[s]]=[e[n[s]]]:r[n[s]]=e[n[s]]}};Et.getValue=function(r){return Et.isExist(r)?r:""};var SE=["hasOwnProperty","toString","valueOf","__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__"],wE=["__proto__","constructor","prototype"];Et.isName=bE;Et.getAllMatches=yE;Et.nameRegexp=bp;Et.DANGEROUS_PROPERTY_NAMES=SE;Et.criticalProperties=wE});var zl=k(Pp=>{"use strict";var Jl=oi(),EE={allowBooleanAttributes:!1,unpairedTags:[]};Pp.validate=function(r,e){e=Object.assign({},EE,e);let t=[],n=!1,i=!1;r[0]==="\uFEFF"&&(r=r.substr(1));for(let s=0;s<r.length;s++)if(r[s]==="<"&&r[s+1]==="?"){if(s+=2,s=wp(r,s),s.err)return s}else if(r[s]==="<"){let o=s;if(s++,r[s]==="!"){s=Ep(r,s);continue}else{let a=!1;r[s]==="/"&&(a=!0,s++);let l="";for(;s<r.length&&r[s]!==">"&&r[s]!==" "&&r[s]!=="	"&&r[s]!==`
`&&r[s]!=="\r";s++)l+=r[s];if(l=l.trim(),l[l.length-1]==="/"&&(l=l.substring(0,l.length-1),s--),!IE(l)){let d;return l.trim().length===0?d="Invalid space after '<'.":d="Tag '"+l+"' is an invalid name.",Pe("InvalidTag",d,Je(r,s))}let c=vE(r,s);if(c===!1)return Pe("InvalidAttr","Attributes for '"+l+"' have open quote.",Je(r,s));let u=c.value;if(s=c.index,u[u.length-1]==="/"){let d=s-u.length;u=u.substring(0,u.length-1);let p=Tp(u,e);if(p===!0)n=!0;else return Pe(p.err.code,p.err.msg,Je(r,d+p.err.line))}else if(a)if(c.tagClosed){if(u.trim().length>0)return Pe("InvalidTag","Closing tag '"+l+"' can't have attributes or invalid starting.",Je(r,o));if(t.length===0)return Pe("InvalidTag","Closing tag '"+l+"' has not been opened.",Je(r,o));{let d=t.pop();if(l!==d.tagName){let p=Je(r,d.tagStartPos);return Pe("InvalidTag","Expected closing tag '"+d.tagName+"' (opened in line "+p.line+", col "+p.col+") instead of closing tag '"+l+"'.",Je(r,o))}t.length==0&&(i=!0)}}else return Pe("InvalidTag","Closing tag '"+l+"' doesn't have proper closing.",Je(r,s));else{let d=Tp(u,e);if(d!==!0)return Pe(d.err.code,d.err.msg,Je(r,s-u.length+d.err.line));if(i===!0)return Pe("InvalidXml","Multiple possible root nodes found.",Je(r,s));e.unpairedTags.indexOf(l)!==-1||t.push({tagName:l,tagStartPos:o}),n=!0}for(s++;s<r.length;s++)if(r[s]==="<")if(r[s+1]==="!"){s++,s=Ep(r,s);continue}else if(r[s+1]==="?"){if(s=wp(r,++s),s.err)return s}else break;else if(r[s]==="&"){let d=kE(r,s);if(d==-1)return Pe("InvalidChar","char '&' is not expected.",Je(r,s));s=d}else if(i===!0&&!Sp(r[s]))return Pe("InvalidXml","Extra text at the end",Je(r,s));r[s]==="<"&&s--}}else{if(Sp(r[s]))continue;return Pe("InvalidChar","char '"+r[s]+"' is not expected.",Je(r,s))}if(n){if(t.length==1)return Pe("InvalidTag","Unclosed tag '"+t[0].tagName+"'.",Je(r,t[0].tagStartPos));if(t.length>0)return Pe("InvalidXml","Invalid '"+JSON.stringify(t.map(s=>s.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1})}else return Pe("InvalidXml","Start tag expected.",1);return!0};function Sp(r){return r===" "||r==="	"||r===`
`||r==="\r"}function wp(r,e){let t=e;for(;e<r.length;e++)if(r[e]=="?"||r[e]==" "){let n=r.substr(t,e-t);if(e>5&&n==="xml")return Pe("InvalidXml","XML declaration allowed only at the start of the document.",Je(r,e));if(r[e]=="?"&&r[e+1]==">"){e++;break}else continue}return e}function Ep(r,e){if(r.length>e+5&&r[e+1]==="-"&&r[e+2]==="-"){for(e+=3;e<r.length;e++)if(r[e]==="-"&&r[e+1]==="-"&&r[e+2]===">"){e+=2;break}}else if(r.length>e+8&&r[e+1]==="D"&&r[e+2]==="O"&&r[e+3]==="C"&&r[e+4]==="T"&&r[e+5]==="Y"&&r[e+6]==="P"&&r[e+7]==="E"){let t=1;for(e+=8;e<r.length;e++)if(r[e]==="<")t++;else if(r[e]===">"&&(t--,t===0))break}else if(r.length>e+9&&r[e+1]==="["&&r[e+2]==="C"&&r[e+3]==="D"&&r[e+4]==="A"&&r[e+5]==="T"&&r[e+6]==="A"&&r[e+7]==="["){for(e+=8;e<r.length;e++)if(r[e]==="]"&&r[e+1]==="]"&&r[e+2]===">"){e+=2;break}}return e}var TE='"',PE="'";function vE(r,e){let t="",n="",i=!1;for(;e<r.length;e++){if(r[e]===TE||r[e]===PE)n===""?n=r[e]:n!==r[e]||(n="");else if(r[e]===">"&&n===""){i=!0;break}t+=r[e]}return n!==""?!1:{value:t,index:e,tagClosed:i}}var xE=new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`,"g");function Tp(r,e){let t=Jl.getAllMatches(r,xE),n={};for(let i=0;i<t.length;i++){if(t[i][1].length===0)return Pe("InvalidAttr","Attribute '"+t[i][2]+"' has no space in starting.",ai(t[i]));if(t[i][3]!==void 0&&t[i][4]===void 0)return Pe("InvalidAttr","Attribute '"+t[i][2]+"' is without value.",ai(t[i]));if(t[i][3]===void 0&&!e.allowBooleanAttributes)return Pe("InvalidAttr","boolean attribute '"+t[i][2]+"' is not allowed.",ai(t[i]));let s=t[i][2];if(!_E(s))return Pe("InvalidAttr","Attribute '"+s+"' is an invalid name.",ai(t[i]));if(!n.hasOwnProperty(s))n[s]=1;else return Pe("InvalidAttr","Attribute '"+s+"' is repeated.",ai(t[i]))}return!0}function CE(r,e){let t=/\d/;for(r[e]==="x"&&(e++,t=/[\da-fA-F]/);e<r.length;e++){if(r[e]===";")return e;if(!r[e].match(t))break}return-1}function kE(r,e){if(e++,r[e]===";")return-1;if(r[e]==="#")return e++,CE(r,e);let t=0;for(;e<r.length;e++,t++)if(!(r[e].match(/\w/)&&t<20)){if(r[e]===";")break;return-1}return e}function Pe(r,e,t){return{err:{code:r,msg:e,line:t.line||t,col:t.col}}}function _E(r){return Jl.isName(r)}function IE(r){return Jl.isName(r)}function Je(r,e){let t=r.substring(0,e).split(/\r?\n/);return{line:t.length,col:t[t.length-1].length+1}}function ai(r){return r.startIndex+r[1].length}});var _p=k(Kl=>{var{DANGEROUS_PROPERTY_NAMES:vp,criticalProperties:RE}=oi(),xp=r=>vp.includes(r)?"__"+r:r,Cp={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(r,e){return e},attributeValueProcessor:function(r,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(r,e,t){return r},captureMetaData:!1,maxNestedTags:100,strictReservedNames:!0,onDangerousProperty:xp};function NE(r,e){if(typeof r!="string")return;let t=r.toLowerCase();if(vp.some(n=>t===n.toLowerCase()))throw new Error(`[SECURITY] Invalid ${e}: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`);if(RE.some(n=>t===n.toLowerCase()))throw new Error(`[SECURITY] Invalid ${e}: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`)}function kp(r){return typeof r=="boolean"?{enabled:r,maxEntitySize:1e4,maxExpansionDepth:10,maxTotalExpansions:1e3,maxExpandedLength:1e5,allowedTags:null,tagFilter:null}:typeof r=="object"&&r!==null?{enabled:r.enabled!==!1,maxEntitySize:Math.max(1,r.maxEntitySize??1e4),maxExpansionDepth:Math.max(1,r.maxExpansionDepth??1e4),maxTotalExpansions:Math.max(1,r.maxTotalExpansions??1/0),maxExpandedLength:Math.max(1,r.maxExpandedLength??1e5),maxEntityCount:Math.max(1,r.maxEntityCount??1e3),allowedTags:r.allowedTags??null,tagFilter:r.tagFilter??null}:kp(!0)}var AE=function(r){let e=Object.assign({},Cp,r),t=[{value:e.attributeNamePrefix,name:"attributeNamePrefix"},{value:e.attributesGroupName,name:"attributesGroupName"},{value:e.textNodeName,name:"textNodeName"},{value:e.cdataPropName,name:"cdataPropName"},{value:e.commentPropName,name:"commentPropName"}];for(let{value:n,name:i}of t)n&&NE(n,i);return e.onDangerousProperty===null&&(e.onDangerousProperty=xp),e.processEntities=kp(e.processEntities),e};Kl.buildOptions=AE;Kl.defaultOptions=Cp});var Rp=k((AN,Ip)=>{"use strict";var Yl=class{constructor(e){this.tagname=e,this.child=[],this[":@"]={}}add(e,t){e==="__proto__"&&(e="#__proto__"),this.child.push({[e]:t})}addChild(e){e.tagname==="__proto__"&&(e.tagname="#__proto__"),e[":@"]&&Object.keys(e[":@"]).length>0?this.child.push({[e.tagname]:e.child,":@":e[":@"]}):this.child.push({[e.tagname]:e.child})}};Ip.exports=Yl});var Op=k((ON,Ap)=>{var Np=oi(),Xl=class{constructor(e){this.suppressValidationErr=!e,this.options=e||{}}readDocType(e,t){let n=Object.create(null),i=0;if(e[t+3]==="O"&&e[t+4]==="C"&&e[t+5]==="T"&&e[t+6]==="Y"&&e[t+7]==="P"&&e[t+8]==="E"){t=t+9;let s=1,o=!1,a=!1,l="";for(;t<e.length;t++)if(e[t]==="<"&&!a){if(o&&Ir(e,"!ENTITY",t)){t+=7;let c,u;if([c,u,t]=this.readEntityExp(e,t+1,this.suppressValidationErr),u.indexOf("&")===-1){if(this.options.enabled!==!1&&this.options.maxEntityCount!=null&&i>=this.options.maxEntityCount)throw new Error(`Entity count (${i+1}) exceeds maximum allowed (${this.options.maxEntityCount})`);let d=c.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");n[c]={regx:RegExp(`&${d};`,"g"),val:u},i++}}else if(o&&Ir(e,"!ELEMENT",t)){t+=8;let{index:c}=this.readElementExp(e,t+1);t=c}else if(o&&Ir(e,"!ATTLIST",t))t+=8;else if(o&&Ir(e,"!NOTATION",t)){t+=9;let{index:c}=this.readNotationExp(e,t+1,this.suppressValidationErr);t=c}else if(Ir(e,"!--",t))a=!0;else throw new Error("Invalid DOCTYPE");s++,l=""}else if(e[t]===">"){if(a?e[t-1]==="-"&&e[t-2]==="-"&&(a=!1,s--):s--,s===0)break}else e[t]==="["?o=!0:l+=e[t];if(s!==0)throw new Error("Unclosed DOCTYPE")}else throw new Error("Invalid Tag instead of DOCTYPE");return{entities:n,i:t}}readEntityExp(e,t){t=Ye(e,t);let n="";for(;t<e.length&&!/\s/.test(e[t])&&e[t]!=='"'&&e[t]!=="'";)n+=e[t],t++;if(li(n),t=Ye(e,t),!this.suppressValidationErr){if(e.substring(t,t+6).toUpperCase()==="SYSTEM")throw new Error("External entities are not supported");if(e[t]==="%")throw new Error("Parameter entities are not supported")}let i="";if([t,i]=this.readIdentifierVal(e,t,"entity"),this.options.enabled!==!1&&this.options.maxEntitySize!=null&&i.length>this.options.maxEntitySize)throw new Error(`Entity "${n}" size (${i.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`);return t--,[n,i,t]}readNotationExp(e,t){t=Ye(e,t);let n="";for(;t<e.length&&!/\s/.test(e[t]);)n+=e[t],t++;!this.suppressValidationErr&&li(n),t=Ye(e,t);let i=e.substring(t,t+6).toUpperCase();if(!this.suppressValidationErr&&i!=="SYSTEM"&&i!=="PUBLIC")throw new Error(`Expected SYSTEM or PUBLIC, found "${i}"`);t+=i.length,t=Ye(e,t);let s=null,o=null;if(i==="PUBLIC")[t,s]=this.readIdentifierVal(e,t,"publicIdentifier"),t=Ye(e,t),(e[t]==='"'||e[t]==="'")&&([t,o]=this.readIdentifierVal(e,t,"systemIdentifier"));else if(i==="SYSTEM"&&([t,o]=this.readIdentifierVal(e,t,"systemIdentifier"),!this.suppressValidationErr&&!o))throw new Error("Missing mandatory system identifier for SYSTEM notation");return{notationName:n,publicIdentifier:s,systemIdentifier:o,index:--t}}readIdentifierVal(e,t,n){let i="",s=e[t];if(s!=='"'&&s!=="'")throw new Error(`Expected quoted string, found "${s}"`);for(t++;t<e.length&&e[t]!==s;)i+=e[t],t++;if(e[t]!==s)throw new Error(`Unterminated ${n} value`);return t++,[t,i]}readElementExp(e,t){t=Ye(e,t);let n="";for(;t<e.length&&!/\s/.test(e[t]);)n+=e[t],t++;if(!this.suppressValidationErr&&!Np.isName(n))throw new Error(`Invalid element name: "${n}"`);t=Ye(e,t);let i="";if(e[t]==="E"&&Ir(e,"MPTY",t))t+=4;else if(e[t]==="A"&&Ir(e,"NY",t))t+=2;else if(e[t]==="("){for(t++;t<e.length&&e[t]!==")";)i+=e[t],t++;if(e[t]!==")")throw new Error("Unterminated content model")}else if(!this.suppressValidationErr)throw new Error(`Invalid Element Expression, found "${e[t]}"`);return{elementName:n,contentModel:i.trim(),index:t}}readAttlistExp(e,t){t=Ye(e,t);let n="";for(;t<e.length&&!/\s/.test(e[t]);)n+=e[t],t++;li(n),t=Ye(e,t);let i="";for(;t<e.length&&!/\s/.test(e[t]);)i+=e[t],t++;if(!li(i))throw new Error(`Invalid attribute name: "${i}"`);t=Ye(e,t);let s="";if(e.substring(t,t+8).toUpperCase()==="NOTATION"){if(s="NOTATION",t+=8,t=Ye(e,t),e[t]!=="(")throw new Error(`Expected '(', found "${e[t]}"`);t++;let a=[];for(;t<e.length&&e[t]!==")";){let l="";for(;t<e.length&&e[t]!=="|"&&e[t]!==")";)l+=e[t],t++;if(l=l.trim(),!li(l))throw new Error(`Invalid notation name: "${l}"`);a.push(l),e[t]==="|"&&(t++,t=Ye(e,t))}if(e[t]!==")")throw new Error("Unterminated list of notations");t++,s+=" ("+a.join("|")+")"}else{for(;t<e.length&&!/\s/.test(e[t]);)s+=e[t],t++;let a=["CDATA","ID","IDREF","IDREFS","ENTITY","ENTITIES","NMTOKEN","NMTOKENS"];if(!this.suppressValidationErr&&!a.includes(s.toUpperCase()))throw new Error(`Invalid attribute type: "${s}"`)}t=Ye(e,t);let o="";return e.substring(t,t+8).toUpperCase()==="#REQUIRED"?(o="#REQUIRED",t+=8):e.substring(t,t+7).toUpperCase()==="#IMPLIED"?(o="#IMPLIED",t+=7):[t,o]=this.readIdentifierVal(e,t,"ATTLIST"),{elementName:n,attributeName:i,attributeType:s,defaultValue:o,index:t}}},Ye=(r,e)=>{for(;e<r.length&&/\s/.test(r[e]);)e++;return e};function Ir(r,e,t){for(let n=0;n<e.length;n++)if(e[n]!==r[t+n+1])return!1;return!0}function li(r){if(Np.isName(r))return r;throw new Error(`Invalid entity name ${r}`)}Ap.exports=Xl});var Dp=k((MN,Mp)=>{var OE=/^[-+]?0x[a-fA-F0-9]+$/,ME=/^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/,DE={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};function LE(r,e={}){if(e=Object.assign({},DE,e),!r||typeof r!="string")return r;let t=r.trim();if(e.skipLike!==void 0&&e.skipLike.test(t))return r;if(r==="0")return 0;if(e.hex&&OE.test(t))return BE(t,16);if(t.search(/[eE]/)!==-1){let n=t.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);if(n){if(e.leadingZeros)t=(n[1]||"")+n[3];else if(!(n[2]==="0"&&n[3][0]==="."))return r;return e.eNotation?Number(t):r}else return r}else{let n=ME.exec(t);if(n){let i=n[1],s=n[2],o=$E(n[3]);if(!e.leadingZeros&&s.length>0&&i&&t[2]!==".")return r;if(!e.leadingZeros&&s.length>0&&!i&&t[1]!==".")return r;if(e.leadingZeros&&s===r)return 0;{let a=Number(t),l=""+a;return l.search(/[eE]/)!==-1?e.eNotation?a:r:t.indexOf(".")!==-1?l==="0"&&o===""||l===o||i&&l==="-"+o?a:r:s?o===l||i+o===l?a:r:t===l||t===i+l?a:r}}else return r}}function $E(r){return r&&r.indexOf(".")!==-1&&(r=r.replace(/0+$/,""),r==="."?r="0":r[0]==="."?r="0"+r:r[r.length-1]==="."&&(r=r.substr(0,r.length-1))),r}function BE(r,e){if(parseInt)return parseInt(r,e);if(Number.parseInt)return Number.parseInt(r,e);if(window&&window.parseInt)return window.parseInt(r,e);throw new Error("parseInt, Number.parseInt, window.parseInt are not supported")}Mp.exports=LE});var Ql=k((DN,Lp)=>{function jE(r){return typeof r=="function"?r:Array.isArray(r)?e=>{for(let t of r)if(typeof t=="string"&&e===t||t instanceof RegExp&&t.test(e))return!0}:()=>!1}Lp.exports=jE});var jp=k((LN,Bp)=>{"use strict";var bo=oi(),an=Rp(),FE=Op(),HE=Dp(),WE=Ql(),Zl=class{constructor(e){if(this.options=e,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"\xA2"},pound:{regex:/&(pound|#163);/g,val:"\xA3"},yen:{regex:/&(yen|#165);/g,val:"\xA5"},euro:{regex:/&(euro|#8364);/g,val:"\u20AC"},copyright:{regex:/&(copy|#169);/g,val:"\xA9"},reg:{regex:/&(reg|#174);/g,val:"\xAE"},inr:{regex:/&(inr|#8377);/g,val:"\u20B9"},num_dec:{regex:/&#([0-9]{1,7});/g,val:(t,n)=>$p(n,10,"&#")},num_hex:{regex:/&#x([0-9a-fA-F]{1,6});/g,val:(t,n)=>$p(n,16,"&#x")}},this.addExternalEntities=GE,this.parseXml=zE,this.parseTextData=UE,this.resolveNameSpace=VE,this.buildAttributesMap=JE,this.isItStopNode=QE,this.replaceEntitiesValue=YE,this.readStopNodeData=eT,this.saveTextToParentTag=XE,this.addChild=KE,this.ignoreAttributesFn=WE(this.options.ignoreAttributes),this.entityExpansionCount=0,this.currentExpandedLength=0,this.options.stopNodes&&this.options.stopNodes.length>0){this.stopNodesExact=new Set,this.stopNodesWildcard=new Set;for(let t=0;t<this.options.stopNodes.length;t++){let n=this.options.stopNodes[t];typeof n=="string"&&(n.startsWith("*.")?this.stopNodesWildcard.add(n.substring(2)):this.stopNodesExact.add(n))}}}};function GE(r){let e=Object.keys(r);for(let t=0;t<e.length;t++){let n=e[t],i=n.replace(/[.\-+*:]/g,"\\.");this.lastEntities[n]={regex:new RegExp("&"+i+";","g"),val:r[n]}}}function UE(r,e,t,n,i,s,o){if(r!==void 0&&(this.options.trimValues&&!n&&(r=r.trim()),r.length>0)){o||(r=this.replaceEntitiesValue(r,e,t));let a=this.options.tagValueProcessor(e,r,t,i,s);return a==null?r:typeof a!=typeof r||a!==r?a:this.options.trimValues?tc(r,this.options.parseTagValue,this.options.numberParseOptions):r.trim()===r?tc(r,this.options.parseTagValue,this.options.numberParseOptions):r}}function VE(r){if(this.options.removeNSPrefix){let e=r.split(":"),t=r.charAt(0)==="/"?"/":"";if(e[0]==="xmlns")return"";e.length===2&&(r=t+e[1])}return r}var qE=new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`,"gm");function JE(r,e,t){if(this.options.ignoreAttributes!==!0&&typeof r=="string"){let n=bo.getAllMatches(r,qE),i=n.length,s={};for(let o=0;o<i;o++){let a=this.resolveNameSpace(n[o][1]);if(this.ignoreAttributesFn(a,e))continue;let l=n[o][4],c=this.options.attributeNamePrefix+a;if(a.length)if(this.options.transformAttributeName&&(c=this.options.transformAttributeName(c)),c=tT(c,this.options),l!==void 0){this.options.trimValues&&(l=l.trim()),l=this.replaceEntitiesValue(l,t,e);let u=this.options.attributeValueProcessor(a,l,e);u==null?s[c]=l:typeof u!=typeof l||u!==l?s[c]=u:s[c]=tc(l,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(s[c]=!0)}if(!Object.keys(s).length)return;if(this.options.attributesGroupName){let o={};return o[this.options.attributesGroupName]=s,o}return s}}var zE=function(r){r=r.replace(/\r\n?/g,`
`);let e=new an("!xml"),t=e,n="",i="";this.entityExpansionCount=0,this.currentExpandedLength=0;let s=new FE(this.options.processEntities);for(let o=0;o<r.length;o++)if(r[o]==="<")if(r[o+1]==="/"){let l=Rr(r,">",o,"Closing Tag is not closed."),c=r.substring(o+2,l).trim();if(this.options.removeNSPrefix){let p=c.indexOf(":");p!==-1&&(c=c.substr(p+1))}this.options.transformTagName&&(c=this.options.transformTagName(c)),t&&(n=this.saveTextToParentTag(n,t,i));let u=i.substring(i.lastIndexOf(".")+1);if(c&&this.options.unpairedTags.indexOf(c)!==-1)throw new Error(`Unpaired tag can not be used as closing tag: </${c}>`);let d=0;u&&this.options.unpairedTags.indexOf(u)!==-1?(d=i.lastIndexOf(".",i.lastIndexOf(".")-1),this.tagsNodeStack.pop()):d=i.lastIndexOf("."),i=i.substring(0,d),t=this.tagsNodeStack.pop(),n="",o=l}else if(r[o+1]==="?"){let l=ec(r,o,!1,"?>");if(!l)throw new Error("Pi Tag is not closed.");if(n=this.saveTextToParentTag(n,t,i),!(this.options.ignoreDeclaration&&l.tagName==="?xml"||this.options.ignorePiTags)){let c=new an(l.tagName);c.add(this.options.textNodeName,""),l.tagName!==l.tagExp&&l.attrExpPresent&&(c[":@"]=this.buildAttributesMap(l.tagExp,i,l.tagName)),this.addChild(t,c,i,o)}o=l.closeIndex+1}else if(r.substr(o+1,3)==="!--"){let l=Rr(r,"-->",o+4,"Comment is not closed.");if(this.options.commentPropName){let c=r.substring(o+4,l-2);n=this.saveTextToParentTag(n,t,i),t.add(this.options.commentPropName,[{[this.options.textNodeName]:c}])}o=l}else if(r.substr(o+1,2)==="!D"){let l=s.readDocType(r,o);this.docTypeEntities=l.entities,o=l.i}else if(r.substr(o+1,2)==="!["){let l=Rr(r,"]]>",o,"CDATA is not closed.")-2,c=r.substring(o+9,l);n=this.saveTextToParentTag(n,t,i);let u=this.parseTextData(c,t.tagname,i,!0,!1,!0,!0);u==null&&(u=""),this.options.cdataPropName?t.add(this.options.cdataPropName,[{[this.options.textNodeName]:c}]):t.add(this.options.textNodeName,u),o=l+2}else{let l=ec(r,o,this.options.removeNSPrefix),c=l.tagName,u=l.rawTagName,d=l.tagExp,p=l.attrExpPresent,f=l.closeIndex;if(this.options.transformTagName){let y=this.options.transformTagName(c);d===c&&(d=y),c=y}if(this.options.strictReservedNames&&(c===this.options.commentPropName||c===this.options.cdataPropName||c===this.options.textNodeName||c===this.options.attributesGroupName))throw new Error(`Invalid tag name: ${c}`);t&&n&&t.tagname!=="!xml"&&(n=this.saveTextToParentTag(n,t,i,!1));let h=t;h&&this.options.unpairedTags.indexOf(h.tagname)!==-1&&(t=this.tagsNodeStack.pop(),i=i.substring(0,i.lastIndexOf("."))),c!==e.tagname&&(i+=i?"."+c:c);let g=o;if(this.isItStopNode(this.stopNodesExact,this.stopNodesWildcard,i,c)){let y="";if(d.length>0&&d.lastIndexOf("/")===d.length-1)c[c.length-1]==="/"?(c=c.substr(0,c.length-1),i=i.substr(0,i.length-1),d=c):d=d.substr(0,d.length-1),o=l.closeIndex;else if(this.options.unpairedTags.indexOf(c)!==-1)o=l.closeIndex;else{let S=this.readStopNodeData(r,u,f+1);if(!S)throw new Error(`Unexpected end of ${u}`);o=S.i,y=S.tagContent}let b=new an(c);c!==d&&p&&(b[":@"]=this.buildAttributesMap(d,i,c)),y&&(y=this.parseTextData(y,c,i,!0,p,!0,!0)),i=i.substr(0,i.lastIndexOf(".")),b.add(this.options.textNodeName,y),this.addChild(t,b,i,g)}else{if(d.length>0&&d.lastIndexOf("/")===d.length-1){if(c[c.length-1]==="/"?(c=c.substr(0,c.length-1),i=i.substr(0,i.length-1),d=c):d=d.substr(0,d.length-1),this.options.transformTagName){let b=this.options.transformTagName(c);d===c&&(d=b),c=b}let y=new an(c);c!==d&&p&&(y[":@"]=this.buildAttributesMap(d,i,c)),this.addChild(t,y,i,g),i=i.substr(0,i.lastIndexOf("."))}else if(this.options.unpairedTags.indexOf(c)!==-1){let y=new an(c);c!==d&&p&&(y[":@"]=this.buildAttributesMap(d,i)),this.addChild(t,y,i,g),i=i.substr(0,i.lastIndexOf(".")),o=l.closeIndex;continue}else{let y=new an(c);if(this.tagsNodeStack.length>this.options.maxNestedTags)throw new Error("Maximum nested tags exceeded");this.tagsNodeStack.push(t),c!==d&&p&&(y[":@"]=this.buildAttributesMap(d,i,c)),this.addChild(t,y,i),t=y}n="",o=f}}else n+=r[o];return e.child};function KE(r,e,t,n){this.options.captureMetaData||(n=void 0);let i=this.options.updateTag(e.tagname,t,e[":@"]);i===!1||(typeof i=="string"&&(e.tagname=i),r.addChild(e,n))}var YE=function(r,e,t){if(r.indexOf("&")===-1)return r;let n=this.options.processEntities;if(!n.enabled||n.allowedTags&&!n.allowedTags.includes(e)||n.tagFilter&&!n.tagFilter(e,t))return r;for(let i in this.docTypeEntities){let s=this.docTypeEntities[i],o=r.match(s.regx);if(o){if(this.entityExpansionCount+=o.length,n.maxTotalExpansions&&this.entityExpansionCount>n.maxTotalExpansions)throw new Error(`Entity expansion limit exceeded: ${this.entityExpansionCount} > ${n.maxTotalExpansions}`);let a=r.length;if(r=r.replace(s.regx,s.val),n.maxExpandedLength&&(this.currentExpandedLength+=r.length-a,this.currentExpandedLength>n.maxExpandedLength))throw new Error(`Total expanded content size exceeded: ${this.currentExpandedLength} > ${n.maxExpandedLength}`)}}if(r.indexOf("&")===-1)return r;for(let i of Object.keys(this.lastEntities)){let s=this.lastEntities[i],o=r.match(s.regex);if(o&&(this.entityExpansionCount+=o.length,n.maxTotalExpansions&&this.entityExpansionCount>n.maxTotalExpansions))throw new Error(`Entity expansion limit exceeded: ${this.entityExpansionCount} > ${n.maxTotalExpansions}`);r=r.replace(s.regex,s.val)}if(r.indexOf("&")===-1)return r;if(this.options.htmlEntities)for(let i of Object.keys(this.htmlEntities)){let s=this.htmlEntities[i],o=r.match(s.regex);if(o&&(this.entityExpansionCount+=o.length,n.maxTotalExpansions&&this.entityExpansionCount>n.maxTotalExpansions))throw new Error(`Entity expansion limit exceeded: ${this.entityExpansionCount} > ${n.maxTotalExpansions}`);r=r.replace(s.regex,s.val)}return r=r.replace(this.ampEntity.regex,this.ampEntity.val),r};function XE(r,e,t,n){return r&&(n===void 0&&(n=e.child.length===0),r=this.parseTextData(r,e.tagname,t,!1,e[":@"]?Object.keys(e[":@"]).length!==0:!1,n),r!==void 0&&r!==""&&e.add(this.options.textNodeName,r),r=""),r}function QE(r,e,t,n){return!!(e&&e.has(n)||r&&r.has(t))}function ZE(r,e,t=">"){let n,i="";for(let s=e;s<r.length;s++){let o=r[s];if(n)o===n&&(n="");else if(o==='"'||o==="'")n=o;else if(o===t[0])if(t[1]){if(r[s+1]===t[1])return{data:i,index:s}}else return{data:i,index:s};else o==="	"&&(o=" ");i+=o}}function Rr(r,e,t,n){let i=r.indexOf(e,t);if(i===-1)throw new Error(n);return i+e.length-1}function ec(r,e,t,n=">"){let i=ZE(r,e+1,n);if(!i)return;let s=i.data,o=i.index,a=s.search(/\s/),l=s,c=!0;a!==-1&&(l=s.substring(0,a),s=s.substring(a+1).trimStart());let u=l;if(t){let d=l.indexOf(":");d!==-1&&(l=l.substr(d+1),c=l!==i.data.substr(d+1))}return{tagName:l,tagExp:s,closeIndex:o,attrExpPresent:c,rawTagName:u}}function eT(r,e,t){let n=t,i=1;for(;t<r.length;t++)if(r[t]==="<")if(r[t+1]==="/"){let s=Rr(r,">",t,`${e} is not closed`);if(r.substring(t+2,s).trim()===e&&(i--,i===0))return{tagContent:r.substring(n,t),i:s};t=s}else if(r[t+1]==="?")t=Rr(r,"?>",t+1,"StopNode is not closed.");else if(r.substr(t+1,3)==="!--")t=Rr(r,"-->",t+3,"StopNode is not closed.");else if(r.substr(t+1,2)==="![")t=Rr(r,"]]>",t,"StopNode is not closed.")-2;else{let s=ec(r,t,">");s&&((s&&s.tagName)===e&&s.tagExp[s.tagExp.length-1]!=="/"&&i++,t=s.closeIndex)}}function tc(r,e,t){if(e&&typeof r=="string"){let n=r.trim();return n==="true"?!0:n==="false"?!1:HE(r,t)}else return bo.isExist(r)?r:""}function $p(r,e,t){let n=Number.parseInt(r,e);return n>=0&&n<=1114111?String.fromCodePoint(n):t+r+";"}function tT(r,e){if(bo.criticalProperties.includes(r))throw new Error(`[SECURITY] Invalid name: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`);return bo.DANGEROUS_PROPERTY_NAMES.includes(r)?e.onDangerousProperty(r):r}Bp.exports=Zl});var Wp=k(Hp=>{"use strict";function rT(r,e){return Fp(r,e)}function Fp(r,e,t){let n,i={};for(let s=0;s<r.length;s++){let o=r[s],a=nT(o),l="";if(t===void 0?l=a:l=t+"."+a,a===e.textNodeName)n===void 0?n=o[a]:n+=""+o[a];else{if(a===void 0)continue;if(o[a]){let c=Fp(o[a],e,l),u=sT(c,e);o[":@"]?iT(c,o[":@"],l,e):Object.keys(c).length===1&&c[e.textNodeName]!==void 0&&!e.alwaysCreateTextNode?c=c[e.textNodeName]:Object.keys(c).length===0&&(e.alwaysCreateTextNode?c[e.textNodeName]="":c=""),i[a]!==void 0&&i.hasOwnProperty(a)?(Array.isArray(i[a])||(i[a]=[i[a]]),i[a].push(c)):e.isArray(a,l,u)?i[a]=[c]:i[a]=c}}}return typeof n=="string"?n.length>0&&(i[e.textNodeName]=n):n!==void 0&&(i[e.textNodeName]=n),i}function nT(r){let e=Object.keys(r);for(let t=0;t<e.length;t++){let n=e[t];if(n!==":@")return n}}function iT(r,e,t,n){if(e){let i=Object.keys(e),s=i.length;for(let o=0;o<s;o++){let a=i[o];n.isArray(a,t+"."+a,!0,!0)?r[a]=[e[a]]:r[a]=e[a]}}}function sT(r,e){let{textNodeName:t}=e,n=Object.keys(r).length;return!!(n===0||n===1&&(r[t]||typeof r[t]=="boolean"||r[t]===0))}Hp.prettify=rT});var Up=k((BN,Gp)=>{var{buildOptions:oT}=_p(),aT=jp(),{prettify:lT}=Wp(),cT=zl(),rc=class{constructor(e){this.externalEntities={},this.options=oT(e)}parse(e,t){if(typeof e!="string")if(e.toString)e=e.toString();else throw new Error("XML data is accepted in String or Bytes[] form.");if(t){t===!0&&(t={});let s=cT.validate(e,t);if(s!==!0)throw Error(`${s.err.msg}:${s.err.line}:${s.err.col}`)}let n=new aT(this.options);n.addExternalEntities(this.externalEntities);let i=n.parseXml(e);return this.options.preserveOrder||i===void 0?i:lT(i,this.options)}addEntity(e,t){if(t.indexOf("&")!==-1)throw new Error("Entity value can't have '&'");if(e.indexOf("&")!==-1||e.indexOf(";")!==-1)throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if(t==="&")throw new Error("An entity with value '&' is not permitted");this.externalEntities[e]=t}};Gp.exports=rc});var zp=k((jN,Jp)=>{function uT(r,e){let t="";return e.format&&e.indentBy.length>0&&(t=`
`),qp(r,e,"",t)}function qp(r,e,t,n){let i="",s=!1;if(!Array.isArray(r)){if(r!=null){let o=r.toString();return o=nc(o,e),o}return""}for(let o=0;o<r.length;o++){let a=r[o],l=dT(a);if(l===void 0)continue;let c="";if(t.length===0?c=l:c=`${t}.${l}`,l===e.textNodeName){let h=a[l];fT(c,e)||(h=e.tagValueProcessor(l,h),h=nc(h,e)),s&&(i+=n),i+=h,s=!1;continue}else if(l===e.cdataPropName){s&&(i+=n),i+=`<![CDATA[${a[l][0][e.textNodeName]}]]>`,s=!1;continue}else if(l===e.commentPropName){i+=n+`<!--${a[l][0][e.textNodeName]}-->`,s=!0;continue}else if(l[0]==="?"){let h=Vp(a[":@"],e),g=l==="?xml"?"":n,y=a[l][0][e.textNodeName];y=y.length!==0?" "+y:"",i+=g+`<${l}${y}${h}?>`,s=!0;continue}let u=n;u!==""&&(u+=e.indentBy);let d=Vp(a[":@"],e),p=n+`<${l}${d}`,f=qp(a[l],e,c,u);e.unpairedTags.indexOf(l)!==-1?e.suppressUnpairedNode?i+=p+">":i+=p+"/>":(!f||f.length===0)&&e.suppressEmptyNode?i+=p+"/>":f&&f.endsWith(">")?i+=p+`>${f}${n}</${l}>`:(i+=p+">",f&&n!==""&&(f.includes("/>")||f.includes("</"))?i+=n+e.indentBy+f+n:i+=f,i+=`</${l}>`),s=!0}return i}function dT(r){let e=Object.keys(r);for(let t=0;t<e.length;t++){let n=e[t];if(Object.prototype.hasOwnProperty.call(r,n)&&n!==":@")return n}}function Vp(r,e){let t="";if(r&&!e.ignoreAttributes)for(let n in r){if(!Object.prototype.hasOwnProperty.call(r,n))continue;let i=e.attributeValueProcessor(n,r[n]);i=nc(i,e),i===!0&&e.suppressBooleanAttributes?t+=` ${n.substr(e.attributeNamePrefix.length)}`:t+=` ${n.substr(e.attributeNamePrefix.length)}="${i}"`}return t}function fT(r,e){r=r.substr(0,r.length-e.textNodeName.length-1);let t=r.substr(r.lastIndexOf(".")+1);for(let n in e.stopNodes)if(e.stopNodes[n]===r||e.stopNodes[n]==="*."+t)return!0;return!1}function nc(r,e){if(r&&r.length>0&&e.processEntities)for(let t=0;t<e.entities.length;t++){let n=e.entities[t];r=r.replace(n.regex,n.val)}return r}Jp.exports=uT});var Yp=k((FN,Kp)=>{"use strict";var pT=zp(),mT=Ql(),hT={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(r,e){return e},attributeValueProcessor:function(r,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function pr(r){this.options=Object.assign({},hT,r),this.options.ignoreAttributes===!0||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.ignoreAttributesFn=mT(this.options.ignoreAttributes),this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=bT),this.processTextOrObjNode=gT,this.options.format?(this.indentate=yT,this.tagEndChar=`>
`,this.newLine=`
`):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}pr.prototype.build=function(r){return this.options.preserveOrder?pT(r,this.options):(Array.isArray(r)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(r={[this.options.arrayNodeName]:r}),this.j2x(r,0,[]).val)};pr.prototype.j2x=function(r,e,t){let n="",i="",s=t.join(".");for(let o in r)if(Object.prototype.hasOwnProperty.call(r,o))if(typeof r[o]>"u")this.isAttribute(o)&&(i+="");else if(r[o]===null)this.isAttribute(o)||o===this.options.cdataPropName?i+="":o[0]==="?"?i+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:i+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if(r[o]instanceof Date)i+=this.buildTextValNode(r[o],o,"",e);else if(typeof r[o]!="object"){let a=this.isAttribute(o);if(a&&!this.ignoreAttributesFn(a,s))n+=this.buildAttrPairStr(a,""+r[o]);else if(!a)if(o===this.options.textNodeName){let l=this.options.tagValueProcessor(o,""+r[o]);i+=this.replaceEntitiesValue(l)}else i+=this.buildTextValNode(r[o],o,"",e)}else if(Array.isArray(r[o])){let a=r[o].length,l="",c="";for(let u=0;u<a;u++){let d=r[o][u];if(!(typeof d>"u"))if(d===null)o[0]==="?"?i+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:i+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if(typeof d=="object")if(this.options.oneListGroup){let p=this.j2x(d,e+1,t.concat(o));l+=p.val,this.options.attributesGroupName&&d.hasOwnProperty(this.options.attributesGroupName)&&(c+=p.attrStr)}else l+=this.processTextOrObjNode(d,o,e,t);else if(this.options.oneListGroup){let p=this.options.tagValueProcessor(o,d);p=this.replaceEntitiesValue(p),l+=p}else l+=this.buildTextValNode(d,o,"",e)}this.options.oneListGroup&&(l=this.buildObjectNode(l,o,c,e)),i+=l}else if(this.options.attributesGroupName&&o===this.options.attributesGroupName){let a=Object.keys(r[o]),l=a.length;for(let c=0;c<l;c++)n+=this.buildAttrPairStr(a[c],""+r[o][a[c]])}else i+=this.processTextOrObjNode(r[o],o,e,t);return{attrStr:n,val:i}};pr.prototype.buildAttrPairStr=function(r,e){return e=this.options.attributeValueProcessor(r,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&e==="true"?" "+r:" "+r+'="'+e+'"'};function gT(r,e,t,n){let i=this.j2x(r,t+1,n.concat(e));return r[this.options.textNodeName]!==void 0&&Object.keys(r).length===1?this.buildTextValNode(r[this.options.textNodeName],e,i.attrStr,t):this.buildObjectNode(i.val,e,i.attrStr,t)}pr.prototype.buildObjectNode=function(r,e,t,n){if(r==="")return e[0]==="?"?this.indentate(n)+"<"+e+t+"?"+this.tagEndChar:this.indentate(n)+"<"+e+t+this.closeTag(e)+this.tagEndChar;{let i="</"+e+this.tagEndChar,s="";return e[0]==="?"&&(s="?",i=""),(t||t==="")&&r.indexOf("<")===-1?this.indentate(n)+"<"+e+t+s+">"+r+i:this.options.commentPropName!==!1&&e===this.options.commentPropName&&s.length===0?this.indentate(n)+`<!--${r}-->`+this.newLine:this.indentate(n)+"<"+e+t+s+this.tagEndChar+r+this.indentate(n)+i}};pr.prototype.closeTag=function(r){let e="";return this.options.unpairedTags.indexOf(r)!==-1?this.options.suppressUnpairedNode||(e="/"):this.options.suppressEmptyNode?e="/":e=`></${r}`,e};pr.prototype.buildTextValNode=function(r,e,t,n){if(this.options.cdataPropName!==!1&&e===this.options.cdataPropName)return this.indentate(n)+`<![CDATA[${r}]]>`+this.newLine;if(this.options.commentPropName!==!1&&e===this.options.commentPropName)return this.indentate(n)+`<!--${r}-->`+this.newLine;if(e[0]==="?")return this.indentate(n)+"<"+e+t+"?"+this.tagEndChar;{let i=this.options.tagValueProcessor(e,r);return i=this.replaceEntitiesValue(i),i===""?this.indentate(n)+"<"+e+t+this.closeTag(e)+this.tagEndChar:this.indentate(n)+"<"+e+t+">"+i+"</"+e+this.tagEndChar}};pr.prototype.replaceEntitiesValue=function(r){if(r&&r.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){let t=this.options.entities[e];r=r.replace(t.regex,t.val)}return r};function yT(r){return this.options.indentBy.repeat(r)}function bT(r){return r.startsWith(this.options.attributeNamePrefix)&&r!==this.options.textNodeName?r.substr(this.attrPrefixLen):!1}Kp.exports=pr});var ln=k((HN,Xp)=>{"use strict";var ST=zl(),wT=Up(),ET=Yp();Xp.exports={XMLParser:wT,XMLValidator:ST,XMLBuilder:ET}});var ui=k((zN,im)=>{"use strict";var _T=require("path"),Lt="\\\\/",em=`[^${Lt}]`,IT=0,Jt="\\.",RT="\\+",NT="\\?",wo="\\/",AT="(?=.)",tm="[^/]",oc=`(?:${wo}|$)`,rm=`(?:^|${wo})`,ac=`${Jt}{1,2}${oc}`,OT=`(?!${Jt})`,MT=`(?!${rm}${ac})`,DT=`(?!${Jt}{0,1}${oc})`,LT=`(?!${ac})`,$T=`[^.${wo}]`,BT=`${tm}*?`,nm={DOT_LITERAL:Jt,PLUS_LITERAL:RT,QMARK_LITERAL:NT,SLASH_LITERAL:wo,ONE_CHAR:AT,QMARK:tm,END_ANCHOR:oc,DOTS_SLASH:ac,NO_DOT:OT,NO_DOTS:MT,NO_DOT_SLASH:DT,NO_DOTS_SLASH:LT,QMARK_NO_DOT:$T,STAR:BT,START_ANCHOR:rm},jT={...nm,SLASH_LITERAL:`[${Lt}]`,QMARK:em,STAR:`${em}*?`,DOTS_SLASH:`${Jt}{1,2}(?:[${Lt}]|$)`,NO_DOT:`(?!${Jt})`,NO_DOTS:`(?!(?:^|[${Lt}])${Jt}{1,2}(?:[${Lt}]|$))`,NO_DOT_SLASH:`(?!${Jt}{0,1}(?:[${Lt}]|$))`,NO_DOTS_SLASH:`(?!${Jt}{1,2}(?:[${Lt}]|$))`,QMARK_NO_DOT:`[^.${Lt}]`,START_ANCHOR:`(?:^|[${Lt}])`,END_ANCHOR:`(?:[${Lt}]|$)`},FT={__proto__:null,alnum:"a-zA-Z0-9",alpha:"a-zA-Z",ascii:"\\x00-\\x7F",blank:" \\t",cntrl:"\\x00-\\x1F\\x7F",digit:"0-9",graph:"\\x21-\\x7E",lower:"a-z",print:"\\x20-\\x7E ",punct:"\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",space:" \\t\\r\\n\\v\\f",upper:"A-Z",word:"A-Za-z0-9_",xdigit:"A-Fa-f0-9"};im.exports={DEFAULT_MAX_EXTGLOB_RECURSION:IT,MAX_LENGTH:1024*64,POSIX_REGEX_SOURCE:FT,REGEX_BACKSLASH:/\\(?![*+?^${}(|)[\]])/g,REGEX_NON_SPECIAL_CHARS:/^[^@![\].,$*+?^{}()|\\/]+/,REGEX_SPECIAL_CHARS:/[-*+?.^${}(|)[\]]/,REGEX_SPECIAL_CHARS_BACKREF:/(\\?)((\W)(\3*))/g,REGEX_SPECIAL_CHARS_GLOBAL:/([-*+?.^${}(|)[\]])/g,REGEX_REMOVE_BACKSLASH:/(?:\[.*?[^\\]\]|\\(?=.))/g,REPLACEMENTS:{__proto__:null,"***":"*","**/**":"**","**/**/**":"**"},CHAR_0:48,CHAR_9:57,CHAR_UPPERCASE_A:65,CHAR_LOWERCASE_A:97,CHAR_UPPERCASE_Z:90,CHAR_LOWERCASE_Z:122,CHAR_LEFT_PARENTHESES:40,CHAR_RIGHT_PARENTHESES:41,CHAR_ASTERISK:42,CHAR_AMPERSAND:38,CHAR_AT:64,CHAR_BACKWARD_SLASH:92,CHAR_CARRIAGE_RETURN:13,CHAR_CIRCUMFLEX_ACCENT:94,CHAR_COLON:58,CHAR_COMMA:44,CHAR_DOT:46,CHAR_DOUBLE_QUOTE:34,CHAR_EQUAL:61,CHAR_EXCLAMATION_MARK:33,CHAR_FORM_FEED:12,CHAR_FORWARD_SLASH:47,CHAR_GRAVE_ACCENT:96,CHAR_HASH:35,CHAR_HYPHEN_MINUS:45,CHAR_LEFT_ANGLE_BRACKET:60,CHAR_LEFT_CURLY_BRACE:123,CHAR_LEFT_SQUARE_BRACKET:91,CHAR_LINE_FEED:10,CHAR_NO_BREAK_SPACE:160,CHAR_PERCENT:37,CHAR_PLUS:43,CHAR_QUESTION_MARK:63,CHAR_RIGHT_ANGLE_BRACKET:62,CHAR_RIGHT_CURLY_BRACE:125,CHAR_RIGHT_SQUARE_BRACKET:93,CHAR_SEMICOLON:59,CHAR_SINGLE_QUOTE:39,CHAR_SPACE:32,CHAR_TAB:9,CHAR_UNDERSCORE:95,CHAR_VERTICAL_LINE:124,CHAR_ZERO_WIDTH_NOBREAK_SPACE:65279,SEP:_T.sep,extglobChars(r){return{"!":{type:"negate",open:"(?:(?!(?:",close:`))${r.STAR})`},"?":{type:"qmark",open:"(?:",close:")?"},"+":{type:"plus",open:"(?:",close:")+"},"*":{type:"star",open:"(?:",close:")*"},"@":{type:"at",open:"(?:",close:")"}}},globChars(r){return r===!0?jT:nm}}});var Eo=k(Xe=>{"use strict";var HT=require("path"),WT=process.platform==="win32",{REGEX_BACKSLASH:GT,REGEX_REMOVE_BACKSLASH:UT,REGEX_SPECIAL_CHARS:VT,REGEX_SPECIAL_CHARS_GLOBAL:qT}=ui();Xe.isObject=r=>r!==null&&typeof r=="object"&&!Array.isArray(r);Xe.hasRegexChars=r=>VT.test(r);Xe.isRegexChar=r=>r.length===1&&Xe.hasRegexChars(r);Xe.escapeRegex=r=>r.replace(qT,"\\$1");Xe.toPosixSlashes=r=>r.replace(GT,"/");Xe.removeBackslashes=r=>r.replace(UT,e=>e==="\\"?"":e);Xe.supportsLookbehinds=()=>{let r=process.version.slice(1).split(".").map(Number);return r.length===3&&r[0]>=9||r[0]===8&&r[1]>=10};Xe.isWindows=r=>r&&typeof r.windows=="boolean"?r.windows:WT===!0||HT.sep==="\\";Xe.escapeLast=(r,e,t)=>{let n=r.lastIndexOf(e,t);return n===-1?r:r[n-1]==="\\"?Xe.escapeLast(r,e,n-1):`${r.slice(0,n)}\\${r.slice(n)}`};Xe.removePrefix=(r,e={})=>{let t=r;return t.startsWith("./")&&(t=t.slice(2),e.prefix="./"),t};Xe.wrapOutput=(r,e={},t={})=>{let n=t.contains?"":"^",i=t.contains?"":"$",s=`${n}(?:${r})${i}`;return e.negated===!0&&(s=`(?:^(?!${s}).*$)`),s}});var fm=k((YN,dm)=>{"use strict";var sm=Eo(),{CHAR_ASTERISK:lc,CHAR_AT:JT,CHAR_BACKWARD_SLASH:di,CHAR_COMMA:zT,CHAR_DOT:cc,CHAR_EXCLAMATION_MARK:uc,CHAR_FORWARD_SLASH:um,CHAR_LEFT_CURLY_BRACE:dc,CHAR_LEFT_PARENTHESES:fc,CHAR_LEFT_SQUARE_BRACKET:KT,CHAR_PLUS:YT,CHAR_QUESTION_MARK:om,CHAR_RIGHT_CURLY_BRACE:XT,CHAR_RIGHT_PARENTHESES:am,CHAR_RIGHT_SQUARE_BRACKET:QT}=ui(),lm=r=>r===um||r===di,cm=r=>{r.isPrefix!==!0&&(r.depth=r.isGlobstar?1/0:1)},ZT=(r,e)=>{let t=e||{},n=r.length-1,i=t.parts===!0||t.scanToEnd===!0,s=[],o=[],a=[],l=r,c=-1,u=0,d=0,p=!1,f=!1,h=!1,g=!1,y=!1,b=!1,S=!1,E=!1,I=!1,O=!1,H=0,W,M,A={value:"",depth:0,isGlob:!1},$=()=>c>=n,w=()=>l.charCodeAt(c+1),re=()=>(W=M,l.charCodeAt(++c));for(;c<n;){M=re();let Oe;if(M===di){S=A.backslashes=!0,M=re(),M===dc&&(b=!0);continue}if(b===!0||M===dc){for(H++;$()!==!0&&(M=re());){if(M===di){S=A.backslashes=!0,re();continue}if(M===dc){H++;continue}if(b!==!0&&M===cc&&(M=re())===cc){if(p=A.isBrace=!0,h=A.isGlob=!0,O=!0,i===!0)continue;break}if(b!==!0&&M===zT){if(p=A.isBrace=!0,h=A.isGlob=!0,O=!0,i===!0)continue;break}if(M===XT&&(H--,H===0)){b=!1,p=A.isBrace=!0,O=!0;break}}if(i===!0)continue;break}if(M===um){if(s.push(c),o.push(A),A={value:"",depth:0,isGlob:!1},O===!0)continue;if(W===cc&&c===u+1){u+=2;continue}d=c+1;continue}if(t.noext!==!0&&(M===YT||M===JT||M===lc||M===om||M===uc)===!0&&w()===fc){if(h=A.isGlob=!0,g=A.isExtglob=!0,O=!0,M===uc&&c===u&&(I=!0),i===!0){for(;$()!==!0&&(M=re());){if(M===di){S=A.backslashes=!0,M=re();continue}if(M===am){h=A.isGlob=!0,O=!0;break}}continue}break}if(M===lc){if(W===lc&&(y=A.isGlobstar=!0),h=A.isGlob=!0,O=!0,i===!0)continue;break}if(M===om){if(h=A.isGlob=!0,O=!0,i===!0)continue;break}if(M===KT){for(;$()!==!0&&(Oe=re());){if(Oe===di){S=A.backslashes=!0,re();continue}if(Oe===QT){f=A.isBracket=!0,h=A.isGlob=!0,O=!0;break}}if(i===!0)continue;break}if(t.nonegate!==!0&&M===uc&&c===u){E=A.negated=!0,u++;continue}if(t.noparen!==!0&&M===fc){if(h=A.isGlob=!0,i===!0){for(;$()!==!0&&(M=re());){if(M===fc){S=A.backslashes=!0,M=re();continue}if(M===am){O=!0;break}}continue}break}if(h===!0){if(O=!0,i===!0)continue;break}}t.noext===!0&&(g=!1,h=!1);let q=l,Ge="",T="";u>0&&(Ge=l.slice(0,u),l=l.slice(u),d-=u),q&&h===!0&&d>0?(q=l.slice(0,d),T=l.slice(d)):h===!0?(q="",T=l):q=l,q&&q!==""&&q!=="/"&&q!==l&&lm(q.charCodeAt(q.length-1))&&(q=q.slice(0,-1)),t.unescape===!0&&(T&&(T=sm.removeBackslashes(T)),q&&S===!0&&(q=sm.removeBackslashes(q)));let P={prefix:Ge,input:r,start:u,base:q,glob:T,isBrace:p,isBracket:f,isGlob:h,isExtglob:g,isGlobstar:y,negated:E,negatedExtglob:I};if(t.tokens===!0&&(P.maxDepth=0,lm(M)||o.push(A),P.tokens=o),t.parts===!0||t.tokens===!0){let Oe;for(let D=0;D<s.length;D++){let F=Oe?Oe+1:u,ne=s[D],ge=r.slice(F,ne);t.tokens&&(D===0&&u!==0?(o[D].isPrefix=!0,o[D].value=Ge):o[D].value=ge,cm(o[D]),P.maxDepth+=o[D].depth),(D!==0||ge!=="")&&a.push(ge),Oe=ne}if(Oe&&Oe+1<r.length){let D=r.slice(Oe+1);a.push(D),t.tokens&&(o[o.length-1].value=D,cm(o[o.length-1]),P.maxDepth+=o[o.length-1].depth)}P.slashes=s,P.parts=a}return P};dm.exports=ZT});var ym=k((XN,gm)=>{"use strict";var fi=ui(),We=Eo(),{MAX_LENGTH:To,POSIX_REGEX_SOURCE:eP,REGEX_NON_SPECIAL_CHARS:tP,REGEX_SPECIAL_CHARS_BACKREF:rP,REPLACEMENTS:pm}=fi,nP=(r,e)=>{if(typeof e.expandRange=="function")return e.expandRange(...r,e);r.sort();let t=`[${r.join("-")}]`;try{new RegExp(t)}catch{return r.map(i=>We.escapeRegex(i)).join("..")}return t},cn=(r,e)=>`Missing ${r}: "${e}" - use "\\\\${e}" to match literal characters`,mm=r=>{let e=[],t=0,n=0,i=0,s="",o=!1;for(let a of r){if(o===!0){s+=a,o=!1;continue}if(a==="\\"){s+=a,o=!0;continue}if(a==='"'){i=i===1?0:1,s+=a;continue}if(i===0){if(a==="[")t++;else if(a==="]"&&t>0)t--;else if(t===0){if(a==="(")n++;else if(a===")"&&n>0)n--;else if(a==="|"&&n===0){e.push(s),s="";continue}}}s+=a}return e.push(s),e},iP=r=>{let e=!1;for(let t of r){if(e===!0){e=!1;continue}if(t==="\\"){e=!0;continue}if(/[?*+@!()[\]{}]/.test(t))return!1}return!0},hm=r=>{let e=r.trim(),t=!0;for(;t===!0;)t=!1,/^@\([^\\()[\]{}|]+\)$/.test(e)&&(e=e.slice(2,-1),t=!0);if(iP(e))return e.replace(/\\(.)/g,"$1")},sP=r=>{let e=r.map(hm).filter(Boolean);for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let i=e[t],s=e[n],o=i[0];if(!(!o||i!==o.repeat(i.length)||s!==o.repeat(s.length))&&(i===s||i.startsWith(s)||s.startsWith(i)))return!0}return!1},pc=(r,e=!0)=>{if(r[0]!=="+"&&r[0]!=="*"||r[1]!=="(")return;let t=0,n=0,i=0,s=!1;for(let o=1;o<r.length;o++){let a=r[o];if(s===!0){s=!1;continue}if(a==="\\"){s=!0;continue}if(a==='"'){i=i===1?0:1;continue}if(i!==1){if(a==="["){t++;continue}if(a==="]"&&t>0){t--;continue}if(!(t>0)){if(a==="("){n++;continue}if(a===")"&&(n--,n===0))return e===!0&&o!==r.length-1?void 0:{type:r[0],body:r.slice(2,o),end:o}}}}},oP=r=>{let e=0,t=[];for(;e<r.length;){let i=pc(r.slice(e),!1);if(!i||i.type!=="*")return;let s=mm(i.body).map(a=>a.trim());if(s.length!==1)return;let o=hm(s[0]);if(!o||o.length!==1)return;t.push(o),e+=i.end+1}return t.length<1?void 0:`${t.length===1?We.escapeRegex(t[0]):`[${t.map(i=>We.escapeRegex(i)).join("")}]`}*`},aP=r=>{let e=0,t=r.trim(),n=pc(t);for(;n;)e++,t=n.body.trim(),n=pc(t);return e},lP=(r,e)=>{if(e.maxExtglobRecursion===!1)return{risky:!1};let t=typeof e.maxExtglobRecursion=="number"?e.maxExtglobRecursion:fi.DEFAULT_MAX_EXTGLOB_RECURSION,n=mm(r).map(i=>i.trim());if(n.length>1&&(n.some(i=>i==="")||n.some(i=>/^[*?]+$/.test(i))||sP(n)))return{risky:!0};for(let i of n){let s=oP(i);if(s)return{risky:!0,safeOutput:s};if(aP(i)>t)return{risky:!0}}return{risky:!1}},mc=(r,e)=>{if(typeof r!="string")throw new TypeError("Expected a string");r=pm[r]||r;let t={...e},n=typeof t.maxLength=="number"?Math.min(To,t.maxLength):To,i=r.length;if(i>n)throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${n}`);let s={type:"bos",value:"",output:t.prepend||""},o=[s],a=t.capture?"":"?:",l=We.isWindows(e),c=fi.globChars(l),u=fi.extglobChars(c),{DOT_LITERAL:d,PLUS_LITERAL:p,SLASH_LITERAL:f,ONE_CHAR:h,DOTS_SLASH:g,NO_DOT:y,NO_DOT_SLASH:b,NO_DOTS_SLASH:S,QMARK:E,QMARK_NO_DOT:I,STAR:O,START_ANCHOR:H}=c,W=N=>`(${a}(?:(?!${H}${N.dot?g:d}).)*?)`,M=t.dot?"":y,A=t.dot?E:I,$=t.bash===!0?W(t):O;t.capture&&($=`(${$})`),typeof t.noext=="boolean"&&(t.noextglob=t.noext);let w={input:r,index:-1,start:0,dot:t.dot===!0,consumed:"",output:"",prefix:"",backtrack:!1,negated:!1,brackets:0,braces:0,parens:0,quotes:0,globstar:!1,tokens:o};r=We.removePrefix(r,w),i=r.length;let re=[],q=[],Ge=[],T=s,P,Oe=()=>w.index===i-1,D=w.peek=(N=1)=>r[w.index+N],F=w.advance=()=>r[++w.index]||"",ne=()=>r.slice(w.index+1),ge=(N="",me=0)=>{w.consumed+=N,w.index+=me},He=N=>{w.output+=N.output!=null?N.output:N.value,ge(N.value)},Ct=()=>{let N=1;for(;D()==="!"&&(D(2)!=="("||D(3)==="?");)F(),w.start++,N++;return N%2===0?!1:(w.negated=!0,w.start++,!0)},yt=N=>{w[N]++,Ge.push(N)},ze=N=>{w[N]--,Ge.pop()},Y=N=>{if(T.type==="globstar"){let me=w.braces>0&&(N.type==="comma"||N.type==="brace"),R=N.extglob===!0||re.length&&(N.type==="pipe"||N.type==="paren");N.type!=="slash"&&N.type!=="paren"&&!me&&!R&&(w.output=w.output.slice(0,-T.output.length),T.type="star",T.value="*",T.output=$,w.output+=T.output)}if(re.length&&N.type!=="paren"&&(re[re.length-1].inner+=N.value),(N.value||N.output)&&He(N),T&&T.type==="text"&&N.type==="text"){T.value+=N.value,T.output=(T.output||"")+N.value;return}N.prev=T,o.push(N),T=N},Ji=(N,me)=>{let R={...u[me],conditions:1,inner:""};R.prev=T,R.parens=w.parens,R.output=w.output,R.startIndex=w.index,R.tokensIndex=o.length;let K=(t.capture?"(":"")+R.open;yt("parens"),Y({type:N,value:me,output:w.output?"":h}),Y({type:"paren",extglob:!0,value:F(),output:K}),re.push(R)},Kb=N=>{let me=r.slice(N.startIndex,w.index+1),R=r.slice(N.startIndex+2,w.index),K=lP(R,t);if((N.type==="plus"||N.type==="star")&&K.risky){let ce=K.safeOutput?(N.output?"":h)+(t.capture?`(${K.safeOutput})`:K.safeOutput):void 0,kt=o[N.tokensIndex];kt.type="text",kt.value=me,kt.output=ce||We.escapeRegex(me);for(let _t=N.tokensIndex+1;_t<o.length;_t++)o[_t].value="",o[_t].output="",delete o[_t].suffix;w.output=N.output+kt.output,w.backtrack=!0,Y({type:"paren",extglob:!0,value:P,output:""}),ze("parens");return}let de=N.close+(t.capture?")":""),Ie;if(N.type==="negate"){let ce=$;if(N.inner&&N.inner.length>1&&N.inner.includes("/")&&(ce=W(t)),(ce!==$||Oe()||/^\)+$/.test(ne()))&&(de=N.close=`)$))${ce}`),N.inner.includes("*")&&(Ie=ne())&&/^\.[^\\/.]+$/.test(Ie)){let kt=mc(Ie,{...e,fastpaths:!1}).output;de=N.close=`)${kt})${ce})`}N.prev.type==="bos"&&(w.negatedExtglob=!0)}Y({type:"paren",extglob:!0,value:P,output:de}),ze("parens")};if(t.fastpaths!==!1&&!/(^[*!]|[/()[\]{}"])/.test(r)){let N=!1,me=r.replace(rP,(R,K,de,Ie,ce,kt)=>Ie==="\\"?(N=!0,R):Ie==="?"?K?K+Ie+(ce?E.repeat(ce.length):""):kt===0?A+(ce?E.repeat(ce.length):""):E.repeat(de.length):Ie==="."?d.repeat(de.length):Ie==="*"?K?K+Ie+(ce?$:""):$:K?R:`\\${R}`);return N===!0&&(t.unescape===!0?me=me.replace(/\\/g,""):me=me.replace(/\\+/g,R=>R.length%2===0?"\\\\":R?"\\":"")),me===r&&t.contains===!0?(w.output=r,w):(w.output=We.wrapOutput(me,w,e),w)}for(;!Oe();){if(P=F(),P==="\0")continue;if(P==="\\"){let R=D();if(R==="/"&&t.bash!==!0||R==="."||R===";")continue;if(!R){P+="\\",Y({type:"text",value:P});continue}let K=/^\\+/.exec(ne()),de=0;if(K&&K[0].length>2&&(de=K[0].length,w.index+=de,de%2!==0&&(P+="\\")),t.unescape===!0?P=F():P+=F(),w.brackets===0){Y({type:"text",value:P});continue}}if(w.brackets>0&&(P!=="]"||T.value==="["||T.value==="[^")){if(t.posix!==!1&&P===":"){let R=T.value.slice(1);if(R.includes("[")&&(T.posix=!0,R.includes(":"))){let K=T.value.lastIndexOf("["),de=T.value.slice(0,K),Ie=T.value.slice(K+2),ce=eP[Ie];if(ce){T.value=de+ce,w.backtrack=!0,F(),!s.output&&o.indexOf(T)===1&&(s.output=h);continue}}}(P==="["&&D()!==":"||P==="-"&&D()==="]")&&(P=`\\${P}`),P==="]"&&(T.value==="["||T.value==="[^")&&(P=`\\${P}`),t.posix===!0&&P==="!"&&T.value==="["&&(P="^"),T.value+=P,He({value:P});continue}if(w.quotes===1&&P!=='"'){P=We.escapeRegex(P),T.value+=P,He({value:P});continue}if(P==='"'){w.quotes=w.quotes===1?0:1,t.keepQuotes===!0&&Y({type:"text",value:P});continue}if(P==="("){yt("parens"),Y({type:"paren",value:P});continue}if(P===")"){if(w.parens===0&&t.strictBrackets===!0)throw new SyntaxError(cn("opening","("));let R=re[re.length-1];if(R&&w.parens===R.parens+1){Kb(re.pop());continue}Y({type:"paren",value:P,output:w.parens?")":"\\)"}),ze("parens");continue}if(P==="["){if(t.nobracket===!0||!ne().includes("]")){if(t.nobracket!==!0&&t.strictBrackets===!0)throw new SyntaxError(cn("closing","]"));P=`\\${P}`}else yt("brackets");Y({type:"bracket",value:P});continue}if(P==="]"){if(t.nobracket===!0||T&&T.type==="bracket"&&T.value.length===1){Y({type:"text",value:P,output:`\\${P}`});continue}if(w.brackets===0){if(t.strictBrackets===!0)throw new SyntaxError(cn("opening","["));Y({type:"text",value:P,output:`\\${P}`});continue}ze("brackets");let R=T.value.slice(1);if(T.posix!==!0&&R[0]==="^"&&!R.includes("/")&&(P=`/${P}`),T.value+=P,He({value:P}),t.literalBrackets===!1||We.hasRegexChars(R))continue;let K=We.escapeRegex(T.value);if(w.output=w.output.slice(0,-T.value.length),t.literalBrackets===!0){w.output+=K,T.value=K;continue}T.value=`(${a}${K}|${T.value})`,w.output+=T.value;continue}if(P==="{"&&t.nobrace!==!0){yt("braces");let R={type:"brace",value:P,output:"(",outputIndex:w.output.length,tokensIndex:w.tokens.length};q.push(R),Y(R);continue}if(P==="}"){let R=q[q.length-1];if(t.nobrace===!0||!R){Y({type:"text",value:P,output:P});continue}let K=")";if(R.dots===!0){let de=o.slice(),Ie=[];for(let ce=de.length-1;ce>=0&&(o.pop(),de[ce].type!=="brace");ce--)de[ce].type!=="dots"&&Ie.unshift(de[ce].value);K=nP(Ie,t),w.backtrack=!0}if(R.comma!==!0&&R.dots!==!0){let de=w.output.slice(0,R.outputIndex),Ie=w.tokens.slice(R.tokensIndex);R.value=R.output="\\{",P=K="\\}",w.output=de;for(let ce of Ie)w.output+=ce.output||ce.value}Y({type:"brace",value:P,output:K}),ze("braces"),q.pop();continue}if(P==="|"){re.length>0&&re[re.length-1].conditions++,Y({type:"text",value:P});continue}if(P===","){let R=P,K=q[q.length-1];K&&Ge[Ge.length-1]==="braces"&&(K.comma=!0,R="|"),Y({type:"comma",value:P,output:R});continue}if(P==="/"){if(T.type==="dot"&&w.index===w.start+1){w.start=w.index+1,w.consumed="",w.output="",o.pop(),T=s;continue}Y({type:"slash",value:P,output:f});continue}if(P==="."){if(w.braces>0&&T.type==="dot"){T.value==="."&&(T.output=d);let R=q[q.length-1];T.type="dots",T.output+=P,T.value+=P,R.dots=!0;continue}if(w.braces+w.parens===0&&T.type!=="bos"&&T.type!=="slash"){Y({type:"text",value:P,output:d});continue}Y({type:"dot",value:P,output:d});continue}if(P==="?"){if(!(T&&T.value==="(")&&t.noextglob!==!0&&D()==="("&&D(2)!=="?"){Ji("qmark",P);continue}if(T&&T.type==="paren"){let K=D(),de=P;if(K==="<"&&!We.supportsLookbehinds())throw new Error("Node.js v10 or higher is required for regex lookbehinds");(T.value==="("&&!/[!=<:]/.test(K)||K==="<"&&!/<([!=]|\w+>)/.test(ne()))&&(de=`\\${P}`),Y({type:"text",value:P,output:de});continue}if(t.dot!==!0&&(T.type==="slash"||T.type==="bos")){Y({type:"qmark",value:P,output:I});continue}Y({type:"qmark",value:P,output:E});continue}if(P==="!"){if(t.noextglob!==!0&&D()==="("&&(D(2)!=="?"||!/[!=<:]/.test(D(3)))){Ji("negate",P);continue}if(t.nonegate!==!0&&w.index===0){Ct();continue}}if(P==="+"){if(t.noextglob!==!0&&D()==="("&&D(2)!=="?"){Ji("plus",P);continue}if(T&&T.value==="("||t.regex===!1){Y({type:"plus",value:P,output:p});continue}if(T&&(T.type==="bracket"||T.type==="paren"||T.type==="brace")||w.parens>0){Y({type:"plus",value:P});continue}Y({type:"plus",value:p});continue}if(P==="@"){if(t.noextglob!==!0&&D()==="("&&D(2)!=="?"){Y({type:"at",extglob:!0,value:P,output:""});continue}Y({type:"text",value:P});continue}if(P!=="*"){(P==="$"||P==="^")&&(P=`\\${P}`);let R=tP.exec(ne());R&&(P+=R[0],w.index+=R[0].length),Y({type:"text",value:P});continue}if(T&&(T.type==="globstar"||T.star===!0)){T.type="star",T.star=!0,T.value+=P,T.output=$,w.backtrack=!0,w.globstar=!0,ge(P);continue}let N=ne();if(t.noextglob!==!0&&/^\([^?]/.test(N)){Ji("star",P);continue}if(T.type==="star"){if(t.noglobstar===!0){ge(P);continue}let R=T.prev,K=R.prev,de=R.type==="slash"||R.type==="bos",Ie=K&&(K.type==="star"||K.type==="globstar");if(t.bash===!0&&(!de||N[0]&&N[0]!=="/")){Y({type:"star",value:P,output:""});continue}let ce=w.braces>0&&(R.type==="comma"||R.type==="brace"),kt=re.length&&(R.type==="pipe"||R.type==="paren");if(!de&&R.type!=="paren"&&!ce&&!kt){Y({type:"star",value:P,output:""});continue}for(;N.slice(0,3)==="/**";){let _t=r[w.index+4];if(_t&&_t!=="/")break;N=N.slice(3),ge("/**",3)}if(R.type==="bos"&&Oe()){T.type="globstar",T.value+=P,T.output=W(t),w.output=T.output,w.globstar=!0,ge(P);continue}if(R.type==="slash"&&R.prev.type!=="bos"&&!Ie&&Oe()){w.output=w.output.slice(0,-(R.output+T.output).length),R.output=`(?:${R.output}`,T.type="globstar",T.output=W(t)+(t.strictSlashes?")":"|$)"),T.value+=P,w.globstar=!0,w.output+=R.output+T.output,ge(P);continue}if(R.type==="slash"&&R.prev.type!=="bos"&&N[0]==="/"){let _t=N[1]!==void 0?"|$":"";w.output=w.output.slice(0,-(R.output+T.output).length),R.output=`(?:${R.output}`,T.type="globstar",T.output=`${W(t)}${f}|${f}${_t})`,T.value+=P,w.output+=R.output+T.output,w.globstar=!0,ge(P+F()),Y({type:"slash",value:"/",output:""});continue}if(R.type==="bos"&&N[0]==="/"){T.type="globstar",T.value+=P,T.output=`(?:^|${f}|${W(t)}${f})`,w.output=T.output,w.globstar=!0,ge(P+F()),Y({type:"slash",value:"/",output:""});continue}w.output=w.output.slice(0,-T.output.length),T.type="globstar",T.output=W(t),T.value+=P,w.output+=T.output,w.globstar=!0,ge(P);continue}let me={type:"star",value:P,output:$};if(t.bash===!0){me.output=".*?",(T.type==="bos"||T.type==="slash")&&(me.output=M+me.output),Y(me);continue}if(T&&(T.type==="bracket"||T.type==="paren")&&t.regex===!0){me.output=P,Y(me);continue}(w.index===w.start||T.type==="slash"||T.type==="dot")&&(T.type==="dot"?(w.output+=b,T.output+=b):t.dot===!0?(w.output+=S,T.output+=S):(w.output+=M,T.output+=M),D()!=="*"&&(w.output+=h,T.output+=h)),Y(me)}for(;w.brackets>0;){if(t.strictBrackets===!0)throw new SyntaxError(cn("closing","]"));w.output=We.escapeLast(w.output,"["),ze("brackets")}for(;w.parens>0;){if(t.strictBrackets===!0)throw new SyntaxError(cn("closing",")"));w.output=We.escapeLast(w.output,"("),ze("parens")}for(;w.braces>0;){if(t.strictBrackets===!0)throw new SyntaxError(cn("closing","}"));w.output=We.escapeLast(w.output,"{"),ze("braces")}if(t.strictSlashes!==!0&&(T.type==="star"||T.type==="bracket")&&Y({type:"maybe_slash",value:"",output:`${f}?`}),w.backtrack===!0){w.output="";for(let N of w.tokens)w.output+=N.output!=null?N.output:N.value,N.suffix&&(w.output+=N.suffix)}return w};mc.fastpaths=(r,e)=>{let t={...e},n=typeof t.maxLength=="number"?Math.min(To,t.maxLength):To,i=r.length;if(i>n)throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${n}`);r=pm[r]||r;let s=We.isWindows(e),{DOT_LITERAL:o,SLASH_LITERAL:a,ONE_CHAR:l,DOTS_SLASH:c,NO_DOT:u,NO_DOTS:d,NO_DOTS_SLASH:p,STAR:f,START_ANCHOR:h}=fi.globChars(s),g=t.dot?d:u,y=t.dot?p:u,b=t.capture?"":"?:",S={negated:!1,prefix:""},E=t.bash===!0?".*?":f;t.capture&&(E=`(${E})`);let I=M=>M.noglobstar===!0?E:`(${b}(?:(?!${h}${M.dot?c:o}).)*?)`,O=M=>{switch(M){case"*":return`${g}${l}${E}`;case".*":return`${o}${l}${E}`;case"*.*":return`${g}${E}${o}${l}${E}`;case"*/*":return`${g}${E}${a}${l}${y}${E}`;case"**":return g+I(t);case"**/*":return`(?:${g}${I(t)}${a})?${y}${l}${E}`;case"**/*.*":return`(?:${g}${I(t)}${a})?${y}${E}${o}${l}${E}`;case"**/.*":return`(?:${g}${I(t)}${a})?${o}${l}${E}`;default:{let A=/^(.*?)\.(\w+)$/.exec(M);if(!A)return;let $=O(A[1]);return $?$+o+A[2]:void 0}}},H=We.removePrefix(r,S),W=O(H);return W&&t.strictSlashes!==!0&&(W+=`${a}?`),W};gm.exports=mc});var Sm=k((QN,bm)=>{"use strict";var cP=require("path"),uP=fm(),hc=ym(),gc=Eo(),dP=ui(),fP=r=>r&&typeof r=="object"&&!Array.isArray(r),ve=(r,e,t=!1)=>{if(Array.isArray(r)){let u=r.map(p=>ve(p,e,t));return p=>{for(let f of u){let h=f(p);if(h)return h}return!1}}let n=fP(r)&&r.tokens&&r.input;if(r===""||typeof r!="string"&&!n)throw new TypeError("Expected pattern to be a non-empty string");let i=e||{},s=gc.isWindows(e),o=n?ve.compileRe(r,e):ve.makeRe(r,e,!1,!0),a=o.state;delete o.state;let l=()=>!1;if(i.ignore){let u={...e,ignore:null,onMatch:null,onResult:null};l=ve(i.ignore,u,t)}let c=(u,d=!1)=>{let{isMatch:p,match:f,output:h}=ve.test(u,o,e,{glob:r,posix:s}),g={glob:r,state:a,regex:o,posix:s,input:u,output:h,match:f,isMatch:p};return typeof i.onResult=="function"&&i.onResult(g),p===!1?(g.isMatch=!1,d?g:!1):l(u)?(typeof i.onIgnore=="function"&&i.onIgnore(g),g.isMatch=!1,d?g:!1):(typeof i.onMatch=="function"&&i.onMatch(g),d?g:!0)};return t&&(c.state=a),c};ve.test=(r,e,t,{glob:n,posix:i}={})=>{if(typeof r!="string")throw new TypeError("Expected input to be a string");if(r==="")return{isMatch:!1,output:""};let s=t||{},o=s.format||(i?gc.toPosixSlashes:null),a=r===n,l=a&&o?o(r):r;return a===!1&&(l=o?o(r):r,a=l===n),(a===!1||s.capture===!0)&&(s.matchBase===!0||s.basename===!0?a=ve.matchBase(r,e,t,i):a=e.exec(l)),{isMatch:!!a,match:a,output:l}};ve.matchBase=(r,e,t,n=gc.isWindows(t))=>(e instanceof RegExp?e:ve.makeRe(e,t)).test(cP.basename(r));ve.isMatch=(r,e,t)=>ve(e,t)(r);ve.parse=(r,e)=>Array.isArray(r)?r.map(t=>ve.parse(t,e)):hc(r,{...e,fastpaths:!1});ve.scan=(r,e)=>uP(r,e);ve.compileRe=(r,e,t=!1,n=!1)=>{if(t===!0)return r.output;let i=e||{},s=i.contains?"":"^",o=i.contains?"":"$",a=`${s}(?:${r.output})${o}`;r&&r.negated===!0&&(a=`^(?!${a}).*$`);let l=ve.toRegex(a,e);return n===!0&&(l.state=r),l};ve.makeRe=(r,e={},t=!1,n=!1)=>{if(!r||typeof r!="string")throw new TypeError("Expected a non-empty string");let i={negated:!1,fastpaths:!0};return e.fastpaths!==!1&&(r[0]==="."||r[0]==="*")&&(i.output=hc.fastpaths(r,e)),i.output||(i=hc(r,e)),ve.compileRe(i,e,t,n)};ve.toRegex=(r,e)=>{try{let t=e||{};return new RegExp(r,t.flags||(t.nocase?"i":""))}catch(t){if(e&&e.debug===!0)throw t;return/$^/}};ve.constants=dP;bm.exports=ve});var yc=k((ZN,wm)=>{"use strict";wm.exports=Sm()});var _m=k((eA,km)=>{"use strict";var mi=require("fs"),{Readable:pP}=require("stream"),pi=require("path"),{promisify:Co}=require("util"),bc=yc(),mP=Co(mi.readdir),hP=Co(mi.stat),Em=Co(mi.lstat),gP=Co(mi.realpath),yP="!",xm="READDIRP_RECURSIVE_ERROR",bP=new Set(["ENOENT","EPERM","EACCES","ELOOP",xm]),Sc="files",Cm="directories",vo="files_directories",Po="all",Tm=[Sc,Cm,vo,Po],SP=r=>bP.has(r.code),[Pm,wP]=process.versions.node.split(".").slice(0,2).map(r=>Number.parseInt(r,10)),EP=process.platform==="win32"&&(Pm>10||Pm===10&&wP>=5),vm=r=>{if(r!==void 0){if(typeof r=="function")return r;if(typeof r=="string"){let e=bc(r.trim());return t=>e(t.basename)}if(Array.isArray(r)){let e=[],t=[];for(let n of r){let i=n.trim();i.charAt(0)===yP?t.push(bc(i.slice(1))):e.push(bc(i))}return t.length>0?e.length>0?n=>e.some(i=>i(n.basename))&&!t.some(i=>i(n.basename)):n=>!t.some(i=>i(n.basename)):n=>e.some(i=>i(n.basename))}}},xo=class r extends pP{static get defaultOptions(){return{root:".",fileFilter:e=>!0,directoryFilter:e=>!0,type:Sc,lstat:!1,depth:2147483648,alwaysStat:!1}}constructor(e={}){super({objectMode:!0,autoDestroy:!0,highWaterMark:e.highWaterMark||4096});let t={...r.defaultOptions,...e},{root:n,type:i}=t;this._fileFilter=vm(t.fileFilter),this._directoryFilter=vm(t.directoryFilter);let s=t.lstat?Em:hP;EP?this._stat=o=>s(o,{bigint:!0}):this._stat=s,this._maxDepth=t.depth,this._wantsDir=[Cm,vo,Po].includes(i),this._wantsFile=[Sc,vo,Po].includes(i),this._wantsEverything=i===Po,this._root=pi.resolve(n),this._isDirent="Dirent"in mi&&!t.alwaysStat,this._statsProp=this._isDirent?"dirent":"stats",this._rdOptions={encoding:"utf8",withFileTypes:this._isDirent},this.parents=[this._exploreDir(n,1)],this.reading=!1,this.parent=void 0}async _read(e){if(!this.reading){this.reading=!0;try{for(;!this.destroyed&&e>0;){let{path:t,depth:n,files:i=[]}=this.parent||{};if(i.length>0){let s=i.splice(0,e).map(o=>this._formatEntry(o,t));for(let o of await Promise.all(s)){if(this.destroyed)return;let a=await this._getEntryType(o);a==="directory"&&this._directoryFilter(o)?(n<=this._maxDepth&&this.parents.push(this._exploreDir(o.fullPath,n+1)),this._wantsDir&&(this.push(o),e--)):(a==="file"||this._includeAsFile(o))&&this._fileFilter(o)&&this._wantsFile&&(this.push(o),e--)}}else{let s=this.parents.pop();if(!s){this.push(null);break}if(this.parent=await s,this.destroyed)return}}}catch(t){this.destroy(t)}finally{this.reading=!1}}}async _exploreDir(e,t){let n;try{n=await mP(e,this._rdOptions)}catch(i){this._onError(i)}return{files:n,depth:t,path:e}}async _formatEntry(e,t){let n;try{let i=this._isDirent?e.name:e,s=pi.resolve(pi.join(t,i));n={path:pi.relative(this._root,s),fullPath:s,basename:i},n[this._statsProp]=this._isDirent?e:await this._stat(s)}catch(i){this._onError(i)}return n}_onError(e){SP(e)&&!this.destroyed?this.emit("warn",e):this.destroy(e)}async _getEntryType(e){let t=e&&e[this._statsProp];if(t){if(t.isFile())return"file";if(t.isDirectory())return"directory";if(t&&t.isSymbolicLink()){let n=e.fullPath;try{let i=await gP(n),s=await Em(i);if(s.isFile())return"file";if(s.isDirectory()){let o=i.length;if(n.startsWith(i)&&n.substr(o,1)===pi.sep){let a=new Error(`Circular symlink detected: "${n}" points to "${i}"`);return a.code=xm,this._onError(a)}return"directory"}}catch(i){this._onError(i)}}}}_includeAsFile(e){let t=e&&e[this._statsProp];return t&&this._wantsEverything&&!t.isDirectory()}},un=(r,e={})=>{let t=e.entryType||e.type;if(t==="both"&&(t=vo),t&&(e.type=t),r){if(typeof r!="string")throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");if(t&&!Tm.includes(t))throw new Error(`readdirp: Invalid type passed. Use one of ${Tm.join(", ")}`)}else throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");return e.root=r,new xo(e)},TP=(r,e={})=>new Promise((t,n)=>{let i=[];un(r,e).on("data",s=>i.push(s)).on("end",()=>t(i)).on("error",s=>n(s))});un.promise=TP;un.ReaddirpStream=xo;un.default=un;km.exports=un});var wc=k((tA,Im)=>{Im.exports=function(r,e){if(typeof r!="string")throw new TypeError("expected path to be a string");if(r==="\\"||r==="/")return"/";var t=r.length;if(t<=1)return r;var n="";if(t>4&&r[3]==="\\"){var i=r[2];(i==="?"||i===".")&&r.slice(0,2)==="\\\\"&&(r=r.slice(2),n="//")}var s=r.split(/[/\\]+/);return e!==!1&&s[s.length-1]===""&&s.pop(),n+s.join("/")}});var Dm=k((Om,Mm)=>{"use strict";Object.defineProperty(Om,"__esModule",{value:!0});var Am=yc(),PP=wc(),Rm="!",vP={returnIndex:!1},xP=r=>Array.isArray(r)?r:[r],CP=(r,e)=>{if(typeof r=="function")return r;if(typeof r=="string"){let t=Am(r,e);return n=>r===n||t(n)}return r instanceof RegExp?t=>r.test(t):t=>!1},Nm=(r,e,t,n)=>{let i=Array.isArray(t),s=i?t[0]:t;if(!i&&typeof s!="string")throw new TypeError("anymatch: second argument must be a string: got "+Object.prototype.toString.call(s));let o=PP(s,!1);for(let l=0;l<e.length;l++){let c=e[l];if(c(o))return n?-1:!1}let a=i&&[o].concat(t.slice(1));for(let l=0;l<r.length;l++){let c=r[l];if(i?c(...a):c(o))return n?l:!0}return n?-1:!1},Ec=(r,e,t=vP)=>{if(r==null)throw new TypeError("anymatch: specify first argument");let n=typeof t=="boolean"?{returnIndex:t}:t,i=n.returnIndex||!1,s=xP(r),o=s.filter(l=>typeof l=="string"&&l.charAt(0)===Rm).map(l=>l.slice(1)).map(l=>Am(l,n)),a=s.filter(l=>typeof l!="string"||typeof l=="string"&&l.charAt(0)!==Rm).map(l=>CP(l,n));return e==null?(l,c=!1)=>Nm(a,o,l,typeof c=="boolean"?c:!1):Nm(a,o,e,i)};Ec.default=Ec;Mm.exports=Ec});var $m=k((rA,Lm)=>{Lm.exports=function(e){if(typeof e!="string"||e==="")return!1;for(var t;t=/(\\).|([@?!+*]\(.*\))/g.exec(e);){if(t[2])return!0;e=e.slice(t.index+t[0].length)}return!1}});var Tc=k((nA,jm)=>{var kP=$m(),Bm={"{":"}","(":")","[":"]"},_P=function(r){if(r[0]==="!")return!0;for(var e=0,t=-2,n=-2,i=-2,s=-2,o=-2;e<r.length;){if(r[e]==="*"||r[e+1]==="?"&&/[\].+)]/.test(r[e])||n!==-1&&r[e]==="["&&r[e+1]!=="]"&&(n<e&&(n=r.indexOf("]",e)),n>e&&(o===-1||o>n||(o=r.indexOf("\\",e),o===-1||o>n)))||i!==-1&&r[e]==="{"&&r[e+1]!=="}"&&(i=r.indexOf("}",e),i>e&&(o=r.indexOf("\\",e),o===-1||o>i))||s!==-1&&r[e]==="("&&r[e+1]==="?"&&/[:!=]/.test(r[e+2])&&r[e+3]!==")"&&(s=r.indexOf(")",e),s>e&&(o=r.indexOf("\\",e),o===-1||o>s))||t!==-1&&r[e]==="("&&r[e+1]!=="|"&&(t<e&&(t=r.indexOf("|",e)),t!==-1&&r[t+1]!==")"&&(s=r.indexOf(")",t),s>t&&(o=r.indexOf("\\",t),o===-1||o>s))))return!0;if(r[e]==="\\"){var a=r[e+1];e+=2;var l=Bm[a];if(l){var c=r.indexOf(l,e);c!==-1&&(e=c+1)}if(r[e]==="!")return!0}else e++}return!1},IP=function(r){if(r[0]==="!")return!0;for(var e=0;e<r.length;){if(/[*?{}()[\]]/.test(r[e]))return!0;if(r[e]==="\\"){var t=r[e+1];e+=2;var n=Bm[t];if(n){var i=r.indexOf(n,e);i!==-1&&(e=i+1)}if(r[e]==="!")return!0}else e++}return!1};jm.exports=function(e,t){if(typeof e!="string"||e==="")return!1;if(kP(e))return!0;var n=_P;return t&&t.strict===!1&&(n=IP),n(e)}});var Hm=k((iA,Fm)=>{"use strict";var RP=Tc(),NP=require("path").posix.dirname,AP=require("os").platform()==="win32",Pc="/",OP=/\\/g,MP=/[\{\[].*[\}\]]$/,DP=/(^|[^\\])([\{\[]|\([^\)]+$)/,LP=/\\([\!\*\?\|\[\]\(\)\{\}])/g;Fm.exports=function(e,t){var n=Object.assign({flipBackslashes:!0},t);n.flipBackslashes&&AP&&e.indexOf(Pc)<0&&(e=e.replace(OP,Pc)),MP.test(e)&&(e+=Pc),e+="a";do e=NP(e);while(RP(e)||DP.test(e));return e.replace(LP,"$1")}});var ko=k(ft=>{"use strict";ft.isInteger=r=>typeof r=="number"?Number.isInteger(r):typeof r=="string"&&r.trim()!==""?Number.isInteger(Number(r)):!1;ft.find=(r,e)=>r.nodes.find(t=>t.type===e);ft.exceedsLimit=(r,e,t=1,n)=>n===!1||!ft.isInteger(r)||!ft.isInteger(e)?!1:(Number(e)-Number(r))/Number(t)>=n;ft.escapeNode=(r,e=0,t)=>{let n=r.nodes[e];n&&(t&&n.type===t||n.type==="open"||n.type==="close")&&n.escaped!==!0&&(n.value="\\"+n.value,n.escaped=!0)};ft.encloseBrace=r=>r.type!=="brace"?!1:r.commas>>0+r.ranges>>0===0?(r.invalid=!0,!0):!1;ft.isInvalidBrace=r=>r.type!=="brace"?!1:r.invalid===!0||r.dollar?!0:r.commas>>0+r.ranges>>0===0||r.open!==!0||r.close!==!0?(r.invalid=!0,!0):!1;ft.isOpenOrClose=r=>r.type==="open"||r.type==="close"?!0:r.open===!0||r.close===!0;ft.reduce=r=>r.reduce((e,t)=>(t.type==="text"&&e.push(t.value),t.type==="range"&&(t.type="text"),e),[]);ft.flatten=(...r)=>{let e=[],t=n=>{for(let i=0;i<n.length;i++){let s=n[i];if(Array.isArray(s)){t(s);continue}s!==void 0&&e.push(s)}return e};return t(r),e}});var _o=k((oA,Gm)=>{"use strict";var Wm=ko();Gm.exports=(r,e={})=>{let t=(n,i={})=>{let s=e.escapeInvalid&&Wm.isInvalidBrace(i),o=n.invalid===!0&&e.escapeInvalid===!0,a="";if(n.value)return(s||o)&&Wm.isOpenOrClose(n)?"\\"+n.value:n.value;if(n.value)return n.value;if(n.nodes)for(let l of n.nodes)a+=t(l);return a};return t(r)}});var Vm=k((aA,Um)=>{"use strict";Um.exports=function(r){return typeof r=="number"?r-r===0:typeof r=="string"&&r.trim()!==""?Number.isFinite?Number.isFinite(+r):isFinite(+r):!1}});var eh=k((lA,Zm)=>{"use strict";var qm=Vm(),Ar=(r,e,t)=>{if(qm(r)===!1)throw new TypeError("toRegexRange: expected the first argument to be a number");if(e===void 0||r===e)return String(r);if(qm(e)===!1)throw new TypeError("toRegexRange: expected the second argument to be a number.");let n={relaxZeros:!0,...t};typeof n.strictZeros=="boolean"&&(n.relaxZeros=n.strictZeros===!1);let i=String(n.relaxZeros),s=String(n.shorthand),o=String(n.capture),a=String(n.wrap),l=r+":"+e+"="+i+s+o+a;if(Ar.cache.hasOwnProperty(l))return Ar.cache[l].result;let c=Math.min(r,e),u=Math.max(r,e);if(Math.abs(c-u)===1){let g=r+"|"+e;return n.capture?`(${g})`:n.wrap===!1?g:`(?:${g})`}let d=Qm(r)||Qm(e),p={min:r,max:e,a:c,b:u},f=[],h=[];if(d&&(p.isPadded=d,p.maxLen=String(p.max).length),c<0){let g=u<0?Math.abs(u):1;h=Jm(g,Math.abs(c),p,n),c=p.a=0}return u>=0&&(f=Jm(c,u,p,n)),p.negatives=h,p.positives=f,p.result=$P(h,f,n),n.capture===!0?p.result=`(${p.result})`:n.wrap!==!1&&f.length+h.length>1&&(p.result=`(?:${p.result})`),Ar.cache[l]=p,p.result};function $P(r,e,t){let n=vc(r,e,"-",!1,t)||[],i=vc(e,r,"",!1,t)||[],s=vc(r,e,"-?",!0,t)||[];return n.concat(s).concat(i).join("|")}function BP(r,e){let t=1,n=1,i=Km(r,t),s=new Set([e]);for(;r<=i&&i<=e;)s.add(i),t+=1,i=Km(r,t);for(i=Ym(e+1,n)-1;r<i&&i<=e;)s.add(i),n+=1,i=Ym(e+1,n)-1;return s=[...s],s.sort(HP),s}function jP(r,e,t){if(r===e)return{pattern:r,count:[],digits:0};let n=FP(r,e),i=n.length,s="",o=0;for(let a=0;a<i;a++){let[l,c]=n[a];l===c?s+=l:l!=="0"||c!=="9"?s+=WP(l,c,t):o++}return o&&(s+=t.shorthand===!0?"\\d":"[0-9]"),{pattern:s,count:[o],digits:i}}function Jm(r,e,t,n){let i=BP(r,e),s=[],o=r,a;for(let l=0;l<i.length;l++){let c=i[l],u=jP(String(o),String(c),n),d="";if(!t.isPadded&&a&&a.pattern===u.pattern){a.count.length>1&&a.count.pop(),a.count.push(u.count[0]),a.string=a.pattern+Xm(a.count),o=c+1;continue}t.isPadded&&(d=GP(c,t,n)),u.string=d+u.pattern+Xm(u.count),s.push(u),o=c+1,a=u}return s}function vc(r,e,t,n,i){let s=[];for(let o of r){let{string:a}=o;!n&&!zm(e,"string",a)&&s.push(t+a),n&&zm(e,"string",a)&&s.push(t+a)}return s}function FP(r,e){let t=[];for(let n=0;n<r.length;n++)t.push([r[n],e[n]]);return t}function HP(r,e){return r>e?1:e>r?-1:0}function zm(r,e,t){return r.some(n=>n[e]===t)}function Km(r,e){return Number(String(r).slice(0,-e)+"9".repeat(e))}function Ym(r,e){return r-r%Math.pow(10,e)}function Xm(r){let[e=0,t=""]=r;return t||e>1?`{${e+(t?","+t:"")}}`:""}function WP(r,e,t){return`[${r}${e-r===1?"":"-"}${e}]`}function Qm(r){return/^-?(0+)\d/.test(r)}function GP(r,e,t){if(!e.isPadded)return r;let n=Math.abs(e.maxLen-String(r).length),i=t.relaxZeros!==!1;switch(n){case 0:return"";case 1:return i?"0?":"0";case 2:return i?"0{0,2}":"00";default:return i?`0{0,${n}}`:`0{${n}}`}}Ar.cache={};Ar.clearCache=()=>Ar.cache={};Zm.exports=Ar});var kc=k((cA,ah)=>{"use strict";var UP=require("util"),rh=eh(),th=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),VP=r=>e=>r===!0?Number(e):String(e),xc=r=>typeof r=="number"||typeof r=="string"&&r!=="",hi=r=>Number.isInteger(+r),Cc=r=>{let e=`${r}`,t=-1;if(e[0]==="-"&&(e=e.slice(1)),e==="0")return!1;for(;e[++t]==="0";);return t>0},qP=(r,e,t)=>typeof r=="string"||typeof e=="string"?!0:t.stringify===!0,JP=(r,e,t)=>{if(e>0){let n=r[0]==="-"?"-":"";n&&(r=r.slice(1)),r=n+r.padStart(n?e-1:e,"0")}return t===!1?String(r):r},Ro=(r,e)=>{let t=r[0]==="-"?"-":"";for(t&&(r=r.slice(1),e--);r.length<e;)r="0"+r;return t?"-"+r:r},zP=(r,e,t)=>{r.negatives.sort((a,l)=>a<l?-1:a>l?1:0),r.positives.sort((a,l)=>a<l?-1:a>l?1:0);let n=e.capture?"":"?:",i="",s="",o;return r.positives.length&&(i=r.positives.map(a=>Ro(String(a),t)).join("|")),r.negatives.length&&(s=`-(${n}${r.negatives.map(a=>Ro(String(a),t)).join("|")})`),i&&s?o=`${i}|${s}`:o=i||s,e.wrap?`(${n}${o})`:o},nh=(r,e,t,n)=>{if(t)return rh(r,e,{wrap:!1,...n});let i=String.fromCharCode(r);if(r===e)return i;let s=String.fromCharCode(e);return`[${i}-${s}]`},ih=(r,e,t)=>{if(Array.isArray(r)){let n=t.wrap===!0,i=t.capture?"":"?:";return n?`(${i}${r.join("|")})`:r.join("|")}return rh(r,e,t)},sh=(...r)=>new RangeError("Invalid range arguments: "+UP.inspect(...r)),oh=(r,e,t)=>{if(t.strictRanges===!0)throw sh([r,e]);return[]},KP=(r,e)=>{if(e.strictRanges===!0)throw new TypeError(`Expected step "${r}" to be a number`);return[]},YP=(r,e,t=1,n={})=>{let i=Number(r),s=Number(e);if(!Number.isInteger(i)||!Number.isInteger(s)){if(n.strictRanges===!0)throw sh([r,e]);return[]}i===0&&(i=0),s===0&&(s=0);let o=i>s,a=String(r),l=String(e),c=String(t);t=Math.max(Math.abs(t),1);let u=Cc(a)||Cc(l)||Cc(c),d=u?Math.max(a.length,l.length,c.length):0,p=u===!1&&qP(r,e,n)===!1,f=n.transform||VP(p);if(n.toRegex&&t===1)return nh(Ro(r,d),Ro(e,d),!0,n);let h={negatives:[],positives:[]},g=S=>h[S<0?"negatives":"positives"].push(Math.abs(S)),y=[],b=0;for(;o?i>=s:i<=s;)n.toRegex===!0&&t>1?g(i):y.push(JP(f(i,b),d,p)),i=o?i-t:i+t,b++;return n.toRegex===!0?t>1?zP(h,n,d):ih(y,null,{wrap:!1,...n}):y},XP=(r,e,t=1,n={})=>{if(!hi(r)&&r.length>1||!hi(e)&&e.length>1)return oh(r,e,n);let i=n.transform||(p=>String.fromCharCode(p)),s=`${r}`.charCodeAt(0),o=`${e}`.charCodeAt(0),a=s>o,l=Math.min(s,o),c=Math.max(s,o);if(n.toRegex&&t===1)return nh(l,c,!1,n);let u=[],d=0;for(;a?s>=o:s<=o;)u.push(i(s,d)),s=a?s-t:s+t,d++;return n.toRegex===!0?ih(u,null,{wrap:!1,options:n}):u},Io=(r,e,t,n={})=>{if(e==null&&xc(r))return[r];if(!xc(r)||!xc(e))return oh(r,e,n);if(typeof t=="function")return Io(r,e,1,{transform:t});if(th(t))return Io(r,e,0,t);let i={...n};return i.capture===!0&&(i.wrap=!0),t=t||i.step||1,hi(t)?hi(r)&&hi(e)?YP(r,e,t,i):XP(r,e,Math.max(Math.abs(t),1),i):t!=null&&!th(t)?KP(t,i):Io(r,e,1,t)};ah.exports=Io});var uh=k((uA,ch)=>{"use strict";var QP=kc(),lh=ko(),ZP=(r,e={})=>{let t=(n,i={})=>{let s=lh.isInvalidBrace(i),o=n.invalid===!0&&e.escapeInvalid===!0,a=s===!0||o===!0,l=e.escapeInvalid===!0?"\\":"",c="";if(n.isOpen===!0)return l+n.value;if(n.isClose===!0)return console.log("node.isClose",l,n.value),l+n.value;if(n.type==="open")return a?l+n.value:"(";if(n.type==="close")return a?l+n.value:")";if(n.type==="comma")return n.prev.type==="comma"?"":a?n.value:"|";if(n.value)return n.value;if(n.nodes&&n.ranges>0){let u=lh.reduce(n.nodes),d=QP(...u,{...e,wrap:!1,toRegex:!0,strictZeros:!0});if(d.length!==0)return u.length>1&&d.length>1?`(${d})`:d}if(n.nodes)for(let u of n.nodes)c+=t(u,n);return c};return t(r)};ch.exports=ZP});var ph=k((dA,fh)=>{"use strict";var ev=kc(),dh=_o(),dn=ko(),Or=(r="",e="",t=!1)=>{let n=[];if(r=[].concat(r),e=[].concat(e),!e.length)return r;if(!r.length)return t?dn.flatten(e).map(i=>`{${i}}`):e;for(let i of r)if(Array.isArray(i))for(let s of i)n.push(Or(s,e,t));else for(let s of e)t===!0&&typeof s=="string"&&(s=`{${s}}`),n.push(Array.isArray(s)?Or(i,s,t):i+s);return dn.flatten(n)},tv=(r,e={})=>{let t=e.rangeLimit===void 0?1e3:e.rangeLimit,n=(i,s={})=>{i.queue=[];let o=s,a=s.queue;for(;o.type!=="brace"&&o.type!=="root"&&o.parent;)o=o.parent,a=o.queue;if(i.invalid||i.dollar){a.push(Or(a.pop(),dh(i,e)));return}if(i.type==="brace"&&i.invalid!==!0&&i.nodes.length===2){a.push(Or(a.pop(),["{}"]));return}if(i.nodes&&i.ranges>0){let d=dn.reduce(i.nodes);if(dn.exceedsLimit(...d,e.step,t))throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");let p=ev(...d,e);p.length===0&&(p=dh(i,e)),a.push(Or(a.pop(),p)),i.nodes=[];return}let l=dn.encloseBrace(i),c=i.queue,u=i;for(;u.type!=="brace"&&u.type!=="root"&&u.parent;)u=u.parent,c=u.queue;for(let d=0;d<i.nodes.length;d++){let p=i.nodes[d];if(p.type==="comma"&&i.type==="brace"){d===1&&c.push(""),c.push("");continue}if(p.type==="close"){a.push(Or(a.pop(),c,l));continue}if(p.value&&p.type!=="open"){c.push(Or(c.pop(),p.value));continue}p.nodes&&n(p,i)}return c};return dn.flatten(n(r))};fh.exports=tv});var hh=k((fA,mh)=>{"use strict";mh.exports={MAX_LENGTH:1e4,CHAR_0:"0",CHAR_9:"9",CHAR_UPPERCASE_A:"A",CHAR_LOWERCASE_A:"a",CHAR_UPPERCASE_Z:"Z",CHAR_LOWERCASE_Z:"z",CHAR_LEFT_PARENTHESES:"(",CHAR_RIGHT_PARENTHESES:")",CHAR_ASTERISK:"*",CHAR_AMPERSAND:"&",CHAR_AT:"@",CHAR_BACKSLASH:"\\",CHAR_BACKTICK:"`",CHAR_CARRIAGE_RETURN:"\r",CHAR_CIRCUMFLEX_ACCENT:"^",CHAR_COLON:":",CHAR_COMMA:",",CHAR_DOLLAR:"$",CHAR_DOT:".",CHAR_DOUBLE_QUOTE:'"',CHAR_EQUAL:"=",CHAR_EXCLAMATION_MARK:"!",CHAR_FORM_FEED:"\f",CHAR_FORWARD_SLASH:"/",CHAR_HASH:"#",CHAR_HYPHEN_MINUS:"-",CHAR_LEFT_ANGLE_BRACKET:"<",CHAR_LEFT_CURLY_BRACE:"{",CHAR_LEFT_SQUARE_BRACKET:"[",CHAR_LINE_FEED:`
`,CHAR_NO_BREAK_SPACE:"\xA0",CHAR_PERCENT:"%",CHAR_PLUS:"+",CHAR_QUESTION_MARK:"?",CHAR_RIGHT_ANGLE_BRACKET:">",CHAR_RIGHT_CURLY_BRACE:"}",CHAR_RIGHT_SQUARE_BRACKET:"]",CHAR_SEMICOLON:";",CHAR_SINGLE_QUOTE:"'",CHAR_SPACE:" ",CHAR_TAB:"	",CHAR_UNDERSCORE:"_",CHAR_VERTICAL_LINE:"|",CHAR_ZERO_WIDTH_NOBREAK_SPACE:"\uFEFF"}});var wh=k((pA,Sh)=>{"use strict";var rv=_o(),{MAX_LENGTH:gh,CHAR_BACKSLASH:_c,CHAR_BACKTICK:nv,CHAR_COMMA:iv,CHAR_DOT:sv,CHAR_LEFT_PARENTHESES:ov,CHAR_RIGHT_PARENTHESES:av,CHAR_LEFT_CURLY_BRACE:lv,CHAR_RIGHT_CURLY_BRACE:cv,CHAR_LEFT_SQUARE_BRACKET:yh,CHAR_RIGHT_SQUARE_BRACKET:bh,CHAR_DOUBLE_QUOTE:uv,CHAR_SINGLE_QUOTE:dv,CHAR_NO_BREAK_SPACE:fv,CHAR_ZERO_WIDTH_NOBREAK_SPACE:pv}=hh(),mv=(r,e={})=>{if(typeof r!="string")throw new TypeError("Expected a string");let t=e||{},n=typeof t.maxLength=="number"?Math.min(gh,t.maxLength):gh;if(r.length>n)throw new SyntaxError(`Input length (${r.length}), exceeds max characters (${n})`);let i={type:"root",input:r,nodes:[]},s=[i],o=i,a=i,l=0,c=r.length,u=0,d=0,p,f=()=>r[u++],h=g=>{if(g.type==="text"&&a.type==="dot"&&(a.type="text"),a&&a.type==="text"&&g.type==="text"){a.value+=g.value;return}return o.nodes.push(g),g.parent=o,g.prev=a,a=g,g};for(h({type:"bos"});u<c;)if(o=s[s.length-1],p=f(),!(p===pv||p===fv)){if(p===_c){h({type:"text",value:(e.keepEscaping?p:"")+f()});continue}if(p===bh){h({type:"text",value:"\\"+p});continue}if(p===yh){l++;let g;for(;u<c&&(g=f());){if(p+=g,g===yh){l++;continue}if(g===_c){p+=f();continue}if(g===bh&&(l--,l===0))break}h({type:"text",value:p});continue}if(p===ov){o=h({type:"paren",nodes:[]}),s.push(o),h({type:"text",value:p});continue}if(p===av){if(o.type!=="paren"){h({type:"text",value:p});continue}o=s.pop(),h({type:"text",value:p}),o=s[s.length-1];continue}if(p===uv||p===dv||p===nv){let g=p,y;for(e.keepQuotes!==!0&&(p="");u<c&&(y=f());){if(y===_c){p+=y+f();continue}if(y===g){e.keepQuotes===!0&&(p+=y);break}p+=y}h({type:"text",value:p});continue}if(p===lv){d++;let y={type:"brace",open:!0,close:!1,dollar:a.value&&a.value.slice(-1)==="$"||o.dollar===!0,depth:d,commas:0,ranges:0,nodes:[]};o=h(y),s.push(o),h({type:"open",value:p});continue}if(p===cv){if(o.type!=="brace"){h({type:"text",value:p});continue}let g="close";o=s.pop(),o.close=!0,h({type:g,value:p}),d--,o=s[s.length-1];continue}if(p===iv&&d>0){if(o.ranges>0){o.ranges=0;let g=o.nodes.shift();o.nodes=[g,{type:"text",value:rv(o)}]}h({type:"comma",value:p}),o.commas++;continue}if(p===sv&&d>0&&o.commas===0){let g=o.nodes;if(d===0||g.length===0){h({type:"text",value:p});continue}if(a.type==="dot"){if(o.range=[],a.value+=p,a.type="range",o.nodes.length!==3&&o.nodes.length!==5){o.invalid=!0,o.ranges=0,a.type="text";continue}o.ranges++,o.args=[];continue}if(a.type==="range"){g.pop();let y=g[g.length-1];y.value+=a.value+p,a=y,o.ranges--;continue}h({type:"dot",value:p});continue}h({type:"text",value:p})}do if(o=s.pop(),o.type!=="root"){o.nodes.forEach(b=>{b.nodes||(b.type==="open"&&(b.isOpen=!0),b.type==="close"&&(b.isClose=!0),b.nodes||(b.type="text"),b.invalid=!0)});let g=s[s.length-1],y=g.nodes.indexOf(o);g.nodes.splice(y,1,...o.nodes)}while(s.length>0);return h({type:"eos"}),i};Sh.exports=mv});var Ph=k((mA,Th)=>{"use strict";var Eh=_o(),hv=uh(),gv=ph(),yv=wh(),nt=(r,e={})=>{let t=[];if(Array.isArray(r))for(let n of r){let i=nt.create(n,e);Array.isArray(i)?t.push(...i):t.push(i)}else t=[].concat(nt.create(r,e));return e&&e.expand===!0&&e.nodupes===!0&&(t=[...new Set(t)]),t};nt.parse=(r,e={})=>yv(r,e);nt.stringify=(r,e={})=>Eh(typeof r=="string"?nt.parse(r,e):r,e);nt.compile=(r,e={})=>(typeof r=="string"&&(r=nt.parse(r,e)),hv(r,e));nt.expand=(r,e={})=>{typeof r=="string"&&(r=nt.parse(r,e));let t=gv(r,e);return e.noempty===!0&&(t=t.filter(Boolean)),e.nodupes===!0&&(t=[...new Set(t)]),t};nt.create=(r,e={})=>r===""||r.length<3?[r]:e.expand!==!0?nt.compile(r,e):nt.expand(r,e);Th.exports=nt});var vh=k((hA,bv)=>{bv.exports=["3dm","3ds","3g2","3gp","7z","a","aac","adp","afdesign","afphoto","afpub","ai","aif","aiff","alz","ape","apk","appimage","ar","arj","asf","au","avi","bak","baml","bh","bin","bk","bmp","btif","bz2","bzip2","cab","caf","cgm","class","cmx","cpio","cr2","cur","dat","dcm","deb","dex","djvu","dll","dmg","dng","doc","docm","docx","dot","dotm","dra","DS_Store","dsk","dts","dtshd","dvb","dwg","dxf","ecelp4800","ecelp7470","ecelp9600","egg","eol","eot","epub","exe","f4v","fbs","fh","fla","flac","flatpak","fli","flv","fpx","fst","fvt","g3","gh","gif","graffle","gz","gzip","h261","h263","h264","icns","ico","ief","img","ipa","iso","jar","jpeg","jpg","jpgv","jpm","jxr","key","ktx","lha","lib","lvp","lz","lzh","lzma","lzo","m3u","m4a","m4v","mar","mdi","mht","mid","midi","mj2","mka","mkv","mmr","mng","mobi","mov","movie","mp3","mp4","mp4a","mpeg","mpg","mpga","mxu","nef","npx","numbers","nupkg","o","odp","ods","odt","oga","ogg","ogv","otf","ott","pages","pbm","pcx","pdb","pdf","pea","pgm","pic","png","pnm","pot","potm","potx","ppa","ppam","ppm","pps","ppsm","ppsx","ppt","pptm","pptx","psd","pya","pyc","pyo","pyv","qt","rar","ras","raw","resources","rgb","rip","rlc","rmf","rmvb","rpm","rtf","rz","s3m","s7z","scpt","sgi","shar","snap","sil","sketch","slk","smv","snk","so","stl","suo","sub","swf","tar","tbz","tbz2","tga","tgz","thmx","tif","tiff","tlz","ttc","ttf","txz","udf","uvh","uvi","uvm","uvp","uvs","uvu","viv","vob","war","wav","wax","wbmp","wdp","weba","webm","webp","whl","wim","wm","wma","wmv","wmx","woff","woff2","wrm","wvx","xbm","xif","xla","xlam","xls","xlsb","xlsm","xlsx","xlt","xltm","xltx","xm","xmind","xpi","xpm","xwd","xz","z","zip","zipx"]});var Ch=k((gA,xh)=>{xh.exports=vh()});var _h=k((yA,kh)=>{"use strict";var Sv=require("path"),wv=Ch(),Ev=new Set(wv);kh.exports=r=>Ev.has(Sv.extname(r).slice(1).toLowerCase())});var No=k(L=>{"use strict";var{sep:Tv}=require("path"),{platform:Ic}=process,Pv=require("os");L.EV_ALL="all";L.EV_READY="ready";L.EV_ADD="add";L.EV_CHANGE="change";L.EV_ADD_DIR="addDir";L.EV_UNLINK="unlink";L.EV_UNLINK_DIR="unlinkDir";L.EV_RAW="raw";L.EV_ERROR="error";L.STR_DATA="data";L.STR_END="end";L.STR_CLOSE="close";L.FSEVENT_CREATED="created";L.FSEVENT_MODIFIED="modified";L.FSEVENT_DELETED="deleted";L.FSEVENT_MOVED="moved";L.FSEVENT_CLONED="cloned";L.FSEVENT_UNKNOWN="unknown";L.FSEVENT_FLAG_MUST_SCAN_SUBDIRS=1;L.FSEVENT_TYPE_FILE="file";L.FSEVENT_TYPE_DIRECTORY="directory";L.FSEVENT_TYPE_SYMLINK="symlink";L.KEY_LISTENERS="listeners";L.KEY_ERR="errHandlers";L.KEY_RAW="rawEmitters";L.HANDLER_KEYS=[L.KEY_LISTENERS,L.KEY_ERR,L.KEY_RAW];L.DOT_SLASH=`.${Tv}`;L.BACK_SLASH_RE=/\\/g;L.DOUBLE_SLASH_RE=/\/\//;L.SLASH_OR_BACK_SLASH_RE=/[/\\]/;L.DOT_RE=/\..*\.(sw[px])$|~$|\.subl.*\.tmp/;L.REPLACER_RE=/^\.[/\\]/;L.SLASH="/";L.SLASH_SLASH="//";L.BRACE_START="{";L.BANG="!";L.ONE_DOT=".";L.TWO_DOTS="..";L.STAR="*";L.GLOBSTAR="**";L.ROOT_GLOBSTAR="/**/*";L.SLASH_GLOBSTAR="/**";L.DIR_SUFFIX="Dir";L.ANYMATCH_OPTS={dot:!0};L.STRING_TYPE="string";L.FUNCTION_TYPE="function";L.EMPTY_STR="";L.EMPTY_FN=()=>{};L.IDENTITY_FN=r=>r;L.isWindows=Ic==="win32";L.isMacos=Ic==="darwin";L.isLinux=Ic==="linux";L.isIBMi=Pv.type()==="OS400"});var Mh=k((SA,Oh)=>{"use strict";var zt=require("fs"),De=require("path"),{promisify:Si}=require("util"),vv=_h(),{isWindows:xv,isLinux:Cv,EMPTY_FN:kv,EMPTY_STR:_v,KEY_LISTENERS:fn,KEY_ERR:Rc,KEY_RAW:gi,HANDLER_KEYS:Iv,EV_CHANGE:Oo,EV_ADD:Ao,EV_ADD_DIR:Rv,EV_ERROR:Rh,STR_DATA:Nv,STR_END:Av,BRACE_START:Ov,STAR:Mv}=No(),Dv="watch",Lv=Si(zt.open),Nh=Si(zt.stat),$v=Si(zt.lstat),Bv=Si(zt.close),Nc=Si(zt.realpath),jv={lstat:$v,stat:Nh},Oc=(r,e)=>{r instanceof Set?r.forEach(e):e(r)},yi=(r,e,t)=>{let n=r[e];n instanceof Set||(r[e]=n=new Set([n])),n.add(t)},Fv=r=>e=>{let t=r[e];t instanceof Set?t.clear():delete r[e]},bi=(r,e,t)=>{let n=r[e];n instanceof Set?n.delete(t):n===t&&delete r[e]},Ah=r=>r instanceof Set?r.size===0:!r,Mo=new Map;function Ih(r,e,t,n,i){let s=(o,a)=>{t(r),i(o,a,{watchedPath:r}),a&&r!==a&&Do(De.resolve(r,a),fn,De.join(r,a))};try{return zt.watch(r,e,s)}catch(o){n(o)}}var Do=(r,e,t,n,i)=>{let s=Mo.get(r);s&&Oc(s[e],o=>{o(t,n,i)})},Hv=(r,e,t,n)=>{let{listener:i,errHandler:s,rawEmitter:o}=n,a=Mo.get(e),l;if(!t.persistent)return l=Ih(r,t,i,s,o),l.close.bind(l);if(a)yi(a,fn,i),yi(a,Rc,s),yi(a,gi,o);else{if(l=Ih(r,t,Do.bind(null,e,fn),s,Do.bind(null,e,gi)),!l)return;l.on(Rh,async c=>{let u=Do.bind(null,e,Rc);if(a.watcherUnusable=!0,xv&&c.code==="EPERM")try{let d=await Lv(r,"r");await Bv(d),u(c)}catch{}else u(c)}),a={listeners:i,errHandlers:s,rawEmitters:o,watcher:l},Mo.set(e,a)}return()=>{bi(a,fn,i),bi(a,Rc,s),bi(a,gi,o),Ah(a.listeners)&&(a.watcher.close(),Mo.delete(e),Iv.forEach(Fv(a)),a.watcher=void 0,Object.freeze(a))}},Ac=new Map,Wv=(r,e,t,n)=>{let{listener:i,rawEmitter:s}=n,o=Ac.get(e),a=new Set,l=new Set,c=o&&o.options;return c&&(c.persistent<t.persistent||c.interval>t.interval)&&(a=o.listeners,l=o.rawEmitters,zt.unwatchFile(e),o=void 0),o?(yi(o,fn,i),yi(o,gi,s)):(o={listeners:i,rawEmitters:s,options:t,watcher:zt.watchFile(e,t,(u,d)=>{Oc(o.rawEmitters,f=>{f(Oo,e,{curr:u,prev:d})});let p=u.mtimeMs;(u.size!==d.size||p>d.mtimeMs||p===0)&&Oc(o.listeners,f=>f(r,u))})},Ac.set(e,o)),()=>{bi(o,fn,i),bi(o,gi,s),Ah(o.listeners)&&(Ac.delete(e),zt.unwatchFile(e),o.options=o.watcher=void 0,Object.freeze(o))}},Mc=class{constructor(e){this.fsw=e,this._boundHandleError=t=>e._handleError(t)}_watchWithNodeFs(e,t){let n=this.fsw.options,i=De.dirname(e),s=De.basename(e);this.fsw._getWatchedDir(i).add(s);let a=De.resolve(e),l={persistent:n.persistent};t||(t=kv);let c;return n.usePolling?(l.interval=n.enableBinaryInterval&&vv(s)?n.binaryInterval:n.interval,c=Wv(e,a,l,{listener:t,rawEmitter:this.fsw._emitRaw})):c=Hv(e,a,l,{listener:t,errHandler:this._boundHandleError,rawEmitter:this.fsw._emitRaw}),c}_handleFile(e,t,n){if(this.fsw.closed)return;let i=De.dirname(e),s=De.basename(e),o=this.fsw._getWatchedDir(i),a=t;if(o.has(s))return;let l=async(u,d)=>{if(this.fsw._throttle(Dv,e,5)){if(!d||d.mtimeMs===0)try{let p=await Nh(e);if(this.fsw.closed)return;let f=p.atimeMs,h=p.mtimeMs;(!f||f<=h||h!==a.mtimeMs)&&this.fsw._emit(Oo,e,p),Cv&&a.ino!==p.ino?(this.fsw._closeFile(u),a=p,this.fsw._addPathCloser(u,this._watchWithNodeFs(e,l))):a=p}catch{this.fsw._remove(i,s)}else if(o.has(s)){let p=d.atimeMs,f=d.mtimeMs;(!p||p<=f||f!==a.mtimeMs)&&this.fsw._emit(Oo,e,d),a=d}}},c=this._watchWithNodeFs(e,l);if(!(n&&this.fsw.options.ignoreInitial)&&this.fsw._isntIgnored(e)){if(!this.fsw._throttle(Ao,e,0))return;this.fsw._emit(Ao,e,t)}return c}async _handleSymlink(e,t,n,i){if(this.fsw.closed)return;let s=e.fullPath,o=this.fsw._getWatchedDir(t);if(!this.fsw.options.followSymlinks){this.fsw._incrReadyCount();let a;try{a=await Nc(n)}catch{return this.fsw._emitReady(),!0}return this.fsw.closed?void 0:(o.has(i)?this.fsw._symlinkPaths.get(s)!==a&&(this.fsw._symlinkPaths.set(s,a),this.fsw._emit(Oo,n,e.stats)):(o.add(i),this.fsw._symlinkPaths.set(s,a),this.fsw._emit(Ao,n,e.stats)),this.fsw._emitReady(),!0)}if(this.fsw._symlinkPaths.has(s))return!0;this.fsw._symlinkPaths.set(s,!0)}_handleRead(e,t,n,i,s,o,a){if(e=De.join(e,_v),!n.hasGlob&&(a=this.fsw._throttle("readdir",e,1e3),!a))return;let l=this.fsw._getWatchedDir(n.path),c=new Set,u=this.fsw._readdirp(e,{fileFilter:d=>n.filterPath(d),directoryFilter:d=>n.filterDir(d),depth:0}).on(Nv,async d=>{if(this.fsw.closed){u=void 0;return}let p=d.path,f=De.join(e,p);if(c.add(p),!(d.stats.isSymbolicLink()&&await this._handleSymlink(d,e,f,p))){if(this.fsw.closed){u=void 0;return}(p===i||!i&&!l.has(p))&&(this.fsw._incrReadyCount(),f=De.join(s,De.relative(s,f)),this._addToNodeFs(f,t,n,o+1))}}).on(Rh,this._boundHandleError);return new Promise(d=>u.once(Av,()=>{if(this.fsw.closed){u=void 0;return}let p=a?a.clear():!1;d(),l.getChildren().filter(f=>f!==e&&!c.has(f)&&(!n.hasGlob||n.filterPath({fullPath:De.resolve(e,f)}))).forEach(f=>{this.fsw._remove(e,f)}),u=void 0,p&&this._handleRead(e,!1,n,i,s,o,a)}))}async _handleDir(e,t,n,i,s,o,a){let l=this.fsw._getWatchedDir(De.dirname(e)),c=l.has(De.basename(e));!(n&&this.fsw.options.ignoreInitial)&&!s&&!c&&(!o.hasGlob||o.globFilter(e))&&this.fsw._emit(Rv,e,t),l.add(De.basename(e)),this.fsw._getWatchedDir(e);let u,d,p=this.fsw.options.depth;if((p==null||i<=p)&&!this.fsw._symlinkPaths.has(a)){if(!s&&(await this._handleRead(e,n,o,s,e,i,u),this.fsw.closed))return;d=this._watchWithNodeFs(e,(f,h)=>{h&&h.mtimeMs===0||this._handleRead(f,!1,o,s,e,i,u)})}return d}async _addToNodeFs(e,t,n,i,s){let o=this.fsw._emitReady;if(this.fsw._isIgnored(e)||this.fsw.closed)return o(),!1;let a=this.fsw._getWatchHelpers(e,i);!a.hasGlob&&n&&(a.hasGlob=n.hasGlob,a.globFilter=n.globFilter,a.filterPath=l=>n.filterPath(l),a.filterDir=l=>n.filterDir(l));try{let l=await jv[a.statMethod](a.watchPath);if(this.fsw.closed)return;if(this.fsw._isIgnored(a.watchPath,l))return o(),!1;let c=this.fsw.options.followSymlinks&&!e.includes(Mv)&&!e.includes(Ov),u;if(l.isDirectory()){let d=De.resolve(e),p=c?await Nc(e):e;if(this.fsw.closed||(u=await this._handleDir(a.watchPath,l,t,i,s,a,p),this.fsw.closed))return;d!==p&&p!==void 0&&this.fsw._symlinkPaths.set(d,p)}else if(l.isSymbolicLink()){let d=c?await Nc(e):e;if(this.fsw.closed)return;let p=De.dirname(a.watchPath);if(this.fsw._getWatchedDir(p).add(a.watchPath),this.fsw._emit(Ao,a.watchPath,l),u=await this._handleDir(p,l,t,i,e,a,d),this.fsw.closed)return;d!==void 0&&this.fsw._symlinkPaths.set(De.resolve(e),d)}else u=this._handleFile(a.watchPath,l,t);return o(),this.fsw._addPathCloser(e,u),!1}catch(l){if(this.fsw._handleError(l))return o(),e}}};Oh.exports=Mc});var Hh=k((wA,Wc)=>{"use strict";var Fc=require("fs"),Le=require("path"),{promisify:Hc}=require("util"),pn;try{pn=require("fsevents")}catch(r){process.env.CHOKIDAR_PRINT_FSEVENTS_REQUIRE_ERROR&&console.error(r)}if(pn){let r=process.version.match(/v(\d+)\.(\d+)/);if(r&&r[1]&&r[2]){let e=Number.parseInt(r[1],10),t=Number.parseInt(r[2],10);e===8&&t<16&&(pn=void 0)}}var{EV_ADD:Dc,EV_CHANGE:Gv,EV_ADD_DIR:Dh,EV_UNLINK:Lo,EV_ERROR:Uv,STR_DATA:Vv,STR_END:qv,FSEVENT_CREATED:Jv,FSEVENT_MODIFIED:zv,FSEVENT_DELETED:Kv,FSEVENT_MOVED:Yv,FSEVENT_UNKNOWN:Xv,FSEVENT_FLAG_MUST_SCAN_SUBDIRS:Qv,FSEVENT_TYPE_FILE:Zv,FSEVENT_TYPE_DIRECTORY:wi,FSEVENT_TYPE_SYMLINK:Fh,ROOT_GLOBSTAR:Lh,DIR_SUFFIX:ex,DOT_SLASH:$h,FUNCTION_TYPE:Lc,EMPTY_FN:tx,IDENTITY_FN:rx}=No(),nx=r=>isNaN(r)?{}:{depth:r},Bc=Hc(Fc.stat),ix=Hc(Fc.lstat),Bh=Hc(Fc.realpath),sx={stat:Bc,lstat:ix},Mr=new Map,ox=10,ax=new Set([69888,70400,71424,72704,73472,131328,131840,262912]),lx=(r,e)=>({stop:pn.watch(r,e)});function cx(r,e,t,n){let i=Le.extname(e)?Le.dirname(e):e,s=Le.dirname(i),o=Mr.get(i);ux(s)&&(i=s);let a=Le.resolve(r),l=a!==e,c=(d,p,f)=>{l&&(d=d.replace(e,a)),(d===a||!d.indexOf(a+Le.sep))&&t(d,p,f)},u=!1;for(let d of Mr.keys())if(e.indexOf(Le.resolve(d)+Le.sep)===0){i=d,o=Mr.get(i),u=!0;break}return o||u?o.listeners.add(c):(o={listeners:new Set([c]),rawEmitter:n,watcher:lx(i,(d,p)=>{if(!o.listeners.size||p&Qv)return;let f=pn.getInfo(d,p);o.listeners.forEach(h=>{h(d,p,f)}),o.rawEmitter(f.event,d,f)})},Mr.set(i,o)),()=>{let d=o.listeners;if(d.delete(c),!d.size&&(Mr.delete(i),o.watcher))return o.watcher.stop().then(()=>{o.rawEmitter=o.watcher=void 0,Object.freeze(o)})}}var ux=r=>{let e=0;for(let t of Mr.keys())if(t.indexOf(r)===0&&(e++,e>=ox))return!0;return!1},dx=()=>pn&&Mr.size<128,$c=(r,e)=>{let t=0;for(;!r.indexOf(e)&&(r=Le.dirname(r))!==e;)t++;return t},jh=(r,e)=>r.type===wi&&e.isDirectory()||r.type===Fh&&e.isSymbolicLink()||r.type===Zv&&e.isFile(),jc=class{constructor(e){this.fsw=e}checkIgnored(e,t){let n=this.fsw._ignoredPaths;if(this.fsw._isIgnored(e,t))return n.add(e),t&&t.isDirectory()&&n.add(e+Lh),!0;n.delete(e),n.delete(e+Lh)}addOrChange(e,t,n,i,s,o,a,l){let c=s.has(o)?Gv:Dc;this.handleEvent(c,e,t,n,i,s,o,a,l)}async checkExists(e,t,n,i,s,o,a,l){try{let c=await Bc(e);if(this.fsw.closed)return;jh(a,c)?this.addOrChange(e,t,n,i,s,o,a,l):this.handleEvent(Lo,e,t,n,i,s,o,a,l)}catch(c){c.code==="EACCES"?this.addOrChange(e,t,n,i,s,o,a,l):this.handleEvent(Lo,e,t,n,i,s,o,a,l)}}handleEvent(e,t,n,i,s,o,a,l,c){if(!(this.fsw.closed||this.checkIgnored(t)))if(e===Lo){let u=l.type===wi;(u||o.has(a))&&this.fsw._remove(s,a,u)}else{if(e===Dc){if(l.type===wi&&this.fsw._getWatchedDir(t),l.type===Fh&&c.followSymlinks){let d=c.depth===void 0?void 0:$c(n,i)+1;return this._addToFsEvents(t,!1,!0,d)}this.fsw._getWatchedDir(s).add(a)}let u=l.type===wi?e+ex:e;this.fsw._emit(u,t),u===Dh&&this._addToFsEvents(t,!1,!0)}}_watchWithFsEvents(e,t,n,i){if(this.fsw.closed||this.fsw._isIgnored(e))return;let s=this.fsw.options,a=cx(e,t,async(l,c,u)=>{if(this.fsw.closed||s.depth!==void 0&&$c(l,t)>s.depth)return;let d=n(Le.join(e,Le.relative(e,l)));if(i&&!i(d))return;let p=Le.dirname(d),f=Le.basename(d),h=this.fsw._getWatchedDir(u.type===wi?d:p);if(ax.has(c)||u.event===Xv)if(typeof s.ignored===Lc){let g;try{g=await Bc(d)}catch{}if(this.fsw.closed||this.checkIgnored(d,g))return;jh(u,g)?this.addOrChange(d,l,t,p,h,f,u,s):this.handleEvent(Lo,d,l,t,p,h,f,u,s)}else this.checkExists(d,l,t,p,h,f,u,s);else switch(u.event){case Jv:case zv:return this.addOrChange(d,l,t,p,h,f,u,s);case Kv:case Yv:return this.checkExists(d,l,t,p,h,f,u,s)}},this.fsw._emitRaw);return this.fsw._emitReady(),a}async _handleFsEventsSymlink(e,t,n,i){if(!(this.fsw.closed||this.fsw._symlinkPaths.has(t))){this.fsw._symlinkPaths.set(t,!0),this.fsw._incrReadyCount();try{let s=await Bh(e);if(this.fsw.closed)return;if(this.fsw._isIgnored(s))return this.fsw._emitReady();this.fsw._incrReadyCount(),this._addToFsEvents(s||e,o=>{let a=e;return s&&s!==$h?a=o.replace(s,e):o!==$h&&(a=Le.join(e,o)),n(a)},!1,i)}catch(s){if(this.fsw._handleError(s))return this.fsw._emitReady()}}}emitAdd(e,t,n,i,s){let o=n(e),a=t.isDirectory(),l=this.fsw._getWatchedDir(Le.dirname(o)),c=Le.basename(o);a&&this.fsw._getWatchedDir(o),!l.has(c)&&(l.add(c),(!i.ignoreInitial||s===!0)&&this.fsw._emit(a?Dh:Dc,o,t))}initWatch(e,t,n,i){if(this.fsw.closed)return;let s=this._watchWithFsEvents(n.watchPath,Le.resolve(e||n.watchPath),i,n.globFilter);this.fsw._addPathCloser(t,s)}async _addToFsEvents(e,t,n,i){if(this.fsw.closed)return;let s=this.fsw.options,o=typeof t===Lc?t:rx,a=this.fsw._getWatchHelpers(e);try{let l=await sx[a.statMethod](a.watchPath);if(this.fsw.closed)return;if(this.fsw._isIgnored(a.watchPath,l))throw null;if(l.isDirectory()){if(a.globFilter||this.emitAdd(o(e),l,o,s,n),i&&i>s.depth)return;this.fsw._readdirp(a.watchPath,{fileFilter:c=>a.filterPath(c),directoryFilter:c=>a.filterDir(c),...nx(s.depth-(i||0))}).on(Vv,c=>{if(this.fsw.closed||c.stats.isDirectory()&&!a.filterPath(c))return;let u=Le.join(a.watchPath,c.path),{fullPath:d}=c;if(a.followSymlinks&&c.stats.isSymbolicLink()){let p=s.depth===void 0?void 0:$c(u,Le.resolve(a.watchPath))+1;this._handleFsEventsSymlink(u,d,o,p)}else this.emitAdd(u,c.stats,o,s,n)}).on(Uv,tx).on(qv,()=>{this.fsw._emitReady()})}else this.emitAdd(a.watchPath,l,o,s,n),this.fsw._emitReady()}catch(l){(!l||this.fsw._handleError(l))&&(this.fsw._emitReady(),this.fsw._emitReady())}if(s.persistent&&n!==!0)if(typeof t===Lc)this.initWatch(void 0,e,a,o);else{let l;try{l=await Bh(a.watchPath)}catch{}this.initWatch(l,e,a,o)}}};Wc.exports=jc;Wc.exports.canUse=dx});var Qh=k(nu=>{"use strict";var{EventEmitter:fx}=require("events"),tu=require("fs"),ie=require("path"),{promisify:zh}=require("util"),px=_m(),zc=Dm().default,mx=Hm(),Gc=Tc(),hx=Ph(),gx=wc(),yx=Mh(),Wh=Hh(),{EV_ALL:Uc,EV_READY:bx,EV_ADD:$o,EV_CHANGE:Ei,EV_UNLINK:Gh,EV_ADD_DIR:Sx,EV_UNLINK_DIR:wx,EV_RAW:Ex,EV_ERROR:Vc,STR_CLOSE:Tx,STR_END:Px,BACK_SLASH_RE:vx,DOUBLE_SLASH_RE:Uh,SLASH_OR_BACK_SLASH_RE:xx,DOT_RE:Cx,REPLACER_RE:kx,SLASH:qc,SLASH_SLASH:_x,BRACE_START:Ix,BANG:Kc,ONE_DOT:Kh,TWO_DOTS:Rx,GLOBSTAR:Nx,SLASH_GLOBSTAR:Jc,ANYMATCH_OPTS:Yc,STRING_TYPE:ru,FUNCTION_TYPE:Ax,EMPTY_STR:Xc,EMPTY_FN:Ox,isWindows:Mx,isMacos:Dx,isIBMi:Lx}=No(),$x=zh(tu.stat),Bx=zh(tu.readdir),Qc=(r=[])=>Array.isArray(r)?r:[r],Yh=(r,e=[])=>(r.forEach(t=>{Array.isArray(t)?Yh(t,e):e.push(t)}),e),Vh=r=>{let e=Yh(Qc(r));if(!e.every(t=>typeof t===ru))throw new TypeError(`Non-string provided as watch path: ${e}`);return e.map(Xh)},qh=r=>{let e=r.replace(vx,qc),t=!1;for(e.startsWith(_x)&&(t=!0);e.match(Uh);)e=e.replace(Uh,qc);return t&&(e=qc+e),e},Xh=r=>qh(ie.normalize(qh(r))),Jh=(r=Xc)=>e=>typeof e!==ru?e:Xh(ie.isAbsolute(e)?e:ie.join(r,e)),jx=(r,e)=>ie.isAbsolute(r)?r:r.startsWith(Kc)?Kc+ie.join(e,r.slice(1)):ie.join(e,r),Tt=(r,e)=>r[e]===void 0,Zc=class{constructor(e,t){this.path=e,this._removeWatcher=t,this.items=new Set}add(e){let{items:t}=this;t&&e!==Kh&&e!==Rx&&t.add(e)}async remove(e){let{items:t}=this;if(!t||(t.delete(e),t.size>0))return;let n=this.path;try{await Bx(n)}catch{this._removeWatcher&&this._removeWatcher(ie.dirname(n),ie.basename(n))}}has(e){let{items:t}=this;if(t)return t.has(e)}getChildren(){let{items:e}=this;if(e)return[...e.values()]}dispose(){this.items.clear(),delete this.path,delete this._removeWatcher,delete this.items,Object.freeze(this)}},Fx="stat",Hx="lstat",eu=class{constructor(e,t,n,i){this.fsw=i,this.path=e=e.replace(kx,Xc),this.watchPath=t,this.fullWatchPath=ie.resolve(t),this.hasGlob=t!==e,e===Xc&&(this.hasGlob=!1),this.globSymlink=this.hasGlob&&n?void 0:!1,this.globFilter=this.hasGlob?zc(e,void 0,Yc):!1,this.dirParts=this.getDirParts(e),this.dirParts.forEach(s=>{s.length>1&&s.pop()}),this.followSymlinks=n,this.statMethod=n?Fx:Hx}checkGlobSymlink(e){return this.globSymlink===void 0&&(this.globSymlink=e.fullParentDir===this.fullWatchPath?!1:{realPath:e.fullParentDir,linkPath:this.fullWatchPath}),this.globSymlink?e.fullPath.replace(this.globSymlink.realPath,this.globSymlink.linkPath):e.fullPath}entryPath(e){return ie.join(this.watchPath,ie.relative(this.watchPath,this.checkGlobSymlink(e)))}filterPath(e){let{stats:t}=e;if(t&&t.isSymbolicLink())return this.filterDir(e);let n=this.entryPath(e);return(this.hasGlob&&typeof this.globFilter===Ax?this.globFilter(n):!0)&&this.fsw._isntIgnored(n,t)&&this.fsw._hasReadPermissions(t)}getDirParts(e){if(!this.hasGlob)return[];let t=[];return(e.includes(Ix)?hx.expand(e):[e]).forEach(i=>{t.push(ie.relative(this.watchPath,i).split(xx))}),t}filterDir(e){if(this.hasGlob){let t=this.getDirParts(this.checkGlobSymlink(e)),n=!1;this.unmatchedGlob=!this.dirParts.some(i=>i.every((s,o)=>(s===Nx&&(n=!0),n||!t[0][o]||zc(s,t[0][o],Yc))))}return!this.unmatchedGlob&&this.fsw._isntIgnored(this.entryPath(e),e.stats)}},Bo=class extends fx{constructor(e){super();let t={};e&&Object.assign(t,e),this._watched=new Map,this._closers=new Map,this._ignoredPaths=new Set,this._throttled=new Map,this._symlinkPaths=new Map,this._streams=new Set,this.closed=!1,Tt(t,"persistent")&&(t.persistent=!0),Tt(t,"ignoreInitial")&&(t.ignoreInitial=!1),Tt(t,"ignorePermissionErrors")&&(t.ignorePermissionErrors=!1),Tt(t,"interval")&&(t.interval=100),Tt(t,"binaryInterval")&&(t.binaryInterval=300),Tt(t,"disableGlobbing")&&(t.disableGlobbing=!1),t.enableBinaryInterval=t.binaryInterval!==t.interval,Tt(t,"useFsEvents")&&(t.useFsEvents=!t.usePolling),Wh.canUse()||(t.useFsEvents=!1),Tt(t,"usePolling")&&!t.useFsEvents&&(t.usePolling=Dx),Lx&&(t.usePolling=!0);let i=process.env.CHOKIDAR_USEPOLLING;if(i!==void 0){let l=i.toLowerCase();l==="false"||l==="0"?t.usePolling=!1:l==="true"||l==="1"?t.usePolling=!0:t.usePolling=!!l}let s=process.env.CHOKIDAR_INTERVAL;s&&(t.interval=Number.parseInt(s,10)),Tt(t,"atomic")&&(t.atomic=!t.usePolling&&!t.useFsEvents),t.atomic&&(this._pendingUnlinks=new Map),Tt(t,"followSymlinks")&&(t.followSymlinks=!0),Tt(t,"awaitWriteFinish")&&(t.awaitWriteFinish=!1),t.awaitWriteFinish===!0&&(t.awaitWriteFinish={});let o=t.awaitWriteFinish;o&&(o.stabilityThreshold||(o.stabilityThreshold=2e3),o.pollInterval||(o.pollInterval=100),this._pendingWrites=new Map),t.ignored&&(t.ignored=Qc(t.ignored));let a=0;this._emitReady=()=>{a++,a>=this._readyCount&&(this._emitReady=Ox,this._readyEmitted=!0,process.nextTick(()=>this.emit(bx)))},this._emitRaw=(...l)=>this.emit(Ex,...l),this._readyEmitted=!1,this.options=t,t.useFsEvents?this._fsEventsHandler=new Wh(this):this._nodeFsHandler=new yx(this),Object.freeze(t)}add(e,t,n){let{cwd:i,disableGlobbing:s}=this.options;this.closed=!1;let o=Vh(e);return i&&(o=o.map(a=>{let l=jx(a,i);return s||!Gc(a)?l:gx(l)})),o=o.filter(a=>a.startsWith(Kc)?(this._ignoredPaths.add(a.slice(1)),!1):(this._ignoredPaths.delete(a),this._ignoredPaths.delete(a+Jc),this._userIgnored=void 0,!0)),this.options.useFsEvents&&this._fsEventsHandler?(this._readyCount||(this._readyCount=o.length),this.options.persistent&&(this._readyCount+=o.length),o.forEach(a=>this._fsEventsHandler._addToFsEvents(a))):(this._readyCount||(this._readyCount=0),this._readyCount+=o.length,Promise.all(o.map(async a=>{let l=await this._nodeFsHandler._addToNodeFs(a,!n,0,0,t);return l&&this._emitReady(),l})).then(a=>{this.closed||a.filter(l=>l).forEach(l=>{this.add(ie.dirname(l),ie.basename(t||l))})})),this}unwatch(e){if(this.closed)return this;let t=Vh(e),{cwd:n}=this.options;return t.forEach(i=>{!ie.isAbsolute(i)&&!this._closers.has(i)&&(n&&(i=ie.join(n,i)),i=ie.resolve(i)),this._closePath(i),this._ignoredPaths.add(i),this._watched.has(i)&&this._ignoredPaths.add(i+Jc),this._userIgnored=void 0}),this}close(){if(this.closed)return this._closePromise;this.closed=!0,this.removeAllListeners();let e=[];return this._closers.forEach(t=>t.forEach(n=>{let i=n();i instanceof Promise&&e.push(i)})),this._streams.forEach(t=>t.destroy()),this._userIgnored=void 0,this._readyCount=0,this._readyEmitted=!1,this._watched.forEach(t=>t.dispose()),["closers","watched","streams","symlinkPaths","throttled"].forEach(t=>{this[`_${t}`].clear()}),this._closePromise=e.length?Promise.all(e).then(()=>{}):Promise.resolve(),this._closePromise}getWatched(){let e={};return this._watched.forEach((t,n)=>{let i=this.options.cwd?ie.relative(this.options.cwd,n):n;e[i||Kh]=t.getChildren().sort()}),e}emitWithAll(e,t){this.emit(...t),e!==Vc&&this.emit(Uc,...t)}async _emit(e,t,n,i,s){if(this.closed)return;let o=this.options;Mx&&(t=ie.normalize(t)),o.cwd&&(t=ie.relative(o.cwd,t));let a=[e,t];s!==void 0?a.push(n,i,s):i!==void 0?a.push(n,i):n!==void 0&&a.push(n);let l=o.awaitWriteFinish,c;if(l&&(c=this._pendingWrites.get(t)))return c.lastChange=new Date,this;if(o.atomic){if(e===Gh)return this._pendingUnlinks.set(t,a),setTimeout(()=>{this._pendingUnlinks.forEach((u,d)=>{this.emit(...u),this.emit(Uc,...u),this._pendingUnlinks.delete(d)})},typeof o.atomic=="number"?o.atomic:100),this;e===$o&&this._pendingUnlinks.has(t)&&(e=a[0]=Ei,this._pendingUnlinks.delete(t))}if(l&&(e===$o||e===Ei)&&this._readyEmitted){let u=(d,p)=>{d?(e=a[0]=Vc,a[1]=d,this.emitWithAll(e,a)):p&&(a.length>2?a[2]=p:a.push(p),this.emitWithAll(e,a))};return this._awaitWriteFinish(t,l.stabilityThreshold,e,u),this}if(e===Ei&&!this._throttle(Ei,t,50))return this;if(o.alwaysStat&&n===void 0&&(e===$o||e===Sx||e===Ei)){let u=o.cwd?ie.join(o.cwd,t):t,d;try{d=await $x(u)}catch{}if(!d||this.closed)return;a.push(d)}return this.emitWithAll(e,a),this}_handleError(e){let t=e&&e.code;return e&&t!=="ENOENT"&&t!=="ENOTDIR"&&(!this.options.ignorePermissionErrors||t!=="EPERM"&&t!=="EACCES")&&this.emit(Vc,e),e||this.closed}_throttle(e,t,n){this._throttled.has(e)||this._throttled.set(e,new Map);let i=this._throttled.get(e),s=i.get(t);if(s)return s.count++,!1;let o,a=()=>{let c=i.get(t),u=c?c.count:0;return i.delete(t),clearTimeout(o),c&&clearTimeout(c.timeoutObject),u};o=setTimeout(a,n);let l={timeoutObject:o,clear:a,count:0};return i.set(t,l),l}_incrReadyCount(){return this._readyCount++}_awaitWriteFinish(e,t,n,i){let s,o=e;this.options.cwd&&!ie.isAbsolute(e)&&(o=ie.join(this.options.cwd,e));let a=new Date,l=c=>{tu.stat(o,(u,d)=>{if(u||!this._pendingWrites.has(e)){u&&u.code!=="ENOENT"&&i(u);return}let p=Number(new Date);c&&d.size!==c.size&&(this._pendingWrites.get(e).lastChange=p);let f=this._pendingWrites.get(e);p-f.lastChange>=t?(this._pendingWrites.delete(e),i(void 0,d)):s=setTimeout(l,this.options.awaitWriteFinish.pollInterval,d)})};this._pendingWrites.has(e)||(this._pendingWrites.set(e,{lastChange:a,cancelWait:()=>(this._pendingWrites.delete(e),clearTimeout(s),n)}),s=setTimeout(l,this.options.awaitWriteFinish.pollInterval))}_getGlobIgnored(){return[...this._ignoredPaths.values()]}_isIgnored(e,t){if(this.options.atomic&&Cx.test(e))return!0;if(!this._userIgnored){let{cwd:n}=this.options,i=this.options.ignored,s=i&&i.map(Jh(n)),o=Qc(s).filter(l=>typeof l===ru&&!Gc(l)).map(l=>l+Jc),a=this._getGlobIgnored().map(Jh(n)).concat(s,o);this._userIgnored=zc(a,void 0,Yc)}return this._userIgnored([e,t])}_isntIgnored(e,t){return!this._isIgnored(e,t)}_getWatchHelpers(e,t){let n=t||this.options.disableGlobbing||!Gc(e)?e:mx(e),i=this.options.followSymlinks;return new eu(e,n,i,this)}_getWatchedDir(e){this._boundRemove||(this._boundRemove=this._remove.bind(this));let t=ie.resolve(e);return this._watched.has(t)||this._watched.set(t,new Zc(t,this._boundRemove)),this._watched.get(t)}_hasReadPermissions(e){if(this.options.ignorePermissionErrors)return!0;let n=(e&&Number.parseInt(e.mode,10))&511;return!!(4&Number.parseInt(n.toString(8)[0],10))}_remove(e,t,n){let i=ie.join(e,t),s=ie.resolve(i);if(n=n??(this._watched.has(i)||this._watched.has(s)),!this._throttle("remove",i,100))return;!n&&!this.options.useFsEvents&&this._watched.size===1&&this.add(e,t,!0),this._getWatchedDir(i).getChildren().forEach(p=>this._remove(i,p));let l=this._getWatchedDir(e),c=l.has(t);l.remove(t),this._symlinkPaths.has(s)&&this._symlinkPaths.delete(s);let u=i;if(this.options.cwd&&(u=ie.relative(this.options.cwd,i)),this.options.awaitWriteFinish&&this._pendingWrites.has(u)&&this._pendingWrites.get(u).cancelWait()===$o)return;this._watched.delete(i),this._watched.delete(s);let d=n?wx:Gh;c&&!this._isIgnored(i)&&this._emit(d,i),this.options.useFsEvents||this._closePath(i)}_closePath(e){this._closeFile(e);let t=ie.dirname(e);this._getWatchedDir(t).remove(ie.basename(e))}_closeFile(e){let t=this._closers.get(e);t&&(t.forEach(n=>n()),this._closers.delete(e))}_addPathCloser(e,t){if(!t)return;let n=this._closers.get(e);n||(n=[],this._closers.set(e,n)),n.push(t)}_readdirp(e,t){if(this.closed)return;let n={type:Uc,alwaysStat:!0,lstat:!0,...t},i=px(e,n);return this._streams.add(i),i.once(Tx,()=>{i=void 0}),i.once(Px,()=>{i&&(this._streams.delete(i),i=void 0)}),i}};nu.FSWatcher=Bo;var Wx=(r,e)=>{let t=new Bo(e);return t.add(r),t};nu.watch=Wx});var Kt=k((_A,ig)=>{"use strict";var rg=["nodebuffer","arraybuffer","fragments"],ng=typeof Blob<"u";ng&&rg.push("blob");ig.exports={BINARY_TYPES:rg,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:ng,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var Ti=k((IA,Wo)=>{"use strict";var{EMPTY_BUFFER:Jx}=Kt(),iu=Buffer[Symbol.species];function zx(r,e){if(r.length===0)return Jx;if(r.length===1)return r[0];let t=Buffer.allocUnsafe(e),n=0;for(let i=0;i<r.length;i++){let s=r[i];t.set(s,n),n+=s.length}return n<e?new iu(t.buffer,t.byteOffset,n):t}function sg(r,e,t,n,i){for(let s=0;s<i;s++)t[n+s]=r[s]^e[s&3]}function og(r,e){for(let t=0;t<r.length;t++)r[t]^=e[t&3]}function Kx(r){return r.length===r.buffer.byteLength?r.buffer:r.buffer.slice(r.byteOffset,r.byteOffset+r.length)}function su(r){if(su.readOnly=!0,Buffer.isBuffer(r))return r;let e;return r instanceof ArrayBuffer?e=new iu(r):ArrayBuffer.isView(r)?e=new iu(r.buffer,r.byteOffset,r.byteLength):(e=Buffer.from(r),su.readOnly=!1),e}Wo.exports={concat:zx,mask:sg,toArrayBuffer:Kx,toBuffer:su,unmask:og};if(!process.env.WS_NO_BUFFER_UTIL)try{let r=require("bufferutil");Wo.exports.mask=function(e,t,n,i,s){s<48?sg(e,t,n,i,s):r.mask(e,t,n,i,s)},Wo.exports.unmask=function(e,t){e.length<32?og(e,t):r.unmask(e,t)}}catch{}});var cg=k((RA,lg)=>{"use strict";var ag=Symbol("kDone"),ou=Symbol("kRun"),au=class{constructor(e){this[ag]=()=>{this.pending--,this[ou]()},this.concurrency=e||1/0,this.jobs=[],this.pending=0}add(e){this.jobs.push(e),this[ou]()}[ou](){if(this.pending!==this.concurrency&&this.jobs.length){let e=this.jobs.shift();this.pending++,e(this[ag])}}};lg.exports=au});var yn=k((NA,pg)=>{"use strict";var Pi=require("zlib"),ug=Ti(),Yx=cg(),{kStatusCode:dg}=Kt(),Xx=Buffer[Symbol.species],Qx=Buffer.from([0,0,255,255]),Uo=Symbol("permessage-deflate"),Yt=Symbol("total-length"),hn=Symbol("callback"),mr=Symbol("buffers"),gn=Symbol("error"),Go,lu=class{constructor(e){if(this._options=e||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Go){let t=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Go=new Yx(t)}}static get extensionName(){return"permessage-deflate"}offer(){let e={};return this._options.serverNoContextTakeover&&(e.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(e.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(e.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?e.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(e.client_max_window_bits=!0),e}accept(e){return e=this.normalizeParams(e),this.params=this._isServer?this.acceptAsServer(e):this.acceptAsClient(e),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let e=this._deflate[hn];this._deflate.close(),this._deflate=null,e&&e(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(e){let t=this._options,n=e.find(i=>!(t.serverNoContextTakeover===!1&&i.server_no_context_takeover||i.server_max_window_bits&&(t.serverMaxWindowBits===!1||typeof t.serverMaxWindowBits=="number"&&t.serverMaxWindowBits>i.server_max_window_bits)||typeof t.clientMaxWindowBits=="number"&&!i.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return t.serverNoContextTakeover&&(n.server_no_context_takeover=!0),t.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof t.serverMaxWindowBits=="number"&&(n.server_max_window_bits=t.serverMaxWindowBits),typeof t.clientMaxWindowBits=="number"?n.client_max_window_bits=t.clientMaxWindowBits:(n.client_max_window_bits===!0||t.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(e){let t=e[0];if(this._options.clientNoContextTakeover===!1&&t.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!t.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(t.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&t.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return t}normalizeParams(e){return e.forEach(t=>{Object.keys(t).forEach(n=>{let i=t[n];if(i.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(i=i[0],n==="client_max_window_bits"){if(i!==!0){let s=+i;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${i}`);i=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${i}`)}else if(n==="server_max_window_bits"){let s=+i;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${i}`);i=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(i!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${i}`)}else throw new Error(`Unknown parameter "${n}"`);t[n]=i})}),e}decompress(e,t,n){Go.add(i=>{this._decompress(e,t,(s,o)=>{i(),n(s,o)})})}compress(e,t,n){Go.add(i=>{this._compress(e,t,(s,o)=>{i(),n(s,o)})})}_decompress(e,t,n){let i=this._isServer?"client":"server";if(!this._inflate){let s=`${i}_max_window_bits`,o=typeof this.params[s]!="number"?Pi.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=Pi.createInflateRaw({...this._options.zlibInflateOptions,windowBits:o}),this._inflate[Uo]=this,this._inflate[Yt]=0,this._inflate[mr]=[],this._inflate.on("error",eC),this._inflate.on("data",fg)}this._inflate[hn]=n,this._inflate.write(e),t&&this._inflate.write(Qx),this._inflate.flush(()=>{let s=this._inflate[gn];if(s){this._inflate.close(),this._inflate=null,n(s);return}let o=ug.concat(this._inflate[mr],this._inflate[Yt]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Yt]=0,this._inflate[mr]=[],t&&this.params[`${i}_no_context_takeover`]&&this._inflate.reset()),n(null,o)})}_compress(e,t,n){let i=this._isServer?"server":"client";if(!this._deflate){let s=`${i}_max_window_bits`,o=typeof this.params[s]!="number"?Pi.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=Pi.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:o}),this._deflate[Yt]=0,this._deflate[mr]=[],this._deflate.on("data",Zx)}this._deflate[hn]=n,this._deflate.write(e),this._deflate.flush(Pi.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=ug.concat(this._deflate[mr],this._deflate[Yt]);t&&(s=new Xx(s.buffer,s.byteOffset,s.length-4)),this._deflate[hn]=null,this._deflate[Yt]=0,this._deflate[mr]=[],t&&this.params[`${i}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};pg.exports=lu;function Zx(r){this[mr].push(r),this[Yt]+=r.length}function fg(r){if(this[Yt]+=r.length,this[Uo]._maxPayload<1||this[Yt]<=this[Uo]._maxPayload){this[mr].push(r);return}this[gn]=new RangeError("Max payload size exceeded"),this[gn].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[gn][dg]=1009,this.removeListener("data",fg),this.reset()}function eC(r){if(this[Uo]._inflate=null,this[gn]){this[hn](this[gn]);return}r[dg]=1007,this[hn](r)}});var bn=k((AA,Vo)=>{"use strict";var{isUtf8:mg}=require("buffer"),{hasBlob:tC}=Kt(),rC=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function nC(r){return r>=1e3&&r<=1014&&r!==1004&&r!==1005&&r!==1006||r>=3e3&&r<=4999}function cu(r){let e=r.length,t=0;for(;t<e;)if((r[t]&128)===0)t++;else if((r[t]&224)===192){if(t+1===e||(r[t+1]&192)!==128||(r[t]&254)===192)return!1;t+=2}else if((r[t]&240)===224){if(t+2>=e||(r[t+1]&192)!==128||(r[t+2]&192)!==128||r[t]===224&&(r[t+1]&224)===128||r[t]===237&&(r[t+1]&224)===160)return!1;t+=3}else if((r[t]&248)===240){if(t+3>=e||(r[t+1]&192)!==128||(r[t+2]&192)!==128||(r[t+3]&192)!==128||r[t]===240&&(r[t+1]&240)===128||r[t]===244&&r[t+1]>143||r[t]>244)return!1;t+=4}else return!1;return!0}function iC(r){return tC&&typeof r=="object"&&typeof r.arrayBuffer=="function"&&typeof r.type=="string"&&typeof r.stream=="function"&&(r[Symbol.toStringTag]==="Blob"||r[Symbol.toStringTag]==="File")}Vo.exports={isBlob:iC,isValidStatusCode:nC,isValidUTF8:cu,tokenChars:rC};if(mg)Vo.exports.isValidUTF8=function(r){return r.length<24?cu(r):mg(r)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let r=require("utf-8-validate");Vo.exports.isValidUTF8=function(e){return e.length<32?cu(e):r(e)}}catch{}});var mu=k((OA,Eg)=>{"use strict";var{Writable:sC}=require("stream"),hg=yn(),{BINARY_TYPES:oC,EMPTY_BUFFER:gg,kStatusCode:aC,kWebSocket:lC}=Kt(),{concat:uu,toArrayBuffer:cC,unmask:uC}=Ti(),{isValidStatusCode:dC,isValidUTF8:yg}=bn(),qo=Buffer[Symbol.species],pt=0,bg=1,Sg=2,wg=3,du=4,fu=5,Jo=6,pu=class extends sC{constructor(e={}){super(),this._allowSynchronousEvents=e.allowSynchronousEvents!==void 0?e.allowSynchronousEvents:!0,this._binaryType=e.binaryType||oC[0],this._extensions=e.extensions||{},this._isServer=!!e.isServer,this._maxBufferedChunks=e.maxBufferedChunks|0,this._maxFragments=e.maxFragments|0,this._maxPayload=e.maxPayload|0,this._skipUTF8Validation=!!e.skipUTF8Validation,this[lC]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=pt}_write(e,t,n){if(this._opcode===8&&this._state==pt)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=e.length,this._buffers.push(e),this.startLoop(n)}consume(e){if(this._bufferedBytes-=e,e===this._buffers[0].length)return this._buffers.shift();if(e<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new qo(n.buffer,n.byteOffset+e,n.length-e),new qo(n.buffer,n.byteOffset,e)}let t=Buffer.allocUnsafe(e);do{let n=this._buffers[0],i=t.length-e;e>=n.length?t.set(this._buffers.shift(),i):(t.set(new Uint8Array(n.buffer,n.byteOffset,e),i),this._buffers[0]=new qo(n.buffer,n.byteOffset+e,n.length-e)),e-=n.length}while(e>0);return t}startLoop(e){this._loop=!0;do switch(this._state){case pt:this.getInfo(e);break;case bg:this.getPayloadLength16(e);break;case Sg:this.getPayloadLength64(e);break;case wg:this.getMask();break;case du:this.getData(e);break;case fu:case Jo:this._loop=!1;return}while(this._loop);this._errored||e()}getInfo(e){if(this._bufferedBytes<2){this._loop=!1;return}let t=this.consume(2);if((t[0]&48)!==0){let i=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");e(i);return}let n=(t[0]&64)===64;if(n&&!this._extensions[hg.extensionName]){let i=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");e(i);return}if(this._fin=(t[0]&128)===128,this._opcode=t[0]&15,this._payloadLength=t[1]&127,this._opcode===0){if(n){let i=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");e(i);return}if(!this._fragmented){let i=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");e(i);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let i=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");e(i);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let i=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");e(i);return}if(n){let i=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");e(i);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let i=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");e(i);return}}else{let i=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");e(i);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(t[1]&128)===128,this._isServer){if(!this._masked){let i=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");e(i);return}}else if(this._masked){let i=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");e(i);return}this._payloadLength===126?this._state=bg:this._payloadLength===127?this._state=Sg:this.haveLength(e)}getPayloadLength16(e){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(e)}getPayloadLength64(e){if(this._bufferedBytes<8){this._loop=!1;return}let t=this.consume(8),n=t.readUInt32BE(0);if(n>Math.pow(2,21)-1){let i=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");e(i);return}this._payloadLength=n*Math.pow(2,32)+t.readUInt32BE(4),this.haveLength(e)}haveLength(e){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let t=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");e(t);return}this._masked?this._state=wg:this._state=du}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=du}getData(e){let t=gg;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}t=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&uC(t,this._mask)}if(this._opcode>7){this.controlMessage(t,e);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");e(n);return}if(this._compressed){this._state=fu,this.decompress(t,e);return}t.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(t)),this.dataMessage(e)}decompress(e,t){this._extensions[hg.extensionName].decompress(e,this._fin,(i,s)=>{if(i)return t(i);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let o=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(o);return}this._fragments.push(s)}this.dataMessage(t),this._state===pt&&this.startLoop(t)})}dataMessage(e){if(!this._fin){this._state=pt;return}let t=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let i;this._binaryType==="nodebuffer"?i=uu(n,t):this._binaryType==="arraybuffer"?i=cC(uu(n,t)):this._binaryType==="blob"?i=new Blob(n):i=n,this._allowSynchronousEvents?(this.emit("message",i,!0),this._state=pt):(this._state=Jo,setImmediate(()=>{this.emit("message",i,!0),this._state=pt,this.startLoop(e)}))}else{let i=uu(n,t);if(!this._skipUTF8Validation&&!yg(i)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");e(s);return}this._state===fu||this._allowSynchronousEvents?(this.emit("message",i,!1),this._state=pt):(this._state=Jo,setImmediate(()=>{this.emit("message",i,!1),this._state=pt,this.startLoop(e)}))}}controlMessage(e,t){if(this._opcode===8){if(e.length===0)this._loop=!1,this.emit("conclude",1005,gg),this.end();else{let n=e.readUInt16BE(0);if(!dC(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");t(s);return}let i=new qo(e.buffer,e.byteOffset+2,e.length-2);if(!this._skipUTF8Validation&&!yg(i)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._loop=!1,this.emit("conclude",n,i),this.end()}this._state=pt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",e),this._state=pt):(this._state=Jo,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",e),this._state=pt,this.startLoop(t)}))}createError(e,t,n,i,s){this._loop=!1,this._errored=!0;let o=new e(n?`Invalid WebSocket frame: ${t}`:t);return Error.captureStackTrace(o,this.createError),o.code=s,o[aC]=i,o}};Eg.exports=pu});var yu=k((DA,vg)=>{"use strict";var{Duplex:MA}=require("stream"),{randomFillSync:fC}=require("crypto"),{types:{isUint8Array:pC}}=require("util"),Tg=yn(),{EMPTY_BUFFER:mC,kWebSocket:hC,NOOP:gC}=Kt(),{isBlob:Sn,isValidStatusCode:yC}=bn(),{mask:Pg,toBuffer:Dr}=Ti(),mt=Symbol("kByteLength"),bC=Buffer.alloc(4),zo=8*1024,Lr,wn=zo,Pt=0,SC=1,wC=2,hu=class r{constructor(e,t,n){this._extensions=t||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=e,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Pt,this.onerror=gC,this[hC]=void 0}static frame(e,t){let n,i=!1,s=2,o=!1;t.mask&&(n=t.maskBuffer||bC,t.generateMask?t.generateMask(n):(wn===zo&&(Lr===void 0&&(Lr=Buffer.alloc(zo)),fC(Lr,0,zo),wn=0),n[0]=Lr[wn++],n[1]=Lr[wn++],n[2]=Lr[wn++],n[3]=Lr[wn++]),o=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof e=="string"?(!t.mask||o)&&t[mt]!==void 0?a=t[mt]:(e=Buffer.from(e),a=e.length):(a=e.length,i=t.mask&&t.readOnly&&!o);let l=a;a>=65536?(s+=8,l=127):a>125&&(s+=2,l=126);let c=Buffer.allocUnsafe(i?a+s:s);return c[0]=t.fin?t.opcode|128:t.opcode,t.rsv1&&(c[0]|=64),c[1]=l,l===126?c.writeUInt16BE(a,2):l===127&&(c[2]=c[3]=0,c.writeUIntBE(a,4,6)),t.mask?(c[1]|=128,c[s-4]=n[0],c[s-3]=n[1],c[s-2]=n[2],c[s-1]=n[3],o?[c,e]:i?(Pg(e,n,c,s,a),[c]):(Pg(e,n,e,0,a),[c,e])):[c,e]}close(e,t,n,i){let s;if(e===void 0)s=mC;else{if(typeof e!="number"||!yC(e))throw new TypeError("First argument must be a valid error code number");if(t===void 0||!t.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(e,0);else{let a=Buffer.byteLength(t);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(e,0),typeof t=="string")s.write(t,2);else if(pC(t))s.set(t,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let o={[mt]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Pt?this.enqueue([this.dispatch,s,!1,o,i]):this.sendFrame(r.frame(s,o),i)}ping(e,t,n){let i,s;if(typeof e=="string"?(i=Buffer.byteLength(e),s=!1):Sn(e)?(i=e.size,s=!1):(e=Dr(e),i=e.length,s=Dr.readOnly),i>125)throw new RangeError("The data size must not be greater than 125 bytes");let o={[mt]:i,fin:!0,generateMask:this._generateMask,mask:t,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};Sn(e)?this._state!==Pt?this.enqueue([this.getBlobData,e,!1,o,n]):this.getBlobData(e,!1,o,n):this._state!==Pt?this.enqueue([this.dispatch,e,!1,o,n]):this.sendFrame(r.frame(e,o),n)}pong(e,t,n){let i,s;if(typeof e=="string"?(i=Buffer.byteLength(e),s=!1):Sn(e)?(i=e.size,s=!1):(e=Dr(e),i=e.length,s=Dr.readOnly),i>125)throw new RangeError("The data size must not be greater than 125 bytes");let o={[mt]:i,fin:!0,generateMask:this._generateMask,mask:t,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};Sn(e)?this._state!==Pt?this.enqueue([this.getBlobData,e,!1,o,n]):this.getBlobData(e,!1,o,n):this._state!==Pt?this.enqueue([this.dispatch,e,!1,o,n]):this.sendFrame(r.frame(e,o),n)}send(e,t,n){let i=this._extensions[Tg.extensionName],s=t.binary?2:1,o=t.compress,a,l;typeof e=="string"?(a=Buffer.byteLength(e),l=!1):Sn(e)?(a=e.size,l=!1):(e=Dr(e),a=e.length,l=Dr.readOnly),this._firstFragment?(this._firstFragment=!1,o&&i&&i.params[i._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(o=a>=i._threshold),this._compress=o):(o=!1,s=0),t.fin&&(this._firstFragment=!0);let c={[mt]:a,fin:t.fin,generateMask:this._generateMask,mask:t.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:l,rsv1:o};Sn(e)?this._state!==Pt?this.enqueue([this.getBlobData,e,this._compress,c,n]):this.getBlobData(e,this._compress,c,n):this._state!==Pt?this.enqueue([this.dispatch,e,this._compress,c,n]):this.dispatch(e,this._compress,c,n)}getBlobData(e,t,n,i){this._bufferedBytes+=n[mt],this._state=wC,e.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(gu,this,a,i);return}this._bufferedBytes-=n[mt];let o=Dr(s);t?this.dispatch(o,t,n,i):(this._state=Pt,this.sendFrame(r.frame(o,n),i),this.dequeue())}).catch(s=>{process.nextTick(EC,this,s,i)})}dispatch(e,t,n,i){if(!t){this.sendFrame(r.frame(e,n),i);return}let s=this._extensions[Tg.extensionName];this._bufferedBytes+=n[mt],this._state=SC,s.compress(e,n.fin,(o,a)=>{if(this._socket.destroyed){let l=new Error("The socket was closed while data was being compressed");gu(this,l,i);return}this._bufferedBytes-=n[mt],this._state=Pt,n.readOnly=!1,this.sendFrame(r.frame(a,n),i),this.dequeue()})}dequeue(){for(;this._state===Pt&&this._queue.length;){let e=this._queue.shift();this._bufferedBytes-=e[3][mt],Reflect.apply(e[0],this,e.slice(1))}}enqueue(e){this._bufferedBytes+=e[3][mt],this._queue.push(e)}sendFrame(e,t){e.length===2?(this._socket.cork(),this._socket.write(e[0]),this._socket.write(e[1],t),this._socket.uncork()):this._socket.write(e[0],t)}};vg.exports=hu;function gu(r,e,t){typeof t=="function"&&t(e);for(let n=0;n<r._queue.length;n++){let i=r._queue[n],s=i[i.length-1];typeof s=="function"&&s(e)}}function EC(r,e,t){gu(r,e,t),r.onerror(e)}});var Og=k((LA,Ag)=>{"use strict";var{kForOnEventAttribute:vi,kListener:bu}=Kt(),xg=Symbol("kCode"),Cg=Symbol("kData"),kg=Symbol("kError"),_g=Symbol("kMessage"),Ig=Symbol("kReason"),En=Symbol("kTarget"),Rg=Symbol("kType"),Ng=Symbol("kWasClean"),Xt=class{constructor(e){this[En]=null,this[Rg]=e}get target(){return this[En]}get type(){return this[Rg]}};Object.defineProperty(Xt.prototype,"target",{enumerable:!0});Object.defineProperty(Xt.prototype,"type",{enumerable:!0});var $r=class extends Xt{constructor(e,t={}){super(e),this[xg]=t.code===void 0?0:t.code,this[Ig]=t.reason===void 0?"":t.reason,this[Ng]=t.wasClean===void 0?!1:t.wasClean}get code(){return this[xg]}get reason(){return this[Ig]}get wasClean(){return this[Ng]}};Object.defineProperty($r.prototype,"code",{enumerable:!0});Object.defineProperty($r.prototype,"reason",{enumerable:!0});Object.defineProperty($r.prototype,"wasClean",{enumerable:!0});var Tn=class extends Xt{constructor(e,t={}){super(e),this[kg]=t.error===void 0?null:t.error,this[_g]=t.message===void 0?"":t.message}get error(){return this[kg]}get message(){return this[_g]}};Object.defineProperty(Tn.prototype,"error",{enumerable:!0});Object.defineProperty(Tn.prototype,"message",{enumerable:!0});var xi=class extends Xt{constructor(e,t={}){super(e),this[Cg]=t.data===void 0?null:t.data}get data(){return this[Cg]}};Object.defineProperty(xi.prototype,"data",{enumerable:!0});var TC={addEventListener(r,e,t={}){for(let i of this.listeners(r))if(!t[vi]&&i[bu]===e&&!i[vi])return;let n;if(r==="message")n=function(s,o){let a=new xi("message",{data:o?s:s.toString()});a[En]=this,Ko(e,this,a)};else if(r==="close")n=function(s,o){let a=new $r("close",{code:s,reason:o.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[En]=this,Ko(e,this,a)};else if(r==="error")n=function(s){let o=new Tn("error",{error:s,message:s.message});o[En]=this,Ko(e,this,o)};else if(r==="open")n=function(){let s=new Xt("open");s[En]=this,Ko(e,this,s)};else return;n[vi]=!!t[vi],n[bu]=e,t.once?this.once(r,n):this.on(r,n)},removeEventListener(r,e){for(let t of this.listeners(r))if(t[bu]===e&&!t[vi]){this.removeListener(r,t);break}}};Ag.exports={CloseEvent:$r,ErrorEvent:Tn,Event:Xt,EventTarget:TC,MessageEvent:xi};function Ko(r,e,t){typeof r=="object"&&r.handleEvent?r.handleEvent.call(r,t):r.call(e,t)}});var Yo=k(($A,Mg)=>{"use strict";var{tokenChars:Ci}=bn();function $t(r,e,t){r[e]===void 0?r[e]=[t]:r[e].push(t)}function PC(r){let e=Object.create(null),t=Object.create(null),n=!1,i=!1,s=!1,o,a,l=-1,c=-1,u=-1,d=0;for(;d<r.length;d++)if(c=r.charCodeAt(d),o===void 0)if(u===-1&&Ci[c]===1)l===-1&&(l=d);else if(d!==0&&(c===32||c===9))u===-1&&l!==-1&&(u=d);else if(c===59||c===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${d}`);u===-1&&(u=d);let f=r.slice(l,u);c===44?($t(e,f,t),t=Object.create(null)):o=f,l=u=-1}else throw new SyntaxError(`Unexpected character at index ${d}`);else if(a===void 0)if(u===-1&&Ci[c]===1)l===-1&&(l=d);else if(c===32||c===9)u===-1&&l!==-1&&(u=d);else if(c===59||c===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${d}`);u===-1&&(u=d),$t(t,r.slice(l,u),!0),c===44&&($t(e,o,t),t=Object.create(null),o=void 0),l=u=-1}else if(c===61&&l!==-1&&u===-1)a=r.slice(l,d),l=u=-1;else throw new SyntaxError(`Unexpected character at index ${d}`);else if(i){if(Ci[c]!==1)throw new SyntaxError(`Unexpected character at index ${d}`);l===-1?l=d:n||(n=!0),i=!1}else if(s)if(Ci[c]===1)l===-1&&(l=d);else if(c===34&&l!==-1)s=!1,u=d;else if(c===92)i=!0;else throw new SyntaxError(`Unexpected character at index ${d}`);else if(c===34&&r.charCodeAt(d-1)===61)s=!0;else if(u===-1&&Ci[c]===1)l===-1&&(l=d);else if(l!==-1&&(c===32||c===9))u===-1&&(u=d);else if(c===59||c===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${d}`);u===-1&&(u=d);let f=r.slice(l,u);n&&(f=f.replace(/\\/g,""),n=!1),$t(t,a,f),c===44&&($t(e,o,t),t=Object.create(null),o=void 0),a=void 0,l=u=-1}else throw new SyntaxError(`Unexpected character at index ${d}`);if(l===-1||s||c===32||c===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=d);let p=r.slice(l,u);return o===void 0?$t(e,p,t):(a===void 0?$t(t,p,!0):n?$t(t,a,p.replace(/\\/g,"")):$t(t,a,p),$t(e,o,t)),e}function vC(r){return Object.keys(r).map(e=>{let t=r[e];return Array.isArray(t)||(t=[t]),t.map(n=>[e].concat(Object.keys(n).map(i=>{let s=n[i];return Array.isArray(s)||(s=[s]),s.map(o=>o===!0?i:`${i}=${o}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Mg.exports={format:vC,parse:PC}});var ea=k((FA,qg)=>{"use strict";var xC=require("events"),CC=require("https"),kC=require("http"),$g=require("net"),_C=require("tls"),{randomBytes:IC,createHash:RC}=require("crypto"),{Duplex:BA,Readable:jA}=require("stream"),{URL:Su}=require("url"),hr=yn(),NC=mu(),AC=yu(),{isBlob:OC}=bn(),{BINARY_TYPES:Dg,CLOSE_TIMEOUT:MC,EMPTY_BUFFER:Xo,GUID:DC,kForOnEventAttribute:wu,kListener:LC,kStatusCode:$C,kWebSocket:$e,NOOP:Bg}=Kt(),{EventTarget:{addEventListener:BC,removeEventListener:jC}}=Og(),{format:FC,parse:HC}=Yo(),{toBuffer:WC}=Ti(),jg=Symbol("kAborted"),Eu=[8,13],Qt=["CONNECTING","OPEN","CLOSING","CLOSED"],GC=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,he=class r extends xC{constructor(e,t,n){super(),this._binaryType=Dg[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Xo,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=r.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,e!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,t===void 0?t=[]:Array.isArray(t)||(typeof t=="object"&&t!==null?(n=t,t=[]):t=[t]),Fg(this,e,t,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(e){Dg.includes(e)&&(this._binaryType=e,this._receiver&&(this._receiver._binaryType=e))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(e,t,n){let i=new NC({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new AC(e,this._extensions,n.generateMask);this._receiver=i,this._sender=s,this._socket=e,i[$e]=this,s[$e]=this,e[$e]=this,i.on("conclude",qC),i.on("drain",JC),i.on("error",zC),i.on("message",KC),i.on("ping",YC),i.on("pong",XC),s.onerror=QC,e.setTimeout&&e.setTimeout(0),e.setNoDelay&&e.setNoDelay(),t.length>0&&e.unshift(t),e.on("close",Gg),e.on("data",Zo),e.on("end",Ug),e.on("error",Vg),this._readyState=r.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=r.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[hr.extensionName]&&this._extensions[hr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=r.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(e,t){if(this.readyState!==r.CLOSED){if(this.readyState===r.CONNECTING){it(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===r.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=r.CLOSING,this._sender.close(e,t,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),Wg(this)}}pause(){this.readyState===r.CONNECTING||this.readyState===r.CLOSED||(this._paused=!0,this._socket.pause())}ping(e,t,n){if(this.readyState===r.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof e=="function"?(n=e,e=t=void 0):typeof t=="function"&&(n=t,t=void 0),typeof e=="number"&&(e=e.toString()),this.readyState!==r.OPEN){Tu(this,e,n);return}t===void 0&&(t=!this._isServer),this._sender.ping(e||Xo,t,n)}pong(e,t,n){if(this.readyState===r.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof e=="function"?(n=e,e=t=void 0):typeof t=="function"&&(n=t,t=void 0),typeof e=="number"&&(e=e.toString()),this.readyState!==r.OPEN){Tu(this,e,n);return}t===void 0&&(t=!this._isServer),this._sender.pong(e||Xo,t,n)}resume(){this.readyState===r.CONNECTING||this.readyState===r.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(e,t,n){if(this.readyState===r.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"&&(n=t,t={}),typeof e=="number"&&(e=e.toString()),this.readyState!==r.OPEN){Tu(this,e,n);return}let i={binary:typeof e!="string",mask:!this._isServer,compress:!0,fin:!0,...t};this._extensions[hr.extensionName]||(i.compress=!1),this._sender.send(e||Xo,i,n)}terminate(){if(this.readyState!==r.CLOSED){if(this.readyState===r.CONNECTING){it(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=r.CLOSING,this._socket.destroy())}}};Object.defineProperty(he,"CONNECTING",{enumerable:!0,value:Qt.indexOf("CONNECTING")});Object.defineProperty(he.prototype,"CONNECTING",{enumerable:!0,value:Qt.indexOf("CONNECTING")});Object.defineProperty(he,"OPEN",{enumerable:!0,value:Qt.indexOf("OPEN")});Object.defineProperty(he.prototype,"OPEN",{enumerable:!0,value:Qt.indexOf("OPEN")});Object.defineProperty(he,"CLOSING",{enumerable:!0,value:Qt.indexOf("CLOSING")});Object.defineProperty(he.prototype,"CLOSING",{enumerable:!0,value:Qt.indexOf("CLOSING")});Object.defineProperty(he,"CLOSED",{enumerable:!0,value:Qt.indexOf("CLOSED")});Object.defineProperty(he.prototype,"CLOSED",{enumerable:!0,value:Qt.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(r=>{Object.defineProperty(he.prototype,r,{enumerable:!0})});["open","error","close","message"].forEach(r=>{Object.defineProperty(he.prototype,`on${r}`,{enumerable:!0,get(){for(let e of this.listeners(r))if(e[wu])return e[LC];return null},set(e){for(let t of this.listeners(r))if(t[wu]){this.removeListener(r,t);break}typeof e=="function"&&this.addEventListener(r,e,{[wu]:!0})}})});he.prototype.addEventListener=BC;he.prototype.removeEventListener=jC;qg.exports=he;function Fg(r,e,t,n){let i={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:MC,protocolVersion:Eu[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(r._autoPong=i.autoPong,r._closeTimeout=i.closeTimeout,!Eu.includes(i.protocolVersion))throw new RangeError(`Unsupported protocol version: ${i.protocolVersion} (supported versions: ${Eu.join(", ")})`);let s;if(e instanceof Su)s=e;else try{s=new Su(e)}catch{throw new SyntaxError(`Invalid URL: ${e}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),r._url=s.href;let o=s.protocol==="wss:",a=s.protocol==="ws+unix:",l;if(s.protocol!=="ws:"&&!o&&!a?l=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?l="The URL's pathname is empty":s.hash&&(l="The URL contains a fragment identifier"),l){let g=new SyntaxError(l);if(r._redirects===0)throw g;Qo(r,g);return}let c=o?443:80,u=IC(16).toString("base64"),d=o?CC.request:kC.request,p=new Set,f;if(i.createConnection=i.createConnection||(o?VC:UC),i.defaultPort=i.defaultPort||c,i.port=s.port||c,i.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,i.headers={...i.headers,"Sec-WebSocket-Version":i.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},i.path=s.pathname+s.search,i.timeout=i.handshakeTimeout,i.perMessageDeflate&&(f=new hr({...i.perMessageDeflate,isServer:!1,maxPayload:i.maxPayload}),i.headers["Sec-WebSocket-Extensions"]=FC({[hr.extensionName]:f.offer()})),t.length){for(let g of t){if(typeof g!="string"||!GC.test(g)||p.has(g))throw new SyntaxError("An invalid or duplicated subprotocol was specified");p.add(g)}i.headers["Sec-WebSocket-Protocol"]=t.join(",")}if(i.origin&&(i.protocolVersion<13?i.headers["Sec-WebSocket-Origin"]=i.origin:i.headers.Origin=i.origin),(s.username||s.password)&&(i.auth=`${s.username}:${s.password}`),a){let g=i.path.split(":");i.socketPath=g[0],i.path=g[1]}let h;if(i.followRedirects){if(r._redirects===0){r._originalIpc=a,r._originalSecure=o,r._originalHostOrSocketPath=a?i.socketPath:s.host;let g=n&&n.headers;if(n={...n,headers:{}},g)for(let[y,b]of Object.entries(g))n.headers[y.toLowerCase()]=b}else if(r.listenerCount("redirect")===0){let g=a?r._originalIpc?i.socketPath===r._originalHostOrSocketPath:!1:r._originalIpc?!1:s.host===r._originalHostOrSocketPath;(!g||r._originalSecure&&!o)&&(delete i.headers.authorization,delete i.headers.cookie,g||delete i.headers.host,i.auth=void 0)}i.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(i.auth).toString("base64")),h=r._req=d(i),r._redirects&&r.emit("redirect",r.url,h)}else h=r._req=d(i);i.timeout&&h.on("timeout",()=>{it(r,h,"Opening handshake has timed out")}),h.on("error",g=>{h===null||h[jg]||(h=r._req=null,Qo(r,g))}),h.on("response",g=>{let y=g.headers.location,b=g.statusCode;if(y&&i.followRedirects&&b>=300&&b<400){if(++r._redirects>i.maxRedirects){it(r,h,"Maximum redirects exceeded");return}h.abort();let S;try{S=new Su(y,e)}catch{let I=new SyntaxError(`Invalid URL: ${y}`);Qo(r,I);return}Fg(r,S,t,n)}else r.emit("unexpected-response",h,g)||it(r,h,`Unexpected server response: ${g.statusCode}`)}),h.on("upgrade",(g,y,b)=>{if(r.emit("upgrade",g),r.readyState!==he.CONNECTING)return;h=r._req=null;let S=g.headers.upgrade;if(S===void 0||S.toLowerCase()!=="websocket"){it(r,y,"Invalid Upgrade header");return}let E=RC("sha1").update(u+DC).digest("base64");if(g.headers["sec-websocket-accept"]!==E){it(r,y,"Invalid Sec-WebSocket-Accept header");return}let I=g.headers["sec-websocket-protocol"],O;if(I!==void 0?p.size?p.has(I)||(O="Server sent an invalid subprotocol"):O="Server sent a subprotocol but none was requested":p.size&&(O="Server sent no subprotocol"),O){it(r,y,O);return}I&&(r._protocol=I);let H=g.headers["sec-websocket-extensions"];if(H!==void 0){if(!f){it(r,y,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let W;try{W=HC(H)}catch{it(r,y,"Invalid Sec-WebSocket-Extensions header");return}let M=Object.keys(W);if(M.length!==1||M[0]!==hr.extensionName){it(r,y,"Server indicated an extension that was not requested");return}try{f.accept(W[hr.extensionName])}catch{it(r,y,"Invalid Sec-WebSocket-Extensions header");return}r._extensions[hr.extensionName]=f}r.setSocket(y,b,{allowSynchronousEvents:i.allowSynchronousEvents,generateMask:i.generateMask,maxBufferedChunks:i.maxBufferedChunks,maxFragments:i.maxFragments,maxPayload:i.maxPayload,skipUTF8Validation:i.skipUTF8Validation})}),i.finishRequest?i.finishRequest(h,r):h.end()}function Qo(r,e){r._readyState=he.CLOSING,r._errorEmitted=!0,r.emit("error",e),r.emitClose()}function UC(r){return r.path=r.socketPath,$g.connect(r)}function VC(r){return r.path=void 0,!r.servername&&r.servername!==""&&(r.servername=$g.isIP(r.host)?"":r.host),_C.connect(r)}function it(r,e,t){r._readyState=he.CLOSING;let n=new Error(t);Error.captureStackTrace(n,it),e.setHeader?(e[jg]=!0,e.abort(),e.socket&&!e.socket.destroyed&&e.socket.destroy(),process.nextTick(Qo,r,n)):(e.destroy(n),e.once("error",r.emit.bind(r,"error")),e.once("close",r.emitClose.bind(r)))}function Tu(r,e,t){if(e){let n=OC(e)?e.size:WC(e).length;r._socket?r._sender._bufferedBytes+=n:r._bufferedAmount+=n}if(t){let n=new Error(`WebSocket is not open: readyState ${r.readyState} (${Qt[r.readyState]})`);process.nextTick(t,n)}}function qC(r,e){let t=this[$e];t._closeFrameReceived=!0,t._closeMessage=e,t._closeCode=r,t._socket[$e]!==void 0&&(t._socket.removeListener("data",Zo),process.nextTick(Hg,t._socket),r===1005?t.close():t.close(r,e))}function JC(){let r=this[$e];r.isPaused||r._socket.resume()}function zC(r){let e=this[$e];e._socket[$e]!==void 0&&(e._socket.removeListener("data",Zo),process.nextTick(Hg,e._socket),e.close(r[$C])),e._errorEmitted||(e._errorEmitted=!0,e.emit("error",r))}function Lg(){this[$e].emitClose()}function KC(r,e){this[$e].emit("message",r,e)}function YC(r){let e=this[$e];e._autoPong&&e.pong(r,!this._isServer,Bg),e.emit("ping",r)}function XC(r){this[$e].emit("pong",r)}function Hg(r){r.resume()}function QC(r){let e=this[$e];e.readyState!==he.CLOSED&&(e.readyState===he.OPEN&&(e._readyState=he.CLOSING,Wg(e)),this._socket.end(),e._errorEmitted||(e._errorEmitted=!0,e.emit("error",r)))}function Wg(r){r._closeTimer=setTimeout(r._socket.destroy.bind(r._socket),r._closeTimeout)}function Gg(){let r=this[$e];if(this.removeListener("close",Gg),this.removeListener("data",Zo),this.removeListener("end",Ug),r._readyState=he.CLOSING,!this._readableState.endEmitted&&!r._closeFrameReceived&&!r._receiver._writableState.errorEmitted&&this._readableState.length!==0){let e=this.read(this._readableState.length);r._receiver.write(e)}r._receiver.end(),this[$e]=void 0,clearTimeout(r._closeTimer),r._receiver._writableState.finished||r._receiver._writableState.errorEmitted?r.emitClose():(r._receiver.on("error",Lg),r._receiver.on("finish",Lg))}function Zo(r){this[$e]._receiver.write(r)||this.pause()}function Ug(){let r=this[$e];r._readyState=he.CLOSING,r._receiver.end(),this.end()}function Vg(){let r=this[$e];this.removeListener("error",Vg),this.on("error",Bg),r&&(r._readyState=he.CLOSING,this.destroy())}});var Yg=k((WA,Kg)=>{"use strict";var HA=ea(),{Duplex:ZC}=require("stream");function Jg(r){r.emit("close")}function ek(){!this.destroyed&&this._writableState.finished&&this.destroy()}function zg(r){this.removeListener("error",zg),this.destroy(),this.listenerCount("error")===0&&this.emit("error",r)}function tk(r,e){let t=!0,n=new ZC({...e,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return r.on("message",function(s,o){let a=!o&&n._readableState.objectMode?s.toString():s;n.push(a)||r.pause()}),r.once("error",function(s){n.destroyed||(t=!1,n.destroy(s))}),r.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(i,s){if(r.readyState===r.CLOSED){s(i),process.nextTick(Jg,n);return}let o=!1;r.once("error",function(l){o=!0,s(l)}),r.once("close",function(){o||s(i),process.nextTick(Jg,n)}),t&&r.terminate()},n._final=function(i){if(r.readyState===r.CONNECTING){r.once("open",function(){n._final(i)});return}r._socket!==null&&(r._socket._writableState.finished?(i(),n._readableState.endEmitted&&n.destroy()):(r._socket.once("finish",function(){i()}),r.close()))},n._read=function(){r.isPaused&&r.resume()},n._write=function(i,s,o){if(r.readyState===r.CONNECTING){r.once("open",function(){n._write(i,s,o)});return}r.send(i,o)},n.on("end",ek),n.on("error",zg),n}Kg.exports=tk});var Pu=k((GA,Xg)=>{"use strict";var{tokenChars:rk}=bn();function nk(r){let e=new Set,t=-1,n=-1,i=0;for(i;i<r.length;i++){let o=r.charCodeAt(i);if(n===-1&&rk[o]===1)t===-1&&(t=i);else if(i!==0&&(o===32||o===9))n===-1&&t!==-1&&(n=i);else if(o===44){if(t===-1)throw new SyntaxError(`Unexpected character at index ${i}`);n===-1&&(n=i);let a=r.slice(t,n);if(e.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);e.add(a),t=n=-1}else throw new SyntaxError(`Unexpected character at index ${i}`)}if(t===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=r.slice(t,i);if(e.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return e.add(s),e}Xg.exports={parse:nk}});var iy=k((VA,ny)=>{"use strict";var ik=require("events"),ta=require("http"),{Duplex:UA}=require("stream"),{createHash:sk}=require("crypto"),Qg=Yo(),Br=yn(),ok=Pu(),ak=ea(),{CLOSE_TIMEOUT:lk,GUID:ck,kWebSocket:uk}=Kt(),dk=/^[+/0-9A-Za-z]{22}==$/,Zg=0,ey=1,ry=2,vu=class extends ik{constructor(e,t){if(super(),e={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:lk,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:ak,...e},e.port==null&&!e.server&&!e.noServer||e.port!=null&&(e.server||e.noServer)||e.server&&e.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(e.port!=null?(this._server=ta.createServer((n,i)=>{let s=ta.STATUS_CODES[426];i.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),i.end(s)}),this._server.listen(e.port,e.host,e.backlog,t)):e.server&&(this._server=e.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=fk(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(i,s,o)=>{this.handleUpgrade(i,s,o,n)}})}e.perMessageDeflate===!0&&(e.perMessageDeflate={}),e.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=e,this._state=Zg}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(e){if(this._state===ry){e&&this.once("close",()=>{e(new Error("The server is not running"))}),process.nextTick(ki,this);return}if(e&&this.once("close",e),this._state!==ey)if(this._state=ey,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(ki,this):process.nextTick(ki,this);else{let t=this._server;this._removeListeners(),this._removeListeners=this._server=null,t.close(()=>{ki(this)})}}shouldHandle(e){if(this.options.path){let t=e.url.indexOf("?");if((t!==-1?e.url.slice(0,t):e.url)!==this.options.path)return!1}return!0}handleUpgrade(e,t,n,i){t.on("error",ty);let s=e.headers["sec-websocket-key"],o=e.headers.upgrade,a=+e.headers["sec-websocket-version"];if(e.method!=="GET"){jr(this,e,t,405,"Invalid HTTP method");return}if(o===void 0||o.toLowerCase()!=="websocket"){jr(this,e,t,400,"Invalid Upgrade header");return}if(s===void 0||!dk.test(s)){jr(this,e,t,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){jr(this,e,t,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(e)){_i(t,400);return}let l=e.headers["sec-websocket-protocol"],c=new Set;if(l!==void 0)try{c=ok.parse(l)}catch{jr(this,e,t,400,"Invalid Sec-WebSocket-Protocol header");return}let u=e.headers["sec-websocket-extensions"],d={};if(this.options.perMessageDeflate&&u!==void 0){let p=new Br({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=Qg.parse(u);f[Br.extensionName]&&(p.accept(f[Br.extensionName]),d[Br.extensionName]=p)}catch{jr(this,e,t,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let p={origin:e.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(e.socket.authorized||e.socket.encrypted),req:e};if(this.options.verifyClient.length===2){this.options.verifyClient(p,(f,h,g,y)=>{if(!f)return _i(t,h||401,g,y);this.completeUpgrade(d,s,c,e,t,n,i)});return}if(!this.options.verifyClient(p))return _i(t,401)}this.completeUpgrade(d,s,c,e,t,n,i)}completeUpgrade(e,t,n,i,s,o,a){if(!s.readable||!s.writable)return s.destroy();if(s[uk])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>Zg)return _i(s,503);let c=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${sk("sha1").update(t+ck).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(n.size){let d=this.options.handleProtocols?this.options.handleProtocols(n,i):n.values().next().value;d&&(c.push(`Sec-WebSocket-Protocol: ${d}`),u._protocol=d)}if(e[Br.extensionName]){let d=e[Br.extensionName].params,p=Qg.format({[Br.extensionName]:[d]});c.push(`Sec-WebSocket-Extensions: ${p}`),u._extensions=e}this.emit("headers",c,i),s.write(c.concat(`\r
`).join(`\r
`)),s.removeListener("error",ty),u.setSocket(s,o,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(ki,this)})),a(u,i)}};ny.exports=vu;function fk(r,e){for(let t of Object.keys(e))r.on(t,e[t]);return function(){for(let n of Object.keys(e))r.removeListener(n,e[n])}}function ki(r){r._state=ry,r.emit("close")}function ty(){this.destroy()}function _i(r,e,t,n){t=t||ta.STATUS_CODES[e],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(t),...n},r.once("finish",r.destroy),r.end(`HTTP/1.1 ${e} ${ta.STATUS_CODES[e]}\r
`+Object.keys(n).map(i=>`${i}: ${n[i]}`).join(`\r
`)+`\r
\r
`+t)}function jr(r,e,t,n,i,s){if(r.listenerCount("wsClientError")){let o=new Error(i);Error.captureStackTrace(o,jr),r.emit("wsClientError",o,t,e)}else _i(t,n,i,s)}});function $k(r,e){let t=r.replace(/\/?$/,"/"),n=e.replace(/^\//,"");return t+n}async function jk(r){let e=new AbortController,t=setTimeout(()=>e.abort(),Bk);try{let n=await fetch(r,{redirect:"follow",signal:e.signal,headers:{"User-Agent":"realm-engine-ensure-rotmg-xml/1.0"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.arrayBuffer();return Buffer.from(i)}finally{clearTimeout(t)}}function Fk(r){if(r&&r.length>0)return r.map(t=>t.endsWith("/")?t:`${t}/`);let e=process.env.ROTMG_XML_BASE?.trim();return e?[e.endsWith("/")?e:`${e}/`]:[...Dk]}async function hy(r,e,t,n,i){let s=(0,Ii.resolve)(r,e.out);if((0,Bt.existsSync)(s)&&!n)return i?.("info",`${e.out} already present \u2014 skip`),!0;let o=[];for(let a of t)for(let l of e.candidates){let c=$k(a,l);try{let u=await jk(c);if(u.length<64){o.push(`${c}: response too small (${u.length} bytes)`);continue}return(0,Bt.mkdirSync)(r,{recursive:!0}),(0,Bt.writeFileSync)(s,u),i?.("info",`Downloaded ${e.out} (${u.length} bytes) <= ${c}`),!0}catch(u){o.push(`${c}: ${u.message}`)}}return i?.("error",`Failed to fetch ${e.out}:
  ${o.join(`
  `)}`),!1}async function ku(r,e={}){let{force:t=!1,full:n=!1,bases:i,log:s}=e,o=Fk(i);(0,Bt.mkdirSync)(r,{recursive:!0}),s?.("info",`Metadata XML bases: ${o.join(" | ")}`);for(let l of my){let c=(0,Ii.resolve)(r,l.out);if(!(t||!(0,Bt.existsSync)(c))){s?.("info",`${l.out} already present \u2014 skip`);continue}await hy(r,l,o,t,s)}if(n)for(let l of Lk){let c=(0,Ii.resolve)(r,l.out);if(!(t||!(0,Bt.existsSync)(c))){s?.("info",`${l.out} already present \u2014 skip`);continue}await hy(r,l,o,t,s)}let a=my.filter(l=>!(0,Bt.existsSync)((0,Ii.resolve)(r,l.out))).map(l=>l.out);return{ok:a.length===0,failed:a}}var Bt,Ii,Dk,my,Lk,Bk,_u=Ue(()=>{"use strict";Bt=require("fs"),Ii=require("path"),Dk=["https://rotmg-mirror.github.io/rotmg-metadata/assets/production/xml/","https://static.drips.pw/rotmg/production/current/xml/"],my=[{out:"enchantments.xml",candidates:["enchantments.xml","Enchantments.xml","enchants.xml"]}],Lk=[{out:"objects.xml",candidates:["objects.xml","Objects.xml"]},{out:"tiles.xml",candidates:["tiles.xml","Tiles.xml"]}];Bk=8e3});var gy=Ue(()=>{"use strict";X();$n()});function yy(){return(0,Iu.join)(process.env.USERPROFILE||(0,Ru.homedir)(),"Documents","Realmengine","data")}function xe(){return(0,Iu.join)(process.env.USERPROFILE||(0,Ru.homedir)(),"Documents","Realmengine")}var Iu,Ru,Hk,lO,Hr=Ue(()=>{"use strict";Iu=require("path"),Ru=require("os"),Hk=U(ln(),1);X();_u();gy();lO=10*6e4});function Ou(r){let e=0n;for(let t of r){if(typeof t!="number"||!Number.isFinite(t))continue;let n=Math.floor(t);n<0||n>4095||(e|=1n<<BigInt(n))}return e.toString()}function qk(r,e){return r==="none"||e<1?0:r==="spread-one-core"?1:r==="spread-two-cores"?Math.min(2,e):r==="spread-four-cores"?Math.min(4,e):0}function Jk(r,e,t){let n=r*Math.max(r,64);for(let i=0;i<n;i++){let s=t.cursor%r;if(t.cursor++,!(e&&r>1&&s===0))return s}return null}function zk(r,e,t,n){let i=Math.max(0,Math.min(Math.floor(e),r)),s=[];for(;s.length<i;){let o=Jk(r,t,n);if(o===null)break;s.push(o)}return s}function Kk(r){let e=t=>t==="active"?0:t==="background"?1:2;return[...r].sort((t,n)=>{let i=e(t.role)-e(n.role);return i!==0?i:t.seedPid-n.seedPid})}function vy(r,e,t,n,i){let s=Math.max(1,Math.floor(Number(t))||1),o=Math.max(0,Math.floor(n)),a=Kk(r),l={cursor:o},c=new Map;for(let u of a){let d=e[u.role]?.affinityStrategy??"spread-two-cores",p=qk(d,s);if(p<=0)continue;let f=zk(s,p,i,l);f.length&&c.set(u.seedPid,Ou(f))}return c}var Mu=Ue(()=>{"use strict"});function aa(){return(0,xy.join)(xe(),Yk)}function Xk(){return{version:Cy,parkedPids:[]}}function Ze(){let r=Xk(),e=aa();if(!(0,Zt.existsSync)(e))return r;try{let t=(0,Zt.readFileSync)(e,"utf8"),n=JSON.parse(t),i=Array.isArray(n.parkedPids)?n.parkedPids:[],s=[...new Set(i.map(o=>Math.floor(Number(o))).filter(o=>Number.isFinite(o)&&o>0))];return{...r,parkedPids:s}}catch{return r}}function jt(r){let e=Ze(),t={...e,...r,version:Cy,parkedPids:Array.isArray(r.parkedPids)?[...new Set(r.parkedPids.map(i=>Math.floor(Number(i))).filter(i=>Number.isFinite(i)&&i>0))]:e.parkedPids},n=xe();return(0,Zt.existsSync)(n)||(0,Zt.mkdirSync)(n,{recursive:!0}),(0,Zt.writeFileSync)(aa(),JSON.stringify(t,null,2),"utf8"),t}function Ai(r,e,t){return r.some(n=>t.has(n))?"parked":e!=null&&r.some(n=>n===e)?"active":"background"}var Zt,xy,Cy,Du,Yk,Pn=Ue(()=>{"use strict";Zt=require("fs"),xy=require("path");Hr();Cy=1,Du={active:{role:"active",priority:"AboveNormal",affinityStrategy:"spread-four-cores",trimEligible:!1,allowMinimize:!1},background:{role:"background",priority:"Normal",affinityStrategy:"spread-two-cores",trimEligible:!0,allowMinimize:!1},parked:{role:"parked",priority:"BelowNormal",affinityStrategy:"spread-one-core",trimEligible:!0,allowMinimize:!0}},Yk="exalt-client-roles.json"});function Qk(r){let e=Ze(),t=e.parkedPids.filter(s=>r.has(s)),n=[...e.parkedPids].sort((s,o)=>s-o),i=[...t].sort((s,o)=>s-o);return i.length!==n.length||JSON.stringify(i)!==JSON.stringify(n)?(jt({parkedPids:t}),new Set(t)):new Set(e.parkedPids.filter(s=>r.has(s)))}async function Oi(r){let e=await st(),t=e.processes||[],n=new Set(t.map(c=>c.pid));Qk(n);let i;r&&"foregroundPid"in r?i=r.foregroundPid??null:i=await er();let s;if(r?.parkedPids!=null){let c=r.parkedPids instanceof Set?[...r.parkedPids]:r.parkedPids;s=new Set(c.map(u=>Math.floor(Number(u))).filter(u=>u>0))}else{let c=Ze();s=new Set(c.parkedPids.filter(u=>n.has(u))),(c.parkedPids.length!==[...s].length||[...c.parkedPids].sort((u,d)=>u-d).join()!==[...s].sort((u,d)=>u-d).join())&&jt({parkedPids:[...s]})}let o=[...new Set(t.map(c=>c.pid))].sort((c,u)=>c-u),a=new Set,l=[];for(let c of o){if(a.has(c))continue;let u=await tr(c);for(let p of u)a.add(p);let d=Math.min(...u);l.push({seedPid:d,pids:u,role:Ai(u,i,s)})}return{clusters:l,foregroundPid:i,logicalProcessors:e.logicalProcessors}}async function la(r,e){if(!r.length)return new Map;let t=new Set(r.map(l=>l.pid)),n;e&&"foregroundPid"in e?n=e.foregroundPid??null:n=await er();let i;if(e?.parkedPids!=null){let l=e.parkedPids instanceof Set?[...e.parkedPids]:e.parkedPids;i=new Set(l.map(c=>Math.floor(Number(c))).filter(c=>c>0))}else{let l=Ze();i=new Set(l.parkedPids.filter(c=>t.has(c))),(l.parkedPids.length!==[...i].length||[...l.parkedPids].sort((c,u)=>c-u).join()!==[...i].sort((c,u)=>c-u).join())&&jt({parkedPids:[...i]})}let s=[...new Set(r.map(l=>l.pid))].sort((l,c)=>l-c),o=new Set,a=new Map;for(let l of s){if(o.has(l))continue;let c=await tr(l);for(let d of c)o.add(d);let u=Ai(c,n,i);for(let d of c)a.set(d,u)}return a}var ca=Ue(()=>{"use strict";Pn();gr()});function Lu(){return{version:Bu,tuningPreset:void 0,priorityPresetIdle:"Normal",priorityPresetHot:"AboveNormal",startupPowerGuid:void 0,powerGuidHot:"{8c5e7fda-e8bf-4a96-9a85-a6e23a635635}",powerGuidIdle:"{381b4222-f694-41f0-9685-ff5bb260df2e}",autoApplyOnProxyStart:!1,restoreProcessBaselineOnExit:!1,watchdog:{enabled:!1,cpuMetric:"normalized",cpuSumThreshold:25,cpuSumHotDebounceMs:5e3,cpuSumCoolDebounceMs:45e3,onHotSetPriorityHot:!0,onHotActivateHotPlan:!0,onHotSpreadCores:!1,onCoolSetPriorityIdle:!0,onCoolActivateIdlePlan:!0},thermal:{enabled:!1,pkgTempCelsiusThreshold:84,pkgTempCelsiusClear:80,sustainMs:45e3,clearMs:6e4,freqPctLowThreshold:65,freqPctClear:72,demoteBackgroundTo:"BelowNormal"}}}function Zk(r){let e=Lu();if(!r||typeof r!="object")return e;let t=r,n=c=>{let u=String(c||"");return _y.includes(u)?u:"Normal"},i=t.watchdog&&typeof t.watchdog=="object"?t.watchdog:{},s=typeof i.cpuSumThreshold=="number"&&Number.isFinite(i.cpuSumThreshold)?Math.max(0,i.cpuSumThreshold):e.watchdog.cpuSumThreshold,o=i.cpuMetric==="normalized"||i.cpuMetric==="raw"?i.cpuMetric:s>100?"raw":"normalized",a=new Set(["safe","balanced","multibox","aggressive","lowHeat"]);return{version:Bu,tuningPreset:(c=>{if(c==null||c==="")return;let u=String(c);return a.has(u)?u:void 0})(t.tuningPreset)??e.tuningPreset,priorityPresetIdle:n(t.priorityPresetIdle??t.priorityPreset),priorityPresetHot:n(t.priorityPresetHot),startupPowerGuid:t.startupPowerGuid!=null?String(t.startupPowerGuid)||void 0:e.startupPowerGuid,powerGuidHot:t.powerGuidHot!=null?String(t.powerGuidHot)||void 0:e.powerGuidHot,powerGuidIdle:t.powerGuidIdle!=null?String(t.powerGuidIdle)||void 0:e.powerGuidIdle,autoApplyOnProxyStart:typeof t.autoApplyOnProxyStart=="boolean"?t.autoApplyOnProxyStart:e.autoApplyOnProxyStart,restoreProcessBaselineOnExit:typeof t.restoreProcessBaselineOnExit=="boolean"?t.restoreProcessBaselineOnExit:e.restoreProcessBaselineOnExit,watchdog:{enabled:typeof i.enabled=="boolean"?i.enabled:typeof t.watchdogEnabled=="boolean"?!!t.watchdogEnabled:e.watchdog.enabled,cpuMetric:o,cpuSumThreshold:s,cpuSumHotDebounceMs:typeof i.cpuSumHotDebounceMs=="number"&&Number.isFinite(i.cpuSumHotDebounceMs)?Math.max(500,i.cpuSumHotDebounceMs):e.watchdog.cpuSumHotDebounceMs,cpuSumCoolDebounceMs:typeof i.cpuSumCoolDebounceMs=="number"&&Number.isFinite(i.cpuSumCoolDebounceMs)?Math.max(2e3,i.cpuSumCoolDebounceMs):e.watchdog.cpuSumCoolDebounceMs,onHotSetPriorityHot:typeof i.onHotSetPriorityHot=="boolean"?i.onHotSetPriorityHot:e.watchdog.onHotSetPriorityHot,onHotActivateHotPlan:typeof i.onHotActivateHotPlan=="boolean"?i.onHotActivateHotPlan:e.watchdog.onHotActivateHotPlan,onHotSpreadCores:typeof i.onHotSpreadCores=="boolean"?i.onHotSpreadCores:e.watchdog.onHotSpreadCores,onCoolSetPriorityIdle:typeof i.onCoolSetPriorityIdle=="boolean"?i.onCoolSetPriorityIdle:e.watchdog.onCoolSetPriorityIdle,onCoolActivateIdlePlan:typeof i.onCoolActivateIdlePlan=="boolean"?i.onCoolActivateIdlePlan:e.watchdog.onCoolActivateIdlePlan},thermal:e0(e.thermal,t.thermal)}}function e0(r,e){if(!e||typeof e!="object")return r;let t=e,n=(a,l)=>typeof a=="number"&&Number.isFinite(a)?a:l,i=t.freqPctLowThreshold===null?null:typeof t.freqPctLowThreshold=="number"&&Number.isFinite(t.freqPctLowThreshold)?t.freqPctLowThreshold:r.freqPctLowThreshold,s=t.freqPctClear===null?null:typeof t.freqPctClear=="number"&&Number.isFinite(t.freqPctClear)?t.freqPctClear:r.freqPctClear,o=a=>{let l=String(a||"");return _y.includes(l)?l:r.demoteBackgroundTo};return{enabled:typeof t.enabled=="boolean"?t.enabled:r.enabled,pkgTempCelsiusThreshold:n(t.pkgTempCelsiusThreshold,r.pkgTempCelsiusThreshold),pkgTempCelsiusClear:n(t.pkgTempCelsiusClear,r.pkgTempCelsiusClear),sustainMs:Math.max(3e3,n(t.sustainMs,r.sustainMs)),clearMs:Math.max(3e3,n(t.clearMs,r.clearMs)),freqPctLowThreshold:i,freqPctClear:s,demoteBackgroundTo:o(t.demoteBackgroundTo)}}function ju(){return(0,$u.join)(xe(),ky)}function et(){let r=xe(),e=(0,$u.join)(r,ky);try{if((0,vt.existsSync)(r)||(0,vt.mkdirSync)(r,{recursive:!0}),!(0,vt.existsSync)(e))return Lu();let t=JSON.parse((0,vt.readFileSync)(e,"utf8"));return Zk(t)}catch{return Lu()}}function vn(r){let e=et(),t={...e,...r,version:Bu,watchdog:{...e.watchdog,...r.watchdog??{}},thermal:r.thermal?{...e.thermal,...r.thermal}:e.thermal},n=xe(),i=ju();return(0,vt.existsSync)(n)||(0,vt.mkdirSync)(n,{recursive:!0}),(0,vt.writeFileSync)(i,JSON.stringify(t,null,2),"utf8"),t}var vt,$u,ky,Bu,_y,Mi=Ue(()=>{"use strict";vt=require("fs"),$u=require("path");Hr();ky="exalt-tune-settings.json",Bu=1,_y=["Idle","BelowNormal","Normal","AboveNormal","High"]});function t0(){return{version:Ry,proxy:{enabled:!1,checkIntervalMs:2e4,rssBytesThreshold:380*1024*1024,packetRateThreshold:450,minTrimIntervalMs:55e3,trimPackets:!0,trimPacketLab:!0,trimWorldSnapshot:!1,runGcHint:!0},exalt:{enabled:!1,checkIntervalMs:35e3,workingSetBytesPerProcessThreshold:Math.round(2.25*1024*1024*1024),periodicTrim:!1,minTrimIntervalMs:18e4,requireMemoryLoadPercent:85,maxCpuPercentForTrim:10,minWorkingSetBytesBeforeTrim:0,trimParentWs:!1,trimChildWs:!0,trimRolePolicy:{activeTrimEligible:!1,backgroundTrimEligible:!0,parkedTrimEligible:!0}}}}function ua(r){let e=t0();if(!r||typeof r!="object")return e;let t=r,n=t.proxy&&typeof t.proxy=="object"?t.proxy:{},i=t.exalt&&typeof t.exalt=="object"?t.exalt:{},s=(a,l)=>typeof a=="number"&&Number.isFinite(a)?a:l,o=(a,l)=>typeof a=="boolean"?a:l;return{version:Ry,proxy:{enabled:o(n.enabled,e.proxy.enabled),checkIntervalMs:Math.max(5e3,Math.floor(s(n.checkIntervalMs,e.proxy.checkIntervalMs))),rssBytesThreshold:Math.max(0,s(n.rssBytesThreshold,e.proxy.rssBytesThreshold)),packetRateThreshold:Math.max(0,s(n.packetRateThreshold,e.proxy.packetRateThreshold)),minTrimIntervalMs:Math.max(1e4,Math.floor(s(n.minTrimIntervalMs,e.proxy.minTrimIntervalMs))),trimPackets:o(n.trimPackets,e.proxy.trimPackets),trimPacketLab:o(n.trimPacketLab,e.proxy.trimPacketLab),trimWorldSnapshot:o(n.trimWorldSnapshot,e.proxy.trimWorldSnapshot),runGcHint:o(n.runGcHint,e.proxy.runGcHint)},exalt:{enabled:o(i.enabled,e.exalt.enabled),checkIntervalMs:Math.max(5e3,Math.floor(s(i.checkIntervalMs,e.exalt.checkIntervalMs))),workingSetBytesPerProcessThreshold:Math.max(0,s(i.workingSetBytesPerProcessThreshold,e.exalt.workingSetBytesPerProcessThreshold)),periodicTrim:o(i.periodicTrim,e.exalt.periodicTrim),minTrimIntervalMs:Math.max(6e4,Math.floor(s(i.minTrimIntervalMs,e.exalt.minTrimIntervalMs))),requireMemoryLoadPercent:Math.min(100,Math.max(0,s(i.requireMemoryLoadPercent,e.exalt.requireMemoryLoadPercent))),maxCpuPercentForTrim:Math.max(0,s(i.maxCpuPercentForTrim,e.exalt.maxCpuPercentForTrim)),minWorkingSetBytesBeforeTrim:Math.max(0,s(i.minWorkingSetBytesBeforeTrim,e.exalt.minWorkingSetBytesBeforeTrim)),trimParentWs:o(i.trimParentWs,e.exalt.trimParentWs),trimChildWs:o(i.trimChildWs,e.exalt.trimChildWs),trimRolePolicy:(()=>{let a=i.trimRolePolicy,l=e.exalt.trimRolePolicy??{activeTrimEligible:!1,backgroundTrimEligible:!0,parkedTrimEligible:!0};if(!a||typeof a!="object")return l;let c=a;return{activeTrimEligible:o(c.activeTrimEligible,l.activeTrimEligible),backgroundTrimEligible:o(c.backgroundTrimEligible,l.backgroundTrimEligible),parkedTrimEligible:o(c.parkedTrimEligible,l.parkedTrimEligible)}})()}}}function Hu(){return(0,Fu.join)(xe(),Iy)}function yr(){let r=xe(),e=(0,Fu.join)(r,Iy);try{return(0,xt.existsSync)(r)||(0,xt.mkdirSync)(r,{recursive:!0}),(0,xt.existsSync)(e)?ua(JSON.parse((0,xt.readFileSync)(e,"utf8"))):ua(void 0)}catch{return ua(void 0)}}function da(r){let e=yr(),t=ua({...e,...r,proxy:r.proxy?{...e.proxy,...r.proxy}:e.proxy,exalt:r.exalt?{...e.exalt,...r.exalt}:e.exalt}),n=xe();return(0,xt.existsSync)(n)||(0,xt.mkdirSync)(n,{recursive:!0}),(0,xt.writeFileSync)(Hu(),JSON.stringify(t,null,2),"utf8"),t}var xt,Fu,Iy,Ry,fa=Ue(()=>{"use strict";xt=require("fs"),Fu=require("path");Hr();Iy="smart-trim-settings.json",Ry=1});function n0(r,e){let t={...r};for(let n of r0){let i=e[n];i&&(t[n]={...t[n],...i,role:n})}return t}function xn(){let r=et().tuningPreset;if(!r||!(r in Di))return Du;let e=Di[r];return n0(Du,e.rolePatch)}function Ny(){let r=et().tuningPreset;return!r||!(r in Di)?"rolePartition":Di[r].affinityMode}function pa(r){let e=Di[r];vn({tuningPreset:r,priorityPresetIdle:e.idlePriorityDefault,priorityPresetHot:e.hotPriorityDefault});let t=yr(),n=e.smartTrimPatch??{};da({exalt:{...t.exalt,requireMemoryLoadPercent:e.smartTrimRequireMemoryLoadPercent,periodicTrim:typeof n.periodicTrim=="boolean"?n.periodicTrim:t.exalt.periodicTrim,checkIntervalMs:typeof n.checkIntervalMs=="number"?Math.max(5e3,Math.floor(n.checkIntervalMs)):t.exalt.checkIntervalMs,minTrimIntervalMs:typeof n.minTrimIntervalMs=="number"?Math.max(6e4,Math.floor(n.minTrimIntervalMs)):t.exalt.minTrimIntervalMs,maxCpuPercentForTrim:typeof n.maxCpuPercentForTrim=="number"?Math.max(0,Number(n.maxCpuPercentForTrim)):t.exalt.maxCpuPercentForTrim}})}var Di,r0,ma=Ue(()=>{"use strict";Pn();Mi();fa();Di={safe:{affinityMode:"none",idlePriorityDefault:"Normal",hotPriorityDefault:"Normal",smartTrimRequireMemoryLoadPercent:88,rolePatch:{active:{priority:"Normal",affinityStrategy:"none"},background:{priority:"Normal",affinityStrategy:"none"},parked:{priority:"BelowNormal",affinityStrategy:"none"}}},balanced:{affinityMode:"rolePartition",idlePriorityDefault:"Normal",hotPriorityDefault:"AboveNormal",smartTrimRequireMemoryLoadPercent:85,rolePatch:{active:{affinityStrategy:"spread-four-cores",priority:"AboveNormal"},background:{affinityStrategy:"spread-two-cores",priority:"Normal"},parked:{affinityStrategy:"spread-one-core",priority:"BelowNormal"}}},multibox:{affinityMode:"rolePartition",idlePriorityDefault:"BelowNormal",hotPriorityDefault:"Normal",smartTrimRequireMemoryLoadPercent:82,smartTrimPatch:{periodicTrim:!1,checkIntervalMs:3e4,minTrimIntervalMs:18e4,maxCpuPercentForTrim:18},rolePatch:{active:{affinityStrategy:"spread-four-cores",priority:"Normal"},background:{affinityStrategy:"spread-two-cores",priority:"BelowNormal"},parked:{affinityStrategy:"spread-one-core",priority:"Idle",allowMinimize:!0}}},aggressive:{affinityMode:"rolePartition",idlePriorityDefault:"BelowNormal",hotPriorityDefault:"High",smartTrimRequireMemoryLoadPercent:80,rolePatch:{active:{affinityStrategy:"spread-four-cores",priority:"High"},background:{affinityStrategy:"spread-two-cores",priority:"BelowNormal"},parked:{affinityStrategy:"spread-one-core",priority:"Idle"}}},lowHeat:{affinityMode:"rolePartition",idlePriorityDefault:"BelowNormal",hotPriorityDefault:"Normal",smartTrimRequireMemoryLoadPercent:85,smartTrimPatch:{periodicTrim:!0,checkIntervalMs:25e3,minTrimIntervalMs:12e4,maxCpuPercentForTrim:10},rolePatch:{active:{affinityStrategy:"spread-two-cores",priority:"Normal"},background:{affinityStrategy:"spread-one-core",priority:"BelowNormal"},parked:{affinityStrategy:"spread-one-core",priority:"Idle"}}}},r0=["active","background","parked"]});function Li(){return Gu}function Oy(r){Ay=Wu(r),Gu=!0}function Cn(){Gu=!1}function Uu(){return Ay}function Wu(r){let e=String(r||"").trim();return ha.includes(e)?e:"BelowNormal"}function Vu(r,e){let t=Wu(r),n=Wu(e),i=Math.max(0,ha.indexOf(t)),s=Math.max(0,ha.indexOf(n));return ha[Math.min(i,s)]}var ha,Gu,Ay,$i=Ue(()=>{"use strict";ha=["Idle","BelowNormal","Normal","AboveNormal","High"],Gu=!1,Ay="BelowNormal"});var $y={};tS($y,{PROCESS_BASELINE_VERSION:()=>Dy,captureProcessBaselineOverwrite:()=>Ju,ensureProcessBaselineCapturedOnce:()=>Ly,processBaselinePath:()=>o0,restoreProcessBaseline:()=>ya});function ga(){return(0,My.join)(xe(),i0)}function s0(r){let e=String(r||"").trim();return/^idle$/i.test(e)?"Idle":/^belownormal$/i.test(e.replace(/\s+/g,""))?"BelowNormal":/^abovenormal$/i.test(e.replace(/\s+/g,""))?"AboveNormal":/^high$/i.test(e)?"High":(/^normal$/i.test(e),"Normal")}async function Ly(){if(qu)return;let r=ga();if(!((0,ot.existsSync)(r)||!(await te()).ok)){qu=!0;try{let t=await st(),n=await By(),i={};for(let a of t.processes||[]){let l=Math.floor(Number(a.pid));if(!(l>0))continue;let c=String(a.processorAffinityMask??"").trim(),u=String(a.priorityClass??"Normal").trim(),d=/^[0-9]+$/.test(c);i[String(l)]={priorityClass:u,affinityMask:d?c:""}}let s={version:Dy,capturedAt:new Date().toISOString(),powerPlanGuid:n??void 0,processes:i},o=xe();(0,ot.existsSync)(o)||(0,ot.mkdirSync)(o,{recursive:!0}),(0,ot.writeFileSync)(r,JSON.stringify(s,null,2),"utf8")}finally{qu=!1}}}async function Ju(){try{let r=ga();return(0,ot.existsSync)(r)&&(0,ot.unlinkSync)(r),await Ly(),{ok:!0}}catch(r){return{ok:!1,error:String(r.message||r)}}}async function ya(){let r=ga();if(!(0,ot.existsSync)(r))return{ok:!0,restored:0};let e;try{e=JSON.parse((0,ot.readFileSync)(r,"utf8"))}catch{return{ok:!1,error:"invalid baseline file",restored:0}}let t=await te();if(!t.ok)return{ok:!1,error:t.reason,restored:0};try{e.powerPlanGuid&&await Ft(e.powerPlanGuid);let n=0;for(let[i,s]of Object.entries(e.processes||{})){let o=Math.floor(Number(i));if(!(o>0))continue;let a=String(s.affinityMask||"").trim();/^[0-9]+$/.test(a)&&await ba(o,a);let l=s0(s.priorityClass);await Sa([o],l),await jy([o]),n++}return{ok:!0,restored:n}}catch(n){return{ok:!1,error:String(n.message||n),restored:0}}}function o0(){return ga()}var ot,My,i0,Dy,qu,zu=Ue(()=>{"use strict";ot=require("fs"),My=require("path");Hr();gr();i0="exalt-process-baseline.json",Dy=1;qu=!1});function Fy(r){return r!=="active"}function Ku(){let r=process.env.SystemRoot??process.env.windir??"C:\\Windows";return(0,wa.join)(r,"System32","powercfg.exe")}function Hy(){let r=process.env.SystemRoot??process.env.windir??"C:\\Windows";return process.platform==="win32"&&process.arch==="ia32"&&process.env.PROCESSOR_ARCHITEW6432?(0,wa.join)(r,"Sysnative","WindowsPowerShell","v1.0","powershell.exe"):(0,wa.join)(r,"System32","WindowsPowerShell","v1.0","powershell.exe")}function kn(){return process.platform==="win32"}function Xu(r){try{r.kill("SIGTERM")}catch{}setTimeout(()=>{try{r.kill("SIGKILL")}catch{}},400)}function Uy(r,e=Yu){return new Promise((t,n)=>{let i=[],s=[],o=(0,va.spawn)(Hy(),["-NoProfile","-ExecutionPolicy","Bypass","-Command",r],{windowsHide:!0}),a=!1,l=(u,d)=>{a||(a=!0,clearTimeout(d),u())},c=setTimeout(()=>{Xu(o),l(()=>n(new Error(`PowerShell timed out after ${e}ms`)),c)},e);o.stdout.on("data",u=>i.push(Buffer.from(u))),o.stderr.on("data",u=>s.push(Buffer.from(u))),o.on("error",u=>l(()=>n(u),c)),o.on("close",u=>{l(()=>{let d=Buffer.concat(i).toString("utf8").trim(),p=Buffer.concat(s).toString("utf8").trim();u!==0&&p&&!d?n(new Error(p)):t(d)},c)})})}async function tt(r,e=Yu){let t=await Uy(r,e);if(!t.trim())throw new Error("PowerShell returned empty stdout (expected JSON).");try{return JSON.parse(t)}catch{throw new Error(`PowerShell did not return JSON: ${t.slice(0,400)}`)}}function l0(r,e=Yu){return new Promise((t,n)=>{let i=[],s=[],o=(0,va.spawn)(Hy(),["-NoProfile","-ExecutionPolicy","Bypass","-Command",r],{windowsHide:!0}),a=!1,l=(u,d)=>{a||(a=!0,clearTimeout(d),u())},c=setTimeout(()=>{Xu(o),l(()=>n(new Error(`PowerShell timed out after ${e}ms`)),c)},e);o.stdout.on("data",u=>i.push(Buffer.from(u))),o.stderr.on("data",u=>s.push(Buffer.from(u))),o.on("error",u=>l(()=>n(u),c)),o.on("close",u=>{l(()=>{t({out:Buffer.concat(i).toString("utf8").trim(),err:Buffer.concat(s).toString("utf8").trim(),code:u})},c)})})}function Ta(r,e=a0){return new Promise((t,n)=>{let i=(0,va.spawn)(r[0],r.slice(1),{windowsHide:!0}),s=[],o=[],a=!1,l=(u,d)=>{a||(a=!0,clearTimeout(d),u())},c=setTimeout(()=>{Xu(i),l(()=>n(new Error(`${r[0]||"process"} timed out after ${e}ms`)),c)},e);i.stdout.on("data",u=>s.push(Buffer.from(u))),i.stderr.on("data",u=>o.push(Buffer.from(u))),i.on("error",u=>l(()=>n(u),c)),i.on("close",u=>l(()=>t({code:u??0,stdout:Buffer.concat(s).toString("utf8"),stderr:Buffer.concat(o).toString("utf8")}),c))})}function Qu(r){let e=r.trim().match(Pa);return e?`{${String(e[0]).replace(/^\{/,"").replace(/\}$/,"").toLowerCase()}}`:null}async function te(){return kn()?{ok:!0}:{ok:!1,reason:"Windows-only tuning (ROTmg Exalt client)."}}async function Zu(){if(!kn())return null;let r=`
$os = Get-CimInstance Win32_OperatingSystem
$total = [int64]$os.TotalVisibleMemorySize * 1024L
$free = [int64]$os.FreePhysicalMemory * 1024L
$t = [double]$os.TotalVisibleMemorySize
$load = if ($t -le 0) { 0.0 } else { [math]::Round((1.0 - ([double]$os.FreePhysicalMemory / $t)) * 100.0, 1) }
@{ totalPhysBytes = $total; availPhysBytes = $free; memoryLoadPercent = [double]$load } | ConvertTo-Json -Compress
`.trim();try{let e=await tt(r);return!e||typeof e.memoryLoadPercent!="number"?null:{totalPhysBytes:Number(e.totalPhysBytes)||0,availPhysBytes:Number(e.availPhysBytes)||0,memoryLoadPercent:Number(e.memoryLoadPercent)||0}}catch{return null}}async function st(){if(!(await te()).ok)return{processes:[],logicalProcessors:0};let t=`
$OutputEncoding = [Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()
$n = [int]$env:NUMBER_OF_PROCESSORS
$pidSet = @{}
function Ensure-Pid([int]$id) {
  try { $pidSet[("{0}" -f $id)] = $true } catch {}
}

foreach ($nm in @('RotMG Exalt','RotMGExalt')) {
  foreach ($pr in @(Get-Process -Name $nm -ErrorAction SilentlyContinue)) {
    Ensure-Pid ([int]$pr.Id)
  }
}

$wmiMatches = @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue |
  Where-Object {
    $xp = try { [string]$_.ExecutablePath } catch { "" }
    $rn = try { ([string]$_.Name).Replace([char]0x00A0, " ").Trim() } catch { "" }
    ($rn -ieq "RotMG Exalt.exe") -or ($rn -ieq "${Ea.replace(/'/g,"''")}") -or (
      ($xp.Length -gt 0) -and (
        ($xp -match '(?i)RealmOfTheMadGod') -or
        ($xp -match '(?i)RotMGExalt\\.exe') -or
        ($xp -match '(?i)RotMG Exalt\\.exe')
      )
    )
  })
$wmiByPid = @{}
foreach ($wk in @($wmiMatches)) {
  try {
    $pk = [int]$wk.ProcessId
    Ensure-Pid $pk
    $wmiByPid[("{0}" -f $pk)] = $wk
  } catch {}
}

foreach ($kp in @($pidSet.Keys)) {
  $ik = "{0}" -f ([int]$kp)
  if (-not $wmiByPid.ContainsKey($ik)) {
    try {
      $row = @(Get-CimInstance Win32_Process -Filter ("ProcessId = {0}" -f [int]$kp) -ErrorAction SilentlyContinue)
      if (@($row).Length -gt 0) { $wmiByPid[$ik] = $row[0] }
    } catch {}
  }
}

$pids = @( foreach ($k in @($pidSet.Keys)) { [int]$k } ) | Sort-Object -Unique

$perfByPid = @{}
if (@($pids).Length -gt 0) {
  try {
    $perfRows = @(Get-CimInstance Win32_PerfFormattedData_PerfProc_Process -ErrorAction SilentlyContinue |
      Where-Object { $null -ne $_.IDProcess -and ($pids -contains [int]$_.IDProcess) })
    foreach ($prow in @($perfRows)) {
      $pki = [int]$prow.IDProcess
      $pct = [double]$prow.PercentProcessorTime
      if (-not ([double]::IsNaN($pct))) { $perfByPid[("{0}" -f $pki)] = [Math]::Round($pct, 1) }
    }
  } catch {}
}

$built = New-Object System.Collections.ArrayList

foreach ($procId in @($pids)) {
  $sk = "{0}" -f $procId
  $wp = $null
  if ($wmiByPid.ContainsKey($sk)) { $wp = $wmiByPid[$sk] }

  $gp = Get-Process -Id $procId -ErrorAction SilentlyContinue
  if (($null -eq $wp) -and ($null -eq $gp)) { continue }

  $imageNameStr = ""
  if ($null -ne $wp) {
    try {
      $imageNameStr = [string]$wp.Name.Replace([char]0x00A0, " ")
    } catch {
      $imageNameStr = try { [string]$wp.Name } catch { "" }
    }
    if (($null -ne $gp) -and ([string]::IsNullOrWhiteSpace($imageNameStr))) {
      try { $imageNameStr = ($gp.ProcessName + ".exe") } catch {}
    }
  } elseif ($null -ne $gp) {
    try { $imageNameStr = ($gp.ProcessName + ".exe") } catch { $imageNameStr = "RotMG.exe" }
  }

  $ws = [int64]0
  try {
    if ($null -ne $gp) { $ws = [int64]$gp.WorkingSet64 }
    elseif ($null -ne $wp -and $null -ne $wp.WorkingSetSize) {
      try { $ws = [int64]$wp.WorkingSetSize } catch { $ws = [int64]0 }
    }
  } catch { $ws = [int64]0 }

  $basePri = 0
  $priClassStr = "Unknown"
  $affStr = "--"
  $titleStr = ""

  try {
    if ($null -ne $gp) {
      $basePri = [int]$gp.BasePriority
      $priClassStr = try { [string]$gp.PriorityClass } catch { "Unknown" }
      try { $affStr = ([string][uint64]$gp.ProcessorAffinity) } catch { $affStr = "--" }
      if (-not ([string]::IsNullOrEmpty($gp.MainWindowTitle))) { $titleStr = [string]$gp.MainWindowTitle }
    } elseif ($null -ne $wp) {
      try { $basePri = [int]$wp.Priority } catch { $basePri = 0 }
      $priClassStr = "WMI"
    }
  } catch {}

  $cpuPct = $null
  $cpuKey = "{0}" -f $procId
  if ($perfByPid.ContainsKey($cpuKey)) {
    try { $cpuPct = [double]$perfByPid[$cpuKey] } catch {}
  }

  [void]$built.Add([PSCustomObject]@{
    pid = [int]$procId
    imageName = $imageNameStr
    workingSetBytes = $ws
    basePriority = $basePri
    priorityClass = $priClassStr
    processorAffinityMask = $affStr
    cpuPercent = $cpuPct
    mainWindowTitle = $titleStr
  })
}

@{ processes = @($built | Sort-Object pid); logicalProcessors = $n } | ConvertTo-Json -Depth 6 -Compress
`.trim();try{let{out:n,err:i,code:s}=await l0(t,25e3),o=n.replace(/^\uFEFF/,"").trim();if(!o)return m.warn("rotmgWindowsTune",`listExaltProcesses: empty stdout (code=${String(s)}): ${(i||"").slice(0,600)}`),{processes:[],logicalProcessors:0};let a=JSON.parse(o),l=[],c=a?.processes;return c?Array.isArray(c)?l=c:l=[c]:l=[],l.length===0&&i&&m.warn("rotmgWindowsTune",`listExaltProcesses: 0 matches. stderr=${i.slice(0,600)}`),{processes:l,logicalProcessors:Number(a?.logicalProcessors)||0}}catch(n){return m.warn("rotmgWindowsTune",String(n.message||n)),{processes:[],logicalProcessors:0}}}async function xa(r){let e=await te();if(!e.ok)return{ok:!1,error:e.reason,applied:0};let n=`
$ErrorActionPreference = 'Stop'
$class = [System.Diagnostics.ProcessPriorityClass]::${r==="High"?"High":r==="AboveNormal"?"AboveNormal":r==="BelowNormal"?"BelowNormal":r==="Idle"?"Idle":"Normal"}
$i = 0
Get-CimInstance Win32_Process | Where-Object { $_.Name -ieq '${Wy}' -or $_.Name -ieq '${Ea}' } | ForEach-Object {
  $proc = Get-Process -Id $_.ProcessId -ErrorAction SilentlyContinue
  if ($null -ne $proc) {
    try {
      $proc.PriorityClass = $class
      $i++
    } catch {}
  }
}
@{ applied = $i } | ConvertTo-Json -Compress
`.trim();try{let i=await tt(n);return{ok:!0,applied:Number(i?.applied)||0}}catch(i){return{ok:!1,error:String(i.message||i),applied:0}}}async function ed(r){let e=await te();if(!e.ok)return{ok:!1,error:e.reason,applied:[]};let t={...Gy,...r},n=t.strategy??"spread-two-cores";if(n==="none")return{ok:!0,applied:[]};let i=Math.max(0,Math.floor(t.reserveLogicalCores??2)),s=t.targetChildOnly!==!1,o=t.avoidCpuZero!==!1,a=s?"$true":"$false",l=o?"$true":"$false",c=`
$ErrorActionPreference = 'SilentlyContinue'
$strat = '${n}'
$res = ${String(i)}
$tcOnly = ${a}
$avoid0 = ${l}
$cpus = [int]$env:NUMBER_OF_PROCESSORS
if ($cpus -lt 1) {
  @{ ok=$false; error='NUMBER_OF_PROCESSORS missing'; applied=@() } | ConvertTo-Json -Depth 6 -Compress
  exit
}
$byId = @{}
foreach ($nm in @('RotMG Exalt','RotMGExalt')) {
  foreach ($pr in @(Get-Process -Name $nm -ErrorAction SilentlyContinue)) {
    $byId["$($pr.Id)"] = $pr
  }
}
$list = @($byId.Values | Sort-Object Id)
if ($tcOnly) {
  $only = @($list | Where-Object { $_.ProcessName -ieq 'RotMGExalt' })
  if (@($only).Length -gt 0) { $list = $only }
}
if (@($list).Length -eq 0) {
  @{ ok=$true; applied=@() } | ConvertTo-Json -Depth 6 -Compress
  exit
}
$r = @()
for ($idx = 0; $idx -lt $list.Count; $idx++) {
  $proc = $list[$idx]
  $maskLong = [UInt64]0
  if ($strat -eq 'spread-one-core') {
    $slot = (($res + $idx) % $cpus)
    if ($avoid0 -and $cpus -gt 1 -and $slot -eq 0) { $slot = 1 }
    $maskLong = [UInt64]([UInt64]1 -shl $slot)
  }
  elseif ($strat -eq 'spread-two-cores') {
    $a = ($res + 2 * $idx) % $cpus
    $b = ($res + 2 * $idx + 1) % $cpus
    if ($avoid0 -and $cpus -gt 1) {
      if ($a -eq 0) { $a = 1 }
      if ($b -eq 0) { $b = if ($cpus -gt 2) { 2 } else { 1 } }
    }
    $maskLong = ([UInt64]1 -shl $a) -bor ([UInt64]1 -shl $b)
  }
  elseif ($strat -eq 'spread-four-cores') {
    for ($k = 0; $k -lt [Math]::Min(4,$cpus); $k++) {
      $slot = (($res + 4*[int]$idx + $k) % $cpus)
      $maskLong = $maskLong -bor ([UInt64]1 -shl $slot)
    }
  }
  try {
    $proc.ProcessorAffinity = [IntPtr]$maskLong
    $r += [PSCustomObject]@{ pid = [int]$proc.Id; affinityMask = ($maskLong.ToString()) }
  } catch {
    $r += [PSCustomObject]@{ pid = [int]$proc.Id; affinityMask = $null }
  }
}
@{ ok=$true; applied=@($r) } | ConvertTo-Json -Depth 6 -Compress
`.trim();try{let u=await tt(c);if(u?.ok===!1&&u?.error)return{ok:!1,error:String(u.error),applied:[]};let d=u?.applied;return{ok:!0,applied:d?Array.isArray(d)?d:[d]:[]}}catch(u){return{ok:!1,error:String(u.message||u),applied:[]}}}async function qy(){let r=await te();if(!r.ok)return{ok:!1,error:r.reason,applied:0};let e=await st(),t=Math.max(1,Math.floor(Number(e.logicalProcessors)||1)),n=Ou([...Array(t).keys()]),i=0,s=new Set,o=e.processes||[];for(let a of o){let l=Math.floor(Number(a.pid));if(!(l>0)||s.has(l))continue;s.add(l),(await ba(l,n)).ok&&i++}return{ok:!0,applied:i}}async function td(r){let e=await te();if(!e.ok)return{ok:!1,error:e.reason};let t=await Oi(r),n=xn();for(let i of t.clusters){let s=n[i.role],o=s.priority;i.role==="background"&&Li()&&(o=Vu(s.priority,Uu()));let a=await Sa(i.pids,o);if(!a.ok)return{ok:!1,error:a.error};await Jy(i.pids,Fy(i.role)),i.role==="parked"&&s.allowMinimize&&await Xy(i.seedPid)}return{ok:!0,snapshot:t}}async function ba(r,e){let t=await te();if(!t.ok)return{ok:!1,error:t.reason};let n=Math.floor(Number(r)),i=e.trim();if(!(n>0)||!/^\d+$/.test(i))return{ok:!1,error:"invalid affinity input"};let s=`
$ErrorActionPreference = 'Continue'
$p = Get-Process -Id ${String(n)} -ErrorAction SilentlyContinue
if ($null -eq $p) {
  @{ ok = $false; error = 'process not found' } | ConvertTo-Json -Compress
  exit 1
}
$m = [UInt64]::Parse('${i}')
$p.ProcessorAffinity = [IntPtr]$m
@{ ok = $true } | ConvertTo-Json -Compress
`.trim();try{let o=await tt(s);return o?.ok?{ok:!0}:{ok:!1,error:String(o?.error||"affinity failed")}}catch(o){return{ok:!1,error:String(o.message||o)}}}async function rd(r){let e=Ny();if(e==="none")return{ok:!0};if(e==="globalEven"){let s=await ed();return{ok:s.ok,error:s.error}}let t=xn(),n=Gy,i=vy(r.clusters,t,r.logicalProcessors,Math.max(0,Math.floor(n.reserveLogicalCores??2)),n.avoidCpuZero!==!1);for(let s of r.clusters){let o=i.get(s.seedPid);if(o)for(let a of s.pids)await ba(a,o)}return{ok:!0}}async function nd(){let r=await Oi();return rd(r)}async function id(){let e=(await Ta([Ku(),"/getactivescheme"])).stdout.match(Pa);return e?Qu(e[0])??void 0:void 0}async function By(){return id()}async function Ca(){if(!kn())return[];let r=await id(),e=Ku(),t=await Ta([e,"/list"]),i=`${t.stdout}
${t.stderr}`.split(/\r?\n/).map(a=>a.trim());i.some(a=>/guid|GUID/i.test(a)||Pa.test(a))||(t=await Ta(["powercfg","/list"]),i=`${t.stdout}`.split(/\r?\n/).map(a=>a.trim()));let s=[];for(let a of i){if(!a)continue;let l=a.match(Pa);if(!l)continue;let c=Qu(l[0]);if(!c)continue;let u=/\(([^)]+)\)/.exec(a),d=u?u[1].replace(/\s*\*\s*$/,"").trim():"";d||(d=a.slice(a.indexOf(l[0])+l[0].length).trim().replace(/^[\s\u2013\u2014-]+/,"").trim().split(/\s{2,}/)[0]||""),d||(d="Power scheme");let p=!!r&&r.toLowerCase()===c.toLowerCase(),f=/\(\s*\*+\s*\)\s*$/.test(a)||/\s\*\s*$/.test(a.trim());s.push({guid:c,name:d,active:p||f})}let o=new Map;for(let a of s){let l=a.guid.toLowerCase();o.has(l)||o.set(l,a)}return[...o.values()]}async function Ft(r){if(!kn())return{ok:!1,error:"Windows only."};let e=Qu(r);if(!e)return{ok:!1,error:"Invalid power scheme GUID."};let t=await Ta([Ku(),"/setactive",e]);return await new Promise(i=>setTimeout(i,120)),(await id())?.toLowerCase()===e.toLowerCase()?{ok:!0}:t.code===0?{ok:!0}:{ok:!1,error:t.stderr.trim()||t.stdout.trim()||`powercfg exited ${t.code}`}}async function _n(r){let e=await te();if(!e.ok)return{ok:!1,error:e.reason,applied:0};let t=[...new Set(r.map(s=>Math.floor(Number(s))).filter(s=>Number.isFinite(s)&&s>0))];if(t.length===0)return{ok:!0,applied:0};let i=`
$ErrorActionPreference = 'SilentlyContinue'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class PsTrim2 {
  [DllImport("psapi.dll", SetLastError = true)]
  public static extern bool EmptyWorkingSet(IntPtr hProcess);
}
"@ -ErrorAction SilentlyContinue
$i = 0
foreach ($id in @(${t.join(",")})) {
  $p = Get-Process -Id $id -ErrorAction SilentlyContinue
  if ($null -eq $p) { continue }
  try {
    if ([PsTrim2]::EmptyWorkingSet($p.Handle)) { $i++ }
  } catch {}
}
@{ applied = $i } | ConvertTo-Json -Compress
`.trim();try{let s=await tt(i);return{ok:!0,applied:Number(s?.applied)||0}}catch(s){return{ok:!1,error:String(s.message||s),applied:0}}}function c0(r){switch(r){case"High":return"High";case"AboveNormal":return"AboveNormal";case"BelowNormal":return"BelowNormal";case"Idle":return"Idle";default:return"Normal"}}async function er(){if(!(await te()).ok)return null;let e=`
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class WinFg {
  [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
}
"@
$hwnd = [WinFg]::GetForegroundWindow()
$foregroundPidOut = [uint32]0
[void][WinFg]::GetWindowThreadProcessId($hwnd, [ref]$foregroundPidOut)
@{ pid = [int]$foregroundPidOut } | ConvertTo-Json -Compress
`.trim();try{let t=await tt(e),n=Math.floor(Number(t?.pid??0));return Number.isFinite(n)&&n>0?n:null}catch{return null}}async function tr(r){if(!(await te()).ok)return[];let t=Math.floor(Number(r));if(!Number.isFinite(t)||t<=0)return[];let n=`
$id = ${String(t)}
$ids = New-Object System.Collections.Generic.HashSet[int]
[void]$ids.Add([int]$id)
try {
  $cim = Get-CimInstance Win32_Process -Filter "ProcessId=$id" -ErrorAction SilentlyContinue
  if ($null -ne $cim) {
    $pp = [int]$cim.ParentProcessId
    $nm = [string]$cim.Name
    if ($nm -ieq '${Ea}' -and $pp -gt 0) {
      [void]$ids.Add([int]$pp)
    }
    if ($pp -gt 0) {
      Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
        ([int]$_.ParentProcessId) -eq $pp -and (
          $_.Name -ieq '${Wy}' -or $_.Name -ieq '${Ea}')
      } | ForEach-Object {
        try { [void]$ids.Add([int]$_.ProcessId) } catch {}
      }
    }
  }
} catch {}
@($ids | Sort-Object) | ConvertTo-Json -Compress
`.trim();try{let i=JSON.parse((await Uy(n)).replace(/^\uFEFF/,"").trim());if(!Array.isArray(i))return[t];let s=[...new Set(i.map(o=>Math.floor(Number(o))).filter(o=>o>0))].sort((o,a)=>o-a);return s.length?s:[t]}catch{return[t]}}async function Sa(r,e){let t=await te();if(!t.ok)return{ok:!1,error:t.reason,applied:0};let n=[...new Set(r.map(a=>Math.floor(Number(a))).filter(a=>a>0))];if(n.length===0)return{ok:!0,applied:0};let i=c0(e),s=n.join(","),o=`
$ErrorActionPreference = 'SilentlyContinue'
$class = [System.Diagnostics.ProcessPriorityClass]::${i}
$i = 0
foreach ($procId in @(${s})) {
  try {
    $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
    if ($null -eq $proc) { continue }
    $proc.PriorityClass = $class
    $i++
  } catch {}
}
@{ applied = $i } | ConvertTo-Json -Compress
`.trim();try{let a=await tt(o);return{ok:!0,applied:Number(a?.applied)||0}}catch(a){return{ok:!1,error:String(a.message||a),applied:0}}}async function Jy(r,e){let t=await te();if(!t.ok)return{ok:!1,error:t.reason,applied:0};let n=[...new Set(r.map(a=>Math.floor(Number(a))).filter(a=>a>0))];if(n.length===0)return{ok:!0,applied:0};let i=e?"$true":"$false",o=`
$ErrorActionPreference = 'SilentlyContinue'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class PsRealmEcoQos {
  [StructLayout(LayoutKind.Sequential)]
  public struct PROCESS_POWER_THROTTLING_STATE {
    public uint Version;
    public uint ControlMask;
    public uint StateMask;
  }
  private const uint PPT_VER = 1;
  private const uint PPT_EXEC_SPEED = 0x1;
  private const int PIC_POWER_THROTTLING = 4;
  [DllImport("kernel32.dll", SetLastError = true)]
  private static extern bool SetProcessInformation(
    IntPtr hProcess,
    int processInformationClass,
    ref PROCESS_POWER_THROTTLING_STATE state,
    int size);

  public static bool SetEcoExecution(IntPtr h, bool ecoOn) {
    var s = new PROCESS_POWER_THROTTLING_STATE();
    s.Version = PPT_VER;
    s.ControlMask = PPT_EXEC_SPEED;
    s.StateMask = ecoOn ? PPT_EXEC_SPEED : 0u;
    return SetProcessInformation(h, PIC_POWER_THROTTLING, ref s,
      Marshal.SizeOf(typeof(PROCESS_POWER_THROTTLING_STATE)));
  }
}
"@
$i = 0
foreach ($procId in @(${n.join(",")})) {
  try {
    $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
    if ($null -eq $proc) { continue }
    if ([PsRealmEcoQos]::SetEcoExecution($proc.Handle, ${i})) { $i++ }
  } catch {}
}
@{ applied = $i } | ConvertTo-Json -Compress
`.trim();try{let a=await tt(o);return{ok:!0,applied:Number(a?.applied)||0}}catch(a){return{ok:!1,error:String(a.message||a),applied:0}}}async function jy(r){let e=await te();if(!e.ok)return{ok:!1,error:e.reason,applied:0};let t=[...new Set(r.map(s=>Math.floor(Number(s))).filter(s=>s>0))];if(t.length===0)return{ok:!0,applied:0};let i=`
$ErrorActionPreference = 'SilentlyContinue'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class PsRealmEcoQosReset {
  [StructLayout(LayoutKind.Sequential)]
  public struct PROCESS_POWER_THROTTLING_STATE {
    public uint Version;
    public uint ControlMask;
    public uint StateMask;
  }
  private const uint PPT_VER = 1;
  private const int PIC_POWER_THROTTLING = 4;
  [DllImport("kernel32.dll", SetLastError = true)]
  private static extern bool SetProcessInformation(
    IntPtr hProcess,
    int processInformationClass,
    ref PROCESS_POWER_THROTTLING_STATE state,
    int size);

  public static bool ResetDefault(IntPtr h) {
    var s = new PROCESS_POWER_THROTTLING_STATE();
    s.Version = PPT_VER;
    s.ControlMask = 0;
    s.StateMask = 0;
    return SetProcessInformation(h, PIC_POWER_THROTTLING, ref s,
      Marshal.SizeOf(typeof(PROCESS_POWER_THROTTLING_STATE)));
  }
}
"@
$i = 0
foreach ($procId in @(${t.join(",")})) {
  try {
    $proc = Get-Process -Id $procId -ErrorAction SilentlyContinue
    if ($null -eq $proc) { continue }
    if ([PsRealmEcoQosReset]::ResetDefault($proc.Handle)) { $i++ }
  } catch {}
}
@{ applied = $i } | ConvertTo-Json -Compress
`.trim();try{let s=await tt(i);return{ok:!0,applied:Number(s?.applied)||0}}catch(s){return{ok:!1,error:String(s.message||s),applied:0}}}async function zy(r,e){let t=await te();if(!t.ok)return{ok:!1,error:t.reason,done:!1};if(!r.length)return{ok:!0,done:!1};let i=[...new Set(r.map(a=>Math.floor(Number(a))).filter(a=>a>0))].join(","),o=`
$ErrorActionPreference = 'SilentlyContinue'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class WinShow {
  [DllImport("user32.dll")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@
$n = ${String(e==="minimize"?6:9)}
$done = $false
foreach ($procId in @(${i})) {
  try {
    $p = Get-Process -Id $procId -ErrorAction SilentlyContinue
    if ($null -eq $p) { continue }
    $hwnd = $p.MainWindowHandle
    if ($hwnd -eq [IntPtr]::Zero -or [int]$hwnd -eq 0) { continue }
    if ([WinShow]::ShowWindow($hwnd, $n)) { $done = $true }
  } catch {}
}
@{ ok = $done } | ConvertTo-Json -Compress
`.trim();try{return{ok:!0,done:!!(await tt(o))?.ok}}catch(a){return{ok:!1,error:String(a.message||a),done:!1}}}async function Ky(r){let e=await te();if(!e.ok)return{ok:!1,error:e.reason};let t=Math.floor(Number(r));if(!Number.isFinite(t)||t<=0)return{ok:!1,error:"invalid pid"};let n=`
$ErrorActionPreference = 'SilentlyContinue'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class WinFg2 {
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@
$target = ${String(t)}
$ok = $false
try {
  $p = Get-Process -Id $target -ErrorAction SilentlyContinue
  if ($null -ne $p) {
    $hwnd = $p.MainWindowHandle
    if ($hwnd -ne [IntPtr]::Zero -and [int]$hwnd -ne 0) {
      $ok = [WinFg2]::SetForegroundWindow($hwnd)
    }
  }
} catch {}
@{ ok = $ok } | ConvertTo-Json -Compress
`.trim();try{return{ok:!!(await tt(n))?.ok}}catch(i){return{ok:!1,error:String(i.message||i)}}}function u0(r){let e=String(r||"").trim();if(!e)return"";let t=Buffer.from(e,"utf8").toString("base64");return t.slice(0,Math.min(48,t.length))}async function Yy(r,e,t){if(!kn())return{ok:!1,debug:"not win32"};let n=Math.floor(Number(r));if(!Number.isFinite(n)||n<=0)return{ok:!1,debug:"invalid seed pid"};let i=Math.round(e.x),s=Math.round(e.y),o=Math.max(200,Math.round(e.width)),a=Math.max(150,Math.round(e.height)),l=u0(t?.email??""),c=String(t?.launchedAtIso??"").trim(),u=l.replace(/'/g,"''"),d=c.replace(/'/g,"''"),p=120,f=250,h=0;for(let g=0;g<p;g++){if(g%8===0)try{let S=await sd(r);S!=null&&S>0&&(h=S)}catch{}let y=Math.floor(h),b=`
$ErrorActionPreference = 'SilentlyContinue'
$seed = ${String(n)}
$unityHint = ${String(y)}
$x = ${String(i)}
$y = ${String(s)}
$cw = ${String(o)}
$ch = ${String(a)}
$marker = '${u}'
$launchIso = '${d}'
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class WinMv {
  [DllImport("user32.dll", SetLastError = true)] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
  [DllImport("user32.dll", SetLastError = true)] public static extern bool MoveWindow(IntPtr hWnd, int X, int Y, int nWidth, int nHeight, bool bRepaint);
  public delegate bool EnumDelegate(IntPtr hWnd, IntPtr lParam);
  [DllImport("user32.dll")] public static extern bool EnumWindows(EnumDelegate lpfn, IntPtr lParam);
  [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint pid);
  [DllImport("user32.dll")] public static extern bool IsWindowVisible(IntPtr hWnd);
  [DllImport("user32.dll")] public static extern bool GetWindowRect(IntPtr hWnd, out RECT r);
  [StructLayout(LayoutKind.Sequential)] public struct RECT { public int Left; public int Top; public int Right; public int Bottom; }
  static IntPtr _bestHwnd;
  static int _bestArea;
  static int _targetPid;
  static EnumDelegate _enumCb;
  static int Area(ref RECT r) { return Math.Max(0, r.Right - r.Left) * Math.Max(0, r.Bottom - r.Top); }
  static bool EnumProc(IntPtr hwnd, IntPtr lp) {
    if (!IsWindowVisible(hwnd)) return true;
    uint wp = 0;
    GetWindowThreadProcessId(hwnd, out wp);
    if ((int)wp != _targetPid) return true;
    RECT rr;
    if (!GetWindowRect(hwnd, out rr)) return true;
    int a = Area(ref rr);
    if (a > _bestArea && a >= 4000) { _bestArea = a; _bestHwnd = hwnd; }
    return true;
  }
  public static IntPtr BestVisibleTopHwndForPid(int want) {
    _bestHwnd = IntPtr.Zero;
    _bestArea = 0;
    _targetPid = want;
    _enumCb = new EnumDelegate(EnumProc);
    EnumWindows(_enumCb, IntPtr.Zero);
    return _bestHwnd;
  }
}
"@
function Try-Move([IntPtr]$hwnd) {
  if ($hwnd -eq [IntPtr]::Zero -or [int]$hwnd -eq 0) { return $false }
  $u = [uint32](0x0004 -bor 0x0040)
  if ([WinMv]::SetWindowPos($hwnd, [IntPtr]::Zero, $x, $y, $cw, $ch, $u)) { return $true }
  return [WinMv]::MoveWindow($hwnd, $x, $y, $cw, $ch, $true)
}
function Try-Pid([int]$tpid) {
  try {
    $gp = Get-Process -Id $tpid -EA SilentlyContinue
    if ($null -eq $gp) { return $false }
    $main = $gp.MainWindowHandle
    if ($main -ne [IntPtr]::Zero -and [int]$main -ne 0) {
      if (Try-Move $main) { return $true }
    }
  } catch {}
  try {
    $best = [WinMv]::BestVisibleTopHwndForPid($tpid)
    if ($best -ne [IntPtr]::Zero -and [int]$best -ne 0) {
      if (Try-Move $best) { return $true }
    }
  } catch {}
  return $false
}
$candidatePids = New-Object System.Collections.Generic.List[int]
$tryOrder = New-Object System.Collections.Generic.List[int]
$all = @(Get-CimInstance Win32_Process -EA SilentlyContinue)
$seen = New-Object System.Collections.Generic.HashSet[int]
$queue = New-Object System.Collections.Queue
if ($null -ne (Get-Process -Id $seed -EA SilentlyContinue)) { [void]$queue.Enqueue([int]$seed) }
while ($queue.Count -gt 0) {
  $pid = [int]$queue.Dequeue()
  if (-not $seen.Add($pid)) { continue }
  $row = @($all | Where-Object { [int]$_.ProcessId -eq $pid }) | Select-Object -First 1
  if ($null -eq $row) { continue }
  $nm = [string]$row.Name
  if ($nm -like '*RotMG*') { [void]$candidatePids.Add([int]$pid) }
  foreach ($ch in @($all | Where-Object { [int]$_.ParentProcessId -eq $pid })) {
    try { [void]$queue.Enqueue([int]$ch.ProcessId) } catch {}
  }
}
if ($marker.Length -gt 4) {
  foreach ($pr in @($all)) {
    try {
      $cn = [string]$pr.CommandLine
      if ($cn.Length -lt 24) { continue }
      if ($cn -like ('*' + $marker + '*')) {
        $pidm = [int]$pr.ProcessId
        [void]$candidatePids.Add($pidm)
        if (-not $tryOrder.Contains($pidm)) { [void]$tryOrder.Insert(0, $pidm) }
      }
    } catch {}
  }
}
$cutoff = $null
try {
  if ($launchIso.Length -gt 10) { $cutoff = [DateTimeOffset]::Parse($launchIso).LocalDateTime.AddSeconds(-3) }
} catch {}
if ($null -ne $cutoff) {
  foreach ($nm in @('RotMGExalt','RotMG Exalt')) {
    foreach ($gp in @(Get-Process -Name $nm -EA SilentlyContinue)) {
      try {
        $st = $gp.StartTime
        if ($null -ne $st -and $st -ge $cutoff) {
          [void]$candidatePids.Add([int]$gp.Id)
        }
      } catch {}
    }
  }
}
$recentCutoff = (Get-Date).AddSeconds(-45)
foreach ($nm in @('RotMGExalt','RotMG Exalt')) {
  foreach ($gp in @(Get-Process -Name $nm -EA SilentlyContinue)) {
    try {
      $st = $gp.StartTime
      if ($null -ne $st -and $st -ge $recentCutoff) {
        $pidr = [int]$gp.Id
        [void]$candidatePids.Add($pidr)
        if (-not $tryOrder.Contains($pidr)) { [void]$tryOrder.Add($pidr) }
      }
    } catch {}
  }
}
foreach ($p in $candidatePids) {
  if (-not $tryOrder.Contains($p)) { [void]$tryOrder.Add($p) }
}
if ($unityHint -gt 0) {
  $ih = [int]$unityHint
  if ($tryOrder.Contains($ih)) { [void]$tryOrder.Remove($ih) }
  [void]$tryOrder.Insert(0, $ih)
}
foreach ($tpid in $tryOrder) {
  if ($tpid -le 0) { continue }
  if (Try-Pid $tpid) {
    @{ moved = $true; seed = $seed; unityHint = $unityHint } | ConvertTo-Json -Compress
    exit 0
  }
}
@{ moved = $false; seed = $seed; unityHint = $unityHint; markerLength = $marker.Length; launchIso = $launchIso; candidatePids = @($candidatePids); tryOrder = @($tryOrder) } | ConvertTo-Json -Depth 6 -Compress
`.trim();try{let S=await tt(b,18e3);if(S?.moved)return{ok:!0};let E=JSON.stringify(S??{}).slice(0,1200);if(g%20===0&&m.warn("rotmgWindowsTune",`moveRotmgLaunchedWindowAfterSpawn attempt ${g}: ${E.slice(0,800)}`),g===p-1)return{ok:!1,debug:E}}catch(S){let E=String(S.message||S);if(g%20===0&&m.warn("rotmgWindowsTune",`moveRotmgLaunchedWindowAfterSpawn attempt ${g} PS error: ${E.slice(0,400)}`),g===p-1)return{ok:!1,debug:`ps_error:${E.slice(0,600)}`}}await new Promise(S=>setTimeout(S,f))}return{ok:!1,debug:"exhausted attempts"}}async function sd(r){if(!kn())return null;let e=Math.floor(Number(r));if(!Number.isFinite(e)||e<=0)return null;let t=46,n=200;for(let i=0;i<t;i++){let s=`
$ErrorActionPreference = 'SilentlyContinue'
$lp = ${String(e)}
$rows = @(Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object { [int]$_.ParentProcessId -eq $lp })
$unity = $null
foreach ($r in $rows) {
  $nm = [string]$r.Name
  if ($nm -like '*RotMGExalt*') {
    $unity = [int]$r.ProcessId
    break
  }
}
if ($null -ne $unity) {
  @{ pid = $unity } | ConvertTo-Json -Compress
} else {
  @{ pid = $null } | ConvertTo-Json -Compress
}
`.trim();try{let o=await tt(s,8e3),a=Math.floor(Number(o?.pid));if(Number.isFinite(a)&&a>0)return a}catch{}await new Promise(o=>setTimeout(o,n))}return null}async function Xy(r){let e=await tr(r),t=await zy(e,"minimize");return{ok:t.ok,done:t.done,error:t.error}}async function Qy(r){let e=await tr(r),t=await zy(e,"restore");return{ok:t.ok,done:t.done,error:t.error}}async function ka(r,e,t=0){let n=await te();if(!n.ok)return{ok:!1,error:n.reason,pids:[]};let s=xn()[e],o=s.priority;e==="background"&&Li()&&(o=Vu(s.priority,Uu()));let a=await tr(r),l=await Sa(a,o);if(!l.ok)return{ok:!1,error:l.error,pids:a};await Jy(a,Fy(e)),e==="parked"&&s.allowMinimize&&await Xy(r);let c=await Oi(),u=await rd(c);return{ok:u.ok!==!1,pids:a,error:u.error}}async function In(r,e){let t=await te();if(!t.ok)return{ok:!1,error:t.reason,slots:[]};await Promise.resolve().then(()=>(zu(),$y)).then(a=>a.ensureProcessBaselineCapturedOnce());let n=await td({foregroundPid:r,parkedPids:e});if(!n.ok||!n.snapshot)return{ok:!1,error:n.error,slots:[]};let i=n.snapshot,s=i.clusters.map(a=>({seedPid:a.seedPid,pids:a.pids,role:a.role})),o=await rd(i);return{ok:o.ok!==!1,error:o.error,slots:s}}async function _a(){if(!(await te()).ok)return{pkgMaxCelsius:null,minFreqPctOfMax:null};let e=`
$ErrorActionPreference = 'SilentlyContinue'
$pkg = $null
$freqMin = $null

try {
  $zs = Get-CimInstance -Namespace root/wmi -ClassName MSAcpi_ThermalZoneTemperature -ErrorAction SilentlyContinue
  if ($null -ne $zs) {
    $temps = [System.Collections.Generic.List[double]]::new()
    foreach ($z in @($zs)) {
      try {
        $tc = [double]$z.CurrentTemperature
        $k = $tc / 10.0
        $c = $k - 273.15
        if ([double]::IsFinite($c) -and $c -gt -40 -and $c -lt 200) { [void]$temps.Add($c) }
      } catch {}
    }
    if ($temps.Count -gt 0) { $pkg = [double](($temps | Measure-Object -Maximum).Maximum) }
  }
} catch {}

try {
  $cat = '\\Processor Information(_Total)\\% of Maximum Frequency'
  $sx = Get-Counter $cat -ErrorAction Stop
  if ($sx.CounterSamples.Count -gt 0) {
    $freqMin = [double]$sx.CounterSamples[0].CookedValue
  }
} catch {}
if ($null -eq $freqMin -or [double]::IsNaN([double]$freqMin)) {
  try {
    $cats = '\\Processor Information(*)\\% of Maximum Frequency'
    $sx = Get-Counter $cats -ErrorAction Stop
    if ($sx.CounterSamples.Count -gt 0) {
      $vals = foreach ($cs in @($sx.CounterSamples)) {
        try { [double]$cs.CookedValue } catch { $null }
      }
      $valsOk = @( $vals | Where-Object { $_ -ne $null -and $_ -gt 0 -and $_ -lt 250 } )
      if ($valsOk.Count -gt 0) { $freqMin = [double](($valsOk | Measure-Object -Minimum).Minimum) }
    }
  } catch {}
}

@{ pkgMaxCelsius = $pkg; minFreqPctOfMax = $freqMin } | ConvertTo-Json -Compress
`.trim();try{let t=await tt(e),n=i=>typeof i=="number"&&Number.isFinite(i)?i:null;return{pkgMaxCelsius:n(t?.pkgMaxCelsius),minFreqPctOfMax:n(t?.minFreqPctOfMax)}}catch{return{pkgMaxCelsius:null,minFreqPctOfMax:null}}}var va,wa,Wy,Ea,Gy,Yu,a0,Vy,Pa,gr=Ue(()=>{"use strict";va=require("child_process"),wa=require("path");X();Mu();ca();Mu();ma();$i();Wy="RotMG Exalt.exe",Ea="RotMGExalt.exe",Gy={strategy:"spread-two-cores",reserveLogicalCores:2,targetChildOnly:!0,avoidCpuZero:!0};Yu=12e3,a0=15e3;Vy=[{guid:"{8c5e7fda-e8bf-4a96-9a85-a6e23a635635}",label:"High performance",hint:"Native Windows preset \u2014 minimizes CPU scaling while multiboxing ROTMG."},{guid:"{381b4222-f694-41f0-9685-ff5bb260df2e}",label:"Balanced",hint:"Default plan \u2014 quieter fans when Realm clients sit idle."},{guid:"{a1841308-3541-4fab-bc81-f71556f20b4a}",label:"Power saver",hint:"Use when minimizing heat/power; gameplay may feel sluggish."}],Pa=/\{?[a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12}\}?/});var qi=require("fs"),Ub=require("path"),Vb=require("os"),ae=require("path"),Jb=require("os"),zb=require("url"),ke=require("fs");var Rd=U(require("net"),1),Nd=require("events"),lt=require("fs"),Rt=require("path"),qa=require("os"),Ad=require("child_process");var kd=U(require("net"),1);var Wt=class r{engineState;workingKey;x=0;y=0;constructor(e){this.workingKey=r.hexToBytes(e),this.engineState=new Uint8Array(256),this.setKey(this.workingKey)}cipher(e){this.processBytes(e,5,e.length-5,e,5)}reset(){this.setKey(this.workingKey)}processBytes(e,t,n,i,s){for(let o=0;o<n;o++){this.x=this.x+1&255,this.y=this.engineState[this.x]+this.y&255;let a=this.engineState[this.x];this.engineState[this.x]=this.engineState[this.y],this.engineState[this.y]=a,i[o+s]=e[o+t]^this.engineState[this.engineState[this.x]+this.engineState[this.y]&255]}}setKey(e){this.x=0,this.y=0;for(let i=0;i<256;i++)this.engineState[i]=i;let t=0,n=0;for(let i=0;i<256;i++){n=(e[t]&255)+this.engineState[i]+n&255;let s=this.engineState[i];this.engineState[i]=this.engineState[n],this.engineState[n]=s,t=(t+1)%e.length}}static hexToBytes(e){return Buffer.from(e,"hex")}};var Jr=class r{static MAX_PACKET_SIZE=1048576;_bytes=Buffer.alloc(4);_index=0;get bytes(){return this._bytes}get index(){return this._index}advance(e){this._index+=e}resize(e){if(e<=0||e>r.MAX_PACKET_SIZE)throw new Error(`Invalid packet size: ${e}`);let t=Buffer.alloc(e);this._bytes.copy(t,0,0,Math.min(this._bytes.length,e)),this._bytes=t}reset(){this._bytes=Buffer.alloc(4),this._index=0}bytesRemaining(){return this._bytes.length-this._index}getBytes(){return Buffer.from(this._bytes)}dispose(){this._bytes=Buffer.alloc(0),this._index=0}};var zi={Dead:0,Quiet:1,Weak:2,Slowed:3,Sick:4,Dazed:5,Stunned:6,Blind:7,Hallucinating:8,Drunk:9,Confused:10,StunImmune:11,Invisible:12,Paralyzed:13,Speedy:14,Bleeding:15,ArmorBrokenImmune:16,Healing:17,Damaging:18,Berserk:19,Paused:20,Stasis:21,StasisImmune:22,Invincible:23,Invulnerable:24,Armored:25,ArmorBroken:26,Hexed:27,NinjaSpeedy:28,Unstable:29,Darkness:30,SlowedImmune:31,DazedImmune:32,ParalyzeImmune:33,Petrified:34,PetrifiedImmune:35,PetDisable:36,Curse:37,CurseImmune:38,HpBoost:39,MpBoost:40,AttBoost:41,DefBoost:42,SpdBoost:43,VitBoost:44,WisBoost:45,DexBoost:46,Silenced:47,Exposed:48,Energized:49,InCombat:58};var x={MaxHP:0,HP:1,Size:2,MaxMP:3,MP:4,NextLevelExp:5,Exp:6,Level:7,Inventory0:8,Inventory1:9,Inventory2:10,Inventory3:11,Inventory4:12,Inventory5:13,Inventory6:14,Inventory7:15,Inventory8:16,Inventory9:17,Inventory10:18,Inventory11:19,Attack:20,Defense:21,Speed:22,Vitality:26,Wisdom:27,Dexterity:28,Effects:29,Stars:30,Name:31,Texture1:32,NameStat:31,Texture2:33,Credits:34,AccountId:38,CurrentFame:39,HpBoost:46,MpBoost:47,AttackBonus:48,DefenseBonus:49,SpeedBonus:50,VitalityBonus:51,WisdomBonus:52,DexterityBonus:53,OwnerAccountId:54,CharacterAliveFame:57,GuildName:62,GuildRank:63,OxygenBar:64,HealthStackCount:73,MagicStackCount:74,HasBackpack:75,Skin:76,PetInstanceId:77,Enchantments:80,Effects2:95,WireExaltAttack:105,WireExaltDefense:106,WireExaltSpeed:107,WireExaltVitality:108,WireExaltDexterity:109,WireExaltWisdom:110,WireExaltMaxHP:111,WireExaltMaxMP:112,ExaltedAttack:123,PowerLevel:124,ExaltedSpeed:125,ExaltedVitality:126,ExaltedWisdom:129,BackpackTier:130,ExaltedMaxHP:131,ExaltedMaxMP:132,ExaltationDamageMultiplier:133,SinkLevel:134,QuickSlot0:116,QuickSlot1:117,QuickSlot2:118,Backpack0:131,Backpack1:132,Backpack2:133,Backpack3:134,Backpack4:135,Backpack5:136,Backpack6:137,Backpack7:138,Backpack8:139,Backpack9:140,Backpack10:141,Backpack11:142,Backpack12:143,Backpack13:144,Backpack14:145,Backpack15:146};function se(r){let e=typeof r=="number"?r:Number(r);return Number.isFinite(e)?Math.trunc(e):0}var zr=class r{ownerObjectId=0;accountId="";name="";classType=0;level=1;health=0;maxHealth=0;mana=0;maxMana=0;attack=0;defense=0;speed=0;vitality=0;wisdom=0;dexterity=0;healthBonus=0;manaBonus=0;attackBonus=0;defenseBonus=0;speedBonus=0;vitalityBonus=0;wisdomBonus=0;dexterityBonus=0;exaltedAttack=0;exaltedDefense=0;exaltedSpeed=0;exaltedVitality=0;exaltedWisdom=0;exaltedDexterity=0;exaltedMaxHP=0;exaltedMaxMP=0;exaltationDamageMultiplier=0;_wireHpBoost=null;_wireMpBoost=null;_wireAttackBonus=null;_wireDefenseBonus=null;_wireSpeedBonus=null;_wireVitalityBonus=null;_wireWisdomBonus=null;_wireDexterityBonus=null;inventory=new Array(12).fill(-1);backpack=new Array(16).fill(-1);quickSlots=Array.from({length:3},()=>({itemType:-1,quantity:0}));healthStackCount=0;magicStackCount=0;effects=[0,0];pos={x:0,y:0};mapName="";mapWidth=0;mapHeight=0;teleportAllowed=!1;questObjectId=-1;stars=0;currentFame=0;characterAliveFame=0;credits=0;skin=0;tex1=0;tex2=0;sinkLevel=0;guildName="";guildRank=0;hasBackpack=!1;backpackTier=0;legacyHasBackpackStat75=!1;hasThirdQuickSlot=!1;vaultContent=[];vaultChestObjectId=-1;powerLevel=0;static gearOnlyFromCombined(e,t){let n=Math.trunc(Number(e))||0,i=Math.trunc(Number(t))||0,s=i>0?i:0;return Math.max(0,n-s)}refreshBackpackPresenceFromStats(){this.hasBackpack=this.backpackTier!==0||this.legacyHasBackpackStat75}get hasBackpackExtender(){return this.backpackTier>=16}applyGearBonusesFromWireMinusExalt(){this._wireHpBoost!==null&&(this.healthBonus=r.gearOnlyFromCombined(this._wireHpBoost,this.exaltedMaxHP)),this._wireMpBoost!==null&&(this.manaBonus=r.gearOnlyFromCombined(this._wireMpBoost,this.exaltedMaxMP)),this._wireAttackBonus!==null&&(this.attackBonus=r.gearOnlyFromCombined(this._wireAttackBonus,this.exaltedAttack)),this._wireDefenseBonus!==null&&(this.defenseBonus=r.gearOnlyFromCombined(this._wireDefenseBonus,this.exaltedDefense)),this._wireSpeedBonus!==null&&(this.speedBonus=r.gearOnlyFromCombined(this._wireSpeedBonus,this.exaltedSpeed)),this._wireVitalityBonus!==null&&(this.vitalityBonus=r.gearOnlyFromCombined(this._wireVitalityBonus,this.exaltedVitality)),this._wireWisdomBonus!==null&&(this.wisdomBonus=r.gearOnlyFromCombined(this._wireWisdomBonus,this.exaltedWisdom)),this._wireDexterityBonus!==null&&(this.dexterityBonus=r.gearOnlyFromCombined(this._wireDexterityBonus,this.exaltedDexterity))}hasConditionEffect(e){let t=zi[e];return t===void 0?!1:t<31?(this.effects[0]&1<<t)!==0:(this.effects[1]&1<<t-31)!==0}parseStat(e,t,n){switch(e){case x.MaxHP:this.maxHealth=t;break;case x.HP:this.health=t;break;case x.MaxMP:this.maxMana=t;break;case x.MP:this.mana=t;break;case x.Attack:this.attack=t;break;case x.Defense:this.defense=t;break;case x.Speed:this.speed=t;break;case x.Vitality:this.vitality=t;break;case x.Wisdom:this.wisdom=t;break;case x.Dexterity:this.dexterity=t;break;case x.Level:this.level=t;break;case x.Stars:this.stars=t;break;case x.NameStat:this.name=t;break;case x.AccountId:this.accountId=t;break;case x.CurrentFame:this.currentFame=t;break;case x.CharacterAliveFame:this.characterAliveFame=se(t);break;case x.PowerLevel:this.powerLevel=se(t);break;case x.Credits:this.credits=t;break;case x.Effects:this.effects[0]=t;break;case x.Effects2:this.effects[1]=t;break;case x.Texture1:this.tex1=t;break;case x.Texture2:this.tex2=t;break;case x.HpBoost:this._wireHpBoost=se(t);break;case x.MpBoost:this._wireMpBoost=se(t);break;case x.AttackBonus:this._wireAttackBonus=se(t);break;case x.DefenseBonus:this._wireDefenseBonus=se(t);break;case x.SpeedBonus:this._wireSpeedBonus=se(t);break;case x.VitalityBonus:this._wireVitalityBonus=se(t);break;case x.WisdomBonus:this._wireWisdomBonus=se(t);break;case x.DexterityBonus:this._wireDexterityBonus=se(t);break;case x.ExaltationDamageMultiplier:this.exaltationDamageMultiplier=se(t);break;case x.Skin:this.skin=t;break;case x.GuildName:this.guildName=t;break;case x.GuildRank:this.guildRank=t;break;case x.HealthStackCount:this.healthStackCount=se(t);break;case x.MagicStackCount:this.magicStackCount=se(t);break;case x.HasBackpack:this.legacyHasBackpackStat75=t!==0,this.refreshBackpackPresenceFromStats();break;case x.BackpackTier:this.backpackTier=se(t),this.refreshBackpackPresenceFromStats();break;case x.QuickSlot0:this.quickSlots[0]={itemType:se(t),quantity:Math.max(0,se(n??0))};break;case x.QuickSlot1:this.quickSlots[1]={itemType:se(t),quantity:Math.max(0,se(n??0))};break;case x.QuickSlot2:{let i=se(t);this.quickSlots[2]={itemType:i,quantity:Math.max(0,se(n??0))},i>0&&(this.hasThirdQuickSlot=!0);break}case x.WireExaltAttack:this.exaltedAttack=se(t);break;case x.WireExaltDefense:this.exaltedDefense=se(t);break;case x.WireExaltSpeed:this.exaltedSpeed=se(t);break;case x.WireExaltVitality:this.exaltedVitality=se(t);break;case x.WireExaltDexterity:this.exaltedDexterity=se(t);break;case x.WireExaltWisdom:this.exaltedWisdom=se(t);break;case x.WireExaltMaxHP:this.exaltedMaxHP=se(t);break;case x.WireExaltMaxMP:this.exaltedMaxMP=se(t);break;default:e>=8&&e<=19&&(this.inventory[e-8]=t),e>=131&&e<=146&&(this.backpack[e-131]=t);break}}parseStatus(e){for(let t of e)this.parseStat(t.id,t.value,t.stackCount);this.applyGearBonusesFromWireMinusExalt()}};X();var Wa="5a4d2016bc16dc64883194ffd9",Ga="c91d9eec420160730d825604e0",Yi=class r{constructor(e,t){this.proxy=e;this.clientSocket=t,this.clientSocket.setNoDelay(!0),this.clientSocket.on("data",n=>this.onClientData(n)),this.clientSocket.on("error",n=>this.onError("client",n)),this.clientSocket.on("close",()=>this.dispose())}clientReceiveCipher=new Wt(Wa);clientSendCipher=new Wt(Ga);serverReceiveCipher=new Wt(Ga);serverSendCipher=new Wt(Wa);clientSocket;serverSocket=null;clientBuffer=new Jr;serverBuffer=new Jr;closed=!1;serverConnecting=!1;pendingServerQueue=[];state;playerData=new zr;lastUpdate=0;previousTime=0;relativeTime=0;serverConnectedAt=0;lastNewTickId=0;lastServerRealTimeMs=0;lastClientMoveAt=0;lastTeleportSentAt=0;lastTeleportGotoAt=0;pendingTeleportSentAt=0;pendingTeleportTargetObjectId=null;originalTargetIp="";clientId="";clientAccum=Buffer.alloc(0);serverAccum=Buffer.alloc(0);_pendingHello=null;_helloRetryTimer=null;_helloRetryCount=0;_serverResponded=!1;_helloIsRetrying=!1;static HELLO_RETRY_MS=3e3;static HELLO_MAX_RETRIES=3;get time(){return Date.now()+this.relativeTime}get gameTime(){return this.serverConnectedAt>0?Date.now()-this.serverConnectedAt:Math.max(0,Date.now()+this.relativeTime)}get objectId(){return this.playerData.ownerObjectId}get connected(){return!this.closed}connectToServer(e){this._helloRetryTimer&&(clearTimeout(this._helloRetryTimer),this._helloRetryTimer=null),this._helloIsRetrying?this._helloIsRetrying=!1:this._helloRetryCount=0,this.serverSocket&&(this.serverSocket.removeAllListeners(),this.serverSocket.destroy(),this.serverSocket=null),this.serverReceiveCipher=new Wt(Ga),this.serverSendCipher=new Wt(Wa),this.serverBuffer=new Jr,this.serverAccum=Buffer.alloc(0),this._pendingHello=e,this._serverResponded=!1,this.serverConnecting=!0,this.pendingServerQueue=[],this.serverSocket=new kd.default.Socket,this.serverSocket.setNoDelay(!0),this.serverSocket.on("data",n=>this.onServerData(n)),this.serverSocket.on("error",n=>this.onError("server",n)),this.serverSocket.on("close",()=>this.dispose());let t=e.data.key;m.log("Client",`Connecting to ${this.state.conTargetAddress}:${this.state.conTargetPort}...`),m.debug("reconnect","Client",`HELLO key being sent (${Buffer.isBuffer(t)?t.length:0} bytes): ${Buffer.isBuffer(t)?t.toString("hex").slice(0,80):typeof t}`),this.serverSocket.connect(this.state.conTargetPort,this.state.conTargetAddress,()=>{this.serverConnectedAt=Date.now(),m.log("Client",`Connected to ${this.state.conTargetAddress}:${this.state.conTargetPort}`),this.serverConnecting=!1,m.debug("proxy","Client",`[DIAG-connect] about to forward HELLO (modified=${e.modified}, rawLen=${e.rawBytes?.length??0})`),e.modified?this.sendToServer(e):this.forwardRaw(e.rawBytes,!1),m.debug("proxy","Client","[DIAG-connect] HELLO forwarded"),this.flushPendingServerQueue(),m.debug("proxy","Client",`[DIAG-connect] flushed pending queue (size=${this.pendingServerQueue.length})`);try{this.proxy.fireClientConnected(this),m.debug("proxy","Client","[DIAG-connect] fireClientConnected returned")}catch(n){m.error("Client","[DIAG-connect] fireClientConnected THREW",n)}try{this._scheduleHelloRetry(),m.debug("proxy","Client","[DIAG-connect] HELLO retry scheduled \u2014 waiting for server")}catch(n){m.error("Client","[DIAG-connect] _scheduleHelloRetry THREW",n)}})}_scheduleHelloRetry(){this._helloRetryTimer=setTimeout(()=>{if(this._helloRetryTimer=null,!(this._serverResponded||this.closed||!this._pendingHello)){if(this._helloRetryCount>=r.HELLO_MAX_RETRIES){m.warn("Client",`HELLO unanswered after ${r.HELLO_MAX_RETRIES} retries \u2014 giving up`);return}this._helloRetryCount++,this._helloIsRetrying=!0,m.log("Client",`HELLO unanswered \u2014 retry ${this._helloRetryCount}/${r.HELLO_MAX_RETRIES}`),this.connectToServer(this._pendingHello)}},r.HELLO_RETRY_MS)}sendToClient(e){this.send(e,!0)}sendToServer(e){this.send(e,!1)}sendRawToServer(e){this.closed||this.forwardRaw(e,!1)}lagMode=!1;_lagQueue=[];flushLagQueue(){let e=this._lagQueue.length;for(let t of this._lagQueue)this.forwardRaw(t.rawBytes,t.toClient);return this._lagQueue=[],e}dropLagQueue(){let e=this._lagQueue.length;return this._lagQueue=[],e}get lagQueueSize(){return this._lagQueue.length}get lagQueueBytes(){return this._lagQueue.reduce((e,t)=>e+t.rawBytes.length,0)}dispose(){if(!this.closed){m.debug("proxy","Client",`[DIAG-dispose] called \u2014 stack: ${(new Error().stack??"").split(`
`).slice(1,5).join(" | ").trim()}`),this.closed=!0,this._helloRetryTimer&&(clearTimeout(this._helloRetryTimer),this._helloRetryTimer=null),this.proxy.fireClientDisconnected(this);try{this.clientSocket.destroy()}catch{}try{this.serverSocket?.destroy()}catch{}this.clientBuffer.dispose(),this.serverBuffer.dispose(),m.log("Client","Disconnected.")}}send(e,t){try{let n=this.proxy.packetFactory.serialize(e),i=t?this.clientSendCipher:this.serverSendCipher,s=t?this.clientSocket:this.serverSocket;if(!s||s.destroyed)return;i.cipher(n),s.write(n)}catch(n){m.error("Client",`Send error (${t?"client":"server"})`,n),this.dispose()}}forwardRaw(e,t){try{let n=t?this.clientSendCipher:this.serverSendCipher,i=t?this.clientSocket:this.serverSocket;if(!t&&this.serverConnecting){let o=Buffer.from(e);n.cipher(o),this.pendingServerQueue.push(o);return}if(!i||i.destroyed){m.warn("Client",`[DIAG-forwardRaw] skipped \u2014 socket ${t?"client":"server"} is ${i?"destroyed":"null"}`);return}let s=Buffer.from(e);n.cipher(s),i.write(s)}catch(n){m.error("Client",`ForwardRaw error (${t?"client":"server"})`,n),this.dispose()}}flushPendingServerQueue(){if(this.pendingServerQueue.length!==0){m.log("Client",`Flushing ${this.pendingServerQueue.length} buffered packets to server`);for(let e of this.pendingServerQueue)this.serverSocket&&!this.serverSocket.destroyed&&this.serverSocket.write(e);this.pendingServerQueue=[]}}onClientData(e){m.log("Client",`[DIAG-onClientData] Received ${e.length} bytes (raw=${e.subarray(0,Math.min(32,e.length)).toString("hex")})`),this.processIncoming(e,!0)}onServerData(e){this._serverResponded||(this._serverResponded=!0,this._helloRetryCount=0,this._helloRetryTimer&&(clearTimeout(this._helloRetryTimer),this._helloRetryTimer=null)),this.processIncoming(e,!1)}processIncoming(e,t){let n=t?this.clientReceiveCipher:this.serverReceiveCipher,i=t?this.clientAccum:this.serverAccum;i.length===0?i=Buffer.from(e):i=Buffer.concat([i,e],i.length+e.length),t?this.clientAccum=i:this.serverAccum=i;try{for(;;){let s=t?this.clientAccum:this.serverAccum;if(s.length<4)break;let o=s.readInt32BE(0);if(o<=0||o>1048576){m.warn("Client",`Invalid packet length: ${o}, disconnecting`),this.dispose();return}if(s.length<o)break;let a=Buffer.alloc(o);s.copy(a,0,0,o);let l=s.subarray(o),c=Buffer.from(l);t?this.clientAccum=c:this.serverAccum=c,n.cipher(a);let u=this.proxy.packetFactory.createFromBytes(a);if(!t&&u.name==="FAILURE"&&u.isDefined&&m.warn("Client",`[DIAG-FAILURE] errorId=${u.data.errorId} errorMessage="${u.data.errorMessage}"`),t?this.proxy.fireClientPacket(this,u):this.proxy.fireServerPacket(this,u),u.send){let d=u.modified?this.proxy.packetFactory.serialize(u):u.rawBytes!==a?u.rawBytes:a;this.lagMode?this._lagQueue.push({rawBytes:Buffer.from(d),toClient:!t}):this.forwardRaw(d,!t)}}}catch(s){m.error("Client",`Process error (${t?"client":"server"})`,s),this.dispose()}}onError(e,t){if(this.closed)return;let n=t.code;if(m.debug("proxy","Client",`[DIAG-onError] source=${e} code=${n??"n/a"} message=${t.message}`),n==="ECONNRESET"||n==="EPIPE"){this.dispose();return}if(e==="server"&&!this._serverResponded&&this._pendingHello){if(this._helloRetryCount<r.HELLO_MAX_RETRIES){this._helloRetryCount++,this._helloIsRetrying=!0,m.warn("Client",`Server error before HELLO response (${n??t.message}) \u2014 retry ${this._helloRetryCount}/${r.HELLO_MAX_RETRIES}`),this.connectToServer(this._pendingHello);return}m.warn("Client",`Server unreachable after ${r.HELLO_MAX_RETRIES} retries (${n??t.message}) \u2014 giving up`),this.dispose();return}m.error("Client",`${e} socket error`,t),this.dispose()}};var _d=require("crypto"),Xi=class{guid;client;accountId="";conTargetAddress="54.241.208.233";conTargetPort=2050;gameId=-2;conRealKey=Buffer.alloc(0);pendingKeyRestore=!1;accessToken="";helloTemplate=null;helloKeyOffset=-1;store=new Map;constructor(e){this.guid=(0,_d.randomUUID)().replace(/-/g,""),this.client=e}get(e){return this.store.get(e)}set(e,t){this.store.set(e,t)}has(e){return this.store.has(e)}copyStoreFrom(e){for(let[t,n]of e.store)this.store.set(t,n)}};X();$n();var w_=(0,Rt.join)((0,qa.tmpdir)(),"rotmg_proxy_target.txt"),Va="rotmg_proxy_target_",iS=0;function sS(){return"c"+ ++iS+"_"+Date.now().toString(36)}var Qi=class r extends Nd.EventEmitter{constructor(t){super();this.packetFactory=t}static DEFAULT_SERVER="54.241.208.233";listener=null;states=new Map;packetHooks=new Map;commandHooks=new Map;pluginHooks=new Map;start(t="127.0.0.1",n=2050){m.log("Proxy",`Starting listener on ${t}:${n}...`),this.listener=Rd.default.createServer(i=>this.onLocalConnect(i)),this.listener.listen(n,t,()=>{m.log("Proxy",`Listening on ${t}:${n}`),this.emit("listenStarted")}),this.listener.on("error",i=>{m.error("Proxy",`Listener error: ${i.message}`,i)})}stop(){this.listener&&(m.log("Proxy","Stopping listener..."),this.listener.close(),this.listener=null,this.emit("listenStopped"))}getState(t,n){let i=n.length===0?"n/a":n.toString("utf8"),s=new Xi(t);if(this.states.set(s.guid,s),m.debug("reconnect","State",`Lookup \u2014 guid from key: "${i.slice(0,40)}", states count: ${this.states.size}, found: ${i!=="n/a"&&this.states.has(i)}`),i!=="n/a"&&this.states.has(i)){let o=this.states.get(i);s.conTargetAddress=o.conTargetAddress,s.conTargetPort=o.conTargetPort,s.conRealKey=o.conRealKey,s.pendingKeyRestore=!0,s.copyStoreFrom(o),m.debug("reconnect","State",`Restored from previous \u2014 address: ${o.conTargetAddress}, port: ${o.conTargetPort}, keyLen: ${o.conRealKey.length}`)}return s}hookPacket(t,n,i,s=!1){this.packetHooks.has(t)||this.packetHooks.set(t,[]);let o=this.packetHooks.get(t);if(s?o.unshift(n):o.push(n),i){this.pluginHooks.has(i)||this.pluginHooks.set(i,{packets:new Map,commands:new Map});let a=this.pluginHooks.get(i);a.packets.has(t)||a.packets.set(t,[]),a.packets.get(t).push(n)}}hookCommand(t,n,i){let s=t.startsWith("/")?t.slice(1).toLowerCase():t.toLowerCase();if(this.commandHooks.has(s)||this.commandHooks.set(s,[]),this.commandHooks.get(s).push(n),i){this.pluginHooks.has(i)||this.pluginHooks.set(i,{packets:new Map,commands:new Map});let o=this.pluginHooks.get(i);o.commands.has(s)||o.commands.set(s,[]),o.commands.get(s).push(n)}}unhookPlugin(t){let n=this.pluginHooks.get(t);if(n){for(let[i,s]of n.packets){let o=this.packetHooks.get(i);o&&this.packetHooks.set(i,o.filter(a=>!s.includes(a)))}for(let[i,s]of n.commands){let o=this.commandHooks.get(i);o&&this.commandHooks.set(i,o.filter(a=>!s.includes(a)))}this.pluginHooks.delete(t)}}fireServerPacket(t,n){this.listenerCount("serverPacket")>0&&this.emit("serverPacket",t,n),this.firePacketHooks(t,n),n.name==="UPDATE"&&(n.send=!0)}fireClientPacket(t,n){if(n.name==="PLAYERTEXT"&&n.isDefined&&this.commandHooks.size>0){let s=n.data.text.replace("/","").toLowerCase().split(" "),o=s[0],a=s.slice(1),l=this.commandHooks.get(o);if(l&&l.length>0){let c=!1;for(let u of l)try{u(t,o,a)!==!1&&(c=!0)}catch(d){m.error("Proxy",`Command handler error for /${o}`,d)}c&&(n.send=!1)}}this.listenerCount("clientPacket")>0&&this.emit("clientPacket",t,n),this.firePacketHooks(t,n)}fireClientConnected(t){this.emit("clientConnected",t)}fireClientDisconnected(t){this.emit("clientDisconnected",t)}firePacketHooks(t,n){let i=this.packetHooks.get(n.name);if(!(!i||i.length===0))for(let s of i)try{s(t,n)}catch(o){m.error("Proxy",`Packet hook error for ${n.name}`,o)}}getTargetDirectories(){let t=new Set;t.add((0,qa.tmpdir)());try{let n=bt.findAll();for(let i of n)t.add((0,Rt.resolve)(i,"..","..","Temp")),t.add((0,Rt.resolve)(i,"..","..","temp")),t.add((0,Rt.resolve)(i,"..","..","..","windows","temp"))}catch{}return Array.from(t).filter(n=>{try{return(0,lt.existsSync)(n)}catch{return!1}})}readOriginalTarget(){for(let t of this.getTargetDirectories()){let n=this.readTargetFile((0,Rt.join)(t,"rotmg_proxy_target.txt"));if(n)return n}return m.warn("Proxy",`No DLL target found in any temp directories, using default: ${r.DEFAULT_SERVER}`),r.DEFAULT_SERVER}onLocalConnect(t){m.log("Proxy","Client connected.");let n=new Yi(this,t);n.clientId=sS(),n.originalTargetIp=this.readOriginalTargetForSocket(t),this.emit("clientBeginConnect",n)}readOriginalTargetForSocket(t){let n=t.remotePort,i=this.getTargetDirectories();if(n)if(process.platform==="win32")try{let s=(0,Ad.execFileSync)("powershell.exe",["-NonInteractive","-NoProfile","-Command",`(Get-NetTCPConnection -LocalPort ${n} -RemotePort 2050 -State Established -ErrorAction SilentlyContinue | Select-Object -First 1).OwningProcess`],{encoding:"utf8",timeout:2e3,windowsHide:!0}).trim(),o=parseInt(s,10);if(Number.isFinite(o)&&o>0)for(let a of i){let l=(0,Rt.join)(a,`${Va}${o}.txt`),c=this.readTargetFile(l);if(c){try{(0,lt.unlinkSync)(l)}catch{}return c}}}catch{}else for(let s of i)try{for(let o of(0,lt.readdirSync)(s))if(o.startsWith(Va)&&o.endsWith(".txt")){let a=(0,Rt.join)(s,o),l=this.readTargetFile(a);if(l){try{(0,lt.unlinkSync)(a)}catch{}return l}}}catch{}return this.readOriginalTarget()}readTargetFile(t){try{if((0,lt.existsSync)(t)){let n=(0,lt.readFileSync)(t,"utf8").trim();if(n&&/^\d+\.\d+\.\d+\.\d+$/.test(n)&&n!=="127.0.0.1")return m.log("Proxy",`DLL hook target (${t}): ${n}`),n}}catch{}return""}cleanStalePidFiles(){for(let t of this.getTargetDirectories())try{for(let n of(0,lt.readdirSync)(t))if(n.startsWith(Va)&&n.endsWith(".txt"))try{(0,lt.unlinkSync)((0,Rt.join)(t,n))}catch{}}catch{}}};var Ja=require("fs");var wr=class{buffer;_offset;constructor(e,t=0){this.buffer=e,this._offset=t}get position(){return this._offset}get length(){return this.buffer.length}get remaining(){return this.buffer.length-this._offset}readByte(){let e=this.buffer.readUInt8(this._offset);return this._offset+=1,e}readSByte(){let e=this.buffer.readInt8(this._offset);return this._offset+=1,e}readBool(){return this.readByte()!==0}readInt16(){let e=this.buffer.readInt16BE(this._offset);return this._offset+=2,e}readUInt16(){let e=this.buffer.readUInt16BE(this._offset);return this._offset+=2,e}readInt32(){let e=this.buffer.readInt32BE(this._offset);return this._offset+=4,e}readUInt32(){let e=this.buffer.readUInt32BE(this._offset);return this._offset+=4,e}readFloat(){let e=this.buffer.readFloatBE(this._offset);return this._offset+=4,e}readString(){let e=this.readInt16();if(e<0||e>this.remaining)throw new Error(`Invalid string length: ${e}, remaining: ${this.remaining}`);let t=this.buffer.toString("utf8",this._offset,this._offset+e);return this._offset+=e,t}readUtf32String(){let e=this.readInt32();if(e<0||e>this.remaining)throw new Error(`Invalid utf32 string length: ${e}, remaining: ${this.remaining}`);let t=this.buffer.toString("utf8",this._offset,this._offset+e);return this._offset+=e,t}readBytes(e){if(e<0||e>this.remaining)throw new Error(`Cannot read ${e} bytes, remaining: ${this.remaining}`);let t=Buffer.alloc(e);return this.buffer.copy(t,0,this._offset,this._offset+e),this._offset+=e,t}readRemainingBytes(){return this.readBytes(this.remaining)}readCompressedInt(){let e=this.readByte(),t=(e&64)!==0,n=6,i=e&63;for(;(e&128)!==0;)e=this.readByte(),i|=(e&127)<<n,n+=7;return t?-i:i}};var Bn=class{chunks=[];_length=0;get length(){return this._length}writeByte(e){let t=Buffer.alloc(1);t.writeUInt8(e&255,0),this.chunks.push(t),this._length+=1}writeSByte(e){let t=Buffer.alloc(1);t.writeInt8(e,0),this.chunks.push(t),this._length+=1}writeBool(e){this.writeByte(e?1:0)}writeInt16(e){let t=Buffer.alloc(2);t.writeInt16BE(e,0),this.chunks.push(t),this._length+=2}writeUInt16(e){let t=Buffer.alloc(2);t.writeUInt16BE(e,0),this.chunks.push(t),this._length+=2}writeInt32(e){let t=Buffer.alloc(4);t.writeInt32BE(e,0),this.chunks.push(t),this._length+=4}writeUInt32(e){let t=Buffer.alloc(4);t.writeUInt32BE(e,0),this.chunks.push(t),this._length+=4}writeFloat(e){let t=Buffer.alloc(4);t.writeFloatBE(e,0),this.chunks.push(t),this._length+=4}writeString(e){let t=Buffer.from(e,"utf8");this.writeInt16(t.length),this.chunks.push(t),this._length+=t.length}writeUtf32String(e){let t=Buffer.from(e,"utf8");this.writeInt32(t.length),this.chunks.push(t),this._length+=t.length}writeBytes(e){this.chunks.push(Buffer.from(e)),this._length+=e.length}writeCompressedInt(e){let t=e<0,n=t?-e:e,i=n&63;t&&(i|=64),n=n>>>6;let s=n>0;for(s&&(i|=128),this.writeByte(i);s;){let o=n&127;n=n>>>7,s=n>0,s&&(o|=128),this.writeByte(o)}}toBuffer(){return Buffer.concat(this.chunks,this._length)}static writeInt32At(e,t,n=0){e.writeInt32BE(t,n)}};function Zi(r,e,t="unknown"){return{id:r,name:e,direction:t,send:!0,modified:!1,data:{},rawBytes:Buffer.alloc(0),unreadData:Buffer.alloc(0),isDefined:!1,bodyLength:0}}X();var es=class{definitions=new Map;nameToId=new Map;dataObjects=new Map;stringStatIds=new Set;constructor(e,t){let n=typeof e=="string"?JSON.parse((0,Ja.readFileSync)(e,"utf8")):e,i=typeof t=="string"?JSON.parse((0,Ja.readFileSync)(t,"utf8")):t;for(let[s,o]of Object.entries(n.packets)){let a=parseInt(s,10);this.definitions.set(a,o),this.nameToId.set(o.name,a)}for(let[s,o]of Object.entries(n.dataObjects))this.dataObjects.set(s,o);for(let s of i.stringStats)this.stringStatIds.add(s);m.log("PacketFactory",`Loaded ${this.definitions.size} packet definitions, ${this.dataObjects.size} data objects`)}createFromBytes(e){let t=e[4],n=this.definitions.get(t);if(!n){let s=Zi(t,`UNKNOWN_${t}`,"unknown");return s.rawBytes=e,s.bodyLength=e.length-5,s.unreadData=e.subarray(5),s}let i=Zi(t,n.name,n.direction);i.rawBytes=e,i.bodyLength=e.length-5,i.isDefined=!0;try{let s=new wr(e,5);i.data=this.readFields(s,n.fields),s.remaining>0&&(i.unreadData=s.readRemainingBytes())}catch(s){m.warn("PacketFactory",`Failed to parse ${n.name} (id=${t}): ${s.message}`),i.isDefined=!1,i.data={},i.unreadData=e.subarray(5)}return i}createByName(e){let t=this.nameToId.get(e);if(t===void 0)throw new Error(`Unknown packet name: ${e}`);let n=this.definitions.get(t),i=Zi(t,e,n.direction);return i.isDefined=!0,i}serialize(e){if(!e.isDefined)return e.rawBytes;let t=this.definitions.get(e.id);if(!t)return e.rawBytes;let n=new Bn;n.writeInt32(0),n.writeByte(e.id);try{this.writeFields(n,t.fields,e.data),e.unreadData.length>0&&n.writeBytes(e.unreadData)}catch(s){return m.warn("PacketFactory",`Failed to serialize ${e.name}: ${s.message}`),e.rawBytes}let i=n.toBuffer();return Bn.writeInt32At(i,i.length,0),i}getPacketName(e){return this.definitions.get(e)?.name??`UNKNOWN_${e}`}getPacketId(e){return this.nameToId.get(e)}readFields(e,t){let n={},i=0;for(let s of t){if(s.optional&&e.remaining<=0){n[s.name]=s.default;continue}let o=this.readField(e,s,()=>i);n[s.name]=o,s.name==="id"&&typeof o=="number"&&(i=o)}return n}readField(e,t,n){switch(t.type){case"byte":return e.readByte();case"sbyte":return e.readSByte();case"bool":return e.readBool();case"int16":return e.readInt16();case"uint16":return e.readUInt16();case"int32":return e.readInt32();case"uint32":return e.readUInt32();case"float":return e.readFloat();case"string":return e.readString();case"utf32string":return e.readUtf32String();case"compressedInt":return e.readCompressedInt();case"byteArray16":{let i=e.readInt16();return e.readBytes(i)}case"byteArray32":{let i=e.readInt32();return e.readBytes(i)}case"statValue":{let i=n();return this.stringStatIds.has(i)?e.readString():e.readCompressedInt()}case"array":return this.readArray(e,t,n);default:{let i=this.dataObjects.get(t.type);if(i)return this.readDataObject(e,i);throw new Error(`Unknown field type: ${t.type}`)}}}readArray(e,t,n){let i;switch(t.lengthType){case"int16":i=e.readInt16();break;case"uint16":i=e.readUInt16();break;case"int32":i=e.readInt32();break;case"compressedInt":i=e.readCompressedInt();break;case"byte":i=e.readByte();break;default:i=e.readInt16();break}let s=[],o={name:"_element",type:t.elementType};for(let a=0;a<i;a++)s.push(this.readField(e,o,n));return s}readDataObject(e,t){return this.readFields(e,t.fields)}writeFields(e,t,n){let i=0;for(let s of t){let o=n[s.name];s.optional&&o===void 0||s.optional&&o===s.default||(this.writeField(e,s,o,()=>i),s.name==="id"&&typeof o=="number"&&(i=o))}}writeField(e,t,n,i){switch(t.type){case"byte":e.writeByte(n);break;case"sbyte":e.writeSByte(n);break;case"bool":e.writeBool(n);break;case"int16":e.writeInt16(n);break;case"uint16":e.writeUInt16(n);break;case"int32":e.writeInt32(n);break;case"uint32":e.writeUInt32(n);break;case"float":e.writeFloat(n);break;case"string":e.writeString(n??"");break;case"utf32string":e.writeUtf32String(n??"");break;case"compressedInt":e.writeCompressedInt(n??0);break;case"byteArray16":{let s=Buffer.isBuffer(n)?n:Buffer.alloc(0);e.writeInt16(s.length),e.writeBytes(s);break}case"byteArray32":{let s=Buffer.isBuffer(n)?n:Buffer.alloc(0);e.writeInt32(s.length),e.writeBytes(s);break}case"statValue":{let s=i();this.stringStatIds.has(s)?e.writeString(n??""):e.writeCompressedInt(n??0);break}case"array":{this.writeArray(e,t,n??[],i);break}default:{let s=this.dataObjects.get(t.type);if(s)this.writeDataObject(e,s,n??{});else throw new Error(`Unknown field type: ${t.type}`)}}}writeArray(e,t,n,i){switch(t.lengthType){case"int16":e.writeInt16(n.length);break;case"uint16":e.writeUInt16(n.length);break;case"int32":e.writeInt32(n.length);break;case"compressedInt":e.writeCompressedInt(n.length);break;case"byte":e.writeByte(n.length);break;default:e.writeInt16(n.length);break}let s={name:"_element",type:t.elementType};for(let o of n)this.writeField(e,s,o,i)}writeDataObject(e,t,n){this.writeFields(e,t.fields,n)}};X();Ln();var Od="__LFG_dllFeatureBus_v1";function Md(){let r=globalThis,e=r[Od];return e||(e={sender:null},r[Od]=e),e}var N_=`bus_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;function za(r){Md().sender=r}function ts(r,e){let t=Md();return t.sender?(t.sender(r,e),!0):!1}function aS(r){try{let e=5;e+=4;let t=r.readInt16BE(e);e+=2+t;let n=r.readInt16BE(e);return e+=2+n,e+=4,e}catch{return-1}}function lS(r,e,t){let n=r.readInt16BE(e),i=r.subarray(0,e),s=r.subarray(e+2+n),o=Buffer.alloc(i.length+2+t.length+s.length),a=0;return i.copy(o,a),a+=i.length,o.writeInt16BE(t.length,a),a+=2,t.copy(o,a),a+=t.length,s.copy(o,a),o.writeInt32BE(o.length,0),o}var rs=class{proxy;attach(e){this.proxy=e,e.hookPacket("HELLO",(t,n)=>this.onHello(t,n)),e.hookPacket("RECONNECT",(t,n)=>this.onReconnect(t,n))}onHello(e,t){ts("playerColliderSceneReset",1);let n=t.data.key,i=Buffer.isBuffer(n)?n.toString("hex"):"not-a-buffer",s=Buffer.isBuffer(n)?n.toString("utf8"):"";m.debug("reconnect","Reconnect",`[HELLO] Received \u2014 key (${Buffer.isBuffer(n)?n.length:0} bytes): ${i}`),m.debug("reconnect","Reconnect",`[HELLO] Key as UTF-8: "${s}"`),e.state=this.proxy.getState(e,n),t.rawBytes.length>0&&(e.state.helloTemplate=Buffer.from(t.rawBytes),e.state.helloKeyOffset=aS(e.state.helloTemplate),m.debug("reconnect","Reconnect",`[HELLO] Captured template (${e.state.helloTemplate.length} bytes, keyOffset=${e.state.helloKeyOffset})`));let o=t.data.gameId;typeof o=="number"&&Number.isFinite(o)&&(e.state.gameId=o);let a=t.data.accessToken;if(a&&(e.state.accessToken=a),m.debug("reconnect","Reconnect",`[HELLO] State lookup \u2014 conTargetAddress: ${e.state.conTargetAddress}, conTargetPort: ${e.state.conTargetPort}`),m.debug("reconnect","Reconnect",`[HELLO] State lookup \u2014 conRealKey (${e.state.conRealKey.length} bytes): ${e.state.conRealKey.toString("hex").slice(0,80)}`),e.originalTargetIp&&e.originalTargetIp!=="127.0.0.1"&&e.state.conTargetAddress==="54.241.208.233"&&(m.debug("reconnect","Reconnect",`[HELLO] Overriding default server with DLL target: ${e.originalTargetIp}`),e.state.conTargetAddress=e.originalTargetIp),e.state.pendingKeyRestore){let l=e.state.conRealKey;m.debug("reconnect","Reconnect",`[HELLO] Restoring key (${l.length} bytes): ${l.toString("hex").slice(0,80)||"(empty \u2014 fresh connection)"}`),e.state.helloTemplate&&e.state.helloKeyOffset>=0?(t.rawBytes=lS(e.state.helloTemplate,e.state.helloKeyOffset,l),m.debug("reconnect","Reconnect",`[HELLO] Patched raw template (${t.rawBytes.length} bytes)`)):(m.warn("Reconnect","[HELLO] No raw template available, falling back to re-serialization"),t.data.key=l,t.modified=!0),e.state.conRealKey=Buffer.alloc(0),e.state.pendingKeyRestore=!1}else m.debug("reconnect","Reconnect","[HELLO] First connection \u2014 keeping original key");if(It.enabled("reconnect")&&t.rawBytes.length>0){let l=this.proxy.packetFactory.serialize(t),c=t.rawBytes;if(c.length!==l.length)m.debug("reconnect","Reconnect",`[HELLO DIAG] SIZE MISMATCH: original=${c.length} serialized=${l.length}`);else{let u=-1;for(let d=0;d<c.length;d++)if(c[d]!==l[d]){u=d;break}u>=0?(m.debug("reconnect","Reconnect",`[HELLO DIAG] BYTE MISMATCH at offset ${u}: orig=0x${c[u].toString(16)} ser=0x${l[u].toString(16)}`),m.debug("reconnect","Reconnect",`[HELLO DIAG] orig[${u}-${Math.min(u+20,c.length)}]: ${c.subarray(u,u+20).toString("hex")}`),m.debug("reconnect","Reconnect",`[HELLO DIAG]  ser[${u}-${Math.min(u+20,l.length)}]: ${l.subarray(u,u+20).toString("hex")}`)):m.debug("reconnect","Reconnect",`[HELLO DIAG] Bytes match perfectly (${c.length} bytes)`)}}m.log("Reconnect",`[HELLO] Connecting to server ${e.state.conTargetAddress}:${e.state.conTargetPort}`),e.connectToServer(t),t.send=!1}onReconnect(e,t){let n=t.data.host,i=t.data.port,s=t.data.gameId,o=t.data.keyTime,a=t.data.key,l=t.data.name;m.log("Reconnect",`[RECONNECT] Received \u2014 name: "${l}", host: "${n}", port: ${i}, gameId: ${s}, keyTime: ${o}`),m.debug("reconnect","Reconnect",`[RECONNECT] Key (${Buffer.isBuffer(a)?a.length:0} bytes): ${Buffer.isBuffer(a)?a.toString("hex").slice(0,80):"not-a-buffer"}`),m.debug("reconnect","Reconnect",`[RECONNECT] Raw packet size: ${t.rawBytes.length}, isDefined: ${t.isDefined}`),t.unreadData.length>0&&m.log("Reconnect",`[RECONNECT] WARNING: ${t.unreadData.length} unread trailing bytes`),typeof s=="number"&&Number.isFinite(s)&&(e.state.gameId=s),n&&n!==""&&(e.state.conTargetAddress=n),i!==void 0&&i!==0&&(e.state.conTargetPort=i),a&&Buffer.isBuffer(a)&&a.length>0&&(e.state.conRealKey=Buffer.from(a)),m.debug("reconnect","Reconnect",`[RECONNECT] Stored \u2014 address: ${e.state.conTargetAddress}, port: ${e.state.conTargetPort}, keyLen: ${e.state.conRealKey.length}`);let c=t.rawBytes,u=Buffer.from(e.state.guid,"utf8"),d="127.0.0.1",p=2050;try{let f=5,h=c.readInt16BE(f);f+=2+h;let g=f,y=c.readInt16BE(f);f+=2+y;let b=f;f+=2,f+=4,f+=4;let S=f,E=c.readInt16BE(f);f+=2+E;let I=c.subarray(f),O=c.subarray(0,g),H=Buffer.from(d,"utf8"),W=c.subarray(b+2,S),M=O.length+2+H.length+2+W.length+2+u.length+I.length,A=Buffer.alloc(M),$=0;O.copy(A,$),$+=O.length,A.writeInt16BE(H.length,$),$+=2,H.copy(A,$),$+=H.length,A.writeUInt16BE(p,$),$+=2,W.copy(A,$),$+=W.length,A.writeInt16BE(u.length,$),$+=2,u.copy(A,$),$+=u.length,I.copy(A,$),A.writeInt32BE(A.length,0),t.rawBytes=A,m.debug("reconnect","Reconnect",`[RECONNECT] Raw-patched (${A.length} bytes) \u2014 host: ${d}, port: ${p}, guid: "${e.state.guid}"`)}catch(f){m.warn("Reconnect",`[RECONNECT] Raw patch failed (${f.message}), falling back to re-serialization`),t.data.key=u,t.data.host=d,t.data.port=p,t.modified=!0}}};var ns=require("fs"),Ld=require("path");X();var cS=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;function Dd(r){return r.replace(/[^A-Z0-9]/g,"")}function $d(r,e,t){let n=(0,Ld.join)(e,"servers.json"),i=t?{...t}:{},s=new Map,o=new Map;if(!t&&(0,ns.existsSync)(n))try{i=JSON.parse((0,ns.readFileSync)(n,"utf8"));for(let[c,u]of Object.entries(i)){s.set(u,c);let d=Dd(c).toLowerCase();d&&!o.has(d)&&o.set(d,c)}m.log("CoreCommands",`Loaded ${Object.keys(i).length} servers, /ip and /con ready`)}catch(c){m.warn("CoreCommands",`Failed to load servers.json: ${c.message}`)}else if(t){for(let[c,u]of Object.entries(i)){s.set(u,c);let d=Dd(c).toLowerCase();d&&!o.has(d)&&o.set(d,c)}m.log("CoreCommands",`Loaded ${Object.keys(i).length} baked servers, /ip and /con ready`)}function a(c,u,d){let p=r.packetFactory.createByName("TEXT");p.data={name:u,objectId:-1,numStars:-1,bubbleTime:0,recipient:"",text:d,cleanText:d,isSupporter:!1,starBg:0},c.sendToClient(p)}function l(c,u,d){if(!c.state){a(c,"Proxy","No connection state \u2014 cannot switch.");return}m.log("CoreCommands",`Switching to ${u} (${d})...`),a(c,"Proxy",`Connecting to ${u}...`),c.state.conTargetAddress=d,c.state.conTargetPort=2050,c.state.conRealKey=Buffer.alloc(0);let p=r.packetFactory.createByName("RECONNECT");p.data={name:u,host:"127.0.0.1",port:2050,gameId:-2,keyTime:-1,key:Buffer.from(c.state.guid,"utf8")},p.modified=!0,c.sendToClient(p)}r.hookCommand("ip",(c,u,d)=>{if(!c.state){a(c,"Proxy","Not connected.");return}let p=c.state.conTargetAddress||"",f=s.get(p)||"(unknown)";a(c,"Proxy",`${f}: ${p}`)}),r.hookCommand("con",(c,u,d)=>{let p=Object.keys(i);if(p.length===0){a(c,"Proxy","No servers loaded.");return}if(d.length===0){a(c,"Proxy",`Servers: ${p.join(", ")}. Use /con <name, abbr, or ip> e.g. /con USS3 or /con 54.234.226.24`);return}let f=d[0];if(cS.test(f)){let b=f,S=s.get(b)||b;l(c,S,b);return}let h=f.toLowerCase(),g=o.get(h);if(g){l(c,g,i[g]);return}let y=p.filter(b=>b.toLowerCase().startsWith(h));if(y.length===0){a(c,"Proxy",`No server matching "${d[0]}". Try /con for list.`);return}if(y.length>1){let b=y.find(S=>S.toLowerCase()===h);if(b){l(c,b,i[b]);return}a(c,"Proxy",`Ambiguous: ${y.join(", ")}`);return}l(c,y[0],i[y[0]])})}X();var Fd=require("fs"),Hd=require("path"),Wd=require("os"),Bd=(0,Hd.join)((0,Wd.tmpdir)(),"realm-engine-statdump.jsonl"),uS=process.env.RE_STAT_DUMP==="1",dS={0:"MAX_HP(0)",1:"HP(1)",3:"MAX_MP(3)",4:"MP(4)",7:"LEVEL(7)",20:"ATTACK(20)",21:"DEFENSE(21)",22:"SPEED(22)",26:"VITALITY(26)",27:"WISDOM(27)",28:"DEXTERITY(28)",46:"MAXHP_BOOST(46)",47:"MAXMP_BOOST(47)",48:"ATTACK_BOOST(48)",49:"DEFENSE_BOOST(49)",50:"SPEED_BOOST(50)",51:"VIT_BOOST(51)",52:"WIS_BOOST(52)",53:"DEX_BOOST(53)",105:"EXALTED_ATT(105)",106:"EXALTED_DEF(106)",107:"EXALTED_SPD(107)",108:"EXALTED_VIT(108)",109:"EXALTED_DEX(109)",110:"EXALTED_WIS(110)",111:"EXALTED_HP(111)",112:"EXALTED_MP(112)"},jd=!1;function Ka(r,e){if(!(!uS||!Array.isArray(r)||r.length===0))try{let t={},n={};for(let s of r){let o=Number(s.id);n[String(o)]=s.value,t[dS[o]??`id_${o}`]=s.value}let i=JSON.stringify({t:new Date().toISOString(),source:e,labelled:t,raw:n})+`
`;(0,Fd.appendFileSync)(Bd,i),jd||(jd=!0,console.log(`[StatDump] RE_STAT_DUMP active \u2192 ${Bd}`))}catch{}}function is(r,e){let t=String(r??e??"").trim();if(!t)return"";let n=t.match(/^\{s\.([^}]+)\}$/i);if(!n)return t;let i=String(n[1]||"").trim(),o=(i.includes(".")&&i.split(".").pop()||i).replace(/[_-]+/g," ").replace(/\s+/g," ").trim();return o?o.toLowerCase()==="rotmg"?"Realm":o:t}var ss=class{proxy=null;dllDefenseSource=null;defenseCalibrated=!1;setDllDefenseSource(e){this.dllDefenseSource=e}checkDefenseCalibration(e){let t=this.dllDefenseSource?this.dllDefenseSource():null;if(t===null){this.defenseCalibrated=!1;return}if(this.defenseCalibrated)return;let n=e.defense,i=e.defense+e.defenseBonus,s=Math.abs(t-n)<=1,o=Math.abs(t-i)<=1;s&&o||(this.defenseCalibrated=!0,s?m.log("DefenseCheck",`DEFENSE(21)=${n} == DLL memory ${t} \u2192 stat 21 is EFFECTIVE; 'pd.defense + pd.defenseBonus' (${i}) double-counts. AutoNexus already uses the memory value.`):o?m.log("DefenseCheck",`DEFENSE(21)+DEFENSE_BOOST(49)=${i} == DLL memory ${t} \u2192 stat 21 is BASE; the bonus add is correct.`):m.warn("DefenseCheck",`Neither wire base (${n}) nor base+bonus (${i}) == DLL memory ${t} \u2014 stat-type drift or wrong memory field. Inspect with RE_STAT_DUMP=1.`))}attach(e){this.proxy=e,e.hookPacket("CREATESUCCESS",(t,n)=>this.onCreateSuccess(t,n)),e.hookPacket("MAPINFO",(t,n)=>this.onMapInfo(t,n)),e.hookPacket("UPDATE",(t,n)=>this.onUpdate(t,n)),e.hookPacket("NEWTICK",(t,n)=>this.onNewTick(t,n)),e.hookPacket("MOVE",(t,n)=>this.onMove(t,n)),e.hookPacket("TELEPORT",(t,n)=>this.onTeleport(t,n)),e.hookPacket("GOTO",(t,n)=>this.onGoto(t,n)),e.hookPacket("PLAYERSHOOT",(t,n)=>this.onPlayerShoot(t,n)),e.hookPacket("PONG",(t,n)=>this.onPong(t,n)),e.hookPacket("QUESTOBJECTID",(t,n)=>this.onQuestObjectId(t,n))}onQuestObjectId(e,t){if(!t.isDefined)return;let n=Math.trunc(Number(t.data.objectId));e.playerData.questObjectId=Number.isFinite(n)?n:-1}onCreateSuccess(e,t){e.playerData=new zr,e.playerData.ownerObjectId=t.data.objectId,e.lastTeleportSentAt=0,e.lastTeleportGotoAt=0,e.pendingTeleportSentAt=0,e.pendingTeleportTargetObjectId=null,m.log("State",`Player created with objectId ${t.data.objectId}`)}onMapInfo(e,t){let n=t.data.displayName??"",i=t.data.name??"";e.playerData.mapName=is(n,i),e.playerData.mapWidth=t.data.width??0,e.playerData.mapHeight=t.data.height??0,e.playerData.teleportAllowed=t.data.allowPlayerTeleport??!1,e.pendingTeleportSentAt=0,e.pendingTeleportTargetObjectId=null,e.playerData.vaultContent=[],e.playerData.vaultChestObjectId=-1,e.playerData.questObjectId=-1,m.log("State",`Map: ${t.data.name} (${t.data.width}x${t.data.height})`)}onUpdate(e,t){if(!(!t.isDefined||!t.data.newObjs))for(let n of t.data.newObjs){let i=n.status;if(i&&i.objectId===e.objectId){let s=Number(n.objectType);Number.isFinite(s)&&s>0&&(e.playerData.classType=Math.trunc(s)),e.playerData.pos={...i.position},i.data&&(e.playerData.parseStatus(i.data),Ka(i.data,"UPDATE"),this.checkDefenseCalibration(e.playerData),e.playerData.accountId&&e.state&&(e.state.accountId||(e.state.accountId=e.playerData.accountId)))}}}onNewTick(e,t){if(!(!t.isDefined||!t.data.statuses)){t.data.tickId!==void 0&&(e.lastNewTickId=Number(t.data.tickId)||0),t.data.serverRealTimeMs!==void 0&&(e.lastServerRealTimeMs=Number(t.data.serverRealTimeMs)||0);for(let n of t.data.statuses)n.objectId===e.objectId&&(n.position&&(e.playerData.pos={...n.position}),n.data&&(e.playerData.parseStatus(n.data),Ka(n.data,"NEWTICK"),this.checkDefenseCalibration(e.playerData)))}}onMove(e,t){if(t.isDefined&&(e.lastClientMoveAt=Date.now(),e.previousTime=t.data.serverRealTimeMSofLastNewTick??0,e.lastServerRealTimeMs=Number(t.data.serverRealTimeMSofLastNewTick??e.lastServerRealTimeMs)||0,e.lastUpdate=Date.now(),e.relativeTime===0)){let n=t.data.records;n&&n.length>0&&n[0].time&&(e.relativeTime=n[0].time-Date.now())}}onTeleport(e,t){t.isDefined&&(e.lastTeleportSentAt=Date.now(),e.pendingTeleportSentAt=e.lastTeleportSentAt,e.pendingTeleportTargetObjectId=Number(t.data.objectId??0)||null)}onGoto(e,t){if(!t.isDefined||Number(t.data.objectId??-1)!==e.objectId)return;t.data.position&&(e.playerData.pos={...t.data.position});let n=Date.now();e.pendingTeleportSentAt>0&&n-e.pendingTeleportSentAt<=5e3?(e.lastTeleportGotoAt=n,e.pendingTeleportSentAt=0,e.pendingTeleportTargetObjectId=null):e.pendingTeleportSentAt>0&&n-e.pendingTeleportSentAt>5e3&&(e.pendingTeleportSentAt=0,e.pendingTeleportTargetObjectId=null)}onPong(e,t){t.isDefined&&e.relativeTime===0&&t.data.time&&(e.relativeTime=t.data.time-Date.now())}onPlayerShoot(e,t){if(!t.isDefined)return;e.relativeTime===0&&(e.relativeTime=(t.data.time??0)-Date.now());let n=t.data.projectilePosition,i=t.data.angle??0;n&&(e.playerData.pos={x:n.x-Math.cos(i)*.3,y:n.y-Math.sin(i)*.3}),e.lastUpdate=Date.now()}};function jn(){return{partyId:null,inParty:!1,members:new Map,localPartyPlayerId:null}}var os=class{sessions=new WeakMap;session(e){let t=this.sessions.get(e);return t||(t=jn(),this.sessions.set(e,t)),t}attach(e){e.hookPacket("INCOMINGPARTYMEMBERINFO",(t,n)=>this.onIncomingPartyMemberInfo(t,n)),e.hookPacket("PARTYMEMBERADDED",(t,n)=>this.onPartyMemberAdded(t,n)),e.hookPacket("PARTYACTION",(t,n)=>this.onPartyAction(t,n)),e.hookPacket("CREATESUCCESS",t=>{this.sessions.set(t,jn())}),e.on("clientDisconnected",t=>{this.sessions.set(t,jn())})}isInParty(e){return e?this.sessions.get(e)?.inParty??!1:!1}getMembersSnapshot(e){if(!e)return[];let t=this.sessions.get(e);return!t||t.members.size===0?[]:[...t.members.values()].sort((n,i)=>n.playerId-i.playerId)}getLocalPartyPlayerId(e){return e?this.sessions.get(e)?.localPartyPlayerId??null:null}clearParty(e){e&&this.sessions.set(e,jn())}syncLocalPartyPlayerIdFromMembers(e,t){let n=(e.playerData.name||"").trim().toLowerCase();if(!n){t.localPartyPlayerId=null;return}for(let i of t.members.values())if(i.playerName.trim().toLowerCase()===n){t.localPartyPlayerId=i.playerId;return}t.localPartyPlayerId=null}onIncomingPartyMemberInfo(e,t){if(!t.isDefined)return;let n=this.session(e),i=t.data,s=Number(i.partyId);n.partyId=Number.isFinite(s)?s>>>0:null,n.members.clear();let o=Array.isArray(i.partyPlayers)?i.partyPlayers:[];for(let a of o){let l=Math.trunc(Number(a.playerId));if(!Number.isFinite(l)||l<0||l>65535)continue;let c=l&65535;n.members.set(c,{playerId:c,playerName:typeof a.name=="string"?a.name:"",classId:Math.trunc(Number(a.classId))&65535})}n.inParty=n.members.size>0,this.syncLocalPartyPlayerIdFromMembers(e,n)}onPartyMemberAdded(e,t){if(!t.isDefined)return;let n=this.session(e),i=t.data,s=Math.trunc(Number(i.playerId));if(!Number.isFinite(s)||s<0||s>65535)return;let o=s&65535;n.members.set(o,{playerId:o,playerName:typeof i.name=="string"?i.name:"",classId:Math.trunc(Number(i.classId))&65535}),n.inParty=!0,this.syncLocalPartyPlayerIdFromMembers(e,n)}onPartyAction(e,t){if(!t.isDefined)return;let n=t.data;if(Number(n.actionId)!==6)return;let i=Math.trunc(Number(n.playerId));if(!Number.isFinite(i)||i<0||i>65535)return;let s=this.session(e),o=i&65535,a=s.localPartyPlayerId;if(a!==null&&o===a){this.sessions.set(e,jn());return}s.members.delete(o),s.members.size===0&&(s.inParty=!1,s.partyId=null,s.localPartyPlayerId=null)}};var rt=require("fs"),hp=require("os"),qe=require("path"),gp=require("url");var ue=U(fe(),1);var nf=require("node:module"),Ll=(0,nf.createRequire)(__importMetaUrl),Nt=Ll("@realmengine/sdk/dist/vault/VaultChest.js").VaultChest,Vn=Ll("@realmengine/sdk/dist/vault/GiftChest.js").GiftChest,B=Ll("@realmengine/sdk/dist/self/Self.js").Self;var ew={maxHP:0,maxMP:0,attack:0,defense:0,speed:0,dexterity:0,vitality:0,wisdom:0},tw={maxHP:0,maxMP:0,attack:0,defense:0,speed:0,dexterity:0,vitality:0,wisdom:0},rw={maxHP:0,maxMP:0,attack:0,defense:0,speed:0,dexterity:0,vitality:0,wisdom:0};function J(r){return r.clientRef.current?.playerData??null}var sf={[ue.StatusEffect.CURSED]:"Curse",[ue.StatusEffect.SLOWED]:"Slowed",[ue.StatusEffect.STUNNED]:"Stunned",[ue.StatusEffect.BLIND]:"Blind",[ue.StatusEffect.HALLUCINATING]:"Hallucinating",[ue.StatusEffect.DRUNK]:"Drunk",[ue.StatusEffect.CONFUSED]:"Confused",[ue.StatusEffect.STASIS]:"Stasis",[ue.StatusEffect.INVISIBLE]:"Invisible",[ue.StatusEffect.ARMORED]:"Armored",[ue.StatusEffect.INVINCIBLE]:"Invincible",[ue.StatusEffect.SPEEDY]:"Speedy",[ue.StatusEffect.HEALING]:"Healing",[ue.StatusEffect.DAMAGING]:"Damaging",[ue.StatusEffect.BERSERK]:"Berserk",[ue.StatusEffect.PETRIFIED]:"Petrified",[ue.StatusEffect.SICK]:"Sick",[ue.StatusEffect.BLEEDING]:"Bleeding",[ue.StatusEffect.QUIET]:"Quiet",[ue.StatusEffect.EXPOSED]:"Exposed",[ue.StatusEffect.HEXED]:"Hexed"};function Bs(r,e){let t=J(r);if(!t||e<0||e>=t.inventory.length)return null;let n=t.inventory[e];return!Number.isFinite(n)||n<0?null:r.gameData.buildSdkItem(n)}function of(r){return{maxHP:r.maxHealth,maxMP:r.maxMana,attack:r.attack+r.attackBonus+r.exaltedAttack,defense:r.defense+r.defenseBonus+r.exaltedDefense,speed:r.speed+r.speedBonus+r.exaltedSpeed,dexterity:r.dexterity+r.dexterityBonus+r.exaltedDexterity,vitality:r.vitality+r.vitalityBonus+r.exaltedVitality,wisdom:r.wisdom+r.wisdomBonus+r.exaltedWisdom}}function nw(r){return{maxHP:r.exaltedMaxHP,maxMP:r.exaltedMaxMP,attack:r.exaltedAttack,defense:r.exaltedDefense,speed:r.exaltedSpeed,dexterity:r.exaltedDexterity,vitality:r.exaltedVitality,wisdom:r.exaltedWisdom}}function iw(r){return{maxHP:r.healthBonus,maxMP:r.manaBonus,attack:r.attackBonus,defense:r.defenseBonus,speed:r.speedBonus,dexterity:r.dexterityBonus,vitality:r.vitalityBonus,wisdom:r.wisdomBonus}}function Xr(r,e){let t=J(r);return t?of(t)[e]:0}var js=class{static install(e){B.getX=()=>J(e)?.pos.x??0,B.getY=()=>J(e)?.pos.y??0,B.getPosition=()=>{let t=J(e);return new ue.Position(t?.pos.x??0,t?.pos.y??0)},B.distanceTo=t=>{let n=J(e);return n?new ue.Position(n.pos.x,n.pos.y).distanceTo(t):0},B.getHP=()=>J(e)?.health??0,B.getMaxHP=()=>J(e)?.maxHealth??0,B.getHPPercent=()=>{let t=J(e);return!t||t.maxHealth<=0?0:t.health/t.maxHealth},B.getMP=()=>J(e)?.mana??0,B.getMaxMP=()=>J(e)?.maxMana??0,B.getMPPercent=()=>{let t=J(e);return!t||t.maxMana<=0?0:t.mana/t.maxMana},B.getStats=()=>{let t=J(e);return t?of(t):{...ew}},B.getExaltedBonuses=()=>{let t=J(e);return t?nw(t):{...tw}},B.getExaltedMaxHP=()=>J(e)?.exaltedMaxHP??0,B.getExaltedMaxMP=()=>J(e)?.exaltedMaxMP??0,B.getExaltedAtk=()=>J(e)?.exaltedAttack??0,B.getExaltedDef=()=>J(e)?.exaltedDefense??0,B.getExaltedSpd=()=>J(e)?.exaltedSpeed??0,B.getExaltedDex=()=>J(e)?.exaltedDexterity??0,B.getExaltedVit=()=>J(e)?.exaltedVitality??0,B.getExaltedWis=()=>J(e)?.exaltedWisdom??0,B.getGearBonuses=()=>{let t=J(e);return t?iw(t):{...rw}},B.getGearMaxHP=()=>J(e)?.healthBonus??0,B.getGearMaxMP=()=>J(e)?.manaBonus??0,B.getGearAtk=()=>J(e)?.attackBonus??0,B.getGearDef=()=>J(e)?.defenseBonus??0,B.getGearSpd=()=>J(e)?.speedBonus??0,B.getGearDex=()=>J(e)?.dexterityBonus??0,B.getGearVit=()=>J(e)?.vitalityBonus??0,B.getGearWis=()=>J(e)?.wisdomBonus??0,B.getAtk=()=>Xr(e,"attack"),B.getDef=()=>Xr(e,"defense"),B.getSpd=()=>Xr(e,"speed"),B.getDex=()=>Xr(e,"dexterity"),B.getVit=()=>Xr(e,"vitality"),B.getWis=()=>Xr(e,"wisdom"),B.hasEffect=t=>{let n=J(e);if(!n)return!1;let i=sf[t];return i?n.hasConditionEffect(i):!1},B.getEffects=()=>{let t=J(e);if(!t)return[];let n=Object.values(ue.StatusEffect),i=[];for(let s of n){if(typeof s!="string")continue;let o=sf[s];!o||!t.hasConditionEffect(o)||i.push(s)}return i},B.getWeapon=()=>Bs(e,0),B.getAbility=()=>Bs(e,1),B.getArmor=()=>Bs(e,2),B.getRing=()=>Bs(e,3),B.getName=()=>J(e)?.name??"",B.getClass=()=>{let t=J(e);if(!t?.classType)return"";let n=e.gameData.getObject(t.classType);return n?.displayId||n?.id||String(t.classType)},B.isDead=()=>J(e)?.hasConditionEffect("Dead")??!1,B.isInCombat=()=>!1,B.isInvisible=()=>J(e)?.hasConditionEffect("Invisible")??!1,B.getAccountFame=()=>J(e)?.currentFame??0,B.getCharacterFame=()=>J(e)?.characterAliveFame??0,B.getPowerLevel=()=>J(e)?.powerLevel??0,B.getStars=()=>J(e)?.stars??0}};var be=U(fe(),1);X();var af=new Set;function v(r){af.has(r)||(af.add(r),m.warn("ScriptBridge",`${r}: not implemented yet`))}X();var Fs=class{static install(e){be.Walking.walkTo=(t,n)=>(v("Walking.walkTo"),!1),be.Walking.walkToPosition=t=>(v("Walking.walkToPosition"),!1),be.Walking.walkToEnemy=t=>(v("Walking.walkToEnemy"),!1),be.Walking.walkToPortal=t=>(v("Walking.walkToPortal"),!1),be.Walking.walkToNearestPortal=()=>(v("Walking.walkToNearestPortal"),!1),be.Walking.walkToNexusPortal=()=>(v("Walking.walkToNexusPortal"),!1),be.Walking.walkToLeftWall=()=>(v("Walking.walkToLeftWall"),!1),be.Walking.walkToRightWall=()=>(v("Walking.walkToRightWall"),!1),be.Walking.walkToTopWall=()=>(v("Walking.walkToTopWall"),!1),be.Walking.walkToBottomWall=()=>(v("Walking.walkToBottomWall"),!1),be.Walking.followPlayer=t=>(v("Walking.followPlayer"),!1),be.Walking.stopMoving=()=>{v("Walking.stopMoving")},be.Walking.isMoving=()=>(v("Walking.isMoving"),!1),be.Walking.hasReached=(t,n=.5)=>(v("Walking.hasReached"),!1),be.Walking.nexus=()=>{let t=e.clientRef.current;if(t?.connected)try{let n=e.proxy.packetFactory.createByName("ESCAPE");n.modified=!0,t.sendToServer(n)}catch{}},be.Walking.getDodgePosition=()=>(v("Walking.getDodgePosition"),null),be.Walking.dodge=()=>(v("Walking.dodge"),!1),be.Walking.dodgeFrom=t=>(v("Walking.dodgeFrom"),!1),be.Walking.canTeleport=()=>e.clientRef.current?.playerData.teleportAllowed??!1,be.Walking.teleportToPlayer=t=>{let n=e.clientRef.current;if(!n?.connected)return!1;if(!n.playerData.teleportAllowed)return m.warn("Walking","teleportToPlayer: teleport not allowed in this map"),!1;let i=t.trim().toLowerCase(),s=e.worldState.getAllPlayersRawStatsForDashboard(e.gameData),o=s.find(a=>a.name.trim().toLowerCase()===i);if(o||(o=s.find(a=>a.name.toLowerCase().includes(i))),!o)return m.warn("Walking",`teleportToPlayer: player "${t}" not found in world state`),!1;try{let a=e.proxy.packetFactory.createByName("TELEPORT");return a.data.objectId=o.objectId,a.modified=!0,n.sendToServer(a),!0}catch(a){return m.warn("Walking",`teleportToPlayer: send failed \u2014 ${a.message}`),!1}},be.Walking.teleportToBeacon=t=>{let n=e.clientRef.current;if(!n?.connected)return!1;if(!n.playerData.teleportAllowed)return m.warn("Walking","teleportToBeacon: teleport not allowed in this map"),!1;try{let i=e.proxy.packetFactory.createByName("TELEPORT");return i.data.objectId=t,i.modified=!0,n.sendToServer(i),!0}catch(i){return m.warn("Walking",`teleportToBeacon: send failed \u2014 ${i.message}`),!1}}}};var wt=U(fe(),1);var sw=3600*1e3;function sr(r){let e=Number(r);return Number.isFinite(e)?e:null}function ow(r){let e=typeof r=="number"?r:r&&typeof r=="object"?r.objectId:void 0,t=sr(e);return t==null||t<=0?null:Math.trunc(t)}function $l(r){if(!r||typeof r!="object")return null;let e=sr(r.x),t=sr(r.y);return e==null||t==null?null:{x:e,y:t}}var Hs=class{static install(e){let t=[],n=[],i=null,s=!1;function o(){let c=Date.now()-sw;for(;t.length>0&&t[0]<c;)t.shift();for(;n.length>0&&n[0]<c;)n.shift()}function a(){i=null,s=!1}function l(c){if(!s||!i)return null;if(i.kind==="position")return{x:i.x,y:i.y};let d=(e.getWorldStateForClient?.(c)??e.worldState).getEntity(i.objectId);if(!d)return null;let p=sr(d.pos?.x),f=sr(d.pos?.y);return p==null||f==null?null:{x:p,y:f}}e.proxy.hookPacket("PLAYERSHOOT",(c,u)=>{if(t.push(Date.now()),o(),!u.isDefined)return;let d=l(c);if(!d)return;let p=sr(u.data.angle)??0,f=$l(u.data.playerPosition)??(()=>{let b=$l(u.data.projectilePosition);return b?{x:b.x-Math.cos(p)*.3,y:b.y-Math.sin(p)*.3}:null})()??$l(c.playerData.pos);if(!f)return;let h=d.x-f.x,g=d.y-f.y;if(Math.abs(h)<1e-6&&Math.abs(g)<1e-6)return;let y=Math.atan2(g,h);u.data.angle=y,u.data.projectilePosition={x:f.x+Math.cos(y)*.3,y:f.y+Math.sin(y)*.3},u.modified=!0}),e.proxy.hookPacket("ENEMYHIT",(c,u)=>{n.push(Date.now()),o()}),wt.Combat.accuracy=()=>(o(),t.length===0?0:n.length/t.length),wt.Combat.recentAccuracy=c=>{o();let u=Date.now()-c*60*1e3,d=t.filter(f=>f>=u).length;return d===0?0:n.filter(f=>f>=u).length/d},wt.Combat.resetAccuracy=()=>{t.length=0,n.length=0},wt.Combat.aimAt=c=>{let u=ow(c);return u==null?!1:(i={kind:"object",objectId:u},s=!0,!0)},wt.Combat.aimAtPosition=(c,u)=>{let d=sr(c),p=sr(u);return d==null||p==null?!1:(i={kind:"position",x:d,y:p},s=!0,!0)},wt.Combat.stopAiming=()=>{a()},wt.Combat.autoAimOff=()=>{a()},wt.Combat.useAbility=()=>(v("Combat.useAbility"),!1),wt.Combat.useAbilityAt=(c,u)=>(v("Combat.useAbilityAt"),!1),wt.Combat.useAbilityOn=c=>(v("Combat.useAbilityOn"),!1)}};var Ve=U(fe(),1);function Re(r,e,t=0){let n=r[String(e)];if(n==null||n==="")return t;let i=typeof n=="number"?n:Number(n);return Number.isFinite(i)?i:t}function aw(r){return{maxHP:Re(r,x.MaxHP,0),maxMP:Re(r,x.MaxMP,0),attack:Re(r,x.Attack,0),defense:Re(r,x.Defense,0),speed:Re(r,x.Speed,0),dexterity:Re(r,x.Dexterity,0),vitality:Re(r,x.Vitality,0),wisdom:Re(r,x.Wisdom,0)}}function Bl(r){let e=r.rawStats;return{objectType:r.objectType,objectId:r.objectId,name:r.name,position:new Ve.Position(r.x,r.y),hp:Re(e,x.HP,0),maxHp:Re(e,x.MaxHP,0),mp:Re(e,x.MP,0),maxMp:Re(e,x.MaxMP,0),stats:aw(e),className:r.className}}function ut(r){return r.worldState.getAllPlayersRawStatsForDashboard(r.gameData)}function vr(r,e){let t=e.trim().toLowerCase();if(!t)return null;for(let n of r)if(n.name.trim().toLowerCase()===t)return n;for(let n of r)if(n.name.toLowerCase().includes(t))return n;return null}function lw(r,e,t){let n=e.trim().toLowerCase();if(!n)return null;if(t==="equals"){for(let i of r)if(i.name.trim().toLowerCase()===n)return i;return null}for(let i of r)if(i.name.toLowerCase().includes(n))return i;return null}function lf(r){let e=r.rawStats[String(x.GuildName)];return e==null?"":String(e).trim()}function cw(r){let e=new Set,t=[];for(let n of r){let i=lf(n);if(!i)continue;let s=i.toLowerCase();e.has(s)||(e.add(s),t.push(i))}return t.sort((n,i)=>n.localeCompare(i,void 0,{sensitivity:"base"})),t}var Ws=class{static install(e){Ve.Players.getAll=()=>ut(e).map(Bl),Ve.Players.getNearest=()=>{let t=e.clientRef.current?.playerData;if(!t?.ownerObjectId)return null;let n=t.pos.x,i=t.pos.y,s=null,o=1/0;for(let a of ut(e)){if(a.objectId===t.ownerObjectId)continue;let l=Math.hypot(a.x-n,a.y-i);l<o&&(o=l,s=a)}return s?Bl(s):null},Ve.Players.find=t=>{let n=vr(ut(e),t);return n?Bl(n):null},Ve.Players.getHP=t=>{let n=vr(ut(e),t);return n?Re(n.rawStats,x.HP,0):0},Ve.Players.getMaxHP=t=>{let n=vr(ut(e),t);return n?Re(n.rawStats,x.MaxHP,0):0},Ve.Players.getHPPercent=t=>{let n=vr(ut(e),t);if(!n)return 0;let i=Re(n.rawStats,x.HP,0),s=Re(n.rawStats,x.MaxHP,0);return s<=0?0:i/s},Ve.Players.getMP=t=>{let n=vr(ut(e),t);return n?Re(n.rawStats,x.MP,0):0},Ve.Players.getAccountFame=t=>{let n=vr(ut(e),t);return n?Math.trunc(Re(n.rawStats,x.CurrentFame,0)):0},Ve.Players.getCharacterFame=t=>{let n=vr(ut(e),t);return n?Math.trunc(Re(n.rawStats,x.CharacterAliveFame,0)):0},Ve.Players.count=()=>ut(e).length,Ve.Players.getPlayerGuild=(t,n="equals")=>{let i=lw(ut(e),t,n);return i?lf(i):""},Ve.Players.getNearbyGuilds=()=>cw(ut(e))}};var At=U(fe(),1);var Gs=class{static install(e){At.Enemies.getAll=()=>(v("Enemies.getAll"),[]),At.Enemies.getNearest=()=>(v("Enemies.getNearest"),null),At.Enemies.getNearestTo=t=>(v("Enemies.getNearestTo"),null),At.Enemies.getBoss=()=>(v("Enemies.getBoss"),null),At.Enemies.getTargetingMe=()=>(v("Enemies.getTargetingMe"),[]),At.Enemies.find=t=>(v("Enemies.find"),null),At.Enemies.count=()=>(v("Enemies.count"),0),At.Enemies.getById=t=>(v("Enemies.getById"),null),At.Enemies.getByType=t=>(v("Enemies.getByType"),[])}};var Ne=U(fe(),1);function qn(r){return r.clientRef.current?.playerData??null}function cf(r){return r===void 0||!Number.isFinite(r)||r<0?-1:Math.trunc(r)}function Jn(r,e){return e<0||e>=Ne.INVENTORY_TOTAL_SLOT_COUNT?-1:e<Ne.INVENTORY_MAIN_SLOT_COUNT?cf(r.inventory[e]):cf(r.backpack[e-Ne.INVENTORY_MAIN_SLOT_COUNT])}var Us=class{static install(e){Ne.Inventory.getAll=()=>{let t=qn(e);if(!t)return[];let n=[];for(let i=0;i<Ne.INVENTORY_TOTAL_SLOT_COUNT;i++){let s=Jn(t,i);s<0||n.push(`${s}; ${i}`)}return n},Ne.Inventory.contains=t=>{let n=t.trim().toLowerCase();if(!n)return!1;let i=qn(e);if(!i)return!1;for(let s=0;s<Ne.INVENTORY_TOTAL_SLOT_COUNT;s++){let o=Jn(i,s);if(o<0)continue;if(e.gameData.buildSdkItem(o)?.name.toLowerCase().includes(n)||e.gameData.getObject(o)?.id.toLowerCase().includes(n))return!0}return!1},Ne.Inventory.getCount=t=>{let n=t.trim().toLowerCase();if(!n)return 0;let i=qn(e);if(!i)return 0;let s=0;for(let o=0;o<Ne.INVENTORY_TOTAL_SLOT_COUNT;o++){let a=Jn(i,o);if(a<0)continue;let l=e.gameData.buildSdkItem(a),c=e.gameData.getObject(a),u=l?.name.toLowerCase().includes(n),d=c?.id.toLowerCase().includes(n);(u||d)&&s++}return s},Ne.Inventory.getFreeSlots=()=>{let t=qn(e);if(!t)return 8;let n=0;for(let i=4;i<Ne.INVENTORY_MAIN_SLOT_COUNT;i++)Jn(t,i)<0&&n++;return n},Ne.Inventory.isFull=()=>{let t=qn(e);if(!t)return!1;for(let n=4;n<Ne.INVENTORY_MAIN_SLOT_COUNT;n++)if(Jn(t,n)<0)return!1;return!0},Ne.Inventory.use=t=>(v("Inventory.use"),!1),Ne.Inventory.useBySlot=t=>(v("Inventory.useBySlot"),!1),Ne.Inventory.drop=t=>(v("Inventory.drop"),!1)}};var uf=U(fe(),1);var Vs=class{static install(e){let t=uf.Vault;t.get=i=>(v("Vault.get"),new Nt(i));let n=t.vaultChest;n.get=i=>(v("Vault.vaultChest.get"),new Nt(i)),n.findChestWith=i=>(v("Vault.vaultChest.findChestWith"),null),n.getAll=()=>(v("Vault.vaultChest.getAll"),[]),t.findItem=i=>(v("Vault.findItem"),null),t.getAllItems=()=>(v("Vault.getAllItems"),[])}};var qs=class{static install(e){Nt.prototype.getItems=function(){return v("VaultChest.getItems"),[]},Nt.prototype.withdraw=function(t){return v("VaultChest.withdraw"),!1},Nt.prototype.deposit=function(t){return v("VaultChest.deposit"),!1},Nt.prototype.contains=function(t){return v("VaultChest.contains"),!1},Nt.prototype.getFreeSlots=function(){return v("VaultChest.getFreeSlots"),0},Nt.prototype.isFull=function(){return v("VaultChest.isFull"),!1}}};var Js=class{static install(e){Vn.getItems=()=>(v("GiftChest.getItems"),[]),Vn.withdraw=t=>(v("GiftChest.withdraw"),!1),Vn.withdrawAll=()=>(v("GiftChest.withdrawAll"),!1),Vn.contains=t=>(v("GiftChest.contains"),!1)}};var Qr=U(fe(),1);var xr={Tutorial:-1,Nexus:-2,RandomRealm:-3,Vault:-5,MapTest:-6,VaultExplanation:-8,NexusExplanation:-9,QuestRoom:-11,CheatersQuarantine:-13};function jl(r){return(r.clientRef.current?.playerData?.mapName??"").toLowerCase()}var zs=class{static install(e){Qr.World.isNexus=()=>e.clientRef.current?.state?.gameId===xr.Nexus?!0:jl(e).includes("nexus"),Qr.World.isRealm=()=>{let t=jl(e);return t.includes("realm of the mad god")||t==="realm"},Qr.World.isDungeon=()=>(v("World.isDungeon"),!1),Qr.World.isVault=()=>e.clientRef.current?.state?.gameId===xr.Vault?!0:jl(e).includes("vault"),Qr.World.getName=()=>e.clientRef.current?.playerData?.mapName??""}};var Ut=U(fe(),1);function Fl(r){return r.trim().toLowerCase().replace(/[\s_-]+/g,"")}function df(r,e,t){switch(e){case"damaging":return(t.getTileDamage(r)??0)>0;case"conditioneffect":case"condition":return t.getTileHasConditionEffect(r);case"slowing":return t.getTileSpeed(r)<1;case"speedy":case"faster":return t.getTileSpeed(r)>1;case"speedmodified":return t.getTileSpeed(r)!==1;case"blocking":case"nowalk":return t.tileIsBlockingWalk(r);case"sink":return t.tileIsSink(r);case"push":case"pushes":return t.getTileHasPush(r);case"slide":case"sliding":return(t.getTileSlideAmount(r)??0)>0;default:return!1}}function uw(r,e){if(r===void 0)return{radius:5};if(typeof r=="string"){let i=r.trim();return i?{radius:5,filter:Fl(i)}:{radius:5}}let t=Number.isFinite(r)?Math.max(0,Math.floor(Number(r))):5,n=typeof e=="string"&&e.trim()?Fl(e):void 0;return{radius:t,filter:n}}function Ks(r,e,t,n,i){let s=r<<16|e&65535,o=n.getTileDamage(t)??0;return{type:t,name:n.getTileName(t),position:new Ut.Position(r+.5,e+.5),isBlocking:n.tileIsBlockingWalk(t),isOccupied:i.has(s),isSafe:!1,speedMultiplier:n.getTileSpeed(t),damaging:o>0,damagePerTick:o,hasConditionEffect:n.getTileHasConditionEffect(t)}}function dw(r){let e=r.clientRef.current?.playerData;return{x:e?.pos.x??0,y:e?.pos.y??0}}var Ys=class{static install(e){let t=e.gameData,n=e.worldState;Ut.Tiles.getAll=i=>{let s=i?.trim()?Fl(i):void 0,o=n.getOccupiedTileKeys(),a=[];return n.forEachKnownTile((l,c,u)=>{s&&!df(u,s,t)||a.push(Ks(l,c,u,t,o))}),a},Ut.Tiles.getNearby=((i,s)=>{let{radius:o,filter:a}=uw(i,s),{x:l,y:c}=dw(e),u=n.getOccupiedTileKeys(),d=[],p=o*o,f=Math.floor(l),h=Math.floor(c),g=Math.ceil(o)+1;return n.forEachKnownTileInBounds(f-g,f+g,h-g,h+g,(y,b,S)=>{let E=y+.5,I=b+.5,O=E-l,H=I-c;O*O+H*H>p||a&&!df(S,a,t)||d.push(Ks(y,b,S,t,u))}),d}),Ut.Tiles.getByType=i=>{let s=n.getOccupiedTileKeys(),o=[];return n.forEachKnownTile((a,l,c)=>{c===i&&o.push(Ks(a,l,c,t,s))}),o},Ut.Tiles.getAt=(i,s)=>{let o=Math.floor(i),a=Math.floor(s),l=n.getTileAt(o,a);return l===void 0?null:Ks(o,a,l,t,n.getOccupiedTileKeys())},Ut.Tiles.isBlocking=(i,s)=>{let o=n.getTileAt(Math.floor(i),Math.floor(s));return o===void 0?!1:t.tileIsBlockingWalk(o)},Ut.Tiles.isSafe=(i,s)=>(v("Tiles.isSafe"),!1)}};var V=U(fe(),1);var Xs=class{static install(e){V.Objects.getAll=()=>(v("Objects.getAll"),[]),V.Objects.getById=t=>(v("Objects.getById"),null),V.Objects.getByType=t=>(v("Objects.getByType"),[]),V.Objects.count=()=>(v("Objects.count"),0),V.Objects.exists=t=>(v("Objects.exists"),!1),V.Objects.getByCategory=t=>(v("Objects.getByCategory"),[]),V.Objects.getEnemies=()=>(v("Objects.getEnemies"),[]),V.Objects.getPlayers=()=>(v("Objects.getPlayers"),[]),V.Objects.getPortals=()=>(v("Objects.getPortals"),[]),V.Objects.getContainers=()=>(v("Objects.getContainers"),[]),V.Objects.getPets=()=>(v("Objects.getPets"),[]),V.Objects.getBeacons=()=>(v("Objects.getBeacons"),[]),V.Objects.getQuestObject=()=>{let t=e.clientRef.current;if(!t)return null;let n=t.playerData.questObjectId;if(n<=0)return null;let i=e.worldState.getEntity(n);if(!i)return null;let s=e.gameData.getObject(i.objectType);return{objectId:i.objectId,objectType:i.objectType,name:s?.displayId??s?.id??"",position:new V.Position(i.pos.x,i.pos.y)}},V.Objects.getQuestTargetId=()=>{let n=e.clientRef.current?.playerData?.questObjectId,i=typeof n=="number"?n:Number(n);return Number.isFinite(i)&&i>0?Math.trunc(i):-1},V.Objects.getQuestTargetType=()=>{let t=e.clientRef.current;if(!t)return-1;let n=Number(t.playerData.questObjectId);if(!(n>0))return-1;let i=e.worldState.resolveQuestTargetObjectType(n,e.gameData);return i!=null&&i>0?i:-1},V.Objects.getQuestId=V.Objects.getQuestTargetId,V.Objects.getQuestType=V.Objects.getQuestTargetType,V.Objects.getNearest=()=>(v("Objects.getNearest"),null),V.Objects.getNearestTo=t=>(v("Objects.getNearestTo"),null),V.Objects.getNearestOfType=t=>(v("Objects.getNearestOfType"),null),V.Objects.getNearestOfCategory=t=>(v("Objects.getNearestOfCategory"),null),V.Objects.getWithinRadius=t=>(v("Objects.getWithinRadius"),[]),V.Objects.getWithinRadiusFrom=(t,n)=>(v("Objects.getWithinRadiusFrom"),[]),V.Objects.getWithinBounds=(t,n,i,s)=>(v("Objects.getWithinBounds"),[]),V.Objects.sortByDistance=()=>(v("Objects.sortByDistance"),[]),V.Objects.sortByDistanceFrom=t=>(v("Objects.sortByDistanceFrom"),[]),V.Objects.findByName=t=>(v("Objects.findByName"),null),V.Objects.findAllByName=t=>(v("Objects.findAllByName"),[]),V.Objects.findPortal=t=>(v("Objects.findPortal"),null),V.Objects.getNearestPortal=()=>(v("Objects.getNearestPortal"),null),V.Objects.getOpenPortals=()=>(v("Objects.getOpenPortals"),[]),V.Objects.getNearestContainer=()=>(v("Objects.getNearestContainer"),null),V.Objects.findContainer=t=>(v("Objects.findContainer"),null),V.Objects.getCategory=t=>(v("Objects.getCategory"),null),V.Objects.getTypeName=t=>(v("Objects.getTypeName"),""),V.Objects.isEnemy=t=>(v("Objects.isEnemy"),!1),V.Objects.isPortal=t=>(v("Objects.isPortal"),!1),V.Objects.isContainer=t=>(v("Objects.isContainer"),!1),V.Objects.isBoss=t=>(v("Objects.isBoss"),!1),V.Objects.hasType=t=>(v("Objects.hasType"),!1)}};var zn=U(fe(),1);var Qs=class{static install(e){zn.Projectiles.getAll=()=>(v("Projectiles.getAll"),[]),zn.Projectiles.getNearby=t=>(v("Projectiles.getNearby"),[]),zn.Projectiles.getIncoming=()=>(v("Projectiles.getIncoming"),[]),zn.Projectiles.count=()=>(v("Projectiles.count"),0)}};var Zs=U(fe(),1);function Hl(r,e,t){let n=r.scriptSession.scriptId,i=String(t);if(!n){e==="error"?console.error(`[SCRIPT] ${i}`):e==="warn"?console.warn(`[SCRIPT] ${i}`):console.log(`[SCRIPT] ${i}`);return}let s=`[${n}] ${i}`;r.emitScriptLog(n,s,e)}var eo=class{static install(e){Zs.Log.info=t=>Hl(e,"info",t),Zs.Log.warn=t=>Hl(e,"warn",t),Zs.Log.error=t=>Hl(e,"error",t)}};var Kn=U(fe(),1);var to=class{static install(e){Kn.Settings.get=t=>(v("Settings.get"),null),Kn.Settings.getString=(t,n)=>(v("Settings.getString"),n??""),Kn.Settings.getNumber=(t,n)=>(v("Settings.getNumber"),n??0),Kn.Settings.getBoolean=(t,n)=>(v("Settings.getBoolean"),n??!1)}};var Cr=U(fe(),1),ro=class{static install(e){Cr.Timing.now=()=>Date.now(),Cr.Timing.timeSince=t=>Date.now()-t,Cr.Timing.sleep=t=>new Promise(n=>setTimeout(n,t)),Cr.Timing.every=(t,n)=>{let i=setInterval(n,t);return()=>clearInterval(i)},Cr.Timing.after=(t,n)=>{let i=setTimeout(n,t);return()=>clearTimeout(i)},Cr.Timing.debounce=(t,n)=>{let i=null;return((...s)=>{i&&clearTimeout(i),i=setTimeout(()=>n(...s),t)})}}};var we=U(fe(),1);X();var no=[],Yn=[],ff=!1,pf=!1,mf=!1,Xn=[];function fw(r,e){if(Xn.length===0||e.name!=="PLAYERTEXT"||!e.isDefined||!e.data)return;let t=String(e.data.text??""),n=t.toLowerCase(),i=t.trim().toLowerCase();for(let s of Xn)if(s.mode==="equals"){if(s.needles.some(o=>i===o)){e.send=!1;return}}else if(s.needles.some(o=>n.includes(o))){e.send=!1;return}}function yf(r){return(r.playerData?.name??"").trim()}function pw(r,e){let t=String(r.name??"").trim(),n=String(r.recipient??"").trim(),i=String(r.cleanText??r.text??""),s=e.trim().toLowerCase();return n&&s&&n.toLowerCase()===s&&t.toLowerCase()!==s?"tell":!t||t==="*"||t==="#"?"system":i.startsWith("Party>")?"party":i.startsWith("Guild>")?"guild":i.startsWith("Tell>")||i.startsWith("[Tell]")?"tell":/\[.*Global.*\]/i.test(i)?"global":"say"}function mw(r,e){let t=yf(r),n=String(e.name??"").trim(),i=String(e.cleanText??e.text??""),s=pw(e,t),o=t.length>0&&n.toLowerCase()===t.toLowerCase();return{sender:n,message:i,channel:s,isLocal:o,isEcho:!0,timestamp:Date.now()}}function hw(r,e){e.name!=="TEXT"||!e.isDefined||!e.data||bf(mw(r,e.data))}function gw(r,e){if(e.name!=="PLAYERTEXT"||!e.isDefined||!e.data)return;let t=String(e.data.text??"").trim();t&&bf({sender:yf(r),message:t,channel:"say",isLocal:!0,isEcho:!1,timestamp:Date.now()})}var hf="RealmEngine";function gf(r,e,t){let n=r.clientRef.current;if(!n?.connected)return;let i=r.proxy.packetFactory.createByName("TEXT");i.data={name:t,objectId:-1,numStars:-1,bubbleTime:0,recipient:"",text:e,cleanText:e,isSupporter:!1,starBg:0},i.modified=!0,n.sendToClient(i)}function yw(r,e,t){let n=String(r??"");switch(e){case"say":case"unknown":return n;case"yell":return`/yell ${n}`;case"party":return`/party ${n}`;case"guild":return`/guild ${n}`;case"tell":{let i=(t??"").trim();return i?`/tell ${i} ${n}`:null}case"global":case"system":return null;default:return n}}function Zr(r,e,t,n){let i=r.clientRef.current;if(!i?.connected)return m.warn("ScriptChat",`send(${t}): not connected`),!1;let s=yw(e,t,n);if(s===null)return m.warn("ScriptChat",`send(${t}): channel not supported for outgoing chat`),!1;try{let o=r.proxy.packetFactory.createByName("PLAYERTEXT");return o.data={text:s},o.modified=!0,i.sendToServer(o),!0}catch(o){return m.warn("ScriptChat",`send(${t}) failed: ${o.message}`),!1}}function bw(r){if(Yn.length===0)return!1;let e=String(r.cleanText??r.text??"").toLowerCase(),t=typeof r.numStars=="number"?r.numStars:null;for(let n of Yn)if(n.words.some(s=>e.includes(s))&&!(n.minStars!==null&&t!==null&&t>=n.minStars))return!0;return!1}function Sw(r){pf||(pf=!0,r.proxy.hookPacket("TEXT",(e,t)=>{!t.isDefined||!t.data||bw(t.data)&&(t.send=!1)}))}function bf(r){let e=no.slice();for(let t of e)try{t(r)}catch{}}function Sf(r){ff||(ff=!0,r.proxy.hookPacket("TEXT",hw),r.proxy.hookPacket("PLAYERTEXT",gw)),mf||(mf=!0,r.proxy.hookPacket("PLAYERTEXT",fw,void 0,!0)),Sw(r),we.chat.onMessage=e=>(no.push(e),()=>{let t=no.indexOf(e);t!==-1&&no.splice(t,1)}),we.chat.onMessageFrom=(e,t)=>we.chat.onMessage(n=>{n.sender===e&&t(n)}),we.chat.onMessageContaining=(e,t)=>we.chat.onMessage(n=>{(typeof e=="string"?n.message.includes(e):e.test(n.message))&&t(n)}),we.chat.onChannelMessage=(e,t)=>we.chat.onMessage(n=>{n.channel===e&&t(n)}),we.chat.onWhisper=e=>we.chat.onMessage(t=>{t.channel==="tell"&&e(t)}),we.chat.onSystemMessage=e=>we.chat.onMessage(t=>{t.channel==="system"&&e(t)}),we.chat.send=(e,t="say")=>{if(t==="system"){gf(r,String(e??""),hf);return}if(t==="tell"){m.warn("ScriptChat","send(tell): use chat.tell(playerName, message) \u2014 tell needs a recipient");return}Zr(r,String(e??""),t)},we.chat.say=e=>{Zr(r,String(e??""),"say")},we.chat.yell=e=>{Zr(r,String(e??""),"yell")},we.chat.party=e=>{Zr(r,String(e??""),"party")},we.chat.guild=e=>{Zr(r,String(e??""),"guild")},we.chat.tell=(e,t)=>{Zr(r,String(t??""),"tell",String(e??""))},we.chat.filter=(e,t)=>{let n=(Array.isArray(e)?e:[e]).map(s=>String(s).toLowerCase().trim()).filter(s=>s.length>0);if(n.length===0)return m.warn("ScriptChat","chat.filter: empty word list \u2014 no filter added"),()=>{};let i={words:n,minStars:typeof t=="number"&&Number.isFinite(t)?Math.trunc(t):null};return Yn.push(i),()=>{let s=Yn.indexOf(i);s!==-1&&Yn.splice(s,1)}},we.chat.notify=(e,t)=>{let n=(t??"").trim()||hf;gf(r,String(e??""),n)},we.chat.blockOutgoing=(e,...t)=>{let n=t.map(s=>String(s??"").trim().toLowerCase()).filter(s=>s.length>0);if(n.length===0)return m.warn("ScriptChat","chat.blockOutgoing: no non-empty patterns \u2014 no rule added"),()=>{};if(e!=="equals"&&e!=="contains")return m.warn("ScriptChat",`chat.blockOutgoing: invalid mode "${e}" \u2014 use 'equals' or 'contains'`),()=>{};let i={mode:e,needles:n};return Xn.push(i),()=>{let s=Xn.indexOf(i);s!==-1&&Xn.splice(s,1)}}}var or=U(fe(),1);X();function ww(r){let e=Math.trunc(Number(r))||0;return Math.max(-32768,Math.min(32767,e))}function Qn(r){let e=Math.trunc(Number(r))||0;return Math.max(-128,Math.min(127,e))}function Ew(r){let e=r.replace(/\s+/g,"").replace(/^0x/i,"");return e.length===0?Buffer.alloc(0):e.length%2!==0||!/^[0-9a-fA-F]*$/.test(e)?null:Buffer.from(e,"hex")}var ar=new WeakMap,wf=!1;function Tw(r){let e=r;return{name:typeof e.name=="string"?e.name:"",partyId:Number(e.partyId)>>>0,powerLevelMin:Number(e.powerLevelMin)&65535,partySizeCurrent:Number(e.partySizeCurrent)&255,partySizeMax:Number(e.partySizeMax)&255,activity:Number(e.activity)&255,privacy:Number(e.privacy)&255,statsMin:Number(e.statsMin)&255,serverIndex:Number(e.serverIndex)&255}}function Pw(r,e){let t=ar.get(r);if(!t||!e.isDefined)return;let n=e.data;if(Number(n.packetNumber)!==0)return;let i=Array.isArray(n.parties)?n.parties:[];clearTimeout(t.timer),ar.delete(r);try{t.resolve(i.map(Tw))}catch(s){t.reject(s instanceof Error?s:new Error(String(s)))}}function vw(r){wf||(wf=!0,r.proxy.hookPacket("PARTYLISTMESSAGE",(e,t)=>{try{Pw(e,t)}catch(n){m.error("ScriptParty","PARTYLISTMESSAGE hook failed",n)}}))}function Ef(r){or.party.getPartyMembers=()=>{let e=r.clientRef.current;return r.partyRoster.getMembersSnapshot(e??void 0)},or.party.getId=(e,t="equals")=>{let n=r.clientRef.current;if(!n?.connected)return null;let i=String(e).trim().toLowerCase();if(!i)return null;for(let s of r.partyRoster.getMembersSnapshot(n)){let o=s.playerName.trim().toLowerCase();if(t==="contains"?o.includes(i):o===i)return s.playerId}return null},or.party.createParty=e=>{let t=r.clientRef.current;if(!t?.connected)return;let n=Buffer.alloc(0);if(e.unreadTrailingHex!=null&&String(e.unreadTrailingHex).trim()!==""){let i=Ew(String(e.unreadTrailingHex));if(i===null){m.warn("ScriptParty","createParty: invalid unreadTrailingHex (use even-length hex)");return}n=i}try{let i=r.proxy.packetFactory.createByName("CREATEPARTYMESSAGE"),s="serverIndex"in e&&typeof e.serverIndex=="number"?Qn(e.serverIndex):0;i.data={description:e.description??"",minPowerLevel:ww(e.minPowerLevel),maxPartySize:Qn(e.maxPartySize),activity:Qn(e.activity),maxedStatReq:Qn(e.maxedStatReq),privacy:Qn(e.privacy),serverIndex:s},i.unreadData=n,i.modified=!0,t.sendToServer(i)}catch(i){m.warn("ScriptParty",`createParty failed: ${i.message}`)}},or.party.getPartyList=()=>{let e=r.clientRef.current;if(!e?.connected)return Promise.reject(new Error("Not connected"));let t=ar.get(e);return t&&(clearTimeout(t.timer),ar.delete(e),t.reject(new Error("getPartyList superseded by a new call"))),vw(r),new Promise((n,i)=>{let s=setTimeout(()=>{ar.get(e)===o&&ar.delete(e),i(new Error("getPartyList timed out waiting for PARTYLISTMESSAGE (packetNumber 0)"))},15e3),o={resolve:n,reject:i,timer:s};ar.set(e,o);try{let a=r.proxy.packetFactory.createByName("PARTYACTIONRESULT");a.data={playerId:65535,actionId:5},a.modified=!0,e.sendToServer(a)}catch(a){clearTimeout(s),ar.delete(e),i(a instanceof Error?a:new Error(String(a)))}})},or.party.join=e=>{let t=r.clientRef.current;if(!t?.connected)return;let n=Math.trunc(Number(e));if(!Number.isFinite(n)||n<1||n>4294967295){m.warn("ScriptParty","join: partyId must be between 1 and 4294967295");return}try{let i=r.proxy.packetFactory.createByName("PARTYJOINREQUEST");i.data={partyId:n>>>0,unknownByte:0},i.modified=!0,t.sendToServer(i)}catch(i){m.warn("ScriptParty",`join failed: ${i.message}`)}},or.party.kick=e=>{let t=r.clientRef.current;if(!t?.connected)return;let n=Math.trunc(Number(e));if(!Number.isFinite(n)||n<0||n>65535){m.warn("ScriptParty","kick: playerId must be between 0 and 65535");return}try{let i=r.proxy.packetFactory.createByName("PARTYACTIONRESULT");i.data={playerId:n,actionId:2},i.modified=!0,t.sendToServer(i)}catch(i){m.warn("ScriptParty",`kick failed: ${i.message}`)}},or.party.leave=()=>{let e=r.clientRef.current;if(!e?.connected)return;let t=r.partyRoster.getLocalPartyPlayerId(e);if(t===null){m.warn("ScriptParty","leave: local party player id not known yet (join a party or wait for roster)");return}try{let n=r.proxy.packetFactory.createByName("PARTYACTIONRESULT");n.data={playerId:t,actionId:6},n.modified=!0,e.sendToServer(n),r.partyRoster.clearParty(e)}catch(n){m.warn("ScriptParty",`leave failed: ${n.message}`)}}}var Ae=U(fe(),1);X();function je(r,e){let t=Number(r);if(Number.isFinite(t)){let i=Math.trunc(t);if(i>=1&&i<=20)return i}let n=Number(e);if(Number.isFinite(n)){let i=Math.trunc(n);if(i>=1&&i<=20)return i}return 12}function Ee(r,e){let t=je(e,12),n=new Array(t).fill(!1);if(!Array.isArray(r))return n;let i=Math.min(r.length,t);for(let s=0;s<i;s++)n[s]=!!r[s];return n}function en(r){let e=[];for(let t of r)t&&typeof t=="object"&&"included"in t?e.push(!!t.included):e.push(!1);return e}function Tf(r,e){let t=je(e,12),n=new Array(t).fill(!1),i=r.trim();if(!i)return n;if(i==="*"||i.toLowerCase()==="all")return new Array(t).fill(!0);let s=i.split(",").map(o=>o.trim()).filter(Boolean);if(!s.length)return n;for(let o of s){if(!/^\d+$/.test(o))throw new Error(`Invalid slot value "${o}". Use comma-separated indexes like 0,2,5 or "all".`);let a=Number(o);if(!Number.isInteger(a)||a<0||a>=t)throw new Error(`Slot index ${a} is out of range (0-${t-1}).`);n[a]=!0}return n}var Gl=new WeakMap,Pf=!1;function Cf(){return{active:!1,ourSlotCount:12,partnerSlotCount:12,ourItems:[],partnerItems:[],ourOffer:[],partnerOffer:[],partnerOfferFromTradeChanged:[],partnerName:""}}function kr(r){let e=Gl.get(r);return e||(e=Cf(),Gl.set(r,e)),e}function kf(r){Gl.set(r,Cf())}function vf(r){return{item:r.item,slotType:r.slotType,tradeable:r.tradeable,included:r.included,enchantment:r.enchantment}}function xw(r){let e=r&&typeof r=="object"?r:{};return{item:Number(e.item)|0,slotType:Number(e.slotType)|0,tradeable:!!e.tradeable,included:!!e.included,enchantment:typeof e.enchantment=="string"?e.enchantment:""}}function xf(r){return Array.isArray(r)?r.map(xw):[]}function tn(r){let e=r.clientRef.current;return e?kr(e):void 0}function Wl(r,e,t){try{let n=kr(e),i=je(n.ourSlotCount,t.length||n.ourItems.length||12),s=Ee(t,i),o=r.proxy.packetFactory.createByName("CHANGETRADE");return o.data.offer=s,o.modified=!0,e.sendToServer(o),n.active=!0,n.ourOffer=s.slice(),!0}catch(n){return m.warn("ScriptTrade",`change offer failed: ${n.message}`),!1}}function Cw(r,e){let t=String(e.name??"").toUpperCase(),n=e.data&&typeof e.data=="object"?e.data:{},i=kr(r);if(t==="TRADESTART"){let s=xf(n.clientItems),o=xf(n.partnerItems);i.active=!0,i.ourSlotCount=je(s.length,i.ourSlotCount),i.partnerSlotCount=je(o.length,i.partnerSlotCount),i.ourItems=s,i.partnerItems=o,i.ourOffer=Ee(en(s),i.ourSlotCount),i.partnerOffer=Ee(en(o),i.partnerSlotCount),i.partnerOfferFromTradeChanged=i.partnerOffer.slice(),i.partnerName=typeof n.partnerName=="string"?n.partnerName:"";return}if(t==="TRADECHANGED"){i.active=!0;let s=Ee(n.offer,i.partnerSlotCount);i.partnerOffer=s,i.partnerOfferFromTradeChanged=s.slice();return}if(t==="CHANGETRADE"){i.active=!0,i.ourOffer=Ee(n.offer,i.ourSlotCount);return}if(t==="TRADEACCEPTED"){i.active=!0,i.ourOffer=Ee(n.clientOffer,i.ourSlotCount),i.partnerOffer=Ee(n.partnerOffer,i.partnerSlotCount);return}(t==="TRADEDONE"||t==="CANCELTRADE")&&kf(r)}function kw(r){if(!Pf){Pf=!0;for(let e of["TRADESTART","TRADECHANGED","CHANGETRADE","TRADEACCEPTED","TRADEDONE","CANCELTRADE"])r.proxy.hookPacket(e,(t,n)=>{try{Cw(t,n)}catch(i){m.warn("ScriptTrade",`${e} hook failed: ${i.message}`)}})}}function rn(r){let e=r.clientRef.current;if(!e?.connected){m.warn("ScriptTrade","No active game client connection.");return}return e}function _f(r){kw(r),Ae.trade.start=e=>{let t=rn(r);if(!t)return!1;let n=String(e??"").trim();if(!n)return m.warn("ScriptTrade","start: player name is required"),!1;try{let i=r.proxy.packetFactory.createByName("REQUESTTRADE");return i.data.name=n,i.modified=!0,t.sendToServer(i),!0}catch(i){return m.warn("ScriptTrade",`start failed: ${i.message}`),!1}},Ae.trade.startTrade=e=>Ae.trade.start(e),Ae.trade.isActive=()=>tn(r)?.active??!1,Ae.trade.getPartnerName=()=>tn(r)?.partnerName??"",Ae.trade.getOurItems=()=>tn(r)?.ourItems.map(vf)??[],Ae.trade.getPartnerItems=()=>tn(r)?.partnerItems.map(vf)??[],Ae.trade.getOurOffer=()=>tn(r)?.ourOffer.slice()??[],Ae.trade.getPartnerOffer=()=>tn(r)?.partnerOffer.slice()??[],Ae.trade.offer=e=>{let t=rn(r);if(!t)return!1;let n=kr(t);if(!n.active)return m.warn("ScriptTrade","offer: no active trade session"),!1;let i=Array.isArray(e)?e:[e],s=new Array(je(n.ourSlotCount,n.ourItems.length||12)).fill(!1);for(let o of i){let a=Math.trunc(Number(o));if(!Number.isFinite(a)||a<0||a>=s.length)return m.warn("ScriptTrade",`offer: slot index ${String(o)} is out of range`),!1;let l=n.ourItems[a];if(l&&!l.tradeable)return m.warn("ScriptTrade",`offer: slot ${a} is not tradeable`),!1;s[a]=!0}return Wl(r,t,s)},Ae.trade.offerAll=()=>{let e=rn(r);if(!e)return!1;let t=kr(e);if(!t.active)return m.warn("ScriptTrade","offerAll: no active trade session"),!1;let n=je(t.ourSlotCount,t.ourItems.length||12),i=new Array(n).fill(!1);for(let s=0;s<Math.min(t.ourItems.length,n);s++)i[s]=t.ourItems[s].tradeable;return Wl(r,e,i)},Ae.trade.clearOffer=()=>{let e=rn(r);if(!e)return!1;let t=kr(e);if(!t.active)return m.warn("ScriptTrade","clearOffer: no active trade session"),!1;let n=je(t.ourSlotCount,t.ourItems.length||12);return Wl(r,e,new Array(n).fill(!1))},Ae.trade.accept=()=>{let e=rn(r);if(!e)return!1;let t=kr(e);if(!t.active)return m.warn("ScriptTrade","accept: no active trade session"),!1;try{let n=r.proxy.packetFactory.createByName("ACCEPTTRADE"),i=je(t.ourSlotCount,12),s=je(t.partnerSlotCount,12);n.data.clientOffer=Ee(t.ourOffer,i);let o=t.partnerOfferFromTradeChanged.length>0?t.partnerOfferFromTradeChanged:t.partnerOffer;return n.data.partnerOffer=Ee(o,s),n.modified=!0,e.sendToServer(n),!0}catch(n){return m.warn("ScriptTrade",`accept failed: ${n.message}`),!1}},Ae.trade.acceptTrade=()=>Ae.trade.accept(),Ae.trade.cancel=()=>{let e=rn(r);if(!e)return!1;try{let t=r.proxy.packetFactory.createByName("CANCELTRADE");return t.modified=!0,e.sendToServer(t),kf(e),!0}catch(t){return m.warn("ScriptTrade",`cancel failed: ${t.message}`),!1}},Ae.trade.cancelTrade=()=>Ae.trade.cancel()}var Me=U(fe(),1);X();var nn=new Map,lo=new WeakMap,Zn=new WeakMap,co=new WeakMap,io=[],If=12,so=[],oo=[],ao=[];function _w(r,e,t){let n=r.trim().toLowerCase(),i=e.trim().toLowerCase();return i?t==="contains"?n.includes(i):n===i:!1}function Iw(r,e,t){let n=String(r).trim();if(!n)return()=>{};let i="equals",s;if(typeof e=="function")s=e;else{if(i=e,!t)return()=>{};s=t}let o={needle:n,match:i,handler:s};return ao.push(o),()=>{let a=ao.indexOf(o);a>=0&&ao.splice(a,1)}}function Rw(r,e){if(!e.isDefined)return;let t=e.data,n=Math.trunc(Number(t.playerId));if(!Number.isFinite(n)||n<0||n>65535)return;let i=typeof t.name=="string"?t.name:"",s=(r.playerData.name||"").trim().toLowerCase();if(s&&i.trim().toLowerCase()===s)return;let o=n&65535,a=Math.trunc(Number(t.classId))&65535,l={playerName:i,playerId:o,classId:a};for(let c of ao)if(_w(i,c.needle,c.match))try{c.handler(l)}catch(u){m.error("ScriptEvents","onPlayerJoinParty handler failed",u)}}function Nw(r){let e=typeof r=="string"?[r]:[...r],t=new Set;for(let n of e){let i=String(n).trim().toLowerCase();i&&t.add(i)}return t}function Aw(r,e,t){let n=Nw(r);if(n.size===0)return()=>{};let i=Number(t?.radius),s=Number.isFinite(i)&&i>0?i:If,o={names:n,radius:s,handler:e,prevByClient:new WeakMap};return so.push(o),()=>{let a=so.indexOf(o);a>=0&&so.splice(a,1)}}function Ow(r){let e=r.rawStats[String(x.GuildName)];return String(e??"").trim()}function Mw(r,e,t){let n=r.trim().toLowerCase(),i=e.trim().toLowerCase();return i?t==="contains"?n.includes(i):n===i:!1}function Dw(r,e,t,n){let i=String(r).trim();if(!i)return()=>{};let s="equals",o,a;typeof e=="function"?(o=e,a=t):(s=e,o=t,a=n);let l=Number(a?.radius),c=Number.isFinite(l)&&l>0?l:If,u={needle:i,match:s,radius:c,handler:o,prevByClient:new WeakMap};return oo.push(u),()=>{let d=oo.indexOf(u);d>=0&&oo.splice(d,1)}}function Lw(r,e){let t=r.objectId;if(!t)return;let n=r.playerData.pos.x,i=r.playerData.pos.y,s=e.worldState.getAllPlayersRawStatsForDashboard(e.gameData);for(let o of oo){let a=[];for(let d of s){if(d.objectId===t)continue;let p=Ow(d);if(!Mw(p,o.needle,o.match))continue;let f=Math.hypot(d.x-n,d.y-i);f<=o.radius&&a.push({name:d.name,guildName:p,objectId:d.objectId,x:d.x,y:d.y,distance:f})}let l=new Set(a.map(d=>d.objectId)),c=o.prevByClient.get(r);if(c===void 0){o.prevByClient.set(r,new Set(l));continue}let u=[];for(let d of a)c.has(d.objectId)||u.push(d);if(o.prevByClient.set(r,new Set(l)),u.length!==0)try{o.handler({entered:u,inRange:a,radius:o.radius})}catch(d){m.error("ScriptEvents","onGuildNearby handler failed",d)}}}function $w(r,e){let t=r.objectId;if(!t)return;let n=r.playerData.pos.x,i=r.playerData.pos.y,s=e.worldState.getAllPlayersRawStatsForDashboard(e.gameData);for(let o of so){let a=[];for(let d of s){if(d.objectId===t)continue;let p=d.name.trim().toLowerCase();if(!o.names.has(p))continue;let f=Math.hypot(d.x-n,d.y-i);f<=o.radius&&a.push({name:d.name,objectId:d.objectId,x:d.x,y:d.y,distance:f})}let l=new Set(a.map(d=>d.name.trim().toLowerCase())),c=o.prevByClient.get(r);if(c===void 0){o.prevByClient.set(r,new Set(l));continue}let u=[];for(let d of a){let p=d.name.trim().toLowerCase();c.has(p)||u.push(d)}if(o.prevByClient.set(r,new Set(l)),u.length!==0)try{o.handler({entered:u,inRange:a,radius:o.radius})}catch(d){m.error("ScriptEvents","onPlayerNearby handler failed",d)}}}function lr(r,e){return nn.has(r)||nn.set(r,[]),nn.get(r).push(e),()=>{let t=nn.get(r)??[];nn.set(r,t.filter(n=>n!==e))}}function cr(r,e){for(let t of nn.get(r)??[])try{t(e)}catch(n){m.error("ScriptEvents",`events.${r} handler failed`,n)}}function Bw(r,e){if(!Array.isArray(r))return"";for(let t of r)if(t&&t.id===e&&typeof t.value=="string")return String(t.value).trim();return""}function jw(r,e){let n={threshold:Math.floor(Number(r))||0,handler:e};return io.push(n),()=>{let i=io.indexOf(n);i>=0&&io.splice(i,1)}}function Rf(r){let e=r.playerData.characterAliveFame,t=co.get(r);if(t!==void 0){for(let{threshold:n,handler:i}of io)if(t<n&&e>=n)try{i({fame:e,threshold:n})}catch(s){m.error("ScriptEvents","onCharacterFameAtLeast handler failed",s)}}co.set(r,e)}function Nf(r,e){let t=r.playerData.inventory,n=Zn.get(r);if(!n||n.length!==t.length){Zn.set(r,[...t]);return}for(let i=0;i<t.length;i++){let s=n[i],o=t[i],a=!Number.isFinite(s)||s<0,l=Number.isFinite(o)&&o>=0;if(a&&l){let c=e.gameData.buildSdkItem(o);cr("itemPickedUp",{slotIndex:i,objectType:o,itemName:c?.name})}}Zn.set(r,[...t])}function Fw(r,e,t){if(!e.isDefined||!e.data.statuses)return;let n=!1;for(let o of e.data.statuses)if(o.objectId===r.objectId){n=!0;break}if(!n)return;let i=lo.get(r),s=r.playerData.level;i!==void 0&&s>i&&cr("levelUp",{newLevel:s}),lo.set(r,s),Nf(r,t),Rf(r)}function Af(r){Me.events.onPlayerDied=e=>lr("playerDied",e),Me.events.onEnemySpawned=e=>lr("enemySpawned",e),Me.events.onEnemySpawnedOfType=(e,t)=>Me.events.onEnemySpawned(n=>{n.objectType===e&&t(n)}),Me.events.onMapChanged=e=>lr("mapChanged",e),Me.events.onConnected=e=>lr("connected",e),Me.events.onDisconnected=e=>lr("disconnected",e),Me.events.onLevelUp=e=>lr("levelUp",e),Me.events.onItemPickedUp=e=>lr("itemPickedUp",e),Me.events.onPortalOpened=e=>lr("portalOpened",e),Me.events.onCharacterFameAtLeast=(e,t)=>jw(e,t),Me.events.onPlayerNearby=(e,t,n)=>Aw(e,t,n),Me.events.onGuildNearby=((e,t,n,i)=>Dw(e,t,n,i)),Me.events.onPlayerJoinParty=((e,t,n)=>Iw(e,t,n)),Me.events.onChat=(e,t)=>{let n=String(e).trim().toLowerCase();return n?Me.chat.onMessage(i=>{if(i.message.toLowerCase().includes(n))try{t(i)}catch(s){m.error("ScriptEvents","onChat handler failed",s)}}):()=>{}},r.proxy.hookPacket("DEATH",(e,t)=>{if(!t.isDefined)return;let n=String(t.data.killedBy??"").trim(),i=(e.playerData.name||"").trim()||"Unknown";cr("playerDied",{playerName:i,isLocal:!0,killedBy:n||void 0})}),r.proxy.hookPacket("MAPINFO",(e,t)=>{if(!t.isDefined)return;let n=t.data,i=is(n.displayName??"",n.name??""),s=Number(n.width)||0,o=Number(n.height)||0;cr("mapChanged",{mapName:i,width:s,height:o})}),r.proxy.hookPacket("CREATESUCCESS",(e,t)=>{if(!t.isDefined)return;lo.delete(e),co.delete(e),Zn.set(e,[...e.playerData.inventory]);let n=e.state?.conTargetAddress,i=e.state?.conTargetPort;cr("connected",{serverAddress:n?`${n}:${i??2050}`:void 0})}),r.proxy.on("clientDisconnected",e=>{lo.delete(e),co.delete(e),Zn.delete(e),cr("disconnected",{serverAddress:e.state?.conTargetAddress?`${e.state.conTargetAddress}:${e.state.conTargetPort??2050}`:void 0})}),r.proxy.hookPacket("UPDATE",(e,t)=>{if(!t.isDefined||!t.data.newObjs)return;let n=!1;for(let i of t.data.newObjs){let s=i.status;if(!s)continue;s.objectId===e.objectId&&(n=!0);let o=Number(i.objectType);if(!Number.isFinite(o)||o<=0)continue;let a=r.gameData.getObjectCategory(o),l=s.position??{x:0,y:0};if(a==="Enemy"){let c=Bw(s.data,x.NameStat),u=r.gameData.getObject(o),d=c||u?.displayId||u?.id||`0x${o.toString(16)}`;cr("enemySpawned",{objectType:o,objectId:s.objectId,name:d,position:{x:l.x,y:l.y}})}if(a==="Portal"){let c=r.gameData.getObject(o),u=c?.displayId||c?.id||`Portal 0x${o.toString(16)}`;cr("portalOpened",{portalName:u,objectId:s.objectId,position:{x:l.x,y:l.y}})}}n&&(Nf(e,r),Rf(e))}),r.proxy.hookPacket("NEWTICK",(e,t)=>{Fw(e,t,r),$w(e,r),Lw(e,r)}),r.proxy.hookPacket("PARTYMEMBERADDED",(e,t)=>{Rw(e,t)})}var Z=U(fe(),1);X();var dt=U(fe(),1);X();var ti=new WeakMap,Of=!1;function ei(r){return Array.isArray(r)?r.map(e=>{let t=Math.trunc(Number(e));return Number.isFinite(t)?t:-1}):[]}function Fe(r,e=0){let t=Number(r);return Number.isFinite(t)?Math.trunc(t):e}function Vt(r){return ti.get(r)??null}function Mf(r,e,t){if(!(e<0)){for(;r.contents.length<=e;)r.contents.push(-1);r.contents[e]=t<0?-1:t}}function Df(r){Of||(Of=!0,r.proxy.hookPacket("VAULTCONTENT",(e,t)=>{if(!t.isDefined||!t.data)return;let n=t.data,i={capturedAt:Date.now(),lastVaultUpdate:!!n.lastVaultUpdate,vault:{objectId:Fe(n.vaultChestObjectId,-1),contents:ei(n.vaultContents)},material:{objectId:Fe(n.materialChestObjectId,-1),contents:ei(n.materialContents)},gift:{objectId:Fe(n.giftChestObjectId,-1),contents:ei(n.giftContents)},potion:{objectId:Fe(n.potionStorageObjectId,-1),contents:ei(n.potionContents)},seasonalSpoils:{objectId:Fe(n.seasonalSpoilChestObjectId,-1),contents:ei(n.seasonalSpoilContent)},vaultUpgradeCost:Fe(n.vaultUpgradeCost),materialUpgradeCost:Fe(n.materialUpgradeCost),seasonalSpoilUpgradeCost:Fe(n.seasonalSpoilUpgradeCost),potionUpgradeCost:Fe(n.potionUpgradeCost),currentPotionMax:Fe(n.currentPotionMax),nextPotionMax:Fe(n.nextPotionMax),vaultChestEnchants:String(n.vaultChestEnchants??""),giftChestEnchants:String(n.giftChestEnchants??""),spoilsChestEnchants:String(n.spoilsChestEnchants??"")};e.playerData.vaultChestObjectId=i.vault.objectId,e.playerData.vaultContent=[],ti.set(e,i),m.log("VaultStore",`VAULTCONTENT: vault oid=${i.vault.objectId} slots=${i.vault.contents.length} material oid=${i.material.objectId} gift oid=${i.gift.objectId} potion oid=${i.potion.objectId}`)}),r.proxy.hookPacket("INVRESULT",(e,t)=>{if(!t.isDefined||!t.data||(e.state?.gameId??-999)!==xr.Vault)return;let n=ti.get(e);if(!n)return;let i=t.data.fromSlot,s=t.data.toSlot;if(!i||!s)return;let o=Fe(i.objectId,-1),a=Fe(s.objectId,-1),l=Fe(i.slotId,-1),c=Fe(s.slotId,-1),u=Fe(i.objectType,-1),d=Fe(s.objectType,-1),p=[n.vault,n.material,n.gift,n.potion,n.seasonalSpoils];for(let f of p)f.objectId<=0||(o===f.objectId&&Mf(f,l,d),a===f.objectId&&Mf(f,c,u))}),r.proxy.hookPacket("MAPINFO",e=>{ti.has(e)&&(ti.delete(e),e.playerData.vaultChestObjectId=-1)}))}var $f=xr.Vault;function Lf(r){return r===void 0||!Number.isFinite(r)||r<0?-1:Math.trunc(r)}function ur(r,e){return e<0||e>=dt.INVENTORY_TOTAL_SLOT_COUNT?-1:e<dt.INVENTORY_MAIN_SLOT_COUNT?Lf(r.inventory[e]):Lf(r.backpack[e-dt.INVENTORY_MAIN_SLOT_COUNT])}function Bf(r,e,t){let n=t<0?-1:Math.trunc(t);e<dt.INVENTORY_MAIN_SLOT_COUNT?r.inventory[e]=n:r.backpack[e-dt.INVENTORY_MAIN_SLOT_COUNT]=n}function Hw(r){for(let e=4;e<dt.INVENTORY_TOTAL_SLOT_COUNT;e++)if(ur(r,e)<0)return e;return null}function Ww(r){for(let e=4;e<dt.INVENTORY_TOTAL_SLOT_COUNT;e++)if(ur(r,e)>=0)return e;return null}function Gw(r){for(let e=0;e<r.length;e++)if(r[e]===-1||r[e]===void 0)return e;return null}function jf(r,e){let t=r.clientRef.current;if(!t)return null;let n=Vt(t);return!n||n.vault.contents.length===0?null:n.vault.contents.slice()}function Ff(r,e,t,n){let i=r.clientRef.current;if(!i)return;let s=Vt(i);if(!s)return;let o=s.vault.contents;for(;o.length<=t;)o.push(-1);o[t]=n<0?-1:Math.trunc(n)}function Uw(r,e){let t=Math.trunc(e);if(r.length===0)return null;if(t>=0&&t<r.length){let n=Math.trunc(r[t])|0;if(n>=0)return{slot:t,itemType:n}}for(let n=0;n<r.length;n++){let i=Math.trunc(r[n]??-1)|0;if(i>=0&&i===t)return{slot:n,itemType:i}}return null}function Vw(r){for(let e=0;e<r.length;e++){let t=Math.trunc(r[e]??-1)|0;if(t>=0)return{slot:e,itemType:t}}return null}function qw(r,e){let t=Math.trunc(e);if(t>=4&&t<dt.INVENTORY_TOTAL_SLOT_COUNT){let n=ur(r,t);if(n>=0)return{slot:t,itemType:n}}for(let n=4;n<dt.INVENTORY_TOTAL_SLOT_COUNT;n++){let i=ur(r,n);if(i>=0&&i===t)return{slot:n,itemType:i}}return null}function Hf(r,e,t,n){try{let i=r.proxy.packetFactory.createByName("INVENTORYSWAP"),s=e.playerData;return i.data.time=Math.trunc(e.time),i.data.position={x:s.pos.x,y:s.pos.y},i.data.slotObject1={objectId:t.objectId,slotId:t.slotId,objectType:t.objectType},i.data.slotObject2={objectId:n.objectId,slotId:n.slotId,objectType:n.objectType},i.modified=!0,e.sendToServer(i),!0}catch(i){return m.warn("InventoryVault",`INVENTORYSWAP: ${i.message}`),!1}}function Wf(r,e,t){let n=r.clientRef.current;if(!n?.connected)return m.warn("InventoryVault","withdraw: no connection"),!1;if((n.state?.gameId??-999)!==$f)return m.warn("InventoryVault","withdraw: must be in vault"),!1;let i=n.playerData,o=Vt(n)?.vault.objectId??-1;if(o<=0)return m.warn("InventoryVault","withdraw: vault chest objectId unknown (wait for VAULTCONTENT)"),!1;let a=i.ownerObjectId||n.objectId;if(a<=0)return m.warn("InventoryVault","withdraw: player objectId unknown"),!1;let l=jf(r,i);if(!l||l.length===0)return m.warn("InventoryVault","withdraw: vault contents unavailable (wait for VAULTCONTENT)"),!1;let c,u,d;if(t==="container"){let g=Uw(l,e);if(!g)return m.warn("InventoryVault","withdraw: no matching vault slot or type"),!1;c=g.slot,u=g.itemType;let y=Hw(i);if(y===null)return m.warn("InventoryVault","withdraw: inventory full"),!1;d=y}else{if(d=Math.trunc(e),d<0||d>=dt.INVENTORY_TOTAL_SLOT_COUNT)return m.warn("InventoryVault","withdraw: invalid destination inventory slot"),!1;if(ur(i,d)>=0)return m.warn("InventoryVault","withdraw: destination inventory slot must be empty"),!1;let g=Vw(l);if(!g)return m.warn("InventoryVault","withdraw: vault empty"),!1;c=g.slot,u=g.itemType}let p=Math.trunc(l[c]??-1)|0,f=ur(i,d);return Hf(r,n,{objectId:o,slotId:c,objectType:p>=0?p:u},{objectId:a,slotId:d,objectType:f>=0?f:-1})?(Ff(r,i,c,-1),Bf(i,d,u),!0):!1}function Gf(r,e,t){let n=r.clientRef.current;if(!n?.connected)return m.warn("InventoryVault","deposit: no connection"),!1;if((n.state?.gameId??-999)!==$f)return m.warn("InventoryVault","deposit: must be in vault"),!1;let i=n.playerData,o=Vt(n)?.vault.objectId??-1;if(o<=0)return m.warn("InventoryVault","deposit: vault chest objectId unknown (wait for VAULTCONTENT)"),!1;let a=i.ownerObjectId||n.objectId;if(a<=0)return m.warn("InventoryVault","deposit: player objectId unknown"),!1;let l=jf(r,i);if(!l||l.length===0)return m.warn("InventoryVault","deposit: vault contents unavailable (wait for VAULTCONTENT)"),!1;let c,u,d;if(t==="inventory"){let g=qw(i,e);if(!g)return m.warn("InventoryVault","deposit: no matching inventory slot or type"),!1;c=g.slot,u=g.itemType;let y=Gw(l);if(y===null)return m.warn("InventoryVault","deposit: vault full"),!1;d=y}else{if(d=Math.trunc(e),d<0||d>=l.length)return m.warn("InventoryVault","deposit: invalid destination vault slot"),!1;if(l[d]!==-1&&l[d]!==void 0)return m.warn("InventoryVault","deposit: destination vault slot must be empty"),!1;let g=Ww(i);if(g===null)return m.warn("InventoryVault","deposit: inventory empty"),!1;c=g,u=ur(i,c)}let p=ur(i,c),f=Math.trunc(l[d]??-1)|0;return Hf(r,n,{objectId:a,slotId:c,objectType:p>=0?p:u},{objectId:o,slotId:d,objectType:f>=0?f:-1})?(Bf(i,c,-1),Ff(r,i,d,u),!0):!1}function _r(r){return r.clientRef.current?.playerData??null}function Jw(r){return r?r.backpackTier>=16?3:r.backpackTier!==0||r.legacyHasBackpackStat75?2:1:1}function uo(r){return r===void 0||!Number.isFinite(r)||r<0?-1:Math.trunc(r)}function ri(r,e){return e<0||e>=Z.INVENTORY_TOTAL_SLOT_COUNT?-1:e<Z.INVENTORY_MAIN_SLOT_COUNT?uo(r.inventory[e]):uo(r.backpack[e-Z.INVENTORY_MAIN_SLOT_COUNT])}function Vf(r,e){return r.gameData.buildSdkItem(e)?.name}function Ul(r,e,t){return{objectType:t,slotIndex:e,itemName:Vf(r,t)}}function Uf(r,e,t){if(typeof t=="number"&&Number.isFinite(t))return e===Math.trunc(t);let n=String(t).trim().toLowerCase();return n?(Vf(r,e)?.toLowerCase()??"").includes(n)?!0:(r.gameData.getObject(e)?.id?.toLowerCase()??"").includes(n):!1}function qf(r){Df(r),Z.inventory.withdraw=(t,n)=>Wf(r,t,n),Z.inventory.deposit=(t,n)=>Gf(r,t,n);function e(t){let n=r.clientRef.current;if(!n)throw new Error(`inventory.${t}: not connected`);let i=Vt(n);if(!i)throw new Error(`inventory.${t}: vault not entered yet (no VAULTCONTENT received)`);return i}Z.inventory.getVault=()=>e("getVault").vault.contents.slice(),Z.inventory.getEntireVault=()=>{let t=e("getEntireVault");return{capturedAt:t.capturedAt,vault:t.vault.contents.slice(),material:t.material.contents.slice(),gift:t.gift.contents.slice(),potion:t.potion.contents.slice(),seasonalSpoils:t.seasonalSpoils.contents.slice()}},Z.inventory.getMaterials=()=>e("getMaterials").material.contents.slice(),Z.inventory.getPotions=()=>e("getPotions").potion.contents.slice(),Z.inventory.getGifts=()=>e("getGifts").gift.contents.slice(),Z.inventory.getSeasonalSpoils=()=>e("getSeasonalSpoils").seasonalSpoils.contents.slice(),Z.inventory.getSlot=t=>{let n=_r(r);if(!n||t<0||t>=Z.INVENTORY_TOTAL_SLOT_COUNT)return null;let i=ri(n,t);return i<0?null:Ul(r,t,i)},Z.inventory.getAll=()=>{let t=_r(r),n=new Array(Z.INVENTORY_TOTAL_SLOT_COUNT).fill(-1);if(!t)return n;for(let i=0;i<Z.INVENTORY_MAIN_SLOT_COUNT;i++)n[i]=uo(t.inventory[i]);for(let i=0;i<Z.INVENTORY_BACKPACK_SLOT_COUNT;i++)n[Z.INVENTORY_MAIN_SLOT_COUNT+i]=uo(t.backpack[i]);return n},Z.inventory.findItem=t=>{let n=_r(r);if(!n)return null;for(let i=0;i<Z.INVENTORY_TOTAL_SLOT_COUNT;i++){let s=ri(n,i);if(!(s<0)&&Uf(r,s,t))return Ul(r,i,s)}return null},Z.inventory.findItems=t=>{let n=_r(r);if(!n)return[];let i=[];for(let s=0;s<Z.INVENTORY_TOTAL_SLOT_COUNT;s++){let o=ri(n,s);o<0||Uf(r,o,t)&&i.push(Ul(r,s,o))}return i},Z.inventory.useItem=t=>{v("inventory.useItem")},Z.inventory.swapSlots=(t,n)=>{v("inventory.swapSlots")},Z.inventory.isFull=()=>{let t=_r(r);if(!t)return!1;for(let n=4;n<Z.INVENTORY_MAIN_SLOT_COUNT;n++)if(ri(t,n)<0)return!1;return!0},Z.inventory.emptySlotCount=()=>{let t=_r(r);if(!t)return 8;let n=0;for(let i=4;i<Z.INVENTORY_MAIN_SLOT_COUNT;i++)ri(t,i)<0&&n++;return n},Z.inventory.getBackpack=()=>Jw(_r(r))}var Te=U(fe(),1);X();var zw=new Set([1280,1281,1283,1286,1287,1288,1289,1291,1292,1294,1295,1296,1708,1709,1710,1722,1723,1724,1725,1726,1727,1728,8239]),Kw={1280:"common",1281:"common",1283:"green",1286:"purple",1287:"purple",1288:"blue",1289:"blue",1291:"white",1292:"white",1294:"purple",1295:"purple",1296:"purple",1708:"common",1709:"common",1710:"blue",1722:"purple",1723:"purple",1724:"white",1725:"white",1726:"purple",1727:"purple",1728:"purple",8239:"common"},np=new Set([2594,2736]),ip=new Set([2595,2781]),sp=new Set([2793,2794,5471,5472,9070,9071]),op=new Set([2591,2592,2593,2612,2613,2636,5465,5466,5467,5468,5469,5470,5094,9064,9065,9066,9067,9068,9069]),ap=new Set([1,2,3,8,17,24]),lp=new Set([4,5,11,12,13,15,16,18,19,20,21,22,23,25,27,28,29,30,31]),cp=new Set([6,7,14]),up=new Set([9]),Jf=new Set([10,26]);function Yw(r){return ap.has(r)||lp.has(r)||cp.has(r)||up.has(r)}function ql(r,e){return r==="ST"?!1:r==="UT"?!0:r!==""?!1:Yw(e)}function Xw(r){return ap.has(r)?"weapon":lp.has(r)?"ability":cp.has(r)?"armor":up.has(r)?"ring":null}var on=new Map;function Qw(r){on=new Map;for(let e of r.gameData.getAllObjects()){let t=Number(e.slotType??-1);if(!Number.isFinite(t)||t<0)continue;let n=Math.trunc(t),i=String(e.tierStr??"").trim().toUpperCase(),s=i==="ST",o=ql(i,n),a=o||s||!/^-?\d+$/.test(i)?null:Number(i),l=String(e.id||"").trim()||`0x${e.type.toString(16)}`;on.set(e.type,{slotType:n,tier:a,isUT:o,isST:s,name:l,quickslotAllowed:e.quickslotAllowed===!0})}}var zf={unknown:-1,common:0,green:1,blue:2,purple:3,white:4},Ot=new Map,sn=new Map;function Kf(r,e){return sn.has(r)||sn.set(r,[]),sn.get(r).push(e),()=>{let t=sn.get(r)??[];sn.set(r,t.filter(n=>n!==e))}}function Yf(r,e){for(let t of sn.get(r)??[])try{t(e)}catch(n){m.warn("BridgeLoot",`listener error: ${n.message}`)}}function Zw(r,e){let t=Number(r.objectType);if(!zw.has(t))return null;let n=r.status;if(!n)return null;let i=Number(n.objectId),s=n.position?{x:Number(n.position.x),y:Number(n.position.y)}:{x:0,y:0},o={};if(n.data&&Array.isArray(n.data))for(let c of n.data)c&&c.id!=null&&(o[String(c.id)]=Number(c.value));let a=[];for(let c=0;c<8;c++){let u=o[String(x.Inventory0+c)];if(!Number.isFinite(u)||u<=0)continue;let d=e.gameData.getObject(u);a.push({objectType:u,slotIndex:c,itemName:d?.id})}let l=Kw[t]??"unknown";return{objectId:i,bagType:t,rarity:l,position:s,items:a,droppedAt:Date.now()}}function eE(r,e,t){if(e.isDefined){if(e.data.newObjs)for(let n of e.data.newObjs){let i=Zw(n,t);i&&(Ot.set(i.objectId,i),Yf("bagDropped",{bag:i}))}if(e.data.drops)for(let n of e.data.drops){let i=Ot.get(Number(n));i&&(Ot.delete(Number(n)),Yf("bagRemoved",{bag:i}))}}}var Xf=1e6,Qf=3;function Vl(r,e,t){let n=r.worldState.getEntity(e);if(!n)return-1;let i=n.stats?.[String(x.Inventory0+t)],s=Number(i);return Number.isFinite(s)?Math.trunc(s):-1}function Zf(r,e=!0,t){for(let n=4;n<=11;n++){if(t?.has(n))continue;if(Number(r.playerData.inventory[n]??-1)===-1)return{packetSlotId:n,currentObjectType:-1}}if(e&&r.playerData.hasBackpack)for(let n=0;n<16;n++){let i=12+n;if(t?.has(i))continue;if(Number(r.playerData.backpack[n]??-1)===-1)return{packetSlotId:i,currentObjectType:-1}}return null}function ep(r,e,t){if(!on.get(e)?.quickslotAllowed)return null;for(let i=0;i<Qf;i++){let s=Xf+i;if(t?.has(s))continue;let o=Number(r.playerData.quickSlots[i]??-1);if(o===e)return{packetSlotId:s,currentObjectType:o}}for(let i=0;i<Qf;i++){let s=Xf+i;if(t?.has(s))continue;if(Number(r.playerData.quickSlots[i]??-1)===-1)return{packetSlotId:s,currentObjectType:-1}}return null}function tp(r,e,t,n,i,s){let o=e.proxy.packetFactory.createByName("INVENTORYSWAP");o.data.time=Math.trunc(r.time),o.data.position={x:Number(r.playerData.pos?.x??0),y:Number(r.playerData.pos?.y??0)},o.data.slotObject1={objectId:t,slotId:n,objectType:i},o.data.slotObject2={objectId:r.objectId,slotId:s.packetSlotId,objectType:s.currentObjectType},o.modified=!0,r.sendToServer(o)}function tE(r,e,t){if(!Number.isFinite(r)||r<=0)return!1;let n=e.blacklist?new Set(e.blacklist):null,i=e.whitelist?new Set(e.whitelist):null;if(n?.has(r))return!1;if(i?.has(r))return!0;if(np.has(r))return e.includeHpPotions??!1;if(ip.has(r))return e.includeMpPotions??!1;if(sp.has(r))return e.includeLifeManaPotions??!0;if(op.has(r))return e.includeStatPotions??!0;let s=on.get(r);if(!s){let l=t.gameData.getObject(r);if(l&&(e.includeUTs??!0)){let c=Math.trunc(Number(l.slotType??-1)),u=String(l.tierStr??"").trim().toUpperCase();if(ql(u,c)&&!Jf.has(c))return!0}return!1}if(e.includeMarks&&s.name.includes("Mark of ")||e.includeEggs&&s.name.endsWith(" Egg"))return!0;if(s.isUT)return e.includeUTs??!0?!Jf.has(s.slotType):!1;if(s.isST)return e.includeSTs??!1;let o=Xw(s.slotType);if(!o)return!1;let a;switch(o){case"weapon":a=e.minWeaponTier??0;break;case"ability":a=e.minAbilityTier??0;break;case"armor":a=e.minArmorTier??0;break;case"ring":a=e.minRingTier??0;break}return s.tier!=null&&s.tier>=a}var rp=!1;function dp(r){rp||(rp=!0,Qw(r),r.proxy.hookPacket("UPDATE",(e,t)=>{try{eE(e,t,r)}catch(n){m.warn("BridgeLoot",`UPDATE hook error: ${n.message}`)}}),r.proxy.hookPacket("MAPINFO",()=>{Ot.clear()})),Te.loot.getBags=()=>Array.from(Ot.values()),Te.loot.getNearbyBags=(e=5)=>{let t=r.clientRef.current?.playerData;if(!t)return Array.from(Ot.values());let{x:n,y:i}=t.pos;return Array.from(Ot.values()).filter(s=>Math.hypot(s.position.x-n,s.position.y-i)<=e)},Te.loot.getBagsByRarity=e=>Array.from(Ot.values()).filter(t=>t.rarity===e),Te.loot.getBagsContaining=e=>Array.from(Ot.values()).filter(t=>t.items.some(n=>n.objectType===e)),Te.loot.onBagDropped=e=>Kf("bagDropped",e),Te.loot.onRareBagDropped=(e,t)=>Te.loot.onBagDropped(n=>{zf[n.bag.rarity]>=zf[e]&&t(n)}),Te.loot.onItemDropped=(e,t)=>Te.loot.onBagDropped(n=>{let i=n.bag.items.find(s=>s.objectType===e);i&&t({bag:n.bag,item:i})}),Te.loot.onBagRemoved=e=>Kf("bagRemoved",e),Te.loot.pickup=(e,t,n)=>{let i=r.clientRef.current;if(!i?.connected||!i.objectId)return!1;let s=Vl(r,e.objectId,t);if(s<=0)return!1;let o=n?.useBackpack??!0,a=ep(i,s)??Zf(i,o);if(!a)return!1;try{return tp(i,r,e.objectId,t,s,a),!0}catch(l){return m.warn("BridgeLoot",`pickup failed: ${l.message}`),!1}},Te.loot.pickupId=(e,t)=>{let n=r.clientRef.current;if(!n?.connected||!n.objectId)return-1;let i=Ot.get(e),s=r.worldState.getEntity(e);if(!s)return-1;let o=Number(s.pos?.x??i?.position.x??0),a=Number(s.pos?.y??i?.position.y??0),l=Number(n.playerData.pos?.x??0),c=Number(n.playerData.pos?.y??0),u=t?.maxDistance??1;if(Math.hypot(o-l,a-c)>u)return-1;let d=t?.useBackpack??!0,p=new Set,f=0;for(let h=0;h<8;h++){let g=Vl(r,e,h);if(g<=0)continue;let y=ep(n,g,p)??Zf(n,d,p);if(y){p.add(y.packetSlotId);try{tp(n,r,e,h,g,y),f++}catch(b){m.warn("BridgeLoot",`pickupId slot ${h} failed: ${b.message}`)}}}return f},Te.loot.useFromBag=(e,t)=>{let n=r.clientRef.current;if(!n?.connected)return!1;let i=Vl(r,e.objectId,t);if(i<=0)return!1;try{let s=r.proxy.packetFactory.createByName("USEITEM");return s.data.time=Math.trunc(n.time),s.data.slotObject={objectId:e.objectId,slotId:t,objectType:i},s.data.itemUsePos={x:0,y:0},s.data.useType=0,s.data.unknownInt=0,s.modified=!0,n.sendToServer(s),!0}catch(s){return m.warn("BridgeLoot",`useFromBag failed: ${s.message}`),!1}},Te.loot.shouldPickup=(e,t={})=>tE(e,t,r),Te.loot.isUT=e=>{let t=on.get(e);if(t)return t.isUT;let n=r.gameData.getObject(e);if(!n)return!1;let i=Math.trunc(Number(n.slotType??-1));return ql(String(n.tierStr??"").trim().toUpperCase(),i)},Te.loot.isST=e=>{let t=on.get(e);if(t)return t.isST;let n=r.gameData.getObject(e);return n?String(n.tierStr??"").trim().toUpperCase()==="ST":!1},Te.loot.isStatPot=e=>op.has(e),Te.loot.isHpPot=e=>np.has(e),Te.loot.isMpPot=e=>ip.has(e),Te.loot.isLifeManaPot=e=>sp.has(e)}var Se=U(fe(),1),ni=new Map,ii=new Map,rE=300*1e3,nE={red:16724787,green:4177763,blue:3447003,gold:15844367,white:16777215,purple:10181046,orange:15105570,gray:9807270};function fo(r){return new Promise(e=>setTimeout(e,Math.max(0,r)))}function iE(r){if(r!==void 0)return typeof r=="number"?r:nE[r]}function sE(r){if(r)return r===!0?new Date().toISOString():r instanceof Date?r.toISOString():String(r)}function oE(r){if(r)return{parse:r.parse??[],roles:r.roles,users:r.users,replied_user:r.repliedUser??!1}}function aE(r){if(r)return Array.isArray(r)?r:Object.entries(r).map(([e,t])=>({name:e,value:t==null?"":String(t),inline:!0}))}function lE(r){let e=typeof r.footer=="string"?{text:r.footer}:r.footer;return{title:r.title,description:r.description,color:iE(r.color),fields:aE(r.fields)?.map(t=>({name:t.name,value:t.value,inline:t.inline??!1})),footer:e?{text:e.text,icon_url:e.iconUrl}:void 0,timestamp:sE(r.timestamp)}}function cE(r,e){let t={};return e.content&&(t.content=e.content),(e.username??r.options.username)&&(t.username=e.username??r.options.username),(e.avatarUrl??r.options.avatarUrl)&&(t.avatar_url=e.avatarUrl??r.options.avatarUrl),t.allowed_mentions=oE(e.allowedMentions??r.options.allowedMentions??{parse:[]}),e.embeds?.length&&(t.embeds=e.embeds.map(n=>lE(n))),t}async function uE(r){try{return await r.text()}catch{return""}}function dE(r,e){try{let t=JSON.parse(r),n=Number(t.retry_after);if(Number.isFinite(n)&&n>0)return n<100?Math.ceil(n*1e3):Math.ceil(n)}catch{}return e}async function fE(r,e){let t=r.options.timeoutMs??1e4,n=r.options.retries??2,i=r.options.retryDelayMs??1e3;for(let s=0;s<=n;s++){let o=new AbortController,a=setTimeout(()=>o.abort(),t);try{let l=await fetch(r.options.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),signal:o.signal});if(l.ok)return;let c=await uE(l);if((l.status===429||l.status>=500)&&s<n){let p=l.status===429?dE(c,i):i;await fo(p);continue}let d=c?`: ${c.slice(0,500)}`:"";throw new Error(`Discord webhook failed: ${l.status} ${l.statusText}${d}`)}catch(l){if(l?.name==="AbortError"){if(s<n){await fo(i);continue}throw new Error(`Discord webhook timed out after ${t}ms`)}if(s<n){await fo(i);continue}throw l}finally{clearTimeout(a)}}}async function pE(r,e){let t=r.options.url,n=ni.get(t),i=n?.promise??Promise.resolve(),s=n??{promise:Promise.resolve(),inFlight:0};s.inFlight++,ni.set(t,s);let o=i.catch(()=>{}).then(async()=>{let a=r.options.minIntervalMs??250,l=Date.now()-(ii.get(t)??0);l<a&&await fo(a-l),await e(),ii.set(t,Date.now())});return s.promise=o.catch(()=>{}),s.promise.then(()=>{if(s.inFlight--,s.inFlight<=0&&ni.get(t)===s){ni.delete(t);let a=ii.get(t);a!==void 0&&setTimeout(()=>{ni.has(t)||ii.get(t)===a&&ii.delete(t)},rE).unref?.()}}),o}function mE(r){let e=r.item;return e?e.itemName??`ID:${e.objectType}`:r.bag.items.map(t=>t.itemName??`ID:${t.objectType}`).join(", ")||"(empty)"}function fp(r){Se.DiscordWebhook.prototype.send=async function(e){let t=cE(this,e);await pE(this,()=>fE(this,t))},Se.DiscordWebhook.prototype.sendSafe=async function(e){try{return await this.send(e),!0}catch(t){return Se.Log.warn(`Discord webhook send failed: ${t instanceof Error?t.message:String(t)}`),!1}},Se.DiscordWebhook.prototype.sendText=async function(e){return this.send({content:e})},Se.DiscordWebhook.prototype.sendEmbed=async function(e,t={}){return this.send({...t,embeds:[e]})},Se.DiscordWebhook.prototype.sendDeath=async function(e){return this.sendEmbed({title:e.isLocal?"You Died":`${e.playerName} Died`,description:`Killed by: ${e.killedBy??"unknown"}`,color:"red",fields:{Player:e.playerName,Map:Se.RealmEngine.world.getName()},timestamp:!0})},Se.DiscordWebhook.prototype.sendLoot=async function(e){return this.sendEmbed({title:`${e.bag.rarity.toUpperCase()} bag`,description:mE(e),color:e.bag.rarity==="white"?"white":e.bag.rarity==="purple"?"purple":"blue",fields:{Map:Se.RealmEngine.world.getName(),Owner:e.bag.ownerName??"unknown",Position:`${e.bag.position.x.toFixed(1)}, ${e.bag.position.y.toFixed(1)}`},timestamp:!0})},Se.DiscordWebhook.prototype.sendFameSnapshot=async function(){return this.sendEmbed({title:"Fame Snapshot",color:"gold",fields:{Player:Se.RealmEngine.self.getName(),Class:Se.RealmEngine.self.getClass(),CharacterFame:Se.RealmEngine.self.getCharacterFame(),AccountFame:Se.RealmEngine.self.getAccountFame(),PowerLevel:Se.RealmEngine.self.getPowerLevel(),Map:Se.RealmEngine.world.getName()},timestamp:!0})},Se.DiscordWebhook.prototype.sendPartyStatus=async function(){let e=Se.RealmEngine.party.getPartyMembers();return this.sendEmbed({title:"Party Status",color:"blue",description:e.length?e.map(t=>`${t.playerName} (${t.classId})`).join(`
`):"No current party members.",fields:{Count:e.length,Map:Se.RealmEngine.world.getName()},timestamp:!0})}}var dr=U(fe(),1);X();function si(r,e,t){let n=r.clientRef.current;if(!n?.connected)return!1;try{let i=r.proxy.packetFactory.createByName(e);return Object.assign(i.data,t),i.modified=!0,n.sendToServer(i),!0}catch(i){return m.warn("Guild",`${e} send failed: ${i.message}`),!1}}function pp(r){let e=new Set,t=new Set;r.proxy.hookPacket("INVITEDTOGUILD",(n,i)=>{if(!i.isDefined||e.size===0)return;let s=i.data,o={inviterName:String(s.name??""),guildName:String(s.guildName??"")};for(let a of e)try{a(o)}catch(l){m.error("Guild","onInvited handler threw",l)}}),r.proxy.hookPacket("GUILDRESULT",(n,i)=>{if(!i.isDefined||t.size===0)return;let s=i.data,o={success:!!s.success,message:String(s.lineBuilderJSON??"")};for(let a of t)try{a(o)}catch(l){m.error("Guild","onResult handler threw",l)}}),dr.guild.invite=n=>{si(r,"GUILDINVITE",{name:String(n)})},dr.guild.remove=n=>{si(r,"GUILDREMOVE",{name:String(n)})},dr.guild.leave=()=>{let n=r.clientRef.current;if(!n?.connected)return;let i=n.playerData.name;if(!i){m.warn("Guild","leave: character name not yet known");return}si(r,"GUILDREMOVE",{name:i})},dr.guild.join=n=>{si(r,"JOINGUILD",{guildName:String(n)})},dr.guild.setRank=(n,i)=>{si(r,"CHANGEGUILDRANK",{name:String(n),guildRank:Math.trunc(Number(i))})},dr.guild.onInvited=n=>(e.add(n),()=>{e.delete(n)}),dr.guild.onResult=n=>(t.add(n),()=>{t.delete(n)})}function po(r,e){return r.map(t=>{let n={...t},i=typeof t.id=="string"?String(t.id):void 0;if(i){let a=e.get(i)??{};typeof n.onClick=="function"&&(a.onClick=n.onClick,delete n.onClick),typeof n.onChange=="function"&&(a.onChange=n.onChange,delete n.onChange),(a.onClick||a.onChange)&&e.set(i,a)}let s=t.children;Array.isArray(s)&&(n.children=po(s,e));let o=t.tabs;return Array.isArray(o)&&(n.tabs=o.map(a=>({...a,children:Array.isArray(a.children)?po(a.children,e):[]}))),n})}function Mt(r,e){if(r)for(let t of r){if(t.id===e)return t;let n=t.children;if(n){let s=Mt(n,e);if(s)return s}let i=t.tabs;if(Array.isArray(i))for(let s of i){let o=Mt(s.children,e);if(o)return o}}}var mo=class{deps;panels=new Map;constructor(e){this.deps=e}currentScriptId(){let e=this.deps.scriptSession.scriptId;return e&&String(e).trim()?String(e).trim():void 0}emit(e){try{this.deps.emitScriptPanelMessage?.(e)}catch{}}serializableDef(e){return{title:e.def.title,subtitle:e.def.subtitle,width:e.def.width,autoOpen:e.def.autoOpen,widgets:e.def.widgets}}define(e){let t=this.currentScriptId();if(!t)throw new Error("RealmEngine.ui.panel.define must be called from a script (onStart/onLoop/onStop).");let n=new Map,i=po(e.widgets??[],n),s={scriptId:t,def:{...e,widgets:i},handlers:n,isOpen:!1};this.panels.set(t,s),this.emit({type:"scriptPanelState",scriptId:t,def:this.serializableDef(s),isOpen:s.isOpen}),e.autoOpen&&(s.isOpen=!0,this.emit({type:"scriptPanelOpen",scriptId:t}));let o=this;return{get isOpen(){return s.isOpen},open(){s.isOpen||(s.isOpen=!0,o.emit({type:"scriptPanelOpen",scriptId:t}))},close(){s.isOpen&&(s.isOpen=!1,o.emit({type:"scriptPanelClose",scriptId:t}))},update(l){let c={...s.def,...l};if(l.widgets){let u=new Map(s.handlers);c.widgets=po(l.widgets,u),s.handlers=u}s.def=c,o.emit({type:"scriptPanelState",scriptId:t,def:o.serializableDef(s),isOpen:s.isOpen})},setValue(l,c){let u=Mt(s.def.widgets,l);u&&(u.type==="item"?u.item=c:u.type==="itemGrid"?u.items=c:u.value=c),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"value",id:l,value:c}]})},setImage(l,c){let u=Mt(s.def.widgets,l);u&&(u.src=String(c)),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"image",id:l,value:String(c)}]})},setText(l,c){let u=Mt(s.def.widgets,l);u&&("text"in u&&(u.text=c),"label"in u&&(u.label=c),"caption"in u&&(u.caption=c)),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"text",id:l,value:String(c)}]})},setEnabled(l,c){let u=Mt(s.def.widgets,l);u&&(u.enabled=!!c),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"enabled",id:l,value:!!c}]})},setVisible(l,c){let u=Mt(s.def.widgets,l);u&&(u.visible=!!c),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"visible",id:l,value:!!c}]})},appendLog(l,c){let u=Mt(s.def.widgets,l);if(u&&u.type==="log"){let d=Array.isArray(u.lines)?u.lines:u.lines=[];d.push(String(c));let p=typeof u.maxLines=="number"&&u.maxLines>0?u.maxLines:200;d.length>p&&d.splice(0,d.length-p)}o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"log-append",id:l,value:String(c)}]})},setLog(l,c){let u=Array.isArray(c)?c.map(p=>String(p)):[],d=Mt(s.def.widgets,l);d&&d.type==="log"&&(d.lines=u.slice()),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"log-set",id:l,value:u}]})}}}dispatchEvent(e,t){let n=this.panels.get(e.scriptId);if(!n)return;if(e.kind==="closed-by-user"){n.isOpen&&(n.isOpen=!1);return}let i=n.handlers.get(e.widgetId);if(i){if(e.kind==="change"){let s=Mt(n.def.widgets,e.widgetId);s&&(s.value=e.value)}t(e.scriptId,()=>{try{e.kind==="click"?i.onClick?.():e.kind==="change"&&i.onChange?.(e.value)}catch(s){let o=s instanceof Error?s.stack||s.message:String(s);this.deps.emitScriptLog(e.scriptId,`Panel handler error: ${o}`,"error")}})}}destroyForScript(e){this.panels.has(e)&&(this.panels.delete(e),this.emit({type:"scriptPanelState",scriptId:e,def:null,isOpen:!1}))}snapshot(e){let t=this.panels.get(e);if(t)return{def:this.serializableDef(t),isOpen:t.isOpen}}scriptIds(){return[...this.panels.keys()]}};X();function mp(r){let e=new mo(r),t=globalThis.__realmengineSDK;if(!t)return console.error("[ScriptUiBridge] DIAG: globalThis.__realmengineSDK missing \u2014 cannot patch RealmEngine.ui"),e;function n(s){let o=s==null||typeof s!="string"?null:s.trim();r.setScriptActivityLabel?.(o||null)}t.ScriptUi={setActivity:n};let i=t.RealmEngine;if(m.debug("scripts","ScriptUiBridge",`bag.RealmEngine present=${!!i} typeof=${typeof i} sameAsBagChat=${t.chat!=null}`),i&&typeof i=="object"){let s=i.ui,o=s&&typeof s=="object"?s:i.ui={};o.status=function(d){n(d)},o.setStatus=function(d){n(d)};let a=o.panel,l=a&&typeof a=="object"?a:o.panel={};l.define=u=>e.define(u);let c=t.RealmEngine.ui;m.debug("scripts","ScriptUiBridge",`patched. readBack ui.status patched=${typeof c?.status=="function"&&c.status===o.status} panel.define patched=${typeof c?.panel?.define=="function"&&c.panel.define===l.define} sameObj=${c===o}`)}else console.error("[ScriptUiBridge] DIAG: bag.RealmEngine not an object \u2014 ui NOT patched");return e}var _=U(fe(),1),fr=class r{static panelRegistry;static install(e){qs.install(e),Js.install(e),Vs.install(e),js.install(e),Fs.install(e),Hs.install(e),Ws.install(e),Gs.install(e),Us.install(e),zs.install(e),Ys.install(e),Xs.install(e),Qs.install(e),eo.install(e),to.install(e),ro.install(e),Sf(e),Ef(e),_f(e),Af(e),qf(e),dp(e),fp(e),pp(e),globalThis.__realmengineSDK={chat:_.chat,party:_.party,trade:_.trade,events:_.events,inventory:_.inventory,INVENTORY_MAIN_SLOT_COUNT:_.INVENTORY_MAIN_SLOT_COUNT,INVENTORY_BACKPACK_SLOT_COUNT:_.INVENTORY_BACKPACK_SLOT_COUNT,INVENTORY_TOTAL_SLOT_COUNT:_.INVENTORY_TOTAL_SLOT_COUNT,loot:_.loot,discord:_.discord,DiscordWebhook:_.DiscordWebhook,guild:_.guild,GuildRank:_.GuildRank,Self:_.Self,Walking:_.Walking,Combat:_.Combat,Players:_.Players,Enemies:_.Enemies,Inventory:_.Inventory,Vault:_.Vault,World:_.World,Tiles:_.Tiles,Objects:_.Objects,Projectiles:_.Projectiles,Log:_.Log,Settings:_.Settings,Timing:_.Timing,RealmEngine:_.RealmEngine,Position:_.Position,StatusEffect:_.StatusEffect,Panel:_.Panel,uiPanel:_.uiPanel,TreeScript:_.TreeScript,Root:_.Root,Branch:_.Branch,Leaf:_.Leaf,leaf:_.leaf,branch:_.branch,when:_.when,not:_.not,always:_.always,cooldown:_.cooldown,once:_.once,sequence:_.sequence,parallel:_.parallel},r.panelRegistry=mp(e)}};X();Ln();var Dt="realmengine.script.json",ho=class{scriptsDir;running=new Map;logCallback;bridgeInstalled=!1;scriptSession;scriptActivityById=new Map;scriptsStateNotify;constructor(e){this.scriptSession=e,this.scriptsDir=(0,qe.join)(process.env.USERPROFILE||(0,hp.homedir)(),"Documents","Realmengine","Scripts")}setScriptsStateNotify(e){this.scriptsStateNotify=e}emitScriptsStateChanged(){try{this.scriptsStateNotify?.()}catch{}}resolveActivityScriptId(e){let t=e.scriptSession.scriptId;if(t&&String(t).trim())return String(t).trim();if(this.running.size===1)return this.running.keys().next().value}installBridge(e){this.bridgeInstalled||(e.setScriptActivityLabel=t=>{let n=this.resolveActivityScriptId(e);n&&(t==null||String(t).trim()===""?this.scriptActivityById.delete(n):this.scriptActivityById.set(n,String(t).trim()),this.emitScriptsStateChanged())},fr.install(e),this.bridgeInstalled=!0)}onLog(e){this.logCallback=e}withScriptId(e,t){let n=this.scriptSession.scriptId;this.scriptSession.scriptId=e;try{return t()}finally{this.scriptSession.scriptId=n}}log(e,t,n="info"){let i=`[${e}] ${t}`;n==="error"?console.error(i):n==="warn"?console.warn(i):console.log(i),this.logCallback?.(e,i,n)}isInside(e,t){let n=(0,qe.relative)(e,t);return n===""||!!n&&!n.startsWith("..")&&!(0,qe.isAbsolute)(n)}parseManifest(e){let t=(0,qe.join)(e,Dt),n=(0,qe.basename)(e);if(!(0,rt.existsSync)(t))throw new Error(`Missing ${Dt}`);let i;try{let p=(0,rt.readFileSync)(t,"utf8").replace(/^\uFEFF/,"");i=JSON.parse(p)}catch(p){throw new Error(`Invalid ${Dt}: ${p.message}`)}let s=String(i.name??"").trim(),o=String(i.developer??"").trim(),a=String(i.version??"").trim(),l=String(i.entry??"").trim();if(!s)throw new Error(`${Dt} is missing "name"`);if(!o)throw new Error(`${Dt} is missing "developer"`);if(!a)throw new Error(`${Dt} is missing "version"`);if(!l)throw new Error(`${Dt} is missing "entry"`);if(l.includes("\\"))throw new Error(`${Dt} entry must use forward slashes`);if(!l.endsWith(".mjs"))throw new Error(`${Dt} entry must point to a .mjs file`);let c=(0,qe.resolve)(e),u=(0,qe.resolve)(e,l);if(!this.isInside(c,u))throw new Error(`${Dt} entry must stay inside the script folder`);if(!(0,rt.existsSync)(u))throw new Error(`Entry file not found: ${l}`);if(!(0,rt.statSync)(u).isFile())throw new Error(`Entry is not a file: ${l}`);let d=this.running.get(n);return{id:n,name:s,developer:o,version:a,path:u,rootPath:c,entry:l,status:d?"running":"idle",activity:this.scriptActivityById.get(n),startedAt:d?.startedAt,runtimeMs:d?Math.max(0,Date.now()-d.startedAt):void 0}}getScript(e){if(!e||e.includes("/")||e.includes("\\")||e.startsWith(".")||e==="node_modules")return;let t=(0,qe.join)(this.scriptsDir,e);if((0,rt.existsSync)(t)){try{if(!(0,rt.statSync)(t).isDirectory())return}catch{return}try{return this.parseManifest(t)}catch(n){return{id:e,name:e,developer:"Unknown",version:"Unknown",path:t,rootPath:t,entry:"",status:"error",error:n.message}}}}list(){return(0,rt.existsSync)(this.scriptsDir)?(0,rt.readdirSync)(this.scriptsDir).filter(e=>e!=="node_modules"&&!e.startsWith(".")).map(e=>(0,qe.join)(this.scriptsDir,e)).filter(e=>{try{return(0,rt.statSync)(e).isDirectory()}catch{return!1}}).map(e=>{try{return this.parseManifest(e)}catch(t){let n=(0,qe.basename)(e);return{id:n,name:n,developer:"Unknown",version:"Unknown",path:e,rootPath:e,entry:"",status:"error",error:t.message}}}):[]}async start(e){if(this.running.has(e))return{ok:!1,error:"Already running"};this.scriptActivityById.delete(e),this.emitScriptsStateChanged();let t=this.getScript(e);if(!t)return{ok:!1,error:`Script package not found: ${e}`};if(t.status==="error")return{ok:!1,error:t.error??"Script package is invalid"};if(!t.path.endsWith(".mjs"))return{ok:!1,error:"Only .mjs script entries are supported"};try{let s=(await import(`${(0,gp.pathToFileURL)(t.path).href}?t=${Date.now()}`)).default;if(!s)return{ok:!1,error:"Script has no default export"};let o=new s;if(typeof o.onStart!="function"||typeof o.onLoop!="function"||typeof o.onStop!="function")return{ok:!1,error:"Script must implement onStart(), onLoop(), and onStop()"};if(It.enabled("scripts")){let u=globalThis.__realmengineSDK,d=u?.RealmEngine?.ui,p=typeof d?.status=="function"?Function.prototype.toString.call(d.status).slice(0,60):String(d?.status);m.debug("scripts","ScriptHost",`DIAG pre-onStart: bag=${!!u} RealmEngine=${!!u?.RealmEngine} ui=${!!d} status=${typeof d?.status} panel.define=${typeof d?.panel?.define}
  status.src=${p}`)}this.withScriptId(e,()=>{this.log(e,`Starting ${t.name} v${t.version} by ${t.developer}...`),o.onStart()});let a=Date.now(),l=()=>{this.running.has(e)&&this.withScriptId(e,()=>{try{let u=o.onLoop();if(typeof u=="number"&&u<0){this.log(e,"Script requested stop (onLoop returned < 0)."),this.stop(e);return}let d=setTimeout(l,typeof u=="number"?u:600);this.running.set(e,{instance:o,timer:d,startedAt:a})}catch(u){this.log(e,`Error in onLoop: ${u.message}`,"error"),this.stop(e)}})},c=setTimeout(l,0);return this.running.set(e,{instance:o,timer:c,startedAt:a}),this.withScriptId(e,()=>this.log(e,`Running ${t.name} v${t.version} by ${t.developer}.`)),this.emitScriptsStateChanged(),{ok:!0}}catch(n){return console.error("[ScriptHost] start() caught error for",e,`:
`,n?.stack||n?.message||String(n)),{ok:!1,error:n.message}}}stop(e){let t=this.running.get(e);if(!t)return{ok:!1,error:"Not running"};clearTimeout(t.timer),this.running.delete(e),this.scriptActivityById.delete(e);try{fr.panelRegistry?.destroyForScript(e)}catch{}return this.emitScriptsStateChanged(),this.withScriptId(e,()=>{try{t.instance.onStop(),this.log(e,"Stopped.")}catch(n){this.log(e,`Error in onStop: ${n.message}`,"error")}}),{ok:!0}}stopAll(){for(let e of this.running.keys())this.stop(e)}isRunning(e){return this.running.has(e)}getScriptsDir(){return this.scriptsDir}dispatchPanelEvent(e){fr.panelRegistry?.dispatchEvent(e,(t,n)=>this.withScriptId(t,n))}getPanelSnapshot(e){return fr.panelRegistry?.snapshot(e)}panelScriptIds(){return fr.panelRegistry?.scriptIds()??[]}};var go=class{entities=new Map;tileMap=new Map;lastMapIdentity="";buildMapIdentity(e){let t=Number(e.state?.gameId??-2),n=String(e.playerData?.mapName??"").trim().toLowerCase();return`${Number.isFinite(t)?t:-2}|${n}`}ensureMapIdentity(e){let t=this.buildMapIdentity(e);!t||t==="-2|"||(this.lastMapIdentity&&this.lastMapIdentity!==t&&this.clear(),this.lastMapIdentity=t)}buildEnemyCandidate(e,t,n){if(e.getObjectCategory(t.objectType)!=="Enemy")return null;let i=Number(t.pos?.x),s=Number(t.pos?.y);if(!Number.isFinite(i)||!Number.isFinite(s))return null;let o=t.stats||{},a=o[String(x.HP)],l=o[String(x.MaxHP)],c=Number.isFinite(Number(a))?Number(a):0,u=e.getObject(t.objectType)?.maxHp??0,d=Number.isFinite(Number(l))&&Number(l)>0?Number(l):u;(!Number.isFinite(d)||d<=0)&&(d=Math.max(1,c));let p=Math.hypot(i-n.x,s-n.y);return{objectId:t.objectId,objectType:t.objectType,x:i,y:s,dist:p,hp:c,maxHp:d,hpPct:c/Math.max(1,d)}}isLikelyPlayerEntity(e,t){if(e.getObjectCategory(t.objectType)==="Player")return!0;let n=t.stats||{},i=n[String(x.NameStat)],s=Number(n[String(x.Level)]),o=Number(n[String(x.Inventory0)]),a=Number(n[String(x.Inventory1)]),l=Number(n[String(x.Inventory2)]),c=Number(n[String(x.Inventory3)]),u=typeof i=="string"&&i.trim().length>0,d=Number.isFinite(s)&&s>0,p=Number.isFinite(o)&&o!==-1||Number.isFinite(a)&&a!==-1||Number.isFinite(l)&&l!==-1||Number.isFinite(c)&&c!==-1;return u&&(d||p)}applyStatus(e,t){if(t.position&&(e.pos={...t.position}),t.data&&Array.isArray(t.data)){e.stats||(e.stats={});for(let n of t.data)n&&n.id!=null&&(e.stats[String(n.id)]=n.value)}e.lastUpdate=Date.now()}attach(e){e.hookPacket("UPDATE",(t,n)=>this.onUpdate(t,n)),e.hookPacket("NEWTICK",(t,n)=>this.onNewTick(t,n)),e.hookPacket("MAPINFO",t=>{this.clear(),this.lastMapIdentity=this.buildMapIdentity(t)})}onUpdate(e,t){if(this.ensureMapIdentity(e),!!t.isDefined){if(t.data.tiles)for(let n of t.data.tiles){let i=n.x<<16|n.y;this.tileMap.set(i,n.type)}if(t.data.newObjs)for(let n of t.data.newObjs){let i=n.objectType,s=n.status;if(!s)continue;let o={objectId:s.objectId,objectType:i,pos:s.position?{...s.position}:{x:0,y:0},lastUpdate:Date.now(),stats:void 0};this.applyStatus(o,s),this.entities.set(s.objectId,o)}if(t.data.drops)for(let n of t.data.drops)this.entities.delete(n)}}onNewTick(e,t){if(this.ensureMapIdentity(e),!(!t.isDefined||!t.data.statuses))for(let n of t.data.statuses){let i=this.entities.get(n.objectId);i&&this.applyStatus(i,n)}}clear(){this.entities.clear(),this.tileMap.clear()}forEachKnownTile(e){for(let[t,n]of this.tileMap.entries()){let i=t>>16,s=t&65535;e(i,s,n)}}forEachKnownTileInBounds(e,t,n,i,s){for(let[o,a]of this.tileMap.entries()){let l=o>>16,c=o&65535;l<e||l>t||c<n||c>i||s(l,c,a)}}getOccupiedTileKeys(){let e=new Set;for(let t of this.entities.values()){let n=Math.floor(t.pos.x),i=Math.floor(t.pos.y);e.add(n<<16|i&65535)}return e}getEntity(e){return this.entities.get(e)}getEntityType(e){return this.entities.get(e)?.objectType}resolveQuestTargetObjectType(e,t){if(!Number.isFinite(e)||e<=0)return;let n=this.getEntityType(e);if(n!=null&&n>0)return n;if(!t)return;let i=new Set;for(let s of this.entities.values())t.getObject(s.objectType)?.quest&&i.add(s.objectType);if(i.size===1)return i.values().next().value}hasAnyEntityObjectTypeIn(e){for(let t of this.entities.values())if(e.has(t.objectType))return!0;return!1}getNearestEntityByType(e,t,n,i){let s=null;for(let o of this.entities.values()){if(o.objectType!==e||n!=null&&o.objectId===n)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);i!=null&&a>i||(!s||a<s.dist)&&(s={objectId:o.objectId,x:o.pos.x,y:o.pos.y,dist:a})}return s}getEntitiesByTypeSorted(e,t,n,i){let s=[];for(let o of this.entities.values()){if(o.objectType!==e||n!=null&&o.objectId===n)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);i!=null&&a>i||s.push({objectId:o.objectId,x:o.pos.x,y:o.pos.y,dist:a})}return s.sort((o,a)=>o.dist-a.dist),s}getEntitiesInTypeSet(e,t,n,i){let s=[];for(let o of this.entities.values()){if(!e.has(o.objectType)||n!=null&&o.objectId===n)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);i!=null&&a>i||s.push({entity:o,dist:a})}return s.sort((o,a)=>o.dist-a.dist),s.map(o=>o.entity)}getFirstEntityByType(e,t){for(let n of this.entities.values())if(n.objectType===e&&!(t!=null&&n.objectId===t))return{objectId:n.objectId,x:n.pos.x,y:n.pos.y};return null}getNearestPortal(e,t,n,i){let s=null;for(let o of this.entities.values()){if(i!=null&&o.objectId===i||e.getObjectCategory(o.objectType)!=="Portal"||n?.objectType!=null&&o.objectType!==n.objectType)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);n?.maxDistance!=null&&a>n.maxDistance||(!s||a<s.dist)&&(s={objectId:o.objectId,objectType:o.objectType,x:o.pos.x,y:o.pos.y,dist:a})}return s}getPortalsSorted(e,t,n,i){let s=[];for(let o of this.entities.values()){if(i!=null&&o.objectId===i||e.getObjectCategory(o.objectType)!=="Portal"||n?.objectType!=null&&o.objectType!==n.objectType)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);n?.maxDistance!=null&&a>n.maxDistance||s.push({objectId:o.objectId,objectType:o.objectType,x:o.pos.x,y:o.pos.y,dist:a})}return s.sort((o,a)=>o.dist-a.dist),s}getNearestEnemy(e,t,n,i){let s=null,o=Date.now();for(let a of this.entities.values()){if(i!=null&&a.objectId===i||n?.maxStaleMs!=null&&o-a.lastUpdate>n.maxStaleMs)continue;let l=this.buildEnemyCandidate(e,a,t);l&&(n&&(n.hpMin!=null&&l.hp<n.hpMin||n.hpMax!=null&&l.hp>n.hpMax||n.hpUnder!=null&&l.hp>=n.hpUnder||n.hpOver!=null&&l.hp<=n.hpOver)||n?.maxDistance!=null&&l.dist>n.maxDistance||(!s||l.dist<s.dist)&&(s={objectId:l.objectId,objectType:l.objectType,x:l.x,y:l.y,dist:l.dist,hp:l.hp,maxHp:l.maxHp}))}return s}getEnemyBySelector(e,t,n,i,s){let o=null;for(let a of this.entities.values()){if(s!=null&&a.objectId===s)continue;let l=this.buildEnemyCandidate(e,a,t);if(l&&!(i&&(i.hpMin!=null&&l.hp<i.hpMin||i.hpMax!=null&&l.hp>i.hpMax||i.hpUnder!=null&&l.hp>=i.hpUnder||i.hpOver!=null&&l.hp<=i.hpOver))&&!(i?.maxDistance!=null&&l.dist>i.maxDistance)){if(!o){o=l;continue}if(n==="lowesthp"){(l.hp<o.hp||l.hp===o.hp&&l.dist<o.dist)&&(o=l);continue}if(n==="lowesthppct"){(l.hpPct<o.hpPct||l.hpPct===o.hpPct&&l.dist<o.dist)&&(o=l);continue}l.dist<o.dist&&(o=l)}}return o}getEnemiesMatching(e,t,n,i){let s=[];for(let o of this.entities.values()){if(i!=null&&o.objectId===i)continue;let a=this.buildEnemyCandidate(e,o,t);a&&(n&&(n.hpMin!=null&&a.hp<n.hpMin||n.hpMax!=null&&a.hp>n.hpMax||n.hpUnder!=null&&a.hp>=n.hpUnder||n.hpOver!=null&&a.hp<=n.hpOver)||n?.maxDistance!=null&&a.dist>n.maxDistance||s.push(a))}return s.sort((o,a)=>o.dist-a.dist),s}getBossEventTargetsSorted(e,t,n,i){let s=[];for(let o of this.entities.values()){if(i!=null&&o.objectId===i)continue;let a=e.getObject(o.objectType);if(!a)continue;if(n?.objectType!=null){if(o.objectType!==n.objectType)continue}else{let h=o.stats||{},g=h[String(x.HP)],y=h[String(x.MaxHP)],b=Number.isFinite(Number(g))?Number(g):0,S=Number.isFinite(Number(y))?Number(y):0;if(!(e.isBoss(o.objectType,5e3)||!!a.quest&&Math.max(b,S)>=2e3))continue}let l=o.stats||{},c=l[String(x.HP)],u=l[String(x.MaxHP)],d=Number.isFinite(Number(c))?Number(c):0,p=Number.isFinite(Number(u))?Number(u):0,f=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);n?.maxDistance!=null&&f>n.maxDistance||s.push({objectId:o.objectId,objectType:o.objectType,x:o.pos.x,y:o.pos.y,dist:f,hp:d,maxHp:p,name:a.id??`0x${o.objectType.toString(16)}`})}return s.sort((o,a)=>o.dist-a.dist),s}getTileAt(e,t){return this.tileMap.get(e<<16|t)}getNearbyTilesForDashboard(e,t,n=12){let i=Math.max(1,Math.min(30,Math.trunc(n))),s=l=>{let c=Math.floor(l.x),u=Math.floor(l.y),d=new Map;for(let f=u-i;f<=u+i;f++)for(let h=c-i;h<=c+i;h++){let g=this.getTileAt(h,f);if(g==null)continue;let y=d.get(g);y||(y=[],d.set(g,y)),y.push({x:h,y:f})}let p=[];for(let[f,h]of d.entries())p.push({tileType:f,name:e.getTileName(f),tiles:h});return p.sort((f,h)=>f.tileType-h.tileType),p},o={x:t.x,y:t.y},a=s(o);if(!a.length&&this.tileMap.size>0){let l=null;for(let c of this.tileMap.keys()){let u=c>>16,d=c&65535,p=Math.hypot(u-t.x,d-t.y);(!l||p<l.dist)&&(l={x:u,y:d,dist:p})}l&&(o={x:l.x,y:l.y},a=s(o))}return{center:o,radius:i,groups:a}}getEntitiesInRadius(e,t){let n=t*t,i=[];for(let s of this.entities.values()){let o=s.pos.x-e.x,a=s.pos.y-e.y;o*o+a*a<=n&&i.push(s)}return i}get entityCount(){return this.entities.size}getObjectsForDashboard(e){let t=new Map;for(let c of this.entities.values()){if(e.getObjectCategory(c.objectType)==="Player")continue;let d=t.get(c.objectType);d||(d=[],t.set(c.objectType,d)),d.push(c)}let n=[],i=[],s=new Map;for(let[c,u]of t.entries()){let d=e.getObjectCategory(c);if(d==="Portal"){let f=e.getObject(c)?.id??`0x${c.toString(16)}`;n.push({objectType:c,name:f,entities:u.map(h=>({objectId:h.objectId,x:h.pos.x,y:h.pos.y}))})}else if(d==="Beacon"){let f=e.getObject(c)?.id??`0x${c.toString(16)}`;i.push({objectType:c,name:f,entities:u.map(h=>({objectId:h.objectId,x:h.pos.x,y:h.pos.y}))})}else{let p=s.get(d);p||(p=new Map,s.set(d,p)),p.set(c,u)}}let o=["VisualOnly","Pet","Projectile","Container","Enemy","Other"],a={Portal:"Portals",Beacon:"Beacons",VisualOnly:"Visual Only",Pet:"Pets",Player:"Players",Projectile:"Projectiles",Container:"Containers",Enemy:"Enemies",Other:"Other"},l=[];for(let c of o){let u=s.get(c);if(!u||u.size===0)continue;let d=[],p=c==="Enemy";for(let[f,h]of u.entries()){let g=e.getObject(f),y=g?.id??`0x${f.toString(16)}`,b=g?.maxHp??0;d.push({objectType:f,name:y,entities:h.map(S=>{let E={objectId:S.objectId,x:S.pos.x,y:S.pos.y};if(p&&(E.maxHp=b,S.stats)){let I=S.stats[String(x.HP)];I!=null&&I!==""&&(E.hp=Number(I));let O=S.stats[String(x.MaxHP)];O!=null&&O!==""&&Number(O)>0&&(E.maxHp=Number(O))}return E})})}d.sort((f,h)=>f.objectType-h.objectType),l.push({category:a[c],groups:d})}return n.sort((c,u)=>c.objectType-u.objectType),i.sort((c,u)=>c.objectType-u.objectType),{portals:n,beacons:i,categories:l}}getNearbyPlayersForDashboard(e,t,n){let i=t?.x??0,s=t?.y??0,o=[];for(let a of this.entities.values()){if(n!=null&&a.objectId===n||!this.isLikelyPlayerEntity(e,a))continue;let l=a.stats||{},c=(M,A=0)=>{let $=l[String(M)];if($==null||$==="")return A;let w=typeof $=="number"?$:Number($);return Number.isFinite(w)?w:A},u=(M,A="")=>{let $=l[String(M)];return $==null?A:String($)},d=a.pos?.x??0,p=a.pos?.y??0,f=Math.hypot(d-i,p-s),h=c(1,0),g=c(0,0),y=c(4,0),b=c(3,0),S=h/Math.max(1,g),E=c(7,0),I=c(39,0),O=(u(31,"")||"").trim()||"?",H=e.getObject(a.objectType)?.id??`0x${a.objectType.toString(16)}`,W=[c(8,-1),c(9,-1),c(10,-1),c(11,-1)];o.push({objectId:a.objectId,objectType:a.objectType,className:H,name:O,x:d,y:p,dist:f,hp:h,maxHp:g,mp:y,maxMp:b,level:E,fame:I,eq:W,hpPct:S})}return o.sort((a,l)=>a.dist-l.dist),o}getAllPlayersRawStatsForDashboard(e){let t=[];for(let n of this.entities.values()){if(!this.isLikelyPlayerEntity(e,n))continue;let i=n.stats||{},o=(((d,p="")=>{let f=i[String(d)];return f==null?p:String(f)})(x.NameStat,"")||"").trim()||"?",a=e.getObject(n.objectType)?.id??`0x${n.objectType.toString(16)}`,l=n.pos?.x??0,c=n.pos?.y??0,u={};for(let[d,p]of Object.entries(i))u[d]=p;t.push({objectId:n.objectId,objectType:n.objectType,className:a,name:o,x:l,y:c,rawStats:u})}return t.sort((n,i)=>n.name.localeCompare(i.name,void 0,{sensitivity:"base"})||n.objectId-i.objectId),t}getNearbyPlayerDebugForDashboard(e,t,n){let i=this.entities.get(n);if(!i||!this.isLikelyPlayerEntity(e,i))return null;let s=i.stats||{},o=(y,b=0)=>{let S=s[String(y)];if(S==null||S==="")return b;let E=typeof S=="number"?S:Number(S);return Number.isFinite(E)?E:b},a=(y,b="")=>{let S=s[String(y)];return S==null?b:String(S)},l=t?.x??0,c=t?.y??0,u=i.pos?.x??0,d=i.pos?.y??0,p=Math.hypot(u-l,d-c),f=e.getObject(i.objectType)?.id??`0x${i.objectType.toString(16)}`;return{identity:{name:(a(31,"")||"").trim()||"?",className:f,objectId:i.objectId,objectType:i.objectType,objectTypeHex:`0x${i.objectType.toString(16)}`,accountId:a(38,""),guildName:a(62,""),guildRank:o(63,0),skin:o(76,0),hasBackpack:o(130,0)!==0||o(75,0)!==0,backpackTier:o(130,0),hasBackpackExtender:o(130,0)>=16},position:{x:u,y:d,dist:p},vitals:{hp:o(1,0),maxHp:o(0,0),mp:o(4,0),maxMp:o(3,0)},stats:{atk:o(20,0),def:o(21,0),spd:o(22,0),dex:o(28,0),vit:o(26,0),wis:o(27,0)},boosts:{hpBonus:o(46,0),mpBonus:o(47,0),atkBonus:o(48,0),defBonus:o(49,0),spdBonus:o(50,0),vitBonus:o(51,0),wisBonus:o(52,0),dexBonus:o(53,0)},misc:{level:o(7,0),fame:o(39,0),stars:o(30,0),credits:o(34,0),sinkLevel:0},inventory:{equipped:[o(8,-1),o(9,-1),o(10,-1),o(11,-1)],inventory:Array.from({length:12}).map((y,b)=>o(8+b,-1)),backpack:Array.from({length:16}).map((y,b)=>o(131+b,-1)),quickSlots:[o(116,-1),o(117,-1),o(118,-1)],healthStackCount:o(73,0),magicStackCount:o(74,0)},effects:{effects1:o(29,0),effects2:o(95,0)},rawStats:s}}};var yo=class{bullets=new Map;gameData;worldState;constructor(e,t){this.gameData=e??null,this.worldState=t??null}attach(e){e.hookPacket("ENEMYSHOOT",(t,n)=>this.onEnemyShoot(t,n)),e.hookPacket("MAPINFO",()=>this.clear())}onEnemyShoot(e,t){if(!t.isDefined)return;let n=t.data.bulletId&65535,i=t.data.ownerId,s=t.data.bulletType,o=t.data.position??t.data.startingPos;if(!o)return;let a=t.data.angle,l=t.data.damage,c=t.data.numShots,u=t.data.angleInc,d=Number.isFinite(c)?c:1;(d===255||d<=0)&&(d=1);let p=Number.isFinite(u)?u:0,f=null;if(this.gameData&&this.worldState){let h=this.worldState.getEntityType(i);h!==void 0&&(f=this.gameData.getProjectile(h,s)??null)}for(let h=0;h<d;h++){let g=`${i}:${n+h}`,y=a+h*p;this.bullets.set(g,{bulletId:n+h,ownerId:i,bulletType:s,startX:o.x,startY:o.y,angle:y,damage:l,spawnTime:Date.now(),projDef:f})}}cleanup(){let e=Date.now();for(let[t,n]of this.bullets){let i=n.projDef?.lifetimeMs??1e4,s=Math.min(i,1e4);e-n.spawnTime>s&&this.bullets.delete(t)}}clear(){this.bullets.clear()}getBullet(e){return this.bullets.get(e)}getActiveProjectiles(){return[...this.bullets.values()]}forEachBullet(e){for(let[t,n]of this.bullets)e(n,t)}get bulletCount(){return this.bullets.size}};var ic=require("fs"),sc=U(ln(),1);X();function qt(r){if(r==null||typeof r=="string"||typeof r=="number")return 0;if(Array.isArray(r))return qt(r[0]);if(typeof r=="object"){let t=r["@_max"];if(t!=null&&t!==""){let n=Number(t);if(Number.isFinite(n))return Math.trunc(n)}}return 0}function TT(r){return{maxHitPoints:qt(r.MaxHitPoints),maxMagicPoints:qt(r.MaxMagicPoints),attack:qt(r.Attack),defense:qt(r.Defense),speed:qt(r.Speed),dexterity:qt(r.Dexterity),hpRegen:qt(r.HpRegen),mpRegen:qt(r.MpRegen)}}function Qp(r){if(r==null)return"";if(Array.isArray(r)){for(let t of r){let n=Qp(t);if(n)return n}return""}if(typeof r!="object")return"";let e=r.File;return typeof e=="string"?e.trim():""}function Zp(r){if(r==null)return-1;if(Array.isArray(r)){for(let t of r){let n=Zp(t);if(n>=0)return n}return-1}if(typeof r!="object")return-1;let e=Number(r.Index);return Number.isFinite(e)?e:-1}var PT=new Set([1,2,3,8,17,24]),vT=new Set([4,5,11,12,13,15,16,18,19,20,21,22,23,25,27,28,29,30]),xT=new Set([6,7,14]),CT=new Set([9]);function kT(r){return!Number.isFinite(r)||r<0?"consumable":PT.has(r)?"weapon":vT.has(r)?"ability":xT.has(r)?"armor":CT.has(r)?"ring":"consumable"}var So=class{objects=new Map;tileSpeedMap=new Map;tileNameMap=new Map;tileTypeByNameMap=new Map;tilePushTypes=new Set;objectRawXmlMap=new Map;tileRawXmlMap=new Map;load(e){let t=(0,ic.readFileSync)(e,"utf8"),s=new sc.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"@_",isArray:u=>u==="Object"||u==="Projectile"||u==="ConditionEffect"}).parse(t).Objects?.Object??[];for(let u of s){let d=u["@_type"];if(!d)continue;let p=parseInt(d,16),f=u["@_id"]??"",h=String(u.DisplayId??"").trim(),g=u.Class??"",y={type:p,id:f,displayId:h,objectClass:g,textureFile:Qp(u.Texture),textureIndex:Zp(u.Texture),projectiles:new Map,maxHp:Number(u.MaxHitPoints??0),defense:Number(u.Defense??0),quest:u.Quest!==void 0,god:u.God!==void 0,rateOfFire:Number(u.RateOfFire??1),numProjectiles:Number(u.NumProjectiles??1),arcGap:Number(u.ArcGap??0),slotType:Number(u.SlotType??-1),burstCount:Number(u.BurstCount??0),occupySquare:u.OccupySquare!==void 0,protectFromGroundDamage:u.ProtectFromGroundDamage!==void 0,isEnemy:u.Enemy!==void 0,isPet:u.Pet!==void 0,isPlayer:u.Player!==void 0,isContainer:u.Container!==void 0,tierStr:String(u.Tier??"").trim(),bagType:(()=>{let b=Number(u.BagType);return Number.isFinite(b)?b:0})(),soulbound:u.Soulbound!==void 0,feedPower:Number(u.FeedPower??0),quickslotAllowed:u.QuickslotAllowed!==void 0,dungeonName:String(u.DungeonName??"").trim()};if(u.Projectile){let b=Array.isArray(u.Projectile)?u.Projectile:[u.Projectile];for(let S of b){let E=Number(S["@_id"]??0),I=Number(S.Size??100),H=.15*((Number.isFinite(I)&&I>0?I:100)/100),W=[];if(S.ConditionEffect){let M=Array.isArray(S.ConditionEffect)?S.ConditionEffect:[S.ConditionEffect];for(let A of M){let $=typeof A=="string"?A:A["#text"]??"",w=typeof A=="object"?Number(A["@_duration"]??0):0;$&&W.push({effect:$,durationSec:w})}}y.projectiles.set(E,{id:E,damage:Number(S.Damage??0),speed:Number(S.Speed??0),lifetimeMs:Number(S.LifetimeMS??0),hitRadius:H,armorPiercing:S.ArmorPiercing!==void 0,multiHit:S.MultiHit!==void 0,passesCover:S.PassesCover!==void 0,maxHealthDamage:Number(S.MaxHealthDamage??0),conditionEffects:W,amplitude:Number(S.Amplitude??0),frequency:Number(S.Frequency??0),magnitude:Number(S.Magnitude??3),wavy:S.Wavy!==void 0,parametric:S.Parametric!==void 0,boomerang:S.Boomerang!==void 0,acceleration:Number(S.Acceleration??0),accelerationDelay:Number(S.AccelerationDelay??0),speedClamp:Number(S.SpeedClamp??0)})}}y.isPlayer&&(y.playerStatMaxes=TT(u)),this.objects.set(p,y)}let o=[...this.objects.values()].reduce((u,d)=>u+d.projectiles.size,0),a=[...this.objects.values()].filter(u=>u.isPlayer&&u.playerStatMaxes).length;m.log("GameData",`Loaded ${this.objects.size} objects, ${o} projectile definitions, ${a} player class(es) with stat maxes`),this.objectRawXmlMap.clear();let l=/<Object\b[^>]*>([\s\S]*?)<\/Object>/g,c;for(;(c=l.exec(t))!==null;){let u=c[0].match(/\btype="([^"]+)"/);if(u){let d=parseInt(u[1],16);Number.isFinite(d)&&this.objectRawXmlMap.set(d,c[0])}}}getObject(e){return this.objects.get(e)}getPlayerClassStatMaxes(e){return this.objects.get(e)?.playerStatMaxes}getAllPlayerClassObjectTypes(){let e=[];for(let t of this.objects.values())t.isPlayer&&t.playerStatMaxes&&e.push(t.type);return e.sort((t,n)=>t-n),e}getRawObjectXml(e){return this.objectRawXmlMap.get(e)}getRawTileXml(e){return this.tileRawXmlMap.get(e)}buildSdkItem(e){if(!Number.isFinite(e)||e<=0)return null;let t=this.objects.get(e);if(!t)return{id:e,name:`0x${e.toString(16)}`,tier:"",slotType:"consumable",feedPower:0,bagType:0,soulbound:!1,tradeable:!0};let n=t.soulbound;return{id:e,name:t.displayId||t.id||`0x${e.toString(16)}`,tier:t.tierStr,slotType:kT(t.slotType),feedPower:t.feedPower,bagType:t.bagType,soulbound:n,tradeable:!n}}getAllObjects(){return[...this.objects.values()]}getObjectCategory(e){let t=this.objects.get(e);if(!t)return"Other";let n=t.objectClass;return n==="Portal"||n==="ArenaPortal"||n==="GuildHallPortal"||n.includes("Portal")?"Portal":t.id&&t.id.toLowerCase().includes("beacon")?"Beacon":t.isPet||n==="Pet"?"Pet":t.isPlayer||n==="Player"?"Player":n==="Projectile"?"Projectile":t.isContainer||n==="Container"?"Container":t.isEnemy||n==="Enemy"?"Enemy":!t.occupySquare&&(n==="GameObject"||n==="Decoration"||n==="Decoy")?"VisualOnly":"Other"}getProjectile(e,t){return this.objects.get(e)?.projectiles.get(t)}getBeaconTypes(){let e=[];for(let t of this.objects.values())this.getObjectCategory(t.type)==="Beacon"&&e.push({objectType:t.type,name:t.id||`0x${t.type.toString(16)}`});return e.sort((t,n)=>t.name.localeCompare(n.name)||t.objectType-n.objectType),e}isBoss(e,t=1e4){let n=this.objects.get(e);return n?n.quest&&n.maxHp>=t:!1}getOccupySquareTypes(){let e=new Set;for(let t of this.objects.values())t.occupySquare&&e.add(t.type);return e}getEnemyTypes(){let e=new Set;for(let t of this.objects.values())t.isEnemy&&e.add(t.type);return e}tileDamageMap=new Map;tileMinDamageSet=new Set;tileSlideAmountMap=new Map;tilePushVectorMap=new Map;tileHasDamageAttrs=new Set;tileHasConditionEffect=new Set;noWalkTileTypes=new Set;sinkTileTypes=new Set;loadTiles(e){let t=new Set,n=new Set;this.tileSpeedMap=new Map,this.tileNameMap=new Map,this.tileTypeByNameMap=new Map,this.tilePushTypes=new Set,this.tileDamageMap=new Map,this.tileMinDamageSet=new Set,this.tileSlideAmountMap=new Map,this.tilePushVectorMap=new Map,this.tileHasDamageAttrs=new Set,this.tileHasConditionEffect=new Set;try{let i=(0,ic.readFileSync)(e,"utf8"),a=new sc.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"@_",isArray:u=>u==="Ground"}).parse(i).GroundTypes?.Ground??[];for(let u of a){let d=u["@_type"];if(!d)continue;let p=parseInt(d,16);if(isNaN(p))continue;let f=String(u["@_id"]??"").trim();if(f&&(this.tileNameMap.set(p,f),this.tileTypeByNameMap.set(f.toLowerCase(),p)),u.Push!==void 0){this.tilePushTypes.add(p);let S=this.extractPushVectorFromGround(u,f);S&&this.tilePushVectorMap.set(p,S)}u.NoWalk!==void 0&&t.add(p),u.Sink!==void 0&&n.add(p),(p===254||f.toLowerCase()==="space")&&t.add(p);let h=Number(u.Speed??0);h>0&&h!==1&&this.tileSpeedMap.set(p,h);let g=Number(u.SlideAmount??0);g>0&&this.tileSlideAmountMap.set(p,g);let y=Number(u.MaxDamage??u.MinDamage??0);y>0&&this.tileDamageMap.set(p,y),Number(u.MinDamage??0)>0&&this.tileMinDamageSet.add(p),(u.MinDamage!==void 0||u.MaxDamage!==void 0)&&this.tileHasDamageAttrs.add(p),u.ConditionEffect!==void 0&&this.tileHasConditionEffect.add(p)}this.tileRawXmlMap.clear();let l=/<Ground\b[^>]*>([\s\S]*?)<\/Ground>/g,c;for(;(c=l.exec(i))!==null;){let u=c[0].match(/\btype="([^"]+)"/);if(u){let d=parseInt(u[1],16);Number.isFinite(d)&&this.tileRawXmlMap.set(d,c[0])}}}catch(i){m.warn("GameData",`Failed to load tiles: ${i.message}`)}return this.noWalkTileTypes=t,this.sinkTileTypes=n,m.log("GameData",`Tiles loaded - noWalk: ${t.size}, sink: ${n.size}, speed variants: ${this.tileSpeedMap.size}, sliding: ${this.tileSlideAmountMap.size}, push: ${this.tilePushTypes.size}, push-vectors: ${this.tilePushVectorMap.size}, damaging: ${this.tileDamageMap.size}, damageAttrs: ${this.tileHasDamageAttrs.size}, conditionTiles: ${this.tileHasConditionEffect.size}`),{noWalkTiles:t,sinkTiles:n,tileSpeedMap:this.tileSpeedMap,tileDamageMap:this.tileDamageMap,tileSlideAmountMap:this.tileSlideAmountMap,tilePushTypes:this.tilePushTypes,tilePushVectorMap:this.tilePushVectorMap}}tileIsNoWalk(e){return this.noWalkTileTypes.has(e)}tileIsSink(e){return this.sinkTileTypes.has(e)}tileIsBlockingWalk(e){return this.noWalkTileTypes.has(e)||this.sinkTileTypes.has(e)}getTileSpeed(e){return this.tileSpeedMap.get(e)??1}getTileName(e){return this.tileNameMap.get(e)??`0x${e.toString(16)}`}getTileTypeByName(e){return this.tileTypeByNameMap.get(String(e).trim().toLowerCase())}getTileDamage(e){return this.tileDamageMap.get(e)}getTileHasMinDamage(e){return this.tileMinDamageSet.has(e)}getTileSlideAmount(e){return this.tileSlideAmountMap.get(e)}getTilePushVector(e){return this.tilePushVectorMap.get(e)}getTileHasPush(e){return this.tilePushTypes.has(e)}getTileHasDamageAttrs(e){return this.tileHasDamageAttrs.has(e)}getTileHasConditionEffect(e){return this.tileHasConditionEffect.has(e)}extractPushVectorFromGround(e,t){let n=[e?.Animate,e?.TopAnimate,e?.Animate1,e?.Animate2];for(let i of n){let s=this.extractPushVectorFromAnimate(i);if(s)return s}return this.inferPushVectorFromTileName(t)}extractPushVectorFromAnimate(e){if(!e)return null;if(Array.isArray(e)){for(let i of e){let s=this.extractPushVectorFromAnimate(i);if(s)return s}return null}if(typeof e!="object")return null;let t=Number(e["@_dx"]??e.dx),n=Number(e["@_dy"]??e.dy);return Number.isFinite(t)&&t>0?{dx:-1,dy:0}:Number.isFinite(t)&&t<0?{dx:1,dy:0}:Number.isFinite(n)&&n>0?{dx:0,dy:-1}:Number.isFinite(n)&&n<0?{dx:0,dy:1}:null}inferPushVectorFromTileName(e){if(!e)return null;let t=e.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase().replace(/[^a-z]+/g," ").trim();if(!t)return null;let n=new Set(t.split(/\s+/).filter(Boolean)),i=(...s)=>s.some(o=>n.has(o));return i("push","pusher","pull","puller")?i("right","rt","east","e")?{dx:1,dy:0}:i("left","lf","west","w")?{dx:-1,dy:0}:i("down","dn","south","s")?{dx:0,dy:1}:i("up","north","n")?{dx:0,dy:-1}:null:null}get objectCount(){return this.objects.size}getGameWikiCatalog(){let e=[],t={};for(let s of this.objects.values()){let o=this.getObjectCategory(s.type),a=this.getGameWikiDungeonName(s);e.push({type:s.type,typeHex:`0x${s.type.toString(16)}`,id:s.id,displayId:s.displayId,objectClass:s.objectClass,category:o,maxHp:s.maxHp,defense:s.defense,quest:s.quest,god:s.god,rateOfFire:s.rateOfFire,numProjectiles:s.numProjectiles,arcGap:s.arcGap,slotType:s.slotType,burstCount:s.burstCount,occupySquare:s.occupySquare,isEnemy:s.isEnemy,isPet:s.isPet,isPlayer:s.isPlayer,isContainer:s.isContainer,dungeonName:a,...s.playerStatMaxes?{playerStatMaxes:s.playerStatMaxes}:{}}),s.projectiles.size>0&&(t[String(s.type)]={projectiles:[...s.projectiles.values()]})}e.sort((s,o)=>s.type-o.type);let n=new Set;for(let s of this.tileNameMap.keys())n.add(s);for(let s of this.tileSpeedMap.keys())n.add(s);for(let s of this.tileDamageMap.keys())n.add(s);for(let s of this.tileSlideAmountMap.keys())n.add(s);for(let s of this.tilePushTypes)n.add(s);for(let s of this.tileHasDamageAttrs)n.add(s);for(let s of this.tileHasConditionEffect)n.add(s);for(let s of this.noWalkTileTypes)n.add(s);for(let s of this.sinkTileTypes)n.add(s);let i=[];for(let s of n){let o=this.getTileSpeed(s),a=this.getTileSlideAmount(s),l=this.getTileDamage(s),c=this.getTilePushVector(s),u="Other";this.noWalkTileTypes.has(s)?u="NoWalk":this.sinkTileTypes.has(s)?u="Sink":o!==1?u="Speed":l!==void 0&&l>0?u="Damaging":this.tileHasDamageAttrs.has(s)?u="DamageAttrs":this.tileHasConditionEffect.has(s)?u="Condition":this.tilePushTypes.has(s)?u="Push":a!==void 0&&a>0&&(u="Slide");let d={type:s,typeHex:`0x${s.toString(16)}`,id:this.getTileName(s),noWalk:this.tileIsNoWalk(s),sink:this.tileIsSink(s),speed:o,hasDamageAttrs:this.tileHasDamageAttrs.has(s),hasConditionEffect:this.tileHasConditionEffect.has(s),hasPush:this.tilePushTypes.has(s),tileBucket:u};a!==void 0&&a>0&&(d.slideAmount=a),l!==void 0&&l>0&&(d.damagePerTick=l),c&&(d.pushDx=c.dx,d.pushDy=c.dy),i.push(d)}return i.sort((s,o)=>s.type-o.type),{objectSummaries:e,objectDetails:t,tiles:i}}getGameWikiDungeonName(e){return e.dungeonName?e.dungeonName:e.textureFile==="spriteWorldObjects8x8"&&e.objectClass!=="Equipment"&&!e.objectClass.includes("Portal")?"Sprite World":""}};var mn=require("fs"),Qe=require("path"),tg=require("url");X();var Nr=class{constructor(e,t,n,i,s,o,a){this.proxy=e;this.pluginId=t;this.pluginFile=n;this._name=t,this.gameData=i??null,this.worldState=s??null,this.projectileTracker=o??null,this.sessionStateResolver=a??null}_enabled=!0;_name;_category;_settings=new Map;_settingCallbacks=new Map;_settingDefaults=new Map;_enabledChangeCallbacks=[];_data=new Map;_cleanupFns=[];onDashboardLog=null;onBroadcastData=null;gameData;worldState;projectileTracker;sessionStateResolver;getEffectivePlayerPos(e){return e.playerData?.pos??null}getWorldState(e){return this.sessionStateResolver?.(e).worldState??this.worldState}getProjectileTracker(e){return this.sessionStateResolver?.(e).projectileTracker??this.projectileTracker}get enabled(){return this._enabled}set enabled(e){this._enabled=e,m.debug("plugin-config","Plugin",`${this._name} ${e?"enabled":"disabled"}`);for(let t of this._enabledChangeCallbacks)try{t(e)}catch{}}onEnabledChange(e){this._enabledChangeCallbacks.push(e)}get name(){return this._name}set name(e){this._name=e}get category(){return this._category??"utility"}set category(e){this._category=e}registerSetting(e,t,n){this._settings.set(e,{key:e,...t}),n&&this._settingCallbacks.set(e,n),t.type!=="button"&&this._settingDefaults.set(e,t.value)}resetSettingsToDefaults(){let e=[];for(let[t,n]of this._settingDefaults){let i=this._settings.get(t);!i||i.type==="button"||i.value!==n&&this.updateSetting(t,n)&&e.push(t)}return e}getSetting(e){return this._settings.get(e)?.value}updateSetting(e,t){let n=this._settings.get(e);if(!n)return!1;if(n.type==="number"||n.type==="range"){if(t=Number(t),isNaN(t))return!1;n.min!==void 0&&(t=Math.max(n.min,t)),n.max!==void 0&&(t=Math.min(n.max,t))}else if(n.type==="boolean")t=!!t;else if(n.type==="button"){let s=this._settingCallbacks.get(e);return s&&s(!0),!0}else(n.type==="select"||n.type==="text")&&(t=String(t??""));n.value=t,m.debug("plugin-config","Plugin",`${this._name}: ${n.label} = ${t}`);let i=this._settingCallbacks.get(e);return i&&i(t),!0}getSettings(){return[...this._settings.values()]}setData(e,t){this._data.set(e,t)}getData(e){return this._data.get(e)}broadcastData(e,t){this.onBroadcastData&&this.onBroadcastData(this.pluginId,e,t)}hookPacket(e,t,n){let i=n?.prepend===!0;this.proxy.hookPacket(e,(s,o)=>{this._enabled&&t(s,o)},this.pluginId,i)}hookAllPackets(e){let t=(i,s)=>{this._enabled&&e(i,s,!1)},n=(i,s)=>{this._enabled&&e(i,s,!0)};this.proxy.on("serverPacket",t),this.proxy.on("clientPacket",n),this._cleanupFns.push(()=>{this.proxy.off("serverPacket",t),this.proxy.off("clientPacket",n)})}hookCommand(e,t){this.proxy.hookCommand(e,(n,i,s)=>this._enabled?(t(n,i,s),!0):!1,this.pluginId)}on(e,t){this.proxy.on(e,n=>{this._enabled&&t(n)})}createPacket(e){return this.proxy.packetFactory.createByName(e)}serializePacket(e){return this.proxy.packetFactory.serialize(e)}sendNotification(e,t,n){let i=this.createPacket("TEXT");i.data={name:t,objectId:-1,numStars:-1,bubbleTime:0,recipient:"",text:n,cleanText:n,isSupporter:!1,starBg:0},e.sendToClient(i)}log(e){m.log(this._name,e)}dashboardLog(e){this.onDashboardLog&&this.onDashboardLog(this._name,e)}registerCleanup(e){this._cleanupFns.push(e)}runCleanup(){for(let e of this._cleanupFns)try{e()}catch{}this._cleanupFns=[]}};X();var ci=class{constructor(e,t,n){this.proxy=e;this.pluginId=t;this.pluginFile=n;this._name=t}_enabled=!0;_name;_category;_settings=new Map;_settingCallbacks=new Map;_settingDefaults=new Map;get enabled(){return this._enabled}set enabled(e){this._enabled=e,m.debug("plugin-config","Plugin",`${this._name} ${e?"enabled":"disabled"}`)}get name(){return this._name}set name(e){this._name=e}get category(){return this._category??"utility"}set category(e){this._category=e}registerSetting(e,t,n){this._settings.set(e,{key:e,...t}),n&&this._settingCallbacks.set(e,n),t.type!=="button"&&this._settingDefaults.set(e,t.value)}getSetting(e){return this._settings.get(e)?.value}updateSetting(e,t){let n=this._settings.get(e);if(!n)return!1;if(n.type==="number"||n.type==="range"){if(t=Number(t),isNaN(t))return!1;n.min!==void 0&&(t=Math.max(n.min,t)),n.max!==void 0&&(t=Math.min(n.max,t))}else if(n.type==="boolean")t=!!t;else if(n.type==="button"){let s=this._settingCallbacks.get(e);return s&&s(!0),!0}else(n.type==="select"||n.type==="text")&&(t=String(t??""));n.value=t,m.debug("plugin-config","Plugin",`${this._name}: ${n.label} = ${t}`);let i=this._settingCallbacks.get(e);return i&&i(t),!0}getSettings(){return[...this._settings.values()]}resetSettingsToDefaults(){let e=[];for(let[t,n]of this._settingDefaults){let i=this._settings.get(t);!i||i.type==="button"||i.value!==n&&this.updateSetting(t,n)&&e.push(t)}return e}registerCommand(e,t){this.proxy.hookCommand(e,(n,i,s)=>{if(!this._enabled)return!1;try{t(s)}catch(o){m.error("Plugin",`${this._name}: /${e} threw`,o)}return!0},this.pluginId)}};X();var Zh=[".ts",".js"],eg=[".mjs"];function jo(r){return r.replace(/\.(?:mjs|js|ts)$/i,"")}var Gx=new Map([["ESC","Escape"],["ESCAPE","Escape"],["INS","Insert"],["INSERT","Insert"],["DEL","Delete"],["DELETE","Delete"],["HOME","Home"],["END","End"],["PGUP","PageUp"],["PAGEUP","PageUp"],["PGDN","PageDown"],["PAGEDOWN","PageDown"],["UP","Up"],["ARROWUP","Up"],["DOWN","Down"],["ARROWDOWN","Down"],["LEFT","Left"],["ARROWLEFT","Left"],["RIGHT","Right"],["ARROWRIGHT","Right"],["SPACE","Space"],["SPACEBAR","Space"],["TAB","Tab"],["BACKSPACE","Backspace"],["ENTER","Enter"],["RETURN","Enter"]]),Ux=new Map([["CTRL","Ctrl"],["CONTROL","Ctrl"],["ALT","Alt"],["MENU","Alt"],["SHIFT","Shift"]]);function Vx(r){let e=r.replace(/\s+/g,"").toUpperCase();if(!e)return null;if(/^[A-Z0-9]$/.test(e))return e;let t=e.match(/^F([1-9]|1[0-2])$/);if(t)return`F${t[1]}`;let n=e.match(/^(?:NUMPAD|NUM)([0-9])$/);if(n)return`Numpad${n[1]}`;let i=Gx.get(e);return i||null}function qx(r){let e=String(r??"").trim();if(!e)return"";let t=e.split("+").map(o=>o.trim()).filter(Boolean);if(!t.length)return"";let n=new Set,i="";for(let o of t){let a=o.replace(/\s+/g,"").toUpperCase(),l=Ux.get(a);if(l){n.add(l);continue}if(i)return null;let c=Vx(o);if(!c)return null;i=c}return i?[...["Ctrl","Alt","Shift"].filter(o=>n.has(o)),i].join("+"):null}var Fo=class r{constructor(e,t,n,i=!0,s,o,a,l){this.proxy=e;this.bundledPluginDir=t;this.userPluginDir=n;this.allowLocalDiskPlugins=i;this.gameData=s,this.worldState=o,this.projectileTracker=a,this.sessionStateResolver=l}static alwaysEnabledPluginIds=new Set(["damage-sniffer"]);loadedPlugins=new Map;bundledWatcher=null;userWatcher=null;gameData;worldState;projectileTracker;sessionStateResolver;dashboardLogListeners=new Set;broadcastDataListeners=new Set;getPlugins(){return Array.from(this.loadedPlugins.values()).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({id:e.id,name:e.name,enabled:e.context.enabled,category:e.context.category,settings:this.getDashboardSettings(e),source:e.source,requiredPlan:null,hotkey:e.hotkey,hotkeyLocked:this.isAlwaysEnabled(e.id)}))}getDashboardSettings(e){return e.context.getSettings().map(t=>{let n={...t};return e.id==="speed-hack"&&n.key==="speedMult"&&(n.min=1,n.step=.1,n.type="number",delete n.max),n})}isAlwaysEnabled(e){return r.alwaysEnabledPluginIds.has(e)}togglePlugin(e,t){let n=this.loadedPlugins.get(e);return n?this.isAlwaysEnabled(e)?(n.context.enabled=!0,{ok:!0}):(n.context.enabled=t,ts("showPluginFloatingText",`${n.name}: ${t?"Enabled":"Disabled"}`),{ok:!0}):{ok:!1,reason:"Plugin not found"}}togglePluginByHotkey(e){let t=this.loadedPlugins.get(e);if(!t)return{ok:!1,reason:"Plugin not found"};if(!t.hotkey)return{ok:!1,reason:"Plugin has no hotkey"};if(this.isAlwaysEnabled(e))return{ok:!1,reason:"Plugin is always enabled"};let n=!t.context.enabled,i=this.togglePlugin(e,n);return i.ok?{...i,enabled:n}:i}updatePluginHotkey(e,t){let n=this.loadedPlugins.get(e);if(!n)return{ok:!1,reason:"Plugin not found"};if(this.isAlwaysEnabled(e))return{ok:!1,reason:"Plugin is always enabled"};let i=qx(t);if(i===null)return{ok:!1,reason:"Unsupported hotkey"};if(i){let s=i.toLowerCase();for(let o of this.loadedPlugins.values())if(o.id!==e&&o.hotkey&&o.hotkey.toLowerCase()===s)return{ok:!1,reason:`Hotkey already assigned to ${o.name||o.id}`,conflictPluginId:o.id}}return n.hotkey=i,m.debug("plugin-config","PluginManager",`Hotkey for ${n.name||n.id}: ${i||"(none)"}`),{ok:!0,hotkey:i}}getPluginHotkeyBindings(){return Array.from(this.loadedPlugins.values()).filter(e=>!!e.hotkey&&!this.isAlwaysEnabled(e.id)).map(e=>({pluginId:e.id,hotkey:e.hotkey}))}disableAllPlugins(){for(let e of this.loadedPlugins.values())if(e.source==="bundled"){if(this.isAlwaysEnabled(e.id)){e.context.enabled=!0;continue}e.context.enabled=!1}}onDashboardLog(e){return this.dashboardLogListeners.add(e),()=>this.dashboardLogListeners.delete(e)}getPluginData(e,t){let n=this.loadedPlugins.get(e);if(n&&n.context instanceof Nr)return n.context.getData(t)}onBroadcastData(e){return this.broadcastDataListeners.add(e),()=>this.broadcastDataListeners.delete(e)}updateSetting(e,t,n){let i=this.loadedPlugins.get(e);if(!i)return!1;if(e==="speed-hack"&&t==="speedMult"){let s=Number(n);if(!Number.isFinite(s))return!1;n=Math.max(1,s)}return i.context.updateSetting(t,n)}resetPluginSettings(e){let t=this.loadedPlugins.get(e);return t?t.context.resetSettingsToDefaults():[]}async loadAll(){if(!this.allowLocalDiskPlugins){m.warn("PluginManager","Local disk plugins are disabled in this build mode.");return}await this.loadFromDir(this.bundledPluginDir,"bundled"),await this.loadFromDir(this.userPluginDir,"user"),m.log("PluginManager",`Loaded ${this.loadedPlugins.size} plugins`)}async loadFromDir(e,t){if(!(0,mn.existsSync)(e)){t==="user"?m.log("PluginManager",`No user plugins directory yet: ${e}`):m.warn("PluginManager",`Bundled plugin directory not found: ${e}`);return}let n=t==="bundled"?Zh:eg,i=this.discoverPluginEntries(e,n).sort((s,o)=>{let a=u=>u.toLowerCase()==="auto-nexus",l=a(s.id),c=a(o.id);return l&&!c?-1:!l&&c?1:s.id.localeCompare(o.id)});for(let{id:s,entryPath:o}of i)await this.loadPlugin(o,t,s)}static DIR_PLUGIN_ENTRY="index";findDirPluginEntry(e,t){for(let n of t){let i=(0,Qe.join)(e,`${r.DIR_PLUGIN_ENTRY}${n}`);if((0,mn.existsSync)(i))return i}return null}discoverPluginEntries(e,t){let n=new Map,i=[];for(let s of(0,mn.readdirSync)(e,{withFileTypes:!0}))if(s.isFile())t.some(o=>s.name.toLowerCase().endsWith(o))&&n.set(jo(s.name),(0,Qe.join)(e,s.name));else if(s.isDirectory()){let o=this.findDirPluginEntry((0,Qe.join)(e,s.name),t);o&&i.push({id:s.name,entryPath:o})}for(let s of i)n.has(s.id)||n.set(s.id,s.entryPath);return[...n].map(([s,o])=>({id:s,entryPath:o}))}resolveWatchedPlugin(e,t,n){let i=(0,Qe.relative)(e,t);if(!i||i.startsWith(".."))return null;let s=i.split(/[\\/]/);if(s.length===1)return n.some(l=>s[0].toLowerCase().endsWith(l))?{id:jo(s[0]),entryPath:(0,Qe.join)(e,s[0])}:null;let o=s[0],a=this.findDirPluginEntry((0,Qe.join)(e,o),n);return a?{id:o,entryPath:a}:null}async loadPlugin(e,t="bundled",n){let i=n??jo((0,Qe.basename)(e));try{this.loadedPlugins.has(i)&&await this.unloadPlugin(i);let s=(0,Qe.resolve)(e),a=await import((0,tg.pathToFileURL)(s).href+`?t=${Date.now()}`);if(typeof a.register!="function"){m.warn("PluginManager",`Plugin ${i} has no register() export, skipping`);return}let l=t==="user"?new ci(this.proxy,i,e):new Nr(this.proxy,i,e,this.gameData,this.worldState,this.projectileTracker,this.sessionStateResolver);l instanceof Nr&&(l.onDashboardLog=(d,p)=>{for(let f of this.dashboardLogListeners)try{f(d,p)}catch{}},l.onBroadcastData=(d,p,f)=>{for(let h of this.broadcastDataListeners)try{h(d,p,f)}catch{}});let c=a.register(l),u=l instanceof ci&&typeof c=="function"?c:null;this.loadedPlugins.set(i,{id:i,name:l.name||i,filePath:e,source:t,hotkey:"",context:l,userCleanup:u}),m.debug("plugin-load","PluginManager",`Loaded ${t} plugin: ${l.name||i}`)}catch(s){m.error("PluginManager",`Failed to load plugin ${i}`,s)}}async unloadPlugin(e){let t=this.loadedPlugins.get(e);if(t){if(t.context instanceof Nr)t.context.runCleanup();else if(t.userCleanup)try{t.userCleanup()}catch(n){m.error("PluginManager",`Cleanup for user plugin ${t.name} threw`,n)}this.proxy.unhookPlugin(e),this.loadedPlugins.delete(e),m.log("PluginManager",`Unloaded plugin: ${t.name}`)}}async startWatching(){if(this.allowLocalDiskPlugins)try{let e=await Promise.resolve().then(()=>U(Qh(),1));this.bundledWatcher=this.watchDir(e,this.bundledPluginDir,"bundled"),this.userWatcher=this.watchDir(e,this.userPluginDir,"user"),m.log("PluginManager","Watching plugin directories for changes")}catch{m.warn("PluginManager","Hot-reload unavailable (chokidar not found)")}}watchDir(e,t,n){if(!(0,mn.existsSync)(t))return null;let i=n==="bundled"?Zh:eg,s=e.watch(t,{ignoreInitial:!0,awaitWriteFinish:{stabilityThreshold:500}});return s.on("change",async o=>{let a=this.resolveWatchedPlugin(t,o,i);a&&(m.log("PluginManager",`Plugin changed: ${a.id}, reloading...`),await this.loadPlugin(a.entryPath,n,a.id))}),s.on("add",async o=>{let a=this.resolveWatchedPlugin(t,o,i);a&&(m.log("PluginManager",`New plugin: ${a.id}, loading...`),await this.loadPlugin(a.entryPath,n,a.id))}),s.on("unlink",async o=>{let a=(0,Qe.relative)(t,o);if(!a||a.startsWith(".."))return;let l=a.split(/[\\/]/);if(l.length===1){if(!i.some(d=>l[0].toLowerCase().endsWith(d)))return;await this.unloadPlugin(jo(l[0]));return}let c=l[0],u=this.findDirPluginEntry((0,Qe.join)(t,c),i);u?await this.loadPlugin(u,n,c):await this.unloadPlugin(c)}),s}stopWatching(){this.bundledWatcher?.close(),this.bundledWatcher=null,this.userWatcher?.close(),this.userWatcher=null}};var Ho=class r{static MAX_RAW_HEX_BYTES=8192;static MAX_BODY_DETAIL_BYTES=65536;buffer;bufferHead=0;bufferCount=0;maxSize;listeners=new Set;packetCount=0;startTime=Date.now();defaultMode="summary";clientModes=new Map;constructor(e=5e3){this.maxSize=e,this.buffer=new Array(e)}attach(e){e.on("clientPacket",(t,n)=>{this.capture(t,n,"C->S")}),e.on("serverPacket",(t,n)=>{this.capture(t,n,"S->C")})}setDefaultMode(e){this.defaultMode=e}setClientMode(e,t){e&&this.clientModes.set(e,t)}clearClientMode(e){e&&this.clientModes.delete(e)}getClientMode(e){return this.clientModes.get(e)??this.defaultMode}capture(e,t,n){let i=String(e.clientId||"default"),s=this.getClientMode(i);if(s==="off")return;let o=s==="full",a=o?this.toPreviewHex(t.rawBytes):{hex:"",truncated:!1},l=o?this.buildCapturedData(t):null,c={id:this.packetCount++,packetId:t.id,timestamp:Date.now(),clientId:i,direction:n,name:t.name,size:t.rawBytes.length,data:l,rawHex:a.hex,rawHexTruncated:a.truncated,isDefined:t.isDefined,captureMode:s};this.pushBuffer(c);for(let u of this.listeners)try{u(c)}catch{}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}getRecent(e=200){let t=Math.max(0,Math.min(e,this.bufferCount)),n=(this.bufferHead-t+this.maxSize)%this.maxSize,i=[];for(let s=0;s<t;s++){let o=this.buffer[(n+s)%this.maxSize];o&&i.push(o)}return i}getRate(){let e=(Date.now()-this.startTime)/1e3;return e>0?Math.round(this.packetCount/e):0}clearBuffer(){this.buffer.fill(void 0),this.bufferHead=0,this.bufferCount=0}pushBuffer(e){this.buffer[this.bufferHead]=e,this.bufferHead=(this.bufferHead+1)%this.maxSize,this.bufferCount=Math.min(this.bufferCount+1,this.maxSize)}buildCapturedData(e){let t=this.safeSerialize(e.data);if(e.name.startsWith("UNKNOWN_")){let i=e.unreadData.length>0?e.unreadData:e.rawBytes.subarray(5),s=this.bodyToHex(i,r.MAX_BODY_DETAIL_BYTES);return t._unknownPacketId=e.id,t._unknownBodyHex=s.hex,s.truncated&&(t._unknownBodyHexTruncated=!0),t._unknownNote="No entry for this packet ID in data/packet-definitions.json \u2014 body hex is the payload after the 5-byte header.",t}if(!e.isDefined){if(t._parseFailureNote="Definition exists but this instance failed to parse \u2014 see hex for the unread portion.",e.unreadData.length>0){let i=this.bodyToHex(e.unreadData,r.MAX_BODY_DETAIL_BYTES);t._parseFailureBodyHex=i.hex,i.truncated&&(t._parseFailureBodyHexTruncated=!0)}return t}if(e.unreadData.length>0){let i=this.bodyToHex(e.unreadData,r.MAX_BODY_DETAIL_BYTES);t._unreadTrailingHex=i.hex,i.truncated&&(t._unreadTrailingHexTruncated=!0)}return t}bodyToHex(e,t){return e.length<=t?{hex:e.toString("hex"),truncated:!1}:{hex:e.subarray(0,t).toString("hex"),truncated:!0}}safeSerialize(e){try{return JSON.parse(JSON.stringify(e,(t,n)=>{if(Buffer.isBuffer(n)){let i=n.toString("hex",0,Math.min(n.length,20));return`<Buffer ${n.length} bytes: ${i}${n.length>20?"...":""}>`}return n}))}catch{return{_error:"Failed to serialize packet data"}}}toPreviewHex(e){let t=r.MAX_RAW_HEX_BYTES;return e.length<=t?{hex:e.toString("hex"),truncated:!1}:{hex:e.subarray(0,t).toString("hex"),truncated:!0}}};var bb=U(require("http"),1),bd=U(require("https"),1),Sb=U(require("net"),1),j=require("fs"),ee=require("path"),rr=require("child_process");var pk=U(Yg(),1),mk=U(Yo(),1),hk=U(yn(),1),gk=U(mu(),1),yk=U(yu(),1),bk=U(Pu(),1),Q=U(ea(),1),xu=U(iy(),1);var wb=U(ln(),1);var sy=require("events");var Sk={82:"QUESTOBJID",84:"REALMHEROESRESPONSE",95:"INVRESULT",114:"EXALTATIONUPDATE",120:"BLUEPRINTINFO",122:"SHOWALLYSHOOT",139:"STATS",165:"UNKNOWN165",169:"REALMSCORE",182:"CRUCIBLEREQUEST",183:"CRUCIBLERESPONSE"},wk=50;function Ek(r){let e=[];for(let t of r.trim().split(/\s+/)){if(!t)continue;let n=t.toLowerCase();if(n.includes("*")){let[i,s]=n.split("*");e.push({kind:"repeat",type:i.trim(),n:parseInt(s,10)})}else n.endsWith("[]")?e.push({kind:"array",type:n.slice(0,-2)}):e.push({kind:"single",type:n})}return e}function Cu(r,e){switch(e){case"byte":return r.readByte();case"sbyte":return r.readSByte();case"bool":return r.readBool();case"int16":return r.readInt16();case"uint16":return r.readUInt16();case"int32":return r.readInt32();case"uint32":return r.readUInt32();case"float":return r.readFloat();case"string":return r.readString();case"utf32string":return r.readUtf32String();case"compressedint":return r.readCompressedInt();case"bytearray16":return r.readBytes(r.readInt16());case"bytearray32":return r.readBytes(r.readInt32());case"bytes:rest":return r.readRemainingBytes();default:if(e.startsWith("bytes:"))return r.readBytes(parseInt(e.slice(6),10));throw new Error(`Unknown type: ${e}`)}}function Tk(r,e){let t=new wr(r,0),n=[];for(let i of e)if(i.kind==="single")n.push(Cu(t,i.type));else if(i.kind==="repeat")n.push(Array.from({length:i.n},()=>Cu(t,i.type)));else{let s=t.readCompressedInt();n.push(Array.from({length:s},()=>Cu(t,i.type)))}return{values:n,leftover:t.remaining}}function oy(r){if(Buffer.isBuffer(r)){let e=r.toString("hex");return`<${r.length}B: ${e.slice(0,20)}${r.length>10?"\u2026":""}>`}return Array.isArray(r)?`[${r.slice(0,8).map(oy).join(", ")}${r.length>8?`,\u2026+${r.length-8}`:""}]`:typeof r=="number"?r.toString():typeof r=="boolean"?r?"true":"false":JSON.stringify(r)}var ra=class extends sy.EventEmitter{store=new Map;updateTimer=null;capture(e){if(e.isDefined)return;let t=Buffer.from(e.rawHex,"hex");if(t.length<5)return;let n=t[4],i=t.slice(5),s=this.store.get(n);s||(s={id:n,hardCodedName:Sk[n]??`UNKNOWN_${n}`,count:0,payloads:[],sizeMap:{}},this.store.set(n,s)),s.count++;let o=i.length;s.sizeMap[o]=(s.sizeMap[o]??0)+1,s.payloads.length<wk&&s.payloads.push(i.toString("hex")),this.updateTimer||(this.updateTimer=setTimeout(()=>{this.updateTimer=null,this.emit("update")},500))}getUnknowns(){return[...this.store.values()].map(({payloads:e,...t})=>t)}clear(){this.store.clear(),this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null),this.emit("update")}analyze(e){let t=this.store.get(e);if(!t)return null;let n=t.payloads.map(u=>Buffer.from(u,"hex")),i=Object.entries(t.sizeMap).map(([u,d])=>({size:Number(u),count:d})).sort((u,d)=>u.size-d.size),s=Math.max(0,...n.map(u=>u.length)),o=[];for(let u=0;u<s;u++){let d=n.filter(f=>u<f.length).map(f=>f[u]),p=new Set(d);o.push({isConst:p.size===1,value:p.size===1?d[0]:null,min:Math.min(...d),max:Math.max(...d),distinct:p.size})}let a=[],l=new Set;for(let u of n.slice(0,5))for(let d=0;d<=u.length-3;d++){let p=u.readUInt16BE(d);if(p>=1&&p<=200&&d+2+p<=u.length){let f=u.slice(d+2,d+2+p).toString("utf8");/^[\x20-\x7e\t\r\n]+$/.test(f)&&!l.has(f)&&(a.push({offset:d,value:f}),l.add(f))}}let c=n.slice(0,5).map(u=>{try{let d=new wr(u,0),p=[];for(;d.remaining>0;)p.push(d.readCompressedInt());return p}catch{return null}});return{id:e,hardCodedName:t.hardCodedName,count:t.count,sizes:i,byteDiff:o,strings:a,compressedInts:c,hexSamples:t.payloads.slice(0,5)}}probe(e,t){let n={samplesTotal:0,trueCount:0,pass:0,warn:0,error:0,passExamples:[],warnExamples:[],errorExamples:[]},i=this.store.get(e);if(!i)return n;let s;try{s=Ek(t)}catch(a){return{...n,error:1,errorExamples:[{fields:[],hex:"",error:`Spec parse error: ${a.message}`}]}}let o={samplesTotal:i.payloads.length,trueCount:i.count,pass:0,warn:0,error:0,passExamples:[],warnExamples:[],errorExamples:[]};for(let a of i.payloads){let l=Buffer.from(a,"hex");try{let{values:c,leftover:u}=Tk(l,s),d=c.map(oy);u===0?(o.pass++,o.passExamples.length<5&&o.passExamples.push({fields:d,hex:a})):(o.warn++,o.warnExamples.length<3&&o.warnExamples.push({fields:d,hex:a,leftover:u}))}catch(c){o.error++,o.errorExamples.length<3&&o.errorExamples.push({fields:[],hex:a,error:c.message})}}return o}};var ia=require("fs"),sa=require("fs/promises"),ay=require("crypto"),Fr=require("path"),ly=require("zlib"),cy=U(ln(),1);X();var Pk=process.platform==="darwin"?"https://www.realmofthemadgod.com/app/init?platform=standaloneosxuniversal&key=9KnJFxtTvLu2frXv":"https://www.realmofthemadgod.com/app/init?platform=standalonewindows64&key=9KnJFxtTvLu2frXv",uy=15e3,vk=12e4,xk=10,Ck=4;function kk(){return{state:"idle",buildId:"",filesToUpdate:0,bytesToUpdate:0,filesDone:0,bytesDone:0,lastCheck:null,error:null}}function _k(r){let e=new cy.XMLParser({ignoreAttributes:!0,parseTagValue:!1}).parse(r),t={},n=s=>{if(!(!s||typeof s!="object"))for(let[o,a]of Object.entries(s))typeof a=="string"&&!t[o]?t[o]=a.trim():n(a)};n(e);let i={buildId:t.BuildId||"",buildCdn:t.BuildCDN||"",buildHash:t.BuildHash||""};if(!i.buildCdn||!i.buildHash||!i.buildId)throw new Error("RotMG /app/init did not return a usable build descriptor");return i}function Ik(r){let e=JSON.parse(r);if(!Array.isArray(e.files))throw new Error("checksum.json did not contain a files array");return e.files}function dy(r,e){let t=(0,Fr.resolve)(r),n=(0,Fr.resolve)(t,e);if(n!==t&&!n.startsWith(t+Fr.sep))throw new Error(`Refusing to write outside the game directory: ${e}`);return n}function Rk(r){return new Promise((e,t)=>{let n=(0,ay.createHash)("md5");(0,ia.createReadStream)(r).on("error",t).on("data",i=>n.update(i)).on("end",()=>e(n.digest("hex")))})}async function Nk(r,e){return(await fy(e,xk,async n=>{let i=dy(r,n.file);return(0,ia.existsSync)(i)&&await Rk(i).catch(()=>"")===n.checksum?null:n})).filter(n=>n!==null)}async function fy(r,e,t){let n=[];for(let i=0;i<r.length;i+=e)n.push(...await Promise.all(r.slice(i,i+e).map(t)));return n}async function Ak(){let r=await fetch(Pk,{method:"POST",headers:{"Content-Length":"0","Content-Type":"application/x-www-form-urlencoded"},signal:AbortSignal.timeout(uy)});if(!r.ok)throw new Error(`RotMG /app/init returned HTTP ${r.status}`);return _k(await r.text())}function py(r,e){return`${r.buildCdn}${r.buildHash}/${r.buildId}${e}`}async function Ok(r){let e=py(r,"/checksum.json"),t=await fetch(e,{signal:AbortSignal.timeout(uy)});if(!t.ok)throw new Error(`checksum.json returned HTTP ${t.status}`);return Ik(await t.text())}async function Mk(r,e,t){let n=dy(e,t.file),i=py(r,`/${t.file}.gz`),s=await fetch(i,{signal:AbortSignal.timeout(vk)});if(!s.ok)throw new Error(`${t.file}: HTTP ${s.status}`);let o=(0,ly.gunzipSync)(Buffer.from(await s.arrayBuffer()));await(0,sa.mkdir)((0,Fr.dirname)(n),{recursive:!0}),await(0,sa.writeFile)(n,o)}var na=class{constructor(e,t,n){this.getGameRoot=e;this.isGameRunning=t;this.onChange=n}status=kk();pending=[];pendingInit=null;getStatus(){return{...this.status}}emit(e){this.status={...this.status,...e},this.onChange(this.getStatus())}async check(){if(this.status.state!=="idle")return;let e=this.getGameRoot();if(!e){this.emit({error:"Set your RotMG Exalt path in Settings first."});return}this.emit({state:"checking",error:null,filesDone:0,bytesDone:0});try{let t=await Ak(),n=await Nk(e,await Ok(t));this.pending=n,this.pendingInit=t,this.emit({state:"idle",buildId:t.buildId,filesToUpdate:n.length,bytesToUpdate:n.reduce((i,s)=>i+(Number(s.size)||0),0),lastCheck:Date.now(),error:null}),m.log("GameUpdater",`Build ${t.buildId}: ${n.length} file(s) need updating.`)}catch(t){this.pending=[],this.pendingInit=null,this.emit({state:"idle",error:t.message||"Update check failed"}),m.warn("GameUpdater",`Check failed: ${t.message}`)}}async update(){if(this.status.state!=="idle")return;let e=this.getGameRoot();if(!e){this.emit({error:"Set your RotMG Exalt path in Settings first."});return}if(this.isGameRunning()){this.emit({error:"Close RotMG Exalt before updating the game."});return}if(!this.pending.length||!this.pendingInit){this.emit({error:"Check for updates first."});return}let t=this.pendingInit,n=this.pending;this.emit({state:"updating",error:null,filesDone:0,bytesDone:0});try{await fy(n,Ck,async i=>{await Mk(t,e,i),this.emit({filesDone:this.status.filesDone+1,bytesDone:this.status.bytesDone+(Number(i.size)||0)})}),this.pending=[],this.pendingInit=null,this.emit({state:"idle",filesToUpdate:0,bytesToUpdate:0,error:null}),m.log("GameUpdater",`Updated ${n.length} file(s) to build ${t.buildId}.`)}catch(i){this.emit({state:"idle",error:i.message||"Update failed"}),m.warn("GameUpdater",`Update failed: ${i.message}`)}}};X();Ln();var oa=class{tasks=new Map;timer=null;nextId=1;scheduleRepeating(e,t){let n=Math.max(10,Math.trunc(e)),i=this.nextId++;return this.tasks.set(i,{id:i,intervalMs:n,nextRunAt:Date.now()+n,fn:t}),this.scheduleNextTick(),()=>{this.tasks.delete(i),this.scheduleNextTick()}}stop(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.tasks.clear()}scheduleNextTick(){if(this.timer&&(clearTimeout(this.timer),this.timer=null),this.tasks.size===0)return;let e=Date.now(),t=Number.POSITIVE_INFINITY;for(let i of this.tasks.values())i.nextRunAt<t&&(t=i.nextRunAt);let n=Math.max(0,t-e);this.timer=setTimeout(()=>this.tick(),n),this.timer.unref?.()}tick(){this.timer=null;let e=Date.now();for(let t of this.tasks.values())if(!(e<t.nextRunAt)){try{t.fn()}catch{}t.nextRunAt=e+t.intervalMs}this.scheduleNextTick()}};Hr();var by=require("child_process"),Wr=require("fs"),Nu=require("path"),Ri=require("os"),Sy=require("crypto");function wy(){if((0,Ri.platform)()!=="win32")return"";let r=process.env.LOCALAPPDATA||(0,Nu.join)(process.env.USERPROFILE||"","AppData","Local");return(0,Nu.join)(r,"RealmOfTheMadGod","hwid.txt")}function Wk(r){if((0,Ri.platform)()!=="win32")return null;try{let n=(0,by.execSync)(`powershell -NoProfile -Command ${JSON.stringify("$c='';Get-WmiObject Win32_BaseBoard|ForEach-Object{$c+=$_.SerialNumber};Get-WmiObject Win32_BIOS|ForEach-Object{$c+=$_.SerialNumber};Get-WmiObject Win32_OperatingSystem|ForEach-Object{$c+=$_.SerialNumber};$c")}`,{encoding:"utf8",timeout:1e4}).trim()||r,i=(0,Sy.createHash)("sha1").update(n,"utf8").digest("hex");return/^[a-f0-9]{40}$/.test(i)?i:null}catch{return null}}function Ni(r){let e=(0,Ri.hostname)()+(process.env.USERNAME||process.env.USER||"user");try{if(!r?.skipFile){let n=wy();if(n&&(0,Wr.existsSync)(n)){let i=(0,Wr.readFileSync)(n,"utf8").trim();if(i)return i}}let t=Wk(e);return t||e}catch{return e}}function Au(){try{let r=wy();if(r&&(0,Wr.existsSync)(r))return(0,Wr.unlinkSync)(r),!0}catch{}return!1}var Gk={packets:{0:{name:"FAILURE",direction:"server",fields:[{name:"errorId",type:"int32"},{name:"errorMessage",type:"string"}]},1:{name:"TELEPORT",direction:"client",fields:[{name:"objectId",type:"int32"},{name:"playerName",type:"string"}]},3:{name:"CLAIMDAILYLOGINREWARD",direction:"client",fields:[{name:"claimStr",type:"string"},{name:"claimType",type:"string"}]},4:{name:"DELETEPETMESSAGE",direction:"server",fields:[]},5:{name:"REQUESTTRADE",direction:"client",fields:[{name:"name",type:"string"}]},6:{name:"QUESTFETCHRESPONSE",direction:"server",fields:[]},7:{name:"JOINGUILD",direction:"client",fields:[]},8:{name:"PING",direction:"server",fields:[{name:"serial",type:"int32"}]},9:{name:"PLAYERTEXT",direction:"client",fields:[{name:"text",type:"string"}]},10:{name:"NEWTICK",direction:"server",fields:[{name:"tickId",type:"int32"},{name:"tickTime",type:"int32"},{name:"serverRealTimeMs",type:"uint32"},{name:"serverLastRttMs",type:"uint16"},{name:"statuses",type:"array",lengthType:"int16",elementType:"Status"}]},11:{name:"SHOWEFFECT",direction:"server",fields:[]},12:{name:"SERVERPLAYERSHOOT",direction:"server",fields:[{name:"bulletId",type:"uint16"},{name:"ownerId",type:"int32"},{name:"containerType",type:"int32"},{name:"startingPos",type:"Location"},{name:"angle",type:"float"},{name:"damage",type:"int16"},{name:"superOwnerId",type:"int32"},{name:"bulletType",type:"byte",optional:!0,default:255},{name:"numShots",type:"byte",optional:!0,default:0},{name:"angleInc",type:"float",optional:!0,default:-1}]},13:{name:"USEITEM",direction:"client",fields:[{name:"time",type:"int32"},{name:"slotObject",type:"SlotObject"},{name:"itemUsePos",type:"Location"},{name:"useType",type:"byte"},{name:"unknownInt",type:"int32"}]},14:{name:"TRADEACCEPTED",direction:"server",fields:[{name:"clientOffer",type:"array",lengthType:"int16",elementType:"bool"},{name:"partnerOffer",type:"array",lengthType:"int16",elementType:"bool"}]},15:{name:"GUILDREMOVE",direction:"client",fields:[]},16:{name:"PETUPGRADEREQUEST",direction:"client",fields:[]},17:{name:"ENTERARENA",direction:"server",fields:[]},18:{name:"GOTO",direction:"server",fields:[{name:"objectId",type:"int32"},{name:"position",type:"Location"},{name:"unknown",type:"int32"}]},19:{name:"INVDROP",direction:"client",fields:[{name:"slotObject",type:"SlotObject"},{name:"unknownByte",type:"sbyte"}]},20:{name:"OTHERHIT",direction:"client",fields:[{name:"time",type:"int32"},{name:"bulletId",type:"uint16"},{name:"objectId",type:"int32"},{name:"targetId",type:"int32"}]},21:{name:"NAMERESULT",direction:"server",fields:[]},22:{name:"BUYRESULT",direction:"server",fields:[]},23:{name:"HATCHPET",direction:"server",fields:[]},24:{name:"ACTIVEPETPDATEREQ",direction:"client",fields:[{name:"commandId",type:"byte"},{name:"petId",type:"uint32"}],note:"Same wire as EK ActivePetUpdateRequest."},25:{name:"ENEMYHIT",direction:"client",fields:[{name:"time",type:"int32"},{name:"bulletId",type:"int16"},{name:"ownerId",type:"int32"},{name:"targetId",type:"int32"},{name:"kill",type:"bool"},{name:"unknownId",type:"int32"}]},26:{name:"GUILDRESULT",direction:"server",fields:[]},27:{name:"EDITACCOUNTLIST",direction:"client",fields:[]},28:{name:"TRADECHANGED",direction:"server",fields:[{name:"offer",type:"array",lengthType:"int16",elementType:"bool"}]},30:{name:"PLAYERSHOOT",direction:"client",fields:[{name:"time",type:"int32"},{name:"shotId",type:"uint16"},{name:"containerType",type:"int16"},{name:"attackIndex",type:"sbyte"},{name:"projectilePosition",type:"Location"},{name:"angle",type:"float"},{name:"bulletId",type:"byte"},{name:"unknownShort",type:"int16"},{name:"playerPosition",type:"Location"}]},31:{name:"PONG",direction:"client",fields:[{name:"serial",type:"int32"},{name:"time",type:"int32"}]},33:{name:"CHANGEPETSKIN",direction:"client",fields:[]},34:{name:"TRADEDONE",direction:"server",fields:[{name:"code",type:"int32"},{name:"description",type:"string"}]},35:{name:"ENEMYSHOOT",direction:"server",fields:[{name:"bulletId",type:"int16"},{name:"ownerId",type:"int32"},{name:"bulletType",type:"byte"},{name:"position",type:"Location"},{name:"angle",type:"float"},{name:"damage",type:"int16"},{name:"numShots",type:"byte",optional:!0,default:255},{name:"angleInc",type:"float",optional:!0,default:0}]},36:{name:"ACCEPTTRADE",direction:"client",fields:[{name:"clientOffer",type:"array",lengthType:"int16",elementType:"bool"},{name:"partnerOffer",type:"array",lengthType:"int16",elementType:"bool"}]},37:{name:"CHANGEGUILDRANK",direction:"client",fields:[]},38:{name:"PLAYSOUND",direction:"server",fields:[]},39:{name:"VERIFYEMAIL",direction:"server",fields:[]},40:{name:"SQUAREHIT",direction:"client",fields:[{name:"time",type:"int32"},{name:"bulletId",type:"int16"},{name:"objectId",type:"int32"}]},41:{name:"NEWABILITYMESSAGE",direction:"server",fields:[{name:"abilityType",type:"int32"}]},42:{name:"UPDATE",direction:"server",fields:[{name:"position",type:"Location"},{name:"levelType",type:"byte"},{name:"tiles",type:"array",lengthType:"compressedInt",elementType:"Tile"},{name:"newObjs",type:"array",lengthType:"compressedInt",elementType:"Entity"},{name:"drops",type:"array",lengthType:"compressedInt",elementType:"compressedInt"}]},44:{name:"TEXT",direction:"server",fields:[{name:"name",type:"string"},{name:"objectId",type:"int32"},{name:"numStars",type:"int16"},{name:"bubbleTime",type:"byte"},{name:"recipient",type:"string"},{name:"text",type:"string"},{name:"cleanText",type:"string"},{name:"isSupporter",type:"bool"},{name:"starBg",type:"int32"}]},45:{name:"RECONNECT",direction:"server",fields:[{name:"name",type:"string"},{name:"host",type:"string"},{name:"port",type:"uint16"},{name:"gameId",type:"int32"},{name:"keyTime",type:"int32"},{name:"key",type:"byteArray16"}]},46:{name:"DEATH",direction:"server",fields:[{name:"accountId",type:"string"},{name:"charId",type:"compressedInt"},{name:"killedBy",type:"string"},{name:"unknownInt",type:"int32"},{name:"fameEarned",type:"compressedInt"},{name:"accountLevel",type:"compressedInt"},{name:"accountXP",type:"compressedInt"}],note:"Partial definition \u2014 fameBonuses and pcStats have complex encoding. Remaining bytes pass through as unreadData."},47:{name:"USEPORTAL",direction:"client",fields:[{name:"objectId",type:"int32"}]},48:{name:"GOTOQUESTROOM",direction:"client",fields:[]},49:{name:"ALLYSHOOT",direction:"server",fields:[{name:"unknownByte",type:"byte"},{name:"unknownShort",type:"int16"}]},50:{name:"IMMINENTARENAWAVE",direction:"server",fields:[]},51:{name:"RESKIN",direction:"client",fields:[]},52:{name:"RESETDAILYQUESTS",direction:"client",fields:[]},53:{name:"PETCHANGEFORMMSG",direction:"server",fields:[]},55:{name:"INVENTORYSWAP",direction:"client",fields:[{name:"time",type:"int32"},{name:"position",type:"Location"},{name:"slotObject1",type:"SlotObject"},{name:"slotObject2",type:"SlotObject"},{name:"tickId",type:"int32",optional:!0,default:0}]},56:{name:"CHANGETRADE",direction:"client",fields:[{name:"offer",type:"array",lengthType:"int16",elementType:"bool"}]},57:{name:"CREATE",direction:"client",fields:[{name:"classType",type:"int16"},{name:"skinType",type:"int16"},{name:"isChallenger",type:"bool"},{name:"isSeasonal",type:"bool"}]},58:{name:"QUESTREDEEM",direction:"client",fields:[]},59:{name:"CREATEGUILD",direction:"client",fields:[]},60:{name:"SETCONDITION",direction:"client",fields:[{name:"conditionEffect",type:"byte"},{name:"conditionDuration",type:"float"}]},61:{name:"LOAD",direction:"client",fields:[{name:"charId",type:"int32"},{name:"isFromArena",type:"bool"}]},62:{name:"MOVE",direction:"client",fields:[{name:"tickId",type:"int32"},{name:"serverRealTimeMSofLastNewTick",type:"uint32"},{name:"records",type:"array",lengthType:"int16",elementType:"LocationRecord"}]},63:{name:"KEYINFORESPONSE",direction:"server",fields:[]},64:{name:"AOE",direction:"server",fields:[{name:"position",type:"Location"},{name:"radius",type:"float"},{name:"damage",type:"uint16"},{name:"effect",type:"byte"},{name:"effectDuration",type:"float"},{name:"originType",type:"uint16"},{name:"color",type:"int32"},{name:"armorPierce",type:"bool"}]},65:{name:"GOTOACK",direction:"client",fields:[{name:"time",type:"int32"},{name:"unknownByte",type:"byte"}]},66:{name:"GLOBALNOTIFICATION",direction:"server",fields:[{name:"notificationType",type:"int32"},{name:"text",type:"string"}]},67:{name:"NOTIFICATION",direction:"server",fields:[{name:"typeValue",type:"byte"},{name:"textByte",type:"byte"}],note:"Complex conditional packet - extra fields depend on typeValue. Remaining bytes stored in unreadData for passthrough."},68:{name:"ARENADEATH",direction:"server",fields:[]},69:{name:"CLIENTSTAT",direction:"server",fields:[{name:"name",type:"string"},{name:"value",type:"int32"}]},74:{name:"HELLO",direction:"client",fields:[{name:"gameId",type:"int32"},{name:"buildVersion",type:"string"},{name:"accessToken",type:"string"},{name:"keyTime",type:"int32"},{name:"key",type:"byteArray16"},{name:"gameNet",type:"string"},{name:"playPlatform",type:"string"},{name:"platformToken",type:"string"},{name:"userToken",type:"string"},{name:"clientIdentification",type:"string"}]},75:{name:"DAMAGE",direction:"server",fields:[{name:"targetId",type:"int32"},{name:"effects",type:"array",lengthType:"byte",elementType:"byte"},{name:"damageAmount",type:"uint16"},{name:"kill",type:"bool"},{name:"bulletId",type:"int16"},{name:"objectId",type:"int32"}]},76:{name:"ACTIVEPET",direction:"server",fields:[]},77:{name:"INVITEDTOGUILD",direction:"server",fields:[]},78:{name:"PETYARDUPDATE",direction:"server",fields:[]},79:{name:"PASSWORDPROMPT",direction:"server",fields:[]},80:{name:"ACCEPTARENADEATH",direction:"server",fields:[]},81:{name:"UPDATEACK",direction:"client",fields:[]},82:{name:"QUESTOBJECTID",direction:"server",fields:[{name:"objectId",type:"int32"}]},83:{name:"PIC",direction:"server",fields:[]},84:{name:"REALMHEROESRESPONSE",direction:"server",fields:[{name:"numberOfRealmHeros",type:"int32"}]},85:{name:"BUY",direction:"client",fields:[{name:"objectId",type:"int32"},{name:"quantity",type:"int32"}]},86:{name:"TRADESTART",direction:"server",fields:[{name:"clientItems",type:"array",lengthType:"int16",elementType:"TradeItem"},{name:"partnerName",type:"string"},{name:"partnerItems",type:"array",lengthType:"int16",elementType:"TradeItem"}]},87:{name:"EVOLVEPET",direction:"server",fields:[]},88:{name:"TRADEREQUESTED",direction:"server",fields:[{name:"name",type:"string"}]},89:{name:"AOEACK",direction:"client",fields:[{name:"time",type:"int32"},{name:"position",type:"Location"}]},90:{name:"PLAYERHIT",direction:"client",fields:[{name:"bulletId",type:"int16"},{name:"objectId",type:"int32"}]},91:{name:"CANCELTRADE",direction:"client",fields:[]},92:{name:"MAPINFO",direction:"server",fields:[{name:"width",type:"int32"},{name:"height",type:"int32"},{name:"name",type:"string"},{name:"displayName",type:"string"},{name:"realmName",type:"string"},{name:"fp",type:"int32"},{name:"background",type:"int32"},{name:"difficulty",type:"float"},{name:"allowPlayerTeleport",type:"bool"},{name:"noSave",type:"bool"},{name:"showDisplays",type:"bool"},{name:"maxPlayers",type:"int16"},{name:"gameOpenedTime",type:"int32"},{name:"serverVersion",type:"string"},{name:"viewDistance",type:"int16"},{name:"bgColor",type:"int32",optional:!0,default:0},{name:"modifier",type:"string",optional:!0,default:""},{name:"unknownShort1",type:"int16",optional:!0,default:0},{name:"unknownBool",type:"bool",optional:!0,default:!1},{name:"unknownShort2",type:"int16",optional:!0,default:0},{name:"maxRealmScore",type:"int32",optional:!0,default:0},{name:"currentRealmScore",type:"int32",optional:!0,default:0}]},93:{name:"CLAIMDAILYLOGINRESPONSE",direction:"server",fields:[{name:"itemId",type:"int32"},{name:"quantity",type:"int32"},{name:"gold",type:"int32"}]},94:{name:"KEYINFOREQUEST",direction:"client",fields:[]},95:{name:"INVRESULT",direction:"server",fields:[{name:"unknownBool",type:"bool"},{name:"unknownByte",type:"sbyte"},{name:"fromSlot",type:"SlotObject"},{name:"toSlot",type:"SlotObject"},{name:"unknownInt1",type:"int32"},{name:"unknownInt2",type:"int32"}]},96:{name:"QUESTREDEEMRESPONSE",direction:"server",fields:[]},97:{name:"CHOOSENAME",direction:"client",fields:[]},98:{name:"QUESTFETCHASK",direction:"client",fields:[]},99:{name:"ACCOUNTLIST",direction:"server",fields:[]},100:{name:"SHOOTACK",direction:"client",fields:[{name:"time",type:"int32"}]},101:{name:"CREATESUCCESS",direction:"server",fields:[{name:"objectId",type:"int32"},{name:"charId",type:"int32"},{name:"stats",type:"string"}]},102:{name:"CHECKCREDITS",direction:"client",fields:[]},103:{name:"GROUNDDAMAGE",direction:"client",fields:[{name:"time",type:"int32"},{name:"position",type:"Location"}]},104:{name:"GUILDINVITE",direction:"client",fields:[]},105:{name:"ESCAPE",direction:"client",fields:[]},106:{name:"FILE",direction:"server",fields:[]},107:{name:"RESKINUNLOCK",direction:"server",fields:[{name:"isPetSkin",type:"int32"}]},108:{name:"NEWCHARACTERINFO",direction:"server",fields:[]},109:{name:"UNLOCKINFORMATION",direction:"server",fields:[]},112:{name:"QUEUEMESSAGE",direction:"server",fields:[{name:"curPos",type:"uint16"},{name:"maxPos",type:"uint16"}],note:"RealmShark QUEUE_INFORMATION (112, incoming)."},113:{name:"QUEUECANCEL",direction:"client",fields:[{name:"queueType",type:"string"}]},114:{name:"EXALTATIONBONUSCHANGED",direction:"server",fields:[{name:"objType",type:"int16"},{name:"dexProgress",type:"compressedInt"},{name:"spdProgress",type:"compressedInt"},{name:"vitProgress",type:"compressedInt"},{name:"wisProgress",type:"compressedInt"},{name:"defProgress",type:"compressedInt"},{name:"attProgress",type:"compressedInt"},{name:"manaProgress",type:"compressedInt"},{name:"lifeProgress",type:"compressedInt"}]},115:{name:"REDEEMEXALTATIONREWARD",direction:"client",fields:[{name:"itemType",type:"int32"}]},117:{name:"VAULTCONTENT",direction:"server",fields:[{name:"lastVaultUpdate",type:"bool"},{name:"vaultChestObjectId",type:"compressedInt"},{name:"materialChestObjectId",type:"compressedInt"},{name:"giftChestObjectId",type:"compressedInt"},{name:"potionStorageObjectId",type:"compressedInt"},{name:"seasonalSpoilChestObjectId",type:"compressedInt"},{name:"vaultContents",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"materialContents",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"giftContents",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"potionContents",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"seasonalSpoilContent",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"vaultUpgradeCost",type:"int16"},{name:"materialUpgradeCost",type:"int16"},{name:"seasonalSpoilUpgradeCost",type:"int16"},{name:"potionUpgradeCost",type:"int16"},{name:"currentPotionMax",type:"int16"},{name:"nextPotionMax",type:"int16"},{name:"vaultChestEnchants",type:"string"},{name:"giftChestEnchants",type:"string"},{name:"spoilsChestEnchants",type:"string"}]},118:{name:"FORGEREQUEST",direction:"client",fields:[]},119:{name:"FORGERESULT",direction:"server",fields:[]},120:{name:"FORGEUNLOCKEDBLUEPRINTS",direction:"server",fields:[{name:"unknownByte",type:"sbyte"},{name:"blueprints",type:"array",lengthType:"compressedInt",elementType:"compressedInt"}]},121:{name:"SHOOTACKCOUNTER",direction:"client",fields:[{name:"time",type:"int32"},{name:"count",type:"int16"}],note:"RealmShark SHOOT_ACK (121, outgoing)."},122:{name:"SHOWALLYSHOOT",direction:"client",fields:[{name:"toggle",type:"int32"}],note:"RealmShark CHANGE_ALLYSHOOT (122, outgoing)."},123:{name:"GETPLAYERSLISTMESSAGE",direction:"client",fields:[]},124:{name:"MODERATORACTIONMESSAGE",direction:"client",fields:[]},126:{name:"CREEPMOVEMESSAGE",direction:"client",fields:[]},129:{name:"CUSTOMMAPDELETE",direction:"client",fields:[]},131:{name:"CUSTOMMAPLIST",direction:"client",fields:[]},133:{name:"CREEPHIT",direction:"client",fields:[]},134:{name:"PLAYERCALLOUT",direction:"client",fields:[{name:"calloutType",type:"byte"},{name:"value",type:"int32"}]},136:{name:"BUYREFINEMENT",direction:"client",fields:[{name:"slot",type:"SlotObject"},{name:"action",type:"int16"}]},137:{name:"DASH",direction:"client",fields:[]},138:{name:"DASHACK",direction:"client",fields:[]},139:{name:"STATS",direction:"server",fields:[{name:"charId",type:"compressedInt"}],note:"RealmShark StatsPacket: charId then StatsStateData; remainder stays in unreadData until schema is extended."},140:{name:"BUYCUSTOMISATIONSOCKET",direction:"client",fields:[]},145:{name:"FAVORPET",direction:"client",fields:[{name:"petId",type:"int32"}]},146:{name:"SKINRECYCLE",direction:"client",fields:[{name:"item",type:"SlotObject"}]},147:{name:"UNKNOWN147",direction:"server",fields:[]},148:{name:"DAMAGEBOOST",direction:"server",fields:[]},149:{name:"CLAIMBATTLEPASS",direction:"client",fields:[{name:"item",type:"sbyte"}]},150:{name:"CLAIMBATTLEPASSRESPONSE",direction:"server",fields:[{name:"success",type:"bool"}],note:"RealmShark CLAIM_BP_MILESTONE_RESULT (150, incoming). EK ClaimBPMilestoneResult."},151:{name:"BOOSTBPMILESTONE",direction:"client",fields:[{name:"milestoneIndex",type:"byte"}]},154:{name:"CONVERTSEASONALCHARACTER",direction:"client",fields:[]},155:{name:"RETITLE",direction:"client",fields:[{name:"prefix",type:"int32"},{name:"suffix",type:"int32"}]},156:{name:"SETGRAVESTONE",direction:"client",fields:[]},157:{name:"SETABILITY",direction:"client",fields:[{name:"abilityType",type:"int32"},{name:"abilityIndex",type:"sbyte"}]},159:{name:"EMOTE",direction:"client",fields:[{name:"emoteId",type:"int32"},{name:"time",type:"int32"},{name:"unknownBool",type:"bool"}],note:"RealmShark EMOTE (159). EK Emote uses bool, not sbyte."},160:{name:"BUYEMOTE",direction:"client",fields:[{name:"emoteId",type:"int32"}]},162:{name:"SETTRACKEDSEASON",direction:"client",fields:[]},163:{name:"CLAIMMISSION",direction:"client",fields:[{name:"missionId",type:"int32"},{name:"unknownByte1",type:"byte"},{name:"unknownByte2",type:"byte"},{name:"unknownShort",type:"uint16"}]},164:{name:"UNKNOWN164",direction:"server",fields:[]},165:{name:"UNKNOWN165",direction:"server",fields:[{name:"unknownStr",type:"string"}]},166:{name:"STASIS",direction:"server",fields:[]},167:{name:"SETDISCOVERABLE",direction:"client",fields:[]},169:{name:"REALMSCOREUPDATE",direction:"server",fields:[{name:"score",type:"int32"}]},170:{name:"CLAIMREWARDSINFOPROMPT",direction:"server",fields:[]},171:{name:"CLAIMCHESTREWARD",direction:"server",fields:[]},172:{name:"CHESTREWARDRESULT",direction:"server",fields:[]},173:{name:"UNLOCKENCHANTMENTSLOT",direction:"client",fields:[]},175:{name:"UNLOCKENCHANTMENT",direction:"client",fields:[]},177:{name:"APPLYENCHANTMENT",direction:"client",fields:[]},180:{name:"ACTIVATECRUCIBLE",direction:"client",fields:[{name:"crucibleId",type:"string"},{name:"activate",type:"bool"}]},181:{name:"UNKNOWN181",direction:"server",fields:[]},182:{name:"CRUCIBLEREQUEST",direction:"client",fields:[{name:"types",type:"array",lengthType:"int16",elementType:"int32"}]},183:{name:"CRUCIBLERESPONSE",direction:"server",fields:[{name:"crucibleIds",type:"array",lengthType:"int16",elementType:"int32"},{name:"crucibleJsons",type:"array",lengthType:"int16",elementType:"string"}]},185:{name:"UPGRADEENCHANTER",direction:"client",fields:[]},187:{name:"UPGRADEENCHANTMENT",direction:"client",fields:[]},189:{name:"REROLLALLENCHANTMENTS",direction:"client",fields:[]},190:{name:"UNKNOWN190",direction:"server",fields:[]},191:{name:"RESETENCHANTMENTREROLLCOUNT",direction:"client",fields:[]},200:{name:"CREATEPARTYMESSAGE",direction:"client",fields:[{name:"description",type:"string"},{name:"minPowerLevel",type:"int16"},{name:"maxPartySize",type:"sbyte"},{name:"activity",type:"sbyte"},{name:"maxedStatReq",type:"sbyte"},{name:"privacy",type:"sbyte"},{name:"serverIndex",type:"byte"}]},204:{name:"PARTYACTIONRESULT",direction:"client",fields:[{name:"playerId",type:"uint16"},{name:"actionId",type:"byte"}],note:"C\u2192S (EK PartyActionResult). playerId 0xFFFF often self; actionId drives party UI (e.g. list refresh)."},207:{name:"PARTYACTION",direction:"server",fields:[{name:"playerId",type:"uint16"},{name:"actionId",type:"byte"}],note:"S\u2192C (EK PartyAction). Server echo / result for party actions."},208:{name:"INCOMINGPARTYINVITE",direction:"server",fields:[{name:"partyId",type:"uint32"},{name:"inviterName",type:"string"}]},209:{name:"PARTYINVITERESPONSE",direction:"client",fields:[{name:"partyId",type:"uint32"},{name:"accept",type:"byte"}]},210:{name:"INCOMINGPARTYMEMBERINFO",direction:"server",fields:[{name:"partyId",type:"uint32"},{name:"unknownShort",type:"uint16"},{name:"maxSize",type:"byte"},{name:"partyPlayers",type:"array",lengthType:"int16",elementType:"PartyPlayer"},{name:"description",type:"string"}],note:"EK IncomingPartyMemberInfo.Read order; PartyPlayer matches EK PartyPlayer."},212:{name:"PARTYMEMBERADDED",direction:"server",fields:[{name:"playerId",type:"uint16"},{name:"name",type:"string"},{name:"classId",type:"uint16"},{name:"skinId",type:"uint16"}]},214:{name:"PARTYLISTMESSAGE",direction:"server",fields:[{name:"packetNumber",type:"byte"},{name:"parties",type:"array",lengthType:"int16",elementType:"PartyInfo"}],note:"EK PartyList; activity/privacy are bytes (PartyActivity, PartyPrivacy enums)."},215:{name:"PARTYJOINREQUEST",direction:"client",fields:[{name:"partyId",type:"uint32"},{name:"unknownByte",type:"byte"}],note:"C\u2192S: client requests to join a party (partyId + byte; matches EK PartyJoinRequest)."},217:{name:"PARTYJOINREQUESTRESPONSE",direction:"server",fields:[{name:"name",type:"string"},{name:"classId",type:"uint16"},{name:"skinId",type:"uint16"},{name:"state",type:"byte"}]},218:{name:"FORRECONNECT",direction:"server",fields:[]},222:{name:"LOADINGSCREEN",direction:"server",fields:[]}},dataObjects:{FameData:{fields:[{name:"name",type:"string"},{name:"rank",type:"compressedInt"},{name:"fame",type:"compressedInt"}]},Location:{fields:[{name:"x",type:"float"},{name:"y",type:"float"}]},LocationRecord:{fields:[{name:"time",type:"int32"},{name:"x",type:"float"},{name:"y",type:"float"}]},Tile:{fields:[{name:"x",type:"int16"},{name:"y",type:"int16"},{name:"type",type:"uint16"}]},Entity:{fields:[{name:"objectType",type:"uint16"},{name:"status",type:"Status"}]},Status:{fields:[{name:"objectId",type:"compressedInt"},{name:"position",type:"Location"},{name:"data",type:"array",lengthType:"compressedInt",elementType:"StatData"}]},StatData:{fields:[{name:"id",type:"byte"},{name:"value",type:"statValue"},{name:"stackCount",type:"compressedInt"}]},SlotObject:{fields:[{name:"objectId",type:"int32"},{name:"slotId",type:"int32"},{name:"objectType",type:"int32"}]},PartyInfo:{fields:[{name:"name",type:"string"},{name:"partyId",type:"uint32"},{name:"powerLevelMin",type:"uint16"},{name:"partySizeCurrent",type:"byte"},{name:"partySizeMax",type:"byte"},{name:"activity",type:"byte"},{name:"privacy",type:"byte"},{name:"statsMin",type:"byte"},{name:"serverIndex",type:"byte"}]},PartyPlayer:{fields:[{name:"playerId",type:"uint16"},{name:"name",type:"string"},{name:"classId",type:"uint16"},{name:"skinId",type:"uint16"}]},QuestData:{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"description",type:"string"},{name:"expiration",type:"string"},{name:"category",type:"int32"},{name:"type",type:"int32"},{name:"itemsNeeded",type:"array",lengthType:"int16",elementType:"int32"},{name:"rewards",type:"array",lengthType:"int16",elementType:"int32"},{name:"completed",type:"bool"},{name:"choice",type:"bool"},{name:"repeatable",type:"bool"}]},TradeItem:{fields:[{name:"item",type:"int32"},{name:"slotType",type:"int32"},{name:"tradeable",type:"bool"},{name:"included",type:"bool"},{name:"enchantment",type:"string"}]}}},Ey=Gk;var Uk={packets:[{name:"ActivePetUpdateRequest",direction:"client",id:24},{name:"BuyDusts",direction:"client"},{name:"BuyExtendMaterialsCapMessage",direction:"client"},{name:"BuyItemMessage",direction:"client"},{name:"BuyItemsMessage",direction:"client"},{name:"ClaimAccountLevel",direction:"client"},{name:"ClaimChestRewardSubmit",direction:"client"},{name:"ClaimCompetition",direction:"client"},{name:"ClaimVoucher",direction:"client"},{name:"DismantleItemsMessage",direction:"client"},{name:"EndUseMessage",direction:"client"},{name:"GetDefinitionMessage",direction:"client"},{name:"GiftItemsMessage",direction:"client"},{name:"MarkAsFavorite",direction:"client"},{name:"PurchasePetShader",direction:"client"},{name:"StartUseMessage",direction:"client"},{name:"UnlockMission",direction:"client"},{name:"UnlockMissionTree",direction:"client"},{name:"UnseasonRequest",direction:"client"},{name:"AcceleratorAddedMessage",direction:"server"},{name:"AcceleratorUpdatedMessage",direction:"server"},{name:"AccountLevelClaimResultMessage",direction:"server"},{name:"BaseEnchantmentResultMessage",direction:"server"},{name:"BuyDustsResult",direction:"server"},{name:"BuyExtendMaterialsCapResultMessage",direction:"server"},{name:"BuyItemResultMessage",direction:"server"},{name:"CharacterCreateFailure",direction:"server"},{name:"ChestRewardsInfo",direction:"server"},{name:"ClaimCompetitionResult",direction:"server"},{name:"ClaimMissionResult",direction:"server"},{name:"CustomMapDeleteResponse",direction:"server"},{name:"CustomMapListResponse",direction:"server"},{name:"DailyRewardResult",direction:"server"},{name:"DamageWithEffect",direction:"server"},{name:"DashResetMessage",direction:"server"},{name:"DismantleItemsResultMessage",direction:"server"},{name:"DrawDebugArrow",direction:"server"},{name:"DrawDebugShape",direction:"server"},{name:"ExaltationRedeemInfoMessage",direction:"server"},{name:"GiftResultMessage",direction:"server"},{name:"GroundTileData",direction:"server"},{name:"HeroLeft",direction:"server"},{name:"IncomingPartyRequest",direction:"server"},{name:"JoinedPartyMessage",direction:"server"},{name:"MissionProgressUpdate",direction:"server"},{name:"MultipleMissionsProgressUpdate",direction:"server"},{name:"ObjectData",direction:"server"},{name:"ObjectStatusData",direction:"server"},{name:"PartyJoinResponse",direction:"server"},{name:"PartyRequestAck",direction:"server"},{name:"PetShaderPurchaseResult",direction:"server"},{name:"PlayersListMessage",direction:"server"},{name:"RefineResultMessage",direction:"server"},{name:"RerollEnchantmentsResultMessage",direction:"server"},{name:"ResultDefinitionMessage",direction:"server"},{name:"SaveLockUpdateMessage",direction:"server"},{name:"SkinRecycleResponseMessage",direction:"server"},{name:"SlippingInfoMessage",direction:"server"},{name:"StacksMessage",direction:"server"},{name:"StatBonusUpdate",direction:"server"},{name:"StatData",direction:"server"},{name:"TutorialStateChangedMessage",direction:"server"},{name:"UnlockCustomizationMessage",direction:"server"},{name:"UnlockNewSlot",direction:"server"},{name:"VoucherResult",direction:"server"}]},Ty=Uk;var Vk={3:"needsWork",4:"needsWork",5:"needsWork",6:"needsWork",7:"needsWork",11:"needsWork",12:"needsWork",14:"needsWork",15:"needsWork",16:"needsWork",17:"needsWork",19:"needsWork",21:"needsWork",22:"needsWork",23:"needsWork",24:"needsWork",26:"needsWork",27:"needsWork",28:"needsWork",30:"needsWork",33:"needsWork",34:"needsWork",37:"needsWork",38:"needsWork",39:"needsWork",41:"needsWork",48:"needsWork",50:"needsWork",51:"needsWork",52:"needsWork",53:"needsWork",56:"needsWork",57:"needsWork",58:"needsWork",59:"needsWork",63:"needsWork",66:"needsWork",68:"needsWork",76:"needsWork",77:"needsWork",78:"needsWork",79:"needsWork",80:"needsWork",81:"needsWork",82:"needsWork",83:"needsWork",84:"needsWork",86:"needsWork",87:"needsWork",88:"needsWork",91:"needsWork",93:"needsWork",94:"needsWork",95:"needsWork",96:"needsWork",97:"needsWork",98:"needsWork",99:"needsWork",100:"needsWork",102:"needsWork",104:"needsWork",105:"needsWork",106:"needsWork",107:"needsWork",108:"needsWork",109:"needsWork",112:"needsWork",113:"needsWork",114:"needsWork",115:"needsWork",117:"needsWork",118:"needsWork",119:"needsWork",120:"needsWork",122:"needsWork",123:"needsWork",124:"needsWork",126:"needsWork",129:"needsWork",131:"needsWork",133:"needsWork",137:"needsWork",138:"needsWork",139:"needsWork",140:"needsWork",147:"needsWork",148:"needsWork",149:"needsWork",150:"needsWork",151:"needsWork",154:"needsWork",156:"needsWork",162:"needsWork",164:"needsWork",165:"needsWork",166:"needsWork",167:"needsWork",169:"needsWork",170:"needsWork",171:"needsWork",172:"needsWork",173:"needsWork",175:"needsWork",177:"needsWork",181:"needsWork",185:"needsWork",187:"needsWork",189:"needsWork",190:"needsWork",191:"needsWork",200:"needsWork",218:"needsWork",222:"needsWork"},Py=Vk;gr();X();gr();var eb=new Map,Zy=new Map,d0=new Map,f0=new Map;function p0(r){return String(r||"").trim().toLowerCase()}function tb(r){let e=Math.floor(Number(r.launcherPid));if(!Number.isFinite(e)||e<=0)return;let t=typeof r.accountId=="string"&&r.accountId.trim()!==""?r.accountId.trim():null,n=typeof r.accountLabel=="string"&&r.accountLabel.trim()!==""?r.accountLabel.trim():null,i=p0(r.email),s={accountId:t,accountLabel:n,emailNormalized:i,pidLauncher:e,pidUnity:null,launchedAtMs:Date.now()};eb.set(e,s),f0.set(i,s),t&&d0.set(t,s),m.log("CredentialLaunch",`Registered launcher PID ${e}${t?` \u2192 account ${t}`:""}${n?` "${n}"`:""}${i?` (${i})`:""}`),m0(e)}async function m0(r){let e=await sd(r);if(e==null||e<=0)return;let t=eb.get(r);t&&(t.pidUnity!=null&&t.pidUnity!==e&&Zy.delete(t.pidUnity),t.pidUnity=e,Zy.set(e,t),m.log("CredentialLaunch",`Bound Unity PID ${e} to launcher ${r}${t.accountId?` (account ${t.accountId})`:""}`))}Mi();X();Mi();gr();Pn();$i();var rb=3e3,ji=null,ht={hotMs:0,coolMs:0,mode:"cool"},Bi=0,Gr=0,br=!1,Ia=!1,ad="";function h0(r){return r.map(e=>`${Math.floor(Number(e.pid))}:${String(e.imageName||"")}`).sort().join("|")}var od=!1;function nb(){ht={hotMs:0,coolMs:0,mode:"cool"},ad="",Bi=0,Gr=0,br=!1,Ia=!1}async function Rn(){let r=await er(),e=new Set(Ze().parkedPids),t=await In(r,e);t.ok||m.warn("exaltTune.watchdog",t.error||"role tuning apply")}async function g0(r,e){let t=await st(),n=t.processes,i=Math.max(1,Number(t.logicalProcessors)||1),s=n.reduce((f,h)=>f+(Number(h.cpuPercent)||0),0),o=s/i,a=e.watchdog,l=a.cpuMetric==="raw"?s:o,c=ht.hotMs,u=ht.coolMs,d=h0(n),p=n.length>0&&l>=a.cpuSumThreshold;if(p){if(c=ht.hotMs+r,u=0,c>=a.cpuSumHotDebounceMs&&ht.mode==="cool"){ht.mode="hot",m.log("exaltTune.watchdog",`HOT: raw\u03A3=${s.toFixed(1)}% equiv=${o.toFixed(1)}% (cpuMetric=${a.cpuMetric}, threshold=${a.cpuSumThreshold}, LP=${i}, procs=${n.length})`);try{a.onHotActivateHotPlan&&e.powerGuidHot&&await Ft(e.powerGuidHot),a.onHotSetPriorityHot&&await Rn()}catch(f){m.warn("exaltTune.watchdog",String(f.message||f))}}}else if(u=ht.coolMs+r,c=0,u>=a.cpuSumCoolDebounceMs&&ht.mode==="hot"){ht.mode="cool",m.log("exaltTune.watchdog",`COOL: raw\u03A3=${n.length?s.toFixed(1):"0"} (${n.length} process(es))`);try{a.onCoolActivateIdlePlan&&e.powerGuidIdle&&await Ft(e.powerGuidIdle),a.onCoolSetPriorityIdle&&await Rn()}catch(f){m.warn("exaltTune.watchdog",String(f.message||f))}}ht.hotMs=c,ht.coolMs=u;try{a.onHotSpreadCores&&ht.mode==="hot"&&p&&c>=a.cpuSumHotDebounceMs&&d&&d!==ad&&(await nd()).ok&&(ad=d)}catch(f){m.warn("exaltTune.watchdog",String(f.message||f))}}async function y0(r,e){if(!e.enabled){if(br){br=!1,Bi=0,Gr=0,Cn();try{await Rn()}catch(h){m.warn("exaltTune.thermal",String(h.message||h))}}return}let t=await _a(),n=t.pkgMaxCelsius!=null,i=t.minFreqPctOfMax!=null;if(!n&&!i){Ia||(Ia=!0,m.log("exaltTune.thermal","No WMI ACPI temp nor CPU frequency counter \u2014 thermal demotion inactive"));return}Ia=!1;let s=n&&t.pkgMaxCelsius>=e.pkgTempCelsiusThreshold,o=!n||t.pkgMaxCelsius<=e.pkgTempCelsiusClear,a=i&&e.freqPctLowThreshold!=null,l=e.freqPctLowThreshold??0,c=e.freqPctClear??(e.freqPctLowThreshold!=null?e.freqPctLowThreshold+7:null),u=a&&t.minFreqPctOfMax<=l,d=!a||c==null||t.minFreqPctOfMax>=c,p=s||u,f=o&&d;if(p){if(Gr=0,Bi+=r,!br&&Bi>=e.sustainMs){br=!0,m.log("exaltTune.thermal",`Thermal stress sustained: demoting background (max ${n?t.pkgMaxCelsius.toFixed(1)+" \xB0C":"no temp"}, freqMin\u2248${i?t.minFreqPctOfMax.toFixed(0):"na"} %)`);try{Oy(e.demoteBackgroundTo),await Rn()}catch(h){m.warn("exaltTune.thermal",String(h.message||h))}}}else if(Bi=0,br&&f){if(Gr+=r,Gr>=e.clearMs){br=!1,Gr=0,m.log("exaltTune.thermal","Thermal cleared \u2014 restoring background priorities from rules");try{Cn(),await Rn()}catch(h){m.warn("exaltTune.thermal",String(h.message||h))}}}else Gr=0}async function b0(r){if(!(await te()).ok)return;let t=et(),n=t.watchdog.enabled,i=t.thermal.enabled;!n&&!i||(n&&await g0(r,t),await y0(r,t.thermal))}function ld(){let r=br;ji!=null&&(clearInterval(ji),ji=null),r&&(Cn(),Rn().catch(()=>{})),nb()}function S0(){ji==null&&(nb(),ji=setInterval(()=>{od||(od=!0,b0(rb).catch(r=>m.warn("exaltTune.watchdog",String(r.message||r))).finally(()=>{od=!1}))},rb))}function Ur(){let r=et();ld(),(r.watchdog.enabled||r.thermal.enabled)&&S0()}X();gr();var w0="rotmg exalt.exe",E0="rotmgexalt.exe";function T0(r){return String(r||"").replace(/\u00a0/g," ").trim().toLowerCase()}var cd={activeTrimEligible:!1,backgroundTrimEligible:!0,parkedTrimEligible:!0};function Ra(r,e,t){let n=r.trimParentWs===!0,i=r.trimChildWs!==!1,s=e.filter(p=>{let f=T0(p.imageName);return!!(n&&f===w0||i&&f===E0)});s.length===0&&(s=[...e]);let o=typeof r.minWorkingSetBytesBeforeTrim=="number"&&r.minWorkingSetBytesBeforeTrim>0?r.minWorkingSetBytesBeforeTrim:0,a=typeof r.maxCpuPercentForTrim=="number"&&Number.isFinite(r.maxCpuPercentForTrim)?Math.max(0,r.maxCpuPercentForTrim):0;s=s.filter(p=>{let f=Number(p.workingSetBytes)||0;if(o>0&&f<o)return!1;if(a>0&&p.cpuPercent!=null){let h=Number(p.cpuPercent);if(Number.isFinite(h)&&h>a)return!1}return!0});let l=new Set,c=[];for(let p of s){let f=Math.floor(Number(p.pid));!(f>0)||l.has(f)||(l.add(f),c.push(f))}let u=r.trimRolePolicy,d=u?{activeTrimEligible:u.activeTrimEligible??cd.activeTrimEligible,backgroundTrimEligible:u.backgroundTrimEligible??cd.backgroundTrimEligible,parkedTrimEligible:u.parkedTrimEligible??cd.parkedTrimEligible}:null;return d&&t?.pidToRole&&t.pidToRole.size>0&&(c=c.filter(p=>{let f=t.pidToRole.get(p)??"background";return f==="active"?d.activeTrimEligible:f==="parked"?d.parkedTrimEligible:d.backgroundTrimEligible})),c}ca();fa();var P0=12e3,Fi=null,ud=!1,Na=0,dd=0,Aa=0,fd=0;async function v0(r){let e=Date.now(),t=yr();if(t.proxy.enabled&&e-Na>=t.proxy.checkIntervalMs){Na=e;let n=r.getRss(),i=r.getPacketRate(),s=t.proxy.rssBytesThreshold>0&&n>=t.proxy.rssBytesThreshold,o=t.proxy.packetRateThreshold>0&&i>=t.proxy.packetRateThreshold;if((s||o)&&e-dd>=t.proxy.minTrimIntervalMs)try{r.trimProxyMemory({trimPackets:t.proxy.trimPackets,trimPacketLab:t.proxy.trimPacketLab,trimWorldSnapshot:t.proxy.trimWorldSnapshot,runGcHint:t.proxy.runGcHint}),dd=Date.now(),m.log("smartTrim",`Proxy trim (rss=${Math.round(n/1048576)}MB rate=${i}/s)`)}catch(l){m.warn("smartTrim",String(l.message||l))}}if(t.exalt.enabled&&e-Aa>=t.exalt.checkIntervalMs){if(Aa=e,!(await te()).ok)return;let i=t.exalt;if(i.requireMemoryLoadPercent>0){let d=await Zu();if(!d||d.memoryLoadPercent<i.requireMemoryLoadPercent)return}let o=(await st()).processes||[];if(!o.length)return;let a=0;for(let d of o){let p=Number(d.workingSetBytes)||0;p>a&&(a=p)}let l=i.workingSetBytesPerProcessThreshold,c=l>0&&a>=l,u=i.periodicTrim===!0;if((c||u)&&e-fd>=i.minTrimIntervalMs)try{let d=await la(o),p=Ra(i,o,{pidToRole:d});if(p.length===0)return;let f=await _n(p);f.ok&&(fd=Date.now(),m.log("smartTrim",`Exalt EmptyWorkingSet applied=${f.applied} pid(s) (maxWs=${Math.round(a/1048576)}MB)`))}catch(d){m.warn("smartTrim",String(d.message||d))}}}function ib(r){Fi==null&&(Fi=setInterval(()=>{ud||(ud=!0,v0(r).catch(e=>m.warn("smartTrim",String(e.message||e))).finally(()=>{ud=!1}))},P0))}function sb(){Fi!=null&&(clearInterval(Fi),Fi=null),Na=0,dd=0,Aa=0,fd=0}function Nn(){Na=0,Aa=0}async function ob(r){let e=await te();if(!e.ok)return{ok:!1,applied:0,error:e.reason,skipped:"unsupported"};let t=yr(),n=r?.manual===!0,i=t.exalt;if(!n&&!i.enabled)return{ok:!0,applied:0,skipped:"disabled"};if(!n&&i.requireMemoryLoadPercent>0){let c=await Zu();if(!c||c.memoryLoadPercent<i.requireMemoryLoadPercent)return{ok:!0,applied:0,skipped:"memory_below_threshold"}}if(!i.enabled&&n){let{processes:c}=await st();if(!c.length)return{ok:!0,applied:0,skipped:"no_processes"};let u=await la(c),d={...i,trimChildWs:!0,trimParentWs:!0,maxCpuPercentForTrim:0,minWorkingSetBytesBeforeTrim:0,workingSetBytesPerProcessThreshold:0},p=Ra(d,c,{pidToRole:u});return p.length===0?{ok:!0,applied:0,skipped:"no_matching_pids"}:_n(p)}let{processes:s}=await st();if(!s.length)return{ok:!0,applied:0,skipped:"no_processes"};let o=n?{...i,maxCpuPercentForTrim:0}:i,a=await la(s),l=Ra(o,s,{pidToRole:a});return l.length===0?{ok:!0,applied:0,skipped:"no_matching_pids"}:_n(l)}fa();ma();Mi();Pn();ca();gr();ma();$i();async function ab(){return td()}async function lb(r){try{jt({parkedPids:[]});let e=et();vn({tuningPreset:null,watchdog:{...e.watchdog,enabled:!1},thermal:{...e.thermal,enabled:!1}}),Ur(),Cn();let t=await te();if(t.ok&&(await xa("Normal"),await qy()),r?.activateBalancedPowerPlan&&t.ok){let n=await Ca(),i="381b4222-f694-41f0-9685-ff5bb260df2e",s=a=>String(a).replace(/[{}]/g,"").trim().toLowerCase(),o=n.find(a=>s(a.guid)===i)||n.find(a=>/\bbalanced\b/i.test(a.name))||n.find(a=>/^balanced$/i.test(String(a.name).trim()));o&&await Ft(o.guid)}return Nn(),{ok:!0}}catch(e){return{ok:!1,error:String(e.message||e)}}}async function pd(){let r=await er(),e=new Set(Ze().parkedPids);return In(r,e)}async function cb(r){let e=String(r?.preset||"").trim();if(e){let t=e.toLowerCase().replace(/\s+/g,""),i=["safe","balanced","multibox","aggressive","lowHeat"].find(s=>s.toLowerCase().replace(/\s+/g,"")===t);i&&pa(i)}return Nn(),Ur(),pd()}zu();Pn();$i();function md(r){return`0x${(Number.isFinite(r)?Math.max(0,Math.trunc(r)):0).toString(16)}`}function Ce(r){let e=Number(r);return Number.isFinite(e)?e:0}function hd(r){let e=String(r??"").trim().toLowerCase();return e==="1"||e==="true"}function Vr(r,e=0){let t=String(r??"").split(",").map(n=>String(n??"").trim()).filter(Boolean).map(n=>{let i=n.indexOf("#"),s=i>=0?n.slice(0,i).trim():n,o=i>=0?n.slice(i+1).trim():"",a=Number.parseInt(s,10);return{objectType:Number.isFinite(a)?a:-1,uniqueId:o||null}});for(;t.length<e;)t.push({objectType:-1,uniqueId:null});return t}function Hi(r){let e=new Map,n=(r&&typeof r=="object"?r:null)?.ItemData,i=Array.isArray(n)?n:n?[n]:[];for(let s of i){if(!s||typeof s!="object")continue;let o=s,a=Number.parseInt(String(o["@_type"]??"").trim(),10);if(!Number.isFinite(a))continue;let l=String(o["@_id"]??"").trim(),c=String(o["#text"]??"").trim();if(!c)continue;let u=`${a}#${l}`,d=e.get(u);d?d.push(c):e.set(u,[c])}return e}function ub(r){let e=String(r||"").trim();if(!e)return[];try{let t=e.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(e.length/4)*4,"="),n=Buffer.from(t,"base64");if(n.length<=3)return[];let i=[];for(let s=3;s+1<n.length;s+=2){let o=n.readUInt16LE(s);if(o===65533)break;i.push(o===65534?0:o)}return i}catch{return[]}}function db(r){let e=r.match(/<Error>([^<]*)<\/Error>/i)?.[1]?.trim();return e?gd(`<Error>${e}</Error>`):null}function fb(r){let e=r.match(/<AccessToken>([^<]*)<\/AccessToken>/)?.[1],t=r.match(/<AccessTokenTimestamp>([^<]*)<\/AccessTokenTimestamp>/)?.[1],n=r.match(/<AccessTokenExpiration>([^<]*)<\/AccessTokenExpiration>/)?.[1];return e&&t&&n?{token:e,tokenTimestamp:t,tokenExpiration:n}:null}function gd(r){let e=r.match(/<Error>([^<]*)<\/Error>/)?.[1]?.trim()??"",t=e.toLowerCase();return t.includes("password")||e==="PasswordError"?"Wrong password.":t.includes("wait")||t.includes("try again later")?"Too many requests. Try again later.":t.includes("captcha")?"Captcha required. Try again in a browser first.":t.includes("suspended")?"Account suspended.":t.includes("account in use")?"Account already in use.":t.includes("token for different machine")||t.includes("different machine")?'Token for different machine. Click "Refresh HWID" in the accounts menu (\u22EF) and try again. If it still fails, log in once via the official launcher to re-bind the account.':e||"Login failed."}var yd=U(require("sharp"),1),mb=U(ln(),1),ye=require("fs"),z=require("path");X();Hr();var pb=["groundTiles","characters","characters_masks","mapObjects"],Oa=class{constructor(e,t,n){this.publicDir=e;this.getRotmgPath=t;this.getExtractorGameDataPath=n}wikiSpriteSheetCache=null;resetCache(){this.wikiSpriteSheetCache=null}findCaseInsensitiveDrawingsPng(e,t){let n=`${t}.png`.toLowerCase();if(!(0,ye.existsSync)(e))return null;try{for(let i of(0,ye.readdirSync)(e))if(i.toLowerCase().endsWith(".png")&&i.toLowerCase()===n)return(0,z.join)(e,i)}catch{return null}return null}findCaseInsensitivePngUnderTree(e,t,n,i){let s=`${t}.png`.toLowerCase();if(!(0,ye.existsSync)(e))return null;let o;try{o=(0,z.resolve)(e)}catch{return null}let a=[{dir:o,depth:0}],l=new Set,c=0;for(;a.length>0&&c<i;){let u=a.shift();if(!u)break;let{dir:d,depth:p}=u,f=d.toLowerCase();if(l.has(f))continue;l.add(f),c++;let h;try{h=(0,ye.readdirSync)(d)}catch{continue}for(let g of h){let y=(0,z.join)(d,g),b;try{b=(0,ye.statSync)(y)}catch{continue}if(b.isFile()){if(!g.toLowerCase().endsWith(".png"))continue;if(g.toLowerCase()===s)return y}else if(b.isDirectory()&&p<n){let S=g.toLowerCase();if(S==="node_modules"||S===".git")continue;a.push({dir:y,depth:p+1})}}}return null}resolveWikiTexturePngPath(e){let t=e.replace(/[^a-zA-Z0-9_]/g,"");if(!t)return null;let n=this.getRotmgPath();if(!n)return null;let i=[];n.toLowerCase().endsWith(".exe")?i.push((0,z.dirname)(n),n):i.push(n);let s=[];for(let l of i)s.push((0,z.join)(l,"Drawings"),(0,z.join)(l,"Resources","Drawings"),(0,z.join)(l,"App","Drawings"),(0,z.join)(l,"Production","Drawings"),(0,z.join)(l,"assets","Drawings"),(0,z.join)(l,"Assets","Drawings"),(0,z.join)(l,"Resources","App","Drawings"),(0,z.join)(l,"Resources","Embedded","Drawings"));let o=this.resolveExtractorGameDataDir();if(o)for(let l of this.listWikiExtractorLoosePngFlatDirs(o))s.push(l);let a=process.env.LOCALAPPDATA;a&&s.push((0,z.join)(a,"RealmOfTheMadGod","Drawings"),(0,z.join)(a,"RealmOfTheMadGod","Production","Drawings"),(0,z.join)(a,"RotMG Exalt","Drawings"));for(let l of s){if(!(0,ye.existsSync)(l))continue;let c=this.findCaseInsensitiveDrawingsPng(l,t);if(c)return c;let u=this.findCaseInsensitivePngUnderTree(l,t,3,200);if(u)return u}return null}resolveBundledExtractorGameDataDir(){let e=(0,z.join)(this.publicDir,"..","..","..","data","rotmg-extractor-game","GameData");if((0,ye.existsSync)((0,z.join)(e,"spritesheet.xml"))&&(0,ye.existsSync)((0,z.join)(e,"images")))return e;let t=yy();return(0,ye.existsSync)((0,z.join)(t,"spritesheet.xml"))&&(0,ye.existsSync)((0,z.join)(t,"images"))?t:null}resolveExtractorGameDataDir(){let e=(this.getExtractorGameDataPath()||"").trim();if(e){let t=(0,z.resolve)(e),n=(0,z.join)(t,"spritesheet.xml");if((0,ye.existsSync)(n)&&(0,ye.existsSync)((0,z.join)(t,"images")))return t;let i=(0,z.join)(t,"GameData");if((0,ye.existsSync)((0,z.join)(i,"spritesheet.xml"))&&(0,ye.existsSync)((0,z.join)(i,"images")))return i}return this.resolveBundledExtractorGameDataDir()}mapWikiAtlasRawToSheetIndex(e){let t=Math.trunc(e)-1;return t<0||t>=pb.length?-1:t}parseWikiSpritesheetXml(e){let t=new Map,n=new mb.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"@_"}),i;try{i=n.parse(e)}catch{return t}let s=i.DecompiledSpriteSheet;if(!s?.SpriteGroups)return t;let o=s.SpriteGroups.SpriteGroup;if(o==null)return t;Array.isArray(o)||(o=[o]);for(let a of o){let l=String(a["@_Name"]??"").trim();if(!l)continue;let c=a.Sprite,u=new Map;if(c!=null){Array.isArray(c)||(c=[c]);for(let d of c){let p=Number(d["@_Index"]),f=Number(d["@_AtlasId"]),h=Number(d["@_X"]),g=Number(d["@_Y"]),y=Number(d["@_W"]),b=Number(d["@_H"]);!Number.isFinite(p)||!Number.isFinite(f)||u.set(p,{atlasId:f,x:Number.isFinite(h)?h:0,y:Number.isFinite(g)?g:0,w:Number.isFinite(y)?y:0,h:Number.isFinite(b)?b:0})}}t.set(l.toLowerCase(),u)}return t}ensureLoadedWikiSpriteCache(e){let t=(0,z.join)(e,"spritesheet.xml");if(!(0,ye.existsSync)(t))return;let n=0;try{n=(0,ye.statSync)(t).mtimeMs}catch{return}if(this.wikiSpriteSheetCache&&this.wikiSpriteSheetCache.gameDataDir===e&&this.wikiSpriteSheetCache.sheetMtime===n)return;let i=(0,ye.readFileSync)(t,"utf8"),s=this.parseWikiSpritesheetXml(i);this.wikiSpriteSheetCache={gameDataDir:e,sheetMtime:n,byGroup:s},m.log("DevServer",`Game Wiki: loaded extractor spritesheet (${s.size} groups)`)}lookupWikiSpriteFrame(e,t){if(!this.wikiSpriteSheetCache)return null;let n=this.wikiSpriteSheetCache.byGroup.get(e.toLowerCase());return n?n.get(t)??null:null}async tryServeExtractorWikiSprite(e,t,n,i){this.ensureLoadedWikiSpriteCache(e);let s=this.lookupWikiSpriteFrame(t,n);if(!s||s.w<=0||s.h<=0)return!1;let o=this.mapWikiAtlasRawToSheetIndex(s.atlasId);if(o<0)return!1;let a=(0,z.join)(e,"images"),l=pb[o],c=this.findCaseInsensitiveDrawingsPng(a,l);if(!c)return!1;let u;try{u=await(0,yd.default)(c).metadata()}catch{return!1}let d=u.width??0,p=u.height??0;if(s.x<0||s.y<0||s.x+s.w>d||s.y+s.h>p)return!1;try{let f=await(0,yd.default)(c).extract({left:s.x,top:s.y,width:s.w,height:s.h}).png().toBuffer();return i.writeHead(200,{"Content-Type":"image/png","Cache-Control":"public, max-age=86400","Access-Control-Allow-Origin":"*","X-Wiki-Sprite-Cropped":"1"}),i.end(f),!0}catch(f){return m.warn("DevServer",`Game Wiki extractor crop failed: ${f.message}`),!1}}listWikiExtractorLoosePngFlatDirs(e){let t=(0,z.dirname)(e);return[(0,z.join)(e,"images"),(0,z.join)(e,"spritesheets"),(0,z.join)(e,"Spritesheets"),(0,z.join)(t,"spritesheets"),(0,z.join)(t,"Spritesheets"),(0,z.join)(t,"images")]}findExtractorLoosePngFlat(e,t){for(let n of this.listWikiExtractorLoosePngFlatDirs(e)){let i=this.findCaseInsensitiveDrawingsPng(n,t);if(i)return i}return null}findExtractorLoosePng(e,t){let n=this.findExtractorLoosePngFlat(e,t);if(n)return n;let i=(0,z.dirname)(e);return this.findCaseInsensitivePngUnderTree(e,t,6,600)??this.findCaseInsensitivePngUnderTree(i,t,6,1e3)}tryServeWikiExtractorImagesLooseSheet(e,t,n){let i=this.findExtractorLoosePng(e,t);if(!i)return!1;try{let s=(0,ye.readFileSync)(i);return n.writeHead(200,{"Content-Type":"image/png","Cache-Control":"public, max-age=86400","Access-Control-Allow-Origin":"*"}),n.end(s),!0}catch{return!1}}serveDrawingsWikiTextureFullSheet(e,t){let n=this.resolveWikiTexturePngPath(e);if(!n)return m.warn("DevServer",`Game Wiki texture not found for "${e}" (set RotMG path and/or extractor GameData in Settings)`),t.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),t.end("not_found"),!0;try{let i=(0,ye.readFileSync)(n);return t.writeHead(200,{"Content-Type":"image/png","Cache-Control":"public, max-age=86400","Access-Control-Allow-Origin":"*"}),t.end(i),!0}catch(i){return m.warn("DevServer",`Game Wiki texture read failed: ${i.message}`),t.writeHead(500,{"Content-Type":"text/plain; charset=utf-8"}),t.end("read_error"),!0}}tryServeWikiTextureFile(e,t){if(e.method!=="GET"||!e.url?.startsWith("/api/wiki-texture-file"))return!1;let n=e.url.indexOf("?"),i=n>=0?e.url.slice(n+1):"",s=new URLSearchParams(i),a=(s.get("file")||"").trim().replace(/[^a-zA-Z0-9_]/g,"");if(!a||a.length>80)return t.writeHead(400,{"Content-Type":"text/plain; charset=utf-8"}),t.end("bad_file"),!0;let l=s.get("index"),c=null;if(l!=null&&l!==""){let d=/^0x/i.test(String(l).trim()),p=parseInt(String(l).trim().replace(/^0x/i,""),d?16:10);c=Number.isFinite(p)?p:null}let u=this.resolveExtractorGameDataDir();return(async()=>{try{if(u&&c!==null&&await this.tryServeExtractorWikiSprite(u,a,c,t)||u&&!t.headersSent&&this.tryServeWikiExtractorImagesLooseSheet(u,a,t))return;if(!this.getRotmgPath()){t.headersSent||(t.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),t.end("not_found"));return}t.headersSent||this.serveDrawingsWikiTextureFullSheet(a,t)}catch(d){m.warn("DevServer",`Game Wiki texture handler: ${d.message}`),t.headersSent||(t.writeHead(500,{"Content-Type":"text/plain; charset=utf-8"}),t.end("error"))}})(),!0}};var x0=(0,ee.join)(process.env.USERPROFILE||"","Documents","Realmengine","debug.log");function Sr(r){if(!It.enabled("accounts"))return;let e=`[${new Date().toISOString()}] ${r}
`;process.stdout.write(e);try{(0,j.writeFileSync)(x0,e,{flag:"a"})}catch{}}function C0(r){let e=String(r||"").toLowerCase();return e?e.includes("different machine")||e.includes("token for different"):!1}function Sd(r){try{let e=(0,rr.execFileSync)("tasklist",["/FI",`IMAGENAME eq ${r}`,"/FO","CSV","/NH"],{encoding:"utf8",windowsHide:!0}),t=i=>i.replace(/\u00A0/g," ").trim().toLowerCase(),n=t(r);return String(e||"").split(/\r?\n/).map(i=>i.trim()).filter(Boolean).filter(i=>{let s=i.match(/^"([^"]*)"/);return s!==null&&t(s[1])===n}).length}catch(e){return m.warn("DevServer",`Failed to inspect ${r} processes: ${e.message}`),0}}function k0(){if(process.platform!=="win32")return{ok:!1,ran:!1,error:"Windows only."};try{return(0,rr.execFileSync)("taskkill",["/IM","msedge.exe","/F","/T"],{encoding:"utf8",windowsHide:!0,stdio:["ignore","pipe","pipe"]}),{ok:!0,ran:!0}}catch(r){let e=String(r.message||""),t=r?.stderr?String(r.stderr):"",n=`${e} ${t}`;return Sd("msedge.exe")===0?{ok:!0,ran:!1}:(m.warn("DevServer",`kill-msedge: ${n.trim()}`),{ok:!1,ran:!1,error:n.trim()||e})}}var Wi="default",hb="default";function gb(r){let e=Ze(),t=new Set(r),n=e.parkedPids.filter(i=>!t.has(i));n.length!==e.parkedPids.length&&jt({parkedPids:n})}async function yb(){let r=await st(),e=await er(),t=new Set(r.processes.map(p=>p.pid)),n=Ze(),i=n.parkedPids.filter(p=>t.has(p));i.length!==n.parkedPids.length&&(n=jt({parkedPids:i}));let s=new Set(n.parkedPids),o=[...new Set(r.processes.map(p=>p.pid))].sort((p,f)=>p-f),a=new Map,l=new Map,c=new Set,u=xn();for(let p of o){if(c.has(p))continue;let f=await tr(p);for(let g of f)c.add(g),a.set(g,f);let h=Ai(f,e,s);for(let g of f)l.set(g,h)}return{processes:r.processes.map(p=>{let f=l.get(p.pid)??"background",h=a.get(p.pid)??[p.pid];return{...p,role:f,clusterPids:h,trimEligible:u[f].trimEligible}}),logicalProcessors:r.logicalProcessors,foregroundPid:e,clientRolesPath:aa()}}var _0={".html":"text/html",".css":"text/css",".js":"application/javascript",".json":"application/json"},Ma=class r{constructor(e,t,n,i,s){this.publicDir=n;this.worldState=i;this.gameData=s;this.inspector=e,this.inspector.setDefaultMode("summary"),this.pluginManager=t,this.wikiSprites=new Oa(n,()=>this.getRotmgPath(),()=>this.config.rotmgExtractorGameDataPath),this.gameUpdater=new na(()=>this.getRotmgPath(),()=>this.getRunningRotmgExaltProcessCount()>0,a=>this.broadcastGameUpdateStatus(a)),this.lab=new ra,this.inspector.subscribe(a=>{a.captureMode==="full"&&this.lab.capture(a),this.observeTradePacket(a)}),this.lab.on("update",()=>{let a=JSON.stringify({type:"labUpdate",unknowns:this.lab.getUnknowns()});for(let l of this.wss.clients)l.readyState===Q.default.OPEN&&l.send(a)}),this.configPath=(0,ee.join)(n,"..","..","..","data","config.json");try{if((0,j.existsSync)(this.configPath)){let a=JSON.parse((0,j.readFileSync)(this.configPath,"utf8"));this.config={rotmgPath:a.rotmgPath,rotmgExtractorGameDataPath:a.rotmgExtractorGameDataPath,lastPluginConfigId:a.lastPluginConfigId,singleClientOnly:!0}}}catch(a){m.warn("DevServer",`Failed to load config.json: ${a.message}`)}m.log("DevServer",`configPath: ${this.configPath} (exists: ${(0,j.existsSync)(this.configPath)})`);let o=(0,ee.join)(n,"..","..","..","data","servers.json");try{if((0,j.existsSync)(o)){this.servers=JSON.parse((0,j.readFileSync)(o,"utf8")),this.serverNames=Object.keys(this.servers).sort();for(let[a,l]of Object.entries(this.servers))this.ipToServerName[l]=a;m.log("DevServer",`Loaded ${this.serverNames.length} server name mappings`)}}catch(a){m.warn("DevServer",`Failed to load servers.json: ${a.message}`)}this.httpServer=bb.default.createServer((a,l)=>this.handleHttp(a,l)),this.wss=new xu.default({server:this.httpServer}),this.wss.on("connection",a=>this.handleWsConnection(a)),this.pluginManager.onDashboardLog((a,l)=>{let c=JSON.stringify({type:"pluginLog",plugin:a,message:l});for(let u of this.wss.clients)u.readyState===Q.default.OPEN&&u.send(c)}),this.pluginManager.onBroadcastData((a,l,c)=>{let u=JSON.stringify({type:"pluginData",pluginId:a,dataType:l,data:c});for(let d of this.wss.clients)d.readyState===Q.default.OPEN&&d.send(u)}),this.config.lastPluginConfigId=Wi}httpServer;wss;inspector;lab;proxy=null;pluginManager;gameClientConnected=!1;ipToServerName={};detectedGamePath=null;configPath;config={singleClientOnly:!0};wikiSprites;gameUpdater;autoUpdateCheckDone=!1;serverNames=[];servers={};lastSeedToken=null;gameWikiCatalogJson=null;mulingProcess=null;getConfigsDir(){return(0,ee.join)(xe(),"configs")}getActivePluginConfigId(){return this.sanitizeConfigId(this.config.lastPluginConfigId||Wi)}getAccountsFile(){return(0,ee.join)(xe(),"_accounts.json")}getAccountsCacheDir(){return(0,ee.join)(xe(),"Accounts")}getDashboardAccountOverviewCacheFile(e){return(0,ee.join)(this.getAccountsCacheDir(),`${String(e||"").trim()}.json`)}ensureDir(e){(0,j.existsSync)(e)||(0,j.mkdirSync)(e,{recursive:!0})}generateDashboardAccountId(){return`acct-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}normalizeDashboardAccountRecord(e,t=0){let n=Date.now(),i=String(e?.id||"").trim()||`${this.generateDashboardAccountId()}-${t}`,s=Number(e?.createdAt||0)>0?Number(e.createdAt):n,o=Number(e?.updatedAt||0)>0?Number(e.updatedAt):n,a=["none","main","mule"];return{id:i,label:String(e?.label||"").trim(),email:String(e?.email||"").trim(),password:String(e?.password||""),serverName:String(e?.serverName||"USWest").trim()||"USWest",notes:String(e?.notes||""),preferredScriptId:String(e?.preferredScriptId||"").trim(),createdAt:s,updatedAt:o,mulingRole:a.includes(e?.mulingRole)?e.mulingRole:"none",mulingStoreMode:e?.mulingStoreMode==="specific"?"specific":"any",mulingItemsToStore:String(e?.mulingItemsToStore||""),mulingItemsFromMain:String(e?.mulingItemsFromMain||""),mulingItemsToMuleOff:String(e?.mulingItemsToMuleOff||""),proxy:String(e?.proxy||""),proxyUsername:String(e?.proxyUsername||""),proxyPassword:String(e?.proxyPassword||""),isSteam:!!e?.isSteam,steamId:String(e?.steamId||"").trim()}}readDashboardAccounts(){try{let e=xe();this.ensureDir(e);let t=this.getAccountsFile();if(Sr(`readDashboardAccounts: dir="${e}" file="${t}" exists=${(0,j.existsSync)(t)}`),!(0,j.existsSync)(t))return Sr("readDashboardAccounts: file not found, returning []"),[];let n=(0,j.readFileSync)(t,"utf8");Sr(`readDashboardAccounts: raw content (first 200 chars): ${n.slice(0,200)}`);let i=JSON.parse(n),s=Array.isArray(i?.accounts)?i.accounts:[];return Sr(`readDashboardAccounts: parsed ${s.length} account(s)`),s.map((o,a)=>this.normalizeDashboardAccountRecord(o,a))}catch(e){return Sr(`readDashboardAccounts: ERROR: ${e.message}`),m.warn("DevServer",`accounts read failed: ${e.message}`),[]}}writeDashboardAccounts(e){this.ensureDir(xe()),(0,j.writeFileSync)(this.getAccountsFile(),JSON.stringify({accounts:e},null,2),"utf8")}readDashboardAccountOverviewCache(e){try{let t=String(e||"").trim();if(!t)return null;this.ensureDir(this.getAccountsCacheDir());let n=this.getDashboardAccountOverviewCacheFile(t);if(!(0,j.existsSync)(n))return null;let i=JSON.parse((0,j.readFileSync)(n,"utf8"));return!i||typeof i!="object"||!i.overview||typeof i.overview!="object"||!this.isDashboardOverviewCacheComplete(i.overview)?null:{accountId:t,email:String(i.email||"").trim(),updatedAt:Number(i.updatedAt||0)>0?Number(i.updatedAt):Date.now(),overview:i.overview}}catch(t){return m.warn("DevServer",`accounts overview cache read failed for ${e}: ${t.message}`),null}}isDashboardOverviewCacheComplete(e){let t=Array.isArray(e?.characters)?e.characters:[],n=["vault","gifts","temporaryGifts","materialStorage","potions"];return t.every(i=>{let s=Array.isArray(i?.equipment)?i.equipment:[],o=Array.isArray(i?.inventory)?i.inventory:[],a=Array.isArray(i?.backpacks)?i.backpacks:[];return[s,o,a].every(l=>l.every(c=>!!c&&Array.isArray(c.enchantIds)&&Object.prototype.hasOwnProperty.call(c,"uniqueId")))})&&n.every(i=>{let s=e[i];return!!s&&Array.isArray(s.items)})}readAllDashboardAccountOverviewCaches(){let e={};try{this.ensureDir(this.getAccountsCacheDir());let t=(0,j.readdirSync)(this.getAccountsCacheDir()).filter(n=>(0,ee.extname)(n).toLowerCase()===".json");for(let n of t){let i=n.slice(0,-5),s=this.readDashboardAccountOverviewCache(i);s&&(e[i]=s)}}catch(t){m.warn("DevServer",`accounts overview cache list failed: ${t.message}`)}return e}writeDashboardAccountOverviewCache(e,t,n){let i={accountId:String(e||"").trim(),email:String(t||"").trim(),updatedAt:Date.now(),overview:n};return this.ensureDir(this.getAccountsCacheDir()),(0,j.writeFileSync)(this.getDashboardAccountOverviewCacheFile(i.accountId),JSON.stringify(i,null,2),"utf8"),i}deleteDashboardAccountOverviewCache(e){try{let t=String(e||"").trim();if(!t)return;let n=this.getDashboardAccountOverviewCacheFile(t);(0,j.existsSync)(n)&&(0,j.unlinkSync)(n)}catch(t){m.warn("DevServer",`accounts overview cache delete failed for ${e}: ${t.message}`)}}pruneDashboardAccountOverviewCaches(e){try{let t=new Set(e.map(i=>String(i.id||"").trim()).filter(Boolean));this.ensureDir(this.getAccountsCacheDir());let n=(0,j.readdirSync)(this.getAccountsCacheDir()).filter(i=>(0,ee.extname)(i).toLowerCase()===".json");for(let i of n){let s=i.slice(0,-5);t.has(s)||this.deleteDashboardAccountOverviewCache(s)}}catch(t){m.warn("DevServer",`accounts overview cache prune failed: ${t.message}`)}}getObjectDisplayName(e){if(!Number.isFinite(e)||e<0)return"Empty";let t=this.gameData?.getObject(e);return String(t?.displayId||t?.id||"").trim()||`Type ${Math.trunc(e)}`}buildDashboardOverviewItem(e,t){let n=Number.isFinite(e.objectType)?Math.trunc(e.objectType):-1,i=[];if(n>=0&&t instanceof Map){let s=`${n}#${String(e.uniqueId||"").trim()}`,o=`${n}#`,a=t.get(s),l=t.get(o),c=a?.length?String(a.shift()||"").trim():l?.length?String(l.shift()||"").trim():"";i=ub(c)}return{objectType:n,objectTypeHex:md(n),name:this.getObjectDisplayName(n),uniqueId:e.uniqueId,enchantIds:i}}resetSessionStats(){this.sessionStartedAt=0,this.fameSectionStart=null,this.fameAccumulated=0,this.lastKnownFame=0,this.fameInitTimer&&(clearTimeout(this.fameInitTimer),this.fameInitTimer=null)}startFameSegment(){this.fameSectionStart!=null&&(this.fameAccumulated+=Math.max(0,this.lastKnownFame-this.fameSectionStart)),this.fameSectionStart=null,this.fameInitTimer&&(clearTimeout(this.fameInitTimer),this.fameInitTimer=null),this.fameInitTimer=setTimeout(()=>{this.fameInitTimer=null,this.fameSectionStart==null&&(this.fameSectionStart=this.lastKnownFame)},r.FAME_INIT_WAIT_MS)}getSessionStats(e){let t=Date.now();this.sessionStartedAt||(this.sessionStartedAt=t),Number.isFinite(e)&&e>0&&(this.lastKnownFame=e),this.fameSectionStart==null&&Number.isFinite(e)&&e>0&&(this.fameSectionStart=e,this.fameInitTimer&&(clearTimeout(this.fameInitTimer),this.fameInitTimer=null));let n=this.fameSectionStart!=null&&Number.isFinite(e)?Math.max(0,e-this.fameSectionStart):0,i=this.fameAccumulated+n,s=Math.max(0,t-this.sessionStartedAt),o=s>0?i/(s/6e4):0;return{uptimeMs:s,fameGained:i,averageFpm:o}}buildDashboardOverviewItems(e,t,n=!0){let i=e.map(s=>this.buildDashboardOverviewItem(s,t));return n?i:i.filter(s=>Number(s.objectType)>=0)}buildDashboardStorageSection(e,t){let n=[];e.forEach(s=>{n.push(...this.buildDashboardOverviewItems(s,t,!1))});let i=new Set(n.map(s=>Number(s.objectType)).filter(s=>Number.isFinite(s)&&s>=0));return{items:n,totalCount:n.length,uniqueCount:i.size}}async fetchCharListXml(e){let t=new URLSearchParams({do_login:"false",accessToken:e,game_net:"Unity",play_platform:"Unity",game_net_user_id:"",muleDump:"true",__source:"ExaltAccountManager"}).toString();return new Promise(n=>{let i=bd.default.request("https://www.realmofthemadgod.com/char/list",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":Buffer.byteLength(t,"utf8"),"X-Unity-Version":"2019.3.14f1"}},s=>{let o="";s.on("data",a=>{o+=a}),s.on("end",()=>{let a=db(o);if(a){n({error:a});return}if(!o.includes("<Chars")){n({error:`Unexpected char list response${s.statusCode?` (${s.statusCode})`:""}.`});return}n({xml:o})})});i.on("error",s=>{m.error("DevServer",`char/list request failed: ${s.message}`),n({error:"Failed to load character list."})}),i.setTimeout(15e3,()=>{i.destroy(),n({error:"Character list request timed out."})}),i.write(t,"utf8"),i.end()})}async fetchDashboardAccountOverviewRemote(e,t,n,i){let s=Ni();if(!s)return{error:"Client token unavailable."};let o=await this.verifyDecaAccount(t,n,s,i);if("error"in o)return{error:o.error};let a=await this.fetchCharListXml(o.token);if("error"in a)return{error:a.error};let l=this.parseDashboardAccountOverview(t,a.xml);return"error"in l?{error:l.error}:{cache:this.writeDashboardAccountOverviewCache(e,t,l)}}parseDashboardAccountOverview(e,t){try{let s=new wb.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"@_",isArray:g=>g==="Char"||g==="ItemData"}).parse(t)?.Chars;if(!s)return{error:"Character list payload was missing <Chars>."};let o=s.Account??{},a=o.Stats??{},l=Hi(o.UniqueItemInfo),c=Hi(s.UniqueGiftItemInfo??o.UniqueGiftItemInfo),u=Hi(s.UniqueTemporaryGiftItemInfo??o.UniqueTemporaryGiftItemInfo),d=Array.isArray(o.Vault?.Chest)?o.Vault.Chest:o.Vault?.Chest?[o.Vault.Chest]:[],p=Array.isArray(o.MaterialStorage?.Chest)?o.MaterialStorage.Chest:o.MaterialStorage?.Chest?[o.MaterialStorage.Chest]:[],h=(Array.isArray(s.Char)?s.Char:s.Char?[s.Char]:[]).map(g=>{let y=Ce(g.ObjectType),b=Hi(g.UniqueItemInfo),S=Math.max(0,Ce(g.BackpackSlots)),E=Math.max(0,Math.min(8,Math.floor(S/8))),I=Vr(g.Equipment,12+E*8),O=I.slice(0,4),H=I.slice(4,12),W=I.slice(12);return{charId:Ce(g["@_id"]),classType:y,classTypeHex:md(y),className:this.getObjectDisplayName(y),level:Ce(g.Level),exp:Ce(g.Exp),fame:Ce(g.CurrentFame),seasonal:hd(g.Seasonal),dead:hd(g.Dead),hp:Ce(g.HitPoints),maxHp:Ce(g.MaxHitPoints),mp:Ce(g.MagicPoints),maxMp:Ce(g.MaxMagicPoints),attack:Ce(g.Attack),defense:Ce(g.Defense),speed:Ce(g.Speed),dexterity:Ce(g.Dexterity),vitality:Ce(g.HpRegen),wisdom:Ce(g.MpRegen),equipment:this.buildDashboardOverviewItems(O,b,!0),inventory:this.buildDashboardOverviewItems(H,b,!0),backpacks:this.buildDashboardOverviewItems(W,b,!0)}});return h.sort((g,y)=>y.level-g.level||y.fame-g.fame||g.className.localeCompare(y.className)||g.charId-y.charId),{accountName:String(o.Name||"").trim()||e,totalFame:Ce(a.TotalFame),aliveFame:Ce(a.Fame),bestCharFame:Ce(a.BestCharFame??a.BestFame),maxNumChars:Ce(o.MaxNumChars),characters:h,vault:this.buildDashboardStorageSection(d.map(g=>Vr(g,0)),l),gifts:this.buildDashboardStorageSection([Vr(o.Gifts,0)],c),temporaryGifts:this.buildDashboardStorageSection([Vr(o.TemporaryGifts,0)],u),materialStorage:this.buildDashboardStorageSection(p.map(g=>Vr(g,0)),l),potions:this.buildDashboardStorageSection([Vr(o.Potions,0)],l)}}catch(n){return m.warn("DevServer",`char/list parse failed: ${n.message}`),{error:"Failed to parse character list."}}}sanitizeConfigId(e){return e.trim().replace(/[<>:"/\\|?*\x00-\x1f]/g,"").replace(/\s+/g,"-").toLowerCase()||`config-${Date.now()}`}buildPluginConfigSnapshot(e){let t=Date.now(),n=this.pluginManager.getPlugins().map(i=>{let s={};for(let o of i.settings||[])o.type!=="button"&&(s[o.key]=o.value);return{id:i.id,enabled:!!i.enabled,hotkey:String(i.hotkey||""),settings:s}});return{id:this.sanitizeConfigId(e),name:e.trim()||"Unnamed Config",createdAt:t,updatedAt:t,plugins:n}}autosaveTimer=null;writeAutosaveSnapshot(){if(this.getActivePluginConfigId()===Wi)try{let e=this.buildPluginConfigSnapshot(hb),t=this.getConfigsDir();this.ensureDir(t);let n=(0,ee.join)(t,e.id+".json");if((0,j.existsSync)(n)){try{let i=JSON.parse((0,j.readFileSync)(n,"utf8"));Number(i.createdAt)>0&&(e.createdAt=Number(i.createdAt))}catch{}e.updatedAt=Date.now()}(0,j.writeFileSync)(n,JSON.stringify(e,null,2),"utf8"),this.config.lastPluginConfigId=e.id,this.saveConfig(),this.broadcastConfig()}catch(e){m.warn("DevServer",`autosave failed: ${e.message}`)}}scheduleAutosave(){this.getActivePluginConfigId()===Wi&&(this.autosaveTimer&&clearTimeout(this.autosaveTimer),this.autosaveTimer=setTimeout(()=>{this.autosaveTimer=null,this.writeAutosaveSnapshot()},800))}applyPluginConfigSnapshot(e){if(!e||!Array.isArray(e.plugins))return{ok:!1,message:"Invalid config format: plugins[] is required."};let t=this.pluginManager.getPlugins();for(let n of e.plugins){if(!n||typeof n.id!="string")continue;let i=t.find(o=>o.id===n.id),s=new Map;for(let o of i?.settings||[])s.set(String(o.key),{type:String(o.type||"")});if(typeof n.enabled=="boolean"&&this.pluginManager.togglePlugin(n.id,n.enabled),typeof n.hotkey=="string"){let o=this.pluginManager.updatePluginHotkey(n.id,n.hotkey);o.ok||m.warn("DevServer",`Skipped hotkey for ${n.id}: ${o.reason||"invalid hotkey"}`)}if(n.settings&&typeof n.settings=="object")for(let[o,a]of Object.entries(n.settings))s.get(String(o))?.type!=="button"&&this.pluginManager.updateSetting(n.id,o,a)}return this.broadcastPluginState(),this.syncPluginHotkeysToDll(),{ok:!0,message:`Loaded config "${String(e.name||e.id||"config")}".`}}tryAutoLoadDefaultPluginConfig(){try{let e=Wi,t=(0,ee.join)(this.getConfigsDir(),e+".json");if(!(0,j.existsSync)(t)){this.ensureDir(this.getConfigsDir());let o=this.buildPluginConfigSnapshot(hb);(0,j.writeFileSync)(t,JSON.stringify(o,null,2),"utf8"),this.config.lastPluginConfigId=o.id,this.saveConfig(),this.broadcastConfig(),m.log("DevServer","Initialized default plugin config");return}let n=(0,j.readFileSync)(t,"utf8"),i=JSON.parse(n),s=this.applyPluginConfigSnapshot(i);if(!s.ok){m.warn("DevServer",`Auto-load config failed: ${s.message}`);return}this.config.lastPluginConfigId=e,this.saveConfig(),this.broadcastConfig(),m.log("DevServer",`Auto-loaded plugin config: ${e}`)}catch(e){m.warn("DevServer",`Auto-load config error: ${e.message}`)}}playerDataIntervalStop=null;runtimeScheduler=new oa;currentClient=null;connectedClients=new Map;disconnectTimer=null;sessionStartedAt=0;fameSectionStart=null;fameAccumulated=0;lastKnownFame=0;fameInitTimer=null;fameResetTimer=null;static DISCONNECT_GRACE_MS=3e3;static FAME_INIT_WAIT_MS=5e3;static FAME_RESET_MS=12e4;tradeSession={active:!1,ourSlotCount:12,partnerSlotCount:12,ourOffer:[],partnerOffer:[],partnerOfferFromTradeChanged:[],partnerName:""};scriptHost;bridgeClientRef=null;focusedInspectorClientId=null;setBridgeClientRef(e){this.bridgeClientRef=e}internalBridge=null;lastUnresolvedClasses=null;setInternalBridge(e){this.internalBridge=e,e.on("authenticated",()=>{this.broadcastInternalState(),this.syncPluginHotkeysToDll()}),e.on("disconnected",()=>this.broadcastInternalState()),e.on("unresolvedClasses",t=>{this.lastUnresolvedClasses=t,this.broadcastUnresolvedClasses(t)})}getEffectivePlayerPos(){return this.currentClient?.playerData?.pos??null}attachProxy(e){this.proxy=e,e.on("clientConnected",t=>{let n=this.currentClient?.clientId?String(this.currentClient.clientId):null,i=this.gameClientConnected;this.disconnectTimer&&(clearTimeout(this.disconnectTimer),this.disconnectTimer=null),this.fameResetTimer&&(clearTimeout(this.fameResetTimer),this.fameResetTimer=null),this.gameClientConnected=!0,i||(this.sessionStartedAt=0,this.startFameSegment()),this.currentClient=t;let s=t.clientId||"default";this.connectedClients.set(s,t),this.inspector.setClientMode(s,"full"),n&&n!==s&&this.inspector.setClientMode(n,"summary"),this.focusedInspectorClientId=s,this.bridgeClientRef&&(this.bridgeClientRef.current=t),this.broadcastGameClientState(),this.broadcastClientList()}),e.on("clientDisconnected",t=>{let n=t?.clientId||"default";if(this.connectedClients.delete(n),this.inspector.clearClientMode(n),this.currentClient===t&&(this.currentClient=null),this.focusedInspectorClientId===n){let i=this.connectedClients.values().next().value,s=i?.clientId?String(i.clientId):null;this.focusedInspectorClientId=s,s&&this.inspector.setClientMode(s,"full")}this.bridgeClientRef&&this.bridgeClientRef.current===t&&(this.bridgeClientRef.current=void 0),this.resetTradeSession(),this.disconnectTimer&&clearTimeout(this.disconnectTimer),this.disconnectTimer=setTimeout(()=>{if(this.disconnectTimer=null,this.connectedClients.size===0){if(this.gameClientConnected=!1,this.fameSectionStart!=null){let i=Math.max(0,this.lastKnownFame-this.fameSectionStart);this.fameAccumulated+=i}this.fameSectionStart=null,this.fameInitTimer&&(clearTimeout(this.fameInitTimer),this.fameInitTimer=null),this.sessionStartedAt=0,this.fameResetTimer&&clearTimeout(this.fameResetTimer),this.fameResetTimer=setTimeout(()=>{this.fameResetTimer=null,this.fameAccumulated=0,this.lastKnownFame=0},r.FAME_RESET_MS)}this.broadcastGameClientState(),this.broadcastClientList()},r.DISCONNECT_GRACE_MS)}),this.playerDataIntervalStop=this.runtimeScheduler.scheduleRepeating(500,()=>{if(this.connectedClients.size>1&&this.broadcastClientList(),this.currentClient?.playerData){let t=this.currentClient.playerData,n=this.currentClient.clientId||"default",i=this.getSessionStats(t.currentFame),s=this.currentClient.state?.conTargetAddress||"",o=this.ipToServerName[s]||s,a=this.worldState?.getEntityType(this.currentClient.objectId??0),l=Number.isFinite(Number(a))&&Number(a)>0?Math.trunc(Number(a)):Number.isFinite(Number(t.classType))&&Number(t.classType)>0?Math.trunc(Number(t.classType)):null,c=null,u=t.questObjectId,d=typeof u=="number"&&Number.isFinite(u)?Math.trunc(u):Number.isFinite(Number(u))?Math.trunc(Number(u)):NaN;if(Number.isFinite(d)&&d>0&&this.worldState){let E=this.worldState.resolveQuestTargetObjectType(d,this.gameData);E!=null&&E>0&&(c=E)}let p=t.vitality+t.vitalityBonus+t.exaltedVitality,f=t.wisdom+t.wisdomBonus+t.exaltedWisdom,h=Math.round(2*(1+.12*p)*10)/10,g=Math.round(f/10*10)/10,y=Object.keys(zi).filter(E=>t.hasConditionEffect(E)),b=this.getEffectivePlayerPos(),S=JSON.stringify({type:"playerData",clientId:n,name:t.name||"",classType:t.classType,skin:t.skin,tex1:t.tex1,tex2:t.tex2,sessionUptimeMs:i.uptimeMs,sessionFameGained:i.fameGained,sessionAverageFpm:Math.round(i.averageFpm*10)/10,gameId:this.currentClient.state?.gameId??null,objectId:this.currentClient.objectId??null,objectType:l,level:t.level,hp:t.health,maxHp:t.maxHealth,mana:t.mana,maxMana:t.maxMana,healthBonus:t.healthBonus,manaBonus:t.manaBonus,hpRegenPerSec:h,mpRegenPerSec:g,attack:t.attack,attackBonus:t.attackBonus,exaltedAttack:t.exaltedAttack,defense:t.defense,defenseBonus:t.defenseBonus,exaltedDefense:t.exaltedDefense,speed:t.speed,speedBonus:t.speedBonus,exaltedSpeed:t.exaltedSpeed,dexterity:t.dexterity,dexterityBonus:t.dexterityBonus,exaltedDexterity:t.exaltedDexterity,vitality:t.vitality,vitalityBonus:t.vitalityBonus,exaltedVitality:t.exaltedVitality,wisdom:t.wisdom,wisdomBonus:t.wisdomBonus,exaltedWisdom:t.exaltedWisdom,exaltedMaxHP:t.exaltedMaxHP,exaltedMaxMP:t.exaltedMaxMP,stars:t.stars,fame:t.currentFame,guild:t.guildName||"",pos:b??t.pos,map:t.mapName,questObjectId:t.questObjectId,questTargetObjectType:c,server:o,hpPct:t.health/Math.max(1,t.maxHealth||1),mpPct:t.mana/Math.max(1,t.maxMana||1),teleportAllowed:!!t.teleportAllowed,hasBackpack:!!t.hasBackpack,backpackTier:t.backpackTier,hasBackpackExtender:t.hasBackpackExtender,inventory:Array.isArray(t.inventory)?t.inventory.slice():[],backpack:Array.isArray(t.backpack)?t.backpack.slice():[],conditionEffects:y});for(let E of this.wss.clients)E.readyState===Q.default.OPEN&&E.send(S)}})}setDetectedGamePath(e){this.detectedGamePath=e}getRotmgPath(){return this.config.rotmgPath||this.detectedGamePath}isSingleClientOnlyEnabled(){return this.config.singleClientOnly!==!1}getRunningProcessCount(e){return Sd(e)}getRunningRotmgExaltProcessCount(){return this.getRunningProcessCount("RotMG Exalt.exe")}terminateProcessByImageName(e){try{return(0,rr.execFileSync)("taskkill",["/IM",e,"/F"],{encoding:"utf8",windowsHide:!0}),!0}catch(t){return Sd(e)===0||m.warn("DevServer",`Failed to terminate ${e}: ${String(t.message||"")}`),!1}}getSingleClientLaunchBlockError(){return!this.isSingleClientOnlyEnabled()||this.getRunningRotmgExaltProcessCount()<1?null:"Close the existing RotMG Exalt process and launch again. We only support 1 account at a time right now, but later multiple accounts with proxies will be supported."}ensureSteamAppIdFile(e){try{let t=null,n=e;for(let a=0;a<6;a++){let l=(0,ee.dirname)(n);if(!l||l===n)break;if((0,ee.basename)(n).toLowerCase()==="common"&&(0,ee.basename)(l).toLowerCase()==="steamapps"){t=l;break}n=l}if(!t)return;let i=(0,ee.join)(e,"steam_appid.txt");if((0,j.existsSync)(i))return;let s=(0,ee.basename)(e).toLowerCase(),o=null;for(let a of(0,j.readdirSync)(t)){let l=/^appmanifest_(\d+)\.acf$/i.exec(a);if(!l)continue;let u=(0,j.readFileSync)((0,ee.join)(t,a),"utf8").match(/"installdir"\s+"([^"]+)"/i)?.[1]?.trim().toLowerCase();if(u&&u===s){o=l[1];break}}if(!o){m.warn("DevServer",`Steam install detected but no appmanifest matched "${(0,ee.basename)(e)}"; skipping steam_appid.txt.`);return}(0,j.writeFileSync)(i,o,"utf8"),m.log("DevServer",`Wrote steam_appid.txt (AppID ${o}) for Steam-build direct launch.`)}catch(t){m.warn("DevServer",`ensureSteamAppIdFile failed: ${t.message}`)}}launchGame(){let e=this.getSingleClientLaunchBlockError();if(e)return{ok:!1,error:e};let t=this.getRotmgPath();if(!t)return{ok:!1,error:"RotMG path not configured and auto-detection failed."};let n=(0,ee.join)(t,"RotMG Exalt.exe");if(!(0,j.existsSync)(n))return{ok:!1,error:`RotMG Exalt.exe not found at: ${n}`};this.ensureSteamAppIdFile(t);try{return(0,rr.spawn)(n,[],{cwd:t,detached:!0,stdio:"ignore"}).unref(),m.log("DevServer",`Launched RotMG from: ${n}`),{ok:!0}}catch(i){let s=i.message;return m.error("DevServer",`Failed to launch RotMG: ${s}`),{ok:!1,error:s}}}async verifyDecaAccount(e,t,n,i){let s=await this.verifyDecaAccountOnce(e,t,n,i);if(!("error"in s))return s;if(s.transport||!C0(s.rawError))return{error:s.error};let o=Ni({skipFile:!0});if(!o||o===n)return{error:s.error};m.log("DevServer","account/verify rejected HWID; retrying once with fresh WMI HWID (bypassing hwid.txt).");let a=await this.verifyDecaAccountOnce(e,t,o,i);if(!("error"in a)){let l=Au();return m.log("DevServer",`Fresh-HWID verify succeeded${l?"; removed stale hwid.txt":""}.`),a}return{error:a.error}}async verifyDecaAccountOnce(e,t,n,i){let s=String(i?.steamId||"").trim(),o=!!i&&s!=="",a=new URLSearchParams(o?{guid:e,secret:t,steamid:s,clientToken:n,game_net:"Unity_steam",play_platform:"Unity_steam",game_net_user_id:s}:{guid:e,password:t,clientToken:n,game_net:"Unity",play_platform:"Unity",game_net_user_id:""}).toString();return new Promise(l=>{let c=bd.default.request("https://www.realmofthemadgod.com/account/verify",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":Buffer.byteLength(a,"utf8"),"X-Unity-Version":"2019.3.14f1"}},u=>{let d="";u.on("data",p=>{d+=p}),u.on("end",()=>{let p=fb(d);if(p){l(p);return}let f=(d.match(/<Error>([^<]*)<\/Error>/i)?.[1]??"").trim();if(!f){let h=u.statusCode??0,g=d.replace(/\s+/g," ").trim().slice(0,200);m.warn("DevServer",`account/verify unrecognized response (HTTP ${h})${o?" [steam]":""}: ${g||"<empty body>"}`),l({error:`Login failed \u2014 unexpected server response (HTTP ${h}). ${g?`Response: ${g}`:"Empty response body."}`,rawError:""});return}l({error:gd(d),rawError:f})})});c.on("error",u=>{m.error("DevServer",`account/verify request failed: ${u.message}`),l({error:"Network error. Try again.",rawError:"",transport:!0})}),c.setTimeout(15e3,()=>{c.destroy(),l({error:"Request timed out.",rawError:"",transport:!0})}),c.write(a,"utf8"),c.end()})}clampLaunchWindowSize(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,Math.round(e))):t}buildCredentialLaunchWindowExtras(e){let t=e?.windowRect;if(t&&Number.isFinite(t.width)&&Number.isFinite(t.height)){let n=this.clampLaunchWindowSize(t.width,320,7680),i=this.clampLaunchWindowSize(t.height,240,4320),s=this.clampLaunchWindowSize(t.x,-32e3,32e3),o=this.clampLaunchWindowSize(t.y,-32e3,32e3);return["-screen-fullscreen","0","-screen-width",String(n),"-screen-height",String(i),"-screen-x",String(s),"-screen-y",String(o),"-popupwindow","-nolog"]}return e?.compactWindow?["-screen-fullscreen","0","-screen-width","640","-screen-height","360","-popupwindow","-nolog"]:[]}async launchGameWithCredentials(e,t,n,i){let s=this.getSingleClientLaunchBlockError();if(s)return{ok:!1,error:s};let o=this.getRotmgPath();if(!o)return{ok:!1,error:"RotMG path not configured and auto-detection failed."};let a=(0,ee.join)(o,"RotMG Exalt.exe");if(!(0,j.existsSync)(a))return{ok:!1,error:`RotMG Exalt.exe not found at: ${a}`};let l=Ni();if(!l)return{ok:!1,error:"Client token unavailable."};let c=String(i?.steamId||"").trim();if(i?.isSteam&&!c)return{ok:!1,error:"Steam ID is required for Steam accounts."};let u=i?.isSteam?{steamId:c}:void 0,d=await this.verifyDecaAccount(e,t,l,u);if("error"in d)return{ok:!1,error:d.error};let{token:p,tokenTimestamp:f,tokenExpiration:h}=d,g=E=>Buffer.from(E,"utf8").toString("base64"),y=`data:{platform:Deca,guid:${g(e)},token:${g(p)},tokenTimestamp:${g(f)},tokenExpiration:${g(h)},env:4,serverName:${n}}`,b=this.buildCredentialLaunchWindowExtras(i),S=new Date().toISOString();this.ensureSteamAppIdFile(o);try{let E=(0,rr.spawn)(a,[y,...b],{cwd:o,detached:!0,stdio:"ignore"});E.unref();let I=i?.windowRect,O=typeof E.pid=="number"?E.pid:-1;O>0&&tb({launcherPid:O,accountId:i?.accountId??null,accountLabel:i?.accountLabel??null,email:e}),I&&process.platform==="win32"&&O>0&&window.setTimeout(()=>{Yy(O,I,{email:e,launchedAtIso:S}).then(W=>{W.ok?m.log("DevServer",`Positioned credential launch window via Win32 (launcher PID ${O}, ${I.width}\xD7${I.height} @ ${I.x},${I.y})`):m.warn("DevServer",`Post-launch window move failed (launcher PID ${O}). ${W.debug??""}`.slice(0,2e3))})},500);let H=I?` (${I.width}\xD7${I.height} @ ${I.x},${I.y})`:i?.compactWindow?" (640\xD7360 compact)":"";return m.log("DevServer",`Launched RotMG with credentials${H} from: ${a}`),{ok:!0}}catch(E){let I=E.message;return m.error("DevServer",`Failed to launch RotMG: ${I}`),{ok:!1,error:I}}}saveConfig(){try{(0,j.writeFileSync)(this.configPath,JSON.stringify(this.config,null,2),"utf8")}catch(e){m.warn("DevServer",`Failed to save config: ${e.message}`)}}buildConfigMessage(){return JSON.stringify({type:"config",rotmgPath:this.getRotmgPath()||"",rotmgPathSource:this.config.rotmgPath?"custom":this.detectedGamePath?"auto":"none",rotmgExtractorGameDataPath:(this.config.rotmgExtractorGameDataPath||"").trim(),singleClientOnly:this.isSingleClientOnlyEnabled(),pluginConfigId:this.config.lastPluginConfigId||"",serverNames:this.serverNames})}broadcastConfig(){let e=this.buildConfigMessage();for(let t of this.wss.clients)t.readyState===Q.default.OPEN&&t.send(e)}broadcastGameUpdateStatus(e){let t=JSON.stringify({type:"gameUpdateStatus",status:e});for(let n of this.wss.clients)n.readyState===Q.default.OPEN&&n.send(t)}broadcastInternalState(){let e=JSON.stringify({type:"internalState",connected:this.internalBridge?.isConnected??!1});for(let t of this.wss.clients)t.readyState===Q.default.OPEN&&t.send(e)}broadcastUnresolvedClasses(e){let t=JSON.stringify({type:"unresolvedClasses",classes:e});for(let n of this.wss.clients)n.readyState===Q.default.OPEN&&n.send(t)}broadcastGameClientState(){let e=JSON.stringify({type:"gameClient",connected:this.gameClientConnected});for(let t of this.wss.clients)t.readyState===Q.default.OPEN&&t.send(e)}broadcastClientList(){let e=Array.from(this.connectedClients.entries()).map(([n,i])=>{let s=i.playerData,o=i.state?.conTargetAddress||"";return{clientId:n,name:s?.name||"",classType:s?.classType??null,skin:s?.skin??null,tex1:s?.tex1??null,tex2:s?.tex2??null,hp:s?.health??0,maxHp:s?.maxHealth??1,guild:s?.guildName||"",server:this.ipToServerName[o]||o||"--"}}),t=JSON.stringify({type:"clientList",clients:e});for(let n of this.wss.clients)n.readyState===Q.default.OPEN&&n.send(t)}start(e=3e3){this.httpServer.listen(e,()=>{m.log("DevServer",`Dashboard available at http://localhost:${e}`),this.applyExaltTuneOnProxyStartMaybe().finally(()=>{Ur(),ib({getRss:()=>process.memoryUsage().rss,getPacketRate:()=>this.inspector.getRate(),trimProxyMemory:t=>this.trimProxyMemorySmart(t)})})})}trimProxyMemorySmart(e){if(e.trimPackets&&this.inspector.clearBuffer(),e.trimPacketLab&&this.lab.clear(),e.trimWorldSnapshot&&this.worldState&&this.worldState.clear(),!e.runGcHint)return;let t=global;if(typeof t.gc=="function")try{t.gc()}catch{}}async applyExaltTuneOnProxyStartMaybe(){try{let e=et();if(!e.autoApplyOnProxyStart||!(await te()).ok)return;await ab();let n=String(e.startupPowerGuid??"").trim();n&&await Ft(n)}catch(e){m.warn("DevServer",`exaltTune autoApply: ${e.message}`)}}stop(){sb(),ld(),this.playerDataIntervalStop?.(),this.playerDataIntervalStop=null,this.runtimeScheduler.stop();try{et().restoreProcessBaselineOnExit&&ya().catch(()=>{})}catch{}this.wss.close(),this.httpServer.close()}pingAllServers(){let n=Object.entries(this.servers);return Promise.all(n.map(([i,s])=>new Promise(o=>{let a=Date.now(),l=new Sb.default.Socket,c=u=>{try{l.destroy()}catch{}o([i,u])};l.setTimeout(3e3,()=>c(-1)),l.once("error",()=>c(-1)),l.once("connect",()=>c(Date.now()-a)),l.connect(2050,s)}))).then(i=>{let s={};return i.forEach(([o,a])=>{a>=0&&(s[o]=a)}),s})}handleHttp(e,t){if(this.wikiSprites.tryServeWikiTextureFile(e,t))return;if(e.url==="/api/plugins"&&e.method==="GET"){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(this.pluginManager.getPlugins()));return}if(e.url?.startsWith("/api/plugins/")&&e.method==="POST"){let f=e.url.split("/"),h=f[3],g=f[4],y="";e.on("data",b=>y+=b),e.on("end",()=>{let b=g==="enable",S=this.pluginManager.togglePlugin(h,b);t.writeHead(S?200:404,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:S,pluginId:h,enabled:b}))});return}if(e.url==="/api/recent"&&e.method==="GET"){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(this.inspector.getRecent()));return}if(e.url==="/api/damage/encounters"&&e.method==="GET"){let f=this.pluginManager.getPluginData("damage-sniffer","encounterHistory")||[];t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(f));return}if(e.url==="/api/lab/definitions"&&e.method==="GET"){try{let f=Ey,h=Ty,g=Py,y=Object.entries(f.packets||{}).map(([b,S])=>({key:`id:${b}`,id:parseInt(b,10),name:S.name,direction:S.direction,fields:S.fields||[],status:g[b]==="needsWork"?"needsWork":"working"}));for(let b of h.packets||[])y.push({key:`name:${b.direction}:${b.name}`,id:typeof b.id=="number"?b.id:null,name:b.name,direction:b.direction,fields:[],status:"needsWork"});t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({packets:y,dataObjects:f.dataObjects||{}}))}catch(f){m.warn("DevServer",`Failed to load lab definitions: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to load definitions"}))}return}if(e.url==="/api/lab/unknowns"&&e.method==="GET"){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(this.lab.getUnknowns()));return}if(e.url?.startsWith("/api/lab/analyze/")&&e.method==="GET"){let f=parseInt(e.url.slice(17),10),h=this.lab.analyze(f);h?(t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(h))):(t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:`No data for packet id ${f}`})));return}if(e.url==="/api/lab/probe"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let{id:h,spec:g}=JSON.parse(f),y=this.lab.probe(Number(h),String(g??""));t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:h.message}))}});return}if(e.url==="/api/ping-all"&&e.method==="GET"){this.pingAllServers().then(f=>{t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}).catch(f=>{m.warn("DevServer",`ping-all failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Ping failed"}))});return}if(e.url==="/api/admin/memory"&&e.method==="GET"){let f=process.memoryUsage();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({rss:f.rss,heapUsed:f.heapUsed,heapTotal:f.heapTotal,external:f.external,arrayBuffers:f.arrayBuffers}));return}if(e.url==="/api/admin/memory/trim"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=f?JSON.parse(f):{},g=h.packets!==!1,y=h.packetLab!==!1,b=h.worldSnapshot===!0,S=typeof global.gc=="function";this.trimProxyMemorySmart({trimPackets:g,trimPacketLab:y,trimWorldSnapshot:b,runGcHint:!0});let E=!!S,I=process.memoryUsage();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,did:{packets:g,packetLab:y,worldSnapshot:b},gcHint:E===!1?"Start node with --expose-gc for optional GC.":E,memory:I}))}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/smart-trim/settings"&&e.method==="GET"){try{let f=yr();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,settings:f,settingsPath:Hu()}))}catch(f){m.warn("DevServer",`smart-trim settings GET: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}return}if(e.url==="/api/admin/smart-trim/settings"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=da(h);Nn(),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,settings:g}))}catch(h){m.warn("DevServer",`smart-trim settings POST: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/smart-trim/exalt-once"&&e.method==="POST"){ob({manual:!0}).then(f=>{t.writeHead(f.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}).catch(f=>{m.warn("DevServer",`smart-trim exalt-once: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/settings"&&e.method==="GET"){try{let f=et();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,settings:f,settingsPath:ju()}))}catch(f){m.warn("DevServer",`window-tuning settings GET: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}return}if(e.url?.startsWith("/api/admin/window-tuning/tune-status")&&e.method==="GET"){(async()=>{try{let f=et(),h=await te(),g=new URL(e.url||"/api/admin/window-tuning/tune-status","http://127.0.0.1"),b=g.searchParams.get("thermalSample")==="1"||g.searchParams.get("thermalSample")==="true"?await _a():void 0;t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,supported:!!h.ok,reason:h.ok?void 0:h.reason,tuningPreset:f.tuningPreset??null,watchdogEnabled:!!f.watchdog.enabled,thermalEnabled:!!f.thermal.enabled,thermalBackgroundDemotionActive:Li(),thermalSample:b}))}catch(f){m.warn("DevServer",`window-tuning tune-status GET: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}})();return}if(e.url==="/api/admin/window-tuning/settings"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=vn(h);Ur(),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,settings:g}))}catch(h){m.warn("DevServer",`window-tuning settings POST: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/window-tuning/supported"&&e.method==="GET"){te().then(f=>{t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}).catch(f=>{t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,reason:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/power-hints"&&e.method==="GET"){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({hints:Vy}));return}if(e.url==="/api/admin/window-tuning/exalt-processes"&&e.method==="GET"){yb().then(f=>{t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,...f}))}).catch(f=>{m.warn("DevServer",`exalt-processes: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/power-plans"&&e.method==="GET"){Ca().then(f=>{t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,plans:f}))}).catch(f=>{m.warn("DevServer",`power-plans: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/power-plan"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.guid??"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"guid required"}));return}Ft(g).then(y=>{t.writeHead(y.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}).catch(y=>{m.warn("DevServer",`power-plan POST: ${y.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(y.message||y)}))})}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/window-tuning/exalt-priority"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.preset||"");if(!new Set(["Idle","BelowNormal","Normal","AboveNormal","High"]).has(g)){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"preset must be Idle|BelowNormal|Normal|AboveNormal|High"}));return}xa(g).then(b=>{t.writeHead(b.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(b))}).catch(b=>{m.warn("DevServer",`exalt-priority POST: ${b.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(b.message||b)}))})}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/window-tuning/spread-cores"&&e.method==="POST"){ed().then(f=>{t.writeHead(f.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}).catch(f=>{m.warn("DevServer",`spread-cores POST: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/client-roles/apply"&&e.method==="POST"){(async()=>{try{let h=(await yb()).foregroundPid,g=new Set(Ze().parkedPids),y=await In(h,g);t.writeHead(y.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}catch(f){m.warn("DevServer",`window-tuning client-roles apply: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}})();return}if(e.url==="/api/admin/window-tuning/multibox-action"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{(async()=>{try{let h=JSON.parse(f||"{}"),g=Math.floor(Number(h.pid)),y=String(h.action||"").trim().toLowerCase();if(!Number.isFinite(g)||g<=0){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"pid required"}));return}let b=await tr(g),S=Math.min(...b);if(y==="park"){let E=Ze(),I=[...new Set([...E.parkedPids,...b])];jt({parkedPids:I});let O=await ka(S,"parked",0);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:O.ok,error:O.error,pids:O.pids,action:"park"}));return}if(y==="activate"||y==="active"){gb(b);for(let I of[...b].sort((O,H)=>H-O))await Ky(I);let E=await ka(S,"active",0);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:E.ok,error:E.error,pids:E.pids,action:"activate"}));return}if(y==="background"){gb(b);let E=await ka(S,"background",0);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:E.ok,error:E.error,pids:E.pids,action:"background"}));return}if(y==="trim"){let E=await _n(b);t.writeHead(E.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify({...E,action:"trim"}));return}if(y==="resize"||y==="restore"){let E=await Qy(g);t.writeHead(E.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify({...E,action:"resize"}));return}t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"action must be park|activate|background|trim|resize"}))}catch(h){m.warn("DevServer",`multibox-action: ${h.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(h.message||h)}))}})()});return}if(e.url==="/api/admin/window-tuning/tuning-preset"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{(async()=>{try{let h=JSON.parse(f||"{}"),g=String(h.preset||"").trim(),y=g.toLowerCase(),b={safe:"safe",balanced:"balanced",multibox:"multibox",aggressive:"aggressive",lowheat:"lowHeat",lowHeat:"lowHeat"},S=b[g]??b[y];if(!S){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"preset must be safe|balanced|multibox|aggressive|lowHeat"}));return}pa(S),Nn(),Ur();let E=await te();if(!E.ok){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,appliedLive:!1,reason:E.reason,slots:[]}));return}let I=await pd();t.writeHead(I.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!!I.ok,appliedLive:!!I.ok,error:I.error,slots:I.slots||[]}))}catch(h){m.warn("DevServer",`tuning-preset: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(h.message||h)}))}})()});return}if(e.url==="/api/admin/window-tuning/run-multibox-policy"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{(async()=>{try{let h={};(f||"").trim()&&(h=JSON.parse(f));let g=await cb(h);t.writeHead(g.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(g))}catch(h){m.warn("DevServer",`run-multibox-policy: ${h.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(h.message||h)}))}})()});return}if(e.url==="/api/admin/window-tuning/restore-all"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{(async()=>{try{let h=!1;(f||"").trim()&&(h=!!JSON.parse(f).balancedPowerPlan);let g=await lb({activateBalancedPowerPlan:h});t.writeHead(g.ok?200:500,{"Content-Type":"application/json"}),t.end(JSON.stringify(g))}catch(h){m.warn("DevServer",`restore-all: ${h.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(h.message||h)}))}})()});return}if(e.url==="/api/admin/window-tuning/restore-process-baseline"&&e.method==="POST"){(async()=>{try{let f=await ya();t.writeHead(f.ok?200:500,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}catch(f){m.warn("DevServer",`restore-process-baseline: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}})();return}if(e.url==="/api/admin/window-tuning/recapture-process-baseline"&&e.method==="POST"){(async()=>{try{let f=await Ju();t.writeHead(f.ok?200:500,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}catch(f){m.warn("DevServer",`recapture-process-baseline: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}})();return}if(e.url==="/api/admin/window-tuning/kill-msedge"&&e.method==="POST"){(async()=>{try{let f=k0();t.writeHead(f.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}catch(f){m.warn("DevServer",`kill-msedge: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,ran:!1,error:String(f.message||f)}))}})();return}let n=xe(),i=this.getConfigsDir(),s=()=>this.ensureDir(n),o=()=>this.ensureDir(i);if(e.url==="/api/configs"&&e.method==="GET"){try{s(),o();let f=(0,j.readdirSync)(i).filter(g=>(0,ee.extname)(g)===".json"),h=[];for(let g of f)try{let y=(0,j.readFileSync)((0,ee.join)(i,g),"utf8"),b=JSON.parse(y),S=String(b.id||g.replace(/\.json$/i,"")),E=String(b.name||S),I=Number(b.updatedAt||0)||0,O=Number(b.createdAt||0)||0;h.push({id:S,name:E,updatedAt:I,createdAt:O})}catch{}h.sort((g,y)=>(y.updatedAt||0)-(g.updatedAt||0)||g.name.localeCompare(y.name)),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({configs:h}))}catch(f){m.warn("DevServer",`configs list failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to list configs"}))}return}if(e.url==="/api/configs/save"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.name||"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Config name is required."}));return}s(),o();let y=this.buildPluginConfigSnapshot(g),b=(0,ee.join)(i,y.id+".json");if((0,j.existsSync)(b)){try{let S=(0,j.readFileSync)(b,"utf8"),E=JSON.parse(S);Number(E.createdAt)>0&&(y.createdAt=Number(E.createdAt))}catch{}y.updatedAt=Date.now()}(0,j.writeFileSync)(b,JSON.stringify(y,null,2),"utf8"),this.config.lastPluginConfigId=y.id,this.saveConfig(),this.broadcastConfig(),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,config:{id:y.id,name:y.name,createdAt:y.createdAt,updatedAt:y.updatedAt}}))}catch(h){m.warn("DevServer",`configs save failed: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to save config"}))}});return}if(e.url==="/api/configs/load"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.id||"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Config id is required."}));return}let y=this.sanitizeConfigId(g);s(),o();let b=(0,ee.join)(i,y+".json");if(!(0,j.existsSync)(b)){t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Config not found."}));return}let S=(0,j.readFileSync)(b,"utf8"),E=JSON.parse(S),I=this.applyPluginConfigSnapshot(E);I.ok&&(this.config.lastPluginConfigId=y,this.saveConfig(),this.broadcastConfig()),t.writeHead(I.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(I))}catch(h){m.warn("DevServer",`configs load failed: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to load config"}))}});return}if(e.url==="/api/accounts"&&e.method==="GET"){try{Sr("GET /api/accounts: reading accounts...");let f=this.readDashboardAccounts();Sr(`GET /api/accounts: returning ${f.length} account(s)`);let h=this.readAllDashboardAccountOverviewCaches();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({accounts:f,cachedOverviews:h}))}catch(f){Sr(`GET /api/accounts: EXCEPTION: ${f.message}`),m.warn("DevServer",`accounts list failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to load accounts"}))}return}if(e.url==="/api/accounts/save"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{let h=JSON.parse(f||"{}");if(!Array.isArray(h.accounts)){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"accounts[] is required."}));return}let g=new Map(this.readDashboardAccounts().map(S=>[S.id,S])),y=Date.now(),b=h.accounts.map((S,E)=>{let I=this.normalizeDashboardAccountRecord(S,E),O=g.get(I.id);return{...I,createdAt:O?.createdAt||I.createdAt||y,updatedAt:y}});this.writeDashboardAccounts(b),this.pruneDashboardAccountOverviewCaches(b);for(let S of b){let E=g.get(S.id);E&&String(E.email||"").trim()!==String(S.email||"").trim()&&this.deleteDashboardAccountOverviewCache(S.id)}t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,accounts:b}))}catch(h){m.warn("DevServer",`accounts save failed: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to save accounts"}))}});return}if(e.url==="/api/accounts/overview"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",async()=>{try{let h=JSON.parse(f||"{}"),g=String(h.accountId||"").trim(),y=String(h.email||"").trim(),b=String(h.password||""),S=!!h.refresh,E=!!h.isSteam,I=String(h.steamId||"").trim();if(!y||!b){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:E?"GUID and secret are required.":"Email and password are required."}));return}if(E&&!I){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Steam ID is required for Steam accounts."}));return}if(!S&&g){let H=this.readDashboardAccountOverviewCache(g);if(H&&String(H.email||"").trim()===y){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,overview:H.overview,cached:!0,updatedAt:H.updatedAt}));return}}let O=await this.fetchDashboardAccountOverviewRemote(g||y,y,b,E?{steamId:I}:void 0);if("error"in O){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:O.error}));return}t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,overview:O.cache.overview,cached:!1,updatedAt:O.cache.updatedAt}))}catch(h){m.warn("DevServer",`accounts overview failed: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to load account overview."}))}});return}if(e.url==="/api/hwid/refresh"&&e.method==="POST"){try{let f=Au(),h=Ni({skipFile:!0}),g=h?`${h.slice(0,8)}\u2026${h.slice(-4)}`:"";m.log("DevServer",`HWID refresh requested; ${f?"removed":"no"} hwid.txt; fresh=${g}`),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,removed:f,hwidPreview:g}))}catch(f){m.warn("DevServer",`hwid refresh failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to refresh HWID."}))}return}if(e.url==="/api/accounts/refresh-all"&&e.method==="POST"){Promise.resolve().then(async()=>{try{let f=this.readDashboardAccounts(),h={};for(let g of f){let y=String(g.email||"").trim(),b=String(g.password||"");if(!y||!b){h[g.id]={ok:!1,error:"Missing credentials."};continue}let S=String(g.steamId||"").trim();if(g.isSteam&&!S){h[g.id]={ok:!1,error:"Steam account missing Steam ID."};continue}let E=await this.fetchDashboardAccountOverviewRemote(g.id,y,b,g.isSteam?{steamId:S}:void 0);if("error"in E){h[g.id]={ok:!1,error:E.error};continue}h[g.id]={ok:!0,updatedAt:E.cache.updatedAt,overview:E.cache.overview}}t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,results:h}))}catch(f){m.warn("DevServer",`accounts refresh-all failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to refresh all accounts."}))}});return}if(e.url==="/api/muling/status"&&e.method==="GET"){let f=!!(this.mulingProcess&&!this.mulingProcess.killed);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({running:f,pid:f?this.mulingProcess.pid??null:null}));return}if(e.url==="/api/muling/stop"&&e.method==="POST"){this.mulingProcess&&!this.mulingProcess.killed&&(this.mulingProcess.kill(),this.mulingProcess=null),this.broadcastMulingStatus({phase:"stopped"}),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0}));return}if(e.url==="/api/muling/start"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.mainAccountId||"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"mainAccountId is required."}));return}if(this.mulingProcess&&!this.mulingProcess.killed){t.writeHead(409,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"A muling session is already running."}));return}let b=this.readDashboardAccounts().find(A=>A.id===g);if(!b||b.mulingRole!=="main"){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:'Account not found or not set to muling role "main".'}));return}let S=(0,ee.join)(this.publicDir,"..","..",".."),E=(0,ee.join)(S,"muling-headless","dist","muler.js");if(!(0,j.existsSync)(E)){t.writeHead(503,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"muling-headless not built. Run muling-headless/build.bat first."}));return}let I=this.getAccountsFile(),O=(0,ee.join)(S,"data","servers.json"),H=this.getAccountsCacheDir(),W=(0,rr.spawn)(process.execPath,[E,"--mainId",g,"--accounts",I,"--servers",O,"--cacheDir",H],{detached:!1,stdio:["ignore","pipe","pipe"]});this.mulingProcess=W;let M="";W.stdout?.on("data",A=>{M+=A.toString();let $=M.split(`
`);M=$.pop()??"";for(let w of $)if(w.startsWith("MULING_STATUS:"))try{let re=JSON.parse(w.slice(14));this.broadcastMulingStatus(re)}catch{}else w.trim()&&m.warn("muling",w.trimEnd())}),W.stderr?.on("data",A=>m.warn("muling",A.toString().trimEnd())),W.on("exit",A=>{m.warn("muling",`Process exited with code ${A}`),this.mulingProcess===W&&(this.mulingProcess=null),this.broadcastMulingStatus({phase:"stopped"})}),this.broadcastMulingStatus({phase:"starting"}),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,pid:W.pid??null}))}catch(h){m.warn("DevServer",`muling start failed: ${h.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to start muling."}))}});return}if(e.url==="/api/scripts"&&e.method==="GET"){let f=this.scriptHost?.list()??[],h=this.scriptHost?.getScriptsDir()??null;t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({scripts:f,dir:h}));return}if(e.url==="/api/scripts/open-folder"&&e.method==="POST"){try{if(!this.scriptHost){t.writeHead(503,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"Script host not available."}));return}let f=this.scriptHost.getScriptsDir();(0,j.mkdirSync)(f,{recursive:!0});let h,g;process.platform==="win32"?(h=process.env.ComSpec||"cmd.exe",g=["/c","start","",f]):process.platform==="darwin"?(h="open",g=[f]):(h="xdg-open",g=[f]);let y=(0,rr.spawn)(h,g,{detached:!0,stdio:"ignore"});y.on("error",b=>{try{this.scriptHost?.logLine?.("open-folder failed: "+b.message,"error")}catch{}}),y.unref(),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,dir:f}))}catch(f){t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:f.message||"Failed to open scripts folder."}))}return}if(e.url==="/api/scripts/start"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",async()=>{try{if(!this.scriptHost){t.writeHead(503,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"Script host not available."}));return}if(this.connectedClients.size===0){t.writeHead(409,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"Connect an account before starting scripts."}));return}let h=JSON.parse(f||"{}"),g=String(h.id??"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"id is required."}));return}let y=await this.scriptHost.start(g);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message||"Invalid request"}))}});return}if(e.url==="/api/scripts/stop"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{if(!this.scriptHost){t.writeHead(503,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"Script host not available."}));return}let h=JSON.parse(f||"{}"),g=String(h.id??"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"id is required."}));return}let y=this.scriptHost.stop(g);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message||"Invalid request"}))}});return}if(e.url==="/api/client/escape"&&e.method==="POST"){try{let f=this.sendEscapePacket();t.writeHead(f.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}catch(f){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,message:f.message||"Invalid request"}))}return}let a=e.url==="/"?"/index.html":e.url,l=(0,ee.join)(this.publicDir,a);if(!(0,j.existsSync)(l)){t.writeHead(404),t.end("Not Found");return}let c=(0,ee.extname)(l),u=_0[c]||"application/octet-stream",d=(e.headers["accept-encoding"]||"").includes("gzip"),p=l+".gz";if(d&&(0,j.existsSync)(p)){let f=(0,j.readFileSync)(p);t.writeHead(200,{"Content-Type":u,"Content-Encoding":"gzip"}),t.end(f)}else{let f=(0,j.readFileSync)(l);t.writeHead(200,{"Content-Type":u}),t.end(f)}}resetTradeSession(){this.tradeSession.active=!1,this.tradeSession.ourSlotCount=12,this.tradeSession.partnerSlotCount=12,this.tradeSession.ourOffer=[],this.tradeSession.partnerOffer=[],this.tradeSession.partnerOfferFromTradeChanged=[],this.tradeSession.partnerName=""}observeTradePacket(e){let t=String(e.name??"").toUpperCase(),n=String(e.direction??""),i=n.startsWith("S"),s=n.startsWith("C"),o=e.data&&typeof e.data=="object"?e.data:{};if(t==="TRADESTART"&&i){let a=Array.isArray(o.clientItems)?o.clientItems:[],l=Array.isArray(o.partnerItems)?o.partnerItems:[];this.tradeSession.active=!0,this.tradeSession.ourSlotCount=je(a.length,this.tradeSession.ourSlotCount),this.tradeSession.partnerSlotCount=je(l.length,this.tradeSession.partnerSlotCount),this.tradeSession.ourOffer=Ee(en(a),this.tradeSession.ourSlotCount),this.tradeSession.partnerOffer=Ee(en(l),this.tradeSession.partnerSlotCount),this.tradeSession.partnerOfferFromTradeChanged=this.tradeSession.partnerOffer.slice(),this.tradeSession.partnerName=typeof o.partnerName=="string"?o.partnerName:"";return}if(t==="TRADECHANGED"&&i){this.tradeSession.active=!0;let a=Ee(o.offer,this.tradeSession.partnerSlotCount);this.tradeSession.partnerOffer=a,this.tradeSession.partnerOfferFromTradeChanged=a.slice();return}if(t==="CHANGETRADE"&&s){this.tradeSession.active=!0,this.tradeSession.ourOffer=Ee(o.offer,this.tradeSession.ourSlotCount);return}if(t==="TRADEACCEPTED"&&i){this.tradeSession.active=!0,this.tradeSession.ourOffer=Ee(o.clientOffer,this.tradeSession.ourSlotCount),this.tradeSession.partnerOffer=Ee(o.partnerOffer,this.tradeSession.partnerSlotCount);return}(t==="TRADEDONE"&&i||t==="CANCELTRADE"&&s)&&this.resetTradeSession()}sendLabPacket(e,t){if(!this.proxy)return{ok:!1,message:"Proxy is not attached."};if(!this.currentClient||typeof this.currentClient.sendToServer!="function")return{ok:!1,message:"No active game client connection."};let n=String(e??"").trim().toUpperCase();if(!new Set(["REQUESTTRADE","CANCELTRADE","ACCEPTTRADE","CHANGETRADE","PARTYACTIONRESULT","PARTYJOINREQUEST","INVENTORYSWAP"]).has(n))return{ok:!1,message:`Packet ${n} is not enabled for Packet Lab sending.`};let s=t&&typeof t=="object"?t:{};try{let o=this.proxy.packetFactory.createByName(n);if(n==="REQUESTTRADE"){let a=String(s.name??"").trim();if(!a)return{ok:!1,message:"REQUESTTRADE requires a player name."};o.data.name=a}else if(n==="ACCEPTTRADE"){let a=je(this.tradeSession.ourSlotCount,12),l=je(this.tradeSession.partnerSlotCount,12);o.data.clientOffer=Ee(this.tradeSession.ourOffer,a);let c=this.tradeSession.partnerOfferFromTradeChanged.length>0?this.tradeSession.partnerOfferFromTradeChanged:this.tradeSession.partnerOffer;o.data.partnerOffer=Ee(c,l)}else if(n==="CHANGETRADE"){let a=je(this.tradeSession.ourSlotCount,12),l;if(Array.isArray(s.offer))l=Ee(s.offer,a);else{let c=String(s.offerSlots??"").trim();l=c?Tf(c,a):Ee(this.tradeSession.ourOffer,a)}o.data.offer=l,this.tradeSession.ourOffer=l.slice(),this.tradeSession.active=!0}else if(n==="CANCELTRADE")this.resetTradeSession();else if(n==="PARTYACTIONRESULT"){let a=Number(s.playerId),l=Number(s.actionId);if(!Number.isFinite(a)||a<0||a>65535)return{ok:!1,message:"PARTYACTIONRESULT requires playerId 0\u201365535 (e.g. 65535)."};if(!Number.isFinite(l)||l<0||l>255)return{ok:!1,message:"PARTYACTIONRESULT requires actionId 0\u2013255."};o.data.playerId=Math.trunc(a),o.data.actionId=Math.trunc(l),o.modified=!0}else if(n==="PARTYJOINREQUEST"){let a=Math.trunc(Number(s.partyId));if(!Number.isFinite(a)||a<1||a>4294967295)return{ok:!1,message:"PARTYJOINREQUEST requires partyId 1\u20134294967295."};let l=Math.trunc(Number(s.unknownByte));if((!Number.isFinite(l)||s.unknownByte===void 0||s.unknownByte==="")&&(l=1),l<0||l>255)return{ok:!1,message:"PARTYJOINREQUEST trailing byte must be 0\u2013255."};o.data.partyId=a>>>0,o.data.unknownByte=l,o.modified=!0}else if(n==="INVENTORYSWAP"){let a=this.currentClient,l=a.playerData,c=Math.trunc(Number(s.o1oid)),u=Math.trunc(Number(s.o1slot)),d=Math.trunc(Number(s.o1type)),p=Math.trunc(Number(s.o2oid)),f=Math.trunc(Number(s.o2slot)),h=Math.trunc(Number(s.o2type));if(!Number.isFinite(c)||!Number.isFinite(u)||!Number.isFinite(d)||!Number.isFinite(p)||!Number.isFinite(f)||!Number.isFinite(h))return{ok:!1,message:"INVENTORYSWAP requires o1oid, o1slot, o1type, o2oid, o2slot, o2type (all integers)."};o.data.time=Math.trunc(a.time),o.data.position={x:l?.pos?.x??0,y:l?.pos?.y??0},o.data.slotObject1={objectId:c,slotId:u,objectType:d},o.data.slotObject2={objectId:p,slotId:f,objectType:h},o.modified=!0}return this.currentClient.sendToServer(o),{ok:!0,packetName:n,message:`${n} sent.`,data:o.data}}catch(o){return{ok:!1,packetName:n,message:o.message||`Failed to send ${n}.`}}}sendEscapePacket(){if(!this.proxy)return{ok:!1,message:"Proxy is not attached."};if(!this.currentClient||typeof this.currentClient.sendToServer!="function")return{ok:!1,message:"No active game client connection."};try{let e=this.proxy.packetFactory.createByName("ESCAPE");return e.modified=!0,this.currentClient.sendToServer(e),{ok:!0,packetName:"ESCAPE",message:"ESCAPE sent."}}catch(e){return{ok:!1,message:e.message||"Failed to send ESCAPE."}}}broadcastMulingStatus(e){let t=JSON.stringify({type:"muling_status",status:e});for(let n of this.wss.clients)n.readyState===Q.default.OPEN&&n.send(t)}handleWsConnection(e){m.log("DevServer","Dashboard client connected"),e.send(JSON.stringify({type:"plugins",data:this.pluginManager.getPlugins()})),e.send(JSON.stringify({type:"gameClient",connected:this.gameClientConnected})),e.send(JSON.stringify({type:"internalState",connected:this.internalBridge?.isConnected??!1})),this.lastUnresolvedClasses!==null&&e.send(JSON.stringify({type:"unresolvedClasses",classes:this.lastUnresolvedClasses}));let t=this.inspector.getRecent(100);e.send(JSON.stringify({type:"history",data:t}));let n=this.pluginManager.getPluginData("damage-sniffer","damageHistory");n!==void 0&&e.send(JSON.stringify({type:"pluginData",pluginId:"damage-sniffer",dataType:"damageHistory",data:n}));let i=this.pluginManager.getPluginData("damage-sniffer","damageLive");i!==void 0&&e.send(JSON.stringify({type:"pluginData",pluginId:"damage-sniffer",dataType:"damageLive",data:i}));let s=this.pluginManager.getPluginData("damage-sniffer","encounterHistory");s!==void 0&&e.send(JSON.stringify({type:"pluginData",pluginId:"damage-sniffer",dataType:"encounterHistory",data:s}));let o=this.inspector.subscribe(a=>{e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"packet",data:a}))});e.send(this.buildConfigMessage()),e.send(JSON.stringify({type:"labUpdate",unknowns:this.lab.getUnknowns()})),e.send(JSON.stringify({type:"gameUpdateStatus",status:this.gameUpdater.getStatus()})),this.autoUpdateCheckDone||(this.autoUpdateCheckDone=!0,this.gameUpdater.check()),e.send(JSON.stringify({type:"gemStatus",loggedIn:!0,gem_balance:999999,active:!0,active_plans:["free","dodge","developer","pro","elite"],next_deduction_at:null})),e.on("message",async a=>{try{let l=JSON.parse(a.toString());if(l.type==="togglePlugin"){let c=this.pluginManager.togglePlugin(l.pluginId,l.enabled);!c.ok&&e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"pluginToggleError",pluginId:l.pluginId,reason:c.reason,requiredPlan:c.requiredPlan??null})),this.broadcastPluginState(),this.scheduleAutosave()}else if(l.type==="scriptPanelEvent"){let c=String(l.scriptId??"").trim(),u=String(l.widgetId??"").trim(),d=String(l.kind??"").trim();if(!c||!this.scriptHost||d!=="click"&&d!=="change"&&d!=="closed-by-user"||d!=="closed-by-user"&&!u)return;let p={scriptId:c,widgetId:u,kind:d,value:l.value};this.scriptHost.dispatchPanelEvent(p)}else if(l.type==="requestScriptPanelSnapshots")this.sendScriptPanelSnapshots(e);else if(l.type==="updateSetting")!this.pluginManager.updateSetting(l.pluginId,l.key,l.value)&&e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"settingUpdateError",pluginId:l.pluginId,key:l.key})),this.broadcastPluginState(),this.scheduleAutosave();else if(l.type==="updatePluginHotkey"){let c=this.pluginManager.updatePluginHotkey(l.pluginId,l.hotkey);!c.ok&&e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"pluginHotkeyUpdateError",pluginId:l.pluginId,reason:c.reason,conflictPluginId:c.conflictPluginId??null})),this.broadcastPluginState(),this.syncPluginHotkeysToDll(),this.scheduleAutosave()}else if(l.type==="resetPluginSettings"){let c=this.pluginManager.resetPluginSettings(String(l.pluginId??""));e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"pluginSettingsReset",pluginId:l.pluginId,changedKeys:c})),this.broadcastPluginState(),this.scheduleAutosave()}else if(l.type==="launchGame"){let c=this.launchGame();e.send(JSON.stringify({type:"launchGameResult",...c}))}else if(l.type==="launchGameWithCredentials"){let c=String(l.email??"").trim(),u=String(l.password??""),d=String(l.serverName??"USWest").trim()||"USWest",p=l.windowRect,f;if(p&&typeof p=="object"){let H=p,W=Number(H.x),M=Number(H.y),A=Number(H.width),$=Number(H.height);[W,M,A,$].every(w=>Number.isFinite(w))&&(f={x:Math.round(W),y:Math.round(M),width:Math.round(A),height:Math.round($)})}let h=!!l.compactWindow&&!f,g=l.accountId,y=typeof g=="string"&&g.trim()!==""?g.trim():null,b=l.accountLabel,S=typeof b=="string"&&b.trim()!==""?b.trim():null,E=!!l.isSteam,I=l.steamId,O=typeof I=="string"?I.trim():"";this.launchGameWithCredentials(c,u,d,{compactWindow:h,windowRect:f,accountId:y,accountLabel:S,isSteam:E,steamId:O}).then(H=>{e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"launchGameResult",...H}))})}else if(l.type==="probePacket"){let c=this.lab.probe(Number(l.id),String(l.spec??""));e.send(JSON.stringify({type:"probeResult",id:l.id,result:c}))}else if(l.type==="sendLabPacket"){let c=this.sendLabPacket(l.packetName,l.data);e.send(JSON.stringify({type:"labPacketSendResult",requestId:l.requestId??null,result:c}))}else if(l.type==="requestObjects")if(this.worldState&&this.gameData){let c=this.worldState.getObjectsForDashboard(this.gameData),u=this.gameData.getBeaconTypes(),d=JSON.stringify({type:"objectsData",...c,beaconTypes:u});e.readyState===Q.default.OPEN&&e.send(d)}else{let c=JSON.stringify({type:"objectsData",portals:[],beacons:[],categories:[],beaconTypes:[]});e.readyState===Q.default.OPEN&&e.send(c)}else if(l.type==="requestGameWikiCatalog"){if(l.force===!0&&(this.gameWikiCatalogJson=null),e.readyState!==Q.default.OPEN)return;if(!this.gameData){e.send(JSON.stringify({type:"gameWikiCatalog",objectSummaries:[],objectDetails:{},tiles:[],objectCount:0,tileCount:0,reason:"no_game_data"}));return}if(!this.gameWikiCatalogJson){let{objectSummaries:c,objectDetails:u,tiles:d}=this.gameData.getGameWikiCatalog();this.gameWikiCatalogJson=JSON.stringify({type:"gameWikiCatalog",objectSummaries:c,objectDetails:u,tiles:d,objectCount:c.length,tileCount:d.length})}e.send(this.gameWikiCatalogJson)}else if(l.type==="requestObjectXml"){if(e.readyState!==Q.default.OPEN||!this.gameData)return;let c=Number(l.objectType);e.send(JSON.stringify({type:"objectXmlResult",objectType:c,rawXml:Number.isFinite(c)?this.gameData.getRawObjectXml(c)??null:null}))}else if(l.type==="requestTileXml"){if(e.readyState!==Q.default.OPEN||!this.gameData)return;let c=Number(l.tileType);e.send(JSON.stringify({type:"tileXmlResult",tileType:c,rawXml:Number.isFinite(c)?this.gameData.getRawTileXml(c)??null:null}))}else if(l.type==="requestTilemap"){let c=this.getEffectivePlayerPos();if(this.worldState&&this.gameData&&c){let u=Number(l.radius??12),d=Number.isFinite(u)?Math.max(1,Math.min(30,Math.trunc(u))):12,p=this.worldState.getNearbyTilesForDashboard(this.gameData,c,d),f=this.currentClient?.playerData?.pos??null;p.groups.length===0&&f&&(Math.abs(f.x-c.x)>.01||Math.abs(f.y-c.y)>.01)&&(p=this.worldState.getNearbyTilesForDashboard(this.gameData,f,d)),e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"tilesData",...p}))}else e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"tilesData",center:{x:0,y:0},radius:12,groups:[]}))}else if(l.type==="requestNearbyPlayers")if(this.worldState&&this.gameData&&this.currentClient?.playerData){let c=this.getEffectivePlayerPos(),u=this.worldState.getNearbyPlayersForDashboard(this.gameData,c,this.currentClient.objectId);e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"nearbyPlayersData",players:u}))}else e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"nearbyPlayersData",players:[]}));else if(l.type==="requestAllPlayersRawStats"){if(e.readyState!==Q.default.OPEN)return;if(this.worldState&&this.gameData){let c=this.worldState.getAllPlayersRawStatsForDashboard(this.gameData),u=this.currentClient?.objectId,d=u!=null&&Number.isFinite(Number(u))?c.filter(p=>p.objectId===u):[];e.send(JSON.stringify({type:"allPlayersRawStats",capturedAt:Date.now(),map:this.currentClient?.playerData?.mapName??null,gameId:this.currentClient?.state?.gameId??null,selfObjectId:this.currentClient?.objectId??null,players:d}))}else e.send(JSON.stringify({type:"allPlayersRawStats",capturedAt:Date.now(),map:null,gameId:null,selfObjectId:null,players:[]}))}else if(l.type==="requestVaultData"){if(e.readyState!==Q.default.OPEN)return;let c=this.currentClient?Vt(this.currentClient):null;c?e.send(JSON.stringify({type:"vaultData",capturedAt:c.capturedAt,map:this.currentClient?.playerData?.mapName??null,gameId:this.currentClient?.state?.gameId??null,lastVaultUpdate:c.lastVaultUpdate,vault:{objectId:c.vault.objectId,contents:c.vault.contents},material:{objectId:c.material.objectId,contents:c.material.contents},gift:{objectId:c.gift.objectId,contents:c.gift.contents},potion:{objectId:c.potion.objectId,contents:c.potion.contents},seasonalSpoils:{objectId:c.seasonalSpoils.objectId,contents:c.seasonalSpoils.contents},vaultUpgradeCost:c.vaultUpgradeCost,materialUpgradeCost:c.materialUpgradeCost,seasonalSpoilUpgradeCost:c.seasonalSpoilUpgradeCost,potionUpgradeCost:c.potionUpgradeCost,currentPotionMax:c.currentPotionMax,nextPotionMax:c.nextPotionMax,vaultChestEnchants:c.vaultChestEnchants,giftChestEnchants:c.giftChestEnchants,spoilsChestEnchants:c.spoilsChestEnchants})):e.send(JSON.stringify({type:"vaultData",error:"Vault data not available \u2014 enter the vault first.",capturedAt:null}))}else if(l.type==="requestNearbyPlayerDebug"){let c=Number(l.objectId);if(!Number.isFinite(c))return;if(this.worldState&&this.gameData&&this.currentClient?.playerData){let u=this.currentClient.playerData.pos??null,d=this.worldState.getNearbyPlayerDebugForDashboard(this.gameData,u,c);e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"nearbyPlayerDebug",objectId:c,debug:d}))}else e.readyState===Q.default.OPEN&&e.send(JSON.stringify({type:"nearbyPlayerDebug",objectId:c,debug:null}))}else if(l.type==="checkGameUpdate")this.gameUpdater.check();else if(l.type==="performGameUpdate")this.gameUpdater.update();else if(l.type==="updateRotmgPath"){let c=(l.path||"").trim();c?this.config.rotmgPath=c:delete this.config.rotmgPath,this.saveConfig(),this.broadcastConfig()}else if(l.type==="updateRotmgExtractorGameDataPath"){let c=String(l.path??"").trim();c?this.config.rotmgExtractorGameDataPath=c:delete this.config.rotmgExtractorGameDataPath,this.wikiSprites.resetCache(),this.saveConfig(),this.broadcastConfig()}else l.type==="updateSingleClientOnly"&&(this.config.singleClientOnly=l.value!==!1,this.broadcastConfig())}catch{}}),e.on("close",()=>{o(),m.log("DevServer","Dashboard client disconnected")})}broadcastPluginState(){let e=JSON.stringify({type:"plugins",data:this.pluginManager.getPlugins()});for(let t of this.wss.clients)t.readyState===Q.default.OPEN&&t.send(e)}syncPluginHotkeysToDll(){try{let t=this.pluginManager.getPluginHotkeyBindings().map(n=>`${n.pluginId}=${n.hotkey}`).join(";");this.internalBridge?.setFeature("pluginToggleHotkeys",t)}catch(e){m.warn("DevServer",`plugin hotkey sync failed: ${e.message}`)}}broadcastDllMessage(e){e?.type==="hotkeyEvent"&&this.applyInternalHotkeyEvent(e)&&(this.broadcastPluginState(),this.syncPluginHotkeysToDll(),this.scheduleAutosave())}applyInternalHotkeyEvent(e){let t=String(e?.pluginId||""),n=String(e?.action||""),i=e?.value===!0;return t==="socket"&&n==="toggle"?this.pluginManager.updateSetting("socket","toggle",!0):t==="player-noclip"&&n==="noclipEnabled"?this.pluginManager.updateSetting("player-noclip","noclipEnabled",i):n==="togglePlugin"?this.pluginManager.togglePluginByHotkey(t).ok:(t==="ghostHit"&&this.handleGhostHitEvent(n),!1)}handleGhostHitEvent(e){try{if(!this.currentClient||!this.proxy)return;let t=e.indexOf(":");if(t<=0)return;let n=Number(e.slice(0,t)),i=Number(e.slice(t+1));if(!Number.isFinite(n)||!Number.isFinite(i))return;let s=this.proxy.packetFactory.createByName("PLAYERHIT");if(!s)return;s.data={bulletId:i,objectId:n},s.modified=!0,this.currentClient.sendToServer(s)}catch(t){m.warn("DevServer",`ghostHit dispatch failed: ${t.message}`)}}setScriptHost(e){this.scriptHost=e}broadcastScriptsState(){let e=this.scriptHost?.list()??[],t=this.scriptHost?.getScriptsDir()??null,n=JSON.stringify({type:"scriptsState",scripts:e,dir:t});for(let i of this.wss.clients)i.readyState===Q.default.OPEN&&i.send(n)}broadcastScriptLog(e,t,n="info"){let i=JSON.stringify({type:"scriptLog",id:e,line:t,level:n});for(let s of this.wss.clients)s.readyState===Q.default.OPEN&&s.send(i)}broadcastScriptPanelMessage(e){let t=JSON.stringify(e);for(let n of this.wss.clients)n.readyState===Q.default.OPEN&&n.send(t)}sendScriptPanelSnapshots(e){if(this.scriptHost)for(let t of this.scriptHost.panelScriptIds()){let n=this.scriptHost.getPanelSnapshot(t);if(!n)continue;let i={type:"scriptPanelState",scriptId:t,def:n.def,isOpen:n.isOpen};e.readyState===Q.default.OPEN&&e.send(JSON.stringify(i))}}};var Be=require("fs"),Ht=require("path"),Pb=require("url"),vb=require("crypto");$n();X();var Da="winhttp.dll",Eb="winhttp.dll.bak";function Tb(r){try{return(0,vb.createHash)("sha256").update((0,Be.readFileSync)(r)).digest("hex")}catch{return null}}var La=class{gamePath=null;dllTarget="";backupPath="";installed=!1;assetsDir;constructor(e=null,t){if(this.preferredGamePath=e,t)this.assetsDir=t;else{let n=(0,Ht.dirname)((0,Pb.fileURLToPath)(__importMetaUrl));this.assetsDir=(0,Ht.resolve)(n,"..","..","assets")}}preferredGamePath;isValidExaltDir(e){let t=String(e||"").trim();if(!t)return!1;try{return(0,Be.existsSync)(t)&&(0,Be.existsSync)((0,Ht.join)(t,"RotMG Exalt.exe"))}catch{return!1}}resolveGamePath(){return this.isValidExaltDir(this.preferredGamePath)?(m.log("GameHooker",`Using configured Exalt path: ${this.preferredGamePath}`),this.preferredGamePath):bt.find()}async install(){if(this.gamePath=this.resolveGamePath(),!this.gamePath)return m.error("GameHooker","Cannot install hook: Exalt directory not found."),m.error("GameHooker","The proxy will still run, but you must manually redirect connections to 127.0.0.1:2050."),!1;if(process.platform!=="win32"||process.env.REALM_ENGINE_SKIP_WINHTTP_INSTALL==="1"){let t=(0,Ht.join)(this.gamePath,Da);if((0,Be.existsSync)(t))try{(0,Be.unlinkSync)(t)}catch{}return this.installed=!0,!0}let e=(0,Ht.join)(this.assetsDir,Da);if(!(0,Be.existsSync)(e))return m.error("GameHooker",`Hook DLL not found at ${e}`),m.error("GameHooker","Run native/build.bat from a Developer Command Prompt to compile it."),m.error("GameHooker","The proxy will still run, but connections won't be automatically redirected."),!1;if(this.dllTarget=(0,Ht.join)(this.gamePath,Da),this.backupPath=(0,Ht.join)(this.gamePath,Eb),(0,Be.existsSync)(this.dllTarget)){try{let{statSync:t}=await import("fs"),n=t(e).size,i=t(this.dllTarget).size,s=Tb(e),o=Tb(this.dllTarget);if(s!==null&&o!==null&&s===o)return m.log("GameHooker","Hook DLL already installed (hash match), skipping."),this.installed=!0,!0}catch{}m.log("GameHooker",`Backing up existing ${Da} to ${Eb}`);try{(0,Be.renameSync)(this.dllTarget,this.backupPath)}catch(t){return m.error("GameHooker",`Failed to backup existing DLL: ${t}`),m.error("GameHooker","Is the game currently running? Close it and try again."),!1}}try{return(0,Be.copyFileSync)(e,this.dllTarget),this.installed=!0,m.log("GameHooker",`Hook DLL installed to ${this.dllTarget}`),m.log("GameHooker","Game will redirect port 2050 connections to the proxy."),!0}catch(t){return m.error("GameHooker",`Failed to install hook DLL: ${t}`),!1}}async uninstall(){if(!(!this.installed||!this.gamePath))try{(0,Be.existsSync)(this.dllTarget)&&((0,Be.unlinkSync)(this.dllTarget),m.log("GameHooker",`Removed hook DLL from ${this.dllTarget}`)),(0,Be.existsSync)(this.backupPath)&&((0,Be.renameSync)(this.backupPath,this.dllTarget),m.log("GameHooker","Restored original winhttp.dll from backup.")),this.installed=!1}catch(e){m.error("GameHooker",`Error during uninstall: ${e}`)}}get isInstalled(){return this.installed}get gameDirectory(){return this.gamePath}};$n();var Rb=require("net"),nr=require("crypto");X();var Nb=require("events");var xb="__LFG_dllThreatBus_v1";function I0(){let r=globalThis,e=r[xb];return e||(e={threats:[],ground:{rawDamage:0,tHitMs:-1,events:[]},at:0},r[xb]=e),e}function Cb(r,e={rawDamage:0,tHitMs:-1,events:[]}){let t=I0();t.threats=r,t.ground=e,t.at=Date.now()}function kb(r){let e=[],t={rawDamage:0,tHitMs:-1,events:[]};if(!r)return{threats:e,ground:t};let n=r,i=r.indexOf(";");if(i>=0){let s=r.slice(0,i).split("|");for(let o=1;o<s.length;o++){let a=s[o].split(":");if(a.length!==2)continue;let l=Number(a[0]),c=Number(a[1]);!Number.isFinite(l)||!Number.isFinite(c)||l<=0||(t.events.length===0&&(t.rawDamage=l,t.tHitMs=c),t.events.push({rawDamage:l,tHitMs:c}))}}if(i>=0&&(n=r.slice(i+1)),!n)return{threats:e,ground:t};for(let s of n.split(",")){let o=s.split(":");if(o.length!==5)continue;let a=Number(o[0]),l=Number(o[1]),c=Number(o[2]),u=Number(o[3]);!Number.isFinite(a)||!Number.isFinite(l)||!Number.isFinite(c)||!Number.isFinite(u)||e.push({attackerObjId:a,bulletId:l,tHitMs:c,fallbackDamage:u,fallbackArmorPiercing:o[4]==="1"})}return{threats:e,ground:t}}var wd=(()=>{try{let e=String("\\\\.\\pipe\\lfg-dev-bridge"||"").trim();if(e.startsWith("\\\\.\\pipe\\"))return e}catch{}return"\\\\.\\pipe\\lfg-dev-bridge"})();function R0(){return process.platform==="win32"}var N0=5e3,A0=3,tD=process.env.REALM_ENGINE_PROD==="1",O0=/^[0-9a-f]{64}$/i;function M0(){return"47eb249907eb980c851fe3a7bdb56a244244bb7d465572b556e810df6827ecfb"}var Ui=M0();function _b(r){if(!Ui)return null;try{return(0,nr.createHmac)("sha256",Buffer.from(Ui,"hex")).update(r).digest("hex")}catch{return null}}function Gi(){return(0,nr.randomBytes)(32).toString("hex")}function qr(r){return typeof r=="string"&&O0.test(r)}function D0(r,e,t,n){if(!Ui||!/^[1-9]\d*$/.test(n)||!qr(r)||!qr(e))return null;try{return(0,nr.createHmac)("sha256",Buffer.from(Ui,"hex")).update(`${r}|${e}|${t}|${n}|${wd}|session-v2`).digest("hex")}catch{return null}}function Ib(r,e,t,n){if(!qr(r))return null;try{return(0,nr.createHmac)("sha256",Buffer.from(r,"hex")).update(`${e.toString()}|${t}|${n}`).digest("hex")}catch{return null}}function L0(r){if(typeof r!="string"&&typeof r!="number"&&typeof r!="bigint")return null;let e=String(r);if(!/^\d+$/.test(e))return null;try{return BigInt(e)}catch{return null}}function $0(r){if(!(r.alive===!0))return"alive:false";let t=typeof r.hp=="number"&&Number.isFinite(r.hp)?r.hp:null,n=typeof r.maxHp=="number"&&Number.isFinite(r.maxHp)?r.maxHp:null,i=typeof r.posX=="number"&&Number.isFinite(r.posX)?r.posX:null,s=typeof r.posY=="number"&&Number.isFinite(r.posY)?r.posY:null;if(t===null||n===null||i===null||s===null)return null;let o=`alive:true|hp:${t}|maxHp:${n}|posX:${i.toFixed(3)}|posY:${s.toFixed(3)}`,a=typeof r.def=="number"&&Number.isFinite(r.def)?Math.trunc(r.def):null;return a!==null&&(o+=`|def:${a}`),o}function B0(r){let e=typeof r.pluginId=="string"?r.pluginId:null,t=typeof r.action=="string"?r.action:null,n=typeof r.value=="boolean"?r.value:null;return!e||!t||n===null?null:`${e}|${t}|${n?"true":"false"}`}var $a=class extends Nb.EventEmitter{server=null;socket=null;userId;authenticated=!1;stopped=!1;heartbeatTimer=null;pendingChallenge=null;serverChallenge=null;missCount=0;sessionKey=null;nextClientSeq=1n;lastDllSeq=0n;lastDllDefense=null;readBuf=Buffer.alloc(0);lastSentFeatures=new Map;loggedFirstPipeData=!1;warnedNonWindowsPipe=!1;constructor(e){super(),this.userId=e}get isConnected(){return this.authenticated&&this.pipeTransportReady()}get currentUserId(){return this.userId}pipeTransportReady(){return this.socket!==null&&!this.socket.destroyed}bridgeAuthUserId(){let e=String(this.userId??"").trim();if(e.length===0)return"anonymous";if(e.length>96)return(0,nr.createHash)("sha256").update(e,"utf8").digest("hex");for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(!(n>=97&&n<=122||n>=65&&n<=90||n>=48&&n<=57||n===45||n===95||n===46))return(0,nr.createHash)("sha256").update(e,"utf8").digest("hex")}return e}setUserId(e){this.userId=e,this.socket&&this.disconnect()}listen(){if(this.stopped||this.server)return;if(!Ui){m.error("InternalBridge","Handshake key invalid for production; bridge disabled."),this.stopped=!0;return}let e=R0(),t=(0,Rb.createServer)(n=>{this.socket&&!this.socket.destroyed&&(m.warn("InternalBridge","DLL reconnected while session active \u2014 replacing existing session."),this.disconnect()),this.acceptConnection(n)});if(t.on("error",n=>{m.error("InternalBridge",`Bridge server error: ${n.message}`)}),e)t.listen(wd,()=>{m.log("InternalBridge",`Pipe server listening on ${wd} \u2014 waiting for DLL to connect.`)});else{let i="127.0.0.1";t.listen(4242,i,()=>{m.log("InternalBridge",`TCP bridge server listening on ${i}:4242 \u2014 waiting for DLL to connect.`)})}this.server=t}stop(){this.stopped=!0,this.disconnect(),this.server&&(this.server.close(),this.server=null)}send(e){if(!this.pipeTransportReady()||!this.authenticated)return;let t=this.signOutgoingMessage(e);if(!t){m.warn("InternalBridge",`Dropped unsigned command type: ${e.type}`);return}this.writeMessage(JSON.stringify(t))}setFeature(e,t){let i={type:"setFeature",key:e,valueType:typeof t=="boolean"?"b":typeof t=="number"?"n":"s",value:t};e!=="internalUnloadDll"&&this.lastSentFeatures.set(e,{...i}),this.send(i)}getNextSeq(){let e=this.nextClientSeq;return this.nextClientSeq+=1n,e}getSignedFields(e){switch(e.type){case"heartbeat":{let t=e.nonce;return qr(t)?{payload:t}:null}case"heartbeatResp":{let t=e.response;return qr(t)?{payload:t}:null}case"clearTiles":return{payload:""};case"noWalkInit":{let t=typeof e.types=="string"?e.types:null;return t===null?null:{payload:t}}case"tileUpdate":{let t=typeof e.tiles=="string"?e.tiles:null;return t===null?null:{payload:t}}case"setFeature":{let t=typeof e.key=="string"?e.key:null,n=e.valueType==="b"||e.valueType==="n"||e.valueType==="s"?e.valueType:null;if(!t||!n)return null;let i=e.value;return n==="b"?typeof i!="boolean"?null:{payload:`${t}|b|${i?"true":"false"}`,valueType:"b"}:n==="n"?typeof i!="number"||!Number.isFinite(i)?null:{payload:`${t}|n|${i.toString()}`,valueType:"n"}:typeof i!="string"?null:{payload:`${t}|s|${i}`,valueType:"s"}}default:return null}}signOutgoingMessage(e){if(!this.sessionKey)return null;let t=this.getSignedFields(e);if(!t)return null;let n=this.getNextSeq(),i=Ib(this.sessionKey,n,e.type,t.payload);return i?{...e,seq:n.toString(),mac:i}:null}verifyIncomingSignedMessage(e,t){if(!this.sessionKey)return!1;let n=L0(e.seq),i=typeof e.mac=="string"?e.mac:null;if(n===null||n<=this.lastDllSeq||!i||!qr(i))return!1;let s=Ib(this.sessionKey,n,e.type,t);return!s||s!==i.toLowerCase()?!1:(this.lastDllSeq=n,!0)}acceptConnection(e){this.socket=e,this.authenticated=!1,this.readBuf=Buffer.alloc(0),this.loggedFirstPipeData=!1,m.log("InternalBridge","DLL connected \u2014 waiting for hello..."),e.on("data",t=>{this.readBuf=Buffer.concat([this.readBuf,t]),!this.loggedFirstPipeData&&t.length>0&&(this.loggedFirstPipeData=!0,m.debug("proxy","InternalBridge","[DIAG] first pipe data received from DLL")),this.processMessages()}),e.on("error",t=>{m.error("InternalBridge",`Pipe error: ${t.message}`),this.socket===e&&(this.socket=null)}),e.on("close",()=>{m.log("InternalBridge","DLL pipe closed."),this.socket===e&&(this.socket=null),this.cleanup()})}disconnect(){this.cleanup(),this.socket&&(this.socket.destroy(),this.socket=null)}cleanup(){let e=this.authenticated;this.authenticated=!1,this.pendingChallenge=null,this.serverChallenge=null,this.sessionKey=null,this.nextClientSeq=1n,this.lastDllSeq=0n,this.missCount=0,this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null),e&&this.emit("disconnected")}writeMessage(e){if(!this.socket||this.socket.destroyed)return!1;let t=Buffer.from(e,"utf8"),n=Buffer.alloc(4);return n.writeUInt32LE(t.length,0),this.socket.write(Buffer.concat([n,t])),!0}processMessages(){for(;this.readBuf.length>=4;){let e=this.readBuf.readUInt32LE(0);if(e===0||e>1024*1024){m.error("InternalBridge",`Invalid message length: ${e}`),this.disconnect();return}if(this.readBuf.length<4+e)break;let t=this.readBuf.subarray(4,4+e).toString("utf8");this.readBuf=this.readBuf.subarray(4+e);try{let n=JSON.parse(t);this.handleMessage(n)}catch{m.error("InternalBridge",`Bad JSON from DLL: ${t.slice(0,100)}`)}}}handleMessage(e){switch(e.type){case"hello":this.handleHello(e);break;case"authResult":this.handleAuthResult(e);break;case"heartbeat":this.handleHeartbeat(e);break;case"heartbeatResp":this.handleHeartbeatResp(e);break;case"player":this.handlePlayer(e);break;case"hotkeyEvent":this.handleHotkeyEvent(e);break;case"unresolvedClasses":this.handleUnresolvedClasses(e);break;case"threats":this.handleThreats(e);break;default:if(this.authenticated){let t=typeof e.sigPayload=="string"?e.sigPayload:null;if(!t||!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge",`Dropped unsigned/invalid DLL message type: ${e.type}`);return}}this.emit("message",e);break}}handleHello(e){let t=Number(e.version??0),n=String(e.protocol??""),i=e.challenge;if(t!==3||n!=="bridge-v3"||!qr(i)){m.error("InternalBridge","Hello missing challenge or wrong protocol/version"),this.disconnect();return}let s=this.bridgeAuthUserId(),o=i+s,a=_b(o);if(!a){m.error("InternalBridge","Unable to compute auth HMAC"),this.disconnect();return}let l=Gi();this.writeMessage(JSON.stringify({type:"auth",protocol:"bridge-v3",clientPid:String(process.pid),userId:s,response:a,challenge:l})),this.serverChallenge=i,this.pendingChallenge=l}handleAuthResult(e){let t=this.serverChallenge??Gi(),n=this.pendingChallenge??Gi(),i=D0(t,n,this.bridgeAuthUserId(),String(process.pid));this.authenticated=!0,this.sessionKey=i??"0".repeat(64),this.nextClientSeq=1n,this.lastDllSeq=0n,this.serverChallenge=null,this.pendingChallenge=null,this.missCount=0,m.log("InternalBridge",`Authenticated with DLL (bridgeUserId=${this.bridgeAuthUserId()})`),this.emit("authenticated"),this.replayAllFeatureState(),this.startHeartbeat()}replayAllFeatureState(){if(!(!this.socket||!this.authenticated||!this.sessionKey))for(let e of this.lastSentFeatures.values()){let t=this.signOutgoingMessage(e);if(!t){m.warn("InternalBridge",`Skipped feature replay for key: ${e.key}`);continue}this.writeMessage(JSON.stringify(t))}}handleHeartbeat(e){let t=typeof e.nonce=="string"?e.nonce:Gi(),n=_b(t)??"0".repeat(64),i=this.signOutgoingMessage({type:"heartbeatResp",response:n});i&&this.writeMessage(JSON.stringify(i))}handleHeartbeatResp(e){this.missCount=0,this.pendingChallenge=null}handlePlayer(e){let t=$0(e);if(!t||!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge","Dropped unsigned/invalid player message");return}let n=typeof e.def=="number"&&Number.isFinite(e.def)?Math.trunc(e.def):null;this.lastDllDefense=e.alive===!0?n:null,this.emit("message",e)}getDllDefense(){return this.lastDllDefense}handleHotkeyEvent(e){let t=B0(e);if(!t||!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge","Dropped unsigned/invalid hotkey event");return}this.emit("message",e)}handleThreats(e){let t=typeof e.threats=="string"?e.threats:"";if(!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge","Dropped unsigned/invalid threats message");return}{let n=kb(t);Cb(n.threats,n.ground)}}handleUnresolvedClasses(e){let t=typeof e.classes=="string"?e.classes:"";if(!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge","Dropped unsigned unresolvedClasses message");return}let n=t?t.split(",").filter(Boolean):[];this.emit("unresolvedClasses",n)}startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>{if(!this.authenticated||!this.socket)return;if(this.pendingChallenge&&(this.missCount++,this.missCount>=A0)){m.error("InternalBridge",`${this.missCount} heartbeat misses \u2014 disconnecting`),this.disconnect();return}let e=Gi();this.pendingChallenge=e;let t=this.signOutgoingMessage({type:"heartbeat",nonce:e});if(!t){this.disconnect();return}this.writeMessage(JSON.stringify(t))},N0)}};X();_u();var pe=require("fs"),le=require("path"),Ob=require("os"),Mb=require("url");X();var j0="sdk-version.txt";function F0(){return process.env.REALM_ENGINE_APP_ROOT?(0,le.resolve)(process.env.REALM_ENGINE_APP_ROOT):(0,le.resolve)((0,le.dirname)((0,Mb.fileURLToPath)(__importMetaUrl)),"..","..")}function H0(){let r=process.resourcesPath,e=[r?(0,le.join)(r,"sdk"):"",process.env.REALM_ENGINE_ROOT?(0,le.join)((0,le.resolve)(process.env.REALM_ENGINE_ROOT),"sdk"):"",(0,le.join)(F0(),"packages","sdk")].filter(Boolean);for(let t of e)if((0,pe.existsSync)((0,le.join)(t,"package.json")))return t;return null}function Db(r){try{let e=JSON.parse((0,pe.readFileSync)((0,le.join)(r,"package.json"),"utf8"));return String(e.version??"0.0.0")}catch{return"0.0.0"}}function Ab(r){try{return(0,pe.readFileSync)(r,"utf8")}catch{return null}}function W0(r,e,t){return!(0,pe.existsSync)((0,le.join)(e,"package.json"))||!(0,pe.existsSync)((0,le.join)(e,"dist","index.js"))||!(0,pe.existsSync)((0,le.join)(e,"dist","types","index.d.ts"))||Db(e)!==t?!1:[(0,le.join)("dist","index.js"),(0,le.join)("dist","ui","Panel.js"),(0,le.join)("dist","types","ui","Panel.d.ts"),(0,le.join)("src","ui","Panel.ts")].every(i=>{let s=Ab((0,le.join)(r,i)),o=Ab((0,le.join)(e,i));return s!=null&&s===o})}function G0(r,e){(0,pe.existsSync)(e)&&(0,pe.rmSync)(e,{recursive:!0,force:!0}),(0,pe.mkdirSync)(e,{recursive:!0}),(0,pe.cpSync)(r,e,{recursive:!0})}function U0(r){let e=(0,le.join)(r,"Scripts"),t=[(0,le.join)(e,"node_modules","@realmengine","sdk")];if(!(0,pe.existsSync)(e))return t;try{for(let n of(0,pe.readdirSync)(e,{withFileTypes:!0})){if(!n.isDirectory()||n.name==="node_modules"||n.name.startsWith("."))continue;let i=(0,le.join)(e,n.name,"node_modules","@realmengine","sdk");(0,pe.existsSync)(i)&&t.push(i)}}catch{}return t}function V0(r){try{return(0,pe.readdirSync)(r,{recursive:!0}).filter(e=>typeof e=="string").map(e=>String(e))}catch{return[]}}function Lb(){let r=process.env.USERPROFILE||(0,Ob.homedir)(),e=(0,le.join)(r,"Documents","Realmengine"),t=(0,le.join)(e,"node_modules","@realmengine","sdk"),n=(0,le.join)(e,j0),i=H0();if(!i){m.warn("SDK","Packaged SDK not found; cannot deploy to Documents.");return}let s=Db(i),o=(0,pe.existsSync)(n)?(0,pe.readFileSync)(n,"utf8").trim():"none",l=Array.from(new Set([t,...U0(e)])).filter(c=>!W0(i,c,s));if(o===s&&l.length===0){m.log("SDK",`v${s} already installed in Documents (skipping deploy).`);return}m.log("SDK",`Deploying SDK v${s} to Documents (installed: ${o}; stale copies: ${l.length})...`);try{for(let u of l)G0(i,u);(0,pe.mkdirSync)(e,{recursive:!0}),(0,pe.writeFileSync)(n,s);let c=V0(t);m.log("SDK",`SDK v${s} deployed. Updated ${l.length} location(s). Files: ${c.join(", ")}`)}catch(c){m.warn("SDK",`SDK deploy failed: ${c.message}`)}}var An,On,Mn;function Ed(r){try{let t=String((r==="packet"?`{
  "packets": {
    "0": {
      "name": "FAILURE",
      "direction": "server",
      "fields": [
        {
          "name": "errorId",
          "type": "int32"
        },
        {
          "name": "errorMessage",
          "type": "string"
        }
      ]
    },
    "1": {
      "name": "TELEPORT",
      "direction": "client",
      "fields": [
        {
          "name": "objectId",
          "type": "int32"
        },
        {
          "name": "playerName",
          "type": "string"
        }
      ]
    },
    "3": {
      "name": "CLAIMDAILYLOGINREWARD",
      "direction": "client",
      "fields": [
        {
          "name": "claimStr",
          "type": "string"
        },
        {
          "name": "claimType",
          "type": "string"
        }
      ]
    },
    "4": {
      "name": "DELETEPETMESSAGE",
      "direction": "server",
      "fields": []
    },
    "5": {
      "name": "REQUESTTRADE",
      "direction": "client",
      "fields": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    "6": {
      "name": "QUESTFETCHRESPONSE",
      "direction": "server",
      "fields": []
    },
    "7": {
      "name": "JOINGUILD",
      "direction": "client",
      "fields": []
    },
    "8": {
      "name": "PING",
      "direction": "server",
      "fields": [
        {
          "name": "serial",
          "type": "int32"
        }
      ]
    },
    "9": {
      "name": "PLAYERTEXT",
      "direction": "client",
      "fields": [
        {
          "name": "text",
          "type": "string"
        }
      ]
    },
    "10": {
      "name": "NEWTICK",
      "direction": "server",
      "fields": [
        {
          "name": "tickId",
          "type": "int32"
        },
        {
          "name": "tickTime",
          "type": "int32"
        },
        {
          "name": "serverRealTimeMs",
          "type": "uint32"
        },
        {
          "name": "serverLastRttMs",
          "type": "uint16"
        },
        {
          "name": "statuses",
          "type": "array",
          "lengthType": "int16",
          "elementType": "Status"
        }
      ]
    },
    "11": {
      "name": "SHOWEFFECT",
      "direction": "server",
      "fields": []
    },
    "12": {
      "name": "SERVERPLAYERSHOOT",
      "direction": "server",
      "fields": [
        {
          "name": "bulletId",
          "type": "uint16"
        },
        {
          "name": "ownerId",
          "type": "int32"
        },
        {
          "name": "containerType",
          "type": "int32"
        },
        {
          "name": "startingPos",
          "type": "Location"
        },
        {
          "name": "angle",
          "type": "float"
        },
        {
          "name": "damage",
          "type": "int16"
        },
        {
          "name": "superOwnerId",
          "type": "int32"
        },
        {
          "name": "bulletType",
          "type": "byte",
          "optional": true,
          "default": 255
        },
        {
          "name": "numShots",
          "type": "byte",
          "optional": true,
          "default": 0
        },
        {
          "name": "angleInc",
          "type": "float",
          "optional": true,
          "default": -1.0
        }
      ]
    },
    "13": {
      "name": "USEITEM",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "slotObject",
          "type": "SlotObject"
        },
        {
          "name": "itemUsePos",
          "type": "Location"
        },
        {
          "name": "useType",
          "type": "byte"
        },
        {
          "name": "unknownInt",
          "type": "int32"
        }
      ]
    },
    "14": {
      "name": "TRADEACCEPTED",
      "direction": "server",
      "fields": [
        {
          "name": "clientOffer",
          "type": "array",
          "lengthType": "int16",
          "elementType": "bool"
        },
        {
          "name": "partnerOffer",
          "type": "array",
          "lengthType": "int16",
          "elementType": "bool"
        }
      ]
    },
    "15": {
      "name": "GUILDREMOVE",
      "direction": "client",
      "fields": []
    },
    "16": {
      "name": "PETUPGRADEREQUEST",
      "direction": "client",
      "fields": []
    },
    "17": {
      "name": "ENTERARENA",
      "direction": "server",
      "fields": []
    },
    "18": {
      "name": "GOTO",
      "direction": "server",
      "fields": [
        {
          "name": "objectId",
          "type": "int32"
        },
        {
          "name": "position",
          "type": "Location"
        },
        {
          "name": "unknown",
          "type": "int32"
        }
      ]
    },
    "19": {
      "name": "INVDROP",
      "direction": "client",
      "fields": [
        {
          "name": "slotObject",
          "type": "SlotObject"
        },
        {
          "name": "unknownByte",
          "type": "sbyte"
        }
      ]
    },
    "20": {
      "name": "OTHERHIT",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "bulletId",
          "type": "uint16"
        },
        {
          "name": "objectId",
          "type": "int32"
        },
        {
          "name": "targetId",
          "type": "int32"
        }
      ]
    },
    "21": {
      "name": "NAMERESULT",
      "direction": "server",
      "fields": []
    },
    "22": {
      "name": "BUYRESULT",
      "direction": "server",
      "fields": []
    },
    "23": {
      "name": "HATCHPET",
      "direction": "server",
      "fields": []
    },
    "24": {
      "name": "ACTIVEPETPDATEREQ",
      "direction": "client",
      "fields": [
        {
          "name": "commandId",
          "type": "byte"
        },
        {
          "name": "petId",
          "type": "uint32"
        }
      ],
      "note": "Same wire as EK ActivePetUpdateRequest."
    },
    "25": {
      "name": "ENEMYHIT",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "bulletId",
          "type": "int16"
        },
        {
          "name": "ownerId",
          "type": "int32"
        },
        {
          "name": "targetId",
          "type": "int32"
        },
        {
          "name": "kill",
          "type": "bool"
        },
        {
          "name": "unknownId",
          "type": "int32"
        }
      ]
    },
    "26": {
      "name": "GUILDRESULT",
      "direction": "server",
      "fields": []
    },
    "27": {
      "name": "EDITACCOUNTLIST",
      "direction": "client",
      "fields": []
    },
    "28": {
      "name": "TRADECHANGED",
      "direction": "server",
      "fields": [
        {
          "name": "offer",
          "type": "array",
          "lengthType": "int16",
          "elementType": "bool"
        }
      ]
    },
    "30": {
      "name": "PLAYERSHOOT",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "shotId",
          "type": "uint16"
        },
        {
          "name": "containerType",
          "type": "int16"
        },
        {
          "name": "attackIndex",
          "type": "sbyte"
        },
        {
          "name": "projectilePosition",
          "type": "Location"
        },
        {
          "name": "angle",
          "type": "float"
        },
        {
          "name": "bulletId",
          "type": "byte"
        },
        {
          "name": "unknownShort",
          "type": "int16"
        },
        {
          "name": "playerPosition",
          "type": "Location"
        }
      ]
    },
    "31": {
      "name": "PONG",
      "direction": "client",
      "fields": [
        {
          "name": "serial",
          "type": "int32"
        },
        {
          "name": "time",
          "type": "int32"
        }
      ]
    },
    "33": {
      "name": "CHANGEPETSKIN",
      "direction": "client",
      "fields": []
    },
    "34": {
      "name": "TRADEDONE",
      "direction": "server",
      "fields": [
        {
          "name": "code",
          "type": "int32"
        },
        {
          "name": "description",
          "type": "string"
        }
      ]
    },
    "35": {
      "name": "ENEMYSHOOT",
      "direction": "server",
      "fields": [
        {
          "name": "bulletId",
          "type": "int16"
        },
        {
          "name": "ownerId",
          "type": "int32"
        },
        {
          "name": "bulletType",
          "type": "byte"
        },
        {
          "name": "position",
          "type": "Location"
        },
        {
          "name": "angle",
          "type": "float"
        },
        {
          "name": "damage",
          "type": "int16"
        },
        {
          "name": "numShots",
          "type": "byte",
          "optional": true,
          "default": 255
        },
        {
          "name": "angleInc",
          "type": "float",
          "optional": true,
          "default": 0.0
        }
      ]
    },
    "36": {
      "name": "ACCEPTTRADE",
      "direction": "client",
      "fields": [
        {
          "name": "clientOffer",
          "type": "array",
          "lengthType": "int16",
          "elementType": "bool"
        },
        {
          "name": "partnerOffer",
          "type": "array",
          "lengthType": "int16",
          "elementType": "bool"
        }
      ]
    },
    "37": {
      "name": "CHANGEGUILDRANK",
      "direction": "client",
      "fields": []
    },
    "38": {
      "name": "PLAYSOUND",
      "direction": "server",
      "fields": []
    },
    "39": {
      "name": "VERIFYEMAIL",
      "direction": "server",
      "fields": []
    },
    "40": {
      "name": "SQUAREHIT",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "bulletId",
          "type": "int16"
        },
        {
          "name": "objectId",
          "type": "int32"
        }
      ]
    },
    "41": {
      "name": "NEWABILITYMESSAGE",
      "direction": "server",
      "fields": [
        {
          "name": "abilityType",
          "type": "int32"
        }
      ]
    },
    "42": {
      "name": "UPDATE",
      "direction": "server",
      "fields": [
        {
          "name": "position",
          "type": "Location"
        },
        {
          "name": "levelType",
          "type": "byte"
        },
        {
          "name": "tiles",
          "type": "array",
          "lengthType": "compressedInt",
          "elementType": "Tile"
        },
        {
          "name": "newObjs",
          "type": "array",
          "lengthType": "compressedInt",
          "elementType": "Entity"
        },
        {
          "name": "drops",
          "type": "array",
          "lengthType": "compressedInt",
          "elementType": "compressedInt"
        }
      ]
    },
    "44": {
      "name": "TEXT",
      "direction": "server",
      "fields": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "objectId",
          "type": "int32"
        },
        {
          "name": "numStars",
          "type": "int16"
        },
        {
          "name": "bubbleTime",
          "type": "byte"
        },
        {
          "name": "recipient",
          "type": "string"
        },
        {
          "name": "text",
          "type": "string"
        },
        {
          "name": "cleanText",
          "type": "string"
        },
        {
          "name": "isSupporter",
          "type": "bool"
        },
        {
          "name": "starBg",
          "type": "int32"
        }
      ]
    },
    "45": {
      "name": "RECONNECT",
      "direction": "server",
      "fields": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "host",
          "type": "string"
        },
        {
          "name": "port",
          "type": "uint16"
        },
        {
          "name": "gameId",
          "type": "int32"
        },
        {
          "name": "keyTime",
          "type": "int32"
        },
        {
          "name": "key",
          "type": "byteArray16"
        }
      ]
    },
    "46": {
      "name": "DEATH",
      "direction": "server",
      "fields": [
        {
          "name": "accountId",
          "type": "string"
        },
        {
          "name": "charId",
          "type": "compressedInt"
        },
        {
          "name": "killedBy",
          "type": "string"
        },
        {
          "name": "unknownInt",
          "type": "int32"
        },
        {
          "name": "fameEarned",
          "type": "compressedInt"
        },
        {
          "name": "accountLevel",
          "type": "compressedInt"
        },
        {
          "name": "accountXP",
          "type": "compressedInt"
        }
      ],
      "note": "Partial definition \\u2014 fameBonuses and pcStats have complex encoding. Remaining bytes pass through as unreadData."
    },
    "47": {
      "name": "USEPORTAL",
      "direction": "client",
      "fields": [
        {
          "name": "objectId",
          "type": "int32"
        }
      ]
    },
    "48": {
      "name": "GOTOQUESTROOM",
      "direction": "client",
      "fields": []
    },
    "49": {
      "name": "ALLYSHOOT",
      "direction": "server",
      "fields": [
        {
          "name": "unknownByte",
          "type": "byte"
        },
        {
          "name": "unknownShort",
          "type": "int16"
        }
      ]
    },
    "50": {
      "name": "IMMINENTARENAWAVE",
      "direction": "server",
      "fields": []
    },
    "51": {
      "name": "RESKIN",
      "direction": "client",
      "fields": []
    },
    "52": {
      "name": "RESETDAILYQUESTS",
      "direction": "client",
      "fields": []
    },
    "53": {
      "name": "PETCHANGEFORMMSG",
      "direction": "server",
      "fields": []
    },
    "55": {
      "name": "INVENTORYSWAP",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "position",
          "type": "Location"
        },
        {
          "name": "slotObject1",
          "type": "SlotObject"
        },
        {
          "name": "slotObject2",
          "type": "SlotObject"
        },
        {
          "name": "tickId",
          "type": "int32",
          "optional": true,
          "default": 0
        }
      ]
    },
    "56": {
      "name": "CHANGETRADE",
      "direction": "client",
      "fields": [
        {
          "name": "offer",
          "type": "array",
          "lengthType": "int16",
          "elementType": "bool"
        }
      ]
    },
    "57": {
      "name": "CREATE",
      "direction": "client",
      "fields": [
        {
          "name": "classType",
          "type": "int16"
        },
        {
          "name": "skinType",
          "type": "int16"
        },
        {
          "name": "isChallenger",
          "type": "bool"
        },
        {
          "name": "isSeasonal",
          "type": "bool"
        }
      ]
    },
    "58": {
      "name": "QUESTREDEEM",
      "direction": "client",
      "fields": []
    },
    "59": {
      "name": "CREATEGUILD",
      "direction": "client",
      "fields": []
    },
    "60": {
      "name": "SETCONDITION",
      "direction": "client",
      "fields": [
        {
          "name": "conditionEffect",
          "type": "byte"
        },
        {
          "name": "conditionDuration",
          "type": "float"
        }
      ]
    },
    "61": {
      "name": "LOAD",
      "direction": "client",
      "fields": [
        {
          "name": "charId",
          "type": "int32"
        },
        {
          "name": "isFromArena",
          "type": "bool"
        }
      ]
    },
    "62": {
      "name": "MOVE",
      "direction": "client",
      "fields": [
        {
          "name": "tickId",
          "type": "int32"
        },
        {
          "name": "serverRealTimeMSofLastNewTick",
          "type": "uint32"
        },
        {
          "name": "records",
          "type": "array",
          "lengthType": "int16",
          "elementType": "LocationRecord"
        }
      ]
    },
    "63": {
      "name": "KEYINFORESPONSE",
      "direction": "server",
      "fields": []
    },
    "64": {
      "name": "AOE",
      "direction": "server",
      "fields": [
        {
          "name": "position",
          "type": "Location"
        },
        {
          "name": "radius",
          "type": "float"
        },
        {
          "name": "damage",
          "type": "uint16"
        },
        {
          "name": "effect",
          "type": "byte"
        },
        {
          "name": "effectDuration",
          "type": "float"
        },
        {
          "name": "originType",
          "type": "uint16"
        },
        {
          "name": "color",
          "type": "int32"
        },
        {
          "name": "armorPierce",
          "type": "bool"
        }
      ]
    },
    "65": {
      "name": "GOTOACK",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "unknownByte",
          "type": "byte"
        }
      ]
    },
    "66": {
      "name": "GLOBALNOTIFICATION",
      "direction": "server",
      "fields": [
        {
          "name": "notificationType",
          "type": "int32"
        },
        {
          "name": "text",
          "type": "string"
        }
      ]
    },
    "67": {
      "name": "NOTIFICATION",
      "direction": "server",
      "fields": [
        {
          "name": "typeValue",
          "type": "byte"
        },
        {
          "name": "textByte",
          "type": "byte"
        }
      ],
      "note": "Complex conditional packet - extra fields depend on typeValue. Remaining bytes stored in unreadData for passthrough."
    },
    "68": {
      "name": "ARENADEATH",
      "direction": "server",
      "fields": []
    },
    "69": {
      "name": "CLIENTSTAT",
      "direction": "server",
      "fields": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "value",
          "type": "int32"
        }
      ]
    },
    "74": {
      "name": "HELLO",
      "direction": "client",
      "fields": [
        {
          "name": "gameId",
          "type": "int32"
        },
        {
          "name": "buildVersion",
          "type": "string"
        },
        {
          "name": "accessToken",
          "type": "string"
        },
        {
          "name": "keyTime",
          "type": "int32"
        },
        {
          "name": "key",
          "type": "byteArray16"
        },
        {
          "name": "gameNet",
          "type": "string"
        },
        {
          "name": "playPlatform",
          "type": "string"
        },
        {
          "name": "platformToken",
          "type": "string"
        },
        {
          "name": "userToken",
          "type": "string"
        },
        {
          "name": "clientIdentification",
          "type": "string"
        }
      ]
    },
    "75": {
      "name": "DAMAGE",
      "direction": "server",
      "fields": [
        {
          "name": "targetId",
          "type": "int32"
        },
        {
          "name": "effects",
          "type": "array",
          "lengthType": "byte",
          "elementType": "byte"
        },
        {
          "name": "damageAmount",
          "type": "uint16"
        },
        {
          "name": "kill",
          "type": "bool"
        },
        {
          "name": "bulletId",
          "type": "int16"
        },
        {
          "name": "objectId",
          "type": "int32"
        }
      ]
    },
    "76": {
      "name": "ACTIVEPET",
      "direction": "server",
      "fields": []
    },
    "77": {
      "name": "INVITEDTOGUILD",
      "direction": "server",
      "fields": []
    },
    "78": {
      "name": "PETYARDUPDATE",
      "direction": "server",
      "fields": []
    },
    "79": {
      "name": "PASSWORDPROMPT",
      "direction": "server",
      "fields": []
    },
    "80": {
      "name": "ACCEPTARENADEATH",
      "direction": "server",
      "fields": []
    },
    "81": {
      "name": "UPDATEACK",
      "direction": "client",
      "fields": []
    },
    "82": {
      "name": "QUESTOBJECTID",
      "direction": "server",
      "fields": [
        {
          "name": "objectId",
          "type": "int32"
        }
      ]
    },
    "83": {
      "name": "PIC",
      "direction": "server",
      "fields": []
    },
    "84": {
      "name": "REALMHEROESRESPONSE",
      "direction": "server",
      "fields": [
        {
          "name": "numberOfRealmHeros",
          "type": "int32"
        }
      ]
    },
    "85": {
      "name": "BUY",
      "direction": "client",
      "fields": [
        {
          "name": "objectId",
          "type": "int32"
        },
        {
          "name": "quantity",
          "type": "int32"
        }
      ]
    },
    "86": {
      "name": "TRADESTART",
      "direction": "server",
      "fields": [
        {
          "name": "clientItems",
          "type": "array",
          "lengthType": "int16",
          "elementType": "TradeItem"
        },
        {
          "name": "partnerName",
          "type": "string"
        },
        {
          "name": "partnerItems",
          "type": "array",
          "lengthType": "int16",
          "elementType": "TradeItem"
        }
      ]
    },
    "87": {
      "name": "EVOLVEPET",
      "direction": "server",
      "fields": []
    },
    "88": {
      "name": "TRADEREQUESTED",
      "direction": "server",
      "fields": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    "89": {
      "name": "AOEACK",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "position",
          "type": "Location"
        }
      ]
    },
    "90": {
      "name": "PLAYERHIT",
      "direction": "client",
      "fields": [
        {
          "name": "bulletId",
          "type": "int16"
        },
        {
          "name": "objectId",
          "type": "int32"
        }
      ]
    },
    "91": {
      "name": "CANCELTRADE",
      "direction": "client",
      "fields": []
    },
    "92": {
      "name": "MAPINFO",
      "direction": "server",
      "fields": [
        {
          "name": "width",
          "type": "int32"
        },
        {
          "name": "height",
          "type": "int32"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "displayName",
          "type": "string"
        },
        {
          "name": "realmName",
          "type": "string"
        },
        {
          "name": "fp",
          "type": "int32"
        },
        {
          "name": "background",
          "type": "int32"
        },
        {
          "name": "difficulty",
          "type": "float"
        },
        {
          "name": "allowPlayerTeleport",
          "type": "bool"
        },
        {
          "name": "noSave",
          "type": "bool"
        },
        {
          "name": "showDisplays",
          "type": "bool"
        },
        {
          "name": "maxPlayers",
          "type": "int16"
        },
        {
          "name": "gameOpenedTime",
          "type": "int32"
        },
        {
          "name": "serverVersion",
          "type": "string"
        },
        {
          "name": "viewDistance",
          "type": "int16"
        },
        {
          "name": "bgColor",
          "type": "int32",
          "optional": true,
          "default": 0
        },
        {
          "name": "modifier",
          "type": "string",
          "optional": true,
          "default": ""
        },
        {
          "name": "unknownShort1",
          "type": "int16",
          "optional": true,
          "default": 0
        },
        {
          "name": "unknownBool",
          "type": "bool",
          "optional": true,
          "default": false
        },
        {
          "name": "unknownShort2",
          "type": "int16",
          "optional": true,
          "default": 0
        },
        {
          "name": "maxRealmScore",
          "type": "int32",
          "optional": true,
          "default": 0
        },
        {
          "name": "currentRealmScore",
          "type": "int32",
          "optional": true,
          "default": 0
        }
      ]
    },
    "93": {
      "name": "CLAIMDAILYLOGINRESPONSE",
      "direction": "server",
      "fields": [
        {
          "name": "itemId",
          "type": "int32"
        },
        {
          "name": "quantity",
          "type": "int32"
        },
        {
          "name": "gold",
          "type": "int32"
        }
      ]
    },
    "94": {
      "name": "KEYINFOREQUEST",
      "direction": "client",
      "fields": []
    },
    "95": {
      "name": "INVRESULT",
      "direction": "server",
      "fields": [
        {
          "name": "unknownBool",
          "type": "bool"
        },
        {
          "name": "unknownByte",
          "type": "sbyte"
        },
        {
          "name": "fromSlot",
          "type": "SlotObject"
        },
        {
          "name": "toSlot",
          "type": "SlotObject"
        },
        {
          "name": "unknownInt1",
          "type": "int32"
        },
        {
          "name": "unknownInt2",
          "type": "int32"
        }
      ]
    },
    "96": {
      "name": "QUESTREDEEMRESPONSE",
      "direction": "server",
      "fields": []
    },
    "97": {
      "name": "CHOOSENAME",
      "direction": "client",
      "fields": []
    },
    "98": {
      "name": "QUESTFETCHASK",
      "direction": "client",
      "fields": []
    },
    "99": {
      "name": "ACCOUNTLIST",
      "direction": "server",
      "fields": []
    },
    "100": {
      "name": "SHOOTACK",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        }
      ]
    },
    "101": {
      "name": "CREATESUCCESS",
      "direction": "server",
      "fields": [
        {
          "name": "objectId",
          "type": "int32"
        },
        {
          "name": "charId",
          "type": "int32"
        },
        {
          "name": "stats",
          "type": "string"
        }
      ]
    },
    "102": {
      "name": "CHECKCREDITS",
      "direction": "client",
      "fields": []
    },
    "103": {
      "name": "GROUNDDAMAGE",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "position",
          "type": "Location"
        }
      ]
    },
    "104": {
      "name": "GUILDINVITE",
      "direction": "client",
      "fields": []
    },
    "105": {
      "name": "ESCAPE",
      "direction": "client",
      "fields": []
    },
    "106": {
      "name": "FILE",
      "direction": "server",
      "fields": []
    },
    "107": {
      "name": "RESKINUNLOCK",
      "direction": "server",
      "fields": [
        {
          "name": "isPetSkin",
          "type": "int32"
        }
      ]
    },
    "108": {
      "name": "NEWCHARACTERINFO",
      "direction": "server",
      "fields": []
    },
    "109": {
      "name": "UNLOCKINFORMATION",
      "direction": "server",
      "fields": []
    },
    "112": {
      "name": "QUEUEMESSAGE",
      "direction": "server",
      "fields": [
        {
          "name": "curPos",
          "type": "uint16"
        },
        {
          "name": "maxPos",
          "type": "uint16"
        }
      ],
      "note": "RealmShark QUEUE_INFORMATION (112, incoming)."
    },
    "113": {
      "name": "QUEUECANCEL",
      "direction": "client",
      "fields": [
        {
          "name": "queueType",
          "type": "string"
        }
      ]
    },
    "114": {
      "name": "EXALTATIONBONUSCHANGED",
      "direction": "server",
      "fields": [
        {
          "name": "objType",
          "type": "int16"
        },
        {
          "name": "dexProgress",
          "type": "compressedInt"
        },
        {
          "name": "spdProgress",
          "type": "compressedInt"
        },
        {
          "name": "vitProgress",
          "type": "compressedInt"
        },
        {
          "name": "wisProgress",
          "type": "compressedInt"
        },
        {
          "name": "defProgress",
          "type": "compressedInt"
        },
        {
          "name": "attProgress",
          "type": "compressedInt"
        },
        {
          "name": "manaProgress",
          "type": "compressedInt"
        },
        {
          "name": "lifeProgress",
          "type": "compressedInt"
        }
      ]
    },
    "115": {
      "name": "REDEEMEXALTATIONREWARD",
      "direction": "client",
      "fields": [
        {
          "name": "itemType",
          "type": "int32"
        }
      ]
    },
    "117": {
      "name": "VAULTCONTENT",
      "direction": "server",
      "fields": [
        { "name": "lastVaultUpdate",          "type": "bool"          },
        { "name": "vaultChestObjectId",        "type": "compressedInt" },
        { "name": "materialChestObjectId",     "type": "compressedInt" },
        { "name": "giftChestObjectId",         "type": "compressedInt" },
        { "name": "potionStorageObjectId",     "type": "compressedInt" },
        { "name": "seasonalSpoilChestObjectId","type": "compressedInt" },
        { "name": "vaultContents",      "type": "array", "lengthType": "compressedInt", "elementType": "compressedInt" },
        { "name": "materialContents",   "type": "array", "lengthType": "compressedInt", "elementType": "compressedInt" },
        { "name": "giftContents",       "type": "array", "lengthType": "compressedInt", "elementType": "compressedInt" },
        { "name": "potionContents",     "type": "array", "lengthType": "compressedInt", "elementType": "compressedInt" },
        { "name": "seasonalSpoilContent","type": "array", "lengthType": "compressedInt", "elementType": "compressedInt" },
        { "name": "vaultUpgradeCost",    "type": "int16" },
        { "name": "materialUpgradeCost", "type": "int16" },
        { "name": "seasonalSpoilUpgradeCost", "type": "int16" },
        { "name": "potionUpgradeCost",   "type": "int16" },
        { "name": "currentPotionMax",    "type": "int16" },
        { "name": "nextPotionMax",       "type": "int16" },
        { "name": "vaultChestEnchants",  "type": "string" },
        { "name": "giftChestEnchants",   "type": "string" },
        { "name": "spoilsChestEnchants", "type": "string" }
      ]
    },
    "118": {
      "name": "FORGEREQUEST",
      "direction": "client",
      "fields": []
    },
    "119": {
      "name": "FORGERESULT",
      "direction": "server",
      "fields": []
    },
    "120": {
      "name": "FORGEUNLOCKEDBLUEPRINTS",
      "direction": "server",
      "fields": [
        {
          "name": "unknownByte",
          "type": "sbyte"
        },
        {
          "name": "blueprints",
          "type": "array",
          "lengthType": "compressedInt",
          "elementType": "compressedInt"
        }
      ]
    },
    "121": {
      "name": "SHOOTACKCOUNTER",
      "direction": "client",
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "count",
          "type": "int16"
        }
      ],
      "note": "RealmShark SHOOT_ACK (121, outgoing)."
    },
    "122": {
      "name": "SHOWALLYSHOOT",
      "direction": "client",
      "fields": [
        {
          "name": "toggle",
          "type": "int32"
        }
      ],
      "note": "RealmShark CHANGE_ALLYSHOOT (122, outgoing)."
    },
    "123": {
      "name": "GETPLAYERSLISTMESSAGE",
      "direction": "client",
      "fields": []
    },
    "124": {
      "name": "MODERATORACTIONMESSAGE",
      "direction": "client",
      "fields": []
    },
    "126": {
      "name": "CREEPMOVEMESSAGE",
      "direction": "client",
      "fields": []
    },
    "129": {
      "name": "CUSTOMMAPDELETE",
      "direction": "client",
      "fields": []
    },
    "131": {
      "name": "CUSTOMMAPLIST",
      "direction": "client",
      "fields": []
    },
    "133": {
      "name": "CREEPHIT",
      "direction": "client",
      "fields": []
    },
    "134": {
      "name": "PLAYERCALLOUT",
      "direction": "client",
      "fields": [
        {
          "name": "calloutType",
          "type": "byte"
        },
        {
          "name": "value",
          "type": "int32"
        }
      ]
    },
    "136": {
      "name": "BUYREFINEMENT",
      "direction": "client",
      "fields": [
        {
          "name": "slot",
          "type": "SlotObject"
        },
        {
          "name": "action",
          "type": "int16"
        }
      ]
    },
    "137": {
      "name": "DASH",
      "direction": "client",
      "fields": []
    },
    "138": {
      "name": "DASHACK",
      "direction": "client",
      "fields": []
    },
    "139": {
      "name": "STATS",
      "direction": "server",
      "fields": [
        {
          "name": "charId",
          "type": "compressedInt"
        }
      ],
      "note": "RealmShark StatsPacket: charId then StatsStateData; remainder stays in unreadData until schema is extended."
    },
    "140": {
      "name": "BUYCUSTOMISATIONSOCKET",
      "direction": "client",
      "fields": []
    },
    "145": {
      "name": "FAVORPET",
      "direction": "client",
      "fields": [
        {
          "name": "petId",
          "type": "int32"
        }
      ]
    },
    "146": {
      "name": "SKINRECYCLE",
      "direction": "client",
      "fields": [
        {
          "name": "item",
          "type": "SlotObject"
        }
      ]
    },
    "147": {
      "name": "UNKNOWN147",
      "direction": "server",
      "fields": []
    },
    "148": {
      "name": "DAMAGEBOOST",
      "direction": "server",
      "fields": []
    },
    "149": {
      "name": "CLAIMBATTLEPASS",
      "direction": "client",
      "fields": [
        {
          "name": "item",
          "type": "sbyte"
        }
      ]
    },
    "150": {
      "name": "CLAIMBATTLEPASSRESPONSE",
      "direction": "server",
      "fields": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "note": "RealmShark CLAIM_BP_MILESTONE_RESULT (150, incoming). EK ClaimBPMilestoneResult."
    },
    "151": {
      "name": "BOOSTBPMILESTONE",
      "direction": "client",
      "fields": [
        {
          "name": "milestoneIndex",
          "type": "byte"
        }
      ]
    },
    "154": {
      "name": "CONVERTSEASONALCHARACTER",
      "direction": "client",
      "fields": []
    },
    "155": {
      "name": "RETITLE",
      "direction": "client",
      "fields": [
        {
          "name": "prefix",
          "type": "int32"
        },
        {
          "name": "suffix",
          "type": "int32"
        }
      ]
    },
    "156": {
      "name": "SETGRAVESTONE",
      "direction": "client",
      "fields": []
    },
    "157": {
      "name": "SETABILITY",
      "direction": "client",
      "fields": [
        {
          "name": "abilityType",
          "type": "int32"
        },
        {
          "name": "abilityIndex",
          "type": "sbyte"
        }
      ]
    },
    "159": {
      "name": "EMOTE",
      "direction": "client",
      "fields": [
        {
          "name": "emoteId",
          "type": "int32"
        },
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "unknownBool",
          "type": "bool"
        }
      ],
      "note": "RealmShark EMOTE (159). EK Emote uses bool, not sbyte."
    },
    "160": {
      "name": "BUYEMOTE",
      "direction": "client",
      "fields": [
        {
          "name": "emoteId",
          "type": "int32"
        }
      ]
    },
    "162": {
      "name": "SETTRACKEDSEASON",
      "direction": "client",
      "fields": []
    },
    "163": {
      "name": "CLAIMMISSION",
      "direction": "client",
      "fields": [
        {
          "name": "missionId",
          "type": "int32"
        },
        {
          "name": "unknownByte1",
          "type": "byte"
        },
        {
          "name": "unknownByte2",
          "type": "byte"
        },
        {
          "name": "unknownShort",
          "type": "uint16"
        }
      ]
    },
    "164": {
      "name": "UNKNOWN164",
      "direction": "server",
      "fields": []
    },
    "165": {
      "name": "UNKNOWN165",
      "direction": "server",
      "fields": [
        {
          "name": "unknownStr",
          "type": "string"
        }
      ]
    },
    "166": {
      "name": "STASIS",
      "direction": "server",
      "fields": []
    },
    "167": {
      "name": "SETDISCOVERABLE",
      "direction": "client",
      "fields": []
    },
    "169": {
      "name": "REALMSCOREUPDATE",
      "direction": "server",
      "fields": [
        {
          "name": "score",
          "type": "int32"
        }
      ]
    },
    "170": {
      "name": "CLAIMREWARDSINFOPROMPT",
      "direction": "server",
      "fields": []
    },
    "171": {
      "name": "CLAIMCHESTREWARD",
      "direction": "server",
      "fields": []
    },
    "172": {
      "name": "CHESTREWARDRESULT",
      "direction": "server",
      "fields": []
    },
    "173": {
      "name": "UNLOCKENCHANTMENTSLOT",
      "direction": "client",
      "fields": []
    },
    "175": {
      "name": "UNLOCKENCHANTMENT",
      "direction": "client",
      "fields": []
    },
    "177": {
      "name": "APPLYENCHANTMENT",
      "direction": "client",
      "fields": []
    },
    "180": {
      "name": "ACTIVATECRUCIBLE",
      "direction": "client",
      "fields": [
        {
          "name": "crucibleId",
          "type": "string"
        },
        {
          "name": "activate",
          "type": "bool"
        }
      ]
    },
    "181": {
      "name": "UNKNOWN181",
      "direction": "server",
      "fields": []
    },
    "182": {
      "name": "CRUCIBLEREQUEST",
      "direction": "client",
      "fields": [
        {
          "name": "types",
          "type": "array",
          "lengthType": "int16",
          "elementType": "int32"
        }
      ]
    },
    "183": {
      "name": "CRUCIBLERESPONSE",
      "direction": "server",
      "fields": [
        {
          "name": "crucibleIds",
          "type": "array",
          "lengthType": "int16",
          "elementType": "int32"
        },
        {
          "name": "crucibleJsons",
          "type": "array",
          "lengthType": "int16",
          "elementType": "string"
        }
      ]
    },
    "185": {
      "name": "UPGRADEENCHANTER",
      "direction": "client",
      "fields": []
    },
    "187": {
      "name": "UPGRADEENCHANTMENT",
      "direction": "client",
      "fields": []
    },
    "189": {
      "name": "REROLLALLENCHANTMENTS",
      "direction": "client",
      "fields": []
    },
    "190": {
      "name": "UNKNOWN190",
      "direction": "server",
      "fields": []
    },
    "191": {
      "name": "RESETENCHANTMENTREROLLCOUNT",
      "direction": "client",
      "fields": []
    },
    "200": {
      "name": "CREATEPARTYMESSAGE",
      "direction": "client",
      "fields": [
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "minPowerLevel",
          "type": "int16"
        },
        {
          "name": "maxPartySize",
          "type": "sbyte"
        },
        {
          "name": "activity",
          "type": "sbyte"
        },
        {
          "name": "maxedStatReq",
          "type": "sbyte"
        },
        {
          "name": "privacy",
          "type": "sbyte"
        },
        {
          "name": "serverIndex",
          "type": "byte"
        }
      ]
    },
    "204": {
      "name": "PARTYACTIONRESULT",
      "direction": "client",
      "fields": [
        {
          "name": "playerId",
          "type": "uint16"
        },
        {
          "name": "actionId",
          "type": "byte"
        }
      ],
      "note": "C\u2192S (EK PartyActionResult). playerId 0xFFFF often self; actionId drives party UI (e.g. list refresh)."
    },
    "207": {
      "name": "PARTYACTION",
      "direction": "server",
      "fields": [
        {
          "name": "playerId",
          "type": "uint16"
        },
        {
          "name": "actionId",
          "type": "byte"
        }
      ],
      "note": "S\u2192C (EK PartyAction). Server echo / result for party actions."
    },
    "208": {
      "name": "INCOMINGPARTYINVITE",
      "direction": "server",
      "fields": [
        {
          "name": "partyId",
          "type": "uint32"
        },
        {
          "name": "inviterName",
          "type": "string"
        }
      ]
    },
    "209": {
      "name": "PARTYINVITERESPONSE",
      "direction": "client",
      "fields": [
        {
          "name": "partyId",
          "type": "uint32"
        },
        {
          "name": "accept",
          "type": "byte"
        }
      ]
    },
    "210": {
      "name": "INCOMINGPARTYMEMBERINFO",
      "direction": "server",
      "fields": [
        {
          "name": "partyId",
          "type": "uint32"
        },
        {
          "name": "unknownShort",
          "type": "uint16"
        },
        {
          "name": "maxSize",
          "type": "byte"
        },
        {
          "name": "partyPlayers",
          "type": "array",
          "lengthType": "int16",
          "elementType": "PartyPlayer"
        },
        {
          "name": "description",
          "type": "string"
        }
      ],
      "note": "EK IncomingPartyMemberInfo.Read order; PartyPlayer matches EK PartyPlayer."
    },
    "212": {
      "name": "PARTYMEMBERADDED",
      "direction": "server",
      "fields": [
        {
          "name": "playerId",
          "type": "uint16"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "classId",
          "type": "uint16"
        },
        {
          "name": "skinId",
          "type": "uint16"
        }
      ]
    },
    "214": {
      "name": "PARTYLISTMESSAGE",
      "direction": "server",
      "fields": [
        {
          "name": "packetNumber",
          "type": "byte"
        },
        {
          "name": "parties",
          "type": "array",
          "lengthType": "int16",
          "elementType": "PartyInfo"
        }
      ],
      "note": "EK PartyList; activity/privacy are bytes (PartyActivity, PartyPrivacy enums)."
    },
    "215": {
      "name": "PARTYJOINREQUEST",
      "direction": "client",
      "fields": [
        {
          "name": "partyId",
          "type": "uint32"
        },
        {
          "name": "unknownByte",
          "type": "byte"
        }
      ],
      "note": "C\u2192S: client requests to join a party (partyId + byte; matches EK PartyJoinRequest)."
    },
    "217": {
      "name": "PARTYJOINREQUESTRESPONSE",
      "direction": "server",
      "fields": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "classId",
          "type": "uint16"
        },
        {
          "name": "skinId",
          "type": "uint16"
        },
        {
          "name": "state",
          "type": "byte"
        }
      ]
    },
    "218": {
      "name": "FORRECONNECT",
      "direction": "server",
      "fields": []
    },
    "222": {
      "name": "LOADINGSCREEN",
      "direction": "server",
      "fields": []
    }
  },
  "dataObjects": {
    "FameData": {
      "fields": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "rank",
          "type": "compressedInt"
        },
        {
          "name": "fame",
          "type": "compressedInt"
        }
      ]
    },
    "Location": {
      "fields": [
        {
          "name": "x",
          "type": "float"
        },
        {
          "name": "y",
          "type": "float"
        }
      ]
    },
    "LocationRecord": {
      "fields": [
        {
          "name": "time",
          "type": "int32"
        },
        {
          "name": "x",
          "type": "float"
        },
        {
          "name": "y",
          "type": "float"
        }
      ]
    },
    "Tile": {
      "fields": [
        {
          "name": "x",
          "type": "int16"
        },
        {
          "name": "y",
          "type": "int16"
        },
        {
          "name": "type",
          "type": "uint16"
        }
      ]
    },
    "Entity": {
      "fields": [
        {
          "name": "objectType",
          "type": "uint16"
        },
        {
          "name": "status",
          "type": "Status"
        }
      ]
    },
    "Status": {
      "fields": [
        {
          "name": "objectId",
          "type": "compressedInt"
        },
        {
          "name": "position",
          "type": "Location"
        },
        {
          "name": "data",
          "type": "array",
          "lengthType": "compressedInt",
          "elementType": "StatData"
        }
      ]
    },
    "StatData": {
      "fields": [
        {
          "name": "id",
          "type": "byte"
        },
        {
          "name": "value",
          "type": "statValue"
        },
        {
          "name": "stackCount",
          "type": "compressedInt"
        }
      ]
    },
    "SlotObject": {
      "fields": [
        {
          "name": "objectId",
          "type": "int32"
        },
        {
          "name": "slotId",
          "type": "int32"
        },
        {
          "name": "objectType",
          "type": "int32"
        }
      ]
    },
    "PartyInfo": {
      "fields": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "partyId",
          "type": "uint32"
        },
        {
          "name": "powerLevelMin",
          "type": "uint16"
        },
        {
          "name": "partySizeCurrent",
          "type": "byte"
        },
        {
          "name": "partySizeMax",
          "type": "byte"
        },
        {
          "name": "activity",
          "type": "byte"
        },
        {
          "name": "privacy",
          "type": "byte"
        },
        {
          "name": "statsMin",
          "type": "byte"
        },
        {
          "name": "serverIndex",
          "type": "byte"
        }
      ]
    },
    "PartyPlayer": {
      "fields": [
        {
          "name": "playerId",
          "type": "uint16"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "classId",
          "type": "uint16"
        },
        {
          "name": "skinId",
          "type": "uint16"
        }
      ]
    },
    "QuestData": {
      "fields": [
        {
          "name": "id",
          "type": "string"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "description",
          "type": "string"
        },
        {
          "name": "expiration",
          "type": "string"
        },
        {
          "name": "category",
          "type": "int32"
        },
        {
          "name": "type",
          "type": "int32"
        },
        {
          "name": "itemsNeeded",
          "type": "array",
          "lengthType": "int16",
          "elementType": "int32"
        },
        {
          "name": "rewards",
          "type": "array",
          "lengthType": "int16",
          "elementType": "int32"
        },
        {
          "name": "completed",
          "type": "bool"
        },
        {
          "name": "choice",
          "type": "bool"
        },
        {
          "name": "repeatable",
          "type": "bool"
        }
      ]
    },
    "TradeItem": {
      "fields": [
        {
          "name": "item",
          "type": "int32"
        },
        {
          "name": "slotType",
          "type": "int32"
        },
        {
          "name": "tradeable",
          "type": "bool"
        },
        {
          "name": "included",
          "type": "bool"
        },
        {
          "name": "enchantment",
          "type": "string"
        }
      ]
    }
  }
}
`:r==="stat"?`{
  "stringStats": [6, 31, 38, 54, 62, 71, 72, 80, 82, 115, 121, 127, 128, 147, 155],
  "statNames": {
    "0": "MaxHP",
    "1": "HP",
    "2": "Size",
    "3": "MaxMP",
    "4": "MP",
    "5": "NextLevelExp",
    "6": "Exp",
    "7": "Level",
    "8": "Inventory0",
    "9": "Inventory1",
    "10": "Inventory2",
    "11": "Inventory3",
    "12": "Inventory4",
    "13": "Inventory5",
    "14": "Inventory6",
    "15": "Inventory7",
    "16": "Inventory8",
    "17": "Inventory9",
    "18": "Inventory10",
    "19": "Inventory11",
    "20": "Attack",
    "21": "Defense",
    "22": "Speed",
    "24": "Reserved24",
    "25": "Texture",
    "26": "Vitality",
    "27": "Wisdom",
    "28": "Dexterity",
    "29": "Effects",
    "30": "Stars",
    "31": "NameStat",
    "32": "Texture1",
    "33": "Texture2",
    "34": "Credits",
    "35": "SellablePrice",
    "36": "PortalPlayerCount",
    "37": "Deprecated37",
    "38": "AccountId",
    "39": "CurrentFame",
    "40": "MerchantCurrency",
    "41": "ObjectConnection",
    "42": "MerchantRemainingCount",
    "43": "MerchantRemainingMinute",
    "44": "MerchantDiscount",
    "45": "RankRequired",
    "46": "HpBoost",
    "47": "MpBoost",
    "48": "AttackBonus",
    "49": "DefenseBonus",
    "50": "SpeedBonus",
    "51": "VitalityBonus",
    "52": "WisdomBonus",
    "53": "DexterityBonus",
    "54": "OwnerAccountId",
    "58": "NameChangerStar",
    "62": "GuildName",
    "63": "GuildRank",
    "64": "OxygenBar",
    "71": "Material",
    "72": "MaterialCap",
    "73": "HealthStackCount",
    "74": "MagicStackCount",
    "75": "HasBackpack",
    "76": "Skin",
    "77": "PetInstanceId",
    "78": "PetName",
    "79": "PetType",
    "80": "UniqueDataStr",
    "81": "PetRarity",
    "82": "PetNameStat",
    "83": "PetMaxAbilityPower",
    "84": "PetFamily",
    "85": "PetFirstAbilityPoint",
    "86": "PetSecondAbilityPoint",
    "87": "PetThirdAbilityPoint",
    "88": "PetFirstAbilityPower",
    "89": "PetSecondAbilityPower",
    "90": "PetThirdAbilityPower",
    "91": "PetFirstAbilityType",
    "92": "PetSecondAbilityType",
    "93": "PetThirdAbilityType",
    "95": "Effects2",
    "99": "FortuneTokens",
    "100": "SupporterPoints",
    "102": "Supporter",
    "103": "ProjectileSpeed0",
    "104": "ProjectileSpeed1",
    "105": "ProjectileSpeed2",
    "106": "ProjectileSpeed3",
    "107": "ProjectileLife0",
    "108": "ProjectileLife1",
    "109": "ProjectileLife2",
    "110": "ProjectileLife3",
    "115": "GraveAccountId",
    "119": "XpBoostTime",
    "120": "LootDropBoostTime",
    "121": "ModifiersStat",
    "122": "LootTierBoostTime",
    "123": "ExaltedAttack",
    "124": "PowerLevel",
    "125": "ExaltedSpeed",
    "126": "ExaltedVitality",
    "127": "DustStat",
    "128": "CrucibleStat",
    "129": "ExaltedWisdom",
    "130": "ExaltedDexterity",
    "131": "ExaltedMaxHP",
    "132": "ExaltedMaxMP",
    "133": "ExaltationDamageMultiplier",
    "134": "SinkLevel",
    "135": "Backpack0",
    "136": "Backpack1",
    "137": "Backpack2",
    "138": "Backpack3",
    "139": "Backpack4",
    "140": "Backpack5",
    "141": "Backpack6",
    "142": "Backpack7",
    "143": "QuickSlot0",
    "144": "QuickSlot1",
    "145": "QuickSlot2",
    "146": "ClassQuestCompletions",
    "147": "DustAmountStat",
    "148": "Backpack8",
    "149": "Backpack9",
    "150": "Backpack10",
    "151": "Backpack11",
    "152": "Backpack12",
    "153": "Backpack13",
    "154": "Backpack14",
    "155": "Backpack15"
  }
}
`:`{
  "EUEast": "18.184.218.174",
  "EUSouthWest": "35.180.67.120",
  "EUNorth": "18.159.133.120",
  "EUWest": "15.237.60.223",
  "EUWest2": "52.16.86.215",
  "USEast": "54.234.226.24",
  "USEast2": "54.209.152.223",
  "USWest": "54.86.47.176",
  "USWest3": "18.144.30.153",
  "USWest4": "54.235.235.140",
  "USMidWest": "18.221.120.59",
  "USMidWest2": "3.140.254.133",
  "USSouth": "3.82.126.16",
  "USSouth3": "52.207.206.31",
  "USSouthWest": "54.153.13.68",
  "USNorthWest": "34.238.176.119",
  "Asia": "3.0.147.127",
  "Australia": "3.107.164.237"
}
`)||"").trim();return t||null}catch{return null}}function $b(){if(An!==void 0)return An;let r=Ed("packet");if(!r)return An=null,null;try{return An=JSON.parse(r),An}catch{return An=null,null}}function Bb(){if(On!==void 0)return On;let r=Ed("stat");if(!r)return On=null,null;try{return On=JSON.parse(r),On}catch{return On=null,null}}function jb(){if(Mn!==void 0)return Mn;let r=Ed("servers");if(!r)return Mn=null,null;try{return Mn=JSON.parse(r),Mn}catch{return Mn=null,null}}var Dn=require("fs"),Ba=require("path");function ja(){let r=String(process.env.REALM_ENGINE_USER_CONFIG_PATH||"").trim();return r?(0,Ba.resolve)(r):null}function Fb(r){return ja()??(0,Ba.resolve)(r,"data","config.json")}function Hb(r){let e=(0,Ba.resolve)(r,"data","config.json"),t={};if((0,Dn.existsSync)(e))try{t={...t,...JSON.parse((0,Dn.readFileSync)(e,"utf8"))}}catch{}let n=ja();if(n&&(0,Dn.existsSync)(n))try{t={...t,...JSON.parse((0,Dn.readFileSync)(n,"utf8"))}}catch{}return t}function Td(r){return r===!0||r==="true"||r===1}var Fa=(0,Ub.join)((0,Vb.tmpdir)(),"realm-engine-proxy.log");function qb(r,e){let t=new Date().toISOString().slice(11,23),n=e instanceof Error?e:new Error(String(e)),i=`[${t}] [CRASH] ${r}: ${n.message}
${n.stack??""}
`;try{(0,qi.appendFileSync)(Fa,i)}catch{}try{console.error(i)}catch{}}process.on("uncaughtException",r=>qb("uncaughtException",r));process.on("unhandledRejection",r=>qb("unhandledRejection",r));process.on("exit",r=>{let t=`[${new Date().toISOString().slice(11,23)}] [EXIT] process.on('exit') code=${r}
`;try{(0,qi.appendFileSync)(Fa,t)}catch{}});for(let r of["SIGINT","SIGTERM","SIGHUP","SIGBREAK","SIGABRT"])try{process.on(r,()=>{let t=`[${new Date().toISOString().slice(11,23)}] [EXIT] received signal ${r}
`;try{(0,qi.appendFileSync)(Fa,t)}catch{}})}catch{}process.send&&process.on("disconnect",()=>{let e=`[${new Date().toISOString().slice(11,23)}] [EXIT] IPC channel disconnected from parent
`;try{(0,qi.appendFileSync)(Fa,e)}catch{}});var Wb=process.env.REALM_ENGINE_PROD==="1",gt=process.env.REALM_ENGINE_ROOT?(0,ae.resolve)(process.env.REALM_ENGINE_ROOT):(0,ae.resolve)((0,ae.dirname)((0,zb.fileURLToPath)(__importMetaUrl)),".."),Vi=process.env.REALM_ENGINE_APP_ROOT?(0,ae.resolve)(process.env.REALM_ENGINE_APP_ROOT):gt,q0=(0,ae.resolve)(gt,"data","config.json");function Gb(r){let e=String(r||"").trim();if(!e||!(0,ke.existsSync)(e))return null;try{let t=(0,ke.statSync)(e);if(t.isDirectory()){let n=(0,ae.resolve)(e,"version.dll");return(0,ke.existsSync)(n)?n:null}if(t.isFile())return e}catch{return null}return null}function J0(){return[(0,ae.resolve)(Vi,"..","internal","x64","Debug","version.dll"),(0,ae.resolve)(Vi,"..","internal","x64","Release","version.dll"),(0,ae.resolve)(Vi,"..","DebugInternal","x64","Debug","version.dll"),(0,ae.resolve)(Vi,"..","DebugInternal","x64","Release","version.dll")].find(e=>(0,ke.existsSync)(e))??null}function z0(){let r={rotmgPath:null,internalVersionDllPath:null,skipWinhttpInstall:!1,skipVersionDllDeploy:!1};try{let e=Hb(gt),t=String(e?.rotmgPath||"").trim()||null,n=String(e?.internalVersionDllPath||"").trim()||null;return{rotmgPath:t,internalVersionDllPath:n,skipWinhttpInstall:Td(e?.skipWinhttpInstall),skipVersionDllDeploy:Td(e?.skipVersionDllDeploy)}}catch(e){return m.warn("Main",`Failed to read config.json: ${e.message}`),r}}async function K0(){m.log("Main","RotMG MITM Proxy starting...");let e=z0(),t=Fb(gt),n=ja();m.log("Main",`config write: ${t}${n?` (overlay merges on ${n})`:""}; bundled defaults: ${q0}; skipWinhttp=${e.skipWinhttpInstall} skipVersion=${e.skipVersionDllDeploy}`),e.skipWinhttpInstall?process.env.REALM_ENGINE_SKIP_WINHTTP_INSTALL="1":delete process.env.REALM_ENGINE_SKIP_WINHTTP_INSTALL,e.skipVersionDllDeploy?process.env.REALM_ENGINE_SKIP_VERSION_DLL_DEPLOY="1":delete process.env.REALM_ENGINE_SKIP_VERSION_DLL_DEPLOY;let i=e.rotmgPath,s=(0,ae.resolve)(gt,"assets"),o=new La(i,s),a=await o.install();a||(m.warn("Main","Game hook not installed - see warnings above."),m.warn("Main","Proxy will still run, but game must be manually pointed to 127.0.0.1:2050."));let l="none";if(o.gameDirectory)if(process.env.REALM_ENGINE_SKIP_VERSION_DLL_DEPLOY==="1")m.warn("Main","Skipping version.dll deploy (REALM_ENGINE_SKIP_VERSION_DLL_DEPLOY=1). Delete Production\\version.dll yourself when testing without the internal DLL."),l="skipped_env";else try{let F=(0,ae.resolve)(o.gameDirectory,"version.dll"),ne=!1,ge=J0(),He=Gb(String(process.env.REALM_ENGINE_INTERNAL_VERSION_DLL||""));if(He)try{(0,ke.copyFileSync)(He,F),ne=!0,l="env_override",m.log("Main","Internal DLL deployed from REALM_ENGINE_INTERNAL_VERSION_DLL.")}catch(ze){m.warn("Main",`REALM_ENGINE_INTERNAL_VERSION_DLL copy failed: ${ze.message}`)}let Ct=e.internalVersionDllPath?Gb(e.internalVersionDllPath):null;if(!ne&&Ct)try{(0,ke.copyFileSync)(Ct,F),ne=!0,l="config_override",m.log("Main","Internal DLL deployed from data/config.json internalVersionDllPath.")}catch(ze){m.warn("Main",`internalVersionDllPath copy failed: ${ze.message}`)}let yt=(0,ae.resolve)(s,"version.dll");if(!ne&&(0,ke.existsSync)(yt))try{(0,ke.copyFileSync)(yt,F),ne=!0,l="assets_dll",m.log("Main","Internal DLL deployed from assets/version.dll.")}catch(ze){m.warn("Main",`assets/version.dll copy failed: ${ze.message}`)}if(!ne&&ge)try{(0,ke.copyFileSync)(ge,F),ne=!0,l="dev_copy"}catch{}ne?m.log("Main",`Internal DLL deployed to ${F}`):m.warn("Main","Internal DLL not found (no assets/version.dll and no local internal build). DLL features unavailable.")}catch(F){l="error",m.warn("Main",`Internal DLL deployment failed: ${F.message}`)}let c=o.gameDirectory;if(!i&&c)try{let D=c,F=bt.findAll().filter(ne=>ne&&ne!==D);for(let ne of F){for(let ge of["winhttp.dll","version.dll"]){let He=(0,ae.resolve)(D,ge);if((0,ke.existsSync)(He))try{(0,ke.copyFileSync)(He,(0,ae.resolve)(ne,ge))}catch(Ct){m.warn("Main",`Could not mirror ${ge} into ${ne}: ${Ct.message} (is the game running there?)`)}}m.log("Main",`Mirrored hooks into additional install${bt.isSteamInstall(ne)?" (Steam)":""}: ${ne}`)}F.length===0&&m.log("Main",`One Exalt install detected${bt.isSteamInstall(D)?" (Steam)":""}: ${D}`)}catch(D){m.warn("Main",`Hook mirror step failed: ${D.message}`)}let u=$b(),d=Bb(),p=(0,ae.resolve)(gt,"data","packet-definitions.json"),f=(0,ae.resolve)(gt,"data","stat-types.json"),h=new es(u??p,d??f),g=new Qi(h),y=(0,ae.resolve)(gt,"data"),b=(0,ae.resolve)(gt,"data","objects.xml"),S=(0,ae.resolve)(gt,"data","tiles.xml"),E=new So;try{E.load(b)}catch(D){m.warn("Main",`Failed to load objects.xml: ${D.message}`)}try{E.loadTiles(S)}catch(D){m.warn("Main",`Failed to load tiles.xml: ${D.message} (run: npm run download-game-xml -- --dir ./data)`)}let I=new ss;I.attach(g);let O=new go;O.attach(g);let H=new yo(E,O);H.attach(g);let W=new os;W.attach(g),new rs().attach(g),$d(g,y,jb()),m.isPacketDebugEnabled()&&(g.on("serverPacket",(D,F)=>{!["NEWTICK","PING","UNKNOWN_11"].includes(F.name)&&!F.name.startsWith("UNKNOWN_")&&m.log("Debug",`S->C: ${F.name} (id=${F.id}, size=${F.rawBytes.length}, defined=${F.isDefined})`),F.name.startsWith("UNKNOWN_")&&m.log("Debug",`S->C: ${F.name} (size=${F.rawBytes.length})`)}),g.on("clientPacket",(D,F)=>{["MOVE"].includes(F.name)||m.log("Debug",`C->S: ${F.name} (id=${F.id}, size=${F.rawBytes.length}, defined=${F.isDefined})`)}));let A=Wb?(0,ae.resolve)(Vi,"dist","plugins"):(0,ae.resolve)(gt,"plugins"),$=!Wb||(0,ke.existsSync)(A)||process.env.REALM_ENGINE_ALLOW_DISK_PLUGINS==="1";if((0,ke.existsSync)(A)){let D=(0,ke.readdirSync)(A).filter(F=>F.endsWith(".js")||F.endsWith(".ts"));m.log("Main",`Plugin directory: ${A} (${D.length} files)`)}else m.warn("Main",`Plugin directory not found: ${A}`);$||m.warn("Main","Local disk plugins disabled in production (set REALM_ENGINE_ALLOW_DISK_PLUGINS=1 to override).");let w=(0,ae.join)(process.env.USERPROFILE||(0,Jb.homedir)(),"Documents","Realmengine","Plugins"),re=new Fo(g,A,w,$,E,O,H,()=>({worldState:O,projectileTracker:H})),q,Ge;{let D=new Ho;D.attach(g);let F={current:void 0},ne=(0,ae.resolve)(gt,"src","dashboard","public");q=new Ma(D,re,ne,O,E),q.setDetectedGamePath(o.gameDirectory),q.setBridgeClientRef(F),q.attachProxy(g);let ge={scriptId:void 0};Ge=new ho(ge),Ge.onLog((He,Ct,yt)=>{q?.broadcastScriptLog(He,Ct,yt)}),q.setScriptHost(Ge),Ge.installBridge({stateManager:I,clientRef:F,worldState:O,getWorldStateForClient:()=>O,partyRoster:W,gameData:E,proxy:g,scriptSession:ge,emitScriptLog:(He,Ct,yt)=>{q?.broadcastScriptLog(He,Ct,yt)},emitScriptPanelMessage:He=>{q?.broadcastScriptPanelMessage(He)}}),Lb(),Ge.setScriptsStateNotify(()=>{q?.broadcastScriptsState()}),q.start(4440)}let T=new $a("admin-dev");za((D,F)=>T.setFeature(D,F));let[P]=await Promise.all([ku(y,{log(D,F){D==="error"?m.error("Metadata",F):D==="warn"?m.warn("Metadata",F):m.log("Metadata",F)}}),re.loadAll().then(()=>(q?.tryAutoLoadDefaultPluginConfig(),re.startWatching())).then(()=>{q?.broadcastPluginState()})]);P.ok||m.warn("Main",`Missing metadata XML (${P.failed.join(", ")}). Damage sniffer scaling/enchants may be incomplete. Set ROTMG_XML_BASE or run: npm run download-game-xml`),g.start("127.0.0.1",2050),m.log("Main","Proxy ready on 127.0.0.1:2050"),a&&m.log("Main",`Game hook active - Exalt at ${o.gameDirectory}`),m.log("Main","Dev dashboard: http://localhost:4440"),I.setDllDefenseSource(()=>T.getDllDefense()),q&&q.setInternalBridge(T),T.listen(),T.on("message",D=>{q?.broadcastDllMessage(D)});let Oe=async()=>{if(m.log("Main","Shutting down..."),Ge?.stopAll(),T.stop(),za(null),await o.uninstall(),o.gameDirectory)try{let D=(0,ae.resolve)(o.gameDirectory,"version.dll");(0,ke.existsSync)(D)&&((0,ke.unlinkSync)(D),m.log("Main","Removed internal DLL from game directory."))}catch{}g.stop(),re.stopWatching(),process.exit(0)};process.on("SIGINT",Oe),process.on("SIGTERM",Oe)}K0().catch(r=>{m.error("Main","Fatal error",r),process.exit(1)});
/*! Bundled license information:

normalize-path/index.js:
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
