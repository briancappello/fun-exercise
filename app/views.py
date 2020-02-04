from flask_unchained import Controller, route
from flask_unchained.bundles.api import ModelResource

from . import models


class SiteController(Controller):
    @route('/')
    def index(self):
        return self.render('index')


class ExerciseTypeResource(ModelResource):
    class Meta:
        model = models.ExerciseType


class RepExerciseResource(ModelResource):
    class Meta:
        model = models.RepetitionExercise


class DistanceExerciseResource(ModelResource):
    class Meta:
        model = models.DistanceExercise


class LocationResource(ModelResource):
    class Meta:
        model = models.Location


class UserResource(ModelResource):
    class Meta:
        model = models.User


class WorkoutResource(ModelResource):
    class Meta:
        model = models.Workout
