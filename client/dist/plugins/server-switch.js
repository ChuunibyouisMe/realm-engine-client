import{readFileSync as N}from"fs";import{resolve as T,dirname as w}from"path";import{fileURLToPath as C}from"url";var y="https://www.realmofthemadgod.com/account/servers";async function m(e){let a=new URLSearchParams({accessToken:e,game_net:"Unity",play_platform:"Unity",game_net_user_id:""}),s=await fetch(`${y}?${a}`,{method:"GET",headers:{"User-Agent":"UnityPlayer/2021.3.31f1 (UnityWebRequest/1.0, libcurl/8.5.0-DEV)","X-Unity-Version":"2021.3.31f1"}});if(!s.ok)throw new Error(`Server list API returned ${s.status}`);let n=await s.text();return k(n)}function k(e){let a={},s=e.match(/<Server>[\s\S]*?<\/Server>/g);if(!s)return a;for(let n of s){if(n.includes("<AdminOnly/>")||n.includes("<AdminOnly>"))continue;let c=n.match(/<Name>([^<]+)<\/Name>/),d=n.match(/<DNS>([^<]+)<\/DNS>/);c&&d&&(a[c[1]]=d[1])}return a}var u;function v(e){try{let s=String((e==="packet"?`{
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
`:e==="stat"?`{
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
`)||"").trim();return s||null}catch{return null}}function h(){if(u!==void 0)return u;let e=v("servers");if(!e)return u=null,null;try{return u=JSON.parse(e),u}catch{return u=null,null}}function B(e){e.name="Server Switch",e.category="network";let a=w(C(import.meta.url)),s=T(a,"..","data","servers.json"),n=h()??{};try{Object.keys(n).length===0&&(n=JSON.parse(N(s,"utf8")))}catch(t){e.log(`Failed to load servers.json: ${t.message}`)}let c=null,d=!1;function S(){let t=Object.keys(n),o=t.map(r=>({label:`${r} (${n[r]})`,value:r}));e.registerSetting("server",{label:"Server",type:"select",value:t[0]??"",options:o},r=>{if(!c){e.log("No client connected");return}let i=n[r];if(!i){e.log(`Unknown server: ${r}`);return}g(c,r,i)})}S(),e.on("clientConnected",t=>{c=t,!d&&t.state?.accessToken&&(d=!0,m(t.state.accessToken).then(o=>{let r=Object.keys(o).length;r>0&&(n=o,S(),e.log(`Fetched ${r} servers from API`))}).catch(o=>{e.log(`API fetch failed, using fallback: ${o.message}`)}))}),e.on("clientDisconnected",()=>{c=null}),e.hookCommand("con",(t,o,r)=>{let i=Object.keys(n);if(r.length===0){e.sendNotification(t,"Server Switch",`Servers: ${i.join(", ")}`);return}let _=r[0].toLowerCase(),l=i.filter(f=>f.toLowerCase().startsWith(_));if(l.length===0){e.sendNotification(t,"Server Switch",`No server matching "${r[0]}". Available: ${i.join(", ")}`);return}if(l.length>1){let f=l.find(p=>p.toLowerCase()===_);if(f){g(t,f,n[f]);return}e.sendNotification(t,"Server Switch",`Ambiguous: ${l.join(", ")}`);return}g(t,l[0],n[l[0]])});function g(t,o,r){if(!t.state){e.log("Client has no state \u2014 cannot switch");return}e.log(`Switching to ${o} (${r})...`),e.sendNotification(t,"Server Switch",`Connecting to ${o}...`),t.state.conTargetAddress=r,t.state.conTargetPort=2050,t.state.conRealKey=Buffer.alloc(0);let i=e.createPacket("RECONNECT");i.data={name:o,host:"127.0.0.1",port:2050,gameId:-2,keyTime:-1,key:Buffer.from(t.state.guid,"utf8")},i.modified=!0,t.sendToClient(i)}e.log(`Loaded \u2014 ${Object.keys(n).length} servers (fallback), will fetch live list on connect`)}export{B as register};
