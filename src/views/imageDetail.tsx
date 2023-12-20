import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useFetchImageDetailQuery } from "../services/image.service";
import { useFavoriteImagesStore } from "../store/favoriteImages";
import { DownloadButton } from "../components/downloadButton";
import NotiSnackbar from "../components/notiSnackbar";

function ImageDetail() {
  const { imageId } = useParams();
  const navigate = useNavigate();

  const {
    data: image,
    isPending,
    isError,
  } = useFetchImageDetailQuery(imageId ?? "");

  const favoritesImages = useFavoriteImagesStore(
    (state) => state.favoritesImages
  );
  const removeFavoriteImage = useFavoriteImagesStore(
    (state) => state.removeFavoritesImages
  );
  const addFavoriteImage = useFavoriteImagesStore(
    (state) => state.addFavoritesImages
  );

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  useEffect(() => {
    if (image && favoritesImages) {
      setIsFavorite(
        favoritesImages.some(
          (favoriteImage) => favoriteImage.id === image.data.id
        )
      );
    }
  }, [image, favoritesImages]);

  const toggleFavorite = () => {
    if (!image) return;
    if (isFavorite) {
      removeFavoriteImage(image.data);
      return;
    }
    addFavoriteImage(image.data);
  };

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      {isPending && (
        <Grid container sx={{ width: "100%", mt: 2 }} justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {!isPending && (
        <Fab
          sx={{ position: "absolute", top: 85, left: 25 }}
          aria-label="atrás"
          color="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </Fab>
      )}
      {isError && !image && (
        <Grid container sx={{ width: "100%", mt: 2 }} justifyContent="center">
          <Alert severity="error" variant="outlined">
            Error al cargar la imagen, por favor refrescar!
          </Alert>
        </Grid>
      )}
      {image && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <Grid>
            <Card sx={{ maxWidth: 840, maxHeight: 840 }}>
              <CardMedia component="img" src={image.data.download_url} />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <em>Autor: </em>
                  {image.data.author}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <em>Ancho: </em>
                  {image.data.width}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <em>Alto: </em>
                  {image.data.height}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <em>URL: </em>
                  {image.data.url}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <em>URL de descarga: </em>
                  {image.data.download_url}
                </Typography>
              </CardContent>
              <CardActions>
                <DownloadButton
                  imageUrl={image.data.download_url}
                  setOpenSnackbar={setOpenSnackbar}
                />
                <Button
                  size="small"
                  variant={isFavorite ? "outlined" : "contained"}
                  onClick={toggleFavorite}
                >
                  {isFavorite ? "QUITAR" : "GUARDAR"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
      <NotiSnackbar
        open={openSnackbar}
        handleClose={handleClose}
        severity={"error"}
        message={"Error al descargar la imagen!"}
      />
    </>
  );
}

export default ImageDetail;
