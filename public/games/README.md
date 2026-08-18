# Game Assets — Where to Put Your Files

## Cover Images (one per game)
Put your cover/thumbnail images here:
```
public/games/covers/business-master.png
public/games/covers/magikill.png
public/games/covers/pirate-invasion.png
public/games/covers/the-tavern.png
```
Then update `coverImage` in `src/data/games.ts` to:
`'/games/covers/magikill.png'`

## Screenshots
Put screenshot images here:
```
public/games/screenshots/magikill-1.png
public/games/screenshots/magikill-2.png
```
Then add them to the `screenshots` array in `src/data/games.ts`:
`'/games/screenshots/magikill-1.png'`

## Download Files (your game .zip or .exe)
Put your game files here:
```
public/games/downloads/BusinessMaster.zip
public/games/downloads/Magikill.zip
public/games/downloads/PirateInvasion.zip
```
The `downloadUrl` in `src/data/games.ts` is already set to these paths.
