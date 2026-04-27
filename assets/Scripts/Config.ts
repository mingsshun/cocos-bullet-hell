export const GameConfig = {
    map: {
        minX: -800,
        maxX: 800,
        minY: -450,
        maxY: 450
    },
    player_shooter: {
        range: 250,
        cooldown: 0.3,
        bullet_speed: 700
    },
    enemy_shooter: {
        range: 400,
        cooldown: 1.5,
        bullet_speed: 480
    },
    player: {
        speed: 320,
        dash_speed: 900,
        dash_duration: 0.15,
        dash_cooldown: 1,
        hp: 100,
        bullet_damage: 20
    },
    enemy: {
        chaser_speed: 140,
        chaser_hp: 40,
        shooter_hp: 60,
        bullet_damage: 15,
        contact_damage: 25
    },
    spawn_enemy: {
        start_interval: 1.5,
        min_interval: 0.5,
        decay_rate: 0.98,
        min_dist: 220,
        max_dist: 600
    },
    enemy_ratio: {
        min_shooter: 0.2,
        max_shooter: 0.5
    },
    game_duration: 60
};