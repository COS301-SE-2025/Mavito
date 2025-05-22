from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.ext.declarative import declared_attr

class Base(DeclarativeBase):
    id: any # type: ignore
    name: str
    @declared_attr.directive 
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s" # Pluralizes class name for table name