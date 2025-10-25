# app/services/watcher.py

import threading
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from app.core.logging import get_logger

logger = get_logger()


class FolderEventHandler(FileSystemEventHandler):
  """Handles file system events (create, modify, delete)."""

  def __init__(self, folder_path: Path):
    super().__init__()
    self.folder_path = folder_path

  def on_created(self, event):
    if not event.is_directory:
      logger.info(f"[FolderWatcher] File created: {event.src_path}")

  def on_modified(self, event):
    if not event.is_directory:
      logger.info(f"[FolderWatcher] File modified: {event.src_path}")

  def on_deleted(self, event):
    if not event.is_directory:
      logger.info(f"[FolderWatcher] File deleted: {event.src_path}")


class FolderWatcher:
  """Monitors a folder for changes in a background thread."""

  def __init__(self, folder_path: str):
    self.folder_path = Path(folder_path)
    self.folder_path.mkdir(parents=True, exist_ok=True)
    self.observer = Observer()
    self.thread = None

  def start(self):
    """Start the watcher in a background thread."""
    if self.thread and self.thread.is_alive():
      logger.warning("Watcher already running.")
      return

    event_handler = FolderEventHandler(self.folder_path)
    self.observer.schedule(event_handler, str(self.folder_path), recursive=True)

    self.thread = threading.Thread(target=self._run, daemon=True)
    self.thread.start()
    logger.info(f"[FolderWatcher] Started watching folder: {self.folder_path}")

  def _run(self):
    """Internal thread runner."""
    self.observer.start()
    try:
      self.observer.join()
    except KeyboardInterrupt:
      self.stop()

  def stop(self):
    """Stop watching the folder."""
    logger.info("[FolderWatcher] Stopping folder watcher...")
    self.observer.stop()
    self.observer.join()
