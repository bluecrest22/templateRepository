// Assuming your images are in a folder named 'images'
function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}
// eslint-disable-next-line
const context = require.context("./weather-icons", false, /\.(png|jpe?g|svg)$/);
export const images = importAll(context);

// Access an image using its filename (e.g., images['image1.png'])
