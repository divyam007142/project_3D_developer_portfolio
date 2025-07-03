import React from "react";

import BallCanvas from "./canvas/BallCanvas"; // ✅ note: NOT named import!
import { SectionWrapper } from "../hoc";

const Tech = () => {
  return (
    <div className="w-full flex justify-center">
      <BallCanvas />
    </div>
  );
};

export default SectionWrapper(Tech, "");
