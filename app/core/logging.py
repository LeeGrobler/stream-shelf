# app/core/logging.py
import logging
from pathlib import Path
from loguru import logger

from .config import load_config


class InterceptHandler(logging.Handler):
  def emit(self, record):
    try:
      level = logger.level(record.levelname).name
    except Exception:
      level = record.levelno

    frame, depth = logging.currentframe(), 2
    while frame and frame.f_code.co_filename == logging.__file__:
      frame = frame.f_back
      depth += 1

    logger.opt(depth=depth, exception=record.exc_info).log(level, record.getMessage())


def setup_logging():
  config = load_config()
  log_path = Path(config.get("log_path", "./streamshelf.log"))
  log_path.parent.mkdir(parents=True, exist_ok=True)

  logger.remove()
  logger.add(
      log_path,
      rotation="1 week",
      retention="4 weeks",
      format="{time:YYYY-MM-DD HH:mm:ss} | {level:<8} | {message}",
      level="INFO",
      enqueue=True,
  )
  logger.add(
      lambda msg: print(msg, end=""),
      colorize=True,
      format="<green>{time:HH:mm:ss}</green> | <level>{level:<8}</level> | <cyan>{message}</cyan>",
      level="DEBUG",
  )

  intercept = InterceptHandler()
  for name in ("uvicorn", "uvicorn.error", "uvicorn.access", "fastapi"):
    logging.getLogger(name).handlers = [intercept]
    logging.getLogger(name).setLevel(logging.INFO)

  logging.getLogger().handlers = [intercept]
  logging.getLogger().setLevel(logging.INFO)


def get_logger():
  return logger
