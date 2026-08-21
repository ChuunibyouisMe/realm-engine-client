import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { Logger } from '../util/Logger.js';

const EXALT_EXE = 'RotMG Exalt.exe';

export class ExaltFinder {
  /**
   * Auto-detect the RotMG Exalt installation directory.
   * Search order:
   *   1. ROTMG_PATH environment variable
   *   2. AppData\Local\RealmOfTheMadGod\Production (actual exe location on Windows)
   *   3. Documents\RealmOfTheMadGod\Production (legacy/alt location)
   *   4. Steam library folders (Windows, Linux, Steam Deck, Flatpak)
   */
  static find(): string | null {
    const all = ExaltFinder.findAll();
    if (all.length > 0) {
      Logger.log('ExaltFinder', `Found Exalt at: ${all[0]}`);
      return all[0];
    }
    Logger.warn('ExaltFinder', 'Could not auto-detect Exalt installation.');
    Logger.warn('ExaltFinder', 'Set the ROTMG_PATH environment variable to your Exalt directory.');
    Logger.warn('ExaltFinder', `Expected to find ${EXALT_EXE} in the directory.`);
    return null;
  }

  /**
   * Parses Steam's libraryfolders.vdf file to extract all configured Steam library folder paths.
   */
  private static parseLibraryFolders(vdfPath: string): string[] {
    const paths: string[] = [];
    try {
      if (!existsSync(vdfPath)) return paths;
      const content = readFileSync(vdfPath, 'utf8');
      const matches = content.matchAll(/"path"\s+"([^"]+)"/g);
      for (const m of matches) {
        if (m[1]) {
          paths.push(m[1].replace(/\\\\/g, '\\'));
        }
      }
    } catch {
      // ignore read errors
    }
    return paths;
  }

  /**
   * Returns potential Steam root directory locations across Windows, Linux, and Steam Deck.
   */
  private static getSteamRoots(): string[] {
    const home = homedir();
    const roots: string[] = [
      // Linux native / Steam Deck / Proton
      join(home, '.local', 'share', 'Steam'),
      join(home, '.steam', 'steam'),
      join(home, '.steam', 'root'),
      join(home, '.steam'),
      // Flatpak Steam
      join(home, '.var', 'app', 'com.valvesoftware.Steam', '.local', 'share', 'Steam'),
      join(home, '.var', 'app', 'com.valvesoftware.Steam', '.steam', 'steam'),
      // Windows standard
      'C:\\Program Files (x86)\\Steam',
      'C:\\Program Files\\Steam',
      'D:\\Steam',
      'D:\\SteamLibrary',
      'E:\\Steam',
      'E:\\SteamLibrary',
    ];
    return roots.filter((r) => {
      try { return existsSync(r); } catch { return false; }
    });
  }

  /**
   * Every valid Exalt install on this machine, in priority order.
   * Checks ROTMG_PATH -> Deca / Local AppData -> Steam libraries (including Linux / Steam Deck).
   */
  static findAll(): string[] {
    const home = homedir();
    const appDataLocal = process.env.LOCALAPPDATA || join(home, 'AppData', 'Local');

    const candidates: (string | undefined)[] = [
      // 1. Environment variable override
      process.env.ROTMG_PATH,
      // 2. AppData\Local — where the Deca-launcher exe actually runs from (Windows / Wine)
      join(appDataLocal, 'RealmOfTheMadGod', 'Production'),
      join(home, 'Documents', 'RealmOfTheMadGod', 'Production'),
      // 3. Wine / Lutris / Bottles default prefix paths
      join(home, '.wine', 'drive_c', 'users', process.env.USER || 'steamuser', 'AppData', 'Local', 'RealmOfTheMadGod', 'Production'),
      join(home, '.wine', 'drive_c', 'Program Files (x86)', 'RealmOfTheMadGod', 'Production'),
    ];

    // 4. Steam installations & library folders (including Steam Deck / Linux / SD card mounts)
    const gameSubDirs = [
      'RotMG Exalt',
      'Realm of the Mad God',
      'rotmg',
    ];

    const libraryDirs = new Set<string>();

    for (const steamRoot of ExaltFinder.getSteamRoots()) {
      libraryDirs.add(steamRoot);
      const vdf = join(steamRoot, 'steamapps', 'libraryfolders.vdf');
      for (const libPath of ExaltFinder.parseLibraryFolders(vdf)) {
        libraryDirs.add(libPath);
      }
    }

    // Common Linux / Steam Deck mount points (SD card / removable storage)
    const mountRoots = ['/run/media/mmcblk0p1', '/run/media/deck', '/media', '/mnt'];
    for (const mRoot of mountRoots) {
      try {
        if (existsSync(mRoot)) {
          libraryDirs.add(mRoot);
          const entries = readdirSync(mRoot, { withFileTypes: true });
          for (const entry of entries) {
            if (entry.isDirectory()) {
              libraryDirs.add(join(mRoot, entry.name));
            }
          }
        }
      } catch {}
    }

    for (const libDir of libraryDirs) {
      for (const sub of gameSubDirs) {
        candidates.push(join(libDir, 'steamapps', 'common', sub));
      }

      // Steam Proton compatibility prefixes (compatdata)
      const compatDir = join(libDir, 'steamapps', 'compatdata');
      try {
        if (existsSync(compatDir)) {
          const appEntries = readdirSync(compatDir, { withFileTypes: true });
          for (const app of appEntries) {
            if (app.isDirectory()) {
              const users = ['steamuser', process.env.USER || 'jyun'];
              for (const u of users) {
                candidates.push(
                  join(compatDir, app.name, 'pfx', 'drive_c', 'users', u, 'AppData', 'Local', 'RealmOfTheMadGod', 'Production'),
                  join(compatDir, app.name, 'pfx', 'drive_c', 'users', u, 'Documents', 'RealmOfTheMadGod', 'Production'),
                  join(compatDir, app.name, 'pfx', 'drive_c', 'Program Files (x86)', 'RealmOfTheMadGod', 'Production')
                );
              }
            }
          }
        }
      } catch {}
    }

    // Windows fallback hardcoded common paths
    candidates.push(
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\RotMG Exalt',
      'C:\\Program Files\\Steam\\steamapps\\common\\RotMG Exalt',
      'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Realm of the Mad God',
      'C:\\Program Files\\Steam\\steamapps\\common\\Realm of the Mad God',
      'C:\\Games\\Realm of the Mad God',
      'D:\\Steam\\steamapps\\common\\RotMG Exalt',
      'D:\\SteamLibrary\\steamapps\\common\\RotMG Exalt',
      'E:\\Steam\\steamapps\\common\\RotMG Exalt',
      'E:\\SteamLibrary\\steamapps\\common\\RotMG Exalt',
    );

    const found: string[] = [];
    for (const dir of candidates) {
      if (dir && ExaltFinder.isValidExaltDir(dir) && !found.includes(dir)) {
        found.push(dir);
      }
    }
    return found;
  }

  /** True when `dir` looks like a Steam library install (…/steamapps/common/…). */
  static isSteamInstall(dir: string): boolean {
    return /[\\/]steamapps[\\/]common[\\/]/i.test(String(dir || ''));
  }

  private static isValidExaltDir(dir: string): boolean {
    try {
      return existsSync(dir) && existsSync(join(dir, EXALT_EXE));
    } catch {
      return false;
    }
  }
}
