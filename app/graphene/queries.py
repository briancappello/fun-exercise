import graphene

from flask_unchained.bundles.graphene import QueriesObjectType
from flask_unchained.bundles.security import current_user

from . import types


class Queries(QueriesObjectType):
    class Meta:
        abstract = True

    me = graphene.Field(types.User)

    def resolve_me(self, info, **kwargs):
        if current_user.is_authenticated:
            return current_user._get_current_object()
        return None

    exercise_type = graphene.Field(types.ExerciseType, id=graphene.ID(required=True))
    exercise_types = graphene.List(types.ExerciseType)

    repetition_exercise = graphene.Field(types.RepetitionExercise, id=graphene.ID(required=True))
    repetition_exercises = graphene.List(types.RepetitionExercise)

    distance_exercise = graphene.Field(types.DistanceExercise, id=graphene.ID(required=True))
    distance_exercises = graphene.List(types.DistanceExercise)

    location = graphene.Field(types.Location, id=graphene.ID(required=True))
    locations = graphene.List(types.Location)

    workout = graphene.Field(types.Workout, id=graphene.ID(required=True))
    workouts = graphene.List(types.Workout)
