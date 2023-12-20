import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Unstable_Grid2";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import InfiniteScroll from "react-infinite-scroll-component";
import { useFavoriteImagesStore } from "../store/favoriteImages";
import { useFetchImagesQuery } from "../services/image.service";
import { CardImage } from "../components/cardImage";

function Home() {
  const queryClient = useQueryClient();
  const {
    data: images,
    isPending,
    isError,
    fetchNextPage,
  } = useFetchImagesQuery();

  const favoritesImages = useFavoriteImagesStore(
    (state) => state.favoritesImages
  );

  const refreshImages = () => {
    queryClient.resetQueries({ queryKey: ["images"], exact: true });
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 5, mr: 5, mb: 5, ml: 12 }}>
      {isPending && (
        <Grid container sx={{ width: "100%", mt: 2 }} justifyContent="center">
          <CircularProgress />
        </Grid>
      )}
      {!isPending && (
        <Fab
          sx={{ position: "absolute", top: 85, left: 25 }}
          aria-label="refrescar"
          color="primary"
          onClick={() => {
            refreshImages();
          }}
        >
          <RefreshIcon />
        </Fab>
      )}
      {isError && !images && (
        <Grid container sx={{ width: "100%", mt: 2 }} justifyContent="center">
          <Alert severity="error" variant="outlined">
            Error al cargar las imágenes, por favor refrescar!
          </Alert>
        </Grid>
      )}
      {images && (
        <InfiniteScroll
          dataLength={images.pages.length * 12}
          next={() => fetchNextPage()}
          hasMore={true}
          loader={<LinearProgress />}
          style={{ overflow: "unset" }}
        >
          <Grid container spacing={4} sx={{ pb: 2 }}>
            {images.pages.map((imagesGroup, i) => (
              <Fragment key={i}>
                {imagesGroup.data.map((image) => (
                  <Grid xs={3} key={image.id}>
                    <CardImage
                      image={image}
                      isFavorite={favoritesImages.some(
                        (favoriteImage) => favoriteImage.id === image.id
                      )}
                    />
                  </Grid>
                ))}
              </Fragment>
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </Box>
  );
}

export default Home;
