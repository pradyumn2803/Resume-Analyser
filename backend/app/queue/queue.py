from app.queue.redis_connection import redis_connection
from rq import Queue

analysis_queue = Queue(
    name="analysis",
    connection=redis_connection
)