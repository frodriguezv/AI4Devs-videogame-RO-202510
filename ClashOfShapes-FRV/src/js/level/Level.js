// Level Class - Complete 2400×600 level with 3 screens

import { CONFIG } from '../config.js';
import { GroundTile } from '../objects/GroundTile.js';
import { Coin } from '../objects/Coin.js';
import { Orb } from '../objects/Orb.js';
import { Spike } from '../objects/Spike.js';
import { Checkpoint } from '../objects/Checkpoint.js';
import { Goal } from '../objects/Goal.js';

export class Level {
    static init() {
        const tiles = [];
        const enemiesData = [];
        const collectibles = [];
        const spikes = [];

        // Ground floor across entire level (y=550)
        for (let x = 0; x < CONFIG.LEVEL_WIDTH; x += CONFIG.TILE_SIZE) {
            tiles.push(new GroundTile(x, 550, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE));
        }

        // SCREEN 1: Tutorial Section (0-800px)
        Level.buildScreen1(tiles, enemiesData);

        // SCREEN 2: Challenge Section (800-1600px)
        Level.buildScreen2(tiles, enemiesData);

        // SCREEN 3: Final Section (1600-2400px)
        Level.buildScreen3(tiles, enemiesData);

        // Place collectibles
        Level.placeCollectibles(collectibles);

        // Place hazards
        Level.placeHazards(spikes);

        // Checkpoint at screen 2 start (x=800, y=518)
        const checkpoint = new Checkpoint(800, 518);

        // Goal at screen 3 end (x=2300, y=218)
        const goal = new Goal(2300, 218);

        console.log(`Level created: ${tiles.length} tiles, ${enemiesData.length} enemies, ${collectibles.length} collectibles, ${spikes.length} spikes`);

        return { tiles, enemiesData, collectibles, spikes, checkpoint, goal };
    }

    static buildScreen1(tiles, enemiesData) {
        // SCREEN 1: Tutorial Section (0-800px)
        // Platform at x=300, y=450 (width: 150px)
        for (let x = 300; x < 450; x += 16) {
            tiles.push(new GroundTile(x, 450, 16, 16));
        }

        // Platform at x=550, y=350 (width: 150px)
        for (let x = 550; x < 700; x += 16) {
            tiles.push(new GroundTile(x, 350, 16, 16));
        }

        // Elevated platform for Orb #1 at x=650, y=300 (width: 100px)
        for (let x = 650; x < 750; x += 16) {
            tiles.push(new GroundTile(x, 300, 16, 16));
        }

        // Enemies for Screen 1 (3 total)
        // 1 Circle enemy (Rock, 60 px/s) - on ground
        enemiesData.push({ x: 200, y: 500, shape: 'circle' });

        // 1 Square enemy (Paper, 50 px/s) - on first platform
        enemiesData.push({ x: 350, y: 400, shape: 'square' });

        // 1 Triangle enemy (Scissors, 70 px/s) - on elevated platform
        enemiesData.push({ x: 600, y: 300, shape: 'triangle' });
    }

    static buildScreen2(tiles, enemiesData) {
        // SCREEN 2: Challenge Section (800-1600px)
        // Platform jumping section
        // Platform 1 at x=850, y=450 (width: 100px)
        for (let x = 850; x < 950; x += 16) {
            tiles.push(new GroundTile(x, 450, 16, 16));
        }

        // Platform 2 at x=1050, y=400 (width: 100px)
        for (let x = 1050; x < 1150; x += 16) {
            tiles.push(new GroundTile(x, 400, 16, 16));
        }

        // Platform 3 at x=1250, y=350 (width: 100px)
        for (let x = 1250; x < 1350; x += 16) {
            tiles.push(new GroundTile(x, 350, 16, 16));
        }

        // Platform after spikes at x=1450, y=450 (width: 150px)
        for (let x = 1450; x < 1600; x += 16) {
            tiles.push(new GroundTile(x, 450, 16, 16));
        }

        // Enemies for Screen 2 (4 total)
        // 2 Circle enemies (Rock)
        enemiesData.push({ x: 900, y: 400, shape: 'circle' });
        enemiesData.push({ x: 1300, y: 300, shape: 'circle' });

        // 1 Square enemy (Paper)
        enemiesData.push({ x: 1100, y: 350, shape: 'square' });

        // 1 Triangle enemy (Scissors)
        enemiesData.push({ x: 1500, y: 400, shape: 'triangle' });
    }

    static buildScreen3(tiles, enemiesData) {
        // SCREEN 3: Final Section (1600-2400px)
        // Upper platform for enemies at y=350 (width: 250px)
        for (let x = 1650; x < 1900; x += 16) {
            tiles.push(new GroundTile(x, 350, 16, 16));
        }

        // Mid platform at x=1950, y=450 (width: 150px)
        for (let x = 1950; x < 2100; x += 16) {
            tiles.push(new GroundTile(x, 450, 16, 16));
        }

        // Final platform sequence
        // Platform 1 at x=2150, y=400 (width: 80px)
        for (let x = 2150; x < 2230; x += 16) {
            tiles.push(new GroundTile(x, 400, 16, 16));
        }

        // Platform 2 (with Orb #3) at x=2250, y=300 (width: 100px)
        for (let x = 2250; x < 2350; x += 16) {
            tiles.push(new GroundTile(x, 300, 16, 16));
        }

        // Enemies for Screen 3 (3 total - adjusted to match PRD's 10 total)
        // Upper platform enemies
        enemiesData.push({ x: 1700, y: 300, shape: 'triangle' });
        enemiesData.push({ x: 1800, y: 300, shape: 'square' });

        // Lower ground enemy
        enemiesData.push({ x: 2000, y: 400, shape: 'circle' });
    }

    static placeCollectibles(collectibles) {
        // SCREEN 1: 5 coins + 1 orb
        collectibles.push(new Coin(250, 500)); // On ground
        collectibles.push(new Coin(350, 420)); // On first platform
        collectibles.push(new Coin(420, 420)); // On first platform
        collectibles.push(new Coin(600, 320)); // On elevated platform
        collectibles.push(new Coin(680, 320)); // On elevated platform
        collectibles.push(new Orb(700, 270)); // Orb #1 on elevated platform

        // SCREEN 2: 6 coins + 1 orb
        collectibles.push(new Coin(900, 420)); // On platform 1
        collectibles.push(new Coin(1100, 370)); // On platform 2
        collectibles.push(new Coin(1200, 500)); // On ground
        collectibles.push(new Coin(1300, 320)); // On platform 3
        collectibles.push(new Coin(1400, 500)); // On ground
        collectibles.push(new Coin(1500, 420)); // On final platform
        collectibles.push(new Orb(1550, 420)); // Orb #2 after platform section

        // SCREEN 3: 7 coins + 1 orb
        collectibles.push(new Coin(1650, 500)); // On ground
        collectibles.push(new Coin(1750, 320)); // On upper platform
        collectibles.push(new Coin(1850, 320)); // On upper platform
        collectibles.push(new Coin(1950, 500)); // On ground
        collectibles.push(new Coin(2000, 420)); // On mid platform
        collectibles.push(new Coin(2180, 370)); // On platform
        collectibles.push(new Coin(2280, 270)); // On final platform
        collectibles.push(new Orb(2300, 270)); // Orb #3 on final platform
    }

    static placeHazards(spikes) {
        // Screen 2: Spike section (3 spikes at x=1380-1412, y=534)
        spikes.push(new Spike(1380, 534));
        spikes.push(new Spike(1396, 534));
        spikes.push(new Spike(1412, 534));
    }
}
