"""empty message

Revision ID: db87315c7832
Revises: 91ac482acb5a
Create Date: 2024-06-11 09:39:19.999707

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'db87315c7832'
down_revision = '91ac482acb5a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('photos_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('url', sa.String(length=255), nullable=False))
        batch_op.drop_column('file')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('photos_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('file', sa.VARCHAR(), nullable=False))
        batch_op.drop_column('url')

    # ### end Alembic commands ###
