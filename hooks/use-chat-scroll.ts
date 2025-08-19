import { useEffect, useState } from "react";

type ChatScrollProps = {
  chatRef: React.RefObject<HTMLDivElement| null >;
  bottomRef: React.RefObject<HTMLDivElement | null >;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
};

export const useChatScroll = ({
  chatRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: ChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  // Infinite scroll (load more when reaching top)
  useEffect(() => {
    const topDiv = chatRef.current;
    if (!topDiv) return;

    const handleScroll = () => {
      if (topDiv.scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topDiv.addEventListener("scroll", handleScroll);
    return () => topDiv.removeEventListener("scroll", handleScroll);
  }, [chatRef, shouldLoadMore, loadMore]);

  // Auto-scroll to bottom
  useEffect(() => {
    const bottomDiv = bottomRef.current;
    const topDiv = chatRef.current;
    if (!topDiv || !bottomDiv) return;

    const shouldAutoScroll = () => {
      if (!hasInitialized) {
        setHasInitialized(true);
        return true;
      }
      const distanceFromBottom =
        topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
      return distanceFromBottom <= 100;
    };

    if (shouldAutoScroll()) {
      bottomDiv.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomRef, chatRef, count, hasInitialized]);
};
