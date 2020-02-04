from flask_unchained.bundles.sqlalchemy import ModelManager

from . import models


class ExerciseTypeManager(ModelManager):
    class Meta:
        model = models.ExerciseType


class RepExerciseManager(ModelManager):
    class Meta:
        model = models.RepetitionExercise


class DistanceExerciseManager(ModelManager):
    class Meta:
        model = models.DistanceExercise


class LocationManager(ModelManager):
    class Meta:
        model = models.Location


class UserManager(ModelManager):
    class Meta:
        model = models.User


class WorkoutManager(ModelManager):
    class Meta:
        model = models.Workout
