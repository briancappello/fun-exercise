from datetime import timedelta

from graphene.types import Scalar
from graphql.language import ast


UNITS = [
    'microseconds',
    'milliseconds',
    'seconds',
    'hours',
    'days',
    'weeks',
]


def ensure_plural(unit: str) -> str:
    if not unit.endswith('s'):
        unit = f'{unit}s'
    if unit not in UNITS:
        raise RuntimeError(f'unit must be one of {", ".join(UNITS)} (got {unit!r})')
    return unit


class TimeDeltaField(Scalar):
    @staticmethod
    def serialize(td: timedelta):
        hours, remainder = divmod(td.total_seconds(), 3600)
        days, hours = divmod(hours, 24)
        weeks, days = divmod(days, 7)
        minutes, seconds = divmod(remainder, 60)
        parts = [
            (days, "day"),
            (hours, "hour"),
            (minutes, "minute"),
            (seconds, "second"),
        ]
        rv = ""
        for amount, unit in parts:
            if not amount:
                continue
            if amount == int(amount):
                amount = int(amount)
            rv += f"{amount} {unit if amount == 1 else unit + 's'} "
        return rv.strip()

    @staticmethod
    def parse_literal(node):
        if isinstance(node, ast.StringValue):
            return TimeDeltaField.parse_value(node.value)

    @staticmethod
    def parse_value(value):
        parts = value.split(' ')
        kwargs = {}
        for i in range(0, len(parts), 2):
            amount, unit = parts[i:i+2]
            kwargs[ensure_plural(unit)] = float(amount)
        return timedelta(**kwargs)
