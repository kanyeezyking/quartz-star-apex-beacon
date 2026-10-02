declare module "hanzi-writer" {
  const HanziWriter: {
    create: (
      element: HTMLElement,
      character: string,
      options?: Record<string, unknown>,
    ) => {
      animateCharacter: () => Promise<unknown>;
      quiz: (opts?: { onComplete?: (summary: { totalMistakes: number }) => void }) => void;
      cancelQuiz: () => void;
    };
  };
  export default HanziWriter;
}
