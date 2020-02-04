from flask_unchained import (controller, resource, func, include, prefix,
                             get, delete, post, patch, put, rule)

from flask_unchained.bundles.security import SecurityController

from .views import SiteController


routes = lambda: [
    controller(SiteController),
    controller(SecurityController),
]
