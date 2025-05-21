# app/db/base.py
# Import all the models, so that Base has them before being
# imported by Alembic or used by create_all / main.py
from app.db.base_class import Base
# When you create your models in app/models/, you will import them here, for example:
# from app.models.user import User  # noqa: F401
# from app.models.lexicon import LexiconEntry  # noqa: F401
# from app.models.comment import Comment  # noqa: F401