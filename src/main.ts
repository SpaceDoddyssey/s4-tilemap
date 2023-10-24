import "./style.css";

//setting up the multiple canvases
const gridCanvas = document.getElementById("gridCanvas") as HTMLCanvasElement;
const gridCtx = gridCanvas.getContext("2d") as CanvasRenderingContext2D;

const selectCanvas = document.getElementById(
  "selectCanvas"
) as HTMLCanvasElement;
const selectCtx = selectCanvas.getContext("2d") as CanvasRenderingContext2D;

//defining the textures to use
const imageUrls = [
  "/tile1.png",
  "/tile2.png",
  "/tile3.png",
  "/tile4.png",
  "/tile5.png",
  "/tile6.png",
  "/tile7.png",
  "/tile8.png",
];

//defining the size of the main grid
const dimensionSize = 32;
const numTiles = dimensionSize * dimensionSize;
const tileSize = gridCanvas.width / numTiles;

//defining the size of the select grid
const numSelectables = imageUrls.length;
const selectHeight = selectCanvas.height / numSelectables;

//creating the tilemap nested array
let tilemap: string[] = new Array(numTiles);

for (let i = 0; i < dimensionSize; i++) {
  for (let j = 0; j < dimensionSize; j++) {
    tilemap[index(i, j)] = "/tile1.png";
  }
}

function index(row: number, column: number): number {
  return row * dimensionSize + column;
}

//track the selected tile
let currentTile = "/tile1.png";

//draw the initial canvases
redrawTilemap();
drawSelectCanvas();

//Function that draws a texture to a specific canvas ctx
function drawTexture(
  row: number,
  col: number,
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  cellSize: number
) {
  image.onload = () => {
    ctx.drawImage(image, row * cellSize, col * cellSize, width, height);
  };
  ctx.drawImage(image, row * cellSize, col * cellSize, width, height);
}

// ----- Interacting with the main tilemap -----

function redrawTilemap() {
  gridCtx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
  for (let i = 0; i < numTiles; i++) {
    for (let j = 0; j < numTiles; j++) {
      let image = new Image();
      image.src = tilemap[index(i, j)];
      drawTexture(
        i,
        j,
        gridCtx,
        image,
        gridCanvas.width / numTiles,
        gridCanvas.height / numTiles,
        tileSize
      );
    }
  }
}

gridCanvas.addEventListener("click", (e) => {
  const coordX = Math.trunc(e.offsetX / tileSize);
  const coordY = Math.trunc(e.offsetY / tileSize);

  tilemap[index(coordX, coordY)].src = currentTile;
  redrawTilemap();
});

// ----- Interacting with the selectable tilemap -----

// Loop through the selectable tiles and draw textures in each cell
function drawSelectCanvas() {
  for (let i = 0; i < numSelectables; i++) {
    const selectableImage = new Image();
    selectableImage.src = imageUrls[i];
    drawTexture(
      0,
      i,
      selectCtx,
      selectableImage,
      selectCanvas.width,
      selectHeight,
      64
    );
  }
}

selectCanvas.addEventListener("click", (e) => {
  const coordY = Math.trunc(e.offsetY / selectHeight);
  currentTile = imageUrls[coordY];
});
