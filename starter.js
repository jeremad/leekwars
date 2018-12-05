var enemy = getNearestEnemy();
var weapon = getWeapon();

// first round
if (weapon === null) {
    setWeapon(WEAPON_PISTOL);
    weapon = getWeapon();
}

var pistol_cell = getCellToUseWeapon(WEAPON_PISTOL, enemy);
var machine_cell = getCellToUseWeapon(WEAPON_MACHINE_GUN, enemy);
var spark_cell = getCellToUseChip(CHIP_SPARK, enemy);
var enemy_cell = getCell(enemy);
var my_cell = getCell();
var pistol_distance = getCellDistance(pistol_cell, my_cell);
var machine_distance = getCellDistance(machine_cell, my_cell);
var spark_distance = getCellDistance(spark_cell, my_cell);
var enemy_distance = getCellDistance(enemy_cell, my_cell);
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

function use_chip(cell, chip, enemy) {
    moveTowardCell(cell);
    while (getTP() >= getChipCost(chip)) {
        useChip(chip, enemy);
    }
    moveAwayFrom(enemy);
}

// if we are far, we can use spark and hide away
if (enemy_distance >= getChipMaxRange(CHIP_SPARK) - 1 && spark_distance <= moves) {
    use_chip(spark_cell, CHIP_SPARK, enemy);
// if we are close enough, let's use our strongest weapon
} else if (machine_distance <= moves) {
    use_gun(WEAPON_MACHINE_GUN, machine_cell, weapon, enemy);
} else if (pistol_distance <= moves) {
    use_gun(WEAPON_PISTOL, pistol_cell, weapon, enemy);
} else if (spark_distance <= moves) {
    use_chip(spark_cell, CHIP_SPARK, enemy);
} else if (spark_distance > 2 * moves) {
    forward(spark_cell, weapon);
// last minute heroic stuff
} else if (MAX_TURNS - getTurn() < 10) {
    forward(spark_cell, weapon);
}
