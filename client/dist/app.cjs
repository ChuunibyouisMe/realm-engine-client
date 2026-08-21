var __importMetaUrl=require("url").pathToFileURL(__filename).href;
"use strict";var Yb=Object.create;var Wa=Object.defineProperty;var Xb=Object.getOwnPropertyDescriptor;var Qb=Object.getOwnPropertyNames;var Zb=Object.getPrototypeOf,eS=Object.prototype.hasOwnProperty;var Ge=(r,e)=>()=>(r&&(e=r(r=0)),e);var k=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),tS=(r,e)=>{for(var t in e)Wa(r,t,{get:e[t],enumerable:!0})},rS=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of Qb(e))!eS.call(r,i)&&i!==t&&Wa(r,i,{get:()=>e[i],enumerable:!(n=Xb(e,i))||n.enumerable});return r};var G=(r,e,t)=>(t=r!=null?Yb(Zb(r)):{},rS(e||!r||!r.__esModule?Wa(t,"default",{value:r,enumerable:!0}):t,r));var vd,It,Bn=Ge(()=>{"use strict";vd={"plugin-config":"Per-plugin setting values, enabled/disabled state + hotkeys at load","plugin-load":"One line per bundled/user/remote plugin as it loads",proxy:"[DIAG-*] client/server socket lifecycle traces",reconnect:"HELLO / RECONNECT key + byte-level diagnostics",scripts:"Script SDK UI-bridge / ScriptHost probe traces",accounts:"DevServer account-file reads \u2014 WARNING: dumps raw creds incl. password"},It=class r{static active=r.parseEnv();static hintShown=!1;static parseEnv(){let e=(process.env.RE_DEBUG??"").trim().toLowerCase();return e?e==="all"||e==="*"||e==="1"||e==="true"?new Set(Object.keys(vd)):new Set(e.split(/[\s,]+/).filter(Boolean)):new Set}static enabled(e){return r.maybeShowHint(),r.active.has(e)}static get anyEnabled(){return r.active.size>0}static maybeShowHint(){if(r.hintShown)return;r.hintShown=!0;let e=new Date().toISOString().slice(11,23),t=Object.keys(vd).join(", ");if(r.active.size===0)console.log(`[${e}] [Debug] Verbose logging OFF \u2014 channels: ${t}. Enable with RE_DEBUG=all or RE_DEBUG=<channel,\u2026> (see util/DebugManager.ts).`);else{let n=[...r.active].join(", ");console.log(`[${e}] [Debug] Verbose channels ON: ${n}. (RE_DEBUG=all for every channel \u2014 see util/DebugManager.ts).`)}}}});function Yi(r){try{(0,xd.appendFileSync)(nS,r+`
`)}catch{}}var xd,Cd,kd,nS,m,Q=Ge(()=>{"use strict";xd=require("fs"),Cd=require("path"),kd=require("os");Bn();nS=(0,Cd.join)((0,kd.tmpdir)(),"realm-engine-proxy.log");m=class r{static packetDebugEnabled=process.env.PROXY_PACKET_DEBUG==="1"||process.env.PROXY_PACKET_DEBUG==="true";static isPacketDebugEnabled(){return r.packetDebugEnabled}static log(e,t){let i=`[${new Date().toISOString().slice(11,23)}] [${e}] ${t}`;console.log(i),Yi(i)}static debug(e,t,n){if(!It.enabled(e))return;let s=`[${new Date().toISOString().slice(11,23)}] [${t}] ${n}`;console.log(s),Yi(s)}static warn(e,t){let i=`[${new Date().toISOString().slice(11,23)}] [${e}] WARN: ${t}`;console.warn(i),Yi(i)}static error(e,t,n){let s=`[${new Date().toISOString().slice(11,23)}] [${e}] ERROR: ${t}`;console.error(s),n?.stack&&console.error(n.stack),Yi(s+(n?.stack?`
`+n.stack:""))}}});var lt,Re,Va,Rd,bt,jn=Ge(()=>{"use strict";lt=require("fs"),Re=require("path"),Va=require("os");Q();Rd="RotMG Exalt.exe",bt=class r{static find(){let e=r.findAll();return e.length>0?(m.log("ExaltFinder",`Found Exalt at: ${e[0]}`),e[0]):(m.warn("ExaltFinder","Could not auto-detect Exalt installation."),m.warn("ExaltFinder","Set the ROTMG_PATH environment variable to your Exalt directory."),m.warn("ExaltFinder",`Expected to find ${Rd} in the directory.`),null)}static parseLibraryFolders(e){let t=[];try{if(!(0,lt.existsSync)(e))return t;let i=(0,lt.readFileSync)(e,"utf8").matchAll(/"path"\s+"([^"]+)"/g);for(let s of i)s[1]&&t.push(s[1].replace(/\\\\/g,"\\"))}catch{}return t}static getSteamRoots(){let e=(0,Va.homedir)();return[(0,Re.join)(e,".local","share","Steam"),(0,Re.join)(e,".steam","steam"),(0,Re.join)(e,".steam","root"),(0,Re.join)(e,".steam"),(0,Re.join)(e,".var","app","com.valvesoftware.Steam",".local","share","Steam"),(0,Re.join)(e,".var","app","com.valvesoftware.Steam",".steam","steam"),"C:\\Program Files (x86)\\Steam","C:\\Program Files\\Steam","D:\\Steam","D:\\SteamLibrary","E:\\Steam","E:\\SteamLibrary"].filter(n=>{try{return(0,lt.existsSync)(n)}catch{return!1}})}static findAll(){let e=(0,Va.homedir)(),t=process.env.LOCALAPPDATA||(0,Re.join)(e,"AppData","Local"),n=[process.env.ROTMG_PATH,(0,Re.join)(t,"RealmOfTheMadGod","Production"),(0,Re.join)(e,"Documents","RealmOfTheMadGod","Production"),(0,Re.join)(e,".wine","drive_c","users",process.env.USER||"steamuser","AppData","Local","RealmOfTheMadGod","Production"),(0,Re.join)(e,".wine","drive_c","Program Files (x86)","RealmOfTheMadGod","Production")],i=["RotMG Exalt","Realm of the Mad God","rotmg"],s=new Set;for(let l of r.getSteamRoots()){s.add(l);let c=(0,Re.join)(l,"steamapps","libraryfolders.vdf");for(let u of r.parseLibraryFolders(c))s.add(u)}let o=["/run/media/mmcblk0p1","/run/media/deck","/media","/mnt"];for(let l of o)try{if((0,lt.existsSync)(l)){s.add(l);let c=(0,lt.readdirSync)(l,{withFileTypes:!0});for(let u of c)u.isDirectory()&&s.add((0,Re.join)(l,u.name))}}catch{}for(let l of s){for(let u of i)n.push((0,Re.join)(l,"steamapps","common",u));let c=(0,Re.join)(l,"steamapps","compatdata");try{if((0,lt.existsSync)(c)){let u=(0,lt.readdirSync)(c,{withFileTypes:!0});for(let d of u)if(d.isDirectory()){let p=["steamuser",process.env.USER||"jyun"];for(let f of p)n.push((0,Re.join)(c,d.name,"pfx","drive_c","users",f,"AppData","Local","RealmOfTheMadGod","Production"),(0,Re.join)(c,d.name,"pfx","drive_c","users",f,"Documents","RealmOfTheMadGod","Production"),(0,Re.join)(c,d.name,"pfx","drive_c","Program Files (x86)","RealmOfTheMadGod","Production"))}}}catch{}}n.push("C:\\Program Files (x86)\\Steam\\steamapps\\common\\RotMG Exalt","C:\\Program Files\\Steam\\steamapps\\common\\RotMG Exalt","C:\\Program Files (x86)\\Steam\\steamapps\\common\\Realm of the Mad God","C:\\Program Files\\Steam\\steamapps\\common\\Realm of the Mad God","C:\\Games\\Realm of the Mad God","D:\\Steam\\steamapps\\common\\RotMG Exalt","D:\\SteamLibrary\\steamapps\\common\\RotMG Exalt","E:\\Steam\\steamapps\\common\\RotMG Exalt","E:\\SteamLibrary\\steamapps\\common\\RotMG Exalt");let a=[];for(let l of n)l&&r.isValidExaltDir(l)&&!a.includes(l)&&a.push(l);return a}static isSteamInstall(e){return/[\\/]steamapps[\\/]common[\\/]/i.test(String(e||""))}static isValidExaltDir(e){try{return(0,lt.existsSync)(e)&&(0,lt.existsSync)((0,Re.join)(e,Rd))}catch{return!1}}}});var Qa=k(ls=>{"use strict";Object.defineProperty(ls,"__esModule",{value:!0});ls.Self=void 0;var Xa=class{static getX(){throw new Error("Must be run inside RealmEngine client")}static getY(){throw new Error("Must be run inside RealmEngine client")}static getPosition(){throw new Error("Must be run inside RealmEngine client")}static distanceTo(e){throw new Error("Must be run inside RealmEngine client")}static getHP(){throw new Error("Must be run inside RealmEngine client")}static getMaxHP(){throw new Error("Must be run inside RealmEngine client")}static getHPPercent(){throw new Error("Must be run inside RealmEngine client")}static getMP(){throw new Error("Must be run inside RealmEngine client")}static getMaxMP(){throw new Error("Must be run inside RealmEngine client")}static getMPPercent(){throw new Error("Must be run inside RealmEngine client")}static getStats(){throw new Error("Must be run inside RealmEngine client")}static getExaltedBonuses(){throw new Error("Must be run inside RealmEngine client")}static getExaltedMaxHP(){throw new Error("Must be run inside RealmEngine client")}static getExaltedMaxMP(){throw new Error("Must be run inside RealmEngine client")}static getExaltedAtk(){throw new Error("Must be run inside RealmEngine client")}static getExaltedDef(){throw new Error("Must be run inside RealmEngine client")}static getExaltedSpd(){throw new Error("Must be run inside RealmEngine client")}static getExaltedDex(){throw new Error("Must be run inside RealmEngine client")}static getExaltedVit(){throw new Error("Must be run inside RealmEngine client")}static getExaltedWis(){throw new Error("Must be run inside RealmEngine client")}static getGearBonuses(){throw new Error("Must be run inside RealmEngine client")}static getGearMaxHP(){throw new Error("Must be run inside RealmEngine client")}static getGearMaxMP(){throw new Error("Must be run inside RealmEngine client")}static getGearAtk(){throw new Error("Must be run inside RealmEngine client")}static getGearDef(){throw new Error("Must be run inside RealmEngine client")}static getGearSpd(){throw new Error("Must be run inside RealmEngine client")}static getGearDex(){throw new Error("Must be run inside RealmEngine client")}static getGearVit(){throw new Error("Must be run inside RealmEngine client")}static getGearWis(){throw new Error("Must be run inside RealmEngine client")}static getAtk(){throw new Error("Must be run inside RealmEngine client")}static getDef(){throw new Error("Must be run inside RealmEngine client")}static getSpd(){throw new Error("Must be run inside RealmEngine client")}static getDex(){throw new Error("Must be run inside RealmEngine client")}static getVit(){throw new Error("Must be run inside RealmEngine client")}static getWis(){throw new Error("Must be run inside RealmEngine client")}static hasEffect(e){throw new Error("Must be run inside RealmEngine client")}static getEffects(){throw new Error("Must be run inside RealmEngine client")}static getWeapon(){throw new Error("Must be run inside RealmEngine client")}static getAbility(){throw new Error("Must be run inside RealmEngine client")}static getArmor(){throw new Error("Must be run inside RealmEngine client")}static getRing(){throw new Error("Must be run inside RealmEngine client")}static getName(){throw new Error("Must be run inside RealmEngine client")}static getClass(){throw new Error("Must be run inside RealmEngine client")}static isDead(){throw new Error("Must be run inside RealmEngine client")}static isInCombat(){throw new Error("Must be run inside RealmEngine client")}static isInvisible(){throw new Error("Must be run inside RealmEngine client")}static getAccountFame(){throw new Error("Must be run inside RealmEngine client")}static getCharacterFame(){throw new Error("Must be run inside RealmEngine client")}static getPowerLevel(){throw new Error("Must be run inside RealmEngine client")}};ls.Self=Xa});var el=k(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.Walking=void 0;var Za=class{static walkTo(e,t){throw new Error("Must be run inside RealmEngine client")}static walkToPosition(e){throw new Error("Must be run inside RealmEngine client")}static walkToEnemy(e){throw new Error("Must be run inside RealmEngine client")}static walkToPortal(e){throw new Error("Must be run inside RealmEngine client")}static walkToNearestPortal(){throw new Error("Must be run inside RealmEngine client")}static walkToNexusPortal(){throw new Error("Must be run inside RealmEngine client")}static walkToLeftWall(){throw new Error("Must be run inside RealmEngine client")}static walkToRightWall(){throw new Error("Must be run inside RealmEngine client")}static walkToTopWall(){throw new Error("Must be run inside RealmEngine client")}static walkToBottomWall(){throw new Error("Must be run inside RealmEngine client")}static followPlayer(e){throw new Error("Must be run inside RealmEngine client")}static stopMoving(){throw new Error("Must be run inside RealmEngine client")}static isMoving(){throw new Error("Must be run inside RealmEngine client")}static hasReached(e,t){throw new Error("Must be run inside RealmEngine client")}static nexus(){throw new Error("Must be run inside RealmEngine client")}static getDodgePosition(){throw new Error("Must be run inside RealmEngine client")}static dodge(){throw new Error("Must be run inside RealmEngine client")}static dodgeFrom(e){throw new Error("Must be run inside RealmEngine client")}static canTeleport(){throw new Error("Must be run inside RealmEngine client")}static teleportToPlayer(e){throw new Error("Must be run inside RealmEngine client")}static teleportToBeacon(e){throw new Error("Must be run inside RealmEngine client")}};cs.Walking=Za});var rl=k(us=>{"use strict";Object.defineProperty(us,"__esModule",{value:!0});us.Combat=void 0;var tl=class{static aimAt(e){throw new Error("Must be run inside RealmEngine client")}static aimAtPosition(e,t){throw new Error("Must be run inside RealmEngine client")}static stopAiming(){throw new Error("Must be run inside RealmEngine client")}static autoAimOff(){throw new Error("Must be run inside RealmEngine client")}static useAbility(){throw new Error("Must be run inside RealmEngine client")}static useAbilityAt(e,t){throw new Error("Must be run inside RealmEngine client")}static useAbilityOn(e){throw new Error("Must be run inside RealmEngine client")}static accuracy(){throw new Error("Must be run inside RealmEngine client")}static recentAccuracy(e){throw new Error("Must be run inside RealmEngine client")}static resetAccuracy(){throw new Error("Must be run inside RealmEngine client")}};us.Combat=tl});var il=k(ds=>{"use strict";Object.defineProperty(ds,"__esModule",{value:!0});ds.Players=void 0;var nl=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static getNearest(){throw new Error("Must be run inside RealmEngine client")}static find(e){throw new Error("Must be run inside RealmEngine client")}static getHP(e){throw new Error("Must be run inside RealmEngine client")}static getMaxHP(e){throw new Error("Must be run inside RealmEngine client")}static getHPPercent(e){throw new Error("Must be run inside RealmEngine client")}static getMP(e){throw new Error("Must be run inside RealmEngine client")}static getAccountFame(e){throw new Error("Must be run inside RealmEngine client")}static getCharacterFame(e){throw new Error("Must be run inside RealmEngine client")}static count(){throw new Error("Must be run inside RealmEngine client")}static getPlayerGuild(e,t="equals"){throw new Error("Must be run inside RealmEngine client")}static getNearbyGuilds(){throw new Error("Must be run inside RealmEngine client")}};ds.Players=nl});var ol=k(fs=>{"use strict";Object.defineProperty(fs,"__esModule",{value:!0});fs.Enemies=void 0;var sl=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static getNearest(){throw new Error("Must be run inside RealmEngine client")}static getNearestTo(e){throw new Error("Must be run inside RealmEngine client")}static getBoss(){throw new Error("Must be run inside RealmEngine client")}static getTargetingMe(){throw new Error("Must be run inside RealmEngine client")}static find(e){throw new Error("Must be run inside RealmEngine client")}static count(){throw new Error("Must be run inside RealmEngine client")}static getById(e){throw new Error("Must be run inside RealmEngine client")}static getByType(e){throw new Error("Must be run inside RealmEngine client")}};fs.Enemies=sl});var al=k(ct=>{"use strict";Object.defineProperty(ct,"__esModule",{value:!0});ct.inventory=ct.INVENTORY_TOTAL_SLOT_COUNT=ct.INVENTORY_BACKPACK_SLOT_COUNT=ct.INVENTORY_MAIN_SLOT_COUNT=void 0;ct.INVENTORY_MAIN_SLOT_COUNT=12;ct.INVENTORY_BACKPACK_SLOT_COUNT=16;ct.INVENTORY_TOTAL_SLOT_COUNT=ct.INVENTORY_MAIN_SLOT_COUNT+ct.INVENTORY_BACKPACK_SLOT_COUNT;ct.inventory={getSlot(r){return null},getAll(){return[]},findItem(r){return null},findItems(r){return[]},useItem(r){},swapSlots(r,e){},isFull(){return!1},emptySlotCount(){return 0},getBackpack(){throw new Error("Must be run inside RealmEngine client")},getVault(){throw new Error("Must be run inside RealmEngine client")},getEntireVault(){throw new Error("Must be run inside RealmEngine client")},getMaterials(){throw new Error("Must be run inside RealmEngine client")},getPotions(){throw new Error("Must be run inside RealmEngine client")},getGifts(){throw new Error("Must be run inside RealmEngine client")},getSeasonalSpoils(){throw new Error("Must be run inside RealmEngine client")},withdraw(r,e){throw new Error("Must be run inside RealmEngine client")},deposit(r,e){throw new Error("Must be run inside RealmEngine client")}}});var Ud=k(ps=>{"use strict";Object.defineProperty(ps,"__esModule",{value:!0});ps.GiftChest=void 0;var ll=class{static getItems(){throw new Error("Must be run inside RealmEngine client")}static withdraw(e){throw new Error("Must be run inside RealmEngine client")}static withdrawAll(){throw new Error("Must be run inside RealmEngine client")}static contains(e){throw new Error("Must be run inside RealmEngine client")}};ps.GiftChest=ll});var cl=k(ms=>{"use strict";Object.defineProperty(ms,"__esModule",{value:!0});ms.Vault=void 0;var fS=Ud();ms.Vault={giftChest:fS.GiftChest,get(r){throw new Error("Must be run inside RealmEngine client")},vaultChest:{get(r){throw new Error("Must be run inside RealmEngine client")},findChestWith(r){throw new Error("Must be run inside RealmEngine client")},getAll(){throw new Error("Must be run inside RealmEngine client")}},findItem(r){throw new Error("Must be run inside RealmEngine client")},getAllItems(){throw new Error("Must be run inside RealmEngine client")}}});var dl=k(hs=>{"use strict";Object.defineProperty(hs,"__esModule",{value:!0});hs.World=void 0;var ul=class{static isNexus(){throw new Error("Must be run inside RealmEngine client")}static isRealm(){throw new Error("Must be run inside RealmEngine client")}static isDungeon(){throw new Error("Must be run inside RealmEngine client")}static isVault(){throw new Error("Must be run inside RealmEngine client")}static getName(){throw new Error("Must be run inside RealmEngine client")}};hs.World=ul});var pl=k(gs=>{"use strict";Object.defineProperty(gs,"__esModule",{value:!0});gs.Tiles=void 0;var fl=class{static getAll(e){throw new Error("Must be run inside RealmEngine client")}static getNearby(e,t){throw new Error("Must be run inside RealmEngine client")}static getByType(e){throw new Error("Must be run inside RealmEngine client")}static getAt(e,t){throw new Error("Must be run inside RealmEngine client")}static isBlocking(e,t){throw new Error("Must be run inside RealmEngine client")}static isSafe(e,t){throw new Error("Must be run inside RealmEngine client")}};gs.Tiles=fl});var hl=k(ys=>{"use strict";Object.defineProperty(ys,"__esModule",{value:!0});ys.Objects=void 0;var ml=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static getById(e){throw new Error("Must be run inside RealmEngine client")}static getByType(e){throw new Error("Must be run inside RealmEngine client")}static count(){throw new Error("Must be run inside RealmEngine client")}static exists(e){throw new Error("Must be run inside RealmEngine client")}static getByCategory(e){throw new Error("Must be run inside RealmEngine client")}static getEnemies(){throw new Error("Must be run inside RealmEngine client")}static getPlayers(){throw new Error("Must be run inside RealmEngine client")}static getPortals(){throw new Error("Must be run inside RealmEngine client")}static getContainers(){throw new Error("Must be run inside RealmEngine client")}static getPets(){throw new Error("Must be run inside RealmEngine client")}static getBeacons(){throw new Error("Must be run inside RealmEngine client")}static getQuestObject(){throw new Error("Must be run inside RealmEngine client")}static getQuestTargetId(){throw new Error("Must be run inside RealmEngine client")}static getQuestTargetType(){throw new Error("Must be run inside RealmEngine client")}static getQuestId(){throw new Error("Must be run inside RealmEngine client")}static getQuestType(){throw new Error("Must be run inside RealmEngine client")}static getNearest(){throw new Error("Must be run inside RealmEngine client")}static getNearestTo(e){throw new Error("Must be run inside RealmEngine client")}static getNearestOfType(e){throw new Error("Must be run inside RealmEngine client")}static getNearestOfCategory(e){throw new Error("Must be run inside RealmEngine client")}static getWithinRadius(e){throw new Error("Must be run inside RealmEngine client")}static getWithinRadiusFrom(e,t){throw new Error("Must be run inside RealmEngine client")}static getWithinBounds(e,t,n,i){throw new Error("Must be run inside RealmEngine client")}static sortByDistance(){throw new Error("Must be run inside RealmEngine client")}static sortByDistanceFrom(e){throw new Error("Must be run inside RealmEngine client")}static findByName(e){throw new Error("Must be run inside RealmEngine client")}static findAllByName(e){throw new Error("Must be run inside RealmEngine client")}static findPortal(e){throw new Error("Must be run inside RealmEngine client")}static getNearestPortal(){throw new Error("Must be run inside RealmEngine client")}static getOpenPortals(){throw new Error("Must be run inside RealmEngine client")}static getNearestContainer(){throw new Error("Must be run inside RealmEngine client")}static findContainer(e){throw new Error("Must be run inside RealmEngine client")}static getCategory(e){throw new Error("Must be run inside RealmEngine client")}static getTypeName(e){throw new Error("Must be run inside RealmEngine client")}static isEnemy(e){throw new Error("Must be run inside RealmEngine client")}static isPortal(e){throw new Error("Must be run inside RealmEngine client")}static isContainer(e){throw new Error("Must be run inside RealmEngine client")}static isBoss(e){throw new Error("Must be run inside RealmEngine client")}static hasType(e){throw new Error("Must be run inside RealmEngine client")}};ys.Objects=ml});var yl=k(bs=>{"use strict";Object.defineProperty(bs,"__esModule",{value:!0});bs.Projectiles=void 0;var gl=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static getNearby(e){throw new Error("Must be run inside RealmEngine client")}static getIncoming(){throw new Error("Must be run inside RealmEngine client")}static count(){throw new Error("Must be run inside RealmEngine client")}};bs.Projectiles=gl});var ws=k(Ss=>{"use strict";Object.defineProperty(Ss,"__esModule",{value:!0});Ss.Log=void 0;var bl=class{static info(e){throw new Error("Must be run inside RealmEngine client")}static warn(e){throw new Error("Must be run inside RealmEngine client")}static error(e){throw new Error("Must be run inside RealmEngine client")}};Ss.Log=bl});var wl=k(Es=>{"use strict";Object.defineProperty(Es,"__esModule",{value:!0});Es.Settings=void 0;var Sl=class{static get(e){throw new Error("Must be run inside RealmEngine client")}static getString(e,t){throw new Error("Must be run inside RealmEngine client")}static getNumber(e,t){throw new Error("Must be run inside RealmEngine client")}static getBoolean(e,t){throw new Error("Must be run inside RealmEngine client")}};Es.Settings=Sl});var Tl=k(Ts=>{"use strict";Object.defineProperty(Ts,"__esModule",{value:!0});Ts.Timing=void 0;var El=class{static now(){throw new Error("Must be run inside RealmEngine client")}static timeSince(e){throw new Error("Must be run inside RealmEngine client")}static sleep(e){throw new Error("Must be run inside RealmEngine client")}static every(e,t){throw new Error("Must be run inside RealmEngine client")}static after(e,t){throw new Error("Must be run inside RealmEngine client")}static debounce(e,t){throw new Error("Must be run inside RealmEngine client")}};Ts.Timing=El});var Pl=k(Ps=>{"use strict";Object.defineProperty(Ps,"__esModule",{value:!0});Ps.chat=void 0;var Pr=()=>{};Ps.chat={onMessage(r){return Pr},onMessageFrom(r,e){return Pr},onMessageContaining(r,e){return Pr},onChannelMessage(r,e){return Pr},onWhisper(r){return Pr},onSystemMessage(r){return Pr},send(r,e){},notify(r,e){},say(r){},yell(r){},tell(r,e){},party(r){},guild(r){},blockOutgoing(r,...e){return Pr}}});var vl=k(vs=>{"use strict";Object.defineProperty(vs,"__esModule",{value:!0});vs.party=void 0;vs.party={createParty(r){},getPartyList(){return Promise.reject(new Error("RealmEngine.party.getPartyList is only available in Realm Engine"))},join(r){},kick(r){},getPartyMembers(){return[]},getId(r,e){return null},leave(){}}});var xl=k(vr=>{"use strict";Object.defineProperty(vr,"__esModule",{value:!0});vr.trade=void 0;vr.trade={start(r){return!1},startTrade(r){return vr.trade.start(r)},isActive(){return!1},getPartnerName(){return""},getOurItems(){return[]},getPartnerItems(){return[]},getOurOffer(){return[]},getPartnerOffer(){return[]},offer(r){return!1},offerAll(){return!1},clearOffer(){return!1},accept(){return!1},acceptTrade(){return vr.trade.accept()},cancel(){return!1},cancelTrade(){return vr.trade.cancel()}}});var Cl=k(xs=>{"use strict";Object.defineProperty(xs,"__esModule",{value:!0});xs.events=void 0;var Ke=()=>{};function pS(r,e,t,n){return Ke}function mS(r,e,t){return Ke}xs.events={onPlayerDied(r){return Ke},onEnemySpawned(r){return Ke},onEnemySpawnedOfType(r,e){return Ke},onMapChanged(r){return Ke},onConnected(r){return Ke},onDisconnected(r){return Ke},onLevelUp(r){return Ke},onItemPickedUp(r){return Ke},onPortalOpened(r){return Ke},onCharacterFameAtLeast(r,e){return Ke},onChat(r,e){return Ke},onPlayerNearby(r,e,t){return Ke},onGuildNearby:pS,onPlayerJoinParty:mS}});var kl=k(ks=>{"use strict";Object.defineProperty(ks,"__esModule",{value:!0});ks.loot=void 0;var Cs=()=>{};ks.loot={getBags(){return[]},getNearbyBags(r){return[]},getBagsByRarity(r){return[]},getBagsContaining(r){return[]},onBagDropped(r){return Cs},onRareBagDropped(r,e){return Cs},onItemDropped(r,e){return Cs},onBagRemoved(r){return Cs},pickup(r,e,t){return!1},useFromBag(r,e){return!1},pickupId(r,e){return-1},shouldPickup(r,e){return!1},isUT(r){return!1},isST(r){return!1},isStatPot(r){return!1},isHpPot(r){return!1},isMpPot(r){return!1},isLifeManaPot(r){return!1}}});var _l=k(sr=>{"use strict";var hS=sr&&sr.__awaiter||function(r,e,t,n){function i(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(n.next(u))}catch(d){o(d)}}function l(u){try{c(n.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):i(u.value).then(a,l)}c((n=n.apply(r,e||[])).next())})};Object.defineProperty(sr,"__esModule",{value:!0});sr.DiscordWebhook=sr.discord=void 0;sr.discord={createWebhook(r){return new _s(r)}};var _s=class{constructor(e){this.options=e}send(e){return Promise.resolve()}sendSafe(e){return hS(this,void 0,void 0,function*(){try{return yield this.send(e),!0}catch{return!1}})}sendText(e){return Promise.resolve()}sendEmbed(e,t){return Promise.resolve()}sendDeath(e){return Promise.resolve()}sendLoot(e){return Promise.resolve()}sendFameSnapshot(){return Promise.resolve()}sendPartyStatus(){return Promise.resolve()}};sr.DiscordWebhook=_s});var Il=k(Xr=>{"use strict";Object.defineProperty(Xr,"__esModule",{value:!0});Xr.panel=Xr.Panel=void 0;Xr.Panel={group(r,e,t={}){return Object.assign({type:"group",title:r,children:e},t)},row(r,e={}){return Object.assign({type:"row",children:r},e)},tabs(r){return Object.assign({type:"tabs"},r)},heading(r,e=2){return{type:"heading",text:r,level:e}},label(r,e={}){return Object.assign({type:"label",text:r},e)},image(r){return Object.assign({type:"image"},r)},item(r){return Object.assign({type:"item"},r)},itemGrid(r){return Object.assign({type:"itemGrid"},r)},button(r){return Object.assign({type:"button"},r)},toggle(r){return Object.assign({type:"toggle"},r)},slider(r){return Object.assign({type:"slider"},r)},number(r){return Object.assign({type:"number"},r)},text(r){return Object.assign({type:"text"},r)},select(r){return Object.assign({type:"select"},r)},progress(r){return Object.assign({type:"progress"},r)},log(r){return Object.assign({type:"log"},r)},spacer(r=8){return{type:"spacer",size:r}}};function gS(){throw new Error("RealmEngine.ui.panel must be run inside the RealmEngine client")}Xr.panel={define(r){gS()}}});var Vd=k(Is=>{"use strict";Object.defineProperty(Is,"__esModule",{value:!0});Is.RealmEngine=void 0;var yS=Qa(),bS=el(),SS=rl(),wS=il(),ES=ol(),TS=al(),PS=cl(),Wn=dl(),vS=pl(),xS=hl(),CS=yl(),kS=ws(),_S=wl(),IS=Tl(),RS=Pl(),NS=vl(),AS=xl(),OS=Cl(),MS=kl(),DS=_l(),LS=Il();Is.RealmEngine={self:yS.Self,walking:bS.Walking,combat:SS.Combat,players:wS.Players,enemies:ES.Enemies,inventory:TS.inventory,vault:PS.Vault,world:{isNexus:Wn.World.isNexus,isRealm:Wn.World.isRealm,isDungeon:Wn.World.isDungeon,isVault:Wn.World.isVault,getName:Wn.World.getName,tiles:vS.Tiles,objects:xS.Objects,projectiles:CS.Projectiles},log:kS.Log,settings:_S.Settings,timing:IS.Timing,chat:RS.chat,party:NS.party,trade:AS.trade,events:OS.events,loot:MS.loot,discord:DS.discord,ui:{status(r){throw new Error("Must be run inside RealmEngine client")},setStatus(r){throw new Error("Must be run inside RealmEngine client")},panel:LS.panel}}});var qd=k(Rs=>{"use strict";Object.defineProperty(Rs,"__esModule",{value:!0});Rs.Position=void 0;var Rl=class r{constructor(e,t){this.x=e,this.y=t}distanceTo(e){return Math.sqrt(Math.pow(this.x-e.x,2)+Math.pow(this.y-e.y,2))}isWithin(e,t){return this.distanceTo(e)<=t}offset(e,t){return new r(this.x+e,this.y+t)}toString(){return`Position(${this.x.toFixed(2)}, ${this.y.toFixed(2)})`}};Rs.Position=Rl});var Kd=k(Ns=>{"use strict";Object.defineProperty(Ns,"__esModule",{value:!0});Ns.StatusEffect=void 0;var Jd;(function(r){r.CURSED="cursed",r.SLOWED="slowed",r.STUNNED="stunned",r.BLIND="blind",r.HALLUCINATING="hallucinating",r.DRUNK="drunk",r.CONFUSED="confused",r.STASIS="stasis",r.INVISIBLE="invisible",r.ARMORED="armored",r.INVINCIBLE="invincible",r.SPEEDY="speedy",r.HEALING="healing",r.DAMAGING="damaging",r.BERSERK="berserk",r.PETRIFIED="petrified",r.SICK="sick",r.BLEEDING="bleeding",r.QUIET="quiet",r.EXPOSED="exposed",r.HEXED="hexed"})(Jd||(Ns.StatusEffect=Jd={}))});var Yd=k(As=>{"use strict";Object.defineProperty(As,"__esModule",{value:!0});As.GuildRank=void 0;var zd;(function(r){r[r.Initiate=0]="Initiate",r[r.Member=10]="Member",r[r.Officer=20]="Officer",r[r.Leader=30]="Leader",r[r.Founder=40]="Founder"})(zd||(As.GuildRank=zd={}))});var Xd=k(Qr=>{"use strict";Object.defineProperty(Qr,"__esModule",{value:!0});Qr.guild=Qr.GuildRank=void 0;var $S=Yd();Object.defineProperty(Qr,"GuildRank",{enumerable:!0,get:function(){return $S.GuildRank}});Qr.guild={invite(r){},remove(r){},leave(){},join(r){},setRank(r,e){},onInvited(r){return()=>{}},onResult(r){return()=>{}}}});var Qd=k(Os=>{"use strict";Object.defineProperty(Os,"__esModule",{value:!0});Os.Inventory=void 0;var Nl=class{static getAll(){throw new Error("Must be run inside RealmEngine client")}static contains(e){throw new Error("Must be run inside RealmEngine client")}static getCount(e){throw new Error("Must be run inside RealmEngine client")}static getFreeSlots(){throw new Error("Must be run inside RealmEngine client")}static isFull(){throw new Error("Must be run inside RealmEngine client")}static use(e){throw new Error("Must be run inside RealmEngine client")}static useBySlot(e){throw new Error("Must be run inside RealmEngine client")}static drop(e){throw new Error("Must be run inside RealmEngine client")}};Os.Inventory=Nl});var Ds=k(Ms=>{"use strict";Object.defineProperty(Ms,"__esModule",{value:!0});Ms.Leaf=void 0;var Gn=class{constructor(e){this._name=e??this.constructor.name}getName(){return this._name}setName(e){this._name=e}static of(e){return new Al(e.name,e.isValid,e.onLoop)}};Ms.Leaf=Gn;Gn.STOP=-1;var Al=class extends Gn{constructor(e,t,n){super(e??"Leaf"),this._isValid=t,this._onLoop=n}isValid(){return this._isValid()}onLoop(){return this._onLoop()}}});var Vn=k(Ls=>{"use strict";Object.defineProperty(Ls,"__esModule",{value:!0});Ls.Branch=void 0;var BS=Ds(),Un=class r extends BS.Leaf{constructor(){super(...arguments),this._children=[],this.idleSleep=100}addLeaves(...e){for(let t of e)this._children.push(t);return this}getLeaves(){return this._children.slice()}size(){return this._children.length}clear(){this._children=[]}next(){for(let e of this._children)if(e.isValid())return e;return null}tick(e){for(let t of this._children)if(e.isValidSafe(t))return t instanceof r?e.enterBranch(t):e.runLeaf(t);return e.idle()}onLoop(){let e=this.next();return e?e.onLoop():this.idleSleep}_iterateChildren(){return this._children}static of(e){var t;let n=new Ol(e.name,e.isValid);return!((t=e.children)===null||t===void 0)&&t.length&&n.addLeaves(...e.children),n}};Ls.Branch=Un;Un._walkerMethods=["enterBranch","runLeaf","idle"];var Ol=class extends Un{constructor(e,t){super(e??"Branch"),this._isValid=t}isValid(){return this._isValid()}}});var Dl=k($s=>{"use strict";Object.defineProperty($s,"__esModule",{value:!0});$s.Root=void 0;var jS=Vn(),Ml=class extends jS.Branch{constructor(){super("Root")}isValid(){return!0}};$s.Root=Ml});var tf=k(Bs=>{"use strict";Object.defineProperty(Bs,"__esModule",{value:!0});Bs.TreeScript=void 0;var Zd=ws(),ef=Vn(),FS=Dl(),Ll=class r{constructor(){this.root=new FS.Root,this.idleSleep=100,this.trace=!1,this._currentBranchName="",this._currentLeafName=""}onStart(){}onLoop(){return this._currentBranchName="",this._currentLeafName="",this.root.tick(this)}onStop(){}addBranches(...e){return this.root.addLeaves(...e),this.root}addChildren(...e){return this.addBranches(...e)}clear(){this.root.clear(),this._currentBranchName="",this._currentLeafName=""}getRoot(){return this.root}getCurrentBranchName(){return this._currentBranchName}setCurrentBranchName(e){this._currentBranchName=e}getCurrentLeafName(){return this._currentLeafName}setCurrentLeafName(e){this._currentLeafName=e}enterBranch(e){this._currentBranchName=e.getName(),this.trace&&this.log(`\u2192 ${e.getName()} (branch)`);try{return e.tick(this)}catch(t){return this.logError(e,t),this.idleSleep}}runLeaf(e){this._currentLeafName=e.getName(),this.trace&&this.log(`\u25B6 ${e.getName()} (leaf)`);try{return e.onLoop()}catch(t){return this.logError(e,t),this.idleSleep}}idle(){return this.trace&&this.log("\u2026 idle"),this.idleSleep}isValidSafe(e){try{return e.isValid()}catch(t){return this.logError(e,t,"isValid"),!1}}describe(){return r._describeNode(this.root,"",!0,!0)}getActivePath(){let e=[],t=this.root;for(;t;){e.push(t);let n=null;for(let i of t._iterateChildren())if(this.isValidSafe(i)){n=i;break}if(!n)break;if(n instanceof ef.Branch){t=n;continue}e.push(n);break}return e}log(e){try{Zd.Log.info(`[tree] ${e}`)}catch{}}logError(e,t,n="onLoop"){let i=t instanceof Error?t.message:String(t);try{Zd.Log.error(`[tree] ${e.getName()}.${n}() threw: ${i}`)}catch{console.error(`[tree] ${e.getName()}.${n}() threw: ${i}`)}}static _describeNode(e,t,n,i){let o=`${t}${i?"":n?"\u2514\u2500\u2500 ":"\u251C\u2500\u2500 "}${e.getName()}
`;if(e instanceof ef.Branch){let a=e._iterateChildren(),l=i?t:t+(n?"    ":"\u2502   ");a.forEach((c,u)=>{o+=r._describeNode(c,l,u===a.length-1,!1)})}return o}};Bs.TreeScript=Ll});var rf=k(St=>{"use strict";Object.defineProperty(St,"__esModule",{value:!0});St.leaf=HS;St.branch=WS;St.when=GS;St.not=US;St.always=VS;St.cooldown=qS;St.once=JS;St.sequence=KS;St.parallel=zS;var xr=Ds(),qn=Vn();function HS(r){return xr.Leaf.of(r)}function WS(r){return qn.Branch.of(r)}function GS(r,e){return xr.Leaf.of({name:`when(${e.getName()})`,isValid:()=>r()&&e.isValid(),onLoop:()=>e.onLoop()})}function US(r){return xr.Leaf.of({name:`not(${r.getName()})`,isValid:()=>!r.isValid(),onLoop:()=>r.onLoop()})}function VS(r){return xr.Leaf.of({name:`always(${r.getName()})`,isValid:()=>!0,onLoop:()=>r.onLoop()})}function qS(r,e){let t=-1/0;return xr.Leaf.of({name:`cooldown(${r}ms, ${e.getName()})`,isValid:()=>Date.now()-t>=r&&e.isValid(),onLoop:()=>(t=Date.now(),e.onLoop())})}function JS(r){let e=!1;return xr.Leaf.of({name:`once(${r.getName()})`,isValid:()=>!e&&r.isValid(),onLoop:()=>(e=!0,r.onLoop())})}function KS(r,...e){let t=0;return new class extends qn.Branch{constructor(){super(r),super.addLeaves(...e)}isValid(){let n=this._iterateChildren();for(let i=0;i<n.length;i++){let s=(t+i)%n.length;if(n[s].isValid())return!0}return!1}tick(n){let i=this._iterateChildren();for(let s=0;s<i.length;s++){let o=(t+s)%i.length,a=i[o];if(n.isValidSafe(a))return t=(o+1)%i.length,a instanceof qn.Branch?n.enterBranch(a):n.runLeaf(a)}return n.idle()}}}function zS(r,...e){return new class extends qn.Branch{constructor(){super(r),super.addLeaves(...e)}isValid(){for(let t of this._iterateChildren())if(t.isValid())return!0;return!1}tick(t){let n=1/0,i=!1;for(let s of this._iterateChildren()){if(!t.isValidSafe(s))continue;i=!0;let o=s instanceof qn.Branch?t.enterBranch(s):t.runLeaf(s);if(o<=xr.Leaf.STOP)return o;o<n&&(n=o)}return i?n:t.idle()}}}});var nf=k(oe=>{"use strict";Object.defineProperty(oe,"__esModule",{value:!0});oe.parallel=oe.sequence=oe.once=oe.cooldown=oe.always=oe.not=oe.when=oe.branch=oe.leaf=oe.TreeScript=oe.Root=oe.Branch=oe.Leaf=void 0;var YS=Ds();Object.defineProperty(oe,"Leaf",{enumerable:!0,get:function(){return YS.Leaf}});var XS=Vn();Object.defineProperty(oe,"Branch",{enumerable:!0,get:function(){return XS.Branch}});var QS=Dl();Object.defineProperty(oe,"Root",{enumerable:!0,get:function(){return QS.Root}});var ZS=tf();Object.defineProperty(oe,"TreeScript",{enumerable:!0,get:function(){return ZS.TreeScript}});var Ut=rf();Object.defineProperty(oe,"leaf",{enumerable:!0,get:function(){return Ut.leaf}});Object.defineProperty(oe,"branch",{enumerable:!0,get:function(){return Ut.branch}});Object.defineProperty(oe,"when",{enumerable:!0,get:function(){return Ut.when}});Object.defineProperty(oe,"not",{enumerable:!0,get:function(){return Ut.not}});Object.defineProperty(oe,"always",{enumerable:!0,get:function(){return Ut.always}});Object.defineProperty(oe,"cooldown",{enumerable:!0,get:function(){return Ut.cooldown}});Object.defineProperty(oe,"once",{enumerable:!0,get:function(){return Ut.once}});Object.defineProperty(oe,"sequence",{enumerable:!0,get:function(){return Ut.sequence}});Object.defineProperty(oe,"parallel",{enumerable:!0,get:function(){return Ut.parallel}})});var fe=k(C=>{"use strict";var W=globalThis.__realmengineSDK;if(W)C.chat=W.chat,C.party=W.party,C.trade=W.trade,C.events=W.events,C.inventory=W.inventory,C.guild=W.guild,C.GuildRank=W.GuildRank,C.INVENTORY_MAIN_SLOT_COUNT=W.INVENTORY_MAIN_SLOT_COUNT,C.INVENTORY_BACKPACK_SLOT_COUNT=W.INVENTORY_BACKPACK_SLOT_COUNT,C.INVENTORY_TOTAL_SLOT_COUNT=W.INVENTORY_TOTAL_SLOT_COUNT,C.loot=W.loot,C.discord=W.discord,C.DiscordWebhook=W.DiscordWebhook,C.Self=W.Self,C.Walking=W.Walking,C.Combat=W.Combat,C.Players=W.Players,C.Enemies=W.Enemies,C.Inventory=W.Inventory,C.Vault=W.Vault,C.World=W.World,C.Tiles=W.Tiles,C.Objects=W.Objects,C.Projectiles=W.Projectiles,C.Log=W.Log,C.Settings=W.Settings,C.Timing=W.Timing,C.RealmEngine=W.RealmEngine,C.Position=W.Position,C.StatusEffect=W.StatusEffect,C.Panel=W.Panel,C.uiPanel=W.uiPanel,C.TreeScript=W.TreeScript,C.Root=W.Root,C.Branch=W.Branch,C.Leaf=W.Leaf,C.leaf=W.leaf,C.branch=W.branch,C.when=W.when,C.not=W.not,C.always=W.always,C.cooldown=W.cooldown,C.once=W.once,C.sequence=W.sequence,C.parallel=W.parallel;else{let r={};Object.assign(r,Vd()),Object.assign(r,qd()),Object.assign(r,Kd()),Object.assign(r,Pl()),Object.assign(r,vl()),Object.assign(r,xl()),Object.assign(r,Cl()),Object.assign(r,al()),Object.assign(r,kl()),Object.assign(r,_l()),Object.assign(r,Xd()),Object.assign(r,Qa()),Object.assign(r,el()),Object.assign(r,rl()),Object.assign(r,il()),Object.assign(r,ol()),Object.assign(r,Qd()),Object.assign(r,cl()),Object.assign(r,dl()),Object.assign(r,pl()),Object.assign(r,hl()),Object.assign(r,yl()),Object.assign(r,ws()),Object.assign(r,wl()),Object.assign(r,Tl()),Object.assign(r,Il()),Object.assign(r,nf()),r.uiPanel=r.panel,C.chat=r.chat,C.party=r.party,C.trade=r.trade,C.events=r.events,C.inventory=r.inventory,C.guild=r.guild,C.GuildRank=r.GuildRank,C.INVENTORY_MAIN_SLOT_COUNT=r.INVENTORY_MAIN_SLOT_COUNT,C.INVENTORY_BACKPACK_SLOT_COUNT=r.INVENTORY_BACKPACK_SLOT_COUNT,C.INVENTORY_TOTAL_SLOT_COUNT=r.INVENTORY_TOTAL_SLOT_COUNT,C.loot=r.loot,C.discord=r.discord,C.DiscordWebhook=r.DiscordWebhook,C.Self=r.Self,C.Walking=r.Walking,C.Combat=r.Combat,C.Players=r.Players,C.Enemies=r.Enemies,C.Inventory=r.Inventory,C.Vault=r.Vault,C.World=r.World,C.Tiles=r.Tiles,C.Objects=r.Objects,C.Projectiles=r.Projectiles,C.Log=r.Log,C.Settings=r.Settings,C.Timing=r.Timing,C.RealmEngine=r.RealmEngine,C.Position=r.Position,C.StatusEffect=r.StatusEffect,C.Panel=r.Panel,C.uiPanel=r.uiPanel,C.TreeScript=r.TreeScript,C.Root=r.Root,C.Branch=r.Branch,C.Leaf=r.Leaf,C.leaf=r.leaf,C.branch=r.branch,C.when=r.when,C.not=r.not,C.always=r.always,C.cooldown=r.cooldown,C.once=r.once,C.sequence=r.sequence,C.parallel=r.parallel}});var li=k(Et=>{"use strict";var bp=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD",hE=bp+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040",Sp="["+bp+"]["+hE+"]*",gE=new RegExp("^"+Sp+"$"),yE=function(r,e){let t=[],n=e.exec(r);for(;n;){let i=[];i.startIndex=e.lastIndex-n[0].length;let s=n.length;for(let o=0;o<s;o++)i.push(n[o]);t.push(i),n=e.exec(r)}return t},bE=function(r){let e=gE.exec(r);return!(e===null||typeof e>"u")};Et.isExist=function(r){return typeof r<"u"};Et.isEmptyObject=function(r){return Object.keys(r).length===0};Et.merge=function(r,e,t){if(e){let n=Object.keys(e),i=n.length;for(let s=0;s<i;s++)t==="strict"?r[n[s]]=[e[n[s]]]:r[n[s]]=e[n[s]]}};Et.getValue=function(r){return Et.isExist(r)?r:""};var SE=["hasOwnProperty","toString","valueOf","__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__"],wE=["__proto__","constructor","prototype"];Et.isName=bE;Et.getAllMatches=yE;Et.nameRegexp=Sp;Et.DANGEROUS_PROPERTY_NAMES=SE;Et.criticalProperties=wE});var zl=k(vp=>{"use strict";var Kl=li(),EE={allowBooleanAttributes:!1,unpairedTags:[]};vp.validate=function(r,e){e=Object.assign({},EE,e);let t=[],n=!1,i=!1;r[0]==="\uFEFF"&&(r=r.substr(1));for(let s=0;s<r.length;s++)if(r[s]==="<"&&r[s+1]==="?"){if(s+=2,s=Ep(r,s),s.err)return s}else if(r[s]==="<"){let o=s;if(s++,r[s]==="!"){s=Tp(r,s);continue}else{let a=!1;r[s]==="/"&&(a=!0,s++);let l="";for(;s<r.length&&r[s]!==">"&&r[s]!==" "&&r[s]!=="	"&&r[s]!==`
`&&r[s]!=="\r";s++)l+=r[s];if(l=l.trim(),l[l.length-1]==="/"&&(l=l.substring(0,l.length-1),s--),!IE(l)){let d;return l.trim().length===0?d="Invalid space after '<'.":d="Tag '"+l+"' is an invalid name.",ve("InvalidTag",d,qe(r,s))}let c=vE(r,s);if(c===!1)return ve("InvalidAttr","Attributes for '"+l+"' have open quote.",qe(r,s));let u=c.value;if(s=c.index,u[u.length-1]==="/"){let d=s-u.length;u=u.substring(0,u.length-1);let p=Pp(u,e);if(p===!0)n=!0;else return ve(p.err.code,p.err.msg,qe(r,d+p.err.line))}else if(a)if(c.tagClosed){if(u.trim().length>0)return ve("InvalidTag","Closing tag '"+l+"' can't have attributes or invalid starting.",qe(r,o));if(t.length===0)return ve("InvalidTag","Closing tag '"+l+"' has not been opened.",qe(r,o));{let d=t.pop();if(l!==d.tagName){let p=qe(r,d.tagStartPos);return ve("InvalidTag","Expected closing tag '"+d.tagName+"' (opened in line "+p.line+", col "+p.col+") instead of closing tag '"+l+"'.",qe(r,o))}t.length==0&&(i=!0)}}else return ve("InvalidTag","Closing tag '"+l+"' doesn't have proper closing.",qe(r,s));else{let d=Pp(u,e);if(d!==!0)return ve(d.err.code,d.err.msg,qe(r,s-u.length+d.err.line));if(i===!0)return ve("InvalidXml","Multiple possible root nodes found.",qe(r,s));e.unpairedTags.indexOf(l)!==-1||t.push({tagName:l,tagStartPos:o}),n=!0}for(s++;s<r.length;s++)if(r[s]==="<")if(r[s+1]==="!"){s++,s=Tp(r,s);continue}else if(r[s+1]==="?"){if(s=Ep(r,++s),s.err)return s}else break;else if(r[s]==="&"){let d=kE(r,s);if(d==-1)return ve("InvalidChar","char '&' is not expected.",qe(r,s));s=d}else if(i===!0&&!wp(r[s]))return ve("InvalidXml","Extra text at the end",qe(r,s));r[s]==="<"&&s--}}else{if(wp(r[s]))continue;return ve("InvalidChar","char '"+r[s]+"' is not expected.",qe(r,s))}if(n){if(t.length==1)return ve("InvalidTag","Unclosed tag '"+t[0].tagName+"'.",qe(r,t[0].tagStartPos));if(t.length>0)return ve("InvalidXml","Invalid '"+JSON.stringify(t.map(s=>s.tagName),null,4).replace(/\r?\n/g,"")+"' found.",{line:1,col:1})}else return ve("InvalidXml","Start tag expected.",1);return!0};function wp(r){return r===" "||r==="	"||r===`
`||r==="\r"}function Ep(r,e){let t=e;for(;e<r.length;e++)if(r[e]=="?"||r[e]==" "){let n=r.substr(t,e-t);if(e>5&&n==="xml")return ve("InvalidXml","XML declaration allowed only at the start of the document.",qe(r,e));if(r[e]=="?"&&r[e+1]==">"){e++;break}else continue}return e}function Tp(r,e){if(r.length>e+5&&r[e+1]==="-"&&r[e+2]==="-"){for(e+=3;e<r.length;e++)if(r[e]==="-"&&r[e+1]==="-"&&r[e+2]===">"){e+=2;break}}else if(r.length>e+8&&r[e+1]==="D"&&r[e+2]==="O"&&r[e+3]==="C"&&r[e+4]==="T"&&r[e+5]==="Y"&&r[e+6]==="P"&&r[e+7]==="E"){let t=1;for(e+=8;e<r.length;e++)if(r[e]==="<")t++;else if(r[e]===">"&&(t--,t===0))break}else if(r.length>e+9&&r[e+1]==="["&&r[e+2]==="C"&&r[e+3]==="D"&&r[e+4]==="A"&&r[e+5]==="T"&&r[e+6]==="A"&&r[e+7]==="["){for(e+=8;e<r.length;e++)if(r[e]==="]"&&r[e+1]==="]"&&r[e+2]===">"){e+=2;break}}return e}var TE='"',PE="'";function vE(r,e){let t="",n="",i=!1;for(;e<r.length;e++){if(r[e]===TE||r[e]===PE)n===""?n=r[e]:n!==r[e]||(n="");else if(r[e]===">"&&n===""){i=!0;break}t+=r[e]}return n!==""?!1:{value:t,index:e,tagClosed:i}}var xE=new RegExp(`(\\s*)([^\\s=]+)(\\s*=)?(\\s*(['"])(([\\s\\S])*?)\\5)?`,"g");function Pp(r,e){let t=Kl.getAllMatches(r,xE),n={};for(let i=0;i<t.length;i++){if(t[i][1].length===0)return ve("InvalidAttr","Attribute '"+t[i][2]+"' has no space in starting.",ci(t[i]));if(t[i][3]!==void 0&&t[i][4]===void 0)return ve("InvalidAttr","Attribute '"+t[i][2]+"' is without value.",ci(t[i]));if(t[i][3]===void 0&&!e.allowBooleanAttributes)return ve("InvalidAttr","boolean attribute '"+t[i][2]+"' is not allowed.",ci(t[i]));let s=t[i][2];if(!_E(s))return ve("InvalidAttr","Attribute '"+s+"' is an invalid name.",ci(t[i]));if(!n.hasOwnProperty(s))n[s]=1;else return ve("InvalidAttr","Attribute '"+s+"' is repeated.",ci(t[i]))}return!0}function CE(r,e){let t=/\d/;for(r[e]==="x"&&(e++,t=/[\da-fA-F]/);e<r.length;e++){if(r[e]===";")return e;if(!r[e].match(t))break}return-1}function kE(r,e){if(e++,r[e]===";")return-1;if(r[e]==="#")return e++,CE(r,e);let t=0;for(;e<r.length;e++,t++)if(!(r[e].match(/\w/)&&t<20)){if(r[e]===";")break;return-1}return e}function ve(r,e,t){return{err:{code:r,msg:e,line:t.line||t,col:t.col}}}function _E(r){return Kl.isName(r)}function IE(r){return Kl.isName(r)}function qe(r,e){let t=r.substring(0,e).split(/\r?\n/);return{line:t.length,col:t[t.length-1].length+1}}function ci(r){return r.startIndex+r[1].length}});var Ip=k(Yl=>{var{DANGEROUS_PROPERTY_NAMES:xp,criticalProperties:RE}=li(),Cp=r=>xp.includes(r)?"__"+r:r,kp={preserveOrder:!1,attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,removeNSPrefix:!1,allowBooleanAttributes:!1,parseTagValue:!0,parseAttributeValue:!1,trimValues:!0,cdataPropName:!1,numberParseOptions:{hex:!0,leadingZeros:!0,eNotation:!0},tagValueProcessor:function(r,e){return e},attributeValueProcessor:function(r,e){return e},stopNodes:[],alwaysCreateTextNode:!1,isArray:()=>!1,commentPropName:!1,unpairedTags:[],processEntities:!0,htmlEntities:!1,ignoreDeclaration:!1,ignorePiTags:!1,transformTagName:!1,transformAttributeName:!1,updateTag:function(r,e,t){return r},captureMetaData:!1,maxNestedTags:100,strictReservedNames:!0,onDangerousProperty:Cp};function NE(r,e){if(typeof r!="string")return;let t=r.toLowerCase();if(xp.some(n=>t===n.toLowerCase()))throw new Error(`[SECURITY] Invalid ${e}: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`);if(RE.some(n=>t===n.toLowerCase()))throw new Error(`[SECURITY] Invalid ${e}: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`)}function _p(r){return typeof r=="boolean"?{enabled:r,maxEntitySize:1e4,maxExpansionDepth:10,maxTotalExpansions:1e3,maxExpandedLength:1e5,allowedTags:null,tagFilter:null}:typeof r=="object"&&r!==null?{enabled:r.enabled!==!1,maxEntitySize:Math.max(1,r.maxEntitySize??1e4),maxExpansionDepth:Math.max(1,r.maxExpansionDepth??1e4),maxTotalExpansions:Math.max(1,r.maxTotalExpansions??1/0),maxExpandedLength:Math.max(1,r.maxExpandedLength??1e5),maxEntityCount:Math.max(1,r.maxEntityCount??1e3),allowedTags:r.allowedTags??null,tagFilter:r.tagFilter??null}:_p(!0)}var AE=function(r){let e=Object.assign({},kp,r),t=[{value:e.attributeNamePrefix,name:"attributeNamePrefix"},{value:e.attributesGroupName,name:"attributesGroupName"},{value:e.textNodeName,name:"textNodeName"},{value:e.cdataPropName,name:"cdataPropName"},{value:e.commentPropName,name:"commentPropName"}];for(let{value:n,name:i}of t)n&&NE(n,i);return e.onDangerousProperty===null&&(e.onDangerousProperty=Cp),e.processEntities=_p(e.processEntities),e};Yl.buildOptions=AE;Yl.defaultOptions=kp});var Np=k((AN,Rp)=>{"use strict";var Xl=class{constructor(e){this.tagname=e,this.child=[],this[":@"]={}}add(e,t){e==="__proto__"&&(e="#__proto__"),this.child.push({[e]:t})}addChild(e){e.tagname==="__proto__"&&(e.tagname="#__proto__"),e[":@"]&&Object.keys(e[":@"]).length>0?this.child.push({[e.tagname]:e.child,":@":e[":@"]}):this.child.push({[e.tagname]:e.child})}};Rp.exports=Xl});var Mp=k((ON,Op)=>{var Ap=li(),Ql=class{constructor(e){this.suppressValidationErr=!e,this.options=e||{}}readDocType(e,t){let n=Object.create(null),i=0;if(e[t+3]==="O"&&e[t+4]==="C"&&e[t+5]==="T"&&e[t+6]==="Y"&&e[t+7]==="P"&&e[t+8]==="E"){t=t+9;let s=1,o=!1,a=!1,l="";for(;t<e.length;t++)if(e[t]==="<"&&!a){if(o&&Nr(e,"!ENTITY",t)){t+=7;let c,u;if([c,u,t]=this.readEntityExp(e,t+1,this.suppressValidationErr),u.indexOf("&")===-1){if(this.options.enabled!==!1&&this.options.maxEntityCount!=null&&i>=this.options.maxEntityCount)throw new Error(`Entity count (${i+1}) exceeds maximum allowed (${this.options.maxEntityCount})`);let d=c.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");n[c]={regx:RegExp(`&${d};`,"g"),val:u},i++}}else if(o&&Nr(e,"!ELEMENT",t)){t+=8;let{index:c}=this.readElementExp(e,t+1);t=c}else if(o&&Nr(e,"!ATTLIST",t))t+=8;else if(o&&Nr(e,"!NOTATION",t)){t+=9;let{index:c}=this.readNotationExp(e,t+1,this.suppressValidationErr);t=c}else if(Nr(e,"!--",t))a=!0;else throw new Error("Invalid DOCTYPE");s++,l=""}else if(e[t]===">"){if(a?e[t-1]==="-"&&e[t-2]==="-"&&(a=!1,s--):s--,s===0)break}else e[t]==="["?o=!0:l+=e[t];if(s!==0)throw new Error("Unclosed DOCTYPE")}else throw new Error("Invalid Tag instead of DOCTYPE");return{entities:n,i:t}}readEntityExp(e,t){t=ze(e,t);let n="";for(;t<e.length&&!/\s/.test(e[t])&&e[t]!=='"'&&e[t]!=="'";)n+=e[t],t++;if(ui(n),t=ze(e,t),!this.suppressValidationErr){if(e.substring(t,t+6).toUpperCase()==="SYSTEM")throw new Error("External entities are not supported");if(e[t]==="%")throw new Error("Parameter entities are not supported")}let i="";if([t,i]=this.readIdentifierVal(e,t,"entity"),this.options.enabled!==!1&&this.options.maxEntitySize!=null&&i.length>this.options.maxEntitySize)throw new Error(`Entity "${n}" size (${i.length}) exceeds maximum allowed size (${this.options.maxEntitySize})`);return t--,[n,i,t]}readNotationExp(e,t){t=ze(e,t);let n="";for(;t<e.length&&!/\s/.test(e[t]);)n+=e[t],t++;!this.suppressValidationErr&&ui(n),t=ze(e,t);let i=e.substring(t,t+6).toUpperCase();if(!this.suppressValidationErr&&i!=="SYSTEM"&&i!=="PUBLIC")throw new Error(`Expected SYSTEM or PUBLIC, found "${i}"`);t+=i.length,t=ze(e,t);let s=null,o=null;if(i==="PUBLIC")[t,s]=this.readIdentifierVal(e,t,"publicIdentifier"),t=ze(e,t),(e[t]==='"'||e[t]==="'")&&([t,o]=this.readIdentifierVal(e,t,"systemIdentifier"));else if(i==="SYSTEM"&&([t,o]=this.readIdentifierVal(e,t,"systemIdentifier"),!this.suppressValidationErr&&!o))throw new Error("Missing mandatory system identifier for SYSTEM notation");return{notationName:n,publicIdentifier:s,systemIdentifier:o,index:--t}}readIdentifierVal(e,t,n){let i="",s=e[t];if(s!=='"'&&s!=="'")throw new Error(`Expected quoted string, found "${s}"`);for(t++;t<e.length&&e[t]!==s;)i+=e[t],t++;if(e[t]!==s)throw new Error(`Unterminated ${n} value`);return t++,[t,i]}readElementExp(e,t){t=ze(e,t);let n="";for(;t<e.length&&!/\s/.test(e[t]);)n+=e[t],t++;if(!this.suppressValidationErr&&!Ap.isName(n))throw new Error(`Invalid element name: "${n}"`);t=ze(e,t);let i="";if(e[t]==="E"&&Nr(e,"MPTY",t))t+=4;else if(e[t]==="A"&&Nr(e,"NY",t))t+=2;else if(e[t]==="("){for(t++;t<e.length&&e[t]!==")";)i+=e[t],t++;if(e[t]!==")")throw new Error("Unterminated content model")}else if(!this.suppressValidationErr)throw new Error(`Invalid Element Expression, found "${e[t]}"`);return{elementName:n,contentModel:i.trim(),index:t}}readAttlistExp(e,t){t=ze(e,t);let n="";for(;t<e.length&&!/\s/.test(e[t]);)n+=e[t],t++;ui(n),t=ze(e,t);let i="";for(;t<e.length&&!/\s/.test(e[t]);)i+=e[t],t++;if(!ui(i))throw new Error(`Invalid attribute name: "${i}"`);t=ze(e,t);let s="";if(e.substring(t,t+8).toUpperCase()==="NOTATION"){if(s="NOTATION",t+=8,t=ze(e,t),e[t]!=="(")throw new Error(`Expected '(', found "${e[t]}"`);t++;let a=[];for(;t<e.length&&e[t]!==")";){let l="";for(;t<e.length&&e[t]!=="|"&&e[t]!==")";)l+=e[t],t++;if(l=l.trim(),!ui(l))throw new Error(`Invalid notation name: "${l}"`);a.push(l),e[t]==="|"&&(t++,t=ze(e,t))}if(e[t]!==")")throw new Error("Unterminated list of notations");t++,s+=" ("+a.join("|")+")"}else{for(;t<e.length&&!/\s/.test(e[t]);)s+=e[t],t++;let a=["CDATA","ID","IDREF","IDREFS","ENTITY","ENTITIES","NMTOKEN","NMTOKENS"];if(!this.suppressValidationErr&&!a.includes(s.toUpperCase()))throw new Error(`Invalid attribute type: "${s}"`)}t=ze(e,t);let o="";return e.substring(t,t+8).toUpperCase()==="#REQUIRED"?(o="#REQUIRED",t+=8):e.substring(t,t+7).toUpperCase()==="#IMPLIED"?(o="#IMPLIED",t+=7):[t,o]=this.readIdentifierVal(e,t,"ATTLIST"),{elementName:n,attributeName:i,attributeType:s,defaultValue:o,index:t}}},ze=(r,e)=>{for(;e<r.length&&/\s/.test(r[e]);)e++;return e};function Nr(r,e,t){for(let n=0;n<e.length;n++)if(e[n]!==r[t+n+1])return!1;return!0}function ui(r){if(Ap.isName(r))return r;throw new Error(`Invalid entity name ${r}`)}Op.exports=Ql});var Lp=k((MN,Dp)=>{var OE=/^[-+]?0x[a-fA-F0-9]+$/,ME=/^([\-\+])?(0*)([0-9]*(\.[0-9]*)?)$/,DE={hex:!0,leadingZeros:!0,decimalPoint:".",eNotation:!0};function LE(r,e={}){if(e=Object.assign({},DE,e),!r||typeof r!="string")return r;let t=r.trim();if(e.skipLike!==void 0&&e.skipLike.test(t))return r;if(r==="0")return 0;if(e.hex&&OE.test(t))return BE(t,16);if(t.search(/[eE]/)!==-1){let n=t.match(/^([-\+])?(0*)([0-9]*(\.[0-9]*)?[eE][-\+]?[0-9]+)$/);if(n){if(e.leadingZeros)t=(n[1]||"")+n[3];else if(!(n[2]==="0"&&n[3][0]==="."))return r;return e.eNotation?Number(t):r}else return r}else{let n=ME.exec(t);if(n){let i=n[1],s=n[2],o=$E(n[3]);if(!e.leadingZeros&&s.length>0&&i&&t[2]!==".")return r;if(!e.leadingZeros&&s.length>0&&!i&&t[1]!==".")return r;if(e.leadingZeros&&s===r)return 0;{let a=Number(t),l=""+a;return l.search(/[eE]/)!==-1?e.eNotation?a:r:t.indexOf(".")!==-1?l==="0"&&o===""||l===o||i&&l==="-"+o?a:r:s?o===l||i+o===l?a:r:t===l||t===i+l?a:r}}else return r}}function $E(r){return r&&r.indexOf(".")!==-1&&(r=r.replace(/0+$/,""),r==="."?r="0":r[0]==="."?r="0"+r:r[r.length-1]==="."&&(r=r.substr(0,r.length-1))),r}function BE(r,e){if(parseInt)return parseInt(r,e);if(Number.parseInt)return Number.parseInt(r,e);if(window&&window.parseInt)return window.parseInt(r,e);throw new Error("parseInt, Number.parseInt, window.parseInt are not supported")}Dp.exports=LE});var Zl=k((DN,$p)=>{function jE(r){return typeof r=="function"?r:Array.isArray(r)?e=>{for(let t of r)if(typeof t=="string"&&e===t||t instanceof RegExp&&t.test(e))return!0}:()=>!1}$p.exports=jE});var Fp=k((LN,jp)=>{"use strict";var So=li(),cn=Np(),FE=Mp(),HE=Lp(),WE=Zl(),ec=class{constructor(e){if(this.options=e,this.currentNode=null,this.tagsNodeStack=[],this.docTypeEntities={},this.lastEntities={apos:{regex:/&(apos|#39|#x27);/g,val:"'"},gt:{regex:/&(gt|#62|#x3E);/g,val:">"},lt:{regex:/&(lt|#60|#x3C);/g,val:"<"},quot:{regex:/&(quot|#34|#x22);/g,val:'"'}},this.ampEntity={regex:/&(amp|#38|#x26);/g,val:"&"},this.htmlEntities={space:{regex:/&(nbsp|#160);/g,val:" "},cent:{regex:/&(cent|#162);/g,val:"\xA2"},pound:{regex:/&(pound|#163);/g,val:"\xA3"},yen:{regex:/&(yen|#165);/g,val:"\xA5"},euro:{regex:/&(euro|#8364);/g,val:"\u20AC"},copyright:{regex:/&(copy|#169);/g,val:"\xA9"},reg:{regex:/&(reg|#174);/g,val:"\xAE"},inr:{regex:/&(inr|#8377);/g,val:"\u20B9"},num_dec:{regex:/&#([0-9]{1,7});/g,val:(t,n)=>Bp(n,10,"&#")},num_hex:{regex:/&#x([0-9a-fA-F]{1,6});/g,val:(t,n)=>Bp(n,16,"&#x")}},this.addExternalEntities=GE,this.parseXml=KE,this.parseTextData=UE,this.resolveNameSpace=VE,this.buildAttributesMap=JE,this.isItStopNode=QE,this.replaceEntitiesValue=YE,this.readStopNodeData=eT,this.saveTextToParentTag=XE,this.addChild=zE,this.ignoreAttributesFn=WE(this.options.ignoreAttributes),this.entityExpansionCount=0,this.currentExpandedLength=0,this.options.stopNodes&&this.options.stopNodes.length>0){this.stopNodesExact=new Set,this.stopNodesWildcard=new Set;for(let t=0;t<this.options.stopNodes.length;t++){let n=this.options.stopNodes[t];typeof n=="string"&&(n.startsWith("*.")?this.stopNodesWildcard.add(n.substring(2)):this.stopNodesExact.add(n))}}}};function GE(r){let e=Object.keys(r);for(let t=0;t<e.length;t++){let n=e[t],i=n.replace(/[.\-+*:]/g,"\\.");this.lastEntities[n]={regex:new RegExp("&"+i+";","g"),val:r[n]}}}function UE(r,e,t,n,i,s,o){if(r!==void 0&&(this.options.trimValues&&!n&&(r=r.trim()),r.length>0)){o||(r=this.replaceEntitiesValue(r,e,t));let a=this.options.tagValueProcessor(e,r,t,i,s);return a==null?r:typeof a!=typeof r||a!==r?a:this.options.trimValues?rc(r,this.options.parseTagValue,this.options.numberParseOptions):r.trim()===r?rc(r,this.options.parseTagValue,this.options.numberParseOptions):r}}function VE(r){if(this.options.removeNSPrefix){let e=r.split(":"),t=r.charAt(0)==="/"?"/":"";if(e[0]==="xmlns")return"";e.length===2&&(r=t+e[1])}return r}var qE=new RegExp(`([^\\s=]+)\\s*(=\\s*(['"])([\\s\\S]*?)\\3)?`,"gm");function JE(r,e,t){if(this.options.ignoreAttributes!==!0&&typeof r=="string"){let n=So.getAllMatches(r,qE),i=n.length,s={};for(let o=0;o<i;o++){let a=this.resolveNameSpace(n[o][1]);if(this.ignoreAttributesFn(a,e))continue;let l=n[o][4],c=this.options.attributeNamePrefix+a;if(a.length)if(this.options.transformAttributeName&&(c=this.options.transformAttributeName(c)),c=tT(c,this.options),l!==void 0){this.options.trimValues&&(l=l.trim()),l=this.replaceEntitiesValue(l,t,e);let u=this.options.attributeValueProcessor(a,l,e);u==null?s[c]=l:typeof u!=typeof l||u!==l?s[c]=u:s[c]=rc(l,this.options.parseAttributeValue,this.options.numberParseOptions)}else this.options.allowBooleanAttributes&&(s[c]=!0)}if(!Object.keys(s).length)return;if(this.options.attributesGroupName){let o={};return o[this.options.attributesGroupName]=s,o}return s}}var KE=function(r){r=r.replace(/\r\n?/g,`
`);let e=new cn("!xml"),t=e,n="",i="";this.entityExpansionCount=0,this.currentExpandedLength=0;let s=new FE(this.options.processEntities);for(let o=0;o<r.length;o++)if(r[o]==="<")if(r[o+1]==="/"){let l=Ar(r,">",o,"Closing Tag is not closed."),c=r.substring(o+2,l).trim();if(this.options.removeNSPrefix){let p=c.indexOf(":");p!==-1&&(c=c.substr(p+1))}this.options.transformTagName&&(c=this.options.transformTagName(c)),t&&(n=this.saveTextToParentTag(n,t,i));let u=i.substring(i.lastIndexOf(".")+1);if(c&&this.options.unpairedTags.indexOf(c)!==-1)throw new Error(`Unpaired tag can not be used as closing tag: </${c}>`);let d=0;u&&this.options.unpairedTags.indexOf(u)!==-1?(d=i.lastIndexOf(".",i.lastIndexOf(".")-1),this.tagsNodeStack.pop()):d=i.lastIndexOf("."),i=i.substring(0,d),t=this.tagsNodeStack.pop(),n="",o=l}else if(r[o+1]==="?"){let l=tc(r,o,!1,"?>");if(!l)throw new Error("Pi Tag is not closed.");if(n=this.saveTextToParentTag(n,t,i),!(this.options.ignoreDeclaration&&l.tagName==="?xml"||this.options.ignorePiTags)){let c=new cn(l.tagName);c.add(this.options.textNodeName,""),l.tagName!==l.tagExp&&l.attrExpPresent&&(c[":@"]=this.buildAttributesMap(l.tagExp,i,l.tagName)),this.addChild(t,c,i,o)}o=l.closeIndex+1}else if(r.substr(o+1,3)==="!--"){let l=Ar(r,"-->",o+4,"Comment is not closed.");if(this.options.commentPropName){let c=r.substring(o+4,l-2);n=this.saveTextToParentTag(n,t,i),t.add(this.options.commentPropName,[{[this.options.textNodeName]:c}])}o=l}else if(r.substr(o+1,2)==="!D"){let l=s.readDocType(r,o);this.docTypeEntities=l.entities,o=l.i}else if(r.substr(o+1,2)==="!["){let l=Ar(r,"]]>",o,"CDATA is not closed.")-2,c=r.substring(o+9,l);n=this.saveTextToParentTag(n,t,i);let u=this.parseTextData(c,t.tagname,i,!0,!1,!0,!0);u==null&&(u=""),this.options.cdataPropName?t.add(this.options.cdataPropName,[{[this.options.textNodeName]:c}]):t.add(this.options.textNodeName,u),o=l+2}else{let l=tc(r,o,this.options.removeNSPrefix),c=l.tagName,u=l.rawTagName,d=l.tagExp,p=l.attrExpPresent,f=l.closeIndex;if(this.options.transformTagName){let y=this.options.transformTagName(c);d===c&&(d=y),c=y}if(this.options.strictReservedNames&&(c===this.options.commentPropName||c===this.options.cdataPropName||c===this.options.textNodeName||c===this.options.attributesGroupName))throw new Error(`Invalid tag name: ${c}`);t&&n&&t.tagname!=="!xml"&&(n=this.saveTextToParentTag(n,t,i,!1));let h=t;h&&this.options.unpairedTags.indexOf(h.tagname)!==-1&&(t=this.tagsNodeStack.pop(),i=i.substring(0,i.lastIndexOf("."))),c!==e.tagname&&(i+=i?"."+c:c);let g=o;if(this.isItStopNode(this.stopNodesExact,this.stopNodesWildcard,i,c)){let y="";if(d.length>0&&d.lastIndexOf("/")===d.length-1)c[c.length-1]==="/"?(c=c.substr(0,c.length-1),i=i.substr(0,i.length-1),d=c):d=d.substr(0,d.length-1),o=l.closeIndex;else if(this.options.unpairedTags.indexOf(c)!==-1)o=l.closeIndex;else{let S=this.readStopNodeData(r,u,f+1);if(!S)throw new Error(`Unexpected end of ${u}`);o=S.i,y=S.tagContent}let b=new cn(c);c!==d&&p&&(b[":@"]=this.buildAttributesMap(d,i,c)),y&&(y=this.parseTextData(y,c,i,!0,p,!0,!0)),i=i.substr(0,i.lastIndexOf(".")),b.add(this.options.textNodeName,y),this.addChild(t,b,i,g)}else{if(d.length>0&&d.lastIndexOf("/")===d.length-1){if(c[c.length-1]==="/"?(c=c.substr(0,c.length-1),i=i.substr(0,i.length-1),d=c):d=d.substr(0,d.length-1),this.options.transformTagName){let b=this.options.transformTagName(c);d===c&&(d=b),c=b}let y=new cn(c);c!==d&&p&&(y[":@"]=this.buildAttributesMap(d,i,c)),this.addChild(t,y,i,g),i=i.substr(0,i.lastIndexOf("."))}else if(this.options.unpairedTags.indexOf(c)!==-1){let y=new cn(c);c!==d&&p&&(y[":@"]=this.buildAttributesMap(d,i)),this.addChild(t,y,i,g),i=i.substr(0,i.lastIndexOf(".")),o=l.closeIndex;continue}else{let y=new cn(c);if(this.tagsNodeStack.length>this.options.maxNestedTags)throw new Error("Maximum nested tags exceeded");this.tagsNodeStack.push(t),c!==d&&p&&(y[":@"]=this.buildAttributesMap(d,i,c)),this.addChild(t,y,i),t=y}n="",o=f}}else n+=r[o];return e.child};function zE(r,e,t,n){this.options.captureMetaData||(n=void 0);let i=this.options.updateTag(e.tagname,t,e[":@"]);i===!1||(typeof i=="string"&&(e.tagname=i),r.addChild(e,n))}var YE=function(r,e,t){if(r.indexOf("&")===-1)return r;let n=this.options.processEntities;if(!n.enabled||n.allowedTags&&!n.allowedTags.includes(e)||n.tagFilter&&!n.tagFilter(e,t))return r;for(let i in this.docTypeEntities){let s=this.docTypeEntities[i],o=r.match(s.regx);if(o){if(this.entityExpansionCount+=o.length,n.maxTotalExpansions&&this.entityExpansionCount>n.maxTotalExpansions)throw new Error(`Entity expansion limit exceeded: ${this.entityExpansionCount} > ${n.maxTotalExpansions}`);let a=r.length;if(r=r.replace(s.regx,s.val),n.maxExpandedLength&&(this.currentExpandedLength+=r.length-a,this.currentExpandedLength>n.maxExpandedLength))throw new Error(`Total expanded content size exceeded: ${this.currentExpandedLength} > ${n.maxExpandedLength}`)}}if(r.indexOf("&")===-1)return r;for(let i of Object.keys(this.lastEntities)){let s=this.lastEntities[i],o=r.match(s.regex);if(o&&(this.entityExpansionCount+=o.length,n.maxTotalExpansions&&this.entityExpansionCount>n.maxTotalExpansions))throw new Error(`Entity expansion limit exceeded: ${this.entityExpansionCount} > ${n.maxTotalExpansions}`);r=r.replace(s.regex,s.val)}if(r.indexOf("&")===-1)return r;if(this.options.htmlEntities)for(let i of Object.keys(this.htmlEntities)){let s=this.htmlEntities[i],o=r.match(s.regex);if(o&&(this.entityExpansionCount+=o.length,n.maxTotalExpansions&&this.entityExpansionCount>n.maxTotalExpansions))throw new Error(`Entity expansion limit exceeded: ${this.entityExpansionCount} > ${n.maxTotalExpansions}`);r=r.replace(s.regex,s.val)}return r=r.replace(this.ampEntity.regex,this.ampEntity.val),r};function XE(r,e,t,n){return r&&(n===void 0&&(n=e.child.length===0),r=this.parseTextData(r,e.tagname,t,!1,e[":@"]?Object.keys(e[":@"]).length!==0:!1,n),r!==void 0&&r!==""&&e.add(this.options.textNodeName,r),r=""),r}function QE(r,e,t,n){return!!(e&&e.has(n)||r&&r.has(t))}function ZE(r,e,t=">"){let n,i="";for(let s=e;s<r.length;s++){let o=r[s];if(n)o===n&&(n="");else if(o==='"'||o==="'")n=o;else if(o===t[0])if(t[1]){if(r[s+1]===t[1])return{data:i,index:s}}else return{data:i,index:s};else o==="	"&&(o=" ");i+=o}}function Ar(r,e,t,n){let i=r.indexOf(e,t);if(i===-1)throw new Error(n);return i+e.length-1}function tc(r,e,t,n=">"){let i=ZE(r,e+1,n);if(!i)return;let s=i.data,o=i.index,a=s.search(/\s/),l=s,c=!0;a!==-1&&(l=s.substring(0,a),s=s.substring(a+1).trimStart());let u=l;if(t){let d=l.indexOf(":");d!==-1&&(l=l.substr(d+1),c=l!==i.data.substr(d+1))}return{tagName:l,tagExp:s,closeIndex:o,attrExpPresent:c,rawTagName:u}}function eT(r,e,t){let n=t,i=1;for(;t<r.length;t++)if(r[t]==="<")if(r[t+1]==="/"){let s=Ar(r,">",t,`${e} is not closed`);if(r.substring(t+2,s).trim()===e&&(i--,i===0))return{tagContent:r.substring(n,t),i:s};t=s}else if(r[t+1]==="?")t=Ar(r,"?>",t+1,"StopNode is not closed.");else if(r.substr(t+1,3)==="!--")t=Ar(r,"-->",t+3,"StopNode is not closed.");else if(r.substr(t+1,2)==="![")t=Ar(r,"]]>",t,"StopNode is not closed.")-2;else{let s=tc(r,t,">");s&&((s&&s.tagName)===e&&s.tagExp[s.tagExp.length-1]!=="/"&&i++,t=s.closeIndex)}}function rc(r,e,t){if(e&&typeof r=="string"){let n=r.trim();return n==="true"?!0:n==="false"?!1:HE(r,t)}else return So.isExist(r)?r:""}function Bp(r,e,t){let n=Number.parseInt(r,e);return n>=0&&n<=1114111?String.fromCodePoint(n):t+r+";"}function tT(r,e){if(So.criticalProperties.includes(r))throw new Error(`[SECURITY] Invalid name: "${r}" is a reserved JavaScript keyword that could cause prototype pollution`);return So.DANGEROUS_PROPERTY_NAMES.includes(r)?e.onDangerousProperty(r):r}jp.exports=ec});var Gp=k(Wp=>{"use strict";function rT(r,e){return Hp(r,e)}function Hp(r,e,t){let n,i={};for(let s=0;s<r.length;s++){let o=r[s],a=nT(o),l="";if(t===void 0?l=a:l=t+"."+a,a===e.textNodeName)n===void 0?n=o[a]:n+=""+o[a];else{if(a===void 0)continue;if(o[a]){let c=Hp(o[a],e,l),u=sT(c,e);o[":@"]?iT(c,o[":@"],l,e):Object.keys(c).length===1&&c[e.textNodeName]!==void 0&&!e.alwaysCreateTextNode?c=c[e.textNodeName]:Object.keys(c).length===0&&(e.alwaysCreateTextNode?c[e.textNodeName]="":c=""),i[a]!==void 0&&i.hasOwnProperty(a)?(Array.isArray(i[a])||(i[a]=[i[a]]),i[a].push(c)):e.isArray(a,l,u)?i[a]=[c]:i[a]=c}}}return typeof n=="string"?n.length>0&&(i[e.textNodeName]=n):n!==void 0&&(i[e.textNodeName]=n),i}function nT(r){let e=Object.keys(r);for(let t=0;t<e.length;t++){let n=e[t];if(n!==":@")return n}}function iT(r,e,t,n){if(e){let i=Object.keys(e),s=i.length;for(let o=0;o<s;o++){let a=i[o];n.isArray(a,t+"."+a,!0,!0)?r[a]=[e[a]]:r[a]=e[a]}}}function sT(r,e){let{textNodeName:t}=e,n=Object.keys(r).length;return!!(n===0||n===1&&(r[t]||typeof r[t]=="boolean"||r[t]===0))}Wp.prettify=rT});var Vp=k((BN,Up)=>{var{buildOptions:oT}=Ip(),aT=Fp(),{prettify:lT}=Gp(),cT=zl(),nc=class{constructor(e){this.externalEntities={},this.options=oT(e)}parse(e,t){if(typeof e!="string")if(e.toString)e=e.toString();else throw new Error("XML data is accepted in String or Bytes[] form.");if(t){t===!0&&(t={});let s=cT.validate(e,t);if(s!==!0)throw Error(`${s.err.msg}:${s.err.line}:${s.err.col}`)}let n=new aT(this.options);n.addExternalEntities(this.externalEntities);let i=n.parseXml(e);return this.options.preserveOrder||i===void 0?i:lT(i,this.options)}addEntity(e,t){if(t.indexOf("&")!==-1)throw new Error("Entity value can't have '&'");if(e.indexOf("&")!==-1||e.indexOf(";")!==-1)throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");if(t==="&")throw new Error("An entity with value '&' is not permitted");this.externalEntities[e]=t}};Up.exports=nc});var zp=k((jN,Kp)=>{function uT(r,e){let t="";return e.format&&e.indentBy.length>0&&(t=`
`),Jp(r,e,"",t)}function Jp(r,e,t,n){let i="",s=!1;if(!Array.isArray(r)){if(r!=null){let o=r.toString();return o=ic(o,e),o}return""}for(let o=0;o<r.length;o++){let a=r[o],l=dT(a);if(l===void 0)continue;let c="";if(t.length===0?c=l:c=`${t}.${l}`,l===e.textNodeName){let h=a[l];fT(c,e)||(h=e.tagValueProcessor(l,h),h=ic(h,e)),s&&(i+=n),i+=h,s=!1;continue}else if(l===e.cdataPropName){s&&(i+=n),i+=`<![CDATA[${a[l][0][e.textNodeName]}]]>`,s=!1;continue}else if(l===e.commentPropName){i+=n+`<!--${a[l][0][e.textNodeName]}-->`,s=!0;continue}else if(l[0]==="?"){let h=qp(a[":@"],e),g=l==="?xml"?"":n,y=a[l][0][e.textNodeName];y=y.length!==0?" "+y:"",i+=g+`<${l}${y}${h}?>`,s=!0;continue}let u=n;u!==""&&(u+=e.indentBy);let d=qp(a[":@"],e),p=n+`<${l}${d}`,f=Jp(a[l],e,c,u);e.unpairedTags.indexOf(l)!==-1?e.suppressUnpairedNode?i+=p+">":i+=p+"/>":(!f||f.length===0)&&e.suppressEmptyNode?i+=p+"/>":f&&f.endsWith(">")?i+=p+`>${f}${n}</${l}>`:(i+=p+">",f&&n!==""&&(f.includes("/>")||f.includes("</"))?i+=n+e.indentBy+f+n:i+=f,i+=`</${l}>`),s=!0}return i}function dT(r){let e=Object.keys(r);for(let t=0;t<e.length;t++){let n=e[t];if(Object.prototype.hasOwnProperty.call(r,n)&&n!==":@")return n}}function qp(r,e){let t="";if(r&&!e.ignoreAttributes)for(let n in r){if(!Object.prototype.hasOwnProperty.call(r,n))continue;let i=e.attributeValueProcessor(n,r[n]);i=ic(i,e),i===!0&&e.suppressBooleanAttributes?t+=` ${n.substr(e.attributeNamePrefix.length)}`:t+=` ${n.substr(e.attributeNamePrefix.length)}="${i}"`}return t}function fT(r,e){r=r.substr(0,r.length-e.textNodeName.length-1);let t=r.substr(r.lastIndexOf(".")+1);for(let n in e.stopNodes)if(e.stopNodes[n]===r||e.stopNodes[n]==="*."+t)return!0;return!1}function ic(r,e){if(r&&r.length>0&&e.processEntities)for(let t=0;t<e.entities.length;t++){let n=e.entities[t];r=r.replace(n.regex,n.val)}return r}Kp.exports=uT});var Xp=k((FN,Yp)=>{"use strict";var pT=zp(),mT=Zl(),hT={attributeNamePrefix:"@_",attributesGroupName:!1,textNodeName:"#text",ignoreAttributes:!0,cdataPropName:!1,format:!1,indentBy:"  ",suppressEmptyNode:!1,suppressUnpairedNode:!0,suppressBooleanAttributes:!0,tagValueProcessor:function(r,e){return e},attributeValueProcessor:function(r,e){return e},preserveOrder:!1,commentPropName:!1,unpairedTags:[],entities:[{regex:new RegExp("&","g"),val:"&amp;"},{regex:new RegExp(">","g"),val:"&gt;"},{regex:new RegExp("<","g"),val:"&lt;"},{regex:new RegExp("'","g"),val:"&apos;"},{regex:new RegExp('"',"g"),val:"&quot;"}],processEntities:!0,stopNodes:[],oneListGroup:!1};function mr(r){this.options=Object.assign({},hT,r),this.options.ignoreAttributes===!0||this.options.attributesGroupName?this.isAttribute=function(){return!1}:(this.ignoreAttributesFn=mT(this.options.ignoreAttributes),this.attrPrefixLen=this.options.attributeNamePrefix.length,this.isAttribute=bT),this.processTextOrObjNode=gT,this.options.format?(this.indentate=yT,this.tagEndChar=`>
`,this.newLine=`
`):(this.indentate=function(){return""},this.tagEndChar=">",this.newLine="")}mr.prototype.build=function(r){return this.options.preserveOrder?pT(r,this.options):(Array.isArray(r)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1&&(r={[this.options.arrayNodeName]:r}),this.j2x(r,0,[]).val)};mr.prototype.j2x=function(r,e,t){let n="",i="",s=t.join(".");for(let o in r)if(Object.prototype.hasOwnProperty.call(r,o))if(typeof r[o]>"u")this.isAttribute(o)&&(i+="");else if(r[o]===null)this.isAttribute(o)||o===this.options.cdataPropName?i+="":o[0]==="?"?i+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:i+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if(r[o]instanceof Date)i+=this.buildTextValNode(r[o],o,"",e);else if(typeof r[o]!="object"){let a=this.isAttribute(o);if(a&&!this.ignoreAttributesFn(a,s))n+=this.buildAttrPairStr(a,""+r[o]);else if(!a)if(o===this.options.textNodeName){let l=this.options.tagValueProcessor(o,""+r[o]);i+=this.replaceEntitiesValue(l)}else i+=this.buildTextValNode(r[o],o,"",e)}else if(Array.isArray(r[o])){let a=r[o].length,l="",c="";for(let u=0;u<a;u++){let d=r[o][u];if(!(typeof d>"u"))if(d===null)o[0]==="?"?i+=this.indentate(e)+"<"+o+"?"+this.tagEndChar:i+=this.indentate(e)+"<"+o+"/"+this.tagEndChar;else if(typeof d=="object")if(this.options.oneListGroup){let p=this.j2x(d,e+1,t.concat(o));l+=p.val,this.options.attributesGroupName&&d.hasOwnProperty(this.options.attributesGroupName)&&(c+=p.attrStr)}else l+=this.processTextOrObjNode(d,o,e,t);else if(this.options.oneListGroup){let p=this.options.tagValueProcessor(o,d);p=this.replaceEntitiesValue(p),l+=p}else l+=this.buildTextValNode(d,o,"",e)}this.options.oneListGroup&&(l=this.buildObjectNode(l,o,c,e)),i+=l}else if(this.options.attributesGroupName&&o===this.options.attributesGroupName){let a=Object.keys(r[o]),l=a.length;for(let c=0;c<l;c++)n+=this.buildAttrPairStr(a[c],""+r[o][a[c]])}else i+=this.processTextOrObjNode(r[o],o,e,t);return{attrStr:n,val:i}};mr.prototype.buildAttrPairStr=function(r,e){return e=this.options.attributeValueProcessor(r,""+e),e=this.replaceEntitiesValue(e),this.options.suppressBooleanAttributes&&e==="true"?" "+r:" "+r+'="'+e+'"'};function gT(r,e,t,n){let i=this.j2x(r,t+1,n.concat(e));return r[this.options.textNodeName]!==void 0&&Object.keys(r).length===1?this.buildTextValNode(r[this.options.textNodeName],e,i.attrStr,t):this.buildObjectNode(i.val,e,i.attrStr,t)}mr.prototype.buildObjectNode=function(r,e,t,n){if(r==="")return e[0]==="?"?this.indentate(n)+"<"+e+t+"?"+this.tagEndChar:this.indentate(n)+"<"+e+t+this.closeTag(e)+this.tagEndChar;{let i="</"+e+this.tagEndChar,s="";return e[0]==="?"&&(s="?",i=""),(t||t==="")&&r.indexOf("<")===-1?this.indentate(n)+"<"+e+t+s+">"+r+i:this.options.commentPropName!==!1&&e===this.options.commentPropName&&s.length===0?this.indentate(n)+`<!--${r}-->`+this.newLine:this.indentate(n)+"<"+e+t+s+this.tagEndChar+r+this.indentate(n)+i}};mr.prototype.closeTag=function(r){let e="";return this.options.unpairedTags.indexOf(r)!==-1?this.options.suppressUnpairedNode||(e="/"):this.options.suppressEmptyNode?e="/":e=`></${r}`,e};mr.prototype.buildTextValNode=function(r,e,t,n){if(this.options.cdataPropName!==!1&&e===this.options.cdataPropName)return this.indentate(n)+`<![CDATA[${r}]]>`+this.newLine;if(this.options.commentPropName!==!1&&e===this.options.commentPropName)return this.indentate(n)+`<!--${r}-->`+this.newLine;if(e[0]==="?")return this.indentate(n)+"<"+e+t+"?"+this.tagEndChar;{let i=this.options.tagValueProcessor(e,r);return i=this.replaceEntitiesValue(i),i===""?this.indentate(n)+"<"+e+t+this.closeTag(e)+this.tagEndChar:this.indentate(n)+"<"+e+t+">"+i+"</"+e+this.tagEndChar}};mr.prototype.replaceEntitiesValue=function(r){if(r&&r.length>0&&this.options.processEntities)for(let e=0;e<this.options.entities.length;e++){let t=this.options.entities[e];r=r.replace(t.regex,t.val)}return r};function yT(r){return this.options.indentBy.repeat(r)}function bT(r){return r.startsWith(this.options.attributeNamePrefix)&&r!==this.options.textNodeName?r.substr(this.attrPrefixLen):!1}Yp.exports=mr});var un=k((HN,Qp)=>{"use strict";var ST=zl(),wT=Vp(),ET=Xp();Qp.exports={XMLParser:wT,XMLValidator:ST,XMLBuilder:ET}});var fi=k((KN,sm)=>{"use strict";var _T=require("path"),$t="\\\\/",tm=`[^${$t}]`,IT=0,Kt="\\.",RT="\\+",NT="\\?",Eo="\\/",AT="(?=.)",rm="[^/]",ac=`(?:${Eo}|$)`,nm=`(?:^|${Eo})`,lc=`${Kt}{1,2}${ac}`,OT=`(?!${Kt})`,MT=`(?!${nm}${lc})`,DT=`(?!${Kt}{0,1}${ac})`,LT=`(?!${lc})`,$T=`[^.${Eo}]`,BT=`${rm}*?`,im={DOT_LITERAL:Kt,PLUS_LITERAL:RT,QMARK_LITERAL:NT,SLASH_LITERAL:Eo,ONE_CHAR:AT,QMARK:rm,END_ANCHOR:ac,DOTS_SLASH:lc,NO_DOT:OT,NO_DOTS:MT,NO_DOT_SLASH:DT,NO_DOTS_SLASH:LT,QMARK_NO_DOT:$T,STAR:BT,START_ANCHOR:nm},jT={...im,SLASH_LITERAL:`[${$t}]`,QMARK:tm,STAR:`${tm}*?`,DOTS_SLASH:`${Kt}{1,2}(?:[${$t}]|$)`,NO_DOT:`(?!${Kt})`,NO_DOTS:`(?!(?:^|[${$t}])${Kt}{1,2}(?:[${$t}]|$))`,NO_DOT_SLASH:`(?!${Kt}{0,1}(?:[${$t}]|$))`,NO_DOTS_SLASH:`(?!${Kt}{1,2}(?:[${$t}]|$))`,QMARK_NO_DOT:`[^.${$t}]`,START_ANCHOR:`(?:^|[${$t}])`,END_ANCHOR:`(?:[${$t}]|$)`},FT={__proto__:null,alnum:"a-zA-Z0-9",alpha:"a-zA-Z",ascii:"\\x00-\\x7F",blank:" \\t",cntrl:"\\x00-\\x1F\\x7F",digit:"0-9",graph:"\\x21-\\x7E",lower:"a-z",print:"\\x20-\\x7E ",punct:"\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",space:" \\t\\r\\n\\v\\f",upper:"A-Z",word:"A-Za-z0-9_",xdigit:"A-Fa-f0-9"};sm.exports={DEFAULT_MAX_EXTGLOB_RECURSION:IT,MAX_LENGTH:1024*64,POSIX_REGEX_SOURCE:FT,REGEX_BACKSLASH:/\\(?![*+?^${}(|)[\]])/g,REGEX_NON_SPECIAL_CHARS:/^[^@![\].,$*+?^{}()|\\/]+/,REGEX_SPECIAL_CHARS:/[-*+?.^${}(|)[\]]/,REGEX_SPECIAL_CHARS_BACKREF:/(\\?)((\W)(\3*))/g,REGEX_SPECIAL_CHARS_GLOBAL:/([-*+?.^${}(|)[\]])/g,REGEX_REMOVE_BACKSLASH:/(?:\[.*?[^\\]\]|\\(?=.))/g,REPLACEMENTS:{__proto__:null,"***":"*","**/**":"**","**/**/**":"**"},CHAR_0:48,CHAR_9:57,CHAR_UPPERCASE_A:65,CHAR_LOWERCASE_A:97,CHAR_UPPERCASE_Z:90,CHAR_LOWERCASE_Z:122,CHAR_LEFT_PARENTHESES:40,CHAR_RIGHT_PARENTHESES:41,CHAR_ASTERISK:42,CHAR_AMPERSAND:38,CHAR_AT:64,CHAR_BACKWARD_SLASH:92,CHAR_CARRIAGE_RETURN:13,CHAR_CIRCUMFLEX_ACCENT:94,CHAR_COLON:58,CHAR_COMMA:44,CHAR_DOT:46,CHAR_DOUBLE_QUOTE:34,CHAR_EQUAL:61,CHAR_EXCLAMATION_MARK:33,CHAR_FORM_FEED:12,CHAR_FORWARD_SLASH:47,CHAR_GRAVE_ACCENT:96,CHAR_HASH:35,CHAR_HYPHEN_MINUS:45,CHAR_LEFT_ANGLE_BRACKET:60,CHAR_LEFT_CURLY_BRACE:123,CHAR_LEFT_SQUARE_BRACKET:91,CHAR_LINE_FEED:10,CHAR_NO_BREAK_SPACE:160,CHAR_PERCENT:37,CHAR_PLUS:43,CHAR_QUESTION_MARK:63,CHAR_RIGHT_ANGLE_BRACKET:62,CHAR_RIGHT_CURLY_BRACE:125,CHAR_RIGHT_SQUARE_BRACKET:93,CHAR_SEMICOLON:59,CHAR_SINGLE_QUOTE:39,CHAR_SPACE:32,CHAR_TAB:9,CHAR_UNDERSCORE:95,CHAR_VERTICAL_LINE:124,CHAR_ZERO_WIDTH_NOBREAK_SPACE:65279,SEP:_T.sep,extglobChars(r){return{"!":{type:"negate",open:"(?:(?!(?:",close:`))${r.STAR})`},"?":{type:"qmark",open:"(?:",close:")?"},"+":{type:"plus",open:"(?:",close:")+"},"*":{type:"star",open:"(?:",close:")*"},"@":{type:"at",open:"(?:",close:")"}}},globChars(r){return r===!0?jT:im}}});var To=k(Ye=>{"use strict";var HT=require("path"),WT=process.platform==="win32",{REGEX_BACKSLASH:GT,REGEX_REMOVE_BACKSLASH:UT,REGEX_SPECIAL_CHARS:VT,REGEX_SPECIAL_CHARS_GLOBAL:qT}=fi();Ye.isObject=r=>r!==null&&typeof r=="object"&&!Array.isArray(r);Ye.hasRegexChars=r=>VT.test(r);Ye.isRegexChar=r=>r.length===1&&Ye.hasRegexChars(r);Ye.escapeRegex=r=>r.replace(qT,"\\$1");Ye.toPosixSlashes=r=>r.replace(GT,"/");Ye.removeBackslashes=r=>r.replace(UT,e=>e==="\\"?"":e);Ye.supportsLookbehinds=()=>{let r=process.version.slice(1).split(".").map(Number);return r.length===3&&r[0]>=9||r[0]===8&&r[1]>=10};Ye.isWindows=r=>r&&typeof r.windows=="boolean"?r.windows:WT===!0||HT.sep==="\\";Ye.escapeLast=(r,e,t)=>{let n=r.lastIndexOf(e,t);return n===-1?r:r[n-1]==="\\"?Ye.escapeLast(r,e,n-1):`${r.slice(0,n)}\\${r.slice(n)}`};Ye.removePrefix=(r,e={})=>{let t=r;return t.startsWith("./")&&(t=t.slice(2),e.prefix="./"),t};Ye.wrapOutput=(r,e={},t={})=>{let n=t.contains?"":"^",i=t.contains?"":"$",s=`${n}(?:${r})${i}`;return e.negated===!0&&(s=`(?:^(?!${s}).*$)`),s}});var pm=k((YN,fm)=>{"use strict";var om=To(),{CHAR_ASTERISK:cc,CHAR_AT:JT,CHAR_BACKWARD_SLASH:pi,CHAR_COMMA:KT,CHAR_DOT:uc,CHAR_EXCLAMATION_MARK:dc,CHAR_FORWARD_SLASH:dm,CHAR_LEFT_CURLY_BRACE:fc,CHAR_LEFT_PARENTHESES:pc,CHAR_LEFT_SQUARE_BRACKET:zT,CHAR_PLUS:YT,CHAR_QUESTION_MARK:am,CHAR_RIGHT_CURLY_BRACE:XT,CHAR_RIGHT_PARENTHESES:lm,CHAR_RIGHT_SQUARE_BRACKET:QT}=fi(),cm=r=>r===dm||r===pi,um=r=>{r.isPrefix!==!0&&(r.depth=r.isGlobstar?1/0:1)},ZT=(r,e)=>{let t=e||{},n=r.length-1,i=t.parts===!0||t.scanToEnd===!0,s=[],o=[],a=[],l=r,c=-1,u=0,d=0,p=!1,f=!1,h=!1,g=!1,y=!1,b=!1,S=!1,E=!1,I=!1,A=!1,j=0,F,M,O={value:"",depth:0,isGlob:!1},L=()=>c>=n,T=()=>l.charCodeAt(c+1),Z=()=>(F=M,l.charCodeAt(++c));for(;c<n;){M=Z();let be;if(M===pi){S=O.backslashes=!0,M=Z(),M===fc&&(b=!0);continue}if(b===!0||M===fc){for(j++;L()!==!0&&(M=Z());){if(M===pi){S=O.backslashes=!0,Z();continue}if(M===fc){j++;continue}if(b!==!0&&M===uc&&(M=Z())===uc){if(p=O.isBrace=!0,h=O.isGlob=!0,A=!0,i===!0)continue;break}if(b!==!0&&M===KT){if(p=O.isBrace=!0,h=O.isGlob=!0,A=!0,i===!0)continue;break}if(M===XT&&(j--,j===0)){b=!1,p=O.isBrace=!0,A=!0;break}}if(i===!0)continue;break}if(M===dm){if(s.push(c),o.push(O),O={value:"",depth:0,isGlob:!1},A===!0)continue;if(F===uc&&c===u+1){u+=2;continue}d=c+1;continue}if(t.noext!==!0&&(M===YT||M===JT||M===cc||M===am||M===dc)===!0&&T()===pc){if(h=O.isGlob=!0,g=O.isExtglob=!0,A=!0,M===dc&&c===u&&(I=!0),i===!0){for(;L()!==!0&&(M=Z());){if(M===pi){S=O.backslashes=!0,M=Z();continue}if(M===lm){h=O.isGlob=!0,A=!0;break}}continue}break}if(M===cc){if(F===cc&&(y=O.isGlobstar=!0),h=O.isGlob=!0,A=!0,i===!0)continue;break}if(M===am){if(h=O.isGlob=!0,A=!0,i===!0)continue;break}if(M===zT){for(;L()!==!0&&(be=Z());){if(be===pi){S=O.backslashes=!0,Z();continue}if(be===QT){f=O.isBracket=!0,h=O.isGlob=!0,A=!0;break}}if(i===!0)continue;break}if(t.nonegate!==!0&&M===dc&&c===u){E=O.negated=!0,u++;continue}if(t.noparen!==!0&&M===pc){if(h=O.isGlob=!0,i===!0){for(;L()!==!0&&(M=Z());){if(M===pc){S=O.backslashes=!0,M=Z();continue}if(M===lm){A=!0;break}}continue}break}if(h===!0){if(A=!0,i===!0)continue;break}}t.noext===!0&&(g=!1,h=!1);let ie=l,Ct="",P="";u>0&&(Ct=l.slice(0,u),l=l.slice(u),d-=u),ie&&h===!0&&d>0?(ie=l.slice(0,d),P=l.slice(d)):h===!0?(ie="",P=l):ie=l,ie&&ie!==""&&ie!=="/"&&ie!==l&&cm(ie.charCodeAt(ie.length-1))&&(ie=ie.slice(0,-1)),t.unescape===!0&&(P&&(P=om.removeBackslashes(P)),ie&&S===!0&&(ie=om.removeBackslashes(ie)));let w={prefix:Ct,input:r,start:u,base:ie,glob:P,isBrace:p,isBracket:f,isGlob:h,isExtglob:g,isGlobstar:y,negated:E,negatedExtglob:I};if(t.tokens===!0&&(w.maxDepth=0,cm(M)||o.push(O),w.tokens=o),t.parts===!0||t.tokens===!0){let be;for(let K=0;K<s.length;K++){let tt=be?be+1:u,rt=s[K],V=r.slice(tt,rt);t.tokens&&(K===0&&u!==0?(o[K].isPrefix=!0,o[K].value=Ct):o[K].value=V,um(o[K]),w.maxDepth+=o[K].depth),(K!==0||V!=="")&&a.push(V),be=rt}if(be&&be+1<r.length){let K=r.slice(be+1);a.push(K),t.tokens&&(o[o.length-1].value=K,um(o[o.length-1]),w.maxDepth+=o[o.length-1].depth)}w.slashes=s,w.parts=a}return w};fm.exports=ZT});var bm=k((XN,ym)=>{"use strict";var mi=fi(),We=To(),{MAX_LENGTH:Po,POSIX_REGEX_SOURCE:eP,REGEX_NON_SPECIAL_CHARS:tP,REGEX_SPECIAL_CHARS_BACKREF:rP,REPLACEMENTS:mm}=mi,nP=(r,e)=>{if(typeof e.expandRange=="function")return e.expandRange(...r,e);r.sort();let t=`[${r.join("-")}]`;try{new RegExp(t)}catch{return r.map(i=>We.escapeRegex(i)).join("..")}return t},dn=(r,e)=>`Missing ${r}: "${e}" - use "\\\\${e}" to match literal characters`,hm=r=>{let e=[],t=0,n=0,i=0,s="",o=!1;for(let a of r){if(o===!0){s+=a,o=!1;continue}if(a==="\\"){s+=a,o=!0;continue}if(a==='"'){i=i===1?0:1,s+=a;continue}if(i===0){if(a==="[")t++;else if(a==="]"&&t>0)t--;else if(t===0){if(a==="(")n++;else if(a===")"&&n>0)n--;else if(a==="|"&&n===0){e.push(s),s="";continue}}}s+=a}return e.push(s),e},iP=r=>{let e=!1;for(let t of r){if(e===!0){e=!1;continue}if(t==="\\"){e=!0;continue}if(/[?*+@!()[\]{}]/.test(t))return!1}return!0},gm=r=>{let e=r.trim(),t=!0;for(;t===!0;)t=!1,/^@\([^\\()[\]{}|]+\)$/.test(e)&&(e=e.slice(2,-1),t=!0);if(iP(e))return e.replace(/\\(.)/g,"$1")},sP=r=>{let e=r.map(gm).filter(Boolean);for(let t=0;t<e.length;t++)for(let n=t+1;n<e.length;n++){let i=e[t],s=e[n],o=i[0];if(!(!o||i!==o.repeat(i.length)||s!==o.repeat(s.length))&&(i===s||i.startsWith(s)||s.startsWith(i)))return!0}return!1},mc=(r,e=!0)=>{if(r[0]!=="+"&&r[0]!=="*"||r[1]!=="(")return;let t=0,n=0,i=0,s=!1;for(let o=1;o<r.length;o++){let a=r[o];if(s===!0){s=!1;continue}if(a==="\\"){s=!0;continue}if(a==='"'){i=i===1?0:1;continue}if(i!==1){if(a==="["){t++;continue}if(a==="]"&&t>0){t--;continue}if(!(t>0)){if(a==="("){n++;continue}if(a===")"&&(n--,n===0))return e===!0&&o!==r.length-1?void 0:{type:r[0],body:r.slice(2,o),end:o}}}}},oP=r=>{let e=0,t=[];for(;e<r.length;){let i=mc(r.slice(e),!1);if(!i||i.type!=="*")return;let s=hm(i.body).map(a=>a.trim());if(s.length!==1)return;let o=gm(s[0]);if(!o||o.length!==1)return;t.push(o),e+=i.end+1}return t.length<1?void 0:`${t.length===1?We.escapeRegex(t[0]):`[${t.map(i=>We.escapeRegex(i)).join("")}]`}*`},aP=r=>{let e=0,t=r.trim(),n=mc(t);for(;n;)e++,t=n.body.trim(),n=mc(t);return e},lP=(r,e)=>{if(e.maxExtglobRecursion===!1)return{risky:!1};let t=typeof e.maxExtglobRecursion=="number"?e.maxExtglobRecursion:mi.DEFAULT_MAX_EXTGLOB_RECURSION,n=hm(r).map(i=>i.trim());if(n.length>1&&(n.some(i=>i==="")||n.some(i=>/^[*?]+$/.test(i))||sP(n)))return{risky:!0};for(let i of n){let s=oP(i);if(s)return{risky:!0,safeOutput:s};if(aP(i)>t)return{risky:!0}}return{risky:!1}},hc=(r,e)=>{if(typeof r!="string")throw new TypeError("Expected a string");r=mm[r]||r;let t={...e},n=typeof t.maxLength=="number"?Math.min(Po,t.maxLength):Po,i=r.length;if(i>n)throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${n}`);let s={type:"bos",value:"",output:t.prepend||""},o=[s],a=t.capture?"":"?:",l=We.isWindows(e),c=mi.globChars(l),u=mi.extglobChars(c),{DOT_LITERAL:d,PLUS_LITERAL:p,SLASH_LITERAL:f,ONE_CHAR:h,DOTS_SLASH:g,NO_DOT:y,NO_DOT_SLASH:b,NO_DOTS_SLASH:S,QMARK:E,QMARK_NO_DOT:I,STAR:A,START_ANCHOR:j}=c,F=N=>`(${a}(?:(?!${j}${N.dot?g:d}).)*?)`,M=t.dot?"":y,O=t.dot?E:I,L=t.bash===!0?F(t):A;t.capture&&(L=`(${L})`),typeof t.noext=="boolean"&&(t.noextglob=t.noext);let T={input:r,index:-1,start:0,dot:t.dot===!0,consumed:"",output:"",prefix:"",backtrack:!1,negated:!1,brackets:0,braces:0,parens:0,quotes:0,globstar:!1,tokens:o};r=We.removePrefix(r,T),i=r.length;let Z=[],ie=[],Ct=[],P=s,w,be=()=>T.index===i-1,K=T.peek=(N=1)=>r[T.index+N],tt=T.advance=()=>r[++T.index]||"",rt=()=>r.slice(T.index+1),V=(N="",me=0)=>{T.consumed+=N,T.index+=me},q=N=>{T.output+=N.output!=null?N.output:N.value,V(N.value)},_e=()=>{let N=1;for(;K()==="!"&&(K(2)!=="("||K(3)==="?");)tt(),T.start++,N++;return N%2===0?!1:(T.negated=!0,T.start++,!0)},Je=N=>{T[N]++,Ct.push(N)},Ie=N=>{T[N]--,Ct.pop()},H=N=>{if(P.type==="globstar"){let me=T.braces>0&&(N.type==="comma"||N.type==="brace"),R=N.extglob===!0||Z.length&&(N.type==="pipe"||N.type==="paren");N.type!=="slash"&&N.type!=="paren"&&!me&&!R&&(T.output=T.output.slice(0,-P.output.length),P.type="star",P.value="*",P.output=L,T.output+=P.output)}if(Z.length&&N.type!=="paren"&&(Z[Z.length-1].inner+=N.value),(N.value||N.output)&&q(N),P&&P.type==="text"&&N.type==="text"){P.value+=N.value,P.output=(P.output||"")+N.value;return}N.prev=P,o.push(N),P=N},yt=(N,me)=>{let R={...u[me],conditions:1,inner:""};R.prev=P,R.parens=T.parens,R.output=T.output,R.startIndex=T.index,R.tokensIndex=o.length;let Y=(t.capture?"(":"")+R.open;Je("parens"),H({type:N,value:me,output:T.output?"":h}),H({type:"paren",extglob:!0,value:tt(),output:Y}),Z.push(R)},Er=N=>{let me=r.slice(N.startIndex,T.index+1),R=r.slice(N.startIndex+2,T.index),Y=lP(R,t);if((N.type==="plus"||N.type==="star")&&Y.risky){let ce=Y.safeOutput?(N.output?"":h)+(t.capture?`(${Y.safeOutput})`:Y.safeOutput):void 0,kt=o[N.tokensIndex];kt.type="text",kt.value=me,kt.output=ce||We.escapeRegex(me);for(let _t=N.tokensIndex+1;_t<o.length;_t++)o[_t].value="",o[_t].output="",delete o[_t].suffix;T.output=N.output+kt.output,T.backtrack=!0,H({type:"paren",extglob:!0,value:w,output:""}),Ie("parens");return}let de=N.close+(t.capture?")":""),Ne;if(N.type==="negate"){let ce=L;if(N.inner&&N.inner.length>1&&N.inner.includes("/")&&(ce=F(t)),(ce!==L||be()||/^\)+$/.test(rt()))&&(de=N.close=`)$))${ce}`),N.inner.includes("*")&&(Ne=rt())&&/^\.[^\\/.]+$/.test(Ne)){let kt=hc(Ne,{...e,fastpaths:!1}).output;de=N.close=`)${kt})${ce})`}N.prev.type==="bos"&&(T.negatedExtglob=!0)}H({type:"paren",extglob:!0,value:w,output:de}),Ie("parens")};if(t.fastpaths!==!1&&!/(^[*!]|[/()[\]{}"])/.test(r)){let N=!1,me=r.replace(rP,(R,Y,de,Ne,ce,kt)=>Ne==="\\"?(N=!0,R):Ne==="?"?Y?Y+Ne+(ce?E.repeat(ce.length):""):kt===0?O+(ce?E.repeat(ce.length):""):E.repeat(de.length):Ne==="."?d.repeat(de.length):Ne==="*"?Y?Y+Ne+(ce?L:""):L:Y?R:`\\${R}`);return N===!0&&(t.unescape===!0?me=me.replace(/\\/g,""):me=me.replace(/\\+/g,R=>R.length%2===0?"\\\\":R?"\\":"")),me===r&&t.contains===!0?(T.output=r,T):(T.output=We.wrapOutput(me,T,e),T)}for(;!be();){if(w=tt(),w==="\0")continue;if(w==="\\"){let R=K();if(R==="/"&&t.bash!==!0||R==="."||R===";")continue;if(!R){w+="\\",H({type:"text",value:w});continue}let Y=/^\\+/.exec(rt()),de=0;if(Y&&Y[0].length>2&&(de=Y[0].length,T.index+=de,de%2!==0&&(w+="\\")),t.unescape===!0?w=tt():w+=tt(),T.brackets===0){H({type:"text",value:w});continue}}if(T.brackets>0&&(w!=="]"||P.value==="["||P.value==="[^")){if(t.posix!==!1&&w===":"){let R=P.value.slice(1);if(R.includes("[")&&(P.posix=!0,R.includes(":"))){let Y=P.value.lastIndexOf("["),de=P.value.slice(0,Y),Ne=P.value.slice(Y+2),ce=eP[Ne];if(ce){P.value=de+ce,T.backtrack=!0,tt(),!s.output&&o.indexOf(P)===1&&(s.output=h);continue}}}(w==="["&&K()!==":"||w==="-"&&K()==="]")&&(w=`\\${w}`),w==="]"&&(P.value==="["||P.value==="[^")&&(w=`\\${w}`),t.posix===!0&&w==="!"&&P.value==="["&&(w="^"),P.value+=w,q({value:w});continue}if(T.quotes===1&&w!=='"'){w=We.escapeRegex(w),P.value+=w,q({value:w});continue}if(w==='"'){T.quotes=T.quotes===1?0:1,t.keepQuotes===!0&&H({type:"text",value:w});continue}if(w==="("){Je("parens"),H({type:"paren",value:w});continue}if(w===")"){if(T.parens===0&&t.strictBrackets===!0)throw new SyntaxError(dn("opening","("));let R=Z[Z.length-1];if(R&&T.parens===R.parens+1){Er(Z.pop());continue}H({type:"paren",value:w,output:T.parens?")":"\\)"}),Ie("parens");continue}if(w==="["){if(t.nobracket===!0||!rt().includes("]")){if(t.nobracket!==!0&&t.strictBrackets===!0)throw new SyntaxError(dn("closing","]"));w=`\\${w}`}else Je("brackets");H({type:"bracket",value:w});continue}if(w==="]"){if(t.nobracket===!0||P&&P.type==="bracket"&&P.value.length===1){H({type:"text",value:w,output:`\\${w}`});continue}if(T.brackets===0){if(t.strictBrackets===!0)throw new SyntaxError(dn("opening","["));H({type:"text",value:w,output:`\\${w}`});continue}Ie("brackets");let R=P.value.slice(1);if(P.posix!==!0&&R[0]==="^"&&!R.includes("/")&&(w=`/${w}`),P.value+=w,q({value:w}),t.literalBrackets===!1||We.hasRegexChars(R))continue;let Y=We.escapeRegex(P.value);if(T.output=T.output.slice(0,-P.value.length),t.literalBrackets===!0){T.output+=Y,P.value=Y;continue}P.value=`(${a}${Y}|${P.value})`,T.output+=P.value;continue}if(w==="{"&&t.nobrace!==!0){Je("braces");let R={type:"brace",value:w,output:"(",outputIndex:T.output.length,tokensIndex:T.tokens.length};ie.push(R),H(R);continue}if(w==="}"){let R=ie[ie.length-1];if(t.nobrace===!0||!R){H({type:"text",value:w,output:w});continue}let Y=")";if(R.dots===!0){let de=o.slice(),Ne=[];for(let ce=de.length-1;ce>=0&&(o.pop(),de[ce].type!=="brace");ce--)de[ce].type!=="dots"&&Ne.unshift(de[ce].value);Y=nP(Ne,t),T.backtrack=!0}if(R.comma!==!0&&R.dots!==!0){let de=T.output.slice(0,R.outputIndex),Ne=T.tokens.slice(R.tokensIndex);R.value=R.output="\\{",w=Y="\\}",T.output=de;for(let ce of Ne)T.output+=ce.output||ce.value}H({type:"brace",value:w,output:Y}),Ie("braces"),ie.pop();continue}if(w==="|"){Z.length>0&&Z[Z.length-1].conditions++,H({type:"text",value:w});continue}if(w===","){let R=w,Y=ie[ie.length-1];Y&&Ct[Ct.length-1]==="braces"&&(Y.comma=!0,R="|"),H({type:"comma",value:w,output:R});continue}if(w==="/"){if(P.type==="dot"&&T.index===T.start+1){T.start=T.index+1,T.consumed="",T.output="",o.pop(),P=s;continue}H({type:"slash",value:w,output:f});continue}if(w==="."){if(T.braces>0&&P.type==="dot"){P.value==="."&&(P.output=d);let R=ie[ie.length-1];P.type="dots",P.output+=w,P.value+=w,R.dots=!0;continue}if(T.braces+T.parens===0&&P.type!=="bos"&&P.type!=="slash"){H({type:"text",value:w,output:d});continue}H({type:"dot",value:w,output:d});continue}if(w==="?"){if(!(P&&P.value==="(")&&t.noextglob!==!0&&K()==="("&&K(2)!=="?"){yt("qmark",w);continue}if(P&&P.type==="paren"){let Y=K(),de=w;if(Y==="<"&&!We.supportsLookbehinds())throw new Error("Node.js v10 or higher is required for regex lookbehinds");(P.value==="("&&!/[!=<:]/.test(Y)||Y==="<"&&!/<([!=]|\w+>)/.test(rt()))&&(de=`\\${w}`),H({type:"text",value:w,output:de});continue}if(t.dot!==!0&&(P.type==="slash"||P.type==="bos")){H({type:"qmark",value:w,output:I});continue}H({type:"qmark",value:w,output:E});continue}if(w==="!"){if(t.noextglob!==!0&&K()==="("&&(K(2)!=="?"||!/[!=<:]/.test(K(3)))){yt("negate",w);continue}if(t.nonegate!==!0&&T.index===0){_e();continue}}if(w==="+"){if(t.noextglob!==!0&&K()==="("&&K(2)!=="?"){yt("plus",w);continue}if(P&&P.value==="("||t.regex===!1){H({type:"plus",value:w,output:p});continue}if(P&&(P.type==="bracket"||P.type==="paren"||P.type==="brace")||T.parens>0){H({type:"plus",value:w});continue}H({type:"plus",value:p});continue}if(w==="@"){if(t.noextglob!==!0&&K()==="("&&K(2)!=="?"){H({type:"at",extglob:!0,value:w,output:""});continue}H({type:"text",value:w});continue}if(w!=="*"){(w==="$"||w==="^")&&(w=`\\${w}`);let R=tP.exec(rt());R&&(w+=R[0],T.index+=R[0].length),H({type:"text",value:w});continue}if(P&&(P.type==="globstar"||P.star===!0)){P.type="star",P.star=!0,P.value+=w,P.output=L,T.backtrack=!0,T.globstar=!0,V(w);continue}let N=rt();if(t.noextglob!==!0&&/^\([^?]/.test(N)){yt("star",w);continue}if(P.type==="star"){if(t.noglobstar===!0){V(w);continue}let R=P.prev,Y=R.prev,de=R.type==="slash"||R.type==="bos",Ne=Y&&(Y.type==="star"||Y.type==="globstar");if(t.bash===!0&&(!de||N[0]&&N[0]!=="/")){H({type:"star",value:w,output:""});continue}let ce=T.braces>0&&(R.type==="comma"||R.type==="brace"),kt=Z.length&&(R.type==="pipe"||R.type==="paren");if(!de&&R.type!=="paren"&&!ce&&!kt){H({type:"star",value:w,output:""});continue}for(;N.slice(0,3)==="/**";){let _t=r[T.index+4];if(_t&&_t!=="/")break;N=N.slice(3),V("/**",3)}if(R.type==="bos"&&be()){P.type="globstar",P.value+=w,P.output=F(t),T.output=P.output,T.globstar=!0,V(w);continue}if(R.type==="slash"&&R.prev.type!=="bos"&&!Ne&&be()){T.output=T.output.slice(0,-(R.output+P.output).length),R.output=`(?:${R.output}`,P.type="globstar",P.output=F(t)+(t.strictSlashes?")":"|$)"),P.value+=w,T.globstar=!0,T.output+=R.output+P.output,V(w);continue}if(R.type==="slash"&&R.prev.type!=="bos"&&N[0]==="/"){let _t=N[1]!==void 0?"|$":"";T.output=T.output.slice(0,-(R.output+P.output).length),R.output=`(?:${R.output}`,P.type="globstar",P.output=`${F(t)}${f}|${f}${_t})`,P.value+=w,T.output+=R.output+P.output,T.globstar=!0,V(w+tt()),H({type:"slash",value:"/",output:""});continue}if(R.type==="bos"&&N[0]==="/"){P.type="globstar",P.value+=w,P.output=`(?:^|${f}|${F(t)}${f})`,T.output=P.output,T.globstar=!0,V(w+tt()),H({type:"slash",value:"/",output:""});continue}T.output=T.output.slice(0,-P.output.length),P.type="globstar",P.output=F(t),P.value+=w,T.output+=P.output,T.globstar=!0,V(w);continue}let me={type:"star",value:w,output:L};if(t.bash===!0){me.output=".*?",(P.type==="bos"||P.type==="slash")&&(me.output=M+me.output),H(me);continue}if(P&&(P.type==="bracket"||P.type==="paren")&&t.regex===!0){me.output=w,H(me);continue}(T.index===T.start||P.type==="slash"||P.type==="dot")&&(P.type==="dot"?(T.output+=b,P.output+=b):t.dot===!0?(T.output+=S,P.output+=S):(T.output+=M,P.output+=M),K()!=="*"&&(T.output+=h,P.output+=h)),H(me)}for(;T.brackets>0;){if(t.strictBrackets===!0)throw new SyntaxError(dn("closing","]"));T.output=We.escapeLast(T.output,"["),Ie("brackets")}for(;T.parens>0;){if(t.strictBrackets===!0)throw new SyntaxError(dn("closing",")"));T.output=We.escapeLast(T.output,"("),Ie("parens")}for(;T.braces>0;){if(t.strictBrackets===!0)throw new SyntaxError(dn("closing","}"));T.output=We.escapeLast(T.output,"{"),Ie("braces")}if(t.strictSlashes!==!0&&(P.type==="star"||P.type==="bracket")&&H({type:"maybe_slash",value:"",output:`${f}?`}),T.backtrack===!0){T.output="";for(let N of T.tokens)T.output+=N.output!=null?N.output:N.value,N.suffix&&(T.output+=N.suffix)}return T};hc.fastpaths=(r,e)=>{let t={...e},n=typeof t.maxLength=="number"?Math.min(Po,t.maxLength):Po,i=r.length;if(i>n)throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${n}`);r=mm[r]||r;let s=We.isWindows(e),{DOT_LITERAL:o,SLASH_LITERAL:a,ONE_CHAR:l,DOTS_SLASH:c,NO_DOT:u,NO_DOTS:d,NO_DOTS_SLASH:p,STAR:f,START_ANCHOR:h}=mi.globChars(s),g=t.dot?d:u,y=t.dot?p:u,b=t.capture?"":"?:",S={negated:!1,prefix:""},E=t.bash===!0?".*?":f;t.capture&&(E=`(${E})`);let I=M=>M.noglobstar===!0?E:`(${b}(?:(?!${h}${M.dot?c:o}).)*?)`,A=M=>{switch(M){case"*":return`${g}${l}${E}`;case".*":return`${o}${l}${E}`;case"*.*":return`${g}${E}${o}${l}${E}`;case"*/*":return`${g}${E}${a}${l}${y}${E}`;case"**":return g+I(t);case"**/*":return`(?:${g}${I(t)}${a})?${y}${l}${E}`;case"**/*.*":return`(?:${g}${I(t)}${a})?${y}${E}${o}${l}${E}`;case"**/.*":return`(?:${g}${I(t)}${a})?${o}${l}${E}`;default:{let O=/^(.*?)\.(\w+)$/.exec(M);if(!O)return;let L=A(O[1]);return L?L+o+O[2]:void 0}}},j=We.removePrefix(r,S),F=A(j);return F&&t.strictSlashes!==!0&&(F+=`${a}?`),F};ym.exports=hc});var wm=k((QN,Sm)=>{"use strict";var cP=require("path"),uP=pm(),gc=bm(),yc=To(),dP=fi(),fP=r=>r&&typeof r=="object"&&!Array.isArray(r),xe=(r,e,t=!1)=>{if(Array.isArray(r)){let u=r.map(p=>xe(p,e,t));return p=>{for(let f of u){let h=f(p);if(h)return h}return!1}}let n=fP(r)&&r.tokens&&r.input;if(r===""||typeof r!="string"&&!n)throw new TypeError("Expected pattern to be a non-empty string");let i=e||{},s=yc.isWindows(e),o=n?xe.compileRe(r,e):xe.makeRe(r,e,!1,!0),a=o.state;delete o.state;let l=()=>!1;if(i.ignore){let u={...e,ignore:null,onMatch:null,onResult:null};l=xe(i.ignore,u,t)}let c=(u,d=!1)=>{let{isMatch:p,match:f,output:h}=xe.test(u,o,e,{glob:r,posix:s}),g={glob:r,state:a,regex:o,posix:s,input:u,output:h,match:f,isMatch:p};return typeof i.onResult=="function"&&i.onResult(g),p===!1?(g.isMatch=!1,d?g:!1):l(u)?(typeof i.onIgnore=="function"&&i.onIgnore(g),g.isMatch=!1,d?g:!1):(typeof i.onMatch=="function"&&i.onMatch(g),d?g:!0)};return t&&(c.state=a),c};xe.test=(r,e,t,{glob:n,posix:i}={})=>{if(typeof r!="string")throw new TypeError("Expected input to be a string");if(r==="")return{isMatch:!1,output:""};let s=t||{},o=s.format||(i?yc.toPosixSlashes:null),a=r===n,l=a&&o?o(r):r;return a===!1&&(l=o?o(r):r,a=l===n),(a===!1||s.capture===!0)&&(s.matchBase===!0||s.basename===!0?a=xe.matchBase(r,e,t,i):a=e.exec(l)),{isMatch:!!a,match:a,output:l}};xe.matchBase=(r,e,t,n=yc.isWindows(t))=>(e instanceof RegExp?e:xe.makeRe(e,t)).test(cP.basename(r));xe.isMatch=(r,e,t)=>xe(e,t)(r);xe.parse=(r,e)=>Array.isArray(r)?r.map(t=>xe.parse(t,e)):gc(r,{...e,fastpaths:!1});xe.scan=(r,e)=>uP(r,e);xe.compileRe=(r,e,t=!1,n=!1)=>{if(t===!0)return r.output;let i=e||{},s=i.contains?"":"^",o=i.contains?"":"$",a=`${s}(?:${r.output})${o}`;r&&r.negated===!0&&(a=`^(?!${a}).*$`);let l=xe.toRegex(a,e);return n===!0&&(l.state=r),l};xe.makeRe=(r,e={},t=!1,n=!1)=>{if(!r||typeof r!="string")throw new TypeError("Expected a non-empty string");let i={negated:!1,fastpaths:!0};return e.fastpaths!==!1&&(r[0]==="."||r[0]==="*")&&(i.output=gc.fastpaths(r,e)),i.output||(i=gc(r,e)),xe.compileRe(i,e,t,n)};xe.toRegex=(r,e)=>{try{let t=e||{};return new RegExp(r,t.flags||(t.nocase?"i":""))}catch(t){if(e&&e.debug===!0)throw t;return/$^/}};xe.constants=dP;Sm.exports=xe});var bc=k((ZN,Em)=>{"use strict";Em.exports=wm()});var Im=k((eA,_m)=>{"use strict";var gi=require("fs"),{Readable:pP}=require("stream"),hi=require("path"),{promisify:ko}=require("util"),Sc=bc(),mP=ko(gi.readdir),hP=ko(gi.stat),Tm=ko(gi.lstat),gP=ko(gi.realpath),yP="!",Cm="READDIRP_RECURSIVE_ERROR",bP=new Set(["ENOENT","EPERM","EACCES","ELOOP",Cm]),wc="files",km="directories",xo="files_directories",vo="all",Pm=[wc,km,xo,vo],SP=r=>bP.has(r.code),[vm,wP]=process.versions.node.split(".").slice(0,2).map(r=>Number.parseInt(r,10)),EP=process.platform==="win32"&&(vm>10||vm===10&&wP>=5),xm=r=>{if(r!==void 0){if(typeof r=="function")return r;if(typeof r=="string"){let e=Sc(r.trim());return t=>e(t.basename)}if(Array.isArray(r)){let e=[],t=[];for(let n of r){let i=n.trim();i.charAt(0)===yP?t.push(Sc(i.slice(1))):e.push(Sc(i))}return t.length>0?e.length>0?n=>e.some(i=>i(n.basename))&&!t.some(i=>i(n.basename)):n=>!t.some(i=>i(n.basename)):n=>e.some(i=>i(n.basename))}}},Co=class r extends pP{static get defaultOptions(){return{root:".",fileFilter:e=>!0,directoryFilter:e=>!0,type:wc,lstat:!1,depth:2147483648,alwaysStat:!1}}constructor(e={}){super({objectMode:!0,autoDestroy:!0,highWaterMark:e.highWaterMark||4096});let t={...r.defaultOptions,...e},{root:n,type:i}=t;this._fileFilter=xm(t.fileFilter),this._directoryFilter=xm(t.directoryFilter);let s=t.lstat?Tm:hP;EP?this._stat=o=>s(o,{bigint:!0}):this._stat=s,this._maxDepth=t.depth,this._wantsDir=[km,xo,vo].includes(i),this._wantsFile=[wc,xo,vo].includes(i),this._wantsEverything=i===vo,this._root=hi.resolve(n),this._isDirent="Dirent"in gi&&!t.alwaysStat,this._statsProp=this._isDirent?"dirent":"stats",this._rdOptions={encoding:"utf8",withFileTypes:this._isDirent},this.parents=[this._exploreDir(n,1)],this.reading=!1,this.parent=void 0}async _read(e){if(!this.reading){this.reading=!0;try{for(;!this.destroyed&&e>0;){let{path:t,depth:n,files:i=[]}=this.parent||{};if(i.length>0){let s=i.splice(0,e).map(o=>this._formatEntry(o,t));for(let o of await Promise.all(s)){if(this.destroyed)return;let a=await this._getEntryType(o);a==="directory"&&this._directoryFilter(o)?(n<=this._maxDepth&&this.parents.push(this._exploreDir(o.fullPath,n+1)),this._wantsDir&&(this.push(o),e--)):(a==="file"||this._includeAsFile(o))&&this._fileFilter(o)&&this._wantsFile&&(this.push(o),e--)}}else{let s=this.parents.pop();if(!s){this.push(null);break}if(this.parent=await s,this.destroyed)return}}}catch(t){this.destroy(t)}finally{this.reading=!1}}}async _exploreDir(e,t){let n;try{n=await mP(e,this._rdOptions)}catch(i){this._onError(i)}return{files:n,depth:t,path:e}}async _formatEntry(e,t){let n;try{let i=this._isDirent?e.name:e,s=hi.resolve(hi.join(t,i));n={path:hi.relative(this._root,s),fullPath:s,basename:i},n[this._statsProp]=this._isDirent?e:await this._stat(s)}catch(i){this._onError(i)}return n}_onError(e){SP(e)&&!this.destroyed?this.emit("warn",e):this.destroy(e)}async _getEntryType(e){let t=e&&e[this._statsProp];if(t){if(t.isFile())return"file";if(t.isDirectory())return"directory";if(t&&t.isSymbolicLink()){let n=e.fullPath;try{let i=await gP(n),s=await Tm(i);if(s.isFile())return"file";if(s.isDirectory()){let o=i.length;if(n.startsWith(i)&&n.substr(o,1)===hi.sep){let a=new Error(`Circular symlink detected: "${n}" points to "${i}"`);return a.code=Cm,this._onError(a)}return"directory"}}catch(i){this._onError(i)}}}}_includeAsFile(e){let t=e&&e[this._statsProp];return t&&this._wantsEverything&&!t.isDirectory()}},fn=(r,e={})=>{let t=e.entryType||e.type;if(t==="both"&&(t=xo),t&&(e.type=t),r){if(typeof r!="string")throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");if(t&&!Pm.includes(t))throw new Error(`readdirp: Invalid type passed. Use one of ${Pm.join(", ")}`)}else throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");return e.root=r,new Co(e)},TP=(r,e={})=>new Promise((t,n)=>{let i=[];fn(r,e).on("data",s=>i.push(s)).on("end",()=>t(i)).on("error",s=>n(s))});fn.promise=TP;fn.ReaddirpStream=Co;fn.default=fn;_m.exports=fn});var Ec=k((tA,Rm)=>{Rm.exports=function(r,e){if(typeof r!="string")throw new TypeError("expected path to be a string");if(r==="\\"||r==="/")return"/";var t=r.length;if(t<=1)return r;var n="";if(t>4&&r[3]==="\\"){var i=r[2];(i==="?"||i===".")&&r.slice(0,2)==="\\\\"&&(r=r.slice(2),n="//")}var s=r.split(/[/\\]+/);return e!==!1&&s[s.length-1]===""&&s.pop(),n+s.join("/")}});var Lm=k((Mm,Dm)=>{"use strict";Object.defineProperty(Mm,"__esModule",{value:!0});var Om=bc(),PP=Ec(),Nm="!",vP={returnIndex:!1},xP=r=>Array.isArray(r)?r:[r],CP=(r,e)=>{if(typeof r=="function")return r;if(typeof r=="string"){let t=Om(r,e);return n=>r===n||t(n)}return r instanceof RegExp?t=>r.test(t):t=>!1},Am=(r,e,t,n)=>{let i=Array.isArray(t),s=i?t[0]:t;if(!i&&typeof s!="string")throw new TypeError("anymatch: second argument must be a string: got "+Object.prototype.toString.call(s));let o=PP(s,!1);for(let l=0;l<e.length;l++){let c=e[l];if(c(o))return n?-1:!1}let a=i&&[o].concat(t.slice(1));for(let l=0;l<r.length;l++){let c=r[l];if(i?c(...a):c(o))return n?l:!0}return n?-1:!1},Tc=(r,e,t=vP)=>{if(r==null)throw new TypeError("anymatch: specify first argument");let n=typeof t=="boolean"?{returnIndex:t}:t,i=n.returnIndex||!1,s=xP(r),o=s.filter(l=>typeof l=="string"&&l.charAt(0)===Nm).map(l=>l.slice(1)).map(l=>Om(l,n)),a=s.filter(l=>typeof l!="string"||typeof l=="string"&&l.charAt(0)!==Nm).map(l=>CP(l,n));return e==null?(l,c=!1)=>Am(a,o,l,typeof c=="boolean"?c:!1):Am(a,o,e,i)};Tc.default=Tc;Dm.exports=Tc});var Bm=k((rA,$m)=>{$m.exports=function(e){if(typeof e!="string"||e==="")return!1;for(var t;t=/(\\).|([@?!+*]\(.*\))/g.exec(e);){if(t[2])return!0;e=e.slice(t.index+t[0].length)}return!1}});var Pc=k((nA,Fm)=>{var kP=Bm(),jm={"{":"}","(":")","[":"]"},_P=function(r){if(r[0]==="!")return!0;for(var e=0,t=-2,n=-2,i=-2,s=-2,o=-2;e<r.length;){if(r[e]==="*"||r[e+1]==="?"&&/[\].+)]/.test(r[e])||n!==-1&&r[e]==="["&&r[e+1]!=="]"&&(n<e&&(n=r.indexOf("]",e)),n>e&&(o===-1||o>n||(o=r.indexOf("\\",e),o===-1||o>n)))||i!==-1&&r[e]==="{"&&r[e+1]!=="}"&&(i=r.indexOf("}",e),i>e&&(o=r.indexOf("\\",e),o===-1||o>i))||s!==-1&&r[e]==="("&&r[e+1]==="?"&&/[:!=]/.test(r[e+2])&&r[e+3]!==")"&&(s=r.indexOf(")",e),s>e&&(o=r.indexOf("\\",e),o===-1||o>s))||t!==-1&&r[e]==="("&&r[e+1]!=="|"&&(t<e&&(t=r.indexOf("|",e)),t!==-1&&r[t+1]!==")"&&(s=r.indexOf(")",t),s>t&&(o=r.indexOf("\\",t),o===-1||o>s))))return!0;if(r[e]==="\\"){var a=r[e+1];e+=2;var l=jm[a];if(l){var c=r.indexOf(l,e);c!==-1&&(e=c+1)}if(r[e]==="!")return!0}else e++}return!1},IP=function(r){if(r[0]==="!")return!0;for(var e=0;e<r.length;){if(/[*?{}()[\]]/.test(r[e]))return!0;if(r[e]==="\\"){var t=r[e+1];e+=2;var n=jm[t];if(n){var i=r.indexOf(n,e);i!==-1&&(e=i+1)}if(r[e]==="!")return!0}else e++}return!1};Fm.exports=function(e,t){if(typeof e!="string"||e==="")return!1;if(kP(e))return!0;var n=_P;return t&&t.strict===!1&&(n=IP),n(e)}});var Wm=k((iA,Hm)=>{"use strict";var RP=Pc(),NP=require("path").posix.dirname,AP=require("os").platform()==="win32",vc="/",OP=/\\/g,MP=/[\{\[].*[\}\]]$/,DP=/(^|[^\\])([\{\[]|\([^\)]+$)/,LP=/\\([\!\*\?\|\[\]\(\)\{\}])/g;Hm.exports=function(e,t){var n=Object.assign({flipBackslashes:!0},t);n.flipBackslashes&&AP&&e.indexOf(vc)<0&&(e=e.replace(OP,vc)),MP.test(e)&&(e+=vc),e+="a";do e=NP(e);while(RP(e)||DP.test(e));return e.replace(LP,"$1")}});var _o=k(ft=>{"use strict";ft.isInteger=r=>typeof r=="number"?Number.isInteger(r):typeof r=="string"&&r.trim()!==""?Number.isInteger(Number(r)):!1;ft.find=(r,e)=>r.nodes.find(t=>t.type===e);ft.exceedsLimit=(r,e,t=1,n)=>n===!1||!ft.isInteger(r)||!ft.isInteger(e)?!1:(Number(e)-Number(r))/Number(t)>=n;ft.escapeNode=(r,e=0,t)=>{let n=r.nodes[e];n&&(t&&n.type===t||n.type==="open"||n.type==="close")&&n.escaped!==!0&&(n.value="\\"+n.value,n.escaped=!0)};ft.encloseBrace=r=>r.type!=="brace"?!1:r.commas>>0+r.ranges>>0===0?(r.invalid=!0,!0):!1;ft.isInvalidBrace=r=>r.type!=="brace"?!1:r.invalid===!0||r.dollar?!0:r.commas>>0+r.ranges>>0===0||r.open!==!0||r.close!==!0?(r.invalid=!0,!0):!1;ft.isOpenOrClose=r=>r.type==="open"||r.type==="close"?!0:r.open===!0||r.close===!0;ft.reduce=r=>r.reduce((e,t)=>(t.type==="text"&&e.push(t.value),t.type==="range"&&(t.type="text"),e),[]);ft.flatten=(...r)=>{let e=[],t=n=>{for(let i=0;i<n.length;i++){let s=n[i];if(Array.isArray(s)){t(s);continue}s!==void 0&&e.push(s)}return e};return t(r),e}});var Io=k((oA,Um)=>{"use strict";var Gm=_o();Um.exports=(r,e={})=>{let t=(n,i={})=>{let s=e.escapeInvalid&&Gm.isInvalidBrace(i),o=n.invalid===!0&&e.escapeInvalid===!0,a="";if(n.value)return(s||o)&&Gm.isOpenOrClose(n)?"\\"+n.value:n.value;if(n.value)return n.value;if(n.nodes)for(let l of n.nodes)a+=t(l);return a};return t(r)}});var qm=k((aA,Vm)=>{"use strict";Vm.exports=function(r){return typeof r=="number"?r-r===0:typeof r=="string"&&r.trim()!==""?Number.isFinite?Number.isFinite(+r):isFinite(+r):!1}});var th=k((lA,eh)=>{"use strict";var Jm=qm(),Mr=(r,e,t)=>{if(Jm(r)===!1)throw new TypeError("toRegexRange: expected the first argument to be a number");if(e===void 0||r===e)return String(r);if(Jm(e)===!1)throw new TypeError("toRegexRange: expected the second argument to be a number.");let n={relaxZeros:!0,...t};typeof n.strictZeros=="boolean"&&(n.relaxZeros=n.strictZeros===!1);let i=String(n.relaxZeros),s=String(n.shorthand),o=String(n.capture),a=String(n.wrap),l=r+":"+e+"="+i+s+o+a;if(Mr.cache.hasOwnProperty(l))return Mr.cache[l].result;let c=Math.min(r,e),u=Math.max(r,e);if(Math.abs(c-u)===1){let g=r+"|"+e;return n.capture?`(${g})`:n.wrap===!1?g:`(?:${g})`}let d=Zm(r)||Zm(e),p={min:r,max:e,a:c,b:u},f=[],h=[];if(d&&(p.isPadded=d,p.maxLen=String(p.max).length),c<0){let g=u<0?Math.abs(u):1;h=Km(g,Math.abs(c),p,n),c=p.a=0}return u>=0&&(f=Km(c,u,p,n)),p.negatives=h,p.positives=f,p.result=$P(h,f,n),n.capture===!0?p.result=`(${p.result})`:n.wrap!==!1&&f.length+h.length>1&&(p.result=`(?:${p.result})`),Mr.cache[l]=p,p.result};function $P(r,e,t){let n=xc(r,e,"-",!1,t)||[],i=xc(e,r,"",!1,t)||[],s=xc(r,e,"-?",!0,t)||[];return n.concat(s).concat(i).join("|")}function BP(r,e){let t=1,n=1,i=Ym(r,t),s=new Set([e]);for(;r<=i&&i<=e;)s.add(i),t+=1,i=Ym(r,t);for(i=Xm(e+1,n)-1;r<i&&i<=e;)s.add(i),n+=1,i=Xm(e+1,n)-1;return s=[...s],s.sort(HP),s}function jP(r,e,t){if(r===e)return{pattern:r,count:[],digits:0};let n=FP(r,e),i=n.length,s="",o=0;for(let a=0;a<i;a++){let[l,c]=n[a];l===c?s+=l:l!=="0"||c!=="9"?s+=WP(l,c,t):o++}return o&&(s+=t.shorthand===!0?"\\d":"[0-9]"),{pattern:s,count:[o],digits:i}}function Km(r,e,t,n){let i=BP(r,e),s=[],o=r,a;for(let l=0;l<i.length;l++){let c=i[l],u=jP(String(o),String(c),n),d="";if(!t.isPadded&&a&&a.pattern===u.pattern){a.count.length>1&&a.count.pop(),a.count.push(u.count[0]),a.string=a.pattern+Qm(a.count),o=c+1;continue}t.isPadded&&(d=GP(c,t,n)),u.string=d+u.pattern+Qm(u.count),s.push(u),o=c+1,a=u}return s}function xc(r,e,t,n,i){let s=[];for(let o of r){let{string:a}=o;!n&&!zm(e,"string",a)&&s.push(t+a),n&&zm(e,"string",a)&&s.push(t+a)}return s}function FP(r,e){let t=[];for(let n=0;n<r.length;n++)t.push([r[n],e[n]]);return t}function HP(r,e){return r>e?1:e>r?-1:0}function zm(r,e,t){return r.some(n=>n[e]===t)}function Ym(r,e){return Number(String(r).slice(0,-e)+"9".repeat(e))}function Xm(r,e){return r-r%Math.pow(10,e)}function Qm(r){let[e=0,t=""]=r;return t||e>1?`{${e+(t?","+t:"")}}`:""}function WP(r,e,t){return`[${r}${e-r===1?"":"-"}${e}]`}function Zm(r){return/^-?(0+)\d/.test(r)}function GP(r,e,t){if(!e.isPadded)return r;let n=Math.abs(e.maxLen-String(r).length),i=t.relaxZeros!==!1;switch(n){case 0:return"";case 1:return i?"0?":"0";case 2:return i?"0{0,2}":"00";default:return i?`0{0,${n}}`:`0{${n}}`}}Mr.cache={};Mr.clearCache=()=>Mr.cache={};eh.exports=Mr});var _c=k((cA,lh)=>{"use strict";var UP=require("util"),nh=th(),rh=r=>r!==null&&typeof r=="object"&&!Array.isArray(r),VP=r=>e=>r===!0?Number(e):String(e),Cc=r=>typeof r=="number"||typeof r=="string"&&r!=="",yi=r=>Number.isInteger(+r),kc=r=>{let e=`${r}`,t=-1;if(e[0]==="-"&&(e=e.slice(1)),e==="0")return!1;for(;e[++t]==="0";);return t>0},qP=(r,e,t)=>typeof r=="string"||typeof e=="string"?!0:t.stringify===!0,JP=(r,e,t)=>{if(e>0){let n=r[0]==="-"?"-":"";n&&(r=r.slice(1)),r=n+r.padStart(n?e-1:e,"0")}return t===!1?String(r):r},No=(r,e)=>{let t=r[0]==="-"?"-":"";for(t&&(r=r.slice(1),e--);r.length<e;)r="0"+r;return t?"-"+r:r},KP=(r,e,t)=>{r.negatives.sort((a,l)=>a<l?-1:a>l?1:0),r.positives.sort((a,l)=>a<l?-1:a>l?1:0);let n=e.capture?"":"?:",i="",s="",o;return r.positives.length&&(i=r.positives.map(a=>No(String(a),t)).join("|")),r.negatives.length&&(s=`-(${n}${r.negatives.map(a=>No(String(a),t)).join("|")})`),i&&s?o=`${i}|${s}`:o=i||s,e.wrap?`(${n}${o})`:o},ih=(r,e,t,n)=>{if(t)return nh(r,e,{wrap:!1,...n});let i=String.fromCharCode(r);if(r===e)return i;let s=String.fromCharCode(e);return`[${i}-${s}]`},sh=(r,e,t)=>{if(Array.isArray(r)){let n=t.wrap===!0,i=t.capture?"":"?:";return n?`(${i}${r.join("|")})`:r.join("|")}return nh(r,e,t)},oh=(...r)=>new RangeError("Invalid range arguments: "+UP.inspect(...r)),ah=(r,e,t)=>{if(t.strictRanges===!0)throw oh([r,e]);return[]},zP=(r,e)=>{if(e.strictRanges===!0)throw new TypeError(`Expected step "${r}" to be a number`);return[]},YP=(r,e,t=1,n={})=>{let i=Number(r),s=Number(e);if(!Number.isInteger(i)||!Number.isInteger(s)){if(n.strictRanges===!0)throw oh([r,e]);return[]}i===0&&(i=0),s===0&&(s=0);let o=i>s,a=String(r),l=String(e),c=String(t);t=Math.max(Math.abs(t),1);let u=kc(a)||kc(l)||kc(c),d=u?Math.max(a.length,l.length,c.length):0,p=u===!1&&qP(r,e,n)===!1,f=n.transform||VP(p);if(n.toRegex&&t===1)return ih(No(r,d),No(e,d),!0,n);let h={negatives:[],positives:[]},g=S=>h[S<0?"negatives":"positives"].push(Math.abs(S)),y=[],b=0;for(;o?i>=s:i<=s;)n.toRegex===!0&&t>1?g(i):y.push(JP(f(i,b),d,p)),i=o?i-t:i+t,b++;return n.toRegex===!0?t>1?KP(h,n,d):sh(y,null,{wrap:!1,...n}):y},XP=(r,e,t=1,n={})=>{if(!yi(r)&&r.length>1||!yi(e)&&e.length>1)return ah(r,e,n);let i=n.transform||(p=>String.fromCharCode(p)),s=`${r}`.charCodeAt(0),o=`${e}`.charCodeAt(0),a=s>o,l=Math.min(s,o),c=Math.max(s,o);if(n.toRegex&&t===1)return ih(l,c,!1,n);let u=[],d=0;for(;a?s>=o:s<=o;)u.push(i(s,d)),s=a?s-t:s+t,d++;return n.toRegex===!0?sh(u,null,{wrap:!1,options:n}):u},Ro=(r,e,t,n={})=>{if(e==null&&Cc(r))return[r];if(!Cc(r)||!Cc(e))return ah(r,e,n);if(typeof t=="function")return Ro(r,e,1,{transform:t});if(rh(t))return Ro(r,e,0,t);let i={...n};return i.capture===!0&&(i.wrap=!0),t=t||i.step||1,yi(t)?yi(r)&&yi(e)?YP(r,e,t,i):XP(r,e,Math.max(Math.abs(t),1),i):t!=null&&!rh(t)?zP(t,i):Ro(r,e,1,t)};lh.exports=Ro});var dh=k((uA,uh)=>{"use strict";var QP=_c(),ch=_o(),ZP=(r,e={})=>{let t=(n,i={})=>{let s=ch.isInvalidBrace(i),o=n.invalid===!0&&e.escapeInvalid===!0,a=s===!0||o===!0,l=e.escapeInvalid===!0?"\\":"",c="";if(n.isOpen===!0)return l+n.value;if(n.isClose===!0)return console.log("node.isClose",l,n.value),l+n.value;if(n.type==="open")return a?l+n.value:"(";if(n.type==="close")return a?l+n.value:")";if(n.type==="comma")return n.prev.type==="comma"?"":a?n.value:"|";if(n.value)return n.value;if(n.nodes&&n.ranges>0){let u=ch.reduce(n.nodes),d=QP(...u,{...e,wrap:!1,toRegex:!0,strictZeros:!0});if(d.length!==0)return u.length>1&&d.length>1?`(${d})`:d}if(n.nodes)for(let u of n.nodes)c+=t(u,n);return c};return t(r)};uh.exports=ZP});var mh=k((dA,ph)=>{"use strict";var ev=_c(),fh=Io(),pn=_o(),Dr=(r="",e="",t=!1)=>{let n=[];if(r=[].concat(r),e=[].concat(e),!e.length)return r;if(!r.length)return t?pn.flatten(e).map(i=>`{${i}}`):e;for(let i of r)if(Array.isArray(i))for(let s of i)n.push(Dr(s,e,t));else for(let s of e)t===!0&&typeof s=="string"&&(s=`{${s}}`),n.push(Array.isArray(s)?Dr(i,s,t):i+s);return pn.flatten(n)},tv=(r,e={})=>{let t=e.rangeLimit===void 0?1e3:e.rangeLimit,n=(i,s={})=>{i.queue=[];let o=s,a=s.queue;for(;o.type!=="brace"&&o.type!=="root"&&o.parent;)o=o.parent,a=o.queue;if(i.invalid||i.dollar){a.push(Dr(a.pop(),fh(i,e)));return}if(i.type==="brace"&&i.invalid!==!0&&i.nodes.length===2){a.push(Dr(a.pop(),["{}"]));return}if(i.nodes&&i.ranges>0){let d=pn.reduce(i.nodes);if(pn.exceedsLimit(...d,e.step,t))throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");let p=ev(...d,e);p.length===0&&(p=fh(i,e)),a.push(Dr(a.pop(),p)),i.nodes=[];return}let l=pn.encloseBrace(i),c=i.queue,u=i;for(;u.type!=="brace"&&u.type!=="root"&&u.parent;)u=u.parent,c=u.queue;for(let d=0;d<i.nodes.length;d++){let p=i.nodes[d];if(p.type==="comma"&&i.type==="brace"){d===1&&c.push(""),c.push("");continue}if(p.type==="close"){a.push(Dr(a.pop(),c,l));continue}if(p.value&&p.type!=="open"){c.push(Dr(c.pop(),p.value));continue}p.nodes&&n(p,i)}return c};return pn.flatten(n(r))};ph.exports=tv});var gh=k((fA,hh)=>{"use strict";hh.exports={MAX_LENGTH:1e4,CHAR_0:"0",CHAR_9:"9",CHAR_UPPERCASE_A:"A",CHAR_LOWERCASE_A:"a",CHAR_UPPERCASE_Z:"Z",CHAR_LOWERCASE_Z:"z",CHAR_LEFT_PARENTHESES:"(",CHAR_RIGHT_PARENTHESES:")",CHAR_ASTERISK:"*",CHAR_AMPERSAND:"&",CHAR_AT:"@",CHAR_BACKSLASH:"\\",CHAR_BACKTICK:"`",CHAR_CARRIAGE_RETURN:"\r",CHAR_CIRCUMFLEX_ACCENT:"^",CHAR_COLON:":",CHAR_COMMA:",",CHAR_DOLLAR:"$",CHAR_DOT:".",CHAR_DOUBLE_QUOTE:'"',CHAR_EQUAL:"=",CHAR_EXCLAMATION_MARK:"!",CHAR_FORM_FEED:"\f",CHAR_FORWARD_SLASH:"/",CHAR_HASH:"#",CHAR_HYPHEN_MINUS:"-",CHAR_LEFT_ANGLE_BRACKET:"<",CHAR_LEFT_CURLY_BRACE:"{",CHAR_LEFT_SQUARE_BRACKET:"[",CHAR_LINE_FEED:`
`,CHAR_NO_BREAK_SPACE:"\xA0",CHAR_PERCENT:"%",CHAR_PLUS:"+",CHAR_QUESTION_MARK:"?",CHAR_RIGHT_ANGLE_BRACKET:">",CHAR_RIGHT_CURLY_BRACE:"}",CHAR_RIGHT_SQUARE_BRACKET:"]",CHAR_SEMICOLON:";",CHAR_SINGLE_QUOTE:"'",CHAR_SPACE:" ",CHAR_TAB:"	",CHAR_UNDERSCORE:"_",CHAR_VERTICAL_LINE:"|",CHAR_ZERO_WIDTH_NOBREAK_SPACE:"\uFEFF"}});var Eh=k((pA,wh)=>{"use strict";var rv=Io(),{MAX_LENGTH:yh,CHAR_BACKSLASH:Ic,CHAR_BACKTICK:nv,CHAR_COMMA:iv,CHAR_DOT:sv,CHAR_LEFT_PARENTHESES:ov,CHAR_RIGHT_PARENTHESES:av,CHAR_LEFT_CURLY_BRACE:lv,CHAR_RIGHT_CURLY_BRACE:cv,CHAR_LEFT_SQUARE_BRACKET:bh,CHAR_RIGHT_SQUARE_BRACKET:Sh,CHAR_DOUBLE_QUOTE:uv,CHAR_SINGLE_QUOTE:dv,CHAR_NO_BREAK_SPACE:fv,CHAR_ZERO_WIDTH_NOBREAK_SPACE:pv}=gh(),mv=(r,e={})=>{if(typeof r!="string")throw new TypeError("Expected a string");let t=e||{},n=typeof t.maxLength=="number"?Math.min(yh,t.maxLength):yh;if(r.length>n)throw new SyntaxError(`Input length (${r.length}), exceeds max characters (${n})`);let i={type:"root",input:r,nodes:[]},s=[i],o=i,a=i,l=0,c=r.length,u=0,d=0,p,f=()=>r[u++],h=g=>{if(g.type==="text"&&a.type==="dot"&&(a.type="text"),a&&a.type==="text"&&g.type==="text"){a.value+=g.value;return}return o.nodes.push(g),g.parent=o,g.prev=a,a=g,g};for(h({type:"bos"});u<c;)if(o=s[s.length-1],p=f(),!(p===pv||p===fv)){if(p===Ic){h({type:"text",value:(e.keepEscaping?p:"")+f()});continue}if(p===Sh){h({type:"text",value:"\\"+p});continue}if(p===bh){l++;let g;for(;u<c&&(g=f());){if(p+=g,g===bh){l++;continue}if(g===Ic){p+=f();continue}if(g===Sh&&(l--,l===0))break}h({type:"text",value:p});continue}if(p===ov){o=h({type:"paren",nodes:[]}),s.push(o),h({type:"text",value:p});continue}if(p===av){if(o.type!=="paren"){h({type:"text",value:p});continue}o=s.pop(),h({type:"text",value:p}),o=s[s.length-1];continue}if(p===uv||p===dv||p===nv){let g=p,y;for(e.keepQuotes!==!0&&(p="");u<c&&(y=f());){if(y===Ic){p+=y+f();continue}if(y===g){e.keepQuotes===!0&&(p+=y);break}p+=y}h({type:"text",value:p});continue}if(p===lv){d++;let y={type:"brace",open:!0,close:!1,dollar:a.value&&a.value.slice(-1)==="$"||o.dollar===!0,depth:d,commas:0,ranges:0,nodes:[]};o=h(y),s.push(o),h({type:"open",value:p});continue}if(p===cv){if(o.type!=="brace"){h({type:"text",value:p});continue}let g="close";o=s.pop(),o.close=!0,h({type:g,value:p}),d--,o=s[s.length-1];continue}if(p===iv&&d>0){if(o.ranges>0){o.ranges=0;let g=o.nodes.shift();o.nodes=[g,{type:"text",value:rv(o)}]}h({type:"comma",value:p}),o.commas++;continue}if(p===sv&&d>0&&o.commas===0){let g=o.nodes;if(d===0||g.length===0){h({type:"text",value:p});continue}if(a.type==="dot"){if(o.range=[],a.value+=p,a.type="range",o.nodes.length!==3&&o.nodes.length!==5){o.invalid=!0,o.ranges=0,a.type="text";continue}o.ranges++,o.args=[];continue}if(a.type==="range"){g.pop();let y=g[g.length-1];y.value+=a.value+p,a=y,o.ranges--;continue}h({type:"dot",value:p});continue}h({type:"text",value:p})}do if(o=s.pop(),o.type!=="root"){o.nodes.forEach(b=>{b.nodes||(b.type==="open"&&(b.isOpen=!0),b.type==="close"&&(b.isClose=!0),b.nodes||(b.type="text"),b.invalid=!0)});let g=s[s.length-1],y=g.nodes.indexOf(o);g.nodes.splice(y,1,...o.nodes)}while(s.length>0);return h({type:"eos"}),i};wh.exports=mv});var vh=k((mA,Ph)=>{"use strict";var Th=Io(),hv=dh(),gv=mh(),yv=Eh(),it=(r,e={})=>{let t=[];if(Array.isArray(r))for(let n of r){let i=it.create(n,e);Array.isArray(i)?t.push(...i):t.push(i)}else t=[].concat(it.create(r,e));return e&&e.expand===!0&&e.nodupes===!0&&(t=[...new Set(t)]),t};it.parse=(r,e={})=>yv(r,e);it.stringify=(r,e={})=>Th(typeof r=="string"?it.parse(r,e):r,e);it.compile=(r,e={})=>(typeof r=="string"&&(r=it.parse(r,e)),hv(r,e));it.expand=(r,e={})=>{typeof r=="string"&&(r=it.parse(r,e));let t=gv(r,e);return e.noempty===!0&&(t=t.filter(Boolean)),e.nodupes===!0&&(t=[...new Set(t)]),t};it.create=(r,e={})=>r===""||r.length<3?[r]:e.expand!==!0?it.compile(r,e):it.expand(r,e);Ph.exports=it});var xh=k((hA,bv)=>{bv.exports=["3dm","3ds","3g2","3gp","7z","a","aac","adp","afdesign","afphoto","afpub","ai","aif","aiff","alz","ape","apk","appimage","ar","arj","asf","au","avi","bak","baml","bh","bin","bk","bmp","btif","bz2","bzip2","cab","caf","cgm","class","cmx","cpio","cr2","cur","dat","dcm","deb","dex","djvu","dll","dmg","dng","doc","docm","docx","dot","dotm","dra","DS_Store","dsk","dts","dtshd","dvb","dwg","dxf","ecelp4800","ecelp7470","ecelp9600","egg","eol","eot","epub","exe","f4v","fbs","fh","fla","flac","flatpak","fli","flv","fpx","fst","fvt","g3","gh","gif","graffle","gz","gzip","h261","h263","h264","icns","ico","ief","img","ipa","iso","jar","jpeg","jpg","jpgv","jpm","jxr","key","ktx","lha","lib","lvp","lz","lzh","lzma","lzo","m3u","m4a","m4v","mar","mdi","mht","mid","midi","mj2","mka","mkv","mmr","mng","mobi","mov","movie","mp3","mp4","mp4a","mpeg","mpg","mpga","mxu","nef","npx","numbers","nupkg","o","odp","ods","odt","oga","ogg","ogv","otf","ott","pages","pbm","pcx","pdb","pdf","pea","pgm","pic","png","pnm","pot","potm","potx","ppa","ppam","ppm","pps","ppsm","ppsx","ppt","pptm","pptx","psd","pya","pyc","pyo","pyv","qt","rar","ras","raw","resources","rgb","rip","rlc","rmf","rmvb","rpm","rtf","rz","s3m","s7z","scpt","sgi","shar","snap","sil","sketch","slk","smv","snk","so","stl","suo","sub","swf","tar","tbz","tbz2","tga","tgz","thmx","tif","tiff","tlz","ttc","ttf","txz","udf","uvh","uvi","uvm","uvp","uvs","uvu","viv","vob","war","wav","wax","wbmp","wdp","weba","webm","webp","whl","wim","wm","wma","wmv","wmx","woff","woff2","wrm","wvx","xbm","xif","xla","xlam","xls","xlsb","xlsm","xlsx","xlt","xltm","xltx","xm","xmind","xpi","xpm","xwd","xz","z","zip","zipx"]});var kh=k((gA,Ch)=>{Ch.exports=xh()});var Ih=k((yA,_h)=>{"use strict";var Sv=require("path"),wv=kh(),Ev=new Set(wv);_h.exports=r=>Ev.has(Sv.extname(r).slice(1).toLowerCase())});var Ao=k(D=>{"use strict";var{sep:Tv}=require("path"),{platform:Rc}=process,Pv=require("os");D.EV_ALL="all";D.EV_READY="ready";D.EV_ADD="add";D.EV_CHANGE="change";D.EV_ADD_DIR="addDir";D.EV_UNLINK="unlink";D.EV_UNLINK_DIR="unlinkDir";D.EV_RAW="raw";D.EV_ERROR="error";D.STR_DATA="data";D.STR_END="end";D.STR_CLOSE="close";D.FSEVENT_CREATED="created";D.FSEVENT_MODIFIED="modified";D.FSEVENT_DELETED="deleted";D.FSEVENT_MOVED="moved";D.FSEVENT_CLONED="cloned";D.FSEVENT_UNKNOWN="unknown";D.FSEVENT_FLAG_MUST_SCAN_SUBDIRS=1;D.FSEVENT_TYPE_FILE="file";D.FSEVENT_TYPE_DIRECTORY="directory";D.FSEVENT_TYPE_SYMLINK="symlink";D.KEY_LISTENERS="listeners";D.KEY_ERR="errHandlers";D.KEY_RAW="rawEmitters";D.HANDLER_KEYS=[D.KEY_LISTENERS,D.KEY_ERR,D.KEY_RAW];D.DOT_SLASH=`.${Tv}`;D.BACK_SLASH_RE=/\\/g;D.DOUBLE_SLASH_RE=/\/\//;D.SLASH_OR_BACK_SLASH_RE=/[/\\]/;D.DOT_RE=/\..*\.(sw[px])$|~$|\.subl.*\.tmp/;D.REPLACER_RE=/^\.[/\\]/;D.SLASH="/";D.SLASH_SLASH="//";D.BRACE_START="{";D.BANG="!";D.ONE_DOT=".";D.TWO_DOTS="..";D.STAR="*";D.GLOBSTAR="**";D.ROOT_GLOBSTAR="/**/*";D.SLASH_GLOBSTAR="/**";D.DIR_SUFFIX="Dir";D.ANYMATCH_OPTS={dot:!0};D.STRING_TYPE="string";D.FUNCTION_TYPE="function";D.EMPTY_STR="";D.EMPTY_FN=()=>{};D.IDENTITY_FN=r=>r;D.isWindows=Rc==="win32";D.isMacos=Rc==="darwin";D.isLinux=Rc==="linux";D.isIBMi=Pv.type()==="OS400"});var Dh=k((SA,Mh)=>{"use strict";var zt=require("fs"),Le=require("path"),{promisify:Ei}=require("util"),vv=Ih(),{isWindows:xv,isLinux:Cv,EMPTY_FN:kv,EMPTY_STR:_v,KEY_LISTENERS:mn,KEY_ERR:Nc,KEY_RAW:bi,HANDLER_KEYS:Iv,EV_CHANGE:Mo,EV_ADD:Oo,EV_ADD_DIR:Rv,EV_ERROR:Nh,STR_DATA:Nv,STR_END:Av,BRACE_START:Ov,STAR:Mv}=Ao(),Dv="watch",Lv=Ei(zt.open),Ah=Ei(zt.stat),$v=Ei(zt.lstat),Bv=Ei(zt.close),Ac=Ei(zt.realpath),jv={lstat:$v,stat:Ah},Mc=(r,e)=>{r instanceof Set?r.forEach(e):e(r)},Si=(r,e,t)=>{let n=r[e];n instanceof Set||(r[e]=n=new Set([n])),n.add(t)},Fv=r=>e=>{let t=r[e];t instanceof Set?t.clear():delete r[e]},wi=(r,e,t)=>{let n=r[e];n instanceof Set?n.delete(t):n===t&&delete r[e]},Oh=r=>r instanceof Set?r.size===0:!r,Do=new Map;function Rh(r,e,t,n,i){let s=(o,a)=>{t(r),i(o,a,{watchedPath:r}),a&&r!==a&&Lo(Le.resolve(r,a),mn,Le.join(r,a))};try{return zt.watch(r,e,s)}catch(o){n(o)}}var Lo=(r,e,t,n,i)=>{let s=Do.get(r);s&&Mc(s[e],o=>{o(t,n,i)})},Hv=(r,e,t,n)=>{let{listener:i,errHandler:s,rawEmitter:o}=n,a=Do.get(e),l;if(!t.persistent)return l=Rh(r,t,i,s,o),l.close.bind(l);if(a)Si(a,mn,i),Si(a,Nc,s),Si(a,bi,o);else{if(l=Rh(r,t,Lo.bind(null,e,mn),s,Lo.bind(null,e,bi)),!l)return;l.on(Nh,async c=>{let u=Lo.bind(null,e,Nc);if(a.watcherUnusable=!0,xv&&c.code==="EPERM")try{let d=await Lv(r,"r");await Bv(d),u(c)}catch{}else u(c)}),a={listeners:i,errHandlers:s,rawEmitters:o,watcher:l},Do.set(e,a)}return()=>{wi(a,mn,i),wi(a,Nc,s),wi(a,bi,o),Oh(a.listeners)&&(a.watcher.close(),Do.delete(e),Iv.forEach(Fv(a)),a.watcher=void 0,Object.freeze(a))}},Oc=new Map,Wv=(r,e,t,n)=>{let{listener:i,rawEmitter:s}=n,o=Oc.get(e),a=new Set,l=new Set,c=o&&o.options;return c&&(c.persistent<t.persistent||c.interval>t.interval)&&(a=o.listeners,l=o.rawEmitters,zt.unwatchFile(e),o=void 0),o?(Si(o,mn,i),Si(o,bi,s)):(o={listeners:i,rawEmitters:s,options:t,watcher:zt.watchFile(e,t,(u,d)=>{Mc(o.rawEmitters,f=>{f(Mo,e,{curr:u,prev:d})});let p=u.mtimeMs;(u.size!==d.size||p>d.mtimeMs||p===0)&&Mc(o.listeners,f=>f(r,u))})},Oc.set(e,o)),()=>{wi(o,mn,i),wi(o,bi,s),Oh(o.listeners)&&(Oc.delete(e),zt.unwatchFile(e),o.options=o.watcher=void 0,Object.freeze(o))}},Dc=class{constructor(e){this.fsw=e,this._boundHandleError=t=>e._handleError(t)}_watchWithNodeFs(e,t){let n=this.fsw.options,i=Le.dirname(e),s=Le.basename(e);this.fsw._getWatchedDir(i).add(s);let a=Le.resolve(e),l={persistent:n.persistent};t||(t=kv);let c;return n.usePolling?(l.interval=n.enableBinaryInterval&&vv(s)?n.binaryInterval:n.interval,c=Wv(e,a,l,{listener:t,rawEmitter:this.fsw._emitRaw})):c=Hv(e,a,l,{listener:t,errHandler:this._boundHandleError,rawEmitter:this.fsw._emitRaw}),c}_handleFile(e,t,n){if(this.fsw.closed)return;let i=Le.dirname(e),s=Le.basename(e),o=this.fsw._getWatchedDir(i),a=t;if(o.has(s))return;let l=async(u,d)=>{if(this.fsw._throttle(Dv,e,5)){if(!d||d.mtimeMs===0)try{let p=await Ah(e);if(this.fsw.closed)return;let f=p.atimeMs,h=p.mtimeMs;(!f||f<=h||h!==a.mtimeMs)&&this.fsw._emit(Mo,e,p),Cv&&a.ino!==p.ino?(this.fsw._closeFile(u),a=p,this.fsw._addPathCloser(u,this._watchWithNodeFs(e,l))):a=p}catch{this.fsw._remove(i,s)}else if(o.has(s)){let p=d.atimeMs,f=d.mtimeMs;(!p||p<=f||f!==a.mtimeMs)&&this.fsw._emit(Mo,e,d),a=d}}},c=this._watchWithNodeFs(e,l);if(!(n&&this.fsw.options.ignoreInitial)&&this.fsw._isntIgnored(e)){if(!this.fsw._throttle(Oo,e,0))return;this.fsw._emit(Oo,e,t)}return c}async _handleSymlink(e,t,n,i){if(this.fsw.closed)return;let s=e.fullPath,o=this.fsw._getWatchedDir(t);if(!this.fsw.options.followSymlinks){this.fsw._incrReadyCount();let a;try{a=await Ac(n)}catch{return this.fsw._emitReady(),!0}return this.fsw.closed?void 0:(o.has(i)?this.fsw._symlinkPaths.get(s)!==a&&(this.fsw._symlinkPaths.set(s,a),this.fsw._emit(Mo,n,e.stats)):(o.add(i),this.fsw._symlinkPaths.set(s,a),this.fsw._emit(Oo,n,e.stats)),this.fsw._emitReady(),!0)}if(this.fsw._symlinkPaths.has(s))return!0;this.fsw._symlinkPaths.set(s,!0)}_handleRead(e,t,n,i,s,o,a){if(e=Le.join(e,_v),!n.hasGlob&&(a=this.fsw._throttle("readdir",e,1e3),!a))return;let l=this.fsw._getWatchedDir(n.path),c=new Set,u=this.fsw._readdirp(e,{fileFilter:d=>n.filterPath(d),directoryFilter:d=>n.filterDir(d),depth:0}).on(Nv,async d=>{if(this.fsw.closed){u=void 0;return}let p=d.path,f=Le.join(e,p);if(c.add(p),!(d.stats.isSymbolicLink()&&await this._handleSymlink(d,e,f,p))){if(this.fsw.closed){u=void 0;return}(p===i||!i&&!l.has(p))&&(this.fsw._incrReadyCount(),f=Le.join(s,Le.relative(s,f)),this._addToNodeFs(f,t,n,o+1))}}).on(Nh,this._boundHandleError);return new Promise(d=>u.once(Av,()=>{if(this.fsw.closed){u=void 0;return}let p=a?a.clear():!1;d(),l.getChildren().filter(f=>f!==e&&!c.has(f)&&(!n.hasGlob||n.filterPath({fullPath:Le.resolve(e,f)}))).forEach(f=>{this.fsw._remove(e,f)}),u=void 0,p&&this._handleRead(e,!1,n,i,s,o,a)}))}async _handleDir(e,t,n,i,s,o,a){let l=this.fsw._getWatchedDir(Le.dirname(e)),c=l.has(Le.basename(e));!(n&&this.fsw.options.ignoreInitial)&&!s&&!c&&(!o.hasGlob||o.globFilter(e))&&this.fsw._emit(Rv,e,t),l.add(Le.basename(e)),this.fsw._getWatchedDir(e);let u,d,p=this.fsw.options.depth;if((p==null||i<=p)&&!this.fsw._symlinkPaths.has(a)){if(!s&&(await this._handleRead(e,n,o,s,e,i,u),this.fsw.closed))return;d=this._watchWithNodeFs(e,(f,h)=>{h&&h.mtimeMs===0||this._handleRead(f,!1,o,s,e,i,u)})}return d}async _addToNodeFs(e,t,n,i,s){let o=this.fsw._emitReady;if(this.fsw._isIgnored(e)||this.fsw.closed)return o(),!1;let a=this.fsw._getWatchHelpers(e,i);!a.hasGlob&&n&&(a.hasGlob=n.hasGlob,a.globFilter=n.globFilter,a.filterPath=l=>n.filterPath(l),a.filterDir=l=>n.filterDir(l));try{let l=await jv[a.statMethod](a.watchPath);if(this.fsw.closed)return;if(this.fsw._isIgnored(a.watchPath,l))return o(),!1;let c=this.fsw.options.followSymlinks&&!e.includes(Mv)&&!e.includes(Ov),u;if(l.isDirectory()){let d=Le.resolve(e),p=c?await Ac(e):e;if(this.fsw.closed||(u=await this._handleDir(a.watchPath,l,t,i,s,a,p),this.fsw.closed))return;d!==p&&p!==void 0&&this.fsw._symlinkPaths.set(d,p)}else if(l.isSymbolicLink()){let d=c?await Ac(e):e;if(this.fsw.closed)return;let p=Le.dirname(a.watchPath);if(this.fsw._getWatchedDir(p).add(a.watchPath),this.fsw._emit(Oo,a.watchPath,l),u=await this._handleDir(p,l,t,i,e,a,d),this.fsw.closed)return;d!==void 0&&this.fsw._symlinkPaths.set(Le.resolve(e),d)}else u=this._handleFile(a.watchPath,l,t);return o(),this.fsw._addPathCloser(e,u),!1}catch(l){if(this.fsw._handleError(l))return o(),e}}};Mh.exports=Dc});var Wh=k((wA,Gc)=>{"use strict";var Hc=require("fs"),$e=require("path"),{promisify:Wc}=require("util"),hn;try{hn=require("fsevents")}catch(r){process.env.CHOKIDAR_PRINT_FSEVENTS_REQUIRE_ERROR&&console.error(r)}if(hn){let r=process.version.match(/v(\d+)\.(\d+)/);if(r&&r[1]&&r[2]){let e=Number.parseInt(r[1],10),t=Number.parseInt(r[2],10);e===8&&t<16&&(hn=void 0)}}var{EV_ADD:Lc,EV_CHANGE:Gv,EV_ADD_DIR:Lh,EV_UNLINK:$o,EV_ERROR:Uv,STR_DATA:Vv,STR_END:qv,FSEVENT_CREATED:Jv,FSEVENT_MODIFIED:Kv,FSEVENT_DELETED:zv,FSEVENT_MOVED:Yv,FSEVENT_UNKNOWN:Xv,FSEVENT_FLAG_MUST_SCAN_SUBDIRS:Qv,FSEVENT_TYPE_FILE:Zv,FSEVENT_TYPE_DIRECTORY:Ti,FSEVENT_TYPE_SYMLINK:Hh,ROOT_GLOBSTAR:$h,DIR_SUFFIX:ex,DOT_SLASH:Bh,FUNCTION_TYPE:$c,EMPTY_FN:tx,IDENTITY_FN:rx}=Ao(),nx=r=>isNaN(r)?{}:{depth:r},jc=Wc(Hc.stat),ix=Wc(Hc.lstat),jh=Wc(Hc.realpath),sx={stat:jc,lstat:ix},Lr=new Map,ox=10,ax=new Set([69888,70400,71424,72704,73472,131328,131840,262912]),lx=(r,e)=>({stop:hn.watch(r,e)});function cx(r,e,t,n){let i=$e.extname(e)?$e.dirname(e):e,s=$e.dirname(i),o=Lr.get(i);ux(s)&&(i=s);let a=$e.resolve(r),l=a!==e,c=(d,p,f)=>{l&&(d=d.replace(e,a)),(d===a||!d.indexOf(a+$e.sep))&&t(d,p,f)},u=!1;for(let d of Lr.keys())if(e.indexOf($e.resolve(d)+$e.sep)===0){i=d,o=Lr.get(i),u=!0;break}return o||u?o.listeners.add(c):(o={listeners:new Set([c]),rawEmitter:n,watcher:lx(i,(d,p)=>{if(!o.listeners.size||p&Qv)return;let f=hn.getInfo(d,p);o.listeners.forEach(h=>{h(d,p,f)}),o.rawEmitter(f.event,d,f)})},Lr.set(i,o)),()=>{let d=o.listeners;if(d.delete(c),!d.size&&(Lr.delete(i),o.watcher))return o.watcher.stop().then(()=>{o.rawEmitter=o.watcher=void 0,Object.freeze(o)})}}var ux=r=>{let e=0;for(let t of Lr.keys())if(t.indexOf(r)===0&&(e++,e>=ox))return!0;return!1},dx=()=>hn&&Lr.size<128,Bc=(r,e)=>{let t=0;for(;!r.indexOf(e)&&(r=$e.dirname(r))!==e;)t++;return t},Fh=(r,e)=>r.type===Ti&&e.isDirectory()||r.type===Hh&&e.isSymbolicLink()||r.type===Zv&&e.isFile(),Fc=class{constructor(e){this.fsw=e}checkIgnored(e,t){let n=this.fsw._ignoredPaths;if(this.fsw._isIgnored(e,t))return n.add(e),t&&t.isDirectory()&&n.add(e+$h),!0;n.delete(e),n.delete(e+$h)}addOrChange(e,t,n,i,s,o,a,l){let c=s.has(o)?Gv:Lc;this.handleEvent(c,e,t,n,i,s,o,a,l)}async checkExists(e,t,n,i,s,o,a,l){try{let c=await jc(e);if(this.fsw.closed)return;Fh(a,c)?this.addOrChange(e,t,n,i,s,o,a,l):this.handleEvent($o,e,t,n,i,s,o,a,l)}catch(c){c.code==="EACCES"?this.addOrChange(e,t,n,i,s,o,a,l):this.handleEvent($o,e,t,n,i,s,o,a,l)}}handleEvent(e,t,n,i,s,o,a,l,c){if(!(this.fsw.closed||this.checkIgnored(t)))if(e===$o){let u=l.type===Ti;(u||o.has(a))&&this.fsw._remove(s,a,u)}else{if(e===Lc){if(l.type===Ti&&this.fsw._getWatchedDir(t),l.type===Hh&&c.followSymlinks){let d=c.depth===void 0?void 0:Bc(n,i)+1;return this._addToFsEvents(t,!1,!0,d)}this.fsw._getWatchedDir(s).add(a)}let u=l.type===Ti?e+ex:e;this.fsw._emit(u,t),u===Lh&&this._addToFsEvents(t,!1,!0)}}_watchWithFsEvents(e,t,n,i){if(this.fsw.closed||this.fsw._isIgnored(e))return;let s=this.fsw.options,a=cx(e,t,async(l,c,u)=>{if(this.fsw.closed||s.depth!==void 0&&Bc(l,t)>s.depth)return;let d=n($e.join(e,$e.relative(e,l)));if(i&&!i(d))return;let p=$e.dirname(d),f=$e.basename(d),h=this.fsw._getWatchedDir(u.type===Ti?d:p);if(ax.has(c)||u.event===Xv)if(typeof s.ignored===$c){let g;try{g=await jc(d)}catch{}if(this.fsw.closed||this.checkIgnored(d,g))return;Fh(u,g)?this.addOrChange(d,l,t,p,h,f,u,s):this.handleEvent($o,d,l,t,p,h,f,u,s)}else this.checkExists(d,l,t,p,h,f,u,s);else switch(u.event){case Jv:case Kv:return this.addOrChange(d,l,t,p,h,f,u,s);case zv:case Yv:return this.checkExists(d,l,t,p,h,f,u,s)}},this.fsw._emitRaw);return this.fsw._emitReady(),a}async _handleFsEventsSymlink(e,t,n,i){if(!(this.fsw.closed||this.fsw._symlinkPaths.has(t))){this.fsw._symlinkPaths.set(t,!0),this.fsw._incrReadyCount();try{let s=await jh(e);if(this.fsw.closed)return;if(this.fsw._isIgnored(s))return this.fsw._emitReady();this.fsw._incrReadyCount(),this._addToFsEvents(s||e,o=>{let a=e;return s&&s!==Bh?a=o.replace(s,e):o!==Bh&&(a=$e.join(e,o)),n(a)},!1,i)}catch(s){if(this.fsw._handleError(s))return this.fsw._emitReady()}}}emitAdd(e,t,n,i,s){let o=n(e),a=t.isDirectory(),l=this.fsw._getWatchedDir($e.dirname(o)),c=$e.basename(o);a&&this.fsw._getWatchedDir(o),!l.has(c)&&(l.add(c),(!i.ignoreInitial||s===!0)&&this.fsw._emit(a?Lh:Lc,o,t))}initWatch(e,t,n,i){if(this.fsw.closed)return;let s=this._watchWithFsEvents(n.watchPath,$e.resolve(e||n.watchPath),i,n.globFilter);this.fsw._addPathCloser(t,s)}async _addToFsEvents(e,t,n,i){if(this.fsw.closed)return;let s=this.fsw.options,o=typeof t===$c?t:rx,a=this.fsw._getWatchHelpers(e);try{let l=await sx[a.statMethod](a.watchPath);if(this.fsw.closed)return;if(this.fsw._isIgnored(a.watchPath,l))throw null;if(l.isDirectory()){if(a.globFilter||this.emitAdd(o(e),l,o,s,n),i&&i>s.depth)return;this.fsw._readdirp(a.watchPath,{fileFilter:c=>a.filterPath(c),directoryFilter:c=>a.filterDir(c),...nx(s.depth-(i||0))}).on(Vv,c=>{if(this.fsw.closed||c.stats.isDirectory()&&!a.filterPath(c))return;let u=$e.join(a.watchPath,c.path),{fullPath:d}=c;if(a.followSymlinks&&c.stats.isSymbolicLink()){let p=s.depth===void 0?void 0:Bc(u,$e.resolve(a.watchPath))+1;this._handleFsEventsSymlink(u,d,o,p)}else this.emitAdd(u,c.stats,o,s,n)}).on(Uv,tx).on(qv,()=>{this.fsw._emitReady()})}else this.emitAdd(a.watchPath,l,o,s,n),this.fsw._emitReady()}catch(l){(!l||this.fsw._handleError(l))&&(this.fsw._emitReady(),this.fsw._emitReady())}if(s.persistent&&n!==!0)if(typeof t===$c)this.initWatch(void 0,e,a,o);else{let l;try{l=await jh(a.watchPath)}catch{}this.initWatch(l,e,a,o)}}};Gc.exports=Fc;Gc.exports.canUse=dx});var Zh=k(iu=>{"use strict";var{EventEmitter:fx}=require("events"),ru=require("fs"),ne=require("path"),{promisify:zh}=require("util"),px=Im(),zc=Lm().default,mx=Wm(),Uc=Pc(),hx=vh(),gx=Ec(),yx=Dh(),Gh=Wh(),{EV_ALL:Vc,EV_READY:bx,EV_ADD:Bo,EV_CHANGE:Pi,EV_UNLINK:Uh,EV_ADD_DIR:Sx,EV_UNLINK_DIR:wx,EV_RAW:Ex,EV_ERROR:qc,STR_CLOSE:Tx,STR_END:Px,BACK_SLASH_RE:vx,DOUBLE_SLASH_RE:Vh,SLASH_OR_BACK_SLASH_RE:xx,DOT_RE:Cx,REPLACER_RE:kx,SLASH:Jc,SLASH_SLASH:_x,BRACE_START:Ix,BANG:Yc,ONE_DOT:Yh,TWO_DOTS:Rx,GLOBSTAR:Nx,SLASH_GLOBSTAR:Kc,ANYMATCH_OPTS:Xc,STRING_TYPE:nu,FUNCTION_TYPE:Ax,EMPTY_STR:Qc,EMPTY_FN:Ox,isWindows:Mx,isMacos:Dx,isIBMi:Lx}=Ao(),$x=zh(ru.stat),Bx=zh(ru.readdir),Zc=(r=[])=>Array.isArray(r)?r:[r],Xh=(r,e=[])=>(r.forEach(t=>{Array.isArray(t)?Xh(t,e):e.push(t)}),e),qh=r=>{let e=Xh(Zc(r));if(!e.every(t=>typeof t===nu))throw new TypeError(`Non-string provided as watch path: ${e}`);return e.map(Qh)},Jh=r=>{let e=r.replace(vx,Jc),t=!1;for(e.startsWith(_x)&&(t=!0);e.match(Vh);)e=e.replace(Vh,Jc);return t&&(e=Jc+e),e},Qh=r=>Jh(ne.normalize(Jh(r))),Kh=(r=Qc)=>e=>typeof e!==nu?e:Qh(ne.isAbsolute(e)?e:ne.join(r,e)),jx=(r,e)=>ne.isAbsolute(r)?r:r.startsWith(Yc)?Yc+ne.join(e,r.slice(1)):ne.join(e,r),Tt=(r,e)=>r[e]===void 0,eu=class{constructor(e,t){this.path=e,this._removeWatcher=t,this.items=new Set}add(e){let{items:t}=this;t&&e!==Yh&&e!==Rx&&t.add(e)}async remove(e){let{items:t}=this;if(!t||(t.delete(e),t.size>0))return;let n=this.path;try{await Bx(n)}catch{this._removeWatcher&&this._removeWatcher(ne.dirname(n),ne.basename(n))}}has(e){let{items:t}=this;if(t)return t.has(e)}getChildren(){let{items:e}=this;if(e)return[...e.values()]}dispose(){this.items.clear(),delete this.path,delete this._removeWatcher,delete this.items,Object.freeze(this)}},Fx="stat",Hx="lstat",tu=class{constructor(e,t,n,i){this.fsw=i,this.path=e=e.replace(kx,Qc),this.watchPath=t,this.fullWatchPath=ne.resolve(t),this.hasGlob=t!==e,e===Qc&&(this.hasGlob=!1),this.globSymlink=this.hasGlob&&n?void 0:!1,this.globFilter=this.hasGlob?zc(e,void 0,Xc):!1,this.dirParts=this.getDirParts(e),this.dirParts.forEach(s=>{s.length>1&&s.pop()}),this.followSymlinks=n,this.statMethod=n?Fx:Hx}checkGlobSymlink(e){return this.globSymlink===void 0&&(this.globSymlink=e.fullParentDir===this.fullWatchPath?!1:{realPath:e.fullParentDir,linkPath:this.fullWatchPath}),this.globSymlink?e.fullPath.replace(this.globSymlink.realPath,this.globSymlink.linkPath):e.fullPath}entryPath(e){return ne.join(this.watchPath,ne.relative(this.watchPath,this.checkGlobSymlink(e)))}filterPath(e){let{stats:t}=e;if(t&&t.isSymbolicLink())return this.filterDir(e);let n=this.entryPath(e);return(this.hasGlob&&typeof this.globFilter===Ax?this.globFilter(n):!0)&&this.fsw._isntIgnored(n,t)&&this.fsw._hasReadPermissions(t)}getDirParts(e){if(!this.hasGlob)return[];let t=[];return(e.includes(Ix)?hx.expand(e):[e]).forEach(i=>{t.push(ne.relative(this.watchPath,i).split(xx))}),t}filterDir(e){if(this.hasGlob){let t=this.getDirParts(this.checkGlobSymlink(e)),n=!1;this.unmatchedGlob=!this.dirParts.some(i=>i.every((s,o)=>(s===Nx&&(n=!0),n||!t[0][o]||zc(s,t[0][o],Xc))))}return!this.unmatchedGlob&&this.fsw._isntIgnored(this.entryPath(e),e.stats)}},jo=class extends fx{constructor(e){super();let t={};e&&Object.assign(t,e),this._watched=new Map,this._closers=new Map,this._ignoredPaths=new Set,this._throttled=new Map,this._symlinkPaths=new Map,this._streams=new Set,this.closed=!1,Tt(t,"persistent")&&(t.persistent=!0),Tt(t,"ignoreInitial")&&(t.ignoreInitial=!1),Tt(t,"ignorePermissionErrors")&&(t.ignorePermissionErrors=!1),Tt(t,"interval")&&(t.interval=100),Tt(t,"binaryInterval")&&(t.binaryInterval=300),Tt(t,"disableGlobbing")&&(t.disableGlobbing=!1),t.enableBinaryInterval=t.binaryInterval!==t.interval,Tt(t,"useFsEvents")&&(t.useFsEvents=!t.usePolling),Gh.canUse()||(t.useFsEvents=!1),Tt(t,"usePolling")&&!t.useFsEvents&&(t.usePolling=Dx),Lx&&(t.usePolling=!0);let i=process.env.CHOKIDAR_USEPOLLING;if(i!==void 0){let l=i.toLowerCase();l==="false"||l==="0"?t.usePolling=!1:l==="true"||l==="1"?t.usePolling=!0:t.usePolling=!!l}let s=process.env.CHOKIDAR_INTERVAL;s&&(t.interval=Number.parseInt(s,10)),Tt(t,"atomic")&&(t.atomic=!t.usePolling&&!t.useFsEvents),t.atomic&&(this._pendingUnlinks=new Map),Tt(t,"followSymlinks")&&(t.followSymlinks=!0),Tt(t,"awaitWriteFinish")&&(t.awaitWriteFinish=!1),t.awaitWriteFinish===!0&&(t.awaitWriteFinish={});let o=t.awaitWriteFinish;o&&(o.stabilityThreshold||(o.stabilityThreshold=2e3),o.pollInterval||(o.pollInterval=100),this._pendingWrites=new Map),t.ignored&&(t.ignored=Zc(t.ignored));let a=0;this._emitReady=()=>{a++,a>=this._readyCount&&(this._emitReady=Ox,this._readyEmitted=!0,process.nextTick(()=>this.emit(bx)))},this._emitRaw=(...l)=>this.emit(Ex,...l),this._readyEmitted=!1,this.options=t,t.useFsEvents?this._fsEventsHandler=new Gh(this):this._nodeFsHandler=new yx(this),Object.freeze(t)}add(e,t,n){let{cwd:i,disableGlobbing:s}=this.options;this.closed=!1;let o=qh(e);return i&&(o=o.map(a=>{let l=jx(a,i);return s||!Uc(a)?l:gx(l)})),o=o.filter(a=>a.startsWith(Yc)?(this._ignoredPaths.add(a.slice(1)),!1):(this._ignoredPaths.delete(a),this._ignoredPaths.delete(a+Kc),this._userIgnored=void 0,!0)),this.options.useFsEvents&&this._fsEventsHandler?(this._readyCount||(this._readyCount=o.length),this.options.persistent&&(this._readyCount+=o.length),o.forEach(a=>this._fsEventsHandler._addToFsEvents(a))):(this._readyCount||(this._readyCount=0),this._readyCount+=o.length,Promise.all(o.map(async a=>{let l=await this._nodeFsHandler._addToNodeFs(a,!n,0,0,t);return l&&this._emitReady(),l})).then(a=>{this.closed||a.filter(l=>l).forEach(l=>{this.add(ne.dirname(l),ne.basename(t||l))})})),this}unwatch(e){if(this.closed)return this;let t=qh(e),{cwd:n}=this.options;return t.forEach(i=>{!ne.isAbsolute(i)&&!this._closers.has(i)&&(n&&(i=ne.join(n,i)),i=ne.resolve(i)),this._closePath(i),this._ignoredPaths.add(i),this._watched.has(i)&&this._ignoredPaths.add(i+Kc),this._userIgnored=void 0}),this}close(){if(this.closed)return this._closePromise;this.closed=!0,this.removeAllListeners();let e=[];return this._closers.forEach(t=>t.forEach(n=>{let i=n();i instanceof Promise&&e.push(i)})),this._streams.forEach(t=>t.destroy()),this._userIgnored=void 0,this._readyCount=0,this._readyEmitted=!1,this._watched.forEach(t=>t.dispose()),["closers","watched","streams","symlinkPaths","throttled"].forEach(t=>{this[`_${t}`].clear()}),this._closePromise=e.length?Promise.all(e).then(()=>{}):Promise.resolve(),this._closePromise}getWatched(){let e={};return this._watched.forEach((t,n)=>{let i=this.options.cwd?ne.relative(this.options.cwd,n):n;e[i||Yh]=t.getChildren().sort()}),e}emitWithAll(e,t){this.emit(...t),e!==qc&&this.emit(Vc,...t)}async _emit(e,t,n,i,s){if(this.closed)return;let o=this.options;Mx&&(t=ne.normalize(t)),o.cwd&&(t=ne.relative(o.cwd,t));let a=[e,t];s!==void 0?a.push(n,i,s):i!==void 0?a.push(n,i):n!==void 0&&a.push(n);let l=o.awaitWriteFinish,c;if(l&&(c=this._pendingWrites.get(t)))return c.lastChange=new Date,this;if(o.atomic){if(e===Uh)return this._pendingUnlinks.set(t,a),setTimeout(()=>{this._pendingUnlinks.forEach((u,d)=>{this.emit(...u),this.emit(Vc,...u),this._pendingUnlinks.delete(d)})},typeof o.atomic=="number"?o.atomic:100),this;e===Bo&&this._pendingUnlinks.has(t)&&(e=a[0]=Pi,this._pendingUnlinks.delete(t))}if(l&&(e===Bo||e===Pi)&&this._readyEmitted){let u=(d,p)=>{d?(e=a[0]=qc,a[1]=d,this.emitWithAll(e,a)):p&&(a.length>2?a[2]=p:a.push(p),this.emitWithAll(e,a))};return this._awaitWriteFinish(t,l.stabilityThreshold,e,u),this}if(e===Pi&&!this._throttle(Pi,t,50))return this;if(o.alwaysStat&&n===void 0&&(e===Bo||e===Sx||e===Pi)){let u=o.cwd?ne.join(o.cwd,t):t,d;try{d=await $x(u)}catch{}if(!d||this.closed)return;a.push(d)}return this.emitWithAll(e,a),this}_handleError(e){let t=e&&e.code;return e&&t!=="ENOENT"&&t!=="ENOTDIR"&&(!this.options.ignorePermissionErrors||t!=="EPERM"&&t!=="EACCES")&&this.emit(qc,e),e||this.closed}_throttle(e,t,n){this._throttled.has(e)||this._throttled.set(e,new Map);let i=this._throttled.get(e),s=i.get(t);if(s)return s.count++,!1;let o,a=()=>{let c=i.get(t),u=c?c.count:0;return i.delete(t),clearTimeout(o),c&&clearTimeout(c.timeoutObject),u};o=setTimeout(a,n);let l={timeoutObject:o,clear:a,count:0};return i.set(t,l),l}_incrReadyCount(){return this._readyCount++}_awaitWriteFinish(e,t,n,i){let s,o=e;this.options.cwd&&!ne.isAbsolute(e)&&(o=ne.join(this.options.cwd,e));let a=new Date,l=c=>{ru.stat(o,(u,d)=>{if(u||!this._pendingWrites.has(e)){u&&u.code!=="ENOENT"&&i(u);return}let p=Number(new Date);c&&d.size!==c.size&&(this._pendingWrites.get(e).lastChange=p);let f=this._pendingWrites.get(e);p-f.lastChange>=t?(this._pendingWrites.delete(e),i(void 0,d)):s=setTimeout(l,this.options.awaitWriteFinish.pollInterval,d)})};this._pendingWrites.has(e)||(this._pendingWrites.set(e,{lastChange:a,cancelWait:()=>(this._pendingWrites.delete(e),clearTimeout(s),n)}),s=setTimeout(l,this.options.awaitWriteFinish.pollInterval))}_getGlobIgnored(){return[...this._ignoredPaths.values()]}_isIgnored(e,t){if(this.options.atomic&&Cx.test(e))return!0;if(!this._userIgnored){let{cwd:n}=this.options,i=this.options.ignored,s=i&&i.map(Kh(n)),o=Zc(s).filter(l=>typeof l===nu&&!Uc(l)).map(l=>l+Kc),a=this._getGlobIgnored().map(Kh(n)).concat(s,o);this._userIgnored=zc(a,void 0,Xc)}return this._userIgnored([e,t])}_isntIgnored(e,t){return!this._isIgnored(e,t)}_getWatchHelpers(e,t){let n=t||this.options.disableGlobbing||!Uc(e)?e:mx(e),i=this.options.followSymlinks;return new tu(e,n,i,this)}_getWatchedDir(e){this._boundRemove||(this._boundRemove=this._remove.bind(this));let t=ne.resolve(e);return this._watched.has(t)||this._watched.set(t,new eu(t,this._boundRemove)),this._watched.get(t)}_hasReadPermissions(e){if(this.options.ignorePermissionErrors)return!0;let n=(e&&Number.parseInt(e.mode,10))&511;return!!(4&Number.parseInt(n.toString(8)[0],10))}_remove(e,t,n){let i=ne.join(e,t),s=ne.resolve(i);if(n=n??(this._watched.has(i)||this._watched.has(s)),!this._throttle("remove",i,100))return;!n&&!this.options.useFsEvents&&this._watched.size===1&&this.add(e,t,!0),this._getWatchedDir(i).getChildren().forEach(p=>this._remove(i,p));let l=this._getWatchedDir(e),c=l.has(t);l.remove(t),this._symlinkPaths.has(s)&&this._symlinkPaths.delete(s);let u=i;if(this.options.cwd&&(u=ne.relative(this.options.cwd,i)),this.options.awaitWriteFinish&&this._pendingWrites.has(u)&&this._pendingWrites.get(u).cancelWait()===Bo)return;this._watched.delete(i),this._watched.delete(s);let d=n?wx:Uh;c&&!this._isIgnored(i)&&this._emit(d,i),this.options.useFsEvents||this._closePath(i)}_closePath(e){this._closeFile(e);let t=ne.dirname(e);this._getWatchedDir(t).remove(ne.basename(e))}_closeFile(e){let t=this._closers.get(e);t&&(t.forEach(n=>n()),this._closers.delete(e))}_addPathCloser(e,t){if(!t)return;let n=this._closers.get(e);n||(n=[],this._closers.set(e,n)),n.push(t)}_readdirp(e,t){if(this.closed)return;let n={type:Vc,alwaysStat:!0,lstat:!0,...t},i=px(e,n);return this._streams.add(i),i.once(Tx,()=>{i=void 0}),i.once(Px,()=>{i&&(this._streams.delete(i),i=void 0)}),i}};iu.FSWatcher=jo;var Wx=(r,e)=>{let t=new jo(e);return t.add(r),t};iu.watch=Wx});var Yt=k((_A,sg)=>{"use strict";var ng=["nodebuffer","arraybuffer","fragments"],ig=typeof Blob<"u";ig&&ng.push("blob");sg.exports={BINARY_TYPES:ng,CLOSE_TIMEOUT:3e4,EMPTY_BUFFER:Buffer.alloc(0),GUID:"258EAFA5-E914-47DA-95CA-C5AB0DC85B11",hasBlob:ig,kForOnEventAttribute:Symbol("kIsForOnEventAttribute"),kListener:Symbol("kListener"),kStatusCode:Symbol("status-code"),kWebSocket:Symbol("websocket"),NOOP:()=>{}}});var vi=k((IA,Go)=>{"use strict";var{EMPTY_BUFFER:Jx}=Yt(),su=Buffer[Symbol.species];function Kx(r,e){if(r.length===0)return Jx;if(r.length===1)return r[0];let t=Buffer.allocUnsafe(e),n=0;for(let i=0;i<r.length;i++){let s=r[i];t.set(s,n),n+=s.length}return n<e?new su(t.buffer,t.byteOffset,n):t}function og(r,e,t,n,i){for(let s=0;s<i;s++)t[n+s]=r[s]^e[s&3]}function ag(r,e){for(let t=0;t<r.length;t++)r[t]^=e[t&3]}function zx(r){return r.length===r.buffer.byteLength?r.buffer:r.buffer.slice(r.byteOffset,r.byteOffset+r.length)}function ou(r){if(ou.readOnly=!0,Buffer.isBuffer(r))return r;let e;return r instanceof ArrayBuffer?e=new su(r):ArrayBuffer.isView(r)?e=new su(r.buffer,r.byteOffset,r.byteLength):(e=Buffer.from(r),ou.readOnly=!1),e}Go.exports={concat:Kx,mask:og,toArrayBuffer:zx,toBuffer:ou,unmask:ag};if(!process.env.WS_NO_BUFFER_UTIL)try{let r=require("bufferutil");Go.exports.mask=function(e,t,n,i,s){s<48?og(e,t,n,i,s):r.mask(e,t,n,i,s)},Go.exports.unmask=function(e,t){e.length<32?ag(e,t):r.unmask(e,t)}}catch{}});var ug=k((RA,cg)=>{"use strict";var lg=Symbol("kDone"),au=Symbol("kRun"),lu=class{constructor(e){this[lg]=()=>{this.pending--,this[au]()},this.concurrency=e||1/0,this.jobs=[],this.pending=0}add(e){this.jobs.push(e),this[au]()}[au](){if(this.pending!==this.concurrency&&this.jobs.length){let e=this.jobs.shift();this.pending++,e(this[lg])}}};cg.exports=lu});var Sn=k((NA,mg)=>{"use strict";var xi=require("zlib"),dg=vi(),Yx=ug(),{kStatusCode:fg}=Yt(),Xx=Buffer[Symbol.species],Qx=Buffer.from([0,0,255,255]),Vo=Symbol("permessage-deflate"),Xt=Symbol("total-length"),yn=Symbol("callback"),hr=Symbol("buffers"),bn=Symbol("error"),Uo,cu=class{constructor(e){if(this._options=e||{},this._threshold=this._options.threshold!==void 0?this._options.threshold:1024,this._maxPayload=this._options.maxPayload|0,this._isServer=!!this._options.isServer,this._deflate=null,this._inflate=null,this.params=null,!Uo){let t=this._options.concurrencyLimit!==void 0?this._options.concurrencyLimit:10;Uo=new Yx(t)}}static get extensionName(){return"permessage-deflate"}offer(){let e={};return this._options.serverNoContextTakeover&&(e.server_no_context_takeover=!0),this._options.clientNoContextTakeover&&(e.client_no_context_takeover=!0),this._options.serverMaxWindowBits&&(e.server_max_window_bits=this._options.serverMaxWindowBits),this._options.clientMaxWindowBits?e.client_max_window_bits=this._options.clientMaxWindowBits:this._options.clientMaxWindowBits==null&&(e.client_max_window_bits=!0),e}accept(e){return e=this.normalizeParams(e),this.params=this._isServer?this.acceptAsServer(e):this.acceptAsClient(e),this.params}cleanup(){if(this._inflate&&(this._inflate.close(),this._inflate=null),this._deflate){let e=this._deflate[yn];this._deflate.close(),this._deflate=null,e&&e(new Error("The deflate stream was closed while data was being processed"))}}acceptAsServer(e){let t=this._options,n=e.find(i=>!(t.serverNoContextTakeover===!1&&i.server_no_context_takeover||i.server_max_window_bits&&(t.serverMaxWindowBits===!1||typeof t.serverMaxWindowBits=="number"&&t.serverMaxWindowBits>i.server_max_window_bits)||typeof t.clientMaxWindowBits=="number"&&!i.client_max_window_bits));if(!n)throw new Error("None of the extension offers can be accepted");return t.serverNoContextTakeover&&(n.server_no_context_takeover=!0),t.clientNoContextTakeover&&(n.client_no_context_takeover=!0),typeof t.serverMaxWindowBits=="number"&&(n.server_max_window_bits=t.serverMaxWindowBits),typeof t.clientMaxWindowBits=="number"?n.client_max_window_bits=t.clientMaxWindowBits:(n.client_max_window_bits===!0||t.clientMaxWindowBits===!1)&&delete n.client_max_window_bits,n}acceptAsClient(e){let t=e[0];if(this._options.clientNoContextTakeover===!1&&t.client_no_context_takeover)throw new Error('Unexpected parameter "client_no_context_takeover"');if(!t.client_max_window_bits)typeof this._options.clientMaxWindowBits=="number"&&(t.client_max_window_bits=this._options.clientMaxWindowBits);else if(this._options.clientMaxWindowBits===!1||typeof this._options.clientMaxWindowBits=="number"&&t.client_max_window_bits>this._options.clientMaxWindowBits)throw new Error('Unexpected or invalid parameter "client_max_window_bits"');return t}normalizeParams(e){return e.forEach(t=>{Object.keys(t).forEach(n=>{let i=t[n];if(i.length>1)throw new Error(`Parameter "${n}" must have only a single value`);if(i=i[0],n==="client_max_window_bits"){if(i!==!0){let s=+i;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${i}`);i=s}else if(!this._isServer)throw new TypeError(`Invalid value for parameter "${n}": ${i}`)}else if(n==="server_max_window_bits"){let s=+i;if(!Number.isInteger(s)||s<8||s>15)throw new TypeError(`Invalid value for parameter "${n}": ${i}`);i=s}else if(n==="client_no_context_takeover"||n==="server_no_context_takeover"){if(i!==!0)throw new TypeError(`Invalid value for parameter "${n}": ${i}`)}else throw new Error(`Unknown parameter "${n}"`);t[n]=i})}),e}decompress(e,t,n){Uo.add(i=>{this._decompress(e,t,(s,o)=>{i(),n(s,o)})})}compress(e,t,n){Uo.add(i=>{this._compress(e,t,(s,o)=>{i(),n(s,o)})})}_decompress(e,t,n){let i=this._isServer?"client":"server";if(!this._inflate){let s=`${i}_max_window_bits`,o=typeof this.params[s]!="number"?xi.Z_DEFAULT_WINDOWBITS:this.params[s];this._inflate=xi.createInflateRaw({...this._options.zlibInflateOptions,windowBits:o}),this._inflate[Vo]=this,this._inflate[Xt]=0,this._inflate[hr]=[],this._inflate.on("error",eC),this._inflate.on("data",pg)}this._inflate[yn]=n,this._inflate.write(e),t&&this._inflate.write(Qx),this._inflate.flush(()=>{let s=this._inflate[bn];if(s){this._inflate.close(),this._inflate=null,n(s);return}let o=dg.concat(this._inflate[hr],this._inflate[Xt]);this._inflate._readableState.endEmitted?(this._inflate.close(),this._inflate=null):(this._inflate[Xt]=0,this._inflate[hr]=[],t&&this.params[`${i}_no_context_takeover`]&&this._inflate.reset()),n(null,o)})}_compress(e,t,n){let i=this._isServer?"server":"client";if(!this._deflate){let s=`${i}_max_window_bits`,o=typeof this.params[s]!="number"?xi.Z_DEFAULT_WINDOWBITS:this.params[s];this._deflate=xi.createDeflateRaw({...this._options.zlibDeflateOptions,windowBits:o}),this._deflate[Xt]=0,this._deflate[hr]=[],this._deflate.on("data",Zx)}this._deflate[yn]=n,this._deflate.write(e),this._deflate.flush(xi.Z_SYNC_FLUSH,()=>{if(!this._deflate)return;let s=dg.concat(this._deflate[hr],this._deflate[Xt]);t&&(s=new Xx(s.buffer,s.byteOffset,s.length-4)),this._deflate[yn]=null,this._deflate[Xt]=0,this._deflate[hr]=[],t&&this.params[`${i}_no_context_takeover`]&&this._deflate.reset(),n(null,s)})}};mg.exports=cu;function Zx(r){this[hr].push(r),this[Xt]+=r.length}function pg(r){if(this[Xt]+=r.length,this[Vo]._maxPayload<1||this[Xt]<=this[Vo]._maxPayload){this[hr].push(r);return}this[bn]=new RangeError("Max payload size exceeded"),this[bn].code="WS_ERR_UNSUPPORTED_MESSAGE_LENGTH",this[bn][fg]=1009,this.removeListener("data",pg),this.reset()}function eC(r){if(this[Vo]._inflate=null,this[bn]){this[yn](this[bn]);return}r[fg]=1007,this[yn](r)}});var wn=k((AA,qo)=>{"use strict";var{isUtf8:hg}=require("buffer"),{hasBlob:tC}=Yt(),rC=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0];function nC(r){return r>=1e3&&r<=1014&&r!==1004&&r!==1005&&r!==1006||r>=3e3&&r<=4999}function uu(r){let e=r.length,t=0;for(;t<e;)if((r[t]&128)===0)t++;else if((r[t]&224)===192){if(t+1===e||(r[t+1]&192)!==128||(r[t]&254)===192)return!1;t+=2}else if((r[t]&240)===224){if(t+2>=e||(r[t+1]&192)!==128||(r[t+2]&192)!==128||r[t]===224&&(r[t+1]&224)===128||r[t]===237&&(r[t+1]&224)===160)return!1;t+=3}else if((r[t]&248)===240){if(t+3>=e||(r[t+1]&192)!==128||(r[t+2]&192)!==128||(r[t+3]&192)!==128||r[t]===240&&(r[t+1]&240)===128||r[t]===244&&r[t+1]>143||r[t]>244)return!1;t+=4}else return!1;return!0}function iC(r){return tC&&typeof r=="object"&&typeof r.arrayBuffer=="function"&&typeof r.type=="string"&&typeof r.stream=="function"&&(r[Symbol.toStringTag]==="Blob"||r[Symbol.toStringTag]==="File")}qo.exports={isBlob:iC,isValidStatusCode:nC,isValidUTF8:uu,tokenChars:rC};if(hg)qo.exports.isValidUTF8=function(r){return r.length<24?uu(r):hg(r)};else if(!process.env.WS_NO_UTF_8_VALIDATE)try{let r=require("utf-8-validate");qo.exports.isValidUTF8=function(e){return e.length<32?uu(e):r(e)}}catch{}});var hu=k((OA,Tg)=>{"use strict";var{Writable:sC}=require("stream"),gg=Sn(),{BINARY_TYPES:oC,EMPTY_BUFFER:yg,kStatusCode:aC,kWebSocket:lC}=Yt(),{concat:du,toArrayBuffer:cC,unmask:uC}=vi(),{isValidStatusCode:dC,isValidUTF8:bg}=wn(),Jo=Buffer[Symbol.species],pt=0,Sg=1,wg=2,Eg=3,fu=4,pu=5,Ko=6,mu=class extends sC{constructor(e={}){super(),this._allowSynchronousEvents=e.allowSynchronousEvents!==void 0?e.allowSynchronousEvents:!0,this._binaryType=e.binaryType||oC[0],this._extensions=e.extensions||{},this._isServer=!!e.isServer,this._maxBufferedChunks=e.maxBufferedChunks|0,this._maxFragments=e.maxFragments|0,this._maxPayload=e.maxPayload|0,this._skipUTF8Validation=!!e.skipUTF8Validation,this[lC]=void 0,this._bufferedBytes=0,this._buffers=[],this._compressed=!1,this._payloadLength=0,this._mask=void 0,this._fragmented=0,this._masked=!1,this._fin=!1,this._opcode=0,this._totalPayloadLength=0,this._messageLength=0,this._numFragments=0,this._fragments=[],this._errored=!1,this._loop=!1,this._state=pt}_write(e,t,n){if(this._opcode===8&&this._state==pt)return n();if(this._maxBufferedChunks>0&&this._buffers.length>=this._maxBufferedChunks){n(this.createError(RangeError,"Too many buffered chunks",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS"));return}this._bufferedBytes+=e.length,this._buffers.push(e),this.startLoop(n)}consume(e){if(this._bufferedBytes-=e,e===this._buffers[0].length)return this._buffers.shift();if(e<this._buffers[0].length){let n=this._buffers[0];return this._buffers[0]=new Jo(n.buffer,n.byteOffset+e,n.length-e),new Jo(n.buffer,n.byteOffset,e)}let t=Buffer.allocUnsafe(e);do{let n=this._buffers[0],i=t.length-e;e>=n.length?t.set(this._buffers.shift(),i):(t.set(new Uint8Array(n.buffer,n.byteOffset,e),i),this._buffers[0]=new Jo(n.buffer,n.byteOffset+e,n.length-e)),e-=n.length}while(e>0);return t}startLoop(e){this._loop=!0;do switch(this._state){case pt:this.getInfo(e);break;case Sg:this.getPayloadLength16(e);break;case wg:this.getPayloadLength64(e);break;case Eg:this.getMask();break;case fu:this.getData(e);break;case pu:case Ko:this._loop=!1;return}while(this._loop);this._errored||e()}getInfo(e){if(this._bufferedBytes<2){this._loop=!1;return}let t=this.consume(2);if((t[0]&48)!==0){let i=this.createError(RangeError,"RSV2 and RSV3 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_2_3");e(i);return}let n=(t[0]&64)===64;if(n&&!this._extensions[gg.extensionName]){let i=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");e(i);return}if(this._fin=(t[0]&128)===128,this._opcode=t[0]&15,this._payloadLength=t[1]&127,this._opcode===0){if(n){let i=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");e(i);return}if(!this._fragmented){let i=this.createError(RangeError,"invalid opcode 0",!0,1002,"WS_ERR_INVALID_OPCODE");e(i);return}this._opcode=this._fragmented}else if(this._opcode===1||this._opcode===2){if(this._fragmented){let i=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");e(i);return}this._compressed=n}else if(this._opcode>7&&this._opcode<11){if(!this._fin){let i=this.createError(RangeError,"FIN must be set",!0,1002,"WS_ERR_EXPECTED_FIN");e(i);return}if(n){let i=this.createError(RangeError,"RSV1 must be clear",!0,1002,"WS_ERR_UNEXPECTED_RSV_1");e(i);return}if(this._payloadLength>125||this._opcode===8&&this._payloadLength===1){let i=this.createError(RangeError,`invalid payload length ${this._payloadLength}`,!0,1002,"WS_ERR_INVALID_CONTROL_PAYLOAD_LENGTH");e(i);return}}else{let i=this.createError(RangeError,`invalid opcode ${this._opcode}`,!0,1002,"WS_ERR_INVALID_OPCODE");e(i);return}if(!this._fin&&!this._fragmented&&(this._fragmented=this._opcode),this._masked=(t[1]&128)===128,this._isServer){if(!this._masked){let i=this.createError(RangeError,"MASK must be set",!0,1002,"WS_ERR_EXPECTED_MASK");e(i);return}}else if(this._masked){let i=this.createError(RangeError,"MASK must be clear",!0,1002,"WS_ERR_UNEXPECTED_MASK");e(i);return}this._payloadLength===126?this._state=Sg:this._payloadLength===127?this._state=wg:this.haveLength(e)}getPayloadLength16(e){if(this._bufferedBytes<2){this._loop=!1;return}this._payloadLength=this.consume(2).readUInt16BE(0),this.haveLength(e)}getPayloadLength64(e){if(this._bufferedBytes<8){this._loop=!1;return}let t=this.consume(8),n=t.readUInt32BE(0);if(n>Math.pow(2,21)-1){let i=this.createError(RangeError,"Unsupported WebSocket frame: payload length > 2^53 - 1",!1,1009,"WS_ERR_UNSUPPORTED_DATA_PAYLOAD_LENGTH");e(i);return}this._payloadLength=n*Math.pow(2,32)+t.readUInt32BE(4),this.haveLength(e)}haveLength(e){if(this._payloadLength&&this._opcode<8&&(this._totalPayloadLength+=this._payloadLength,this._totalPayloadLength>this._maxPayload&&this._maxPayload>0)){let t=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");e(t);return}this._masked?this._state=Eg:this._state=fu}getMask(){if(this._bufferedBytes<4){this._loop=!1;return}this._mask=this.consume(4),this._state=fu}getData(e){let t=yg;if(this._payloadLength){if(this._bufferedBytes<this._payloadLength){this._loop=!1;return}t=this.consume(this._payloadLength),this._masked&&(this._mask[0]|this._mask[1]|this._mask[2]|this._mask[3])!==0&&uC(t,this._mask)}if(this._opcode>7){this.controlMessage(t,e);return}if(this._maxFragments>0&&++this._numFragments>this._maxFragments){let n=this.createError(RangeError,"Too many message fragments",!1,1008,"WS_ERR_TOO_MANY_BUFFERED_PARTS");e(n);return}if(this._compressed){this._state=pu,this.decompress(t,e);return}t.length&&(this._messageLength=this._totalPayloadLength,this._fragments.push(t)),this.dataMessage(e)}decompress(e,t){this._extensions[gg.extensionName].decompress(e,this._fin,(i,s)=>{if(i)return t(i);if(s.length){if(this._messageLength+=s.length,this._messageLength>this._maxPayload&&this._maxPayload>0){let o=this.createError(RangeError,"Max payload size exceeded",!1,1009,"WS_ERR_UNSUPPORTED_MESSAGE_LENGTH");t(o);return}this._fragments.push(s)}this.dataMessage(t),this._state===pt&&this.startLoop(t)})}dataMessage(e){if(!this._fin){this._state=pt;return}let t=this._messageLength,n=this._fragments;if(this._totalPayloadLength=0,this._messageLength=0,this._fragmented=0,this._numFragments=0,this._fragments=[],this._opcode===2){let i;this._binaryType==="nodebuffer"?i=du(n,t):this._binaryType==="arraybuffer"?i=cC(du(n,t)):this._binaryType==="blob"?i=new Blob(n):i=n,this._allowSynchronousEvents?(this.emit("message",i,!0),this._state=pt):(this._state=Ko,setImmediate(()=>{this.emit("message",i,!0),this._state=pt,this.startLoop(e)}))}else{let i=du(n,t);if(!this._skipUTF8Validation&&!bg(i)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");e(s);return}this._state===pu||this._allowSynchronousEvents?(this.emit("message",i,!1),this._state=pt):(this._state=Ko,setImmediate(()=>{this.emit("message",i,!1),this._state=pt,this.startLoop(e)}))}}controlMessage(e,t){if(this._opcode===8){if(e.length===0)this._loop=!1,this.emit("conclude",1005,yg),this.end();else{let n=e.readUInt16BE(0);if(!dC(n)){let s=this.createError(RangeError,`invalid status code ${n}`,!0,1002,"WS_ERR_INVALID_CLOSE_CODE");t(s);return}let i=new Jo(e.buffer,e.byteOffset+2,e.length-2);if(!this._skipUTF8Validation&&!bg(i)){let s=this.createError(Error,"invalid UTF-8 sequence",!0,1007,"WS_ERR_INVALID_UTF8");t(s);return}this._loop=!1,this.emit("conclude",n,i),this.end()}this._state=pt;return}this._allowSynchronousEvents?(this.emit(this._opcode===9?"ping":"pong",e),this._state=pt):(this._state=Ko,setImmediate(()=>{this.emit(this._opcode===9?"ping":"pong",e),this._state=pt,this.startLoop(t)}))}createError(e,t,n,i,s){this._loop=!1,this._errored=!0;let o=new e(n?`Invalid WebSocket frame: ${t}`:t);return Error.captureStackTrace(o,this.createError),o.code=s,o[aC]=i,o}};Tg.exports=mu});var bu=k((DA,xg)=>{"use strict";var{Duplex:MA}=require("stream"),{randomFillSync:fC}=require("crypto"),{types:{isUint8Array:pC}}=require("util"),Pg=Sn(),{EMPTY_BUFFER:mC,kWebSocket:hC,NOOP:gC}=Yt(),{isBlob:En,isValidStatusCode:yC}=wn(),{mask:vg,toBuffer:$r}=vi(),mt=Symbol("kByteLength"),bC=Buffer.alloc(4),zo=8*1024,Br,Tn=zo,Pt=0,SC=1,wC=2,gu=class r{constructor(e,t,n){this._extensions=t||{},n&&(this._generateMask=n,this._maskBuffer=Buffer.alloc(4)),this._socket=e,this._firstFragment=!0,this._compress=!1,this._bufferedBytes=0,this._queue=[],this._state=Pt,this.onerror=gC,this[hC]=void 0}static frame(e,t){let n,i=!1,s=2,o=!1;t.mask&&(n=t.maskBuffer||bC,t.generateMask?t.generateMask(n):(Tn===zo&&(Br===void 0&&(Br=Buffer.alloc(zo)),fC(Br,0,zo),Tn=0),n[0]=Br[Tn++],n[1]=Br[Tn++],n[2]=Br[Tn++],n[3]=Br[Tn++]),o=(n[0]|n[1]|n[2]|n[3])===0,s=6);let a;typeof e=="string"?(!t.mask||o)&&t[mt]!==void 0?a=t[mt]:(e=Buffer.from(e),a=e.length):(a=e.length,i=t.mask&&t.readOnly&&!o);let l=a;a>=65536?(s+=8,l=127):a>125&&(s+=2,l=126);let c=Buffer.allocUnsafe(i?a+s:s);return c[0]=t.fin?t.opcode|128:t.opcode,t.rsv1&&(c[0]|=64),c[1]=l,l===126?c.writeUInt16BE(a,2):l===127&&(c[2]=c[3]=0,c.writeUIntBE(a,4,6)),t.mask?(c[1]|=128,c[s-4]=n[0],c[s-3]=n[1],c[s-2]=n[2],c[s-1]=n[3],o?[c,e]:i?(vg(e,n,c,s,a),[c]):(vg(e,n,e,0,a),[c,e])):[c,e]}close(e,t,n,i){let s;if(e===void 0)s=mC;else{if(typeof e!="number"||!yC(e))throw new TypeError("First argument must be a valid error code number");if(t===void 0||!t.length)s=Buffer.allocUnsafe(2),s.writeUInt16BE(e,0);else{let a=Buffer.byteLength(t);if(a>123)throw new RangeError("The message must not be greater than 123 bytes");if(s=Buffer.allocUnsafe(2+a),s.writeUInt16BE(e,0),typeof t=="string")s.write(t,2);else if(pC(t))s.set(t,2);else throw new TypeError("Second argument must be a string or a Uint8Array")}}let o={[mt]:s.length,fin:!0,generateMask:this._generateMask,mask:n,maskBuffer:this._maskBuffer,opcode:8,readOnly:!1,rsv1:!1};this._state!==Pt?this.enqueue([this.dispatch,s,!1,o,i]):this.sendFrame(r.frame(s,o),i)}ping(e,t,n){let i,s;if(typeof e=="string"?(i=Buffer.byteLength(e),s=!1):En(e)?(i=e.size,s=!1):(e=$r(e),i=e.length,s=$r.readOnly),i>125)throw new RangeError("The data size must not be greater than 125 bytes");let o={[mt]:i,fin:!0,generateMask:this._generateMask,mask:t,maskBuffer:this._maskBuffer,opcode:9,readOnly:s,rsv1:!1};En(e)?this._state!==Pt?this.enqueue([this.getBlobData,e,!1,o,n]):this.getBlobData(e,!1,o,n):this._state!==Pt?this.enqueue([this.dispatch,e,!1,o,n]):this.sendFrame(r.frame(e,o),n)}pong(e,t,n){let i,s;if(typeof e=="string"?(i=Buffer.byteLength(e),s=!1):En(e)?(i=e.size,s=!1):(e=$r(e),i=e.length,s=$r.readOnly),i>125)throw new RangeError("The data size must not be greater than 125 bytes");let o={[mt]:i,fin:!0,generateMask:this._generateMask,mask:t,maskBuffer:this._maskBuffer,opcode:10,readOnly:s,rsv1:!1};En(e)?this._state!==Pt?this.enqueue([this.getBlobData,e,!1,o,n]):this.getBlobData(e,!1,o,n):this._state!==Pt?this.enqueue([this.dispatch,e,!1,o,n]):this.sendFrame(r.frame(e,o),n)}send(e,t,n){let i=this._extensions[Pg.extensionName],s=t.binary?2:1,o=t.compress,a,l;typeof e=="string"?(a=Buffer.byteLength(e),l=!1):En(e)?(a=e.size,l=!1):(e=$r(e),a=e.length,l=$r.readOnly),this._firstFragment?(this._firstFragment=!1,o&&i&&i.params[i._isServer?"server_no_context_takeover":"client_no_context_takeover"]&&(o=a>=i._threshold),this._compress=o):(o=!1,s=0),t.fin&&(this._firstFragment=!0);let c={[mt]:a,fin:t.fin,generateMask:this._generateMask,mask:t.mask,maskBuffer:this._maskBuffer,opcode:s,readOnly:l,rsv1:o};En(e)?this._state!==Pt?this.enqueue([this.getBlobData,e,this._compress,c,n]):this.getBlobData(e,this._compress,c,n):this._state!==Pt?this.enqueue([this.dispatch,e,this._compress,c,n]):this.dispatch(e,this._compress,c,n)}getBlobData(e,t,n,i){this._bufferedBytes+=n[mt],this._state=wC,e.arrayBuffer().then(s=>{if(this._socket.destroyed){let a=new Error("The socket was closed while the blob was being read");process.nextTick(yu,this,a,i);return}this._bufferedBytes-=n[mt];let o=$r(s);t?this.dispatch(o,t,n,i):(this._state=Pt,this.sendFrame(r.frame(o,n),i),this.dequeue())}).catch(s=>{process.nextTick(EC,this,s,i)})}dispatch(e,t,n,i){if(!t){this.sendFrame(r.frame(e,n),i);return}let s=this._extensions[Pg.extensionName];this._bufferedBytes+=n[mt],this._state=SC,s.compress(e,n.fin,(o,a)=>{if(this._socket.destroyed){let l=new Error("The socket was closed while data was being compressed");yu(this,l,i);return}this._bufferedBytes-=n[mt],this._state=Pt,n.readOnly=!1,this.sendFrame(r.frame(a,n),i),this.dequeue()})}dequeue(){for(;this._state===Pt&&this._queue.length;){let e=this._queue.shift();this._bufferedBytes-=e[3][mt],Reflect.apply(e[0],this,e.slice(1))}}enqueue(e){this._bufferedBytes+=e[3][mt],this._queue.push(e)}sendFrame(e,t){e.length===2?(this._socket.cork(),this._socket.write(e[0]),this._socket.write(e[1],t),this._socket.uncork()):this._socket.write(e[0],t)}};xg.exports=gu;function yu(r,e,t){typeof t=="function"&&t(e);for(let n=0;n<r._queue.length;n++){let i=r._queue[n],s=i[i.length-1];typeof s=="function"&&s(e)}}function EC(r,e,t){yu(r,e,t),r.onerror(e)}});var Mg=k((LA,Og)=>{"use strict";var{kForOnEventAttribute:Ci,kListener:Su}=Yt(),Cg=Symbol("kCode"),kg=Symbol("kData"),_g=Symbol("kError"),Ig=Symbol("kMessage"),Rg=Symbol("kReason"),Pn=Symbol("kTarget"),Ng=Symbol("kType"),Ag=Symbol("kWasClean"),Qt=class{constructor(e){this[Pn]=null,this[Ng]=e}get target(){return this[Pn]}get type(){return this[Ng]}};Object.defineProperty(Qt.prototype,"target",{enumerable:!0});Object.defineProperty(Qt.prototype,"type",{enumerable:!0});var jr=class extends Qt{constructor(e,t={}){super(e),this[Cg]=t.code===void 0?0:t.code,this[Rg]=t.reason===void 0?"":t.reason,this[Ag]=t.wasClean===void 0?!1:t.wasClean}get code(){return this[Cg]}get reason(){return this[Rg]}get wasClean(){return this[Ag]}};Object.defineProperty(jr.prototype,"code",{enumerable:!0});Object.defineProperty(jr.prototype,"reason",{enumerable:!0});Object.defineProperty(jr.prototype,"wasClean",{enumerable:!0});var vn=class extends Qt{constructor(e,t={}){super(e),this[_g]=t.error===void 0?null:t.error,this[Ig]=t.message===void 0?"":t.message}get error(){return this[_g]}get message(){return this[Ig]}};Object.defineProperty(vn.prototype,"error",{enumerable:!0});Object.defineProperty(vn.prototype,"message",{enumerable:!0});var ki=class extends Qt{constructor(e,t={}){super(e),this[kg]=t.data===void 0?null:t.data}get data(){return this[kg]}};Object.defineProperty(ki.prototype,"data",{enumerable:!0});var TC={addEventListener(r,e,t={}){for(let i of this.listeners(r))if(!t[Ci]&&i[Su]===e&&!i[Ci])return;let n;if(r==="message")n=function(s,o){let a=new ki("message",{data:o?s:s.toString()});a[Pn]=this,Yo(e,this,a)};else if(r==="close")n=function(s,o){let a=new jr("close",{code:s,reason:o.toString(),wasClean:this._closeFrameReceived&&this._closeFrameSent});a[Pn]=this,Yo(e,this,a)};else if(r==="error")n=function(s){let o=new vn("error",{error:s,message:s.message});o[Pn]=this,Yo(e,this,o)};else if(r==="open")n=function(){let s=new Qt("open");s[Pn]=this,Yo(e,this,s)};else return;n[Ci]=!!t[Ci],n[Su]=e,t.once?this.once(r,n):this.on(r,n)},removeEventListener(r,e){for(let t of this.listeners(r))if(t[Su]===e&&!t[Ci]){this.removeListener(r,t);break}}};Og.exports={CloseEvent:jr,ErrorEvent:vn,Event:Qt,EventTarget:TC,MessageEvent:ki};function Yo(r,e,t){typeof r=="object"&&r.handleEvent?r.handleEvent.call(r,t):r.call(e,t)}});var Xo=k(($A,Dg)=>{"use strict";var{tokenChars:_i}=wn();function Bt(r,e,t){r[e]===void 0?r[e]=[t]:r[e].push(t)}function PC(r){let e=Object.create(null),t=Object.create(null),n=!1,i=!1,s=!1,o,a,l=-1,c=-1,u=-1,d=0;for(;d<r.length;d++)if(c=r.charCodeAt(d),o===void 0)if(u===-1&&_i[c]===1)l===-1&&(l=d);else if(d!==0&&(c===32||c===9))u===-1&&l!==-1&&(u=d);else if(c===59||c===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${d}`);u===-1&&(u=d);let f=r.slice(l,u);c===44?(Bt(e,f,t),t=Object.create(null)):o=f,l=u=-1}else throw new SyntaxError(`Unexpected character at index ${d}`);else if(a===void 0)if(u===-1&&_i[c]===1)l===-1&&(l=d);else if(c===32||c===9)u===-1&&l!==-1&&(u=d);else if(c===59||c===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${d}`);u===-1&&(u=d),Bt(t,r.slice(l,u),!0),c===44&&(Bt(e,o,t),t=Object.create(null),o=void 0),l=u=-1}else if(c===61&&l!==-1&&u===-1)a=r.slice(l,d),l=u=-1;else throw new SyntaxError(`Unexpected character at index ${d}`);else if(i){if(_i[c]!==1)throw new SyntaxError(`Unexpected character at index ${d}`);l===-1?l=d:n||(n=!0),i=!1}else if(s)if(_i[c]===1)l===-1&&(l=d);else if(c===34&&l!==-1)s=!1,u=d;else if(c===92)i=!0;else throw new SyntaxError(`Unexpected character at index ${d}`);else if(c===34&&r.charCodeAt(d-1)===61)s=!0;else if(u===-1&&_i[c]===1)l===-1&&(l=d);else if(l!==-1&&(c===32||c===9))u===-1&&(u=d);else if(c===59||c===44){if(l===-1)throw new SyntaxError(`Unexpected character at index ${d}`);u===-1&&(u=d);let f=r.slice(l,u);n&&(f=f.replace(/\\/g,""),n=!1),Bt(t,a,f),c===44&&(Bt(e,o,t),t=Object.create(null),o=void 0),a=void 0,l=u=-1}else throw new SyntaxError(`Unexpected character at index ${d}`);if(l===-1||s||c===32||c===9)throw new SyntaxError("Unexpected end of input");u===-1&&(u=d);let p=r.slice(l,u);return o===void 0?Bt(e,p,t):(a===void 0?Bt(t,p,!0):n?Bt(t,a,p.replace(/\\/g,"")):Bt(t,a,p),Bt(e,o,t)),e}function vC(r){return Object.keys(r).map(e=>{let t=r[e];return Array.isArray(t)||(t=[t]),t.map(n=>[e].concat(Object.keys(n).map(i=>{let s=n[i];return Array.isArray(s)||(s=[s]),s.map(o=>o===!0?i:`${i}=${o}`).join("; ")})).join("; ")).join(", ")}).join(", ")}Dg.exports={format:vC,parse:PC}});var ta=k((FA,Jg)=>{"use strict";var xC=require("events"),CC=require("https"),kC=require("http"),Bg=require("net"),_C=require("tls"),{randomBytes:IC,createHash:RC}=require("crypto"),{Duplex:BA,Readable:jA}=require("stream"),{URL:wu}=require("url"),gr=Sn(),NC=hu(),AC=bu(),{isBlob:OC}=wn(),{BINARY_TYPES:Lg,CLOSE_TIMEOUT:MC,EMPTY_BUFFER:Qo,GUID:DC,kForOnEventAttribute:Eu,kListener:LC,kStatusCode:$C,kWebSocket:Be,NOOP:jg}=Yt(),{EventTarget:{addEventListener:BC,removeEventListener:jC}}=Mg(),{format:FC,parse:HC}=Xo(),{toBuffer:WC}=vi(),Fg=Symbol("kAborted"),Tu=[8,13],Zt=["CONNECTING","OPEN","CLOSING","CLOSED"],GC=/^[!#$%&'*+\-.0-9A-Z^_`|a-z~]+$/,he=class r extends xC{constructor(e,t,n){super(),this._binaryType=Lg[0],this._closeCode=1006,this._closeFrameReceived=!1,this._closeFrameSent=!1,this._closeMessage=Qo,this._closeTimer=null,this._errorEmitted=!1,this._extensions={},this._paused=!1,this._protocol="",this._readyState=r.CONNECTING,this._receiver=null,this._sender=null,this._socket=null,e!==null?(this._bufferedAmount=0,this._isServer=!1,this._redirects=0,t===void 0?t=[]:Array.isArray(t)||(typeof t=="object"&&t!==null?(n=t,t=[]):t=[t]),Hg(this,e,t,n)):(this._autoPong=n.autoPong,this._closeTimeout=n.closeTimeout,this._isServer=!0)}get binaryType(){return this._binaryType}set binaryType(e){Lg.includes(e)&&(this._binaryType=e,this._receiver&&(this._receiver._binaryType=e))}get bufferedAmount(){return this._socket?this._socket._writableState.length+this._sender._bufferedBytes:this._bufferedAmount}get extensions(){return Object.keys(this._extensions).join()}get isPaused(){return this._paused}get onclose(){return null}get onerror(){return null}get onopen(){return null}get onmessage(){return null}get protocol(){return this._protocol}get readyState(){return this._readyState}get url(){return this._url}setSocket(e,t,n){let i=new NC({allowSynchronousEvents:n.allowSynchronousEvents,binaryType:this.binaryType,extensions:this._extensions,isServer:this._isServer,maxBufferedChunks:n.maxBufferedChunks,maxFragments:n.maxFragments,maxPayload:n.maxPayload,skipUTF8Validation:n.skipUTF8Validation}),s=new AC(e,this._extensions,n.generateMask);this._receiver=i,this._sender=s,this._socket=e,i[Be]=this,s[Be]=this,e[Be]=this,i.on("conclude",qC),i.on("drain",JC),i.on("error",KC),i.on("message",zC),i.on("ping",YC),i.on("pong",XC),s.onerror=QC,e.setTimeout&&e.setTimeout(0),e.setNoDelay&&e.setNoDelay(),t.length>0&&e.unshift(t),e.on("close",Ug),e.on("data",ea),e.on("end",Vg),e.on("error",qg),this._readyState=r.OPEN,this.emit("open")}emitClose(){if(!this._socket){this._readyState=r.CLOSED,this.emit("close",this._closeCode,this._closeMessage);return}this._extensions[gr.extensionName]&&this._extensions[gr.extensionName].cleanup(),this._receiver.removeAllListeners(),this._readyState=r.CLOSED,this.emit("close",this._closeCode,this._closeMessage)}close(e,t){if(this.readyState!==r.CLOSED){if(this.readyState===r.CONNECTING){st(this,this._req,"WebSocket was closed before the connection was established");return}if(this.readyState===r.CLOSING){this._closeFrameSent&&(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end();return}this._readyState=r.CLOSING,this._sender.close(e,t,!this._isServer,n=>{n||(this._closeFrameSent=!0,(this._closeFrameReceived||this._receiver._writableState.errorEmitted)&&this._socket.end())}),Gg(this)}}pause(){this.readyState===r.CONNECTING||this.readyState===r.CLOSED||(this._paused=!0,this._socket.pause())}ping(e,t,n){if(this.readyState===r.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof e=="function"?(n=e,e=t=void 0):typeof t=="function"&&(n=t,t=void 0),typeof e=="number"&&(e=e.toString()),this.readyState!==r.OPEN){Pu(this,e,n);return}t===void 0&&(t=!this._isServer),this._sender.ping(e||Qo,t,n)}pong(e,t,n){if(this.readyState===r.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof e=="function"?(n=e,e=t=void 0):typeof t=="function"&&(n=t,t=void 0),typeof e=="number"&&(e=e.toString()),this.readyState!==r.OPEN){Pu(this,e,n);return}t===void 0&&(t=!this._isServer),this._sender.pong(e||Qo,t,n)}resume(){this.readyState===r.CONNECTING||this.readyState===r.CLOSED||(this._paused=!1,this._receiver._writableState.needDrain||this._socket.resume())}send(e,t,n){if(this.readyState===r.CONNECTING)throw new Error("WebSocket is not open: readyState 0 (CONNECTING)");if(typeof t=="function"&&(n=t,t={}),typeof e=="number"&&(e=e.toString()),this.readyState!==r.OPEN){Pu(this,e,n);return}let i={binary:typeof e!="string",mask:!this._isServer,compress:!0,fin:!0,...t};this._extensions[gr.extensionName]||(i.compress=!1),this._sender.send(e||Qo,i,n)}terminate(){if(this.readyState!==r.CLOSED){if(this.readyState===r.CONNECTING){st(this,this._req,"WebSocket was closed before the connection was established");return}this._socket&&(this._readyState=r.CLOSING,this._socket.destroy())}}};Object.defineProperty(he,"CONNECTING",{enumerable:!0,value:Zt.indexOf("CONNECTING")});Object.defineProperty(he.prototype,"CONNECTING",{enumerable:!0,value:Zt.indexOf("CONNECTING")});Object.defineProperty(he,"OPEN",{enumerable:!0,value:Zt.indexOf("OPEN")});Object.defineProperty(he.prototype,"OPEN",{enumerable:!0,value:Zt.indexOf("OPEN")});Object.defineProperty(he,"CLOSING",{enumerable:!0,value:Zt.indexOf("CLOSING")});Object.defineProperty(he.prototype,"CLOSING",{enumerable:!0,value:Zt.indexOf("CLOSING")});Object.defineProperty(he,"CLOSED",{enumerable:!0,value:Zt.indexOf("CLOSED")});Object.defineProperty(he.prototype,"CLOSED",{enumerable:!0,value:Zt.indexOf("CLOSED")});["binaryType","bufferedAmount","extensions","isPaused","protocol","readyState","url"].forEach(r=>{Object.defineProperty(he.prototype,r,{enumerable:!0})});["open","error","close","message"].forEach(r=>{Object.defineProperty(he.prototype,`on${r}`,{enumerable:!0,get(){for(let e of this.listeners(r))if(e[Eu])return e[LC];return null},set(e){for(let t of this.listeners(r))if(t[Eu]){this.removeListener(r,t);break}typeof e=="function"&&this.addEventListener(r,e,{[Eu]:!0})}})});he.prototype.addEventListener=BC;he.prototype.removeEventListener=jC;Jg.exports=he;function Hg(r,e,t,n){let i={allowSynchronousEvents:!0,autoPong:!0,closeTimeout:MC,protocolVersion:Tu[1],maxBufferedChunks:262144,maxFragments:16384,maxPayload:104857600,skipUTF8Validation:!1,perMessageDeflate:!0,followRedirects:!1,maxRedirects:10,...n,socketPath:void 0,hostname:void 0,protocol:void 0,timeout:void 0,method:"GET",host:void 0,path:void 0,port:void 0};if(r._autoPong=i.autoPong,r._closeTimeout=i.closeTimeout,!Tu.includes(i.protocolVersion))throw new RangeError(`Unsupported protocol version: ${i.protocolVersion} (supported versions: ${Tu.join(", ")})`);let s;if(e instanceof wu)s=e;else try{s=new wu(e)}catch{throw new SyntaxError(`Invalid URL: ${e}`)}s.protocol==="http:"?s.protocol="ws:":s.protocol==="https:"&&(s.protocol="wss:"),r._url=s.href;let o=s.protocol==="wss:",a=s.protocol==="ws+unix:",l;if(s.protocol!=="ws:"&&!o&&!a?l=`The URL's protocol must be one of "ws:", "wss:", "http:", "https:", or "ws+unix:"`:a&&!s.pathname?l="The URL's pathname is empty":s.hash&&(l="The URL contains a fragment identifier"),l){let g=new SyntaxError(l);if(r._redirects===0)throw g;Zo(r,g);return}let c=o?443:80,u=IC(16).toString("base64"),d=o?CC.request:kC.request,p=new Set,f;if(i.createConnection=i.createConnection||(o?VC:UC),i.defaultPort=i.defaultPort||c,i.port=s.port||c,i.host=s.hostname.startsWith("[")?s.hostname.slice(1,-1):s.hostname,i.headers={...i.headers,"Sec-WebSocket-Version":i.protocolVersion,"Sec-WebSocket-Key":u,Connection:"Upgrade",Upgrade:"websocket"},i.path=s.pathname+s.search,i.timeout=i.handshakeTimeout,i.perMessageDeflate&&(f=new gr({...i.perMessageDeflate,isServer:!1,maxPayload:i.maxPayload}),i.headers["Sec-WebSocket-Extensions"]=FC({[gr.extensionName]:f.offer()})),t.length){for(let g of t){if(typeof g!="string"||!GC.test(g)||p.has(g))throw new SyntaxError("An invalid or duplicated subprotocol was specified");p.add(g)}i.headers["Sec-WebSocket-Protocol"]=t.join(",")}if(i.origin&&(i.protocolVersion<13?i.headers["Sec-WebSocket-Origin"]=i.origin:i.headers.Origin=i.origin),(s.username||s.password)&&(i.auth=`${s.username}:${s.password}`),a){let g=i.path.split(":");i.socketPath=g[0],i.path=g[1]}let h;if(i.followRedirects){if(r._redirects===0){r._originalIpc=a,r._originalSecure=o,r._originalHostOrSocketPath=a?i.socketPath:s.host;let g=n&&n.headers;if(n={...n,headers:{}},g)for(let[y,b]of Object.entries(g))n.headers[y.toLowerCase()]=b}else if(r.listenerCount("redirect")===0){let g=a?r._originalIpc?i.socketPath===r._originalHostOrSocketPath:!1:r._originalIpc?!1:s.host===r._originalHostOrSocketPath;(!g||r._originalSecure&&!o)&&(delete i.headers.authorization,delete i.headers.cookie,g||delete i.headers.host,i.auth=void 0)}i.auth&&!n.headers.authorization&&(n.headers.authorization="Basic "+Buffer.from(i.auth).toString("base64")),h=r._req=d(i),r._redirects&&r.emit("redirect",r.url,h)}else h=r._req=d(i);i.timeout&&h.on("timeout",()=>{st(r,h,"Opening handshake has timed out")}),h.on("error",g=>{h===null||h[Fg]||(h=r._req=null,Zo(r,g))}),h.on("response",g=>{let y=g.headers.location,b=g.statusCode;if(y&&i.followRedirects&&b>=300&&b<400){if(++r._redirects>i.maxRedirects){st(r,h,"Maximum redirects exceeded");return}h.abort();let S;try{S=new wu(y,e)}catch{let I=new SyntaxError(`Invalid URL: ${y}`);Zo(r,I);return}Hg(r,S,t,n)}else r.emit("unexpected-response",h,g)||st(r,h,`Unexpected server response: ${g.statusCode}`)}),h.on("upgrade",(g,y,b)=>{if(r.emit("upgrade",g),r.readyState!==he.CONNECTING)return;h=r._req=null;let S=g.headers.upgrade;if(S===void 0||S.toLowerCase()!=="websocket"){st(r,y,"Invalid Upgrade header");return}let E=RC("sha1").update(u+DC).digest("base64");if(g.headers["sec-websocket-accept"]!==E){st(r,y,"Invalid Sec-WebSocket-Accept header");return}let I=g.headers["sec-websocket-protocol"],A;if(I!==void 0?p.size?p.has(I)||(A="Server sent an invalid subprotocol"):A="Server sent a subprotocol but none was requested":p.size&&(A="Server sent no subprotocol"),A){st(r,y,A);return}I&&(r._protocol=I);let j=g.headers["sec-websocket-extensions"];if(j!==void 0){if(!f){st(r,y,"Server sent a Sec-WebSocket-Extensions header but no extension was requested");return}let F;try{F=HC(j)}catch{st(r,y,"Invalid Sec-WebSocket-Extensions header");return}let M=Object.keys(F);if(M.length!==1||M[0]!==gr.extensionName){st(r,y,"Server indicated an extension that was not requested");return}try{f.accept(F[gr.extensionName])}catch{st(r,y,"Invalid Sec-WebSocket-Extensions header");return}r._extensions[gr.extensionName]=f}r.setSocket(y,b,{allowSynchronousEvents:i.allowSynchronousEvents,generateMask:i.generateMask,maxBufferedChunks:i.maxBufferedChunks,maxFragments:i.maxFragments,maxPayload:i.maxPayload,skipUTF8Validation:i.skipUTF8Validation})}),i.finishRequest?i.finishRequest(h,r):h.end()}function Zo(r,e){r._readyState=he.CLOSING,r._errorEmitted=!0,r.emit("error",e),r.emitClose()}function UC(r){return r.path=r.socketPath,Bg.connect(r)}function VC(r){return r.path=void 0,!r.servername&&r.servername!==""&&(r.servername=Bg.isIP(r.host)?"":r.host),_C.connect(r)}function st(r,e,t){r._readyState=he.CLOSING;let n=new Error(t);Error.captureStackTrace(n,st),e.setHeader?(e[Fg]=!0,e.abort(),e.socket&&!e.socket.destroyed&&e.socket.destroy(),process.nextTick(Zo,r,n)):(e.destroy(n),e.once("error",r.emit.bind(r,"error")),e.once("close",r.emitClose.bind(r)))}function Pu(r,e,t){if(e){let n=OC(e)?e.size:WC(e).length;r._socket?r._sender._bufferedBytes+=n:r._bufferedAmount+=n}if(t){let n=new Error(`WebSocket is not open: readyState ${r.readyState} (${Zt[r.readyState]})`);process.nextTick(t,n)}}function qC(r,e){let t=this[Be];t._closeFrameReceived=!0,t._closeMessage=e,t._closeCode=r,t._socket[Be]!==void 0&&(t._socket.removeListener("data",ea),process.nextTick(Wg,t._socket),r===1005?t.close():t.close(r,e))}function JC(){let r=this[Be];r.isPaused||r._socket.resume()}function KC(r){let e=this[Be];e._socket[Be]!==void 0&&(e._socket.removeListener("data",ea),process.nextTick(Wg,e._socket),e.close(r[$C])),e._errorEmitted||(e._errorEmitted=!0,e.emit("error",r))}function $g(){this[Be].emitClose()}function zC(r,e){this[Be].emit("message",r,e)}function YC(r){let e=this[Be];e._autoPong&&e.pong(r,!this._isServer,jg),e.emit("ping",r)}function XC(r){this[Be].emit("pong",r)}function Wg(r){r.resume()}function QC(r){let e=this[Be];e.readyState!==he.CLOSED&&(e.readyState===he.OPEN&&(e._readyState=he.CLOSING,Gg(e)),this._socket.end(),e._errorEmitted||(e._errorEmitted=!0,e.emit("error",r)))}function Gg(r){r._closeTimer=setTimeout(r._socket.destroy.bind(r._socket),r._closeTimeout)}function Ug(){let r=this[Be];if(this.removeListener("close",Ug),this.removeListener("data",ea),this.removeListener("end",Vg),r._readyState=he.CLOSING,!this._readableState.endEmitted&&!r._closeFrameReceived&&!r._receiver._writableState.errorEmitted&&this._readableState.length!==0){let e=this.read(this._readableState.length);r._receiver.write(e)}r._receiver.end(),this[Be]=void 0,clearTimeout(r._closeTimer),r._receiver._writableState.finished||r._receiver._writableState.errorEmitted?r.emitClose():(r._receiver.on("error",$g),r._receiver.on("finish",$g))}function ea(r){this[Be]._receiver.write(r)||this.pause()}function Vg(){let r=this[Be];r._readyState=he.CLOSING,r._receiver.end(),this.end()}function qg(){let r=this[Be];this.removeListener("error",qg),this.on("error",jg),r&&(r._readyState=he.CLOSING,this.destroy())}});var Xg=k((WA,Yg)=>{"use strict";var HA=ta(),{Duplex:ZC}=require("stream");function Kg(r){r.emit("close")}function ek(){!this.destroyed&&this._writableState.finished&&this.destroy()}function zg(r){this.removeListener("error",zg),this.destroy(),this.listenerCount("error")===0&&this.emit("error",r)}function tk(r,e){let t=!0,n=new ZC({...e,autoDestroy:!1,emitClose:!1,objectMode:!1,writableObjectMode:!1});return r.on("message",function(s,o){let a=!o&&n._readableState.objectMode?s.toString():s;n.push(a)||r.pause()}),r.once("error",function(s){n.destroyed||(t=!1,n.destroy(s))}),r.once("close",function(){n.destroyed||n.push(null)}),n._destroy=function(i,s){if(r.readyState===r.CLOSED){s(i),process.nextTick(Kg,n);return}let o=!1;r.once("error",function(l){o=!0,s(l)}),r.once("close",function(){o||s(i),process.nextTick(Kg,n)}),t&&r.terminate()},n._final=function(i){if(r.readyState===r.CONNECTING){r.once("open",function(){n._final(i)});return}r._socket!==null&&(r._socket._writableState.finished?(i(),n._readableState.endEmitted&&n.destroy()):(r._socket.once("finish",function(){i()}),r.close()))},n._read=function(){r.isPaused&&r.resume()},n._write=function(i,s,o){if(r.readyState===r.CONNECTING){r.once("open",function(){n._write(i,s,o)});return}r.send(i,o)},n.on("end",ek),n.on("error",zg),n}Yg.exports=tk});var vu=k((GA,Qg)=>{"use strict";var{tokenChars:rk}=wn();function nk(r){let e=new Set,t=-1,n=-1,i=0;for(i;i<r.length;i++){let o=r.charCodeAt(i);if(n===-1&&rk[o]===1)t===-1&&(t=i);else if(i!==0&&(o===32||o===9))n===-1&&t!==-1&&(n=i);else if(o===44){if(t===-1)throw new SyntaxError(`Unexpected character at index ${i}`);n===-1&&(n=i);let a=r.slice(t,n);if(e.has(a))throw new SyntaxError(`The "${a}" subprotocol is duplicated`);e.add(a),t=n=-1}else throw new SyntaxError(`Unexpected character at index ${i}`)}if(t===-1||n!==-1)throw new SyntaxError("Unexpected end of input");let s=r.slice(t,i);if(e.has(s))throw new SyntaxError(`The "${s}" subprotocol is duplicated`);return e.add(s),e}Qg.exports={parse:nk}});var sy=k((VA,iy)=>{"use strict";var ik=require("events"),ra=require("http"),{Duplex:UA}=require("stream"),{createHash:sk}=require("crypto"),Zg=Xo(),Fr=Sn(),ok=vu(),ak=ta(),{CLOSE_TIMEOUT:lk,GUID:ck,kWebSocket:uk}=Yt(),dk=/^[+/0-9A-Za-z]{22}==$/,ey=0,ty=1,ny=2,xu=class extends ik{constructor(e,t){if(super(),e={allowSynchronousEvents:!0,autoPong:!0,maxBufferedChunks:256*1024,maxFragments:16*1024,maxPayload:100*1024*1024,skipUTF8Validation:!1,perMessageDeflate:!1,handleProtocols:null,clientTracking:!0,closeTimeout:lk,verifyClient:null,noServer:!1,backlog:null,server:null,host:null,path:null,port:null,WebSocket:ak,...e},e.port==null&&!e.server&&!e.noServer||e.port!=null&&(e.server||e.noServer)||e.server&&e.noServer)throw new TypeError('One and only one of the "port", "server", or "noServer" options must be specified');if(e.port!=null?(this._server=ra.createServer((n,i)=>{let s=ra.STATUS_CODES[426];i.writeHead(426,{"Content-Length":s.length,"Content-Type":"text/plain"}),i.end(s)}),this._server.listen(e.port,e.host,e.backlog,t)):e.server&&(this._server=e.server),this._server){let n=this.emit.bind(this,"connection");this._removeListeners=fk(this._server,{listening:this.emit.bind(this,"listening"),error:this.emit.bind(this,"error"),upgrade:(i,s,o)=>{this.handleUpgrade(i,s,o,n)}})}e.perMessageDeflate===!0&&(e.perMessageDeflate={}),e.clientTracking&&(this.clients=new Set,this._shouldEmitClose=!1),this.options=e,this._state=ey}address(){if(this.options.noServer)throw new Error('The server is operating in "noServer" mode');return this._server?this._server.address():null}close(e){if(this._state===ny){e&&this.once("close",()=>{e(new Error("The server is not running"))}),process.nextTick(Ii,this);return}if(e&&this.once("close",e),this._state!==ty)if(this._state=ty,this.options.noServer||this.options.server)this._server&&(this._removeListeners(),this._removeListeners=this._server=null),this.clients?this.clients.size?this._shouldEmitClose=!0:process.nextTick(Ii,this):process.nextTick(Ii,this);else{let t=this._server;this._removeListeners(),this._removeListeners=this._server=null,t.close(()=>{Ii(this)})}}shouldHandle(e){if(this.options.path){let t=e.url.indexOf("?");if((t!==-1?e.url.slice(0,t):e.url)!==this.options.path)return!1}return!0}handleUpgrade(e,t,n,i){t.on("error",ry);let s=e.headers["sec-websocket-key"],o=e.headers.upgrade,a=+e.headers["sec-websocket-version"];if(e.method!=="GET"){Hr(this,e,t,405,"Invalid HTTP method");return}if(o===void 0||o.toLowerCase()!=="websocket"){Hr(this,e,t,400,"Invalid Upgrade header");return}if(s===void 0||!dk.test(s)){Hr(this,e,t,400,"Missing or invalid Sec-WebSocket-Key header");return}if(a!==13&&a!==8){Hr(this,e,t,400,"Missing or invalid Sec-WebSocket-Version header",{"Sec-WebSocket-Version":"13, 8"});return}if(!this.shouldHandle(e)){Ri(t,400);return}let l=e.headers["sec-websocket-protocol"],c=new Set;if(l!==void 0)try{c=ok.parse(l)}catch{Hr(this,e,t,400,"Invalid Sec-WebSocket-Protocol header");return}let u=e.headers["sec-websocket-extensions"],d={};if(this.options.perMessageDeflate&&u!==void 0){let p=new Fr({...this.options.perMessageDeflate,isServer:!0,maxPayload:this.options.maxPayload});try{let f=Zg.parse(u);f[Fr.extensionName]&&(p.accept(f[Fr.extensionName]),d[Fr.extensionName]=p)}catch{Hr(this,e,t,400,"Invalid or unacceptable Sec-WebSocket-Extensions header");return}}if(this.options.verifyClient){let p={origin:e.headers[`${a===8?"sec-websocket-origin":"origin"}`],secure:!!(e.socket.authorized||e.socket.encrypted),req:e};if(this.options.verifyClient.length===2){this.options.verifyClient(p,(f,h,g,y)=>{if(!f)return Ri(t,h||401,g,y);this.completeUpgrade(d,s,c,e,t,n,i)});return}if(!this.options.verifyClient(p))return Ri(t,401)}this.completeUpgrade(d,s,c,e,t,n,i)}completeUpgrade(e,t,n,i,s,o,a){if(!s.readable||!s.writable)return s.destroy();if(s[uk])throw new Error("server.handleUpgrade() was called more than once with the same socket, possibly due to a misconfiguration");if(this._state>ey)return Ri(s,503);let c=["HTTP/1.1 101 Switching Protocols","Upgrade: websocket","Connection: Upgrade",`Sec-WebSocket-Accept: ${sk("sha1").update(t+ck).digest("base64")}`],u=new this.options.WebSocket(null,void 0,this.options);if(n.size){let d=this.options.handleProtocols?this.options.handleProtocols(n,i):n.values().next().value;d&&(c.push(`Sec-WebSocket-Protocol: ${d}`),u._protocol=d)}if(e[Fr.extensionName]){let d=e[Fr.extensionName].params,p=Zg.format({[Fr.extensionName]:[d]});c.push(`Sec-WebSocket-Extensions: ${p}`),u._extensions=e}this.emit("headers",c,i),s.write(c.concat(`\r
`).join(`\r
`)),s.removeListener("error",ry),u.setSocket(s,o,{allowSynchronousEvents:this.options.allowSynchronousEvents,maxBufferedChunks:this.options.maxBufferedChunks,maxFragments:this.options.maxFragments,maxPayload:this.options.maxPayload,skipUTF8Validation:this.options.skipUTF8Validation}),this.clients&&(this.clients.add(u),u.on("close",()=>{this.clients.delete(u),this._shouldEmitClose&&!this.clients.size&&process.nextTick(Ii,this)})),a(u,i)}};iy.exports=xu;function fk(r,e){for(let t of Object.keys(e))r.on(t,e[t]);return function(){for(let n of Object.keys(e))r.removeListener(n,e[n])}}function Ii(r){r._state=ny,r.emit("close")}function ry(){this.destroy()}function Ri(r,e,t,n){t=t||ra.STATUS_CODES[e],n={Connection:"close","Content-Type":"text/html","Content-Length":Buffer.byteLength(t),...n},r.once("finish",r.destroy),r.end(`HTTP/1.1 ${e} ${ra.STATUS_CODES[e]}\r
`+Object.keys(n).map(i=>`${i}: ${n[i]}`).join(`\r
`)+`\r
\r
`+t)}function Hr(r,e,t,n,i,s){if(r.listenerCount("wsClientError")){let o=new Error(i);Error.captureStackTrace(o,Hr),r.emit("wsClientError",o,t,e)}else Ri(t,n,i,s)}});function $k(r,e){let t=r.replace(/\/?$/,"/"),n=e.replace(/^\//,"");return t+n}async function jk(r){let e=new AbortController,t=setTimeout(()=>e.abort(),Bk);try{let n=await fetch(r,{redirect:"follow",signal:e.signal,headers:{"User-Agent":"realm-engine-ensure-rotmg-xml/1.0"}});if(!n.ok)throw new Error(`HTTP ${n.status}`);let i=await n.arrayBuffer();return Buffer.from(i)}finally{clearTimeout(t)}}function Fk(r){if(r&&r.length>0)return r.map(t=>t.endsWith("/")?t:`${t}/`);let e=process.env.ROTMG_XML_BASE?.trim();return e?[e.endsWith("/")?e:`${e}/`]:[...Dk]}async function gy(r,e,t,n,i){let s=(0,Ni.resolve)(r,e.out);if((0,jt.existsSync)(s)&&!n)return i?.("info",`${e.out} already present \u2014 skip`),!0;let o=[];for(let a of t)for(let l of e.candidates){let c=$k(a,l);try{let u=await jk(c);if(u.length<64){o.push(`${c}: response too small (${u.length} bytes)`);continue}return(0,jt.mkdirSync)(r,{recursive:!0}),(0,jt.writeFileSync)(s,u),i?.("info",`Downloaded ${e.out} (${u.length} bytes) <= ${c}`),!0}catch(u){o.push(`${c}: ${u.message}`)}}return i?.("error",`Failed to fetch ${e.out}:
  ${o.join(`
  `)}`),!1}async function _u(r,e={}){let{force:t=!1,full:n=!1,bases:i,log:s}=e,o=Fk(i);(0,jt.mkdirSync)(r,{recursive:!0}),s?.("info",`Metadata XML bases: ${o.join(" | ")}`);for(let l of hy){let c=(0,Ni.resolve)(r,l.out);if(!(t||!(0,jt.existsSync)(c))){s?.("info",`${l.out} already present \u2014 skip`);continue}await gy(r,l,o,t,s)}if(n)for(let l of Lk){let c=(0,Ni.resolve)(r,l.out);if(!(t||!(0,jt.existsSync)(c))){s?.("info",`${l.out} already present \u2014 skip`);continue}await gy(r,l,o,t,s)}let a=hy.filter(l=>!(0,jt.existsSync)((0,Ni.resolve)(r,l.out))).map(l=>l.out);return{ok:a.length===0,failed:a}}var jt,Ni,Dk,hy,Lk,Bk,Iu=Ge(()=>{"use strict";jt=require("fs"),Ni=require("path"),Dk=["https://rotmg-mirror.github.io/rotmg-metadata/assets/production/xml/","https://static.drips.pw/rotmg/production/current/xml/"],hy=[{out:"enchantments.xml",candidates:["enchantments.xml","Enchantments.xml","enchants.xml"]}],Lk=[{out:"objects.xml",candidates:["objects.xml","Objects.xml"]},{out:"tiles.xml",candidates:["tiles.xml","Tiles.xml"]}];Bk=8e3});var yy=Ge(()=>{"use strict";Q();jn()});function by(){return(0,Ru.join)(process.env.USERPROFILE||(0,Nu.homedir)(),"Documents","Realmengine","data")}function Ce(){return(0,Ru.join)(process.env.USERPROFILE||(0,Nu.homedir)(),"Documents","Realmengine")}var Ru,Nu,Hk,lO,Gr=Ge(()=>{"use strict";Ru=require("path"),Nu=require("os"),Hk=G(un(),1);Q();Iu();yy();lO=10*6e4});function Mu(r){let e=0n;for(let t of r){if(typeof t!="number"||!Number.isFinite(t))continue;let n=Math.floor(t);n<0||n>4095||(e|=1n<<BigInt(n))}return e.toString()}function qk(r,e){return r==="none"||e<1?0:r==="spread-one-core"?1:r==="spread-two-cores"?Math.min(2,e):r==="spread-four-cores"?Math.min(4,e):0}function Jk(r,e,t){let n=r*Math.max(r,64);for(let i=0;i<n;i++){let s=t.cursor%r;if(t.cursor++,!(e&&r>1&&s===0))return s}return null}function Kk(r,e,t,n){let i=Math.max(0,Math.min(Math.floor(e),r)),s=[];for(;s.length<i;){let o=Jk(r,t,n);if(o===null)break;s.push(o)}return s}function zk(r){let e=t=>t==="active"?0:t==="background"?1:2;return[...r].sort((t,n)=>{let i=e(t.role)-e(n.role);return i!==0?i:t.seedPid-n.seedPid})}function xy(r,e,t,n,i){let s=Math.max(1,Math.floor(Number(t))||1),o=Math.max(0,Math.floor(n)),a=zk(r),l={cursor:o},c=new Map;for(let u of a){let d=e[u.role]?.affinityStrategy??"spread-two-cores",p=qk(d,s);if(p<=0)continue;let f=Kk(s,p,i,l);f.length&&c.set(u.seedPid,Mu(f))}return c}var Du=Ge(()=>{"use strict"});function la(){return(0,Cy.join)(Ce(),Yk)}function Xk(){return{version:ky,parkedPids:[]}}function Qe(){let r=Xk(),e=la();if(!(0,er.existsSync)(e))return r;try{let t=(0,er.readFileSync)(e,"utf8"),n=JSON.parse(t),i=Array.isArray(n.parkedPids)?n.parkedPids:[],s=[...new Set(i.map(o=>Math.floor(Number(o))).filter(o=>Number.isFinite(o)&&o>0))];return{...r,parkedPids:s}}catch{return r}}function Ft(r){let e=Qe(),t={...e,...r,version:ky,parkedPids:Array.isArray(r.parkedPids)?[...new Set(r.parkedPids.map(i=>Math.floor(Number(i))).filter(i=>Number.isFinite(i)&&i>0))]:e.parkedPids},n=Ce();return(0,er.existsSync)(n)||(0,er.mkdirSync)(n,{recursive:!0}),(0,er.writeFileSync)(la(),JSON.stringify(t,null,2),"utf8"),t}function Mi(r,e,t){return r.some(n=>t.has(n))?"parked":e!=null&&r.some(n=>n===e)?"active":"background"}var er,Cy,ky,Lu,Yk,xn=Ge(()=>{"use strict";er=require("fs"),Cy=require("path");Gr();ky=1,Lu={active:{role:"active",priority:"AboveNormal",affinityStrategy:"spread-four-cores",trimEligible:!1,allowMinimize:!1},background:{role:"background",priority:"Normal",affinityStrategy:"spread-two-cores",trimEligible:!0,allowMinimize:!1},parked:{role:"parked",priority:"BelowNormal",affinityStrategy:"spread-one-core",trimEligible:!0,allowMinimize:!0}},Yk="exalt-client-roles.json"});function Qk(r){let e=Qe(),t=e.parkedPids.filter(s=>r.has(s)),n=[...e.parkedPids].sort((s,o)=>s-o),i=[...t].sort((s,o)=>s-o);return i.length!==n.length||JSON.stringify(i)!==JSON.stringify(n)?(Ft({parkedPids:t}),new Set(t)):new Set(e.parkedPids.filter(s=>r.has(s)))}async function Di(r){let e=await ot(),t=e.processes||[],n=new Set(t.map(c=>c.pid));Qk(n);let i;r&&"foregroundPid"in r?i=r.foregroundPid??null:i=await tr();let s;if(r?.parkedPids!=null){let c=r.parkedPids instanceof Set?[...r.parkedPids]:r.parkedPids;s=new Set(c.map(u=>Math.floor(Number(u))).filter(u=>u>0))}else{let c=Qe();s=new Set(c.parkedPids.filter(u=>n.has(u))),(c.parkedPids.length!==[...s].length||[...c.parkedPids].sort((u,d)=>u-d).join()!==[...s].sort((u,d)=>u-d).join())&&Ft({parkedPids:[...s]})}let o=[...new Set(t.map(c=>c.pid))].sort((c,u)=>c-u),a=new Set,l=[];for(let c of o){if(a.has(c))continue;let u=await rr(c);for(let p of u)a.add(p);let d=Math.min(...u);l.push({seedPid:d,pids:u,role:Mi(u,i,s)})}return{clusters:l,foregroundPid:i,logicalProcessors:e.logicalProcessors}}async function ca(r,e){if(!r.length)return new Map;let t=new Set(r.map(l=>l.pid)),n;e&&"foregroundPid"in e?n=e.foregroundPid??null:n=await tr();let i;if(e?.parkedPids!=null){let l=e.parkedPids instanceof Set?[...e.parkedPids]:e.parkedPids;i=new Set(l.map(c=>Math.floor(Number(c))).filter(c=>c>0))}else{let l=Qe();i=new Set(l.parkedPids.filter(c=>t.has(c))),(l.parkedPids.length!==[...i].length||[...l.parkedPids].sort((c,u)=>c-u).join()!==[...i].sort((c,u)=>c-u).join())&&Ft({parkedPids:[...i]})}let s=[...new Set(r.map(l=>l.pid))].sort((l,c)=>l-c),o=new Set,a=new Map;for(let l of s){if(o.has(l))continue;let c=await rr(l);for(let d of c)o.add(d);let u=Mi(c,n,i);for(let d of c)a.set(d,u)}return a}var ua=Ge(()=>{"use strict";xn();yr()});function $u(){return{version:ju,tuningPreset:void 0,priorityPresetIdle:"Normal",priorityPresetHot:"AboveNormal",startupPowerGuid:void 0,powerGuidHot:"{8c5e7fda-e8bf-4a96-9a85-a6e23a635635}",powerGuidIdle:"{381b4222-f694-41f0-9685-ff5bb260df2e}",autoApplyOnProxyStart:!1,restoreProcessBaselineOnExit:!1,watchdog:{enabled:!1,cpuMetric:"normalized",cpuSumThreshold:25,cpuSumHotDebounceMs:5e3,cpuSumCoolDebounceMs:45e3,onHotSetPriorityHot:!0,onHotActivateHotPlan:!0,onHotSpreadCores:!1,onCoolSetPriorityIdle:!0,onCoolActivateIdlePlan:!0},thermal:{enabled:!1,pkgTempCelsiusThreshold:84,pkgTempCelsiusClear:80,sustainMs:45e3,clearMs:6e4,freqPctLowThreshold:65,freqPctClear:72,demoteBackgroundTo:"BelowNormal"}}}function Zk(r){let e=$u();if(!r||typeof r!="object")return e;let t=r,n=c=>{let u=String(c||"");return Iy.includes(u)?u:"Normal"},i=t.watchdog&&typeof t.watchdog=="object"?t.watchdog:{},s=typeof i.cpuSumThreshold=="number"&&Number.isFinite(i.cpuSumThreshold)?Math.max(0,i.cpuSumThreshold):e.watchdog.cpuSumThreshold,o=i.cpuMetric==="normalized"||i.cpuMetric==="raw"?i.cpuMetric:s>100?"raw":"normalized",a=new Set(["safe","balanced","multibox","aggressive","lowHeat"]);return{version:ju,tuningPreset:(c=>{if(c==null||c==="")return;let u=String(c);return a.has(u)?u:void 0})(t.tuningPreset)??e.tuningPreset,priorityPresetIdle:n(t.priorityPresetIdle??t.priorityPreset),priorityPresetHot:n(t.priorityPresetHot),startupPowerGuid:t.startupPowerGuid!=null?String(t.startupPowerGuid)||void 0:e.startupPowerGuid,powerGuidHot:t.powerGuidHot!=null?String(t.powerGuidHot)||void 0:e.powerGuidHot,powerGuidIdle:t.powerGuidIdle!=null?String(t.powerGuidIdle)||void 0:e.powerGuidIdle,autoApplyOnProxyStart:typeof t.autoApplyOnProxyStart=="boolean"?t.autoApplyOnProxyStart:e.autoApplyOnProxyStart,restoreProcessBaselineOnExit:typeof t.restoreProcessBaselineOnExit=="boolean"?t.restoreProcessBaselineOnExit:e.restoreProcessBaselineOnExit,watchdog:{enabled:typeof i.enabled=="boolean"?i.enabled:typeof t.watchdogEnabled=="boolean"?!!t.watchdogEnabled:e.watchdog.enabled,cpuMetric:o,cpuSumThreshold:s,cpuSumHotDebounceMs:typeof i.cpuSumHotDebounceMs=="number"&&Number.isFinite(i.cpuSumHotDebounceMs)?Math.max(500,i.cpuSumHotDebounceMs):e.watchdog.cpuSumHotDebounceMs,cpuSumCoolDebounceMs:typeof i.cpuSumCoolDebounceMs=="number"&&Number.isFinite(i.cpuSumCoolDebounceMs)?Math.max(2e3,i.cpuSumCoolDebounceMs):e.watchdog.cpuSumCoolDebounceMs,onHotSetPriorityHot:typeof i.onHotSetPriorityHot=="boolean"?i.onHotSetPriorityHot:e.watchdog.onHotSetPriorityHot,onHotActivateHotPlan:typeof i.onHotActivateHotPlan=="boolean"?i.onHotActivateHotPlan:e.watchdog.onHotActivateHotPlan,onHotSpreadCores:typeof i.onHotSpreadCores=="boolean"?i.onHotSpreadCores:e.watchdog.onHotSpreadCores,onCoolSetPriorityIdle:typeof i.onCoolSetPriorityIdle=="boolean"?i.onCoolSetPriorityIdle:e.watchdog.onCoolSetPriorityIdle,onCoolActivateIdlePlan:typeof i.onCoolActivateIdlePlan=="boolean"?i.onCoolActivateIdlePlan:e.watchdog.onCoolActivateIdlePlan},thermal:e0(e.thermal,t.thermal)}}function e0(r,e){if(!e||typeof e!="object")return r;let t=e,n=(a,l)=>typeof a=="number"&&Number.isFinite(a)?a:l,i=t.freqPctLowThreshold===null?null:typeof t.freqPctLowThreshold=="number"&&Number.isFinite(t.freqPctLowThreshold)?t.freqPctLowThreshold:r.freqPctLowThreshold,s=t.freqPctClear===null?null:typeof t.freqPctClear=="number"&&Number.isFinite(t.freqPctClear)?t.freqPctClear:r.freqPctClear,o=a=>{let l=String(a||"");return Iy.includes(l)?l:r.demoteBackgroundTo};return{enabled:typeof t.enabled=="boolean"?t.enabled:r.enabled,pkgTempCelsiusThreshold:n(t.pkgTempCelsiusThreshold,r.pkgTempCelsiusThreshold),pkgTempCelsiusClear:n(t.pkgTempCelsiusClear,r.pkgTempCelsiusClear),sustainMs:Math.max(3e3,n(t.sustainMs,r.sustainMs)),clearMs:Math.max(3e3,n(t.clearMs,r.clearMs)),freqPctLowThreshold:i,freqPctClear:s,demoteBackgroundTo:o(t.demoteBackgroundTo)}}function Fu(){return(0,Bu.join)(Ce(),_y)}function Ze(){let r=Ce(),e=(0,Bu.join)(r,_y);try{if((0,vt.existsSync)(r)||(0,vt.mkdirSync)(r,{recursive:!0}),!(0,vt.existsSync)(e))return $u();let t=JSON.parse((0,vt.readFileSync)(e,"utf8"));return Zk(t)}catch{return $u()}}function Cn(r){let e=Ze(),t={...e,...r,version:ju,watchdog:{...e.watchdog,...r.watchdog??{}},thermal:r.thermal?{...e.thermal,...r.thermal}:e.thermal},n=Ce(),i=Fu();return(0,vt.existsSync)(n)||(0,vt.mkdirSync)(n,{recursive:!0}),(0,vt.writeFileSync)(i,JSON.stringify(t,null,2),"utf8"),t}var vt,Bu,_y,ju,Iy,Li=Ge(()=>{"use strict";vt=require("fs"),Bu=require("path");Gr();_y="exalt-tune-settings.json",ju=1,Iy=["Idle","BelowNormal","Normal","AboveNormal","High"]});function t0(){return{version:Ny,proxy:{enabled:!1,checkIntervalMs:2e4,rssBytesThreshold:380*1024*1024,packetRateThreshold:450,minTrimIntervalMs:55e3,trimPackets:!0,trimPacketLab:!0,trimWorldSnapshot:!1,runGcHint:!0},exalt:{enabled:!1,checkIntervalMs:35e3,workingSetBytesPerProcessThreshold:Math.round(2.25*1024*1024*1024),periodicTrim:!1,minTrimIntervalMs:18e4,requireMemoryLoadPercent:85,maxCpuPercentForTrim:10,minWorkingSetBytesBeforeTrim:0,trimParentWs:!1,trimChildWs:!0,trimRolePolicy:{activeTrimEligible:!1,backgroundTrimEligible:!0,parkedTrimEligible:!0}}}}function da(r){let e=t0();if(!r||typeof r!="object")return e;let t=r,n=t.proxy&&typeof t.proxy=="object"?t.proxy:{},i=t.exalt&&typeof t.exalt=="object"?t.exalt:{},s=(a,l)=>typeof a=="number"&&Number.isFinite(a)?a:l,o=(a,l)=>typeof a=="boolean"?a:l;return{version:Ny,proxy:{enabled:o(n.enabled,e.proxy.enabled),checkIntervalMs:Math.max(5e3,Math.floor(s(n.checkIntervalMs,e.proxy.checkIntervalMs))),rssBytesThreshold:Math.max(0,s(n.rssBytesThreshold,e.proxy.rssBytesThreshold)),packetRateThreshold:Math.max(0,s(n.packetRateThreshold,e.proxy.packetRateThreshold)),minTrimIntervalMs:Math.max(1e4,Math.floor(s(n.minTrimIntervalMs,e.proxy.minTrimIntervalMs))),trimPackets:o(n.trimPackets,e.proxy.trimPackets),trimPacketLab:o(n.trimPacketLab,e.proxy.trimPacketLab),trimWorldSnapshot:o(n.trimWorldSnapshot,e.proxy.trimWorldSnapshot),runGcHint:o(n.runGcHint,e.proxy.runGcHint)},exalt:{enabled:o(i.enabled,e.exalt.enabled),checkIntervalMs:Math.max(5e3,Math.floor(s(i.checkIntervalMs,e.exalt.checkIntervalMs))),workingSetBytesPerProcessThreshold:Math.max(0,s(i.workingSetBytesPerProcessThreshold,e.exalt.workingSetBytesPerProcessThreshold)),periodicTrim:o(i.periodicTrim,e.exalt.periodicTrim),minTrimIntervalMs:Math.max(6e4,Math.floor(s(i.minTrimIntervalMs,e.exalt.minTrimIntervalMs))),requireMemoryLoadPercent:Math.min(100,Math.max(0,s(i.requireMemoryLoadPercent,e.exalt.requireMemoryLoadPercent))),maxCpuPercentForTrim:Math.max(0,s(i.maxCpuPercentForTrim,e.exalt.maxCpuPercentForTrim)),minWorkingSetBytesBeforeTrim:Math.max(0,s(i.minWorkingSetBytesBeforeTrim,e.exalt.minWorkingSetBytesBeforeTrim)),trimParentWs:o(i.trimParentWs,e.exalt.trimParentWs),trimChildWs:o(i.trimChildWs,e.exalt.trimChildWs),trimRolePolicy:(()=>{let a=i.trimRolePolicy,l=e.exalt.trimRolePolicy??{activeTrimEligible:!1,backgroundTrimEligible:!0,parkedTrimEligible:!0};if(!a||typeof a!="object")return l;let c=a;return{activeTrimEligible:o(c.activeTrimEligible,l.activeTrimEligible),backgroundTrimEligible:o(c.backgroundTrimEligible,l.backgroundTrimEligible),parkedTrimEligible:o(c.parkedTrimEligible,l.parkedTrimEligible)}})()}}}function Wu(){return(0,Hu.join)(Ce(),Ry)}function br(){let r=Ce(),e=(0,Hu.join)(r,Ry);try{return(0,xt.existsSync)(r)||(0,xt.mkdirSync)(r,{recursive:!0}),(0,xt.existsSync)(e)?da(JSON.parse((0,xt.readFileSync)(e,"utf8"))):da(void 0)}catch{return da(void 0)}}function fa(r){let e=br(),t=da({...e,...r,proxy:r.proxy?{...e.proxy,...r.proxy}:e.proxy,exalt:r.exalt?{...e.exalt,...r.exalt}:e.exalt}),n=Ce();return(0,xt.existsSync)(n)||(0,xt.mkdirSync)(n,{recursive:!0}),(0,xt.writeFileSync)(Wu(),JSON.stringify(t,null,2),"utf8"),t}var xt,Hu,Ry,Ny,pa=Ge(()=>{"use strict";xt=require("fs"),Hu=require("path");Gr();Ry="smart-trim-settings.json",Ny=1});function n0(r,e){let t={...r};for(let n of r0){let i=e[n];i&&(t[n]={...t[n],...i,role:n})}return t}function kn(){let r=Ze().tuningPreset;if(!r||!(r in $i))return Lu;let e=$i[r];return n0(Lu,e.rolePatch)}function Ay(){let r=Ze().tuningPreset;return!r||!(r in $i)?"rolePartition":$i[r].affinityMode}function ma(r){let e=$i[r];Cn({tuningPreset:r,priorityPresetIdle:e.idlePriorityDefault,priorityPresetHot:e.hotPriorityDefault});let t=br(),n=e.smartTrimPatch??{};fa({exalt:{...t.exalt,requireMemoryLoadPercent:e.smartTrimRequireMemoryLoadPercent,periodicTrim:typeof n.periodicTrim=="boolean"?n.periodicTrim:t.exalt.periodicTrim,checkIntervalMs:typeof n.checkIntervalMs=="number"?Math.max(5e3,Math.floor(n.checkIntervalMs)):t.exalt.checkIntervalMs,minTrimIntervalMs:typeof n.minTrimIntervalMs=="number"?Math.max(6e4,Math.floor(n.minTrimIntervalMs)):t.exalt.minTrimIntervalMs,maxCpuPercentForTrim:typeof n.maxCpuPercentForTrim=="number"?Math.max(0,Number(n.maxCpuPercentForTrim)):t.exalt.maxCpuPercentForTrim}})}var $i,r0,ha=Ge(()=>{"use strict";xn();Li();pa();$i={safe:{affinityMode:"none",idlePriorityDefault:"Normal",hotPriorityDefault:"Normal",smartTrimRequireMemoryLoadPercent:88,rolePatch:{active:{priority:"Normal",affinityStrategy:"none"},background:{priority:"Normal",affinityStrategy:"none"},parked:{priority:"BelowNormal",affinityStrategy:"none"}}},balanced:{affinityMode:"rolePartition",idlePriorityDefault:"Normal",hotPriorityDefault:"AboveNormal",smartTrimRequireMemoryLoadPercent:85,rolePatch:{active:{affinityStrategy:"spread-four-cores",priority:"AboveNormal"},background:{affinityStrategy:"spread-two-cores",priority:"Normal"},parked:{affinityStrategy:"spread-one-core",priority:"BelowNormal"}}},multibox:{affinityMode:"rolePartition",idlePriorityDefault:"BelowNormal",hotPriorityDefault:"Normal",smartTrimRequireMemoryLoadPercent:82,smartTrimPatch:{periodicTrim:!1,checkIntervalMs:3e4,minTrimIntervalMs:18e4,maxCpuPercentForTrim:18},rolePatch:{active:{affinityStrategy:"spread-four-cores",priority:"Normal"},background:{affinityStrategy:"spread-two-cores",priority:"BelowNormal"},parked:{affinityStrategy:"spread-one-core",priority:"Idle",allowMinimize:!0}}},aggressive:{affinityMode:"rolePartition",idlePriorityDefault:"BelowNormal",hotPriorityDefault:"High",smartTrimRequireMemoryLoadPercent:80,rolePatch:{active:{affinityStrategy:"spread-four-cores",priority:"High"},background:{affinityStrategy:"spread-two-cores",priority:"BelowNormal"},parked:{affinityStrategy:"spread-one-core",priority:"Idle"}}},lowHeat:{affinityMode:"rolePartition",idlePriorityDefault:"BelowNormal",hotPriorityDefault:"Normal",smartTrimRequireMemoryLoadPercent:85,smartTrimPatch:{periodicTrim:!0,checkIntervalMs:25e3,minTrimIntervalMs:12e4,maxCpuPercentForTrim:10},rolePatch:{active:{affinityStrategy:"spread-two-cores",priority:"Normal"},background:{affinityStrategy:"spread-one-core",priority:"BelowNormal"},parked:{affinityStrategy:"spread-one-core",priority:"Idle"}}}},r0=["active","background","parked"]});function Bi(){return Uu}function My(r){Oy=Gu(r),Uu=!0}function _n(){Uu=!1}function Vu(){return Oy}function Gu(r){let e=String(r||"").trim();return ga.includes(e)?e:"BelowNormal"}function qu(r,e){let t=Gu(r),n=Gu(e),i=Math.max(0,ga.indexOf(t)),s=Math.max(0,ga.indexOf(n));return ga[Math.min(i,s)]}var ga,Uu,Oy,ji=Ge(()=>{"use strict";ga=["Idle","BelowNormal","Normal","AboveNormal","High"],Uu=!1,Oy="BelowNormal"});var By={};tS(By,{PROCESS_BASELINE_VERSION:()=>Ly,captureProcessBaselineOverwrite:()=>Ku,ensureProcessBaselineCapturedOnce:()=>$y,processBaselinePath:()=>o0,restoreProcessBaseline:()=>ba});function ya(){return(0,Dy.join)(Ce(),i0)}function s0(r){let e=String(r||"").trim();return/^idle$/i.test(e)?"Idle":/^belownormal$/i.test(e.replace(/\s+/g,""))?"BelowNormal":/^abovenormal$/i.test(e.replace(/\s+/g,""))?"AboveNormal":/^high$/i.test(e)?"High":(/^normal$/i.test(e),"Normal")}async function $y(){if(Ju)return;let r=ya();if(!((0,at.existsSync)(r)||!(await re()).ok)){Ju=!0;try{let t=await ot(),n=await jy(),i={};for(let a of t.processes||[]){let l=Math.floor(Number(a.pid));if(!(l>0))continue;let c=String(a.processorAffinityMask??"").trim(),u=String(a.priorityClass??"Normal").trim(),d=/^[0-9]+$/.test(c);i[String(l)]={priorityClass:u,affinityMask:d?c:""}}let s={version:Ly,capturedAt:new Date().toISOString(),powerPlanGuid:n??void 0,processes:i},o=Ce();(0,at.existsSync)(o)||(0,at.mkdirSync)(o,{recursive:!0}),(0,at.writeFileSync)(r,JSON.stringify(s,null,2),"utf8")}finally{Ju=!1}}}async function Ku(){try{let r=ya();return(0,at.existsSync)(r)&&(0,at.unlinkSync)(r),await $y(),{ok:!0}}catch(r){return{ok:!1,error:String(r.message||r)}}}async function ba(){let r=ya();if(!(0,at.existsSync)(r))return{ok:!0,restored:0};let e;try{e=JSON.parse((0,at.readFileSync)(r,"utf8"))}catch{return{ok:!1,error:"invalid baseline file",restored:0}}let t=await re();if(!t.ok)return{ok:!1,error:t.reason,restored:0};try{e.powerPlanGuid&&await Ht(e.powerPlanGuid);let n=0;for(let[i,s]of Object.entries(e.processes||{})){let o=Math.floor(Number(i));if(!(o>0))continue;let a=String(s.affinityMask||"").trim();/^[0-9]+$/.test(a)&&await Sa(o,a);let l=s0(s.priorityClass);await wa([o],l),await Fy([o]),n++}return{ok:!0,restored:n}}catch(n){return{ok:!1,error:String(n.message||n),restored:0}}}function o0(){return ya()}var at,Dy,i0,Ly,Ju,zu=Ge(()=>{"use strict";at=require("fs"),Dy=require("path");Gr();yr();i0="exalt-process-baseline.json",Ly=1;Ju=!1});function Hy(r){return r!=="active"}function Yu(){let r=process.env.SystemRoot??process.env.windir??"C:\\Windows";return(0,Ea.join)(r,"System32","powercfg.exe")}function Wy(){let r=process.env.SystemRoot??process.env.windir??"C:\\Windows";return process.platform==="win32"&&process.arch==="ia32"&&process.env.PROCESSOR_ARCHITEW6432?(0,Ea.join)(r,"Sysnative","WindowsPowerShell","v1.0","powershell.exe"):(0,Ea.join)(r,"System32","WindowsPowerShell","v1.0","powershell.exe")}function In(){return process.platform==="win32"}function Qu(r){try{r.kill("SIGTERM")}catch{}setTimeout(()=>{try{r.kill("SIGKILL")}catch{}},400)}function Vy(r,e=Xu){return new Promise((t,n)=>{let i=[],s=[],o=(0,xa.spawn)(Wy(),["-NoProfile","-ExecutionPolicy","Bypass","-Command",r],{windowsHide:!0}),a=!1,l=(u,d)=>{a||(a=!0,clearTimeout(d),u())},c=setTimeout(()=>{Qu(o),l(()=>n(new Error(`PowerShell timed out after ${e}ms`)),c)},e);o.stdout.on("data",u=>i.push(Buffer.from(u))),o.stderr.on("data",u=>s.push(Buffer.from(u))),o.on("error",u=>l(()=>n(u),c)),o.on("close",u=>{l(()=>{let d=Buffer.concat(i).toString("utf8").trim(),p=Buffer.concat(s).toString("utf8").trim();u!==0&&p&&!d?n(new Error(p)):t(d)},c)})})}async function et(r,e=Xu){let t=await Vy(r,e);if(!t.trim())throw new Error("PowerShell returned empty stdout (expected JSON).");try{return JSON.parse(t)}catch{throw new Error(`PowerShell did not return JSON: ${t.slice(0,400)}`)}}function l0(r,e=Xu){return new Promise((t,n)=>{let i=[],s=[],o=(0,xa.spawn)(Wy(),["-NoProfile","-ExecutionPolicy","Bypass","-Command",r],{windowsHide:!0}),a=!1,l=(u,d)=>{a||(a=!0,clearTimeout(d),u())},c=setTimeout(()=>{Qu(o),l(()=>n(new Error(`PowerShell timed out after ${e}ms`)),c)},e);o.stdout.on("data",u=>i.push(Buffer.from(u))),o.stderr.on("data",u=>s.push(Buffer.from(u))),o.on("error",u=>l(()=>n(u),c)),o.on("close",u=>{l(()=>{t({out:Buffer.concat(i).toString("utf8").trim(),err:Buffer.concat(s).toString("utf8").trim(),code:u})},c)})})}function Pa(r,e=a0){return new Promise((t,n)=>{let i=(0,xa.spawn)(r[0],r.slice(1),{windowsHide:!0}),s=[],o=[],a=!1,l=(u,d)=>{a||(a=!0,clearTimeout(d),u())},c=setTimeout(()=>{Qu(i),l(()=>n(new Error(`${r[0]||"process"} timed out after ${e}ms`)),c)},e);i.stdout.on("data",u=>s.push(Buffer.from(u))),i.stderr.on("data",u=>o.push(Buffer.from(u))),i.on("error",u=>l(()=>n(u),c)),i.on("close",u=>l(()=>t({code:u??0,stdout:Buffer.concat(s).toString("utf8"),stderr:Buffer.concat(o).toString("utf8")}),c))})}function Zu(r){let e=r.trim().match(va);return e?`{${String(e[0]).replace(/^\{/,"").replace(/\}$/,"").toLowerCase()}}`:null}async function re(){return In()?{ok:!0}:{ok:!1,reason:"Windows-only tuning (ROTmg Exalt client)."}}async function ed(){if(!In())return null;let r=`
$os = Get-CimInstance Win32_OperatingSystem
$total = [int64]$os.TotalVisibleMemorySize * 1024L
$free = [int64]$os.FreePhysicalMemory * 1024L
$t = [double]$os.TotalVisibleMemorySize
$load = if ($t -le 0) { 0.0 } else { [math]::Round((1.0 - ([double]$os.FreePhysicalMemory / $t)) * 100.0, 1) }
@{ totalPhysBytes = $total; availPhysBytes = $free; memoryLoadPercent = [double]$load } | ConvertTo-Json -Compress
`.trim();try{let e=await et(r);return!e||typeof e.memoryLoadPercent!="number"?null:{totalPhysBytes:Number(e.totalPhysBytes)||0,availPhysBytes:Number(e.availPhysBytes)||0,memoryLoadPercent:Number(e.memoryLoadPercent)||0}}catch{return null}}async function ot(){if(!(await re()).ok)return{processes:[],logicalProcessors:0};let t=`
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
    ($rn -ieq "RotMG Exalt.exe") -or ($rn -ieq "${Ta.replace(/'/g,"''")}") -or (
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
`.trim();try{let{out:n,err:i,code:s}=await l0(t,25e3),o=n.replace(/^\uFEFF/,"").trim();if(!o)return m.warn("rotmgWindowsTune",`listExaltProcesses: empty stdout (code=${String(s)}): ${(i||"").slice(0,600)}`),{processes:[],logicalProcessors:0};let a=JSON.parse(o),l=[],c=a?.processes;return c?Array.isArray(c)?l=c:l=[c]:l=[],l.length===0&&i&&m.warn("rotmgWindowsTune",`listExaltProcesses: 0 matches. stderr=${i.slice(0,600)}`),{processes:l,logicalProcessors:Number(a?.logicalProcessors)||0}}catch(n){return m.warn("rotmgWindowsTune",String(n.message||n)),{processes:[],logicalProcessors:0}}}async function Ca(r){let e=await re();if(!e.ok)return{ok:!1,error:e.reason,applied:0};let n=`
$ErrorActionPreference = 'Stop'
$class = [System.Diagnostics.ProcessPriorityClass]::${r==="High"?"High":r==="AboveNormal"?"AboveNormal":r==="BelowNormal"?"BelowNormal":r==="Idle"?"Idle":"Normal"}
$i = 0
Get-CimInstance Win32_Process | Where-Object { $_.Name -ieq '${Gy}' -or $_.Name -ieq '${Ta}' } | ForEach-Object {
  $proc = Get-Process -Id $_.ProcessId -ErrorAction SilentlyContinue
  if ($null -ne $proc) {
    try {
      $proc.PriorityClass = $class
      $i++
    } catch {}
  }
}
@{ applied = $i } | ConvertTo-Json -Compress
`.trim();try{let i=await et(n);return{ok:!0,applied:Number(i?.applied)||0}}catch(i){return{ok:!1,error:String(i.message||i),applied:0}}}async function td(r){let e=await re();if(!e.ok)return{ok:!1,error:e.reason,applied:[]};let t={...Uy,...r},n=t.strategy??"spread-two-cores";if(n==="none")return{ok:!0,applied:[]};let i=Math.max(0,Math.floor(t.reserveLogicalCores??2)),s=t.targetChildOnly!==!1,o=t.avoidCpuZero!==!1,a=s?"$true":"$false",l=o?"$true":"$false",c=`
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
`.trim();try{let u=await et(c);if(u?.ok===!1&&u?.error)return{ok:!1,error:String(u.error),applied:[]};let d=u?.applied;return{ok:!0,applied:d?Array.isArray(d)?d:[d]:[]}}catch(u){return{ok:!1,error:String(u.message||u),applied:[]}}}async function Jy(){let r=await re();if(!r.ok)return{ok:!1,error:r.reason,applied:0};let e=await ot(),t=Math.max(1,Math.floor(Number(e.logicalProcessors)||1)),n=Mu([...Array(t).keys()]),i=0,s=new Set,o=e.processes||[];for(let a of o){let l=Math.floor(Number(a.pid));if(!(l>0)||s.has(l))continue;s.add(l),(await Sa(l,n)).ok&&i++}return{ok:!0,applied:i}}async function rd(r){let e=await re();if(!e.ok)return{ok:!1,error:e.reason};let t=await Di(r),n=kn();for(let i of t.clusters){let s=n[i.role],o=s.priority;i.role==="background"&&Bi()&&(o=qu(s.priority,Vu()));let a=await wa(i.pids,o);if(!a.ok)return{ok:!1,error:a.error};await Ky(i.pids,Hy(i.role)),i.role==="parked"&&s.allowMinimize&&await Qy(i.seedPid)}return{ok:!0,snapshot:t}}async function Sa(r,e){let t=await re();if(!t.ok)return{ok:!1,error:t.reason};let n=Math.floor(Number(r)),i=e.trim();if(!(n>0)||!/^\d+$/.test(i))return{ok:!1,error:"invalid affinity input"};let s=`
$ErrorActionPreference = 'Continue'
$p = Get-Process -Id ${String(n)} -ErrorAction SilentlyContinue
if ($null -eq $p) {
  @{ ok = $false; error = 'process not found' } | ConvertTo-Json -Compress
  exit 1
}
$m = [UInt64]::Parse('${i}')
$p.ProcessorAffinity = [IntPtr]$m
@{ ok = $true } | ConvertTo-Json -Compress
`.trim();try{let o=await et(s);return o?.ok?{ok:!0}:{ok:!1,error:String(o?.error||"affinity failed")}}catch(o){return{ok:!1,error:String(o.message||o)}}}async function nd(r){let e=Ay();if(e==="none")return{ok:!0};if(e==="globalEven"){let s=await td();return{ok:s.ok,error:s.error}}let t=kn(),n=Uy,i=xy(r.clusters,t,r.logicalProcessors,Math.max(0,Math.floor(n.reserveLogicalCores??2)),n.avoidCpuZero!==!1);for(let s of r.clusters){let o=i.get(s.seedPid);if(o)for(let a of s.pids)await Sa(a,o)}return{ok:!0}}async function id(){let r=await Di();return nd(r)}async function sd(){let e=(await Pa([Yu(),"/getactivescheme"])).stdout.match(va);return e?Zu(e[0])??void 0:void 0}async function jy(){return sd()}async function ka(){if(!In())return[];let r=await sd(),e=Yu(),t=await Pa([e,"/list"]),i=`${t.stdout}
${t.stderr}`.split(/\r?\n/).map(a=>a.trim());i.some(a=>/guid|GUID/i.test(a)||va.test(a))||(t=await Pa(["powercfg","/list"]),i=`${t.stdout}`.split(/\r?\n/).map(a=>a.trim()));let s=[];for(let a of i){if(!a)continue;let l=a.match(va);if(!l)continue;let c=Zu(l[0]);if(!c)continue;let u=/\(([^)]+)\)/.exec(a),d=u?u[1].replace(/\s*\*\s*$/,"").trim():"";d||(d=a.slice(a.indexOf(l[0])+l[0].length).trim().replace(/^[\s\u2013\u2014-]+/,"").trim().split(/\s{2,}/)[0]||""),d||(d="Power scheme");let p=!!r&&r.toLowerCase()===c.toLowerCase(),f=/\(\s*\*+\s*\)\s*$/.test(a)||/\s\*\s*$/.test(a.trim());s.push({guid:c,name:d,active:p||f})}let o=new Map;for(let a of s){let l=a.guid.toLowerCase();o.has(l)||o.set(l,a)}return[...o.values()]}async function Ht(r){if(!In())return{ok:!1,error:"Windows only."};let e=Zu(r);if(!e)return{ok:!1,error:"Invalid power scheme GUID."};let t=await Pa([Yu(),"/setactive",e]);return await new Promise(i=>setTimeout(i,120)),(await sd())?.toLowerCase()===e.toLowerCase()?{ok:!0}:t.code===0?{ok:!0}:{ok:!1,error:t.stderr.trim()||t.stdout.trim()||`powercfg exited ${t.code}`}}async function Rn(r){let e=await re();if(!e.ok)return{ok:!1,error:e.reason,applied:0};let t=[...new Set(r.map(s=>Math.floor(Number(s))).filter(s=>Number.isFinite(s)&&s>0))];if(t.length===0)return{ok:!0,applied:0};let i=`
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
`.trim();try{let s=await et(i);return{ok:!0,applied:Number(s?.applied)||0}}catch(s){return{ok:!1,error:String(s.message||s),applied:0}}}function c0(r){switch(r){case"High":return"High";case"AboveNormal":return"AboveNormal";case"BelowNormal":return"BelowNormal";case"Idle":return"Idle";default:return"Normal"}}async function tr(){if(!(await re()).ok)return null;let e=`
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
`.trim();try{let t=await et(e),n=Math.floor(Number(t?.pid??0));return Number.isFinite(n)&&n>0?n:null}catch{return null}}async function rr(r){if(!(await re()).ok)return[];let t=Math.floor(Number(r));if(!Number.isFinite(t)||t<=0)return[];let n=`
$id = ${String(t)}
$ids = New-Object System.Collections.Generic.HashSet[int]
[void]$ids.Add([int]$id)
try {
  $cim = Get-CimInstance Win32_Process -Filter "ProcessId=$id" -ErrorAction SilentlyContinue
  if ($null -ne $cim) {
    $pp = [int]$cim.ParentProcessId
    $nm = [string]$cim.Name
    if ($nm -ieq '${Ta}' -and $pp -gt 0) {
      [void]$ids.Add([int]$pp)
    }
    if ($pp -gt 0) {
      Get-CimInstance Win32_Process -ErrorAction SilentlyContinue | Where-Object {
        ([int]$_.ParentProcessId) -eq $pp -and (
          $_.Name -ieq '${Gy}' -or $_.Name -ieq '${Ta}')
      } | ForEach-Object {
        try { [void]$ids.Add([int]$_.ProcessId) } catch {}
      }
    }
  }
} catch {}
@($ids | Sort-Object) | ConvertTo-Json -Compress
`.trim();try{let i=JSON.parse((await Vy(n)).replace(/^\uFEFF/,"").trim());if(!Array.isArray(i))return[t];let s=[...new Set(i.map(o=>Math.floor(Number(o))).filter(o=>o>0))].sort((o,a)=>o-a);return s.length?s:[t]}catch{return[t]}}async function wa(r,e){let t=await re();if(!t.ok)return{ok:!1,error:t.reason,applied:0};let n=[...new Set(r.map(a=>Math.floor(Number(a))).filter(a=>a>0))];if(n.length===0)return{ok:!0,applied:0};let i=c0(e),s=n.join(","),o=`
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
`.trim();try{let a=await et(o);return{ok:!0,applied:Number(a?.applied)||0}}catch(a){return{ok:!1,error:String(a.message||a),applied:0}}}async function Ky(r,e){let t=await re();if(!t.ok)return{ok:!1,error:t.reason,applied:0};let n=[...new Set(r.map(a=>Math.floor(Number(a))).filter(a=>a>0))];if(n.length===0)return{ok:!0,applied:0};let i=e?"$true":"$false",o=`
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
`.trim();try{let a=await et(o);return{ok:!0,applied:Number(a?.applied)||0}}catch(a){return{ok:!1,error:String(a.message||a),applied:0}}}async function Fy(r){let e=await re();if(!e.ok)return{ok:!1,error:e.reason,applied:0};let t=[...new Set(r.map(s=>Math.floor(Number(s))).filter(s=>s>0))];if(t.length===0)return{ok:!0,applied:0};let i=`
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
`.trim();try{let s=await et(i);return{ok:!0,applied:Number(s?.applied)||0}}catch(s){return{ok:!1,error:String(s.message||s),applied:0}}}async function zy(r,e){let t=await re();if(!t.ok)return{ok:!1,error:t.reason,done:!1};if(!r.length)return{ok:!0,done:!1};let i=[...new Set(r.map(a=>Math.floor(Number(a))).filter(a=>a>0))].join(","),o=`
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
`.trim();try{return{ok:!0,done:!!(await et(o))?.ok}}catch(a){return{ok:!1,error:String(a.message||a),done:!1}}}async function Yy(r){let e=await re();if(!e.ok)return{ok:!1,error:e.reason};let t=Math.floor(Number(r));if(!Number.isFinite(t)||t<=0)return{ok:!1,error:"invalid pid"};let n=`
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
`.trim();try{return{ok:!!(await et(n))?.ok}}catch(i){return{ok:!1,error:String(i.message||i)}}}function u0(r){let e=String(r||"").trim();if(!e)return"";let t=Buffer.from(e,"utf8").toString("base64");return t.slice(0,Math.min(48,t.length))}async function Xy(r,e,t){if(!In())return{ok:!1,debug:"not win32"};let n=Math.floor(Number(r));if(!Number.isFinite(n)||n<=0)return{ok:!1,debug:"invalid seed pid"};let i=Math.round(e.x),s=Math.round(e.y),o=Math.max(200,Math.round(e.width)),a=Math.max(150,Math.round(e.height)),l=u0(t?.email??""),c=String(t?.launchedAtIso??"").trim(),u=l.replace(/'/g,"''"),d=c.replace(/'/g,"''"),p=120,f=250,h=0;for(let g=0;g<p;g++){if(g%8===0)try{let S=await od(r);S!=null&&S>0&&(h=S)}catch{}let y=Math.floor(h),b=`
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
`.trim();try{let S=await et(b,18e3);if(S?.moved)return{ok:!0};let E=JSON.stringify(S??{}).slice(0,1200);if(g%20===0&&m.warn("rotmgWindowsTune",`moveRotmgLaunchedWindowAfterSpawn attempt ${g}: ${E.slice(0,800)}`),g===p-1)return{ok:!1,debug:E}}catch(S){let E=String(S.message||S);if(g%20===0&&m.warn("rotmgWindowsTune",`moveRotmgLaunchedWindowAfterSpawn attempt ${g} PS error: ${E.slice(0,400)}`),g===p-1)return{ok:!1,debug:`ps_error:${E.slice(0,600)}`}}await new Promise(S=>setTimeout(S,f))}return{ok:!1,debug:"exhausted attempts"}}async function od(r){if(!In())return null;let e=Math.floor(Number(r));if(!Number.isFinite(e)||e<=0)return null;let t=46,n=200;for(let i=0;i<t;i++){let s=`
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
`.trim();try{let o=await et(s,8e3),a=Math.floor(Number(o?.pid));if(Number.isFinite(a)&&a>0)return a}catch{}await new Promise(o=>setTimeout(o,n))}return null}async function Qy(r){let e=await rr(r),t=await zy(e,"minimize");return{ok:t.ok,done:t.done,error:t.error}}async function Zy(r){let e=await rr(r),t=await zy(e,"restore");return{ok:t.ok,done:t.done,error:t.error}}async function _a(r,e,t=0){let n=await re();if(!n.ok)return{ok:!1,error:n.reason,pids:[]};let s=kn()[e],o=s.priority;e==="background"&&Bi()&&(o=qu(s.priority,Vu()));let a=await rr(r),l=await wa(a,o);if(!l.ok)return{ok:!1,error:l.error,pids:a};await Ky(a,Hy(e)),e==="parked"&&s.allowMinimize&&await Qy(r);let c=await Di(),u=await nd(c);return{ok:u.ok!==!1,pids:a,error:u.error}}async function Nn(r,e){let t=await re();if(!t.ok)return{ok:!1,error:t.reason,slots:[]};await Promise.resolve().then(()=>(zu(),By)).then(a=>a.ensureProcessBaselineCapturedOnce());let n=await rd({foregroundPid:r,parkedPids:e});if(!n.ok||!n.snapshot)return{ok:!1,error:n.error,slots:[]};let i=n.snapshot,s=i.clusters.map(a=>({seedPid:a.seedPid,pids:a.pids,role:a.role})),o=await nd(i);return{ok:o.ok!==!1,error:o.error,slots:s}}async function Ia(){if(!(await re()).ok)return{pkgMaxCelsius:null,minFreqPctOfMax:null};let e=`
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
`.trim();try{let t=await et(e),n=i=>typeof i=="number"&&Number.isFinite(i)?i:null;return{pkgMaxCelsius:n(t?.pkgMaxCelsius),minFreqPctOfMax:n(t?.minFreqPctOfMax)}}catch{return{pkgMaxCelsius:null,minFreqPctOfMax:null}}}var xa,Ea,Gy,Ta,Uy,Xu,a0,qy,va,yr=Ge(()=>{"use strict";xa=require("child_process"),Ea=require("path");Q();Du();ua();Du();ha();ji();Gy="RotMG Exalt.exe",Ta="RotMGExalt.exe",Uy={strategy:"spread-two-cores",reserveLogicalCores:2,targetChildOnly:!0,avoidCpuZero:!0};Xu=12e3,a0=15e3;qy=[{guid:"{8c5e7fda-e8bf-4a96-9a85-a6e23a635635}",label:"High performance",hint:"Native Windows preset \u2014 minimizes CPU scaling while multiboxing ROTMG."},{guid:"{381b4222-f694-41f0-9685-ff5bb260df2e}",label:"Balanced",hint:"Default plan \u2014 quieter fans when Realm clients sit idle."},{guid:"{a1841308-3541-4fab-bc81-f71556f20b4a}",label:"Power saver",hint:"Use when minimizing heat/power; gameplay may feel sluggish."}],va=/\{?[a-fA-F0-9]{8}-(?:[a-fA-F0-9]{4}-){3}[a-fA-F0-9]{12}\}?/});var Ki=require("fs"),Vb=require("path"),qb=require("os"),ae=require("path"),Kb=require("os"),zb=require("url"),ye=require("fs");var Nd=G(require("net"),1),Ad=require("events"),Nt=require("fs"),Rt=require("path"),Ja=require("os"),Od=require("child_process");var _d=G(require("net"),1);var Gt=class r{engineState;workingKey;x=0;y=0;constructor(e){this.workingKey=r.hexToBytes(e),this.engineState=new Uint8Array(256),this.setKey(this.workingKey)}cipher(e){this.processBytes(e,5,e.length-5,e,5)}reset(){this.setKey(this.workingKey)}processBytes(e,t,n,i,s){for(let o=0;o<n;o++){this.x=this.x+1&255,this.y=this.engineState[this.x]+this.y&255;let a=this.engineState[this.x];this.engineState[this.x]=this.engineState[this.y],this.engineState[this.y]=a,i[o+s]=e[o+t]^this.engineState[this.engineState[this.x]+this.engineState[this.y]&255]}}setKey(e){this.x=0,this.y=0;for(let i=0;i<256;i++)this.engineState[i]=i;let t=0,n=0;for(let i=0;i<256;i++){n=(e[t]&255)+this.engineState[i]+n&255;let s=this.engineState[i];this.engineState[i]=this.engineState[n],this.engineState[n]=s,t=(t+1)%e.length}}static hexToBytes(e){return Buffer.from(e,"hex")}};var zr=class r{static MAX_PACKET_SIZE=1048576;_bytes=Buffer.alloc(4);_index=0;get bytes(){return this._bytes}get index(){return this._index}advance(e){this._index+=e}resize(e){if(e<=0||e>r.MAX_PACKET_SIZE)throw new Error(`Invalid packet size: ${e}`);let t=Buffer.alloc(e);this._bytes.copy(t,0,0,Math.min(this._bytes.length,e)),this._bytes=t}reset(){this._bytes=Buffer.alloc(4),this._index=0}bytesRemaining(){return this._bytes.length-this._index}getBytes(){return Buffer.from(this._bytes)}dispose(){this._bytes=Buffer.alloc(0),this._index=0}};var zi={Dead:0,Quiet:1,Weak:2,Slowed:3,Sick:4,Dazed:5,Stunned:6,Blind:7,Hallucinating:8,Drunk:9,Confused:10,StunImmune:11,Invisible:12,Paralyzed:13,Speedy:14,Bleeding:15,ArmorBrokenImmune:16,Healing:17,Damaging:18,Berserk:19,Paused:20,Stasis:21,StasisImmune:22,Invincible:23,Invulnerable:24,Armored:25,ArmorBroken:26,Hexed:27,NinjaSpeedy:28,Unstable:29,Darkness:30,SlowedImmune:31,DazedImmune:32,ParalyzeImmune:33,Petrified:34,PetrifiedImmune:35,PetDisable:36,Curse:37,CurseImmune:38,HpBoost:39,MpBoost:40,AttBoost:41,DefBoost:42,SpdBoost:43,VitBoost:44,WisBoost:45,DexBoost:46,Silenced:47,Exposed:48,Energized:49,InCombat:58};var x={MaxHP:0,HP:1,Size:2,MaxMP:3,MP:4,NextLevelExp:5,Exp:6,Level:7,Inventory0:8,Inventory1:9,Inventory2:10,Inventory3:11,Inventory4:12,Inventory5:13,Inventory6:14,Inventory7:15,Inventory8:16,Inventory9:17,Inventory10:18,Inventory11:19,Attack:20,Defense:21,Speed:22,Vitality:26,Wisdom:27,Dexterity:28,Effects:29,Stars:30,Name:31,Texture1:32,NameStat:31,Texture2:33,Credits:34,AccountId:38,CurrentFame:39,HpBoost:46,MpBoost:47,AttackBonus:48,DefenseBonus:49,SpeedBonus:50,VitalityBonus:51,WisdomBonus:52,DexterityBonus:53,OwnerAccountId:54,CharacterAliveFame:57,GuildName:62,GuildRank:63,OxygenBar:64,HealthStackCount:73,MagicStackCount:74,HasBackpack:75,Skin:76,PetInstanceId:77,Enchantments:80,Effects2:95,WireExaltAttack:105,WireExaltDefense:106,WireExaltSpeed:107,WireExaltVitality:108,WireExaltDexterity:109,WireExaltWisdom:110,WireExaltMaxHP:111,WireExaltMaxMP:112,ExaltedAttack:123,PowerLevel:124,ExaltedSpeed:125,ExaltedVitality:126,ExaltedWisdom:129,BackpackTier:130,ExaltedMaxHP:131,ExaltedMaxMP:132,ExaltationDamageMultiplier:133,SinkLevel:134,QuickSlot0:116,QuickSlot1:117,QuickSlot2:118,Backpack0:131,Backpack1:132,Backpack2:133,Backpack3:134,Backpack4:135,Backpack5:136,Backpack6:137,Backpack7:138,Backpack8:139,Backpack9:140,Backpack10:141,Backpack11:142,Backpack12:143,Backpack13:144,Backpack14:145,Backpack15:146};function se(r){let e=typeof r=="number"?r:Number(r);return Number.isFinite(e)?Math.trunc(e):0}var Yr=class r{ownerObjectId=0;accountId="";name="";classType=0;level=1;health=0;maxHealth=0;mana=0;maxMana=0;attack=0;defense=0;speed=0;vitality=0;wisdom=0;dexterity=0;healthBonus=0;manaBonus=0;attackBonus=0;defenseBonus=0;speedBonus=0;vitalityBonus=0;wisdomBonus=0;dexterityBonus=0;exaltedAttack=0;exaltedDefense=0;exaltedSpeed=0;exaltedVitality=0;exaltedWisdom=0;exaltedDexterity=0;exaltedMaxHP=0;exaltedMaxMP=0;exaltationDamageMultiplier=0;_wireHpBoost=null;_wireMpBoost=null;_wireAttackBonus=null;_wireDefenseBonus=null;_wireSpeedBonus=null;_wireVitalityBonus=null;_wireWisdomBonus=null;_wireDexterityBonus=null;inventory=new Array(12).fill(-1);backpack=new Array(16).fill(-1);quickSlots=Array.from({length:3},()=>({itemType:-1,quantity:0}));healthStackCount=0;magicStackCount=0;effects=[0,0];pos={x:0,y:0};mapName="";mapWidth=0;mapHeight=0;teleportAllowed=!1;questObjectId=-1;stars=0;currentFame=0;characterAliveFame=0;credits=0;skin=0;tex1=0;tex2=0;sinkLevel=0;guildName="";guildRank=0;hasBackpack=!1;backpackTier=0;legacyHasBackpackStat75=!1;hasThirdQuickSlot=!1;vaultContent=[];vaultChestObjectId=-1;powerLevel=0;static gearOnlyFromCombined(e,t){let n=Math.trunc(Number(e))||0,i=Math.trunc(Number(t))||0,s=i>0?i:0;return Math.max(0,n-s)}refreshBackpackPresenceFromStats(){this.hasBackpack=this.backpackTier!==0||this.legacyHasBackpackStat75}get hasBackpackExtender(){return this.backpackTier>=16}applyGearBonusesFromWireMinusExalt(){this._wireHpBoost!==null&&(this.healthBonus=r.gearOnlyFromCombined(this._wireHpBoost,this.exaltedMaxHP)),this._wireMpBoost!==null&&(this.manaBonus=r.gearOnlyFromCombined(this._wireMpBoost,this.exaltedMaxMP)),this._wireAttackBonus!==null&&(this.attackBonus=r.gearOnlyFromCombined(this._wireAttackBonus,this.exaltedAttack)),this._wireDefenseBonus!==null&&(this.defenseBonus=r.gearOnlyFromCombined(this._wireDefenseBonus,this.exaltedDefense)),this._wireSpeedBonus!==null&&(this.speedBonus=r.gearOnlyFromCombined(this._wireSpeedBonus,this.exaltedSpeed)),this._wireVitalityBonus!==null&&(this.vitalityBonus=r.gearOnlyFromCombined(this._wireVitalityBonus,this.exaltedVitality)),this._wireWisdomBonus!==null&&(this.wisdomBonus=r.gearOnlyFromCombined(this._wireWisdomBonus,this.exaltedWisdom)),this._wireDexterityBonus!==null&&(this.dexterityBonus=r.gearOnlyFromCombined(this._wireDexterityBonus,this.exaltedDexterity))}hasConditionEffect(e){let t=zi[e];return t===void 0?!1:t<31?(this.effects[0]&1<<t)!==0:(this.effects[1]&1<<t-31)!==0}parseStat(e,t,n){switch(e){case x.MaxHP:this.maxHealth=t;break;case x.HP:this.health=t;break;case x.MaxMP:this.maxMana=t;break;case x.MP:this.mana=t;break;case x.Attack:this.attack=t;break;case x.Defense:this.defense=t;break;case x.Speed:this.speed=t;break;case x.Vitality:this.vitality=t;break;case x.Wisdom:this.wisdom=t;break;case x.Dexterity:this.dexterity=t;break;case x.Level:this.level=t;break;case x.Stars:this.stars=t;break;case x.NameStat:this.name=t;break;case x.AccountId:this.accountId=t;break;case x.CurrentFame:this.currentFame=t;break;case x.CharacterAliveFame:this.characterAliveFame=se(t);break;case x.PowerLevel:this.powerLevel=se(t);break;case x.Credits:this.credits=t;break;case x.Effects:this.effects[0]=t;break;case x.Effects2:this.effects[1]=t;break;case x.Texture1:this.tex1=t;break;case x.Texture2:this.tex2=t;break;case x.HpBoost:this._wireHpBoost=se(t);break;case x.MpBoost:this._wireMpBoost=se(t);break;case x.AttackBonus:this._wireAttackBonus=se(t);break;case x.DefenseBonus:this._wireDefenseBonus=se(t);break;case x.SpeedBonus:this._wireSpeedBonus=se(t);break;case x.VitalityBonus:this._wireVitalityBonus=se(t);break;case x.WisdomBonus:this._wireWisdomBonus=se(t);break;case x.DexterityBonus:this._wireDexterityBonus=se(t);break;case x.ExaltationDamageMultiplier:this.exaltationDamageMultiplier=se(t);break;case x.Skin:this.skin=t;break;case x.GuildName:this.guildName=t;break;case x.GuildRank:this.guildRank=t;break;case x.HealthStackCount:this.healthStackCount=se(t);break;case x.MagicStackCount:this.magicStackCount=se(t);break;case x.HasBackpack:this.legacyHasBackpackStat75=t!==0,this.refreshBackpackPresenceFromStats();break;case x.BackpackTier:this.backpackTier=se(t),this.refreshBackpackPresenceFromStats();break;case x.QuickSlot0:this.quickSlots[0]={itemType:se(t),quantity:Math.max(0,se(n??0))};break;case x.QuickSlot1:this.quickSlots[1]={itemType:se(t),quantity:Math.max(0,se(n??0))};break;case x.QuickSlot2:{let i=se(t);this.quickSlots[2]={itemType:i,quantity:Math.max(0,se(n??0))},i>0&&(this.hasThirdQuickSlot=!0);break}case x.WireExaltAttack:this.exaltedAttack=se(t);break;case x.WireExaltDefense:this.exaltedDefense=se(t);break;case x.WireExaltSpeed:this.exaltedSpeed=se(t);break;case x.WireExaltVitality:this.exaltedVitality=se(t);break;case x.WireExaltDexterity:this.exaltedDexterity=se(t);break;case x.WireExaltWisdom:this.exaltedWisdom=se(t);break;case x.WireExaltMaxHP:this.exaltedMaxHP=se(t);break;case x.WireExaltMaxMP:this.exaltedMaxMP=se(t);break;default:e>=8&&e<=19&&(this.inventory[e-8]=t),e>=131&&e<=146&&(this.backpack[e-131]=t);break}}parseStatus(e){for(let t of e)this.parseStat(t.id,t.value,t.stackCount);this.applyGearBonusesFromWireMinusExalt()}};Q();var Ga="5a4d2016bc16dc64883194ffd9",Ua="c91d9eec420160730d825604e0",Xi=class r{constructor(e,t){this.proxy=e;this.clientSocket=t,this.clientSocket.setNoDelay(!0),this.clientSocket.on("data",n=>this.onClientData(n)),this.clientSocket.on("error",n=>this.onError("client",n)),this.clientSocket.on("close",()=>this.dispose())}clientReceiveCipher=new Gt(Ga);clientSendCipher=new Gt(Ua);serverReceiveCipher=new Gt(Ua);serverSendCipher=new Gt(Ga);clientSocket;serverSocket=null;clientBuffer=new zr;serverBuffer=new zr;closed=!1;serverConnecting=!1;pendingServerQueue=[];state;playerData=new Yr;lastUpdate=0;previousTime=0;relativeTime=0;serverConnectedAt=0;lastNewTickId=0;lastServerRealTimeMs=0;lastClientMoveAt=0;lastTeleportSentAt=0;lastTeleportGotoAt=0;pendingTeleportSentAt=0;pendingTeleportTargetObjectId=null;originalTargetIp="";clientId="";clientAccum=Buffer.alloc(0);serverAccum=Buffer.alloc(0);_pendingHello=null;_helloRetryTimer=null;_helloRetryCount=0;_serverResponded=!1;_helloIsRetrying=!1;static HELLO_RETRY_MS=3e3;static HELLO_MAX_RETRIES=3;get time(){return Date.now()+this.relativeTime}get gameTime(){return this.serverConnectedAt>0?Date.now()-this.serverConnectedAt:Math.max(0,Date.now()+this.relativeTime)}get objectId(){return this.playerData.ownerObjectId}get connected(){return!this.closed}connectToServer(e){this._helloRetryTimer&&(clearTimeout(this._helloRetryTimer),this._helloRetryTimer=null),this._helloIsRetrying?this._helloIsRetrying=!1:this._helloRetryCount=0,this.serverSocket&&(this.serverSocket.removeAllListeners(),this.serverSocket.destroy(),this.serverSocket=null),this.serverReceiveCipher=new Gt(Ua),this.serverSendCipher=new Gt(Ga),this.serverBuffer=new zr,this.serverAccum=Buffer.alloc(0),this._pendingHello=e,this._serverResponded=!1,this.serverConnecting=!0,this.pendingServerQueue=[],this.serverSocket=new _d.default.Socket,this.serverSocket.setNoDelay(!0),this.serverSocket.on("data",n=>this.onServerData(n)),this.serverSocket.on("error",n=>this.onError("server",n)),this.serverSocket.on("close",()=>this.dispose());let t=e.data.key;m.log("Client",`Connecting to ${this.state.conTargetAddress}:${this.state.conTargetPort}...`),m.debug("reconnect","Client",`HELLO key being sent (${Buffer.isBuffer(t)?t.length:0} bytes): ${Buffer.isBuffer(t)?t.toString("hex").slice(0,80):typeof t}`),this.serverSocket.connect(this.state.conTargetPort,this.state.conTargetAddress,()=>{this.serverConnectedAt=Date.now(),m.log("Client",`Connected to ${this.state.conTargetAddress}:${this.state.conTargetPort}`),this.serverConnecting=!1,m.debug("proxy","Client",`[DIAG-connect] about to forward HELLO (modified=${e.modified}, rawLen=${e.rawBytes?.length??0})`),e.modified?this.sendToServer(e):this.forwardRaw(e.rawBytes,!1),m.debug("proxy","Client","[DIAG-connect] HELLO forwarded"),this.flushPendingServerQueue(),m.debug("proxy","Client",`[DIAG-connect] flushed pending queue (size=${this.pendingServerQueue.length})`);try{this.proxy.fireClientConnected(this),m.debug("proxy","Client","[DIAG-connect] fireClientConnected returned")}catch(n){m.error("Client","[DIAG-connect] fireClientConnected THREW",n)}try{this._scheduleHelloRetry(),m.debug("proxy","Client","[DIAG-connect] HELLO retry scheduled \u2014 waiting for server")}catch(n){m.error("Client","[DIAG-connect] _scheduleHelloRetry THREW",n)}})}_scheduleHelloRetry(){this._helloRetryTimer=setTimeout(()=>{if(this._helloRetryTimer=null,!(this._serverResponded||this.closed||!this._pendingHello)){if(this._helloRetryCount>=r.HELLO_MAX_RETRIES){m.warn("Client",`HELLO unanswered after ${r.HELLO_MAX_RETRIES} retries \u2014 giving up`);return}this._helloRetryCount++,this._helloIsRetrying=!0,m.log("Client",`HELLO unanswered \u2014 retry ${this._helloRetryCount}/${r.HELLO_MAX_RETRIES}`),this.connectToServer(this._pendingHello)}},r.HELLO_RETRY_MS)}sendToClient(e){this.send(e,!0)}sendToServer(e){this.send(e,!1)}sendRawToServer(e){this.closed||this.forwardRaw(e,!1)}lagMode=!1;_lagQueue=[];flushLagQueue(){let e=this._lagQueue.length;for(let t of this._lagQueue)this.forwardRaw(t.rawBytes,t.toClient);return this._lagQueue=[],e}dropLagQueue(){let e=this._lagQueue.length;return this._lagQueue=[],e}get lagQueueSize(){return this._lagQueue.length}get lagQueueBytes(){return this._lagQueue.reduce((e,t)=>e+t.rawBytes.length,0)}dispose(){if(!this.closed){m.debug("proxy","Client",`[DIAG-dispose] called \u2014 stack: ${(new Error().stack??"").split(`
`).slice(1,5).join(" | ").trim()}`),this.closed=!0,this._helloRetryTimer&&(clearTimeout(this._helloRetryTimer),this._helloRetryTimer=null),this.proxy.fireClientDisconnected(this);try{this.clientSocket.destroy()}catch{}try{this.serverSocket?.destroy()}catch{}this.clientBuffer.dispose(),this.serverBuffer.dispose(),m.log("Client","Disconnected.")}}send(e,t){try{let n=this.proxy.packetFactory.serialize(e),i=t?this.clientSendCipher:this.serverSendCipher,s=t?this.clientSocket:this.serverSocket;if(!s||s.destroyed)return;i.cipher(n),s.write(n)}catch(n){m.error("Client",`Send error (${t?"client":"server"})`,n),this.dispose()}}forwardRaw(e,t){try{let n=t?this.clientSendCipher:this.serverSendCipher,i=t?this.clientSocket:this.serverSocket;if(!t&&this.serverConnecting){let o=Buffer.from(e);n.cipher(o),this.pendingServerQueue.push(o);return}if(!i||i.destroyed){m.warn("Client",`[DIAG-forwardRaw] skipped \u2014 socket ${t?"client":"server"} is ${i?"destroyed":"null"}`);return}let s=Buffer.from(e);n.cipher(s),i.write(s)}catch(n){m.error("Client",`ForwardRaw error (${t?"client":"server"})`,n),this.dispose()}}flushPendingServerQueue(){if(this.pendingServerQueue.length!==0){m.log("Client",`Flushing ${this.pendingServerQueue.length} buffered packets to server`);for(let e of this.pendingServerQueue)this.serverSocket&&!this.serverSocket.destroyed&&this.serverSocket.write(e);this.pendingServerQueue=[]}}onClientData(e){m.log("Client",`[DIAG-onClientData] Received ${e.length} bytes (raw=${e.subarray(0,Math.min(32,e.length)).toString("hex")})`),this.processIncoming(e,!0)}onServerData(e){this._serverResponded||(this._serverResponded=!0,this._helloRetryCount=0,this._helloRetryTimer&&(clearTimeout(this._helloRetryTimer),this._helloRetryTimer=null)),this.processIncoming(e,!1)}processIncoming(e,t){let n=t?this.clientReceiveCipher:this.serverReceiveCipher,i=t?this.clientAccum:this.serverAccum;i.length===0?i=Buffer.from(e):i=Buffer.concat([i,e],i.length+e.length),t?this.clientAccum=i:this.serverAccum=i;try{for(;;){let s=t?this.clientAccum:this.serverAccum;if(s.length<4)break;let o=s.readInt32BE(0);if(o<=0||o>1048576){m.warn("Client",`Invalid packet length: ${o}, disconnecting`),this.dispose();return}if(s.length<o)break;let a=Buffer.alloc(o);s.copy(a,0,0,o);let l=s.subarray(o),c=Buffer.from(l);t?this.clientAccum=c:this.serverAccum=c,n.cipher(a);let u=this.proxy.packetFactory.createFromBytes(a);if(!t&&u.name==="FAILURE"&&u.isDefined&&m.warn("Client",`[DIAG-FAILURE] errorId=${u.data.errorId} errorMessage="${u.data.errorMessage}"`),t?this.proxy.fireClientPacket(this,u):this.proxy.fireServerPacket(this,u),u.send){let d=u.modified?this.proxy.packetFactory.serialize(u):u.rawBytes!==a?u.rawBytes:a;this.lagMode?this._lagQueue.push({rawBytes:Buffer.from(d),toClient:!t}):this.forwardRaw(d,!t)}}}catch(s){m.error("Client",`Process error (${t?"client":"server"})`,s),this.dispose()}}onError(e,t){if(this.closed)return;let n=t.code;if(m.debug("proxy","Client",`[DIAG-onError] source=${e} code=${n??"n/a"} message=${t.message}`),n==="ECONNRESET"||n==="EPIPE"){this.dispose();return}if(e==="server"&&!this._serverResponded&&this._pendingHello){if(this._helloRetryCount<r.HELLO_MAX_RETRIES){this._helloRetryCount++,this._helloIsRetrying=!0,m.warn("Client",`Server error before HELLO response (${n??t.message}) \u2014 retry ${this._helloRetryCount}/${r.HELLO_MAX_RETRIES}`),this.connectToServer(this._pendingHello);return}m.warn("Client",`Server unreachable after ${r.HELLO_MAX_RETRIES} retries (${n??t.message}) \u2014 giving up`),this.dispose();return}m.error("Client",`${e} socket error`,t),this.dispose()}};var Id=require("crypto"),Qi=class{guid;client;accountId="";conTargetAddress="54.241.208.233";conTargetPort=2050;gameId=-2;conRealKey=Buffer.alloc(0);pendingKeyRestore=!1;accessToken="";helloTemplate=null;helloKeyOffset=-1;store=new Map;constructor(e){this.guid=(0,Id.randomUUID)().replace(/-/g,""),this.client=e}get(e){return this.store.get(e)}set(e,t){this.store.set(e,t)}has(e){return this.store.has(e)}copyStoreFrom(e){for(let[t,n]of e.store)this.store.set(t,n)}};Q();jn();var w_=(0,Rt.join)((0,Ja.tmpdir)(),"rotmg_proxy_target.txt"),qa="rotmg_proxy_target_",iS=0;function sS(){return"c"+ ++iS+"_"+Date.now().toString(36)}var Zi=class r extends Ad.EventEmitter{constructor(t){super();this.packetFactory=t}static DEFAULT_SERVER="54.241.208.233";listener=null;states=new Map;packetHooks=new Map;commandHooks=new Map;pluginHooks=new Map;start(t="127.0.0.1",n=2050){m.log("Proxy",`Starting listener on ${t}:${n}...`),this.listener=Nd.default.createServer(i=>this.onLocalConnect(i)),this.listener.listen(n,t,()=>{m.log("Proxy",`Listening on ${t}:${n}`),this.emit("listenStarted")}),this.listener.on("error",i=>{m.error("Proxy",`Listener error: ${i.message}`,i)})}stop(){this.listener&&(m.log("Proxy","Stopping listener..."),this.listener.close(),this.listener=null,this.emit("listenStopped"))}getState(t,n){let i=n.length===0?"n/a":n.toString("utf8"),s=new Qi(t);if(this.states.set(s.guid,s),m.debug("reconnect","State",`Lookup \u2014 guid from key: "${i.slice(0,40)}", states count: ${this.states.size}, found: ${i!=="n/a"&&this.states.has(i)}`),i!=="n/a"&&this.states.has(i)){let o=this.states.get(i);s.conTargetAddress=o.conTargetAddress,s.conTargetPort=o.conTargetPort,s.conRealKey=o.conRealKey,s.pendingKeyRestore=!0,s.copyStoreFrom(o),m.debug("reconnect","State",`Restored from previous \u2014 address: ${o.conTargetAddress}, port: ${o.conTargetPort}, keyLen: ${o.conRealKey.length}`)}return s}hookPacket(t,n,i,s=!1){this.packetHooks.has(t)||this.packetHooks.set(t,[]);let o=this.packetHooks.get(t);if(s?o.unshift(n):o.push(n),i){this.pluginHooks.has(i)||this.pluginHooks.set(i,{packets:new Map,commands:new Map});let a=this.pluginHooks.get(i);a.packets.has(t)||a.packets.set(t,[]),a.packets.get(t).push(n)}}hookCommand(t,n,i){let s=t.startsWith("/")?t.slice(1).toLowerCase():t.toLowerCase();if(this.commandHooks.has(s)||this.commandHooks.set(s,[]),this.commandHooks.get(s).push(n),i){this.pluginHooks.has(i)||this.pluginHooks.set(i,{packets:new Map,commands:new Map});let o=this.pluginHooks.get(i);o.commands.has(s)||o.commands.set(s,[]),o.commands.get(s).push(n)}}unhookPlugin(t){let n=this.pluginHooks.get(t);if(n){for(let[i,s]of n.packets){let o=this.packetHooks.get(i);o&&this.packetHooks.set(i,o.filter(a=>!s.includes(a)))}for(let[i,s]of n.commands){let o=this.commandHooks.get(i);o&&this.commandHooks.set(i,o.filter(a=>!s.includes(a)))}this.pluginHooks.delete(t)}}fireServerPacket(t,n){this.listenerCount("serverPacket")>0&&this.emit("serverPacket",t,n),this.firePacketHooks(t,n),n.name==="UPDATE"&&(n.send=!0)}fireClientPacket(t,n){if(n.name==="PLAYERTEXT"&&n.isDefined&&this.commandHooks.size>0){let s=n.data.text.replace("/","").toLowerCase().split(" "),o=s[0],a=s.slice(1),l=this.commandHooks.get(o);if(l&&l.length>0){let c=!1;for(let u of l)try{u(t,o,a)!==!1&&(c=!0)}catch(d){m.error("Proxy",`Command handler error for /${o}`,d)}c&&(n.send=!1)}}this.listenerCount("clientPacket")>0&&this.emit("clientPacket",t,n),this.firePacketHooks(t,n)}fireClientConnected(t){this.emit("clientConnected",t)}fireClientDisconnected(t){this.emit("clientDisconnected",t)}firePacketHooks(t,n){let i=this.packetHooks.get(n.name);if(!(!i||i.length===0))for(let s of i)try{s(t,n)}catch(o){m.error("Proxy",`Packet hook error for ${n.name}`,o)}}getTargetDirectories(){let t=new Set;t.add((0,Ja.tmpdir)());try{let n=bt.findAll();for(let i of n)t.add((0,Rt.resolve)(i,"..","..","Temp")),t.add((0,Rt.resolve)(i,"..","..","temp")),t.add((0,Rt.resolve)(i,"..","..","..","windows","temp"))}catch{}return Array.from(t).filter(n=>{try{return(0,Nt.existsSync)(n)}catch{return!1}})}lastKnownServerIp=r.DEFAULT_SERVER;readOriginalTarget(){for(let t of this.getTargetDirectories()){let n=this.readTargetFile((0,Rt.join)(t,"rotmg_proxy_target.txt"));if(n)return this.lastKnownServerIp=n,n}return this.lastKnownServerIp&&this.lastKnownServerIp!==r.DEFAULT_SERVER?this.lastKnownServerIp:(m.warn("Proxy",`No DLL target found in any temp directories, using default: ${r.DEFAULT_SERVER}`),r.DEFAULT_SERVER)}onLocalConnect(t){m.log("Proxy","Client connected.");let n=new Xi(this,t);n.clientId=sS(),n.originalTargetIp=this.readOriginalTargetForSocket(t),n.originalTargetIp&&n.originalTargetIp!=="127.0.0.1"&&(this.lastKnownServerIp=n.originalTargetIp),this.emit("clientBeginConnect",n)}readOriginalTargetForSocket(t){let n=t.remotePort,i=this.getTargetDirectories();if(n)if(process.platform==="win32")try{let s=(0,Od.execFileSync)("powershell.exe",["-NonInteractive","-NoProfile","-Command",`(Get-NetTCPConnection -LocalPort ${n} -RemotePort 2050 -State Established -ErrorAction SilentlyContinue | Select-Object -First 1).OwningProcess`],{encoding:"utf8",timeout:2e3,windowsHide:!0}).trim(),o=parseInt(s,10);if(Number.isFinite(o)&&o>0)for(let a of i){let l=(0,Rt.join)(a,`${qa}${o}.txt`),c=this.readTargetFile(l);if(c)return this.lastKnownServerIp=c,c}}catch{}else for(let s of i)try{for(let o of(0,Nt.readdirSync)(s))if(o.startsWith(qa)&&o.endsWith(".txt")){let a=(0,Rt.join)(s,o),l=this.readTargetFile(a);if(l)return this.lastKnownServerIp=l,l}}catch{}return this.readOriginalTarget()}readTargetFile(t){try{if((0,Nt.existsSync)(t)){let n=(0,Nt.readFileSync)(t,"utf8").trim();if(n&&/^\d+\.\d+\.\d+\.\d+$/.test(n)&&n!=="127.0.0.1")return m.log("Proxy",`DLL hook target (${t}): ${n}`),n}}catch{}return""}cleanStalePidFiles(){for(let t of this.getTargetDirectories())try{for(let n of(0,Nt.readdirSync)(t))if(n.startsWith(qa)&&n.endsWith(".txt"))try{(0,Nt.unlinkSync)((0,Rt.join)(t,n))}catch{}}catch{}}};var Ka=require("fs");var Tr=class{buffer;_offset;constructor(e,t=0){this.buffer=e,this._offset=t}get position(){return this._offset}get length(){return this.buffer.length}get remaining(){return this.buffer.length-this._offset}readByte(){let e=this.buffer.readUInt8(this._offset);return this._offset+=1,e}readSByte(){let e=this.buffer.readInt8(this._offset);return this._offset+=1,e}readBool(){return this.readByte()!==0}readInt16(){let e=this.buffer.readInt16BE(this._offset);return this._offset+=2,e}readUInt16(){let e=this.buffer.readUInt16BE(this._offset);return this._offset+=2,e}readInt32(){let e=this.buffer.readInt32BE(this._offset);return this._offset+=4,e}readUInt32(){let e=this.buffer.readUInt32BE(this._offset);return this._offset+=4,e}readFloat(){let e=this.buffer.readFloatBE(this._offset);return this._offset+=4,e}readString(){let e=this.readInt16();if(e<0||e>this.remaining)throw new Error(`Invalid string length: ${e}, remaining: ${this.remaining}`);let t=this.buffer.toString("utf8",this._offset,this._offset+e);return this._offset+=e,t}readUtf32String(){let e=this.readInt32();if(e<0||e>this.remaining)throw new Error(`Invalid utf32 string length: ${e}, remaining: ${this.remaining}`);let t=this.buffer.toString("utf8",this._offset,this._offset+e);return this._offset+=e,t}readBytes(e){if(e<0||e>this.remaining)throw new Error(`Cannot read ${e} bytes, remaining: ${this.remaining}`);let t=Buffer.alloc(e);return this.buffer.copy(t,0,this._offset,this._offset+e),this._offset+=e,t}readRemainingBytes(){return this.readBytes(this.remaining)}readCompressedInt(){let e=this.readByte(),t=(e&64)!==0,n=6,i=e&63;for(;(e&128)!==0;)e=this.readByte(),i|=(e&127)<<n,n+=7;return t?-i:i}};var Fn=class{chunks=[];_length=0;get length(){return this._length}writeByte(e){let t=Buffer.alloc(1);t.writeUInt8(e&255,0),this.chunks.push(t),this._length+=1}writeSByte(e){let t=Buffer.alloc(1);t.writeInt8(e,0),this.chunks.push(t),this._length+=1}writeBool(e){this.writeByte(e?1:0)}writeInt16(e){let t=Buffer.alloc(2);t.writeInt16BE(e,0),this.chunks.push(t),this._length+=2}writeUInt16(e){let t=Buffer.alloc(2);t.writeUInt16BE(e,0),this.chunks.push(t),this._length+=2}writeInt32(e){let t=Buffer.alloc(4);t.writeInt32BE(e,0),this.chunks.push(t),this._length+=4}writeUInt32(e){let t=Buffer.alloc(4);t.writeUInt32BE(e,0),this.chunks.push(t),this._length+=4}writeFloat(e){let t=Buffer.alloc(4);t.writeFloatBE(e,0),this.chunks.push(t),this._length+=4}writeString(e){let t=Buffer.from(e,"utf8");this.writeInt16(t.length),this.chunks.push(t),this._length+=t.length}writeUtf32String(e){let t=Buffer.from(e,"utf8");this.writeInt32(t.length),this.chunks.push(t),this._length+=t.length}writeBytes(e){this.chunks.push(Buffer.from(e)),this._length+=e.length}writeCompressedInt(e){let t=e<0,n=t?-e:e,i=n&63;t&&(i|=64),n=n>>>6;let s=n>0;for(s&&(i|=128),this.writeByte(i);s;){let o=n&127;n=n>>>7,s=n>0,s&&(o|=128),this.writeByte(o)}}toBuffer(){return Buffer.concat(this.chunks,this._length)}static writeInt32At(e,t,n=0){e.writeInt32BE(t,n)}};function es(r,e,t="unknown"){return{id:r,name:e,direction:t,send:!0,modified:!1,data:{},rawBytes:Buffer.alloc(0),unreadData:Buffer.alloc(0),isDefined:!1,bodyLength:0}}Q();var ts=class{definitions=new Map;nameToId=new Map;dataObjects=new Map;stringStatIds=new Set;constructor(e,t){let n=typeof e=="string"?JSON.parse((0,Ka.readFileSync)(e,"utf8")):e,i=typeof t=="string"?JSON.parse((0,Ka.readFileSync)(t,"utf8")):t;for(let[s,o]of Object.entries(n.packets)){let a=parseInt(s,10);this.definitions.set(a,o),this.nameToId.set(o.name,a)}for(let[s,o]of Object.entries(n.dataObjects))this.dataObjects.set(s,o);for(let s of i.stringStats)this.stringStatIds.add(s);m.log("PacketFactory",`Loaded ${this.definitions.size} packet definitions, ${this.dataObjects.size} data objects`)}createFromBytes(e){let t=e[4],n=this.definitions.get(t);if(!n){let s=es(t,`UNKNOWN_${t}`,"unknown");return s.rawBytes=e,s.bodyLength=e.length-5,s.unreadData=e.subarray(5),s}let i=es(t,n.name,n.direction);i.rawBytes=e,i.bodyLength=e.length-5,i.isDefined=!0;try{let s=new Tr(e,5);i.data=this.readFields(s,n.fields),s.remaining>0&&(i.unreadData=s.readRemainingBytes())}catch(s){m.warn("PacketFactory",`Failed to parse ${n.name} (id=${t}): ${s.message}`),i.isDefined=!1,i.data={},i.unreadData=e.subarray(5)}return i}createByName(e){let t=this.nameToId.get(e);if(t===void 0)throw new Error(`Unknown packet name: ${e}`);let n=this.definitions.get(t),i=es(t,e,n.direction);return i.isDefined=!0,i}serialize(e){if(!e.isDefined)return e.rawBytes;let t=this.definitions.get(e.id);if(!t)return e.rawBytes;let n=new Fn;n.writeInt32(0),n.writeByte(e.id);try{this.writeFields(n,t.fields,e.data),e.unreadData.length>0&&n.writeBytes(e.unreadData)}catch(s){return m.warn("PacketFactory",`Failed to serialize ${e.name}: ${s.message}`),e.rawBytes}let i=n.toBuffer();return Fn.writeInt32At(i,i.length,0),i}getPacketName(e){return this.definitions.get(e)?.name??`UNKNOWN_${e}`}getPacketId(e){return this.nameToId.get(e)}readFields(e,t){let n={},i=0;for(let s of t){if(s.optional&&e.remaining<=0){n[s.name]=s.default;continue}let o=this.readField(e,s,()=>i);n[s.name]=o,s.name==="id"&&typeof o=="number"&&(i=o)}return n}readField(e,t,n){switch(t.type){case"byte":return e.readByte();case"sbyte":return e.readSByte();case"bool":return e.readBool();case"int16":return e.readInt16();case"uint16":return e.readUInt16();case"int32":return e.readInt32();case"uint32":return e.readUInt32();case"float":return e.readFloat();case"string":return e.readString();case"utf32string":return e.readUtf32String();case"compressedInt":return e.readCompressedInt();case"byteArray16":{let i=e.readInt16();return e.readBytes(i)}case"byteArray32":{let i=e.readInt32();return e.readBytes(i)}case"statValue":{let i=n();return this.stringStatIds.has(i)?e.readString():e.readCompressedInt()}case"array":return this.readArray(e,t,n);default:{let i=this.dataObjects.get(t.type);if(i)return this.readDataObject(e,i);throw new Error(`Unknown field type: ${t.type}`)}}}readArray(e,t,n){let i;switch(t.lengthType){case"int16":i=e.readInt16();break;case"uint16":i=e.readUInt16();break;case"int32":i=e.readInt32();break;case"compressedInt":i=e.readCompressedInt();break;case"byte":i=e.readByte();break;default:i=e.readInt16();break}let s=[],o={name:"_element",type:t.elementType};for(let a=0;a<i;a++)s.push(this.readField(e,o,n));return s}readDataObject(e,t){return this.readFields(e,t.fields)}writeFields(e,t,n){let i=0;for(let s of t){let o=n[s.name];s.optional&&o===void 0||s.optional&&o===s.default||(this.writeField(e,s,o,()=>i),s.name==="id"&&typeof o=="number"&&(i=o))}}writeField(e,t,n,i){switch(t.type){case"byte":e.writeByte(n);break;case"sbyte":e.writeSByte(n);break;case"bool":e.writeBool(n);break;case"int16":e.writeInt16(n);break;case"uint16":e.writeUInt16(n);break;case"int32":e.writeInt32(n);break;case"uint32":e.writeUInt32(n);break;case"float":e.writeFloat(n);break;case"string":e.writeString(n??"");break;case"utf32string":e.writeUtf32String(n??"");break;case"compressedInt":e.writeCompressedInt(n??0);break;case"byteArray16":{let s=Buffer.isBuffer(n)?n:Buffer.alloc(0);e.writeInt16(s.length),e.writeBytes(s);break}case"byteArray32":{let s=Buffer.isBuffer(n)?n:Buffer.alloc(0);e.writeInt32(s.length),e.writeBytes(s);break}case"statValue":{let s=i();this.stringStatIds.has(s)?e.writeString(n??""):e.writeCompressedInt(n??0);break}case"array":{this.writeArray(e,t,n??[],i);break}default:{let s=this.dataObjects.get(t.type);if(s)this.writeDataObject(e,s,n??{});else throw new Error(`Unknown field type: ${t.type}`)}}}writeArray(e,t,n,i){switch(t.lengthType){case"int16":e.writeInt16(n.length);break;case"uint16":e.writeUInt16(n.length);break;case"int32":e.writeInt32(n.length);break;case"compressedInt":e.writeCompressedInt(n.length);break;case"byte":e.writeByte(n.length);break;default:e.writeInt16(n.length);break}let s={name:"_element",type:t.elementType};for(let o of n)this.writeField(e,s,o,i)}writeDataObject(e,t,n){this.writeFields(e,t.fields,n)}};Q();Bn();var Md="__LFG_dllFeatureBus_v1";function Dd(){let r=globalThis,e=r[Md];return e||(e={sender:null},r[Md]=e),e}var N_=`bus_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`;function za(r){Dd().sender=r}function rs(r,e){let t=Dd();return t.sender?(t.sender(r,e),!0):!1}function aS(r){try{let e=5;e+=4;let t=r.readInt16BE(e);e+=2+t;let n=r.readInt16BE(e);return e+=2+n,e+=4,e}catch{return-1}}function lS(r,e,t){let n=r.readInt16BE(e),i=r.subarray(0,e),s=r.subarray(e+2+n),o=Buffer.alloc(i.length+2+t.length+s.length),a=0;return i.copy(o,a),a+=i.length,o.writeInt16BE(t.length,a),a+=2,t.copy(o,a),a+=t.length,s.copy(o,a),o.writeInt32BE(o.length,0),o}var ns=class{proxy;attach(e){this.proxy=e,e.hookPacket("HELLO",(t,n)=>this.onHello(t,n)),e.hookPacket("RECONNECT",(t,n)=>this.onReconnect(t,n))}onHello(e,t){rs("playerColliderSceneReset",1);let n=t.data.key,i=Buffer.isBuffer(n)?n.toString("hex"):"not-a-buffer",s=Buffer.isBuffer(n)?n.toString("utf8"):"";m.debug("reconnect","Reconnect",`[HELLO] Received \u2014 key (${Buffer.isBuffer(n)?n.length:0} bytes): ${i}`),m.debug("reconnect","Reconnect",`[HELLO] Key as UTF-8: "${s}"`),e.state=this.proxy.getState(e,n),t.rawBytes.length>0&&(e.state.helloTemplate=Buffer.from(t.rawBytes),e.state.helloKeyOffset=aS(e.state.helloTemplate),m.debug("reconnect","Reconnect",`[HELLO] Captured template (${e.state.helloTemplate.length} bytes, keyOffset=${e.state.helloKeyOffset})`));let o=t.data.gameId;typeof o=="number"&&Number.isFinite(o)&&(e.state.gameId=o);let a=t.data.accessToken;if(a&&(e.state.accessToken=a),m.debug("reconnect","Reconnect",`[HELLO] State lookup \u2014 conTargetAddress: ${e.state.conTargetAddress}, conTargetPort: ${e.state.conTargetPort}`),m.debug("reconnect","Reconnect",`[HELLO] State lookup \u2014 conRealKey (${e.state.conRealKey.length} bytes): ${e.state.conRealKey.toString("hex").slice(0,80)}`),e.originalTargetIp&&e.originalTargetIp!=="127.0.0.1"&&(e.state.conTargetAddress==="54.241.208.233"||!e.state.conTargetAddress)?(m.debug("reconnect","Reconnect",`[HELLO] Overriding default server with DLL target: ${e.originalTargetIp}`),e.state.conTargetAddress=e.originalTargetIp):this.proxy.lastKnownServerIp&&this.proxy.lastKnownServerIp!=="54.241.208.233"&&e.state.conTargetAddress==="54.241.208.233"&&(m.debug("reconnect","Reconnect",`[HELLO] Overriding default server with last known server: ${this.proxy.lastKnownServerIp}`),e.state.conTargetAddress=this.proxy.lastKnownServerIp),e.state.pendingKeyRestore){let l=e.state.conRealKey;m.debug("reconnect","Reconnect",`[HELLO] Restoring key (${l.length} bytes): ${l.toString("hex").slice(0,80)||"(empty \u2014 fresh connection)"}`),e.state.helloTemplate&&e.state.helloKeyOffset>=0?(t.rawBytes=lS(e.state.helloTemplate,e.state.helloKeyOffset,l),m.debug("reconnect","Reconnect",`[HELLO] Patched raw template (${t.rawBytes.length} bytes)`)):(m.warn("Reconnect","[HELLO] No raw template available, falling back to re-serialization"),t.data.key=l,t.modified=!0),e.state.conRealKey=Buffer.alloc(0),e.state.pendingKeyRestore=!1}else m.debug("reconnect","Reconnect","[HELLO] First connection \u2014 keeping original key");if(It.enabled("reconnect")&&t.rawBytes.length>0){let l=this.proxy.packetFactory.serialize(t),c=t.rawBytes;if(c.length!==l.length)m.debug("reconnect","Reconnect",`[HELLO DIAG] SIZE MISMATCH: original=${c.length} serialized=${l.length}`);else{let u=-1;for(let d=0;d<c.length;d++)if(c[d]!==l[d]){u=d;break}u>=0?(m.debug("reconnect","Reconnect",`[HELLO DIAG] BYTE MISMATCH at offset ${u}: orig=0x${c[u].toString(16)} ser=0x${l[u].toString(16)}`),m.debug("reconnect","Reconnect",`[HELLO DIAG] orig[${u}-${Math.min(u+20,c.length)}]: ${c.subarray(u,u+20).toString("hex")}`),m.debug("reconnect","Reconnect",`[HELLO DIAG]  ser[${u}-${Math.min(u+20,l.length)}]: ${l.subarray(u,u+20).toString("hex")}`)):m.debug("reconnect","Reconnect",`[HELLO DIAG] Bytes match perfectly (${c.length} bytes)`)}}m.log("Reconnect",`[HELLO] Connecting to server ${e.state.conTargetAddress}:${e.state.conTargetPort}`),e.connectToServer(t),t.send=!1}onReconnect(e,t){let n=t.data.host,i=t.data.port,s=t.data.gameId,o=t.data.keyTime,a=t.data.key,l=t.data.name;m.log("Reconnect",`[RECONNECT] Received \u2014 name: "${l}", host: "${n}", port: ${i}, gameId: ${s}, keyTime: ${o}`),m.debug("reconnect","Reconnect",`[RECONNECT] Key (${Buffer.isBuffer(a)?a.length:0} bytes): ${Buffer.isBuffer(a)?a.toString("hex").slice(0,80):"not-a-buffer"}`),m.debug("reconnect","Reconnect",`[RECONNECT] Raw packet size: ${t.rawBytes.length}, isDefined: ${t.isDefined}`),t.unreadData.length>0&&m.log("Reconnect",`[RECONNECT] WARNING: ${t.unreadData.length} unread trailing bytes`),typeof s=="number"&&Number.isFinite(s)&&(e.state.gameId=s),n&&n!==""&&(e.state.conTargetAddress=n),i!==void 0&&i!==0&&(e.state.conTargetPort=i),a&&Buffer.isBuffer(a)&&a.length>0&&(e.state.conRealKey=Buffer.from(a)),m.debug("reconnect","Reconnect",`[RECONNECT] Stored \u2014 address: ${e.state.conTargetAddress}, port: ${e.state.conTargetPort}, keyLen: ${e.state.conRealKey.length}`);let c=t.rawBytes,u=Buffer.from(e.state.guid,"utf8"),d="127.0.0.1",p=2050;try{let f=5,h=c.readInt16BE(f);f+=2+h;let g=f,y=c.readInt16BE(f);f+=2+y;let b=f;f+=2,f+=4,f+=4;let S=f,E=c.readInt16BE(f);f+=2+E;let I=c.subarray(f),A=c.subarray(0,g),j=Buffer.from(d,"utf8"),F=c.subarray(b+2,S),M=A.length+2+j.length+2+F.length+2+u.length+I.length,O=Buffer.alloc(M),L=0;A.copy(O,L),L+=A.length,O.writeInt16BE(j.length,L),L+=2,j.copy(O,L),L+=j.length,O.writeUInt16BE(p,L),L+=2,F.copy(O,L),L+=F.length,O.writeInt16BE(u.length,L),L+=2,u.copy(O,L),L+=u.length,I.copy(O,L),O.writeInt32BE(O.length,0),t.rawBytes=O,m.debug("reconnect","Reconnect",`[RECONNECT] Raw-patched (${O.length} bytes) \u2014 host: ${d}, port: ${p}, guid: "${e.state.guid}"`)}catch(f){m.warn("Reconnect",`[RECONNECT] Raw patch failed (${f.message}), falling back to re-serialization`),t.data.key=u,t.data.host=d,t.data.port=p,t.modified=!0}}};var is=require("fs"),$d=require("path");Q();var cS=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;function Ld(r){return r.replace(/[^A-Z0-9]/g,"")}function Bd(r,e,t){let n=(0,$d.join)(e,"servers.json"),i=t?{...t}:{},s=new Map,o=new Map;if(!t&&(0,is.existsSync)(n))try{i=JSON.parse((0,is.readFileSync)(n,"utf8"));for(let[c,u]of Object.entries(i)){s.set(u,c);let d=Ld(c).toLowerCase();d&&!o.has(d)&&o.set(d,c)}m.log("CoreCommands",`Loaded ${Object.keys(i).length} servers, /ip and /con ready`)}catch(c){m.warn("CoreCommands",`Failed to load servers.json: ${c.message}`)}else if(t){for(let[c,u]of Object.entries(i)){s.set(u,c);let d=Ld(c).toLowerCase();d&&!o.has(d)&&o.set(d,c)}m.log("CoreCommands",`Loaded ${Object.keys(i).length} baked servers, /ip and /con ready`)}function a(c,u,d){let p=r.packetFactory.createByName("TEXT");p.data={name:u,objectId:-1,numStars:-1,bubbleTime:0,recipient:"",text:d,cleanText:d,isSupporter:!1,starBg:0},c.sendToClient(p)}function l(c,u,d){if(!c.state){a(c,"Proxy","No connection state \u2014 cannot switch.");return}m.log("CoreCommands",`Switching to ${u} (${d})...`),a(c,"Proxy",`Connecting to ${u}...`),c.state.conTargetAddress=d,c.state.conTargetPort=2050,c.state.conRealKey=Buffer.alloc(0);let p=r.packetFactory.createByName("RECONNECT");p.data={name:u,host:"127.0.0.1",port:2050,gameId:-2,keyTime:-1,key:Buffer.from(c.state.guid,"utf8")},p.modified=!0,c.sendToClient(p)}r.hookCommand("ip",(c,u,d)=>{if(!c.state){a(c,"Proxy","Not connected.");return}let p=c.state.conTargetAddress||"",f=s.get(p)||"(unknown)";a(c,"Proxy",`${f}: ${p}`)}),r.hookCommand("con",(c,u,d)=>{let p=Object.keys(i);if(p.length===0){a(c,"Proxy","No servers loaded.");return}if(d.length===0){a(c,"Proxy",`Servers: ${p.join(", ")}. Use /con <name, abbr, or ip> e.g. /con USS3 or /con 54.234.226.24`);return}let f=d[0];if(cS.test(f)){let b=f,S=s.get(b)||b;l(c,S,b);return}let h=f.toLowerCase(),g=o.get(h);if(g){l(c,g,i[g]);return}let y=p.filter(b=>b.toLowerCase().startsWith(h));if(y.length===0){a(c,"Proxy",`No server matching "${d[0]}". Try /con for list.`);return}if(y.length>1){let b=y.find(S=>S.toLowerCase()===h);if(b){l(c,b,i[b]);return}a(c,"Proxy",`Ambiguous: ${y.join(", ")}`);return}l(c,y[0],i[y[0]])})}Q();var Hd=require("fs"),Wd=require("path"),Gd=require("os"),jd=(0,Wd.join)((0,Gd.tmpdir)(),"realm-engine-statdump.jsonl"),uS=process.env.RE_STAT_DUMP==="1",dS={0:"MAX_HP(0)",1:"HP(1)",3:"MAX_MP(3)",4:"MP(4)",7:"LEVEL(7)",20:"ATTACK(20)",21:"DEFENSE(21)",22:"SPEED(22)",26:"VITALITY(26)",27:"WISDOM(27)",28:"DEXTERITY(28)",46:"MAXHP_BOOST(46)",47:"MAXMP_BOOST(47)",48:"ATTACK_BOOST(48)",49:"DEFENSE_BOOST(49)",50:"SPEED_BOOST(50)",51:"VIT_BOOST(51)",52:"WIS_BOOST(52)",53:"DEX_BOOST(53)",105:"EXALTED_ATT(105)",106:"EXALTED_DEF(106)",107:"EXALTED_SPD(107)",108:"EXALTED_VIT(108)",109:"EXALTED_DEX(109)",110:"EXALTED_WIS(110)",111:"EXALTED_HP(111)",112:"EXALTED_MP(112)"},Fd=!1;function Ya(r,e){if(!(!uS||!Array.isArray(r)||r.length===0))try{let t={},n={};for(let s of r){let o=Number(s.id);n[String(o)]=s.value,t[dS[o]??`id_${o}`]=s.value}let i=JSON.stringify({t:new Date().toISOString(),source:e,labelled:t,raw:n})+`
`;(0,Hd.appendFileSync)(jd,i),Fd||(Fd=!0,console.log(`[StatDump] RE_STAT_DUMP active \u2192 ${jd}`))}catch{}}function ss(r,e){let t=String(r??e??"").trim();if(!t)return"";let n=t.match(/^\{s\.([^}]+)\}$/i);if(!n)return t;let i=String(n[1]||"").trim(),o=(i.includes(".")&&i.split(".").pop()||i).replace(/[_-]+/g," ").replace(/\s+/g," ").trim();return o?o.toLowerCase()==="rotmg"?"Realm":o:t}var os=class{proxy=null;dllDefenseSource=null;defenseCalibrated=!1;setDllDefenseSource(e){this.dllDefenseSource=e}checkDefenseCalibration(e){let t=this.dllDefenseSource?this.dllDefenseSource():null;if(t===null){this.defenseCalibrated=!1;return}if(this.defenseCalibrated)return;let n=e.defense,i=e.defense+e.defenseBonus,s=Math.abs(t-n)<=1,o=Math.abs(t-i)<=1;s&&o||(this.defenseCalibrated=!0,s?m.log("DefenseCheck",`DEFENSE(21)=${n} == DLL memory ${t} \u2192 stat 21 is EFFECTIVE; 'pd.defense + pd.defenseBonus' (${i}) double-counts. AutoNexus already uses the memory value.`):o?m.log("DefenseCheck",`DEFENSE(21)+DEFENSE_BOOST(49)=${i} == DLL memory ${t} \u2192 stat 21 is BASE; the bonus add is correct.`):m.warn("DefenseCheck",`Neither wire base (${n}) nor base+bonus (${i}) == DLL memory ${t} \u2014 stat-type drift or wrong memory field. Inspect with RE_STAT_DUMP=1.`))}attach(e){this.proxy=e,e.hookPacket("CREATESUCCESS",(t,n)=>this.onCreateSuccess(t,n)),e.hookPacket("MAPINFO",(t,n)=>this.onMapInfo(t,n)),e.hookPacket("UPDATE",(t,n)=>this.onUpdate(t,n)),e.hookPacket("NEWTICK",(t,n)=>this.onNewTick(t,n)),e.hookPacket("MOVE",(t,n)=>this.onMove(t,n)),e.hookPacket("TELEPORT",(t,n)=>this.onTeleport(t,n)),e.hookPacket("GOTO",(t,n)=>this.onGoto(t,n)),e.hookPacket("PLAYERSHOOT",(t,n)=>this.onPlayerShoot(t,n)),e.hookPacket("PONG",(t,n)=>this.onPong(t,n)),e.hookPacket("QUESTOBJECTID",(t,n)=>this.onQuestObjectId(t,n))}onQuestObjectId(e,t){if(!t.isDefined)return;let n=Math.trunc(Number(t.data.objectId));e.playerData.questObjectId=Number.isFinite(n)?n:-1}onCreateSuccess(e,t){e.playerData=new Yr,e.playerData.ownerObjectId=t.data.objectId,e.lastTeleportSentAt=0,e.lastTeleportGotoAt=0,e.pendingTeleportSentAt=0,e.pendingTeleportTargetObjectId=null,m.log("State",`Player created with objectId ${t.data.objectId}`)}onMapInfo(e,t){let n=t.data.displayName??"",i=t.data.name??"";e.playerData.mapName=ss(n,i),e.playerData.mapWidth=t.data.width??0,e.playerData.mapHeight=t.data.height??0,e.playerData.teleportAllowed=t.data.allowPlayerTeleport??!1,e.pendingTeleportSentAt=0,e.pendingTeleportTargetObjectId=null,e.playerData.vaultContent=[],e.playerData.vaultChestObjectId=-1,e.playerData.questObjectId=-1,m.log("State",`Map: ${t.data.name} (${t.data.width}x${t.data.height})`)}onUpdate(e,t){if(!(!t.isDefined||!t.data.newObjs))for(let n of t.data.newObjs){let i=n.status;if(i&&i.objectId===e.objectId){let s=Number(n.objectType);Number.isFinite(s)&&s>0&&(e.playerData.classType=Math.trunc(s)),e.playerData.pos={...i.position},i.data&&(e.playerData.parseStatus(i.data),Ya(i.data,"UPDATE"),this.checkDefenseCalibration(e.playerData),e.playerData.accountId&&e.state&&(e.state.accountId||(e.state.accountId=e.playerData.accountId)))}}}onNewTick(e,t){if(!(!t.isDefined||!t.data.statuses)){t.data.tickId!==void 0&&(e.lastNewTickId=Number(t.data.tickId)||0),t.data.serverRealTimeMs!==void 0&&(e.lastServerRealTimeMs=Number(t.data.serverRealTimeMs)||0);for(let n of t.data.statuses)n.objectId===e.objectId&&(n.position&&(e.playerData.pos={...n.position}),n.data&&(e.playerData.parseStatus(n.data),Ya(n.data,"NEWTICK"),this.checkDefenseCalibration(e.playerData)))}}onMove(e,t){if(t.isDefined&&(e.lastClientMoveAt=Date.now(),e.previousTime=t.data.serverRealTimeMSofLastNewTick??0,e.lastServerRealTimeMs=Number(t.data.serverRealTimeMSofLastNewTick??e.lastServerRealTimeMs)||0,e.lastUpdate=Date.now(),e.relativeTime===0)){let n=t.data.records;n&&n.length>0&&n[0].time&&(e.relativeTime=n[0].time-Date.now())}}onTeleport(e,t){t.isDefined&&(e.lastTeleportSentAt=Date.now(),e.pendingTeleportSentAt=e.lastTeleportSentAt,e.pendingTeleportTargetObjectId=Number(t.data.objectId??0)||null)}onGoto(e,t){if(!t.isDefined||Number(t.data.objectId??-1)!==e.objectId)return;t.data.position&&(e.playerData.pos={...t.data.position});let n=Date.now();e.pendingTeleportSentAt>0&&n-e.pendingTeleportSentAt<=5e3?(e.lastTeleportGotoAt=n,e.pendingTeleportSentAt=0,e.pendingTeleportTargetObjectId=null):e.pendingTeleportSentAt>0&&n-e.pendingTeleportSentAt>5e3&&(e.pendingTeleportSentAt=0,e.pendingTeleportTargetObjectId=null)}onPong(e,t){t.isDefined&&e.relativeTime===0&&t.data.time&&(e.relativeTime=t.data.time-Date.now())}onPlayerShoot(e,t){if(!t.isDefined)return;e.relativeTime===0&&(e.relativeTime=(t.data.time??0)-Date.now());let n=t.data.projectilePosition,i=t.data.angle??0;n&&(e.playerData.pos={x:n.x-Math.cos(i)*.3,y:n.y-Math.sin(i)*.3}),e.lastUpdate=Date.now()}};function Hn(){return{partyId:null,inParty:!1,members:new Map,localPartyPlayerId:null}}var as=class{sessions=new WeakMap;session(e){let t=this.sessions.get(e);return t||(t=Hn(),this.sessions.set(e,t)),t}attach(e){e.hookPacket("INCOMINGPARTYMEMBERINFO",(t,n)=>this.onIncomingPartyMemberInfo(t,n)),e.hookPacket("PARTYMEMBERADDED",(t,n)=>this.onPartyMemberAdded(t,n)),e.hookPacket("PARTYACTION",(t,n)=>this.onPartyAction(t,n)),e.hookPacket("CREATESUCCESS",t=>{this.sessions.set(t,Hn())}),e.on("clientDisconnected",t=>{this.sessions.set(t,Hn())})}isInParty(e){return e?this.sessions.get(e)?.inParty??!1:!1}getMembersSnapshot(e){if(!e)return[];let t=this.sessions.get(e);return!t||t.members.size===0?[]:[...t.members.values()].sort((n,i)=>n.playerId-i.playerId)}getLocalPartyPlayerId(e){return e?this.sessions.get(e)?.localPartyPlayerId??null:null}clearParty(e){e&&this.sessions.set(e,Hn())}syncLocalPartyPlayerIdFromMembers(e,t){let n=(e.playerData.name||"").trim().toLowerCase();if(!n){t.localPartyPlayerId=null;return}for(let i of t.members.values())if(i.playerName.trim().toLowerCase()===n){t.localPartyPlayerId=i.playerId;return}t.localPartyPlayerId=null}onIncomingPartyMemberInfo(e,t){if(!t.isDefined)return;let n=this.session(e),i=t.data,s=Number(i.partyId);n.partyId=Number.isFinite(s)?s>>>0:null,n.members.clear();let o=Array.isArray(i.partyPlayers)?i.partyPlayers:[];for(let a of o){let l=Math.trunc(Number(a.playerId));if(!Number.isFinite(l)||l<0||l>65535)continue;let c=l&65535;n.members.set(c,{playerId:c,playerName:typeof a.name=="string"?a.name:"",classId:Math.trunc(Number(a.classId))&65535})}n.inParty=n.members.size>0,this.syncLocalPartyPlayerIdFromMembers(e,n)}onPartyMemberAdded(e,t){if(!t.isDefined)return;let n=this.session(e),i=t.data,s=Math.trunc(Number(i.playerId));if(!Number.isFinite(s)||s<0||s>65535)return;let o=s&65535;n.members.set(o,{playerId:o,playerName:typeof i.name=="string"?i.name:"",classId:Math.trunc(Number(i.classId))&65535}),n.inParty=!0,this.syncLocalPartyPlayerIdFromMembers(e,n)}onPartyAction(e,t){if(!t.isDefined)return;let n=t.data;if(Number(n.actionId)!==6)return;let i=Math.trunc(Number(n.playerId));if(!Number.isFinite(i)||i<0||i>65535)return;let s=this.session(e),o=i&65535,a=s.localPartyPlayerId;if(a!==null&&o===a){this.sessions.set(e,Hn());return}s.members.delete(o),s.members.size===0&&(s.inParty=!1,s.partyId=null,s.localPartyPlayerId=null)}};var nt=require("fs"),gp=require("os"),Ve=require("path"),yp=require("url");var ue=G(fe(),1);var sf=require("node:module"),$l=(0,sf.createRequire)(__importMetaUrl),At=$l("@realmengine/sdk/dist/vault/VaultChest.js").VaultChest,Jn=$l("@realmengine/sdk/dist/vault/GiftChest.js").GiftChest,$=$l("@realmengine/sdk/dist/self/Self.js").Self;var ew={maxHP:0,maxMP:0,attack:0,defense:0,speed:0,dexterity:0,vitality:0,wisdom:0},tw={maxHP:0,maxMP:0,attack:0,defense:0,speed:0,dexterity:0,vitality:0,wisdom:0},rw={maxHP:0,maxMP:0,attack:0,defense:0,speed:0,dexterity:0,vitality:0,wisdom:0};function J(r){return r.clientRef.current?.playerData??null}var of={[ue.StatusEffect.CURSED]:"Curse",[ue.StatusEffect.SLOWED]:"Slowed",[ue.StatusEffect.STUNNED]:"Stunned",[ue.StatusEffect.BLIND]:"Blind",[ue.StatusEffect.HALLUCINATING]:"Hallucinating",[ue.StatusEffect.DRUNK]:"Drunk",[ue.StatusEffect.CONFUSED]:"Confused",[ue.StatusEffect.STASIS]:"Stasis",[ue.StatusEffect.INVISIBLE]:"Invisible",[ue.StatusEffect.ARMORED]:"Armored",[ue.StatusEffect.INVINCIBLE]:"Invincible",[ue.StatusEffect.SPEEDY]:"Speedy",[ue.StatusEffect.HEALING]:"Healing",[ue.StatusEffect.DAMAGING]:"Damaging",[ue.StatusEffect.BERSERK]:"Berserk",[ue.StatusEffect.PETRIFIED]:"Petrified",[ue.StatusEffect.SICK]:"Sick",[ue.StatusEffect.BLEEDING]:"Bleeding",[ue.StatusEffect.QUIET]:"Quiet",[ue.StatusEffect.EXPOSED]:"Exposed",[ue.StatusEffect.HEXED]:"Hexed"};function js(r,e){let t=J(r);if(!t||e<0||e>=t.inventory.length)return null;let n=t.inventory[e];return!Number.isFinite(n)||n<0?null:r.gameData.buildSdkItem(n)}function af(r){return{maxHP:r.maxHealth,maxMP:r.maxMana,attack:r.attack+r.attackBonus+r.exaltedAttack,defense:r.defense+r.defenseBonus+r.exaltedDefense,speed:r.speed+r.speedBonus+r.exaltedSpeed,dexterity:r.dexterity+r.dexterityBonus+r.exaltedDexterity,vitality:r.vitality+r.vitalityBonus+r.exaltedVitality,wisdom:r.wisdom+r.wisdomBonus+r.exaltedWisdom}}function nw(r){return{maxHP:r.exaltedMaxHP,maxMP:r.exaltedMaxMP,attack:r.exaltedAttack,defense:r.exaltedDefense,speed:r.exaltedSpeed,dexterity:r.exaltedDexterity,vitality:r.exaltedVitality,wisdom:r.exaltedWisdom}}function iw(r){return{maxHP:r.healthBonus,maxMP:r.manaBonus,attack:r.attackBonus,defense:r.defenseBonus,speed:r.speedBonus,dexterity:r.dexterityBonus,vitality:r.vitalityBonus,wisdom:r.wisdomBonus}}function Zr(r,e){let t=J(r);return t?af(t)[e]:0}var Fs=class{static install(e){$.getX=()=>J(e)?.pos.x??0,$.getY=()=>J(e)?.pos.y??0,$.getPosition=()=>{let t=J(e);return new ue.Position(t?.pos.x??0,t?.pos.y??0)},$.distanceTo=t=>{let n=J(e);return n?new ue.Position(n.pos.x,n.pos.y).distanceTo(t):0},$.getHP=()=>J(e)?.health??0,$.getMaxHP=()=>J(e)?.maxHealth??0,$.getHPPercent=()=>{let t=J(e);return!t||t.maxHealth<=0?0:t.health/t.maxHealth},$.getMP=()=>J(e)?.mana??0,$.getMaxMP=()=>J(e)?.maxMana??0,$.getMPPercent=()=>{let t=J(e);return!t||t.maxMana<=0?0:t.mana/t.maxMana},$.getStats=()=>{let t=J(e);return t?af(t):{...ew}},$.getExaltedBonuses=()=>{let t=J(e);return t?nw(t):{...tw}},$.getExaltedMaxHP=()=>J(e)?.exaltedMaxHP??0,$.getExaltedMaxMP=()=>J(e)?.exaltedMaxMP??0,$.getExaltedAtk=()=>J(e)?.exaltedAttack??0,$.getExaltedDef=()=>J(e)?.exaltedDefense??0,$.getExaltedSpd=()=>J(e)?.exaltedSpeed??0,$.getExaltedDex=()=>J(e)?.exaltedDexterity??0,$.getExaltedVit=()=>J(e)?.exaltedVitality??0,$.getExaltedWis=()=>J(e)?.exaltedWisdom??0,$.getGearBonuses=()=>{let t=J(e);return t?iw(t):{...rw}},$.getGearMaxHP=()=>J(e)?.healthBonus??0,$.getGearMaxMP=()=>J(e)?.manaBonus??0,$.getGearAtk=()=>J(e)?.attackBonus??0,$.getGearDef=()=>J(e)?.defenseBonus??0,$.getGearSpd=()=>J(e)?.speedBonus??0,$.getGearDex=()=>J(e)?.dexterityBonus??0,$.getGearVit=()=>J(e)?.vitalityBonus??0,$.getGearWis=()=>J(e)?.wisdomBonus??0,$.getAtk=()=>Zr(e,"attack"),$.getDef=()=>Zr(e,"defense"),$.getSpd=()=>Zr(e,"speed"),$.getDex=()=>Zr(e,"dexterity"),$.getVit=()=>Zr(e,"vitality"),$.getWis=()=>Zr(e,"wisdom"),$.hasEffect=t=>{let n=J(e);if(!n)return!1;let i=of[t];return i?n.hasConditionEffect(i):!1},$.getEffects=()=>{let t=J(e);if(!t)return[];let n=Object.values(ue.StatusEffect),i=[];for(let s of n){if(typeof s!="string")continue;let o=of[s];!o||!t.hasConditionEffect(o)||i.push(s)}return i},$.getWeapon=()=>js(e,0),$.getAbility=()=>js(e,1),$.getArmor=()=>js(e,2),$.getRing=()=>js(e,3),$.getName=()=>J(e)?.name??"",$.getClass=()=>{let t=J(e);if(!t?.classType)return"";let n=e.gameData.getObject(t.classType);return n?.displayId||n?.id||String(t.classType)},$.isDead=()=>J(e)?.hasConditionEffect("Dead")??!1,$.isInCombat=()=>!1,$.isInvisible=()=>J(e)?.hasConditionEffect("Invisible")??!1,$.getAccountFame=()=>J(e)?.currentFame??0,$.getCharacterFame=()=>J(e)?.characterAliveFame??0,$.getPowerLevel=()=>J(e)?.powerLevel??0,$.getStars=()=>J(e)?.stars??0}};var Se=G(fe(),1);Q();var lf=new Set;function v(r){lf.has(r)||(lf.add(r),m.warn("ScriptBridge",`${r}: not implemented yet`))}Q();var Hs=class{static install(e){Se.Walking.walkTo=(t,n)=>(v("Walking.walkTo"),!1),Se.Walking.walkToPosition=t=>(v("Walking.walkToPosition"),!1),Se.Walking.walkToEnemy=t=>(v("Walking.walkToEnemy"),!1),Se.Walking.walkToPortal=t=>(v("Walking.walkToPortal"),!1),Se.Walking.walkToNearestPortal=()=>(v("Walking.walkToNearestPortal"),!1),Se.Walking.walkToNexusPortal=()=>(v("Walking.walkToNexusPortal"),!1),Se.Walking.walkToLeftWall=()=>(v("Walking.walkToLeftWall"),!1),Se.Walking.walkToRightWall=()=>(v("Walking.walkToRightWall"),!1),Se.Walking.walkToTopWall=()=>(v("Walking.walkToTopWall"),!1),Se.Walking.walkToBottomWall=()=>(v("Walking.walkToBottomWall"),!1),Se.Walking.followPlayer=t=>(v("Walking.followPlayer"),!1),Se.Walking.stopMoving=()=>{v("Walking.stopMoving")},Se.Walking.isMoving=()=>(v("Walking.isMoving"),!1),Se.Walking.hasReached=(t,n=.5)=>(v("Walking.hasReached"),!1),Se.Walking.nexus=()=>{let t=e.clientRef.current;if(t?.connected)try{let n=e.proxy.packetFactory.createByName("ESCAPE");n.modified=!0,t.sendToServer(n)}catch{}},Se.Walking.getDodgePosition=()=>(v("Walking.getDodgePosition"),null),Se.Walking.dodge=()=>(v("Walking.dodge"),!1),Se.Walking.dodgeFrom=t=>(v("Walking.dodgeFrom"),!1),Se.Walking.canTeleport=()=>e.clientRef.current?.playerData.teleportAllowed??!1,Se.Walking.teleportToPlayer=t=>{let n=e.clientRef.current;if(!n?.connected)return!1;if(!n.playerData.teleportAllowed)return m.warn("Walking","teleportToPlayer: teleport not allowed in this map"),!1;let i=t.trim().toLowerCase(),s=e.worldState.getAllPlayersRawStatsForDashboard(e.gameData),o=s.find(a=>a.name.trim().toLowerCase()===i);if(o||(o=s.find(a=>a.name.toLowerCase().includes(i))),!o)return m.warn("Walking",`teleportToPlayer: player "${t}" not found in world state`),!1;try{let a=e.proxy.packetFactory.createByName("TELEPORT");return a.data.objectId=o.objectId,a.modified=!0,n.sendToServer(a),!0}catch(a){return m.warn("Walking",`teleportToPlayer: send failed \u2014 ${a.message}`),!1}},Se.Walking.teleportToBeacon=t=>{let n=e.clientRef.current;if(!n?.connected)return!1;if(!n.playerData.teleportAllowed)return m.warn("Walking","teleportToBeacon: teleport not allowed in this map"),!1;try{let i=e.proxy.packetFactory.createByName("TELEPORT");return i.data.objectId=t,i.modified=!0,n.sendToServer(i),!0}catch(i){return m.warn("Walking",`teleportToBeacon: send failed \u2014 ${i.message}`),!1}}}};var wt=G(fe(),1);var sw=3600*1e3;function or(r){let e=Number(r);return Number.isFinite(e)?e:null}function ow(r){let e=typeof r=="number"?r:r&&typeof r=="object"?r.objectId:void 0,t=or(e);return t==null||t<=0?null:Math.trunc(t)}function Bl(r){if(!r||typeof r!="object")return null;let e=or(r.x),t=or(r.y);return e==null||t==null?null:{x:e,y:t}}var Ws=class{static install(e){let t=[],n=[],i=null,s=!1;function o(){let c=Date.now()-sw;for(;t.length>0&&t[0]<c;)t.shift();for(;n.length>0&&n[0]<c;)n.shift()}function a(){i=null,s=!1}function l(c){if(!s||!i)return null;if(i.kind==="position")return{x:i.x,y:i.y};let d=(e.getWorldStateForClient?.(c)??e.worldState).getEntity(i.objectId);if(!d)return null;let p=or(d.pos?.x),f=or(d.pos?.y);return p==null||f==null?null:{x:p,y:f}}e.proxy.hookPacket("PLAYERSHOOT",(c,u)=>{if(t.push(Date.now()),o(),!u.isDefined)return;let d=l(c);if(!d)return;let p=or(u.data.angle)??0,f=Bl(u.data.playerPosition)??(()=>{let b=Bl(u.data.projectilePosition);return b?{x:b.x-Math.cos(p)*.3,y:b.y-Math.sin(p)*.3}:null})()??Bl(c.playerData.pos);if(!f)return;let h=d.x-f.x,g=d.y-f.y;if(Math.abs(h)<1e-6&&Math.abs(g)<1e-6)return;let y=Math.atan2(g,h);u.data.angle=y,u.data.projectilePosition={x:f.x+Math.cos(y)*.3,y:f.y+Math.sin(y)*.3},u.modified=!0}),e.proxy.hookPacket("ENEMYHIT",(c,u)=>{n.push(Date.now()),o()}),wt.Combat.accuracy=()=>(o(),t.length===0?0:n.length/t.length),wt.Combat.recentAccuracy=c=>{o();let u=Date.now()-c*60*1e3,d=t.filter(f=>f>=u).length;return d===0?0:n.filter(f=>f>=u).length/d},wt.Combat.resetAccuracy=()=>{t.length=0,n.length=0},wt.Combat.aimAt=c=>{let u=ow(c);return u==null?!1:(i={kind:"object",objectId:u},s=!0,!0)},wt.Combat.aimAtPosition=(c,u)=>{let d=or(c),p=or(u);return d==null||p==null?!1:(i={kind:"position",x:d,y:p},s=!0,!0)},wt.Combat.stopAiming=()=>{a()},wt.Combat.autoAimOff=()=>{a()},wt.Combat.useAbility=()=>(v("Combat.useAbility"),!1),wt.Combat.useAbilityAt=(c,u)=>(v("Combat.useAbilityAt"),!1),wt.Combat.useAbilityOn=c=>(v("Combat.useAbilityOn"),!1)}};var Ue=G(fe(),1);function Ae(r,e,t=0){let n=r[String(e)];if(n==null||n==="")return t;let i=typeof n=="number"?n:Number(n);return Number.isFinite(i)?i:t}function aw(r){return{maxHP:Ae(r,x.MaxHP,0),maxMP:Ae(r,x.MaxMP,0),attack:Ae(r,x.Attack,0),defense:Ae(r,x.Defense,0),speed:Ae(r,x.Speed,0),dexterity:Ae(r,x.Dexterity,0),vitality:Ae(r,x.Vitality,0),wisdom:Ae(r,x.Wisdom,0)}}function jl(r){let e=r.rawStats;return{objectType:r.objectType,objectId:r.objectId,name:r.name,position:new Ue.Position(r.x,r.y),hp:Ae(e,x.HP,0),maxHp:Ae(e,x.MaxHP,0),mp:Ae(e,x.MP,0),maxMp:Ae(e,x.MaxMP,0),stats:aw(e),className:r.className}}function ut(r){return r.worldState.getAllPlayersRawStatsForDashboard(r.gameData)}function Cr(r,e){let t=e.trim().toLowerCase();if(!t)return null;for(let n of r)if(n.name.trim().toLowerCase()===t)return n;for(let n of r)if(n.name.toLowerCase().includes(t))return n;return null}function lw(r,e,t){let n=e.trim().toLowerCase();if(!n)return null;if(t==="equals"){for(let i of r)if(i.name.trim().toLowerCase()===n)return i;return null}for(let i of r)if(i.name.toLowerCase().includes(n))return i;return null}function cf(r){let e=r.rawStats[String(x.GuildName)];return e==null?"":String(e).trim()}function cw(r){let e=new Set,t=[];for(let n of r){let i=cf(n);if(!i)continue;let s=i.toLowerCase();e.has(s)||(e.add(s),t.push(i))}return t.sort((n,i)=>n.localeCompare(i,void 0,{sensitivity:"base"})),t}var Gs=class{static install(e){Ue.Players.getAll=()=>ut(e).map(jl),Ue.Players.getNearest=()=>{let t=e.clientRef.current?.playerData;if(!t?.ownerObjectId)return null;let n=t.pos.x,i=t.pos.y,s=null,o=1/0;for(let a of ut(e)){if(a.objectId===t.ownerObjectId)continue;let l=Math.hypot(a.x-n,a.y-i);l<o&&(o=l,s=a)}return s?jl(s):null},Ue.Players.find=t=>{let n=Cr(ut(e),t);return n?jl(n):null},Ue.Players.getHP=t=>{let n=Cr(ut(e),t);return n?Ae(n.rawStats,x.HP,0):0},Ue.Players.getMaxHP=t=>{let n=Cr(ut(e),t);return n?Ae(n.rawStats,x.MaxHP,0):0},Ue.Players.getHPPercent=t=>{let n=Cr(ut(e),t);if(!n)return 0;let i=Ae(n.rawStats,x.HP,0),s=Ae(n.rawStats,x.MaxHP,0);return s<=0?0:i/s},Ue.Players.getMP=t=>{let n=Cr(ut(e),t);return n?Ae(n.rawStats,x.MP,0):0},Ue.Players.getAccountFame=t=>{let n=Cr(ut(e),t);return n?Math.trunc(Ae(n.rawStats,x.CurrentFame,0)):0},Ue.Players.getCharacterFame=t=>{let n=Cr(ut(e),t);return n?Math.trunc(Ae(n.rawStats,x.CharacterAliveFame,0)):0},Ue.Players.count=()=>ut(e).length,Ue.Players.getPlayerGuild=(t,n="equals")=>{let i=lw(ut(e),t,n);return i?cf(i):""},Ue.Players.getNearbyGuilds=()=>cw(ut(e))}};var Ot=G(fe(),1);var Us=class{static install(e){Ot.Enemies.getAll=()=>(v("Enemies.getAll"),[]),Ot.Enemies.getNearest=()=>(v("Enemies.getNearest"),null),Ot.Enemies.getNearestTo=t=>(v("Enemies.getNearestTo"),null),Ot.Enemies.getBoss=()=>(v("Enemies.getBoss"),null),Ot.Enemies.getTargetingMe=()=>(v("Enemies.getTargetingMe"),[]),Ot.Enemies.find=t=>(v("Enemies.find"),null),Ot.Enemies.count=()=>(v("Enemies.count"),0),Ot.Enemies.getById=t=>(v("Enemies.getById"),null),Ot.Enemies.getByType=t=>(v("Enemies.getByType"),[])}};var Oe=G(fe(),1);function Kn(r){return r.clientRef.current?.playerData??null}function uf(r){return r===void 0||!Number.isFinite(r)||r<0?-1:Math.trunc(r)}function zn(r,e){return e<0||e>=Oe.INVENTORY_TOTAL_SLOT_COUNT?-1:e<Oe.INVENTORY_MAIN_SLOT_COUNT?uf(r.inventory[e]):uf(r.backpack[e-Oe.INVENTORY_MAIN_SLOT_COUNT])}var Vs=class{static install(e){Oe.Inventory.getAll=()=>{let t=Kn(e);if(!t)return[];let n=[];for(let i=0;i<Oe.INVENTORY_TOTAL_SLOT_COUNT;i++){let s=zn(t,i);s<0||n.push(`${s}; ${i}`)}return n},Oe.Inventory.contains=t=>{let n=t.trim().toLowerCase();if(!n)return!1;let i=Kn(e);if(!i)return!1;for(let s=0;s<Oe.INVENTORY_TOTAL_SLOT_COUNT;s++){let o=zn(i,s);if(o<0)continue;if(e.gameData.buildSdkItem(o)?.name.toLowerCase().includes(n)||e.gameData.getObject(o)?.id.toLowerCase().includes(n))return!0}return!1},Oe.Inventory.getCount=t=>{let n=t.trim().toLowerCase();if(!n)return 0;let i=Kn(e);if(!i)return 0;let s=0;for(let o=0;o<Oe.INVENTORY_TOTAL_SLOT_COUNT;o++){let a=zn(i,o);if(a<0)continue;let l=e.gameData.buildSdkItem(a),c=e.gameData.getObject(a),u=l?.name.toLowerCase().includes(n),d=c?.id.toLowerCase().includes(n);(u||d)&&s++}return s},Oe.Inventory.getFreeSlots=()=>{let t=Kn(e);if(!t)return 8;let n=0;for(let i=4;i<Oe.INVENTORY_MAIN_SLOT_COUNT;i++)zn(t,i)<0&&n++;return n},Oe.Inventory.isFull=()=>{let t=Kn(e);if(!t)return!1;for(let n=4;n<Oe.INVENTORY_MAIN_SLOT_COUNT;n++)if(zn(t,n)<0)return!1;return!0},Oe.Inventory.use=t=>(v("Inventory.use"),!1),Oe.Inventory.useBySlot=t=>(v("Inventory.useBySlot"),!1),Oe.Inventory.drop=t=>(v("Inventory.drop"),!1)}};var df=G(fe(),1);var qs=class{static install(e){let t=df.Vault;t.get=i=>(v("Vault.get"),new At(i));let n=t.vaultChest;n.get=i=>(v("Vault.vaultChest.get"),new At(i)),n.findChestWith=i=>(v("Vault.vaultChest.findChestWith"),null),n.getAll=()=>(v("Vault.vaultChest.getAll"),[]),t.findItem=i=>(v("Vault.findItem"),null),t.getAllItems=()=>(v("Vault.getAllItems"),[])}};var Js=class{static install(e){At.prototype.getItems=function(){return v("VaultChest.getItems"),[]},At.prototype.withdraw=function(t){return v("VaultChest.withdraw"),!1},At.prototype.deposit=function(t){return v("VaultChest.deposit"),!1},At.prototype.contains=function(t){return v("VaultChest.contains"),!1},At.prototype.getFreeSlots=function(){return v("VaultChest.getFreeSlots"),0},At.prototype.isFull=function(){return v("VaultChest.isFull"),!1}}};var Ks=class{static install(e){Jn.getItems=()=>(v("GiftChest.getItems"),[]),Jn.withdraw=t=>(v("GiftChest.withdraw"),!1),Jn.withdrawAll=()=>(v("GiftChest.withdrawAll"),!1),Jn.contains=t=>(v("GiftChest.contains"),!1)}};var en=G(fe(),1);var kr={Tutorial:-1,Nexus:-2,RandomRealm:-3,Vault:-5,MapTest:-6,VaultExplanation:-8,NexusExplanation:-9,QuestRoom:-11,CheatersQuarantine:-13};function Fl(r){return(r.clientRef.current?.playerData?.mapName??"").toLowerCase()}var zs=class{static install(e){en.World.isNexus=()=>e.clientRef.current?.state?.gameId===kr.Nexus?!0:Fl(e).includes("nexus"),en.World.isRealm=()=>{let t=Fl(e);return t.includes("realm of the mad god")||t==="realm"},en.World.isDungeon=()=>(v("World.isDungeon"),!1),en.World.isVault=()=>e.clientRef.current?.state?.gameId===kr.Vault?!0:Fl(e).includes("vault"),en.World.getName=()=>e.clientRef.current?.playerData?.mapName??""}};var Vt=G(fe(),1);function Hl(r){return r.trim().toLowerCase().replace(/[\s_-]+/g,"")}function ff(r,e,t){switch(e){case"damaging":return(t.getTileDamage(r)??0)>0;case"conditioneffect":case"condition":return t.getTileHasConditionEffect(r);case"slowing":return t.getTileSpeed(r)<1;case"speedy":case"faster":return t.getTileSpeed(r)>1;case"speedmodified":return t.getTileSpeed(r)!==1;case"blocking":case"nowalk":return t.tileIsBlockingWalk(r);case"sink":return t.tileIsSink(r);case"push":case"pushes":return t.getTileHasPush(r);case"slide":case"sliding":return(t.getTileSlideAmount(r)??0)>0;default:return!1}}function uw(r,e){if(r===void 0)return{radius:5};if(typeof r=="string"){let i=r.trim();return i?{radius:5,filter:Hl(i)}:{radius:5}}let t=Number.isFinite(r)?Math.max(0,Math.floor(Number(r))):5,n=typeof e=="string"&&e.trim()?Hl(e):void 0;return{radius:t,filter:n}}function Ys(r,e,t,n,i){let s=r<<16|e&65535,o=n.getTileDamage(t)??0;return{type:t,name:n.getTileName(t),position:new Vt.Position(r+.5,e+.5),isBlocking:n.tileIsBlockingWalk(t),isOccupied:i.has(s),isSafe:!1,speedMultiplier:n.getTileSpeed(t),damaging:o>0,damagePerTick:o,hasConditionEffect:n.getTileHasConditionEffect(t)}}function dw(r){let e=r.clientRef.current?.playerData;return{x:e?.pos.x??0,y:e?.pos.y??0}}var Xs=class{static install(e){let t=e.gameData,n=e.worldState;Vt.Tiles.getAll=i=>{let s=i?.trim()?Hl(i):void 0,o=n.getOccupiedTileKeys(),a=[];return n.forEachKnownTile((l,c,u)=>{s&&!ff(u,s,t)||a.push(Ys(l,c,u,t,o))}),a},Vt.Tiles.getNearby=((i,s)=>{let{radius:o,filter:a}=uw(i,s),{x:l,y:c}=dw(e),u=n.getOccupiedTileKeys(),d=[],p=o*o,f=Math.floor(l),h=Math.floor(c),g=Math.ceil(o)+1;return n.forEachKnownTileInBounds(f-g,f+g,h-g,h+g,(y,b,S)=>{let E=y+.5,I=b+.5,A=E-l,j=I-c;A*A+j*j>p||a&&!ff(S,a,t)||d.push(Ys(y,b,S,t,u))}),d}),Vt.Tiles.getByType=i=>{let s=n.getOccupiedTileKeys(),o=[];return n.forEachKnownTile((a,l,c)=>{c===i&&o.push(Ys(a,l,c,t,s))}),o},Vt.Tiles.getAt=(i,s)=>{let o=Math.floor(i),a=Math.floor(s),l=n.getTileAt(o,a);return l===void 0?null:Ys(o,a,l,t,n.getOccupiedTileKeys())},Vt.Tiles.isBlocking=(i,s)=>{let o=n.getTileAt(Math.floor(i),Math.floor(s));return o===void 0?!1:t.tileIsBlockingWalk(o)},Vt.Tiles.isSafe=(i,s)=>(v("Tiles.isSafe"),!1)}};var U=G(fe(),1);var Qs=class{static install(e){U.Objects.getAll=()=>(v("Objects.getAll"),[]),U.Objects.getById=t=>(v("Objects.getById"),null),U.Objects.getByType=t=>(v("Objects.getByType"),[]),U.Objects.count=()=>(v("Objects.count"),0),U.Objects.exists=t=>(v("Objects.exists"),!1),U.Objects.getByCategory=t=>(v("Objects.getByCategory"),[]),U.Objects.getEnemies=()=>(v("Objects.getEnemies"),[]),U.Objects.getPlayers=()=>(v("Objects.getPlayers"),[]),U.Objects.getPortals=()=>(v("Objects.getPortals"),[]),U.Objects.getContainers=()=>(v("Objects.getContainers"),[]),U.Objects.getPets=()=>(v("Objects.getPets"),[]),U.Objects.getBeacons=()=>(v("Objects.getBeacons"),[]),U.Objects.getQuestObject=()=>{let t=e.clientRef.current;if(!t)return null;let n=t.playerData.questObjectId;if(n<=0)return null;let i=e.worldState.getEntity(n);if(!i)return null;let s=e.gameData.getObject(i.objectType);return{objectId:i.objectId,objectType:i.objectType,name:s?.displayId??s?.id??"",position:new U.Position(i.pos.x,i.pos.y)}},U.Objects.getQuestTargetId=()=>{let n=e.clientRef.current?.playerData?.questObjectId,i=typeof n=="number"?n:Number(n);return Number.isFinite(i)&&i>0?Math.trunc(i):-1},U.Objects.getQuestTargetType=()=>{let t=e.clientRef.current;if(!t)return-1;let n=Number(t.playerData.questObjectId);if(!(n>0))return-1;let i=e.worldState.resolveQuestTargetObjectType(n,e.gameData);return i!=null&&i>0?i:-1},U.Objects.getQuestId=U.Objects.getQuestTargetId,U.Objects.getQuestType=U.Objects.getQuestTargetType,U.Objects.getNearest=()=>(v("Objects.getNearest"),null),U.Objects.getNearestTo=t=>(v("Objects.getNearestTo"),null),U.Objects.getNearestOfType=t=>(v("Objects.getNearestOfType"),null),U.Objects.getNearestOfCategory=t=>(v("Objects.getNearestOfCategory"),null),U.Objects.getWithinRadius=t=>(v("Objects.getWithinRadius"),[]),U.Objects.getWithinRadiusFrom=(t,n)=>(v("Objects.getWithinRadiusFrom"),[]),U.Objects.getWithinBounds=(t,n,i,s)=>(v("Objects.getWithinBounds"),[]),U.Objects.sortByDistance=()=>(v("Objects.sortByDistance"),[]),U.Objects.sortByDistanceFrom=t=>(v("Objects.sortByDistanceFrom"),[]),U.Objects.findByName=t=>(v("Objects.findByName"),null),U.Objects.findAllByName=t=>(v("Objects.findAllByName"),[]),U.Objects.findPortal=t=>(v("Objects.findPortal"),null),U.Objects.getNearestPortal=()=>(v("Objects.getNearestPortal"),null),U.Objects.getOpenPortals=()=>(v("Objects.getOpenPortals"),[]),U.Objects.getNearestContainer=()=>(v("Objects.getNearestContainer"),null),U.Objects.findContainer=t=>(v("Objects.findContainer"),null),U.Objects.getCategory=t=>(v("Objects.getCategory"),null),U.Objects.getTypeName=t=>(v("Objects.getTypeName"),""),U.Objects.isEnemy=t=>(v("Objects.isEnemy"),!1),U.Objects.isPortal=t=>(v("Objects.isPortal"),!1),U.Objects.isContainer=t=>(v("Objects.isContainer"),!1),U.Objects.isBoss=t=>(v("Objects.isBoss"),!1),U.Objects.hasType=t=>(v("Objects.hasType"),!1)}};var Yn=G(fe(),1);var Zs=class{static install(e){Yn.Projectiles.getAll=()=>(v("Projectiles.getAll"),[]),Yn.Projectiles.getNearby=t=>(v("Projectiles.getNearby"),[]),Yn.Projectiles.getIncoming=()=>(v("Projectiles.getIncoming"),[]),Yn.Projectiles.count=()=>(v("Projectiles.count"),0)}};var eo=G(fe(),1);function Wl(r,e,t){let n=r.scriptSession.scriptId,i=String(t);if(!n){e==="error"?console.error(`[SCRIPT] ${i}`):e==="warn"?console.warn(`[SCRIPT] ${i}`):console.log(`[SCRIPT] ${i}`);return}let s=`[${n}] ${i}`;r.emitScriptLog(n,s,e)}var to=class{static install(e){eo.Log.info=t=>Wl(e,"info",t),eo.Log.warn=t=>Wl(e,"warn",t),eo.Log.error=t=>Wl(e,"error",t)}};var Xn=G(fe(),1);var ro=class{static install(e){Xn.Settings.get=t=>(v("Settings.get"),null),Xn.Settings.getString=(t,n)=>(v("Settings.getString"),n??""),Xn.Settings.getNumber=(t,n)=>(v("Settings.getNumber"),n??0),Xn.Settings.getBoolean=(t,n)=>(v("Settings.getBoolean"),n??!1)}};var _r=G(fe(),1),no=class{static install(e){_r.Timing.now=()=>Date.now(),_r.Timing.timeSince=t=>Date.now()-t,_r.Timing.sleep=t=>new Promise(n=>setTimeout(n,t)),_r.Timing.every=(t,n)=>{let i=setInterval(n,t);return()=>clearInterval(i)},_r.Timing.after=(t,n)=>{let i=setTimeout(n,t);return()=>clearTimeout(i)},_r.Timing.debounce=(t,n)=>{let i=null;return((...s)=>{i&&clearTimeout(i),i=setTimeout(()=>n(...s),t)})}}};var Ee=G(fe(),1);Q();var io=[],Qn=[],pf=!1,mf=!1,hf=!1,Zn=[];function fw(r,e){if(Zn.length===0||e.name!=="PLAYERTEXT"||!e.isDefined||!e.data)return;let t=String(e.data.text??""),n=t.toLowerCase(),i=t.trim().toLowerCase();for(let s of Zn)if(s.mode==="equals"){if(s.needles.some(o=>i===o)){e.send=!1;return}}else if(s.needles.some(o=>n.includes(o))){e.send=!1;return}}function bf(r){return(r.playerData?.name??"").trim()}function pw(r,e){let t=String(r.name??"").trim(),n=String(r.recipient??"").trim(),i=String(r.cleanText??r.text??""),s=e.trim().toLowerCase();return n&&s&&n.toLowerCase()===s&&t.toLowerCase()!==s?"tell":!t||t==="*"||t==="#"?"system":i.startsWith("Party>")?"party":i.startsWith("Guild>")?"guild":i.startsWith("Tell>")||i.startsWith("[Tell]")?"tell":/\[.*Global.*\]/i.test(i)?"global":"say"}function mw(r,e){let t=bf(r),n=String(e.name??"").trim(),i=String(e.cleanText??e.text??""),s=pw(e,t),o=t.length>0&&n.toLowerCase()===t.toLowerCase();return{sender:n,message:i,channel:s,isLocal:o,isEcho:!0,timestamp:Date.now()}}function hw(r,e){e.name!=="TEXT"||!e.isDefined||!e.data||Sf(mw(r,e.data))}function gw(r,e){if(e.name!=="PLAYERTEXT"||!e.isDefined||!e.data)return;let t=String(e.data.text??"").trim();t&&Sf({sender:bf(r),message:t,channel:"say",isLocal:!0,isEcho:!1,timestamp:Date.now()})}var gf="RealmEngine";function yf(r,e,t){let n=r.clientRef.current;if(!n?.connected)return;let i=r.proxy.packetFactory.createByName("TEXT");i.data={name:t,objectId:-1,numStars:-1,bubbleTime:0,recipient:"",text:e,cleanText:e,isSupporter:!1,starBg:0},i.modified=!0,n.sendToClient(i)}function yw(r,e,t){let n=String(r??"");switch(e){case"say":case"unknown":return n;case"yell":return`/yell ${n}`;case"party":return`/party ${n}`;case"guild":return`/guild ${n}`;case"tell":{let i=(t??"").trim();return i?`/tell ${i} ${n}`:null}case"global":case"system":return null;default:return n}}function tn(r,e,t,n){let i=r.clientRef.current;if(!i?.connected)return m.warn("ScriptChat",`send(${t}): not connected`),!1;let s=yw(e,t,n);if(s===null)return m.warn("ScriptChat",`send(${t}): channel not supported for outgoing chat`),!1;try{let o=r.proxy.packetFactory.createByName("PLAYERTEXT");return o.data={text:s},o.modified=!0,i.sendToServer(o),!0}catch(o){return m.warn("ScriptChat",`send(${t}) failed: ${o.message}`),!1}}function bw(r){if(Qn.length===0)return!1;let e=String(r.cleanText??r.text??"").toLowerCase(),t=typeof r.numStars=="number"?r.numStars:null;for(let n of Qn)if(n.words.some(s=>e.includes(s))&&!(n.minStars!==null&&t!==null&&t>=n.minStars))return!0;return!1}function Sw(r){mf||(mf=!0,r.proxy.hookPacket("TEXT",(e,t)=>{!t.isDefined||!t.data||bw(t.data)&&(t.send=!1)}))}function Sf(r){let e=io.slice();for(let t of e)try{t(r)}catch{}}function wf(r){pf||(pf=!0,r.proxy.hookPacket("TEXT",hw),r.proxy.hookPacket("PLAYERTEXT",gw)),hf||(hf=!0,r.proxy.hookPacket("PLAYERTEXT",fw,void 0,!0)),Sw(r),Ee.chat.onMessage=e=>(io.push(e),()=>{let t=io.indexOf(e);t!==-1&&io.splice(t,1)}),Ee.chat.onMessageFrom=(e,t)=>Ee.chat.onMessage(n=>{n.sender===e&&t(n)}),Ee.chat.onMessageContaining=(e,t)=>Ee.chat.onMessage(n=>{(typeof e=="string"?n.message.includes(e):e.test(n.message))&&t(n)}),Ee.chat.onChannelMessage=(e,t)=>Ee.chat.onMessage(n=>{n.channel===e&&t(n)}),Ee.chat.onWhisper=e=>Ee.chat.onMessage(t=>{t.channel==="tell"&&e(t)}),Ee.chat.onSystemMessage=e=>Ee.chat.onMessage(t=>{t.channel==="system"&&e(t)}),Ee.chat.send=(e,t="say")=>{if(t==="system"){yf(r,String(e??""),gf);return}if(t==="tell"){m.warn("ScriptChat","send(tell): use chat.tell(playerName, message) \u2014 tell needs a recipient");return}tn(r,String(e??""),t)},Ee.chat.say=e=>{tn(r,String(e??""),"say")},Ee.chat.yell=e=>{tn(r,String(e??""),"yell")},Ee.chat.party=e=>{tn(r,String(e??""),"party")},Ee.chat.guild=e=>{tn(r,String(e??""),"guild")},Ee.chat.tell=(e,t)=>{tn(r,String(t??""),"tell",String(e??""))},Ee.chat.filter=(e,t)=>{let n=(Array.isArray(e)?e:[e]).map(s=>String(s).toLowerCase().trim()).filter(s=>s.length>0);if(n.length===0)return m.warn("ScriptChat","chat.filter: empty word list \u2014 no filter added"),()=>{};let i={words:n,minStars:typeof t=="number"&&Number.isFinite(t)?Math.trunc(t):null};return Qn.push(i),()=>{let s=Qn.indexOf(i);s!==-1&&Qn.splice(s,1)}},Ee.chat.notify=(e,t)=>{let n=(t??"").trim()||gf;yf(r,String(e??""),n)},Ee.chat.blockOutgoing=(e,...t)=>{let n=t.map(s=>String(s??"").trim().toLowerCase()).filter(s=>s.length>0);if(n.length===0)return m.warn("ScriptChat","chat.blockOutgoing: no non-empty patterns \u2014 no rule added"),()=>{};if(e!=="equals"&&e!=="contains")return m.warn("ScriptChat",`chat.blockOutgoing: invalid mode "${e}" \u2014 use 'equals' or 'contains'`),()=>{};let i={mode:e,needles:n};return Zn.push(i),()=>{let s=Zn.indexOf(i);s!==-1&&Zn.splice(s,1)}}}var ar=G(fe(),1);Q();function ww(r){let e=Math.trunc(Number(r))||0;return Math.max(-32768,Math.min(32767,e))}function ei(r){let e=Math.trunc(Number(r))||0;return Math.max(-128,Math.min(127,e))}function Ew(r){let e=r.replace(/\s+/g,"").replace(/^0x/i,"");return e.length===0?Buffer.alloc(0):e.length%2!==0||!/^[0-9a-fA-F]*$/.test(e)?null:Buffer.from(e,"hex")}var lr=new WeakMap,Ef=!1;function Tw(r){let e=r;return{name:typeof e.name=="string"?e.name:"",partyId:Number(e.partyId)>>>0,powerLevelMin:Number(e.powerLevelMin)&65535,partySizeCurrent:Number(e.partySizeCurrent)&255,partySizeMax:Number(e.partySizeMax)&255,activity:Number(e.activity)&255,privacy:Number(e.privacy)&255,statsMin:Number(e.statsMin)&255,serverIndex:Number(e.serverIndex)&255}}function Pw(r,e){let t=lr.get(r);if(!t||!e.isDefined)return;let n=e.data;if(Number(n.packetNumber)!==0)return;let i=Array.isArray(n.parties)?n.parties:[];clearTimeout(t.timer),lr.delete(r);try{t.resolve(i.map(Tw))}catch(s){t.reject(s instanceof Error?s:new Error(String(s)))}}function vw(r){Ef||(Ef=!0,r.proxy.hookPacket("PARTYLISTMESSAGE",(e,t)=>{try{Pw(e,t)}catch(n){m.error("ScriptParty","PARTYLISTMESSAGE hook failed",n)}}))}function Tf(r){ar.party.getPartyMembers=()=>{let e=r.clientRef.current;return r.partyRoster.getMembersSnapshot(e??void 0)},ar.party.getId=(e,t="equals")=>{let n=r.clientRef.current;if(!n?.connected)return null;let i=String(e).trim().toLowerCase();if(!i)return null;for(let s of r.partyRoster.getMembersSnapshot(n)){let o=s.playerName.trim().toLowerCase();if(t==="contains"?o.includes(i):o===i)return s.playerId}return null},ar.party.createParty=e=>{let t=r.clientRef.current;if(!t?.connected)return;let n=Buffer.alloc(0);if(e.unreadTrailingHex!=null&&String(e.unreadTrailingHex).trim()!==""){let i=Ew(String(e.unreadTrailingHex));if(i===null){m.warn("ScriptParty","createParty: invalid unreadTrailingHex (use even-length hex)");return}n=i}try{let i=r.proxy.packetFactory.createByName("CREATEPARTYMESSAGE"),s="serverIndex"in e&&typeof e.serverIndex=="number"?ei(e.serverIndex):0;i.data={description:e.description??"",minPowerLevel:ww(e.minPowerLevel),maxPartySize:ei(e.maxPartySize),activity:ei(e.activity),maxedStatReq:ei(e.maxedStatReq),privacy:ei(e.privacy),serverIndex:s},i.unreadData=n,i.modified=!0,t.sendToServer(i)}catch(i){m.warn("ScriptParty",`createParty failed: ${i.message}`)}},ar.party.getPartyList=()=>{let e=r.clientRef.current;if(!e?.connected)return Promise.reject(new Error("Not connected"));let t=lr.get(e);return t&&(clearTimeout(t.timer),lr.delete(e),t.reject(new Error("getPartyList superseded by a new call"))),vw(r),new Promise((n,i)=>{let s=setTimeout(()=>{lr.get(e)===o&&lr.delete(e),i(new Error("getPartyList timed out waiting for PARTYLISTMESSAGE (packetNumber 0)"))},15e3),o={resolve:n,reject:i,timer:s};lr.set(e,o);try{let a=r.proxy.packetFactory.createByName("PARTYACTIONRESULT");a.data={playerId:65535,actionId:5},a.modified=!0,e.sendToServer(a)}catch(a){clearTimeout(s),lr.delete(e),i(a instanceof Error?a:new Error(String(a)))}})},ar.party.join=e=>{let t=r.clientRef.current;if(!t?.connected)return;let n=Math.trunc(Number(e));if(!Number.isFinite(n)||n<1||n>4294967295){m.warn("ScriptParty","join: partyId must be between 1 and 4294967295");return}try{let i=r.proxy.packetFactory.createByName("PARTYJOINREQUEST");i.data={partyId:n>>>0,unknownByte:0},i.modified=!0,t.sendToServer(i)}catch(i){m.warn("ScriptParty",`join failed: ${i.message}`)}},ar.party.kick=e=>{let t=r.clientRef.current;if(!t?.connected)return;let n=Math.trunc(Number(e));if(!Number.isFinite(n)||n<0||n>65535){m.warn("ScriptParty","kick: playerId must be between 0 and 65535");return}try{let i=r.proxy.packetFactory.createByName("PARTYACTIONRESULT");i.data={playerId:n,actionId:2},i.modified=!0,t.sendToServer(i)}catch(i){m.warn("ScriptParty",`kick failed: ${i.message}`)}},ar.party.leave=()=>{let e=r.clientRef.current;if(!e?.connected)return;let t=r.partyRoster.getLocalPartyPlayerId(e);if(t===null){m.warn("ScriptParty","leave: local party player id not known yet (join a party or wait for roster)");return}try{let n=r.proxy.packetFactory.createByName("PARTYACTIONRESULT");n.data={playerId:t,actionId:6},n.modified=!0,e.sendToServer(n),r.partyRoster.clearParty(e)}catch(n){m.warn("ScriptParty",`leave failed: ${n.message}`)}}}var Me=G(fe(),1);Q();function Fe(r,e){let t=Number(r);if(Number.isFinite(t)){let i=Math.trunc(t);if(i>=1&&i<=20)return i}let n=Number(e);if(Number.isFinite(n)){let i=Math.trunc(n);if(i>=1&&i<=20)return i}return 12}function Te(r,e){let t=Fe(e,12),n=new Array(t).fill(!1);if(!Array.isArray(r))return n;let i=Math.min(r.length,t);for(let s=0;s<i;s++)n[s]=!!r[s];return n}function rn(r){let e=[];for(let t of r)t&&typeof t=="object"&&"included"in t?e.push(!!t.included):e.push(!1);return e}function Pf(r,e){let t=Fe(e,12),n=new Array(t).fill(!1),i=r.trim();if(!i)return n;if(i==="*"||i.toLowerCase()==="all")return new Array(t).fill(!0);let s=i.split(",").map(o=>o.trim()).filter(Boolean);if(!s.length)return n;for(let o of s){if(!/^\d+$/.test(o))throw new Error(`Invalid slot value "${o}". Use comma-separated indexes like 0,2,5 or "all".`);let a=Number(o);if(!Number.isInteger(a)||a<0||a>=t)throw new Error(`Slot index ${a} is out of range (0-${t-1}).`);n[a]=!0}return n}var Ul=new WeakMap,vf=!1;function kf(){return{active:!1,ourSlotCount:12,partnerSlotCount:12,ourItems:[],partnerItems:[],ourOffer:[],partnerOffer:[],partnerOfferFromTradeChanged:[],partnerName:""}}function Ir(r){let e=Ul.get(r);return e||(e=kf(),Ul.set(r,e)),e}function _f(r){Ul.set(r,kf())}function xf(r){return{item:r.item,slotType:r.slotType,tradeable:r.tradeable,included:r.included,enchantment:r.enchantment}}function xw(r){let e=r&&typeof r=="object"?r:{};return{item:Number(e.item)|0,slotType:Number(e.slotType)|0,tradeable:!!e.tradeable,included:!!e.included,enchantment:typeof e.enchantment=="string"?e.enchantment:""}}function Cf(r){return Array.isArray(r)?r.map(xw):[]}function nn(r){let e=r.clientRef.current;return e?Ir(e):void 0}function Gl(r,e,t){try{let n=Ir(e),i=Fe(n.ourSlotCount,t.length||n.ourItems.length||12),s=Te(t,i),o=r.proxy.packetFactory.createByName("CHANGETRADE");return o.data.offer=s,o.modified=!0,e.sendToServer(o),n.active=!0,n.ourOffer=s.slice(),!0}catch(n){return m.warn("ScriptTrade",`change offer failed: ${n.message}`),!1}}function Cw(r,e){let t=String(e.name??"").toUpperCase(),n=e.data&&typeof e.data=="object"?e.data:{},i=Ir(r);if(t==="TRADESTART"){let s=Cf(n.clientItems),o=Cf(n.partnerItems);i.active=!0,i.ourSlotCount=Fe(s.length,i.ourSlotCount),i.partnerSlotCount=Fe(o.length,i.partnerSlotCount),i.ourItems=s,i.partnerItems=o,i.ourOffer=Te(rn(s),i.ourSlotCount),i.partnerOffer=Te(rn(o),i.partnerSlotCount),i.partnerOfferFromTradeChanged=i.partnerOffer.slice(),i.partnerName=typeof n.partnerName=="string"?n.partnerName:"";return}if(t==="TRADECHANGED"){i.active=!0;let s=Te(n.offer,i.partnerSlotCount);i.partnerOffer=s,i.partnerOfferFromTradeChanged=s.slice();return}if(t==="CHANGETRADE"){i.active=!0,i.ourOffer=Te(n.offer,i.ourSlotCount);return}if(t==="TRADEACCEPTED"){i.active=!0,i.ourOffer=Te(n.clientOffer,i.ourSlotCount),i.partnerOffer=Te(n.partnerOffer,i.partnerSlotCount);return}(t==="TRADEDONE"||t==="CANCELTRADE")&&_f(r)}function kw(r){if(!vf){vf=!0;for(let e of["TRADESTART","TRADECHANGED","CHANGETRADE","TRADEACCEPTED","TRADEDONE","CANCELTRADE"])r.proxy.hookPacket(e,(t,n)=>{try{Cw(t,n)}catch(i){m.warn("ScriptTrade",`${e} hook failed: ${i.message}`)}})}}function sn(r){let e=r.clientRef.current;if(!e?.connected){m.warn("ScriptTrade","No active game client connection.");return}return e}function If(r){kw(r),Me.trade.start=e=>{let t=sn(r);if(!t)return!1;let n=String(e??"").trim();if(!n)return m.warn("ScriptTrade","start: player name is required"),!1;try{let i=r.proxy.packetFactory.createByName("REQUESTTRADE");return i.data.name=n,i.modified=!0,t.sendToServer(i),!0}catch(i){return m.warn("ScriptTrade",`start failed: ${i.message}`),!1}},Me.trade.startTrade=e=>Me.trade.start(e),Me.trade.isActive=()=>nn(r)?.active??!1,Me.trade.getPartnerName=()=>nn(r)?.partnerName??"",Me.trade.getOurItems=()=>nn(r)?.ourItems.map(xf)??[],Me.trade.getPartnerItems=()=>nn(r)?.partnerItems.map(xf)??[],Me.trade.getOurOffer=()=>nn(r)?.ourOffer.slice()??[],Me.trade.getPartnerOffer=()=>nn(r)?.partnerOffer.slice()??[],Me.trade.offer=e=>{let t=sn(r);if(!t)return!1;let n=Ir(t);if(!n.active)return m.warn("ScriptTrade","offer: no active trade session"),!1;let i=Array.isArray(e)?e:[e],s=new Array(Fe(n.ourSlotCount,n.ourItems.length||12)).fill(!1);for(let o of i){let a=Math.trunc(Number(o));if(!Number.isFinite(a)||a<0||a>=s.length)return m.warn("ScriptTrade",`offer: slot index ${String(o)} is out of range`),!1;let l=n.ourItems[a];if(l&&!l.tradeable)return m.warn("ScriptTrade",`offer: slot ${a} is not tradeable`),!1;s[a]=!0}return Gl(r,t,s)},Me.trade.offerAll=()=>{let e=sn(r);if(!e)return!1;let t=Ir(e);if(!t.active)return m.warn("ScriptTrade","offerAll: no active trade session"),!1;let n=Fe(t.ourSlotCount,t.ourItems.length||12),i=new Array(n).fill(!1);for(let s=0;s<Math.min(t.ourItems.length,n);s++)i[s]=t.ourItems[s].tradeable;return Gl(r,e,i)},Me.trade.clearOffer=()=>{let e=sn(r);if(!e)return!1;let t=Ir(e);if(!t.active)return m.warn("ScriptTrade","clearOffer: no active trade session"),!1;let n=Fe(t.ourSlotCount,t.ourItems.length||12);return Gl(r,e,new Array(n).fill(!1))},Me.trade.accept=()=>{let e=sn(r);if(!e)return!1;let t=Ir(e);if(!t.active)return m.warn("ScriptTrade","accept: no active trade session"),!1;try{let n=r.proxy.packetFactory.createByName("ACCEPTTRADE"),i=Fe(t.ourSlotCount,12),s=Fe(t.partnerSlotCount,12);n.data.clientOffer=Te(t.ourOffer,i);let o=t.partnerOfferFromTradeChanged.length>0?t.partnerOfferFromTradeChanged:t.partnerOffer;return n.data.partnerOffer=Te(o,s),n.modified=!0,e.sendToServer(n),!0}catch(n){return m.warn("ScriptTrade",`accept failed: ${n.message}`),!1}},Me.trade.acceptTrade=()=>Me.trade.accept(),Me.trade.cancel=()=>{let e=sn(r);if(!e)return!1;try{let t=r.proxy.packetFactory.createByName("CANCELTRADE");return t.modified=!0,e.sendToServer(t),_f(e),!0}catch(t){return m.warn("ScriptTrade",`cancel failed: ${t.message}`),!1}},Me.trade.cancelTrade=()=>Me.trade.cancel()}var De=G(fe(),1);Q();var on=new Map,co=new WeakMap,ti=new WeakMap,uo=new WeakMap,so=[],Rf=12,oo=[],ao=[],lo=[];function _w(r,e,t){let n=r.trim().toLowerCase(),i=e.trim().toLowerCase();return i?t==="contains"?n.includes(i):n===i:!1}function Iw(r,e,t){let n=String(r).trim();if(!n)return()=>{};let i="equals",s;if(typeof e=="function")s=e;else{if(i=e,!t)return()=>{};s=t}let o={needle:n,match:i,handler:s};return lo.push(o),()=>{let a=lo.indexOf(o);a>=0&&lo.splice(a,1)}}function Rw(r,e){if(!e.isDefined)return;let t=e.data,n=Math.trunc(Number(t.playerId));if(!Number.isFinite(n)||n<0||n>65535)return;let i=typeof t.name=="string"?t.name:"",s=(r.playerData.name||"").trim().toLowerCase();if(s&&i.trim().toLowerCase()===s)return;let o=n&65535,a=Math.trunc(Number(t.classId))&65535,l={playerName:i,playerId:o,classId:a};for(let c of lo)if(_w(i,c.needle,c.match))try{c.handler(l)}catch(u){m.error("ScriptEvents","onPlayerJoinParty handler failed",u)}}function Nw(r){let e=typeof r=="string"?[r]:[...r],t=new Set;for(let n of e){let i=String(n).trim().toLowerCase();i&&t.add(i)}return t}function Aw(r,e,t){let n=Nw(r);if(n.size===0)return()=>{};let i=Number(t?.radius),s=Number.isFinite(i)&&i>0?i:Rf,o={names:n,radius:s,handler:e,prevByClient:new WeakMap};return oo.push(o),()=>{let a=oo.indexOf(o);a>=0&&oo.splice(a,1)}}function Ow(r){let e=r.rawStats[String(x.GuildName)];return String(e??"").trim()}function Mw(r,e,t){let n=r.trim().toLowerCase(),i=e.trim().toLowerCase();return i?t==="contains"?n.includes(i):n===i:!1}function Dw(r,e,t,n){let i=String(r).trim();if(!i)return()=>{};let s="equals",o,a;typeof e=="function"?(o=e,a=t):(s=e,o=t,a=n);let l=Number(a?.radius),c=Number.isFinite(l)&&l>0?l:Rf,u={needle:i,match:s,radius:c,handler:o,prevByClient:new WeakMap};return ao.push(u),()=>{let d=ao.indexOf(u);d>=0&&ao.splice(d,1)}}function Lw(r,e){let t=r.objectId;if(!t)return;let n=r.playerData.pos.x,i=r.playerData.pos.y,s=e.worldState.getAllPlayersRawStatsForDashboard(e.gameData);for(let o of ao){let a=[];for(let d of s){if(d.objectId===t)continue;let p=Ow(d);if(!Mw(p,o.needle,o.match))continue;let f=Math.hypot(d.x-n,d.y-i);f<=o.radius&&a.push({name:d.name,guildName:p,objectId:d.objectId,x:d.x,y:d.y,distance:f})}let l=new Set(a.map(d=>d.objectId)),c=o.prevByClient.get(r);if(c===void 0){o.prevByClient.set(r,new Set(l));continue}let u=[];for(let d of a)c.has(d.objectId)||u.push(d);if(o.prevByClient.set(r,new Set(l)),u.length!==0)try{o.handler({entered:u,inRange:a,radius:o.radius})}catch(d){m.error("ScriptEvents","onGuildNearby handler failed",d)}}}function $w(r,e){let t=r.objectId;if(!t)return;let n=r.playerData.pos.x,i=r.playerData.pos.y,s=e.worldState.getAllPlayersRawStatsForDashboard(e.gameData);for(let o of oo){let a=[];for(let d of s){if(d.objectId===t)continue;let p=d.name.trim().toLowerCase();if(!o.names.has(p))continue;let f=Math.hypot(d.x-n,d.y-i);f<=o.radius&&a.push({name:d.name,objectId:d.objectId,x:d.x,y:d.y,distance:f})}let l=new Set(a.map(d=>d.name.trim().toLowerCase())),c=o.prevByClient.get(r);if(c===void 0){o.prevByClient.set(r,new Set(l));continue}let u=[];for(let d of a){let p=d.name.trim().toLowerCase();c.has(p)||u.push(d)}if(o.prevByClient.set(r,new Set(l)),u.length!==0)try{o.handler({entered:u,inRange:a,radius:o.radius})}catch(d){m.error("ScriptEvents","onPlayerNearby handler failed",d)}}}function cr(r,e){return on.has(r)||on.set(r,[]),on.get(r).push(e),()=>{let t=on.get(r)??[];on.set(r,t.filter(n=>n!==e))}}function ur(r,e){for(let t of on.get(r)??[])try{t(e)}catch(n){m.error("ScriptEvents",`events.${r} handler failed`,n)}}function Bw(r,e){if(!Array.isArray(r))return"";for(let t of r)if(t&&t.id===e&&typeof t.value=="string")return String(t.value).trim();return""}function jw(r,e){let n={threshold:Math.floor(Number(r))||0,handler:e};return so.push(n),()=>{let i=so.indexOf(n);i>=0&&so.splice(i,1)}}function Nf(r){let e=r.playerData.characterAliveFame,t=uo.get(r);if(t!==void 0){for(let{threshold:n,handler:i}of so)if(t<n&&e>=n)try{i({fame:e,threshold:n})}catch(s){m.error("ScriptEvents","onCharacterFameAtLeast handler failed",s)}}uo.set(r,e)}function Af(r,e){let t=r.playerData.inventory,n=ti.get(r);if(!n||n.length!==t.length){ti.set(r,[...t]);return}for(let i=0;i<t.length;i++){let s=n[i],o=t[i],a=!Number.isFinite(s)||s<0,l=Number.isFinite(o)&&o>=0;if(a&&l){let c=e.gameData.buildSdkItem(o);ur("itemPickedUp",{slotIndex:i,objectType:o,itemName:c?.name})}}ti.set(r,[...t])}function Fw(r,e,t){if(!e.isDefined||!e.data.statuses)return;let n=!1;for(let o of e.data.statuses)if(o.objectId===r.objectId){n=!0;break}if(!n)return;let i=co.get(r),s=r.playerData.level;i!==void 0&&s>i&&ur("levelUp",{newLevel:s}),co.set(r,s),Af(r,t),Nf(r)}function Of(r){De.events.onPlayerDied=e=>cr("playerDied",e),De.events.onEnemySpawned=e=>cr("enemySpawned",e),De.events.onEnemySpawnedOfType=(e,t)=>De.events.onEnemySpawned(n=>{n.objectType===e&&t(n)}),De.events.onMapChanged=e=>cr("mapChanged",e),De.events.onConnected=e=>cr("connected",e),De.events.onDisconnected=e=>cr("disconnected",e),De.events.onLevelUp=e=>cr("levelUp",e),De.events.onItemPickedUp=e=>cr("itemPickedUp",e),De.events.onPortalOpened=e=>cr("portalOpened",e),De.events.onCharacterFameAtLeast=(e,t)=>jw(e,t),De.events.onPlayerNearby=(e,t,n)=>Aw(e,t,n),De.events.onGuildNearby=((e,t,n,i)=>Dw(e,t,n,i)),De.events.onPlayerJoinParty=((e,t,n)=>Iw(e,t,n)),De.events.onChat=(e,t)=>{let n=String(e).trim().toLowerCase();return n?De.chat.onMessage(i=>{if(i.message.toLowerCase().includes(n))try{t(i)}catch(s){m.error("ScriptEvents","onChat handler failed",s)}}):()=>{}},r.proxy.hookPacket("DEATH",(e,t)=>{if(!t.isDefined)return;let n=String(t.data.killedBy??"").trim(),i=(e.playerData.name||"").trim()||"Unknown";ur("playerDied",{playerName:i,isLocal:!0,killedBy:n||void 0})}),r.proxy.hookPacket("MAPINFO",(e,t)=>{if(!t.isDefined)return;let n=t.data,i=ss(n.displayName??"",n.name??""),s=Number(n.width)||0,o=Number(n.height)||0;ur("mapChanged",{mapName:i,width:s,height:o})}),r.proxy.hookPacket("CREATESUCCESS",(e,t)=>{if(!t.isDefined)return;co.delete(e),uo.delete(e),ti.set(e,[...e.playerData.inventory]);let n=e.state?.conTargetAddress,i=e.state?.conTargetPort;ur("connected",{serverAddress:n?`${n}:${i??2050}`:void 0})}),r.proxy.on("clientDisconnected",e=>{co.delete(e),uo.delete(e),ti.delete(e),ur("disconnected",{serverAddress:e.state?.conTargetAddress?`${e.state.conTargetAddress}:${e.state.conTargetPort??2050}`:void 0})}),r.proxy.hookPacket("UPDATE",(e,t)=>{if(!t.isDefined||!t.data.newObjs)return;let n=!1;for(let i of t.data.newObjs){let s=i.status;if(!s)continue;s.objectId===e.objectId&&(n=!0);let o=Number(i.objectType);if(!Number.isFinite(o)||o<=0)continue;let a=r.gameData.getObjectCategory(o),l=s.position??{x:0,y:0};if(a==="Enemy"){let c=Bw(s.data,x.NameStat),u=r.gameData.getObject(o),d=c||u?.displayId||u?.id||`0x${o.toString(16)}`;ur("enemySpawned",{objectType:o,objectId:s.objectId,name:d,position:{x:l.x,y:l.y}})}if(a==="Portal"){let c=r.gameData.getObject(o),u=c?.displayId||c?.id||`Portal 0x${o.toString(16)}`;ur("portalOpened",{portalName:u,objectId:s.objectId,position:{x:l.x,y:l.y}})}}n&&(Af(e,r),Nf(e))}),r.proxy.hookPacket("NEWTICK",(e,t)=>{Fw(e,t,r),$w(e,r),Lw(e,r)}),r.proxy.hookPacket("PARTYMEMBERADDED",(e,t)=>{Rw(e,t)})}var ee=G(fe(),1);Q();var dt=G(fe(),1);Q();var ni=new WeakMap,Mf=!1;function ri(r){return Array.isArray(r)?r.map(e=>{let t=Math.trunc(Number(e));return Number.isFinite(t)?t:-1}):[]}function He(r,e=0){let t=Number(r);return Number.isFinite(t)?Math.trunc(t):e}function qt(r){return ni.get(r)??null}function Df(r,e,t){if(!(e<0)){for(;r.contents.length<=e;)r.contents.push(-1);r.contents[e]=t<0?-1:t}}function Lf(r){Mf||(Mf=!0,r.proxy.hookPacket("VAULTCONTENT",(e,t)=>{if(!t.isDefined||!t.data)return;let n=t.data,i={capturedAt:Date.now(),lastVaultUpdate:!!n.lastVaultUpdate,vault:{objectId:He(n.vaultChestObjectId,-1),contents:ri(n.vaultContents)},material:{objectId:He(n.materialChestObjectId,-1),contents:ri(n.materialContents)},gift:{objectId:He(n.giftChestObjectId,-1),contents:ri(n.giftContents)},potion:{objectId:He(n.potionStorageObjectId,-1),contents:ri(n.potionContents)},seasonalSpoils:{objectId:He(n.seasonalSpoilChestObjectId,-1),contents:ri(n.seasonalSpoilContent)},vaultUpgradeCost:He(n.vaultUpgradeCost),materialUpgradeCost:He(n.materialUpgradeCost),seasonalSpoilUpgradeCost:He(n.seasonalSpoilUpgradeCost),potionUpgradeCost:He(n.potionUpgradeCost),currentPotionMax:He(n.currentPotionMax),nextPotionMax:He(n.nextPotionMax),vaultChestEnchants:String(n.vaultChestEnchants??""),giftChestEnchants:String(n.giftChestEnchants??""),spoilsChestEnchants:String(n.spoilsChestEnchants??"")};e.playerData.vaultChestObjectId=i.vault.objectId,e.playerData.vaultContent=[],ni.set(e,i),m.log("VaultStore",`VAULTCONTENT: vault oid=${i.vault.objectId} slots=${i.vault.contents.length} material oid=${i.material.objectId} gift oid=${i.gift.objectId} potion oid=${i.potion.objectId}`)}),r.proxy.hookPacket("INVRESULT",(e,t)=>{if(!t.isDefined||!t.data||(e.state?.gameId??-999)!==kr.Vault)return;let n=ni.get(e);if(!n)return;let i=t.data.fromSlot,s=t.data.toSlot;if(!i||!s)return;let o=He(i.objectId,-1),a=He(s.objectId,-1),l=He(i.slotId,-1),c=He(s.slotId,-1),u=He(i.objectType,-1),d=He(s.objectType,-1),p=[n.vault,n.material,n.gift,n.potion,n.seasonalSpoils];for(let f of p)f.objectId<=0||(o===f.objectId&&Df(f,l,d),a===f.objectId&&Df(f,c,u))}),r.proxy.hookPacket("MAPINFO",e=>{ni.has(e)&&(ni.delete(e),e.playerData.vaultChestObjectId=-1)}))}var Bf=kr.Vault;function $f(r){return r===void 0||!Number.isFinite(r)||r<0?-1:Math.trunc(r)}function dr(r,e){return e<0||e>=dt.INVENTORY_TOTAL_SLOT_COUNT?-1:e<dt.INVENTORY_MAIN_SLOT_COUNT?$f(r.inventory[e]):$f(r.backpack[e-dt.INVENTORY_MAIN_SLOT_COUNT])}function jf(r,e,t){let n=t<0?-1:Math.trunc(t);e<dt.INVENTORY_MAIN_SLOT_COUNT?r.inventory[e]=n:r.backpack[e-dt.INVENTORY_MAIN_SLOT_COUNT]=n}function Hw(r){for(let e=4;e<dt.INVENTORY_TOTAL_SLOT_COUNT;e++)if(dr(r,e)<0)return e;return null}function Ww(r){for(let e=4;e<dt.INVENTORY_TOTAL_SLOT_COUNT;e++)if(dr(r,e)>=0)return e;return null}function Gw(r){for(let e=0;e<r.length;e++)if(r[e]===-1||r[e]===void 0)return e;return null}function Ff(r,e){let t=r.clientRef.current;if(!t)return null;let n=qt(t);return!n||n.vault.contents.length===0?null:n.vault.contents.slice()}function Hf(r,e,t,n){let i=r.clientRef.current;if(!i)return;let s=qt(i);if(!s)return;let o=s.vault.contents;for(;o.length<=t;)o.push(-1);o[t]=n<0?-1:Math.trunc(n)}function Uw(r,e){let t=Math.trunc(e);if(r.length===0)return null;if(t>=0&&t<r.length){let n=Math.trunc(r[t])|0;if(n>=0)return{slot:t,itemType:n}}for(let n=0;n<r.length;n++){let i=Math.trunc(r[n]??-1)|0;if(i>=0&&i===t)return{slot:n,itemType:i}}return null}function Vw(r){for(let e=0;e<r.length;e++){let t=Math.trunc(r[e]??-1)|0;if(t>=0)return{slot:e,itemType:t}}return null}function qw(r,e){let t=Math.trunc(e);if(t>=4&&t<dt.INVENTORY_TOTAL_SLOT_COUNT){let n=dr(r,t);if(n>=0)return{slot:t,itemType:n}}for(let n=4;n<dt.INVENTORY_TOTAL_SLOT_COUNT;n++){let i=dr(r,n);if(i>=0&&i===t)return{slot:n,itemType:i}}return null}function Wf(r,e,t,n){try{let i=r.proxy.packetFactory.createByName("INVENTORYSWAP"),s=e.playerData;return i.data.time=Math.trunc(e.time),i.data.position={x:s.pos.x,y:s.pos.y},i.data.slotObject1={objectId:t.objectId,slotId:t.slotId,objectType:t.objectType},i.data.slotObject2={objectId:n.objectId,slotId:n.slotId,objectType:n.objectType},i.modified=!0,e.sendToServer(i),!0}catch(i){return m.warn("InventoryVault",`INVENTORYSWAP: ${i.message}`),!1}}function Gf(r,e,t){let n=r.clientRef.current;if(!n?.connected)return m.warn("InventoryVault","withdraw: no connection"),!1;if((n.state?.gameId??-999)!==Bf)return m.warn("InventoryVault","withdraw: must be in vault"),!1;let i=n.playerData,o=qt(n)?.vault.objectId??-1;if(o<=0)return m.warn("InventoryVault","withdraw: vault chest objectId unknown (wait for VAULTCONTENT)"),!1;let a=i.ownerObjectId||n.objectId;if(a<=0)return m.warn("InventoryVault","withdraw: player objectId unknown"),!1;let l=Ff(r,i);if(!l||l.length===0)return m.warn("InventoryVault","withdraw: vault contents unavailable (wait for VAULTCONTENT)"),!1;let c,u,d;if(t==="container"){let g=Uw(l,e);if(!g)return m.warn("InventoryVault","withdraw: no matching vault slot or type"),!1;c=g.slot,u=g.itemType;let y=Hw(i);if(y===null)return m.warn("InventoryVault","withdraw: inventory full"),!1;d=y}else{if(d=Math.trunc(e),d<0||d>=dt.INVENTORY_TOTAL_SLOT_COUNT)return m.warn("InventoryVault","withdraw: invalid destination inventory slot"),!1;if(dr(i,d)>=0)return m.warn("InventoryVault","withdraw: destination inventory slot must be empty"),!1;let g=Vw(l);if(!g)return m.warn("InventoryVault","withdraw: vault empty"),!1;c=g.slot,u=g.itemType}let p=Math.trunc(l[c]??-1)|0,f=dr(i,d);return Wf(r,n,{objectId:o,slotId:c,objectType:p>=0?p:u},{objectId:a,slotId:d,objectType:f>=0?f:-1})?(Hf(r,i,c,-1),jf(i,d,u),!0):!1}function Uf(r,e,t){let n=r.clientRef.current;if(!n?.connected)return m.warn("InventoryVault","deposit: no connection"),!1;if((n.state?.gameId??-999)!==Bf)return m.warn("InventoryVault","deposit: must be in vault"),!1;let i=n.playerData,o=qt(n)?.vault.objectId??-1;if(o<=0)return m.warn("InventoryVault","deposit: vault chest objectId unknown (wait for VAULTCONTENT)"),!1;let a=i.ownerObjectId||n.objectId;if(a<=0)return m.warn("InventoryVault","deposit: player objectId unknown"),!1;let l=Ff(r,i);if(!l||l.length===0)return m.warn("InventoryVault","deposit: vault contents unavailable (wait for VAULTCONTENT)"),!1;let c,u,d;if(t==="inventory"){let g=qw(i,e);if(!g)return m.warn("InventoryVault","deposit: no matching inventory slot or type"),!1;c=g.slot,u=g.itemType;let y=Gw(l);if(y===null)return m.warn("InventoryVault","deposit: vault full"),!1;d=y}else{if(d=Math.trunc(e),d<0||d>=l.length)return m.warn("InventoryVault","deposit: invalid destination vault slot"),!1;if(l[d]!==-1&&l[d]!==void 0)return m.warn("InventoryVault","deposit: destination vault slot must be empty"),!1;let g=Ww(i);if(g===null)return m.warn("InventoryVault","deposit: inventory empty"),!1;c=g,u=dr(i,c)}let p=dr(i,c),f=Math.trunc(l[d]??-1)|0;return Wf(r,n,{objectId:a,slotId:c,objectType:p>=0?p:u},{objectId:o,slotId:d,objectType:f>=0?f:-1})?(jf(i,c,-1),Hf(r,i,d,u),!0):!1}function Rr(r){return r.clientRef.current?.playerData??null}function Jw(r){return r?r.backpackTier>=16?3:r.backpackTier!==0||r.legacyHasBackpackStat75?2:1:1}function fo(r){return r===void 0||!Number.isFinite(r)||r<0?-1:Math.trunc(r)}function ii(r,e){return e<0||e>=ee.INVENTORY_TOTAL_SLOT_COUNT?-1:e<ee.INVENTORY_MAIN_SLOT_COUNT?fo(r.inventory[e]):fo(r.backpack[e-ee.INVENTORY_MAIN_SLOT_COUNT])}function qf(r,e){return r.gameData.buildSdkItem(e)?.name}function Vl(r,e,t){return{objectType:t,slotIndex:e,itemName:qf(r,t)}}function Vf(r,e,t){if(typeof t=="number"&&Number.isFinite(t))return e===Math.trunc(t);let n=String(t).trim().toLowerCase();return n?(qf(r,e)?.toLowerCase()??"").includes(n)?!0:(r.gameData.getObject(e)?.id?.toLowerCase()??"").includes(n):!1}function Jf(r){Lf(r),ee.inventory.withdraw=(t,n)=>Gf(r,t,n),ee.inventory.deposit=(t,n)=>Uf(r,t,n);function e(t){let n=r.clientRef.current;if(!n)throw new Error(`inventory.${t}: not connected`);let i=qt(n);if(!i)throw new Error(`inventory.${t}: vault not entered yet (no VAULTCONTENT received)`);return i}ee.inventory.getVault=()=>e("getVault").vault.contents.slice(),ee.inventory.getEntireVault=()=>{let t=e("getEntireVault");return{capturedAt:t.capturedAt,vault:t.vault.contents.slice(),material:t.material.contents.slice(),gift:t.gift.contents.slice(),potion:t.potion.contents.slice(),seasonalSpoils:t.seasonalSpoils.contents.slice()}},ee.inventory.getMaterials=()=>e("getMaterials").material.contents.slice(),ee.inventory.getPotions=()=>e("getPotions").potion.contents.slice(),ee.inventory.getGifts=()=>e("getGifts").gift.contents.slice(),ee.inventory.getSeasonalSpoils=()=>e("getSeasonalSpoils").seasonalSpoils.contents.slice(),ee.inventory.getSlot=t=>{let n=Rr(r);if(!n||t<0||t>=ee.INVENTORY_TOTAL_SLOT_COUNT)return null;let i=ii(n,t);return i<0?null:Vl(r,t,i)},ee.inventory.getAll=()=>{let t=Rr(r),n=new Array(ee.INVENTORY_TOTAL_SLOT_COUNT).fill(-1);if(!t)return n;for(let i=0;i<ee.INVENTORY_MAIN_SLOT_COUNT;i++)n[i]=fo(t.inventory[i]);for(let i=0;i<ee.INVENTORY_BACKPACK_SLOT_COUNT;i++)n[ee.INVENTORY_MAIN_SLOT_COUNT+i]=fo(t.backpack[i]);return n},ee.inventory.findItem=t=>{let n=Rr(r);if(!n)return null;for(let i=0;i<ee.INVENTORY_TOTAL_SLOT_COUNT;i++){let s=ii(n,i);if(!(s<0)&&Vf(r,s,t))return Vl(r,i,s)}return null},ee.inventory.findItems=t=>{let n=Rr(r);if(!n)return[];let i=[];for(let s=0;s<ee.INVENTORY_TOTAL_SLOT_COUNT;s++){let o=ii(n,s);o<0||Vf(r,o,t)&&i.push(Vl(r,s,o))}return i},ee.inventory.useItem=t=>{v("inventory.useItem")},ee.inventory.swapSlots=(t,n)=>{v("inventory.swapSlots")},ee.inventory.isFull=()=>{let t=Rr(r);if(!t)return!1;for(let n=4;n<ee.INVENTORY_MAIN_SLOT_COUNT;n++)if(ii(t,n)<0)return!1;return!0},ee.inventory.emptySlotCount=()=>{let t=Rr(r);if(!t)return 8;let n=0;for(let i=4;i<ee.INVENTORY_MAIN_SLOT_COUNT;i++)ii(t,i)<0&&n++;return n},ee.inventory.getBackpack=()=>Jw(Rr(r))}var Pe=G(fe(),1);Q();var Kw=new Set([1280,1281,1283,1286,1287,1288,1289,1291,1292,1294,1295,1296,1708,1709,1710,1722,1723,1724,1725,1726,1727,1728,8239]),zw={1280:"common",1281:"common",1283:"green",1286:"purple",1287:"purple",1288:"blue",1289:"blue",1291:"white",1292:"white",1294:"purple",1295:"purple",1296:"purple",1708:"common",1709:"common",1710:"blue",1722:"purple",1723:"purple",1724:"white",1725:"white",1726:"purple",1727:"purple",1728:"purple",8239:"common"},ip=new Set([2594,2736]),sp=new Set([2595,2781]),op=new Set([2793,2794,5471,5472,9070,9071]),ap=new Set([2591,2592,2593,2612,2613,2636,5465,5466,5467,5468,5469,5470,5094,9064,9065,9066,9067,9068,9069]),lp=new Set([1,2,3,8,17,24]),cp=new Set([4,5,11,12,13,15,16,18,19,20,21,22,23,25,27,28,29,30,31]),up=new Set([6,7,14]),dp=new Set([9]),Kf=new Set([10,26]);function Yw(r){return lp.has(r)||cp.has(r)||up.has(r)||dp.has(r)}function Jl(r,e){return r==="ST"?!1:r==="UT"?!0:r!==""?!1:Yw(e)}function Xw(r){return lp.has(r)?"weapon":cp.has(r)?"ability":up.has(r)?"armor":dp.has(r)?"ring":null}var ln=new Map;function Qw(r){ln=new Map;for(let e of r.gameData.getAllObjects()){let t=Number(e.slotType??-1);if(!Number.isFinite(t)||t<0)continue;let n=Math.trunc(t),i=String(e.tierStr??"").trim().toUpperCase(),s=i==="ST",o=Jl(i,n),a=o||s||!/^-?\d+$/.test(i)?null:Number(i),l=String(e.id||"").trim()||`0x${e.type.toString(16)}`;ln.set(e.type,{slotType:n,tier:a,isUT:o,isST:s,name:l,quickslotAllowed:e.quickslotAllowed===!0})}}var zf={unknown:-1,common:0,green:1,blue:2,purple:3,white:4},Mt=new Map,an=new Map;function Yf(r,e){return an.has(r)||an.set(r,[]),an.get(r).push(e),()=>{let t=an.get(r)??[];an.set(r,t.filter(n=>n!==e))}}function Xf(r,e){for(let t of an.get(r)??[])try{t(e)}catch(n){m.warn("BridgeLoot",`listener error: ${n.message}`)}}function Zw(r,e){let t=Number(r.objectType);if(!Kw.has(t))return null;let n=r.status;if(!n)return null;let i=Number(n.objectId),s=n.position?{x:Number(n.position.x),y:Number(n.position.y)}:{x:0,y:0},o={};if(n.data&&Array.isArray(n.data))for(let c of n.data)c&&c.id!=null&&(o[String(c.id)]=Number(c.value));let a=[];for(let c=0;c<8;c++){let u=o[String(x.Inventory0+c)];if(!Number.isFinite(u)||u<=0)continue;let d=e.gameData.getObject(u);a.push({objectType:u,slotIndex:c,itemName:d?.id})}let l=zw[t]??"unknown";return{objectId:i,bagType:t,rarity:l,position:s,items:a,droppedAt:Date.now()}}function eE(r,e,t){if(e.isDefined){if(e.data.newObjs)for(let n of e.data.newObjs){let i=Zw(n,t);i&&(Mt.set(i.objectId,i),Xf("bagDropped",{bag:i}))}if(e.data.drops)for(let n of e.data.drops){let i=Mt.get(Number(n));i&&(Mt.delete(Number(n)),Xf("bagRemoved",{bag:i}))}}}var Qf=1e6,Zf=3;function ql(r,e,t){let n=r.worldState.getEntity(e);if(!n)return-1;let i=n.stats?.[String(x.Inventory0+t)],s=Number(i);return Number.isFinite(s)?Math.trunc(s):-1}function ep(r,e=!0,t){for(let n=4;n<=11;n++){if(t?.has(n))continue;if(Number(r.playerData.inventory[n]??-1)===-1)return{packetSlotId:n,currentObjectType:-1}}if(e&&r.playerData.hasBackpack)for(let n=0;n<16;n++){let i=12+n;if(t?.has(i))continue;if(Number(r.playerData.backpack[n]??-1)===-1)return{packetSlotId:i,currentObjectType:-1}}return null}function tp(r,e,t){if(!ln.get(e)?.quickslotAllowed)return null;for(let i=0;i<Zf;i++){let s=Qf+i;if(t?.has(s))continue;let o=Number(r.playerData.quickSlots[i]??-1);if(o===e)return{packetSlotId:s,currentObjectType:o}}for(let i=0;i<Zf;i++){let s=Qf+i;if(t?.has(s))continue;if(Number(r.playerData.quickSlots[i]??-1)===-1)return{packetSlotId:s,currentObjectType:-1}}return null}function rp(r,e,t,n,i,s){let o=e.proxy.packetFactory.createByName("INVENTORYSWAP");o.data.time=Math.trunc(r.time),o.data.position={x:Number(r.playerData.pos?.x??0),y:Number(r.playerData.pos?.y??0)},o.data.slotObject1={objectId:t,slotId:n,objectType:i},o.data.slotObject2={objectId:r.objectId,slotId:s.packetSlotId,objectType:s.currentObjectType},o.modified=!0,r.sendToServer(o)}function tE(r,e,t){if(!Number.isFinite(r)||r<=0)return!1;let n=e.blacklist?new Set(e.blacklist):null,i=e.whitelist?new Set(e.whitelist):null;if(n?.has(r))return!1;if(i?.has(r))return!0;if(ip.has(r))return e.includeHpPotions??!1;if(sp.has(r))return e.includeMpPotions??!1;if(op.has(r))return e.includeLifeManaPotions??!0;if(ap.has(r))return e.includeStatPotions??!0;let s=ln.get(r);if(!s){let l=t.gameData.getObject(r);if(l&&(e.includeUTs??!0)){let c=Math.trunc(Number(l.slotType??-1)),u=String(l.tierStr??"").trim().toUpperCase();if(Jl(u,c)&&!Kf.has(c))return!0}return!1}if(e.includeMarks&&s.name.includes("Mark of ")||e.includeEggs&&s.name.endsWith(" Egg"))return!0;if(s.isUT)return e.includeUTs??!0?!Kf.has(s.slotType):!1;if(s.isST)return e.includeSTs??!1;let o=Xw(s.slotType);if(!o)return!1;let a;switch(o){case"weapon":a=e.minWeaponTier??0;break;case"ability":a=e.minAbilityTier??0;break;case"armor":a=e.minArmorTier??0;break;case"ring":a=e.minRingTier??0;break}return s.tier!=null&&s.tier>=a}var np=!1;function fp(r){np||(np=!0,Qw(r),r.proxy.hookPacket("UPDATE",(e,t)=>{try{eE(e,t,r)}catch(n){m.warn("BridgeLoot",`UPDATE hook error: ${n.message}`)}}),r.proxy.hookPacket("MAPINFO",()=>{Mt.clear()})),Pe.loot.getBags=()=>Array.from(Mt.values()),Pe.loot.getNearbyBags=(e=5)=>{let t=r.clientRef.current?.playerData;if(!t)return Array.from(Mt.values());let{x:n,y:i}=t.pos;return Array.from(Mt.values()).filter(s=>Math.hypot(s.position.x-n,s.position.y-i)<=e)},Pe.loot.getBagsByRarity=e=>Array.from(Mt.values()).filter(t=>t.rarity===e),Pe.loot.getBagsContaining=e=>Array.from(Mt.values()).filter(t=>t.items.some(n=>n.objectType===e)),Pe.loot.onBagDropped=e=>Yf("bagDropped",e),Pe.loot.onRareBagDropped=(e,t)=>Pe.loot.onBagDropped(n=>{zf[n.bag.rarity]>=zf[e]&&t(n)}),Pe.loot.onItemDropped=(e,t)=>Pe.loot.onBagDropped(n=>{let i=n.bag.items.find(s=>s.objectType===e);i&&t({bag:n.bag,item:i})}),Pe.loot.onBagRemoved=e=>Yf("bagRemoved",e),Pe.loot.pickup=(e,t,n)=>{let i=r.clientRef.current;if(!i?.connected||!i.objectId)return!1;let s=ql(r,e.objectId,t);if(s<=0)return!1;let o=n?.useBackpack??!0,a=tp(i,s)??ep(i,o);if(!a)return!1;try{return rp(i,r,e.objectId,t,s,a),!0}catch(l){return m.warn("BridgeLoot",`pickup failed: ${l.message}`),!1}},Pe.loot.pickupId=(e,t)=>{let n=r.clientRef.current;if(!n?.connected||!n.objectId)return-1;let i=Mt.get(e),s=r.worldState.getEntity(e);if(!s)return-1;let o=Number(s.pos?.x??i?.position.x??0),a=Number(s.pos?.y??i?.position.y??0),l=Number(n.playerData.pos?.x??0),c=Number(n.playerData.pos?.y??0),u=t?.maxDistance??1;if(Math.hypot(o-l,a-c)>u)return-1;let d=t?.useBackpack??!0,p=new Set,f=0;for(let h=0;h<8;h++){let g=ql(r,e,h);if(g<=0)continue;let y=tp(n,g,p)??ep(n,d,p);if(y){p.add(y.packetSlotId);try{rp(n,r,e,h,g,y),f++}catch(b){m.warn("BridgeLoot",`pickupId slot ${h} failed: ${b.message}`)}}}return f},Pe.loot.useFromBag=(e,t)=>{let n=r.clientRef.current;if(!n?.connected)return!1;let i=ql(r,e.objectId,t);if(i<=0)return!1;try{let s=r.proxy.packetFactory.createByName("USEITEM");return s.data.time=Math.trunc(n.time),s.data.slotObject={objectId:e.objectId,slotId:t,objectType:i},s.data.itemUsePos={x:0,y:0},s.data.useType=0,s.data.unknownInt=0,s.modified=!0,n.sendToServer(s),!0}catch(s){return m.warn("BridgeLoot",`useFromBag failed: ${s.message}`),!1}},Pe.loot.shouldPickup=(e,t={})=>tE(e,t,r),Pe.loot.isUT=e=>{let t=ln.get(e);if(t)return t.isUT;let n=r.gameData.getObject(e);if(!n)return!1;let i=Math.trunc(Number(n.slotType??-1));return Jl(String(n.tierStr??"").trim().toUpperCase(),i)},Pe.loot.isST=e=>{let t=ln.get(e);if(t)return t.isST;let n=r.gameData.getObject(e);return n?String(n.tierStr??"").trim().toUpperCase()==="ST":!1},Pe.loot.isStatPot=e=>ap.has(e),Pe.loot.isHpPot=e=>ip.has(e),Pe.loot.isMpPot=e=>sp.has(e),Pe.loot.isLifeManaPot=e=>op.has(e)}var we=G(fe(),1),si=new Map,oi=new Map,rE=300*1e3,nE={red:16724787,green:4177763,blue:3447003,gold:15844367,white:16777215,purple:10181046,orange:15105570,gray:9807270};function po(r){return new Promise(e=>setTimeout(e,Math.max(0,r)))}function iE(r){if(r!==void 0)return typeof r=="number"?r:nE[r]}function sE(r){if(r)return r===!0?new Date().toISOString():r instanceof Date?r.toISOString():String(r)}function oE(r){if(r)return{parse:r.parse??[],roles:r.roles,users:r.users,replied_user:r.repliedUser??!1}}function aE(r){if(r)return Array.isArray(r)?r:Object.entries(r).map(([e,t])=>({name:e,value:t==null?"":String(t),inline:!0}))}function lE(r){let e=typeof r.footer=="string"?{text:r.footer}:r.footer;return{title:r.title,description:r.description,color:iE(r.color),fields:aE(r.fields)?.map(t=>({name:t.name,value:t.value,inline:t.inline??!1})),footer:e?{text:e.text,icon_url:e.iconUrl}:void 0,timestamp:sE(r.timestamp)}}function cE(r,e){let t={};return e.content&&(t.content=e.content),(e.username??r.options.username)&&(t.username=e.username??r.options.username),(e.avatarUrl??r.options.avatarUrl)&&(t.avatar_url=e.avatarUrl??r.options.avatarUrl),t.allowed_mentions=oE(e.allowedMentions??r.options.allowedMentions??{parse:[]}),e.embeds?.length&&(t.embeds=e.embeds.map(n=>lE(n))),t}async function uE(r){try{return await r.text()}catch{return""}}function dE(r,e){try{let t=JSON.parse(r),n=Number(t.retry_after);if(Number.isFinite(n)&&n>0)return n<100?Math.ceil(n*1e3):Math.ceil(n)}catch{}return e}async function fE(r,e){let t=r.options.timeoutMs??1e4,n=r.options.retries??2,i=r.options.retryDelayMs??1e3;for(let s=0;s<=n;s++){let o=new AbortController,a=setTimeout(()=>o.abort(),t);try{let l=await fetch(r.options.url,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e),signal:o.signal});if(l.ok)return;let c=await uE(l);if((l.status===429||l.status>=500)&&s<n){let p=l.status===429?dE(c,i):i;await po(p);continue}let d=c?`: ${c.slice(0,500)}`:"";throw new Error(`Discord webhook failed: ${l.status} ${l.statusText}${d}`)}catch(l){if(l?.name==="AbortError"){if(s<n){await po(i);continue}throw new Error(`Discord webhook timed out after ${t}ms`)}if(s<n){await po(i);continue}throw l}finally{clearTimeout(a)}}}async function pE(r,e){let t=r.options.url,n=si.get(t),i=n?.promise??Promise.resolve(),s=n??{promise:Promise.resolve(),inFlight:0};s.inFlight++,si.set(t,s);let o=i.catch(()=>{}).then(async()=>{let a=r.options.minIntervalMs??250,l=Date.now()-(oi.get(t)??0);l<a&&await po(a-l),await e(),oi.set(t,Date.now())});return s.promise=o.catch(()=>{}),s.promise.then(()=>{if(s.inFlight--,s.inFlight<=0&&si.get(t)===s){si.delete(t);let a=oi.get(t);a!==void 0&&setTimeout(()=>{si.has(t)||oi.get(t)===a&&oi.delete(t)},rE).unref?.()}}),o}function mE(r){let e=r.item;return e?e.itemName??`ID:${e.objectType}`:r.bag.items.map(t=>t.itemName??`ID:${t.objectType}`).join(", ")||"(empty)"}function pp(r){we.DiscordWebhook.prototype.send=async function(e){let t=cE(this,e);await pE(this,()=>fE(this,t))},we.DiscordWebhook.prototype.sendSafe=async function(e){try{return await this.send(e),!0}catch(t){return we.Log.warn(`Discord webhook send failed: ${t instanceof Error?t.message:String(t)}`),!1}},we.DiscordWebhook.prototype.sendText=async function(e){return this.send({content:e})},we.DiscordWebhook.prototype.sendEmbed=async function(e,t={}){return this.send({...t,embeds:[e]})},we.DiscordWebhook.prototype.sendDeath=async function(e){return this.sendEmbed({title:e.isLocal?"You Died":`${e.playerName} Died`,description:`Killed by: ${e.killedBy??"unknown"}`,color:"red",fields:{Player:e.playerName,Map:we.RealmEngine.world.getName()},timestamp:!0})},we.DiscordWebhook.prototype.sendLoot=async function(e){return this.sendEmbed({title:`${e.bag.rarity.toUpperCase()} bag`,description:mE(e),color:e.bag.rarity==="white"?"white":e.bag.rarity==="purple"?"purple":"blue",fields:{Map:we.RealmEngine.world.getName(),Owner:e.bag.ownerName??"unknown",Position:`${e.bag.position.x.toFixed(1)}, ${e.bag.position.y.toFixed(1)}`},timestamp:!0})},we.DiscordWebhook.prototype.sendFameSnapshot=async function(){return this.sendEmbed({title:"Fame Snapshot",color:"gold",fields:{Player:we.RealmEngine.self.getName(),Class:we.RealmEngine.self.getClass(),CharacterFame:we.RealmEngine.self.getCharacterFame(),AccountFame:we.RealmEngine.self.getAccountFame(),PowerLevel:we.RealmEngine.self.getPowerLevel(),Map:we.RealmEngine.world.getName()},timestamp:!0})},we.DiscordWebhook.prototype.sendPartyStatus=async function(){let e=we.RealmEngine.party.getPartyMembers();return this.sendEmbed({title:"Party Status",color:"blue",description:e.length?e.map(t=>`${t.playerName} (${t.classId})`).join(`
`):"No current party members.",fields:{Count:e.length,Map:we.RealmEngine.world.getName()},timestamp:!0})}}var fr=G(fe(),1);Q();function ai(r,e,t){let n=r.clientRef.current;if(!n?.connected)return!1;try{let i=r.proxy.packetFactory.createByName(e);return Object.assign(i.data,t),i.modified=!0,n.sendToServer(i),!0}catch(i){return m.warn("Guild",`${e} send failed: ${i.message}`),!1}}function mp(r){let e=new Set,t=new Set;r.proxy.hookPacket("INVITEDTOGUILD",(n,i)=>{if(!i.isDefined||e.size===0)return;let s=i.data,o={inviterName:String(s.name??""),guildName:String(s.guildName??"")};for(let a of e)try{a(o)}catch(l){m.error("Guild","onInvited handler threw",l)}}),r.proxy.hookPacket("GUILDRESULT",(n,i)=>{if(!i.isDefined||t.size===0)return;let s=i.data,o={success:!!s.success,message:String(s.lineBuilderJSON??"")};for(let a of t)try{a(o)}catch(l){m.error("Guild","onResult handler threw",l)}}),fr.guild.invite=n=>{ai(r,"GUILDINVITE",{name:String(n)})},fr.guild.remove=n=>{ai(r,"GUILDREMOVE",{name:String(n)})},fr.guild.leave=()=>{let n=r.clientRef.current;if(!n?.connected)return;let i=n.playerData.name;if(!i){m.warn("Guild","leave: character name not yet known");return}ai(r,"GUILDREMOVE",{name:i})},fr.guild.join=n=>{ai(r,"JOINGUILD",{guildName:String(n)})},fr.guild.setRank=(n,i)=>{ai(r,"CHANGEGUILDRANK",{name:String(n),guildRank:Math.trunc(Number(i))})},fr.guild.onInvited=n=>(e.add(n),()=>{e.delete(n)}),fr.guild.onResult=n=>(t.add(n),()=>{t.delete(n)})}function mo(r,e){return r.map(t=>{let n={...t},i=typeof t.id=="string"?String(t.id):void 0;if(i){let a=e.get(i)??{};typeof n.onClick=="function"&&(a.onClick=n.onClick,delete n.onClick),typeof n.onChange=="function"&&(a.onChange=n.onChange,delete n.onChange),(a.onClick||a.onChange)&&e.set(i,a)}let s=t.children;Array.isArray(s)&&(n.children=mo(s,e));let o=t.tabs;return Array.isArray(o)&&(n.tabs=o.map(a=>({...a,children:Array.isArray(a.children)?mo(a.children,e):[]}))),n})}function Dt(r,e){if(r)for(let t of r){if(t.id===e)return t;let n=t.children;if(n){let s=Dt(n,e);if(s)return s}let i=t.tabs;if(Array.isArray(i))for(let s of i){let o=Dt(s.children,e);if(o)return o}}}var ho=class{deps;panels=new Map;constructor(e){this.deps=e}currentScriptId(){let e=this.deps.scriptSession.scriptId;return e&&String(e).trim()?String(e).trim():void 0}emit(e){try{this.deps.emitScriptPanelMessage?.(e)}catch{}}serializableDef(e){return{title:e.def.title,subtitle:e.def.subtitle,width:e.def.width,autoOpen:e.def.autoOpen,widgets:e.def.widgets}}define(e){let t=this.currentScriptId();if(!t)throw new Error("RealmEngine.ui.panel.define must be called from a script (onStart/onLoop/onStop).");let n=new Map,i=mo(e.widgets??[],n),s={scriptId:t,def:{...e,widgets:i},handlers:n,isOpen:!1};this.panels.set(t,s),this.emit({type:"scriptPanelState",scriptId:t,def:this.serializableDef(s),isOpen:s.isOpen}),e.autoOpen&&(s.isOpen=!0,this.emit({type:"scriptPanelOpen",scriptId:t}));let o=this;return{get isOpen(){return s.isOpen},open(){s.isOpen||(s.isOpen=!0,o.emit({type:"scriptPanelOpen",scriptId:t}))},close(){s.isOpen&&(s.isOpen=!1,o.emit({type:"scriptPanelClose",scriptId:t}))},update(l){let c={...s.def,...l};if(l.widgets){let u=new Map(s.handlers);c.widgets=mo(l.widgets,u),s.handlers=u}s.def=c,o.emit({type:"scriptPanelState",scriptId:t,def:o.serializableDef(s),isOpen:s.isOpen})},setValue(l,c){let u=Dt(s.def.widgets,l);u&&(u.type==="item"?u.item=c:u.type==="itemGrid"?u.items=c:u.value=c),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"value",id:l,value:c}]})},setImage(l,c){let u=Dt(s.def.widgets,l);u&&(u.src=String(c)),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"image",id:l,value:String(c)}]})},setText(l,c){let u=Dt(s.def.widgets,l);u&&("text"in u&&(u.text=c),"label"in u&&(u.label=c),"caption"in u&&(u.caption=c)),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"text",id:l,value:String(c)}]})},setEnabled(l,c){let u=Dt(s.def.widgets,l);u&&(u.enabled=!!c),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"enabled",id:l,value:!!c}]})},setVisible(l,c){let u=Dt(s.def.widgets,l);u&&(u.visible=!!c),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"visible",id:l,value:!!c}]})},appendLog(l,c){let u=Dt(s.def.widgets,l);if(u&&u.type==="log"){let d=Array.isArray(u.lines)?u.lines:u.lines=[];d.push(String(c));let p=typeof u.maxLines=="number"&&u.maxLines>0?u.maxLines:200;d.length>p&&d.splice(0,d.length-p)}o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"log-append",id:l,value:String(c)}]})},setLog(l,c){let u=Array.isArray(c)?c.map(p=>String(p)):[],d=Dt(s.def.widgets,l);d&&d.type==="log"&&(d.lines=u.slice()),o.emit({type:"scriptPanelPatches",scriptId:t,patches:[{op:"log-set",id:l,value:u}]})}}}dispatchEvent(e,t){let n=this.panels.get(e.scriptId);if(!n)return;if(e.kind==="closed-by-user"){n.isOpen&&(n.isOpen=!1);return}let i=n.handlers.get(e.widgetId);if(i){if(e.kind==="change"){let s=Dt(n.def.widgets,e.widgetId);s&&(s.value=e.value)}t(e.scriptId,()=>{try{e.kind==="click"?i.onClick?.():e.kind==="change"&&i.onChange?.(e.value)}catch(s){let o=s instanceof Error?s.stack||s.message:String(s);this.deps.emitScriptLog(e.scriptId,`Panel handler error: ${o}`,"error")}})}}destroyForScript(e){this.panels.has(e)&&(this.panels.delete(e),this.emit({type:"scriptPanelState",scriptId:e,def:null,isOpen:!1}))}snapshot(e){let t=this.panels.get(e);if(t)return{def:this.serializableDef(t),isOpen:t.isOpen}}scriptIds(){return[...this.panels.keys()]}};Q();function hp(r){let e=new ho(r),t=globalThis.__realmengineSDK;if(!t)return console.error("[ScriptUiBridge] DIAG: globalThis.__realmengineSDK missing \u2014 cannot patch RealmEngine.ui"),e;function n(s){let o=s==null||typeof s!="string"?null:s.trim();r.setScriptActivityLabel?.(o||null)}t.ScriptUi={setActivity:n};let i=t.RealmEngine;if(m.debug("scripts","ScriptUiBridge",`bag.RealmEngine present=${!!i} typeof=${typeof i} sameAsBagChat=${t.chat!=null}`),i&&typeof i=="object"){let s=i.ui,o=s&&typeof s=="object"?s:i.ui={};o.status=function(d){n(d)},o.setStatus=function(d){n(d)};let a=o.panel,l=a&&typeof a=="object"?a:o.panel={};l.define=u=>e.define(u);let c=t.RealmEngine.ui;m.debug("scripts","ScriptUiBridge",`patched. readBack ui.status patched=${typeof c?.status=="function"&&c.status===o.status} panel.define patched=${typeof c?.panel?.define=="function"&&c.panel.define===l.define} sameObj=${c===o}`)}else console.error("[ScriptUiBridge] DIAG: bag.RealmEngine not an object \u2014 ui NOT patched");return e}var _=G(fe(),1),pr=class r{static panelRegistry;static install(e){Js.install(e),Ks.install(e),qs.install(e),Fs.install(e),Hs.install(e),Ws.install(e),Gs.install(e),Us.install(e),Vs.install(e),zs.install(e),Xs.install(e),Qs.install(e),Zs.install(e),to.install(e),ro.install(e),no.install(e),wf(e),Tf(e),If(e),Of(e),Jf(e),fp(e),pp(e),mp(e),globalThis.__realmengineSDK={chat:_.chat,party:_.party,trade:_.trade,events:_.events,inventory:_.inventory,INVENTORY_MAIN_SLOT_COUNT:_.INVENTORY_MAIN_SLOT_COUNT,INVENTORY_BACKPACK_SLOT_COUNT:_.INVENTORY_BACKPACK_SLOT_COUNT,INVENTORY_TOTAL_SLOT_COUNT:_.INVENTORY_TOTAL_SLOT_COUNT,loot:_.loot,discord:_.discord,DiscordWebhook:_.DiscordWebhook,guild:_.guild,GuildRank:_.GuildRank,Self:_.Self,Walking:_.Walking,Combat:_.Combat,Players:_.Players,Enemies:_.Enemies,Inventory:_.Inventory,Vault:_.Vault,World:_.World,Tiles:_.Tiles,Objects:_.Objects,Projectiles:_.Projectiles,Log:_.Log,Settings:_.Settings,Timing:_.Timing,RealmEngine:_.RealmEngine,Position:_.Position,StatusEffect:_.StatusEffect,Panel:_.Panel,uiPanel:_.uiPanel,TreeScript:_.TreeScript,Root:_.Root,Branch:_.Branch,Leaf:_.Leaf,leaf:_.leaf,branch:_.branch,when:_.when,not:_.not,always:_.always,cooldown:_.cooldown,once:_.once,sequence:_.sequence,parallel:_.parallel},r.panelRegistry=hp(e)}};Q();Bn();var Lt="realmengine.script.json",go=class{scriptsDir;running=new Map;logCallback;bridgeInstalled=!1;scriptSession;scriptActivityById=new Map;scriptsStateNotify;constructor(e){this.scriptSession=e,this.scriptsDir=(0,Ve.join)(process.env.USERPROFILE||(0,gp.homedir)(),"Documents","Realmengine","Scripts")}setScriptsStateNotify(e){this.scriptsStateNotify=e}emitScriptsStateChanged(){try{this.scriptsStateNotify?.()}catch{}}resolveActivityScriptId(e){let t=e.scriptSession.scriptId;if(t&&String(t).trim())return String(t).trim();if(this.running.size===1)return this.running.keys().next().value}installBridge(e){this.bridgeInstalled||(e.setScriptActivityLabel=t=>{let n=this.resolveActivityScriptId(e);n&&(t==null||String(t).trim()===""?this.scriptActivityById.delete(n):this.scriptActivityById.set(n,String(t).trim()),this.emitScriptsStateChanged())},pr.install(e),this.bridgeInstalled=!0)}onLog(e){this.logCallback=e}withScriptId(e,t){let n=this.scriptSession.scriptId;this.scriptSession.scriptId=e;try{return t()}finally{this.scriptSession.scriptId=n}}log(e,t,n="info"){let i=`[${e}] ${t}`;n==="error"?console.error(i):n==="warn"?console.warn(i):console.log(i),this.logCallback?.(e,i,n)}isInside(e,t){let n=(0,Ve.relative)(e,t);return n===""||!!n&&!n.startsWith("..")&&!(0,Ve.isAbsolute)(n)}parseManifest(e){let t=(0,Ve.join)(e,Lt),n=(0,Ve.basename)(e);if(!(0,nt.existsSync)(t))throw new Error(`Missing ${Lt}`);let i;try{let p=(0,nt.readFileSync)(t,"utf8").replace(/^\uFEFF/,"");i=JSON.parse(p)}catch(p){throw new Error(`Invalid ${Lt}: ${p.message}`)}let s=String(i.name??"").trim(),o=String(i.developer??"").trim(),a=String(i.version??"").trim(),l=String(i.entry??"").trim();if(!s)throw new Error(`${Lt} is missing "name"`);if(!o)throw new Error(`${Lt} is missing "developer"`);if(!a)throw new Error(`${Lt} is missing "version"`);if(!l)throw new Error(`${Lt} is missing "entry"`);if(l.includes("\\"))throw new Error(`${Lt} entry must use forward slashes`);if(!l.endsWith(".mjs"))throw new Error(`${Lt} entry must point to a .mjs file`);let c=(0,Ve.resolve)(e),u=(0,Ve.resolve)(e,l);if(!this.isInside(c,u))throw new Error(`${Lt} entry must stay inside the script folder`);if(!(0,nt.existsSync)(u))throw new Error(`Entry file not found: ${l}`);if(!(0,nt.statSync)(u).isFile())throw new Error(`Entry is not a file: ${l}`);let d=this.running.get(n);return{id:n,name:s,developer:o,version:a,path:u,rootPath:c,entry:l,status:d?"running":"idle",activity:this.scriptActivityById.get(n),startedAt:d?.startedAt,runtimeMs:d?Math.max(0,Date.now()-d.startedAt):void 0}}getScript(e){if(!e||e.includes("/")||e.includes("\\")||e.startsWith(".")||e==="node_modules")return;let t=(0,Ve.join)(this.scriptsDir,e);if((0,nt.existsSync)(t)){try{if(!(0,nt.statSync)(t).isDirectory())return}catch{return}try{return this.parseManifest(t)}catch(n){return{id:e,name:e,developer:"Unknown",version:"Unknown",path:t,rootPath:t,entry:"",status:"error",error:n.message}}}}list(){return(0,nt.existsSync)(this.scriptsDir)?(0,nt.readdirSync)(this.scriptsDir).filter(e=>e!=="node_modules"&&!e.startsWith(".")).map(e=>(0,Ve.join)(this.scriptsDir,e)).filter(e=>{try{return(0,nt.statSync)(e).isDirectory()}catch{return!1}}).map(e=>{try{return this.parseManifest(e)}catch(t){let n=(0,Ve.basename)(e);return{id:n,name:n,developer:"Unknown",version:"Unknown",path:e,rootPath:e,entry:"",status:"error",error:t.message}}}):[]}async start(e){if(this.running.has(e))return{ok:!1,error:"Already running"};this.scriptActivityById.delete(e),this.emitScriptsStateChanged();let t=this.getScript(e);if(!t)return{ok:!1,error:`Script package not found: ${e}`};if(t.status==="error")return{ok:!1,error:t.error??"Script package is invalid"};if(!t.path.endsWith(".mjs"))return{ok:!1,error:"Only .mjs script entries are supported"};try{let s=(await import(`${(0,yp.pathToFileURL)(t.path).href}?t=${Date.now()}`)).default;if(!s)return{ok:!1,error:"Script has no default export"};let o=new s;if(typeof o.onStart!="function"||typeof o.onLoop!="function"||typeof o.onStop!="function")return{ok:!1,error:"Script must implement onStart(), onLoop(), and onStop()"};if(It.enabled("scripts")){let u=globalThis.__realmengineSDK,d=u?.RealmEngine?.ui,p=typeof d?.status=="function"?Function.prototype.toString.call(d.status).slice(0,60):String(d?.status);m.debug("scripts","ScriptHost",`DIAG pre-onStart: bag=${!!u} RealmEngine=${!!u?.RealmEngine} ui=${!!d} status=${typeof d?.status} panel.define=${typeof d?.panel?.define}
  status.src=${p}`)}this.withScriptId(e,()=>{this.log(e,`Starting ${t.name} v${t.version} by ${t.developer}...`),o.onStart()});let a=Date.now(),l=()=>{this.running.has(e)&&this.withScriptId(e,()=>{try{let u=o.onLoop();if(typeof u=="number"&&u<0){this.log(e,"Script requested stop (onLoop returned < 0)."),this.stop(e);return}let d=setTimeout(l,typeof u=="number"?u:600);this.running.set(e,{instance:o,timer:d,startedAt:a})}catch(u){this.log(e,`Error in onLoop: ${u.message}`,"error"),this.stop(e)}})},c=setTimeout(l,0);return this.running.set(e,{instance:o,timer:c,startedAt:a}),this.withScriptId(e,()=>this.log(e,`Running ${t.name} v${t.version} by ${t.developer}.`)),this.emitScriptsStateChanged(),{ok:!0}}catch(n){return console.error("[ScriptHost] start() caught error for",e,`:
`,n?.stack||n?.message||String(n)),{ok:!1,error:n.message}}}stop(e){let t=this.running.get(e);if(!t)return{ok:!1,error:"Not running"};clearTimeout(t.timer),this.running.delete(e),this.scriptActivityById.delete(e);try{pr.panelRegistry?.destroyForScript(e)}catch{}return this.emitScriptsStateChanged(),this.withScriptId(e,()=>{try{t.instance.onStop(),this.log(e,"Stopped.")}catch(n){this.log(e,`Error in onStop: ${n.message}`,"error")}}),{ok:!0}}stopAll(){for(let e of this.running.keys())this.stop(e)}isRunning(e){return this.running.has(e)}getScriptsDir(){return this.scriptsDir}dispatchPanelEvent(e){pr.panelRegistry?.dispatchEvent(e,(t,n)=>this.withScriptId(t,n))}getPanelSnapshot(e){return pr.panelRegistry?.snapshot(e)}panelScriptIds(){return pr.panelRegistry?.scriptIds()??[]}};var yo=class{entities=new Map;tileMap=new Map;lastMapIdentity="";buildMapIdentity(e){let t=Number(e.state?.gameId??-2),n=String(e.playerData?.mapName??"").trim().toLowerCase();return`${Number.isFinite(t)?t:-2}|${n}`}ensureMapIdentity(e){let t=this.buildMapIdentity(e);!t||t==="-2|"||(this.lastMapIdentity&&this.lastMapIdentity!==t&&this.clear(),this.lastMapIdentity=t)}buildEnemyCandidate(e,t,n){if(e.getObjectCategory(t.objectType)!=="Enemy")return null;let i=Number(t.pos?.x),s=Number(t.pos?.y);if(!Number.isFinite(i)||!Number.isFinite(s))return null;let o=t.stats||{},a=o[String(x.HP)],l=o[String(x.MaxHP)],c=Number.isFinite(Number(a))?Number(a):0,u=e.getObject(t.objectType)?.maxHp??0,d=Number.isFinite(Number(l))&&Number(l)>0?Number(l):u;(!Number.isFinite(d)||d<=0)&&(d=Math.max(1,c));let p=Math.hypot(i-n.x,s-n.y);return{objectId:t.objectId,objectType:t.objectType,x:i,y:s,dist:p,hp:c,maxHp:d,hpPct:c/Math.max(1,d)}}isLikelyPlayerEntity(e,t){if(e.getObjectCategory(t.objectType)==="Player")return!0;let n=t.stats||{},i=n[String(x.NameStat)],s=Number(n[String(x.Level)]),o=Number(n[String(x.Inventory0)]),a=Number(n[String(x.Inventory1)]),l=Number(n[String(x.Inventory2)]),c=Number(n[String(x.Inventory3)]),u=typeof i=="string"&&i.trim().length>0,d=Number.isFinite(s)&&s>0,p=Number.isFinite(o)&&o!==-1||Number.isFinite(a)&&a!==-1||Number.isFinite(l)&&l!==-1||Number.isFinite(c)&&c!==-1;return u&&(d||p)}applyStatus(e,t){if(t.position&&(e.pos={...t.position}),t.data&&Array.isArray(t.data)){e.stats||(e.stats={});for(let n of t.data)n&&n.id!=null&&(e.stats[String(n.id)]=n.value)}e.lastUpdate=Date.now()}attach(e){e.hookPacket("UPDATE",(t,n)=>this.onUpdate(t,n)),e.hookPacket("NEWTICK",(t,n)=>this.onNewTick(t,n)),e.hookPacket("MAPINFO",t=>{this.clear(),this.lastMapIdentity=this.buildMapIdentity(t)})}onUpdate(e,t){if(this.ensureMapIdentity(e),!!t.isDefined){if(t.data.tiles)for(let n of t.data.tiles){let i=n.x<<16|n.y;this.tileMap.set(i,n.type)}if(t.data.newObjs)for(let n of t.data.newObjs){let i=n.objectType,s=n.status;if(!s)continue;let o={objectId:s.objectId,objectType:i,pos:s.position?{...s.position}:{x:0,y:0},lastUpdate:Date.now(),stats:void 0};this.applyStatus(o,s),this.entities.set(s.objectId,o)}if(t.data.drops)for(let n of t.data.drops)this.entities.delete(n)}}onNewTick(e,t){if(this.ensureMapIdentity(e),!(!t.isDefined||!t.data.statuses))for(let n of t.data.statuses){let i=this.entities.get(n.objectId);i&&this.applyStatus(i,n)}}clear(){this.entities.clear(),this.tileMap.clear()}forEachKnownTile(e){for(let[t,n]of this.tileMap.entries()){let i=t>>16,s=t&65535;e(i,s,n)}}forEachKnownTileInBounds(e,t,n,i,s){for(let[o,a]of this.tileMap.entries()){let l=o>>16,c=o&65535;l<e||l>t||c<n||c>i||s(l,c,a)}}getOccupiedTileKeys(){let e=new Set;for(let t of this.entities.values()){let n=Math.floor(t.pos.x),i=Math.floor(t.pos.y);e.add(n<<16|i&65535)}return e}getEntity(e){return this.entities.get(e)}getEntityType(e){return this.entities.get(e)?.objectType}resolveQuestTargetObjectType(e,t){if(!Number.isFinite(e)||e<=0)return;let n=this.getEntityType(e);if(n!=null&&n>0)return n;if(!t)return;let i=new Set;for(let s of this.entities.values())t.getObject(s.objectType)?.quest&&i.add(s.objectType);if(i.size===1)return i.values().next().value}hasAnyEntityObjectTypeIn(e){for(let t of this.entities.values())if(e.has(t.objectType))return!0;return!1}getNearestEntityByType(e,t,n,i){let s=null;for(let o of this.entities.values()){if(o.objectType!==e||n!=null&&o.objectId===n)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);i!=null&&a>i||(!s||a<s.dist)&&(s={objectId:o.objectId,x:o.pos.x,y:o.pos.y,dist:a})}return s}getEntitiesByTypeSorted(e,t,n,i){let s=[];for(let o of this.entities.values()){if(o.objectType!==e||n!=null&&o.objectId===n)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);i!=null&&a>i||s.push({objectId:o.objectId,x:o.pos.x,y:o.pos.y,dist:a})}return s.sort((o,a)=>o.dist-a.dist),s}getEntitiesInTypeSet(e,t,n,i){let s=[];for(let o of this.entities.values()){if(!e.has(o.objectType)||n!=null&&o.objectId===n)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);i!=null&&a>i||s.push({entity:o,dist:a})}return s.sort((o,a)=>o.dist-a.dist),s.map(o=>o.entity)}getFirstEntityByType(e,t){for(let n of this.entities.values())if(n.objectType===e&&!(t!=null&&n.objectId===t))return{objectId:n.objectId,x:n.pos.x,y:n.pos.y};return null}getNearestPortal(e,t,n,i){let s=null;for(let o of this.entities.values()){if(i!=null&&o.objectId===i||e.getObjectCategory(o.objectType)!=="Portal"||n?.objectType!=null&&o.objectType!==n.objectType)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);n?.maxDistance!=null&&a>n.maxDistance||(!s||a<s.dist)&&(s={objectId:o.objectId,objectType:o.objectType,x:o.pos.x,y:o.pos.y,dist:a})}return s}getPortalsSorted(e,t,n,i){let s=[];for(let o of this.entities.values()){if(i!=null&&o.objectId===i||e.getObjectCategory(o.objectType)!=="Portal"||n?.objectType!=null&&o.objectType!==n.objectType)continue;let a=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);n?.maxDistance!=null&&a>n.maxDistance||s.push({objectId:o.objectId,objectType:o.objectType,x:o.pos.x,y:o.pos.y,dist:a})}return s.sort((o,a)=>o.dist-a.dist),s}getNearestEnemy(e,t,n,i){let s=null,o=Date.now();for(let a of this.entities.values()){if(i!=null&&a.objectId===i||n?.maxStaleMs!=null&&o-a.lastUpdate>n.maxStaleMs)continue;let l=this.buildEnemyCandidate(e,a,t);l&&(n&&(n.hpMin!=null&&l.hp<n.hpMin||n.hpMax!=null&&l.hp>n.hpMax||n.hpUnder!=null&&l.hp>=n.hpUnder||n.hpOver!=null&&l.hp<=n.hpOver)||n?.maxDistance!=null&&l.dist>n.maxDistance||(!s||l.dist<s.dist)&&(s={objectId:l.objectId,objectType:l.objectType,x:l.x,y:l.y,dist:l.dist,hp:l.hp,maxHp:l.maxHp}))}return s}getEnemyBySelector(e,t,n,i,s){let o=null;for(let a of this.entities.values()){if(s!=null&&a.objectId===s)continue;let l=this.buildEnemyCandidate(e,a,t);if(l&&!(i&&(i.hpMin!=null&&l.hp<i.hpMin||i.hpMax!=null&&l.hp>i.hpMax||i.hpUnder!=null&&l.hp>=i.hpUnder||i.hpOver!=null&&l.hp<=i.hpOver))&&!(i?.maxDistance!=null&&l.dist>i.maxDistance)){if(!o){o=l;continue}if(n==="lowesthp"){(l.hp<o.hp||l.hp===o.hp&&l.dist<o.dist)&&(o=l);continue}if(n==="lowesthppct"){(l.hpPct<o.hpPct||l.hpPct===o.hpPct&&l.dist<o.dist)&&(o=l);continue}l.dist<o.dist&&(o=l)}}return o}getEnemiesMatching(e,t,n,i){let s=[];for(let o of this.entities.values()){if(i!=null&&o.objectId===i)continue;let a=this.buildEnemyCandidate(e,o,t);a&&(n&&(n.hpMin!=null&&a.hp<n.hpMin||n.hpMax!=null&&a.hp>n.hpMax||n.hpUnder!=null&&a.hp>=n.hpUnder||n.hpOver!=null&&a.hp<=n.hpOver)||n?.maxDistance!=null&&a.dist>n.maxDistance||s.push(a))}return s.sort((o,a)=>o.dist-a.dist),s}getBossEventTargetsSorted(e,t,n,i){let s=[];for(let o of this.entities.values()){if(i!=null&&o.objectId===i)continue;let a=e.getObject(o.objectType);if(!a)continue;if(n?.objectType!=null){if(o.objectType!==n.objectType)continue}else{let h=o.stats||{},g=h[String(x.HP)],y=h[String(x.MaxHP)],b=Number.isFinite(Number(g))?Number(g):0,S=Number.isFinite(Number(y))?Number(y):0;if(!(e.isBoss(o.objectType,5e3)||!!a.quest&&Math.max(b,S)>=2e3))continue}let l=o.stats||{},c=l[String(x.HP)],u=l[String(x.MaxHP)],d=Number.isFinite(Number(c))?Number(c):0,p=Number.isFinite(Number(u))?Number(u):0,f=Math.hypot(o.pos.x-t.x,o.pos.y-t.y);n?.maxDistance!=null&&f>n.maxDistance||s.push({objectId:o.objectId,objectType:o.objectType,x:o.pos.x,y:o.pos.y,dist:f,hp:d,maxHp:p,name:a.id??`0x${o.objectType.toString(16)}`})}return s.sort((o,a)=>o.dist-a.dist),s}getTileAt(e,t){return this.tileMap.get(e<<16|t)}getNearbyTilesForDashboard(e,t,n=12){let i=Math.max(1,Math.min(30,Math.trunc(n))),s=l=>{let c=Math.floor(l.x),u=Math.floor(l.y),d=new Map;for(let f=u-i;f<=u+i;f++)for(let h=c-i;h<=c+i;h++){let g=this.getTileAt(h,f);if(g==null)continue;let y=d.get(g);y||(y=[],d.set(g,y)),y.push({x:h,y:f})}let p=[];for(let[f,h]of d.entries())p.push({tileType:f,name:e.getTileName(f),tiles:h});return p.sort((f,h)=>f.tileType-h.tileType),p},o={x:t.x,y:t.y},a=s(o);if(!a.length&&this.tileMap.size>0){let l=null;for(let c of this.tileMap.keys()){let u=c>>16,d=c&65535,p=Math.hypot(u-t.x,d-t.y);(!l||p<l.dist)&&(l={x:u,y:d,dist:p})}l&&(o={x:l.x,y:l.y},a=s(o))}return{center:o,radius:i,groups:a}}getEntitiesInRadius(e,t){let n=t*t,i=[];for(let s of this.entities.values()){let o=s.pos.x-e.x,a=s.pos.y-e.y;o*o+a*a<=n&&i.push(s)}return i}get entityCount(){return this.entities.size}getObjectsForDashboard(e){let t=new Map;for(let c of this.entities.values()){if(e.getObjectCategory(c.objectType)==="Player")continue;let d=t.get(c.objectType);d||(d=[],t.set(c.objectType,d)),d.push(c)}let n=[],i=[],s=new Map;for(let[c,u]of t.entries()){let d=e.getObjectCategory(c);if(d==="Portal"){let f=e.getObject(c)?.id??`0x${c.toString(16)}`;n.push({objectType:c,name:f,entities:u.map(h=>({objectId:h.objectId,x:h.pos.x,y:h.pos.y}))})}else if(d==="Beacon"){let f=e.getObject(c)?.id??`0x${c.toString(16)}`;i.push({objectType:c,name:f,entities:u.map(h=>({objectId:h.objectId,x:h.pos.x,y:h.pos.y}))})}else{let p=s.get(d);p||(p=new Map,s.set(d,p)),p.set(c,u)}}let o=["VisualOnly","Pet","Projectile","Container","Enemy","Other"],a={Portal:"Portals",Beacon:"Beacons",VisualOnly:"Visual Only",Pet:"Pets",Player:"Players",Projectile:"Projectiles",Container:"Containers",Enemy:"Enemies",Other:"Other"},l=[];for(let c of o){let u=s.get(c);if(!u||u.size===0)continue;let d=[],p=c==="Enemy";for(let[f,h]of u.entries()){let g=e.getObject(f),y=g?.id??`0x${f.toString(16)}`,b=g?.maxHp??0;d.push({objectType:f,name:y,entities:h.map(S=>{let E={objectId:S.objectId,x:S.pos.x,y:S.pos.y};if(p&&(E.maxHp=b,S.stats)){let I=S.stats[String(x.HP)];I!=null&&I!==""&&(E.hp=Number(I));let A=S.stats[String(x.MaxHP)];A!=null&&A!==""&&Number(A)>0&&(E.maxHp=Number(A))}return E})})}d.sort((f,h)=>f.objectType-h.objectType),l.push({category:a[c],groups:d})}return n.sort((c,u)=>c.objectType-u.objectType),i.sort((c,u)=>c.objectType-u.objectType),{portals:n,beacons:i,categories:l}}getNearbyPlayersForDashboard(e,t,n){let i=t?.x??0,s=t?.y??0,o=[];for(let a of this.entities.values()){if(n!=null&&a.objectId===n||!this.isLikelyPlayerEntity(e,a))continue;let l=a.stats||{},c=(M,O=0)=>{let L=l[String(M)];if(L==null||L==="")return O;let T=typeof L=="number"?L:Number(L);return Number.isFinite(T)?T:O},u=(M,O="")=>{let L=l[String(M)];return L==null?O:String(L)},d=a.pos?.x??0,p=a.pos?.y??0,f=Math.hypot(d-i,p-s),h=c(1,0),g=c(0,0),y=c(4,0),b=c(3,0),S=h/Math.max(1,g),E=c(7,0),I=c(39,0),A=(u(31,"")||"").trim()||"?",j=e.getObject(a.objectType)?.id??`0x${a.objectType.toString(16)}`,F=[c(8,-1),c(9,-1),c(10,-1),c(11,-1)];o.push({objectId:a.objectId,objectType:a.objectType,className:j,name:A,x:d,y:p,dist:f,hp:h,maxHp:g,mp:y,maxMp:b,level:E,fame:I,eq:F,hpPct:S})}return o.sort((a,l)=>a.dist-l.dist),o}getAllPlayersRawStatsForDashboard(e){let t=[];for(let n of this.entities.values()){if(!this.isLikelyPlayerEntity(e,n))continue;let i=n.stats||{},o=(((d,p="")=>{let f=i[String(d)];return f==null?p:String(f)})(x.NameStat,"")||"").trim()||"?",a=e.getObject(n.objectType)?.id??`0x${n.objectType.toString(16)}`,l=n.pos?.x??0,c=n.pos?.y??0,u={};for(let[d,p]of Object.entries(i))u[d]=p;t.push({objectId:n.objectId,objectType:n.objectType,className:a,name:o,x:l,y:c,rawStats:u})}return t.sort((n,i)=>n.name.localeCompare(i.name,void 0,{sensitivity:"base"})||n.objectId-i.objectId),t}getNearbyPlayerDebugForDashboard(e,t,n){let i=this.entities.get(n);if(!i||!this.isLikelyPlayerEntity(e,i))return null;let s=i.stats||{},o=(y,b=0)=>{let S=s[String(y)];if(S==null||S==="")return b;let E=typeof S=="number"?S:Number(S);return Number.isFinite(E)?E:b},a=(y,b="")=>{let S=s[String(y)];return S==null?b:String(S)},l=t?.x??0,c=t?.y??0,u=i.pos?.x??0,d=i.pos?.y??0,p=Math.hypot(u-l,d-c),f=e.getObject(i.objectType)?.id??`0x${i.objectType.toString(16)}`;return{identity:{name:(a(31,"")||"").trim()||"?",className:f,objectId:i.objectId,objectType:i.objectType,objectTypeHex:`0x${i.objectType.toString(16)}`,accountId:a(38,""),guildName:a(62,""),guildRank:o(63,0),skin:o(76,0),hasBackpack:o(130,0)!==0||o(75,0)!==0,backpackTier:o(130,0),hasBackpackExtender:o(130,0)>=16},position:{x:u,y:d,dist:p},vitals:{hp:o(1,0),maxHp:o(0,0),mp:o(4,0),maxMp:o(3,0)},stats:{atk:o(20,0),def:o(21,0),spd:o(22,0),dex:o(28,0),vit:o(26,0),wis:o(27,0)},boosts:{hpBonus:o(46,0),mpBonus:o(47,0),atkBonus:o(48,0),defBonus:o(49,0),spdBonus:o(50,0),vitBonus:o(51,0),wisBonus:o(52,0),dexBonus:o(53,0)},misc:{level:o(7,0),fame:o(39,0),stars:o(30,0),credits:o(34,0),sinkLevel:0},inventory:{equipped:[o(8,-1),o(9,-1),o(10,-1),o(11,-1)],inventory:Array.from({length:12}).map((y,b)=>o(8+b,-1)),backpack:Array.from({length:16}).map((y,b)=>o(131+b,-1)),quickSlots:[o(116,-1),o(117,-1),o(118,-1)],healthStackCount:o(73,0),magicStackCount:o(74,0)},effects:{effects1:o(29,0),effects2:o(95,0)},rawStats:s}}};var bo=class{bullets=new Map;gameData;worldState;constructor(e,t){this.gameData=e??null,this.worldState=t??null}attach(e){e.hookPacket("ENEMYSHOOT",(t,n)=>this.onEnemyShoot(t,n)),e.hookPacket("MAPINFO",()=>this.clear())}onEnemyShoot(e,t){if(!t.isDefined)return;let n=t.data.bulletId&65535,i=t.data.ownerId,s=t.data.bulletType,o=t.data.position??t.data.startingPos;if(!o)return;let a=t.data.angle,l=t.data.damage,c=t.data.numShots,u=t.data.angleInc,d=Number.isFinite(c)?c:1;(d===255||d<=0)&&(d=1);let p=Number.isFinite(u)?u:0,f=null;if(this.gameData&&this.worldState){let h=this.worldState.getEntityType(i);h!==void 0&&(f=this.gameData.getProjectile(h,s)??null)}for(let h=0;h<d;h++){let g=`${i}:${n+h}`,y=a+h*p;this.bullets.set(g,{bulletId:n+h,ownerId:i,bulletType:s,startX:o.x,startY:o.y,angle:y,damage:l,spawnTime:Date.now(),projDef:f})}}cleanup(){let e=Date.now();for(let[t,n]of this.bullets){let i=n.projDef?.lifetimeMs??1e4,s=Math.min(i,1e4);e-n.spawnTime>s&&this.bullets.delete(t)}}clear(){this.bullets.clear()}getBullet(e){return this.bullets.get(e)}getActiveProjectiles(){return[...this.bullets.values()]}forEachBullet(e){for(let[t,n]of this.bullets)e(n,t)}get bulletCount(){return this.bullets.size}};var sc=require("fs"),oc=G(un(),1);Q();function Jt(r){if(r==null||typeof r=="string"||typeof r=="number")return 0;if(Array.isArray(r))return Jt(r[0]);if(typeof r=="object"){let t=r["@_max"];if(t!=null&&t!==""){let n=Number(t);if(Number.isFinite(n))return Math.trunc(n)}}return 0}function TT(r){return{maxHitPoints:Jt(r.MaxHitPoints),maxMagicPoints:Jt(r.MaxMagicPoints),attack:Jt(r.Attack),defense:Jt(r.Defense),speed:Jt(r.Speed),dexterity:Jt(r.Dexterity),hpRegen:Jt(r.HpRegen),mpRegen:Jt(r.MpRegen)}}function Zp(r){if(r==null)return"";if(Array.isArray(r)){for(let t of r){let n=Zp(t);if(n)return n}return""}if(typeof r!="object")return"";let e=r.File;return typeof e=="string"?e.trim():""}function em(r){if(r==null)return-1;if(Array.isArray(r)){for(let t of r){let n=em(t);if(n>=0)return n}return-1}if(typeof r!="object")return-1;let e=Number(r.Index);return Number.isFinite(e)?e:-1}var PT=new Set([1,2,3,8,17,24]),vT=new Set([4,5,11,12,13,15,16,18,19,20,21,22,23,25,27,28,29,30]),xT=new Set([6,7,14]),CT=new Set([9]);function kT(r){return!Number.isFinite(r)||r<0?"consumable":PT.has(r)?"weapon":vT.has(r)?"ability":xT.has(r)?"armor":CT.has(r)?"ring":"consumable"}var wo=class{objects=new Map;tileSpeedMap=new Map;tileNameMap=new Map;tileTypeByNameMap=new Map;tilePushTypes=new Set;objectRawXmlMap=new Map;tileRawXmlMap=new Map;load(e){let t=(0,sc.readFileSync)(e,"utf8"),s=new oc.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"@_",isArray:u=>u==="Object"||u==="Projectile"||u==="ConditionEffect"}).parse(t).Objects?.Object??[];for(let u of s){let d=u["@_type"];if(!d)continue;let p=parseInt(d,16),f=u["@_id"]??"",h=String(u.DisplayId??"").trim(),g=u.Class??"",y={type:p,id:f,displayId:h,objectClass:g,textureFile:Zp(u.Texture),textureIndex:em(u.Texture),projectiles:new Map,maxHp:Number(u.MaxHitPoints??0),defense:Number(u.Defense??0),quest:u.Quest!==void 0,god:u.God!==void 0,rateOfFire:Number(u.RateOfFire??1),numProjectiles:Number(u.NumProjectiles??1),arcGap:Number(u.ArcGap??0),slotType:Number(u.SlotType??-1),burstCount:Number(u.BurstCount??0),occupySquare:u.OccupySquare!==void 0,protectFromGroundDamage:u.ProtectFromGroundDamage!==void 0,isEnemy:u.Enemy!==void 0,isPet:u.Pet!==void 0,isPlayer:u.Player!==void 0,isContainer:u.Container!==void 0,tierStr:String(u.Tier??"").trim(),bagType:(()=>{let b=Number(u.BagType);return Number.isFinite(b)?b:0})(),soulbound:u.Soulbound!==void 0,feedPower:Number(u.FeedPower??0),quickslotAllowed:u.QuickslotAllowed!==void 0,dungeonName:String(u.DungeonName??"").trim()};if(u.Projectile){let b=Array.isArray(u.Projectile)?u.Projectile:[u.Projectile];for(let S of b){let E=Number(S["@_id"]??0),I=Number(S.Size??100),j=.15*((Number.isFinite(I)&&I>0?I:100)/100),F=[];if(S.ConditionEffect){let M=Array.isArray(S.ConditionEffect)?S.ConditionEffect:[S.ConditionEffect];for(let O of M){let L=typeof O=="string"?O:O["#text"]??"",T=typeof O=="object"?Number(O["@_duration"]??0):0;L&&F.push({effect:L,durationSec:T})}}y.projectiles.set(E,{id:E,damage:Number(S.Damage??0),speed:Number(S.Speed??0),lifetimeMs:Number(S.LifetimeMS??0),hitRadius:j,armorPiercing:S.ArmorPiercing!==void 0,multiHit:S.MultiHit!==void 0,passesCover:S.PassesCover!==void 0,maxHealthDamage:Number(S.MaxHealthDamage??0),conditionEffects:F,amplitude:Number(S.Amplitude??0),frequency:Number(S.Frequency??0),magnitude:Number(S.Magnitude??3),wavy:S.Wavy!==void 0,parametric:S.Parametric!==void 0,boomerang:S.Boomerang!==void 0,acceleration:Number(S.Acceleration??0),accelerationDelay:Number(S.AccelerationDelay??0),speedClamp:Number(S.SpeedClamp??0)})}}y.isPlayer&&(y.playerStatMaxes=TT(u)),this.objects.set(p,y)}let o=[...this.objects.values()].reduce((u,d)=>u+d.projectiles.size,0),a=[...this.objects.values()].filter(u=>u.isPlayer&&u.playerStatMaxes).length;m.log("GameData",`Loaded ${this.objects.size} objects, ${o} projectile definitions, ${a} player class(es) with stat maxes`),this.objectRawXmlMap.clear();let l=/<Object\b[^>]*>([\s\S]*?)<\/Object>/g,c;for(;(c=l.exec(t))!==null;){let u=c[0].match(/\btype="([^"]+)"/);if(u){let d=parseInt(u[1],16);Number.isFinite(d)&&this.objectRawXmlMap.set(d,c[0])}}}getObject(e){return this.objects.get(e)}getPlayerClassStatMaxes(e){return this.objects.get(e)?.playerStatMaxes}getAllPlayerClassObjectTypes(){let e=[];for(let t of this.objects.values())t.isPlayer&&t.playerStatMaxes&&e.push(t.type);return e.sort((t,n)=>t-n),e}getRawObjectXml(e){return this.objectRawXmlMap.get(e)}getRawTileXml(e){return this.tileRawXmlMap.get(e)}buildSdkItem(e){if(!Number.isFinite(e)||e<=0)return null;let t=this.objects.get(e);if(!t)return{id:e,name:`0x${e.toString(16)}`,tier:"",slotType:"consumable",feedPower:0,bagType:0,soulbound:!1,tradeable:!0};let n=t.soulbound;return{id:e,name:t.displayId||t.id||`0x${e.toString(16)}`,tier:t.tierStr,slotType:kT(t.slotType),feedPower:t.feedPower,bagType:t.bagType,soulbound:n,tradeable:!n}}getAllObjects(){return[...this.objects.values()]}getObjectCategory(e){let t=this.objects.get(e);if(!t)return"Other";let n=t.objectClass;return n==="Portal"||n==="ArenaPortal"||n==="GuildHallPortal"||n.includes("Portal")?"Portal":t.id&&t.id.toLowerCase().includes("beacon")?"Beacon":t.isPet||n==="Pet"?"Pet":t.isPlayer||n==="Player"?"Player":n==="Projectile"?"Projectile":t.isContainer||n==="Container"?"Container":t.isEnemy||n==="Enemy"?"Enemy":!t.occupySquare&&(n==="GameObject"||n==="Decoration"||n==="Decoy")?"VisualOnly":"Other"}getProjectile(e,t){return this.objects.get(e)?.projectiles.get(t)}getBeaconTypes(){let e=[];for(let t of this.objects.values())this.getObjectCategory(t.type)==="Beacon"&&e.push({objectType:t.type,name:t.id||`0x${t.type.toString(16)}`});return e.sort((t,n)=>t.name.localeCompare(n.name)||t.objectType-n.objectType),e}isBoss(e,t=1e4){let n=this.objects.get(e);return n?n.quest&&n.maxHp>=t:!1}getOccupySquareTypes(){let e=new Set;for(let t of this.objects.values())t.occupySquare&&e.add(t.type);return e}getEnemyTypes(){let e=new Set;for(let t of this.objects.values())t.isEnemy&&e.add(t.type);return e}tileDamageMap=new Map;tileMinDamageSet=new Set;tileSlideAmountMap=new Map;tilePushVectorMap=new Map;tileHasDamageAttrs=new Set;tileHasConditionEffect=new Set;noWalkTileTypes=new Set;sinkTileTypes=new Set;loadTiles(e){let t=new Set,n=new Set;this.tileSpeedMap=new Map,this.tileNameMap=new Map,this.tileTypeByNameMap=new Map,this.tilePushTypes=new Set,this.tileDamageMap=new Map,this.tileMinDamageSet=new Set,this.tileSlideAmountMap=new Map,this.tilePushVectorMap=new Map,this.tileHasDamageAttrs=new Set,this.tileHasConditionEffect=new Set;try{let i=(0,sc.readFileSync)(e,"utf8"),a=new oc.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"@_",isArray:u=>u==="Ground"}).parse(i).GroundTypes?.Ground??[];for(let u of a){let d=u["@_type"];if(!d)continue;let p=parseInt(d,16);if(isNaN(p))continue;let f=String(u["@_id"]??"").trim();if(f&&(this.tileNameMap.set(p,f),this.tileTypeByNameMap.set(f.toLowerCase(),p)),u.Push!==void 0){this.tilePushTypes.add(p);let S=this.extractPushVectorFromGround(u,f);S&&this.tilePushVectorMap.set(p,S)}u.NoWalk!==void 0&&t.add(p),u.Sink!==void 0&&n.add(p),(p===254||f.toLowerCase()==="space")&&t.add(p);let h=Number(u.Speed??0);h>0&&h!==1&&this.tileSpeedMap.set(p,h);let g=Number(u.SlideAmount??0);g>0&&this.tileSlideAmountMap.set(p,g);let y=Number(u.MaxDamage??u.MinDamage??0);y>0&&this.tileDamageMap.set(p,y),Number(u.MinDamage??0)>0&&this.tileMinDamageSet.add(p),(u.MinDamage!==void 0||u.MaxDamage!==void 0)&&this.tileHasDamageAttrs.add(p),u.ConditionEffect!==void 0&&this.tileHasConditionEffect.add(p)}this.tileRawXmlMap.clear();let l=/<Ground\b[^>]*>([\s\S]*?)<\/Ground>/g,c;for(;(c=l.exec(i))!==null;){let u=c[0].match(/\btype="([^"]+)"/);if(u){let d=parseInt(u[1],16);Number.isFinite(d)&&this.tileRawXmlMap.set(d,c[0])}}}catch(i){m.warn("GameData",`Failed to load tiles: ${i.message}`)}return this.noWalkTileTypes=t,this.sinkTileTypes=n,m.log("GameData",`Tiles loaded - noWalk: ${t.size}, sink: ${n.size}, speed variants: ${this.tileSpeedMap.size}, sliding: ${this.tileSlideAmountMap.size}, push: ${this.tilePushTypes.size}, push-vectors: ${this.tilePushVectorMap.size}, damaging: ${this.tileDamageMap.size}, damageAttrs: ${this.tileHasDamageAttrs.size}, conditionTiles: ${this.tileHasConditionEffect.size}`),{noWalkTiles:t,sinkTiles:n,tileSpeedMap:this.tileSpeedMap,tileDamageMap:this.tileDamageMap,tileSlideAmountMap:this.tileSlideAmountMap,tilePushTypes:this.tilePushTypes,tilePushVectorMap:this.tilePushVectorMap}}tileIsNoWalk(e){return this.noWalkTileTypes.has(e)}tileIsSink(e){return this.sinkTileTypes.has(e)}tileIsBlockingWalk(e){return this.noWalkTileTypes.has(e)||this.sinkTileTypes.has(e)}getTileSpeed(e){return this.tileSpeedMap.get(e)??1}getTileName(e){return this.tileNameMap.get(e)??`0x${e.toString(16)}`}getTileTypeByName(e){return this.tileTypeByNameMap.get(String(e).trim().toLowerCase())}getTileDamage(e){return this.tileDamageMap.get(e)}getTileHasMinDamage(e){return this.tileMinDamageSet.has(e)}getTileSlideAmount(e){return this.tileSlideAmountMap.get(e)}getTilePushVector(e){return this.tilePushVectorMap.get(e)}getTileHasPush(e){return this.tilePushTypes.has(e)}getTileHasDamageAttrs(e){return this.tileHasDamageAttrs.has(e)}getTileHasConditionEffect(e){return this.tileHasConditionEffect.has(e)}extractPushVectorFromGround(e,t){let n=[e?.Animate,e?.TopAnimate,e?.Animate1,e?.Animate2];for(let i of n){let s=this.extractPushVectorFromAnimate(i);if(s)return s}return this.inferPushVectorFromTileName(t)}extractPushVectorFromAnimate(e){if(!e)return null;if(Array.isArray(e)){for(let i of e){let s=this.extractPushVectorFromAnimate(i);if(s)return s}return null}if(typeof e!="object")return null;let t=Number(e["@_dx"]??e.dx),n=Number(e["@_dy"]??e.dy);return Number.isFinite(t)&&t>0?{dx:-1,dy:0}:Number.isFinite(t)&&t<0?{dx:1,dy:0}:Number.isFinite(n)&&n>0?{dx:0,dy:-1}:Number.isFinite(n)&&n<0?{dx:0,dy:1}:null}inferPushVectorFromTileName(e){if(!e)return null;let t=e.replace(/([a-z])([A-Z])/g,"$1 $2").toLowerCase().replace(/[^a-z]+/g," ").trim();if(!t)return null;let n=new Set(t.split(/\s+/).filter(Boolean)),i=(...s)=>s.some(o=>n.has(o));return i("push","pusher","pull","puller")?i("right","rt","east","e")?{dx:1,dy:0}:i("left","lf","west","w")?{dx:-1,dy:0}:i("down","dn","south","s")?{dx:0,dy:1}:i("up","north","n")?{dx:0,dy:-1}:null:null}get objectCount(){return this.objects.size}getGameWikiCatalog(){let e=[],t={};for(let s of this.objects.values()){let o=this.getObjectCategory(s.type),a=this.getGameWikiDungeonName(s);e.push({type:s.type,typeHex:`0x${s.type.toString(16)}`,id:s.id,displayId:s.displayId,objectClass:s.objectClass,category:o,maxHp:s.maxHp,defense:s.defense,quest:s.quest,god:s.god,rateOfFire:s.rateOfFire,numProjectiles:s.numProjectiles,arcGap:s.arcGap,slotType:s.slotType,burstCount:s.burstCount,occupySquare:s.occupySquare,isEnemy:s.isEnemy,isPet:s.isPet,isPlayer:s.isPlayer,isContainer:s.isContainer,dungeonName:a,...s.playerStatMaxes?{playerStatMaxes:s.playerStatMaxes}:{}}),s.projectiles.size>0&&(t[String(s.type)]={projectiles:[...s.projectiles.values()]})}e.sort((s,o)=>s.type-o.type);let n=new Set;for(let s of this.tileNameMap.keys())n.add(s);for(let s of this.tileSpeedMap.keys())n.add(s);for(let s of this.tileDamageMap.keys())n.add(s);for(let s of this.tileSlideAmountMap.keys())n.add(s);for(let s of this.tilePushTypes)n.add(s);for(let s of this.tileHasDamageAttrs)n.add(s);for(let s of this.tileHasConditionEffect)n.add(s);for(let s of this.noWalkTileTypes)n.add(s);for(let s of this.sinkTileTypes)n.add(s);let i=[];for(let s of n){let o=this.getTileSpeed(s),a=this.getTileSlideAmount(s),l=this.getTileDamage(s),c=this.getTilePushVector(s),u="Other";this.noWalkTileTypes.has(s)?u="NoWalk":this.sinkTileTypes.has(s)?u="Sink":o!==1?u="Speed":l!==void 0&&l>0?u="Damaging":this.tileHasDamageAttrs.has(s)?u="DamageAttrs":this.tileHasConditionEffect.has(s)?u="Condition":this.tilePushTypes.has(s)?u="Push":a!==void 0&&a>0&&(u="Slide");let d={type:s,typeHex:`0x${s.toString(16)}`,id:this.getTileName(s),noWalk:this.tileIsNoWalk(s),sink:this.tileIsSink(s),speed:o,hasDamageAttrs:this.tileHasDamageAttrs.has(s),hasConditionEffect:this.tileHasConditionEffect.has(s),hasPush:this.tilePushTypes.has(s),tileBucket:u};a!==void 0&&a>0&&(d.slideAmount=a),l!==void 0&&l>0&&(d.damagePerTick=l),c&&(d.pushDx=c.dx,d.pushDy=c.dy),i.push(d)}return i.sort((s,o)=>s.type-o.type),{objectSummaries:e,objectDetails:t,tiles:i}}getGameWikiDungeonName(e){return e.dungeonName?e.dungeonName:e.textureFile==="spriteWorldObjects8x8"&&e.objectClass!=="Equipment"&&!e.objectClass.includes("Portal")?"Sprite World":""}};var gn=require("fs"),Xe=require("path"),rg=require("url");Q();var Or=class{constructor(e,t,n,i,s,o,a){this.proxy=e;this.pluginId=t;this.pluginFile=n;this._name=t,this.gameData=i??null,this.worldState=s??null,this.projectileTracker=o??null,this.sessionStateResolver=a??null}_enabled=!0;_name;_category;_settings=new Map;_settingCallbacks=new Map;_settingDefaults=new Map;_enabledChangeCallbacks=[];_data=new Map;_cleanupFns=[];onDashboardLog=null;onBroadcastData=null;gameData;worldState;projectileTracker;sessionStateResolver;getEffectivePlayerPos(e){return e.playerData?.pos??null}getWorldState(e){return this.sessionStateResolver?.(e).worldState??this.worldState}getProjectileTracker(e){return this.sessionStateResolver?.(e).projectileTracker??this.projectileTracker}get enabled(){return this._enabled}set enabled(e){this._enabled=e,m.debug("plugin-config","Plugin",`${this._name} ${e?"enabled":"disabled"}`);for(let t of this._enabledChangeCallbacks)try{t(e)}catch{}}onEnabledChange(e){this._enabledChangeCallbacks.push(e)}get name(){return this._name}set name(e){this._name=e}get category(){return this._category??"utility"}set category(e){this._category=e}registerSetting(e,t,n){this._settings.set(e,{key:e,...t}),n&&this._settingCallbacks.set(e,n),t.type!=="button"&&this._settingDefaults.set(e,t.value)}resetSettingsToDefaults(){let e=[];for(let[t,n]of this._settingDefaults){let i=this._settings.get(t);!i||i.type==="button"||i.value!==n&&this.updateSetting(t,n)&&e.push(t)}return e}getSetting(e){return this._settings.get(e)?.value}updateSetting(e,t){let n=this._settings.get(e);if(!n)return!1;if(n.type==="number"||n.type==="range"){if(t=Number(t),isNaN(t))return!1;n.min!==void 0&&(t=Math.max(n.min,t)),n.max!==void 0&&(t=Math.min(n.max,t))}else if(n.type==="boolean")t=!!t;else if(n.type==="button"){let s=this._settingCallbacks.get(e);return s&&s(!0),!0}else(n.type==="select"||n.type==="text")&&(t=String(t??""));n.value=t,m.debug("plugin-config","Plugin",`${this._name}: ${n.label} = ${t}`);let i=this._settingCallbacks.get(e);return i&&i(t),!0}getSettings(){return[...this._settings.values()]}setData(e,t){this._data.set(e,t)}getData(e){return this._data.get(e)}broadcastData(e,t){this.onBroadcastData&&this.onBroadcastData(this.pluginId,e,t)}hookPacket(e,t,n){let i=n?.prepend===!0;this.proxy.hookPacket(e,(s,o)=>{this._enabled&&t(s,o)},this.pluginId,i)}hookAllPackets(e){let t=(i,s)=>{this._enabled&&e(i,s,!1)},n=(i,s)=>{this._enabled&&e(i,s,!0)};this.proxy.on("serverPacket",t),this.proxy.on("clientPacket",n),this._cleanupFns.push(()=>{this.proxy.off("serverPacket",t),this.proxy.off("clientPacket",n)})}hookCommand(e,t){this.proxy.hookCommand(e,(n,i,s)=>this._enabled?(t(n,i,s),!0):!1,this.pluginId)}on(e,t){this.proxy.on(e,n=>{this._enabled&&t(n)})}createPacket(e){return this.proxy.packetFactory.createByName(e)}serializePacket(e){return this.proxy.packetFactory.serialize(e)}sendNotification(e,t,n){let i=this.createPacket("TEXT");i.data={name:t,objectId:-1,numStars:-1,bubbleTime:0,recipient:"",text:n,cleanText:n,isSupporter:!1,starBg:0},e.sendToClient(i)}log(e){m.log(this._name,e)}dashboardLog(e){this.onDashboardLog&&this.onDashboardLog(this._name,e)}registerCleanup(e){this._cleanupFns.push(e)}runCleanup(){for(let e of this._cleanupFns)try{e()}catch{}this._cleanupFns=[]}};Q();var di=class{constructor(e,t,n){this.proxy=e;this.pluginId=t;this.pluginFile=n;this._name=t}_enabled=!0;_name;_category;_settings=new Map;_settingCallbacks=new Map;_settingDefaults=new Map;get enabled(){return this._enabled}set enabled(e){this._enabled=e,m.debug("plugin-config","Plugin",`${this._name} ${e?"enabled":"disabled"}`)}get name(){return this._name}set name(e){this._name=e}get category(){return this._category??"utility"}set category(e){this._category=e}registerSetting(e,t,n){this._settings.set(e,{key:e,...t}),n&&this._settingCallbacks.set(e,n),t.type!=="button"&&this._settingDefaults.set(e,t.value)}getSetting(e){return this._settings.get(e)?.value}updateSetting(e,t){let n=this._settings.get(e);if(!n)return!1;if(n.type==="number"||n.type==="range"){if(t=Number(t),isNaN(t))return!1;n.min!==void 0&&(t=Math.max(n.min,t)),n.max!==void 0&&(t=Math.min(n.max,t))}else if(n.type==="boolean")t=!!t;else if(n.type==="button"){let s=this._settingCallbacks.get(e);return s&&s(!0),!0}else(n.type==="select"||n.type==="text")&&(t=String(t??""));n.value=t,m.debug("plugin-config","Plugin",`${this._name}: ${n.label} = ${t}`);let i=this._settingCallbacks.get(e);return i&&i(t),!0}getSettings(){return[...this._settings.values()]}resetSettingsToDefaults(){let e=[];for(let[t,n]of this._settingDefaults){let i=this._settings.get(t);!i||i.type==="button"||i.value!==n&&this.updateSetting(t,n)&&e.push(t)}return e}registerCommand(e,t){this.proxy.hookCommand(e,(n,i,s)=>{if(!this._enabled)return!1;try{t(s)}catch(o){m.error("Plugin",`${this._name}: /${e} threw`,o)}return!0},this.pluginId)}};Q();var eg=[".ts",".js"],tg=[".mjs"];function Fo(r){return r.replace(/\.(?:mjs|js|ts)$/i,"")}var Gx=new Map([["ESC","Escape"],["ESCAPE","Escape"],["INS","Insert"],["INSERT","Insert"],["DEL","Delete"],["DELETE","Delete"],["HOME","Home"],["END","End"],["PGUP","PageUp"],["PAGEUP","PageUp"],["PGDN","PageDown"],["PAGEDOWN","PageDown"],["UP","Up"],["ARROWUP","Up"],["DOWN","Down"],["ARROWDOWN","Down"],["LEFT","Left"],["ARROWLEFT","Left"],["RIGHT","Right"],["ARROWRIGHT","Right"],["SPACE","Space"],["SPACEBAR","Space"],["TAB","Tab"],["BACKSPACE","Backspace"],["ENTER","Enter"],["RETURN","Enter"]]),Ux=new Map([["CTRL","Ctrl"],["CONTROL","Ctrl"],["ALT","Alt"],["MENU","Alt"],["SHIFT","Shift"]]);function Vx(r){let e=r.replace(/\s+/g,"").toUpperCase();if(!e)return null;if(/^[A-Z0-9]$/.test(e))return e;let t=e.match(/^F([1-9]|1[0-2])$/);if(t)return`F${t[1]}`;let n=e.match(/^(?:NUMPAD|NUM)([0-9])$/);if(n)return`Numpad${n[1]}`;let i=Gx.get(e);return i||null}function qx(r){let e=String(r??"").trim();if(!e)return"";let t=e.split("+").map(o=>o.trim()).filter(Boolean);if(!t.length)return"";let n=new Set,i="";for(let o of t){let a=o.replace(/\s+/g,"").toUpperCase(),l=Ux.get(a);if(l){n.add(l);continue}if(i)return null;let c=Vx(o);if(!c)return null;i=c}return i?[...["Ctrl","Alt","Shift"].filter(o=>n.has(o)),i].join("+"):null}var Ho=class r{constructor(e,t,n,i=!0,s,o,a,l){this.proxy=e;this.bundledPluginDir=t;this.userPluginDir=n;this.allowLocalDiskPlugins=i;this.gameData=s,this.worldState=o,this.projectileTracker=a,this.sessionStateResolver=l}static alwaysEnabledPluginIds=new Set(["damage-sniffer"]);loadedPlugins=new Map;bundledWatcher=null;userWatcher=null;gameData;worldState;projectileTracker;sessionStateResolver;dashboardLogListeners=new Set;broadcastDataListeners=new Set;getPlugins(){return Array.from(this.loadedPlugins.values()).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({id:e.id,name:e.name,enabled:e.context.enabled,category:e.context.category,settings:this.getDashboardSettings(e),source:e.source,requiredPlan:null,hotkey:e.hotkey,hotkeyLocked:this.isAlwaysEnabled(e.id)}))}getDashboardSettings(e){return e.context.getSettings().map(t=>{let n={...t};return e.id==="speed-hack"&&n.key==="speedMult"&&(n.min=1,n.step=.1,n.type="number",delete n.max),n})}isAlwaysEnabled(e){return r.alwaysEnabledPluginIds.has(e)}togglePlugin(e,t){let n=this.loadedPlugins.get(e);return n?this.isAlwaysEnabled(e)?(n.context.enabled=!0,{ok:!0}):(n.context.enabled=t,rs("showPluginFloatingText",`${n.name}: ${t?"Enabled":"Disabled"}`),{ok:!0}):{ok:!1,reason:"Plugin not found"}}togglePluginByHotkey(e){let t=this.loadedPlugins.get(e);if(!t)return{ok:!1,reason:"Plugin not found"};if(!t.hotkey)return{ok:!1,reason:"Plugin has no hotkey"};if(this.isAlwaysEnabled(e))return{ok:!1,reason:"Plugin is always enabled"};let n=!t.context.enabled,i=this.togglePlugin(e,n);return i.ok?{...i,enabled:n}:i}updatePluginHotkey(e,t){let n=this.loadedPlugins.get(e);if(!n)return{ok:!1,reason:"Plugin not found"};if(this.isAlwaysEnabled(e))return{ok:!1,reason:"Plugin is always enabled"};let i=qx(t);if(i===null)return{ok:!1,reason:"Unsupported hotkey"};if(i){let s=i.toLowerCase();for(let o of this.loadedPlugins.values())if(o.id!==e&&o.hotkey&&o.hotkey.toLowerCase()===s)return{ok:!1,reason:`Hotkey already assigned to ${o.name||o.id}`,conflictPluginId:o.id}}return n.hotkey=i,m.debug("plugin-config","PluginManager",`Hotkey for ${n.name||n.id}: ${i||"(none)"}`),{ok:!0,hotkey:i}}getPluginHotkeyBindings(){return Array.from(this.loadedPlugins.values()).filter(e=>!!e.hotkey&&!this.isAlwaysEnabled(e.id)).map(e=>({pluginId:e.id,hotkey:e.hotkey}))}disableAllPlugins(){for(let e of this.loadedPlugins.values())if(e.source==="bundled"){if(this.isAlwaysEnabled(e.id)){e.context.enabled=!0;continue}e.context.enabled=!1}}onDashboardLog(e){return this.dashboardLogListeners.add(e),()=>this.dashboardLogListeners.delete(e)}getPluginData(e,t){let n=this.loadedPlugins.get(e);if(n&&n.context instanceof Or)return n.context.getData(t)}onBroadcastData(e){return this.broadcastDataListeners.add(e),()=>this.broadcastDataListeners.delete(e)}updateSetting(e,t,n){let i=this.loadedPlugins.get(e);if(!i)return!1;if(e==="speed-hack"&&t==="speedMult"){let s=Number(n);if(!Number.isFinite(s))return!1;n=Math.max(1,s)}return i.context.updateSetting(t,n)}resetPluginSettings(e){let t=this.loadedPlugins.get(e);return t?t.context.resetSettingsToDefaults():[]}async loadAll(){if(!this.allowLocalDiskPlugins){m.warn("PluginManager","Local disk plugins are disabled in this build mode.");return}await this.loadFromDir(this.bundledPluginDir,"bundled"),await this.loadFromDir(this.userPluginDir,"user"),m.log("PluginManager",`Loaded ${this.loadedPlugins.size} plugins`)}async loadFromDir(e,t){if(!(0,gn.existsSync)(e)){t==="user"?m.log("PluginManager",`No user plugins directory yet: ${e}`):m.warn("PluginManager",`Bundled plugin directory not found: ${e}`);return}let n=t==="bundled"?eg:tg,i=this.discoverPluginEntries(e,n).sort((s,o)=>{let a=u=>u.toLowerCase()==="auto-nexus",l=a(s.id),c=a(o.id);return l&&!c?-1:!l&&c?1:s.id.localeCompare(o.id)});for(let{id:s,entryPath:o}of i)await this.loadPlugin(o,t,s)}static DIR_PLUGIN_ENTRY="index";findDirPluginEntry(e,t){for(let n of t){let i=(0,Xe.join)(e,`${r.DIR_PLUGIN_ENTRY}${n}`);if((0,gn.existsSync)(i))return i}return null}discoverPluginEntries(e,t){let n=new Map,i=[];for(let s of(0,gn.readdirSync)(e,{withFileTypes:!0}))if(s.isFile())t.some(o=>s.name.toLowerCase().endsWith(o))&&n.set(Fo(s.name),(0,Xe.join)(e,s.name));else if(s.isDirectory()){let o=this.findDirPluginEntry((0,Xe.join)(e,s.name),t);o&&i.push({id:s.name,entryPath:o})}for(let s of i)n.has(s.id)||n.set(s.id,s.entryPath);return[...n].map(([s,o])=>({id:s,entryPath:o}))}resolveWatchedPlugin(e,t,n){let i=(0,Xe.relative)(e,t);if(!i||i.startsWith(".."))return null;let s=i.split(/[\\/]/);if(s.length===1)return n.some(l=>s[0].toLowerCase().endsWith(l))?{id:Fo(s[0]),entryPath:(0,Xe.join)(e,s[0])}:null;let o=s[0],a=this.findDirPluginEntry((0,Xe.join)(e,o),n);return a?{id:o,entryPath:a}:null}async loadPlugin(e,t="bundled",n){let i=n??Fo((0,Xe.basename)(e));try{this.loadedPlugins.has(i)&&await this.unloadPlugin(i);let s=(0,Xe.resolve)(e),a=await import((0,rg.pathToFileURL)(s).href+`?t=${Date.now()}`);if(typeof a.register!="function"){m.warn("PluginManager",`Plugin ${i} has no register() export, skipping`);return}let l=t==="user"?new di(this.proxy,i,e):new Or(this.proxy,i,e,this.gameData,this.worldState,this.projectileTracker,this.sessionStateResolver);l instanceof Or&&(l.onDashboardLog=(d,p)=>{for(let f of this.dashboardLogListeners)try{f(d,p)}catch{}},l.onBroadcastData=(d,p,f)=>{for(let h of this.broadcastDataListeners)try{h(d,p,f)}catch{}});let c=a.register(l),u=l instanceof di&&typeof c=="function"?c:null;this.loadedPlugins.set(i,{id:i,name:l.name||i,filePath:e,source:t,hotkey:"",context:l,userCleanup:u}),m.debug("plugin-load","PluginManager",`Loaded ${t} plugin: ${l.name||i}`)}catch(s){m.error("PluginManager",`Failed to load plugin ${i}`,s)}}async unloadPlugin(e){let t=this.loadedPlugins.get(e);if(t){if(t.context instanceof Or)t.context.runCleanup();else if(t.userCleanup)try{t.userCleanup()}catch(n){m.error("PluginManager",`Cleanup for user plugin ${t.name} threw`,n)}this.proxy.unhookPlugin(e),this.loadedPlugins.delete(e),m.log("PluginManager",`Unloaded plugin: ${t.name}`)}}async startWatching(){if(this.allowLocalDiskPlugins)try{let e=await Promise.resolve().then(()=>G(Zh(),1));this.bundledWatcher=this.watchDir(e,this.bundledPluginDir,"bundled"),this.userWatcher=this.watchDir(e,this.userPluginDir,"user"),m.log("PluginManager","Watching plugin directories for changes")}catch{m.warn("PluginManager","Hot-reload unavailable (chokidar not found)")}}watchDir(e,t,n){if(!(0,gn.existsSync)(t))return null;let i=n==="bundled"?eg:tg,s=e.watch(t,{ignoreInitial:!0,awaitWriteFinish:{stabilityThreshold:500}});return s.on("change",async o=>{let a=this.resolveWatchedPlugin(t,o,i);a&&(m.log("PluginManager",`Plugin changed: ${a.id}, reloading...`),await this.loadPlugin(a.entryPath,n,a.id))}),s.on("add",async o=>{let a=this.resolveWatchedPlugin(t,o,i);a&&(m.log("PluginManager",`New plugin: ${a.id}, loading...`),await this.loadPlugin(a.entryPath,n,a.id))}),s.on("unlink",async o=>{let a=(0,Xe.relative)(t,o);if(!a||a.startsWith(".."))return;let l=a.split(/[\\/]/);if(l.length===1){if(!i.some(d=>l[0].toLowerCase().endsWith(d)))return;await this.unloadPlugin(Fo(l[0]));return}let c=l[0],u=this.findDirPluginEntry((0,Xe.join)(t,c),i);u?await this.loadPlugin(u,n,c):await this.unloadPlugin(c)}),s}stopWatching(){this.bundledWatcher?.close(),this.bundledWatcher=null,this.userWatcher?.close(),this.userWatcher=null}};var Wo=class r{static MAX_RAW_HEX_BYTES=8192;static MAX_BODY_DETAIL_BYTES=65536;buffer;bufferHead=0;bufferCount=0;maxSize;listeners=new Set;packetCount=0;startTime=Date.now();defaultMode="summary";clientModes=new Map;constructor(e=5e3){this.maxSize=e,this.buffer=new Array(e)}attach(e){e.on("clientPacket",(t,n)=>{this.capture(t,n,"C->S")}),e.on("serverPacket",(t,n)=>{this.capture(t,n,"S->C")})}setDefaultMode(e){this.defaultMode=e}setClientMode(e,t){e&&this.clientModes.set(e,t)}clearClientMode(e){e&&this.clientModes.delete(e)}getClientMode(e){return this.clientModes.get(e)??this.defaultMode}capture(e,t,n){let i=String(e.clientId||"default"),s=this.getClientMode(i);if(s==="off")return;let o=s==="full",a=o?this.toPreviewHex(t.rawBytes):{hex:"",truncated:!1},l=o?this.buildCapturedData(t):null,c={id:this.packetCount++,packetId:t.id,timestamp:Date.now(),clientId:i,direction:n,name:t.name,size:t.rawBytes.length,data:l,rawHex:a.hex,rawHexTruncated:a.truncated,isDefined:t.isDefined,captureMode:s};this.pushBuffer(c);for(let u of this.listeners)try{u(c)}catch{}}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}getRecent(e=200){let t=Math.max(0,Math.min(e,this.bufferCount)),n=(this.bufferHead-t+this.maxSize)%this.maxSize,i=[];for(let s=0;s<t;s++){let o=this.buffer[(n+s)%this.maxSize];o&&i.push(o)}return i}getRate(){let e=(Date.now()-this.startTime)/1e3;return e>0?Math.round(this.packetCount/e):0}clearBuffer(){this.buffer.fill(void 0),this.bufferHead=0,this.bufferCount=0}pushBuffer(e){this.buffer[this.bufferHead]=e,this.bufferHead=(this.bufferHead+1)%this.maxSize,this.bufferCount=Math.min(this.bufferCount+1,this.maxSize)}buildCapturedData(e){let t=this.safeSerialize(e.data);if(e.name.startsWith("UNKNOWN_")){let i=e.unreadData.length>0?e.unreadData:e.rawBytes.subarray(5),s=this.bodyToHex(i,r.MAX_BODY_DETAIL_BYTES);return t._unknownPacketId=e.id,t._unknownBodyHex=s.hex,s.truncated&&(t._unknownBodyHexTruncated=!0),t._unknownNote="No entry for this packet ID in data/packet-definitions.json \u2014 body hex is the payload after the 5-byte header.",t}if(!e.isDefined){if(t._parseFailureNote="Definition exists but this instance failed to parse \u2014 see hex for the unread portion.",e.unreadData.length>0){let i=this.bodyToHex(e.unreadData,r.MAX_BODY_DETAIL_BYTES);t._parseFailureBodyHex=i.hex,i.truncated&&(t._parseFailureBodyHexTruncated=!0)}return t}if(e.unreadData.length>0){let i=this.bodyToHex(e.unreadData,r.MAX_BODY_DETAIL_BYTES);t._unreadTrailingHex=i.hex,i.truncated&&(t._unreadTrailingHexTruncated=!0)}return t}bodyToHex(e,t){return e.length<=t?{hex:e.toString("hex"),truncated:!1}:{hex:e.subarray(0,t).toString("hex"),truncated:!0}}safeSerialize(e){try{return JSON.parse(JSON.stringify(e,(t,n)=>{if(Buffer.isBuffer(n)){let i=n.toString("hex",0,Math.min(n.length,20));return`<Buffer ${n.length} bytes: ${i}${n.length>20?"...":""}>`}return n}))}catch{return{_error:"Failed to serialize packet data"}}}toPreviewHex(e){let t=r.MAX_RAW_HEX_BYTES;return e.length<=t?{hex:e.toString("hex"),truncated:!1}:{hex:e.subarray(0,t).toString("hex"),truncated:!0}}};var Sb=G(require("http"),1),Sd=G(require("https"),1),wb=G(require("net"),1),B=require("fs"),te=require("path"),nr=require("child_process");var pk=G(Xg(),1),mk=G(Xo(),1),hk=G(Sn(),1),gk=G(hu(),1),yk=G(bu(),1),bk=G(vu(),1),X=G(ta(),1),Cu=G(sy(),1);var Eb=G(un(),1);var oy=require("events");var Sk={82:"QUESTOBJID",84:"REALMHEROESRESPONSE",95:"INVRESULT",114:"EXALTATIONUPDATE",120:"BLUEPRINTINFO",122:"SHOWALLYSHOOT",139:"STATS",165:"UNKNOWN165",169:"REALMSCORE",182:"CRUCIBLEREQUEST",183:"CRUCIBLERESPONSE"},wk=50;function Ek(r){let e=[];for(let t of r.trim().split(/\s+/)){if(!t)continue;let n=t.toLowerCase();if(n.includes("*")){let[i,s]=n.split("*");e.push({kind:"repeat",type:i.trim(),n:parseInt(s,10)})}else n.endsWith("[]")?e.push({kind:"array",type:n.slice(0,-2)}):e.push({kind:"single",type:n})}return e}function ku(r,e){switch(e){case"byte":return r.readByte();case"sbyte":return r.readSByte();case"bool":return r.readBool();case"int16":return r.readInt16();case"uint16":return r.readUInt16();case"int32":return r.readInt32();case"uint32":return r.readUInt32();case"float":return r.readFloat();case"string":return r.readString();case"utf32string":return r.readUtf32String();case"compressedint":return r.readCompressedInt();case"bytearray16":return r.readBytes(r.readInt16());case"bytearray32":return r.readBytes(r.readInt32());case"bytes:rest":return r.readRemainingBytes();default:if(e.startsWith("bytes:"))return r.readBytes(parseInt(e.slice(6),10));throw new Error(`Unknown type: ${e}`)}}function Tk(r,e){let t=new Tr(r,0),n=[];for(let i of e)if(i.kind==="single")n.push(ku(t,i.type));else if(i.kind==="repeat")n.push(Array.from({length:i.n},()=>ku(t,i.type)));else{let s=t.readCompressedInt();n.push(Array.from({length:s},()=>ku(t,i.type)))}return{values:n,leftover:t.remaining}}function ay(r){if(Buffer.isBuffer(r)){let e=r.toString("hex");return`<${r.length}B: ${e.slice(0,20)}${r.length>10?"\u2026":""}>`}return Array.isArray(r)?`[${r.slice(0,8).map(ay).join(", ")}${r.length>8?`,\u2026+${r.length-8}`:""}]`:typeof r=="number"?r.toString():typeof r=="boolean"?r?"true":"false":JSON.stringify(r)}var na=class extends oy.EventEmitter{store=new Map;updateTimer=null;capture(e){if(e.isDefined)return;let t=Buffer.from(e.rawHex,"hex");if(t.length<5)return;let n=t[4],i=t.slice(5),s=this.store.get(n);s||(s={id:n,hardCodedName:Sk[n]??`UNKNOWN_${n}`,count:0,payloads:[],sizeMap:{}},this.store.set(n,s)),s.count++;let o=i.length;s.sizeMap[o]=(s.sizeMap[o]??0)+1,s.payloads.length<wk&&s.payloads.push(i.toString("hex")),this.updateTimer||(this.updateTimer=setTimeout(()=>{this.updateTimer=null,this.emit("update")},500))}getUnknowns(){return[...this.store.values()].map(({payloads:e,...t})=>t)}clear(){this.store.clear(),this.updateTimer&&(clearTimeout(this.updateTimer),this.updateTimer=null),this.emit("update")}analyze(e){let t=this.store.get(e);if(!t)return null;let n=t.payloads.map(u=>Buffer.from(u,"hex")),i=Object.entries(t.sizeMap).map(([u,d])=>({size:Number(u),count:d})).sort((u,d)=>u.size-d.size),s=Math.max(0,...n.map(u=>u.length)),o=[];for(let u=0;u<s;u++){let d=n.filter(f=>u<f.length).map(f=>f[u]),p=new Set(d);o.push({isConst:p.size===1,value:p.size===1?d[0]:null,min:Math.min(...d),max:Math.max(...d),distinct:p.size})}let a=[],l=new Set;for(let u of n.slice(0,5))for(let d=0;d<=u.length-3;d++){let p=u.readUInt16BE(d);if(p>=1&&p<=200&&d+2+p<=u.length){let f=u.slice(d+2,d+2+p).toString("utf8");/^[\x20-\x7e\t\r\n]+$/.test(f)&&!l.has(f)&&(a.push({offset:d,value:f}),l.add(f))}}let c=n.slice(0,5).map(u=>{try{let d=new Tr(u,0),p=[];for(;d.remaining>0;)p.push(d.readCompressedInt());return p}catch{return null}});return{id:e,hardCodedName:t.hardCodedName,count:t.count,sizes:i,byteDiff:o,strings:a,compressedInts:c,hexSamples:t.payloads.slice(0,5)}}probe(e,t){let n={samplesTotal:0,trueCount:0,pass:0,warn:0,error:0,passExamples:[],warnExamples:[],errorExamples:[]},i=this.store.get(e);if(!i)return n;let s;try{s=Ek(t)}catch(a){return{...n,error:1,errorExamples:[{fields:[],hex:"",error:`Spec parse error: ${a.message}`}]}}let o={samplesTotal:i.payloads.length,trueCount:i.count,pass:0,warn:0,error:0,passExamples:[],warnExamples:[],errorExamples:[]};for(let a of i.payloads){let l=Buffer.from(a,"hex");try{let{values:c,leftover:u}=Tk(l,s),d=c.map(ay);u===0?(o.pass++,o.passExamples.length<5&&o.passExamples.push({fields:d,hex:a})):(o.warn++,o.warnExamples.length<3&&o.warnExamples.push({fields:d,hex:a,leftover:u}))}catch(c){o.error++,o.errorExamples.length<3&&o.errorExamples.push({fields:[],hex:a,error:c.message})}}return o}};var sa=require("fs"),oa=require("fs/promises"),ly=require("crypto"),Wr=require("path"),cy=require("zlib"),uy=G(un(),1);Q();var Pk=process.platform==="darwin"?"https://www.realmofthemadgod.com/app/init?platform=standaloneosxuniversal&key=9KnJFxtTvLu2frXv":"https://www.realmofthemadgod.com/app/init?platform=standalonewindows64&key=9KnJFxtTvLu2frXv",dy=15e3,vk=12e4,xk=10,Ck=4;function kk(){return{state:"idle",buildId:"",filesToUpdate:0,bytesToUpdate:0,filesDone:0,bytesDone:0,lastCheck:null,error:null}}function _k(r){let e=new uy.XMLParser({ignoreAttributes:!0,parseTagValue:!1}).parse(r),t={},n=s=>{if(!(!s||typeof s!="object"))for(let[o,a]of Object.entries(s))typeof a=="string"&&!t[o]?t[o]=a.trim():n(a)};n(e);let i={buildId:t.BuildId||"",buildCdn:t.BuildCDN||"",buildHash:t.BuildHash||""};if(!i.buildCdn||!i.buildHash||!i.buildId)throw new Error("RotMG /app/init did not return a usable build descriptor");return i}function Ik(r){let e=JSON.parse(r);if(!Array.isArray(e.files))throw new Error("checksum.json did not contain a files array");return e.files}function fy(r,e){let t=(0,Wr.resolve)(r),n=(0,Wr.resolve)(t,e);if(n!==t&&!n.startsWith(t+Wr.sep))throw new Error(`Refusing to write outside the game directory: ${e}`);return n}function Rk(r){return new Promise((e,t)=>{let n=(0,ly.createHash)("md5");(0,sa.createReadStream)(r).on("error",t).on("data",i=>n.update(i)).on("end",()=>e(n.digest("hex")))})}async function Nk(r,e){return(await py(e,xk,async n=>{let i=fy(r,n.file);return(0,sa.existsSync)(i)&&await Rk(i).catch(()=>"")===n.checksum?null:n})).filter(n=>n!==null)}async function py(r,e,t){let n=[];for(let i=0;i<r.length;i+=e)n.push(...await Promise.all(r.slice(i,i+e).map(t)));return n}async function Ak(){let r=await fetch(Pk,{method:"POST",headers:{"Content-Length":"0","Content-Type":"application/x-www-form-urlencoded"},signal:AbortSignal.timeout(dy)});if(!r.ok)throw new Error(`RotMG /app/init returned HTTP ${r.status}`);return _k(await r.text())}function my(r,e){return`${r.buildCdn}${r.buildHash}/${r.buildId}${e}`}async function Ok(r){let e=my(r,"/checksum.json"),t=await fetch(e,{signal:AbortSignal.timeout(dy)});if(!t.ok)throw new Error(`checksum.json returned HTTP ${t.status}`);return Ik(await t.text())}async function Mk(r,e,t){let n=fy(e,t.file),i=my(r,`/${t.file}.gz`),s=await fetch(i,{signal:AbortSignal.timeout(vk)});if(!s.ok)throw new Error(`${t.file}: HTTP ${s.status}`);let o=(0,cy.gunzipSync)(Buffer.from(await s.arrayBuffer()));await(0,oa.mkdir)((0,Wr.dirname)(n),{recursive:!0}),await(0,oa.writeFile)(n,o)}var ia=class{constructor(e,t,n){this.getGameRoot=e;this.isGameRunning=t;this.onChange=n}status=kk();pending=[];pendingInit=null;getStatus(){return{...this.status}}emit(e){this.status={...this.status,...e},this.onChange(this.getStatus())}async check(){if(this.status.state!=="idle")return;let e=this.getGameRoot();if(!e){this.emit({error:"Set your RotMG Exalt path in Settings first."});return}this.emit({state:"checking",error:null,filesDone:0,bytesDone:0});try{let t=await Ak(),n=await Nk(e,await Ok(t));this.pending=n,this.pendingInit=t,this.emit({state:"idle",buildId:t.buildId,filesToUpdate:n.length,bytesToUpdate:n.reduce((i,s)=>i+(Number(s.size)||0),0),lastCheck:Date.now(),error:null}),m.log("GameUpdater",`Build ${t.buildId}: ${n.length} file(s) need updating.`)}catch(t){this.pending=[],this.pendingInit=null,this.emit({state:"idle",error:t.message||"Update check failed"}),m.warn("GameUpdater",`Check failed: ${t.message}`)}}async update(){if(this.status.state!=="idle")return;let e=this.getGameRoot();if(!e){this.emit({error:"Set your RotMG Exalt path in Settings first."});return}if(this.isGameRunning()){this.emit({error:"Close RotMG Exalt before updating the game."});return}if(!this.pending.length||!this.pendingInit){this.emit({error:"Check for updates first."});return}let t=this.pendingInit,n=this.pending;this.emit({state:"updating",error:null,filesDone:0,bytesDone:0});try{await py(n,Ck,async i=>{await Mk(t,e,i),this.emit({filesDone:this.status.filesDone+1,bytesDone:this.status.bytesDone+(Number(i.size)||0)})}),this.pending=[],this.pendingInit=null,this.emit({state:"idle",filesToUpdate:0,bytesToUpdate:0,error:null}),m.log("GameUpdater",`Updated ${n.length} file(s) to build ${t.buildId}.`)}catch(i){this.emit({state:"idle",error:i.message||"Update failed"}),m.warn("GameUpdater",`Update failed: ${i.message}`)}}};Q();Bn();var aa=class{tasks=new Map;timer=null;nextId=1;scheduleRepeating(e,t){let n=Math.max(10,Math.trunc(e)),i=this.nextId++;return this.tasks.set(i,{id:i,intervalMs:n,nextRunAt:Date.now()+n,fn:t}),this.scheduleNextTick(),()=>{this.tasks.delete(i),this.scheduleNextTick()}}stop(){this.timer&&(clearTimeout(this.timer),this.timer=null),this.tasks.clear()}scheduleNextTick(){if(this.timer&&(clearTimeout(this.timer),this.timer=null),this.tasks.size===0)return;let e=Date.now(),t=Number.POSITIVE_INFINITY;for(let i of this.tasks.values())i.nextRunAt<t&&(t=i.nextRunAt);let n=Math.max(0,t-e);this.timer=setTimeout(()=>this.tick(),n),this.timer.unref?.()}tick(){this.timer=null;let e=Date.now();for(let t of this.tasks.values())if(!(e<t.nextRunAt)){try{t.fn()}catch{}t.nextRunAt=e+t.intervalMs}this.scheduleNextTick()}};Gr();var Sy=require("child_process"),Ur=require("fs"),Au=require("path"),Ai=require("os"),wy=require("crypto");function Ey(){if((0,Ai.platform)()!=="win32")return"";let r=process.env.LOCALAPPDATA||(0,Au.join)(process.env.USERPROFILE||"","AppData","Local");return(0,Au.join)(r,"RealmOfTheMadGod","hwid.txt")}function Wk(r){if((0,Ai.platform)()!=="win32")return null;try{let n=(0,Sy.execSync)(`powershell -NoProfile -Command ${JSON.stringify("$c='';Get-WmiObject Win32_BaseBoard|ForEach-Object{$c+=$_.SerialNumber};Get-WmiObject Win32_BIOS|ForEach-Object{$c+=$_.SerialNumber};Get-WmiObject Win32_OperatingSystem|ForEach-Object{$c+=$_.SerialNumber};$c")}`,{encoding:"utf8",timeout:1e4}).trim()||r,i=(0,wy.createHash)("sha1").update(n,"utf8").digest("hex");return/^[a-f0-9]{40}$/.test(i)?i:null}catch{return null}}function Oi(r){let e=(0,Ai.hostname)()+(process.env.USERNAME||process.env.USER||"user");try{if(!r?.skipFile){let n=Ey();if(n&&(0,Ur.existsSync)(n)){let i=(0,Ur.readFileSync)(n,"utf8").trim();if(i)return i}}let t=Wk(e);return t||e}catch{return e}}function Ou(){try{let r=Ey();if(r&&(0,Ur.existsSync)(r))return(0,Ur.unlinkSync)(r),!0}catch{}return!1}var Gk={packets:{0:{name:"FAILURE",direction:"server",fields:[{name:"errorId",type:"int32"},{name:"errorMessage",type:"string"}]},1:{name:"TELEPORT",direction:"client",fields:[{name:"objectId",type:"int32"},{name:"playerName",type:"string"}]},3:{name:"CLAIMDAILYLOGINREWARD",direction:"client",fields:[{name:"claimStr",type:"string"},{name:"claimType",type:"string"}]},4:{name:"DELETEPETMESSAGE",direction:"server",fields:[]},5:{name:"REQUESTTRADE",direction:"client",fields:[{name:"name",type:"string"}]},6:{name:"QUESTFETCHRESPONSE",direction:"server",fields:[]},7:{name:"JOINGUILD",direction:"client",fields:[]},8:{name:"PING",direction:"server",fields:[{name:"serial",type:"int32"}]},9:{name:"PLAYERTEXT",direction:"client",fields:[{name:"text",type:"string"}]},10:{name:"NEWTICK",direction:"server",fields:[{name:"tickId",type:"int32"},{name:"tickTime",type:"int32"},{name:"serverRealTimeMs",type:"uint32"},{name:"serverLastRttMs",type:"uint16"},{name:"statuses",type:"array",lengthType:"int16",elementType:"Status"}]},11:{name:"SHOWEFFECT",direction:"server",fields:[]},12:{name:"SERVERPLAYERSHOOT",direction:"server",fields:[{name:"bulletId",type:"uint16"},{name:"ownerId",type:"int32"},{name:"containerType",type:"int32"},{name:"startingPos",type:"Location"},{name:"angle",type:"float"},{name:"damage",type:"int16"},{name:"superOwnerId",type:"int32"},{name:"bulletType",type:"byte",optional:!0,default:255},{name:"numShots",type:"byte",optional:!0,default:0},{name:"angleInc",type:"float",optional:!0,default:-1}]},13:{name:"USEITEM",direction:"client",fields:[{name:"time",type:"int32"},{name:"slotObject",type:"SlotObject"},{name:"itemUsePos",type:"Location"},{name:"useType",type:"byte"},{name:"unknownInt",type:"int32"}]},14:{name:"TRADEACCEPTED",direction:"server",fields:[{name:"clientOffer",type:"array",lengthType:"int16",elementType:"bool"},{name:"partnerOffer",type:"array",lengthType:"int16",elementType:"bool"}]},15:{name:"GUILDREMOVE",direction:"client",fields:[]},16:{name:"PETUPGRADEREQUEST",direction:"client",fields:[]},17:{name:"ENTERARENA",direction:"server",fields:[]},18:{name:"GOTO",direction:"server",fields:[{name:"objectId",type:"int32"},{name:"position",type:"Location"},{name:"unknown",type:"int32"}]},19:{name:"INVDROP",direction:"client",fields:[{name:"slotObject",type:"SlotObject"},{name:"unknownByte",type:"sbyte"}]},20:{name:"OTHERHIT",direction:"client",fields:[{name:"time",type:"int32"},{name:"bulletId",type:"uint16"},{name:"objectId",type:"int32"},{name:"targetId",type:"int32"}]},21:{name:"NAMERESULT",direction:"server",fields:[]},22:{name:"BUYRESULT",direction:"server",fields:[]},23:{name:"HATCHPET",direction:"server",fields:[]},24:{name:"ACTIVEPETPDATEREQ",direction:"client",fields:[{name:"commandId",type:"byte"},{name:"petId",type:"uint32"}],note:"Same wire as EK ActivePetUpdateRequest."},25:{name:"ENEMYHIT",direction:"client",fields:[{name:"time",type:"int32"},{name:"bulletId",type:"int16"},{name:"ownerId",type:"int32"},{name:"targetId",type:"int32"},{name:"kill",type:"bool"},{name:"unknownId",type:"int32"}]},26:{name:"GUILDRESULT",direction:"server",fields:[]},27:{name:"EDITACCOUNTLIST",direction:"client",fields:[]},28:{name:"TRADECHANGED",direction:"server",fields:[{name:"offer",type:"array",lengthType:"int16",elementType:"bool"}]},30:{name:"PLAYERSHOOT",direction:"client",fields:[{name:"time",type:"int32"},{name:"shotId",type:"uint16"},{name:"containerType",type:"int16"},{name:"attackIndex",type:"sbyte"},{name:"projectilePosition",type:"Location"},{name:"angle",type:"float"},{name:"bulletId",type:"byte"},{name:"unknownShort",type:"int16"},{name:"playerPosition",type:"Location"}]},31:{name:"PONG",direction:"client",fields:[{name:"serial",type:"int32"},{name:"time",type:"int32"}]},33:{name:"CHANGEPETSKIN",direction:"client",fields:[]},34:{name:"TRADEDONE",direction:"server",fields:[{name:"code",type:"int32"},{name:"description",type:"string"}]},35:{name:"ENEMYSHOOT",direction:"server",fields:[{name:"bulletId",type:"int16"},{name:"ownerId",type:"int32"},{name:"bulletType",type:"byte"},{name:"position",type:"Location"},{name:"angle",type:"float"},{name:"damage",type:"int16"},{name:"numShots",type:"byte",optional:!0,default:255},{name:"angleInc",type:"float",optional:!0,default:0}]},36:{name:"ACCEPTTRADE",direction:"client",fields:[{name:"clientOffer",type:"array",lengthType:"int16",elementType:"bool"},{name:"partnerOffer",type:"array",lengthType:"int16",elementType:"bool"}]},37:{name:"CHANGEGUILDRANK",direction:"client",fields:[]},38:{name:"PLAYSOUND",direction:"server",fields:[]},39:{name:"VERIFYEMAIL",direction:"server",fields:[]},40:{name:"SQUAREHIT",direction:"client",fields:[{name:"time",type:"int32"},{name:"bulletId",type:"int16"},{name:"objectId",type:"int32"}]},41:{name:"NEWABILITYMESSAGE",direction:"server",fields:[{name:"abilityType",type:"int32"}]},42:{name:"UPDATE",direction:"server",fields:[{name:"position",type:"Location"},{name:"levelType",type:"byte"},{name:"tiles",type:"array",lengthType:"compressedInt",elementType:"Tile"},{name:"newObjs",type:"array",lengthType:"compressedInt",elementType:"Entity"},{name:"drops",type:"array",lengthType:"compressedInt",elementType:"compressedInt"}]},44:{name:"TEXT",direction:"server",fields:[{name:"name",type:"string"},{name:"objectId",type:"int32"},{name:"numStars",type:"int16"},{name:"bubbleTime",type:"byte"},{name:"recipient",type:"string"},{name:"text",type:"string"},{name:"cleanText",type:"string"},{name:"isSupporter",type:"bool"},{name:"starBg",type:"int32"}]},45:{name:"RECONNECT",direction:"server",fields:[{name:"name",type:"string"},{name:"host",type:"string"},{name:"port",type:"uint16"},{name:"gameId",type:"int32"},{name:"keyTime",type:"int32"},{name:"key",type:"byteArray16"}]},46:{name:"DEATH",direction:"server",fields:[{name:"accountId",type:"string"},{name:"charId",type:"compressedInt"},{name:"killedBy",type:"string"},{name:"unknownInt",type:"int32"},{name:"fameEarned",type:"compressedInt"},{name:"accountLevel",type:"compressedInt"},{name:"accountXP",type:"compressedInt"}],note:"Partial definition \u2014 fameBonuses and pcStats have complex encoding. Remaining bytes pass through as unreadData."},47:{name:"USEPORTAL",direction:"client",fields:[{name:"objectId",type:"int32"}]},48:{name:"GOTOQUESTROOM",direction:"client",fields:[]},49:{name:"ALLYSHOOT",direction:"server",fields:[{name:"unknownByte",type:"byte"},{name:"unknownShort",type:"int16"}]},50:{name:"IMMINENTARENAWAVE",direction:"server",fields:[]},51:{name:"RESKIN",direction:"client",fields:[]},52:{name:"RESETDAILYQUESTS",direction:"client",fields:[]},53:{name:"PETCHANGEFORMMSG",direction:"server",fields:[]},55:{name:"INVENTORYSWAP",direction:"client",fields:[{name:"time",type:"int32"},{name:"position",type:"Location"},{name:"slotObject1",type:"SlotObject"},{name:"slotObject2",type:"SlotObject"},{name:"tickId",type:"int32",optional:!0,default:0}]},56:{name:"CHANGETRADE",direction:"client",fields:[{name:"offer",type:"array",lengthType:"int16",elementType:"bool"}]},57:{name:"CREATE",direction:"client",fields:[{name:"classType",type:"int16"},{name:"skinType",type:"int16"},{name:"isChallenger",type:"bool"},{name:"isSeasonal",type:"bool"}]},58:{name:"QUESTREDEEM",direction:"client",fields:[]},59:{name:"CREATEGUILD",direction:"client",fields:[]},60:{name:"SETCONDITION",direction:"client",fields:[{name:"conditionEffect",type:"byte"},{name:"conditionDuration",type:"float"}]},61:{name:"LOAD",direction:"client",fields:[{name:"charId",type:"int32"},{name:"isFromArena",type:"bool"}]},62:{name:"MOVE",direction:"client",fields:[{name:"tickId",type:"int32"},{name:"serverRealTimeMSofLastNewTick",type:"uint32"},{name:"records",type:"array",lengthType:"int16",elementType:"LocationRecord"}]},63:{name:"KEYINFORESPONSE",direction:"server",fields:[]},64:{name:"AOE",direction:"server",fields:[{name:"position",type:"Location"},{name:"radius",type:"float"},{name:"damage",type:"uint16"},{name:"effect",type:"byte"},{name:"effectDuration",type:"float"},{name:"originType",type:"uint16"},{name:"color",type:"int32"},{name:"armorPierce",type:"bool"}]},65:{name:"GOTOACK",direction:"client",fields:[{name:"time",type:"int32"},{name:"unknownByte",type:"byte"}]},66:{name:"GLOBALNOTIFICATION",direction:"server",fields:[{name:"notificationType",type:"int32"},{name:"text",type:"string"}]},67:{name:"NOTIFICATION",direction:"server",fields:[{name:"typeValue",type:"byte"},{name:"textByte",type:"byte"}],note:"Complex conditional packet - extra fields depend on typeValue. Remaining bytes stored in unreadData for passthrough."},68:{name:"ARENADEATH",direction:"server",fields:[]},69:{name:"CLIENTSTAT",direction:"server",fields:[{name:"name",type:"string"},{name:"value",type:"int32"}]},74:{name:"HELLO",direction:"client",fields:[{name:"gameId",type:"int32"},{name:"buildVersion",type:"string"},{name:"accessToken",type:"string"},{name:"keyTime",type:"int32"},{name:"key",type:"byteArray16"},{name:"gameNet",type:"string"},{name:"playPlatform",type:"string"},{name:"platformToken",type:"string"},{name:"userToken",type:"string"},{name:"clientIdentification",type:"string"}]},75:{name:"DAMAGE",direction:"server",fields:[{name:"targetId",type:"int32"},{name:"effects",type:"array",lengthType:"byte",elementType:"byte"},{name:"damageAmount",type:"uint16"},{name:"kill",type:"bool"},{name:"bulletId",type:"int16"},{name:"objectId",type:"int32"}]},76:{name:"ACTIVEPET",direction:"server",fields:[]},77:{name:"INVITEDTOGUILD",direction:"server",fields:[]},78:{name:"PETYARDUPDATE",direction:"server",fields:[]},79:{name:"PASSWORDPROMPT",direction:"server",fields:[]},80:{name:"ACCEPTARENADEATH",direction:"server",fields:[]},81:{name:"UPDATEACK",direction:"client",fields:[]},82:{name:"QUESTOBJECTID",direction:"server",fields:[{name:"objectId",type:"int32"}]},83:{name:"PIC",direction:"server",fields:[]},84:{name:"REALMHEROESRESPONSE",direction:"server",fields:[{name:"numberOfRealmHeros",type:"int32"}]},85:{name:"BUY",direction:"client",fields:[{name:"objectId",type:"int32"},{name:"quantity",type:"int32"}]},86:{name:"TRADESTART",direction:"server",fields:[{name:"clientItems",type:"array",lengthType:"int16",elementType:"TradeItem"},{name:"partnerName",type:"string"},{name:"partnerItems",type:"array",lengthType:"int16",elementType:"TradeItem"}]},87:{name:"EVOLVEPET",direction:"server",fields:[]},88:{name:"TRADEREQUESTED",direction:"server",fields:[{name:"name",type:"string"}]},89:{name:"AOEACK",direction:"client",fields:[{name:"time",type:"int32"},{name:"position",type:"Location"}]},90:{name:"PLAYERHIT",direction:"client",fields:[{name:"bulletId",type:"int16"},{name:"objectId",type:"int32"}]},91:{name:"CANCELTRADE",direction:"client",fields:[]},92:{name:"MAPINFO",direction:"server",fields:[{name:"width",type:"int32"},{name:"height",type:"int32"},{name:"name",type:"string"},{name:"displayName",type:"string"},{name:"realmName",type:"string"},{name:"fp",type:"int32"},{name:"background",type:"int32"},{name:"difficulty",type:"float"},{name:"allowPlayerTeleport",type:"bool"},{name:"noSave",type:"bool"},{name:"showDisplays",type:"bool"},{name:"maxPlayers",type:"int16"},{name:"gameOpenedTime",type:"int32"},{name:"serverVersion",type:"string"},{name:"viewDistance",type:"int16"},{name:"bgColor",type:"int32",optional:!0,default:0},{name:"modifier",type:"string",optional:!0,default:""},{name:"unknownShort1",type:"int16",optional:!0,default:0},{name:"unknownBool",type:"bool",optional:!0,default:!1},{name:"unknownShort2",type:"int16",optional:!0,default:0},{name:"maxRealmScore",type:"int32",optional:!0,default:0},{name:"currentRealmScore",type:"int32",optional:!0,default:0}]},93:{name:"CLAIMDAILYLOGINRESPONSE",direction:"server",fields:[{name:"itemId",type:"int32"},{name:"quantity",type:"int32"},{name:"gold",type:"int32"}]},94:{name:"KEYINFOREQUEST",direction:"client",fields:[]},95:{name:"INVRESULT",direction:"server",fields:[{name:"unknownBool",type:"bool"},{name:"unknownByte",type:"sbyte"},{name:"fromSlot",type:"SlotObject"},{name:"toSlot",type:"SlotObject"},{name:"unknownInt1",type:"int32"},{name:"unknownInt2",type:"int32"}]},96:{name:"QUESTREDEEMRESPONSE",direction:"server",fields:[]},97:{name:"CHOOSENAME",direction:"client",fields:[]},98:{name:"QUESTFETCHASK",direction:"client",fields:[]},99:{name:"ACCOUNTLIST",direction:"server",fields:[]},100:{name:"SHOOTACK",direction:"client",fields:[{name:"time",type:"int32"}]},101:{name:"CREATESUCCESS",direction:"server",fields:[{name:"objectId",type:"int32"},{name:"charId",type:"int32"},{name:"stats",type:"string"}]},102:{name:"CHECKCREDITS",direction:"client",fields:[]},103:{name:"GROUNDDAMAGE",direction:"client",fields:[{name:"time",type:"int32"},{name:"position",type:"Location"}]},104:{name:"GUILDINVITE",direction:"client",fields:[]},105:{name:"ESCAPE",direction:"client",fields:[]},106:{name:"FILE",direction:"server",fields:[]},107:{name:"RESKINUNLOCK",direction:"server",fields:[{name:"isPetSkin",type:"int32"}]},108:{name:"NEWCHARACTERINFO",direction:"server",fields:[]},109:{name:"UNLOCKINFORMATION",direction:"server",fields:[]},112:{name:"QUEUEMESSAGE",direction:"server",fields:[{name:"curPos",type:"uint16"},{name:"maxPos",type:"uint16"}],note:"RealmShark QUEUE_INFORMATION (112, incoming)."},113:{name:"QUEUECANCEL",direction:"client",fields:[{name:"queueType",type:"string"}]},114:{name:"EXALTATIONBONUSCHANGED",direction:"server",fields:[{name:"objType",type:"int16"},{name:"dexProgress",type:"compressedInt"},{name:"spdProgress",type:"compressedInt"},{name:"vitProgress",type:"compressedInt"},{name:"wisProgress",type:"compressedInt"},{name:"defProgress",type:"compressedInt"},{name:"attProgress",type:"compressedInt"},{name:"manaProgress",type:"compressedInt"},{name:"lifeProgress",type:"compressedInt"}]},115:{name:"REDEEMEXALTATIONREWARD",direction:"client",fields:[{name:"itemType",type:"int32"}]},117:{name:"VAULTCONTENT",direction:"server",fields:[{name:"lastVaultUpdate",type:"bool"},{name:"vaultChestObjectId",type:"compressedInt"},{name:"materialChestObjectId",type:"compressedInt"},{name:"giftChestObjectId",type:"compressedInt"},{name:"potionStorageObjectId",type:"compressedInt"},{name:"seasonalSpoilChestObjectId",type:"compressedInt"},{name:"vaultContents",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"materialContents",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"giftContents",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"potionContents",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"seasonalSpoilContent",type:"array",lengthType:"compressedInt",elementType:"compressedInt"},{name:"vaultUpgradeCost",type:"int16"},{name:"materialUpgradeCost",type:"int16"},{name:"seasonalSpoilUpgradeCost",type:"int16"},{name:"potionUpgradeCost",type:"int16"},{name:"currentPotionMax",type:"int16"},{name:"nextPotionMax",type:"int16"},{name:"vaultChestEnchants",type:"string"},{name:"giftChestEnchants",type:"string"},{name:"spoilsChestEnchants",type:"string"}]},118:{name:"FORGEREQUEST",direction:"client",fields:[]},119:{name:"FORGERESULT",direction:"server",fields:[]},120:{name:"FORGEUNLOCKEDBLUEPRINTS",direction:"server",fields:[{name:"unknownByte",type:"sbyte"},{name:"blueprints",type:"array",lengthType:"compressedInt",elementType:"compressedInt"}]},121:{name:"SHOOTACKCOUNTER",direction:"client",fields:[{name:"time",type:"int32"},{name:"count",type:"int16"}],note:"RealmShark SHOOT_ACK (121, outgoing)."},122:{name:"SHOWALLYSHOOT",direction:"client",fields:[{name:"toggle",type:"int32"}],note:"RealmShark CHANGE_ALLYSHOOT (122, outgoing)."},123:{name:"GETPLAYERSLISTMESSAGE",direction:"client",fields:[]},124:{name:"MODERATORACTIONMESSAGE",direction:"client",fields:[]},126:{name:"CREEPMOVEMESSAGE",direction:"client",fields:[]},129:{name:"CUSTOMMAPDELETE",direction:"client",fields:[]},131:{name:"CUSTOMMAPLIST",direction:"client",fields:[]},133:{name:"CREEPHIT",direction:"client",fields:[]},134:{name:"PLAYERCALLOUT",direction:"client",fields:[{name:"calloutType",type:"byte"},{name:"value",type:"int32"}]},136:{name:"BUYREFINEMENT",direction:"client",fields:[{name:"slot",type:"SlotObject"},{name:"action",type:"int16"}]},137:{name:"DASH",direction:"client",fields:[]},138:{name:"DASHACK",direction:"client",fields:[]},139:{name:"STATS",direction:"server",fields:[{name:"charId",type:"compressedInt"}],note:"RealmShark StatsPacket: charId then StatsStateData; remainder stays in unreadData until schema is extended."},140:{name:"BUYCUSTOMISATIONSOCKET",direction:"client",fields:[]},145:{name:"FAVORPET",direction:"client",fields:[{name:"petId",type:"int32"}]},146:{name:"SKINRECYCLE",direction:"client",fields:[{name:"item",type:"SlotObject"}]},147:{name:"UNKNOWN147",direction:"server",fields:[]},148:{name:"DAMAGEBOOST",direction:"server",fields:[]},149:{name:"CLAIMBATTLEPASS",direction:"client",fields:[{name:"item",type:"sbyte"}]},150:{name:"CLAIMBATTLEPASSRESPONSE",direction:"server",fields:[{name:"success",type:"bool"}],note:"RealmShark CLAIM_BP_MILESTONE_RESULT (150, incoming). EK ClaimBPMilestoneResult."},151:{name:"BOOSTBPMILESTONE",direction:"client",fields:[{name:"milestoneIndex",type:"byte"}]},154:{name:"CONVERTSEASONALCHARACTER",direction:"client",fields:[]},155:{name:"RETITLE",direction:"client",fields:[{name:"prefix",type:"int32"},{name:"suffix",type:"int32"}]},156:{name:"SETGRAVESTONE",direction:"client",fields:[]},157:{name:"SETABILITY",direction:"client",fields:[{name:"abilityType",type:"int32"},{name:"abilityIndex",type:"sbyte"}]},159:{name:"EMOTE",direction:"client",fields:[{name:"emoteId",type:"int32"},{name:"time",type:"int32"},{name:"unknownBool",type:"bool"}],note:"RealmShark EMOTE (159). EK Emote uses bool, not sbyte."},160:{name:"BUYEMOTE",direction:"client",fields:[{name:"emoteId",type:"int32"}]},162:{name:"SETTRACKEDSEASON",direction:"client",fields:[]},163:{name:"CLAIMMISSION",direction:"client",fields:[{name:"missionId",type:"int32"},{name:"unknownByte1",type:"byte"},{name:"unknownByte2",type:"byte"},{name:"unknownShort",type:"uint16"}]},164:{name:"UNKNOWN164",direction:"server",fields:[]},165:{name:"UNKNOWN165",direction:"server",fields:[{name:"unknownStr",type:"string"}]},166:{name:"STASIS",direction:"server",fields:[]},167:{name:"SETDISCOVERABLE",direction:"client",fields:[]},169:{name:"REALMSCOREUPDATE",direction:"server",fields:[{name:"score",type:"int32"}]},170:{name:"CLAIMREWARDSINFOPROMPT",direction:"server",fields:[]},171:{name:"CLAIMCHESTREWARD",direction:"server",fields:[]},172:{name:"CHESTREWARDRESULT",direction:"server",fields:[]},173:{name:"UNLOCKENCHANTMENTSLOT",direction:"client",fields:[]},175:{name:"UNLOCKENCHANTMENT",direction:"client",fields:[]},177:{name:"APPLYENCHANTMENT",direction:"client",fields:[]},180:{name:"ACTIVATECRUCIBLE",direction:"client",fields:[{name:"crucibleId",type:"string"},{name:"activate",type:"bool"}]},181:{name:"UNKNOWN181",direction:"server",fields:[]},182:{name:"CRUCIBLEREQUEST",direction:"client",fields:[{name:"types",type:"array",lengthType:"int16",elementType:"int32"}]},183:{name:"CRUCIBLERESPONSE",direction:"server",fields:[{name:"crucibleIds",type:"array",lengthType:"int16",elementType:"int32"},{name:"crucibleJsons",type:"array",lengthType:"int16",elementType:"string"}]},185:{name:"UPGRADEENCHANTER",direction:"client",fields:[]},187:{name:"UPGRADEENCHANTMENT",direction:"client",fields:[]},189:{name:"REROLLALLENCHANTMENTS",direction:"client",fields:[]},190:{name:"UNKNOWN190",direction:"server",fields:[]},191:{name:"RESETENCHANTMENTREROLLCOUNT",direction:"client",fields:[]},200:{name:"CREATEPARTYMESSAGE",direction:"client",fields:[{name:"description",type:"string"},{name:"minPowerLevel",type:"int16"},{name:"maxPartySize",type:"sbyte"},{name:"activity",type:"sbyte"},{name:"maxedStatReq",type:"sbyte"},{name:"privacy",type:"sbyte"},{name:"serverIndex",type:"byte"}]},204:{name:"PARTYACTIONRESULT",direction:"client",fields:[{name:"playerId",type:"uint16"},{name:"actionId",type:"byte"}],note:"C\u2192S (EK PartyActionResult). playerId 0xFFFF often self; actionId drives party UI (e.g. list refresh)."},207:{name:"PARTYACTION",direction:"server",fields:[{name:"playerId",type:"uint16"},{name:"actionId",type:"byte"}],note:"S\u2192C (EK PartyAction). Server echo / result for party actions."},208:{name:"INCOMINGPARTYINVITE",direction:"server",fields:[{name:"partyId",type:"uint32"},{name:"inviterName",type:"string"}]},209:{name:"PARTYINVITERESPONSE",direction:"client",fields:[{name:"partyId",type:"uint32"},{name:"accept",type:"byte"}]},210:{name:"INCOMINGPARTYMEMBERINFO",direction:"server",fields:[{name:"partyId",type:"uint32"},{name:"unknownShort",type:"uint16"},{name:"maxSize",type:"byte"},{name:"partyPlayers",type:"array",lengthType:"int16",elementType:"PartyPlayer"},{name:"description",type:"string"}],note:"EK IncomingPartyMemberInfo.Read order; PartyPlayer matches EK PartyPlayer."},212:{name:"PARTYMEMBERADDED",direction:"server",fields:[{name:"playerId",type:"uint16"},{name:"name",type:"string"},{name:"classId",type:"uint16"},{name:"skinId",type:"uint16"}]},214:{name:"PARTYLISTMESSAGE",direction:"server",fields:[{name:"packetNumber",type:"byte"},{name:"parties",type:"array",lengthType:"int16",elementType:"PartyInfo"}],note:"EK PartyList; activity/privacy are bytes (PartyActivity, PartyPrivacy enums)."},215:{name:"PARTYJOINREQUEST",direction:"client",fields:[{name:"partyId",type:"uint32"},{name:"unknownByte",type:"byte"}],note:"C\u2192S: client requests to join a party (partyId + byte; matches EK PartyJoinRequest)."},217:{name:"PARTYJOINREQUESTRESPONSE",direction:"server",fields:[{name:"name",type:"string"},{name:"classId",type:"uint16"},{name:"skinId",type:"uint16"},{name:"state",type:"byte"}]},218:{name:"FORRECONNECT",direction:"server",fields:[]},222:{name:"LOADINGSCREEN",direction:"server",fields:[]}},dataObjects:{FameData:{fields:[{name:"name",type:"string"},{name:"rank",type:"compressedInt"},{name:"fame",type:"compressedInt"}]},Location:{fields:[{name:"x",type:"float"},{name:"y",type:"float"}]},LocationRecord:{fields:[{name:"time",type:"int32"},{name:"x",type:"float"},{name:"y",type:"float"}]},Tile:{fields:[{name:"x",type:"int16"},{name:"y",type:"int16"},{name:"type",type:"uint16"}]},Entity:{fields:[{name:"objectType",type:"uint16"},{name:"status",type:"Status"}]},Status:{fields:[{name:"objectId",type:"compressedInt"},{name:"position",type:"Location"},{name:"data",type:"array",lengthType:"compressedInt",elementType:"StatData"}]},StatData:{fields:[{name:"id",type:"byte"},{name:"value",type:"statValue"},{name:"stackCount",type:"compressedInt"}]},SlotObject:{fields:[{name:"objectId",type:"int32"},{name:"slotId",type:"int32"},{name:"objectType",type:"int32"}]},PartyInfo:{fields:[{name:"name",type:"string"},{name:"partyId",type:"uint32"},{name:"powerLevelMin",type:"uint16"},{name:"partySizeCurrent",type:"byte"},{name:"partySizeMax",type:"byte"},{name:"activity",type:"byte"},{name:"privacy",type:"byte"},{name:"statsMin",type:"byte"},{name:"serverIndex",type:"byte"}]},PartyPlayer:{fields:[{name:"playerId",type:"uint16"},{name:"name",type:"string"},{name:"classId",type:"uint16"},{name:"skinId",type:"uint16"}]},QuestData:{fields:[{name:"id",type:"string"},{name:"name",type:"string"},{name:"description",type:"string"},{name:"expiration",type:"string"},{name:"category",type:"int32"},{name:"type",type:"int32"},{name:"itemsNeeded",type:"array",lengthType:"int16",elementType:"int32"},{name:"rewards",type:"array",lengthType:"int16",elementType:"int32"},{name:"completed",type:"bool"},{name:"choice",type:"bool"},{name:"repeatable",type:"bool"}]},TradeItem:{fields:[{name:"item",type:"int32"},{name:"slotType",type:"int32"},{name:"tradeable",type:"bool"},{name:"included",type:"bool"},{name:"enchantment",type:"string"}]}}},Ty=Gk;var Uk={packets:[{name:"ActivePetUpdateRequest",direction:"client",id:24},{name:"BuyDusts",direction:"client"},{name:"BuyExtendMaterialsCapMessage",direction:"client"},{name:"BuyItemMessage",direction:"client"},{name:"BuyItemsMessage",direction:"client"},{name:"ClaimAccountLevel",direction:"client"},{name:"ClaimChestRewardSubmit",direction:"client"},{name:"ClaimCompetition",direction:"client"},{name:"ClaimVoucher",direction:"client"},{name:"DismantleItemsMessage",direction:"client"},{name:"EndUseMessage",direction:"client"},{name:"GetDefinitionMessage",direction:"client"},{name:"GiftItemsMessage",direction:"client"},{name:"MarkAsFavorite",direction:"client"},{name:"PurchasePetShader",direction:"client"},{name:"StartUseMessage",direction:"client"},{name:"UnlockMission",direction:"client"},{name:"UnlockMissionTree",direction:"client"},{name:"UnseasonRequest",direction:"client"},{name:"AcceleratorAddedMessage",direction:"server"},{name:"AcceleratorUpdatedMessage",direction:"server"},{name:"AccountLevelClaimResultMessage",direction:"server"},{name:"BaseEnchantmentResultMessage",direction:"server"},{name:"BuyDustsResult",direction:"server"},{name:"BuyExtendMaterialsCapResultMessage",direction:"server"},{name:"BuyItemResultMessage",direction:"server"},{name:"CharacterCreateFailure",direction:"server"},{name:"ChestRewardsInfo",direction:"server"},{name:"ClaimCompetitionResult",direction:"server"},{name:"ClaimMissionResult",direction:"server"},{name:"CustomMapDeleteResponse",direction:"server"},{name:"CustomMapListResponse",direction:"server"},{name:"DailyRewardResult",direction:"server"},{name:"DamageWithEffect",direction:"server"},{name:"DashResetMessage",direction:"server"},{name:"DismantleItemsResultMessage",direction:"server"},{name:"DrawDebugArrow",direction:"server"},{name:"DrawDebugShape",direction:"server"},{name:"ExaltationRedeemInfoMessage",direction:"server"},{name:"GiftResultMessage",direction:"server"},{name:"GroundTileData",direction:"server"},{name:"HeroLeft",direction:"server"},{name:"IncomingPartyRequest",direction:"server"},{name:"JoinedPartyMessage",direction:"server"},{name:"MissionProgressUpdate",direction:"server"},{name:"MultipleMissionsProgressUpdate",direction:"server"},{name:"ObjectData",direction:"server"},{name:"ObjectStatusData",direction:"server"},{name:"PartyJoinResponse",direction:"server"},{name:"PartyRequestAck",direction:"server"},{name:"PetShaderPurchaseResult",direction:"server"},{name:"PlayersListMessage",direction:"server"},{name:"RefineResultMessage",direction:"server"},{name:"RerollEnchantmentsResultMessage",direction:"server"},{name:"ResultDefinitionMessage",direction:"server"},{name:"SaveLockUpdateMessage",direction:"server"},{name:"SkinRecycleResponseMessage",direction:"server"},{name:"SlippingInfoMessage",direction:"server"},{name:"StacksMessage",direction:"server"},{name:"StatBonusUpdate",direction:"server"},{name:"StatData",direction:"server"},{name:"TutorialStateChangedMessage",direction:"server"},{name:"UnlockCustomizationMessage",direction:"server"},{name:"UnlockNewSlot",direction:"server"},{name:"VoucherResult",direction:"server"}]},Py=Uk;var Vk={3:"needsWork",4:"needsWork",5:"needsWork",6:"needsWork",7:"needsWork",11:"needsWork",12:"needsWork",14:"needsWork",15:"needsWork",16:"needsWork",17:"needsWork",19:"needsWork",21:"needsWork",22:"needsWork",23:"needsWork",24:"needsWork",26:"needsWork",27:"needsWork",28:"needsWork",30:"needsWork",33:"needsWork",34:"needsWork",37:"needsWork",38:"needsWork",39:"needsWork",41:"needsWork",48:"needsWork",50:"needsWork",51:"needsWork",52:"needsWork",53:"needsWork",56:"needsWork",57:"needsWork",58:"needsWork",59:"needsWork",63:"needsWork",66:"needsWork",68:"needsWork",76:"needsWork",77:"needsWork",78:"needsWork",79:"needsWork",80:"needsWork",81:"needsWork",82:"needsWork",83:"needsWork",84:"needsWork",86:"needsWork",87:"needsWork",88:"needsWork",91:"needsWork",93:"needsWork",94:"needsWork",95:"needsWork",96:"needsWork",97:"needsWork",98:"needsWork",99:"needsWork",100:"needsWork",102:"needsWork",104:"needsWork",105:"needsWork",106:"needsWork",107:"needsWork",108:"needsWork",109:"needsWork",112:"needsWork",113:"needsWork",114:"needsWork",115:"needsWork",117:"needsWork",118:"needsWork",119:"needsWork",120:"needsWork",122:"needsWork",123:"needsWork",124:"needsWork",126:"needsWork",129:"needsWork",131:"needsWork",133:"needsWork",137:"needsWork",138:"needsWork",139:"needsWork",140:"needsWork",147:"needsWork",148:"needsWork",149:"needsWork",150:"needsWork",151:"needsWork",154:"needsWork",156:"needsWork",162:"needsWork",164:"needsWork",165:"needsWork",166:"needsWork",167:"needsWork",169:"needsWork",170:"needsWork",171:"needsWork",172:"needsWork",173:"needsWork",175:"needsWork",177:"needsWork",181:"needsWork",185:"needsWork",187:"needsWork",189:"needsWork",190:"needsWork",191:"needsWork",200:"needsWork",218:"needsWork",222:"needsWork"},vy=Vk;yr();Q();yr();var tb=new Map,eb=new Map,d0=new Map,f0=new Map;function p0(r){return String(r||"").trim().toLowerCase()}function rb(r){let e=Math.floor(Number(r.launcherPid));if(!Number.isFinite(e)||e<=0)return;let t=typeof r.accountId=="string"&&r.accountId.trim()!==""?r.accountId.trim():null,n=typeof r.accountLabel=="string"&&r.accountLabel.trim()!==""?r.accountLabel.trim():null,i=p0(r.email),s={accountId:t,accountLabel:n,emailNormalized:i,pidLauncher:e,pidUnity:null,launchedAtMs:Date.now()};tb.set(e,s),f0.set(i,s),t&&d0.set(t,s),m.log("CredentialLaunch",`Registered launcher PID ${e}${t?` \u2192 account ${t}`:""}${n?` "${n}"`:""}${i?` (${i})`:""}`),m0(e)}async function m0(r){let e=await od(r);if(e==null||e<=0)return;let t=tb.get(r);t&&(t.pidUnity!=null&&t.pidUnity!==e&&eb.delete(t.pidUnity),t.pidUnity=e,eb.set(e,t),m.log("CredentialLaunch",`Bound Unity PID ${e} to launcher ${r}${t.accountId?` (account ${t.accountId})`:""}`))}Li();Q();Li();yr();xn();ji();var nb=3e3,Hi=null,ht={hotMs:0,coolMs:0,mode:"cool"},Fi=0,Vr=0,Sr=!1,Ra=!1,ld="";function h0(r){return r.map(e=>`${Math.floor(Number(e.pid))}:${String(e.imageName||"")}`).sort().join("|")}var ad=!1;function ib(){ht={hotMs:0,coolMs:0,mode:"cool"},ld="",Fi=0,Vr=0,Sr=!1,Ra=!1}async function An(){let r=await tr(),e=new Set(Qe().parkedPids),t=await Nn(r,e);t.ok||m.warn("exaltTune.watchdog",t.error||"role tuning apply")}async function g0(r,e){let t=await ot(),n=t.processes,i=Math.max(1,Number(t.logicalProcessors)||1),s=n.reduce((f,h)=>f+(Number(h.cpuPercent)||0),0),o=s/i,a=e.watchdog,l=a.cpuMetric==="raw"?s:o,c=ht.hotMs,u=ht.coolMs,d=h0(n),p=n.length>0&&l>=a.cpuSumThreshold;if(p){if(c=ht.hotMs+r,u=0,c>=a.cpuSumHotDebounceMs&&ht.mode==="cool"){ht.mode="hot",m.log("exaltTune.watchdog",`HOT: raw\u03A3=${s.toFixed(1)}% equiv=${o.toFixed(1)}% (cpuMetric=${a.cpuMetric}, threshold=${a.cpuSumThreshold}, LP=${i}, procs=${n.length})`);try{a.onHotActivateHotPlan&&e.powerGuidHot&&await Ht(e.powerGuidHot),a.onHotSetPriorityHot&&await An()}catch(f){m.warn("exaltTune.watchdog",String(f.message||f))}}}else if(u=ht.coolMs+r,c=0,u>=a.cpuSumCoolDebounceMs&&ht.mode==="hot"){ht.mode="cool",m.log("exaltTune.watchdog",`COOL: raw\u03A3=${n.length?s.toFixed(1):"0"} (${n.length} process(es))`);try{a.onCoolActivateIdlePlan&&e.powerGuidIdle&&await Ht(e.powerGuidIdle),a.onCoolSetPriorityIdle&&await An()}catch(f){m.warn("exaltTune.watchdog",String(f.message||f))}}ht.hotMs=c,ht.coolMs=u;try{a.onHotSpreadCores&&ht.mode==="hot"&&p&&c>=a.cpuSumHotDebounceMs&&d&&d!==ld&&(await id()).ok&&(ld=d)}catch(f){m.warn("exaltTune.watchdog",String(f.message||f))}}async function y0(r,e){if(!e.enabled){if(Sr){Sr=!1,Fi=0,Vr=0,_n();try{await An()}catch(h){m.warn("exaltTune.thermal",String(h.message||h))}}return}let t=await Ia(),n=t.pkgMaxCelsius!=null,i=t.minFreqPctOfMax!=null;if(!n&&!i){Ra||(Ra=!0,m.log("exaltTune.thermal","No WMI ACPI temp nor CPU frequency counter \u2014 thermal demotion inactive"));return}Ra=!1;let s=n&&t.pkgMaxCelsius>=e.pkgTempCelsiusThreshold,o=!n||t.pkgMaxCelsius<=e.pkgTempCelsiusClear,a=i&&e.freqPctLowThreshold!=null,l=e.freqPctLowThreshold??0,c=e.freqPctClear??(e.freqPctLowThreshold!=null?e.freqPctLowThreshold+7:null),u=a&&t.minFreqPctOfMax<=l,d=!a||c==null||t.minFreqPctOfMax>=c,p=s||u,f=o&&d;if(p){if(Vr=0,Fi+=r,!Sr&&Fi>=e.sustainMs){Sr=!0,m.log("exaltTune.thermal",`Thermal stress sustained: demoting background (max ${n?t.pkgMaxCelsius.toFixed(1)+" \xB0C":"no temp"}, freqMin\u2248${i?t.minFreqPctOfMax.toFixed(0):"na"} %)`);try{My(e.demoteBackgroundTo),await An()}catch(h){m.warn("exaltTune.thermal",String(h.message||h))}}}else if(Fi=0,Sr&&f){if(Vr+=r,Vr>=e.clearMs){Sr=!1,Vr=0,m.log("exaltTune.thermal","Thermal cleared \u2014 restoring background priorities from rules");try{_n(),await An()}catch(h){m.warn("exaltTune.thermal",String(h.message||h))}}}else Vr=0}async function b0(r){if(!(await re()).ok)return;let t=Ze(),n=t.watchdog.enabled,i=t.thermal.enabled;!n&&!i||(n&&await g0(r,t),await y0(r,t.thermal))}function cd(){let r=Sr;Hi!=null&&(clearInterval(Hi),Hi=null),r&&(_n(),An().catch(()=>{})),ib()}function S0(){Hi==null&&(ib(),Hi=setInterval(()=>{ad||(ad=!0,b0(nb).catch(r=>m.warn("exaltTune.watchdog",String(r.message||r))).finally(()=>{ad=!1}))},nb))}function qr(){let r=Ze();cd(),(r.watchdog.enabled||r.thermal.enabled)&&S0()}Q();yr();var w0="rotmg exalt.exe",E0="rotmgexalt.exe";function T0(r){return String(r||"").replace(/\u00a0/g," ").trim().toLowerCase()}var ud={activeTrimEligible:!1,backgroundTrimEligible:!0,parkedTrimEligible:!0};function Na(r,e,t){let n=r.trimParentWs===!0,i=r.trimChildWs!==!1,s=e.filter(p=>{let f=T0(p.imageName);return!!(n&&f===w0||i&&f===E0)});s.length===0&&(s=[...e]);let o=typeof r.minWorkingSetBytesBeforeTrim=="number"&&r.minWorkingSetBytesBeforeTrim>0?r.minWorkingSetBytesBeforeTrim:0,a=typeof r.maxCpuPercentForTrim=="number"&&Number.isFinite(r.maxCpuPercentForTrim)?Math.max(0,r.maxCpuPercentForTrim):0;s=s.filter(p=>{let f=Number(p.workingSetBytes)||0;if(o>0&&f<o)return!1;if(a>0&&p.cpuPercent!=null){let h=Number(p.cpuPercent);if(Number.isFinite(h)&&h>a)return!1}return!0});let l=new Set,c=[];for(let p of s){let f=Math.floor(Number(p.pid));!(f>0)||l.has(f)||(l.add(f),c.push(f))}let u=r.trimRolePolicy,d=u?{activeTrimEligible:u.activeTrimEligible??ud.activeTrimEligible,backgroundTrimEligible:u.backgroundTrimEligible??ud.backgroundTrimEligible,parkedTrimEligible:u.parkedTrimEligible??ud.parkedTrimEligible}:null;return d&&t?.pidToRole&&t.pidToRole.size>0&&(c=c.filter(p=>{let f=t.pidToRole.get(p)??"background";return f==="active"?d.activeTrimEligible:f==="parked"?d.parkedTrimEligible:d.backgroundTrimEligible})),c}ua();pa();var P0=12e3,Wi=null,dd=!1,Aa=0,fd=0,Oa=0,pd=0;async function v0(r){let e=Date.now(),t=br();if(t.proxy.enabled&&e-Aa>=t.proxy.checkIntervalMs){Aa=e;let n=r.getRss(),i=r.getPacketRate(),s=t.proxy.rssBytesThreshold>0&&n>=t.proxy.rssBytesThreshold,o=t.proxy.packetRateThreshold>0&&i>=t.proxy.packetRateThreshold;if((s||o)&&e-fd>=t.proxy.minTrimIntervalMs)try{r.trimProxyMemory({trimPackets:t.proxy.trimPackets,trimPacketLab:t.proxy.trimPacketLab,trimWorldSnapshot:t.proxy.trimWorldSnapshot,runGcHint:t.proxy.runGcHint}),fd=Date.now(),m.log("smartTrim",`Proxy trim (rss=${Math.round(n/1048576)}MB rate=${i}/s)`)}catch(l){m.warn("smartTrim",String(l.message||l))}}if(t.exalt.enabled&&e-Oa>=t.exalt.checkIntervalMs){if(Oa=e,!(await re()).ok)return;let i=t.exalt;if(i.requireMemoryLoadPercent>0){let d=await ed();if(!d||d.memoryLoadPercent<i.requireMemoryLoadPercent)return}let o=(await ot()).processes||[];if(!o.length)return;let a=0;for(let d of o){let p=Number(d.workingSetBytes)||0;p>a&&(a=p)}let l=i.workingSetBytesPerProcessThreshold,c=l>0&&a>=l,u=i.periodicTrim===!0;if((c||u)&&e-pd>=i.minTrimIntervalMs)try{let d=await ca(o),p=Na(i,o,{pidToRole:d});if(p.length===0)return;let f=await Rn(p);f.ok&&(pd=Date.now(),m.log("smartTrim",`Exalt EmptyWorkingSet applied=${f.applied} pid(s) (maxWs=${Math.round(a/1048576)}MB)`))}catch(d){m.warn("smartTrim",String(d.message||d))}}}function sb(r){Wi==null&&(Wi=setInterval(()=>{dd||(dd=!0,v0(r).catch(e=>m.warn("smartTrim",String(e.message||e))).finally(()=>{dd=!1}))},P0))}function ob(){Wi!=null&&(clearInterval(Wi),Wi=null),Aa=0,fd=0,Oa=0,pd=0}function On(){Aa=0,Oa=0}async function ab(r){let e=await re();if(!e.ok)return{ok:!1,applied:0,error:e.reason,skipped:"unsupported"};let t=br(),n=r?.manual===!0,i=t.exalt;if(!n&&!i.enabled)return{ok:!0,applied:0,skipped:"disabled"};if(!n&&i.requireMemoryLoadPercent>0){let c=await ed();if(!c||c.memoryLoadPercent<i.requireMemoryLoadPercent)return{ok:!0,applied:0,skipped:"memory_below_threshold"}}if(!i.enabled&&n){let{processes:c}=await ot();if(!c.length)return{ok:!0,applied:0,skipped:"no_processes"};let u=await ca(c),d={...i,trimChildWs:!0,trimParentWs:!0,maxCpuPercentForTrim:0,minWorkingSetBytesBeforeTrim:0,workingSetBytesPerProcessThreshold:0},p=Na(d,c,{pidToRole:u});return p.length===0?{ok:!0,applied:0,skipped:"no_matching_pids"}:Rn(p)}let{processes:s}=await ot();if(!s.length)return{ok:!0,applied:0,skipped:"no_processes"};let o=n?{...i,maxCpuPercentForTrim:0}:i,a=await ca(s),l=Na(o,s,{pidToRole:a});return l.length===0?{ok:!0,applied:0,skipped:"no_matching_pids"}:Rn(l)}pa();ha();Li();xn();ua();yr();ha();ji();async function lb(){return rd()}async function cb(r){try{Ft({parkedPids:[]});let e=Ze();Cn({tuningPreset:null,watchdog:{...e.watchdog,enabled:!1},thermal:{...e.thermal,enabled:!1}}),qr(),_n();let t=await re();if(t.ok&&(await Ca("Normal"),await Jy()),r?.activateBalancedPowerPlan&&t.ok){let n=await ka(),i="381b4222-f694-41f0-9685-ff5bb260df2e",s=a=>String(a).replace(/[{}]/g,"").trim().toLowerCase(),o=n.find(a=>s(a.guid)===i)||n.find(a=>/\bbalanced\b/i.test(a.name))||n.find(a=>/^balanced$/i.test(String(a.name).trim()));o&&await Ht(o.guid)}return On(),{ok:!0}}catch(e){return{ok:!1,error:String(e.message||e)}}}async function md(){let r=await tr(),e=new Set(Qe().parkedPids);return Nn(r,e)}async function ub(r){let e=String(r?.preset||"").trim();if(e){let t=e.toLowerCase().replace(/\s+/g,""),i=["safe","balanced","multibox","aggressive","lowHeat"].find(s=>s.toLowerCase().replace(/\s+/g,"")===t);i&&ma(i)}return On(),qr(),md()}zu();xn();ji();function hd(r){return`0x${(Number.isFinite(r)?Math.max(0,Math.trunc(r)):0).toString(16)}`}function ke(r){let e=Number(r);return Number.isFinite(e)?e:0}function gd(r){let e=String(r??"").trim().toLowerCase();return e==="1"||e==="true"}function Jr(r,e=0){let t=String(r??"").split(",").map(n=>String(n??"").trim()).filter(Boolean).map(n=>{let i=n.indexOf("#"),s=i>=0?n.slice(0,i).trim():n,o=i>=0?n.slice(i+1).trim():"",a=Number.parseInt(s,10);return{objectType:Number.isFinite(a)?a:-1,uniqueId:o||null}});for(;t.length<e;)t.push({objectType:-1,uniqueId:null});return t}function Gi(r){let e=new Map,n=(r&&typeof r=="object"?r:null)?.ItemData,i=Array.isArray(n)?n:n?[n]:[];for(let s of i){if(!s||typeof s!="object")continue;let o=s,a=Number.parseInt(String(o["@_type"]??"").trim(),10);if(!Number.isFinite(a))continue;let l=String(o["@_id"]??"").trim(),c=String(o["#text"]??"").trim();if(!c)continue;let u=`${a}#${l}`,d=e.get(u);d?d.push(c):e.set(u,[c])}return e}function db(r){let e=String(r||"").trim();if(!e)return[];try{let t=e.replace(/-/g,"+").replace(/_/g,"/").padEnd(Math.ceil(e.length/4)*4,"="),n=Buffer.from(t,"base64");if(n.length<=3)return[];let i=[];for(let s=3;s+1<n.length;s+=2){let o=n.readUInt16LE(s);if(o===65533)break;i.push(o===65534?0:o)}return i}catch{return[]}}function fb(r){let e=r.match(/<Error>([^<]*)<\/Error>/i)?.[1]?.trim();return e?yd(`<Error>${e}</Error>`):null}function pb(r){let e=r.match(/<AccessToken>([^<]*)<\/AccessToken>/)?.[1],t=r.match(/<AccessTokenTimestamp>([^<]*)<\/AccessTokenTimestamp>/)?.[1],n=r.match(/<AccessTokenExpiration>([^<]*)<\/AccessTokenExpiration>/)?.[1];return e&&t&&n?{token:e,tokenTimestamp:t,tokenExpiration:n}:null}function yd(r){let e=r.match(/<Error>([^<]*)<\/Error>/)?.[1]?.trim()??"",t=e.toLowerCase();return t.includes("password")||e==="PasswordError"?"Wrong password.":t.includes("wait")||t.includes("try again later")?"Too many requests. Try again later.":t.includes("captcha")?"Captcha required. Try again in a browser first.":t.includes("suspended")?"Account suspended.":t.includes("account in use")?"Account already in use.":t.includes("token for different machine")||t.includes("different machine")?'Token for different machine. Click "Refresh HWID" in the accounts menu (\u22EF) and try again. If it still fails, log in once via the official launcher to re-bind the account.':e||"Login failed."}var bd=G(require("sharp"),1),hb=G(un(),1),ge=require("fs"),z=require("path");Q();Gr();var mb=["groundTiles","characters","characters_masks","mapObjects"],Ma=class{constructor(e,t,n){this.publicDir=e;this.getRotmgPath=t;this.getExtractorGameDataPath=n}wikiSpriteSheetCache=null;resetCache(){this.wikiSpriteSheetCache=null}findCaseInsensitiveDrawingsPng(e,t){let n=`${t}.png`.toLowerCase();if(!(0,ge.existsSync)(e))return null;try{for(let i of(0,ge.readdirSync)(e))if(i.toLowerCase().endsWith(".png")&&i.toLowerCase()===n)return(0,z.join)(e,i)}catch{return null}return null}findCaseInsensitivePngUnderTree(e,t,n,i){let s=`${t}.png`.toLowerCase();if(!(0,ge.existsSync)(e))return null;let o;try{o=(0,z.resolve)(e)}catch{return null}let a=[{dir:o,depth:0}],l=new Set,c=0;for(;a.length>0&&c<i;){let u=a.shift();if(!u)break;let{dir:d,depth:p}=u,f=d.toLowerCase();if(l.has(f))continue;l.add(f),c++;let h;try{h=(0,ge.readdirSync)(d)}catch{continue}for(let g of h){let y=(0,z.join)(d,g),b;try{b=(0,ge.statSync)(y)}catch{continue}if(b.isFile()){if(!g.toLowerCase().endsWith(".png"))continue;if(g.toLowerCase()===s)return y}else if(b.isDirectory()&&p<n){let S=g.toLowerCase();if(S==="node_modules"||S===".git")continue;a.push({dir:y,depth:p+1})}}}return null}resolveWikiTexturePngPath(e){let t=e.replace(/[^a-zA-Z0-9_]/g,"");if(!t)return null;let n=this.getRotmgPath();if(!n)return null;let i=[];n.toLowerCase().endsWith(".exe")?i.push((0,z.dirname)(n),n):i.push(n);let s=[];for(let l of i)s.push((0,z.join)(l,"Drawings"),(0,z.join)(l,"Resources","Drawings"),(0,z.join)(l,"App","Drawings"),(0,z.join)(l,"Production","Drawings"),(0,z.join)(l,"assets","Drawings"),(0,z.join)(l,"Assets","Drawings"),(0,z.join)(l,"Resources","App","Drawings"),(0,z.join)(l,"Resources","Embedded","Drawings"));let o=this.resolveExtractorGameDataDir();if(o)for(let l of this.listWikiExtractorLoosePngFlatDirs(o))s.push(l);let a=process.env.LOCALAPPDATA;a&&s.push((0,z.join)(a,"RealmOfTheMadGod","Drawings"),(0,z.join)(a,"RealmOfTheMadGod","Production","Drawings"),(0,z.join)(a,"RotMG Exalt","Drawings"));for(let l of s){if(!(0,ge.existsSync)(l))continue;let c=this.findCaseInsensitiveDrawingsPng(l,t);if(c)return c;let u=this.findCaseInsensitivePngUnderTree(l,t,3,200);if(u)return u}return null}resolveBundledExtractorGameDataDir(){let e=(0,z.join)(this.publicDir,"..","..","..","data","rotmg-extractor-game","GameData");if((0,ge.existsSync)((0,z.join)(e,"spritesheet.xml"))&&(0,ge.existsSync)((0,z.join)(e,"images")))return e;let t=by();return(0,ge.existsSync)((0,z.join)(t,"spritesheet.xml"))&&(0,ge.existsSync)((0,z.join)(t,"images"))?t:null}resolveExtractorGameDataDir(){let e=(this.getExtractorGameDataPath()||"").trim();if(e){let t=(0,z.resolve)(e),n=(0,z.join)(t,"spritesheet.xml");if((0,ge.existsSync)(n)&&(0,ge.existsSync)((0,z.join)(t,"images")))return t;let i=(0,z.join)(t,"GameData");if((0,ge.existsSync)((0,z.join)(i,"spritesheet.xml"))&&(0,ge.existsSync)((0,z.join)(i,"images")))return i}return this.resolveBundledExtractorGameDataDir()}mapWikiAtlasRawToSheetIndex(e){let t=Math.trunc(e)-1;return t<0||t>=mb.length?-1:t}parseWikiSpritesheetXml(e){let t=new Map,n=new hb.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"@_"}),i;try{i=n.parse(e)}catch{return t}let s=i.DecompiledSpriteSheet;if(!s?.SpriteGroups)return t;let o=s.SpriteGroups.SpriteGroup;if(o==null)return t;Array.isArray(o)||(o=[o]);for(let a of o){let l=String(a["@_Name"]??"").trim();if(!l)continue;let c=a.Sprite,u=new Map;if(c!=null){Array.isArray(c)||(c=[c]);for(let d of c){let p=Number(d["@_Index"]),f=Number(d["@_AtlasId"]),h=Number(d["@_X"]),g=Number(d["@_Y"]),y=Number(d["@_W"]),b=Number(d["@_H"]);!Number.isFinite(p)||!Number.isFinite(f)||u.set(p,{atlasId:f,x:Number.isFinite(h)?h:0,y:Number.isFinite(g)?g:0,w:Number.isFinite(y)?y:0,h:Number.isFinite(b)?b:0})}}t.set(l.toLowerCase(),u)}return t}ensureLoadedWikiSpriteCache(e){let t=(0,z.join)(e,"spritesheet.xml");if(!(0,ge.existsSync)(t))return;let n=0;try{n=(0,ge.statSync)(t).mtimeMs}catch{return}if(this.wikiSpriteSheetCache&&this.wikiSpriteSheetCache.gameDataDir===e&&this.wikiSpriteSheetCache.sheetMtime===n)return;let i=(0,ge.readFileSync)(t,"utf8"),s=this.parseWikiSpritesheetXml(i);this.wikiSpriteSheetCache={gameDataDir:e,sheetMtime:n,byGroup:s},m.log("DevServer",`Game Wiki: loaded extractor spritesheet (${s.size} groups)`)}lookupWikiSpriteFrame(e,t){if(!this.wikiSpriteSheetCache)return null;let n=this.wikiSpriteSheetCache.byGroup.get(e.toLowerCase());return n?n.get(t)??null:null}async tryServeExtractorWikiSprite(e,t,n,i){this.ensureLoadedWikiSpriteCache(e);let s=this.lookupWikiSpriteFrame(t,n);if(!s||s.w<=0||s.h<=0)return!1;let o=this.mapWikiAtlasRawToSheetIndex(s.atlasId);if(o<0)return!1;let a=(0,z.join)(e,"images"),l=mb[o],c=this.findCaseInsensitiveDrawingsPng(a,l);if(!c)return!1;let u;try{u=await(0,bd.default)(c).metadata()}catch{return!1}let d=u.width??0,p=u.height??0;if(s.x<0||s.y<0||s.x+s.w>d||s.y+s.h>p)return!1;try{let f=await(0,bd.default)(c).extract({left:s.x,top:s.y,width:s.w,height:s.h}).png().toBuffer();return i.writeHead(200,{"Content-Type":"image/png","Cache-Control":"public, max-age=86400","Access-Control-Allow-Origin":"*","X-Wiki-Sprite-Cropped":"1"}),i.end(f),!0}catch(f){return m.warn("DevServer",`Game Wiki extractor crop failed: ${f.message}`),!1}}listWikiExtractorLoosePngFlatDirs(e){let t=(0,z.dirname)(e);return[(0,z.join)(e,"images"),(0,z.join)(e,"spritesheets"),(0,z.join)(e,"Spritesheets"),(0,z.join)(t,"spritesheets"),(0,z.join)(t,"Spritesheets"),(0,z.join)(t,"images")]}findExtractorLoosePngFlat(e,t){for(let n of this.listWikiExtractorLoosePngFlatDirs(e)){let i=this.findCaseInsensitiveDrawingsPng(n,t);if(i)return i}return null}findExtractorLoosePng(e,t){let n=this.findExtractorLoosePngFlat(e,t);if(n)return n;let i=(0,z.dirname)(e);return this.findCaseInsensitivePngUnderTree(e,t,6,600)??this.findCaseInsensitivePngUnderTree(i,t,6,1e3)}tryServeWikiExtractorImagesLooseSheet(e,t,n){let i=this.findExtractorLoosePng(e,t);if(!i)return!1;try{let s=(0,ge.readFileSync)(i);return n.writeHead(200,{"Content-Type":"image/png","Cache-Control":"public, max-age=86400","Access-Control-Allow-Origin":"*"}),n.end(s),!0}catch{return!1}}serveDrawingsWikiTextureFullSheet(e,t){let n=this.resolveWikiTexturePngPath(e);if(!n)return m.warn("DevServer",`Game Wiki texture not found for "${e}" (set RotMG path and/or extractor GameData in Settings)`),t.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),t.end("not_found"),!0;try{let i=(0,ge.readFileSync)(n);return t.writeHead(200,{"Content-Type":"image/png","Cache-Control":"public, max-age=86400","Access-Control-Allow-Origin":"*"}),t.end(i),!0}catch(i){return m.warn("DevServer",`Game Wiki texture read failed: ${i.message}`),t.writeHead(500,{"Content-Type":"text/plain; charset=utf-8"}),t.end("read_error"),!0}}tryServeWikiTextureFile(e,t){if(e.method!=="GET"||!e.url?.startsWith("/api/wiki-texture-file"))return!1;let n=e.url.indexOf("?"),i=n>=0?e.url.slice(n+1):"",s=new URLSearchParams(i),a=(s.get("file")||"").trim().replace(/[^a-zA-Z0-9_]/g,"");if(!a||a.length>80)return t.writeHead(400,{"Content-Type":"text/plain; charset=utf-8"}),t.end("bad_file"),!0;let l=s.get("index"),c=null;if(l!=null&&l!==""){let d=/^0x/i.test(String(l).trim()),p=parseInt(String(l).trim().replace(/^0x/i,""),d?16:10);c=Number.isFinite(p)?p:null}let u=this.resolveExtractorGameDataDir();return(async()=>{try{if(u&&c!==null&&await this.tryServeExtractorWikiSprite(u,a,c,t)||u&&!t.headersSent&&this.tryServeWikiExtractorImagesLooseSheet(u,a,t))return;if(!this.getRotmgPath()){t.headersSent||(t.writeHead(404,{"Content-Type":"text/plain; charset=utf-8"}),t.end("not_found"));return}t.headersSent||this.serveDrawingsWikiTextureFullSheet(a,t)}catch(d){m.warn("DevServer",`Game Wiki texture handler: ${d.message}`),t.headersSent||(t.writeHead(500,{"Content-Type":"text/plain; charset=utf-8"}),t.end("error"))}})(),!0}};var x0=(0,te.join)(process.env.USERPROFILE||"","Documents","Realmengine","debug.log");function wr(r){if(!It.enabled("accounts"))return;let e=`[${new Date().toISOString()}] ${r}
`;process.stdout.write(e);try{(0,B.writeFileSync)(x0,e,{flag:"a"})}catch{}}function C0(r){let e=String(r||"").toLowerCase();return e?e.includes("different machine")||e.includes("token for different"):!1}function wd(r){try{let e=(0,nr.execFileSync)("tasklist",["/FI",`IMAGENAME eq ${r}`,"/FO","CSV","/NH"],{encoding:"utf8",windowsHide:!0}),t=i=>i.replace(/\u00A0/g," ").trim().toLowerCase(),n=t(r);return String(e||"").split(/\r?\n/).map(i=>i.trim()).filter(Boolean).filter(i=>{let s=i.match(/^"([^"]*)"/);return s!==null&&t(s[1])===n}).length}catch(e){return m.warn("DevServer",`Failed to inspect ${r} processes: ${e.message}`),0}}function k0(){if(process.platform!=="win32")return{ok:!1,ran:!1,error:"Windows only."};try{return(0,nr.execFileSync)("taskkill",["/IM","msedge.exe","/F","/T"],{encoding:"utf8",windowsHide:!0,stdio:["ignore","pipe","pipe"]}),{ok:!0,ran:!0}}catch(r){let e=String(r.message||""),t=r?.stderr?String(r.stderr):"",n=`${e} ${t}`;return wd("msedge.exe")===0?{ok:!0,ran:!1}:(m.warn("DevServer",`kill-msedge: ${n.trim()}`),{ok:!1,ran:!1,error:n.trim()||e})}}var Ui="default",gb="default";function yb(r){let e=Qe(),t=new Set(r),n=e.parkedPids.filter(i=>!t.has(i));n.length!==e.parkedPids.length&&Ft({parkedPids:n})}async function bb(){let r=await ot(),e=await tr(),t=new Set(r.processes.map(p=>p.pid)),n=Qe(),i=n.parkedPids.filter(p=>t.has(p));i.length!==n.parkedPids.length&&(n=Ft({parkedPids:i}));let s=new Set(n.parkedPids),o=[...new Set(r.processes.map(p=>p.pid))].sort((p,f)=>p-f),a=new Map,l=new Map,c=new Set,u=kn();for(let p of o){if(c.has(p))continue;let f=await rr(p);for(let g of f)c.add(g),a.set(g,f);let h=Mi(f,e,s);for(let g of f)l.set(g,h)}return{processes:r.processes.map(p=>{let f=l.get(p.pid)??"background",h=a.get(p.pid)??[p.pid];return{...p,role:f,clusterPids:h,trimEligible:u[f].trimEligible}}),logicalProcessors:r.logicalProcessors,foregroundPid:e,clientRolesPath:la()}}var _0={".html":"text/html",".css":"text/css",".js":"application/javascript",".json":"application/json"},Da=class r{constructor(e,t,n,i,s){this.publicDir=n;this.worldState=i;this.gameData=s;this.inspector=e,this.inspector.setDefaultMode("summary"),this.pluginManager=t,this.wikiSprites=new Ma(n,()=>this.getRotmgPath(),()=>this.config.rotmgExtractorGameDataPath),this.gameUpdater=new ia(()=>this.getRotmgPath(),()=>this.getRunningRotmgExaltProcessCount()>0,a=>this.broadcastGameUpdateStatus(a)),this.lab=new na,this.inspector.subscribe(a=>{a.captureMode==="full"&&this.lab.capture(a),this.observeTradePacket(a)}),this.lab.on("update",()=>{let a=JSON.stringify({type:"labUpdate",unknowns:this.lab.getUnknowns()});for(let l of this.wss.clients)l.readyState===X.default.OPEN&&l.send(a)}),this.configPath=(0,te.join)(n,"..","..","..","data","config.json");try{if((0,B.existsSync)(this.configPath)){let a=JSON.parse((0,B.readFileSync)(this.configPath,"utf8"));this.config={rotmgPath:a.rotmgPath,rotmgExtractorGameDataPath:a.rotmgExtractorGameDataPath,lastPluginConfigId:a.lastPluginConfigId,singleClientOnly:!0}}}catch(a){m.warn("DevServer",`Failed to load config.json: ${a.message}`)}m.log("DevServer",`configPath: ${this.configPath} (exists: ${(0,B.existsSync)(this.configPath)})`);let o=(0,te.join)(n,"..","..","..","data","servers.json");try{if((0,B.existsSync)(o)){this.servers=JSON.parse((0,B.readFileSync)(o,"utf8")),this.serverNames=Object.keys(this.servers).sort();for(let[a,l]of Object.entries(this.servers))this.ipToServerName[l]=a;m.log("DevServer",`Loaded ${this.serverNames.length} server name mappings`)}}catch(a){m.warn("DevServer",`Failed to load servers.json: ${a.message}`)}this.httpServer=Sb.default.createServer((a,l)=>this.handleHttp(a,l)),this.wss=new Cu.default({server:this.httpServer}),this.wss.on("connection",a=>this.handleWsConnection(a)),this.pluginManager.onDashboardLog((a,l)=>{let c=JSON.stringify({type:"pluginLog",plugin:a,message:l});for(let u of this.wss.clients)u.readyState===X.default.OPEN&&u.send(c)}),this.pluginManager.onBroadcastData((a,l,c)=>{let u=JSON.stringify({type:"pluginData",pluginId:a,dataType:l,data:c});for(let d of this.wss.clients)d.readyState===X.default.OPEN&&d.send(u)}),this.config.lastPluginConfigId=Ui}httpServer;wss;inspector;lab;proxy=null;pluginManager;gameClientConnected=!1;ipToServerName={};detectedGamePath=null;configPath;config={singleClientOnly:!0};wikiSprites;gameUpdater;autoUpdateCheckDone=!1;serverNames=[];servers={};lastSeedToken=null;gameWikiCatalogJson=null;mulingProcess=null;getConfigsDir(){return(0,te.join)(Ce(),"configs")}getActivePluginConfigId(){return this.sanitizeConfigId(this.config.lastPluginConfigId||Ui)}getAccountsFile(){return(0,te.join)(Ce(),"_accounts.json")}getAccountsCacheDir(){return(0,te.join)(Ce(),"Accounts")}getDashboardAccountOverviewCacheFile(e){return(0,te.join)(this.getAccountsCacheDir(),`${String(e||"").trim()}.json`)}ensureDir(e){(0,B.existsSync)(e)||(0,B.mkdirSync)(e,{recursive:!0})}generateDashboardAccountId(){return`acct-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}normalizeDashboardAccountRecord(e,t=0){let n=Date.now(),i=String(e?.id||"").trim()||`${this.generateDashboardAccountId()}-${t}`,s=Number(e?.createdAt||0)>0?Number(e.createdAt):n,o=Number(e?.updatedAt||0)>0?Number(e.updatedAt):n,a=["none","main","mule"];return{id:i,label:String(e?.label||"").trim(),email:String(e?.email||"").trim(),password:String(e?.password||""),serverName:String(e?.serverName||"USWest").trim()||"USWest",notes:String(e?.notes||""),preferredScriptId:String(e?.preferredScriptId||"").trim(),createdAt:s,updatedAt:o,mulingRole:a.includes(e?.mulingRole)?e.mulingRole:"none",mulingStoreMode:e?.mulingStoreMode==="specific"?"specific":"any",mulingItemsToStore:String(e?.mulingItemsToStore||""),mulingItemsFromMain:String(e?.mulingItemsFromMain||""),mulingItemsToMuleOff:String(e?.mulingItemsToMuleOff||""),proxy:String(e?.proxy||""),proxyUsername:String(e?.proxyUsername||""),proxyPassword:String(e?.proxyPassword||""),isSteam:!!e?.isSteam,steamId:String(e?.steamId||"").trim()}}readDashboardAccounts(){try{let e=Ce();this.ensureDir(e);let t=this.getAccountsFile();if(wr(`readDashboardAccounts: dir="${e}" file="${t}" exists=${(0,B.existsSync)(t)}`),!(0,B.existsSync)(t))return wr("readDashboardAccounts: file not found, returning []"),[];let n=(0,B.readFileSync)(t,"utf8");wr(`readDashboardAccounts: raw content (first 200 chars): ${n.slice(0,200)}`);let i=JSON.parse(n),s=Array.isArray(i?.accounts)?i.accounts:[];return wr(`readDashboardAccounts: parsed ${s.length} account(s)`),s.map((o,a)=>this.normalizeDashboardAccountRecord(o,a))}catch(e){return wr(`readDashboardAccounts: ERROR: ${e.message}`),m.warn("DevServer",`accounts read failed: ${e.message}`),[]}}writeDashboardAccounts(e){this.ensureDir(Ce()),(0,B.writeFileSync)(this.getAccountsFile(),JSON.stringify({accounts:e},null,2),"utf8")}readDashboardAccountOverviewCache(e){try{let t=String(e||"").trim();if(!t)return null;this.ensureDir(this.getAccountsCacheDir());let n=this.getDashboardAccountOverviewCacheFile(t);if(!(0,B.existsSync)(n))return null;let i=JSON.parse((0,B.readFileSync)(n,"utf8"));return!i||typeof i!="object"||!i.overview||typeof i.overview!="object"||!this.isDashboardOverviewCacheComplete(i.overview)?null:{accountId:t,email:String(i.email||"").trim(),updatedAt:Number(i.updatedAt||0)>0?Number(i.updatedAt):Date.now(),overview:i.overview}}catch(t){return m.warn("DevServer",`accounts overview cache read failed for ${e}: ${t.message}`),null}}isDashboardOverviewCacheComplete(e){let t=Array.isArray(e?.characters)?e.characters:[],n=["vault","gifts","temporaryGifts","materialStorage","potions"];return t.every(i=>{let s=Array.isArray(i?.equipment)?i.equipment:[],o=Array.isArray(i?.inventory)?i.inventory:[],a=Array.isArray(i?.backpacks)?i.backpacks:[];return[s,o,a].every(l=>l.every(c=>!!c&&Array.isArray(c.enchantIds)&&Object.prototype.hasOwnProperty.call(c,"uniqueId")))})&&n.every(i=>{let s=e[i];return!!s&&Array.isArray(s.items)})}readAllDashboardAccountOverviewCaches(){let e={};try{this.ensureDir(this.getAccountsCacheDir());let t=(0,B.readdirSync)(this.getAccountsCacheDir()).filter(n=>(0,te.extname)(n).toLowerCase()===".json");for(let n of t){let i=n.slice(0,-5),s=this.readDashboardAccountOverviewCache(i);s&&(e[i]=s)}}catch(t){m.warn("DevServer",`accounts overview cache list failed: ${t.message}`)}return e}writeDashboardAccountOverviewCache(e,t,n){let i={accountId:String(e||"").trim(),email:String(t||"").trim(),updatedAt:Date.now(),overview:n};return this.ensureDir(this.getAccountsCacheDir()),(0,B.writeFileSync)(this.getDashboardAccountOverviewCacheFile(i.accountId),JSON.stringify(i,null,2),"utf8"),i}deleteDashboardAccountOverviewCache(e){try{let t=String(e||"").trim();if(!t)return;let n=this.getDashboardAccountOverviewCacheFile(t);(0,B.existsSync)(n)&&(0,B.unlinkSync)(n)}catch(t){m.warn("DevServer",`accounts overview cache delete failed for ${e}: ${t.message}`)}}pruneDashboardAccountOverviewCaches(e){try{let t=new Set(e.map(i=>String(i.id||"").trim()).filter(Boolean));this.ensureDir(this.getAccountsCacheDir());let n=(0,B.readdirSync)(this.getAccountsCacheDir()).filter(i=>(0,te.extname)(i).toLowerCase()===".json");for(let i of n){let s=i.slice(0,-5);t.has(s)||this.deleteDashboardAccountOverviewCache(s)}}catch(t){m.warn("DevServer",`accounts overview cache prune failed: ${t.message}`)}}getObjectDisplayName(e){if(!Number.isFinite(e)||e<0)return"Empty";let t=this.gameData?.getObject(e);return String(t?.displayId||t?.id||"").trim()||`Type ${Math.trunc(e)}`}buildDashboardOverviewItem(e,t){let n=Number.isFinite(e.objectType)?Math.trunc(e.objectType):-1,i=[];if(n>=0&&t instanceof Map){let s=`${n}#${String(e.uniqueId||"").trim()}`,o=`${n}#`,a=t.get(s),l=t.get(o),c=a?.length?String(a.shift()||"").trim():l?.length?String(l.shift()||"").trim():"";i=db(c)}return{objectType:n,objectTypeHex:hd(n),name:this.getObjectDisplayName(n),uniqueId:e.uniqueId,enchantIds:i}}resetSessionStats(){this.sessionStartedAt=0,this.fameSectionStart=null,this.fameAccumulated=0,this.lastKnownFame=0,this.fameInitTimer&&(clearTimeout(this.fameInitTimer),this.fameInitTimer=null)}startFameSegment(){this.fameSectionStart!=null&&(this.fameAccumulated+=Math.max(0,this.lastKnownFame-this.fameSectionStart)),this.fameSectionStart=null,this.fameInitTimer&&(clearTimeout(this.fameInitTimer),this.fameInitTimer=null),this.fameInitTimer=setTimeout(()=>{this.fameInitTimer=null,this.fameSectionStart==null&&(this.fameSectionStart=this.lastKnownFame)},r.FAME_INIT_WAIT_MS)}getSessionStats(e){let t=Date.now();this.sessionStartedAt||(this.sessionStartedAt=t),Number.isFinite(e)&&e>0&&(this.lastKnownFame=e),this.fameSectionStart==null&&Number.isFinite(e)&&e>0&&(this.fameSectionStart=e,this.fameInitTimer&&(clearTimeout(this.fameInitTimer),this.fameInitTimer=null));let n=this.fameSectionStart!=null&&Number.isFinite(e)?Math.max(0,e-this.fameSectionStart):0,i=this.fameAccumulated+n,s=Math.max(0,t-this.sessionStartedAt),o=s>0?i/(s/6e4):0;return{uptimeMs:s,fameGained:i,averageFpm:o}}buildDashboardOverviewItems(e,t,n=!0){let i=e.map(s=>this.buildDashboardOverviewItem(s,t));return n?i:i.filter(s=>Number(s.objectType)>=0)}buildDashboardStorageSection(e,t){let n=[];e.forEach(s=>{n.push(...this.buildDashboardOverviewItems(s,t,!1))});let i=new Set(n.map(s=>Number(s.objectType)).filter(s=>Number.isFinite(s)&&s>=0));return{items:n,totalCount:n.length,uniqueCount:i.size}}async fetchCharListXml(e){let t=new URLSearchParams({do_login:"false",accessToken:e,game_net:"Unity",play_platform:"Unity",game_net_user_id:"",muleDump:"true",__source:"ExaltAccountManager"}).toString();return new Promise(n=>{let i=Sd.default.request("https://www.realmofthemadgod.com/char/list",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":Buffer.byteLength(t,"utf8"),"X-Unity-Version":"2019.3.14f1"}},s=>{let o="";s.on("data",a=>{o+=a}),s.on("end",()=>{let a=fb(o);if(a){n({error:a});return}if(!o.includes("<Chars")){n({error:`Unexpected char list response${s.statusCode?` (${s.statusCode})`:""}.`});return}n({xml:o})})});i.on("error",s=>{m.error("DevServer",`char/list request failed: ${s.message}`),n({error:"Failed to load character list."})}),i.setTimeout(15e3,()=>{i.destroy(),n({error:"Character list request timed out."})}),i.write(t,"utf8"),i.end()})}async fetchDashboardAccountOverviewRemote(e,t,n,i){let s=Oi();if(!s)return{error:"Client token unavailable."};let o=await this.verifyDecaAccount(t,n,s,i);if("error"in o)return{error:o.error};let a=await this.fetchCharListXml(o.token);if("error"in a)return{error:a.error};let l=this.parseDashboardAccountOverview(t,a.xml);return"error"in l?{error:l.error}:{cache:this.writeDashboardAccountOverviewCache(e,t,l)}}parseDashboardAccountOverview(e,t){try{let s=new Eb.XMLParser({ignoreAttributes:!1,attributeNamePrefix:"@_",isArray:g=>g==="Char"||g==="ItemData"}).parse(t)?.Chars;if(!s)return{error:"Character list payload was missing <Chars>."};let o=s.Account??{},a=o.Stats??{},l=Gi(o.UniqueItemInfo),c=Gi(s.UniqueGiftItemInfo??o.UniqueGiftItemInfo),u=Gi(s.UniqueTemporaryGiftItemInfo??o.UniqueTemporaryGiftItemInfo),d=Array.isArray(o.Vault?.Chest)?o.Vault.Chest:o.Vault?.Chest?[o.Vault.Chest]:[],p=Array.isArray(o.MaterialStorage?.Chest)?o.MaterialStorage.Chest:o.MaterialStorage?.Chest?[o.MaterialStorage.Chest]:[],h=(Array.isArray(s.Char)?s.Char:s.Char?[s.Char]:[]).map(g=>{let y=ke(g.ObjectType),b=Gi(g.UniqueItemInfo),S=Math.max(0,ke(g.BackpackSlots)),E=Math.max(0,Math.min(8,Math.floor(S/8))),I=Jr(g.Equipment,12+E*8),A=I.slice(0,4),j=I.slice(4,12),F=I.slice(12);return{charId:ke(g["@_id"]),classType:y,classTypeHex:hd(y),className:this.getObjectDisplayName(y),level:ke(g.Level),exp:ke(g.Exp),fame:ke(g.CurrentFame),seasonal:gd(g.Seasonal),dead:gd(g.Dead),hp:ke(g.HitPoints),maxHp:ke(g.MaxHitPoints),mp:ke(g.MagicPoints),maxMp:ke(g.MaxMagicPoints),attack:ke(g.Attack),defense:ke(g.Defense),speed:ke(g.Speed),dexterity:ke(g.Dexterity),vitality:ke(g.HpRegen),wisdom:ke(g.MpRegen),equipment:this.buildDashboardOverviewItems(A,b,!0),inventory:this.buildDashboardOverviewItems(j,b,!0),backpacks:this.buildDashboardOverviewItems(F,b,!0)}});return h.sort((g,y)=>y.level-g.level||y.fame-g.fame||g.className.localeCompare(y.className)||g.charId-y.charId),{accountName:String(o.Name||"").trim()||e,totalFame:ke(a.TotalFame),aliveFame:ke(a.Fame),bestCharFame:ke(a.BestCharFame??a.BestFame),maxNumChars:ke(o.MaxNumChars),characters:h,vault:this.buildDashboardStorageSection(d.map(g=>Jr(g,0)),l),gifts:this.buildDashboardStorageSection([Jr(o.Gifts,0)],c),temporaryGifts:this.buildDashboardStorageSection([Jr(o.TemporaryGifts,0)],u),materialStorage:this.buildDashboardStorageSection(p.map(g=>Jr(g,0)),l),potions:this.buildDashboardStorageSection([Jr(o.Potions,0)],l)}}catch(n){return m.warn("DevServer",`char/list parse failed: ${n.message}`),{error:"Failed to parse character list."}}}sanitizeConfigId(e){return e.trim().replace(/[<>:"/\\|?*\x00-\x1f]/g,"").replace(/\s+/g,"-").toLowerCase()||`config-${Date.now()}`}buildPluginConfigSnapshot(e){let t=Date.now(),n=this.pluginManager.getPlugins().map(i=>{let s={};for(let o of i.settings||[])o.type!=="button"&&(s[o.key]=o.value);return{id:i.id,enabled:!!i.enabled,hotkey:String(i.hotkey||""),settings:s}});return{id:this.sanitizeConfigId(e),name:e.trim()||"Unnamed Config",createdAt:t,updatedAt:t,plugins:n}}autosaveTimer=null;writeAutosaveSnapshot(){if(this.getActivePluginConfigId()===Ui)try{let e=this.buildPluginConfigSnapshot(gb),t=this.getConfigsDir();this.ensureDir(t);let n=(0,te.join)(t,e.id+".json");if((0,B.existsSync)(n)){try{let i=JSON.parse((0,B.readFileSync)(n,"utf8"));Number(i.createdAt)>0&&(e.createdAt=Number(i.createdAt))}catch{}e.updatedAt=Date.now()}(0,B.writeFileSync)(n,JSON.stringify(e,null,2),"utf8"),this.config.lastPluginConfigId=e.id,this.saveConfig(),this.broadcastConfig()}catch(e){m.warn("DevServer",`autosave failed: ${e.message}`)}}scheduleAutosave(){this.getActivePluginConfigId()===Ui&&(this.autosaveTimer&&clearTimeout(this.autosaveTimer),this.autosaveTimer=setTimeout(()=>{this.autosaveTimer=null,this.writeAutosaveSnapshot()},800))}applyPluginConfigSnapshot(e){if(!e||!Array.isArray(e.plugins))return{ok:!1,message:"Invalid config format: plugins[] is required."};let t=this.pluginManager.getPlugins();for(let n of e.plugins){if(!n||typeof n.id!="string")continue;let i=t.find(o=>o.id===n.id),s=new Map;for(let o of i?.settings||[])s.set(String(o.key),{type:String(o.type||"")});if(typeof n.enabled=="boolean"&&this.pluginManager.togglePlugin(n.id,n.enabled),typeof n.hotkey=="string"){let o=this.pluginManager.updatePluginHotkey(n.id,n.hotkey);o.ok||m.warn("DevServer",`Skipped hotkey for ${n.id}: ${o.reason||"invalid hotkey"}`)}if(n.settings&&typeof n.settings=="object")for(let[o,a]of Object.entries(n.settings))s.get(String(o))?.type!=="button"&&this.pluginManager.updateSetting(n.id,o,a)}return this.broadcastPluginState(),this.syncPluginHotkeysToDll(),{ok:!0,message:`Loaded config "${String(e.name||e.id||"config")}".`}}tryAutoLoadDefaultPluginConfig(){try{let e=Ui,t=(0,te.join)(this.getConfigsDir(),e+".json");if(!(0,B.existsSync)(t)){this.ensureDir(this.getConfigsDir());let o=this.buildPluginConfigSnapshot(gb);(0,B.writeFileSync)(t,JSON.stringify(o,null,2),"utf8"),this.config.lastPluginConfigId=o.id,this.saveConfig(),this.broadcastConfig(),m.log("DevServer","Initialized default plugin config");return}let n=(0,B.readFileSync)(t,"utf8"),i=JSON.parse(n),s=this.applyPluginConfigSnapshot(i);if(!s.ok){m.warn("DevServer",`Auto-load config failed: ${s.message}`);return}this.config.lastPluginConfigId=e,this.saveConfig(),this.broadcastConfig(),m.log("DevServer",`Auto-loaded plugin config: ${e}`)}catch(e){m.warn("DevServer",`Auto-load config error: ${e.message}`)}}playerDataIntervalStop=null;runtimeScheduler=new aa;currentClient=null;connectedClients=new Map;disconnectTimer=null;sessionStartedAt=0;fameSectionStart=null;fameAccumulated=0;lastKnownFame=0;fameInitTimer=null;fameResetTimer=null;static DISCONNECT_GRACE_MS=3e3;static FAME_INIT_WAIT_MS=5e3;static FAME_RESET_MS=12e4;tradeSession={active:!1,ourSlotCount:12,partnerSlotCount:12,ourOffer:[],partnerOffer:[],partnerOfferFromTradeChanged:[],partnerName:""};scriptHost;bridgeClientRef=null;focusedInspectorClientId=null;setBridgeClientRef(e){this.bridgeClientRef=e}internalBridge=null;lastUnresolvedClasses=null;setInternalBridge(e){this.internalBridge=e,e.on("authenticated",()=>{this.broadcastInternalState(),this.syncPluginHotkeysToDll()}),e.on("disconnected",()=>this.broadcastInternalState()),e.on("unresolvedClasses",t=>{this.lastUnresolvedClasses=t,this.broadcastUnresolvedClasses(t)})}getEffectivePlayerPos(){return this.currentClient?.playerData?.pos??null}attachProxy(e){this.proxy=e,e.on("clientConnected",t=>{let n=this.currentClient?.clientId?String(this.currentClient.clientId):null,i=this.gameClientConnected;this.disconnectTimer&&(clearTimeout(this.disconnectTimer),this.disconnectTimer=null),this.fameResetTimer&&(clearTimeout(this.fameResetTimer),this.fameResetTimer=null),this.gameClientConnected=!0,i||(this.sessionStartedAt=0,this.startFameSegment()),this.currentClient=t;let s=t.clientId||"default";this.connectedClients.set(s,t),this.inspector.setClientMode(s,"full"),n&&n!==s&&this.inspector.setClientMode(n,"summary"),this.focusedInspectorClientId=s,this.bridgeClientRef&&(this.bridgeClientRef.current=t),this.broadcastGameClientState(),this.broadcastClientList()}),e.on("clientDisconnected",t=>{let n=t?.clientId||"default";if(this.connectedClients.delete(n),this.inspector.clearClientMode(n),this.currentClient===t&&(this.currentClient=null),this.focusedInspectorClientId===n){let i=this.connectedClients.values().next().value,s=i?.clientId?String(i.clientId):null;this.focusedInspectorClientId=s,s&&this.inspector.setClientMode(s,"full")}this.bridgeClientRef&&this.bridgeClientRef.current===t&&(this.bridgeClientRef.current=void 0),this.resetTradeSession(),this.disconnectTimer&&clearTimeout(this.disconnectTimer),this.disconnectTimer=setTimeout(()=>{if(this.disconnectTimer=null,this.connectedClients.size===0){if(this.gameClientConnected=!1,this.fameSectionStart!=null){let i=Math.max(0,this.lastKnownFame-this.fameSectionStart);this.fameAccumulated+=i}this.fameSectionStart=null,this.fameInitTimer&&(clearTimeout(this.fameInitTimer),this.fameInitTimer=null),this.sessionStartedAt=0,this.fameResetTimer&&clearTimeout(this.fameResetTimer),this.fameResetTimer=setTimeout(()=>{this.fameResetTimer=null,this.fameAccumulated=0,this.lastKnownFame=0},r.FAME_RESET_MS)}this.broadcastGameClientState(),this.broadcastClientList()},r.DISCONNECT_GRACE_MS)}),this.playerDataIntervalStop=this.runtimeScheduler.scheduleRepeating(500,()=>{if(this.connectedClients.size>1&&this.broadcastClientList(),this.currentClient?.playerData){let t=this.currentClient.playerData,n=this.currentClient.clientId||"default",i=this.getSessionStats(t.currentFame),s=this.currentClient.state?.conTargetAddress||"",o=this.ipToServerName[s]||s,a=this.worldState?.getEntityType(this.currentClient.objectId??0),l=Number.isFinite(Number(a))&&Number(a)>0?Math.trunc(Number(a)):Number.isFinite(Number(t.classType))&&Number(t.classType)>0?Math.trunc(Number(t.classType)):null,c=null,u=t.questObjectId,d=typeof u=="number"&&Number.isFinite(u)?Math.trunc(u):Number.isFinite(Number(u))?Math.trunc(Number(u)):NaN;if(Number.isFinite(d)&&d>0&&this.worldState){let E=this.worldState.resolveQuestTargetObjectType(d,this.gameData);E!=null&&E>0&&(c=E)}let p=t.vitality+t.vitalityBonus+t.exaltedVitality,f=t.wisdom+t.wisdomBonus+t.exaltedWisdom,h=Math.round(2*(1+.12*p)*10)/10,g=Math.round(f/10*10)/10,y=Object.keys(zi).filter(E=>t.hasConditionEffect(E)),b=this.getEffectivePlayerPos(),S=JSON.stringify({type:"playerData",clientId:n,name:t.name||"",classType:t.classType,skin:t.skin,tex1:t.tex1,tex2:t.tex2,sessionUptimeMs:i.uptimeMs,sessionFameGained:i.fameGained,sessionAverageFpm:Math.round(i.averageFpm*10)/10,gameId:this.currentClient.state?.gameId??null,objectId:this.currentClient.objectId??null,objectType:l,level:t.level,hp:t.health,maxHp:t.maxHealth,mana:t.mana,maxMana:t.maxMana,healthBonus:t.healthBonus,manaBonus:t.manaBonus,hpRegenPerSec:h,mpRegenPerSec:g,attack:t.attack,attackBonus:t.attackBonus,exaltedAttack:t.exaltedAttack,defense:t.defense,defenseBonus:t.defenseBonus,exaltedDefense:t.exaltedDefense,speed:t.speed,speedBonus:t.speedBonus,exaltedSpeed:t.exaltedSpeed,dexterity:t.dexterity,dexterityBonus:t.dexterityBonus,exaltedDexterity:t.exaltedDexterity,vitality:t.vitality,vitalityBonus:t.vitalityBonus,exaltedVitality:t.exaltedVitality,wisdom:t.wisdom,wisdomBonus:t.wisdomBonus,exaltedWisdom:t.exaltedWisdom,exaltedMaxHP:t.exaltedMaxHP,exaltedMaxMP:t.exaltedMaxMP,stars:t.stars,fame:t.currentFame,guild:t.guildName||"",pos:b??t.pos,map:t.mapName,questObjectId:t.questObjectId,questTargetObjectType:c,server:o,hpPct:t.health/Math.max(1,t.maxHealth||1),mpPct:t.mana/Math.max(1,t.maxMana||1),teleportAllowed:!!t.teleportAllowed,hasBackpack:!!t.hasBackpack,backpackTier:t.backpackTier,hasBackpackExtender:t.hasBackpackExtender,inventory:Array.isArray(t.inventory)?t.inventory.slice():[],backpack:Array.isArray(t.backpack)?t.backpack.slice():[],conditionEffects:y});for(let E of this.wss.clients)E.readyState===X.default.OPEN&&E.send(S)}})}setDetectedGamePath(e){this.detectedGamePath=e}getRotmgPath(){return this.config.rotmgPath||this.detectedGamePath}isSingleClientOnlyEnabled(){return this.config.singleClientOnly!==!1}getRunningProcessCount(e){return wd(e)}getRunningRotmgExaltProcessCount(){return this.getRunningProcessCount("RotMG Exalt.exe")}terminateProcessByImageName(e){try{return(0,nr.execFileSync)("taskkill",["/IM",e,"/F"],{encoding:"utf8",windowsHide:!0}),!0}catch(t){return wd(e)===0||m.warn("DevServer",`Failed to terminate ${e}: ${String(t.message||"")}`),!1}}getSingleClientLaunchBlockError(){return!this.isSingleClientOnlyEnabled()||this.getRunningRotmgExaltProcessCount()<1?null:"Close the existing RotMG Exalt process and launch again. We only support 1 account at a time right now, but later multiple accounts with proxies will be supported."}ensureSteamAppIdFile(e){try{let t=null,n=e;for(let a=0;a<6;a++){let l=(0,te.dirname)(n);if(!l||l===n)break;if((0,te.basename)(n).toLowerCase()==="common"&&(0,te.basename)(l).toLowerCase()==="steamapps"){t=l;break}n=l}if(!t)return;let i=(0,te.join)(e,"steam_appid.txt");if((0,B.existsSync)(i))return;let s=(0,te.basename)(e).toLowerCase(),o=null;for(let a of(0,B.readdirSync)(t)){let l=/^appmanifest_(\d+)\.acf$/i.exec(a);if(!l)continue;let u=(0,B.readFileSync)((0,te.join)(t,a),"utf8").match(/"installdir"\s+"([^"]+)"/i)?.[1]?.trim().toLowerCase();if(u&&u===s){o=l[1];break}}if(!o){m.warn("DevServer",`Steam install detected but no appmanifest matched "${(0,te.basename)(e)}"; skipping steam_appid.txt.`);return}(0,B.writeFileSync)(i,o,"utf8"),m.log("DevServer",`Wrote steam_appid.txt (AppID ${o}) for Steam-build direct launch.`)}catch(t){m.warn("DevServer",`ensureSteamAppIdFile failed: ${t.message}`)}}launchGame(){let e=this.getSingleClientLaunchBlockError();if(e)return{ok:!1,error:e};let t=this.getRotmgPath();if(!t)return{ok:!1,error:"RotMG path not configured and auto-detection failed."};let n=(0,te.join)(t,"RotMG Exalt.exe");if(!(0,B.existsSync)(n))return{ok:!1,error:`RotMG Exalt.exe not found at: ${n}`};this.ensureSteamAppIdFile(t);try{return(0,nr.spawn)(n,[],{cwd:t,detached:!0,stdio:"ignore"}).unref(),m.log("DevServer",`Launched RotMG from: ${n}`),{ok:!0}}catch(i){let s=i.message;return m.error("DevServer",`Failed to launch RotMG: ${s}`),{ok:!1,error:s}}}async verifyDecaAccount(e,t,n,i){let s=await this.verifyDecaAccountOnce(e,t,n,i);if(!("error"in s))return s;if(s.transport||!C0(s.rawError))return{error:s.error};let o=Oi({skipFile:!0});if(!o||o===n)return{error:s.error};m.log("DevServer","account/verify rejected HWID; retrying once with fresh WMI HWID (bypassing hwid.txt).");let a=await this.verifyDecaAccountOnce(e,t,o,i);if(!("error"in a)){let l=Ou();return m.log("DevServer",`Fresh-HWID verify succeeded${l?"; removed stale hwid.txt":""}.`),a}return{error:a.error}}async verifyDecaAccountOnce(e,t,n,i){let s=String(i?.steamId||"").trim(),o=!!i&&s!=="",a=new URLSearchParams(o?{guid:e,secret:t,steamid:s,clientToken:n,game_net:"Unity_steam",play_platform:"Unity_steam",game_net_user_id:s}:{guid:e,password:t,clientToken:n,game_net:"Unity",play_platform:"Unity",game_net_user_id:""}).toString();return new Promise(l=>{let c=Sd.default.request("https://www.realmofthemadgod.com/account/verify",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","Content-Length":Buffer.byteLength(a,"utf8"),"X-Unity-Version":"2019.3.14f1"}},u=>{let d="";u.on("data",p=>{d+=p}),u.on("end",()=>{let p=pb(d);if(p){l(p);return}let f=(d.match(/<Error>([^<]*)<\/Error>/i)?.[1]??"").trim();if(!f){let h=u.statusCode??0,g=d.replace(/\s+/g," ").trim().slice(0,200);m.warn("DevServer",`account/verify unrecognized response (HTTP ${h})${o?" [steam]":""}: ${g||"<empty body>"}`),l({error:`Login failed \u2014 unexpected server response (HTTP ${h}). ${g?`Response: ${g}`:"Empty response body."}`,rawError:""});return}l({error:yd(d),rawError:f})})});c.on("error",u=>{m.error("DevServer",`account/verify request failed: ${u.message}`),l({error:"Network error. Try again.",rawError:"",transport:!0})}),c.setTimeout(15e3,()=>{c.destroy(),l({error:"Request timed out.",rawError:"",transport:!0})}),c.write(a,"utf8"),c.end()})}clampLaunchWindowSize(e,t,n){return Number.isFinite(e)?Math.min(n,Math.max(t,Math.round(e))):t}buildCredentialLaunchWindowExtras(e){let t=e?.windowRect;if(t&&Number.isFinite(t.width)&&Number.isFinite(t.height)){let n=this.clampLaunchWindowSize(t.width,320,7680),i=this.clampLaunchWindowSize(t.height,240,4320),s=this.clampLaunchWindowSize(t.x,-32e3,32e3),o=this.clampLaunchWindowSize(t.y,-32e3,32e3);return["-screen-fullscreen","0","-screen-width",String(n),"-screen-height",String(i),"-screen-x",String(s),"-screen-y",String(o),"-popupwindow","-nolog"]}return e?.compactWindow?["-screen-fullscreen","0","-screen-width","640","-screen-height","360","-popupwindow","-nolog"]:[]}async launchGameWithCredentials(e,t,n,i){let s=this.getSingleClientLaunchBlockError();if(s)return{ok:!1,error:s};let o=this.getRotmgPath();if(!o)return{ok:!1,error:"RotMG path not configured and auto-detection failed."};let a=(0,te.join)(o,"RotMG Exalt.exe");if(!(0,B.existsSync)(a))return{ok:!1,error:`RotMG Exalt.exe not found at: ${a}`};let l=Oi();if(!l)return{ok:!1,error:"Client token unavailable."};let c=String(i?.steamId||"").trim();if(i?.isSteam&&!c)return{ok:!1,error:"Steam ID is required for Steam accounts."};let u=i?.isSteam?{steamId:c}:void 0,d=await this.verifyDecaAccount(e,t,l,u);if("error"in d)return{ok:!1,error:d.error};let{token:p,tokenTimestamp:f,tokenExpiration:h}=d,g=E=>Buffer.from(E,"utf8").toString("base64"),y=`data:{platform:Deca,guid:${g(e)},token:${g(p)},tokenTimestamp:${g(f)},tokenExpiration:${g(h)},env:4,serverName:${n}}`,b=this.buildCredentialLaunchWindowExtras(i),S=new Date().toISOString();this.ensureSteamAppIdFile(o);try{let E=(0,nr.spawn)(a,[y,...b],{cwd:o,detached:!0,stdio:"ignore"});E.unref();let I=i?.windowRect,A=typeof E.pid=="number"?E.pid:-1;A>0&&rb({launcherPid:A,accountId:i?.accountId??null,accountLabel:i?.accountLabel??null,email:e}),I&&process.platform==="win32"&&A>0&&window.setTimeout(()=>{Xy(A,I,{email:e,launchedAtIso:S}).then(F=>{F.ok?m.log("DevServer",`Positioned credential launch window via Win32 (launcher PID ${A}, ${I.width}\xD7${I.height} @ ${I.x},${I.y})`):m.warn("DevServer",`Post-launch window move failed (launcher PID ${A}). ${F.debug??""}`.slice(0,2e3))})},500);let j=I?` (${I.width}\xD7${I.height} @ ${I.x},${I.y})`:i?.compactWindow?" (640\xD7360 compact)":"";return m.log("DevServer",`Launched RotMG with credentials${j} from: ${a}`),{ok:!0}}catch(E){let I=E.message;return m.error("DevServer",`Failed to launch RotMG: ${I}`),{ok:!1,error:I}}}saveConfig(){try{(0,B.writeFileSync)(this.configPath,JSON.stringify(this.config,null,2),"utf8")}catch(e){m.warn("DevServer",`Failed to save config: ${e.message}`)}}buildConfigMessage(){return JSON.stringify({type:"config",rotmgPath:this.getRotmgPath()||"",rotmgPathSource:this.config.rotmgPath?"custom":this.detectedGamePath?"auto":"none",rotmgExtractorGameDataPath:(this.config.rotmgExtractorGameDataPath||"").trim(),singleClientOnly:this.isSingleClientOnlyEnabled(),pluginConfigId:this.config.lastPluginConfigId||"",serverNames:this.serverNames})}broadcastConfig(){let e=this.buildConfigMessage();for(let t of this.wss.clients)t.readyState===X.default.OPEN&&t.send(e)}broadcastGameUpdateStatus(e){let t=JSON.stringify({type:"gameUpdateStatus",status:e});for(let n of this.wss.clients)n.readyState===X.default.OPEN&&n.send(t)}broadcastInternalState(){let e=JSON.stringify({type:"internalState",connected:this.internalBridge?.isConnected??!1});for(let t of this.wss.clients)t.readyState===X.default.OPEN&&t.send(e)}broadcastUnresolvedClasses(e){let t=JSON.stringify({type:"unresolvedClasses",classes:e});for(let n of this.wss.clients)n.readyState===X.default.OPEN&&n.send(t)}broadcastGameClientState(){let e=JSON.stringify({type:"gameClient",connected:this.gameClientConnected});for(let t of this.wss.clients)t.readyState===X.default.OPEN&&t.send(e)}broadcastClientList(){let e=Array.from(this.connectedClients.entries()).map(([n,i])=>{let s=i.playerData,o=i.state?.conTargetAddress||"";return{clientId:n,name:s?.name||"",classType:s?.classType??null,skin:s?.skin??null,tex1:s?.tex1??null,tex2:s?.tex2??null,hp:s?.health??0,maxHp:s?.maxHealth??1,guild:s?.guildName||"",server:this.ipToServerName[o]||o||"--"}}),t=JSON.stringify({type:"clientList",clients:e});for(let n of this.wss.clients)n.readyState===X.default.OPEN&&n.send(t)}start(e=3e3){this.httpServer.listen(e,()=>{m.log("DevServer",`Dashboard available at http://localhost:${e}`),this.applyExaltTuneOnProxyStartMaybe().finally(()=>{qr(),sb({getRss:()=>process.memoryUsage().rss,getPacketRate:()=>this.inspector.getRate(),trimProxyMemory:t=>this.trimProxyMemorySmart(t)})})})}trimProxyMemorySmart(e){if(e.trimPackets&&this.inspector.clearBuffer(),e.trimPacketLab&&this.lab.clear(),e.trimWorldSnapshot&&this.worldState&&this.worldState.clear(),!e.runGcHint)return;let t=global;if(typeof t.gc=="function")try{t.gc()}catch{}}async applyExaltTuneOnProxyStartMaybe(){try{let e=Ze();if(!e.autoApplyOnProxyStart||!(await re()).ok)return;await lb();let n=String(e.startupPowerGuid??"").trim();n&&await Ht(n)}catch(e){m.warn("DevServer",`exaltTune autoApply: ${e.message}`)}}stop(){ob(),cd(),this.playerDataIntervalStop?.(),this.playerDataIntervalStop=null,this.runtimeScheduler.stop();try{Ze().restoreProcessBaselineOnExit&&ba().catch(()=>{})}catch{}this.wss.close(),this.httpServer.close()}pingAllServers(){let n=Object.entries(this.servers);return Promise.all(n.map(([i,s])=>new Promise(o=>{let a=Date.now(),l=new wb.default.Socket,c=u=>{try{l.destroy()}catch{}o([i,u])};l.setTimeout(3e3,()=>c(-1)),l.once("error",()=>c(-1)),l.once("connect",()=>c(Date.now()-a)),l.connect(2050,s)}))).then(i=>{let s={};return i.forEach(([o,a])=>{a>=0&&(s[o]=a)}),s})}handleHttp(e,t){if(this.wikiSprites.tryServeWikiTextureFile(e,t))return;if(e.url==="/api/plugins"&&e.method==="GET"){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(this.pluginManager.getPlugins()));return}if(e.url?.startsWith("/api/plugins/")&&e.method==="POST"){let f=e.url.split("/"),h=f[3],g=f[4],y="";e.on("data",b=>y+=b),e.on("end",()=>{let b=g==="enable",S=this.pluginManager.togglePlugin(h,b);t.writeHead(S?200:404,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:S,pluginId:h,enabled:b}))});return}if(e.url==="/api/recent"&&e.method==="GET"){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(this.inspector.getRecent()));return}if(e.url==="/api/damage/encounters"&&e.method==="GET"){let f=this.pluginManager.getPluginData("damage-sniffer","encounterHistory")||[];t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(f));return}if(e.url==="/api/lab/definitions"&&e.method==="GET"){try{let f=Ty,h=Py,g=vy,y=Object.entries(f.packets||{}).map(([b,S])=>({key:`id:${b}`,id:parseInt(b,10),name:S.name,direction:S.direction,fields:S.fields||[],status:g[b]==="needsWork"?"needsWork":"working"}));for(let b of h.packets||[])y.push({key:`name:${b.direction}:${b.name}`,id:typeof b.id=="number"?b.id:null,name:b.name,direction:b.direction,fields:[],status:"needsWork"});t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({packets:y,dataObjects:f.dataObjects||{}}))}catch(f){m.warn("DevServer",`Failed to load lab definitions: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to load definitions"}))}return}if(e.url==="/api/lab/unknowns"&&e.method==="GET"){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(this.lab.getUnknowns()));return}if(e.url?.startsWith("/api/lab/analyze/")&&e.method==="GET"){let f=parseInt(e.url.slice(17),10),h=this.lab.analyze(f);h?(t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(h))):(t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:`No data for packet id ${f}`})));return}if(e.url==="/api/lab/probe"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let{id:h,spec:g}=JSON.parse(f),y=this.lab.probe(Number(h),String(g??""));t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:h.message}))}});return}if(e.url==="/api/ping-all"&&e.method==="GET"){this.pingAllServers().then(f=>{t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}).catch(f=>{m.warn("DevServer",`ping-all failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Ping failed"}))});return}if(e.url==="/api/admin/memory"&&e.method==="GET"){let f=process.memoryUsage();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({rss:f.rss,heapUsed:f.heapUsed,heapTotal:f.heapTotal,external:f.external,arrayBuffers:f.arrayBuffers}));return}if(e.url==="/api/admin/memory/trim"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=f?JSON.parse(f):{},g=h.packets!==!1,y=h.packetLab!==!1,b=h.worldSnapshot===!0,S=typeof global.gc=="function";this.trimProxyMemorySmart({trimPackets:g,trimPacketLab:y,trimWorldSnapshot:b,runGcHint:!0});let E=!!S,I=process.memoryUsage();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,did:{packets:g,packetLab:y,worldSnapshot:b},gcHint:E===!1?"Start node with --expose-gc for optional GC.":E,memory:I}))}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/smart-trim/settings"&&e.method==="GET"){try{let f=br();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,settings:f,settingsPath:Wu()}))}catch(f){m.warn("DevServer",`smart-trim settings GET: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}return}if(e.url==="/api/admin/smart-trim/settings"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=fa(h);On(),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,settings:g}))}catch(h){m.warn("DevServer",`smart-trim settings POST: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/smart-trim/exalt-once"&&e.method==="POST"){ab({manual:!0}).then(f=>{t.writeHead(f.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}).catch(f=>{m.warn("DevServer",`smart-trim exalt-once: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/settings"&&e.method==="GET"){try{let f=Ze();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,settings:f,settingsPath:Fu()}))}catch(f){m.warn("DevServer",`window-tuning settings GET: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}return}if(e.url?.startsWith("/api/admin/window-tuning/tune-status")&&e.method==="GET"){(async()=>{try{let f=Ze(),h=await re(),g=new URL(e.url||"/api/admin/window-tuning/tune-status","http://127.0.0.1"),b=g.searchParams.get("thermalSample")==="1"||g.searchParams.get("thermalSample")==="true"?await Ia():void 0;t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,supported:!!h.ok,reason:h.ok?void 0:h.reason,tuningPreset:f.tuningPreset??null,watchdogEnabled:!!f.watchdog.enabled,thermalEnabled:!!f.thermal.enabled,thermalBackgroundDemotionActive:Bi(),thermalSample:b}))}catch(f){m.warn("DevServer",`window-tuning tune-status GET: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}})();return}if(e.url==="/api/admin/window-tuning/settings"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=Cn(h);qr(),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,settings:g}))}catch(h){m.warn("DevServer",`window-tuning settings POST: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/window-tuning/supported"&&e.method==="GET"){re().then(f=>{t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}).catch(f=>{t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,reason:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/power-hints"&&e.method==="GET"){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({hints:qy}));return}if(e.url==="/api/admin/window-tuning/exalt-processes"&&e.method==="GET"){bb().then(f=>{t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,...f}))}).catch(f=>{m.warn("DevServer",`exalt-processes: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/power-plans"&&e.method==="GET"){ka().then(f=>{t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,plans:f}))}).catch(f=>{m.warn("DevServer",`power-plans: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/power-plan"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.guid??"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"guid required"}));return}Ht(g).then(y=>{t.writeHead(y.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}).catch(y=>{m.warn("DevServer",`power-plan POST: ${y.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(y.message||y)}))})}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/window-tuning/exalt-priority"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.preset||"");if(!new Set(["Idle","BelowNormal","Normal","AboveNormal","High"]).has(g)){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"preset must be Idle|BelowNormal|Normal|AboveNormal|High"}));return}Ca(g).then(b=>{t.writeHead(b.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(b))}).catch(b=>{m.warn("DevServer",`exalt-priority POST: ${b.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(b.message||b)}))})}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message}))}});return}if(e.url==="/api/admin/window-tuning/spread-cores"&&e.method==="POST"){td().then(f=>{t.writeHead(f.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}).catch(f=>{m.warn("DevServer",`spread-cores POST: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))});return}if(e.url==="/api/admin/window-tuning/client-roles/apply"&&e.method==="POST"){(async()=>{try{let h=(await bb()).foregroundPid,g=new Set(Qe().parkedPids),y=await Nn(h,g);t.writeHead(y.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}catch(f){m.warn("DevServer",`window-tuning client-roles apply: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}})();return}if(e.url==="/api/admin/window-tuning/multibox-action"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{(async()=>{try{let h=JSON.parse(f||"{}"),g=Math.floor(Number(h.pid)),y=String(h.action||"").trim().toLowerCase();if(!Number.isFinite(g)||g<=0){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"pid required"}));return}let b=await rr(g),S=Math.min(...b);if(y==="park"){let E=Qe(),I=[...new Set([...E.parkedPids,...b])];Ft({parkedPids:I});let A=await _a(S,"parked",0);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:A.ok,error:A.error,pids:A.pids,action:"park"}));return}if(y==="activate"||y==="active"){yb(b);for(let I of[...b].sort((A,j)=>j-A))await Yy(I);let E=await _a(S,"active",0);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:E.ok,error:E.error,pids:E.pids,action:"activate"}));return}if(y==="background"){yb(b);let E=await _a(S,"background",0);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:E.ok,error:E.error,pids:E.pids,action:"background"}));return}if(y==="trim"){let E=await Rn(b);t.writeHead(E.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify({...E,action:"trim"}));return}if(y==="resize"||y==="restore"){let E=await Zy(g);t.writeHead(E.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify({...E,action:"resize"}));return}t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"action must be park|activate|background|trim|resize"}))}catch(h){m.warn("DevServer",`multibox-action: ${h.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(h.message||h)}))}})()});return}if(e.url==="/api/admin/window-tuning/tuning-preset"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{(async()=>{try{let h=JSON.parse(f||"{}"),g=String(h.preset||"").trim(),y=g.toLowerCase(),b={safe:"safe",balanced:"balanced",multibox:"multibox",aggressive:"aggressive",lowheat:"lowHeat",lowHeat:"lowHeat"},S=b[g]??b[y];if(!S){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"preset must be safe|balanced|multibox|aggressive|lowHeat"}));return}ma(S),On(),qr();let E=await re();if(!E.ok){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,appliedLive:!1,reason:E.reason,slots:[]}));return}let I=await md();t.writeHead(I.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!!I.ok,appliedLive:!!I.ok,error:I.error,slots:I.slots||[]}))}catch(h){m.warn("DevServer",`tuning-preset: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(h.message||h)}))}})()});return}if(e.url==="/api/admin/window-tuning/run-multibox-policy"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{(async()=>{try{let h={};(f||"").trim()&&(h=JSON.parse(f));let g=await ub(h);t.writeHead(g.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(g))}catch(h){m.warn("DevServer",`run-multibox-policy: ${h.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(h.message||h)}))}})()});return}if(e.url==="/api/admin/window-tuning/restore-all"&&e.method==="POST"){let f="";e.on("data",h=>{f+=h}),e.on("end",()=>{(async()=>{try{let h=!1;(f||"").trim()&&(h=!!JSON.parse(f).balancedPowerPlan);let g=await cb({activateBalancedPowerPlan:h});t.writeHead(g.ok?200:500,{"Content-Type":"application/json"}),t.end(JSON.stringify(g))}catch(h){m.warn("DevServer",`restore-all: ${h.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(h.message||h)}))}})()});return}if(e.url==="/api/admin/window-tuning/restore-process-baseline"&&e.method==="POST"){(async()=>{try{let f=await ba();t.writeHead(f.ok?200:500,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}catch(f){m.warn("DevServer",`restore-process-baseline: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}})();return}if(e.url==="/api/admin/window-tuning/recapture-process-baseline"&&e.method==="POST"){(async()=>{try{let f=await Ku();t.writeHead(f.ok?200:500,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}catch(f){m.warn("DevServer",`recapture-process-baseline: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:String(f.message||f)}))}})();return}if(e.url==="/api/admin/window-tuning/kill-msedge"&&e.method==="POST"){(async()=>{try{let f=k0();t.writeHead(f.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}catch(f){m.warn("DevServer",`kill-msedge: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,ran:!1,error:String(f.message||f)}))}})();return}let n=Ce(),i=this.getConfigsDir(),s=()=>this.ensureDir(n),o=()=>this.ensureDir(i);if(e.url==="/api/configs"&&e.method==="GET"){try{s(),o();let f=(0,B.readdirSync)(i).filter(g=>(0,te.extname)(g)===".json"),h=[];for(let g of f)try{let y=(0,B.readFileSync)((0,te.join)(i,g),"utf8"),b=JSON.parse(y),S=String(b.id||g.replace(/\.json$/i,"")),E=String(b.name||S),I=Number(b.updatedAt||0)||0,A=Number(b.createdAt||0)||0;h.push({id:S,name:E,updatedAt:I,createdAt:A})}catch{}h.sort((g,y)=>(y.updatedAt||0)-(g.updatedAt||0)||g.name.localeCompare(y.name)),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({configs:h}))}catch(f){m.warn("DevServer",`configs list failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to list configs"}))}return}if(e.url==="/api/configs/save"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.name||"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Config name is required."}));return}s(),o();let y=this.buildPluginConfigSnapshot(g),b=(0,te.join)(i,y.id+".json");if((0,B.existsSync)(b)){try{let S=(0,B.readFileSync)(b,"utf8"),E=JSON.parse(S);Number(E.createdAt)>0&&(y.createdAt=Number(E.createdAt))}catch{}y.updatedAt=Date.now()}(0,B.writeFileSync)(b,JSON.stringify(y,null,2),"utf8"),this.config.lastPluginConfigId=y.id,this.saveConfig(),this.broadcastConfig(),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,config:{id:y.id,name:y.name,createdAt:y.createdAt,updatedAt:y.updatedAt}}))}catch(h){m.warn("DevServer",`configs save failed: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to save config"}))}});return}if(e.url==="/api/configs/load"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.id||"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Config id is required."}));return}let y=this.sanitizeConfigId(g);s(),o();let b=(0,te.join)(i,y+".json");if(!(0,B.existsSync)(b)){t.writeHead(404,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Config not found."}));return}let S=(0,B.readFileSync)(b,"utf8"),E=JSON.parse(S),I=this.applyPluginConfigSnapshot(E);I.ok&&(this.config.lastPluginConfigId=y,this.saveConfig(),this.broadcastConfig()),t.writeHead(I.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(I))}catch(h){m.warn("DevServer",`configs load failed: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to load config"}))}});return}if(e.url==="/api/accounts"&&e.method==="GET"){try{wr("GET /api/accounts: reading accounts...");let f=this.readDashboardAccounts();wr(`GET /api/accounts: returning ${f.length} account(s)`);let h=this.readAllDashboardAccountOverviewCaches();t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({accounts:f,cachedOverviews:h}))}catch(f){wr(`GET /api/accounts: EXCEPTION: ${f.message}`),m.warn("DevServer",`accounts list failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to load accounts"}))}return}if(e.url==="/api/accounts/save"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{let h=JSON.parse(f||"{}");if(!Array.isArray(h.accounts)){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"accounts[] is required."}));return}let g=new Map(this.readDashboardAccounts().map(S=>[S.id,S])),y=Date.now(),b=h.accounts.map((S,E)=>{let I=this.normalizeDashboardAccountRecord(S,E),A=g.get(I.id);return{...I,createdAt:A?.createdAt||I.createdAt||y,updatedAt:y}});this.writeDashboardAccounts(b),this.pruneDashboardAccountOverviewCaches(b);for(let S of b){let E=g.get(S.id);E&&String(E.email||"").trim()!==String(S.email||"").trim()&&this.deleteDashboardAccountOverviewCache(S.id)}t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,accounts:b}))}catch(h){m.warn("DevServer",`accounts save failed: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to save accounts"}))}});return}if(e.url==="/api/accounts/overview"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",async()=>{try{let h=JSON.parse(f||"{}"),g=String(h.accountId||"").trim(),y=String(h.email||"").trim(),b=String(h.password||""),S=!!h.refresh,E=!!h.isSteam,I=String(h.steamId||"").trim();if(!y||!b){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:E?"GUID and secret are required.":"Email and password are required."}));return}if(E&&!I){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Steam ID is required for Steam accounts."}));return}if(!S&&g){let j=this.readDashboardAccountOverviewCache(g);if(j&&String(j.email||"").trim()===y){t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,overview:j.overview,cached:!0,updatedAt:j.updatedAt}));return}}let A=await this.fetchDashboardAccountOverviewRemote(g||y,y,b,E?{steamId:I}:void 0);if("error"in A){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:A.error}));return}t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,overview:A.cache.overview,cached:!1,updatedAt:A.cache.updatedAt}))}catch(h){m.warn("DevServer",`accounts overview failed: ${h.message}`),t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to load account overview."}))}});return}if(e.url==="/api/hwid/refresh"&&e.method==="POST"){try{let f=Ou(),h=Oi({skipFile:!0}),g=h?`${h.slice(0,8)}\u2026${h.slice(-4)}`:"";m.log("DevServer",`HWID refresh requested; ${f?"removed":"no"} hwid.txt; fresh=${g}`),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,removed:f,hwidPreview:g}))}catch(f){m.warn("DevServer",`hwid refresh failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to refresh HWID."}))}return}if(e.url==="/api/accounts/refresh-all"&&e.method==="POST"){Promise.resolve().then(async()=>{try{let f=this.readDashboardAccounts(),h={};for(let g of f){let y=String(g.email||"").trim(),b=String(g.password||"");if(!y||!b){h[g.id]={ok:!1,error:"Missing credentials."};continue}let S=String(g.steamId||"").trim();if(g.isSteam&&!S){h[g.id]={ok:!1,error:"Steam account missing Steam ID."};continue}let E=await this.fetchDashboardAccountOverviewRemote(g.id,y,b,g.isSteam?{steamId:S}:void 0);if("error"in E){h[g.id]={ok:!1,error:E.error};continue}h[g.id]={ok:!0,updatedAt:E.cache.updatedAt,overview:E.cache.overview}}t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,results:h}))}catch(f){m.warn("DevServer",`accounts refresh-all failed: ${f.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to refresh all accounts."}))}});return}if(e.url==="/api/muling/status"&&e.method==="GET"){let f=!!(this.mulingProcess&&!this.mulingProcess.killed);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({running:f,pid:f?this.mulingProcess.pid??null:null}));return}if(e.url==="/api/muling/stop"&&e.method==="POST"){this.mulingProcess&&!this.mulingProcess.killed&&(this.mulingProcess.kill(),this.mulingProcess=null),this.broadcastMulingStatus({phase:"stopped"}),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0}));return}if(e.url==="/api/muling/start"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{let h=JSON.parse(f||"{}"),g=String(h.mainAccountId||"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"mainAccountId is required."}));return}if(this.mulingProcess&&!this.mulingProcess.killed){t.writeHead(409,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"A muling session is already running."}));return}let b=this.readDashboardAccounts().find(O=>O.id===g);if(!b||b.mulingRole!=="main"){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:'Account not found or not set to muling role "main".'}));return}let S=(0,te.join)(this.publicDir,"..","..",".."),E=(0,te.join)(S,"muling-headless","dist","muler.js");if(!(0,B.existsSync)(E)){t.writeHead(503,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"muling-headless not built. Run muling-headless/build.bat first."}));return}let I=this.getAccountsFile(),A=(0,te.join)(S,"data","servers.json"),j=this.getAccountsCacheDir(),F=(0,nr.spawn)(process.execPath,[E,"--mainId",g,"--accounts",I,"--servers",A,"--cacheDir",j],{detached:!1,stdio:["ignore","pipe","pipe"]});this.mulingProcess=F;let M="";F.stdout?.on("data",O=>{M+=O.toString();let L=M.split(`
`);M=L.pop()??"";for(let T of L)if(T.startsWith("MULING_STATUS:"))try{let Z=JSON.parse(T.slice(14));this.broadcastMulingStatus(Z)}catch{}else T.trim()&&m.warn("muling",T.trimEnd())}),F.stderr?.on("data",O=>m.warn("muling",O.toString().trimEnd())),F.on("exit",O=>{m.warn("muling",`Process exited with code ${O}`),this.mulingProcess===F&&(this.mulingProcess=null),this.broadcastMulingStatus({phase:"stopped"})}),this.broadcastMulingStatus({phase:"starting"}),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,pid:F.pid??null}))}catch(h){m.warn("DevServer",`muling start failed: ${h.message}`),t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({error:"Failed to start muling."}))}});return}if(e.url==="/api/scripts"&&e.method==="GET"){let f=this.scriptHost?.list()??[],h=this.scriptHost?.getScriptsDir()??null;t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({scripts:f,dir:h}));return}if(e.url==="/api/scripts/open-folder"&&e.method==="POST"){try{if(!this.scriptHost){t.writeHead(503,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"Script host not available."}));return}let f=this.scriptHost.getScriptsDir();(0,B.mkdirSync)(f,{recursive:!0});let h,g;process.platform==="win32"?(h=process.env.ComSpec||"cmd.exe",g=["/c","start","",f]):process.platform==="darwin"?(h="open",g=[f]):(h="xdg-open",g=[f]);let y=(0,nr.spawn)(h,g,{detached:!0,stdio:"ignore"});y.on("error",b=>{try{this.scriptHost?.logLine?.("open-folder failed: "+b.message,"error")}catch{}}),y.unref(),t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!0,dir:f}))}catch(f){t.writeHead(500,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:f.message||"Failed to open scripts folder."}))}return}if(e.url==="/api/scripts/start"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",async()=>{try{if(!this.scriptHost){t.writeHead(503,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"Script host not available."}));return}if(this.connectedClients.size===0){t.writeHead(409,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"Connect an account before starting scripts."}));return}let h=JSON.parse(f||"{}"),g=String(h.id??"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"id is required."}));return}let y=await this.scriptHost.start(g);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message||"Invalid request"}))}});return}if(e.url==="/api/scripts/stop"&&e.method==="POST"){let f="";e.on("data",h=>f+=h),e.on("end",()=>{try{if(!this.scriptHost){t.writeHead(503,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"Script host not available."}));return}let h=JSON.parse(f||"{}"),g=String(h.id??"").trim();if(!g){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:"id is required."}));return}let y=this.scriptHost.stop(g);t.writeHead(200,{"Content-Type":"application/json"}),t.end(JSON.stringify(y))}catch(h){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,error:h.message||"Invalid request"}))}});return}if(e.url==="/api/client/escape"&&e.method==="POST"){try{let f=this.sendEscapePacket();t.writeHead(f.ok?200:400,{"Content-Type":"application/json"}),t.end(JSON.stringify(f))}catch(f){t.writeHead(400,{"Content-Type":"application/json"}),t.end(JSON.stringify({ok:!1,message:f.message||"Invalid request"}))}return}let a=e.url==="/"?"/index.html":e.url,l=(0,te.join)(this.publicDir,a);if(!(0,B.existsSync)(l)){t.writeHead(404),t.end("Not Found");return}let c=(0,te.extname)(l),u=_0[c]||"application/octet-stream",d=(e.headers["accept-encoding"]||"").includes("gzip"),p=l+".gz";if(d&&(0,B.existsSync)(p)){let f=(0,B.readFileSync)(p);t.writeHead(200,{"Content-Type":u,"Content-Encoding":"gzip"}),t.end(f)}else{let f=(0,B.readFileSync)(l);t.writeHead(200,{"Content-Type":u}),t.end(f)}}resetTradeSession(){this.tradeSession.active=!1,this.tradeSession.ourSlotCount=12,this.tradeSession.partnerSlotCount=12,this.tradeSession.ourOffer=[],this.tradeSession.partnerOffer=[],this.tradeSession.partnerOfferFromTradeChanged=[],this.tradeSession.partnerName=""}observeTradePacket(e){let t=String(e.name??"").toUpperCase(),n=String(e.direction??""),i=n.startsWith("S"),s=n.startsWith("C"),o=e.data&&typeof e.data=="object"?e.data:{};if(t==="TRADESTART"&&i){let a=Array.isArray(o.clientItems)?o.clientItems:[],l=Array.isArray(o.partnerItems)?o.partnerItems:[];this.tradeSession.active=!0,this.tradeSession.ourSlotCount=Fe(a.length,this.tradeSession.ourSlotCount),this.tradeSession.partnerSlotCount=Fe(l.length,this.tradeSession.partnerSlotCount),this.tradeSession.ourOffer=Te(rn(a),this.tradeSession.ourSlotCount),this.tradeSession.partnerOffer=Te(rn(l),this.tradeSession.partnerSlotCount),this.tradeSession.partnerOfferFromTradeChanged=this.tradeSession.partnerOffer.slice(),this.tradeSession.partnerName=typeof o.partnerName=="string"?o.partnerName:"";return}if(t==="TRADECHANGED"&&i){this.tradeSession.active=!0;let a=Te(o.offer,this.tradeSession.partnerSlotCount);this.tradeSession.partnerOffer=a,this.tradeSession.partnerOfferFromTradeChanged=a.slice();return}if(t==="CHANGETRADE"&&s){this.tradeSession.active=!0,this.tradeSession.ourOffer=Te(o.offer,this.tradeSession.ourSlotCount);return}if(t==="TRADEACCEPTED"&&i){this.tradeSession.active=!0,this.tradeSession.ourOffer=Te(o.clientOffer,this.tradeSession.ourSlotCount),this.tradeSession.partnerOffer=Te(o.partnerOffer,this.tradeSession.partnerSlotCount);return}(t==="TRADEDONE"&&i||t==="CANCELTRADE"&&s)&&this.resetTradeSession()}sendLabPacket(e,t){if(!this.proxy)return{ok:!1,message:"Proxy is not attached."};if(!this.currentClient||typeof this.currentClient.sendToServer!="function")return{ok:!1,message:"No active game client connection."};let n=String(e??"").trim().toUpperCase();if(!new Set(["REQUESTTRADE","CANCELTRADE","ACCEPTTRADE","CHANGETRADE","PARTYACTIONRESULT","PARTYJOINREQUEST","INVENTORYSWAP"]).has(n))return{ok:!1,message:`Packet ${n} is not enabled for Packet Lab sending.`};let s=t&&typeof t=="object"?t:{};try{let o=this.proxy.packetFactory.createByName(n);if(n==="REQUESTTRADE"){let a=String(s.name??"").trim();if(!a)return{ok:!1,message:"REQUESTTRADE requires a player name."};o.data.name=a}else if(n==="ACCEPTTRADE"){let a=Fe(this.tradeSession.ourSlotCount,12),l=Fe(this.tradeSession.partnerSlotCount,12);o.data.clientOffer=Te(this.tradeSession.ourOffer,a);let c=this.tradeSession.partnerOfferFromTradeChanged.length>0?this.tradeSession.partnerOfferFromTradeChanged:this.tradeSession.partnerOffer;o.data.partnerOffer=Te(c,l)}else if(n==="CHANGETRADE"){let a=Fe(this.tradeSession.ourSlotCount,12),l;if(Array.isArray(s.offer))l=Te(s.offer,a);else{let c=String(s.offerSlots??"").trim();l=c?Pf(c,a):Te(this.tradeSession.ourOffer,a)}o.data.offer=l,this.tradeSession.ourOffer=l.slice(),this.tradeSession.active=!0}else if(n==="CANCELTRADE")this.resetTradeSession();else if(n==="PARTYACTIONRESULT"){let a=Number(s.playerId),l=Number(s.actionId);if(!Number.isFinite(a)||a<0||a>65535)return{ok:!1,message:"PARTYACTIONRESULT requires playerId 0\u201365535 (e.g. 65535)."};if(!Number.isFinite(l)||l<0||l>255)return{ok:!1,message:"PARTYACTIONRESULT requires actionId 0\u2013255."};o.data.playerId=Math.trunc(a),o.data.actionId=Math.trunc(l),o.modified=!0}else if(n==="PARTYJOINREQUEST"){let a=Math.trunc(Number(s.partyId));if(!Number.isFinite(a)||a<1||a>4294967295)return{ok:!1,message:"PARTYJOINREQUEST requires partyId 1\u20134294967295."};let l=Math.trunc(Number(s.unknownByte));if((!Number.isFinite(l)||s.unknownByte===void 0||s.unknownByte==="")&&(l=1),l<0||l>255)return{ok:!1,message:"PARTYJOINREQUEST trailing byte must be 0\u2013255."};o.data.partyId=a>>>0,o.data.unknownByte=l,o.modified=!0}else if(n==="INVENTORYSWAP"){let a=this.currentClient,l=a.playerData,c=Math.trunc(Number(s.o1oid)),u=Math.trunc(Number(s.o1slot)),d=Math.trunc(Number(s.o1type)),p=Math.trunc(Number(s.o2oid)),f=Math.trunc(Number(s.o2slot)),h=Math.trunc(Number(s.o2type));if(!Number.isFinite(c)||!Number.isFinite(u)||!Number.isFinite(d)||!Number.isFinite(p)||!Number.isFinite(f)||!Number.isFinite(h))return{ok:!1,message:"INVENTORYSWAP requires o1oid, o1slot, o1type, o2oid, o2slot, o2type (all integers)."};o.data.time=Math.trunc(a.time),o.data.position={x:l?.pos?.x??0,y:l?.pos?.y??0},o.data.slotObject1={objectId:c,slotId:u,objectType:d},o.data.slotObject2={objectId:p,slotId:f,objectType:h},o.modified=!0}return this.currentClient.sendToServer(o),{ok:!0,packetName:n,message:`${n} sent.`,data:o.data}}catch(o){return{ok:!1,packetName:n,message:o.message||`Failed to send ${n}.`}}}sendEscapePacket(){if(!this.proxy)return{ok:!1,message:"Proxy is not attached."};if(!this.currentClient||typeof this.currentClient.sendToServer!="function")return{ok:!1,message:"No active game client connection."};try{let e=this.proxy.packetFactory.createByName("ESCAPE");return e.modified=!0,this.currentClient.sendToServer(e),{ok:!0,packetName:"ESCAPE",message:"ESCAPE sent."}}catch(e){return{ok:!1,message:e.message||"Failed to send ESCAPE."}}}broadcastMulingStatus(e){let t=JSON.stringify({type:"muling_status",status:e});for(let n of this.wss.clients)n.readyState===X.default.OPEN&&n.send(t)}handleWsConnection(e){m.log("DevServer","Dashboard client connected"),e.send(JSON.stringify({type:"plugins",data:this.pluginManager.getPlugins()})),e.send(JSON.stringify({type:"gameClient",connected:this.gameClientConnected})),e.send(JSON.stringify({type:"internalState",connected:this.internalBridge?.isConnected??!1})),this.lastUnresolvedClasses!==null&&e.send(JSON.stringify({type:"unresolvedClasses",classes:this.lastUnresolvedClasses}));let t=this.inspector.getRecent(100);e.send(JSON.stringify({type:"history",data:t}));let n=this.pluginManager.getPluginData("damage-sniffer","damageHistory");n!==void 0&&e.send(JSON.stringify({type:"pluginData",pluginId:"damage-sniffer",dataType:"damageHistory",data:n}));let i=this.pluginManager.getPluginData("damage-sniffer","damageLive");i!==void 0&&e.send(JSON.stringify({type:"pluginData",pluginId:"damage-sniffer",dataType:"damageLive",data:i}));let s=this.pluginManager.getPluginData("damage-sniffer","encounterHistory");s!==void 0&&e.send(JSON.stringify({type:"pluginData",pluginId:"damage-sniffer",dataType:"encounterHistory",data:s}));let o=this.inspector.subscribe(a=>{e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"packet",data:a}))});e.send(this.buildConfigMessage()),e.send(JSON.stringify({type:"labUpdate",unknowns:this.lab.getUnknowns()})),e.send(JSON.stringify({type:"gameUpdateStatus",status:this.gameUpdater.getStatus()})),this.autoUpdateCheckDone||(this.autoUpdateCheckDone=!0,this.gameUpdater.check()),e.send(JSON.stringify({type:"gemStatus",loggedIn:!0,gem_balance:999999,active:!0,active_plans:["free","dodge","developer","pro","elite"],next_deduction_at:null})),e.on("message",async a=>{try{let l=JSON.parse(a.toString());if(l.type==="togglePlugin"){let c=this.pluginManager.togglePlugin(l.pluginId,l.enabled);!c.ok&&e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"pluginToggleError",pluginId:l.pluginId,reason:c.reason,requiredPlan:c.requiredPlan??null})),this.broadcastPluginState(),this.scheduleAutosave()}else if(l.type==="scriptPanelEvent"){let c=String(l.scriptId??"").trim(),u=String(l.widgetId??"").trim(),d=String(l.kind??"").trim();if(!c||!this.scriptHost||d!=="click"&&d!=="change"&&d!=="closed-by-user"||d!=="closed-by-user"&&!u)return;let p={scriptId:c,widgetId:u,kind:d,value:l.value};this.scriptHost.dispatchPanelEvent(p)}else if(l.type==="requestScriptPanelSnapshots")this.sendScriptPanelSnapshots(e);else if(l.type==="updateSetting")!this.pluginManager.updateSetting(l.pluginId,l.key,l.value)&&e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"settingUpdateError",pluginId:l.pluginId,key:l.key})),this.broadcastPluginState(),this.scheduleAutosave();else if(l.type==="updatePluginHotkey"){let c=this.pluginManager.updatePluginHotkey(l.pluginId,l.hotkey);!c.ok&&e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"pluginHotkeyUpdateError",pluginId:l.pluginId,reason:c.reason,conflictPluginId:c.conflictPluginId??null})),this.broadcastPluginState(),this.syncPluginHotkeysToDll(),this.scheduleAutosave()}else if(l.type==="resetPluginSettings"){let c=this.pluginManager.resetPluginSettings(String(l.pluginId??""));e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"pluginSettingsReset",pluginId:l.pluginId,changedKeys:c})),this.broadcastPluginState(),this.scheduleAutosave()}else if(l.type==="launchGame"){let c=this.launchGame();e.send(JSON.stringify({type:"launchGameResult",...c}))}else if(l.type==="launchGameWithCredentials"){let c=String(l.email??"").trim(),u=String(l.password??""),d=String(l.serverName??"USWest").trim()||"USWest",p=l.windowRect,f;if(p&&typeof p=="object"){let j=p,F=Number(j.x),M=Number(j.y),O=Number(j.width),L=Number(j.height);[F,M,O,L].every(T=>Number.isFinite(T))&&(f={x:Math.round(F),y:Math.round(M),width:Math.round(O),height:Math.round(L)})}let h=!!l.compactWindow&&!f,g=l.accountId,y=typeof g=="string"&&g.trim()!==""?g.trim():null,b=l.accountLabel,S=typeof b=="string"&&b.trim()!==""?b.trim():null,E=!!l.isSteam,I=l.steamId,A=typeof I=="string"?I.trim():"";this.launchGameWithCredentials(c,u,d,{compactWindow:h,windowRect:f,accountId:y,accountLabel:S,isSteam:E,steamId:A}).then(j=>{e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"launchGameResult",...j}))})}else if(l.type==="probePacket"){let c=this.lab.probe(Number(l.id),String(l.spec??""));e.send(JSON.stringify({type:"probeResult",id:l.id,result:c}))}else if(l.type==="sendLabPacket"){let c=this.sendLabPacket(l.packetName,l.data);e.send(JSON.stringify({type:"labPacketSendResult",requestId:l.requestId??null,result:c}))}else if(l.type==="requestObjects")try{if(this.worldState&&this.gameData){let c=this.worldState.getObjectsForDashboard(this.gameData),u=this.gameData.getBeaconTypes(),d=JSON.stringify({type:"objectsData",...c,beaconTypes:u});e.readyState===X.default.OPEN&&e.send(d)}else{let c=JSON.stringify({type:"objectsData",portals:[],beacons:[],categories:[],beaconTypes:[]});e.readyState===X.default.OPEN&&e.send(c)}}catch(c){this.log.error("[DevServer] Error handling requestObjects:",c),e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"objectsData",portals:[],beacons:[],categories:[],beaconTypes:[]}))}else if(l.type==="requestGameWikiCatalog"){if(l.force===!0&&(this.gameWikiCatalogJson=null),e.readyState!==X.default.OPEN)return;if(!this.gameData){e.send(JSON.stringify({type:"gameWikiCatalog",objectSummaries:[],objectDetails:{},tiles:[],objectCount:0,tileCount:0,reason:"no_game_data"}));return}if(!this.gameWikiCatalogJson){let{objectSummaries:c,objectDetails:u,tiles:d}=this.gameData.getGameWikiCatalog();this.gameWikiCatalogJson=JSON.stringify({type:"gameWikiCatalog",objectSummaries:c,objectDetails:u,tiles:d,objectCount:c.length,tileCount:d.length})}e.send(this.gameWikiCatalogJson)}else if(l.type==="requestObjectXml"){if(e.readyState!==X.default.OPEN||!this.gameData)return;let c=Number(l.objectType);e.send(JSON.stringify({type:"objectXmlResult",objectType:c,rawXml:Number.isFinite(c)?this.gameData.getRawObjectXml(c)??null:null}))}else if(l.type==="requestTileXml"){if(e.readyState!==X.default.OPEN||!this.gameData)return;let c=Number(l.tileType);e.send(JSON.stringify({type:"tileXmlResult",tileType:c,rawXml:Number.isFinite(c)?this.gameData.getRawTileXml(c)??null:null}))}else if(l.type==="requestTilemap"){let c=this.getEffectivePlayerPos();if(this.worldState&&this.gameData&&c){let u=Number(l.radius??12),d=Number.isFinite(u)?Math.max(1,Math.min(30,Math.trunc(u))):12,p=this.worldState.getNearbyTilesForDashboard(this.gameData,c,d),f=this.currentClient?.playerData?.pos??null;p.groups.length===0&&f&&(Math.abs(f.x-c.x)>.01||Math.abs(f.y-c.y)>.01)&&(p=this.worldState.getNearbyTilesForDashboard(this.gameData,f,d)),e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"tilesData",...p}))}else e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"tilesData",center:{x:0,y:0},radius:12,groups:[]}))}else if(l.type==="requestNearbyPlayers")if(this.worldState&&this.gameData&&this.currentClient?.playerData){let c=this.getEffectivePlayerPos(),u=this.worldState.getNearbyPlayersForDashboard(this.gameData,c,this.currentClient.objectId);e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"nearbyPlayersData",players:u}))}else e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"nearbyPlayersData",players:[]}));else if(l.type==="requestAllPlayersRawStats"){if(e.readyState!==X.default.OPEN)return;if(this.worldState&&this.gameData){let c=this.worldState.getAllPlayersRawStatsForDashboard(this.gameData),u=this.currentClient?.objectId,d=u!=null&&Number.isFinite(Number(u))?c.filter(p=>p.objectId===u):[];e.send(JSON.stringify({type:"allPlayersRawStats",capturedAt:Date.now(),map:this.currentClient?.playerData?.mapName??null,gameId:this.currentClient?.state?.gameId??null,selfObjectId:this.currentClient?.objectId??null,players:d}))}else e.send(JSON.stringify({type:"allPlayersRawStats",capturedAt:Date.now(),map:null,gameId:null,selfObjectId:null,players:[]}))}else if(l.type==="requestVaultData"){if(e.readyState!==X.default.OPEN)return;let c=this.currentClient?qt(this.currentClient):null;c?e.send(JSON.stringify({type:"vaultData",capturedAt:c.capturedAt,map:this.currentClient?.playerData?.mapName??null,gameId:this.currentClient?.state?.gameId??null,lastVaultUpdate:c.lastVaultUpdate,vault:{objectId:c.vault.objectId,contents:c.vault.contents},material:{objectId:c.material.objectId,contents:c.material.contents},gift:{objectId:c.gift.objectId,contents:c.gift.contents},potion:{objectId:c.potion.objectId,contents:c.potion.contents},seasonalSpoils:{objectId:c.seasonalSpoils.objectId,contents:c.seasonalSpoils.contents},vaultUpgradeCost:c.vaultUpgradeCost,materialUpgradeCost:c.materialUpgradeCost,seasonalSpoilUpgradeCost:c.seasonalSpoilUpgradeCost,potionUpgradeCost:c.potionUpgradeCost,currentPotionMax:c.currentPotionMax,nextPotionMax:c.nextPotionMax,vaultChestEnchants:c.vaultChestEnchants,giftChestEnchants:c.giftChestEnchants,spoilsChestEnchants:c.spoilsChestEnchants})):e.send(JSON.stringify({type:"vaultData",error:"Vault data not available \u2014 enter the vault first.",capturedAt:null}))}else if(l.type==="requestNearbyPlayerDebug"){let c=Number(l.objectId);if(!Number.isFinite(c))return;if(this.worldState&&this.gameData&&this.currentClient?.playerData){let u=this.currentClient.playerData.pos??null,d=this.worldState.getNearbyPlayerDebugForDashboard(this.gameData,u,c);e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"nearbyPlayerDebug",objectId:c,debug:d}))}else e.readyState===X.default.OPEN&&e.send(JSON.stringify({type:"nearbyPlayerDebug",objectId:c,debug:null}))}else if(l.type==="checkGameUpdate")this.gameUpdater.check();else if(l.type==="performGameUpdate")this.gameUpdater.update();else if(l.type==="updateRotmgPath"){let c=(l.path||"").trim();c?this.config.rotmgPath=c:delete this.config.rotmgPath,this.saveConfig(),this.broadcastConfig()}else if(l.type==="updateRotmgExtractorGameDataPath"){let c=String(l.path??"").trim();c?this.config.rotmgExtractorGameDataPath=c:delete this.config.rotmgExtractorGameDataPath,this.wikiSprites.resetCache(),this.saveConfig(),this.broadcastConfig()}else l.type==="updateSingleClientOnly"&&(this.config.singleClientOnly=l.value!==!1,this.broadcastConfig())}catch{}}),e.on("close",()=>{o(),m.log("DevServer","Dashboard client disconnected")})}broadcastPluginState(){let e=JSON.stringify({type:"plugins",data:this.pluginManager.getPlugins()});for(let t of this.wss.clients)t.readyState===X.default.OPEN&&t.send(e)}syncPluginHotkeysToDll(){try{let t=this.pluginManager.getPluginHotkeyBindings().map(n=>`${n.pluginId}=${n.hotkey}`).join(";");this.internalBridge?.setFeature("pluginToggleHotkeys",t)}catch(e){m.warn("DevServer",`plugin hotkey sync failed: ${e.message}`)}}broadcastDllMessage(e){e?.type==="hotkeyEvent"&&this.applyInternalHotkeyEvent(e)&&(this.broadcastPluginState(),this.syncPluginHotkeysToDll(),this.scheduleAutosave())}applyInternalHotkeyEvent(e){let t=String(e?.pluginId||""),n=String(e?.action||""),i=e?.value===!0;return t==="socket"&&n==="toggle"?this.pluginManager.updateSetting("socket","toggle",!0):t==="player-noclip"&&n==="noclipEnabled"?this.pluginManager.updateSetting("player-noclip","noclipEnabled",i):n==="togglePlugin"?this.pluginManager.togglePluginByHotkey(t).ok:(t==="ghostHit"&&this.handleGhostHitEvent(n),!1)}handleGhostHitEvent(e){try{if(!this.currentClient||!this.proxy)return;let t=e.indexOf(":");if(t<=0)return;let n=Number(e.slice(0,t)),i=Number(e.slice(t+1));if(!Number.isFinite(n)||!Number.isFinite(i))return;let s=this.proxy.packetFactory.createByName("PLAYERHIT");if(!s)return;s.data={bulletId:i,objectId:n},s.modified=!0,this.currentClient.sendToServer(s)}catch(t){m.warn("DevServer",`ghostHit dispatch failed: ${t.message}`)}}setScriptHost(e){this.scriptHost=e}broadcastScriptsState(){let e=this.scriptHost?.list()??[],t=this.scriptHost?.getScriptsDir()??null,n=JSON.stringify({type:"scriptsState",scripts:e,dir:t});for(let i of this.wss.clients)i.readyState===X.default.OPEN&&i.send(n)}broadcastScriptLog(e,t,n="info"){let i=JSON.stringify({type:"scriptLog",id:e,line:t,level:n});for(let s of this.wss.clients)s.readyState===X.default.OPEN&&s.send(i)}broadcastScriptPanelMessage(e){let t=JSON.stringify(e);for(let n of this.wss.clients)n.readyState===X.default.OPEN&&n.send(t)}sendScriptPanelSnapshots(e){if(this.scriptHost)for(let t of this.scriptHost.panelScriptIds()){let n=this.scriptHost.getPanelSnapshot(t);if(!n)continue;let i={type:"scriptPanelState",scriptId:t,def:n.def,isOpen:n.isOpen};e.readyState===X.default.OPEN&&e.send(JSON.stringify(i))}}};var je=require("fs"),Wt=require("path"),vb=require("url"),xb=require("crypto");jn();Q();var La="winhttp.dll",Tb="winhttp.dll.bak";function Pb(r){try{return(0,xb.createHash)("sha256").update((0,je.readFileSync)(r)).digest("hex")}catch{return null}}var $a=class{gamePath=null;dllTarget="";backupPath="";installed=!1;assetsDir;constructor(e=null,t){if(this.preferredGamePath=e,t)this.assetsDir=t;else{let n=(0,Wt.dirname)((0,vb.fileURLToPath)(__importMetaUrl));this.assetsDir=(0,Wt.resolve)(n,"..","..","assets")}}preferredGamePath;isValidExaltDir(e){let t=String(e||"").trim();if(!t)return!1;try{return(0,je.existsSync)(t)&&(0,je.existsSync)((0,Wt.join)(t,"RotMG Exalt.exe"))}catch{return!1}}resolveGamePath(){return this.isValidExaltDir(this.preferredGamePath)?(m.log("GameHooker",`Using configured Exalt path: ${this.preferredGamePath}`),this.preferredGamePath):bt.find()}async install(){if(this.gamePath=this.resolveGamePath(),!this.gamePath)return m.error("GameHooker","Cannot install hook: Exalt directory not found."),m.error("GameHooker","The proxy will still run, but you must manually redirect connections to 127.0.0.1:2050."),!1;if(process.platform!=="win32"||process.env.REALM_ENGINE_SKIP_WINHTTP_INSTALL==="1"){let t=(0,Wt.join)(this.gamePath,La);if((0,je.existsSync)(t))try{(0,je.unlinkSync)(t)}catch{}return this.installed=!0,!0}let e=(0,Wt.join)(this.assetsDir,La);if(!(0,je.existsSync)(e))return m.error("GameHooker",`Hook DLL not found at ${e}`),m.error("GameHooker","Run native/build.bat from a Developer Command Prompt to compile it."),m.error("GameHooker","The proxy will still run, but connections won't be automatically redirected."),!1;if(this.dllTarget=(0,Wt.join)(this.gamePath,La),this.backupPath=(0,Wt.join)(this.gamePath,Tb),(0,je.existsSync)(this.dllTarget)){try{let{statSync:t}=await import("fs"),n=t(e).size,i=t(this.dllTarget).size,s=Pb(e),o=Pb(this.dllTarget);if(s!==null&&o!==null&&s===o)return m.log("GameHooker","Hook DLL already installed (hash match), skipping."),this.installed=!0,!0}catch{}m.log("GameHooker",`Backing up existing ${La} to ${Tb}`);try{(0,je.renameSync)(this.dllTarget,this.backupPath)}catch(t){return m.error("GameHooker",`Failed to backup existing DLL: ${t}`),m.error("GameHooker","Is the game currently running? Close it and try again."),!1}}try{return(0,je.copyFileSync)(e,this.dllTarget),this.installed=!0,m.log("GameHooker",`Hook DLL installed to ${this.dllTarget}`),m.log("GameHooker","Game will redirect port 2050 connections to the proxy."),!0}catch(t){return m.error("GameHooker",`Failed to install hook DLL: ${t}`),!1}}async uninstall(){if(!(!this.installed||!this.gamePath))try{(0,je.existsSync)(this.dllTarget)&&((0,je.unlinkSync)(this.dllTarget),m.log("GameHooker",`Removed hook DLL from ${this.dllTarget}`)),(0,je.existsSync)(this.backupPath)&&((0,je.renameSync)(this.backupPath,this.dllTarget),m.log("GameHooker","Restored original winhttp.dll from backup.")),this.installed=!1}catch(e){m.error("GameHooker",`Error during uninstall: ${e}`)}}get isInstalled(){return this.installed}get gameDirectory(){return this.gamePath}};jn();var Nb=require("net"),ir=require("crypto");Q();var Ab=require("events");var Cb="__LFG_dllThreatBus_v1";function I0(){let r=globalThis,e=r[Cb];return e||(e={threats:[],ground:{rawDamage:0,tHitMs:-1,events:[]},at:0},r[Cb]=e),e}function kb(r,e={rawDamage:0,tHitMs:-1,events:[]}){let t=I0();t.threats=r,t.ground=e,t.at=Date.now()}function _b(r){let e=[],t={rawDamage:0,tHitMs:-1,events:[]};if(!r)return{threats:e,ground:t};let n=r,i=r.indexOf(";");if(i>=0){let s=r.slice(0,i).split("|");for(let o=1;o<s.length;o++){let a=s[o].split(":");if(a.length!==2)continue;let l=Number(a[0]),c=Number(a[1]);!Number.isFinite(l)||!Number.isFinite(c)||l<=0||(t.events.length===0&&(t.rawDamage=l,t.tHitMs=c),t.events.push({rawDamage:l,tHitMs:c}))}}if(i>=0&&(n=r.slice(i+1)),!n)return{threats:e,ground:t};for(let s of n.split(",")){let o=s.split(":");if(o.length!==5)continue;let a=Number(o[0]),l=Number(o[1]),c=Number(o[2]),u=Number(o[3]);!Number.isFinite(a)||!Number.isFinite(l)||!Number.isFinite(c)||!Number.isFinite(u)||e.push({attackerObjId:a,bulletId:l,tHitMs:c,fallbackDamage:u,fallbackArmorPiercing:o[4]==="1"})}return{threats:e,ground:t}}var Ed=(()=>{try{let e=String("\\\\.\\pipe\\lfg-dev-bridge"||"").trim();if(e.startsWith("\\\\.\\pipe\\"))return e}catch{}return"\\\\.\\pipe\\lfg-dev-bridge"})();function R0(){return process.platform==="win32"}var N0=5e3,A0=3,tD=process.env.REALM_ENGINE_PROD==="1",O0=/^[0-9a-f]{64}$/i;function M0(){return"47eb249907eb980c851fe3a7bdb56a244244bb7d465572b556e810df6827ecfb"}var qi=M0();function Ib(r){if(!qi)return null;try{return(0,ir.createHmac)("sha256",Buffer.from(qi,"hex")).update(r).digest("hex")}catch{return null}}function Vi(){return(0,ir.randomBytes)(32).toString("hex")}function Kr(r){return typeof r=="string"&&O0.test(r)}function D0(r,e,t,n){if(!qi||!/^[1-9]\d*$/.test(n)||!Kr(r)||!Kr(e))return null;try{return(0,ir.createHmac)("sha256",Buffer.from(qi,"hex")).update(`${r}|${e}|${t}|${n}|${Ed}|session-v2`).digest("hex")}catch{return null}}function Rb(r,e,t,n){if(!Kr(r))return null;try{return(0,ir.createHmac)("sha256",Buffer.from(r,"hex")).update(`${e.toString()}|${t}|${n}`).digest("hex")}catch{return null}}function L0(r){if(typeof r!="string"&&typeof r!="number"&&typeof r!="bigint")return null;let e=String(r);if(!/^\d+$/.test(e))return null;try{return BigInt(e)}catch{return null}}function $0(r){if(!(r.alive===!0))return"alive:false";let t=typeof r.hp=="number"&&Number.isFinite(r.hp)?r.hp:null,n=typeof r.maxHp=="number"&&Number.isFinite(r.maxHp)?r.maxHp:null,i=typeof r.posX=="number"&&Number.isFinite(r.posX)?r.posX:null,s=typeof r.posY=="number"&&Number.isFinite(r.posY)?r.posY:null;if(t===null||n===null||i===null||s===null)return null;let o=`alive:true|hp:${t}|maxHp:${n}|posX:${i.toFixed(3)}|posY:${s.toFixed(3)}`,a=typeof r.def=="number"&&Number.isFinite(r.def)?Math.trunc(r.def):null;return a!==null&&(o+=`|def:${a}`),o}function B0(r){let e=typeof r.pluginId=="string"?r.pluginId:null,t=typeof r.action=="string"?r.action:null,n=typeof r.value=="boolean"?r.value:null;return!e||!t||n===null?null:`${e}|${t}|${n?"true":"false"}`}var Ba=class extends Ab.EventEmitter{server=null;socket=null;userId;authenticated=!1;stopped=!1;heartbeatTimer=null;pendingChallenge=null;serverChallenge=null;missCount=0;sessionKey=null;nextClientSeq=1n;lastDllSeq=0n;lastDllDefense=null;readBuf=Buffer.alloc(0);lastSentFeatures=new Map;loggedFirstPipeData=!1;warnedNonWindowsPipe=!1;constructor(e){super(),this.userId=e}get isConnected(){return this.authenticated&&this.pipeTransportReady()}get currentUserId(){return this.userId}pipeTransportReady(){return this.socket!==null&&!this.socket.destroyed}bridgeAuthUserId(){let e=String(this.userId??"").trim();if(e.length===0)return"anonymous";if(e.length>96)return(0,ir.createHash)("sha256").update(e,"utf8").digest("hex");for(let t=0;t<e.length;t++){let n=e.charCodeAt(t);if(!(n>=97&&n<=122||n>=65&&n<=90||n>=48&&n<=57||n===45||n===95||n===46))return(0,ir.createHash)("sha256").update(e,"utf8").digest("hex")}return e}setUserId(e){this.userId=e,this.socket&&this.disconnect()}listen(){if(this.stopped||this.server)return;if(!qi){m.error("InternalBridge","Handshake key invalid for production; bridge disabled."),this.stopped=!0;return}let e=R0(),t=(0,Nb.createServer)(n=>{this.socket&&!this.socket.destroyed&&(m.warn("InternalBridge","DLL reconnected while session active \u2014 replacing existing session."),this.disconnect()),this.acceptConnection(n)});if(t.on("error",n=>{m.error("InternalBridge",`Bridge server error: ${n.message}`)}),e)t.listen(Ed,()=>{m.log("InternalBridge",`Pipe server listening on ${Ed} \u2014 waiting for DLL to connect.`)});else{let i="127.0.0.1";t.listen(4242,i,()=>{m.log("InternalBridge",`TCP bridge server listening on ${i}:4242 \u2014 waiting for DLL to connect.`)})}this.server=t}stop(){this.stopped=!0,this.disconnect(),this.server&&(this.server.close(),this.server=null)}send(e){if(!this.pipeTransportReady()||!this.authenticated)return;let t=this.signOutgoingMessage(e);if(!t){m.warn("InternalBridge",`Dropped unsigned command type: ${e.type}`);return}this.writeMessage(JSON.stringify(t))}setFeature(e,t){let i={type:"setFeature",key:e,valueType:typeof t=="boolean"?"b":typeof t=="number"?"n":"s",value:t};e!=="internalUnloadDll"&&this.lastSentFeatures.set(e,{...i}),this.send(i)}getNextSeq(){let e=this.nextClientSeq;return this.nextClientSeq+=1n,e}getSignedFields(e){switch(e.type){case"heartbeat":{let t=e.nonce;return Kr(t)?{payload:t}:null}case"heartbeatResp":{let t=e.response;return Kr(t)?{payload:t}:null}case"clearTiles":return{payload:""};case"noWalkInit":{let t=typeof e.types=="string"?e.types:null;return t===null?null:{payload:t}}case"tileUpdate":{let t=typeof e.tiles=="string"?e.tiles:null;return t===null?null:{payload:t}}case"setFeature":{let t=typeof e.key=="string"?e.key:null,n=e.valueType==="b"||e.valueType==="n"||e.valueType==="s"?e.valueType:null;if(!t||!n)return null;let i=e.value;return n==="b"?typeof i!="boolean"?null:{payload:`${t}|b|${i?"true":"false"}`,valueType:"b"}:n==="n"?typeof i!="number"||!Number.isFinite(i)?null:{payload:`${t}|n|${i.toString()}`,valueType:"n"}:typeof i!="string"?null:{payload:`${t}|s|${i}`,valueType:"s"}}default:return null}}signOutgoingMessage(e){if(!this.sessionKey)return null;let t=this.getSignedFields(e);if(!t)return null;let n=this.getNextSeq(),i=Rb(this.sessionKey,n,e.type,t.payload);return i?{...e,seq:n.toString(),mac:i}:null}verifyIncomingSignedMessage(e,t){if(!this.sessionKey)return!1;let n=L0(e.seq),i=typeof e.mac=="string"?e.mac:null;if(n===null||n<=this.lastDllSeq||!i||!Kr(i))return!1;let s=Rb(this.sessionKey,n,e.type,t);return!s||s!==i.toLowerCase()?!1:(this.lastDllSeq=n,!0)}acceptConnection(e){this.socket=e,this.authenticated=!1,this.readBuf=Buffer.alloc(0),this.loggedFirstPipeData=!1,m.log("InternalBridge","DLL connected \u2014 waiting for hello..."),e.on("data",t=>{this.readBuf=Buffer.concat([this.readBuf,t]),!this.loggedFirstPipeData&&t.length>0&&(this.loggedFirstPipeData=!0,m.debug("proxy","InternalBridge","[DIAG] first pipe data received from DLL")),this.processMessages()}),e.on("error",t=>{m.error("InternalBridge",`Pipe error: ${t.message}`),this.socket===e&&(this.socket=null)}),e.on("close",()=>{m.log("InternalBridge","DLL pipe closed."),this.socket===e&&(this.socket=null),this.cleanup()})}disconnect(){this.cleanup(),this.socket&&(this.socket.destroy(),this.socket=null)}cleanup(){let e=this.authenticated;this.authenticated=!1,this.pendingChallenge=null,this.serverChallenge=null,this.sessionKey=null,this.nextClientSeq=1n,this.lastDllSeq=0n,this.missCount=0,this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null),e&&this.emit("disconnected")}writeMessage(e){if(!this.socket||this.socket.destroyed)return!1;let t=Buffer.from(e,"utf8"),n=Buffer.alloc(4);return n.writeUInt32LE(t.length,0),this.socket.write(Buffer.concat([n,t])),!0}processMessages(){for(;this.readBuf.length>=4;){let e=this.readBuf.readUInt32LE(0);if(e===0||e>1024*1024){m.error("InternalBridge",`Invalid message length: ${e}`),this.disconnect();return}if(this.readBuf.length<4+e)break;let t=this.readBuf.subarray(4,4+e).toString("utf8");this.readBuf=this.readBuf.subarray(4+e);try{let n=JSON.parse(t);this.handleMessage(n)}catch{m.error("InternalBridge",`Bad JSON from DLL: ${t.slice(0,100)}`)}}}handleMessage(e){switch(e.type){case"hello":this.handleHello(e);break;case"authResult":this.handleAuthResult(e);break;case"heartbeat":this.handleHeartbeat(e);break;case"heartbeatResp":this.handleHeartbeatResp(e);break;case"player":this.handlePlayer(e);break;case"hotkeyEvent":this.handleHotkeyEvent(e);break;case"unresolvedClasses":this.handleUnresolvedClasses(e);break;case"threats":this.handleThreats(e);break;default:if(this.authenticated){let t=typeof e.sigPayload=="string"?e.sigPayload:null;if(!t||!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge",`Dropped unsigned/invalid DLL message type: ${e.type}`);return}}this.emit("message",e);break}}handleHello(e){let t=Number(e.version??0),n=String(e.protocol??""),i=e.challenge;if(t!==3||n!=="bridge-v3"||!Kr(i)){m.error("InternalBridge","Hello missing challenge or wrong protocol/version"),this.disconnect();return}let s=this.bridgeAuthUserId(),o=i+s,a=Ib(o);if(!a){m.error("InternalBridge","Unable to compute auth HMAC"),this.disconnect();return}let l=Vi();this.writeMessage(JSON.stringify({type:"auth",protocol:"bridge-v3",clientPid:String(process.pid),userId:s,response:a,challenge:l})),this.serverChallenge=i,this.pendingChallenge=l}handleAuthResult(e){let t=this.serverChallenge??Vi(),n=this.pendingChallenge??Vi(),i=D0(t,n,this.bridgeAuthUserId(),String(process.pid));this.authenticated=!0,this.sessionKey=i??"0".repeat(64),this.nextClientSeq=1n,this.lastDllSeq=0n,this.serverChallenge=null,this.pendingChallenge=null,this.missCount=0,m.log("InternalBridge",`Authenticated with DLL (bridgeUserId=${this.bridgeAuthUserId()})`),this.emit("authenticated"),this.replayAllFeatureState(),this.startHeartbeat()}replayAllFeatureState(){if(!(!this.socket||!this.authenticated||!this.sessionKey))for(let e of this.lastSentFeatures.values()){let t=this.signOutgoingMessage(e);if(!t){m.warn("InternalBridge",`Skipped feature replay for key: ${e.key}`);continue}this.writeMessage(JSON.stringify(t))}}handleHeartbeat(e){let t=typeof e.nonce=="string"?e.nonce:Vi(),n=Ib(t)??"0".repeat(64),i=this.signOutgoingMessage({type:"heartbeatResp",response:n});i&&this.writeMessage(JSON.stringify(i))}handleHeartbeatResp(e){this.missCount=0,this.pendingChallenge=null}handlePlayer(e){let t=$0(e);if(!t||!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge","Dropped unsigned/invalid player message");return}let n=typeof e.def=="number"&&Number.isFinite(e.def)?Math.trunc(e.def):null;this.lastDllDefense=e.alive===!0?n:null,this.emit("message",e)}getDllDefense(){return this.lastDllDefense}handleHotkeyEvent(e){let t=B0(e);if(!t||!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge","Dropped unsigned/invalid hotkey event");return}this.emit("message",e)}handleThreats(e){let t=typeof e.threats=="string"?e.threats:"";if(!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge","Dropped unsigned/invalid threats message");return}{let n=_b(t);kb(n.threats,n.ground)}}handleUnresolvedClasses(e){let t=typeof e.classes=="string"?e.classes:"";if(!this.verifyIncomingSignedMessage(e,t)){m.warn("InternalBridge","Dropped unsigned unresolvedClasses message");return}let n=t?t.split(",").filter(Boolean):[];this.emit("unresolvedClasses",n)}startHeartbeat(){this.heartbeatTimer&&clearInterval(this.heartbeatTimer),this.heartbeatTimer=setInterval(()=>{if(!this.authenticated||!this.socket)return;if(this.pendingChallenge&&(this.missCount++,this.missCount>=A0)){m.error("InternalBridge",`${this.missCount} heartbeat misses \u2014 disconnecting`),this.disconnect();return}let e=Vi();this.pendingChallenge=e;let t=this.signOutgoingMessage({type:"heartbeat",nonce:e});if(!t){this.disconnect();return}this.writeMessage(JSON.stringify(t))},N0)}};Q();Iu();var pe=require("fs"),le=require("path"),Mb=require("os"),Db=require("url");Q();var j0="sdk-version.txt";function F0(){return process.env.REALM_ENGINE_APP_ROOT?(0,le.resolve)(process.env.REALM_ENGINE_APP_ROOT):(0,le.resolve)((0,le.dirname)((0,Db.fileURLToPath)(__importMetaUrl)),"..","..")}function H0(){let r=process.resourcesPath,e=[r?(0,le.join)(r,"sdk"):"",process.env.REALM_ENGINE_ROOT?(0,le.join)((0,le.resolve)(process.env.REALM_ENGINE_ROOT),"sdk"):"",(0,le.join)(F0(),"packages","sdk")].filter(Boolean);for(let t of e)if((0,pe.existsSync)((0,le.join)(t,"package.json")))return t;return null}function Lb(r){try{let e=JSON.parse((0,pe.readFileSync)((0,le.join)(r,"package.json"),"utf8"));return String(e.version??"0.0.0")}catch{return"0.0.0"}}function Ob(r){try{return(0,pe.readFileSync)(r,"utf8")}catch{return null}}function W0(r,e,t){return!(0,pe.existsSync)((0,le.join)(e,"package.json"))||!(0,pe.existsSync)((0,le.join)(e,"dist","index.js"))||!(0,pe.existsSync)((0,le.join)(e,"dist","types","index.d.ts"))||Lb(e)!==t?!1:[(0,le.join)("dist","index.js"),(0,le.join)("dist","ui","Panel.js"),(0,le.join)("dist","types","ui","Panel.d.ts"),(0,le.join)("src","ui","Panel.ts")].every(i=>{let s=Ob((0,le.join)(r,i)),o=Ob((0,le.join)(e,i));return s!=null&&s===o})}function G0(r,e){(0,pe.existsSync)(e)&&(0,pe.rmSync)(e,{recursive:!0,force:!0}),(0,pe.mkdirSync)(e,{recursive:!0}),(0,pe.cpSync)(r,e,{recursive:!0})}function U0(r){let e=(0,le.join)(r,"Scripts"),t=[(0,le.join)(e,"node_modules","@realmengine","sdk")];if(!(0,pe.existsSync)(e))return t;try{for(let n of(0,pe.readdirSync)(e,{withFileTypes:!0})){if(!n.isDirectory()||n.name==="node_modules"||n.name.startsWith("."))continue;let i=(0,le.join)(e,n.name,"node_modules","@realmengine","sdk");(0,pe.existsSync)(i)&&t.push(i)}}catch{}return t}function V0(r){try{return(0,pe.readdirSync)(r,{recursive:!0}).filter(e=>typeof e=="string").map(e=>String(e))}catch{return[]}}function $b(){let r=process.env.USERPROFILE||(0,Mb.homedir)(),e=(0,le.join)(r,"Documents","Realmengine"),t=(0,le.join)(e,"node_modules","@realmengine","sdk"),n=(0,le.join)(e,j0),i=H0();if(!i){m.warn("SDK","Packaged SDK not found; cannot deploy to Documents.");return}let s=Lb(i),o=(0,pe.existsSync)(n)?(0,pe.readFileSync)(n,"utf8").trim():"none",l=Array.from(new Set([t,...U0(e)])).filter(c=>!W0(i,c,s));if(o===s&&l.length===0){m.log("SDK",`v${s} already installed in Documents (skipping deploy).`);return}m.log("SDK",`Deploying SDK v${s} to Documents (installed: ${o}; stale copies: ${l.length})...`);try{for(let u of l)G0(i,u);(0,pe.mkdirSync)(e,{recursive:!0}),(0,pe.writeFileSync)(n,s);let c=V0(t);m.log("SDK",`SDK v${s} deployed. Updated ${l.length} location(s). Files: ${c.join(", ")}`)}catch(c){m.warn("SDK",`SDK deploy failed: ${c.message}`)}}var Mn,Dn,Ln;function Td(r){try{let t=String((r==="packet"?`{
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
`)||"").trim();return t||null}catch{return null}}function Bb(){if(Mn!==void 0)return Mn;let r=Td("packet");if(!r)return Mn=null,null;try{return Mn=JSON.parse(r),Mn}catch{return Mn=null,null}}function jb(){if(Dn!==void 0)return Dn;let r=Td("stat");if(!r)return Dn=null,null;try{return Dn=JSON.parse(r),Dn}catch{return Dn=null,null}}function Fb(){if(Ln!==void 0)return Ln;let r=Td("servers");if(!r)return Ln=null,null;try{return Ln=JSON.parse(r),Ln}catch{return Ln=null,null}}var $n=require("fs"),ja=require("path");function Fa(){let r=String(process.env.REALM_ENGINE_USER_CONFIG_PATH||"").trim();return r?(0,ja.resolve)(r):null}function Hb(r){return Fa()??(0,ja.resolve)(r,"data","config.json")}function Wb(r){let e=(0,ja.resolve)(r,"data","config.json"),t={};if((0,$n.existsSync)(e))try{t={...t,...JSON.parse((0,$n.readFileSync)(e,"utf8"))}}catch{}let n=Fa();if(n&&(0,$n.existsSync)(n))try{t={...t,...JSON.parse((0,$n.readFileSync)(n,"utf8"))}}catch{}return t}function Pd(r){return r===!0||r==="true"||r===1}var Ha=(0,Vb.join)((0,qb.tmpdir)(),"realm-engine-proxy.log");function Jb(r,e){let t=new Date().toISOString().slice(11,23),n=e instanceof Error?e:new Error(String(e)),i=`[${t}] [CRASH] ${r}: ${n.message}
${n.stack??""}
`;try{(0,Ki.appendFileSync)(Ha,i)}catch{}try{console.error(i)}catch{}}process.on("uncaughtException",r=>Jb("uncaughtException",r));process.on("unhandledRejection",r=>Jb("unhandledRejection",r));process.on("exit",r=>{let t=`[${new Date().toISOString().slice(11,23)}] [EXIT] process.on('exit') code=${r}
`;try{(0,Ki.appendFileSync)(Ha,t)}catch{}});for(let r of["SIGINT","SIGTERM","SIGHUP","SIGBREAK","SIGABRT"])try{process.on(r,()=>{let t=`[${new Date().toISOString().slice(11,23)}] [EXIT] received signal ${r}
`;try{(0,Ki.appendFileSync)(Ha,t)}catch{}})}catch{}process.send&&process.on("disconnect",()=>{let e=`[${new Date().toISOString().slice(11,23)}] [EXIT] IPC channel disconnected from parent
`;try{(0,Ki.appendFileSync)(Ha,e)}catch{}});var Gb=process.env.REALM_ENGINE_PROD==="1",gt=process.env.REALM_ENGINE_ROOT?(0,ae.resolve)(process.env.REALM_ENGINE_ROOT):(0,ae.resolve)((0,ae.dirname)((0,zb.fileURLToPath)(__importMetaUrl)),".."),Ji=process.env.REALM_ENGINE_APP_ROOT?(0,ae.resolve)(process.env.REALM_ENGINE_APP_ROOT):gt,q0=(0,ae.resolve)(gt,"data","config.json");function Ub(r){let e=String(r||"").trim();if(!e||!(0,ye.existsSync)(e))return null;try{let t=(0,ye.statSync)(e);if(t.isDirectory()){let n=(0,ae.resolve)(e,"version.dll");return(0,ye.existsSync)(n)?n:null}if(t.isFile())return e}catch{return null}return null}function J0(){return[(0,ae.resolve)(Ji,"..","internal","x64","Debug","version.dll"),(0,ae.resolve)(Ji,"..","internal","x64","Release","version.dll"),(0,ae.resolve)(Ji,"..","DebugInternal","x64","Debug","version.dll"),(0,ae.resolve)(Ji,"..","DebugInternal","x64","Release","version.dll")].find(e=>(0,ye.existsSync)(e))??null}function K0(){let r={rotmgPath:null,internalVersionDllPath:null,skipWinhttpInstall:!1,skipVersionDllDeploy:!1};try{let e=Wb(gt),t=String(e?.rotmgPath||"").trim()||null,n=String(e?.internalVersionDllPath||"").trim()||null;return{rotmgPath:t,internalVersionDllPath:n,skipWinhttpInstall:Pd(e?.skipWinhttpInstall),skipVersionDllDeploy:Pd(e?.skipVersionDllDeploy)}}catch(e){return m.warn("Main",`Failed to read config.json: ${e.message}`),r}}async function z0(){m.log("Main","RotMG MITM Proxy starting...");let e=K0(),t=Hb(gt),n=Fa();m.log("Main",`config write: ${t}${n?` (overlay merges on ${n})`:""}; bundled defaults: ${q0}; skipWinhttp=${e.skipWinhttpInstall} skipVersion=${e.skipVersionDllDeploy}`),e.skipWinhttpInstall?process.env.REALM_ENGINE_SKIP_WINHTTP_INSTALL="1":delete process.env.REALM_ENGINE_SKIP_WINHTTP_INSTALL,e.skipVersionDllDeploy?process.env.REALM_ENGINE_SKIP_VERSION_DLL_DEPLOY="1":delete process.env.REALM_ENGINE_SKIP_VERSION_DLL_DEPLOY;let i=e.rotmgPath,s=(0,ae.resolve)(gt,"assets"),o=new $a(i,s),a=await o.install();a||(m.warn("Main","Game hook not installed - see warnings above."),m.warn("Main","Proxy will still run, but game must be manually pointed to 127.0.0.1:2050."));let l="none";if(o.gameDirectory)if(process.env.REALM_ENGINE_SKIP_VERSION_DLL_DEPLOY==="1")m.warn("Main","Skipping version.dll deploy (REALM_ENGINE_SKIP_VERSION_DLL_DEPLOY=1). Delete Production\\version.dll yourself when testing without the internal DLL."),l="skipped_env";else try{let q=(0,ae.resolve)(o.gameDirectory,"version.dll"),_e=!1,Je=J0(),Ie=Ub(String(process.env.REALM_ENGINE_INTERNAL_VERSION_DLL||""));if(Ie)try{(0,ye.copyFileSync)(Ie,q),_e=!0,l="env_override",m.log("Main","Internal DLL deployed from REALM_ENGINE_INTERNAL_VERSION_DLL.")}catch(Er){m.warn("Main",`REALM_ENGINE_INTERNAL_VERSION_DLL copy failed: ${Er.message}`)}let H=e.internalVersionDllPath?Ub(e.internalVersionDllPath):null;if(!_e&&H)try{(0,ye.copyFileSync)(H,q),_e=!0,l="config_override",m.log("Main","Internal DLL deployed from data/config.json internalVersionDllPath.")}catch(Er){m.warn("Main",`internalVersionDllPath copy failed: ${Er.message}`)}let yt=(0,ae.resolve)(s,"version.dll");if(!_e&&(0,ye.existsSync)(yt))try{(0,ye.copyFileSync)(yt,q),_e=!0,l="assets_dll",m.log("Main","Internal DLL deployed from assets/version.dll.")}catch(Er){m.warn("Main",`assets/version.dll copy failed: ${Er.message}`)}if(!_e&&Je)try{(0,ye.copyFileSync)(Je,q),_e=!0,l="dev_copy"}catch{}_e?m.log("Main",`Internal DLL deployed to ${q}`):m.warn("Main","Internal DLL not found (no assets/version.dll and no local internal build). DLL features unavailable.")}catch(q){l="error",m.warn("Main",`Internal DLL deployment failed: ${q.message}`)}let c=o.gameDirectory;if(!i&&c)try{let V=c,q=bt.findAll().filter(_e=>_e&&_e!==V);for(let _e of q){for(let Je of["winhttp.dll","version.dll"]){let Ie=(0,ae.resolve)(V,Je);if((0,ye.existsSync)(Ie))try{(0,ye.copyFileSync)(Ie,(0,ae.resolve)(_e,Je))}catch(H){m.warn("Main",`Could not mirror ${Je} into ${_e}: ${H.message} (is the game running there?)`)}}m.log("Main",`Mirrored hooks into additional install${bt.isSteamInstall(_e)?" (Steam)":""}: ${_e}`)}q.length===0&&m.log("Main",`One Exalt install detected${bt.isSteamInstall(V)?" (Steam)":""}: ${V}`)}catch(V){m.warn("Main",`Hook mirror step failed: ${V.message}`)}let u=Bb(),d=jb(),p=(0,ae.resolve)(gt,"data","packet-definitions.json"),f=(0,ae.resolve)(gt,"data","stat-types.json"),h=new ts(u??p,d??f),g=new Zi(h);g.setMaxListeners(100);let y=(0,ae.resolve)(gt,"data"),b=(0,ae.resolve)(gt,"data","objects.xml"),S=(0,ae.resolve)(gt,"data","tiles.xml"),E=new wo;try{E.load(b)}catch(V){m.warn("Main",`Failed to load objects.xml: ${V.message}`)}try{E.loadTiles(S)}catch(V){m.warn("Main",`Failed to load tiles.xml: ${V.message} (run: npm run download-game-xml -- --dir ./data)`)}let I=new os;I.attach(g);let A=new yo;A.attach(g);let j=new bo(E,A);j.attach(g);let F=new as;F.attach(g),new ns().attach(g),Bd(g,y,Fb()),m.isPacketDebugEnabled()&&(g.on("serverPacket",(V,q)=>{!["NEWTICK","PING","UNKNOWN_11"].includes(q.name)&&!q.name.startsWith("UNKNOWN_")&&m.log("Debug",`S->C: ${q.name} (id=${q.id}, size=${q.rawBytes.length}, defined=${q.isDefined})`),q.name.startsWith("UNKNOWN_")&&m.log("Debug",`S->C: ${q.name} (size=${q.rawBytes.length})`)}),g.on("clientPacket",(V,q)=>{["MOVE"].includes(q.name)||m.log("Debug",`C->S: ${q.name} (id=${q.id}, size=${q.rawBytes.length}, defined=${q.isDefined})`)}));let O=(0,ae.resolve)(Ji,"dist","plugins"),L=(0,ae.resolve)(gt,"plugins"),Z=(0,ye.existsSync)(O)&&(0,ye.readdirSync)(O).some(V=>V.endsWith(".js"))||Gb?O:L,ie=!Gb||(0,ye.existsSync)(Z)||process.env.REALM_ENGINE_ALLOW_DISK_PLUGINS==="1";if((0,ye.existsSync)(Z)){let V=(0,ye.readdirSync)(Z).filter(q=>q.endsWith(".js")||q.endsWith(".ts"));m.log("Main",`Plugin directory: ${Z} (${V.length} files)`)}else m.warn("Main",`Plugin directory not found: ${Z}`);ie||m.warn("Main","Local disk plugins disabled in production (set REALM_ENGINE_ALLOW_DISK_PLUGINS=1 to override).");let Ct=(0,ae.join)(process.env.USERPROFILE||(0,Kb.homedir)(),"Documents","Realmengine","Plugins"),P=new Ho(g,Z,Ct,ie,E,A,j,()=>({worldState:A,projectileTracker:j})),w,be;{let V=new Wo;V.attach(g);let q={current:void 0},_e=(0,ae.resolve)(gt,"src","dashboard","public");w=new Da(V,P,_e,A,E),w.setDetectedGamePath(o.gameDirectory),w.setBridgeClientRef(q),w.attachProxy(g);let Je={scriptId:void 0};be=new go(Je),be.onLog((Ie,H,yt)=>{w?.broadcastScriptLog(Ie,H,yt)}),w.setScriptHost(be),be.installBridge({stateManager:I,clientRef:q,worldState:A,getWorldStateForClient:()=>A,partyRoster:F,gameData:E,proxy:g,scriptSession:Je,emitScriptLog:(Ie,H,yt)=>{w?.broadcastScriptLog(Ie,H,yt)},emitScriptPanelMessage:Ie=>{w?.broadcastScriptPanelMessage(Ie)}}),$b(),be.setScriptsStateNotify(()=>{w?.broadcastScriptsState()}),w.start(4440)}let K=new Ba("admin-dev");za((V,q)=>K.setFeature(V,q));let[tt]=await Promise.all([_u(y,{log(V,q){V==="error"?m.error("Metadata",q):V==="warn"?m.warn("Metadata",q):m.log("Metadata",q)}}),P.loadAll().then(()=>(w?.tryAutoLoadDefaultPluginConfig(),P.startWatching())).then(()=>{w?.broadcastPluginState()})]);tt.ok||m.warn("Main",`Missing metadata XML (${tt.failed.join(", ")}). Damage sniffer scaling/enchants may be incomplete. Set ROTMG_XML_BASE or run: npm run download-game-xml`),g.start("127.0.0.1",2050),m.log("Main","Proxy ready on 127.0.0.1:2050"),a&&m.log("Main",`Game hook active - Exalt at ${o.gameDirectory}`),m.log("Main","Dev dashboard: http://localhost:4440"),I.setDllDefenseSource(()=>K.getDllDefense()),w&&w.setInternalBridge(K),K.listen(),K.on("message",V=>{w?.broadcastDllMessage(V)});let rt=async()=>{if(m.log("Main","Shutting down..."),be?.stopAll(),K.stop(),za(null),await o.uninstall(),o.gameDirectory)try{let V=(0,ae.resolve)(o.gameDirectory,"version.dll");(0,ye.existsSync)(V)&&((0,ye.unlinkSync)(V),m.log("Main","Removed internal DLL from game directory."))}catch{}g.stop(),P.stopWatching(),process.exit(0)};process.on("SIGINT",rt),process.on("SIGTERM",rt)}z0().catch(r=>{m.error("Main","Fatal error",r),process.exit(1)});
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
