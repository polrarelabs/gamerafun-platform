// import { GenresDetailBreadcumb } from "@components/screens/Genres";
// import { GenresDetail } from "@components/screens/Genres/components";
"use client";

import { memo } from "react";
import dynamic from "next/dynamic";

const GenresDetailBreadcumb = dynamic(() => import("@components/screens/Genres/GenresDetailBreadcumb"), {
  ssr: false,
});

const GenresDetail = dynamic(() => import("@components/screens/Genres/components/GenresDetail"), {
  ssr: false,
});


const GenresDetails = () => {
  return (
    <div style={{ padding: "32px 0", display: "flex", flexDirection: "column", gap: "32px" }}>
      <GenresDetailBreadcumb />
      <GenresDetail />
    </div>
  );
};

export default memo(GenresDetails);
