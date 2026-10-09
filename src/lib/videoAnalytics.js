import { currentPagePath, trackAnalyticsEvent } from "./analytics";

const VIDEO_PROGRESS_MILESTONES = [25, 50, 75];

export function createVideoAnalyticsTracker({
  client = "",
  id = "",
  provider = "",
  title = "Video",
} = {}) {
  let started = false;
  let completed = false;
  const reportedMilestones = new Set();

  const baseParameters = () => ({
    content_path: currentPagePath(),
    video_client: client,
    video_id: String(id || ""),
    video_provider: provider,
    video_title: title,
  });

  return {
    complete(duration = 0) {
      if (completed) {
        return;
      }

      completed = true;
      trackAnalyticsEvent("video_complete", {
        ...baseParameters(),
        video_duration: Math.round(Number(duration) || 0),
        video_percent: 100,
      });
    },

    progress(seconds = 0, duration = 0) {
      const normalizedDuration = Number(duration) || 0;
      const normalizedSeconds = Number(seconds) || 0;

      if (normalizedDuration <= 0 || normalizedSeconds < 0) {
        return;
      }

      const percentage = Math.min(100, (normalizedSeconds / normalizedDuration) * 100);
      VIDEO_PROGRESS_MILESTONES.forEach((milestone) => {
        if (percentage < milestone || reportedMilestones.has(milestone)) {
          return;
        }

        reportedMilestones.add(milestone);
        trackAnalyticsEvent("video_progress", {
          ...baseParameters(),
          video_current_time: Math.round(normalizedSeconds),
          video_duration: Math.round(normalizedDuration),
          video_percent: milestone,
        });
      });
    },

    start() {
      if (started) {
        return;
      }

      started = true;
      trackAnalyticsEvent("video_start", baseParameters());
    },
  };
}

