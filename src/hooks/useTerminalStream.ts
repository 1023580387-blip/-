import { useEffect, useRef, useState } from "react";

/**
 * 终端日志流：按间隔逐行推送日志，营造"活着的系统"感。
 * 到达末尾后循环，保持持续氛围。
 */
export function useTerminalStream(lines: string[], interval = 900) {
  const [visible, setVisible] = useState<string[]>([]);
  const [streaming, setStreaming] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const seed = () => {
      setVisible((prev) => {
        const next = [...prev, lines[i % lines.length]];
        // 最多保留 12 行
        if (next.length > 12) next.shift();
        return next;
      });
      i += 1;
      timer = setTimeout(seed, interval);
    };

    setStreaming(true);
    timer = setTimeout(seed, 200);

    return () => clearTimeout(timer);
  }, [lines, interval]);

  // 自动滚动到底部
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visible]);

  return { visible, streaming, containerRef };
}
