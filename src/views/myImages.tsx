import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Unstable_Grid2";
import { useFavoriteImagesStore } from "../store/favoriteImages";
import { CardImage } from "../components/cardImage";

function MyImages() {
  const favoriteImages = useFavoriteImagesStore(
    (state) => state.favoritesImages
  );

  return (
    <Box sx={{ flexGrow: 1, mt: 5, mr: 5, mb: 5, ml: 12 }}>
      {!favoriteImages.length && (
        <Grid container sx={{ width: "100%", mt: 2 }} justifyContent="center">
          <Alert severity="info" variant="outlined">
            No hay imagenes guardadas.
          </Alert>
        </Grid>
      )}
      <Grid container spacing={4}>
        {favoriteImages &&
          favoriteImages.map((image) => (
            <Grid xs={3} key={image.id}>
              <CardImage image={image} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default MyImages;
