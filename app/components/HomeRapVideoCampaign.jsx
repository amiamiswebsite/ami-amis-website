"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { assetPath } from "../../src/lib/assetPath";
import Icon from "./ui/Icon";
import IconButton from "./ui/IconButton";
import styles from "../styles/components/HomeRapVideoCampaign.module.css";

const formatTime = (value) => {
  const seconds = Math.max(0, Math.floor(Number(value) || 0));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};

function CampaignPlayer({ campaign, onClose, triggerRef }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const shellRef = useRef(null);
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
  const lastVolumeRef = useRef(1);
  const [ready, setReady] = useState(false);
  const [buffering, setBuffering] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(149);
  const [seconds, setSeconds] = useState(0);
  const [seekDraft, setSeekDraft] = useState(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [status, setStatus] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    let active = true;
    let player;
    let readyTimeout;
    dialog.showModal();
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const live = (handler) => (data) => {
      if (active) handler(data);
    };
    import("@vimeo/player")
      .then(async ({ default: VimeoPlayer }) => {
        if (!active) return;
        player = new VimeoPlayer(iframeRef.current);
        playerRef.current = player;
        player.on(
          "play",
          live(() => {
            setPlaying(true);
            setStatus("");
          }),
        );
        player.on(
          "pause",
          live(() => setPlaying(false)),
        );
        player.on(
          "ended",
          live(() => setPlaying(false)),
        );
        player.on(
          "timeupdate",
          live((data) => {
            setSeconds(data.seconds);
            setDuration(data.duration || 149);
          }),
        );
        player.on(
          "seeked",
          live((data) => setSeconds(data.seconds)),
        );
        player.on(
          "volumechange",
          live((data) => {
            setVolume(data.volume);
            setMuted(Boolean(data.muted) || data.volume === 0);
          }),
        );
        player.on(
          "bufferstart",
          live(() => setBuffering(true)),
        );
        player.on(
          "bufferend",
          live(() => setBuffering(false)),
        );
        player.on(
          "error",
          live(() => {
            setBuffering(false);
            setFailed(true);
            setStatus("De video kan niet worden geladen.");
          }),
        );
        await Promise.race([
          player.ready(),
          new Promise((_, reject) => {
            readyTimeout = window.setTimeout(() => reject(new Error("Vimeo timeout")), 15000);
          }),
        ]);
        window.clearTimeout(readyTimeout);
        if (!active) return;
        // Begin each deliberate opening at full volume, before starting playback.
        await Promise.allSettled([player.setVolume(1), player.setMuted(false)]);
        if (!active) return;
        const initial = await Promise.allSettled([
          player.getDuration(),
          player.getVolume(),
          player.getMuted(),
          player.getPaused(),
        ]);
        if (!active) return;
        if (initial[0].status === "fulfilled") setDuration(initial[0].value);
        if (initial[1].status === "fulfilled") setVolume(initial[1].value);
        setMuted(
          (initial[2].status === "fulfilled" && initial[2].value) ||
            (initial[1].status === "fulfilled" && initial[1].value === 0),
        );
        const paused = initial[3].status !== "fulfilled" || initial[3].value;
        setPlaying(!paused);
        setReady(true);
        setBuffering(false);
        if (paused) {
          try {
            await player.play();
          } catch {
            if (active) setStatus("Druk op play om te starten.");
          }
        }
      })
      .catch(() => {
        if (active) {
          setBuffering(false);
          setFailed(true);
          setStatus("De video kan niet worden geladen.");
        }
      });

    return () => {
      active = false;
      window.clearTimeout(readyTimeout);
      playerRef.current = null;
      player?.destroy().catch(() => {});
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [triggerRef]);

  useEffect(() => {
    const sync = () =>
      setFullscreen(
        (document.fullscreenElement || document.webkitFullscreenElement) === shellRef.current,
      );
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  const togglePlayback = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      await (playing ? player.pause() : player.play());
      setStatus("");
    } catch {
      setStatus("Afspelen lukt even niet. Probeer opnieuw.");
      setFailed(true);
    }
  };
  const commitSeek = async () => {
    if (seekDraft === null || !playerRef.current) return;
    try {
      setSeconds(await playerRef.current.setCurrentTime(seekDraft));
    } catch {
      setStatus("Doorspoelen lukt even niet. Probeer opnieuw.");
    } finally {
      setSeekDraft(null);
    }
  };
  const toggleMute = async () => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (muted && volume === 0) await player.setVolume(lastVolumeRef.current || 1);
      if (!muted) lastVolumeRef.current = volume || 1;
      await player.setMuted(!muted);
      setMuted(!muted);
    } catch {
      setStatus("Gebruik de volumeknoppen van je toestel.");
    }
  };
  const changeVolume = async (event) => {
    const value = Number(event.target.value);
    setVolume(value);
    if (!playerRef.current) return;
    try {
      await playerRef.current.setVolume(value);
      await playerRef.current.setMuted(value === 0);
      setMuted(value === 0);
      if (value) lastVolumeRef.current = value;
    } catch {
      setStatus("Gebruik de volumeknoppen van je toestel.");
    }
  };
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) await document.exitFullscreen();
        else document.webkitExitFullscreen();
      } else if (shellRef.current.requestFullscreen) await shellRef.current.requestFullscreen();
      else if (shellRef.current.webkitRequestFullscreen) shellRef.current.webkitRequestFullscreen();
      else await playerRef.current?.requestFullscreen();
    } catch {
      setStatus("Volledig scherm is niet beschikbaar in deze browser.");
    }
  };
  const position = seekDraft ?? seconds;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={campaign.title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          onClose();
      }}
    >
      <div className={styles.player} ref={shellRef}>
        <div className={styles.stage} aria-busy={buffering}>
          <iframe
            ref={iframeRef}
            src={`https://player.vimeo.com/video/${campaign.videoId}?autoplay=0&muted=0&controls=0&title=0&byline=0&portrait=0&badge=0&keyboard=0&playsinline=1&dnt=1`}
            title={campaign.title}
            tabIndex={-1}
            aria-hidden="true"
            allow="autoplay; fullscreen; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
          <button
            className={styles.surface}
            type="button"
            tabIndex={-1}
            aria-label={playing ? "Video pauzeren" : "Video afspelen"}
            onClick={togglePlayback}
            disabled={!ready}
          />
          {buffering && <span className={styles.loading} aria-hidden="true" />}
        </div>
        <button
          ref={closeRef}
          className={styles.close}
          type="button"
          aria-label="Video sluiten"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <div className={styles.controls} role="group" aria-label="Videobediening">
          <IconButton
            className={styles.control}
            icon={playing ? "pause" : "play"}
            label={playing ? "Video pauzeren" : "Video afspelen"}
            onClick={togglePlayback}
            disabled={!ready}
          />
          <input
            className={`${styles.range} ${styles.seek}`}
            type="range"
            aria-label="Afspeelpositie"
            aria-valuetext={`${formatTime(position)} van ${formatTime(duration)}`}
            min="0"
            max={duration}
            step="0.1"
            value={position}
            onChange={(event) => setSeekDraft(Number(event.target.value))}
            onPointerUp={commitSeek}
            onKeyUp={commitSeek}
            onBlur={commitSeek}
            disabled={!ready}
            style={{ "--progress": `${(100 * position) / duration}%` }}
          />
          <span className={styles.time} aria-hidden="true">
            {formatTime(position)} / {formatTime(duration)}
          </span>
          <IconButton
            className={styles.control}
            icon={muted ? "volumeOff" : "volume"}
            label={muted ? "Geluid aanzetten" : "Geluid uitzetten"}
            aria-pressed={muted}
            onClick={toggleMute}
            disabled={!ready}
          />
          <input
            className={`${styles.range} ${styles.volume}`}
            type="range"
            aria-label="Volume"
            aria-valuetext={`${Math.round(volume * 100)} procent`}
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={changeVolume}
            disabled={!ready}
            style={{ "--progress": `${volume * 100}%` }}
          />
          <IconButton
            className={styles.control}
            icon="maximize"
            label={fullscreen ? "Volledig scherm verlaten" : "Volledig scherm"}
            onClick={toggleFullscreen}
          />
        </div>
        {status && (
          <p className={styles.status} role="status">
            {status}
            {failed && (
              <>
                {" "}
                <a
                  href={`https://vimeo.com/${campaign.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open de video op Vimeo
                </a>
                .
              </>
            )}
          </p>
        )}
      </div>
    </dialog>,
    document.body,
  );
}

export default function HomeRapVideoCampaign({ campaign }) {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  return (
    <section
      className={styles.section}
      id="home-rapvideo"
      data-home-rapvideo
      aria-labelledby="home-rapvideo-title"
    >
      <h2 className={styles.title} id="home-rapvideo-title" aria-label="Check onze rapvideo!">
        <span className={styles.lead} aria-hidden="true">
          Check onze
        </span>
        <span className={styles.strip} aria-hidden="true">
          <span className={styles.riso} />
          <span className={styles.word}>rapvideo!</span>
        </span>
      </h2>
      <button
        ref={triggerRef}
        className={styles.film}
        type="button"
        aria-label="Speel Ami Amis Rapvideo af"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        <img
          src={assetPath(campaign.poster)}
          width="3840"
          height="2160"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className={styles.play} aria-hidden="true">
          <Icon name="play" size="xl" />
        </span>
      </button>
      {open && <CampaignPlayer campaign={campaign} onClose={close} triggerRef={triggerRef} />}
    </section>
  );
}
