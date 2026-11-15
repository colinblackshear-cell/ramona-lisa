import { EpisodeExperience } from "@/components/reader/EpisodeExperience";
import { episodes } from "@/lib/episodes";

/** The prototype opens straight onto the pilot. A series shelf comes later. */
export default function Home() {
  return <EpisodeExperience episodeId={episodes[0].id} />;
}
