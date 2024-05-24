import React, { useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { useLastPetToCreate } from "hooks";
import css from "./index.css";
import { ParagraphText } from "ui/texts";

export function DropzoneComp() {
  //------------------STYLING------------------//
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    "min-width": "30vw",
    "min-height": "30vw",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };
  //------------------END OF STYLING------------------//
  const [{ petImg }, setPetImgToRecoilAtom] = useLastPetToCreate();
  const imgMaxSize = 60000; // 60kb
  async function getBase64Img(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const onDropAccepted = useCallback(async (acceptedFiles: File[]) => {
    const newBase64Img = await getBase64Img(acceptedFiles[0]);
    setPetImgToRecoilAtom((lastState) => {
      return { ...lastState, petImg: newBase64Img };
    });
  }, []);
  const onDropRejected = useCallback((rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 1) {
      alert("Solo se puede subir 1 imagen a la vez.");
    } else if (rejectedFiles[0].file.size > imgMaxSize) {
      alert("La imagen que intentas subir pesa más de 60kb, por favor utiliza una más pequeña o modificala en un editor");
    } else if (rejectedFiles[0].file.type.split("/")[0] != "image") {
      alert("El archivo que intentas subir no es del tipo imagen, intenta con archivos de imagen con extensión .png, .jpg o .jpeg");
    }
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDropAccepted,
    onDropRejected,
    multiple: false,
    accept: { "image/*": [] },
    maxSize: imgMaxSize,
  });
  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <div className={css.img} {...getRootProps({ style })}>
      <input {...getInputProps()} />
      {petImg ? (
        <div>
          <img className={css.img} src={petImg} />
        </div>
      ) : (
        <div className={css.textContainer}>
          <ParagraphText>Arrastre la imagen de su mascota aquí ó haga click y seleccionela. (máximo: {imgMaxSize / 1000}kb)</ParagraphText>
        </div>
      )}
    </div>
  );
}
