export const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export const removeStartWord = (text: string, word: string) => {
  const trimmedText = text.trim();
  if (trimmedText === word) {
    return '';
  } else if (trimmedText.length < word.length) {
    // Get text from 0~word.length
    const startWord = word.slice(0, trimmedText.length);
    if (trimmedText === startWord) {
      return '';
    }
  } else if (trimmedText.startsWith(word)) {
    return trimmedText.slice(word.length);
  }
  return trimmedText;
};
