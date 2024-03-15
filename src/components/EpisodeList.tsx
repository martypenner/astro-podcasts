import { useStore } from '@nanostores/react';
import { $currentEpisode, $isPlaying, playEpisode } from '../services/state';
import { replicache } from '@/party/client';
import { useSubscribe } from 'replicache-react';

type Props = {
  episodes: Episode[];
};

export default function EpisodeList({ episodes }: Props) {
  const currentEpisode = useStore($currentEpisode);
  const isPlaying = useStore($isPlaying);

  // const episodes = useSubscribe(
  //   replicache,
  //   async (tx) => {
  //     const list = (await tx
  //       .scan({ prefix: 'episode/' })
  //       .entries()
  //       .toArray()) as unknown as [string, Episode][];
  //     return list.map(([, episode]) => ({
  //       ...episode,
  //       enclosureUrl: new URL(episode.enclosureUrl),
  //       datePublished: new Date(episode.datePublished),
  //     }));
  //   },
  //   { default: [] },
  // );
  // console.log('episodes', episodes);

  return (
    <>
      <TrendingPodcasts />
      <ul className="text-xl" aria-label="Tracklist">
        {episodes.map((episode) => {
          const isCurrentEpisode = episode.id == currentEpisode?.id;

          return (
            <li key={episode.id} className="first:border-t border-b">
              <button
                type="button"
                className="hover:bg-gray-50 focus-visible:ring-2 focus:outline-none focus:ring-black cursor-pointer px-6 py-4 flex basis grow w-full items-center"
                aria-current={isCurrentEpisode}
                onClick={() => playEpisode(episode)}
              >
                <div className="flex basis grow w-full items-center gap-4">
                  <span className="font-normal text-md">{episode.number}</span>
                  <div className="flex flex-col justify-start items-start">
                    <span className="text-sm mb-1">
                      {episode.datePublished.toLocaleDateString()}
                    </span>
                    <span className="font-medium text-left">
                      {episode.title}
                    </span>
                  </div>
                  <span className="sr-only"> - </span>
                  <span className="text-gray-500 ml-auto">
                    {episode.durationFormatted}
                  </span>

                  <span className="sr-only">
                    (press to{' '}
                    {isCurrentEpisode && isPlaying ? 'pause)' : 'play)'}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

function TrendingPodcasts() {
  const feeds = useSubscribe(
    replicache,
    async (tx) => {
      const list = (await tx.scan({ prefix: 'feed/' }).entries().toArray()) as [
        string,
        Feed,
      ][];
      return list.map(([, feed]) => feed);
    },
    { default: [] },
  );

  return (
    <ul>
      {feeds.map((feed) => (
        <li key={feed.id}>
          <a href={feed.url}>
            <img src={feed.image} alt="" width={100} height={100} />
            {feed.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
