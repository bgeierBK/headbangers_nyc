"""empty message

Revision ID: 1901afac5b19
Revises: ab4703a03686
Create Date: 2024-06-10 13:44:48.228761

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1901afac5b19'
down_revision = 'ab4703a03686'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('photos_table', schema=None) as batch_op:
        batch_op.alter_column('file',
               existing_type=sa.VARCHAR(),
               nullable=False)

    with op.batch_alter_table('reviews_table', schema=None) as batch_op:
        batch_op.drop_column('stars')

    with op.batch_alter_table('venues_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stars', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('venues_table', schema=None) as batch_op:
        batch_op.drop_column('stars')

    with op.batch_alter_table('reviews_table', schema=None) as batch_op:
        batch_op.add_column(sa.Column('stars', sa.INTEGER(), nullable=True))

    with op.batch_alter_table('photos_table', schema=None) as batch_op:
        batch_op.alter_column('file',
               existing_type=sa.VARCHAR(),
               nullable=True)

    # ### end Alembic commands ###
