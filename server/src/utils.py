import logging


def setup_logger() -> logging.Logger:
    logger = logging.getLogger(__name__)
    ch = logging.StreamHandler()
    ch.setLevel(logging.ERROR)
    ch.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
    logger.addHandler(ch)

    return logger
