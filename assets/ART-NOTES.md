# 윤경이 캠퍼스 미로 그래픽

- Reference: https://github.com/0x0funky/agent-sprite-forge
- Referenced ideas: transparent sprite atlas, consistent character identity and frame size, separate map and character layers.
- This project does not install or run Agent Sprite Forge. The character was generated with the built-in image_gen tool. Garden tiles, classroom and coffee icons are drawn with Canvas code.
- Original atlas: yunkyung-sprites.png, 1254 × 1254 RGBA; 4 columns × 4 rows.
- Rows: front, left, right, back. Left-facing animation uses the mirrored right-facing row because the generated left row contains an inconsistent direction in its final frame.
- Frames: idle, stride, idle, stride; walking changes frames every 85 ms. Idle uses frame 0. Reduced-motion settings disable walking animation, floating petals and particles.
- The original PNG is also embedded in index.html so the HTML can be opened alone.
- Validation: node check-game.cjs. Checks 60 randomized mazes across normal/reduced-motion modes and validates sprite source bounds. Browser visual verification was blocked by the browser tool's local-file URL policy.

## Exact generation prompt

Use case: stylized-concept. Asset type: game-ready transparent pixel-art sprite atlas for a cozy top-down campus maze game. Create exactly 16 sprites in an evenly spaced 4 column by 4 row square grid, no lines, labels or text. Each cell same size, each character exactly same scale, perfectly centered horizontally with feet aligned at 88% of cell height, fully contained with generous transparent padding. Character: Jin Yunkyung, fictional adult Korean female university student, long dark brown hair with bangs, small pink hair clip, ivory cardigan over sage green shirt, blue jeans, white sneakers, small coral backpack. Cute sophisticated 32-bit pixel art RPG proportions, 3-head-tall, clear dark outlines, crisp square pixels, limited soft sage peach cream palette. Row 1 all facing down/front; row 2 facing left; row 3 facing right; row 4 facing up/back. In every row columns are idle standing, left-foot walking stride, idle standing, right-foot walking stride. Clearly different leg and arm poses in walking frames; identity and clothing absolutely consistent. No scenery, ground, drop shadow, gradients, text or extra objects. Genuinely transparent background. Entire image is just the 4x4 sprites, cells cover full image with no outer margins beyond the padding inside every cell.
