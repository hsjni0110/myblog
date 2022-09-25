declare module '*.jpg';
declare module '*.jpeg';
declare module '@ckeditor/ckeditor5-react';
declare module '@ckeditor/ckeditor5-build-classic';
declare module 'quill-image-resize-module-react';

declare module NodeJS {
  interface Process extends NodeJS.Process {
    browser?: string
  }
}