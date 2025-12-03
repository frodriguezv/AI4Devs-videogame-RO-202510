// Collision System

export class CollisionSystem {
    static checkCollision(a, b) {
        const aBounds = a.getBounds();
        const bBounds = b.getBounds();

        return (
            aBounds.left < bBounds.right &&
            aBounds.right > bBounds.left &&
            aBounds.top < bBounds.bottom &&
            aBounds.bottom > bBounds.top
        );
    }

    static resolveCollision(entity, tile) {
        const entityBounds = entity.getBounds();
        const tileBounds = tile.getBounds();

        // Calculate overlap on all sides
        const overlapLeft = entityBounds.right - tileBounds.left;
        const overlapRight = tileBounds.right - entityBounds.left;
        const overlapTop = entityBounds.bottom - tileBounds.top;
        const overlapBottom = tileBounds.bottom - entityBounds.top;

        // Find smallest overlap
        const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

        // Resolve based on smallest overlap
        if (minOverlap === overlapTop && entity.velocityY > 0) {
            // Collision from top (landing on platform)
            entity.y = tileBounds.top - entity.height;
            entity.velocityY = 0;
            entity.onGround = true;
        } else if (minOverlap === overlapBottom && entity.velocityY < 0) {
            // Collision from bottom (hitting ceiling)
            entity.y = tileBounds.bottom;
            entity.velocityY = 0;
        } else if (minOverlap === overlapLeft && entity.velocityX > 0) {
            // Collision from left
            entity.x = tileBounds.left - entity.width;
            entity.velocityX = 0;
        } else if (minOverlap === overlapRight && entity.velocityX < 0) {
            // Collision from right
            entity.x = tileBounds.right;
            entity.velocityX = 0;
        }
    }
}
