// 测量文本
let canvasCtx: CanvasRenderingContext2D | null = null;

function truncateMid(value: string, length: number) {
  if (value.length <= length) {
    return value;
  }

  if (length <= 0) {
    return '';
  }

  if (length === 1) {
    return '…';
  }

  const mid = (length - 1) / 2;
  const pre = value.substring(0, Math.floor(mid));
  const post = value.substring(value.length - Math.ceil(mid));

  return `${pre}…${post}`;
}

function truncatePath(path: string, length: number) {
  if (path.length <= length) {
    return path;
  }

  if (length <= 0) {
    return '';
  }

  if (length === 1) {
    return '…';
  }

  const lastSeparator = path.lastIndexOf('/');

  // No directory prefix, fall back to middle ellipsis
  if (lastSeparator === -1) {
    return truncateMid(path, length);
  }

  const filenameLength = path.length - lastSeparator - 1;

  // File name prefixed with …/ would be too long, fall back
  // to middle ellipsis.
  if (filenameLength + 2 > length) {
    return truncateMid(path, length);
  }

  const pre = path.substring(0, length - filenameLength - 2);
  const post = path.substring(lastSeparator);

  return `${pre}…${post}`;
}

class TruncateText {
  private key: string = '';

  private map: Record<string, string> = {};

  getInstance(): CanvasRenderingContext2D {
    canvasCtx = canvasCtx || document.createElement('canvas').getContext('2d');
    return canvasCtx!;
  }

  truncate(text: string, maxWidth: number, font?: { fontFamily?: string; fontStyle?: string; fontSize?: string }) {
    const currentKey = `${font?.fontFamily}-${font?.fontStyle}-${font?.fontSize}-${text}-${maxWidth}`;
    if (this.map[currentKey]) {
      return this.map[currentKey];
    }
    const instance = this.getInstance();
    if (font) {
      const currentFontKey = `${font.fontFamily}-${font.fontStyle}-${font.fontSize}`;
      if (this.key !== currentFontKey) {
        this.key = currentFontKey;
        instance.font = `${font.fontStyle || ''} ${font.fontSize || ''} ${font.fontFamily || ''}`;
      }
    } else {
      instance.font = '';
    }
    const textWidth = instance.measureText(text).width;
    const textLength = text.length;
    const charWidth = (textWidth / textLength) | 0;
    let maxLength = ((maxWidth / charWidth) | 0) - 2;
    let textToDisplay = truncatePath(text, maxLength);
    // 如果不是等宽字体，需要重新计算判断
    while (maxLength > 4 && instance.measureText(textToDisplay).width >= maxWidth) {
      maxLength -= 2;
      textToDisplay = truncatePath(text, maxLength);
    }
    this.map[currentKey] = textToDisplay;
    return textToDisplay;
  }

  measure(text: string, font?: { fontFamily?: string; fontStyle?: string; fontSize?: string }) {
    const instance = this.getInstance();
    if (font) {
      const currentFontKey = `${font.fontFamily}-${font.fontStyle}-${font.fontSize}`;
      if (this.key !== currentFontKey) {
        this.key = currentFontKey;
        instance.font = `${font.fontStyle || ''} ${font.fontSize || ''} ${font.fontFamily || ''}`;
      }
    } else {
      instance.font = '';
    }
    const textWidth = instance.measureText(text).width;

    return textWidth;
  }
}

export const TruncateInstance = new TruncateText();
