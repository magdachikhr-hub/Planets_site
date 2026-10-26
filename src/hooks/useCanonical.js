import { useEffect } from "react";

function useCanonical(url) {
  useEffect(() => {
    let canonical = document.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = url;
  }, [url]);
}

export default useCanonical;
