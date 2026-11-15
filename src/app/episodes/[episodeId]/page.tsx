import { notFound } from "next/navigation";
import { EpisodeExperience } from "@/components/reader/EpisodeExperience";
import { episodes, getEpisode } from "@/lib/episodes";

export function generateStaticParams() {
  return episodes.map((e) => ({ episodeId: e.id }));
}

export default async function EpisodePage({ params }: { params: Promise<{ episodeId: string }> }) {
  const { episodeId } = await params;
  if (!getEpisode(episodeId)) notFound();
  return <EpisodeExperience episodeId={episodeId} />;
}
