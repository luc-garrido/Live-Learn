from dataclasses import dataclass

@dataclass(frozen=True)
class Error:
    code: int
    message: str


class ErrorEnum:

    IA0001 = Error(500, "Trail generation failed")
    IA0002 = Error(500, "Module is missing required fields")

    DB0001 = Error(500, "Database operation failed")
    VD0001 = Error(400, "Validation error")
