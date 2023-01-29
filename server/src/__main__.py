from flask import Flask
from flask_cors import CORS

from src.api import blueprint as api_blueprint
from src.utils import setup_logger

app = application = Flask(__name__)
CORS(app)
app.register_blueprint(api_blueprint)

logger = setup_logger()


def parse_args():
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument('--debug', action='store_true')
    parser.add_argument('--seed', type=int, default=0)
    return parser.parse_args()


def main():
    try:
        args = parse_args()
        app.debug = args.debug
        if args.seed:
            from src.db import seed_data
            logger.info('Seeding data...')
            seed_data(args.seed)
            logger.info('Data seeded')

        app.run(host='0.0.0.0', port=8000)
    except KeyboardInterrupt:
        logger.info("Got keyboard interrupt, exiting cleanly")
        return 0
    except Exception as e:
        logger.exception("Unhandled exception, exiting...")
        return 1
    return 0


if __name__ == "__main__":
    exit(main())
