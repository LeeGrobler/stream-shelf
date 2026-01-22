export type Folder = {
  name: string;
  parentPath: string;
  path: string;
}

export type FoldersSuccessResponse = {
  ok: true
  message: string
  cwd: string
  folders: Folder[]
}

export type FoldersErrorResponse = {
  ok: false
  message: string
}

export type FoldersResponse = FoldersSuccessResponse | FoldersErrorResponse
