import { Dispatch, FC, useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useFetchImageDownloadQuery } from "../services/image.service";

interface DownloadButtonProps {
  imageUrl: string;
  setOpenSnackbar?: Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Componente funcional que representa un loading button y que puede realizar una descarga de una imagen.
 *
 * @param {string} imageUrl - URL que inidica la dirección para descargar la imagen.
 * @param {Dispatch<React.SetStateAction<boolean>>} setOpenSnackbar- setState para activar un snackbar si hay un error en la descarga.
 * @returns {ReactNode} Componente de React representa un loading button.
 */
export const DownloadButton: FC<DownloadButtonProps> = ({
  imageUrl,
  setOpenSnackbar,
}) => {
  const [url, setUrl] = useState<string>("");

  const {
    data: image,
    isFetching,
    isError,
    refetch,
  } = useFetchImageDownloadQuery(url);

  useEffect(() => {
    if (!image?.data) return;
    downloadImage(image?.data);
  }, [image]);

  useEffect(() => {
    if (setOpenSnackbar && isError) setOpenSnackbar(true);
  }, [isError]);

  const handleSetUrl = () => {
    if (imageUrl !== url) {
      setUrl(imageUrl);
    } else {
      refetch();
    }
  };

  const downloadImage = (blob: Blob) => {
    try {
      const urlBlob = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = urlBlob;
      link.download = "image.jpg";
      link.click();

      URL.revokeObjectURL(urlBlob);
    } catch (_e) {
      if (setOpenSnackbar) setOpenSnackbar(true);
    }
  };

  return (
    <>
      <LoadingButton
        size="small"
        variant="contained"
        color="secondary"
        loading={isFetching}
        onClick={handleSetUrl}
      >
        Descargar
      </LoadingButton>
    </>
  );
};
