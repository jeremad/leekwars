var enemy = getNearestEnemy();
var weapon = getWeapon();

// first round
if (weapon === null) {
    setWeapon(WEAPON_PISTOL);
    weapon = getWeapon();
}

var enemy_cell = getCell(enemy);
var pistol_cell = getCellToUseWeapon(WEAPON_PISTOL, enemy);
var machine_cell = getCellToUseWeapon(WEAPON_MACHINE_GUN, enemy);
var my_cell = getCell();
var pistol_distance = getCellDistance(pistol_cell, my_cell);
var machine_distance = getCellDistance(machine_cell, my_cell);
var moves = getMP();

function set_weapon(gun, current_weapon) {
    if (current_weapon !== gun) {
        setWeapon(gun);
    }
}


function use_gun(gun, cell, weapon, enemy) {
    set_weapon(gun, weapon);
    moveTowardCell(cell);
    while (getTP() >= getWeaponCost(gun)) {
        useWeapon(enemy);
    }
    moveAwayFrom(enemy);
}

function forward(cell, weapon) {
    set_weapon(WEAPON_PISTOL, weapon);
    moveTowardCell(cell);
}

if (machine_distance <= moves) {
    use_gun(WEAPON_MACHINE_GUN, machine_cell, weapon, enemy);
} else if (pistol_distance < moves) {
    use_gun(WEAPON_PISTOL, pistol_cell, weapon, enemy);
} else if (pistol_distance > 2 * moves) {
    forward(pistol_cell, weapon);
} else if (MAX_TURNS - getTurn() < 10) {
    forward(pistol_cell, weapon);
}
