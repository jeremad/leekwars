var GUN = WEAPON_PISTOL;
var ENEMY = getNearestEnemy();
var weapon = getWeapon();

// first round
if (weapon === null) {
     setWeapon(GUN);
}

var enemy_cell = getCell(ENEMY);
var weapon_cell = getCellToUseWeapon(ENEMY);
var my_cell = getCell();
var weapon_distance = getCellDistance(weapon_cell, my_cell);
var moves = getMP();

if (weapon_distance <= moves) {
    moveTowardCell(weapon_cell);
    if (canUseWeapon(ENEMY)) {
        while (getTP() >= getWeaponCost(GUN)) {
            useWeapon(ENEMY);
        }
        moveAwayFrom(ENEMY);
    }
} else if (weapon_distance > 2 * moves) {
    moveTowardCell(weapon_cell);
}
