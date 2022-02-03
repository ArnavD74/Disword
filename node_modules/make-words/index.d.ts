declare module "make-words" {
  export function getWordByLength(length: number): string;
  export function getRandomWord(): string;
  export function getWord(
    length: number,
    letters: string[],
    excludeChars: string[],
    mustHaveLetter?: string
  ): string;
  export function getWords(
    count,
    minWordLength: number,
    maxWordLength: number,
    letters: string[],
    excludeChars: string[],
    mustHaveLetter?: string
  ): string[];

  export const otherChars: string[];
  export const letters: string[];
}
