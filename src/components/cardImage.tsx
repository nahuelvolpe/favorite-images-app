import { FC } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useFavoriteImagesStore } from "../store/favoriteImages";
import { IImage } from "../utils/image.types";

interface CardImageProps {
  image: IImage;
  isFavorite?: boolean;
}

/**
 * Componente funcional que representa una card con imagen y botón de acción.
 *
 * @param {Object} image - Objeto que representa la información de la imagen.
 * @param {boolean} [isFavorite=true] - Indica si la imagen está marcada como favorita.
 * @returns {ReactNode} Componente de React que renderiza una Card para mostrar una imagen con boton de acción.
 */
export const CardImage: FC<CardImageProps> = ({ image, isFavorite = true }) => {
  const removeFavoriteImage = useFavoriteImagesStore(
    (state) => state.removeFavoritesImages
  );
  const addFavoriteImage = useFavoriteImagesStore(
    (state) => state.addFavoritesImages
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteImage(image);
      return;
    }
    addFavoriteImage(image);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to={`/images/${image.id}`}>
          <CardMedia component="img" height="140" src={image.download_url} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {image.author}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            variant={isFavorite ? "outlined" : "contained"}
            onClick={toggleFavorite}
          >
            {isFavorite ? "Quitar" : "Guardar"}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
