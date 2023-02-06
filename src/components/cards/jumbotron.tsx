import React from "react";
import Typewriter from "typewriter-effect";

interface PropsParam {
  text: string[];
}

function Jumbotron({ text }: PropsParam) {
  return (
    <Typewriter
      options={{
        strings: text,
        autoStart: true,
        loop: true,
      }}
    />
  );
}

export default Jumbotron;
