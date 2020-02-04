import graphene

from flask_unchained.bundles.graphene import SQLAlchemyObjectType
from flask_unchained.bundles.security.graphene.types import UserInterface

from .scalars import TimeDeltaField
from .. import models


class User(SQLAlchemyObjectType):
    class Meta:
        model = models.User
        interfaces = (UserInterface,)
        only_fields = ("id", "email")


class ExerciseType(SQLAlchemyObjectType):
    class Meta:
        model = models.ExerciseType
        only_fields = ("id", "name")

    exercises = graphene.List("app.graphene.types.Exercise")


class RepetitionExercise(SQLAlchemyObjectType):
    class Meta:
        model = models.RepetitionExercise
        only_fields = ("id", "count", "reps")

    workout = graphene.Field("app.graphene.types.Workout")
    exercise_type = graphene.Field("app.graphene.types.ExerciseType")


class DistanceExercise(SQLAlchemyObjectType):
    class Meta:
        model = models.DistanceExercise
        only_fields = ("id", "distance", "distance_units")

    workout = graphene.Field("app.graphene.types.Workout")
    exercise_type = graphene.Field("app.graphene.types.ExerciseType")
    duration = TimeDeltaField()


class Exercise(graphene.types.union.Union):
    class Meta:
        types = (RepetitionExercise, DistanceExercise)


class Location(SQLAlchemyObjectType):
    class Meta:
        model = models.Location
        only_fields = ("id", "name")

    workouts = graphene.List("app.graphene.types.Workout")


class Workout(SQLAlchemyObjectType):
    class Meta:
        model = models.Workout
        only_fields = ("id", "date")

    location = graphene.Field("app.graphene.types.Location")
    exercises = graphene.List("app.graphene.types.Exercise")
