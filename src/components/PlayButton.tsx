import { playEpisode, type Episode } from '../services/state';

type Props = Episode;

export default function PlayButton(episode: Props) {
  return (
    <button
      type="button"
      className="text-pink-700 bg-gray-100 hover:bg-gray-200 focus-visible:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-lg px-10 py-3 text-center inline-flex items-center dark:focus:ring-black mr-4"
      onClick={() => playEpisode(episode)}
    >
      <svg
        className="w-6 h-6 mr-2 -ml-1 text-pink-700"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clipRule="evenodd"
        />
      </svg>
      Play
    </button>
  );
}
