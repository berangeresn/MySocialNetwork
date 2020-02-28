import React, { Fragment, useState, useEffect } from "react";
import { Header, Grid, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { PhotoWidgetDropzone } from "./PhotoWidgetDropzone";

export const PhotoUploadWidget = () => {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    return () => {
      // clean up file preview
      files.forEach(file => URL.revokeObjectURL(file.preview))
    }
  })

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header color="teal" sub content="Etape 1 - Ajouter une photo" />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header
            sub
            color="teal"
            content="Etape 2 -  Redimmensionner l'image"
          />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color="teal" content="Etape 3 - Aperçu & Chargement" />
          {files.length > 0 && <Image src={files[0].preview} />}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);