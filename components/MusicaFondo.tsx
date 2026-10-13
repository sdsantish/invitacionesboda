"use client";

import { useEffect, useState, type RefObject } from "react";

/*
  Solo maneja cuándo suena, no el elemento <audio> en sí: lo monta
  `Precarga`, que necesita esa misma referencia para esperar a que la
  canción esté lista antes de revelar la página. Tener un único
  elemento evita descargar el mp3 dos veces.

  Se arma (`armado`) recién cuando el usuario ya abrió la invitación
  con un clic real, así que para cuando llega el scroll el navegador ya
  sabe que hubo una interacción y el play() no debería toparse con la
  política de autoplay. Aun así se reintenta en cada scroll hasta que
  suene, por si el primer intento fallara.
*/
export default function MusicaFondo({
  audioRef,
  armado,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
  armado: boolean;
}) {
  /*
    Aviso flotante que explica que la música arranca al deslizar. Se
    muestra al abrir la invitación y se va con el primer scroll, suene
    o no la canción, para no quedar tapando la página.
  */
  const [deslizado, setDeslizado] = useState(false);

  useEffect(() => {
    if (!armado) return;
    const ocultar = () => setDeslizado(true);
    window.addEventListener("scroll", ocultar, { passive: true, once: true });
    return () => window.removeEventListener("scroll", ocultar);
  }, [armado]);

  useEffect(() => {
    if (!armado) return;
    const audio = audioRef.current;
    if (!audio) return;

    let sonando = false;

    const reproducir = () => {
      if (sonando) return;
      audio
        .play()
        .then(() => {
          sonando = true;
          window.removeEventListener("scroll", reproducir);
        })
        .catch(() => {
          /* Se reintenta con el próximo scroll */
        });
    };

    window.addEventListener("scroll", reproducir, { passive: true });
    return () => window.removeEventListener("scroll", reproducir);
  }, [audioRef, armado]);

  return (
    <p
      className={`aviso-musica t-body ${armado && !deslizado ? "aviso-musica-visible" : ""}`}
      aria-hidden={!armado || deslizado}
    >
      Desliza hacia abajo para que empiece la música
    </p>
  );
}
