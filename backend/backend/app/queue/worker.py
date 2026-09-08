from rq import SimpleWorker
from app.queue.redis_connection import redis_connection
from app.queue.queue import analysis_queue
from app import create_app

app = create_app()

if __name__=="__main__":
    
    with app.app_context():
        worker = SimpleWorker(
            [analysis_queue],
            connection=redis_connection
        )
        print("Wroker Started")
        worker.work()