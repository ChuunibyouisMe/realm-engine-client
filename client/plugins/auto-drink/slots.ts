/** Auto Drink — locate a usable potion in the belt / inventory / backpack. */

import type { ClientConnection } from '../../src/proxy/ClientConnection.js';
import { BELT_SLOT_BASE } from './constants.js';

/** A potion found in a slot, with the USEITEM packet slot id to use. */
export interface FoundSlot {
  /** USEITEM slot id: `BELT_SLOT_BASE + i` for belt, 4-11 inventory, 12-27 backpack. */
  slotId: number;
  itemType: number;
}

/** First potion-belt quickslot holding a matching potion (with quantity > 0). */
export function findBeltSlot(client: ClientConnection, idSet: Set<number>): FoundSlot | null {
  const belt = (client.playerData as any).quickSlots ?? [];
  const cap = (client.playerData as any).hasThirdQuickSlot ? 3 : 2;
  for (let i = 0; i < cap && i < belt.length; i++) {
    const s: any = belt[i];
    if (s?.itemType !== -1 && s?.quantity > 0 && idSet.has(s.itemType)) {
      return { slotId: BELT_SLOT_BASE + i, itemType: s.itemType };
    }
  }
  return null;
}

/** First matching potion in inventory (slots 4-11 only). Backpack slots cannot be directly consumed via USEITEM. */
export function findInventorySlot(client: ClientConnection, idSet: Set<number>): FoundSlot | null {
  const inv = client.playerData.inventory;
  const maxSlot = Math.min(12, inv.length);
  for (let slot = 4; slot < maxSlot; slot++) {
    const itemId = Number(inv[slot] ?? -1);
    if (itemId !== -1 && idSet.has(itemId)) {
      return { slotId: slot, itemType: itemId };
    }
  }
  return null;
}
