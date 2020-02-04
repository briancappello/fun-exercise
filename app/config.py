import os

from flask_unchained import BundleConfig


class Config(BundleConfig):
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'change-me-to-a-secret-key!')
    WTF_CSRF_ENABLED = True
    SESSION_TYPE = "sqlalchemy"
    GRAPHENE_URL = "/auth/graphql/"


class DevConfig(Config):
    EXPLAIN_TEMPLATE_LOADING = False
    SQLALCHEMY_ECHO = False


class ProdConfig(Config):
    pass


class StagingConfig(ProdConfig):
    pass


class TestConfig(Config):
    TESTING = True
    WTF_CSRF_ENABLED = False
