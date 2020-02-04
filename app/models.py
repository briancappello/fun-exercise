from flask_unchained.bundles.sqlalchemy import db
from flask_unchained.bundles.security.models import User as BaseUser
from flask_unchained.bundles.security.models import Role, UserRole


class ExerciseType(db.Model):
    name = db.Column(db.String(length=64))

    exercises = db.relationship("Exercise", back_populates='exercise_type')


class Exercise(db.Model):
    class Meta:
        polymorphic = True

    workout_id = db.foreign_key("Workout")
    workout = db.relationship("Workout", back_populates='exercises')

    exercise_type_id = db.foreign_key("ExerciseType")
    exercise_type = db.relationship("ExerciseType", back_populates='exercises')


class RepetitionExercise(Exercise):
    count = db.Column(db.Integer)
    reps = db.Column(db.SmallInteger)


class DistanceExercise(Exercise):
    distance = db.Column(db.Float)
    distance_units = db.Column(db.String(length=16), default="miles")
    duration = db.Column(db.Interval)  # timedelta


class Location(db.Model):
    name = db.Column(db.String(length=128))

    workouts = db.relationship("Workout", back_populates="location")


class User(BaseUser):
    workouts = db.relationship("Workout", back_populates="user")


class Workout(db.Model):
    date = db.Column(db.Date)

    user_id = db.foreign_key("User")
    user = db.relationship("User", back_populates="workouts")

    location_id = db.foreign_key("Location")
    location = db.relationship("Location", back_populates="workouts")

    exercises = db.relationship('Exercise', back_populates='workout')
