declare module '@react-pdf-viewer/toolbar' {
  import { Plugin } from '@react-pdf-viewer/core';

  export interface ToolbarSlot {
    Download: () => JSX.Element;
    ZoomIn: () => JSX.Element;
    ZoomOut: () => JSX.Element;
    Print: () => JSX.Element;
    FullScreen: () => JSX.Element;
  }

  export function toolbarPlugin(): {
    Toolbar: (props: { children: (slots: ToolbarSlot) => JSX.Element }) => JSX.Element;
  };
}
