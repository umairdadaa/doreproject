import PropTypes from "prop-types";

const CodropsOverlay = ({ isDarkMode }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full flex flex-col justify-between p-7 text-xs z-30"
      style={{
        color: isDarkMode ? "#fff" : "#000",
      }}
    >
      <div className="flex flex-col w-full gap-4 max-sm:gap-2">
        <div className="flex w-full gap-6 max-sm:gap-3 max-sm:text-sm items-center">
          <h1 className="font-semibold">R3F Shader Reveal Effect</h1>
          <a target="_blank" href="https://tympanus.net/codrops/?p=83030">
            Article
          </a>
          <a target="_blank" href="https://tympanus.net/codrops/demos/">
            All demos
          </a>
          <a
            target="_blank"
            href="https://github.com/colindmg/r3f-image-reveal-effect"
          >
            GitHub
          </a>
        </div>

        <nav className="flex items-center w-full gap-6 max-sm:gap-1 max-sm:flex-col max-sm:items-start max-sm:text-sm underline">
          <a
            target="_blank"
            href="https://tympanus.net/codrops/demos/?tag=glsl"
          >
            #glsl
          </a>
          <a
            target="_blank"
            href="https://tympanus.net/codrops/demos/?tag=perlin-noise"
          >
            #perlin-noise
          </a>
          <a
            target="_blank"
            href="https://tympanus.net/codrops/demos/?tag=shader"
          >
            #shader
          </a>
          <a
            target="_blank"
            href="https://tympanus.net/codrops/demos/?tag=react-three-fiber"
          >
            #react-three-fiber
          </a>
          <a
            target="_blank"
            href="https://tympanus.net/codrops/demos/?tag=framer-motion"
          >
            #framer-motion
          </a>
        </nav>
      </div>
    </div>
  );
};

CodropsOverlay.propTypes = {
  isDarkMode: PropTypes.bool,
};

export default CodropsOverlay;
