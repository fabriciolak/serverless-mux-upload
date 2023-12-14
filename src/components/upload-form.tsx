"use client";

import React from "react";
import * as UpChunk from "@mux/upchunk";

export function UploadForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [loadProgress, setLoadProgres] = React.useState<number>(0);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const createEndpointUpload = async () => {
    const data = await fetch("/api/video/upload", {
      method: "POST",
      body: null,
    });

    const response = await data.json();

    return response;
  };

  const startUpload = async () => {
    setIsLoading((prev) => !prev);

    const files = inputRef.current?.files;

    if (!files) {
      setErrorMessage("Um erro ocorreu. Tente novamente");
      return;
    }

    const endpointUrl = await createEndpointUpload();

    const upload = UpChunk.createUpload({
      endpoint: endpointUrl.url,
      file: files[0],
    });

    upload.on("error", (error: any) => {
      console.log("Error ao tenta fazer o upload", error);
      setErrorMessage("Error ao tenta fazer o upload");
    });

    upload.on("progress", (progress: any) => {
      console.log(typeof progress.detail);
      setLoadProgres(Math.floor(progress.detail));
    });

    upload.on("success", () => {
      console.log("Sucesso!");
    });
  };

  return (
    <div className="w-96 h-40 border-dashed border-zinc-400 rounded-lg">
      <div className="space-y-2">
        <h2 className="font-bold text-xl">Faça o upload</h2>
        <p>Selecione o vídeo clicando no botão ou arraste e solte aqui</p>
      </div>

      <div className="w-full py-4">
        <label>
          <button
            onClick={() => inputRef.current?.click()}
            type="button"
            className="p-4 rounded-md bg-emerald-700/60 hover:bg-emerald-700/80 font-medium"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Carregando vídeo. aguarde... {`${loadProgress}%`}</span>
            ) : (
              <>Selecione o arquivo</>
            )}
          </button>

          <input
            type="file"
            onChange={startUpload}
            ref={inputRef}
            className="sr-only"
            accept="video/mp4,video/mp3,video/x-m4v,video/*"
          />
        </label>
        {inputRef.current?.files && (
          <p className="mt-2 text-sm text-zinc-400">
            {inputRef.current?.files[0].name}
          </p>
        )}
        {errorMessage && <span>{errorMessage}</span>}
      </div>
    </div>
  );
}
